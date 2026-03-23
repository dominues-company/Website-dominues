import AuthService from '@/services/auth.service'

export default {
  namespaced: true,
  state: {
    status: { 
      loggedIn: !!localStorage.getItem('auth_token') 
    },
    token: localStorage.getItem('auth_token') || '',
    user: JSON.parse(localStorage.getItem('user')) || null,
  },
  mutations: {
    LOGIN_SUCCESS(state, { token, user }) {
      state.status.loggedIn = true
      state.token = token
      state.user = user
    },
    LOGOUT(state) {
      state.status.loggedIn = false;
      state.token = '';
      state.user = null;
    },
    UPDATE_USER_DATA(state, userData) {
      state.user = { ...state.user, ...userData };      
      localStorage.setItem('user', JSON.stringify(state.user));
    }
  },
  actions: {
    async register({ commit }, userData) {
      try {
        const response = await AuthService.register(userData);
        
        console.log('Respuesta de registro:', response);
        
        commit('LOGIN_SUCCESS', {
            token: response.token,
            user: response.user
          });
        
        // Iniciar tracking de inactividad después del registro
        AuthService.startInactivityTracking({ forceReset: true });
        
        return response;
      } catch (error) {
        console.error('Error en acción de registro:', error);
        throw error;
      }
    },
    async login({ commit }, userData) {
      try {
        const response = await AuthService.login(userData)
        
        if (response && response.token) {
          localStorage.setItem('auth_token', response.token)
          if (response.user) {
            localStorage.setItem('user', JSON.stringify(response.user))
          }
          
          commit('LOGIN_SUCCESS', {
            token: response.token,
            user: response.user
          });
          
          // Iniciar tracking de inactividad después del login
          AuthService.startInactivityTracking({ forceReset: true });
          
          return response
        } else {
          throw new Error('No se recibió un token válido')
        }
      } catch (error) {
        console.error('Error en acción login de Vuex:', error)
        throw error
      }
    },
    async logout({ commit }) {
      try {
        if (AuthService.logout) {
          await AuthService.logout();
        }
      } catch (error) {
        console.error('Error durante el logout en el servidor:', error);
      } finally {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        // Limpiar sessionStorage para que el anuncio del pote se muestre en el próximo login
        sessionStorage.removeItem('pot_announcement_seen');
        commit('LOGOUT');
      }
    },
    updateUserData({ commit }, userData) {
      commit('UPDATE_USER_DATA', userData);
    }
    // Otras acciones...
  },
  getters: {
    isAuthenticated: state => {
      return state.status.loggedIn
    },
    currentUser: state => state.user,
    userName: state => {
      if (!state.user) return '';
      return state.user.name || state.user.email.split('@')[0];
    }
  }
}