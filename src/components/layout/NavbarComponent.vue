<template>
  <div class="header">
    <div class="container">
      <div class="header-bottom">
        <div class="header-bottom-area align-items-center">
          <div class="logo">
            <router-link to="/">
              <img :src="getImageUrl('img_0.png')" alt="logo">
            </router-link>
          </div>
          <ul class="menu">
           
            
            <!-- Menú para usuarios no autenticados -->
            <template v-if="!isAuthenticated">
              <li>
                <router-link class="nav-link" :class="{ active: $route.path === '/' }" to="/">Inicio</router-link>
              </li>
              <li>
                <router-link class="nav-link" :class="{ active: $route.path === '/' }" :to="aboutLink" @click="handleSectionClick('about', $event)">Acerca de</router-link>
              </li>
              <li>
                <router-link class="nav-link" :class="{ active: $route.path === '/' || $route.path === '/dashboard' }" :to="gamesLink" @click="handleSectionClick('games', $event)">Juegos <span class="badge badge--sm badge--base text-dark">NUEVO</span></router-link>
              </li>
              <li>
                <router-link class="nav-link" :class="{ active: $route.path === '/faq' }" :to="faqLink" @click="handleSectionClick('faq', $event)">Preguntas Frecuentes</router-link>
              </li>
              
              <!-- <li>
                <router-link class="nav-link" :class="{ active: $route.path === '/contact' }" to="/contact">Contacto</router-link>
              </li> -->

              <li>
                <router-link class="nav-link" :class="{ active: $route.path === '/login' }" to="/login">Iniciar Sesión</router-link>
              </li>
              <li>
                <router-link class="nav-link" :class="{ active: $route.path === '/register' }" to="/register">Registro</router-link>
              </li>
              <li class="mobile-only guest-menu-cta">
                <router-link to="/register" class="cmn--btn active btn--md w-100" @click="handleMenuItemClick">Regístrate</router-link>
              </li>
            </template>
            
            <!-- Menú para usuarios autenticados -->
            <template v-else>
              <!-- Saldo (desktop) -->
              <li class="nav-item balance-container desktop-only" v-if="currentUser">
                <div class="balance-wrapper">
                  <div class="balance-badge">
                    <i class="fas fa-coins"></i> {{ currentUser.balance }}
                  </div>
                  <button 
                    class="btn-refresh" 
                    @click="refreshBalance" 
                    :disabled="isRefreshing"
                    aria-label="Refrescar saldo"
                    :title="isRefreshing ? 'Actualizando...' : 'Actualizar saldo'"
                  >
                    <i class="fas fa-sync-alt" :class="{'fa-spin': isRefreshing}"></i>
                  </button>
                </div>
              </li>

              <!-- Móvil: mismo menú full-screen que invitados -->
              <li class="auth-mobile-balance mobile-only" v-if="currentUser">
                <div class="auth-balance-row">
                  <span class="auth-balance-label"><i class="fas fa-coins"></i> {{ currentUser.balance }}</span>
                  <button
                    type="button"
                    class="auth-balance-refresh"
                    @click.stop="refreshBalance"
                    :disabled="isRefreshing"
                    aria-label="Refrescar saldo"
                  >
                    <i class="fas fa-sync-alt" :class="{ 'fa-spin': isRefreshing }"></i>
                  </button>
                </div>
              </li>
              <li class="auth-mobile-user mobile-only">
                <span class="auth-user-name">{{ userName }}</span>
              </li>
              <li class="mobile-only">
                <router-link to="/dashboard" class="nav-link" @click="handleMenuItemClick">Juegos</router-link>
              </li>
              <li class="mobile-only">
                <router-link to="/profile" class="nav-link" @click="handleMenuItemClick">Mi Perfil</router-link>
              </li>
              <li class="mobile-only">
                <router-link to="/recharge" class="nav-link" @click="handleMenuItemClick">Recargas</router-link>
              </li>
              <li class="mobile-only">
                <router-link to="/withdraw" class="nav-link" @click="handleMenuItemClick">Retiros</router-link>
              </li>
              <li class="mobile-only">
                <router-link to="/transactions" class="nav-link" @click="handleMenuItemClick">Transacciones</router-link>
              </li>
              <li class="mobile-only">
                <router-link to="/pote" class="nav-link" @click="handleMenuItemClick">Pote - Estadísticas</router-link>
              </li>
              <li class="mobile-only">
                <router-link to="/history" class="nav-link" @click="handleMenuItemClick">Mis Partidas</router-link>
              </li>
              <li class="mobile-only">
                <a href="#" class="nav-link" @click.prevent="handleLogout">Cerrar Sesión</a>
              </li>
              <li class="mobile-only auth-menu-cta">
                <router-link to="/dashboard" class="cmn--btn active btn--md w-100" @click="handleMenuItemClick">Jugar ahora</router-link>
              </li>

              <!-- Desktop: dropdown del usuario -->
              <li class="menu-item-has-children desktop-only" :class="{ active: isMenuOpen }">
                <a href="#" class="nav-link" @click.prevent="toggleMenu">
                  <span class="user-name">{{ userName }}</span>
                </a>
                <ul class="submenu" @click.stop="handleMenuItemClick">
                  <li>
                    <router-link to="/profile" class="dropdown-item">
                      <i class="fas fa-user me-2"></i> Mi Perfil
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/recharge" class="dropdown-item">
                      <i class="fas fa-wallet me-2"></i> Recargas
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/withdraw" class="dropdown-item">
                      <i class="fas fa-money-bill-wave me-2"></i> Retiros
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/transactions" class="dropdown-item">
                      <i class="fas fa-exchange-alt me-2"></i> Transacciones
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/pote" class="dropdown-item">
                      <i class="fas fa-trophy me-2"></i> Pote - Estadísticas
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/history" class="dropdown-item">
                      <i class="fas fa-history me-2"></i> Mis Partidas
                    </router-link>
                  </li>
                  <li>
                    <a href="#" class="dropdown-item" @click.prevent="handleLogout">
                      <i class="fas fa-sign-out-alt me-2"></i> Cerrar Sesión
                    </a>
                  </li>
                </ul>
              </li>
            </template>
            
            <button class="btn-close btn-close-white d-lg-none" @click="closeMobileMenu"></button>
          </ul>
          <div class="header-trigger-wrapper d-flex d-lg-none align-items-center">
            <div class="header-trigger me-4" @click.stop.prevent="toggleMobileMenu">
              <span></span>
            </div>
            <template v-if="!isAuthenticated">
              <router-link to="/login" class="cmn--btn active btn--md d-none d-sm-block">Sign In</router-link>
            </template>
            <template v-else>
              <a href="#" @click.prevent="logout" class="cmn--btn active btn--md d-none d-sm-block">Sign Out</a>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import api from '@/services/api'
