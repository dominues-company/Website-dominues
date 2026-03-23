<template>
  <div class="profile-page">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <!-- Header del perfil -->
          <div class="profile-header">
            <div class="profile-avatar">
              <div class="avatar-circle">
                <i class="fas fa-user"></i>
              </div>
              <button class="btn-edit-avatar" @click="editAvatar = true" title="Cambiar foto de perfil">
                <i class="fas fa-camera"></i>
              </button>
            </div>
            <div class="profile-info">
              <div class="profile-name-section">
                <h1 class="profile-name">{{ currentUser?.name || 'Usuario' }}</h1>
                <p class="profile-email">{{ currentUser?.email || '' }}</p>
              </div>
              <div class="profile-badges">
                <span class="badge badge--base" v-if="currentUser?.rol">
                  <i class="fas fa-crown"></i> {{ currentUser.rol.toUpperCase() }}
                </span>
                <span class="badge badge--success" v-if="currentUser?.status === 'activo'">
                  <i class="fas fa-check-circle"></i> Activo
                </span>
              </div>
            </div>
          </div>

          <!-- Estadísticas del usuario -->
          <div class="profile-stats">
            <div class="row">
              <div class="col-md-4">
                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="fas fa-coins"></i>
                  </div>
                  <div class="stat-content">
                    <h3>{{ formatCurrency(currentUser?.balance) }}</h3>
                    <p>Saldo Actual</p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="fas fa-star"></i>
                  </div>
                  <div class="stat-content">
                    <h3>{{ currentUser?.points || '0' }}</h3>
                    <p>Puntos</p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="fas fa-calendar-alt"></i>
                  </div>
                  <div class="stat-content">
                    <h3>{{ formatDate(currentUser?.created_at) }}</h3>
                    <p>Miembro desde</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Información del perfil -->
          <div class="profile-details">
            <div class="card">
              <div class="card-header">
                <h3><i class="fas fa-user-edit"></i> Información Personal</h3>
                <button class="btn btn--base btn--sm" @click="toggleEdit">
                  <i class="fas fa-edit"></i> {{ isEditing ? 'Cancelar' : 'Editar' }}
                </button>
              </div>
              <div class="card-body">
                <form @submit.prevent="updateProfile" v-if="isEditing">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="name">Nombre completo</label>
                        <input 
                          type="text" 
                          id="name" 
                          v-model="editForm.name" 
                          class="form-control"
                          :class="{ 'is-invalid': errors.name }"
                          required
                        >
                        <div class="invalid-feedback" v-if="errors.name">{{ errors.name }}</div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="email">Correo electrónico</label>
                        <input 
                          type="email" 
                          id="email" 
                          v-model="editForm.email" 
                          class="form-control"
                          :class="{ 'is-invalid': errors.email }"
                          required
                        >
                        <div class="invalid-feedback" v-if="errors.email">{{ errors.email }}</div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="phone">Teléfono</label>
                        <input 
                          type="tel" 
                          id="phone" 
                          v-model="editForm.phone" 
                          class="form-control"
                          :class="{ 'is-invalid': errors.phone }"
                        >
                        <div class="invalid-feedback" v-if="errors.phone">{{ errors.phone }}</div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="rol">Rol</label>
                        <input 
                          type="text" 
                          id="rol" 
                          v-model="editForm.rol" 
                          class="form-control"
                          disabled
                        >
                        <small class="form-text text-muted">El rol no puede ser modificado</small>
                      </div>
                    </div>
                  </div>
                  <div class="form-actions">
                    <button type="submit" class="btn btn--base" :disabled="isUpdating">
                      <i class="fas fa-save" v-if="!isUpdating"></i>
                      <i class="fas fa-spinner fa-spin" v-else></i>
                      {{ isUpdating ? 'Guardando...' : 'Guardar Cambios' }}
                    </button>
                    <button type="button" class="btn btn--secondary" @click="cancelEdit">
                      Cancelar
                    </button>
                  </div>
                </form>
                
                <div v-else class="profile-info-display">
                  <div class="info-row">
                    <div class="info-label">
                      <i class="fas fa-user"></i> Nombre completo
                    </div>
                    <div class="info-value">{{ currentUser?.name || 'No especificado' }}</div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">
                      <i class="fas fa-envelope"></i> Correo electrónico
                    </div>
                    <div class="info-value">{{ currentUser?.email || 'No especificado' }}</div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">
                      <i class="fas fa-phone"></i> Teléfono
                    </div>
                    <div class="info-value">{{ currentUser?.phone || 'No especificado' }}</div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">
                      <i class="fas fa-crown"></i> Rol
                    </div>
                    <div class="info-value">
                      <span class="badge badge--base">{{ currentUser?.rol?.toUpperCase() || 'No especificado' }}</span>
                    </div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">
                      <i class="fas fa-calendar-plus"></i> Fecha de registro
                    </div>
                    <div class="info-value">{{ formatDate(currentUser?.created_at) }}</div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">
                      <i class="fas fa-clock"></i> Última actualización
                    </div>
                    <div class="info-value">{{ formatDate(currentUser?.updated_at) }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Acciones rápidas -->
          <div class="profile-actions">
            <div class="card">
              <div class="card-header">
                <h3><i class="fas fa-bolt"></i> Acciones Rápidas</h3>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-4">
                    <button class="action-btn" @click="refreshProfile">
                      <i class="fas fa-sync-alt"></i>
                      <span>Actualizar Perfil</span>
                    </button>
                  </div>
                  <div class="col-md-4">
                    <span class="action-btn disabled-action" @click.prevent>
                      <i class="fas fa-lock"></i>
                      <span>Ver Transacciones</span>
                    </span>
                  </div>
                  <div class="col-md-4">
                    <button class="action-btn" @click="openChangePasswordModal">
                      <i class="fas fa-key"></i>
                      <span>Cambiar Contraseña</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Cambiar Contraseña -->
    <div v-if="showPasswordModal" class="modal-overlay" @click.self="closePasswordModal">
      <div class="modal-container">
        <div class="modal-header">
          <h3><i class="fas fa-key"></i> Cambiar Contraseña</h3>
          <button class="modal-close" @click="closePasswordModal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <form @submit.prevent="submitChangePassword" class="modal-body">
          <div class="form-group">
            <label for="current_password">Contraseña Actual</label>
            <div class="password-input-wrapper">
              <input 
                :type="showCurrentPassword ? 'text' : 'password'" 
                id="current_password" 
                v-model="passwordForm.current_password" 
                class="form-control"
                :class="{ 'is-invalid': passwordErrors.current_password }"
                placeholder="Ingresa tu contraseña actual"
                required
              >
              <button type="button" class="toggle-password" @click="showCurrentPassword = !showCurrentPassword">
                <i :class="showCurrentPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
            <div class="invalid-feedback" v-if="passwordErrors.current_password">{{ passwordErrors.current_password }}</div>
          </div>
          
          <div class="form-group">
            <label for="new_password">Nueva Contraseña</label>
            <div class="password-input-wrapper">
              <input 
                :type="showNewPassword ? 'text' : 'password'" 
                id="new_password" 
                v-model="passwordForm.new_password" 
                class="form-control"
                :class="{ 'is-invalid': passwordErrors.new_password }"
                placeholder="Mínimo 6 caracteres"
                required
                minlength="6"
              >
              <button type="button" class="toggle-password" @click="showNewPassword = !showNewPassword">
                <i :class="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
            <div class="invalid-feedback" v-if="passwordErrors.new_password">{{ passwordErrors.new_password }}</div>
          </div>
          
          <div class="form-group">
            <label for="new_password_confirmation">Confirmar Nueva Contraseña</label>
            <div class="password-input-wrapper">
              <input 
                :type="showConfirmPassword ? 'text' : 'password'" 
                id="new_password_confirmation" 
                v-model="passwordForm.new_password_confirmation" 
                class="form-control"
                :class="{ 'is-invalid': passwordErrors.new_password_confirmation }"
                placeholder="Repite la nueva contraseña"
                required
              >
              <button type="button" class="toggle-password" @click="showConfirmPassword = !showConfirmPassword">
                <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
            <div class="invalid-feedback" v-if="passwordErrors.new_password_confirmation">{{ passwordErrors.new_password_confirmation }}</div>
          </div>
          
          <div class="modal-actions">
            <button type="button" class="btn btn--secondary" @click="closePasswordModal">
              Cancelar
            </button>
            <button type="submit" class="btn btn--base" :disabled="isChangingPassword">
              <i class="fas fa-save" v-if="!isChangingPassword"></i>
              <i class="fas fa-spinner fa-spin" v-else></i>
              {{ isChangingPassword ? 'Guardando...' : 'Cambiar Contraseña' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import api from '@/services/api'

export default {
  name: 'ProfileView',
  data() {
    return {
      isEditing: false,
      isUpdating: false,
      editAvatar: false,
      editForm: {
        name: '',
        email: '',
        phone: '',
        rol: ''
      },
      errors: {},
      // Modal cambio de contraseña
      showPasswordModal: false,
      isChangingPassword: false,
      passwordForm: {
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
      },
      passwordErrors: {},
      showCurrentPassword: false,
      showNewPassword: false,
      showConfirmPassword: false
    }
  },
  computed: {
    ...mapGetters('auth', ['currentUser', 'isAuthenticated'])
  },
  mounted() {
    this.initEditForm();
  },
  methods: {
    ...mapActions('auth', ['updateUserData']),
    
    initEditForm() {
      if (this.currentUser) {
        this.editForm = {
          name: this.currentUser.name || '',
          email: this.currentUser.email || '',
          phone: this.currentUser.phone || '',
          rol: this.currentUser.rol || ''
        };
      }
    },
    
    toggleEdit() {
      this.isEditing = !this.isEditing;
      if (this.isEditing) {
        this.initEditForm();
      } else {
        this.cancelEdit();
      }
    },
    
    cancelEdit() {
      this.isEditing = false;
      this.errors = {};
      this.initEditForm();
    },
    
    async updateProfile() {
      this.isUpdating = true;
      this.errors = {};
      
      try {
        // Validaciones básicas
        if (!this.editForm.name.trim()) {
          this.errors.name = 'El nombre es obligatorio';
        }
        if (!this.editForm.email.trim()) {
          this.errors.email = 'El correo electrónico es obligatorio';
        }
        
        if (Object.keys(this.errors).length > 0) {
          this.isUpdating = false;
          return;
        }
        
        // Aquí harías la llamada a la API para actualizar el perfil
        // Por ahora solo actualizamos el store local
        const updatedData = {
          name: this.editForm.name.trim(),
          email: this.editForm.email.trim(),
          phone: this.editForm.phone.trim()
        };
        
        this.updateUserData(updatedData);
        
        this.isEditing = false;
        this.$toast?.success('Perfil actualizado correctamente');
        
      } catch (error) {
        console.error('Error actualizando perfil:', error);
        this.$toast?.error('Error al actualizar el perfil');
      } finally {
        this.isUpdating = false;
      }
    },
    
    async refreshProfile() {
      try {
        // Aquí harías una llamada para refrescar los datos del usuario
        console.log('🔄 Refrescando perfil del usuario...');
        // Por ahora solo mostramos un mensaje
        this.$toast?.info('Perfil actualizado');
      } catch (error) {
        console.error('Error refrescando perfil:', error);
        this.$toast?.error('Error al actualizar el perfil');
      }
    },
    
    openChangePasswordModal() {
      this.showPasswordModal = true;
      this.passwordForm = {
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
      };
      this.passwordErrors = {};
    },
    
    closePasswordModal() {
      this.showPasswordModal = false;
      this.passwordForm = {
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
      };
      this.passwordErrors = {};
      this.showCurrentPassword = false;
      this.showNewPassword = false;
      this.showConfirmPassword = false;
    },
    
    async submitChangePassword() {
      this.passwordErrors = {};
      
      // Validaciones del frontend
      if (!this.passwordForm.current_password) {
        this.passwordErrors.current_password = 'La contraseña actual es obligatoria';
      }
      if (!this.passwordForm.new_password) {
        this.passwordErrors.new_password = 'La nueva contraseña es obligatoria';
      } else if (this.passwordForm.new_password.length < 6) {
        this.passwordErrors.new_password = 'La contraseña debe tener al menos 6 caracteres';
      }
      if (!this.passwordForm.new_password_confirmation) {
        this.passwordErrors.new_password_confirmation = 'Debes confirmar la nueva contraseña';
      } else if (this.passwordForm.new_password !== this.passwordForm.new_password_confirmation) {
        this.passwordErrors.new_password_confirmation = 'Las contraseñas no coinciden';
      }
      
      if (Object.keys(this.passwordErrors).length > 0) {
        return;
      }
      
      this.isChangingPassword = true;
      
      try {
        const response = await api.post('/api/change-password', {
          current_password: this.passwordForm.current_password,
          new_password: this.passwordForm.new_password,
          new_password_confirmation: this.passwordForm.new_password_confirmation
        });
        
        if (response.data.success) {
          this.closePasswordModal();
          alert('¡Contraseña actualizada correctamente!');
        }
      } catch (error) {
        console.error('Error al cambiar contraseña:', error);
        
        if (error.response?.data?.errors) {
          // Errores de validación del backend
          const backendErrors = error.response.data.errors;
          if (backendErrors.current_password) {
            this.passwordErrors.current_password = backendErrors.current_password[0];
          }
          if (backendErrors.new_password) {
            this.passwordErrors.new_password = backendErrors.new_password[0];
          }
        } else if (error.response?.data?.message) {
          this.passwordErrors.current_password = error.response.data.message;
        } else {
          alert('Error al cambiar la contraseña. Intenta de nuevo.');
        }
      } finally {
        this.isChangingPassword = false;
      }
    },
    
    formatCurrency(amount) {
      if (!amount) return 'Rup 0.00';
      const formatted = new Intl.NumberFormat('es-VE', {
        style: 'currency',
        currency: 'USD'
      }).format(parseFloat(amount));
      // Reemplazar USD por Rup
      return formatted.replace('USD', 'Rup').replace('US$', 'Rup').replace('$', 'Rup');
    },
    
    formatDate(dateString) {
      if (!dateString) return 'No disponible';
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
  }
}
</script>

<style scoped>
.profile-page {
  margin-top: 120px;
  padding: 5rem 0 !important;
  min-height: 80vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.profile-header {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 2rem;
  position: relative;
  overflow: hidden;
}

.profile-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.profile-avatar {
  position: relative;
}

.avatar-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.btn-edit-avatar {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #28a745;
  border: none;
  color: white;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
}

.btn-edit-avatar:hover {
  transform: scale(1.1);
  background: #218838;
}

.profile-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.profile-name-section {
  flex: 1;
}

.profile-info h1 {
  margin: 0;
  color: #333;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
}

.profile-email {
  color: #666;
  font-size: 1.1rem;
  margin: 0.5rem 0 0;
  font-weight: 500;
}

.profile-badges {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
}

.badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
}

.badge--base {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.badge--success {
  background: #28a745;
  color: white;
}

.profile-stats {
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  font-size: 2.5rem;
  color: #667eea;
  margin-bottom: 1rem;
}

.stat-content h3 {
  margin: 0;
  color: #333;
  font-size: 1.8rem;
  font-weight: 700;
}

.stat-content p {
  margin: 0.5rem 0 0;
  color: #666;
  font-size: 0.9rem;
}

.card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
  overflow: hidden;
}

.card-header {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
}

.card-body {
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 600;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-control:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-control.is-invalid {
  border-color: #dc3545;
}

.invalid-feedback {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn--base {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.btn--base:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.btn--secondary {
  background: #6c757d;
  color: white;
}

.btn--secondary:hover {
  background: #5a6268;
}

.btn--sm {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.profile-info-display {
  space-y: 1rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #e9ecef;
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-weight: 600;
}

.info-value {
  color: #333;
  font-weight: 500;
}

.action-btn {
  width: 100%;
  padding: 1.5rem;
  background: white;
  border: 2px solid #e9ecef;
  border-radius: 15px;
  text-align: center;
  text-decoration: none;
  color: #333;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.action-btn:hover {
  border-color: #667eea;
  color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.action-btn i {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.action-btn span {
  font-weight: 600;
}

.disabled-action {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
  color: #999 !important;
  border-color: #ddd !important;
}

.disabled-action:hover {
  transform: none !important;
  box-shadow: none !important;
  border-color: #ddd !important;
  color: #999 !important;
}

.disabled-action i {
  color: #dc3545;
}

@media (max-width: 768px) {
  .profile-page {
    padding: 0.5rem 0 !important;
  }
  
  .profile-header {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
  }
  
  .profile-info {
    align-items: center;
  }
  
  .profile-badges {
    justify-content: center;
  }
  
  .profile-info h1 {
    font-size: 2rem;
  }
  
  .avatar-circle {
    width: 100px;
    height: 100px;
    font-size: 2.5rem;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .info-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .profile-page {
    padding: 0.25rem 0 !important;
  }
  
  .profile-header {
    padding: 1rem;
  }
  
  .profile-info h1 {
    font-size: 1.8rem;
  }
  
  .profile-email {
    font-size: 1rem;
  }
  
  .avatar-circle {
    width: 80px;
    height: 80px;
    font-size: 2rem;
  }
  
  .btn-edit-avatar {
    width: 30px;
    height: 30px;
  }
}

/* Modal Cambiar Contraseña */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
}

.modal-container {
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  animation: modalFadeIn 0.3s ease;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-header {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.modal-close {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

.modal-body {
  padding: 2rem;
}

.modal-body .form-group {
  margin-bottom: 1.5rem;
}

.modal-body .form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 600;
  font-size: 0.95rem;
}

.password-input-wrapper {
  position: relative;
}

.password-input-wrapper .form-control {
  padding-right: 45px;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 5px;
  transition: color 0.3s ease;
}

.toggle-password:hover {
  color: #667eea;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: flex-end;
}

@media (max-width: 480px) {
  .modal-container {
    margin: 0.5rem;
    max-width: calc(100% - 1rem);
  }
  
  .modal-body {
    padding: 1.5rem;
  }
  
  .modal-actions {
    flex-direction: column-reverse;
  }
  
  .modal-actions .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
