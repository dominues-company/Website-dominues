<template>
  <div v-if="isVisible">
    <div class="modal-backdrop" @click="closeModal"></div>
    <div class="modal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmar Entrada a Mesa</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <div v-if="table" class="table-info">
              <div class="row">
                <div class="col-md-6">
                  <h6>Información de la Mesa</h6>
                  <p><strong>Nombre:</strong> {{ table.name || `Mesa ${table.id}` }}</p>
                  <p><strong>Precio de entrada:</strong> ${{ table.entry_price || '0.00' }}</p>
                  <p><strong>Jugadores actuales:</strong> {{ table.current_players || 0 }}/{{ table.max_players || 4 }}</p>
                </div>
                <div class="col-md-6">
                  <h6>Tu Información</h6>
                  <p><strong>Saldo actual:</strong> ${{ userBalance.toFixed(2) }}</p>
                  <p><strong>Saldo después de entrada:</strong> ${{ (userBalance - (table.entry_price || 0)).toFixed(2) }}</p>
                </div>
              </div>
              
              <div v-if="!canAfford" class="alert alert-warning mt-3">
                <i class="fas fa-exclamation-triangle"></i>
                <strong>Saldo insuficiente:</strong> No tienes suficiente saldo para unirte a esta mesa.
              </div>
              
              <div v-else class="alert alert-info mt-3">
                <i class="fas fa-info-circle"></i>
                <strong>Confirmación:</strong> Se descontará ${{ table.entry_price || '0.00' }} de tu saldo al unirte a esta mesa.
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">
              Cancelar
            </button>
            <button 
              type="button" 
              class="btn btn-primary" 
              :disabled="!canAfford || joining"
              @click="confirmJoin"
            >
              <span v-if="joining" class="spinner-border spinner-border-sm me-2"></span>
              {{ joining ? 'Uniéndose...' : 'Confirmar Entrada' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'JoinTableModal',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    table: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      joining: false
    }
  },
  computed: {
    ...mapGetters('games', ['userBalance']),
    ...mapGetters('auth', ['isAuthenticated']),
    
    canAfford() {
      return this.table && this.userBalance >= (this.table.entry_price || 0)
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    async confirmJoin() {
      if (!this.canAfford || this.joining) return
      this.joining = true
      try {
        const response = await this.$store.dispatch('games/joinTable', {
          tableId: this.table.id,
          entryFee: this.table.entry_price || 0
        })
        if (response && response.message && response.message.includes('Ya estás en esta mesa')) {
          this.$emit('show-message', {
            type: 'error',
            message: response.message
          })
        } else {
          // 🔧 Pausar música de fondo al confirmar unirse a la mesa
          window.dispatchEvent(new CustomEvent('pause-background-music'))
          console.log('🔇 [JOIN-TABLE-MODAL] Música de fondo pausada al confirmar')
          
          this.$emit('joined', this.table)
          this.closeModal()
          this.$emit('show-message', {
            type: 'success',
            message: '¡Te has unido exitosamente a la mesa!'
          })
        }
      } catch (error) {
        this.$emit('show-message', {
          type: 'error',
          message: error.message || 'Error al unirse a la mesa'
        })
      } finally {
        this.joining = false
      }
    }
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 1040;
}
.modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
}
.table-info h6 {
  color: #007bff;
  margin-bottom: 15px;
  font-weight: 600;
}
.table-info p {
  margin-bottom: 8px;
  font-size: 14px;
}
.alert {
  border-radius: 8px;
  font-size: 14px;
}
.alert i {
  margin-right: 8px;
}
.btn {
  border-radius: 6px;
  font-weight: 500;
}
.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}
.btn-primary:hover:not(:disabled) {
  background-color: #0056b3;
  border-color: #0056b3;
}
.btn-primary:disabled {
  background-color: #6c757d;
  border-color: #6c757d;
}
</style> 