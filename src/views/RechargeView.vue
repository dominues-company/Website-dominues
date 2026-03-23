<template>
  <div class="recharge-container">
    <div class="recharge-card">
      <div class="recharge-header">
        <h2>Recargas</h2>
        <p>Elige el método de pago para recargar tu cuenta</p>
      </div>

      <!-- Loading para determinar método -->
      <div v-if="isLoadingMethod" class="method-loading">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Determinando método de pago...</span>
        </div>
        <p class="mt-2">Determinando método de pago preferido...</p>
      </div>

      <!-- Contenido cuando ya se determinó el método -->
      <template v-if="!isLoadingMethod">
        <!-- Selector de método de pago -->
        <div class="payment-method-selector" v-if="!showOnlyLastMethod">
          <button
            type="button"
            class="method-tab"
            :class="{ active: paymentMethod === 'pagomovil' }"
            @click="paymentMethod = 'pagomovil'"
          >
            <i class="fas fa-mobile-alt me-2"></i> Pago Móvil
          </button>
          <button
            type="button"
            class="method-tab"
            :class="{ active: paymentMethod === 'blockbee' }"
            @click="paymentMethod = 'blockbee'; blockbeePaymentUrl = null; blockbeeError = ''"
          >
            <img src="https://dominues.com/blockbee_logo.png" alt="BlockBee" class="method-tab-logo"> Cripto (USDT)
          </button>
        </div>

        <!-- Indicador del método seleccionado cuando solo se muestra uno -->
        <div class="selected-method-indicator" v-if="showOnlyLastMethod">
          <div class="method-badge" :class="lastRechargeMethod === 'blockbee' ? 'method-crypto' : 'method-fiat'">
            <i v-if="lastRechargeMethod === 'blockbee'" class="fab fa-bitcoin me-2"></i>
            <i v-else class="fas fa-mobile-alt me-2"></i>
            {{ lastRechargeMethod === 'blockbee' ? 'Cripto (USDT)' : 'Pago Móvil' }}
          </div>
        </div>
      </template>

      <div v-if="errorMessage" class="alert alert-danger alert-dismissible fade show" role="alert">
        {{ errorMessage }}
        <button type="button" class="btn-close" @click="errorMessage = ''" aria-label="Close"></button>
      </div>

      <div v-if="successMessage" class="alert alert-success alert-dismissible fade show" role="alert">
        {{ successMessage }}
        <button type="button" class="btn-close" @click="successMessage = ''" aria-label="Close"></button>
      </div>

      <!-- Mensaje al volver de BlockBee (success) -->
      <div v-if="blockbeeReturnMessage" class="alert alert-dismissible fade show" :class="blockbeeReturnType === 'success' ? 'alert-success' : 'alert-info'" role="alert">
        <i :class="blockbeeReturnType === 'success' ? 'fas fa-check-circle me-2' : 'fas fa-info-circle me-2'"></i>
        {{ blockbeeReturnMessage }}
        <button type="button" class="btn-close" @click="dismissBlockBeeReturn" aria-label="Close"></button>
      </div>

      <!-- ========== PAGO MÓVIL (sin cambios) ========== -->
      <div v-show="paymentMethod === 'pagomovil'">
      <!-- Información del usuario -->
      <div class="user-info-section" v-if="!loadingAccountInfo">
        <div class="info-item">
          <label>METODO:</label>
          <div class="info-value">
            <span>{{ accountInfo.account_number }}</span>
          </div>
        </div>

        <div class="info-item">
          <label>BANCO:</label>
          <div class="info-value">
            <span>({{ accountInfo.code_bank }}) {{ accountInfo.bank_name }}</span>
            <button class="copy-btn" @click="copyToClipboard(accountInfo.code_bank)">
              <i class="fas fa-copy"></i>
            </button>
          </div>
        </div>
        
        <div class="info-item">
          <label>DOCUMENTO:</label>
          <div class="info-value">
            <span>{{ accountInfo.type_identification }}-{{ accountInfo.n_identification }}</span>
            <button class="copy-btn" @click="copyToClipboard(`${accountInfo.type_identification}-${accountInfo.n_identification}`)">
              <i class="fas fa-copy"></i>
            </button>
          </div>
        </div>
        
        <div class="info-item">
          <label>TELÉFONO:</label>
          <div class="info-value">
            <span>{{ accountInfo.phone }}</span>
            <button class="copy-btn" @click="copyToClipboard(accountInfo.phone)">
              <i class="fas fa-copy"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Loading state para información de cuenta -->
      <div class="user-info-section" v-else>
        <div class="loading-placeholder">
          <div class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></div>
          Cargando información de la cuenta...
        </div>
      </div>

      <!-- Formulario de recarga -->
      <form @submit.prevent="handleRecharge">
        <div class="form-group">
          <label for="amount">Monto a Recargar (Bs.)</label>
          <div class="input-group">
            <span class="input-icon"><i class="fas fa-money-bill-wave"></i></span>
            <input 
              type="number" 
              id="amount" 
              class="form-control" 
              placeholder="250.00" 
              v-model="form.amount"
              required
              :disabled="isLoading"
              :class="{'is-invalid': errors.amount}"
              @input="validateAmount"
              min="250"
              step="0.01"
            >
          </div>
          <div v-if="errors.amount" class="error-message">
            <i class="fas fa-exclamation-circle"></i> {{ errors.amount }}
          </div>
          <div class="amount-info">
            <small>Monto mínimo: Bs. 250,00</small>
          </div>
        </div>


        <div class="form-group">
          <label for="reference">Número de Referencia</label>
          <div class="input-group">
            <span class="input-icon"><i class="fas fa-hashtag"></i></span>
            <input 
              type="text" 
              id="reference" 
              class="form-control" 
              placeholder="Número de referencia del pago móvil" 
              v-model="form.reference"
              required
              :disabled="isLoading"
              :class="{'is-invalid': errors.reference}"
              @blur="validateReference"
              maxlength="20"
            >
          </div>
          <div v-if="errors.reference" class="error-message">
            <i class="fas fa-exclamation-circle"></i> {{ errors.reference }}
          </div>
        </div>

        <div class="form-group">
          <label for="paymentProof">Comprobante de Pago (Opcional)</label>
          <div class="file-upload-container">
            <input 
              type="file" 
              id="paymentProof" 
              ref="fileInput"
              class="file-input"
              accept=".png,.jpg,.jpeg,.svg"
              @change="handleFileUpload"
              :disabled="isLoading"
            >
            <div class="file-upload-area" @click="triggerFileInput">
              <div v-if="!form.paymentProof" class="upload-placeholder">
                <i class="fas fa-cloud-upload-alt"></i>
                <p>Haz clic para subir comprobante</p>
                <small>Solo PNG, JPG, SVG (máx. 5MB)</small>
              </div>
              <div v-else class="file-preview">
                <div class="file-info">
                  <i class="fas fa-file-image"></i>
                  <span>{{ form.paymentProof.name }}</span>
                  <button type="button" class="remove-file" @click.stop="removeFile">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
                <div class="image-preview" v-if="isImageFile">
                  <img :src="form.paymentProof.preview" :alt="form.paymentProof.name">
                </div>
              </div>
            </div>
            <div v-if="errors.paymentProof" class="error-message">
              <i class="fas fa-exclamation-circle"></i> {{ errors.paymentProof }}
            </div>
          </div>
        </div>

        <button type="submit" class="btn btn-primary btn-block" :disabled="isLoading || !isFormValid">
          <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          <i v-else class="fas fa-credit-card me-2"></i> 
          {{ isLoading ? 'Procesando...' : 'Solicitar Recarga' }}
        </button>
      </form>

      <!-- Información importante -->
      <div class="important-info" v-if="!loadingAccountInfo">
        <h4>Información Importante:</h4>
        <ul>
          <li>La transacción será validada en pocos minutos</li>
          <li>Usaremos tu número telefónico: <strong>{{ accountInfo.phone }}</strong> y tu documento de identidad registrado: <strong>{{ accountInfo.type_identification }}-{{ accountInfo.n_identification }}</strong> para recargas y retiros</li>
          <li>El monto mínimo de cada recarga es de <strong>Bs. 250,00</strong></li>
          <li>Los montos se acreditan automáticamente una vez verificado el pago</li>
        </ul>
      </div>
      </div>
      <!-- Fin Pago Móvil -->

      <!-- ========== BLOCKBEE ========== -->
      <div v-show="paymentMethod === 'blockbee'" class="blockbee-section">
        <p class="method-description">Recarga tu saldo pagando con <strong>USDT</strong> a través de BlockBee.</p>

        <!-- Advertencia de red -->
        <div class="blockbee-warning">
          <div class="blockbee-warning-icon">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <div class="blockbee-warning-text">
            <strong>¡Atención! Solo aceptamos USDT por la red BEP20 (Binance Smart Chain).</strong>
            <span>Enviar por otra red (como Tron o Ethereum) resultará en la <strong>pérdida total de tus fondos</strong>.</span>
          </div>
        </div>

        <div v-if="blockbeePaymentUrl" class="blockbee-payment-box">
          <div class="payment-ready">
            <i class="fas fa-check-circle text-success" style="font-size:2rem;"></i>
            <h4 class="mt-2">Enlace de pago generado</h4>
            <p>Haz clic en el botón para completar tu pago con <strong>USDT BEP20</strong>.</p>
            <a :href="blockbeePaymentUrl" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-block">
              <i class="fas fa-external-link-alt me-2"></i> Ir a pagar en BlockBee
            </a>
            <p class="mt-3 small" style="color:#495057;">Cuando termines de pagar, tu transacción quedará en revisión y un administrador la aprobará en breve.</p>
            <button type="button" class="btn btn-outline-secondary btn-sm mt-2" @click="blockbeePaymentUrl = null; blockbeeForm.amount = ''">
              Crear otra recarga
            </button>
          </div>
        </div>

        <form v-else @submit.prevent="handleBlockBeeRecharge" class="blockbee-form">
          <div class="form-group">
            <label for="blockbee-amount">Monto (USD)</label>
            <div class="input-group">
              <span class="input-icon"><i class="fas fa-dollar-sign"></i></span>
              <input
                type="number"
                id="blockbee-amount"
                v-model="blockbeeForm.amount"
                class="form-control"
                placeholder="10.00"
                min="1"
                step="0.01"
                required
                :disabled="blockbeeLoading"
              >
            </div>
            <div class="amount-info"><small>Monto mínimo: $1.00 USD</small></div>
          </div>
          <div v-if="blockbeeError" class="alert alert-danger py-2">{{ blockbeeError }}</div>
          <button type="submit" class="btn btn-primary btn-block" :disabled="blockbeeLoading || !blockbeeForm.amount || parseFloat(blockbeeForm.amount) < 1">
            <span v-if="blockbeeLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            <i v-else class="fas fa-link me-2"></i>
            {{ blockbeeLoading ? 'Generando enlace...' : 'Generar enlace de pago' }}
          </button>
        </form>

        <div class="important-info mt-4">
          <h4>Información:</h4>
          <ul>
            <li>Solo se acepta <strong>USDT por la red BEP20</strong> (Binance Smart Chain).</li>
            <li>El monto se ingresa en USD y se convierte automáticamente a USDT.</li>
            <li>Tu transacción quedará en revisión hasta que un administrador la apruebe.</li>
          </ul>
        </div>
      </div>
      <!-- Fin BlockBee -->

    </div>
  </div>
