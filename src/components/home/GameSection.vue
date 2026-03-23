<template>
   <section class="game-section padding-top padding-bottom bg_img" :style="{ background: `url(${getAssetImageUrl('bg3.jpg')}) center` }" id="games">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8 col-xl-6">
                    <div class="section-header text-center">
                        <h2 class="section-header__title">Seleccione un Juego</h2>
                        <p v-if="userName !== 'Usuario'" class="welcome-message">¡Bienvenido, {{ userName }}! Aquí puedes elegir entre los juegos disponibles y competir en emocionantes partidas. Elige el juego de tu preferencia y empieza a jugar.</p>
                    </div>
                </div>
            </div>
            
            <!-- Indicador de conexión en tiempo real -->
            <!--<div class="row justify-content-center mb-4">
                <div class="col-12 text-center">
                    <div class="connection-status">
                        <span class="status-indicator" :class="{ 'connected': isSocketConnected, 'disconnected': !isSocketConnected }">
                            <i :class="isSocketConnected ? 'fas fa-wifi' : 'fas fa-wifi-slash'"></i>
                        </span>
                        <span class="status-text">
                            {{ isSocketConnected ? 'Conectado en tiempo real' : 'Conectando...' }}
                        </span>
                    </div>
                </div>
            </div>-->
            
            <!-- Información del balance del usuario -->
            <!--<div v-if="isAuthenticated && userName !== 'Usuario'" class="row justify-content-center mb-4">
                <div class="col-12 text-center">
                    <div class="user-balance-info">
                        <div class="balance-card">
                            <div class="balance-icon">
                                <i class="fas fa-coins"></i>
                            </div>
                            <div class="balance-details">
                                <h5>Tu Saldo Actual</h5>
                                <p class="balance-amount">VES{{ (userBalance ?? 0).toFixed(2) }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>-->
            
            <div class="row gy-4 justify-content-center">
                <div v-if="loading" class="col-12 text-center">
                    <div class="loading-spinner">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Cargando...</span>
                        </div>
                        <p class="mt-2">Cargando juegos...</p>
                    </div>
                </div>
                <div v-else-if="availableGames.length === 0" class="col-12 text-center">
                    <div class="no-games-message">
                        <i class="fas fa-gamepad"></i>
                        <p>No hay juegos disponibles en este momento.</p>
                        <small>Los juegos aparecerán aquí cuando estén disponibles para jugar.</small>
                    </div>
                </div>
                <!-- Juegos dinámicos desde /api/games -->
                <div v-for="game in availableGames" :key="game.id" class="col-lg-6 col-xl-4 col-md-6 col-sm-12">
                    <div class="game-card" :class="getGameCardClass(game)">
                        <div class="game-badge" :class="getGameBadgeClass(game)">
                            {{ getGameBadgeText(game) }}
                        </div>
                        <div class="game-card-content">
                            <div class="game-logo">
                                <img :src="getGameImage(game)" :alt="game.name" class="game-image">
                            </div>
                            <div class="game-title-section">
                                <div class="game-title">{{ game.name || `Juego ${game.id}` }}</div>
                            </div>
                            <div class="game-info">
                                <button 
                                    class="play-button enabled" 
                                    @click="goToWaitingRoom(game.id)"
                                >
                                    <i class="fas fa-play"></i>
                                    <span>Jugar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import EventBus from '@/EventBus'

export default {
  name: 'GameSection',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters('auth', [
      'isAuthenticated',
      'currentUser'
    ]),
    ...mapGetters('games', [
      'availableGames',
      'userBalance',
      'canJoinGame',
      'isSocketConnected'
    ]),
    
    userName() {
      if (this.currentUser?.name) {
        return this.currentUser.name
      } else if (this.currentUser?.email) {
        return this.currentUser.email.split('@')[0]
      }
      return 'Usuario'
    },
    
    loading() {
      return this.$store.state.games.loading
    }
  },
  async mounted() {
    console.log('GameSection mounted');
    if (this.isAuthenticated) {
      console.log('Usuario autenticado, inicializando conexión y cargando juegos');
      await this.initSocketConnection();
    } else {
      console.log('Usuario no autenticado, cargando juegos sin conexión');
      await this.fetchGames();
    }
    // Forzar la carga del saldo siempre
    await this.$store.dispatch('games/fetchUserBalance');
    // Cargar juegos del dashboard usando fetchGames
    await this.$store.dispatch('games/fetchGames');

    // Suscribirse al canal de Pusher para actualizaciones en tiempo real
    if (window.Echo) {
      this.pusherChannel = window.Echo.channel('tables')
        .listen('UserJoinedTable', () => {
          this.fetchGames();
        });
      // Marca como conectado en tiempo real
      this.$store.commit('games/SET_SOCKET_CONNECTED', true);
    }
  },
  beforeUnmount() {
    // Desconectar Socket.IO al salir del componente
    this.disconnectSocket()
    // Desuscribirse del canal de Pusher
    if (this.pusherChannel && window.Echo) {
      window.Echo.leave('tables');
      this.$store.commit('games/SET_SOCKET_CONNECTED', false);
    }
  },
  methods: {
    ...mapActions('games', [
      'fetchGames',
      'initSocketConnection',
      'disconnectSocket'
    ]),
    
    
    getImageUrl(name) {
      return require(`../../../template/img/${name}`)
    },
    
    getAssetImageUrl(name) {
      return require(`../../assets/img/${name}`)
    },
    
    gameImageUrl(game) {
      if (game.image) {
        return process.env.VUE_APP_API_URL + '/storage/' + game.image
      }
      // Usar imagen basada en ID, no aleatoria
      const imageIndex = (game.id - 1) % 5
      return this.getImageUrl(`img_${imageIndex}.png`)
    },
    
    getGameImage(game) {
      // Si el juego tiene imagen, usarla
      if (game.image) {
        return process.env.VUE_APP_API_URL + '/storage/' + game.image
      }
      
      // Mapear juegos específicos a imágenes disponibles
      const gameImageMap = {
        1: 'img_0.png', // CPU
        2: 'img_1.png', // Dubai
        3: 'img_2.png', // California
        4: 'img_3.png', // Tokio
        5: 'img_4.png'  // Invita a tu Amigo
      }
      
      // Si hay mapeo específico, usarlo
      if (gameImageMap[game.id]) {
        return this.getImageUrl(gameImageMap[game.id])
      }
      
      // Fallback: imagen basada en ID (solo usar imágenes disponibles)
      const imageIndex = (game.id - 1) % 5 // Restar 1 para que empiece en 0
      return this.getImageUrl(`img_${imageIndex}.png`)
    },
    
    getGameCardClass(game) {
      // Asignar diferentes gradientes según el tipo de juego
      const gameTypes = ['bingo', 'animalitos', 'lotto', 'granjita']
      const gameIndex = game.id % gameTypes.length
      return `game-card-${gameTypes[gameIndex]}`
    },
    
    getGameBadgeClass(game) {
      const players = game.current_players || 0
      const maxPlayers = game.max_players || 4
      
      if (players === 0) return 'badge-new'
      if (players < maxPlayers) return 'badge-available'
      if (players === maxPlayers) return 'badge-full'
      return 'badge-playing'
    },
    
    getGameBadgeText(game) {
      const players = game.current_players || 0
      const maxPlayers = game.max_players || 4
      
      if (players === 0) return 'Nuevo'
      if (players < maxPlayers) return 'Activo'
      if (players === maxPlayers) return 'Lleno'
      return 'Jugando'
    },
    
    handleJoinGame(game) {
      
      if (!this.isAuthenticated) {
          console.log('User not authenticated, redirecting to login');
          this.$router.push('/login');
          return;
      }

      // Verificar saldo antes de entrar a la sala de espera
      if (!this.canJoinGame(game.entry_price || 0)) {
        this.showNotification({
          type: 'warning',
          message: 'No tienes suficiente saldo para unirte a este juego.'
        });
        return;
      }

      console.log('Navigating to WaitingRoomPage with tableId:', game.id);
      // Ir directamente a la sala de espera sin hacer llamada al endpoint
      this.$router.push({
        name: 'WaitingRoomPage',
        params: { tableId: game.id }
      });
    },
    
    goToWaitingRoom(tableId) {
      // Verificar si el usuario está autenticado
      if (!this.isAuthenticated) {
        console.log('User not authenticated, redirecting to login');
        this.$router.push('/login');
        return;
      }

      console.log('Navigating to WaitingRoomPage with tableId:', tableId);
      // Ir directamente a la sala de espera de la mesa específica
      this.$router.push({
        name: 'WaitingRoomPage',
        params: { tableId: tableId }
      });
    },
    
    showNotification({ type, message }) {
      EventBus.emit('show-notification', { type, message })
    }
  },
  watch: {
    availableGames: {
      handler(newGames) {
        const userId = this.currentUser?.id;
        if (userId) {
          const juegoInscrito = newGames.find(
            game => game.users && game.users.some(user => user.id === userId)
          );
          if (juegoInscrito) {
            this.$router.push({ name: 'WaitingRoomPage', params: { tableId: juegoInscrito.id } });
          }
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style scoped>
/* Título de la sección */
.section-header__title {
  font-size: 2.8rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1.5rem;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 165, 0, 0.3);
  background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
}

.section-header__title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(255, 107, 53, 0.4);
}

.welcome-message {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 2.5rem;
  line-height: 1.7;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
  font-weight: 500;
}

/* Estados de conexión y balance (comentados) */
.connection-status {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  padding: 8px 16px;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-indicator.connected {
  background-color: #28a745;
  color: white;
}

.status-indicator.disconnected {
  background-color: #dc3545;
  color: white;
}

.status-text {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.user-balance-info {
  margin-bottom: 20px;
}

.balance-card {
  display: inline-flex;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 16px 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.balance-icon {
  font-size: 24px;
  margin-right: 16px;
}

.balance-details h5 {
  margin: 0;
  font-size: 14px;
  opacity: 0.9;
}

.balance-amount {
  margin: 4px 0 0 0;
  font-size: 24px;
  font-weight: 700;
}

/* Estados de carga y mensajes */
.loading-spinner {
  padding: 40px 0;
}

.no-games-message {
  padding: 40px 0;
  color: #666;
}

.no-games-message i {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
}

/* Nuevo diseño de tarjetas de juegos */
.game-card {
  position: relative;
  background: linear-gradient(135deg, #2d1b69 0%, #4a2c7a 100%);
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
  overflow: hidden;
  min-height: 280px;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 165, 0, 0.2);
}

.game-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 165, 0, 0.3);
  border-color: rgba(255, 165, 0, 0.4);
}

/* Gradientes específicos para cada tipo de juego - Tema casino */
.game-card-bingo {
  background: linear-gradient(135deg, #8b0000 0%, #dc143c 100%);
  border-color: rgba(255, 69, 0, 0.3);
}

.game-card-bingo:hover {
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 69, 0, 0.4);
}

.game-card-animalitos {
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  border-color: rgba(59, 130, 246, 0.3);
}

.game-card-animalitos:hover {
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(59, 130, 246, 0.4);
}

.game-card-lotto {
  background: linear-gradient(135deg, #b45309 0%, #f59e0b 100%);
  border-color: rgba(245, 158, 11, 0.3);
}

.game-card-lotto:hover {
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(245, 158, 11, 0.4);
}

.game-card-granjita {
  background: linear-gradient(135deg, #166534 0%, #22c55e 100%);
  border-color: rgba(34, 197, 94, 0.3);
}

.game-card-granjita:hover {
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(34, 197, 94, 0.4);
}

/* Badge de estado */
.game-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  color: white;
  z-index: 2;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.4);
  border: 2px solid rgba(255, 255, 255, 0.3);
  letter-spacing: 0.8px;
  min-width: 50px;
  text-align: center;
}

.badge-new {
  background: linear-gradient(135deg, #e53e3e 0%, #fc8181 100%);
  box-shadow: 0 3px 8px rgba(229, 62, 62, 0.5);
  border-color: rgba(255, 255, 255, 0.4);
}

.badge-available {
  background: linear-gradient(135deg, #38a169 0%, #68d391 100%);
  box-shadow: 0 3px 8px rgba(56, 161, 105, 0.5);
  border-color: rgba(255, 255, 255, 0.4);
}

.badge-full {
  background: linear-gradient(135deg, #dd6b20 0%, #f6ad55 100%);
  box-shadow: 0 3px 8px rgba(221, 107, 32, 0.5);
  border-color: rgba(255, 255, 255, 0.4);
}

.badge-playing {
  background: linear-gradient(135deg, #805ad5 0%, #b794f6 100%);
  box-shadow: 0 3px 8px rgba(128, 90, 213, 0.5);
  border-color: rgba(255, 255, 255, 0.4);
}

/* Contenido de la tarjeta */
.game-card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* Logo/Imagen del juego */
.game-logo {
  text-align: center;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.game-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(255, 165, 0, 0.2);
  transition: all 0.3s ease;
}

.game-card:hover .game-image {
  transform: scale(1.1);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4), 0 0 0 3px rgba(255, 165, 0, 0.4);
}

/* Sección del título */
.game-title-section {
  text-align: center;
  margin-bottom: 20px;
}

.game-title {
  font-size: 1.3rem;
  font-weight: 800;
  color: white;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.6), 0 0 10px rgba(255, 255, 255, 0.2);
  text-align: center;
  margin: 0;
  letter-spacing: 0.5px;
}

/* Información del juego */
.game-info {
  text-align: center;
}

.game-price-section {
  margin-bottom: 20px;
}

.price-label {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 8px 0;
  font-weight: 600;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
}

.price-amount {
  font-size: 1.8rem;
  font-weight: 800;
  color: #ffd700;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5), 0 0 10px rgba(255, 215, 0, 0.3);
  letter-spacing: 1px;
}

/* Saldo insuficiente */
.insufficient-balance {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  padding: 8px 16px;
  background-color: rgba(220, 53, 69, 0.2);
  border: 1px solid rgba(220, 53, 69, 0.4);
  border-radius: 10px;
  font-size: 12px;
  color: #ffebee;
  font-weight: 600;
}

.insufficient-balance i {
  margin-right: 6px;
}

/* Botón de jugar */
.play-button {
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  padding: 14px 28px;
  color: white;
  font-weight: 800;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
}

.play-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.play-button:hover:not(.disabled)::before {
  left: 100%;
}

.play-button:hover:not(.disabled) {
  background: linear-gradient(135deg, #f7931e 0%, #ff6b35 100%);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(255, 107, 53, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.3);
}

.play-button:active:not(.disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.play-button.disabled {
  background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
  cursor: not-allowed;
  opacity: 0.6;
  box-shadow: 0 2px 8px rgba(74, 85, 104, 0.3);
  border-color: rgba(255, 255, 255, 0.1);
}

.play-button i {
  font-size: 14px;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
}

/* Responsive */
@media (max-width: 768px) {
  .game-card {
    min-height: 250px;
    padding: 15px;
  }
  
  .game-image {
    width: 60px;
    height: 60px;
  }
  
  .game-title {
    font-size: 1rem;
  }
  
  .price-amount {
    font-size: 1.3rem;
  }
  
  .play-button {
    padding: 10px 20px;
    font-size: 13px;
  }
}

@media (max-width: 991px) {
  .section-header__title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .welcome-message {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
}

@media (max-width: 575px) {
  .section-header__title {
    font-size: 1.5rem;
  }
  
  .welcome-message {
    font-size: 0.9rem;
  }
  
  .game-card {
    min-height: 200px;
    padding: 10px;
  }
  
  .game-title {
    font-size: 0.85rem;
  }
  
  .play-button {
    padding: 8px 16px;
    font-size: 11px;
  }
}
</style>