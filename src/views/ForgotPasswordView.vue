<template>
  <div class="forgot-password-container">
    <div class="forgot-password-card">
      <div class="forgot-password-header">
        <h2>Recuperar Contraseña</h2>
        <p>Ingresa tu correo electrónico para recibir las instrucciones de recuperación</p>
      </div>
      
      <!-- Mensaje de error general -->
      <div v-if="errorMessage" class="alert alert-danger alert-dismissible fade show" role="alert">
        {{ errorMessage }}
        <button type="button" class="btn-close" @click="errorMessage = ''" aria-label="Close"></button>
      </div>
      
      <form @submit.prevent="handleForgotPassword">
        <div class="form-group">
          <label for="email">Correo Electrónico</label>
          <div class="input-group">
            <span class="input-icon"><i class="fas fa-envelope"></i></span>
            <input 
              type="email" 
              id="email" 
              class="form-control" 
              placeholder="ejemplo@correo.com" 
              v-model="email"
              required
              :disabled="isLoading"
              :class="{'is-invalid': errors.email}"
            >
          </div>
          <!-- Error específico de email -->
          <div v-if="errors.email" class="error-message">
            <i class="fas fa-exclamation-circle"></i> {{ Array.isArray(errors.email) ? errors.email[0] : errors.email }}
          </div>
        </div>
        
        <button type="submit" class="btn btn-primary btn-block" :disabled="isLoading">
          <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          <i v-else class="fas fa-paper-plane me-2"></i> 
          {{ isLoading ? 'Enviando...' : 'Enviar Instrucciones' }}
        </button>
      </form>
      
      <div class="back-to-login">
        <router-link to="/login" class="back-link">
          <i class="fas fa-arrow-left me-2"></i>
          Volver al inicio de sesión
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.forgot-password-container {
  margin-top: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.forgot-password-card {
  width: 100%;
  max-width: 450px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  padding: 40px;
  transition: transform 0.3s ease;
}

.forgot-password-card:hover {
  transform: translateY(-5px);
}

.forgot-password-header {
  text-align: center;
  margin-bottom: 30px;
}

.forgot-password-header h2 {
  color: #2c3e50;
  font-weight: 700;
  margin-bottom: 10px;
}

.forgot-password-header p {
  color: #7f8c8d;
  font-size: 16px;
  line-height: 1.5;
}

.form-group {
  margin-bottom: 25px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #2c3e50;
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 15px;
  color: #7f8c8d;
  z-index: 2;
}

.form-control {
  height: 50px;
  border-radius: 10px;
  border: 2px solid #e0e0e0;
  transition: all 0.3s ease;
  font-size: 16px;
  padding-left: 45px;
  width: 100%;
}

.form-control:focus {
  border-color: #e67e22;
  box-shadow: 0 0 0 0.2rem rgba(230, 126, 34, 0.25);
  outline: none;
}

.btn-primary {
  background-color: #e67e22;
  border-color: #e67e22;
  height: 50px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  width: 100%;
  border: none;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #d35400;
  border-color: #d35400;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.btn-primary:disabled {
  background-color: #bdc3c7;
  border-color: #bdc3c7;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.back-to-login {
  text-align: center;
  margin-top: 25px;
}

.back-link {
  color: #e67e22;
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s ease;
}

.back-link:hover {
  color: #d35400;
  text-decoration: underline;
}

.alert {
  margin-bottom: 20px;
  border-radius: 10px;
  padding: 12px 16px;
  border: 1px solid transparent;
}

.alert-danger {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #721c24;
  cursor: pointer;
  float: right;
  margin-top: -2px;
}

.spinner-border {
  width: 1.2rem;
  height: 1.2rem;
}

/* Mensajes de error */
.error-message {
  color: #dc3545;
  font-size: 0.85rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 5px;
}

.error-message i {
  font-size: 0.9rem;
}

.is-invalid {
  border-color: #dc3545 !important;
}

.is-invalid:focus {
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
}

/* Animación para errores */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.alert-danger {
  animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@media (max-width: 576px) {
  .forgot-password-card {
    padding: 30px 20px;
  }
  
  .forgot-password-header h2 {
    font-size: 1.5rem;
  }
  
  .forgot-password-header p {
    font-size: 14px;
  }
}
</style>

<script>
import api from '@/services/api'
import EventBus from '@/EventBus'

export default {
  name: 'ForgotPasswordView',
  data() {
    return {
      email: '',
      isLoading: false,
      errorMessage: '',
      errors: {}
    }
  },
  methods: {
    async handleForgotPassword() {
      try {
        this.isLoading = true;
        this.errorMessage = '';
        this.errors = {};
        
        if (!this.email.trim()) {
          this.errors.email = 'El correo electrónico es obligatorio';
          throw new Error('Por favor completa todos los campos requeridos');
        }
        
        // Validación básica de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.email.trim())) {
          this.errors.email = 'Por favor ingresa un correo electrónico válido';
          throw new Error('Por favor ingresa un correo electrónico válido');
        }
        
        const requestData = {
          email: this.email.trim()
        };
        
        // Llamada a la API
        const response = await api.post('/api/recovery_password', requestData);
        
        // Solo mostrar notificación si la respuesta es exitosa (200)
        if (response.status === 200) {
          // Mostrar notificación de éxito
          EventBus.emit('show-notification', {
            type: 'success',
            message: 'Se han enviado las instrucciones de recuperación a tu correo electrónico',
            duration: 5000
          });
          
          // Redirigir al login después de un breve delay
          setTimeout(() => {
            this.$router.push('/login');
          }, 2000);
        } else {
          // Si no es 200, mostrar error
          this.errorMessage = 'Error al enviar las instrucciones de recuperación. Por favor intenta nuevamente.';
        }
        
      } catch (error) {
        this.handleForgotPasswordError(error);
      } finally {
        this.isLoading = false;
      }
    },
    
    handleForgotPasswordError(error) {
      if (error.response && error.response.status === 422) {
        this.handleValidationErrors(error.response.data);
      }
      else if (error.response && error.response.status === 404) {
        // Manejar el error específico del backend
        this.errorMessage = error.response.data?.message || 'No se encontró una cuenta con este correo electrónico.';
      }
      else if (error.response && error.response.status === 429) {
        this.errorMessage = 'Has intentado recuperar tu contraseña demasiadas veces. Por favor espera unos minutos antes de intentar nuevamente.';
      }
      else if (error.response) {
        this.errorMessage = error.response.data?.message || 
                          `Error del servidor: ${error.response.status} ${error.response.statusText}`;
      }
      else {
        this.errorMessage = error.message || 'No se pudo conectar con el servidor. Verifica tu conexión.';
      }
    },
    
    handleValidationErrors(responseData) {
      if (responseData.errors) {
        this.errors = responseData.errors;
        
        if (responseData.errors.email) {
          this.errorMessage = 'Por favor corrige los errores en el formulario.';
        } 
        else if (responseData.message) {
          this.errorMessage = responseData.message;
        } 
        else {
          this.errorMessage = 'Hay errores de validación en el formulario.';
        }
      } 
      else if (responseData.message) {
        this.errorMessage = responseData.message;
      } 
      else {
        this.errorMessage = 'Error de validación en el formulario.';
        console.warn('Formato de error de validación no estándar:', responseData);
      }
    }
  }
}
</script>
