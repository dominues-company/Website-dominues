import api from './api';
import store from '@/store'; 

class AuthService {
  constructor() {
    this.sessionCheckInterval = null;
    this.SESSION_CHECK_FREQUENCY = 5 * 60 * 1000; 
    this.inactivityCheckInterval = null;
    this.INACTIVITY_TIMEOUT = 60 * 60 * 1000; // 1 hora en milisegundos
    this.lastActivityTime = Date.now();
    this.activityListenersAdded = false;
    this.storageListenerAdded = false;
    this.LAST_ACTIVITY_STORAGE_KEY = 'last_activity_timestamp';
    this.visibilityChangeHandler = this.handleVisibilityChange.bind(this);
    this.storageEventHandler = this.handleStorageEvent.bind(this);
  }

  initializeAuth() {
    
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user');
    
    if (token && store) {      
      store.commit('auth/LOGIN_SUCCESS', {
        token,
        user: userData ? JSON.parse(userData) : null
      });
      
      this.startSessionCheck();
      this.startInactivityTracking();
    }
    
    return true;
  }

  async register(userData) {
    try {
      const response = await api.post('/api/register_api', userData);
      return response.data;

    } catch (error) {    
      if (error.response && error.response.status === 422) {        
        const validationErrors = error.response.data.errors || {};
        const errorMessages = Object.values(validationErrors)
          .flat()
          .join(', ');
        
        error.message = `Errores de validación: ${errorMessages}`;
      }
    }
  }

  async login(userData) {
  try {
    if (!userData.email || !userData.password) {
      throw new Error('Email y contraseña son obligatorios');
    }
    
    const requestData = {
      email: userData.email,
      password: userData.password
    };
    
    if (userData.remember !== undefined) {
      requestData.remember = userData.remember;
    }
    
    const response = await api.post('/api/login_api', requestData);
    
    return response.data;
  } catch (error) {
    //console.error('Error en AuthService.login:', error);
    
    if (error.response && error.response.status === 422) {
      //console.error('Errores de validación:', error.response.data);
      
      const validationErrors = error.response.data.errors || {};
      const errorMessages = Object.values(validationErrors)
        .flat()
        .join(', ');
      
      error.message = `Errores de validación: ${errorMessages}`;
    }
    
    throw error;
  }
}

  async logout() {
    try {
      if (localStorage.getItem('auth_token')) {
        await api.post('/api/logout');
      }
    } catch (error) {
      console.error('Error en el logout:', error);
      throw error;
    } finally {
      // Detener tracking de inactividad al cerrar sesión
      this.stopInactivityTracking();
      localStorage.removeItem(this.LAST_ACTIVITY_STORAGE_KEY);
    }
  }

  startSessionCheck() {
    if (this.sessionCheckInterval) {
      clearInterval(this.sessionCheckInterval);
    }
    
    this.sessionCheckInterval = setInterval(() => {
      this.checkSession();
    }, this.SESSION_CHECK_FREQUENCY);
    
    this.checkSession();
  }

  stopSessionCheck() {
    if (this.sessionCheckInterval) {
      clearInterval(this.sessionCheckInterval);
      this.sessionCheckInterval = null;
    }
  }

  async checkSession() {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      this.stopSessionCheck();
      return;
    }
    
