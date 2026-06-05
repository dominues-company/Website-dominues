// Configuración del juego de dominó
export const GAME_CONFIG = {
  // URLs
  GAME_URL: 'https://kubgame.dominues.com/',
  // GAME_URL: 'http://localhost:3030',
  API_BASE_URL: 'https://xpanelx.dominues.com/public/api',
  // API_BASE_URL: 'http://192.168.1.105:3010/api',
  DASHBOARD_URL: 'https://dominues.com/dashboard',
  // DASHBOARD_URL: 'http://localhost:8080/dashboard', // Solo para desarrollo local
  
  // Configuración de apuestas
  DEFAULT_BET_AMOUNT: 100,
  HOUSE_FEE_PERCENTAGE: 0.05, // 5%
  
  // Configuración del juego
  DEFAULT_PLAYERS: 2,
  DEFAULT_GAME_TYPE: 'draw',
  DEFAULT_POINTS: 10,
  
  // Configuración de redirección
  REDIRECT_DELAY: 3000, // 3 segundos por defecto
  REDIRECT_DELAY_WIN: 8000, // 8 segundos para ganadores (5 segundos extra con confeti)

  // Reintentos al guardar resultado en el API
  RESULT_SAVE_MAX_ATTEMPTS: 5,
  RESULT_SAVE_RETRY_BASE_DELAY_MS: 1500,
  RESULT_SAVE_PENDING_KEY: 'dominues_pending_game_result',
  
  // Mensajes
  MESSAGES: {
    WIN: '¡Estás encendido! 🔥',
    WIN_SUBTITLE: '¿Te anotas en la siguiente?',
    LOSE: '¡Casi lo logras! 🀄',
    LOSE_SUBTITLE: 'La revancha te espera. ¿Otra partida?',
    REDIRECTING: 'Volviendo a elegir mesa en 3 segundos...',
    REDIRECTING_WIN: 'Volviendo a elegir mesa en 8 segundos...',
    ERROR: 'No pudimos completar la partida',
    RESULT_SAVE_ERROR_TITLE: 'No pudimos confirmar la partida',
    RESULT_SAVE_ERROR_WIN: 'Ganaste la mesa. Revisa tu saldo en unos minutos; si no ves el premio, contacta a soporte.',
    RESULT_SAVE_ERROR_LOSE: 'Hubo un problema al cerrar la partida. Si algo no cuadra en tu saldo, contacta a soporte.',
    RESULT_SAVE_ERROR_HINT: 'Indica la hora de la partida y el código de sala, si lo recuerdas.',
    RESULT_SAVE_ERROR_REDIRECT: 'Te llevamos a elegir otra mesa en unos segundos...',
    RESULT_ALREADY_REGISTERED: 'La partida ya fue registrada.'
  }
};

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** No reintentar errores de autenticación (no se arreglan solos). */
export function shouldRetryGameResultSave(httpStatus) {
  if (httpStatus === 401 || httpStatus === 403) return false;
  return true;
}

// Función para calcular montos de apuesta
export function calculateBetAmounts(betAmount, isWinner, winnerPayout = null) {
  // Si se proporciona winnerPayout específico de la mesa, usarlo
  if (winnerPayout) {
    const totalPot = betAmount * 2; // Jugador + Casa
    const houseFee = totalPot - winnerPayout;
    
    return {
      betAmount,
      totalPot,
      houseFee,
      winnerAmount: isWinner ? winnerPayout : 0
    };
  }
  
  // Cálculo por defecto
  const totalPot = betAmount * 2; // Jugador + Casa
  const houseFee = totalPot * GAME_CONFIG.HOUSE_FEE_PERCENTAGE;
  const winnerAmount = isWinner ? totalPot - houseFee : 0;
  
  return {
    betAmount,
    totalPot,
    houseFee,
    winnerAmount
  };
}

// Función para obtener datos del usuario
export function getUserData(store, localStorage) {
  let user = null;
  
  // Intentar obtener desde Vuex store
  if (store && store.state && store.state.user) {
    user = store.state.user;
    console.log('Usuario obtenido desde store:', user);
  }
  
  // Intentar obtener desde localStorage
  if (!user && localStorage) {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        user = JSON.parse(storedUser);
        console.log('Usuario obtenido desde localStorage:', user);
      }
    } catch (e) {
      console.error('Error parsing stored user:', e);
    }
  }
  
  // Intentar obtener token desde localStorage directamente
  if ((!user || !user.token) && localStorage) {
    const token = localStorage.getItem('token') || localStorage.getItem('auth_token');
    if (token) {
      user = user || {};
      user.token = token;
      console.log('Token obtenido desde localStorage:', token);
    }
  }
  
  // Fallback para desarrollo
  if (!user) {
    user = {
      id: 1,
      name: 'Jugador',
      token: 'dev-token'
    };
    console.log('Usando datos de fallback:', user);
  }
  
  console.log('Datos de usuario finales:', user);
  return user;
}

// Función para obtener ID de mesa
export function getTableId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('tableId') || 1;
}

export function buildWaitingRoomUrl(tableId) {
  const id = tableId != null && tableId !== '' ? String(tableId) : '1';
  const origin = typeof window !== 'undefined' && window.location?.origin
    ? window.location.origin
    : 'https://dominues.com';
  return `${origin}/waiting-room/${id}?_nocache=${Date.now()}`;
}
