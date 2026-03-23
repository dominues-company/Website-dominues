import api from '@/services/api'

const SUCCESSFUL_TRANSACTION_STATUSES = ['success', 'successful', 'completed', 'approved', 'joined']

const parseNumber = (value) => {
  if (value === null || value === undefined || value === '') return null
  const parsed = parseFloat(value)
  return Number.isNaN(parsed) ? null : parsed
}

const extractBalance = (payload = {}) => {
  const candidates = [
    payload.new_balance,
    payload.balance,
    payload.current_balance,
    payload?.player?.balance,
    payload?.data?.new_balance,
    payload?.data?.balance
  ]

  for (const candidate of candidates) {
    const parsed = parseNumber(candidate)
    if (parsed !== null) {
      return parsed
    }
  }
  return null
}

const isBackendSuccess = (payload = {}, statusCode = 0) => {
  if (!payload) return false
  if (payload.success === true) return true
  if (typeof payload.status === 'string' && SUCCESSFUL_TRANSACTION_STATUSES.includes(payload.status.toLowerCase())) {
    return true
  }
  if (payload?.data?.success === true) return true
  if (payload?.transaction_status && SUCCESSFUL_TRANSACTION_STATUSES.includes(payload.transaction_status.toLowerCase())) {
    return true
  }
  if (statusCode >= 200 && statusCode < 300 && typeof payload === 'object') {
    return true
  }
  return false
}

const wasBalanceDeducted = (payload = {}, entryPrice = 0) => {
  const normalizedEntry = parseNumber(entryPrice) || 0
  if (normalizedEntry <= 0) {
    // Juegos gratuitos no requieren verificación de saldo
    return true
  }

  if (payload.balance_deducted === true || payload?.data?.balance_deducted === true) {
    return true
  }

  if (payload.payment_status && SUCCESSFUL_TRANSACTION_STATUSES.includes(payload.payment_status.toLowerCase())) {
    return true
  }

  if (payload.transaction_status && SUCCESSFUL_TRANSACTION_STATUSES.includes(payload.transaction_status.toLowerCase())) {
    return true
  }

  if (typeof payload.new_balance !== 'undefined' ||
      typeof payload.balance !== 'undefined' ||
      typeof payload.current_balance !== 'undefined' ||
      typeof payload?.player?.balance !== 'undefined' ||
      typeof payload?.data?.new_balance !== 'undefined' ||
      typeof payload?.data?.balance !== 'undefined') {
    return true
  }

  return false
}

