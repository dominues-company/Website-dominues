<template>
  <div class="register-container">
    <div class="register-card">
      <div class="register-header">
        <h2>Crear Cuenta</h2>
        <p>Únete a DominoRoyal y comienza a jugar</p>
      </div>

      <div v-if="errorMessage" class="alert alert-danger alert-dismissible fade show" role="alert">
        {{ errorMessage }}
        <button type="button" class="btn-close" @click="errorMessage = ''" aria-label="Close"></button>
      </div>
      
      <form @submit.prevent="handleRegister">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label for="firstName">Nombre</label>
              <div class="input-group">
                <span class="input-icon"><i class="fas fa-user"></i></span>
                <input 
                  type="text" 
                  id="firstName" 
                  class="form-control" 
                  placeholder="Tu nombre" 
                  v-model="form.name"
                  required
                  :disabled="isLoading"
                  :class="{'is-invalid': errors.name}"
                >
              </div>
              <div v-if="errors.name" class="error-message">
                <i class="fas fa-exclamation-circle"></i> {{ Array.isArray(errors.name) ? errors.name[0] : errors.name }}
              </div>
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <label for="email">Correo Electrónico</label>
          <div class="input-group">
            <span class="input-icon"><i class="fas fa-envelope"></i></span>
            <input 
              type="email" 
              id="email" 
              class="form-control" 
              placeholder="ejemplo@correo.com" 
              v-model="form.email"
              required
              :disabled="isLoading"
              :class="{'is-invalid': errors.email}"
              @blur="validateEmail"
            >
          </div>
          <div v-if="errors.email" class="error-message">
            <i class="fas fa-exclamation-circle"></i> {{ Array.isArray(errors.email) ? errors.email[0] : errors.email }}
          </div>
        </div>

        <div class="form-group">
          <label for="documentType">Cédula</label>
          <div class="document-input-group">
            <div class="document-type-select">
              <select 
                id="documentType" 
                class="form-control document-select" 
                v-model="form.documentType"
                required
                :disabled="isLoading"
                :class="{'is-invalid': errors.documentType}"
                @change="validateDocumentType"
              >
                <option value="V">V</option>
                <option value="E">E</option>
              </select>
            </div>
            <div class="document-number-input">
              <span class="input-icon"><i class="fas fa-id-card"></i></span>
              <input 
                type="text" 
                id="identification" 
                class="form-control document-input" 
                placeholder="Número de identificación" 
                v-model="form.identification"
                required
                :disabled="isLoading"
                :class="{'is-invalid': errors.identification}"
                @blur="validateIdentification"
                maxlength="10"
              >
            </div>
          </div>
          <div v-if="errors.documentType" class="error-message">
            <i class="fas fa-exclamation-circle"></i> {{ Array.isArray(errors.documentType) ? errors.documentType[0] : errors.documentType }}
          </div>
          <div v-if="errors.identification" class="error-message">
            <i class="fas fa-exclamation-circle"></i> {{ Array.isArray(errors.identification) ? errors.identification[0] : errors.identification }}
          </div>
        </div>

        <div class="form-group">
          <label for="phone">Teléfono</label>
          <div class="document-input-group">
            <div class="document-type-select">
              <select 
                id="phoneCode" 
                class="form-control document-select" 
                v-model="form.phoneCode"
                required
                :disabled="isLoading"
                :class="{'is-invalid': errors.phone}"
                @change="validatePhone"
              >
                <option value="0412">0412</option>
                <option value="0424">0424</option>
                <option value="0414">0414</option>
                <option value="0416">0416</option>
                <option value="0426">0426</option>
              </select>
            </div>
            <div class="document-number-input">
              <span class="input-icon"><i class="fas fa-phone"></i></span>
              <input 
                type="text" 
                id="phoneNumber" 
                class="form-control document-input" 
                placeholder="Número de teléfono" 
                v-model="form.phoneNumber"
                required
                :disabled="isLoading"
                :class="{'is-invalid': errors.phone}"
                @blur="validatePhone"
                maxlength="7"
                @input="formatPhoneNumber"
              >
            </div>
          </div>
          <div v-if="errors.phone" class="error-message">
            <i class="fas fa-exclamation-circle"></i> {{ Array.isArray(errors.phone) ? errors.phone[0] : errors.phone }}
          </div>
        </div>
        
        <div class="form-group">
          <label for="registerPassword">Contraseña</label>
          <div class="input-group">
            <span class="input-icon"><i class="fas fa-lock"></i></span>
            <input 
              :type="showPassword ? 'text' : 'password'" 
              id="registerPassword" 
              class="form-control" 
              placeholder="Crea una contraseña segura" 
              v-model="form.password"
              required
              :disabled="isLoading"
              :class="{'is-invalid': errors.password}"
              @input="validatePassword"
            >
            <span class="password-toggle" @click="togglePassword">
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </span>
          </div>

          <div v-if="errors.password" class="error-message">
            <i class="fas fa-exclamation-circle"></i> {{ Array.isArray(errors.password) ? errors.password[0] : errors.password }}
          </div>


          <div class="password-strength" v-if="password">
            <div class="strength-meter">
              <div 
                class="strength-bar" 
                :style="{ width: passwordStrength.percentage + '%', backgroundColor: passwordStrength.color }"
              ></div>
            </div>
            <span class="strength-text" :style="{ color: passwordStrength.color }">
              {{ passwordStrength.message }}
            </span>
          </div>
        </div>
        
        <div class="form-group">
          <label for="confirmPassword">Confirmar Contraseña</label>
          <div class="input-group">
            <span class="input-icon"><i class="fas fa-lock"></i></span>
            <input 
              :type="showConfirmPassword ? 'text' : 'password'" 
              id="confirmPassword" 
              class="form-control" 
              placeholder="Confirma tu contraseña" 
              v-model="form.password_confirmation"
              required
              :disabled="isLoading"
              :class="{'is-invalid': errors.password_confirmation}"
              @input="validatePasswordConfirmation"
            >
            <span class="password-toggle" @click="toggleConfirmPassword">
              <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </span>
          </div>

          <div v-if="errors.password_confirmation" class="error-message">
            <i class="fas fa-exclamation-circle"></i> {{ Array.isArray(errors.password_confirmation) ? errors.password_confirmation[0] : errors.password_confirmation }}
          </div>

          <div class="password-match" v-if="confirmPassword">
            <span :class="passwordsMatch ? 'match-success' : 'match-error'">
              <i :class="passwordsMatch ? 'fas fa-check-circle' : 'fas fa-times-circle'"></i>
              {{ passwordsMatch ? 'Las contraseñas coinciden' : 'Las contraseñas no coinciden' }}
            </span>
          </div>
        </div>
      
        
        <div class="terms-scroll-block mb-3">
          <p class="terms-scroll-label">Debes leer y desplazarte hasta el final del siguiente texto para poder aceptar:</p>
          <div
            ref="termsScrollBox"
            class="terms-scroll-box"
            @scroll="onTermsScroll"
          >
            <div class="terms-scroll-content">
              <strong>Resumen – Términos y Condiciones y Política de Privacidad (Dominues)</strong>
              <p>Al registrarte aceptas que Dominues es una plataforma de entretenimiento (dominó) y que el acceso debe ser legal en tu país. Los Dcoins son moneda interna; no son dinero real fuera de la plataforma.</p>
              <p><strong>Cargas y retiros:</strong> Las cargas pueden requerir validación de comprobante. Los retiros se procesan de forma manual. Eres responsable de los datos de pago que proporciones; no se devuelven fondos enviados a cuentas erróneas.</p>
              <p><strong>Privacidad:</strong> Solo usamos datos necesarios (correo, usuario, país) para tu cuenta y seguridad. No vendemos ni compartimos datos con terceros. Usamos pasarelas como Cryptomus; no guardamos claves ni datos sensibles de pago.</p>
              <p><strong>Prohibido:</strong> Bots, trampas, colusión entre jugadores o uso de la plataforma para actividades ilícitas. Los fondos deben ser de origen lícito. Nos reservamos el derecho de pedir KYC y de bloquear cuentas o retener fondos si hay sospecha de fraude.</p>
              <p><strong>Edad y juego responsable:</strong> Solo mayores de 18 años (o mayoría de edad en tu país). Puedes solicitar cierre de cuenta (autoexclusión) en cualquier momento.</p>
              <p><strong>Responsabilidad:</strong> No nos hacemos responsables de fallos de conexión, dispositivos o de terceros. En caso de error técnico que acredite saldo por error, podemos corregir el saldo. El aprovechamiento de fallos del sistema puede suponer cierre de cuenta.</p>
              <p>Texto completo en <a href="/terms" target="_blank" rel="noopener" class="terms-link">Términos y Condiciones</a> y <a href="/privacy" target="_blank" rel="noopener" class="terms-link">Política de Privacidad</a>.</p>
              <p class="terms-scroll-end" ref="termsScrollEnd">— Fin del texto. Si has llegado aquí, ya puedes marcar la casilla de aceptación.</p>
            </div>
          </div>
          <p v-if="!hasScrolledTermsToBottom" class="terms-scroll-hint">
            <i class="fas fa-arrow-down"></i> Desplázate hasta el final para activar la casilla de aceptación.
          </p>
          <p v-else class="terms-scroll-ok">
            <i class="fas fa-check-circle"></i> Has llegado al final. Ahora puedes aceptar abajo.
          </p>
        </div>
        <div class="form-check mb-3">
          <input
            type="checkbox"
            class="form-check-input"
            id="terms"
            v-model="form.terms"
            required
            :disabled="isLoading || !hasScrolledTermsToBottom"
            :class="{'is-invalid': errors.terms}"
          >
          <label class="form-check-label" for="terms">
            He leído hasta el final y acepto los <a href="/terms" target="_blank" rel="noopener" class="terms-link">Términos y Condiciones</a> y la <a href="/privacy" target="_blank" rel="noopener" class="terms-link">Política de Privacidad</a>
          </label>
          <div v-if="errors.terms" class="error-message">
            <i class="fas fa-exclamation-circle"></i> {{ Array.isArray(errors.terms) ? errors.terms[0] : errors.terms }}
          </div>
        </div>
        

        
        <button type="submit" class="btn btn-primary btn-block" :disabled="isLoading || !isFormValid">
          <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          <i v-else class="fas fa-user-plus me-2"></i> 
          {{ isLoading ? 'Creando cuenta...' : 'Crear cuenta' }}
        </button>
      </form>
      
      <!--<div class="login-divider">
        <span>O regístrate con</span>
      </div>
      
      <div class="social-login">
        <button class="btn btn-outline-primary social-btn">
          <i class="fab fa-facebook-f"></i>
        </button>
        <button class="btn btn-outline-danger social-btn">
          <i class="fab fa-google"></i>
        </button>
        <button class="btn btn-outline-dark social-btn">
          <i class="fab fa-apple"></i>
        </button>
      </div>-->
      
      <div class="login-link">
        ¿Ya tienes cuenta? <a href="#">Inicia sesión</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-message {
  color: #dc3545;
  font-size: 0.85rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 5px;
}


