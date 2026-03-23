// Configuración de integración de juegos

export const GAME_CONFIG = {
  // URL base del servidor de juegos
  GAME_BASE_URL: process.env.VUE_APP_GAME_URL || 'http://localhost:3490',
  
  // Configuración específica por ambiente
  development: {
    GAME_BASE_URL: 'http://localhost:3490',
    SOCKET_URL: 'http://localhost:3000',
    DEBUG: true
  },
  
  production: {
    GAME_BASE_URL: 'https://tu-dominio.com/games',
    SOCKET_URL: 'https://tu-dominio.com:3000',
    DEBUG: false
  },
  
  // Tipos de juegos disponibles
  GAME_TYPES: {
    DOMINO: 'domino',
    TIC_TAC_TOE: 'tictactoe',
    CONNECT_FOUR: 'connectfour',
    REVERSI: 'playreversi',
    CHECKERS: 'playcheckers',
    CHESS: 'playchess',
    BINGO: 'bingo',
    SNAKE_LADDER: 'snakeladder'
  },
  
  // Configuración de CPU
  CPU_DIFFICULTY: {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard'
  },
  
  // Configuración de mesas
  TABLE_CONFIG: {
    // Mapeo de tipos de mesa del backend a tipos de juego
    gameTypeMapping: {
      'casino_domino': 'domino',
      'casino_tictactoe': 'tictactoe',
      'casino_cards': 'cardsgame'
      // Agregar más mapeos según tus tipos de mesa
    },
    
    // Configuración por defecto
    defaultGameType: 'domino'
  }
};

// Función para obtener la URL del juego
export function getGameUrl(gameType = 'domino', gameMode = 'multiplayer', params = {}) {
  const config = GAME_CONFIG[process.env.NODE_ENV] || GAME_CONFIG.development;
  
  const searchParams = new URLSearchParams({
    gameMode: gameMode,
    vueIntegration: 'true',
    gameType: gameType,
    vueApiUrl: window.location.origin,
    ...params
  });
  
  return `${config.GAME_BASE_URL}/multiplayer/?${searchParams.toString()}`;
}

// Función para mapear tipo de mesa a tipo de juego
export function getGameTypeFromTable(table) {
  const gameType = table.game_type || table.type;
  return GAME_CONFIG.TABLE_CONFIG.gameTypeMapping[gameType] || GAME_CONFIG.TABLE_CONFIG.defaultGameType;
}

// Función para verificar si el servidor de juegos está disponible
export async function checkGameServerStatus() {
  try {
    const config = GAME_CONFIG[process.env.NODE_ENV] || GAME_CONFIG.development;
    await fetch(`${config.GAME_BASE_URL}/health`, { 
      method: 'GET',
      mode: 'no-cors' // Para evitar problemas de CORS en desarrollo
    });
    return true;
  } catch (error) {
    console.warn('Servidor de juegos no disponible:', error);
    return false;
  }
}

export default GAME_CONFIG;
