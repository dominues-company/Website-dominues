<template>
  <div v-if="show" class="identity-overlay" @click="$emit('close')">
    <div class="identity-modal" @click.stop>
      <button type="button" class="btn-close-modal" @click="$emit('close')" aria-label="Cerrar">
        <i class="fas fa-times"></i>
      </button>

      <div class="modal-icon">
        <i class="fas fa-id-card"></i>
      </div>

      <h2 class="modal-title">Verificación de identidad</h2>
      <p class="modal-text">
        Para solicitar un retiro, debes tomar una foto de tu cédula de identidad y subirla. Nuestro equipo la revisará manualmente.
      </p>

      <div class="upload-area" @click="triggerFileInput">
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          capture="environment"
          class="hidden-input"
          @change="onFileSelected"
        />
        <div v-if="previewUrl" class="preview-container">
          <img :src="previewUrl" alt="Vista previa de cédula" class="preview-image" />
          <button type="button" class="btn-change-photo" @click.stop="triggerFileInput">
            Cambiar foto
          </button>
        </div>
        <div v-else class="upload-placeholder">
          <i class="fas fa-camera"></i>
          <span>Tomar o seleccionar foto de cédula</span>
        </div>
      </div>

      <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>

      <button
        type="button"
        class="btn-submit"
        :disabled="!selectedFile || isUploading"
        @click="submit"
      >
        <span v-if="isUploading" class="spinner-border spinner-border-sm me-2"></span>
        {{ isUploading ? 'Enviando...' : 'Enviar y continuar' }}
      </button>
    </div>
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  name: 'IdentityVerificationModal',
  props: {
    show: { type: Boolean, default: false }
  },
  emits: ['close', 'uploaded'],
  data() {
    return {
      selectedFile: null,
      previewUrl: null,
      isUploading: false,
      errorMessage: ''
    };
  },
  watch: {
    show(value) {
      if (!value) {
        this.reset();
      }
    }
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    onFileSelected(event) {
      const file = event.target.files[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        this.errorMessage = 'Solo se permiten imágenes.';
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        this.errorMessage = 'La imagen no puede superar 10 MB.';
        return;
      }

      this.selectedFile = file;
      this.errorMessage = '';
      this.previewUrl = URL.createObjectURL(file);
    },
    async submit() {
      if (!this.selectedFile) return;

      this.isUploading = true;
      this.errorMessage = '';

      try {
        const formData = new FormData();
        formData.append('identity_document', this.selectedFile);

        await api.post('/api/identity-verification/upload', formData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
            'Content-Type': 'multipart/form-data'
          }
        });

        this.$emit('uploaded');
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Error al subir el documento. Intenta de nuevo.';
      } finally {
        this.isUploading = false;
      }
    },
    reset() {
      if (this.previewUrl) {
        URL.revokeObjectURL(this.previewUrl);
      }
      this.selectedFile = null;
      this.previewUrl = null;
      this.errorMessage = '';
      this.isUploading = false;
    }
  },
  beforeUnmount() {
    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
    }
  }
};
</script>

<style scoped>
.identity-overlay {
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

.identity-modal {
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%);
  border-radius: 20px;
  padding: 32px 24px;
  width: 100%;
  max-width: 420px;
  position: relative;
  text-align: center;
  color: #fff;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.btn-close-modal {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-icon {
  font-size: 3rem;
  color: #fbbf24;
  margin-bottom: 16px;
}

.modal-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 12px;
}

.modal-text {
  font-size: 0.95rem;
  line-height: 1.5;
  opacity: 0.9;
  margin-bottom: 24px;
}

.upload-area {
  background: rgba(255, 255, 255, 0.08);
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  padding: 24px;
  cursor: pointer;
  margin-bottom: 16px;
  min-height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hidden-input {
  display: none;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: rgba(255, 255, 255, 0.8);
}

.upload-placeholder i {
  font-size: 2.5rem;
  color: #fbbf24;
}

.preview-container {
  width: 100%;
}

.preview-image {
  max-width: 100%;
  max-height: 200px;
  border-radius: 8px;
  object-fit: contain;
}

.btn-change-photo {
  margin-top: 12px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #fff;
  padding: 6px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
}

.error-text {
  color: #fca5a5;
  font-size: 0.85rem;
  margin-bottom: 12px;
}

.btn-submit {
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

.btn-submit:hover:not(:disabled) {
  background: #d35400;
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
