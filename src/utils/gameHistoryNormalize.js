/**
 * Une campos del JSON game_data (game_results) con el ítem de /history.
 * Fix: string doble-encoded, prioriza finalScore / opponentFinalScore,
 *      mapea isWinner desde game_data, debug opcional.
 */

function tryParseJson(val) {
  if (val == null) return null;
  if (typeof val === 'object') return val;
  if (typeof val !== 'string') return null;

  const s = val.trim().replace(/^\uFEFF/, '');
  if (!s || s === 'null') return null;

  try {
    let parsed = JSON.parse(s);

    if (typeof parsed === 'string') {
      try {
        parsed = JSON.parse(parsed);
      } catch {
        /* string de un solo nivel, no es JSON */
      }
    }

    if (Array.isArray(parsed) && parsed.length === 1 && typeof parsed[0] === 'object') {
      parsed = parsed[0];
    }

    return typeof parsed === 'object' && parsed !== null ? parsed : null;
  } catch {
    return null;
  }
}

function unwrapSingleKeyPayload(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  const keys = Object.keys(obj);
  if (keys.length !== 1) return obj;
  const k = keys[0];
  if (
    !['data', 'payload', 'result', 'game', 'attributes', 'gameData', 'game_data'].includes(k)
  ) {
    return obj;
  }
  const inner = tryParseJson(obj[k]) ?? obj[k];
  if (inner && typeof inner === 'object') return unwrapSingleKeyPayload(inner);
  return obj;
}

function normalizeScoreValue(v) {
  if (v == null || v === '') return null;
  if (typeof v === 'number' && Number.isFinite(v)) return v;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function pickScoresFromObject(obj) {
  if (!obj || typeof obj !== 'object') return null;

  const ps = normalizeScoreValue(
    obj.finalScore ?? obj.playerScore ?? obj.final_score ?? obj.player_score
  );
  const os = normalizeScoreValue(
    obj.opponentFinalScore ??
      obj.opponentScore ??
      obj.opponent_final_score ??
      obj.opponent_score
  );

  if (ps == null && os == null) return null;
  return { ps, os };
}

function collectJsonCandidates(raw) {
  const paths = [
    raw,
    raw?.game_data,
    raw?.gameData,
    raw?.attributes?.game_data,
    raw?.attributes?.gameData,
    raw?.game?.game_data,
    raw?.game?.gameData,
    raw?.game_result?.game_data,
    raw?.gameResult?.game_data,
    raw?.game_result?.gameData,
    raw?.result?.game_data,
    raw?.result?.gameData,
    raw?.meta?.game_data,
    raw?.details,
    raw?.payload
  ];

  const out = [];
  for (const p of paths) {
    let parsed = tryParseJson(p) ?? (p && typeof p === 'object' ? p : null);
    if (!parsed) continue;
    if (Array.isArray(parsed) && parsed.length === 1 && typeof parsed[0] === 'object') {
      parsed = parsed[0];
    }
    if (parsed && typeof parsed === 'object') {
      out.push(unwrapSingleKeyPayload(parsed));
    }
  }
  return out;
}

function extractScoresFromCandidates(blobs) {
  for (const blob of blobs) {
    const scores = pickScoresFromObject(blob);
    if (scores && (scores.ps != null || scores.os != null)) return scores;

    if (blob && typeof blob === 'object') {
      for (const v of Object.values(blob)) {
        const inner = tryParseJson(v) ?? (v && typeof v === 'object' ? v : null);
        if (inner && typeof inner === 'object') {
          const nested = pickScoresFromObject(inner);
          if (nested && (nested.ps != null || nested.os != null)) return nested;
        }
      }
    }
  }
  return null;
}

/**
 * @param {object} raw - Ítem del endpoint /history
 * @param {boolean} [debug=false] - Logs en consola (desarrollo)
 */
export function normalizeHistoryGame(raw, debug = false) {
  if (!raw || typeof raw !== 'object') return raw;
  const game = { ...raw };

  const blobs = collectJsonCandidates(game);

  if (debug) {
    console.group('[normalizeHistoryGame] id:', game.id ?? game.result_id ?? game.game_id ?? '?');
    console.log('raw.game_data type:', typeof raw.game_data);
    console.log('blobs encontrados:', blobs.length);
    blobs.forEach((b, i) => console.log(`  blob[${i}]:`, b));
  }

  const fromJson = extractScoresFromCandidates(blobs);

  if (debug) {
    console.log('scores extraídos:', fromJson);
  }

  if (fromJson) {
    if (fromJson.ps != null) game.player_score = fromJson.ps;
    if (fromJson.os != null) game.opponent_score = fromJson.os;
  }

  const data =
    blobs.find(
      b =>
        b &&
        typeof b === 'object' &&
        (b.opponentName != null ||
          b.opponent_name != null ||
          b.gameMode != null ||
          b.game_mode != null ||
          b.playerScore != null ||
          b.player_score != null ||
          b.finalScore != null ||
          b.final_score != null)
    ) ??
    blobs[0] ??
    tryParseJson(game.game_data ?? game.gameData) ??
    null;

  if (data && typeof data === 'object') {
    if (!game.opponent_name && (data.opponentName || data.opponent_name)) {
      game.opponent_name = data.opponentName ?? data.opponent_name;
    }
    if (!game.game_mode && (data.gameMode || data.game_mode)) {
      game.game_mode = data.gameMode ?? data.game_mode;
    }

    const winRaw = data.isWinner ?? data.is_winner;
    if (game.is_winner == null && winRaw != null) {
      game.is_winner = !!winRaw;
    }

    const sur = data.surrendered;
    if (sur != null) {
      game.surrendered = String(!!sur);
    }

    const disc = data.disconnectReason ?? data.disconnect_reason;
    if (disc != null && disc !== '') {
      game.disconnect_reason = disc;
    } else if (data.opponentDisconnected ?? data.opponent_disconnected) {
      game.disconnect_reason = game.disconnect_reason || 'Desconexión del oponente';
    }
  }

  if (debug) {
    console.log(
      'resultado → player_score:',
      game.player_score,
      '| opponent_score:',
      game.opponent_score
    );
    console.groupEnd();
  }

  return game;
}
