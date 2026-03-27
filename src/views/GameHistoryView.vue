<template>
  <div class="game-history-view">
    <div class="gh-bg" aria-hidden="true" />
    <div class="wrapper">
      <header class="gh-header">
        <router-link to="/" class="logo">
          Dominues
          <span>Juega · Gana · Domina</span>
        </router-link>
        <div class="header-right" v-if="currentUser">
          <div class="wallet">{{ formatWallet(currentUser.balance) }}</div>
          <div class="username">{{ displayUserName }}</div>
        </div>
      </header>

      <div class="page-header">
        <h1>Mi <span>Bitácora</span> de Juegos</h1>
        <p>Historial completo de todas tus partidas</p>
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
          <span class="spin" :class="{ spinning: loading }">↻</span>
          Actualizar
        </button>
      </div>

      <div v-if="loading" class="state-panel">
        <div class="spinner" />
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
        <i class="fas fa-ghost empty-icon" aria-hidden="true" />
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
import { normalizeHistoryGame } from '@/utils/gameHistoryNormalize';

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
        side === 'player'
          ? game.player_score ??
            game.playerScore ??
            game.finalScore ??
            game.final_score
          : game.opponent_score ??
            game.opponentScore ??
            game.opponentFinalScore ??
            game.opponent_final_score;
      if (raw == null || raw === '') return '—';
      const n = Number(String(raw).trim());
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
        if (process.env.NODE_ENV !== 'production' && response.data.history?.length) {
          console.log('[GameHistory raw item 0]', JSON.stringify(response.data.history[0]));
          console.log('[GameHistory normalized]', normalizeHistoryGame(response.data.history[0], true));
        }
        this.games = (response.data.history || []).map(g => normalizeHistoryGame(g));
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
.game-history-view {
  --bg-deep: #0d0a14;
  --bg-mid: #13101f;
  --bg-card: #1a1528;
  --bg-card-hover: #201b34;
  --border: rgba(255, 255, 255, 0.06);
  --border-glow: rgba(183, 146, 92, 0.3);
  --gold: #c9a84c;
  --gold-light: #e8c97a;
  --gold-dim: rgba(201, 168, 76, 0.15);
  --green: #3ecf82;
  --green-dim: rgba(62, 207, 130, 0.12);
  --red: #f06060;
  --red-dim: rgba(240, 96, 96, 0.12);
  --text-primary: #f0ecff;
  --text-muted: rgba(240, 236, 255, 0.4);
  --text-label: rgba(240, 236, 255, 0.6);
  --accent: #7c5cbf;
  --accent-glow: rgba(124, 92, 191, 0.25);

  position: relative;
  min-height: 100vh;
  font-family: 'DM Sans', system-ui, sans-serif;
  background-color: var(--bg-deep);
  color: var(--text-primary);
  padding: 96px 0 48px;
  overflow-x: hidden;
}

.gh-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background:
    radial-gradient(ellipse 80% 60% at 20% -10%, rgba(124, 92, 191, 0.18) 0%, transparent 60%),
    radial-gradient(ellipse 60% 50% at 80% 110%, rgba(201, 168, 76, 0.1) 0%, transparent 55%);
}

.gh-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.5;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
}

.wrapper {
  position: relative;
  z-index: 1;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px 40px;
}

.gh-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0 20px;
  border-bottom: 1px solid var(--border);
}

.logo {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--gold-light);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-decoration: none;
}

.logo span {
  color: var(--text-muted);
  font-weight: 400;
  font-size: 0.7rem;
  display: block;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-top: 2px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.wallet {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--gold-dim);
  border: 1px solid var(--border-glow);
  border-radius: 10px;
  padding: 8px 16px;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.85rem;
  color: var(--gold-light);
  font-weight: 500;
}

.wallet::before {
  content: '◆';
  font-size: 0.7rem;
}

.username {
  font-size: 0.85rem;
  color: var(--text-label);
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.page-header {
  text-align: center;
  padding: 40px 0 32px;
}

.page-header h1 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.01em;
  margin: 0 0 10px;
}

