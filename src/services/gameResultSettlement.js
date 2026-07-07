/**
 * gameResultSettlement.js
 * ─────────────────────────────────────────────────────────────
 * Módulo dedicado al cierre de partidas: POST /api/game/result,
 * cola local de pendientes y reintentos. Punto único para depurar
 * coins / historial / "No pudimos confirmar la partida".
 */
import {
  GAME_CONFIG,
  calculateBetAmounts,
  sleep,
  shouldRetryGameResultSave
} from '../components/waiting/gameConfig.js';

const DBG_ENDPOINT = 'http://127.0.0.1:7752/ingest/5aaf9be0-68cd-4a3d-a9ff-9e0243f0159f';
const DBG_SESSION = '681594';

function dbgLog(hypothesisId, location, message, data) {
  // #region agent log
  fetch(DBG_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': DBG_SESSION },
    body: JSON.stringify({
      sessionId: DBG_SESSION,
      hypothesisId,
      location,
      message,
      data,
      timestamp: Date.now()
    })
  }).catch(() => {});
  // #endregion
}

export function extractMatchIdFromPayload(payload = {}) {
  if (!payload || typeof payload !== 'object') return null;
  const candidates = [
    payload.matchId,
    payload.match_id,
    payload.matchmakingId,
    payload.matchmaking_id,
    payload.gameData?.matchId,
    payload.gameData?.matchmakingId
  ];
  for (const c of candidates) {
    const n = Number(c);
    if (Number.isFinite(n) && n > 0) return n;
  }
  return null;
}

export function buildResultPayload({
  gameData,
  user,
  table,
  gameMode,
  playersRoom,
  currentMatchId,
  roomCode
}) {
  const safeTable = table || {};
  const isMultiplayer = playersRoom === 4 || safeTable?.type === 'online-4';
  const entryPrice = safeTable?.entry_price ?? GAME_CONFIG.DEFAULT_BET_AMOUNT;
  const playerCountForPot = isMultiplayer
    ? (playersRoom || safeTable?.max_players || 4)
    : 2;
  const winnerPayout = safeTable?.winner_payout ?? (entryPrice * playerCountForPot);
  const tableTotalPot = Number(safeTable?.total_pot || 0);
  const betAmounts = calculateBetAmounts(
    entryPrice,
    gameData.isWinner,
    winnerPayout,
    playerCountForPot,
    tableTotalPot
  );

  const authorizedMatchId =
    extractMatchIdFromPayload(gameData) || currentMatchId || null;

  const baseResultData = {
    tableId: safeTable?.id,
    match_id: authorizedMatchId,
    matchmaking_id: authorizedMatchId,
    userId: user.id,
    betAmount: betAmounts.betAmount,
    totalPot: betAmounts.totalPot,
    houseFee: betAmounts.houseFee,
    winnerAmount: betAmounts.winnerAmount,
    isWinner: gameData.isWinner,
    gameData: {
      ...(gameData.gameData || gameData),
      matchId: authorizedMatchId,
      matchmakingId: authorizedMatchId
    },
    playerName: gameData.playerName,
    roomCode: gameData.roomCode || roomCode || gameData.gameData?.roomCode,
    tableName: safeTable?.name || 'Mesa Online',
    tableType: safeTable?.type || 'invite',
    gameMode,
    entryPrice: safeTable?.entry_price ?? 0,
    winnerPayout: safeTable?.winner_payout ?? 0,
    botPlayed: gameData.botPlayed || false,
    botWinReason: gameData.botWinReason || null
  };

  if (isMultiplayer) {
    const allPlayerNames = gameData.gameData?.playerNames || [];
    const allScores = gameData.gameData?.scores || [];
    const winner = gameData.winner || gameData.gameData?.winner;
    return {
      ...baseResultData,
      isMultiplayer: true,
      playersCount: 4,
      allPlayers: allPlayerNames,
      allScores,
      winner,
      opponentName: winner,
      playerScore: allScores[allPlayerNames.indexOf(gameData.playerName)] || 0,
      opponentScore: allScores[allPlayerNames.indexOf(winner)] || 0
    };
  }

  return {
    ...baseResultData,
    opponentName: gameData.opponentName,
    playerScore: gameData.playerScore,
    opponentScore: gameData.opponentScore,
    isMultiplayer: false,
    playersCount: 2
  };
}

export async function postGameResultOnce(resultData, token) {
  const response = await fetch(`${GAME_CONFIG.API_BASE_URL}/game/result`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(resultData)
  });

  if (response.ok) {
    const result = await response.json();
    return { ok: true, result, httpStatus: response.status };
  }

  const raw = await response.text();
  let serverMessage = `Error del servidor (${response.status})`;
  try {
    const body = JSON.parse(raw);
    if (body.message) serverMessage = body.message;
  } catch {
    if (raw) serverMessage = raw.slice(0, 300);
  }

  return {
    ok: false,
    httpStatus: response.status,
    error: new Error(serverMessage)
  };
}

/** true solo si el servidor ya registró ESTA misma partida (mismo match_id). */
export function isSameMatchAlreadyRegistered(apiResult, resultData) {
  if (!apiResult?.data?.already_registered) return false;
  const requested = Number(resultData?.match_id || resultData?.matchmaking_id || 0);
  const stored = Number(apiResult?.data?.matchmaking_id || 0);
  if (requested > 0 && stored > 0) return requested === stored;
  // Sin match_id: no asumir éxito (evita bloqueo silencioso en CPU consecutivas)
  return false;
}

