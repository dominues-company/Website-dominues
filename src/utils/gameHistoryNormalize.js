/**
 * Historial: Laravel ya expone player_score / opponent_score desde game_data (SQL).
 * Aquí se normalizan tipos y, solo si faltan datos en raíz, se lee game_data (JSON).
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
        /* un solo nivel */
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
  if (!['data', 'payload', 'result', 'game', 'attributes', 'gameData', 'game_data'].includes(k)) {
    return obj;
  }
  const inner = tryParseJson(obj[k]) ?? obj[k];
  if (inner && typeof inner === 'object') return unwrapSingleKeyPayload(inner);
  return obj;
}

function normalizeScoreValue(v) {
  if (v == null || v === '' || v === 'null') return null;
  if (typeof v === 'number' && Number.isFinite(v)) return v;
  const n = Number(String(v).trim());
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

function collectGameDataBlobs(raw) {
  const paths = [
    raw?.game_data,
    raw?.gameData,
    raw?.attributes?.game_data,
    raw?.data?.game_data,
    raw?.game?.game_data,
    raw?.result?.game_data
  ];
  const out = [];
  for (const p of paths) {
    let parsed = tryParseJson(p) ?? (p && typeof p === 'object' ? p : null);
    if (!parsed) continue;
    if (Array.isArray(parsed) && parsed.length === 1 && typeof parsed[0] === 'object') {
      parsed = parsed[0];
    }
    if (parsed && typeof parsed === 'object') out.push(unwrapSingleKeyPayload(parsed));
  }
  return out;
}

/**
 * Une filas con arrays paralelos o mapas por result_id en la raíz de la respuesta.
 */
export function mergeHistoryResponsePayload(responseData) {
  if (!responseData || typeof responseData !== 'object') return [];

  let list = responseData.history;
  if (!Array.isArray(list)) return [];

  const mergeRow = (item, patch) => {
    if (patch == null) return item;
    const base = item && typeof item === 'object' ? { ...item } : {};
    if (typeof patch === 'string') {
      const parsed = tryParseJson(patch);
      const m = { ...base, game_data: patch };
      if (parsed && typeof parsed === 'object') {
        const sc = pickScoresFromObject(parsed);
        if (sc) {
          if (m.player_score == null && sc.ps != null) m.player_score = sc.ps;
          if (m.opponent_score == null && sc.os != null) m.opponent_score = sc.os;
        }
        if (!m.opponent_name && (parsed.opponentName || parsed.opponent_name)) {
          m.opponent_name = parsed.opponentName ?? parsed.opponent_name;
        }
        if (!m.game_mode && (parsed.gameMode || parsed.game_mode)) {
          m.game_mode = parsed.gameMode ?? parsed.game_mode;
        }
      }
      return m;
    }
    if (typeof patch === 'object') {
      const m = { ...base };
      for (const [k, v] of Object.entries(patch)) {
        if (v !== undefined) m[k] = v;
      }
      const gd = patch.game_data ?? patch.gameData;
      if (gd != null && m.game_data == null && m.gameData == null) {
        m.game_data = typeof gd === 'string' ? gd : JSON.stringify(gd);
      }
      return m;
    }
    return base;
  };

  const parallelKeys = [
    'game_data',
    'game_details',
    'history_details',
    'history_game_data',
    'results_meta',
    'history_meta',
    'meta_history',
    'raw_games'
  ];
  for (const key of parallelKeys) {
    const arr = responseData[key];
    if (!Array.isArray(arr) || arr.length !== list.length) continue;
    list = list.map((item, i) => mergeRow(item, arr[i]));
    break;
  }

  const mapKeys = ['game_data_by_result', 'game_data_map', 'history_extras', 'results_by_id'];
  for (const key of mapKeys) {
    const m = responseData[key];
    if (!m || typeof m !== 'object' || Array.isArray(m) || Object.keys(m).length === 0) continue;
    list = list.map(item => {
      const id = item?.result_id ?? item?.id;
      if (id == null) return item;
      const patch = m[id] ?? m[String(id)];
      return mergeRow(item, patch);
    });
    break;
  }

  return list;
}

/** Normaliza entrada string JSON o tupla [fila, payload]. */
export function coerceHistoryEntries(list) {
  if (!Array.isArray(list)) return [];
  return list.map(entry => {
    if (typeof entry === 'string') {
      const o = tryParseJson(entry);
      return o && typeof o === 'object' ? o : { _raw_entry: entry };
    }
    if (Array.isArray(entry) && entry.length >= 2) {
      const [a, b, ...rest] = entry;
      if (a && typeof a === 'object') {
        let merged = { ...a };
        for (const extra of [b, ...rest]) {
          if (typeof extra === 'string' && extra.trim().startsWith('{')) {
            merged.game_data = merged.game_data ?? extra;
            const p = tryParseJson(extra);
            const sc = p && typeof p === 'object' ? pickScoresFromObject(p) : null;
            if (sc) {
              if (merged.player_score == null && sc.ps != null) merged.player_score = sc.ps;
              if (merged.opponent_score == null && sc.os != null) merged.opponent_score = sc.os;
            }
            if (p && typeof p === 'object') {
              if (!merged.opponent_name) merged.opponent_name = p.opponentName ?? p.opponent_name ?? null;
              if (!merged.game_mode) merged.game_mode = p.gameMode ?? p.game_mode ?? null;
            }
          } else if (extra && typeof extra === 'object') {
            merged = mergeHistoryResponsePayload({ history: [merged], game_data: [extra] })[0];
          }
        }
        return merged;
      }
    }
    return entry;
  });
}

export function normalizeHistoryGame(raw) {
  if (!raw || typeof raw !== 'object') return raw;
  const game = { ...raw };

  game.player_score = normalizeScoreValue(game.player_score);
  game.opponent_score = normalizeScoreValue(game.opponent_score);

  const blobs = collectGameDataBlobs(game);
  const needScores = game.player_score == null && game.opponent_score == null;

  if (needScores && blobs.length) {
    let fromJson = null;
    for (const b of blobs) {
      fromJson = pickScoresFromObject(b);
      if (fromJson && (fromJson.ps != null || fromJson.os != null)) break;
    }
    if (fromJson) {
      if (fromJson.ps != null) game.player_score = fromJson.ps;
      if (fromJson.os != null) game.opponent_score = fromJson.os;
    }
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
          b.finalScore != null)
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
    if (game.is_winner == null && winRaw != null) game.is_winner = !!winRaw;
    const sur = data.surrendered;
    if (sur != null) game.surrendered = String(!!sur);
    const disc = data.disconnectReason ?? data.disconnect_reason;
    if (disc != null && disc !== '') game.disconnect_reason = disc;
    else if (data.opponentDisconnected ?? data.opponent_disconnected) {
      game.disconnect_reason = game.disconnect_reason || 'Desconexión del oponente';
    }
  }

  return game;
}
