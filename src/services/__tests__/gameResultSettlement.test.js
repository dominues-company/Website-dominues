/**
 * Tests unitarios ligeros para gameResultSettlement (sin framework).
 * Ejecutar: node src/services/__tests__/gameResultSettlement.test.js
 */
import {
  extractMatchIdFromPayload,
  isSameMatchAlreadyRegistered,
  buildResultPayload
} from '../gameResultSettlement.js';

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

// extractMatchId
assert(extractMatchIdFromPayload({ match_id: 2065 }) === 2065, 'match_id');
assert(extractMatchIdFromPayload({ gameData: { matchmakingId: 99 } }) === 99, 'nested');

// isSameMatchAlreadyRegistered — misma partida
assert(
  isSameMatchAlreadyRegistered(
    { data: { already_registered: true, matchmaking_id: 2066 } },
    { match_id: 2066 }
  ) === true,
  'same match ok'
);

// distinta partida → no tratar como éxito
assert(
  isSameMatchAlreadyRegistered(
    { data: { already_registered: true, matchmaking_id: 2065 } },
    { match_id: 2066 }
  ) === false,
  'different match blocked'
);

// buildResultPayload CPU
const payload = buildResultPayload({
  gameData: { isWinner: true, playerName: 'Test', playerScore: 25, opponentScore: 6, opponentName: 'CPU' },
  user: { id: 2 },
  table: { id: 6, entry_price: 10, winner_payout: 18, name: 'Mesa Principiante' },
  gameMode: 'cpu',
  playersRoom: 2,
  currentMatchId: 2067,
  roomCode: null
});
assert(payload.match_id === 2067, 'payload match_id');
assert(payload.tableId === 6, 'payload tableId');
assert(payload.winnerAmount === 18, 'payload winnerAmount');

console.log('✅ gameResultSettlement tests passed');
