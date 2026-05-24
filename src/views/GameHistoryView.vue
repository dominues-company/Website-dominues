<template>
  <div class="history-container">
    <div class="history-card">
      <div class="history-header">
        <h2>MIS PARTIDAS</h2>
        <p class="subtitle">Historial completo de todas tus partidas</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card green">
          <span class="stat-icon">🏆</span>
          <div class="stat-value">{{ totalWins }}</div>
          <div class="stat-label">Victorias</div>
        </div>
        <div class="stat-card">
          <span class="stat-icon">🎮</span>
          <div class="stat-value">{{ totalGames }}</div>
          <div class="stat-label">Total Partidas</div>
        </div>
        <div class="stat-card">
          <span class="stat-icon">📊</span>
          <div class="stat-value">{{ winRate }}%</div>
          <div class="stat-label">Win Rate</div>
        </div>
        <div class="stat-card gold">
          <span class="stat-icon">💰</span>
          <div class="stat-value gold-value">{{ formatCurrencyPlain(totalEarnings) }}</div>
          <div class="stat-label">Total Ganado</div>
        </div>
      </div>

      <div class="filters">
        <div class="filter-group">
          <span class="filter-label">Modo</span>
          <select v-model="filters.gameMode" @change="applyFilters">
            <option value="">Todos</option>
            <option value="cpu">vs CPU</option>
            <option value="online">Online</option>
            <option value="invite">Invitación</option>
          </select>
          <span class="chevron">▼</span>
        </div>
        <div class="filter-group">
          <span class="filter-label">Resultado</span>
          <select v-model="filters.result" @change="applyFilters">
            <option value="">Todos</option>
            <option value="win">Victoria</option>
            <option value="loss">Otras partidas</option>
          </select>
          <span class="chevron">▼</span>
        </div>
        <div class="filter-group">
          <span class="filter-label">Período</span>
          <select v-model="filters.period" @change="applyFilters">
            <option value="">Todo</option>
            <option value="today">Hoy</option>
            <option value="week">Última semana</option>
            <option value="month">Último mes</option>
          </select>
          <span class="chevron">▼</span>
        </div>
        <button type="button" class="btn-refresh" @click="loadHistory" :disabled="loading">
          <i class="fas fa-sync-alt" :class="{ 'fa-spin': loading }"></i>
          Actualizar
        </button>
      </div>

      <div v-if="loading" class="state-panel">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
        <p>Cargando historial…</p>
      </div>
      <div v-else-if="error" class="state-panel state-error">
        <p>{{ error }}</p>
        <button type="button" class="btn-retry" @click="loadHistory">Reintentar</button>
      </div>

      <template v-else-if="filteredGames.length > 0">
        <div class="section-divider">
          <span>Partidas recientes — Página {{ currentPage }} de {{ totalPages }}</span>
        </div>
        <div class="matches-list">
          <div
            v-for="game in paginatedGames"
            :key="game.result_id || game.id"
            class="match-card"
            :class="matchCardClass(game)"
          >
            <div class="match-header">
              <div class="result-badge" :class="resultBadgeClass(game)">
                <span class="dot" />
                {{ isWinner(game) ? 'Victoria' : 'Partida jugada' }}
              </div>
              <div class="match-date">{{ formatDateHistory(game.game_date) }}</div>
            </div>
            <div class="match-meta">
              <span class="table-icon">{{ matchTableIcon(game) }}</span>
              <span>{{ game.table_name }} — {{ game.mode_name }}</span>
            </div>
            <div v-if="game.opponent_name" class="match-opponent-line">
              vs {{ game.opponent_name }}
            </div>
            <div class="match-body">
              <div class="score-section">
                <div class="score-label">Tu score</div>
                <div class="score-value">{{ displayScore(game, 'player') }}</div>
              </div>
              <div class="score-section oponent">
                <div class="score-label">Oponente</div>
                <div class="score-value">{{ displayScore(game, 'opponent') }}</div>
              </div>
            </div>
            <div class="match-footer">
              <div class="footer-cell">
                <div class="footer-label">Apuesta</div>
                <div class="footer-value neg">−{{ formatCurrencyPlain(game.bet_amount) }}</div>
              </div>
              <div class="footer-cell">
                <div class="footer-label">Premio</div>
                <div class="footer-value" :class="isWinner(game) ? 'pos' : 'neutral'">
                  <template v-if="isWinner(game)">+{{ formatCurrencyPlain(game.winner_amount) }}</template>
                  <template v-else>{{ formatCurrencyPlain(0) }}</template>
                </div>
              </div>
            </div>
            <div v-if="hasBadges(game)" class="match-badges">
              <span v-if="game.surrendered === 'true'" class="badge surrender">Rendición</span>
              <span v-if="game.disconnect_reason" class="badge disconnect">Desconexión</span>
              <span v-if="game.game_mode === 'cpu'" class="badge cpu">vs CPU</span>
              <span v-if="game.room_code" class="badge room">Sala {{ game.room_code }}</span>
            </div>
          </div>
        </div>
        <div v-if="totalPages > 1" class="pagination">
          <button
            type="button"
            class="page-arrow"
            :disabled="currentPage === 1"
            aria-label="Página anterior"
            @click="changePage(currentPage - 1)"
          >
            ‹
          </button>
          <template v-for="(item, idx) in pageNumbers" :key="'p-' + idx">
            <button
              v-if="item !== '…'"
              type="button"
              class="page-btn"
              :class="{ active: item === currentPage }"
              @click="changePage(item)"
            >
              {{ item }}
            </button>
            <span v-else class="page-ellipsis">…</span>
          </template>
          <button
            type="button"
            class="page-arrow"
            :disabled="currentPage === totalPages"
            aria-label="Página siguiente"
            @click="changePage(currentPage + 1)"
          >
            ›
          </button>
        </div>
      </template>

      <div v-else class="empty-state">
        <i class="fas fa-history empty-icon" aria-hidden="true" />
        <h3>No hay partidas registradas</h3>
        <p>Aún no has jugado ninguna partida. ¡Empieza ahora!</p>
        <router-link to="/dashboard" class="btn-play">Jugar ahora</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import api from '@/services/api';