import { getGamesLink, getAboutLink, getFaqLink, navigateToSection } from '@/utils/sectionNavigation'

export default {
  name: 'NavbarComponent',
  data() {
    return {
      isRefreshing: false,
      isLoggingOut: false,
      isMenuOpen: false
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'currentUser']),
    userName() {
      if (this.currentUser?.name) return this.currentUser.name;
      if (this.currentUser?.email) return this.currentUser.email.split('@')[0];
      return 'Usuario';
    },
    aboutLink() {
      return getAboutLink()
    },
    gamesLink() {
      return getGamesLink(this.isAuthenticated)
    },
    faqLink() {
      return getFaqLink()
    }
  },
  watch: {
    // Cerrar el menú cuando cambia la ruta (navegación)
    '$route'() {
      // Remover clase active inmediatamente
      const menuElement = this.$el?.querySelector('.menu');
      if (menuElement) {
        menuElement.classList.remove('active');
      }
      const headerTrigger = document.querySelector('.header-trigger');
      if (headerTrigger) {
        headerTrigger.classList.remove('active');
      }
      this.closeMenu();
    }
  },
  mounted() {
    // Asegurar que el menú esté cerrado al cargar la página
    this.isMenuOpen = false;
    this.$nextTick(() => {
      const menuElement = this.$el?.querySelector('.menu');
      const headerTrigger = document.querySelector('.header-trigger');
      if (menuElement) {
        menuElement.classList.remove('active');
      }
      if (headerTrigger) {
        headerTrigger.classList.remove('active');
      }
    });
    
    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', this.handleClickOutside);
    
    // Listener para cambios de tamaño de ventana
    window.addEventListener('resize', this.handleResize);
    
    // Agregar listener directo al header-trigger para evitar conflictos con scripts externos
    this.$nextTick(() => {
      const headerTrigger = document.querySelector('.header-trigger');
      if (headerTrigger) {
        // Remover listeners anteriores si existen
        headerTrigger.removeEventListener('click', this.toggleMobileMenu);
        // Agregar nuestro listener
        headerTrigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.toggleMobileMenu(e);
        });
      }
      
      // También para el botón de cerrar
      const closeButton = this.$el?.querySelector('.btn-close');
      if (closeButton) {
        closeButton.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.closeMobileMenu();
        });
      }
    });
  },
  beforeUnmount() {
    // Limpiar los listeners al desmontar el componente
    document.removeEventListener('click', this.handleClickOutside);
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    getImageUrl(name) {
      return require(`@/assets/img/${name}`);
    },
    async handleSectionClick(section, event) {
      event.preventDefault()
      await navigateToSection(this.$router, section, this.isAuthenticated)
    },
    ...mapActions('auth', ['logout', 'updateUserData']),
    formatBalance(balance) {
      return parseFloat(balance).toFixed(2);
    },
    async refreshBalance() {
      if (this.isRefreshing) return;
      this.isRefreshing = true;
      try {
        const response = await api.get('/api/user');
        if (response.data) {
          const oldBalance = this.currentUser?.balance;
          await this.updateUserData(response.data);
          this.$forceUpdate();
          if (oldBalance !== this.currentUser?.balance) {
            console.log(`Nuevo saldo: ${this.currentUser.balance}`);
          }
        }
      } catch (error) {
        console.error('Error al refrescar el saldo:', error);
      } finally {
        this.isRefreshing = false;
      }
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      // Sincronizar con la clase active del menú principal
      this.syncMenuActiveState();
    },
    openMenuOnMobile() {
      // Verificar si estamos en móvil (ancho menor a 992px)
      const isMobile = window.innerWidth <= 991;
      
      if (isMobile && this.isAuthenticated) {
        // Abrir el menú automáticamente en móvil
        this.isMenuOpen = true;
        this.$nextTick(() => {
          this.syncMenuActiveState();
        });
      }
    },
    handleResize() {
      // Manejar cambios de tamaño de ventana
      const isMobile = window.innerWidth <= 991;
      
      // Solo cerrar el menú si cambiamos a desktop
      // NO abrir automáticamente en móvil - solo se abre con el botón hamburguesa
      if (!isMobile) {
        this.closeMenu();
      }
    },
    toggleMobileMenu(event) {
      // Prevenir el comportamiento por defecto y la propagación
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      
      // Toggle del menú móvil principal (el que se abre con el botón hamburguesa)
      const menuElement = this.$el?.querySelector('.menu');
      const headerTrigger = document.querySelector('.header-trigger');
      
      if (menuElement) {
        const isActive = menuElement.classList.contains('active');
        
        if (isActive) {
          // Cerrar el menú
          menuElement.classList.remove('active');
          if (headerTrigger) {
            headerTrigger.classList.remove('active');
          }
          // También cerrar el submenu del usuario
          this.isMenuOpen = false;
        } else {
          menuElement.classList.add('active');
          if (headerTrigger) {
            headerTrigger.classList.add('active');
          }
        }
      }
    },
    closeMobileMenu() {
      // Cerrar el menú móvil principal
      const menuElement = this.$el?.querySelector('.menu');
      const headerTrigger = document.querySelector('.header-trigger');
      
      if (menuElement) {
        menuElement.classList.remove('active');
      }
      if (headerTrigger) {
        headerTrigger.classList.remove('active');
      }
      // También cerrar el submenu del usuario
      this.isMenuOpen = false;
    },
    syncMenuActiveState() {
      // Sincronizar el estado del menú con la clase active del elemento .menu
      const menuElement = this.$el?.querySelector('.menu');
      const headerTrigger = document.querySelector('.header-trigger');
      
      if (this.isMenuOpen) {
        if (menuElement) {
          menuElement.classList.add('active');
        }
        if (headerTrigger) {
          headerTrigger.classList.add('active');
        }
      } else {
        if (menuElement) {
          menuElement.classList.remove('active');
        }
        if (headerTrigger) {
          headerTrigger.classList.remove('active');
        }
      }
    },
    closeMenu() {
      this.isMenuOpen = false;
      // Sincronizar el estado con la clase active
      this.$nextTick(() => {
        // Asegurar que el estado se actualice
        if (this.isMenuOpen) {
          this.isMenuOpen = false;
        }
        this.syncMenuActiveState();
      });
    },
    handleMenuItemClick() {
      // Cerrar el menú cuando se hace clic en cualquier elemento
      // Remover clase active inmediatamente
      const menuElement = this.$el?.querySelector('.menu');
      if (menuElement) {
        menuElement.classList.remove('active');
      }
      const headerTrigger = document.querySelector('.header-trigger');
      if (headerTrigger) {
        headerTrigger.classList.remove('active');
      }
      // Cerrar el menú
      this.closeMenu();
    },
    handleClickOutside(event) {
      if (!this.isMenuOpen || window.innerWidth <= 991) return;

      const menuElement = this.$el?.querySelector('.menu-item-has-children.desktop-only');
      const submenuElement = menuElement?.querySelector('.submenu');

      if (menuElement && submenuElement && event.target) {
        const isClickInsideMenu = menuElement.contains(event.target);
        const toggleButton = menuElement.querySelector('.nav-link');
        const isClickOnToggle = toggleButton && toggleButton.contains(event.target);

        if (!isClickInsideMenu && !isClickOnToggle) {
          this.closeMenu();
        }
      }
    },
    async handleLogout() {
      if (this.isLoggingOut) return;
      this.isLoggingOut = true;
      this.closeMobileMenu();
      try {
        await this.logout();
        this.$router.push('/login');
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
        alert('Hubo un problema al cerrar sesión.');
      } finally {
        this.isLoggingOut = false;
      }
    }
  }
}
</script>