.page-header h1 span {
  color: var(--gold);
}

.page-header p {
  font-size: 0.9rem;
  color: var(--text-muted);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-weight: 300;
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 36px;
}

@media (max-width: 640px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 20px 18px;
  position: relative;
  overflow: hidden;
  transition: border-color 0.25s, transform 0.2s;
}

.stat-card:hover {
  border-color: rgba(255, 255, 255, 0.12);
  transform: translateY(-2px);
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity: 0.6;
}

.stat-card.gold::before {
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
}

.stat-card.green::before {
  background: linear-gradient(90deg, transparent, var(--green), transparent);
}

.stat-icon {
  font-size: 1.3rem;
  margin-bottom: 12px;
  display: block;
}

.stat-value {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
  margin-bottom: 4px;
}

.stat-card.gold .stat-value,
.stat-value.gold-value {
  color: var(--gold-light);
  font-size: 1.5rem;
}

.stat-label {
  font-size: 0.72rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 500;
}

.filters {
  display: flex;
  gap: 12px;
  margin-bottom: 28px;
  flex-wrap: wrap;
  align-items: center;
}

.filter-label {
  font-size: 0.72rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 500;
  margin-right: 4px;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 10px 14px;
  flex: 1;
  min-width: 160px;
}

.filter-group select {
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 0.85rem;
  outline: none;
  cursor: pointer;
  flex: 1;
  appearance: none;
  -webkit-appearance: none;
}

.filter-group select option {
  background: var(--bg-mid);
  color: var(--text-primary);
}

.chevron {
  color: var(--text-muted);
  font-size: 0.6rem;
  pointer-events: none;
}

.btn-refresh {
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, var(--gold) 0%, #a87b30 100%);
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  color: #0d0a14;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  transition: opacity 0.2s, transform 0.15s;
}

.btn-refresh:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

.btn-refresh:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.spin {
  display: inline-block;
  transition: transform 0.4s;
}

.spin.spinning {
  animation: spin-gh 0.8s linear infinite;
}

@keyframes spin-gh {
  to {
    transform: rotate(360deg);
  }
}

.state-panel {
  text-align: center;
  padding: 48px 20px;
  color: var(--text-muted);
}

.state-error {
  color: var(--red);
}

.state-panel p {
  margin: 0 0 16px;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 3px solid var(--border);
  border-top-color: var(--gold);
  border-radius: 50%;
  animation: spin-gh 0.9s linear infinite;
  margin: 0 auto 16px;
}

.btn-retry {
  padding: 10px 24px;
  border-radius: 10px;
  border: 1px solid var(--border-glow);
  background: var(--gold-dim);
  color: var(--gold-light);
  font-weight: 600;
  cursor: pointer;
}

.section-divider {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
}

.section-divider span {
  font-size: 0.68rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  white-space: nowrap;
  font-weight: 500;
}

.section-divider::before,
.section-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
}

.matches-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.match-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  transition: border-color 0.25s, transform 0.2s, box-shadow 0.25s;
  animation: slideUp 0.4s ease both;
}

.match-card:hover {
  border-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.match-card.victoria {
  border-left: 3px solid var(--green);
}

.match-card.jugada {
  border-left: 3px solid var(--accent);
}

.match-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 22px 12px;
}

.result-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.result-badge .dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}

.result-badge.victoria {
  color: var(--green);
}

.result-badge.victoria .dot {
  background: var(--green);
  box-shadow: 0 0 6px var(--green);
}

.result-badge.jugada {
  color: var(--accent);
}

.result-badge.jugada .dot {
  background: var(--accent);
}

.match-date {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.72rem;
  color: var(--text-muted);
  letter-spacing: 0.04em;
}

.match-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 22px 8px;
  font-size: 0.8rem;
  color: var(--text-label);
}

.match-opponent-line {
  padding: 0 22px 14px;
  font-size: 0.78rem;
  color: var(--text-muted);
  letter-spacing: 0.03em;
}

