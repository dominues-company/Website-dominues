<template>
  <a 
    v-if="shouldShowButton"
    :href="whatsappLink" 
    target="_blank"
    rel="noopener noreferrer"
    class="whatsapp-float"
    aria-label="Reportar pago por WhatsApp"
    @click="handleClick"
  >
    <span class="whatsapp-label">Reportar pago</span>
    <i class="fab fa-whatsapp whatsapp-icon" aria-hidden="true"></i>
    <span class="whatsapp-tooltip">Abre WhatsApp para enviar tu comprobante o consultar</span>
  </a>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  RECHARGE_WHATSAPP_PHONE,
  WHATSAPP_FLOAT_GREETING
} from '@/utils/rechargeWhatsApp';

export default {
  name: 'WhatsAppButton',
  data() {
    return {
      phoneNumber: RECHARGE_WHATSAPP_PHONE
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
      return WHATSAPP_FLOAT_GREETING;
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
  z-index: 9998;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding: 10px 14px 10px 18px;
  min-height: 52px;
  background-color: #25d366;
  color: #fff;
  border-radius: 999px;
  box-shadow: 0 4px 16px rgba(37, 211, 102, 0.45), 0 2px 6px rgba(0, 0, 0, 0.12);
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.2s ease;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}

.whatsapp-float:hover {
  background-color: #20ba5a;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(37, 211, 102, 0.5), 0 4px 8px rgba(0, 0, 0, 0.15);
}

.whatsapp-float:active {
  transform: translateY(0);
}

.whatsapp-label {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.01em;
  white-space: nowrap;
  line-height: 1.2;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.08);
}

.whatsapp-icon {
  font-size: 28px;
  flex-shrink: 0;
  line-height: 1;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.15));
}

.whatsapp-tooltip {
  position: absolute;
  right: calc(100% + 12px);
  top: 50%;
  transform: translateY(-50%);
  background-color: #fff;
  color: #333;
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
  max-width: 220px;
  white-space: normal;
  line-height: 1.35;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
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

/* Responsive - ajustar posición en móviles */
@media (max-width: 768px) {
  .whatsapp-float {
    bottom: 15px;
    right: 15px;
    padding: 9px 12px 9px 16px;
    gap: 8px;
    min-height: 48px;
  }

  .whatsapp-label {
    font-size: 13px;
  }

  .whatsapp-icon {
    font-size: 26px;
  }

  .whatsapp-tooltip {
    display: none;
  }
}

/* Evitar conflicto con otros elementos flotantes */
@media (max-width: 480px) {
  .whatsapp-float {
    bottom: 80px;
    max-width: calc(100vw - 30px);
  }
}
</style>
