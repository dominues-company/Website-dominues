<template>
  <div class="waiting-room-page">

    <!-- 🔄 ESTADO DE CARGA -->
    <div v-if="loading" class="loading-screen">
      <div class="loading-spinner">
        <div class="spinner"></div>
        <h3>Cargando juego...</h3>
        <p>Preparando tu partida</p>
      </div>
    </div>

    <!-- ❌ ERROR -->
    <div v-else-if="error" class="error-screen">
      <div class="error-content">
        <i class="fas fa-exclamation-triangle"></i>
        <h3>Error al cargar el juego</h3>
        <p>{{ error }}</p>
        <button @click="retry" class="retry-btn">
          <i class="fas fa-redo"></i>
          Reintentar
        </button>
        <button @click="goHome" class="home-btn">
          <i class="fas fa-home"></i>
          Volver al inicio
        </button>
      </div>
    </div>

    <!-- 🎮 SALA DE ESPERA -->
    <WaitingRoom v-else-if="game && user" :gameName="game.name" @exit="goToDashboard" />
  </div>
</template>

<script>
import WaitingRoom from './WaitingRoom.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'WaitingRoomPage',
  components: {
    WaitingRoom
  },
  data() {
    return {
      loading: true,
      error: null,
      game: null
    }
  },
  computed: {
    ...mapGetters('auth', ['currentUser', 'isAuthenticated']),
    
    gameId() {
      return this.$route.params.tableId // Mantenemos tableId por compatibilidad con la ruta
    },
    
    user() {
      return this.currentUser
    }
  },
  async mounted() {
    console.log('🚀 [WAITING-PAGE] Componente montado')
    console.log('🚀 [WAITING-PAGE] Ruta actual:', this.$route)
    console.log('🚀 [WAITING-PAGE] Parámetros de ruta:', this.$route.params)
    
    // Verificar autenticación - temporalmente comentado para debug
    if (!this.isAuthenticated) {
      console.log('❌ [WAITING-PAGE] Usuario no autenticado, redirigiendo a login')
      this.$router.push('/login')
      return
    }
    
    console.log('✅ [WAITING-PAGE] Usuario autenticado, cargando datos del juego')
    
    // Cargar datos del juego
    await this.loadGameData()
  },
  methods: {
    async loadGameData() {
      try {
        this.loading = true
        this.error = null
        
        console.log('🔍 [WAITING-PAGE] Cargando juego ID:', this.gameId)
        console.log('🔍 [WAITING-PAGE] Usuario actual:', this.user)
        console.log('🔍 [WAITING-PAGE] Estado del store de games:', this.$store.state.games)
        
        // Primero intentar cargar las mesas desde el backend
        console.log('🔄 [WAITING-PAGE] Cargando mesas desde el backend...')
        await this.$store.dispatch('games/fetchTables')
        
        console.log('📡 [WAITING-PAGE] Juegos cargados del backend:', this.$store.state.games.games)
        
        // Obtener el juego desde el store o crear datos por defecto
        let gameData = this.$store.getters['games/getGameById'](this.gameId)
        console.log('🔍 [WAITING-PAGE] Juego encontrado en store:', gameData)
        
        if (!gameData) {
          console.log('⚠️ [WAITING-PAGE] Juego no encontrado en store, creando datos por defecto')
          // Si no existe en el store, crear datos por defecto
          gameData = {
            id: parseInt(this.gameId),
            name: 'Dominoes', // Nombre por defecto
            entry_price: 20.00,
            max_players: 4,
            min_players: 2,
            current_players: 1,
            mode: {
              id: 1,
              name: 'CPU'
            },
            users: [{...this.user}],
            status: 'waiting' // Estado de espera
          }
        }
        
        console.log('📡 [WAITING-PAGE] Datos del juego finales:', gameData)
        
        this.game = gameData
        
        // Guardar el juego en el store
        this.$store.commit('games/UPDATE_GAME', this.game)
        
        console.log('✅ [WAITING-PAGE] Juego cargado exitosamente:', this.game)
        
      } catch (error) {
        console.error('❌ [WAITING-PAGE] Error cargando juego:', error)
        
        this.error = error.message || 'Error al cargar el juego'
      } finally {
        this.loading = false
      }
    },
    
    async retry() {
      await this.loadGameData()
    },
    
    goHome() {
      this.$router.push('/dashboard')
    },
    
    goToDashboard() {
      this.$router.push('/dashboard')
    }
  }
}
</script>

<style scoped>
.waiting-room-page {
  margin-top: 100px;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}


/* 🔄 LOADING */
.loading-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-spinner {
  text-align: center;
  color: white;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255,255,255,0.1);
  border-left: 4px solid #4CAF50;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 24px auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-spinner h3 {
  margin: 0 0 8px 0;
  font-size: 24px;
  color: #4CAF50;
}

.loading-spinner p {
  margin: 0;
  color: #ccc;
  font-size: 16px;
}

/* ❌ ERROR */
.error-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.error-content {
  background: linear-gradient(145deg, #2a2a3e, #1f1f2e);
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  color: white;
  max-width: 500px;
  border: 2px solid #f44336;
  box-shadow: 0 8px 32px rgba(244, 67, 54, 0.3);
}

.error-content i {
  font-size: 64px;
  color: #f44336;
  margin-bottom: 24px;
}

.error-content h3 {
  margin: 0 0 16px 0;
  font-size: 24px;
  color: #f44336;
}

.error-content p {
  margin: 0 0 32px 0;
  color: #ccc;
  font-size: 16px;
  line-height: 1.5;
}

.retry-btn, .home-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 8px;
  font-size: 14px;
}

.retry-btn {
  background: linear-gradient(145deg, #4CAF50, #45a049);
  color: white;
}

.retry-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(76, 175, 80, 0.4);
}

.home-btn {
  background: linear-gradient(145deg, #666, #555);
  color: white;
}

.home-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.3);
}

/* 📱 RESPONSIVE */
@media (max-width: 768px) {
  .error-content {
    padding: 24px;
  }
  
  .retry-btn, .home-btn {
    display: block;
    width: 100%;
    margin: 8px 0;
  }
}
</style>
