// src/store/index.js
import { createStore } from 'vuex'
import auth from './modules/auth'
import games from './modules/games'

export default createStore({
  state: {
    appName: 'Casino Royal',
    version: '1.0.0',
    isLoading: false
  },
  mutations: {
    SET_LOADING(state, value) {
      state.isLoading = value
    }
  },
  actions: {
    // Acciones globales
    setLoading({ commit }, value) {
      commit('SET_LOADING', value)
    }
  },
  modules: {
    auth,
    games
  }
})