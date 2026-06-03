<template>
  <router-link
    v-if="show"
    to="/recharge"
    class="recharge-float"
    aria-label="Ir a recargas"
    @click="onNavigate"
  >
    <span class="recharge-label">Recargar</span>
    <i class="fas fa-coins recharge-icon" aria-hidden="true"></i>
    <span class="recharge-tooltip">Recarga saldo sin salir del juego</span>
  </router-link>
</template>

<script>
import { closeMobileNavigation } from '@/utils/mobileNavigation';

export default {
  name: 'FloatingRechargeButton',
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onNavigate() {
      closeMobileNavigation();
    }
  }
};
</script>

<style scoped>
.recharge-float {
  position: fixed;
  bottom: 24px;
  left: 24px;
  z-index: 9998;
  display: inline-flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 10px;
  padding: 10px 16px 10px 18px;
  min-height: 52px;
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  color: #fff;
  border-radius: 999px;
  box-shadow: 0 4px 16px rgba(255, 107, 53, 0.45), 0 2px 6px rgba(0, 0, 0, 0.12);
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  border: 2px solid rgba(255, 255, 255, 0.25);
  animation: recharge-float-pulse 3s ease-in-out infinite;
}

.recharge-float:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(255, 107, 53, 0.55), 0 4px 8px rgba(0, 0, 0, 0.15);
  color: #fff;
}

.recharge-float:active {
  transform: translateY(0);
}

@keyframes recharge-float-pulse {
  0%, 100% { box-shadow: 0 4px 16px rgba(255, 107, 53, 0.45), 0 2px 6px rgba(0, 0, 0, 0.12); }
  50% { box-shadow: 0 6px 22px rgba(255, 107, 53, 0.6), 0 0 0 6px rgba(255, 107, 53, 0.12); }
}

.recharge-label {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.02em;
  white-space: nowrap;
  line-height: 1.2;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.12);
}

.recharge-icon {
  font-size: 22px;
  flex-shrink: 0;
  line-height: 1;
}

.recharge-tooltip {
  position: absolute;
  left: calc(100% + 12px);
  top: 50%;
  transform: translateY(-50%);
  background-color: #fff;
  color: #333;
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
  max-width: 200px;
  white-space: normal;
  line-height: 1.35;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.recharge-tooltip::after {
  content: '';
  position: absolute;
  left: -6px;
  top: 50%;
  transform: translateY(-50%);
  border-right: 6px solid #fff;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
}

.recharge-float:hover .recharge-tooltip {
  opacity: 1;
}

@media (max-width: 768px) {
  .recharge-float {
    bottom: 18px;
    left: 16px;
    padding: 9px 14px 9px 16px;
    min-height: 48px;
  }

  .recharge-label {
    font-size: 13px;
  }

  .recharge-tooltip {
    display: none;
  }
}
</style>