</template>

<style scoped>
.recharge-container {
  margin-top: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.recharge-card {
  width: 100%;
  max-width: 800px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  padding: 40px;
  transition: transform 0.3s ease;
}

.recharge-card:hover {
  transform: translateY(-5px);
}

.recharge-header {
  text-align: center;
  margin-bottom: 30px;
}

.recharge-header h2 {
  color: #2c3e50;
  font-weight: 700;
  margin-bottom: 10px;
}

.recharge-header p {
  color: #7f8c8d;
  font-size: 16px;
}

.payment-method-selector {
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 0;
}

.method-tab {
  padding: 12px 20px;
  border: none;
  background: transparent;
  color: #6c757d;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  margin-bottom: -2px;
  transition: all 0.2s ease;
  border-radius: 8px 8px 0 0;
}

.method-tab:hover {
  color: #e67e22;
  background: #fef7f0;
}

.method-tab.active {
  color: #e67e22;
  border-bottom-color: #e67e22;
  background: #fef7f0;
}

.method-tab-logo {
  height: 22px;
  width: auto;
  vertical-align: middle;
  margin-right: 8px;
  display: inline-block;
}

.selected-method-indicator {
  text-align: center;
  margin-bottom: 24px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 10px;
  border: 2px solid #e9ecef;
}

.method-badge {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 8px;
}

.method-crypto {
  background-color: #e8f5e9;
  color: #2e7d32;
  border: 1px solid #c8e6c9;
}

.method-fiat {
  background-color: #e3f2fd;
  color: #1565c0;
  border: 1px solid #bbdefb;
}

.text-muted {
  color: #6c757d;
  font-size: 12px;
}

.method-loading {
  text-align: center;
  padding: 40px 20px;
  background: #f8f9fa;
  border-radius: 10px;
  margin-bottom: 24px;
  border: 2px solid #e9ecef;
}

.method-loading .spinner-border {
  width: 3rem;
  height: 3rem;
  border-width: 0.3em;
}

.method-loading p {
  color: #6c757d;
  font-size: 14px;
  margin: 0;
  font-weight: 500;
}

.blockbee-section .method-description {
  color: #495057;
  margin-bottom: 16px;
  font-size: 15px;
}

.blockbee-warning {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  background: #fffbe6;
  border: 2px solid #f5a623;
  border-left: 6px solid #f5a623;
  border-radius: 10px;
  padding: 16px 18px;
  margin-bottom: 24px;
}

.blockbee-warning-icon {
  font-size: 1.6rem;
  color: #f5a623;
  flex-shrink: 0;
  margin-top: 2px;
}

.blockbee-warning-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;
  color: #7a4f00;
  line-height: 1.5;
}

