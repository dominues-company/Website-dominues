<template>
  <div id="app" :class="{ 'app--game-focus': hideLayout }">
    <NavbarComponent v-if="!hideLayout" />
    <router-view />
    <FooterComponent v-if="!hideLayout" />
    <NotificationToast />
    <BackgroundMusic />
    <WhatsAppButton v-if="$route.name === 'RechargeView'" />
    
    <!-- Notificación de sesión expirada (opcional) -->
    <div v-if="showSessionExpiredAlert" class="session-expired-alert">
      <div class="alert-content">
        <p><i class="fas fa-exclamation-triangle"></i> {{ sessionAlertMessage }}</p>
        <button @click="closeSessionAlert" class="alert-close"><i class="fas fa-times"></i></button>
      </div>
    </div>
    
    <!-- Notificación de conflicto de sesión -->
    <div v-if="showSessionConflictAlert" class="session-conflict-alert">
      <div class="alert-content">
        <p><i class="fas fa-user-lock"></i> {{ sessionConflictMessage }}</p>
        <button @click="closeSessionConflictAlert" class="alert-close"><i class="fas fa-times"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarComponent from '@/components/layout/NavbarComponent.vue';
import FooterComponent from '@/components/layout/FooterComponent.vue';
import NotificationToast from '@/components/common/NotificationToast.vue';
import BackgroundMusic from '@/components/common/BackgroundMusic.vue';
import WhatsAppButton from '@/components/common/WhatsAppButton.vue';
import AuthService from '@/services/auth.service';

export default {
  name: 'App',
  components: {
    NavbarComponent,
    FooterComponent,
    NotificationToast,
    BackgroundMusic,
    WhatsAppButton
  },
  data() {
    return {
      showSessionExpiredAlert: false,
      sessionAlertMessage: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
      showSessionConflictAlert: false,
      sessionConflictMessage: 'Tu sesión ha sido cerrada porque iniciaste sesión en otro dispositivo.'
    }
  },
  computed: {
    hideLayout() {
      const routeHidesLayout = this.$route.matched.some(record => record.meta.hideLayout);
      if (!routeHidesLayout) return false;

      if (this.$route.name === 'WaitingRoomPage') {
        return this.$store.getters['games/waitingRoomGameActive'];
      }

      return true;
    }
  },
  created() {
    // Asegurar que el método existe antes de llamarlo
    if (typeof AuthService.initializeAuth === 'function') {
      // Inicializar autenticación
      AuthService.initializeAuth();
    } else {
      console.error('El método initializeAuth no está definido en AuthService');
    }
    
    // Escuchar eventos de sesión
    window.addEventListener('invalid-session', this.handleInvalidSession);
    window.addEventListener('valid-session', this.handleValidSession);
    window.addEventListener('session-conflict', this.handleSessionConflict);
    window.addEventListener('app-refresh-data', this.refreshLiveData);
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    window.addEventListener('pageshow', this.handlePageShow);
  },
  methods: {
    refreshLiveData() {
      if (!this.$store.getters['auth/isAuthenticated']) {
        return;
      }

      this.$store.dispatch('games/fetchGames');
      this.$store.dispatch('games/fetchUserBalance');
    },
    handleVisibilityChange() {
      if (document.visibilityState === 'visible') {
        AuthService.refreshLiveData();
      }
    },
    handlePageShow(event) {
      if (event.persisted) {
        AuthService.refreshLiveData();
      }
    },
    handleInvalidSession() {
      this.sessionAlertMessage = 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.';
      this.showSessionExpiredAlert = true;
    },
    handleValidSession() {
      this.refreshLiveData();
    },
    handleSessionConflict(event) {
      // Manejar conflicto de sesión (otra sesión activa)
      const message = event.detail?.message || 'Tu sesión ha sido cerrada porque iniciaste sesión en otro dispositivo.';
      this.sessionConflictMessage = message;
      this.showSessionConflictAlert = true;
      
      // Auto-cerrar después de 5 segundos
      setTimeout(() => {
        this.closeSessionConflictAlert();
      }, 5000);
    },
    closeSessionAlert() {
      this.showSessionExpiredAlert = false;
    },
    closeSessionConflictAlert() {
      this.showSessionConflictAlert = false;
    }
  },
  beforeUnmount() {
    // Limpiar event listeners
    window.removeEventListener('invalid-session', this.handleInvalidSession);
    window.removeEventListener('valid-session', this.handleValidSession);
    window.removeEventListener('session-conflict', this.handleSessionConflict);
    window.removeEventListener('app-refresh-data', this.refreshLiveData);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    window.removeEventListener('pageshow', this.handlePageShow);
  }
}
</script>

<style>
#app.app--game-focus {
  min-height: 100vh;
  min-height: 100dvh;
}

.session-expired-alert,
.session-conflict-alert {
  position: fixed;
  bottom: 90px; /* Ajustado para no sobreponerse al botón de WhatsApp */
  right: 20px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
  padding: 0;
  z-index: 9999;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  animation: slideIn 0.3s ease-out;
  max-width: 400px;
}

.session-conflict-alert {
  background-color: #fff3cd;
  color: #856404;
  border-color: #ffeaa7;
}

.cube{
  font-size: 23px;
}

.alert-content {
  display: flex;
  align-items: center;
  padding: 12px 20px;
}

.alert-content p {
  margin: 0;
  font-size: 14px;
}

.alert-content i {
  margin-right: 10px;
}

.alert-close {
  background: none;
  border: none;
  color: #721c24;
  padding: 0 10px;
  cursor: pointer;
  font-size: 16px;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>