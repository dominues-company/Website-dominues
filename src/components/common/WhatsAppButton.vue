<template>
  <a 
    v-if="shouldShowButton"
    :href="whatsappLink" 
    target="_blank"
    rel="noopener noreferrer"
    class="whatsapp-float"
    aria-label="Contactar por WhatsApp"
    @click="handleClick"
  >
    <i class="fab fa-whatsapp whatsapp-icon"></i>
    <span class="whatsapp-badge">Recarga</span>
    <span class="whatsapp-tooltip">Recarga tu saldo y obtén soporte</span>
  </a>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'WhatsAppButton',
  data() {
    return {
      phoneNumber: '584243447604' // Número sin espacios ni caracteres especiales: +58 424-3447604
    }
  },
  computed: {
    ...mapGetters('auth', ['currentUser', 'isAuthenticated']),
    
    shouldShowButton() {
      // Solo mostrar si está autenticado Y no está en página de juego
      if (!this.isAuthenticated) return false;
      
      // Ocultar en páginas de juego (waiting-room)
      const currentPath = this.$route?.path || '';
      if (currentPath.includes('/waiting-room')) return false;
      
      return true;
    },
    
    userName() {
      // Obtener el nombre del usuario logueado, o 'Invitado' si no está logueado
      if (this.isAuthenticated && this.currentUser && this.currentUser.name) {
        return this.currentUser.name;
      }
      return 'Invitado';
    },
    
    whatsappMessage() {
      // Mensaje personalizado con el nombre del usuario
      return `Hola, Equipo de Dominues. Quisiera información para recargar saldo en mi cuenta y empezar a jugar.\nMi usuario es: ${this.userName}`;
    },
    
    whatsappLink() {
      // Crear enlace de WhatsApp con mensaje personalizado
      const encodedMessage = encodeURIComponent(this.whatsappMessage);
      return `https://wa.me/${this.phoneNumber}?text=${encodedMessage}`;
    }
  },
  methods: {
    handleClick() {
      console.log('📱 [WHATSAPP] Abriendo chat de WhatsApp con soporte');
      console.log('Usuario:', this.userName);
    }
  }
}
</script>

<style scoped>
.whatsapp-float {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-color: #25D366;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
  z-index: 9998;
  transition: all 0.3s ease;
  text-decoration: none;
  cursor: pointer;
}

.whatsapp-float:hover {
  background-color: #20BA5A;
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(37, 211, 102, 0.6);
}

.whatsapp-float:active {
  transform: scale(1.05);
}

.whatsapp-icon {
  animation: pulse 2s infinite;
}

.whatsapp-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #FF4444;
  color: white;
  font-size: 10px;
  font-weight: bold;
  padding: 3px 6px;
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  font-family: Arial, sans-serif;
  animation: badgePulse 2s infinite;
}

.whatsapp-tooltip {
  position: absolute;
  right: 70px;
  background-color: #fff;
  color: #333;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  font-family: Arial, sans-serif;
}

.whatsapp-tooltip::after {
  content: '';
  position: absolute;
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  border-left: 6px solid #fff;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
}

.whatsapp-float:hover .whatsapp-tooltip {
  opacity: 1;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@keyframes badgePulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.15);
    opacity: 0.8;
  }
}

/* Responsive - ajustar posición en móviles */
@media (max-width: 768px) {
  .whatsapp-float {
    width: 55px;
    height: 55px;
    font-size: 28px;
    bottom: 15px;
    right: 15px;
  }
  
  .whatsapp-badge {
    font-size: 9px;
    padding: 2px 5px;
  }
  
  .whatsapp-tooltip {
    display: none; /* Ocultar tooltip en móviles para no molestar */
  }
}

/* Evitar conflicto con otros elementos flotantes */
@media (max-width: 480px) {
  .whatsapp-float {
    bottom: 80px; /* Subir un poco si hay otros botones flotantes */
  }
}
</style>
