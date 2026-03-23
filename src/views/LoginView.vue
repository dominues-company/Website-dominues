<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h2>Iniciar Sesión</h2>
        <p>El nuevo dominó online te espera. ¡A competir!</p>
      </div>
      
      <!-- Mensaje de error general -->
      <div v-if="errorMessage" class="alert alert-danger alert-dismissible fade show" role="alert">
        {{ errorMessage }}
        <button type="button" class="btn-close" @click="errorMessage = ''" aria-label="Close"></button>
      </div>
      
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Correo Electrónico</label>
          <div class="input-group">
            <span class="input-icon"><i class="fas fa-envelope"></i></span>
            <input 
              type="email" 
              id="username" 
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
        
        <div class="form-group">
          <div class="password-label-wrapper">
            <label for="password">Contraseña</label>
          </div>
          <div class="input-group">
            <span class="input-icon"><i class="fas fa-lock"></i></span>
            <input 
              :type="showPassword ? 'text' : 'password'" 
              id="password" 
              class="form-control" 
              placeholder="Ingresa tu contraseña" 
              v-model="password"
              required
              :disabled="isLoading"
              :class="{'is-invalid': errors.password}"
            >
            <span class="password-toggle" @click="togglePassword">
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </span>
          </div>
          <div v-if="errors.password" class="error-message">
            <i class="fas fa-exclamation-circle"></i> {{ Array.isArray(errors.password) ? errors.password[0] : errors.password }}
          </div>
          <a href="#" class="forgot-password" @click.prevent="forgotPassword">¿Olvidaste tu contraseña?</a>
        </div>
        
        <div class="form-check mb-3">
          <input type="checkbox" class="form-check-input" id="remember" v-model="rememberMe" :disabled="isLoading">
          <label class="form-check-label" for="remember">Recordarme</label>
          
        </div>
        
        <button type="submit" class="btn btn-primary btn-block" :disabled="isLoading">
          <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          <i v-else class="fas fa-sign-in-alt me-2"></i> 
          {{ isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
        </button>
      </form>
      
      <!--<div class="login-divider">
        <span>O inicia sesión con</span>
      </div>-->
      
      <!--<div class="social-login">
        <button class="btn btn-outline-primary social-btn" @click="socialLogin('facebook')" :disabled="isLoading">
          <i class="fab fa-facebook-f"></i>
        </button>
        <button class="btn btn-outline-danger social-btn" @click="socialLogin('google')" :disabled="isLoading">
          <i class="fab fa-google"></i>
        </button>
        <button class="btn btn-outline-dark social-btn" @click="socialLogin('apple')" :disabled="isLoading">
          <i class="fab fa-apple"></i>
        </button>
      </div>-->
      
      <div class="register-link">
        ¿No tienes una cuenta? <router-link to="/register">Regístrate ahora</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  margin-top: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 450px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  padding: 40px;
  transition: transform 0.3s ease;
}

.login-card:hover {
  transform: translateY(-5px);
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h2 {
  color: #2c3e50;
  font-weight: 700;
  margin-bottom: 10px;
}

.login-header p {
  color: #7f8c8d;
  font-size: 16px;
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
}

.form-control {
  height: 50px;
  border-radius: 10px;
  border: 2px solid #e0e0e0;
  transition: all 0.3s ease;
  font-size: 16px;
}

.form-control:focus {
  border-color: #e67e22;
  box-shadow: 0 0 0 0.2rem rgba(230, 126, 34, 0.25);
}

.password-toggle {
  position: absolute;
  right: 15px;
  color: #7f8c8d;
  cursor: pointer;
}

.password-label-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.forgot-password {
  font-size: 14px;
  color: #e67e22;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.form-check-input {
  margin-top: 0.3rem;
}

.form-check-label {
  font-weight: normal;
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
}

.btn-primary:hover {
  background-color: #d35400;
  border-color: #d35400;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.btn-block {
  width: 100%;
}

.login-divider {
  text-align: center;
  margin: 25px 0;
  position: relative;
}

.login-divider::before,
.login-divider::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 40%;
  height: 1px;
  background-color: #e0e0e0;
}

.login-divider::before {
  left: 0;
}

.login-divider::after {
  right: 0;
}

.login-divider span {
  background-color: white;
  padding: 0 15px;
  color: #7f8c8d;
  font-size: 14px;
  position: relative;
  z-index: 1;
}

.social-login {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 25px;
}

.social-btn {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: all 0.3s ease;
}

.social-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.register-link {
  text-align: center;
  margin-top: 20px;
  font-size: 15px;
  color: #7f8c8d;
}

.register-link a {
  color: #e67e22;
  font-weight: 600;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}

.alert {
  margin-bottom: 20px;
  border-radius: 10px;
}

.spinner-border {
  width: 1.2rem;
  height: 1.2rem;
}

/* Añadido para mensajes de error */
.invalid-feedback {
  display: block;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: #dc3545;
}


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

.password-toggle {
  position: absolute;
  right: 15px;
  color: #7f8c8d;
  cursor: pointer;
  z-index: 5; /* Asegura que está por encima del input */
  padding: 10px; /* Área de click más grande */
  margin-right: -5px; /* Ajuste fino de posición */
}

/* Asegura que el ícono no se desplaza cuando hay validación */
.is-invalid ~ .password-toggle {
  right: 40px; /* Ajustar si el input tiene un ícono de validación */
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
  .login-card {
    padding: 30px 20px;
  }
  
  .password-label-wrapper {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .forgot-password {
    margin-top: 5px;
  }
  
  .login-divider::before,
  .login-divider::after {
    width: 30%;
  }
}
</style>

<script>

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      showPassword: false, 
      isLoading: false,
      errorMessage: '',
      errors: {} 
    }
  },
  methods: {
    // Método existente corregido
      async handleLogin() {
          try {
          this.isLoading = true;
          this.errorMessage = '';
          this.errors = {};
          
          if (!this.email.trim()) {
            this.errors.email = 'El correo electrónico es obligatorio';
            throw new Error('Por favor completa todos los campos requeridos');
          }
          
          if (!this.password) {
            this.errors.password = 'La contraseña es obligatoria';
            throw new Error('Por favor completa todos los campos requeridos');
          }
          
          const loginData = {
            email: this.email.trim(),
            password: this.password,
            remember: this.rememberMe
          };
          
          await this.$store.dispatch('auth/login', loginData);
          
          // 🔧 CACHE CONTROL: Forzar recarga completa sin caché después del login
          // Esto asegura que el usuario siempre tenga la versión más reciente
          console.log('✅ [LOGIN] Login exitoso - Forzando recarga sin caché');
          const cacheBuster = Date.now();
          window.location.href = `/dashboard?_nocache=${cacheBuster}`;
        } catch (error) {
          this.handleLoginError(error);
        } finally {
          this.isLoading = false;
        }
      },
      handleLoginError(error) {
        if (error.response && error.response.status === 422) {
          this.handleValidationErrors(error.response.data);
        }
        else if (error.response && error.response.status === 401) {
          this.errorMessage = 'Credenciales incorrectas. Por favor verifica tu email y contraseña.';
        }
        else if (error.response && error.response.status === 409) {
          // Error de sesión duplicada
          this.errorMessage = error.response.data?.message || 
                            'Ya tienes una sesión activa en otro dispositivo. Por favor, cierra sesión allí primero.';
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
          
          if (responseData.errors.email || responseData.errors.password) {
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
      },
      
      togglePassword() {
        this.showPassword = !this.showPassword;
      },
      
      forgotPassword() {
        this.$router.push('/forgot-password');
      },
      
      socialLogin(provider) {
        this.isLoading = true;
        
        setTimeout(() => {
          this.isLoading = false;
          alert(`Inicio de sesión con ${provider} en desarrollo`);
        }, 1000);
        
      }
  }
}
</script>