import {
  normalizeHistoryGame,
  mergeHistoryResponsePayload,
  coerceHistoryEntries
} from '@/utils/gameHistoryNormalize';

export default {
  name: 'GameHistoryView',
  data() {
    return {
      games: [],
      filteredGames: [],
      loading: true,
      error: null,
      filters: { gameMode: '', result: '', period: '' },
      currentPage: 1,
      itemsPerPage: 10
    };
  },
  computed: {
    ...mapGetters('auth', ['currentUser']),
    displayUserName() {
      const u = this.currentUser;
      return u?.name || u?.username || u?.email || 'Jugador';
    },
    totalGames() {
      return this.games.length;
    },
    totalWins() {
      return this.games.filter(g => this.isWinner(g)).length;
    },
    winRate() {
      if (!this.totalGames) return 0;
      return ((this.totalWins / this.totalGames) * 100).toFixed(1);
    },
    totalEarnings() {
      return this.games.reduce(
        (s, g) => s + (this.isWinner(g) ? parseFloat(g.winner_amount) || 0 : 0),
        0
      );
    },
    totalPages() {
      return Math.ceil(this.filteredGames.length / this.itemsPerPage) || 1;
    },
    paginatedGames() {
      const s = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredGames.slice(s, s + this.itemsPerPage);
    },
    pageNumbers() {
      const t = this.totalPages;
      const c = this.currentPage;
      if (t <= 7) return Array.from({ length: t }, (_, i) => i + 1);
      const set = new Set([1, 2, 3, t, c, c - 1, c + 1].filter(n => n >= 1 && n <= t));
      const sorted = [...set].sort((a, b) => a - b);
      const out = [];
      let prev = 0;
      for (const n of sorted) {
        if (prev && n - prev > 1) out.push('…');
        out.push(n);
        prev = n;
      }
      return out;
    }
  },
  mounted() {
    this.loadHistory();
  },
  methods: {
    isWinner(game) {
      const v = game.is_winner;
      if (v == null) return false;
      if (typeof v === 'boolean') return v;
      if (typeof v === 'number') return v === 1;
      if (typeof v === 'string') {
        return ['true', '1', 'win', 'victoria'].includes(v.trim().toLowerCase());
      }
      return false;
    },
    displayScore(game, side) {
      const raw =
        side === 'player' ? game.player_score : game.opponent_score;
      if (raw == null || raw === '' || raw === 'null') return '—';
      const n = typeof raw === 'number' ? raw : Number(String(raw).trim());
      return Number.isFinite(n) ? n : '—';
    },
    hasBadges(g) {
      return (
        g.surrendered === 'true' ||
        !!g.disconnect_reason ||
        g.game_mode === 'cpu' ||
        !!g.room_code
      );
    },
    matchCardClass(g) {
      return this.isWinner(g) ? 'victoria' : 'jugada';
    },
    resultBadgeClass(g) {
      return this.isWinner(g) ? 'victoria' : 'jugada';
    },
    matchTableIcon(g) {
      if (g.game_mode === 'cpu') return '🏠';
      if (g.game_mode === 'online' || g.game_mode === 'invite') return '👥';
      return '🏠';
    },
    formatWallet(b) {
      const n = parseFloat(b);
      return this.formatCurrencyPlain(Number.isFinite(n) ? n : 0);
    },
    formatCurrencyPlain(amount) {
      return new Intl.NumberFormat('es-BO', {
        style: 'currency',
        currency: 'BOB',
        minimumFractionDigits: 2
      })
        .format(amount || 0)
        .replace('BOB', 'Bs');
    },
    async loadHistory() {
      try {
        this.loading = true;
        this.error = null;
        const user = this.currentUser;
        if (!user) throw new Error('Usuario no autenticado');
        const response = await api.get(`/api/stats/player/${user.id}/history?limit=100`);
        const data = response.data || {};

        let historyList = mergeHistoryResponsePayload(data);
        historyList = coerceHistoryEntries(historyList);
        this.games = historyList.map(g => normalizeHistoryGame(g));
        this.applyFilters();
      } catch (err) {
        console.error('Error loading history:', err);
        this.error = 'Error al cargar el historial. Por favor intenta nuevamente.';
      } finally {
        this.loading = false;
      }
    },
    applyFilters() {
      let f = [...this.games];
      if (this.filters.gameMode) f = f.filter(g => g.game_mode === this.filters.gameMode);
      if (this.filters.result === 'win') f = f.filter(g => this.isWinner(g));
      else if (this.filters.result === 'loss') f = f.filter(g => !this.isWinner(g));
      if (this.filters.period) {
        const now = new Date();
        f = f.filter(g => {
          const d = new Date(g.game_date);
          if (this.filters.period === 'today') return d.toDateString() === now.toDateString();
          if (this.filters.period === 'week') {
            return d >= new Date(now.getTime() - 7 * 86400000);
          }
          if (this.filters.period === 'month') {
            return d >= new Date(now.getTime() - 30 * 86400000);
          }
          return true;
        });
      }
      this.filteredGames = f;
      this.currentPage = 1;
    },
    changePage(p) {
      if (p >= 1 && p <= this.totalPages) this.currentPage = p;
    },
    formatDateHistory(date) {
      const d = new Date(date);
      return (
        d.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }) +
        ' · ' +
        d.toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        })
      );
    }
  }
};
</script>

