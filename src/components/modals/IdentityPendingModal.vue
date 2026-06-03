<template>
  <div v-if="show" class="pending-overlay" @click="$emit('close')">
    <div class="pending-modal" @click.stop>
      <button type="button" class="btn-close-modal" @click="$emit('close')" aria-label="Cerrar">
        <i class="fas fa-times"></i>
      </button>

      <div class="modal-graphic">
        <div class="bell-icon">
          <i class="fas fa-bell"></i>
        </div>
        <div class="clock-icon">
          <i class="fas fa-clock"></i>
        </div>
      </div>

      <h2 class="modal-title">¡Tu verificación está en proceso!</h2>
      <p class="modal-text">
        Nuestro equipo de soporte está revisando manualmente tu identidad. Pronto podrás continuar con tu retiro.
      </p>

      <button type="button" class="btn-close-action" @click="$emit('close')">
        Cerrar
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IdentityPendingModal',
  props: {
    show: { type: Boolean, default: false }
  },
  emits: ['close']
};
</script>

<style scoped>
.pending-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
}

.pending-modal {
  background: linear-gradient(160deg, #1a1a2e 0%, #2d2d44 40%, #1a1a2e 100%);
  border-radius: 20px;
  padding: 36px 28px 28px;
  width: 100%;
  max-width: 400px;
  position: relative;
  text-align: center;
  color: #fff;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
}

.btn-close-modal {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-graphic {
  position: relative;
  height: 100px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bell-icon {
  font-size: 4rem;
  color: #fbbf24;
  animation: ring 2s ease-in-out infinite;
}

.clock-icon {
  position: absolute;
  right: calc(50% - 60px);
  bottom: 10px;
  font-size: 1.4rem;
  color: #e67e22;
  background: #1a1a2e;
  border-radius: 50%;
  padding: 4px;
}

@keyframes ring {
  0%, 100% { transform: rotate(0deg); }
  10%, 30% { transform: rotate(-12deg); }
  20%, 40% { transform: rotate(12deg); }
  50% { transform: rotate(0deg); }
}

.modal-title {
  font-size: 1.35rem;
  font-weight: 700;
  margin-bottom: 14px;
  line-height: 1.3;
}

.modal-text {
  font-size: 0.92rem;
  line-height: 1.55;
  opacity: 0.85;
  margin-bottom: 28px;
}

.btn-close-action {
  width: 100%;
  background: #e67e22;
  color: #fff;
  border: none;
  padding: 14px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-close-action:hover {
  background: #d35400;
}
</style>
