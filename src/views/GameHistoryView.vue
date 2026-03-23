<template>
  <div class="game-history-view">
    <div class="container">
      <!-- Header -->
      <div class="history-header">
        <div class="title-section">
          <h1 class="title">
            <i class="fas fa-history"></i>
            Mi Bitácora de Juegos
          </h1>
          <p class="subtitle">Historial completo de todas tus partidas</p>
        </div>
      </div>

      <!-- Stats Summary -->
      <div class="stats-summary">
        <div class="stat-card wins">
          <div class="stat-icon">
            <i class="fas fa-trophy"></i>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ totalWins }}</div>
            <div class="stat-label">Victorias</div>
          </div>
        </div>
        
        <div class="stat-card games">
          <div class="stat-icon">
            <i class="fas fa-gamepad"></i>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ totalGames }}</div>
            <div class="stat-label">Total Partidas</div>
          </div>
        </div>
        
        <div class="stat-card winrate">
          <div class="stat-icon">
            <i class="fas fa-percent"></i>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ winRate }}%</div>
            <div class="stat-label">Win Rate</div>
          </div>
        </div>
        
        <div class="stat-card earnings">
          <div class="stat-icon">
            <i class="fas fa-coins"></i>
          </div>
          <div class="stat-content">
            <div class="stat-value positive">
              {{ formatCurrency(totalEarnings) }}
            </div>
            <div class="stat-label">Total Ganado</div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="filters-section">
        <div class="filter-group">
          <label>Modo de Juego:</label>
          <select v-model="filters.gameMode" @change="applyFilters">
            <option value="">Todos</option>
            <option value="cpu">vs CPU</option>
            <option value="online">Online</option>
            <option value="invite">Invitación</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>Resultado:</label>
          <select v-model="filters.result" @change="applyFilters">
            <option value="">Todos</option>
            <option value="win">Victorias</option>
            <option value="loss">Otras Partidas</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>Período:</label>
          <select v-model="filters.period" @change="applyFilters">
            <option value="">Todo</option>
            <option value="today">Hoy</option>
            <option value="week">Última Semana</option>
            <option value="month">Último Mes</option>
          </select>
        </div>
        
        <button @click="loadHistory" class="btn-refresh" :disabled="loading">
          <i class="fas fa-sync-alt" :class="{ 'fa-spin': loading }"></i>
          Actualizar
        </button>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="loading-container">
        <div class="spinner"></div>
        <p>Cargando historial...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="error-container">
        <i class="fas fa-exclamation-triangle"></i>
        <p>{{ error }}</p>
        <button @click="loadHistory" class="btn-retry">Reintentar</button>
      </div>

      <!-- Games List -->
      <div v-else-if="filteredGames.length > 0" class="games-list">
        <div 
          v-for="game in paginatedGames" 
          :key="game.result_id"
          class="game-card"
          :class="{ 'winner': game.is_winner, 'loser': !game.is_winner }"
        >
          <div class="game-header">
            <div class="game-result">
              <i :class="game.is_winner ? 'fas fa-trophy' : 'fas fa-gamepad'"></i>
              <span class="result-text">{{ game.is_winner ? 'VICTORIA' : 'Partida Jugada' }}</span>
            </div>
            <div class="game-date">{{ formatDate(game.game_date) }}</div>
          </div>
          
          <div class="game-body">
            <div class="game-info">
              <div class="info-row">
                <i class="fas fa-table-tennis"></i>
                <span>{{ game.table_name }} - {{ game.mode_name }}</span>
              </div>
              <div class="info-row" v-if="game.opponent_name">
                <i class="fas fa-user"></i>
                <span>vs {{ game.opponent_name }}</span>
              </div>
            </div>
            
            <div class="game-score">
              <div class="score-item">
                <span class="score-label">Tu Score:</span>
                <span class="score-value">{{ game.player_score || '0' }}</span>
              </div>
              <span class="score-separator">-</span>
              <div class="score-item">
                <span class="score-label">Oponente:</span>
                <span class="score-value">{{ game.opponent_score || '0' }}</span>
              </div>
            </div>
            
            <div class="game-money">
              <div class="money-item bet">
                <span>Apuesta:</span>
                <span class="amount">-{{ formatCurrency(game.bet_amount) }}</span>
              </div>
              <div class="money-item prize">
                <span>Premio:</span>
                <span class="amount" :class="{ 'win': game.is_winner, 'loss': !game.is_winner }">
                  {{ game.is_winner ? '+' : '' }}{{ formatCurrency(game.is_winner ? game.winner_amount : 0) }}
                </span>
              </div>
            </div>
            
            <div class="game-badges">
              <span v-if="game.surrendered === 'true'" class="badge badge-surrender">
                <i class="fas fa-flag"></i> Rendición
              </span>
              <span v-if="game.disconnect_reason" class="badge badge-disconnect">
                <i class="fas fa-plug"></i> Desconexión
              </span>
              <span v-if="game.game_mode === 'cpu'" class="badge badge-cpu">
                <i class="fas fa-robot"></i> vs CPU
              </span>
              <span v-if="game.room_code" class="badge badge-private">
                <i class="fas fa-lock"></i> Sala: {{ game.room_code }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <i class="fas fa-ghost"></i>
        <h3>No hay partidas registradas</h3>
        <p>Aún no has jugado ninguna partida. ¡Empieza a jugar ahora!</p>
        <router-link to="/dashboard" class="btn-play">
          <i class="fas fa-play"></i>
          Jugar Ahora
        </router-link>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="pagination">
        <button 
          @click="changePage(currentPage - 1)" 
          :disabled="currentPage === 1"
          class="btn-page"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
        
        <span class="page-info">Página {{ currentPage }} de {{ totalPages }}</span>
        
        <button 
          @click="changePage(currentPage + 1)" 
          :disabled="currentPage === totalPages"
          class="btn-page"
        >
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  name: 'GameHistoryView',
  data() {
    return {
      games: [],
      filteredGames: [],
      loading: true,
      error: null,
      filters: {
        gameMode: '',
        result: '',
        period: ''
      },
      currentPage: 1,
      itemsPerPage: 10
    };
  },
  computed: {
    totalGames() {
      return this.games.length;
    },
    totalWins() {
      return this.games.filter(g => g.is_winner).length;
    },
    winRate() {
      if (this.totalGames === 0) return 0;
      return ((this.totalWins / this.totalGames) * 100).toFixed(1);
    },
    totalEarnings() {
      // Solo sumar las ganancias de las victorias (sin restar apuestas)
      return this.games.reduce((sum, g) => {
        const winnings = g.is_winner ? (parseFloat(g.winner_amount) || 0) : 0;
        return sum + winnings;
      }, 0);
    },
    totalPages() {
      return Math.ceil(this.filteredGames.length / this.itemsPerPage);
    },
    paginatedGames() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredGames.slice(start, start + this.itemsPerPage);
    }
  },
  mounted() {
    this.loadHistory();
  },
  methods: {
    async loadHistory() {
      try {
        this.loading = true;
        this.error = null;
        
        const user = this.$store.getters['auth/currentUser'];
        if (!user) {
          throw new Error('Usuario no autenticado');
        }
        
        const response = await api.get(`/api/stats/player/${user.id}/history?limit=100`);
        
        this.games = response.data.history || [];
        this.applyFilters();
        
      } catch (error) {
        console.error('Error loading game history:', error);
        this.error = 'Error al cargar el historial. Por favor intenta nuevamente.';
      } finally {
        this.loading = false;
      }
    },
    
    applyFilters() {
      let filtered = [...this.games];
      
      if (this.filters.gameMode) {
        filtered = filtered.filter(g => g.game_mode === this.filters.gameMode);
      }
      
      if (this.filters.result === 'win') {
        filtered = filtered.filter(g => g.is_winner);
      } else if (this.filters.result === 'loss') {
        filtered = filtered.filter(g => !g.is_winner);
      }
      
      if (this.filters.period) {
        const now = new Date();
        filtered = filtered.filter(g => {
          const gameDate = new Date(g.game_date);
          if (this.filters.period === 'today') {
            return gameDate.toDateString() === now.toDateString();
          } else if (this.filters.period === 'week') {
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return gameDate >= weekAgo;
          } else if (this.filters.period === 'month') {
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            return gameDate >= monthAgo;
          }
          return true;
        });
      }
      
      this.filteredGames = filtered;
      this.currentPage = 1;
    },
    
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    
    formatCurrency(amount) {
      const formatted = new Intl.NumberFormat('es-BO', {
        style: 'currency',
        currency: 'BOB',
        minimumFractionDigits: 2
      }).format(amount || 0);
      // Reemplazar BOB por Rup
      return formatted.replace('BOB', 'Rup');
    },
    
    formatDate(date) {
      return new Date(date).toLocaleString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }
};
</script>

