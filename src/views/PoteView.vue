<template>
  <div class="pote-view">
    <div class="container">
      <!-- Header -->
      <div class="pote-header">
        <div class="title-section">
          <h1 class="title">
            <i class="fas fa-trophy"></i>
            Pote del Mes
          </h1>
          <p class="subtitle">Top jugadores de {{ currentMonthName }} {{ currentYear }}</p>
        </div>
        
        <div class="stats-cards">
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-users"></i>
            </div>
            <div class="stat-content">
              <div class="stat-value">{{ totalPlayers }}</div>
              <div class="stat-label">Jugadores Activos</div>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-gamepad"></i>
            </div>
            <div class="stat-content">
              <div class="stat-value">{{ totalGames }}</div>
              <div class="stat-label">Partidas Jugadas</div>
            </div>
          </div>
          
          <div class="stat-card stat-card-full">
            <div class="stat-icon">
              <i class="fas fa-coins"></i>
            </div>
            <div class="stat-content">
              <div class="stat-value">{{ formatCurrency(totalPrizes) }}</div>
              <div class="stat-label">Premios Totales</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="loading-container">
        <div class="spinner"></div>
        <p>Cargando estadísticas...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="error-container">
        <i class="fas fa-exclamation-triangle"></i>
        <p>{{ error }}</p>
        <button @click="loadStats" class="btn-retry">Reintentar</button>
      </div>

      <!-- Ranking Table -->
      <div v-else class="ranking-section">
        <div class="table-header">
          <h2>
            <i class="fas fa-ranking-star"></i>
            Ranking de Jugadores
          </h2>
          <div class="filters">
            <select v-model="selectedMonth" @change="loadStats" class="month-select">
              <option v-for="month in months" :key="month.value" :value="month.value">
                {{ month.label }}
              </option>
            </select>
          </div>
        </div>

        <div class="ranking-table">
          <table>
            <thead>
              <tr>
                <th class="rank-col">Pos</th>
                <th class="player-col">Jugador</th>
                <th class="games-col">Partidas</th>
                <th class="wins-col">Victorias</th>
                <th class="winrate-col">% Victorias</th>
                <th class="earnings-col">Ganancias</th>
                <th class="actions-col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(player, index) in players" 
                :key="'t-' + player.user_id"
                :class="getRankClass(index + 1)"
                @click="showPlayerHistory(player)"
                class="player-row"
              >
                <td class="rank-col">
                  <div class="rank-badge" :class="getRankBadgeClass(index + 1)">
                    <span v-if="index < 3" class="trophy-icon">
                      {{ getTrophyIcon(index + 1) }}
                    </span>
                    <span v-else>{{ index + 1 }}</span>
                  </div>
                </td>
                <td class="player-col">
                  <div class="player-info">
                    <div class="player-avatar">
                      {{ getPlayerInitials(player.player_name) }}
                    </div>
                    <div class="player-details">
                      <div class="player-name">{{ player.player_name }}</div>
                      <div class="player-stats-mini">
                        W: {{ player.wins }} | L: {{ player.losses }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="games-col">
                  <span class="games-count">{{ player.total_games }}</span>
                </td>
                <td class="wins-col">
                  <span class="wins-count">{{ player.wins }}</span>
                </td>
                <td class="winrate-col">
                  <div class="winrate-container">
                    <div class="winrate-bar">
                      <div 
                        class="winrate-fill" 
                        :style="{ width: player.win_rate + '%', backgroundColor: getWinrateColor(player.win_rate) }"
                      ></div>
                    </div>
                    <span class="winrate-text">{{ player.win_rate }}%</span>
                  </div>
                </td>
                <td class="earnings-col">
                  <span class="earnings-amount positive">
                    {{ formatCurrency(displayProfit(player.net_profit)) }}
                  </span>
                </td>
                <td class="actions-col">
                  <button @click.stop="showPlayerHistory(player)" class="btn-view">
                    <i class="fas fa-eye"></i>
                    Ver
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="ranking-cards">
          <button
            v-for="(player, index) in players"
            :key="'c-' + player.user_id"
            type="button"
            class="player-card"
            :class="getRankClass(index + 1)"
            @click="showPlayerHistory(player)"
          >
            <div class="card-rank" :class="getRankBadgeClass(index + 1)">
              <span v-if="index < 3">{{ getTrophyIcon(index + 1) }}</span>
              <span v-else>{{ index + 1 }}</span>
            </div>
            <div class="card-main">
              <div class="card-top">
                <span class="card-name">{{ player.player_name }}</span>
                <span class="card-profit">{{ formatCurrency(displayProfit(player.net_profit)) }}</span>
              </div>
              <div class="card-meta">
                <span class="card-winrate">
                  <i class="winrate-dot" :style="{ backgroundColor: getWinrateColor(player.win_rate) }"></i>
                  {{ player.win_rate }}%
                </span>
                <span>{{ player.wins }}W · {{ player.losses }}L</span>
                <span>{{ player.total_games }} partidas</span>
              </div>
            </div>
            <span class="btn-view btn-view-compact" aria-hidden="true">
              <i class="fas fa-eye"></i>
            </span>
          </button>
        </div>

        <div v-if="players.length === 0" class="no-data">
          <i class="fas fa-inbox"></i>
          <p>No hay datos disponibles para este mes</p>
        </div>
      </div>
    </div>

    <!-- Player History Modal -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>
            <i class="fas fa-history"></i>
            Historial de {{ selectedPlayer?.player_name }}
          </h2>
          <button @click="closeModal" class="btn-close">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="modal-body">
          <!-- Player Summary -->
          <div class="player-summary">
            <div class="summary-card">
              <i class="fas fa-trophy"></i>
              <div>
                <div class="summary-value">{{ selectedPlayer?.wins }}</div>
                <div class="summary-label">Victorias</div>
              </div>
            </div>
            <div class="summary-card">
              <i class="fas fa-times-circle"></i>
              <div>
                <div class="summary-value">{{ selectedPlayer?.losses }}</div>
                <div class="summary-label">Derrotas</div>
              </div>
            </div>
            <div class="summary-card">
              <i class="fas fa-percent"></i>
              <div>
                <div class="summary-value">{{ selectedPlayer?.win_rate }}%</div>
                <div class="summary-label">Win Rate</div>
              </div>
            </div>
            <div class="summary-card">
              <i class="fas fa-coins"></i>
              <div>
                <div class="summary-value profit-value">{{ formatCurrency(displayProfit(selectedPlayer?.net_profit)) }}</div>
                <div class="summary-label">Ganancia Neta</div>
              </div>
            </div>
          </div>

          <!-- Loading History -->
          <div v-if="loadingHistory" class="loading-history">
            <div class="spinner"></div>
            <p>Cargando historial...</p>
          </div>

          <!-- Games History -->
          <div v-else class="games-history">
            <h3>Últimas Partidas</h3>
            <div class="games-list">
              <div 
                v-for="game in playerHistory" 
                :key="game.result_id"
                class="game-item"
                :class="{ 'winner': game.is_winner, 'loser': !game.is_winner }"
              >
                <div class="game-header">
                  <div class="game-status">
                    <i :class="game.is_winner ? 'fas fa-trophy' : 'fas fa-times-circle'"></i>
                    <span>{{ game.is_winner ? 'Victoria' : 'Derrota' }}</span>
                  </div>
                  <div class="game-date">{{ formatDate(game.game_date) }}</div>
                </div>
                
                <div class="game-details">
                  <div class="game-info">
                    <div class="info-item">
                      <i class="fas fa-table-tennis"></i>
                      <span>{{ game.table_name }} - {{ game.mode_name }}</span>
                    </div>
                    <div class="info-item">
                      <i class="fas fa-user-friends"></i>
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
                  
                  <div class="game-earnings">
                    <div class="earning-item">
                      <span>Apuesta:</span>
                      <span class="bet">-{{ formatCurrency(game.bet_amount) }}</span>
                    </div>
                    <div class="earning-item">
                      <span>Premio:</span>
                      <span class="win" v-if="game.is_winner">+{{ formatCurrency(game.winner_amount) }}</span>
                      <span class="loss" v-else>{{ formatCurrency(0) }}</span>
                    </div>
                  </div>

                  <!-- Badges especiales -->
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
                      <i class="fas fa-lock"></i> Sala Privada
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="playerHistory.length === 0" class="no-history">
              <i class="fas fa-inbox"></i>
              <p>No hay historial disponible</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api';
import {
  normalizeHistoryGame,
  mergeHistoryResponsePayload,
  coerceHistoryEntries
} from '@/utils/gameHistoryNormalize';

export default {
  name: 'PoteView',
  data() {
    return {
      loading: true,
      loadingHistory: false,
      error: null,
      players: [],
      selectedPlayer: null,
      playerHistory: [],
      showModal: false,
      selectedMonth: new Date().getMonth() + 1,
      currentYear: new Date().getFullYear(),
      months: [
        { value: 1, label: 'Enero' },
        { value: 2, label: 'Febrero' },
        { value: 3, label: 'Marzo' },
        { value: 4, label: 'Abril' },
        { value: 5, label: 'Mayo' },
        { value: 6, label: 'Junio' },
        { value: 7, label: 'Julio' },
        { value: 8, label: 'Agosto' },
        { value: 9, label: 'Septiembre' },
        { value: 10, label: 'Octubre' },
        { value: 11, label: 'Noviembre' },
        { value: 12, label: 'Diciembre' }
      ]
    };
  },
  computed: {
    currentMonthName() {
      const month = this.months.find(m => m.value === this.selectedMonth);
      return month ? month.label : '';
    },
    totalPlayers() {
      return this.players.length;
    },
    totalGames() {
      return this.players.reduce((sum, p) => sum + p.total_games, 0);
    },
    totalPrizes() {
      return this.players.reduce((sum, p) => sum + parseFloat(p.total_earned || 0), 0);
    }
  },
  mounted() {
    this.loadStats();
    this._onHistoryRefresh = () => {
      this.loadStats();
      if (this.showModal && this.selectedPlayer) {
        this.showPlayerHistory(this.selectedPlayer);
      }
    };
    document.addEventListener('visibilitychange', this._onPoteVisibility);
    window.addEventListener('dominues:history-refresh', this._onHistoryRefresh);
  },
  beforeUnmount() {
    window.removeEventListener('dominues:history-refresh', this._onHistoryRefresh);
    document.removeEventListener('visibilitychange', this._onPoteVisibility);
  },
  methods: {
    _onPoteVisibility() {
      if (document.visibilityState === 'visible' && !this.loading) {
        this.loadStats();
      }
    },
    async loadStats() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await api.get(`/api/stats/monthly/${this.selectedMonth}/${this.currentYear}`);
        this.players = response.data.players || [];
      } catch (error) {
        console.error('Error loading stats:', error);
        this.error = 'Error al cargar las estadísticas. Por favor intenta nuevamente.';
      } finally {
        this.loading = false;
      }
    },
    
    async showPlayerHistory(player) {
      this.selectedPlayer = player;
      this.showModal = true;
      this.loadingHistory = true;
      
      try {
        const response = await api.get(`/api/stats/player/${player.user_id}/history`);
        const payload = response.data || {};
        let list = mergeHistoryResponsePayload(payload);
        list = coerceHistoryEntries(list);
        this.playerHistory = list.map(normalizeHistoryGame);
      } catch (error) {
        console.error('Error loading player history:', error);
        this.playerHistory = [];
      } finally {
        this.loadingHistory = false;
      }
    },
    
    closeModal() {
      this.showModal = false;
      this.selectedPlayer = null;
      this.playerHistory = [];
    },
    
    displayProfit(amount) {
      const n = Number(amount);
      if (!Number.isFinite(n) || n < 0) return 0;
      return n;
    },

    formatCurrency(amount) {
      const formatted = new Intl.NumberFormat('es-BO', {
        style: 'currency',
        currency: 'BOB',
        minimumFractionDigits: 2
      }).format(amount || 0);
      // Mostrar Bs (Intl BOB a veces deja el código BOB)
      return formatted.replace(/BOB/g, 'Bs');
    },
    
    formatDate(date) {
      return new Date(date).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    
    getPlayerInitials(name) {
      if (!name) return '??';
      return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    },
    
    getRankClass(rank) {
      if (rank === 1) return 'rank-1';
      if (rank === 2) return 'rank-2';
      if (rank === 3) return 'rank-3';
      return '';
    },
    
    getRankBadgeClass(rank) {
      if (rank === 1) return 'gold';
      if (rank === 2) return 'silver';
      if (rank === 3) return 'bronze';
      return '';
    },
    
    getTrophyIcon(rank) {
      if (rank === 1) return '🥇';
      if (rank === 2) return '🥈';
      if (rank === 3) return '🥉';
      return '';
    },
    
    getWinrateColor(winrate) {
      if (winrate >= 70) return '#10b981';
      if (winrate >= 50) return '#f59e0b';
      return '#ef4444';
    }
  }
};
</script>

