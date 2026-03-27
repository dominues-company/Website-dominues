/**
 * Une campos del JSON game_data (guardado en game_results) con el objeto que devuelve /history.
 * El backend a veces no expone player_score / opponent_score en la raíz del ítem.
 */
export function normalizeHistoryGame(raw) {
  if (!raw || typeof raw !== 'object') return raw;
  const game = { ...raw };
  let data = game.game_data ?? game.gameData;
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch {
      data = null;
    }
  }
  if (!data || typeof data !== 'object') return game;

  const ps = data.playerScore ?? data.finalScore;
  const os = data.opponentScore ?? data.opponentFinalScore;
  if (ps != null && ps !== '') game.player_score = ps;
  if (os != null && os !== '') game.opponent_score = os;

  if (!game.opponent_name && data.opponentName) {
    game.opponent_name = data.opponentName;
  }
  if (!game.game_mode && data.gameMode) {
    game.game_mode = data.gameMode;
  }
  if (data.surrendered != null) {
    game.surrendered = String(!!data.surrendered);
  }
  if (data.disconnectReason != null && data.disconnectReason !== '') {
    game.disconnect_reason = data.disconnectReason;
  } else if (data.opponentDisconnected) {
    game.disconnect_reason = game.disconnect_reason || 'Desconexión del oponente';
  }

  return game;
}