.blockbee-warning-text strong {
  font-size: 15px;
  color: #5a3700;
}

.blockbee-payment-box {
  background: #f0f9f0;
  border: 1px solid #c3e6c3;
  border-radius: 10px;
  padding: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.blockbee-payment-box .payment-ready h4 {
  color: #2c3e50;
  margin-bottom: 8px;
}

.blockbee-payment-box .payment-ready p {
  color: #495057;
}

.blockbee-form .form-control {
  height: 50px;
  border-radius: 10px;
  padding-left: 45px;
}

.user-info-section {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.info-item:last-child {
  margin-bottom: 0;
}

.loading-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: #6c757d;
  font-style: italic;
}

.info-item label {
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.info-value {
  display: flex;
  align-items: center;
  gap: 10px;
}

.info-value span {
  font-family: 'Courier New', monospace;
  font-weight: 600;
  color: #495057;
}

.copy-btn {
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.copy-btn:hover {
  color: #e67e22;
  background: #f8f9fa;
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
  z-index: 1;
}

.form-control {
  height: 50px;
  border-radius: 10px;
  border: 2px solid #e0e0e0;
  transition: all 0.3s ease;
  font-size: 16px;
  padding-left: 45px;
}

.form-control:focus {
  border-color: #e67e22;
  box-shadow: 0 0 0 0.2rem rgba(230, 126, 34, 0.25);
}

.error-message {
  color: #dc3545;
  font-size: 0.85rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 5px;
}

.amount-info {
  margin-top: 5px;
}

.amount-info small {
  color: #6c757d;
}

.file-upload-container {
  position: relative;
}

.file-input {
  display: none;
}

.file-upload-area {
  border: 2px dashed #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f8f9fa;
}

.file-upload-area:hover {
  border-color: #e67e22;
  background: #fef7f0;
}

.upload-placeholder {
  color: #6c757d;
}

.upload-placeholder i {
  font-size: 2rem;
  margin-bottom: 10px;
  color: #e67e22;
}

.upload-placeholder p {
  margin: 10px 0 5px 0;
  font-weight: 600;
  color: #2c3e50;
}

.upload-placeholder small {
  color: #6c757d;
  font-size: 0.85rem;
}

.file-preview {
  text-align: left;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  padding: 10px;
  background: white;
  border-radius: 5px;
  border: 1px solid #e0e0e0;
}

.file-info i {
  color: #e67e22;
  font-size: 1.2rem;
}

.file-info span {
  flex: 1;
  color: #2c3e50;
  font-weight: 500;
  word-break: break-all;
}

.remove-file {
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.remove-file:hover {
  background: #c82333;
  transform: scale(1.1);
}

.image-preview {
  max-width: 200px;
  margin: 0 auto;
}

.image-preview img {
  width: 100%;
  height: auto;
  border-radius: 5px;
  border: 1px solid #e0e0e0;
  max-height: 150px;
  object-fit: cover;
}

.bank-selection {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 10px;
}

.bank-option {
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  background: white;
}

.bank-option:hover {
  border-color: #e67e22;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.bank-option.selected {
  border-color: #e67e22;
  background: #fef7f0;
}

.bank-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  margin-bottom: 10px;
}

.bank-logo img {
  max-height: 40px;
  max-width: 100%;
}

.bank-placeholder {
  background: #e9ecef;
  color: #6c757d;
  padding: 8px 12px;
  border-radius: 5px;
  font-weight: 600;
  font-size: 14px;
}

.bank-info {
  text-align: center;
  position: relative;
}

.bank-name {
  font-weight: 600;
  color: #2c3e50;
  font-size: 14px;
  margin-bottom: 5px;
}

.bank-code {
  font-family: 'Courier New', monospace;
  color: #6c757d;
  font-size: 12px;
  margin-bottom: 10px;
}

.new-tag {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #e67e22;
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 10px;
  font-weight: 600;
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

.important-info {
  background: #e8f4fd;
  border-left: 4px solid #e67e22;
  border-radius: 5px;
  padding: 20px;
  margin-top: 30px;
}

.important-info h4 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 16px;
}

.important-info ul {
  margin: 0;
  padding-left: 20px;
}

.important-info li {
  color: #495057;
  margin-bottom: 8px;
  font-size: 14px;
}

.important-info strong {
  color: #e67e22;
}

.alert {
  border-radius: 10px;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .recharge-container {
    padding: 80px 10px 20px 10px;
  }
  
  .recharge-card {
    padding: 20px 15px;
  }
  
  .bank-selection {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .info-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>

<script>
import api from '@/services/api';
import EventBus from '@/EventBus';

export default {
  name: 'RechargeView',
  data() {
    return {
      paymentMethod: 'pagomovil',
      form: {
        amount: '',
        reference: '',
        paymentProof: null
      },
      isLoading: false,
      loadingAccountInfo: true,
      errorMessage: '',
      successMessage: '',
      errors: {},
      // BlockBee
      blockbeeForm: { amount: '' },
      blockbeeLoading: false,
      blockbeePaymentUrl: null,
      blockbeeError: '',
      blockbeeReturnMessage: '',
      blockbeeReturnType: 'success',
      accountInfo: {
        account_id: null,
        account_number: '',
        code_bank: '',
        bank_name: '',
        type_identification: '',
        n_identification: '',
        phone: ''
      },
      lastRechargeMethod: null, // Método de la última recarga
      showOnlyLastMethod: false, // Si debe mostrar solo el método de la última recarga
      isLoadingMethod: true, // Loading para determinar método preferido
      banks: [
        {
          code: '0175',
          name: 'BDT',
          fullName: 'Banco Digital de las Trabajadoras',
          isNew: true
        },
        {
          code: '0171',
          name: 'ACTIVO',
          fullName: 'Banco Universal'
        },
        {
          code: '0102',
          name: 'VENEZUELA',
          fullName: 'Banco de Venezuela'
        },
        {
          code: '0169',
          name: 'MI BANCO',
          fullName: 'Mi Banco'
        }
      ]
    };
  },
  computed: {
    isFormValid() {
      const { amount, reference } = this.form;
      const requiredFieldsFilled = amount && reference;
      const noErrors = Object.keys(this.errors).length === 0;
      const amountValid = parseFloat(amount) >= 250;
      
      return requiredFieldsFilled && noErrors && amountValid;
    },
    
    isImageFile() {
      if (!this.form.paymentProof) return false;
      const imageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
      return imageTypes.includes(this.form.paymentProof.type);
    }
  },
  async mounted() {
    this.handleBlockBeeReturnQuery();
    await this.loadAccountInfo();
    await this.loadLastRecharge();
  },
  methods: {
    // Cargar última recarga para determinar método preferido
    async loadLastRecharge() {
      try {
        console.log('Cargando última recarga...');
        this.isLoadingMethod = true;
        
        // Intentar diferentes parámetros para obtener depósitos
        let response;
        try {
          // Primer intento con type=dep
          response = await api.get('/api/transactions?limit=1&type=dep', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            }
          });
        } catch (e) {
          console.log('Error con type=dep, intentando con type=deposito');
          // Segundo intento con type=deposito
          response = await api.get('/api/transactions?limit=1&type=deposito', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            }
          });
        }
        
        console.log('Respuesta de API:', response.data);
        
        if (response.data.transactions && response.data.transactions.length > 0) {
          const lastRecharge = response.data.transactions[0];
          console.log('Última recarga cruda:', lastRecharge);
          
          this.lastRechargeMethod = lastRecharge.payment_method;
          this.showOnlyLastMethod = true;
          
          // Establecer el método de pago al de la última recarga
          this.paymentMethod = this.lastRechargeMethod;
          
          console.log('Última recarga encontrada:', {
            method: this.lastRechargeMethod,
            id: lastRecharge.id,
            date: lastRecharge.created_at,
            payment_method: lastRecharge.payment_method,
            showOnlyLastMethod: this.showOnlyLastMethod,
            currentPaymentMethod: this.paymentMethod
          });
        } else {
          console.log('No se encontraron transacciones de depósito, intentando sin filtro');
          // Intentar sin filtro de tipo, solo obtener la última transacción
          const allResponse = await api.get('/api/transactions?limit=5', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            }
          });
          
          console.log('Respuesta sin filtro:', allResponse.data);
          
          if (allResponse.data.transactions && allResponse.data.transactions.length > 0) {
            // Buscar la primera transacción que sea un depósito
            const lastDeposit = allResponse.data.transactions.find(t => 
              t.type_transaction === 'dep' || 
              t.type_transaction === 'deposito' ||
              t.type_transaction === 'deposit'
            );
            
            if (lastDeposit) {
              console.log('Depósito encontrado:', lastDeposit);
              this.lastRechargeMethod = lastDeposit.payment_method;
              this.showOnlyLastMethod = true;
              this.paymentMethod = this.lastRechargeMethod;
              
              console.log('Última recarga encontrada (sin filtro):', {
                method: this.lastRechargeMethod,
                id: lastDeposit.id,
                date: lastDeposit.created_at,
                payment_method: lastDeposit.payment_method
              });
            } else {
              console.log('No se encontraron depósitos en las transacciones recientes');
              this.showOnlyLastMethod = false;
            }
          } else {
            console.log('No se encontraron transacciones');
            this.showOnlyLastMethod = false;
          }
        }
      } catch (error) {
        console.error('Error al cargar última recarga:', error);
        // Si hay error, mostramos ambos métodos por defecto
        this.showOnlyLastMethod = false;
      } finally {
        // Siempre ocultar el loading al final
        this.isLoadingMethod = false;
      }
    },
    
    // Cargar información de la cuenta del usuario
    async loadAccountInfo() {
      try {
        this.loadingAccountInfo = true;
        const response = await api.get('/api/accounts_recharge');
        
        this.accountInfo = {
          account_id: response.data.accounts[0].id || response.data.accounts[0].account_id,
          account_number: response.data.accounts[0].account_number,
          code_bank: response.data.accounts[0].bank.code,
          bank_name: response.data.accounts[0].bank.name,
          type_identification: response.data.accounts[0].type_identification,
          n_identification: response.data.accounts[0].n_identification,
          phone: response.data.accounts[0].phone
        };
      } catch (error) {
        console.error('Error al cargar información de la cuenta:', error);
        this.errorMessage = 'Error al cargar la información de tu cuenta. Por favor, intenta de nuevo.';
      } finally {
        this.loadingAccountInfo = false;
      }
    },
    
    // Manejar subida de archivo
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      // Validar tipo de archivo
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
      if (!allowedTypes.includes(file.type)) {
        this.errors.paymentProof = 'Solo se permiten archivos PNG, JPG, JPEG y SVG';
        return;
      }
      
      // Validar tamaño (5MB máximo)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        this.errors.paymentProof = 'El archivo no puede ser mayor a 5MB';
        return;
      }
      
      // Limpiar errores
      delete this.errors.paymentProof;
      
      // Crear preview para imágenes
      const reader = new FileReader();
      reader.onload = (e) => {
        this.form.paymentProof = {
          file: file,
          name: file.name,
          size: file.size,
          type: file.type,
          preview: e.target.result
        };
        console.log('Archivo guardado:', this.form.paymentProof);
      };
      reader.readAsDataURL(file);
    },
    
    // Activar input de archivo
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    
    // Remover archivo
    removeFile() {
      this.form.paymentProof = null;
      this.$refs.fileInput.value = '';
      delete this.errors.paymentProof;
    },
    
    validateAmount() {
      const amount = parseFloat(this.form.amount);
      
      if (!this.form.amount) {
        this.errors.amount = 'El monto es obligatorio';
        return;
      }
      
      if (amount < 250) {
        this.errors.amount = 'El monto mínimo es de Bs. 250,00';
        return;
      }
      
      delete this.errors.amount;
    },
    
    validateReference() {
      if (!this.form.reference) {
        this.errors.reference = 'El número de referencia es obligatorio';
        return;
      }
      
      if (this.form.reference.length < 3) {
        this.errors.reference = 'El número de referencia debe tener al menos 3 caracteres';
        return;
      }
      
      delete this.errors.reference;
    },
    
    async copyToClipboard(text) {
      try {
        await navigator.clipboard.writeText(text);
        // Mostrar notificación de éxito
        this.$toast?.success('Copiado al portapapeles');
      } catch (error) {
        console.error('Error al copiar:', error);
        // Fallback para navegadores que no soportan clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
    },
    
    async handleRecharge() {
      try {
        // Validar formulario
        this.errors = {};
        this.validateAmount();
        this.validateReference();
        
        
        if (!this.isFormValid) {
          this.errorMessage = 'Por favor, corrige los errores en el formulario';
          return;
        }
        
        this.isLoading = true;
        this.errorMessage = '';
        this.successMessage = '';
        
        // Crear FormData para incluir archivo
        const formData = new FormData();
        formData.append('amount', parseFloat(this.form.amount));
        formData.append('reference', this.form.reference);
        formData.append('account_id', this.accountInfo.account_id);
        if (this.form.paymentProof && this.form.paymentProof.file) {
          formData.append('payment_proof', this.form.paymentProof.file);
          console.log('Archivo adjuntado:', this.form.paymentProof.file);
        }
        
        // Debug: Mostrar contenido del FormData
        console.log('FormData contents:');
        for (let [key, value] of formData.entries()) {
          console.log(key, value);
        }
        
        console.log('Enviando datos de recarga:', {
          amount: parseFloat(this.form.amount),
          reference: this.form.reference,
          account_id: this.accountInfo.account_id,
          hasFile: !!this.form.paymentProof,
          fileName: this.form.paymentProof?.name
        });
        
        try {
          // Llamar al endpoint de recarga
          await api.post('/api/recharge_api', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            }
          });
          
          // Mostrar toast de éxito
          EventBus.emit('show-notification', {
            type: 'success',
            message: 'Solicitud de recarga enviada exitosamente. Será procesada en pocos minutos.',
            duration: 2000
          });
          
          // Limpiar formulario
          this.form = {
            amount: '',
            reference: '',
            paymentProof: null
          };
          this.$refs.fileInput.value = '';
          
          // Redirigir al dashboard después de 2 segundos
          setTimeout(() => {
            this.$router.push('/dashboard');
          }, 2000);
          
        } catch (error) {
          console.error('Error durante la recarga:', error);
          this.handleRechargeError(error);
        }
      } catch (error) {
        console.error('Error general durante la recarga:', error);
        this.errorMessage = 'Ocurrió un error inesperado. Por favor, intenta de nuevo más tarde.';
      } finally {
        this.isLoading = false;
      }
    },
    
    handleRechargeError(error) {
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

    handleBlockBeeReturnQuery() {
      const q = this.$route?.query || {};
      const payment = q.payment;
      if (payment !== 'success') return;

      this.blockbeeReturnMessage = 'Pago recibido en BlockBee. Tu transacción quedará en revisión hasta que un administrador la apruebe.';
      this.blockbeeReturnType = 'success';
      this.paymentMethod = 'blockbee';
      this.blockbeePaymentUrl = null;
      this.blockbeeError = '';

      if (this.$router?.replace) {
        const query = { ...this.$route.query };
        delete query.payment;
        delete query.order_id;
        delete query.payment_id;
        this.$router.replace({ path: this.$route.path, query: Object.keys(query).length ? query : undefined });
      }
    },

    dismissBlockBeeReturn() {
      this.blockbeeReturnMessage = '';
      this.blockbeeReturnType = 'success';
    },

    async handleBlockBeeRecharge() {
      const amount = parseFloat(this.blockbeeForm.amount);
      if (!amount || amount < 1) {
        this.blockbeeError = 'El monto mínimo es $1.00 USD.';
        return;
      }
      this.blockbeeError = '';
      this.blockbeeLoading = true;
      try {
        const { data } = await api.post('/api/recharge/blockbee/create', {
          amount: amount.toFixed(2)
        });
        if (data?.success && data?.payment_url) {
          this.blockbeePaymentUrl = data.payment_url;
        } else {
          this.blockbeeError = data?.message || 'No se recibió el enlace de pago. Revisa el backend.';
        }
      } catch (error) {
        const msg = error.response?.data?.message || error.message || 'Error al generar el enlace de pago.';
        this.blockbeeError = msg;
      } finally {
        this.blockbeeLoading = false;
      }
    }
  }
};
</script>