.match-body {
  border-top: 1px solid var(--border);
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
}

.score-section {
  padding: 18px 22px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
}

.score-section:first-child::after {
  content: 'VS';
  position: absolute;
  top: 50%;
  right: -14px;
  transform: translateY(-50%);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: var(--text-muted);
  background: var(--bg-card);
  padding: 4px 6px;
  border-radius: 4px;
  border: 1px solid var(--border);
  z-index: 1;
}

.score-section.oponent {
  padding-left: 38px;
}

.score-section .score-label {
  font-size: 0.68rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 500;
}

.score-value {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
}

.match-footer {
  border-top: 1px solid var(--border);
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: rgba(0, 0, 0, 0.15);
}

.footer-cell {
  padding: 14px 22px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.footer-cell:first-child {
  border-right: 1px solid var(--border);
}

.footer-label {
  font-size: 0.68rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 500;
}

.footer-value {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 1rem;
  font-weight: 500;
}

.footer-value.neg {
  color: var(--red);
}

.footer-value.pos {
  color: var(--green);
}

.footer-value.neutral {
  color: var(--text-muted);
}

.match-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px 22px 16px;
  border-top: 1px solid var(--border);
}

.badge {
  font-size: 0.72rem;
  padding: 4px 10px;
  border-radius: 999px;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.badge.surrender {
  background: var(--red-dim);
  color: var(--red);
  border: 1px solid rgba(240, 96, 96, 0.35);
}

.badge.disconnect {
  background: var(--gold-dim);
  color: var(--gold-light);
  border: 1px solid var(--border-glow);
}

.badge.cpu {
  background: rgba(99, 102, 241, 0.15);
  color: #a5b4fc;
  border: 1px solid rgba(99, 102, 241, 0.35);
}

.badge.room {
  background: rgba(139, 92, 246, 0.15);
  color: #c4b5fd;
  border: 1px solid rgba(139, 92, 246, 0.35);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 40px;
  flex-wrap: wrap;
}

.page-btn {
  min-width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-label);
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  font-family: 'DM Sans', system-ui, sans-serif;
}

.page-btn:hover {
  border-color: var(--gold);
  color: var(--gold);
}

.page-btn.active {
  background: var(--gold-dim);
  border-color: var(--gold);
  color: var(--gold-light);
  font-weight: 700;
}

.page-ellipsis {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-family: 'JetBrains Mono', monospace;
  padding: 0 4px;
}

.page-arrow {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid var(--border-glow);
  background: var(--gold-dim);
  color: var(--gold);
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  font-family: 'DM Sans', system-ui, sans-serif;
}

.page-arrow:hover:not(:disabled) {
  background: rgba(201, 168, 76, 0.25);
}

.page-arrow:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.empty-state {
  text-align: center;
  padding: 56px 20px;
  color: var(--text-muted);
}

.empty-state h3 {
  font-family: 'Playfair Display', serif;
  color: var(--text-primary);
  margin: 16px 0 8px;
}

.empty-state p {
  margin: 0 0 24px;
}

.empty-icon {
  font-size: 3.5rem;
  opacity: 0.45;
  color: var(--accent);
}

.btn-play {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  background: linear-gradient(135deg, var(--gold) 0%, #a87b30 100%);
  color: #0d0a14;
  border-radius: 10px;
  font-weight: 700;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: 0.85rem;
}

.btn-play:hover {
  opacity: 0.92;
}

@media (max-width: 768px) {
  .game-history-view {
    padding-top: 88px;
  }

  .gh-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .header-right {
    width: 100%;
    justify-content: space-between;
  }

  .match-body {
    grid-template-columns: 1fr;
  }

  .score-section.oponent {
    padding-left: 22px;
    border-top: 1px solid var(--border);
  }

  .score-section:first-child::after {
    display: none;
  }

  .match-footer {
    grid-template-columns: 1fr;
  }

  .footer-cell:first-child {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}
</style>
