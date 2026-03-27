// src/services/api-game.js
import axios from 'axios';
import store from '@/store';

const apiGame = axios.create({
  // baseURL: 'https://xpanelx.dominues.com/public', // Producción
  baseURL: 'http://192.168.1.105:3010', // Desarrollo local
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

// Interceptor para añadir el token a todas las peticiones
apiGame.interceptors.request.use(
  config => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
apiGame.interceptors.response.use(
  response => response,
  async error => {
    // Si es error 401 (No autorizado), podría ser un token expirado
    if (error.response && error.response.status === 401) {
      await store.dispatch('auth/logout');
      
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiGame;