export function savePendingGameResult(resultData, gameData) {
  try {
    const payload = JSON.stringify({
      resultData,
      gameData: {
        isWinner: gameData.isWinner,
        playerName: gameData.playerName,
        opponentName: gameData.opponentName,
        winner: gameData.winner,
        playerScore: gameData.playerScore,
        opponentScore: gameData.opponentScore,
        roomCode: gameData.roomCode,
        gameData: gameData.gameData
      },
      savedAt: new Date().toISOString()
    });
    sessionStorage.setItem(GAME_CONFIG.RESULT_SAVE_PENDING_KEY, payload);
    localStorage.setItem(GAME_CONFIG.RESULT_SAVE_PENDING_KEY, payload);
  } catch (e) {
    console.warn('[SETTLEMENT] No se pudo guardar resultado pendiente:', e);
  }
}

export function loadPendingGameResult() {
  try {
    const raw =
      sessionStorage.getItem(GAME_CONFIG.RESULT_SAVE_PENDING_KEY) ||
      localStorage.getItem(GAME_CONFIG.RESULT_SAVE_PENDING_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const savedAt = parsed?.savedAt ? new Date(parsed.savedAt).getTime() : 0;
    if (savedAt && Date.now() - savedAt > 24 * 60 * 60 * 1000) {
      clearPendingGameResult();
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function clearPendingGameResult() {
  try {
    sessionStorage.removeItem(GAME_CONFIG.RESULT_SAVE_PENDING_KEY);
    localStorage.removeItem(GAME_CONFIG.RESULT_SAVE_PENDING_KEY);
  } catch {
    /* ignore */
  }
}

/**
 * Envía resultado con reintentos. Retorna { ok, result, error, duplicateBlocked }.
 */
export async function submitGameResultWithRetry(resultData, token) {
  savePendingGameResult(resultData, resultData);

  const maxAttempts = GAME_CONFIG.RESULT_SAVE_MAX_ATTEMPTS;
  let lastError = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const { ok, result, error, httpStatus } = await postGameResultOnce(
        resultData,
        token
      );

      if (ok) {
        if (isSameMatchAlreadyRegistered(result, resultData)) {
          dbgLog('D', 'gameResultSettlement.js:submit', 'same_match_already_registered', {
            matchId: resultData.match_id,
            gameResultId: result?.data?.game_result_id
          });
          clearPendingGameResult();
          return { ok: true, result, duplicateBlocked: false };
        }

        if (result?.data?.already_registered) {
          dbgLog('B', 'gameResultSettlement.js:submit', 'blocked_different_match', {
            requestedMatchId: resultData.match_id,
            storedMatchId: result?.data?.matchmaking_id
          });
          lastError = new Error(
            'El servidor reportó una victoria previa en esta mesa. Reintentando partida nueva...'
          );
          if (attempt >= maxAttempts) {
            return { ok: false, error: lastError, duplicateBlocked: true };
          }
          await sleep(GAME_CONFIG.RESULT_SAVE_RETRY_BASE_DELAY_MS * attempt);
          continue;
        }

        dbgLog('D', 'gameResultSettlement.js:submit', 'api_result_ok', {
          attempt,
          gameResultId: result?.data?.game_result_id,
          newBalance: result?.data?.new_balance,
          matchId: resultData.match_id,
          isWinner: resultData.isWinner
        });
        clearPendingGameResult();
        return { ok: true, result, duplicateBlocked: false };
      }

      lastError = error;
      dbgLog('A', 'gameResultSettlement.js:submit', 'api_attempt_failed', {
        attempt,
        httpStatus,
        message: error?.message,
        matchId: resultData.match_id
      });

      if (!shouldRetryGameResultSave(httpStatus) || attempt >= maxAttempts) break;
    } catch (networkError) {
      lastError = networkError;
      if (attempt >= maxAttempts) break;
    }

    await sleep(GAME_CONFIG.RESULT_SAVE_RETRY_BASE_DELAY_MS * attempt);
  }

  dbgLog('A', 'gameResultSettlement.js:submit', 'api_result_failed_final', {
    error: lastError?.message,
    matchId: resultData.match_id,
    isWinner: resultData.isWinner
  });

  return {
    ok: false,
    error:
      lastError instanceof Error
        ? lastError
        : new Error(lastError?.message || GAME_CONFIG.MESSAGES.ERROR),
    duplicateBlocked: false
  };
}

/**
 * Tras settlement exitoso: sincroniza saldo en stores y avisa a /history.
 */
export function notifySettlementSuccess({ result, store } = {}) {
  if (typeof window === 'undefined') return;

  const newBalance = result?.data?.new_balance;
  if (newBalance != null && store) {
    const parsed = Number(newBalance);
    if (Number.isFinite(parsed)) {
      store.commit('games/SET_USER_BALANCE', parsed);
      try {
        store.commit('auth/UPDATE_USER_DATA', { balance: parsed });
        const raw = localStorage.getItem('user');
        if (raw) {
          const user = JSON.parse(raw);
          user.balance = parsed;
          localStorage.setItem('user', JSON.stringify(user));
        }
      } catch {
        /* ignore */
      }
    }
  }

  window.dispatchEvent(new CustomEvent('dominues:history-refresh'));
  window.dispatchEvent(new CustomEvent('app-refresh-data'));
  window.dispatchEvent(
    new CustomEvent('balance-updated', {
      detail: { newBalance, source: 'settlement' }
    })
  );
}

/** Reintenta cualquier resultado pendiente (victoria o derrota). */
export async function retryPendingGameResults(token) {
  const pending = loadPendingGameResult();
  if (!pending?.resultData || !token) return { ok: false, skipped: true };

  console.log('[SETTLEMENT] Reintentando resultado pendiente...', {
    isWinner: pending.resultData.isWinner,
    matchId: pending.resultData.match_id
  });

  const outcome = await submitGameResultWithRetry(pending.resultData, token);
  return { ...outcome, skipped: false, pending };
}
