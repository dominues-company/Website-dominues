<template>
  <div class="game-view">
    <div class="container">
      <h1>Juegos del Casino</h1>
      
      <div class="games-grid">
        <!-- Domino Game -->
        <div class="game-card">
          <MultiplayerGameIntegration 
            :gameTitle="'Dominó'"
            :gameBaseUrl="'http://localhost/playgames/app/public/'"
            :gameType="'domino'"
            v-if="showDominoGame"
          />
          <div v-else class="game-preview">
            <img src="/domino/assets/logo.png" alt="Dominó" class="game-logo">
            <h3>Dominó</h3>
            <p>Juego clásico de dominó con modo multijugador y vs CPU</p>
            <button @click="showDominoGame = true" class="btn btn-primary">
              <i class="fas fa-play"></i> Jugar Dominó
            </button>
          </div>
        </div>

        <!-- Add more games here -->
        <div class="game-card">
          <div class="game-preview">
            <div class="game-placeholder">
              <i class="fas fa-cards-blank"></i>
            </div>
            <h3>Próximamente</h3>
            <p>Más juegos estarán disponibles pronto</p>
            <button class="btn btn-secondary" disabled>
              <i class="fas fa-lock"></i> Próximamente
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MultiplayerGameIntegration from '@/components/games/MultiplayerGameIntegration.vue'

export default {
  name: 'GameView',
  components: {
    MultiplayerGameIntegration
  },
  data() {
    return {
      showDominoGame: false
    }
  },
  mounted() {
    // Check if user is authenticated
    if (!this.$store.getters['auth/isAuthenticated']) {
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.game-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px 0;
}

.game-view .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  text-align: center;
  color: white;
  margin-bottom: 40px;
  font-size: 36px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.game-card {
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.game-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0,0,0,0.3);
}

.game-preview {
  text-align: center;
}

.game-logo {
  max-width: 120px;
  height: auto;
  margin-bottom: 20px;
}

.game-placeholder {
  width: 120px;
  height: 120px;
  margin: 0 auto 20px;
  background: #f8f9fa;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  font-size: 48px;
}

.game-preview h3 {
  color: #333;
  margin-bottom: 15px;
  font-size: 24px;
}

.game-preview p {
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-primary {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(40, 167, 69, 0.4);
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .games-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  h1 {
    font-size: 28px;
  }
  
  .game-card {
    padding: 15px;
  }
}
</style>

