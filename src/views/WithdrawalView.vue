<template>
  <div class="withdrawal-container">
    <div class="withdrawal-card">
      <div class="withdrawal-header">
        <h2>RETIRO</h2>
      </div>

      <div v-if="errorMessage" class="alert alert-danger alert-dismissible fade show" role="alert">
        {{ errorMessage }}
        <button type="button" class="btn-close" @click="errorMessage = ''" aria-label="Close"></button>
      </div>

      <div v-if="successMessage" class="alert alert-success alert-dismissible fade show" role="alert">
        {{ successMessage }}
        <button type="button" class="btn-close" @click="successMessage = ''" aria-label="Close"></button>
      </div>


      <!-- INFORMACIÓN BANCARIA -->
      <div class="bank-info-section">
        <div class="section-header">
          <h3>INFORMACIÓN BANCARIA</h3>
        </div>
        
        <div class="important-notice">
          <div class="notice-text blue-text">
            Los retiros solicitados a CUENTAS DE PENSIONADOS TIENEN LIMITACIONES BANCARIAS PARA RECIBIR DINERO y pueden ser devueltas por los bancos. SE RECOMIENDA USAR CUENTAS NORMALES PARA TALES FINES.
          </div>
          <div class="notice-text blue-text">
            El monto mínimo por retiro es de <strong>Bs 500,00</strong>
          </div>
        </div>

        <!--<button type="button" class="btn-add-account" @click="showAddAccountModal = true">
          AGREGAR CUENTA BANCARIA
        </button>-->
      </div>

      <!-- FORMULARIO DE RETIRO -->
      <form @submit.prevent="handleWithdrawal" class="withdrawal-form">

        <div class="form-row">
          <div class="form-group">
            <label for="availableBalance">Saldo Disponible</label>
            <input 
              type="text" 
              id="availableBalance" 
              :value="`Bs ${availableBalance}`"
              readonly 
              class="readonly-input balance-input"
            >
          </div>

          <div class="form-group">
            <label for="withdrawalAmount">Monto a retirar</label>
            <input 
              type="number" 
              id="withdrawalAmount" 
              v-model="form.withdrawalAmount"
              required
              :disabled="isLoading"
              :class="{'is-invalid': errors.withdrawalAmount}"
              @input="validateWithdrawalAmount"
              min="500"
              step="0.01"
              placeholder="500.00"
            >
            <div v-if="errors.withdrawalAmount" class="error-message">
              <i class="fas fa-exclamation-circle"></i> {{ errors.withdrawalAmount }}
            </div>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="bankName">Banco (PagoMóvil)</label>
            <select 
              id="bankName" 
              v-model="form.bankName"
              required
              :disabled="isLoading || loadingData"
              :class="{'is-invalid': errors.bankName}"
              @change="validateBankName"
            >
              <option value="">Seleccione un banco</option>
              <option 
                v-for="bank in banks" 
                :key="bank.id" 
                :value="bank.id"
              >
                {{ bank.name }}
              </option>
            </select>
            <div v-if="errors.bankName" class="error-message">
              <i class="fas fa-exclamation-circle"></i> {{ errors.bankName }}
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-register" :disabled="isLoading || !isFormValid">
            <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            <i v-else class="fas fa-money-bill-wave me-2"></i>
            {{ isLoading ? 'Procesando...' : 'REGISTRAR' }}
          </button>
          
          <button type="button" class="btn-cancel" @click="cancelWithdrawal" :disabled="isLoading">
            <i class="fas fa-times me-2"></i>
            CANCELAR
          </button>
        </div>
      </form>

    </div>

  </div>
</template>

