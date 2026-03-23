<template>
  <div class="multiplayer-game-container">
    <div class="game-header">
      <h2>{{ gameTitle }}</h2>
      <div class="game-controls">
        <button @click="showGameModeSelection = true" class="btn btn-primary">
          <i class="fas fa-gamepad"></i> Jugar
        </button>
        <button @click="closeGame" class="btn btn-secondary" v-if="gameStarted">
          <i class="fas fa-times"></i> Cerrar
        </button>
      </div>
    </div>

    <!-- Game Mode Selection Modal -->
    <div v-if="showGameModeSelection" class="modal-overlay" @click="showGameModeSelection = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Seleccionar Modo de Juego</h3>
          <button @click="showGameModeSelection = false" class="close-btn">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="game-mode-options">
            <button @click="startGame('cpu')" class="game-mode-btn cpu-mode">
              <i class="fas fa-robot"></i>
              <span>Jugar vs CPU</span>
              <small>Juega contra la computadora</small>
            </button>
            <button @click="startGame('multiplayer')" class="game-mode-btn multiplayer-mode">
              <i class="fas fa-users"></i>
              <span>Multijugador</span>
              <small>Juega contra otros jugadores</small>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Game iframe -->
    <div v-if="gameStarted" class="game-frame-container">
      <iframe 
        ref="gameFrame"
        :src="gameUrl" 
        frameborder="0"
        class="game-iframe"
        @load="onGameLoaded"
      ></iframe>
    </div>

    <!-- Game results -->
    <div v-if="gameResult" class="game-result-overlay">
      <div class="result-content">
        <h3>Resultado del Juego</h3>
        <div class="result-details">
          <p><strong>Modo:</strong> {{ gameResult.gameMode === 'cpu' ? 'vs CPU' : 'Multijugador' }}</p>
          <p><strong>Resultado:</strong> {{ formatGameResult(gameResult.result) }}</p>
        </div>
        <div class="result-actions">
          <button @click="playAgain" class="btn btn-primary">
            <i class="fas fa-redo"></i> Jugar de Nuevo
          </button>
          <button @click="closeGame" class="btn btn-secondary">
            <i class="fas fa-home"></i> Volver al Casino
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MultiplayerGameIntegration',
  props: {
    gameTitle: {
      type: String,
      default: 'Juego Multijugador'
    },
    gameBaseUrl: {
      type: String,
      required: true
    },
    gameType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showGameModeSelection: false,
      gameStarted: false,
      gameMode: null,
      gameResult: null,
      gameLoaded: false
    }
  },
  computed: {
    ...mapGetters('auth', ['currentUser']),
    gameUrl() {
      if (!this.gameMode) return '';
      
      const params = new URLSearchParams({
        gameMode: this.gameMode,
        vueIntegration: 'true',
        playerName: this.currentUser?.name || 'Jugador',
        gameType: this.gameType,
        vueApiUrl: window.location.origin,
        cpuDifficulty: 'medium'
      });
      
      return `${this.gameBaseUrl}multiplayer/?${params.toString()}`;
    }
  },
  mounted() {
    this.setupMessageListener();
  },
  beforeUnmount() {
    this.removeMessageListener();
  },
  methods: {
    startGame(mode) {
      this.gameMode = mode;
      this.showGameModeSelection = false;
      this.gameStarted = true;
      this.gameResult = null;
      
      this.$nextTick(() => {
        this.sendUserDataToGame();
      });
    },
    
    onGameLoaded() {
      this.gameLoaded = true;
      this.sendUserDataToGame();
    },
    
    sendUserDataToGame() {
      if (!this.gameLoaded || !this.$refs.gameFrame) return;
      
      const gameWindow = this.$refs.gameFrame.contentWindow;
      if (gameWindow) {
        const userData = {
          type: 'USER_DATA_RESPONSE',
          user: this.currentUser,
          config: {
            gameMode: this.gameMode,
            playerName: this.currentUser?.name || 'Jugador'
          }
        };
        
        gameWindow.postMessage(userData, '*');
      }
    },
    
    setupMessageListener() {
      this.messageHandler = (event) => {
        if (event.data.type === 'REQUEST_USER_DATA') {
          this.sendUserDataToGame();
        } else if (event.data.type === 'GAME_RESULT') {
          this.handleGameResult(event.data);
        }
      };
      
      window.addEventListener('message', this.messageHandler);
    },
    
    removeMessageListener() {
      if (this.messageHandler) {
        window.removeEventListener('message', this.messageHandler);
      }
    },
    
    handleGameResult(resultData) {
      this.gameResult = resultData;
      this.saveGameResult(resultData);
    },
    
    saveGameResult(resultData) {
      // Save game result to backend
      // This would typically involve an API call to save the game statistics
      console.log('Game result received:', resultData);
      
      // You can implement API call here to save to database
      // this.$store.dispatch('games/saveGameResult', resultData);
    },
    
    formatGameResult(result) {
      if (typeof result === 'object') {
        if (result.winner) {
          return result.winner === 'player' ? 'Victoria' : 'Derrota';
        }
        if (result.score) {
          return `Puntuación: ${result.score}`;
        }
        return JSON.stringify(result);
      }
      return result;
    },
    
    playAgain() {
      this.gameResult = null;
      this.startGame(this.gameMode);
    },
    
    closeGame() {
      this.gameStarted = false;
      this.gameMode = null;
      this.gameResult = null;
      this.gameLoaded = false;
      this.showGameModeSelection = false;
    }
  }
}
</script>

<style scoped>
.multiplayer-game-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  color: white;
}

.game-header h2 {
  margin: 0;
  font-size: 24px;
}

.game-controls {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-primary {
  background-color: #28a745;
  color: white;
}

.btn-primary:hover {
  background-color: #218838;
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
  transform: translateY(-2px);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 15px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.modal-header h3 {
  margin: 0;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #999;
}

.close-btn:hover {
  color: #333;
}

.modal-body {
  padding: 20px;
}

.game-mode-options {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.game-mode-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.game-mode-btn:hover {
  border-color: #007bff;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
}

.game-mode-btn i {
  font-size: 32px;
  margin-bottom: 10px;
}

.cpu-mode i {
  color: #dc3545;
}

.multiplayer-mode i {
  color: #007bff;
}

.game-mode-btn span {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

.game-mode-btn small {
  color: #666;
  font-size: 14px;
}

.game-frame-container {
  width: 100%;
  height: 600px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.game-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.game-result-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
}

.result-content {
  background: white;
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  max-width: 400px;
  width: 90%;
}

.result-content h3 {
  color: #333;
  margin-bottom: 20px;
}

.result-details {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.result-details p {
  margin: 5px 0;
  color: #555;
}

.result-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

@media (max-width: 768px) {
  .game-frame-container {
    height: 400px;
  }
  
  .game-header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  .game-mode-options {
    gap: 10px;
  }
  
  .result-actions {
    flex-direction: column;
  }
}
</style>
