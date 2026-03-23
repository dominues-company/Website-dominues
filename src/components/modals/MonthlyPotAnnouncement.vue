<template>
  <div v-if="show" class="pot-announcement-overlay" @click="handleClose">
    <div class="pot-announcement-modal" @click.stop>
      <button @click="handleClose" class="btn-close-pot">
        <i class="fas fa-times"></i>
      </button>

      <div class="pot-announcement-content">
        <!-- Header con trofeo animado -->
        <div class="announcement-header">
          <div class="trophy-animation">
            <i class="fas fa-trophy"></i>
          </div>
          <h1 class="announcement-title">
            ¡Pote del Mes!
          </h1>
          <p class="announcement-subtitle">
            {{ potData.month_name }} {{ potData.year }}
          </p>
        </div>

        <!-- Monto del pote -->
        <div class="pot-amount-section">
          <div class="pot-amount-label">Premio Acumulado</div>
          <div class="pot-amount-value">
            {{ formatCurrency(potData.amount) }}
          </div>
          <p class="pot-description" v-if="potData.description">
            {{ potData.description }}
          </p>
        </div>

        <!-- Call to action -->
        <div class="cta-section">
          <p class="cta-text">
            <i class="fas fa-fire"></i>
            ¡Juega y compite por el premio de este mes!
          </p>
          <button @click="goToPote" class="btn-view-ranking">
            <i class="fas fa-ranking-star"></i>
            Ver Ranking Completo
          </button>
        </div>

        <!-- Botón OK -->
        <button @click="handleClose" class="btn-ok">
          <i class="fas fa-check"></i>
          Entendido
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MonthlyPotAnnouncement',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    potData: {
      type: Object,
      required: true
    },
    topPlayers: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleClose() {
      // Marcar como visto en sessionStorage
      sessionStorage.setItem('pot_announcement_seen', 'true');
      this.$emit('close');
    },
    
    goToPote() {
      this.handleClose();
      this.$router.push('/pote');
    },
    
    formatCurrency(amount) {
      const formatted = new Intl.NumberFormat('es-BO', {
        style: 'currency',
        currency: 'BOB',
        minimumFractionDigits: 2
      }).format(amount || 0);
      // Asegurar que muestre Rup en lugar de BOB
      return formatted.replace('BOB', 'Rup');
    }
  }
};
</script>

<style scoped>
.pot-announcement-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: fadeIn 0.3s ease;
  padding: 20px;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.pot-announcement-modal {
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%);
  border-radius: 24px;
  max-width: 550px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  position: relative;
  border: 3px solid rgba(251, 191, 36, 0.5);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 50px rgba(251, 191, 36, 0.3);
  animation: slideUp 0.4s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.btn-close-pot {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.btn-close-pot:hover {
  background: #ef4444;
  transform: rotate(90deg) scale(1.1);
  border-color: #ef4444;
}

.pot-announcement-content {
  padding: 30px 30px 25px;
}

/* Header */
.announcement-header {
  text-align: center;
  margin-bottom: 20px;
}

.trophy-animation {
  font-size: 3.5rem;
  margin-bottom: 10px;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

.trophy-animation i {
  color: #fbbf24;
  filter: drop-shadow(0 10px 20px rgba(251, 191, 36, 0.5));
}

.announcement-title {
  font-size: 2rem;
  font-weight: 900;
  color: white;
  margin: 0 0 8px 0;
  text-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.announcement-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  font-weight: 600;
}

/* Pot Amount */
.pot-amount-section {
  background: rgba(251, 191, 36, 0.15);
  border: 2px solid rgba(251, 191, 36, 0.3);
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.pot-amount-section::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(251, 191, 36, 0.1), transparent);
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
  100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
}

.pot-amount-label {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 10px;
  font-weight: 600;
  position: relative;
  z-index: 1;
}

.pot-amount-value {
  font-size: 2.5rem;
  font-weight: 900;
  color: #fbbf24;
  text-shadow: 0 5px 15px rgba(251, 191, 36, 0.5), 0 0 30px rgba(251, 191, 36, 0.3);
  margin-bottom: 10px;
  position: relative;
  z-index: 1;
}

.pot-description {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  line-height: 1.4;
  position: relative;
  z-index: 1;
}

/* CTA Section */
.cta-section {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 15px;
  text-align: center;
}

.cta-text {
  font-size: 1rem;
  color: white;
  margin-bottom: 12px;
  font-weight: 600;
}

.cta-text i {
  color: #ef4444;
  margin-right: 8px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.1); }
}

.btn-view-ranking {
  padding: 12px 30px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(99, 102, 241, 0.4);
}

.btn-view-ranking:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.6);
}

.btn-view-ranking i {
  margin-right: 8px;
}

/* OK Button */
.btn-ok {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: #1e1b4b;
  border: none;
  border-radius: 12px;
  font-weight: 800;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 20px rgba(251, 191, 36, 0.4);
}

.btn-ok:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(251, 191, 36, 0.6);
}

.btn-ok i {
  margin-right: 10px;
}

/* Responsive */
@media (max-width: 768px) {
  .pot-announcement-modal {
    margin: 20px;
    max-height: 95vh;
  }
  
  .pot-announcement-content {
    padding: 30px 20px 20px;
  }
  
  .announcement-title {
    font-size: 1.8rem;
  }
  
  .pot-amount-value {
    font-size: 2rem;
  }
  
  .trophy-animation {
    font-size: 3rem;
  }
  
  .cta-text {
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .pot-announcement-modal {
    border-radius: 20px;
  }
  
  .announcement-title {
    font-size: 1.5rem;
  }
  
  .pot-amount-value {
    font-size: 1.8rem;
  }
  
  .trophy-animation {
    font-size: 2.5rem;
  }
  
  .announcement-subtitle {
    font-size: 1rem;
  }
}
</style>