<style scoped>
.game-history-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 100px 20px 40px 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Header */
.history-header {
  margin-bottom: 30px;
  text-align: center;
}

.title {
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  margin: 0 0 10px 0;
  text-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.title i {
  color: #fbbf24;
  margin-right: 15px;
}

.subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

/* Stats Summary */
.stats-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
}

.wins .stat-icon {
  background: linear-gradient(135deg, #10b981, #059669);
}

.games .stat-icon {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.winrate .stat-icon {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.earnings .stat-icon {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
}

.stat-value.positive {
  color: #10b981;
  text-shadow: 0 0 10px rgba(16, 185, 129, 0.3);
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

/* Filters */
.filters-section {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 30px;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  align-items: end;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 150px;
}

.filter-group label {
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
}

.filter-group select {
  padding: 10px 15px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1rem;
}

.btn-refresh {
  padding: 10px 20px;
  background: #fbbf24;
  color: #1e1b4b;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-refresh:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 5px 20px rgba(251, 191, 36, 0.4);
}

.btn-refresh:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Loading & Error */
.loading-container,
.error-container {
  text-align: center;
  padding: 60px 20px;
  color: white;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top-color: #fbbf24;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-container i {
  font-size: 3rem;
  color: #ef4444;
  margin-bottom: 20px;
}

.btn-retry {
  margin-top: 20px;
  padding: 12px 30px;
  background: #fbbf24;
  color: #1e1b4b;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-retry:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 20px rgba(251, 191, 36, 0.4);
}

/* Games List */
.games-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.game-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.game-card:hover {
  transform: translateX(5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.game-card.winner {
  border-left: 4px solid #10b981;
}

.game-card.loser {
  border-left: 4px solid #9ca3af;
  opacity: 0.85;
}

.game-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  align-items: center;
}

.game-result {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 1.1rem;
}

.winner .game-result {
  color: #10b981;
}

.loser .game-result {
  color: #9ca3af;
}

.game-result i {
  font-size: 1.3rem;
}

.game-date {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.game-body {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.game-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  font-size: 0.95rem;
}

.info-row i {
  color: #fbbf24;
  width: 20px;
}

.game-score {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.score-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.score-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 5px;
}

.score-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
}

.score-separator {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.5);
}

.game-money {
  display: flex;
  justify-content: space-around;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.money-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.money-item span:first-child {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
}

.money-item .amount {
  font-weight: 700;
  font-size: 1.1rem;
}

.money-item.bet .amount {
  color: #ef4444;
}

.money-item.prize .amount.win {
  color: #10b981;
}

.money-item.prize .amount.loss {
  color: rgba(255, 255, 255, 0.5);
}

.game-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.badge-surrender {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
  border: 1px solid #ef4444;
}

.badge-disconnect {
  background: rgba(245, 158, 11, 0.2);
  color: #f59e0b;
  border: 1px solid #f59e0b;
}

.badge-cpu {
  background: rgba(99, 102, 241, 0.2);
  color: #6366f1;
  border: 1px solid #6366f1;
}

.badge-private {
  background: rgba(139, 92, 246, 0.2);
  color: #8b5cf6;
  border: 1px solid #8b5cf6;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: white;
}

.empty-state i {
  font-size: 5rem;
  margin-bottom: 20px;
  opacity: 0.7;
}

.empty-state h3 {
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.empty-state p {
  font-size: 1.1rem;
  margin-bottom: 30px;
  opacity: 0.8;
}

.btn-play {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 30px;
  background: #fbbf24;
  color: #1e1b4b;
  border-radius: 10px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-play:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 20px rgba(251, 191, 36, 0.4);
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
}

.btn-page {
  padding: 10px 15px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-page:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.btn-page:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.page-info {
  color: white;
  font-weight: 600;
}

/* Responsive */
@media (max-width: 768px) {
  .game-history-view {
    padding: 80px 10px 30px 10px;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .stats-summary {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
  
  .stat-card {
    padding: 12px;
    gap: 10px;
  }
  
  .stat-icon {
    width: 45px;
    height: 45px;
    font-size: 1.3rem;
  }
  
  .stat-value {
    font-size: 1.3rem;
  }
  
  .stat-label {
    font-size: 0.8rem;
  }
  
  .filters-section {
    flex-direction: column;
    gap: 15px;
  }
  
  .filter-group {
    min-width: 100%;
  }
  
  .game-score,
  .game-money {
    flex-direction: column;
    gap: 10px;
  }
  
  .game-item {
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 1.6rem;
  }
  
  .subtitle {
    font-size: 0.85rem;
  }
  
  .stats-summary {
    gap: 6px;
  }
  
  .stat-card {
    padding: 10px;
    gap: 8px;
  }
  
  .stat-icon {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
  
  .stat-value {
    font-size: 1.2rem;
  }
  
  .stat-label {
    font-size: 0.75rem;
  }
}
</style>


