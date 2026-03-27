// src/services/api.js
import axios from 'axios';
// import store from '@/store'; // Temporalmente comentado para debug

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'https://xpanelx.dominues.com/public',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

// Interceptor para añadir el token a todas las peticiones
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Agregar device_id y session_id a todas las peticiones autenticadas
    if (token) {
      const deviceId = localStorage.getItem('device_id');
      const sessionId = localStorage.getItem('session_id');
      
      if (deviceId) {
        config.headers['X-Device-ID'] = deviceId;
      }
      if (sessionId) {
        config.headers['X-Session-ID'] = sessionId;
      }
    }
    
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  response => response,
  async error => {
    // Manejar error 409 (Conflict) - sesión duplicada
    if (error.response && error.response.status === 409) {
      console.log('🔐 [API-INTERCEPTOR] Error 409 - Sesión duplicada detectada');
      
      // Disparar evento personalizado para que App.vue lo maneje
      const message = error.response.data?.message || 'Tu sesión ha sido cerrada porque iniciaste sesión en otro dispositivo.';
      window.dispatchEvent(new CustomEvent('session-conflict', { detail: { message } }));
      
      // Limpiar datos de sesión localmente
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      localStorage.removeItem('session_id');
      
      // Redirigir a login después de un breve delay
      setTimeout(() => {
        if (window.location.pathname !== '/login') {
          window.location.href = '/login?reason=session_conflict';
        }
      }, 1000);
      
      return Promise.reject(error);
    }
    
    // Si es error 401 (No autorizado), podría ser un token expirado
    // Temporalmente comentado para debug
    // if (error.response && error.response.status === 401) {
    //   console.log('🔐 [API-INTERCEPTOR] Error 401 detectado, redirigiendo a login');
    //   await store.dispatch('auth/logout');
    //   
    //   if (window.location.pathname !== '/login') {
    //     window.location.href = '/login';
    //   }
    // }
    
    return Promise.reject(error);
  }
);

export default api;