    try {
      const response = await api.get('/api/user');
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        
        if (store) {
          store.commit('auth/UPDATE_USER_DATA', response.data);
        }
        
        window.dispatchEvent(new CustomEvent('valid-session'));
      }
    } catch (error) {
      console.error('Error al verificar sesión:', error);
      
      if (error.response && error.response.status === 401) {
        this.handleInvalidSession();
      }
    }
  }

  handleInvalidSession() {
    console.log('Sesión inválida detectada');
    
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    localStorage.removeItem(this.LAST_ACTIVITY_STORAGE_KEY);
    
    this.stopSessionCheck();
    this.stopInactivityTracking();
    
    if (store) {
      store.commit('auth/LOGOUT');
    }
    
    window.dispatchEvent(new CustomEvent('invalid-session'));
    
    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  }

  isAuthenticated() {
    return !!localStorage.getItem('auth_token');
  }

  getCurrentUser() {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  getToken() {
    return localStorage.getItem('auth_token');
  }

  // Método para actualizar la última actividad
  updateLastActivity() {
    this.lastActivityTime = Date.now();
    this.persistLastActivity(this.lastActivityTime);
    console.log('🕐 [INACTIVITY] Actividad del usuario actualizada');
  }

  // Método para verificar si el usuario está inactivo
  checkInactivity() {
    const storedLastActivity = this.getStoredLastActivity();
    if (storedLastActivity) {
      this.lastActivityTime = storedLastActivity;
    }

    const timeSinceLastActivity = Date.now() - this.lastActivityTime;
    
    if (timeSinceLastActivity > this.INACTIVITY_TIMEOUT) {
      console.log('⏰ [INACTIVITY] Usuario inactivo por más de 1 hora, cerrando sesión');
      this.handleInvalidSession();
    }
  }

  // Método para iniciar el tracking de inactividad
  startInactivityTracking({ forceReset = false } = {}) {
    // Limpiar interval anterior si existe
    this.stopInactivityTracking();

    let lastActivityTimestamp = null;

    if (!forceReset) {
      lastActivityTimestamp = this.getStoredLastActivity();
    }

    if (!lastActivityTimestamp) {
      lastActivityTimestamp = Date.now();
      this.persistLastActivity(lastActivityTimestamp);
    }

    this.lastActivityTime = lastActivityTimestamp;
    
    // Verificar inactividad cada minuto
    this.inactivityCheckInterval = setInterval(() => {
      this.checkInactivity();
    }, 60 * 1000); // Verificar cada minuto
    
    // Agregar listeners de eventos de usuario si no se han agregado
    if (!this.activityListenersAdded) {
      this.addActivityListeners();
      this.activityListenersAdded = true;
    }
    this.addStorageListener();

    console.log('🕐 [INACTIVITY] Tracking de inactividad iniciado');
    this.checkInactivity();
  }

  // Método para detener el tracking de inactividad
  stopInactivityTracking() {
    if (this.inactivityCheckInterval) {
      clearInterval(this.inactivityCheckInterval);
      this.inactivityCheckInterval = null;
    }
    
    this.removeActivityListeners();
    this.removeStorageListener();
    console.log('🕐 [INACTIVITY] Tracking de inactividad detenido');
  }

  // Método para agregar listeners de eventos de usuario
  addActivityListeners() {
    // Lista de eventos que indican actividad del usuario
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    // Throttle para no actualizar demasiado frecuentemente
    const throttledUpdate = this.throttle(() => this.updateLastActivity(), 30000); // Actualizar como mucho cada 30 segundos
    
    events.forEach(event => {
      document.addEventListener(event, throttledUpdate, true);
    });
    
    document.addEventListener('visibilitychange', this.visibilityChangeHandler, true);
    
    // Guardar referencia a la función throttled para poder removerla
    this.throttledUpdate = throttledUpdate;
  }

  // Método para remover listeners de eventos de usuario
  removeActivityListeners() {
    if (this.throttledUpdate) {
      const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
      
      events.forEach(event => {
        document.removeEventListener(event, this.throttledUpdate, true);
      });
      
      document.removeEventListener('visibilitychange', this.visibilityChangeHandler, true);
      
      this.throttledUpdate = null;
      this.activityListenersAdded = false;
    }
  }

  // Función helper para throttle
  throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    
    return function(...args) {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func(...args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func(...args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }

  persistLastActivity(timestamp) {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem(this.LAST_ACTIVITY_STORAGE_KEY, String(timestamp));
      } catch (error) {
        console.warn('No se pudo almacenar el timestamp de actividad:', error);
      }
    }
  }

  getStoredLastActivity() {
    if (typeof window === 'undefined' || !window.localStorage) {
      return null;
    }

    const storedValue = localStorage.getItem(this.LAST_ACTIVITY_STORAGE_KEY);
    if (!storedValue) {
      return null;
    }

    const parsed = parseInt(storedValue, 10);
    return Number.isNaN(parsed) ? null : parsed;
  }

  handleVisibilityChange() {
    if (document.visibilityState === 'visible') {
      this.checkInactivity();
    }
  }

  addStorageListener() {
    if (!this.storageListenerAdded) {
      window.addEventListener('storage', this.storageEventHandler);
      this.storageListenerAdded = true;
    }
  }

  removeStorageListener() {
    if (this.storageListenerAdded) {
      window.removeEventListener('storage', this.storageEventHandler);
      this.storageListenerAdded = false;
    }
  }

  handleStorageEvent(event) {
    if (event.key === this.LAST_ACTIVITY_STORAGE_KEY && event.newValue) {
      const parsed = parseInt(event.newValue, 10);
      if (!Number.isNaN(parsed)) {
        this.lastActivityTime = parsed;
      }
    }
  }
}

export default new AuthService();