export default {
  namespaced: true,
  state: {
    games: [],
    userBalance: 0,
    loading: false,
    socketConnected: false
  },
  mutations: {
    SET_GAMES(state, games) {
      state.games = games
    },
    UPDATE_GAME(state, updatedGame) {
      const index = state.games.findIndex(game => game.id === updatedGame.id)
      if (index !== -1) {
        state.games.splice(index, 1, updatedGame)
      } else {
        state.games.push(updatedGame)
      }
    },
    SET_USER_BALANCE(state, balance) {
      state.userBalance = balance
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_SOCKET_CONNECTED(state, connected) {
      state.socketConnected = connected
    }
  },
  actions: {

    // Función para GameSection (dashboard) - usa /api/games
    async fetchGames({ commit }) {
      try {
        commit('SET_LOADING', true)
        
        // Llamar al endpoint de games para el dashboard
        console.log('🔍 [STORE-DASHBOARD] Llamando a /api/games...')
        const response = await api.get('/api/games')
        
        console.log('📡 [STORE-DASHBOARD] Respuesta completa del backend:', response)
        console.log('📡 [STORE-DASHBOARD] response.data:', response.data)
        
        let games = []
        if (Array.isArray(response.data)) {
          games = response.data
          console.log('📡 [STORE-DASHBOARD] Datos como array directo:', games)
        } else if (Array.isArray(response.data.data)) {
          games = response.data.data
          console.log('📡 [STORE-DASHBOARD] Datos en response.data.data:', games)
        } else if (response.data.games && Array.isArray(response.data.games)) {
          games = response.data.games
          console.log('📡 [STORE-DASHBOARD] Datos en response.data.games:', games)
        } else {
          console.log('⚠️ [STORE-DASHBOARD] Estructura de datos no reconocida:', response.data)
        }
        
        console.log('✅ [STORE-DASHBOARD] Juegos finales procesados:', games)
        commit('SET_GAMES', games)
      } catch (error) {
        console.error('❌ [STORE-DASHBOARD] Error al obtener juegos:', error)
        console.error('❌ [STORE-DASHBOARD] Error response:', error.response)
        console.error('❌ [STORE-DASHBOARD] Error message:', error.message)
        commit('SET_GAMES', [])
      } finally {
        commit('SET_LOADING', false)
      }
    },

    // Función para WaitingRoom - usa /api/tables
    async fetchTables({ commit }) {
      try {
        commit('SET_LOADING', true)
        
        // Llamar al endpoint de tables para el waiting room
        console.log('🔍 [STORE-WAITING] Llamando a /api/tables...')
        const response = await api.get('/api/tables')
        
        console.log('📡 [STORE-WAITING] Respuesta completa del backend:', response)
        console.log('📡 [STORE-WAITING] response.data:', response.data)
        console.log('📡 [STORE-WAITING] response.status:', response.status)
        console.log('📡 [STORE-WAITING] response.headers:', response.headers)
        
        let games = []
        if (Array.isArray(response.data)) {
          games = response.data
          console.log('📡 [STORE-WAITING] Datos como array directo:', games)
        } else if (Array.isArray(response.data.data)) {
          games = response.data.data
          console.log('📡 [STORE-WAITING] Datos en response.data.data:', games)
        } else if (response.data.tables && Array.isArray(response.data.tables)) {
          games = response.data.tables
          console.log('📡 [STORE-WAITING] Datos en response.data.tables:', games)
        } else {
          console.log('⚠️ [STORE-WAITING] Estructura de datos no reconocida:', response.data)
        }
        
        console.log('✅ [STORE-WAITING] Juegos finales procesados:', games)
        commit('SET_GAMES', games)
      } catch (error) {
        console.error('❌ [STORE-WAITING] Error al obtener juegos:', error)
        console.error('❌ [STORE-WAITING] Error response:', error.response)
        console.error('❌ [STORE-WAITING] Error message:', error.message)
        commit('SET_GAMES', [])
      } finally {
        commit('SET_LOADING', false)
      }
    },

    // Acción para unirse a una mesa
    async joinTable({ commit, state }, { tableId, entryPrice }) {
      try {
        console.log('🔄 [STORE] Uniéndose a mesa:', { tableId, entryPrice });
        
        const response = await api.post(`/api/tables/${tableId}/join`, {
          entry_price: entryPrice
        });

        const payload = response.data || {}
        const backendOk = isBackendSuccess(payload, response.status)
        const balanceDeducted = wasBalanceDeducted(payload, entryPrice)

        console.log('✅ [STORE] Respuesta de join table:', payload, {
          backendOk,
          balanceDeducted
        });

        // Actualizar saldo del usuario si se proporciona
        const detectedBalance = extractBalance(payload)
        if (detectedBalance !== null) {
          const oldBalance = state.userBalance || 0
          commit('SET_USER_BALANCE', detectedBalance)

          if (typeof window !== 'undefined' && window.dispatchEvent) {
            window.dispatchEvent(new CustomEvent('balance-updated', {
              detail: {
                oldBalance,
                newBalance: detectedBalance,
                difference: detectedBalance - oldBalance,
                message: `Balance actualizado: ${oldBalance} → ${detectedBalance}`
              }
            }))
          }
        } else {
          console.warn('⚠️ [STORE] No se pudo extraer el nuevo balance del payload:', payload)
        }

        if (!backendOk) {
          return {
            success: false,
            balanceDeducted,
            data: payload,
            message: payload?.message || 'El backend no confirmó la unión a la mesa'
          }
        }

        if (!balanceDeducted) {
          console.warn('⚠️ [STORE] Unión a mesa sin confirmación de descuento. Abortando inicio del juego.')
          return {
            success: false,
            balanceDeducted: false,
            data: payload,
            message: 'No se pudo confirmar el descuento del saldo. La partida no se iniciará.'
          }
        }

        return {
          success: true,
          balanceDeducted: true,
          data: payload,
          message: 'Unido exitosamente a la mesa'
        };
        
      } catch (error) {
        console.error('❌ [STORE] Error al unirse a mesa:', error);
        return {
          success: false,
          message: error.response?.data?.message || 'Error al unirse a la mesa'
        };
      }
    },

    async fetchUserBalance({ commit }) {
      try {
        const response = await api.get('/api/user/balance')
        let balance = 0
        if (typeof response.data.balance !== 'undefined') {
          balance = parseFloat(response.data.balance)
        } else if (typeof response.data === 'number') {
          balance = response.data
        } else if (response.data.data && typeof response.data.data.balance !== 'undefined') {
          balance = parseFloat(response.data.data.balance)
        }
        commit('SET_USER_BALANCE', balance)
      } catch (error) {
        console.error('Error al obtener balance:', error)
        commit('SET_USER_BALANCE', 0)
      }
    },

    async joinGame({ state }, { gameId, entryFee }) {
      try {
        // Verificar si el usuario tiene suficiente balance
        if (state.userBalance < entryFee) {
          throw new Error('Saldo insuficiente para unirse a este juego')
        }

        const response = await api.post(`/api/tables/${gameId}/join`)
        return response.data
      } catch (error) {
        console.error('Error al unirse al juego:', error)
        throw error
      }
    },

    // Inicializar conexión de Socket.IO
    initSocketConnection() {
      // Eliminada la lógica de Socket.IO, ahora solo se usa Pusher/Echo
      return Promise.resolve();
    },

    // Desconectar Socket.IO
    disconnectSocket() {
      // Eliminada la lógica de Socket.IO
      return Promise.resolve();
    }
  },
  getters: {
    availableGames: state => {
      if (!state.games || !state.games.length) return []
      if (state.games[0].status) {
        return state.games.filter(game => game.status === 'open' || game.status === 'activo')
      }
      return state.games
    },
    getGameById: state => (gameId) => {
      if (!state.games || !state.games.length) return null
      return state.games.find(game => game.id == gameId)
    },
    canJoinGame: state => (entryFee) => {
      return state.userBalance >= entryFee
    },
    isSocketConnected: state => state.socketConnected,
    userBalance: state => state.userBalance
  }
} 