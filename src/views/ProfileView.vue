<template>
  <div class="profile-page">
    <div class="profile-bg" aria-hidden="true"></div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="profile-page-title">
            <p>Mi cuenta</p>
            <h1>Perfil de <span>Jugador</span></h1>
          </div>

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
      if (!amount) return 'DCoins 0.00';
      const formatted = new Intl.NumberFormat('es-VE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(parseFloat(amount));
      return `DCoins ${formatted}`;
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
  --bg-deep: #0d0a14;
  --bg-card: #1a1528;
  --bg-card-soft: #211a33;
  --border: rgba(255, 255, 255, 0.07);
  --border-glow: rgba(201, 168, 76, 0.28);
  --gold: #c9a84c;
  --gold-light: #e8c97a;
  --gold-dim: rgba(201, 168, 76, 0.14);
  --green: #3ecf82;
  --green-dim: rgba(62, 207, 130, 0.14);
  --text-primary: #f0ecff;
  --text-muted: rgba(240, 236, 255, 0.46);
  --text-label: rgba(240, 236, 255, 0.66);
  --accent: #7c5cbf;
  --accent-glow: rgba(124, 92, 191, 0.26);

  position: relative;
  margin-top: 0;
  padding: 112px 0 56px !important;
  min-height: 100vh;
  background: var(--bg-deep);
  color: var(--text-primary);
  overflow-x: hidden;
}

.profile-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse 80% 60% at 20% -10%, rgba(124, 92, 191, 0.2) 0%, transparent 60%),
    radial-gradient(ellipse 60% 50% at 80% 110%, rgba(201, 168, 76, 0.1) 0%, transparent 55%);
}

.profile-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.45;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
}

.profile-page .container {
  position: relative;
  z-index: 1;
}

.profile-page-title {
  text-align: center;
  margin-bottom: 2rem;
}

.profile-page-title p {
  margin: 0 0 0.6rem;
  color: var(--text-muted);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.profile-page-title h1 {
  margin: 0;
  color: var(--text-primary);
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2rem, 7vw, 3.5rem);
  font-weight: 800;
  line-height: 1.05;
}

.profile-page-title h1 span {
  color: var(--gold-light);
}

.profile-header {
  background: linear-gradient(145deg, rgba(32, 27, 52, 0.96), rgba(21, 17, 33, 0.96));
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.28);
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
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold-light), transparent);
}

.profile-avatar {
  position: relative;
}

.avatar-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 25%, var(--gold-light), var(--gold) 42%, #6b4a18 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #120d1e;
  box-shadow: 0 16px 30px rgba(201, 168, 76, 0.18);
}

.btn-edit-avatar {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--green);
  border: 2px solid rgba(255, 255, 255, 0.18);
  color: #07130c;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
}

.btn-edit-avatar:hover {
  transform: scale(1.1);
  background: #62e9a0;
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
  color: var(--text-primary);
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
}

.profile-email {
  color: var(--text-muted);
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
  border: 1px solid var(--border);
}

.badge--base {
  background: var(--gold-dim);
  color: var(--gold-light);
  border-color: var(--border-glow);
}

.badge--success {
  background: var(--green-dim);
  color: var(--green);
  border-color: rgba(62, 207, 130, 0.28);
}

.profile-stats {
  margin-bottom: 2rem;
}

.profile-stats .row {
  row-gap: 1rem;
}

.profile-stats .col-md-4 {
  display: flex;
}

.stat-card {
  background: linear-gradient(145deg, rgba(32, 27, 52, 0.95), rgba(24, 19, 38, 0.98));
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.03), 0 12px 28px rgba(0, 0, 0, 0.22);
  transition: transform 0.3s ease, border-color 0.3s ease;
  width: 100%;
  height: 100%;
}

.stat-card:hover {
  transform: translateY(-5px);
  border-color: var(--border-glow);
}

.stat-icon {
  font-size: 2.5rem;
  color: var(--gold-light);
  margin-bottom: 1rem;
}

.stat-content h3 {
  margin: 0;
  color: var(--text-primary);
  font-size: 1.8rem;
  font-weight: 700;
}

.stat-content p {
  margin: 0.5rem 0 0;
  color: var(--text-muted);
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.card {
  background: linear-gradient(145deg, rgba(32, 27, 52, 0.94), rgba(18, 14, 30, 0.98));
  border: 1px solid var(--border);
  border-radius: 20px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.26);
  margin-bottom: 2rem;
  overflow: hidden;
}

.card-header {
  background: rgba(201, 168, 76, 0.09);
  color: var(--text-primary);
  border-bottom: 1px solid var(--border);
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--gold-light);
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
  color: var(--text-label);
  font-weight: 600;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  background: rgba(255, 255, 255, 0.06);
  color: var(--text-primary);
}

.form-control:focus {
  outline: none;
  border-color: var(--gold-light);
  box-shadow: 0 0 0 3px rgba(201, 168, 76, 0.12);
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
  background: linear-gradient(135deg, var(--gold-light), var(--gold));
  color: #120d1e;
}

.btn--base:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(201, 168, 76, 0.24);
}

.btn--secondary {
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-primary);
  border: 1px solid var(--border);
}

.btn--secondary:hover {
  background: rgba(255, 255, 255, 0.14);
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
  border-bottom: 1px solid var(--border);
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-label);
  font-weight: 600;
}

.info-value {
  color: var(--text-primary);
  font-weight: 500;
}

.action-btn {
  width: 100%;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid var(--border);
  border-radius: 15px;
  text-align: center;
  text-decoration: none;
  color: var(--text-primary);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.action-btn:hover {
  border-color: var(--border-glow);
  color: var(--gold-light);
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(0,0,0,0.2);
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
    padding: 96px 0 40px !important;
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
    padding: 88px 0 32px !important;
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