<style scoped>
.withdrawal-container {
  margin-top: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.withdrawal-card {
  width: 100%;
  max-width: 900px;
  background: #f8f9fa;
  border-radius: 15px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  padding: 40px;
  transition: transform 0.3s ease;
}

.withdrawal-card:hover {
  transform: translateY(-5px);
}

.withdrawal-header {
  text-align: center;
  margin-bottom: 30px;
}

.withdrawal-header h2 {
  color: #e67e22;
  font-weight: 700;
  font-size: 2.5rem;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.client-data-section,
.bank-info-section {
  margin-bottom: 30px;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.section-header {
  background: #007bff;
  color: white;
  padding: 15px 20px;
  margin: 0;
}

.section-header h3 {
  margin: 0;
  font-weight: 600;
  font-size: 1.1rem;
}

.client-data-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 20px;
}

.data-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.data-item label {
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.9rem;
}

.readonly-input {
  padding: 10px 15px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  background: #f8f9fa;
  color: #495057;
  font-weight: 500;
  cursor: not-allowed;
}

.balance-input {
  background: #e8f5e8;
  border-color: #28a745;
  color: #155724;
  font-weight: 600;
  font-size: 1.1rem;
}

.important-notice {
  padding: 20px;
  text-align: center;
  background: #fff3cd;
  border-left: 4px solid #ffc107;
}

.notice-text {
  margin-bottom: 10px;
  font-size: 0.9rem;
  line-height: 1.5;
}

.blue-text {
  color: #007bff;
  font-weight: 600;
}

.btn-add-account {
  width: 100%;
  padding: 15px;
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
}

.btn-add-account:hover {
  background: #5a6268;
  transform: translateY(-2px);
}

.withdrawal-form {
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.95rem;
}

.form-group select,
.form-group input {
  padding: 12px 15px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group select:focus,
.form-group input:focus {
  outline: none;
  border-color: #e67e22;
  box-shadow: 0 0 0 0.2rem rgba(230, 126, 34, 0.25);
}

.form-group select:disabled,
.form-group input:disabled {
  background: #f8f9fa;
  cursor: not-allowed;
  opacity: 0.7;
}

.error-message {
  color: #dc3545;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 5px;
}

.info-message {
  color: #17a2b8;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 5px;
}

.form-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 30px;
}

.btn-register {
  background: #e67e22;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 150px;
}

.btn-register:hover:not(:disabled) {
  background: #d35400;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.btn-register:disabled {
  background: #f0ad4e;
  cursor: not-allowed;
  opacity: 0.7;
}

.btn-cancel {
  background: #007bff;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 150px;
}

.btn-cancel:hover:not(:disabled) {
  background: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.login-link {
  text-align: center;
  margin-top: 30px;
  font-size: 0.9rem;
  color: #6c757d;
}

.login-link a {
  color: #6c757d;
  text-decoration: none;
  transition: color 0.3s ease;
}

.login-link a:hover {
  color: #495057;
  text-decoration: underline;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 15px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
}

.modal-header h3 {
  margin: 0;
  color: #2c3e50;
  font-weight: 600;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6c757d;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.modal-close:hover {
  background: #f8f9fa;
  color: #495057;
}

.modal-body {
  padding: 20px;
}

.modal-footer {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  padding: 20px;
  border-top: 1px solid #e9ecef;
}

.btn-secondary {
  background: #6c757d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover:not(:disabled) {
  background: #5a6268;
}

.btn-primary {
  background: #e67e22;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.btn-primary:hover:not(:disabled) {
  background: #d35400;
}

@media (max-width: 768px) {
  .withdrawal-container {
    padding: 80px 10px 20px 10px;
  }
  
  .withdrawal-card {
    padding: 15px;
  }
  
  .client-data-grid {
    grid-template-columns: 1fr;
    padding: 15px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .form-actions {
    flex-direction: column;
    gap: 10px;
  }
  
  .modal-content {
    width: 95%;
    margin: 10px;
  }
}
</style>

<script>
import api from '@/services/api';
import EventBus from '@/EventBus';

export default {
  name: 'WithdrawalView',
  data() {
    return {
      form: {
        withdrawalAmount: '',
        bankName: ''
      },
      bankAccountForm: {
        bankName: '',
        accountNumber: '',
        accountType: '',
        accountHolder: ''
      },
      isLoading: false,
      loadingData: true,
      errorMessage: '',
      successMessage: '',
      errors: {},
      showAddAccountModal: false,
      clientData: {
        name: '',
        typeIdentification: '',
        nIdentification: '',
        email: '',
        username: '',
        phone: '',
        balance: ''
      },
      bankAccounts: [],
      banks: [],
      availableBalance: 0
    };
  },
  computed: {
    isFormValid() {
      const { withdrawalAmount, bankName } = this.form;
      const requiredFieldsFilled = withdrawalAmount && bankName;
      const noErrors = Object.keys(this.errors).length === 0;
      const amountValid = parseFloat(withdrawalAmount) >= 500 && parseFloat(withdrawalAmount) <= this.availableBalance;
      
      return requiredFieldsFilled && noErrors && amountValid;
    }
  },
  async mounted() {
    await Promise.all([
      this.loadClientData(),
      this.loadBanks()
    ]);
  },
  methods: {
    // Cargar datos del cliente
    async loadClientData() {
      try {
        this.loadingData = true;
        const response = await api.get('/api/client-data', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
          }
        });
        
        this.clientData = {
          name: response.data.name,
          typeIdentification: response.data.type_identification,
          nIdentification: response.data.n_identification,
          email: response.data.email,
          username: response.data.username,
          phone: response.data.phone,
          balance: response.data.user.balance
        };
        
        this.availableBalance = response.data.user.balance || 0;
      } catch (error) {
        console.error('Error al cargar datos del cliente:', error);
        this.errorMessage = 'Error al cargar los datos del cliente.';
      } finally {
        this.loadingData = false;
      }
    },
    
    // Cargar bancos desde la API
    async loadBanks() {
      try {
        const response = await api.get('/api/banks', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
          }
        });
        
        // Manejar diferentes estructuras de respuesta
        let banksData = [];
        
        if (Array.isArray(response.data)) {
          banksData = response.data;
        } else if (response.data && Array.isArray(response.data.data)) {
          banksData = response.data.data;
        } else if (response.data && response.data.banks) {
          banksData = response.data.banks;
        } else {
          banksData = [];
        }
        
        // Filtrar solo bancos activos
        this.banks = banksData.filter(bank => 
          bank.status === 'activo' || 
          bank.status === 'active' ||
          !bank.status // Si no tiene status, incluir por defecto
        );
        
        console.log('Bancos cargados:', this.banks);
      } catch (error) {
        console.error('Error al cargar bancos:', error);
        // No mostrar error crítico, solo dejar el select vacío
        this.banks = [];
      }
    },
    
    
    // Validar monto de retiro
    validateWithdrawalAmount() {
      const amount = parseFloat(this.form.withdrawalAmount);
      
      if (!this.form.withdrawalAmount) {
        this.errors.withdrawalAmount = 'El monto es obligatorio';
        return;
      }
      
      if (amount < 500) {
        this.errors.withdrawalAmount = 'El monto mínimo es de Bs. 500,00';
        return;
      }
      
      if (amount > this.availableBalance) {
        this.errors.withdrawalAmount = 'El monto excede el saldo disponible';
        return;
      }
      
      delete this.errors.withdrawalAmount;
    },
    
    // Validar nombre del banco
    validateBankName() {
      if (!this.form.bankName) {
        this.errors.bankName = 'El banco es obligatorio';
        return;
      }
      delete this.errors.bankName;
    },
    
    // Manejar retiro
    async handleWithdrawal() {
      try {
        // Validar formulario
        this.errors = {};
        
        this.validateWithdrawalAmount();
        this.validateBankName();
        
        if (!this.isFormValid) {
          this.errorMessage = 'Por favor, corrige los errores en el formulario';
          return;
        }
        
        this.isLoading = true;
        this.errorMessage = '';
        this.successMessage = '';
        
        // Crear objeto de retiro
        const withdrawalData = {
          amount: parseFloat(this.form.withdrawalAmount),
          bank_account: this.form.bankName
        };
        
        console.log('Enviando datos de retiro:', withdrawalData);
        
        try {
          // Llamar al endpoint de retiro
          await api.post('/api/withdraw_api', withdrawalData, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            }
          });
          
          // Mostrar toast de éxito
          EventBus.emit('show-notification', {
            type: 'success',
            message: 'Solicitud de retiro enviada exitosamente. Será procesada en cuestion de minutos.',
            duration: 3000
          });
          
          // Limpiar formulario
          this.form = {
            withdrawalAmount: '',
            bankName: ''
          };
          
          // Actualizar saldo
          await this.loadClientData();
          
          // Redirigir al dashboard después de 3 segundos
          setTimeout(() => {
            this.$router.push('/dashboard');
          }, 3000);
          
        } catch (error) {
          console.error('Error durante el retiro:', error);
          this.handleWithdrawalError(error);
        }
      } catch (error) {
        console.error('Error general durante el retiro:', error);
        this.errorMessage = 'Ocurrió un error inesperado. Por favor, intenta de nuevo más tarde.';
      } finally {
        this.isLoading = false;
      }
    },
    
    // Manejar errores de retiro
    handleWithdrawalError(error) {
      let errorMessage = '';
      
      if (error.response && error.response.status === 422) {
        // Errores de validación del servidor
        const validationErrors = error.response.data.errors || {};
        this.errors = validationErrors;
        errorMessage = 'Por favor corrige los errores en el formulario.';
      } else if (error.response) {
        // Otros errores del servidor
        errorMessage = error.response.data?.message || 
                      `Error del servidor: ${error.response.status} ${error.response.statusText}`;
      } else {
        // Errores de red u otros
        errorMessage = error.message || 'No se pudo conectar con el servidor. Verifica tu conexión.';
      }
      
      this.errorMessage = errorMessage;
      
      // Mostrar toast de error
      EventBus.emit('show-notification', {
        type: 'error',
        message: errorMessage,
        duration: 5000
      });
    },
    
    // Agregar cuenta bancaria
    async handleAddBankAccount() {
      try {
        this.isLoading = true;
        
        const accountData = {
          bank_name: this.bankAccountForm.bankName,
          account_number: this.bankAccountForm.accountNumber,
          account_type: this.bankAccountForm.accountType,
          account_holder: this.bankAccountForm.accountHolder
        };
        
        await api.post('/api/bank-accounts', accountData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
          }
        });
        
        // Mostrar toast de éxito
        EventBus.emit('show-notification', {
          type: 'success',
          message: 'Cuenta bancaria agregada exitosamente',
          duration: 3000
        });
        
        // Limpiar formulario y cerrar modal
        this.bankAccountForm = {
          bankName: '',
          accountNumber: '',
          accountType: '',
          accountHolder: ''
        };
        this.showAddAccountModal = false;
        
        
      } catch (error) {
        console.error('Error al agregar cuenta bancaria:', error);
        EventBus.emit('show-notification', {
          type: 'error',
          message: 'Error al agregar la cuenta bancaria',
          duration: 5000
        });
      } finally {
        this.isLoading = false;
      }
    },
    
    // Cancelar retiro
    cancelWithdrawal() {
      this.form = {
        withdrawalAmount: '',
        bankName: ''
      };
      this.errors = {};
      this.errorMessage = '';
      this.successMessage = '';
      this.$router.push('/dashboard');
    },
    
    // Cerrar sesión
    logout() {
      localStorage.removeItem('auth_token');
      this.$router.push('/login');
    }
  }
};
</script>