<style scoped>
/* Estilos existentes */

/* Estilos móvil autenticado (misma línea visual que invitados) */
.auth-mobile-balance {
  padding: 10px 10px 14px;
}

.auth-balance-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.auth-balance-label {
  color: #ffc827;
  font-weight: 700;
  font-size: 1.15rem;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.auth-balance-refresh {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #fff;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  cursor: pointer;
}

.auth-balance-refresh:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auth-mobile-user {
  padding: 0 10px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.auth-user-name {
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.auth-menu-cta,
.guest-menu-cta {
  border-bottom: none !important;
  padding-top: 18px;
  margin-top: 8px;
}

.auth-menu-cta .cmn--btn,
.guest-menu-cta .cmn--btn {
  display: block;
  width: 100%;
  text-align: center;
}

/* Estilos para el menú desplegable desktop */
.menu-item-has-children {
  position: relative;
}


.submenu {
  position: absolute;
  top: 100%;
  right: 0;
  width: 220px;
  max-width: calc(100vw - 40px);
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s ease;
  z-index: 10000;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
}

.submenu::-webkit-scrollbar {
  width: 6px;
}

.submenu::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.submenu::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.submenu::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.menu-item-has-children:hover .submenu,
.menu-item-has-children.active .submenu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

/* Clases para mostrar/ocultar según dispositivo */
.desktop-only {
  display: block;
}

.mobile-only {
  display: none;
}

/* Estilos para elementos dentro del submenu */
/* En desktop, estos elementos están ocultos */
.submenu-balance-container.mobile-only {
  display: none;
}

.submenu-user-name.mobile-only {
  display: none;
}

.submenu-divider.mobile-only {
  display: none;
}

.submenu-balance-container {
  padding: 15px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 5px 5px 0 0;
  margin: 0;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

.submenu-balance-container .balance-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.submenu-balance-container .balance-badge {
  color: #fff;
  font-weight: 600;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.submenu-balance-container .btn-refresh {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submenu-balance-container .btn-refresh:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(180deg);
}

.submenu-balance-container .btn-refresh:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.submenu-user-name {
  padding: 12px 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  margin: 0;
}

.submenu-user-name .user-name-display {
  font-weight: 600;
  font-size: 1rem;
  color: #333;
  display: block;
}

.submenu-divider {
  height: 1px;
  background-color: #e9ecef;
  margin: 8px 0;
  padding: 0;
  list-style: none;
}

/* En móvil, ajustar posición del dropdown solo en desktop */
@media (max-width: 991px) {
  .desktop-only {
    display: none !important;
  }

  .mobile-only {
    display: block !important;
  }

  .submenu {
    display: none !important;
  }

  .auth-mobile-balance.mobile-only,
  .auth-mobile-user.mobile-only {
    display: block !important;
  }
}

@media (min-width: 992px) {
  .mobile-only {
    display: none !important;
  }
}

@media (max-width: 991px) {
  .balance-container {
    margin-right: 10px;
  }
  
  .balance-wrapper {
    flex-wrap: wrap;
    gap: 5px;
  }
  
  .balance-badge {
    font-size: 0.85rem;
    padding: 0.3rem 0.6rem;
    order: 1;
  }
  
  .btn-refresh {
    width: 28px;
    height: 28px;
    font-size: 12px;
    margin-left: 0;
    order: 2;
  }
  
  .user-name {
    font-size: 0.9rem;
  }
  
  /* Dropdown items */
  .dropdown-item {
    padding: 10px 16px;
    font-size: 0.9rem;
  }
}

.submenu li {
  display: block;
  width: 100%;
  padding: 0;
  margin: 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: #333;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}

.disabled-item {
  opacity: 0.6;
  cursor: not-allowed;
  color: #999 !important;
}

.disabled-item:hover {
  background-color: transparent !important;
}

.disabled-item i {
  color: #dc3545;
}

.user-name {
  font-weight: 600;
}

.balance-container {
  margin-right: 15px;
}

.balance-wrapper {
  display: flex;
  align-items: center;
}

.balance-badge {
  background-color: rgba(230, 126, 34, 0.15);
  color: #e67e22;
  padding: 0.375rem 0.75rem;
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s ease;
}

.balance-badge i {
  color: #f39c12;
}

.btn-refresh {
  background-color: transparent;
  border: none;
  color: #7f8c8d;
  font-size: 14px;
  padding: 7px;
  margin-left: 0.5rem;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-refresh:hover {
  background-color: rgba(230, 126, 34, 0.15);
  color: #e67e22;
  transform: rotate(30deg);
}

.btn-refresh:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.fa-spin {
  animation: fa-spin 1s infinite linear;
}

@keyframes fa-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}


</style>