<style scoped>
.pote-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%);
  padding: 100px 20px 40px 20px;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

/* Header */
.pote-header {
  margin-bottom: 40px;
}

.title-section {
  text-align: center;
  margin-bottom: 30px;
}

.title {
  font-size: 3rem;
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
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

/* Stats Cards */
.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 20px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  border-color: #fbbf24;
  box-shadow: 0 10px 30px rgba(251, 191, 36, 0.3);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 15px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: white;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  line-height: 1;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
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

/* Ranking Section */
.ranking-section {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  padding: 30px;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  flex-wrap: wrap;
  gap: 20px;
}

.table-header h2 {
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
}

.month-select {
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.month-select:hover {
  border-color: #fbbf24;
}

/* Table */
.ranking-table {
  overflow-x: auto;
}

.ranking-cards {
  display: none;
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
}

thead tr {
  background: rgba(255, 255, 255, 0.05);
}

th {
  padding: 15px;
  text-align: left;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

tbody tr {
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
}

tbody tr:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(1.02);
}

tbody tr.rank-1 {
  background: linear-gradient(90deg, rgba(251, 191, 36, 0.2), rgba(255, 255, 255, 0.05));
}

tbody tr.rank-2 {
  background: linear-gradient(90deg, rgba(192, 192, 192, 0.2), rgba(255, 255, 255, 0.05));
}

tbody tr.rank-3 {
  background: linear-gradient(90deg, rgba(205, 127, 50, 0.2), rgba(255, 255, 255, 0.05));
}

td {
  padding: 20px 15px;
  color: white;
  font-size: 1rem;
}

/* Rank Badge */
.rank-badge {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.rank-badge.gold {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  border-color: #fbbf24;
}

.rank-badge.silver {
  background: linear-gradient(135deg, #d1d5db, #9ca3af);
  border-color: #d1d5db;
}

.rank-badge.bronze {
  background: linear-gradient(135deg, #cd7f32, #b87333);
  border-color: #cd7f32;
}

/* Player Info */
.player-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.player-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  color: white;
  border: 3px solid rgba(255, 255, 255, 0.2);
}

.player-name {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 3px;
}

.player-stats-mini {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

/* Winrate Bar */
.winrate-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.winrate-bar {
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.winrate-fill {
  height: 100%;
  transition: width 0.3s ease;
  border-radius: 10px;
}

.winrate-text {
  font-weight: 600;
  min-width: 50px;
}

/* Earnings */
.earnings-amount {
  font-weight: 700;
  font-size: 1.1rem;
}

.earnings-amount.positive {
  color: #10b981;
}

.profit-value {
  color: #10b981;
}

/* Action Button */
.btn-view {
  padding: 8px 20px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-view:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(251, 191, 36, 0.4);
}

/* No Data */
.no-data {
  text-align: center;
  padding: 60px 20px;
  color: rgba(255, 255, 255, 0.6);
}

.no-data i {
  font-size: 3rem;
  margin-bottom: 15px;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #0b0818;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.modal-content {
  background: #1a1540;
  border-radius: 25px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  border: 2px solid rgba(255, 255, 255, 0.2);
  isolation: isolate;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 30px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

.modal-header h2 {
  color: white;
  margin: 0;
  font-size: 1.8rem;
}

.btn-close {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-close:hover {
  background: #ef4444;
  transform: rotate(90deg);
}

.modal-body {
  padding: 30px;
}

/* Player Summary */
.player-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
}

.summary-card {
  background: #2a2258;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.summary-card i {
  font-size: 2rem;
  color: #fbbf24;
}

.summary-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
}

.summary-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

/* Games History */
.games-history h3 {
  color: white;
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.games-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 500px;
  overflow-y: auto;
  padding-right: 10px;
  background: #1a1540;
}

.game-item {
  background: #2b1633;
  background-image: none;
  border-radius: 14px;
  padding: 14px 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: none;
  isolation: isolate;
  overflow: hidden;
}

.game-item:hover {
  background: #351c3e;
  border-color: rgba(255, 255, 255, 0.22);
  transform: none;
  box-shadow: none;
}

.game-item.winner {
  border-left: 4px solid #51cf66;
  background: #17301c;
}

.game-item.loser {
  border-left: 4px solid #ff6b6b;
  background: #30151a;
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.game-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 800;
  color: #ffffff;
  font-size: 1.05rem;
  text-decoration: none;
  text-shadow: none;
  position: relative;
  z-index: 1;
}

.game-status i {
  font-size: 1.4rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
}

.game-item.winner .game-status i {
  color: #51cf66;
}

.game-item.loser .game-status i {
  color: #ff6b6b;
}

.game-date {
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  text-shadow: none;
}

.game-details {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.game-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  position: relative;
  z-index: 5;
}

.info-item i {
  color: #ffd93d;
  width: 16px;
  filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.5));
}

.game-score {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 10px 14px;
  background: #120c18;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: none;
}

.score-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.score-label {
  font-size: 0.9rem;
  color: #ffffff;
  margin-bottom: 5px;
  font-weight: 700;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.score-value {
  font-size: 2.2rem;
  font-weight: 900;
  color: #ffffff;
  text-shadow: 0 3px 10px rgba(0, 0, 0, 0.7), 0 0 20px rgba(255, 255, 255, 0.3);
  position: relative;
  z-index: 10;
}

.score-separator {
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 700;
}

.game-earnings {
  display: flex;
  justify-content: space-between;
  padding: 10px 14px;
  background: #120c18;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.earning-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.earning-item span:first-child {
  font-size: 0.9rem;
  color: #ffffff;
  font-weight: 700;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.bet {
  color: #ff8787;
  font-weight: 800;
  font-size: 1.1rem;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
}

.win {
  color: #69db7c;
  font-weight: 800;
  font-size: 1.2rem;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6), 0 0 15px rgba(105, 219, 124, 0.3);
}

.loss {
  color: rgba(255, 255, 255, 0.7);
  font-weight: 700;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

/* Badges */
.game-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 800;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  position: relative;
  z-index: 5;
}

.badge-surrender {
  background: rgba(255, 107, 107, 0.3);
  color: #ffffff;
  border: 2px solid #ff8787;
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
}

.badge-disconnect {
  background: rgba(255, 217, 61, 0.3);
  color: #ffffff;
  border: 2px solid #ffd93d;
  box-shadow: 0 2px 8px rgba(255, 217, 61, 0.3);
}

.badge-cpu {
  background: rgba(129, 140, 248, 0.3);
  color: #ffffff;
  border: 2px solid #a5b4fc;
  box-shadow: 0 2px 8px rgba(129, 140, 248, 0.3);
}

.badge-private {
  background: rgba(167, 139, 250, 0.3);
  color: #ffffff;
  border: 2px solid #c4b5fd;
  box-shadow: 0 2px 8px rgba(167, 139, 250, 0.3);
}

.loading-history {
  text-align: center;
  padding: 40px 20px;
  color: rgba(255, 255, 255, 0.7);
}

.no-history {
  text-align: center;
  padding: 40px 20px;
  color: rgba(255, 255, 255, 0.6);
}

.no-history i {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

/* Responsive */
@media (max-width: 768px) {
  .pote-view {
    padding: 72px 8px 20px;
  }

  .pote-header {
    margin-bottom: 12px;
  }

  .title-section {
    margin-bottom: 12px;
  }

  .title {
    font-size: 1.45rem;
    margin-bottom: 4px;
  }

  .title i {
    margin-right: 8px;
  }

  .subtitle {
    font-size: 0.85rem;
  }

  .stats-cards {
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
    margin-bottom: 0;
  }

  .stat-card,
  .stat-card-full {
    grid-column: auto;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 8px 4px;
    gap: 4px;
    border-radius: 12px;
  }

  .stat-icon {
    width: 28px;
    height: 28px;
    font-size: 0.85rem;
    border-radius: 8px;
  }

  .stat-value {
    font-size: 0.95rem;
    margin-bottom: 0;
  }

  .stat-label {
    font-size: 0.65rem;
    line-height: 1.2;
  }

  .ranking-section {
    padding: 12px;
    border-radius: 16px;
  }

  .table-header {
    flex-direction: row;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  }

  .table-header h2 {
    font-size: 1rem;
    flex: 1;
    min-width: 0;
  }

  .month-select {
    padding: 6px 10px;
    font-size: 0.8rem;
    border-radius: 8px;
  }

  .ranking-table {
    display: none;
  }

  .ranking-cards {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .player-card {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 10px 10px 10px 8px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 12px;
    color: white;
    text-align: left;
    cursor: pointer;
    font-family: inherit;
    appearance: none;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
  }

  .player-card.rank-1 {
    background: linear-gradient(90deg, rgba(251, 191, 36, 0.22), rgba(255, 255, 255, 0.05));
    border-color: rgba(251, 191, 36, 0.35);
  }

  .player-card.rank-2 {
    background: linear-gradient(90deg, rgba(192, 192, 192, 0.18), rgba(255, 255, 255, 0.05));
  }

  .player-card.rank-3 {
    background: linear-gradient(90deg, rgba(205, 127, 50, 0.18), rgba(255, 255, 255, 0.05));
  }

  .card-rank {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.85rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .card-rank.gold {
    background: linear-gradient(135deg, #fbbf24, #f59e0b);
    border-color: #fbbf24;
  }

  .card-rank.silver {
    background: linear-gradient(135deg, #d1d5db, #9ca3af);
    border-color: #d1d5db;
  }

  .card-rank.bronze {
    background: linear-gradient(135deg, #cd7f32, #b87333);
    border-color: #cd7f32;
  }

  .card-main {
    flex: 1;
    min-width: 0;
  }

  .card-top {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 2px;
  }

  .card-name {
    font-weight: 700;
    font-size: 0.95rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .card-profit {
    flex-shrink: 0;
    font-weight: 800;
    font-size: 0.9rem;
    color: #10b981;
  }

  .card-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    font-size: 0.72rem;
    color: rgba(255, 255, 255, 0.65);
  }

  .card-winrate {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
  }

  .winrate-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    display: inline-block;
  }

  .btn-view-compact {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    font-size: 0.85rem;
  }

  .no-data {
    padding: 32px 12px;
  }

  .modal-overlay {
    padding: 0;
    align-items: stretch;
    background: #0b0818;
  }

  .modal-content {
    max-height: 100dvh;
    height: 100dvh;
    width: 100%;
    border-radius: 0;
    border: none;
  }

  .modal-header {
    padding: 12px 14px;
  }

  .modal-header h2 {
    font-size: 1.05rem;
    line-height: 1.3;
  }

  .btn-close {
    width: 34px;
    height: 34px;
    font-size: 1rem;
  }

  .modal-body {
    padding: 12px 12px 24px;
  }

  .player-summary {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    margin-bottom: 14px;
  }

  .summary-card {
    padding: 10px 12px;
    gap: 8px;
    border-radius: 12px;
  }

  .summary-card i {
    font-size: 1.15rem;
  }

  .summary-value {
    font-size: 1.05rem;
    line-height: 1.2;
  }

  .summary-label {
    font-size: 0.7rem;
  }

  .games-history h3 {
    font-size: 1.05rem;
    margin-bottom: 10px;
  }

  .games-list {
    gap: 8px;
    max-height: none;
    padding-right: 0;
  }

  .game-item {
    padding: 10px 12px;
    border-radius: 12px;
    background-image: none;
  }

  .game-item.winner {
    background: #17301c;
  }

  .game-item.loser {
    background: #30151a;
  }

  .game-item:hover {
    transform: none;
  }

  .game-header {
    margin-bottom: 6px;
  }

  .game-status {
    font-size: 0.95rem;
  }

  .game-status i {
    font-size: 1rem;
  }

  .game-date {
    font-size: 0.75rem;
  }

  .game-details {
    gap: 6px;
  }

  .info-item {
    font-size: 0.8rem;
  }

  .game-score {
    flex-direction: row;
    gap: 12px;
    padding: 8px 10px;
    background: #120c18;
  }

  .score-label {
    font-size: 0.65rem;
    margin-bottom: 0;
  }

  .score-value {
    font-size: 1.25rem;
  }

  .score-separator {
    font-size: 1.1rem;
  }

  .game-earnings {
    padding: 8px 10px;
    background: #120c18;
  }

  .earning-item span:first-child {
    font-size: 0.7rem;
  }

  .bet,
  .win,
  .loss {
    font-size: 0.9rem;
  }

  .game-badges {
    margin-top: 4px;
    gap: 6px;
  }

  .badge {
    padding: 4px 10px;
    font-size: 0.7rem;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 1.3rem;
  }

  .stat-value {
    font-size: 0.85rem;
  }

  .card-name {
    font-size: 0.9rem;
  }

  .summary-value {
    font-size: 0.95rem;
  }
}
</style>