.register-container {
  margin-top: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.register-card {
  width: 100%;
  max-width: 700px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  padding: 40px;
  transition: transform 0.3s ease;
}

.register-card:hover {
  transform: translateY(-5px);
}

.register-header {
  text-align: center;
  margin-bottom: 30px;
}

.register-header h2 {
  color: #2c3e50;
  font-weight: 700;
  margin-bottom: 10px;
}

.register-header p {
  color: #7f8c8d;
  font-size: 16px;
}

.form-group {
  margin-bottom: 25px;
  position: relative;
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

select.form-control {
  padding-left: 15px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%237f8c8d'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 20px;
}

.document-input-group {
  display: flex;
  gap: 10px;
  align-items: center;
}

.document-type-select {
  flex: 0 0 100px;
}

.document-select {
  width: 100%;
  height: 50px;
  border-radius: 10px;
  border: 2px solid #e0e0e0;
  transition: all 0.3s ease;
  font-size: 16px;
  text-align: center;
  font-weight: 600;
}

.document-select:focus {
  border-color: #e67e22;
  box-shadow: 0 0 0 0.2rem rgba(230, 126, 34, 0.25);
}

.document-number-input {
  flex: 1;
  position: relative;
}

.document-input {
  width: 100%;
  height: 50px;
  border-radius: 10px;
  border: 2px solid #e0e0e0;
  transition: all 0.3s ease;
  font-size: 16px;
  padding-left: 45px;
}

.document-input:focus {
  border-color: #e67e22;
  box-shadow: 0 0 0 0.2rem rgba(230, 126, 34, 0.25);
}

.password-toggle {
  position: absolute;
  right: 15px;
  color: #7f8c8d;
  cursor: pointer;
}

.strength-meter {
  height: 5px;
  background-color: #e0e0e0;
  border-radius: 3px;
  margin-top: 10px;
  overflow: hidden;
}

.strength-bar {
  height: 100%;
  transition: width 0.3s ease, background-color 0.3s ease;
}

.strength-text {
  display: block;
  font-size: 12px;
  margin-top: 5px;
  text-align: right;
}

.password-match {
  margin-top: 10px;
  font-size: 14px;
}

.match-success {
  color: #27ae60;
}

.match-error {
  color: #e74c3c;
}

.form-check-input {
  margin-top: 0.3rem;
}

.form-check-label {
  font-weight: normal;
  font-size: 14px;
}

.terms-link {
  color: #e67e22;
  text-decoration: none;
}

.terms-link:hover {
  text-decoration: underline;
}

.terms-scroll-block {
  border: 1px solid #dee2e6;
  border-radius: 10px;
  padding: 12px;
  background: #f8f9fa;
}

.terms-scroll-label {
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.terms-scroll-box {
  max-height: 220px;
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid #ced4da;
  border-radius: 8px;
  padding: 12px 14px;
  background: #fff;
  margin-bottom: 8px;
}

.terms-scroll-content {
  font-size: 0.875rem;
  line-height: 1.5;
  color: #495057;
}

.terms-scroll-content p {
  margin-bottom: 0.6rem;
}

.terms-scroll-content strong {
  color: #2c3e50;
}

.terms-scroll-end {
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px dashed #adb5bd;
  color: #6c757d;
  font-style: italic;
}

.terms-scroll-hint {
  color: #856404;
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 0.85rem;
  margin: 0;
}

.terms-scroll-hint i {
  margin-right: 6px;
}

.terms-scroll-ok {
  color: #155724;
  background: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 0.85rem;
  margin: 0;
}

.terms-scroll-ok i {
  margin-right: 6px;
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

.btn-primary:hover:not(:disabled) {
  background-color: #d35400;
  border-color: #d35400;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.btn-primary:disabled {
  background-color: #f0ad4e;
  border-color: #f0ad4e;
  opacity: 0.7;
  cursor: not-allowed;
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

.login-link {
  text-align: center;
  margin-top: 20px;
  font-size: 15px;
  color: #7f8c8d;
}

.login-link a {
  color: #e67e22;
  font-weight: 600;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .register-card {
    padding: 30px 20px;
  }
  
  .login-divider::before,
  .login-divider::after {
    width: 30%;
  }
}
</style>

<script>
import { mapActions } from 'vuex';
import api from '@/services/api';

export default {
  name: 'RegisterView',
  data() {
    return {
      form: {
        name: '',
        email: '',
        documentType: 'V',
        identification: '',
        phoneCode: '0412',
        phoneNumber: '',
        password: '',
        password_confirmation: '',
        terms: false
      },
      showPassword: false,
      isLoading: false,
      errorMessage: '',
      errors: {},
      isEmailAvailable: true,
      isFormDirty: false,
      hasScrolledTermsToBottom: false
    };
  },
  computed: {
    passwordStrength() {
      const password = this.form.password;
      if (!password) {
        return { score: 0, text: '', class: '' };
      }
      
      let score = 0;
      let text = '';
      let colorClass = '';
      
      // Calcular puntuación basada en criterios
      if (password.length > 6) score += 20;
      if (password.length > 10) score += 10;
      if (/[A-Z]/.test(password)) score += 20;
      if (/[0-9]/.test(password)) score += 20;
      if (/[^A-Za-z0-9]/.test(password)) score += 20;
      
      // Determinar texto y clase basados en la puntuación
      if (score <= 20) {
        text = 'Muy débil';
        colorClass = 'very-weak';
      } else if (score <= 40) {
        text = 'Débil';
        colorClass = 'weak';
      } else if (score <= 60) {
        text = 'Moderada';
        colorClass = 'medium';
      } else if (score <= 80) {
        text = 'Fuerte';
        colorClass = 'strong';
      } else {
        text = 'Muy fuerte';
        colorClass = 'very-strong';
      }
      
      return { score, text, class: colorClass };
    },
    
    isFormValid() {
      const { name, email, documentType, identification, phoneCode, phoneNumber, password, password_confirmation, terms } = this.form;
      
      const requiredFieldsFilled = name && email && documentType && identification && phoneCode && phoneNumber && password && password_confirmation && terms && this.hasScrolledTermsToBottom;
      
      const noErrors = Object.keys(this.errors).length === 0;
      
      const emailValid = this.isEmailAvailable;
      
      const passwordsMatch = password === password_confirmation;
      
      const passwordStrengthOk = this.passwordStrength.score >= 40;
      
      return requiredFieldsFilled && noErrors && emailValid && passwordsMatch && passwordStrengthOk;
    }
  },
  methods: {
    ...mapActions('auth', ['register', 'login']),
    
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    
    // Validar email (incluyendo disponibilidad)
    async validateEmail() {
      if (!this.form.email) {
        this.errors.email = 'El correo electrónico es obligatorio';
        return;
      }
      
      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.form.email)) {
        this.errors.email = 'Por favor ingresa un correo electrónico válido';
        return;
      }
      
      // Eliminar error si pasa la validación
      delete this.errors.email;
      
      // Verificar disponibilidad del email
      try {
        const response = await api.post('/api/check_email', { email: this.form.email });
        this.isEmailAvailable = response.data.available;
        
        if (!this.isEmailAvailable) {
          this.errors.email = 'Este correo electrónico ya está registrado';
        }
      } catch (error) {
        //console.error('Error al verificar email:', error);
        // No añadir error aquí para permitir continuar el registro
      }
    },
    
    // Validar contraseña
    validatePassword() {
      this.isFormDirty = true;
      
      if (!this.form.password) {
        this.errors.password = 'La contraseña es obligatoria';
        return;
      }
      
      if (this.form.password.length < 8) {
        this.errors.password = 'La contraseña debe tener al menos 8 caracteres';
        return;
      }
      
      if (!/[A-Z]/.test(this.form.password)) {
        this.errors.password = 'La contraseña debe contener al menos una letra mayúscula';
        return;
      }
      
      if (!/[0-9]/.test(this.form.password)) {
        this.errors.password = 'La contraseña debe contener al menos un número';
        return;
      }
      
      // Eliminar error si pasa las validaciones
      delete this.errors.password;
      
      // Validar confirmación si ya existe
      if (this.form.password_confirmation) {
        this.validatePasswordConfirmation();
      }
    },
    
    // Validar confirmación de contraseña
    validatePasswordConfirmation() {
      this.isFormDirty = true;
      
      if (!this.form.password_confirmation) {
        this.errors.password_confirmation = 'Por favor confirma tu contraseña';
        return;
      }
      
      if (this.form.password !== this.form.password_confirmation) {
        this.errors.password_confirmation = 'Las contraseñas no coinciden';
        return;
      }
      // Eliminar error si pasa las validaciones
      delete this.errors.password_confirmation;
    },
    
    // Validar tipo de documento
    validateDocumentType() {
      if (!this.form.documentType) {
        this.errors.documentType = 'Debes seleccionar un tipo de documento';
        return;
      }
      
      // Eliminar error si pasa la validación
      delete this.errors.documentType;
    },
    
    // Validar identificación
    async validateIdentification() {
      if (!this.form.identification) {
        this.errors.identification = 'El número de identificación es obligatorio';
        return;
      }
      
      // Validar que solo contenga números y tenga entre 6 y 10 dígitos
      const identificationRegex = /^\d{6,10}$/;
      if (!identificationRegex.test(this.form.identification)) {
        this.errors.identification = 'El número de identificación debe contener entre 6 y 10 dígitos';
        return;
      }
      
      // Eliminar error si pasa la validación básica
      delete this.errors.identification;
      
      // Validar que el número de identificación no esté registrado
      try {
        const response = await api.post('/api/check_identity', { 
          type_identification: this.form.documentType, 
          n_identification: this.form.identification 
        });
        
        if (!response.data.available) {
          this.errors.identification = 'El número de identificación ya está registrado';
        }
      } catch (error) {
        //console.error('Error al verificar identificación:', error);
        // No añadir error aquí para permitir continuar el registro
      }
    },
    
    // Validar teléfono
    async validatePhone() {
      if (!this.form.phoneCode) {
        this.errors.phone = 'Debes seleccionar un código de área';
        return;
      }
      
      if (!this.form.phoneNumber) {
        this.errors.phone = 'El número de teléfono es obligatorio';
        return;
      }
      
      // Validar que el número solo contenga dígitos y tenga 7 dígitos
      const phoneRegex = /^\d{7}$/;
      if (!phoneRegex.test(this.form.phoneNumber)) {
        this.errors.phone = 'El número de teléfono debe tener 7 dígitos';
        return;
      }
      
      // Eliminar error si pasa la validación básica
      delete this.errors.phone;
      
      // Verificar si el teléfono ya existe
      try {
        const fullPhone = this.form.phoneCode + this.form.phoneNumber;
        const response = await api.post('/api/check_phone', { phone: fullPhone });
        
        if (!response.data.available) {
          this.errors.phone = 'Este número de teléfono ya está registrado';
        }
      } catch (error) {
        //console.error('Error al verificar teléfono:', error);
        // No añadir error aquí para permitir continuar el registro
      }
    },
    
    // Formatear número de teléfono (solo números)
    formatPhoneNumber() {
      // Remover cualquier carácter que no sea número
      this.form.phoneNumber = this.form.phoneNumber.replace(/\D/g, '');
    },
    
    // Validar términos y condiciones
    validateTerms() {
      if (!this.hasScrolledTermsToBottom) {
        this.errors.terms = 'Debes desplazarte hasta el final del texto de términos para poder aceptar.';
        return;
      }
      if (!this.form.terms) {
        this.errors.terms = 'Debes aceptar los términos y condiciones';
        return;
      }
      delete this.errors.terms;
    },
    onTermsScroll() {
      const el = this.$refs.termsScrollBox;
      if (!el || this.hasScrolledTermsToBottom) return;
      const tolerance = 15;
      const reachedBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - tolerance;
      if (reachedBottom) this.hasScrolledTermsToBottom = true;
    },
    
    // Validar todo el formulario
    async validateForm() {
      this.isFormDirty = true;
      this.errors = {};
      
      // Validar cada campo
      if (!this.form.name) {
        this.errors.name = 'El nombre es obligatorio';
      }
      
      await this.validateEmail();
      this.validateDocumentType();
      await this.validateIdentification();
      await this.validatePhone();
      this.validatePassword();
      this.validatePasswordConfirmation();
      this.validateTerms();
      
      return Object.keys(this.errors).length === 0;
    },
    
    // Mostrar términos y condiciones
    showTerms() {
      alert('Términos y condiciones en desarrollo');
      // Implementar modal o redirección a página de términos
    },
    
    // Mostrar política de privacidad
    showPrivacy() {
      alert('Política de privacidad en desarrollo');
      // Implementar modal o redirección a página de política
    },
    
    // Registro con redes sociales
    async socialRegister(provider) {
      try {
        this.isLoading = true;
        
        // Implementar lógica de registro social
        alert(`Registro con ${provider} en desarrollo`);
        
        // Simulación de tiempo de carga
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      } catch (error) {
        console.error(`Error en registro con ${provider}:`, error);
        this.isLoading = false;
      }
    },
    
    // Manejar registro
    async handleRegister() {
      try {
        // Validar formulario
        if (!(await this.validateForm())) {
          this.errorMessage = 'Por favor, corrige los errores en el formulario';
          return;
        }
        
        this.isLoading = true;
        this.errorMessage = '';
        
        // Crear objeto de registro
        const registerData = {
          name: this.form.name.trim(),
          email: this.form.email.trim(),
          type_identification: this.form.documentType,
          n_identification: this.form.identification.trim(),
          phone: this.form.phoneCode + this.form.phoneNumber,
          password: this.form.password,
          password_confirmation: this.form.password_confirmation
        };
        
        console.log('Enviando datos de registro:', {
          ...registerData,
          password: '********',
          password_confirmation: '********'
        });
        
        try {
          // Intentar registro
          await this.register(registerData);
          
          // Si el registro fue exitoso, iniciar sesión automáticamente
          const loginData = {
            email: registerData.email,
            password: registerData.password
          };
          
          await this.login(loginData);
          
          // Mostrar mensaje de éxito y redirigir al dashboard
          this.$router.push('/dashboard');
        } catch (error) {
          console.error('Error durante el registro:', error);
          
          // Manejar errores del servidor
          this.handleRegistrationError(error);
        }
      } catch (error) {
        console.error('Error general durante el registro:', error);
        this.errorMessage = 'Ocurrió un error inesperado. Por favor, intenta de nuevo más tarde.';
      } finally {
        this.isLoading = false;
      }
    },
    
    // Manejar errores específicos del registro
    handleRegistrationError(error) {
      if (error.response && error.response.status === 422) {
        // Errores de validación del servidor
        const validationErrors = error.response.data.errors || {};
        this.errors = validationErrors;
        
        // Mensaje general para errores de validación
        this.errorMessage = 'Por favor corrige los errores en el formulario.';
      } else if (error.response && error.response.status === 409) {
        // Conflicto (email ya registrado)
        this.errors.email = 'Este correo electrónico ya está registrado';
        this.errorMessage = 'El correo electrónico ya está en uso. Por favor usa otro o inicia sesión.';
      } else if (error.response) {
        // Otros errores del servidor
        this.errorMessage = error.response.data?.message || 
                           `Error del servidor: ${error.response.status} ${error.response.statusText}`;
      } else {
        // Errores de red u otros
        this.errorMessage = error.message || 'No se pudo conectar con el servidor. Verifica tu conexión.';
      }
    }
  }
};
</script>