<style scoped>
.history-container {
  margin-top: 120px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.history-card {
  max-width: 1100px;
  margin: 0 auto;
  background: #f8f9fa;
  border-radius: 15px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  padding: 40px;
}

.history-header {
  text-align: center;
  margin-bottom: 30px;
}

.history-header h2 {
  color: #e67e22;
  font-weight: 700;
  font-size: 2.5rem;
  margin: 0 0 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.subtitle {
  color: #6c757d;
  font-size: 1.1rem;
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  border: none;
}

.stat-card::before {
  display: none;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-card .stat-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
  display: block;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  line-height: 1.2;
  margin-bottom: 0.35rem;
  font-family: inherit;
}

.stat-card.gold .stat-value,
.stat-value.gold-value {
  color: #e67e22;
  font-size: 1.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

.filters {
  background: white;
  border-radius: 10px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  gap: 20px;
  align-items: end;
}

.filter-label {
  display: block;
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: transparent;
  border: none;
  padding: 0;
  min-width: 0;
}

.filter-group select {
  padding: 10px 15px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  color: #333;
  width: 100%;
}

.filter-group select:focus {
  outline: none;
  border-color: #e67e22;
  box-shadow: 0 0 0 0.2rem rgba(230, 126, 34, 0.25);
}

.filter-group select option {
  background: white;
  color: #333;
}

.chevron {
  display: none;
}

.btn-refresh {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}

.btn-refresh:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.btn-refresh:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.state-panel {
  text-align: center;
  padding: 48px 20px;
  color: #6c757d;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.state-error {
  color: #dc3545;
}

.btn-retry {
  padding: 10px 24px;
  border-radius: 8px;
  border: none;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.section-divider span {
  font-size: 0.85rem;
  color: #6c757d;
  font-weight: 600;
}

.section-divider::before,
.section-divider::after {
  background: #e9ecef;
}

.matches-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.match-card {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.match-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.match-card.victoria {
  border-left: 4px solid #28a745;
}

.match-card.jugada {
  border-left: 4px solid #667eea;
}

.match-header {
  background: #f8f9fa;
}

.result-badge.victoria {
  color: #28a745;
}

.result-badge.victoria .dot {
  background: #28a745;
  box-shadow: none;
}

.result-badge.jugada {
  color: #667eea;
}

.result-badge.jugada .dot {
  background: #667eea;
}

.match-date,
.match-opponent-line {
  color: #6c757d;
  font-family: inherit;
}

.match-meta {
  color: #495057;
  font-weight: 500;
}

.match-body {
  border-top: 1px solid #e9ecef;
}

.score-section:first-child::after {
  color: #adb5bd;
  background: white;
  border: 1px solid #e9ecef;
}

.score-section .score-label {
  color: #6c757d;
}

.score-value {
  color: #333;
  font-family: inherit;
}

.match-footer {
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
}

.footer-cell:first-child {
  border-right: 1px solid #e9ecef;
}

.footer-label {
  color: #6c757d;
}

.footer-value {
  font-family: inherit;
}

.footer-value.neg {
  color: #dc3545;
}

.footer-value.pos {
  color: #28a745;
}

.footer-value.neutral {
  color: #6c757d;
}

.match-badges {
  border-top: 1px solid #e9ecef;
}

.badge.surrender {
  background: #fdecea;
  color: #dc3545;
  border: 1px solid #f5c6cb;
}

.badge.disconnect {
  background: #fff3cd;
  color: #856404;
  border: 1px solid #ffeeba;
}

.badge.cpu {
  background: #e8eaf6;
  color: #3f51b5;
  border: 1px solid #c5cae9;
}

.badge.room {
  background: #f3e5f5;
  color: #7b1fa2;
  border: 1px solid #e1bee7;
}

.page-btn,
.page-arrow {
  border: 2px solid #e9ecef;
  background: white;
  color: #495057;
  border-radius: 8px;
}

.page-btn:hover,
.page-arrow:hover:not(:disabled) {
  border-color: #667eea;
  color: #667eea;
}

.page-btn.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-color: transparent;
  color: white;
}

.page-ellipsis {
  color: #6c757d;
}

.empty-state {
  background: white;
  border-radius: 10px;
  padding: 56px 20px;
  color: #6c757d;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.empty-state h3 {
  color: #333;
}

.empty-icon {
  color: #667eea;
  opacity: 0.5;
}

.btn-play {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 8px;
  text-decoration: none;
}

.btn-play:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  color: white;
}

@media (max-width: 991px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .filters {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .history-container {
    margin-top: 100px;
    padding: 15px;
  }

  .history-card {
    padding: 24px 18px;
  }

  .history-header h2 {
    font-size: 1.8rem;
  }

  .filters {
    grid-template-columns: 1fr;
  }

  .match-body {
    grid-template-columns: 1fr;
  }

  .score-section.oponent {
    padding-left: 22px;
    border-top: 1px solid #e9ecef;
  }

  .score-section:first-child::after {
    display: none;
  }

  .match-footer {
    grid-template-columns: 1fr;
  }

  .footer-cell:first-child {
    border-right: none;
    border-bottom: 1px solid #e9ecef;
  }
}

@media (max-width: 575px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>

