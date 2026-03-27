<template>
  <div class="waiting-room">
    <!-- Elementos decorativos de fondo -->
    <div class="background-elements">
      <div class="casino-chip chip-1">💰</div>
      <div class="casino-chip chip-2">🎰</div>
      <div class="casino-chip chip-3">🎲</div>
      <div class="casino-chip chip-4">🃏</div>
      <div class="casino-chip chip-5">💎</div>
      <div class="casino-chip chip-6">⭐</div>
      <div class="playing-card card-1">♠</div>
      <div class="playing-card card-2">♥</div>
      <div class="playing-card card-3">♣</div>
      <div class="playing-card card-4">♦</div>
    </div>

    <div class="waiting-container" :class="{ 'game-active': gameStarted }">
      <!-- Header con información del jugador -->
      <div class="player-header">
        <div class="player-info">
          <div class="player-avatar">
            <i class="fas fa-user"></i>
          </div>
          <div class="player-details">
            <h2 class="player-name">{{ playerName }}</h2>
          </div>
        </div>
        <div class="game-status">
          <div class="status-indicator">
            <div class="status-dot"></div>
            <span>En Línea</span>
          </div>
        </div>
        </div>

      <!-- Formulario de entrada -->
      <div v-if="!gameStarted" class="entry-form">
        <div class="game-modes">
          <h3 class="modes-title">Elige tu Mesa de Juego</h3>
          <p class="modes-subtitle">Selecciona donde quieres jugar</p>
          
          <!-- 🔧 Contador general de jugadores en línea - Solo mostrar cuando las mesas estén cargadas -->
          <div class="global-online-indicator" v-if="gameTables && gameTables.length > 0">
            <div class="online-indicator-content">
              <i class="fas fa-users online-icon"></i>
              <i class="fas fa-circle online-dot" :class="{ 'has-players': totalOnlinePlayers > 0 }"></i>
              <span class="online-text">
                <strong class="players-number">{{ totalOnlinePlayers || 0 }}</strong> 
                <span class="players-label">
                  {{ (totalOnlinePlayers || 0) === 1 ? 'jugador' : 'jugadores' }} 
                  <span v-if="totalOnlinePlayers > 0">en línea</span>
                  <span v-else>buscando partida</span>
                </span>
              </span>
            </div>
          </div>
          
          <div class="mode-options">
            <!-- Mesas CPU -->
            <div 
              v-for="table in groupedTables.cpu" 
              :key="'cpu-' + table.id"
              class="mode-card cpu-mode" 
              @click="startCPUMode(table)" 
              :class="{ disabled: !playerName.trim() || isConnecting }"
            >
              <div class="mode-badge">POPULAR</div>
              <div class="mode-icon">
                <i class="fas fa-robot"></i>
              </div>
              <div class="mode-content">
                <h4>{{ table.name }}</h4>
                <p>{{ table.description }}</p>
                <div class="mode-price">
                  <span class="price-label">Inscripción</span>
                  <span class="price-value" :class="{ 'free': table.entry_price === 0 }">
                    {{ table.entry_price === 0 ? 'GRATIS' : `${table.entry_price} Dcoins` }}
                  </span>
                </div>
                <div class="mode-features">
                  <span class="feature">🤖 IA Avanzada</span>
                  <span class="feature">⚡ Inicio Rápido</span>
                </div>
              </div>
              <div class="mode-action">
                <i class="fas fa-play"></i>
              </div>
            </div>
            
            <!-- Mesas Online 2 Jugadores -->
            <div 
              v-for="table in groupedTables['online-2']" 
              :key="'online-2-' + table.id"
              class="mode-card online-mode" 
              @click="startOnlineModeTwoPlayers(table)" 
              :class="{ disabled: !playerName.trim() || isConnecting }"
            >
              <div class="mode-badge">MULTIJUGADOR</div>
              <div class="mode-icon">
                <i class="fas fa-users"></i>
              </div>
              <div class="mode-content">
                <h4>{{ table.name }}</h4>
                <p>{{ table.description }}</p>
                <div class="mode-price">
                  <span class="price-label">Inscripción</span>
                  <span class="price-value" :class="{ 'free': table.entry_price === 0 }">
                    {{ table.entry_price === 0 ? 'GRATIS' : `${table.entry_price} Dcoins` }}
                  </span>
                </div>
                <div class="mode-features">
                  <span class="feature">👥 2 Jugadores</span>
                  <span class="feature">🌐 En Tiempo Real</span>
                </div>
                <!-- 🔧 Indicador de jugadores buscando partida - SIEMPRE VISIBLE -->
                <div class="online-players-indicator">
                  <i class="fas fa-users"></i>
                  <span class="players-count">{{ table.waiting_players || 0 }}</span>
                  <span class="players-text">buscando partida</span>
                </div>
              </div>
              <div class="mode-action">
                <i class="fas fa-play"></i>
              </div>
            </div>
            
            <!-- Mesas Online 4 Jugadores -->
            <div 
              v-for="table in groupedTables['online-4']" 
              :key="'online-4-' + table.id"
              class="mode-card online-mode" 
              @click="startOnlineModeFourPlayers(table)" 
              :class="{ disabled: !playerName.trim() || isConnecting }"
            >
              <div class="mode-badge">TURNO</div>
              <div class="mode-icon">
                <i class="fas fa-users"></i>
              </div>
              <div class="mode-content">
                <h4>{{ table.name }}</h4>
                <p>{{ table.description }}</p>
                <div class="mode-price">
                  <span class="price-label">Inscripción</span>
                  <span class="price-value" :class="{ 'free': table.entry_price === 0 }">
                    {{ table.entry_price === 0 ? 'GRATIS' : `${table.entry_price} Dcoins` }}
                  </span>
                </div>
                <div class="mode-features">
                  <span class="feature">👥 4 Jugadores</span>
                  <span class="feature">🎯 Estrategia</span>
                </div>
                <!-- 🔧 Indicador de jugadores buscando partida - SIEMPRE VISIBLE -->
                <div class="online-players-indicator">
                  <i class="fas fa-users"></i>
                  <span class="players-count">{{ table.waiting_players || 0 }}</span>
                  <span class="players-text">buscando partida</span>
                </div>
              </div>
              <div class="mode-action">
                <i class="fas fa-play"></i>
              </div>
            </div>

            <!-- Mesas Invita a tu Amigo -->
            <div 
              v-for="table in groupedTables.invite" 
              :key="'invite-' + table.id"
              class="mode-card invite-mode" 
              @click="startInviteFriendMode(table)" 
              :class="{ disabled: !playerName.trim() || isConnecting }"
            >
              <div class="mode-badge">INVITACIÓN</div>
              <div class="mode-icon">
                <i class="fas fa-user-plus"></i>
              </div>
              <div class="mode-content">
                <h4>{{ table.name }}</h4>
                <p>{{ table.description }}</p>
                <div class="mode-price">
                  <span class="price-label">Inscripción</span>
                  <span class="price-value" :class="{ 'free': table.entry_price === 0 }">
                    {{ table.entry_price === 0 ? 'GRATIS' : `${table.entry_price} Dcoins` }}
                  </span>
                </div>
                <div class="mode-features">
                  <span class="feature">🔗 Código de Invitación</span>
                  <span class="feature">👥 2 Jugadores</span>
                </div>
              </div>
              <div class="mode-action">
                <i class="fas fa-share-alt"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Botón de Salir -->
        <div class="exit-section">
          <button @click="exitGame" class="exit-btn">
            <i class="fas fa-arrow-left"></i>
            <span>Volver al Dashboard</span>
          </button>
        </div>
        </div>

      <!-- Controles del Juego (Solo visible cuando hay juego) -->
      <div v-if="gameStarted && !isConnecting" class="game-controls" style="position: absolute; top: 20px; right: 20px; z-index: 100;">
        <button @click="toggleGameSound" class="control-btn" :class="{ 'active': !isGameMuted }" style="background: rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.2); color: white; border-radius: 50px; width: 40px; height: 40px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s;">
          <i class="fas" :class="isGameMuted ? 'fa-volume-mute' : 'fa-volume-up'"></i>
        </button>
      </div>

      <!-- Estado de conexión -->
      <!-- Overlay de loading básico - solo se muestra cuando NO hay juego iniciado -->
      <div v-if="isConnecting && !gameStarted" class="connecting-state">
        <div class="loading-spinner"></div>
        <p class="connecting-text">{{ connectingMessage }}</p>
    </div>

      <!-- Contenedor del juego -->
      <div v-if="gameStarted" class="game-container">
      <iframe
          ref="gameFrame"
        :src="gameUrl"
        frameborder="0"
        class="game-iframe"
        loading="eager"
        referrerpolicy="no-referrer-when-downgrade"
        @load="onGameLoad"
      ></iframe>
      
      <!-- Loading Overlay - Oculta el juego mientras espera jugadores o está configurando -->
      <div v-if="showLoadingOverlay || isConnecting" class="game-loading-overlay">
        <div class="loading-overlay-content">
          <div class="loading-spinner-large"></div>
          <!-- 🔧 FIX: Siempre mostrar connectingMessage cuando isConnecting es true -->
          <h2 v-if="isConnecting">{{ connectingMessage }}</h2>
          <h2 v-else>{{ loadingOverlayMessage }}</h2>
          
          <!-- 🔧 FIX MOBILE: Botón de reintentar cuando hay error de conexión -->
          <button 
            v-if="connectionError" 
            @click="retryConnection" 
            class="retry-btn"
            style="margin-top: 20px; padding: 12px 24px; background: #FF6B35; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: bold;"
          >
            🔄 Reintentar Conexión
          </button>
          <p v-if="roomCode && !isConnecting" class="overlay-room-code">
            Código de Sala: <strong>{{ roomCode }}</strong>
          </p>
          <!-- 🔧 FIX: Mostrar información adicional de matchmaking -->
          <p v-if="shouldShowMatchmakingInfo" class="matchmaking-info">
            Jugadores en sala: {{ matchmakingStatus.currentPlayers || 1 }}/{{ matchmakingStatus.expectedPlayers }}
          </p>
          <div class="waiting-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <!-- Botón de Cancelar - Solo visible durante la carga (excepto si el código ya fue validado) -->
      <button 
        v-if="(isConnecting || showLoadingOverlay) && !roomCodeValidated"
        @click="handleCancelSearch" 
        class="surrender-btn cancel-btn"
        :disabled="isCancelling"
      >
        <i class="fas fa-times"></i>
        <span>{{ isCancelling ? 'Cancelando...' : 'Cancelar' }}</span>
      </button>

      <!-- Botón de Rendirse - Visible cuando el juego ya está iniciado o cuando el código ya fue validado -->
      <button 
        v-if="(gameStarted && !isConnecting && !showLoadingOverlay) || roomCodeValidated"
        @click="handleSurrender" 
        class="surrender-btn"
        :disabled="isSurrendering"
      >
        <i class="fas fa-flag"></i>
        <span>{{ isSurrendering ? 'Rindiéndose...' : 'Rendirse' }}</span>
      </button>
    </div>

      <!-- Modal de elección para invitación -->
      <div v-if="showInviteChoiceModal" class="invite-choice-modal">
        <div class="choice-container">
          <div class="choice-header">
            <h2>🎮 ¡Bienvenido!</h2>
            <p>¿Qué quieres hacer?</p>
          </div>
          
          <div class="choice-options">
            <button @click="createNewRoom" class="choice-btn create-btn">
              <div class="choice-icon">🏠</div>
              <div class="choice-content">
                <h3>Crear Sala</h3>
                <p>Crea una nueva sala y comparte el código</p>
              </div>
            </button>
            
            <button @click="joinExistingRoom" class="choice-btn join-btn">
              <div class="choice-icon">🔗</div>
              <div class="choice-content">
                <h3>Unirse a Sala</h3>
                <p>Ingresa el código de una sala existente</p>
              </div>
            </button>
          </div>
          
          <button @click="closeInviteChoiceModal" class="close-btn">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>

      <!-- Estado de espera para invitación -->
      <div v-if="waitingForFriend || showInviteCode" class="invite-waiting-state" :class="{ 'overlay-mode': showInviteCode }">
        <div class="invite-container">
          <div class="invite-header">
            <h2 v-if="showInviteCode">🎮 ¡Sala Creada!</h2>
            <h2 v-else>🔗 Unirse a Sala</h2>
            <p v-if="showInviteCode">El juego está cargando. Comparte este código con tu amigo:</p>
            <p v-else>Ingresa el código de la sala para unirte</p>
          </div>
          
          <div class="room-code-display" v-if="showInviteCode">
            <div class="code-label">Código de la Sala:</div>
            <div class="code-value" v-if="roomCode">{{ roomCode }}</div>
            <div class="code-loading" v-else>
              <div class="loading-spinner"></div>
              <span>Generando código...</span>
            </div>
          </div>
          
          <!-- Campo para ingresar código cuando se une a sala -->
          <div v-if="!showInviteCode" class="join-room-section">
            <h3>¿Eres el amigo invitado?</h3>
            <div class="join-input-group">
              <input 
                v-model="friendRoomCode" 
                type="text" 
                placeholder="Ingresa el código de la sala"
                class="room-code-input"
                maxlength="4"
              >
              <button @click="joinRoomAsFriend" class="join-btn" :disabled="!friendRoomCode.trim()">
                <i class="fas fa-sign-in-alt"></i>
                Unirse a la Sala
              </button>
            </div>
          </div>
          
          <div class="invite-actions" v-if="roomCode">
            <button @click="copyRoomCode" class="action-btn copy-btn">
              <i class="fas fa-copy"></i>
              Copiar Código
            </button>
            <button @click="shareRoomCode" class="action-btn share-btn">
              <i class="fas fa-share-alt"></i>
              Compartir
            </button>
            <button @click="cancelRoomAndRefund" class="action-btn cancel-btn" :disabled="isCancelling">
              <i class="fas fa-times-circle" v-if="!isCancelling"></i>
              <i class="fas fa-spinner fa-spin" v-else></i>
              {{ isCancelling ? 'Cancelando...' : 'Cancelar Sala' }}
            </button>
          </div>
          
          <div class="waiting-status">
            <div class="waiting-indicator">
              <div class="pulse-dot"></div>
              <span v-if="roomCode">Ya estás en la sala. Esperando a que se una tu amigo...</span>
              <span v-else>Esperando a que se una tu amigo...</span>
            </div>
          </div>
          
          <div class="creator-status" v-if="roomCode">
            <div class="status-message">
              <i class="fas fa-check-circle"></i>
              <span>¡Ya estás dentro de la sala! Tu amigo puede unirse usando el código.</span>
            </div>
          </div>
        </div>
      </div>
          </div>
        </div>

      <!-- Popup de confirmación para unirse a mesa -->
      <div v-if="showConfirmModal" class="confirm-modal-overlay">
        <div class="confirm-modal">
          <div class="confirm-header">
            <h2>🎮 Confirmar Acceso a Mesa</h2>
            <p>Estás a punto de acceder a una mesa de juego</p>
          </div>
          
          <div class="confirm-content">
            <div class="table-info">
              <div class="table-name">{{ pendingTable?.name }}</div>
              <div class="table-description">{{ pendingTable?.description }}</div>
            </div>
            
            <div class="payment-info">
              <div class="payment-item">
                <span class="label">Precio de Inscripción:</span>
                <span class="amount" :class="{ 'free': pendingTable?.entry_price === 0 }">
                  {{ pendingTable?.entry_price === 0 ? 'GRATIS' : `${pendingTable?.entry_price} Dcoins` }}
                </span>
              </div>
              
                 <div class="payment-item">
                   <span class="label">Puntos para Ganar:</span>
                   <span class="points">{{ pendingTable?.win_points }} pts</span>
                 </div>
                 
                 <div class="payment-item">
                   <span class="label">Premio al Ganador:</span>
                   <span class="prize-amount">{{ pendingTable?.winner_payout }} Dcoins</span>
                 </div>
              
              <div class="payment-item total" v-if="pendingTable?.entry_price > 0">
                <span class="label">Total a Descontar:</span>
                <span class="amount">{{ pendingTable?.entry_price }} Dcoins</span>
              </div>
            </div>
            
            <div class="warning-message" v-if="pendingTable?.entry_price > 0">
              <i class="fas fa-exclamation-triangle"></i>
              <span>Se descontará el monto de tu saldo al confirmar</span>
            </div>
          </div>
          
          <div class="confirm-actions">
            <button @click="closeConfirmModal" class="cancel-btn" :disabled="isJoiningTable">
              <i class="fas fa-times"></i>
              Cancelar
            </button>
            <button @click="confirmJoinTable" class="confirm-btn" :disabled="isJoiningTable">
              <i class="fas fa-check" v-if="!isJoiningTable"></i>
              <i class="fas fa-spinner fa-spin" v-else></i>
              {{ isJoiningTable ? 'Procesando...' : 'Confirmar y Jugar' }}
            </button>
          </div>
        </div>
      </div>
      
      <!-- Notificación de balance actualizado -->
      <div v-if="showBalanceNotification" class="balance-notification" :class="balanceNotificationType">
        <div class="notification-content">
          <i class="fas fa-coins"></i>
          <span>{{ balanceNotificationMessage }}</span>
        </div>
      </div>
</template>

<script>
import { GAME_CONFIG, calculateBetAmounts, getUserData, getTableId } from './gameConfig.js'

export default {
  name: 'WaitingRoom',
  props: {
    userName: {
      type: String,
      default: ''
    },
    gameName: {
      type: String,
      default: 'Juego'
    }
  },
  emits: ['exit', 'game-ended', 'game-error'],
  data() {
    return {
      playerName: this.getLoggedUserName(),
      isConnecting: false,
      gameStarted: false,
      gameMode: null,
      gameUrl: '',
      connectingMessage: 'Iniciando juego...',
      // gameFrame se accede via $refs.gameFrame (ref="gameFrame" en el template)
      // Estado de matchmaking
      matchmakingStatus: {
        currentPlayers: 0,
        expectedPlayers: 2,
        playersNeeded: 2
      },
      // Estados para modo de invitación
      inviteMode: false,
      roomCode: '',
      waitingForFriend: false,
      showInviteModal: false,
      showInviteCode: false,
      showInviteChoiceModal: false,
      friendRoomCode: '',
      pendingRoomCodeToJoin: null, // Código de sala pendiente para enviar cuando el juego esté listo
      roomCodeValidated: false, // Indica si el código de invitado ya fue validado exitosamente en la base de datos
      // Datos de las mesas del backend
      gameTables: [],
      selectedTable: null,
      groupedTables: {
        'cpu': [],
        'online-2': [],
        'online-4': [],
        'invite': []
      },
      isSyncingBalance: false,
      balanceSyncPromise: null,
      // Popup de confirmación
      showConfirmModal: false,
      pendingTable: null,
      pendingGameMode: null,
      pendingPlayersRoom: null,
      isJoiningTable: false,
      
      // Notificación de balance
      showBalanceNotification: false,
      balanceNotificationMessage: '',
      balanceNotificationType: 'success',
      
      // Overlay de loading para esperar jugadores
      showLoadingOverlay: false,
      loadingOverlayMessage: 'Esperando jugadores...',
      playersRoom: 2, // Número de jugadores esperados
      
      // Estado de rendición
      isSurrendering: false,
      
      // Estado de cancelación de sala
      isCancelling: false,
      
      // Flag para evitar envío duplicado de resultados
      resultSent: false,
      
      // 🔧 FIX: Interval para actualizar mensaje de matchmaking
      matchmakingMessageInterval: null,
      
      // 🔧 FIX: Detección de fallo de carga
      iframeLoadTimeout: null,
      iframeLoadFailed: false,
      iframeLoadRetries: 0,
      maxIframeLoadRetries: 3,
      
      // 🔧 FIX: Flag para saber si el juego (iframe) está cargado y listo
      isGameReady: false,
      
      // 🔧 FIX: Session ID único para aislar cada partida
      currentSessionId: null,
      
      // 🔧 FIX: Flag para identificar si el usuario es INVITADO (se unió a sala existente)
      isInviteGuest: false,
      
      // 🔧 Interval para actualizar contadores de jugadores en línea
      onlinePlayersUpdateInterval: null,
      
      // 🔧 FIX MOBILE: Sistema simplificado - confiar en reconexión automática del socket
      lastMatchmakingUpdate: null, // Timestamp de última actualización (solo para referencia)
      matchmakingWatchdogInterval: null, // DESHABILITADO - no usar intervalos agresivos
      connectionError: false, // Flag para mostrar error de conexión (solo por eventos del socket)
      isReconnecting: false, // Flag para indicar que está reconectando
      
      // 🔧 FIX: Control de sonido
      isGameMuted: true,
      
      // 🎉 Sistema de confeti para celebración de victoria
      confettiAnimationFrame: null,
      confettiParticles: []
    }
  },
  computed: {
    // 🔧 Total de jugadores en línea - Sumar waiting_players de las mesas
    totalOnlinePlayers() {
      if (!this.gameTables || this.gameTables.length === 0) return 0;
      
      const onlineTables = this.gameTables.filter(table => 
        table.type === 'online-2' || table.type === 'online-4'
      );
      
      const total = onlineTables.reduce((sum, table) => {
        return sum + (table.waiting_players || 0);
      }, 0);
      
      return total;
    },
    // 🔧 FIX: Computed property para mostrar información de matchmaking
    shouldShowMatchmakingInfo() {
      return this.isConnecting && 
             this.gameMode === 'online' && 
             this.matchmakingStatus && 
             this.matchmakingStatus.expectedPlayers > 0;
    },
    
    // 🔧 FIX: Computed property para verificar si hay algún modal activo
    hasActiveModal() {
      return this.showConfirmModal || 
             this.showInviteChoiceModal || 
             this.waitingForFriend || 
             this.showInviteCode;
    },
    
    // 🔧 FIX: Computed property para verificar si el juego está en un estado válido para iniciar
    canStartNewGame() {
      return !this.hasActiveModal && 
             !this.gameStarted && 
             !this.isConnecting &&
             !this.isJoiningTable;
    },
    
  },
  methods: {
    toggleGameSound() {
      this.isGameMuted = !this.isGameMuted;
      
      const iframe = this.$refs.gameFrame;
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({
          type: 'TOGGLE_SOUND',
          data: { mute: this.isGameMuted }
        }, '*');
        console.log(`🔊 [WAITING-ROOM] Sonido de juego ${this.isGameMuted ? 'silenciado' : 'activado'}`);
      }
    },

    sanitizeTableData(table = null, fallbackType = 'online-2') {
      if (!table) return null
      const toNumber = (value, defaultValue = 0) => {
        if (value === null || value === undefined || value === '') return defaultValue
        const parsed = parseFloat(value)
        return Number.isNaN(parsed) ? defaultValue : parsed
      }

      const type = table.type || fallbackType || 'online-2'
      return {
        ...table,
        id: table.id ?? getTableId(),
        name: table.name || 'Mesa Online',
        description: table.description || '',
        entry_price: toNumber(table.entry_price, 0),
        winner_payout: toNumber(table.winner_payout, 0),
        win_points: toNumber(table.win_points, GAME_CONFIG.DEFAULT_POINTS),
        total_pot: toNumber(table.total_pot, 0),
        house_fee: toNumber(table.house_fee, 0),
        house_fee_percentage: toNumber(table.house_fee_percentage, 0),
        type,
        mode: table.mode || {},
        current_players: toNumber(table.current_players, 0),
        max_players: toNumber(table.max_players ?? table.max_number_players, type === 'cpu' ? 1 : type === 'online-4' ? 4 : 2),
        min_players: toNumber(table.min_players ?? table.min_number_players, type === 'cpu' ? 1 : 2),
        status: table.status || table.current_status || 'waiting',
        waiting_players: toNumber(table.waiting_players, 0)
      }
    },

    setPendingTableContext(table, mode, playersRoom) {
      const sanitized = this.sanitizeTableData(table, mode === 'cpu' ? 'cpu' : table?.type || 'online-2')
      if (!sanitized) {
        console.error('❌ [WAITING-ROOM] No se pudo sanitizar la mesa seleccionada')
        return null
      }

      this.pendingTable = sanitized
      this.pendingGameMode = mode
      this.pendingPlayersRoom = playersRoom

      if (!this.selectedTable || this.selectedTable.id !== sanitized.id) {
        this.selectedTable = sanitized
      }

      return sanitized
    },

    didBackendConfirmCharge(payload = {}, entryPrice = 0) {
      const normalizedEntry = parseFloat(entryPrice) || 0
      if (normalizedEntry <= 0) return true
      if (!payload) return false

      const successStatuses = ['success', 'successful', 'completed', 'approved', 'joined']
      if (payload.balance_deducted === true || payload?.data?.balance_deducted === true) return true
      if (payload.payment_status && successStatuses.includes(payload.payment_status.toLowerCase())) return true
      if (payload.transaction_status && successStatuses.includes(payload.transaction_status.toLowerCase())) return true
      if (payload.status && successStatuses.includes(payload.status.toLowerCase())) return true
      if (typeof payload.new_balance !== 'undefined' ||
          typeof payload.balance !== 'undefined' ||
          typeof payload.current_balance !== 'undefined' ||
          typeof payload?.player?.balance !== 'undefined' ||
          typeof payload?.data?.new_balance !== 'undefined' ||
          typeof payload?.data?.balance !== 'undefined') {
        return true
      }
      return false
    },

    ensureSelectedTableDefaults() {
      if (this.selectedTable) {
        this.selectedTable = this.sanitizeTableData(this.selectedTable, this.selectedTable.type)
      } else if (this.pendingTable) {
        this.selectedTable = this.sanitizeTableData(this.pendingTable, this.pendingTable.type)
      }

      if (!this.selectedTable) {
        console.error('❌ [WAITING-ROOM] selectedTable sigue vacío después de intentar sanearlo')
      }
      return this.selectedTable
    },

    async syncUserBalance(force = false) {
      if (this.isSyncingBalance && this.balanceSyncPromise && !force) {
        return this.balanceSyncPromise
      }

      this.isSyncingBalance = true
      this.balanceSyncPromise = this.$store.dispatch('games/fetchUserBalance')
        .catch(error => {
          console.error('❌ [WAITING-ROOM] Error sincronizando balance:', error)
        })
        .finally(() => {
          this.isSyncingBalance = false
        })

      return this.balanceSyncPromise
    },

    announceBalanceChange(oldBalance, newBalance, message = null) {
      if (typeof window === 'undefined' || !window.dispatchEvent) {
        return
      }

      window.dispatchEvent(new CustomEvent('balance-updated', {
        detail: {
          oldBalance,
          newBalance,
          difference: newBalance - oldBalance,
          message: message || `Balance actualizado: ${oldBalance} → ${newBalance}`
        }
      }))
    },

    extractBalanceFromPayload(payload = {}) {
      const candidates = [
        payload.new_balance,
        payload.balance,
        payload.current_balance,
        payload?.player?.balance,
        payload?.data?.new_balance,
        payload?.data?.balance
      ]

      for (const candidate of candidates) {
        if (candidate === null || candidate === undefined || candidate === '') continue
        const parsed = parseFloat(candidate)
        if (!Number.isNaN(parsed)) {
          return parsed
        }
      }
      return null
    },

    updateBalanceFromPayload(payload = {}) {
      const parsedBalance = this.extractBalanceFromPayload(payload)
      if (parsedBalance !== null) {
        const oldBalance = this.$store.state.games.userBalance || 0
        this.$store.commit('games/SET_USER_BALANCE', parsedBalance)
        this.announceBalanceChange(
          oldBalance,
          parsedBalance,
          payload?.message || payload?.data?.message
        )
      }
      return parsedBalance
    },

    // Mapear datos del backend a las tarjetas
    mapBackendDataToTables(tables) {
      console.log('🔄 [WAITING-ROOM] Mapeando datos del backend:', tables);
      
      // Filtrar mesas que no están en la base de datos
      const filteredTables = tables.filter(table => {
        // Excluir la mesa "Dominoes" que no está en la base de datos
        return table.name !== 'Dominoes' && table.name !== 'dominoes';
      });
      
      console.log(`🔍 [WAITING-ROOM] Mesas filtradas: ${filteredTables.length} de ${tables.length} mesas`);
      
      // Console log detallado de cada mesa recibida
      filteredTables.forEach((table, index) => {
        console.log(`📊 [WAITING-ROOM] Mesa ${index + 1} recibida del backend:`, {
          id: table.id,
          name: table.name,
          description: table.description,
          entry_price: table.entry_price,
          winner_payout: table.winner_payout,
          win_points: table.win_points,
          total_pot: table.total_pot,
          house_fee: table.house_fee,
          house_fee_percentage: table.house_fee_percentage,
          waiting_players: table.waiting_players,
          max_number_players: table.max_number_players,
          min_number_players: table.min_number_players,
          current_status: table.current_status,
          mode: table.mode
        });
      });
      
      this.gameTables = filteredTables.map(table => {
        const tableType = this.getTableType(table);
        const enrichedTable = { ...table, type: tableType }
        return this.sanitizeTableData(enrichedTable, tableType)
      });
      
      console.log('✅ [WAITING-ROOM] Mesas mapeadas:', this.gameTables);
      
      // Agrupar mesas por tipo para mostrar todas las disponibles
      this.groupTablesByType();
    },

    groupTablesByType() {
      const grouped = {
        'cpu': this.gameTables.filter(table => table.type === 'cpu'),
        'online-2': this.gameTables.filter(table => table.type === 'online-2'),
        'online-4': this.gameTables.filter(table => table.type === 'online-4'),
        'invite': this.gameTables.filter(table => table.type === 'invite')
      };
      
      console.log('📊 [WAITING-ROOM] Mesas agrupadas por tipo:', grouped);
      this.groupedTables = grouped;
    },

    getTableType(table) {
      // Mapear tipos del backend a tipos de tarjeta
      const modeType = table.mode?.type || table.mode?.name || '';
      const tableName = table.name || '';
      
      console.log('🔍 [WAITING-ROOM] Analizando mesa:', {
        id: table.id,
        name: tableName,
        modeType: modeType,
        maxPlayers: table.max_number_players
      });
      
      // Verificar por nombre de mesa primero
      if (tableName.includes('CPU') || tableName.includes('cpu')) {
        return 'cpu';
      } else if (tableName.includes('Invita') || tableName.includes('invita')) {
        return 'invite';
      }
      
      // Verificar por tipo de modo
      if (modeType.includes('CPU') || modeType.includes('cpu')) {
        return 'cpu';
      } else if (modeType.includes('Invita') || modeType.includes('invita')) {
        return 'invite';
      } else if (modeType.includes('4') || modeType.includes('4 Jugadores')) {
        return 'online-4';
      } else if (modeType.includes('2') || modeType.includes('2 Jugadores')) {
        return 'online-2';
      }
      
      // Fallback basado en número de jugadores
      if (table.max_number_players === 1) return 'cpu';
      if (table.max_number_players === 2) return 'online-2';
      if (table.max_number_players === 4) return 'online-4';
      
      console.log('⚠️ [WAITING-ROOM] Tipo no identificado, usando default online-2');
      return 'online-2'; // Default
    },

    getTableByType(type) {
      return this.gameTables.find(table => table.type === type);
    },

    async loadGameTables() {
      try {
        console.log('🔄 [WAITING-ROOM] Cargando mesas desde el backend...');
        
        // Obtener datos desde el store de Vuex (que ya tiene los datos del backend)
        const games = this.$store.state.games.games || [];
        
        if (games.length > 0) {
          console.log('📡 [WAITING-ROOM] Datos obtenidos del store:', games);
          this.mapBackendDataToTables(games);
        } else {
          console.log('⚠️ [WAITING-ROOM] No hay datos en el store, cargando desde API...');
          // Si no hay datos en el store, cargar desde la API
          await this.$store.dispatch('games/fetchTables');
          const updatedGames = this.$store.state.games.games || [];
          this.mapBackendDataToTables(updatedGames);
        }
      } catch (error) {
        console.error('❌ [WAITING-ROOM] Error cargando mesas:', error);
      }
    },

    getLoggedUserName() {
      // Obtener el nombre del usuario logueado desde el store de Vuex, localStorage, o props
      // Ajusta esta función según tu sistema de autenticación
      if (this.$store && this.$store.state.user && this.$store.state.user.name) {
        return this.$store.state.user.name;
      }
      
      // Fallback: obtener desde localStorage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          return user.name || user.username || 'Jugador';
        } catch (e) {
          console.error('Error parsing stored user:', e);
        }
      }
      
      // Fallback: obtener desde props
      if (this.userName) {
        return this.userName;
      }
      
      // Fallback final
      return 'Jugador';
    },
    
    getFirstName(fullName) {
      // Obtener solo la primera palabra del nombre completo
      if (!fullName || typeof fullName !== 'string') {
        return 'Jugador';
      }
      
      const firstName = fullName.trim().split(' ')[0];
      return firstName || 'Jugador';
    },
    
    startCPUMode(table) {
      if (!this.playerName.trim()) {
        alert('Por favor ingresa tu nombre');
        return;
      }
      
      if (!table) {
        console.error('❌ [WAITING-ROOM] Mesa CPU no proporcionada');
        alert('Error: Mesa CPU no disponible');
        return;
      }
      
      // 🔧 FIX: Verificar que no hay otro proceso activo
      if (!this.canStartNewGame) {
        console.warn('⚠️ [WAITING-ROOM] No se puede iniciar nuevo juego - hay un proceso activo');
        return;
      }
      
      // 🔧 FIX: Limpiar TODO el estado antes de iniciar nuevo modo
      this.resetFullState(true);
      
      // Mostrar popup de confirmación
      this.setPendingTableContext(table, 'cpu', 1);
      this.showConfirmModal = true;
      
      console.log('🎮 [WAITING-ROOM] Mostrando confirmación para CPU con mesa:', table);
      console.log('🔑 [WAITING-ROOM] Session ID:', this.currentSessionId);
    },
    
    startOnlineModeTwoPlayers(table) {
      if (!this.playerName.trim()) {
        alert('Por favor ingresa tu nombre');
        return;
      }
      
      if (!table) {
        console.error('❌ [WAITING-ROOM] Mesa Online 2 jugadores no proporcionada');
        alert('Error: Mesa Online 2 jugadores no disponible');
        return;
      }
      
      // 🔧 FIX: Verificar que no hay otro proceso activo
      if (!this.canStartNewGame) {
        console.warn('⚠️ [WAITING-ROOM] No se puede iniciar nuevo juego - hay un proceso activo');
        return;
      }
      
      // 🔧 FIX: Limpiar TODO el estado antes de iniciar nuevo modo
      this.resetFullState(true);
      
      // Mostrar popup de confirmación
      this.setPendingTableContext(table, 'online', 2);
      this.showConfirmModal = true;
      
      console.log('🎮 [WAITING-ROOM] Mostrando confirmación para Online 2 con mesa:', table);
      console.log('🔑 [WAITING-ROOM] Session ID:', this.currentSessionId);
    },

    startOnlineModeFourPlayers(table) {
      if (!this.playerName.trim()) {
        alert('Por favor ingresa tu nombre');
        return;
      }
      
      if (!table) {
        console.error('❌ [WAITING-ROOM] Mesa Online 4 jugadores no proporcionada');
        alert('Error: Mesa Online 4 jugadores no disponible');
        return;
      }
      
      // 🔧 FIX: Verificar que no hay otro proceso activo
      if (!this.canStartNewGame) {
        console.warn('⚠️ [WAITING-ROOM] No se puede iniciar nuevo juego - hay un proceso activo');
        return;
      }
      
      // 🔧 FIX: Limpiar TODO el estado antes de iniciar nuevo modo
      this.resetFullState(true);
      
      // Mostrar popup de confirmación
      this.setPendingTableContext(table, 'online', 4);
      this.showConfirmModal = true;
      
      console.log('🎮 [WAITING-ROOM] Mostrando confirmación para Online 4 con mesa:', table);
      console.log('🔑 [WAITING-ROOM] Session ID:', this.currentSessionId);
    },

    startInviteFriendMode(table) {
      if (!this.playerName.trim()) {
        alert('Por favor ingresa tu nombre');
        return;
      }
      
      if (!table) {
        console.error('❌ [WAITING-ROOM] Mesa Invita a tu Amigo no proporcionada');
        alert('Error: Mesa Invita a tu Amigo no disponible');
        return;
      }
      
      // 🔧 FIX: Verificar que no hay otro proceso activo
      if (!this.canStartNewGame) {
        console.warn('⚠️ [WAITING-ROOM] No se puede iniciar nuevo juego - hay un proceso activo');
        return;
      }
      
      // 🔧 FIX: Limpiar TODO el estado antes de iniciar nuevo modo
      this.resetFullState(true);
      
      // 🔧 FIX: Para modo invitación, configurar contexto ANTES de mostrar opciones
      // NO activar inviteMode aquí - se activará cuando el usuario elija crear sala
      this.setPendingTableContext(table, 'online', 2);
      
      // Mostrar popup de elección directamente (sin descontar saldo aún)
      this.showInviteChoice();
      
      console.log('🎮 [WAITING-ROOM] Mostrando opciones para Invita a tu Amigo con mesa:', table);
      console.log('🔑 [WAITING-ROOM] Session ID:', this.currentSessionId);
    },
    
    // Método para manejar actualización de balance
    handleBalanceUpdate(event) {
      const { oldBalance, newBalance, difference, message } = event.detail;
      
      console.log('💰 [WAITING-ROOM] Balance actualizado:', {
        oldBalance,
        newBalance,
        difference,
        message
      });
      
      // Mostrar notificación
      this.balanceNotificationMessage = message;
      this.balanceNotificationType = difference < 0 ? 'deduction' : 'success';
      this.showBalanceNotification = true;
      
      // Ocultar notificación después de 3 segundos
      setTimeout(() => {
        this.showBalanceNotification = false;
      }, 3000);
    },
    
    // Métodos para el popup de confirmación
    closeConfirmModal() {
      // 🔧 FIX: Limpiar todo el estado relacionado con la confirmación
      this.showConfirmModal = false;
      this.pendingTable = null;
      this.pendingGameMode = null;
      this.pendingPlayersRoom = null;
      this.isJoiningTable = false;
      
      // También limpiar estados de invite por si acaso
      this.inviteMode = false;
      this.showInviteChoiceModal = false;
      
      console.log('🔙 [WAITING-ROOM] Modal de confirmación cerrado - Estados limpiados');
    },
    
    async confirmJoinTable() {
      if (!this.pendingTable) {
        console.error('❌ [WAITING-ROOM] No hay mesa pendiente para confirmar');
        return;
      }
      
      // 🔄 RESETEAR FLAG DE RESULTADO ENVIADO para nuevo juego
      this.resultSent = false;
      console.log('🔄 [WAITING-ROOM] Flag resultSent reseteado para nuevo juego');
      
      this.isJoiningTable = true;
      
      try {
        await this.syncUserBalance();
        const availableBalance = this.$store.state.games.userBalance || 0;

        if (this.pendingTable.entry_price > 0 && availableBalance < this.pendingTable.entry_price) {
          alert('Saldo insuficiente para unirte a esta mesa. Recarga o elige otra mesa.');
          this.isJoiningTable = false;
          return;
        }

        console.log('🔄 [WAITING-ROOM] Enviando solicitud de unirse a mesa:', this.pendingTable);
        
        // Llamar al endpoint para unirse a la mesa
        const response = await this.$store.dispatch('games/joinTable', {
          tableId: this.pendingTable.id,
          entryPrice: this.pendingTable.entry_price
        });
        
        if (response.success) {
          if (this.pendingTable.entry_price > 0 && response.balanceDeducted === false) {
            throw new Error('No se pudo confirmar el descuento del saldo. Intenta nuevamente.');
          }

          console.log('✅ [WAITING-ROOM] Unido exitosamente a la mesa:', response);

          // 🔧 FIX: Pausar música de fondo al confirmar juego
          window.dispatchEvent(new CustomEvent('pause-background-music'));
          console.log('🔇 [WAITING-ROOM] Evento pause-background-music emitido al confirmar');

          // Proceder con el juego ANTES de cerrar el modal
          this.proceedWithGame();
          
          // Cerrar popup después de iniciar el juego
          this.closeConfirmModal();
        } else {
          throw new Error(response.message || 'Error al unirse a la mesa');
        }
        
      } catch (error) {
        console.error('❌ [WAITING-ROOM] Error al unirse a la mesa:', error);
        alert('Error al unirse a la mesa: ' + error.message);
        this.isJoiningTable = false;
      }
    },
    
    proceedWithGame() {
      // Validar que los datos pendientes existan
      if (!this.pendingTable || !this.pendingGameMode) {
        console.error('❌ [WAITING-ROOM] Datos pendientes faltantes:', {
          pendingTable: this.pendingTable,
          pendingGameMode: this.pendingGameMode,
          pendingPlayersRoom: this.pendingPlayersRoom
        });
        alert('Error: Datos del juego no disponibles. Por favor intenta nuevamente.');
        return;
      }
      
      const sanitizedPending = this.sanitizeTableData(
        this.pendingTable,
        this.pendingTable?.type || (this.pendingGameMode === 'cpu' ? 'cpu' : 'online-2')
      )

      if (!sanitizedPending) {
        alert('Error al preparar la mesa seleccionada. Intenta de nuevo.')
        return
      }

      this.pendingTable = sanitizedPending

      // Configurar datos del juego
      this.selectedTable = sanitizedPending;
      this.gameMode = this.pendingGameMode;
      this.playersRoom = this.pendingPlayersRoom || sanitizedPending.max_players || GAME_CONFIG.DEFAULT_PLAYERS;
      
      // 🔧 FIX: Inicializar estado de matchmaking para modos online
      // Iniciar con 0 jugadores - el servidor confirmará cuando estemos en cola
      if (this.gameMode === 'online') {
        this.matchmakingStatus = {
          currentPlayers: 0, // 🔧 FIX: Iniciar en 0 - se actualizará cuando el servidor confirme
          expectedPlayers: this.playersRoom,
          playersNeeded: this.playersRoom // Faltan todos hasta que confirmemos
        };
        
        console.log('✅ [WAITING-ROOM] Estado de matchmaking inicializado (esperando servidor):', {
          currentPlayers: this.matchmakingStatus.currentPlayers,
          expectedPlayers: this.matchmakingStatus.expectedPlayers,
          playersNeeded: this.matchmakingStatus.playersNeeded,
          playersRoom: this.playersRoom
        });
      }
      
      console.log('🎮 [WAITING-ROOM] Configurando juego:', {
        gameMode: this.gameMode,
        pendingGameMode: this.pendingGameMode,
        tableType: this.selectedTable?.type,
        playersRoom: this.playersRoom,
        selectedTable: this.selectedTable,
        matchmakingStatus: this.matchmakingStatus
      });
      
      // Si es modo invitación, mostrar opciones
      if (this.pendingGameMode === 'online' && this.selectedTable.type === 'invite') {
        this.inviteMode = true;
        this.showInviteChoice();
        return;
      }
      
      // Para otros modos, iniciar directamente
      this.startActualGame();
    },
    
    startActualGame() {
      const safeTable = this.ensureSelectedTableDefaults()
      if (!safeTable) {
        alert('Error: No se pudo identificar la mesa seleccionada. Inténtalo de nuevo.')
        this.isConnecting = false
        this.gameStarted = false
        return
      }

      this.isConnecting = true;
      this.connectingMessage = this.getConnectingMessage();
      
      console.log('🎮 [WAITING-ROOM] Iniciando juego con mesa:', this.selectedTable);
      console.log('🎮 [WAITING-ROOM] GameMode actual:', this.gameMode);
      
      // Construir URL del juego con parámetros
      this.gameUrl = this.buildGameUrl(this.gameMode);

      // 🔧 FIX: Para modos online, iniciar actualización periódica del mensaje de matchmaking
      if (this.gameMode === 'online') {
        this.startMatchmakingMessageUpdater();
        // 🔧 FIX MOBILE: Iniciar watchdog para detectar desconexiones
        this.startMatchmakingWatchdog();
      }
      
      // 🔧 OPTIMIZATION: Reducir delay inicial - el iframe comenzará a cargar inmediatamente
      // El delay de 2000ms solo retrasaba la carga innecesariamente
      this.gameStarted = true;
      
      // 🔧 FIX: Iniciar timeout para detectar fallo de carga
      this.startIframeLoadTimeout();
      
      // Solo ocultar isConnecting para modo CPU (no espera jugadores)
      // Para modo online, se ocultará con GAME_STARTED
      if (this.gameMode === 'cpu') {
        this.isConnecting = false;
        console.log('✅ [WAITING-ROOM] Modo CPU - Overlay ocultado inmediatamente');
      } else {
        console.log('⏳ [WAITING-ROOM] Modo Online - Overlay permanece hasta GAME_STARTED');
      }
    },

    // 🔧 FIX: Timeout para detectar si el iframe no carga
    startIframeLoadTimeout() {
      // Limpiar timeout anterior
      if (this.iframeLoadTimeout) {
        clearTimeout(this.iframeLoadTimeout);
      }
      
      // 🔧 FIX: Aumentar timeout a 30 segundos y reintentar silenciosamente la primera vez
      // El juego puede tardar más en cargar dependiendo de la conexión
      this.iframeLoadTimeout = setTimeout(() => {
        if (this.isConnecting && this.gameStarted) {
          console.warn('⚠️ [WAITING-ROOM] El juego no respondió en 30 segundos');
          this.handleIframeLoadFailure();
        }
      }, 30000); // 30 segundos en lugar de 15
    },

    // 🔧 FIX: Manejar fallo de carga del iframe - menos intrusivo
    handleIframeLoadFailure() {
      this.iframeLoadFailed = true;
      this.iframeLoadRetries++;
      
      console.warn('⚠️ [WAITING-ROOM] Fallo de carga detectado:', {
        retries: this.iframeLoadRetries,
        maxRetries: this.maxIframeLoadRetries,
        gameMode: this.gameMode,
        playersRoom: this.playersRoom,
        selectedTable: this.selectedTable
      });
      
      // 🔧 FIX: En el primer reintento, hacerlo silenciosamente sin molestar al usuario
      if (this.iframeLoadRetries === 1) {
        console.log('🔄 [WAITING-ROOM] Primer reintento silencioso...');
        this.connectingMessage = 'Reconectando...';
        this.retryGameLoad();
        return;
      }
      
      // Solo mostrar popup después del segundo intento fallido
      if (this.iframeLoadRetries < this.maxIframeLoadRetries) {
        const shouldRetry = confirm(
          `El juego está tardando en cargar.\n\n` +
          `¿Deseas reintentar? (Intento ${this.iframeLoadRetries}/${this.maxIframeLoadRetries})`
        );
        
        if (shouldRetry) {
          this.retryGameLoad();
        } else {
          this.cancelAndGoBack();
        }
      } else {
        alert(
          `No se pudo cargar el juego después de ${this.maxIframeLoadRetries} intentos.\n\n` +
          `Por favor, verifica tu conexión e intenta de nuevo.`
        );
        this.cancelAndGoBack();
      }
    },

    // 🔧 FIX: Reintentar carga del juego
    async retryGameLoad() {
      console.log('🔄 [WAITING-ROOM] Reintentando carga del juego...');
      
      this.iframeLoadFailed = false;
      this.isGameReady = false; // 🔧 FIX: Resetear flag de juego listo
      
      // Limpiar estado
      this.gameStarted = false;
      this.isConnecting = true;
      this.connectingMessage = 'Reintentando conexión...';
      
      // Esperar un momento antes de reintentar
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Recargar construyendo nueva URL con timestamp para evitar caché
      const timestamp = Date.now();
      const baseUrl = this.gameUrl.split('?')[0];
      const params = new URLSearchParams(this.gameUrl.split('?')[1] || '');
      params.set('_t', timestamp.toString()); // Añadir timestamp para evitar caché
      
      this.gameUrl = `${baseUrl}?${params.toString()}`;
      
      console.log('🔄 [WAITING-ROOM] Nueva URL con timestamp:', this.gameUrl);
      
      // Reiniciar el juego
      setTimeout(() => {
        this.gameStarted = true;
        this.startIframeLoadTimeout();
      }, 1000);
    },

    // 🔧 FIX: Cancelar y volver
    async cancelAndGoBack() {
      console.log('❌ [WAITING-ROOM] Usuario canceló o máximo de reintentos alcanzado');
      
      // Si es modo online con precio, intentar reembolsar
      if (this.selectedTable && this.selectedTable.entry_price > 0) {
        await this.handleCancelSearch();
      } else {
        this.resetGame();
        this.$router.push('/dashboard');
      }
    },
    
    getConnectingMessage() {
      switch (this.gameMode) {
        case 'cpu':
          return 'Preparando partida contra La Banca...';
        case 'online': {
          // 🔧 FIX: No mostrar conteo de jugadores hasta que el juego esté cargado Y en matchmaking
          // Mostrar "Conectando..." hasta que:
          // 1. El juego (iframe) esté cargado (isGameReady = true)
          // 2. Y tengamos datos reales del servidor (currentPlayers > 0)
          if (!this.isGameReady) {
            return 'Cargando juego...';
          }
          
          if (!this.matchmakingStatus.currentPlayers || this.matchmakingStatus.currentPlayers === 0) {
            return 'Conectando al servidor de juego...';
          }
          
          // 🔧 FIX: Mensajes diferentes para modo INVITACIÓN vs modo ONLINE normal
          const isInviteMode = this.inviteMode || this.isInviteGuest || this.selectedTable?.type === 'invite';
          
          if (isInviteMode) {
            return this.getInviteConnectingMessage();
          }
          
          // Modo ONLINE normal (2 o 4 jugadores aleatorios)
          const expectedPlayers = this.matchmakingStatus.expectedPlayers || this.playersRoom || 2;
          const currentPlayers = this.matchmakingStatus.currentPlayers || 1;
          const playersNeeded = Math.max(0, expectedPlayers - currentPlayers);
          
          console.log('📊 [WAITING-ROOM] getConnectingMessage - valores:', {
            expectedPlayers,
            currentPlayers,
            playersNeeded,
            matchmakingStatusExpected: this.matchmakingStatus.expectedPlayers,
            playersRoom: this.playersRoom
          });
          
          if (playersNeeded > 0) {
            return `${currentPlayers}/${expectedPlayers} jugadores - Faltan ${playersNeeded} para empezar`;
          } else {
            return `${currentPlayers}/${expectedPlayers} jugadores - ¡Iniciando partida!`;
          }
        }
        default:
          return 'Iniciando juego...';
      }
    },
    
    // 🔧 FIX: Mensajes específicos para modo INVITACIÓN
    getInviteConnectingMessage() {
      const currentPlayers = this.matchmakingStatus.currentPlayers || 1;
      const expectedPlayers = this.matchmakingStatus.expectedPlayers || 2;
      const playersNeeded = Math.max(0, expectedPlayers - currentPlayers);
      
      // Si es INVITADO (quien se une a sala existente)
      if (this.isInviteGuest) {
        if (playersNeeded > 0) {
          return '🔗 Conectado a la sala - Esperando inicio...';
        } else {
          return '🎮 ¡Listo! Iniciando partida...';
        }
      }
      
      // Si es HOST (quien crea la sala)
      if (this.inviteMode) {
        if (!this.roomCode) {
          return '🏠 Creando sala de invitación...';
        } else if (playersNeeded > 0) {
          return '✅ Sala lista - Esperando a tu amigo...';
        } else {
          return '🎮 ¡Amigo conectado! Iniciando partida...';
        }
      }
      
      // Fallback
      return '🔗 Conectando a sala...';
    },

    // 🔧 FIX: Actualizar mensaje de matchmaking periódicamente
    startMatchmakingMessageUpdater() {
      console.log('🔄 [WAITING-ROOM] Iniciando actualizador de mensaje de matchmaking');
      console.log('🔄 [WAITING-ROOM] Estado inicial:', {
        playersRoom: this.playersRoom,
        expectedPlayers: this.matchmakingStatus.expectedPlayers,
        currentPlayers: this.matchmakingStatus.currentPlayers
      });
      
      // Limpiar intervalo anterior si existe
      this.stopMatchmakingMessageUpdater();
      
      // Actualizar mensaje cada 500ms para asegurar que se vea en todas las plataformas
      this.matchmakingMessageInterval = setInterval(() => {
        if (this.isConnecting && this.gameMode === 'online') {
          const newMessage = this.getConnectingMessage();
          if (this.connectingMessage !== newMessage) {
            console.log('🔄 [WAITING-ROOM] Actualizando mensaje de matchmaking:', newMessage);
            console.log('🔄 [WAITING-ROOM] Estado actual:', {
              expectedPlayers: this.matchmakingStatus.expectedPlayers,
              currentPlayers: this.matchmakingStatus.currentPlayers,
              playersNeeded: this.matchmakingStatus.playersNeeded
            });
            this.connectingMessage = newMessage;
          }
        }
      }, 500);
    },

    stopMatchmakingMessageUpdater() {
      if (this.matchmakingMessageInterval) {
        console.log('🛑 [WAITING-ROOM] Deteniendo actualizador de mensaje de matchmaking');
        clearInterval(this.matchmakingMessageInterval);
        this.matchmakingMessageInterval = null;
      }
    },
    
    // 🔧 FIX MOBILE: Watchdog DESHABILITADO - El sistema anterior era demasiado agresivo
    // Confiamos en la reconexión automática del socket (configurada en socket.js)
    startMatchmakingWatchdog() {
      console.log('🐕 [WATCHDOG] Watchdog simplificado - Confiando en reconexión automática del socket');
      // Solo inicializar timestamp para referencia, sin verificaciones agresivas
      this.lastMatchmakingUpdate = Date.now();
      this.connectionError = false;
      this.isReconnecting = false;
    },
    
    // 🔧 FIX MOBILE: Detener watchdog (ya no hay interval que detener, pero mantenemos el método para compatibilidad)
    stopMatchmakingWatchdog() {
      if (this.matchmakingWatchdogInterval) {
        clearInterval(this.matchmakingWatchdogInterval);
        this.matchmakingWatchdogInterval = null;
      }
      console.log('🐕 [WATCHDOG] Watchdog detenido');
    },
    
    // 🔧 Actualización periódica de jugadores en línea
    startOnlinePlayersUpdate() {
      // Limpiar intervalo anterior si existe
      if (this.onlinePlayersUpdateInterval) {
        clearInterval(this.onlinePlayersUpdateInterval);
      }
      
      // Actualizar cada 10 segundos
      this.onlinePlayersUpdateInterval = setInterval(async () => {
        // Solo actualizar si no estamos en una partida activa
        if (!this.gameStarted && !this.isConnecting) {
          try {
            await this.$store.dispatch('games/fetchTables');
            const updatedGames = this.$store.state.games.games || [];
            this.mapBackendDataToTables(updatedGames);
          } catch (error) {
            console.warn('⚠️ [ONLINE-PLAYERS] Error actualizando jugadores en línea:', error);
          }
        }
      }, 10000); // Cada 10 segundos
    },
    
    stopOnlinePlayersUpdate() {
      if (this.onlinePlayersUpdateInterval) {
        clearInterval(this.onlinePlayersUpdateInterval);
        this.onlinePlayersUpdateInterval = null;
      }
    },
    
    // 🔧 FIX MOBILE: Marcar que se recibió una actualización (simplificado)
    markMatchmakingUpdate() {
      this.lastMatchmakingUpdate = Date.now();
      // Limpiar errores si hay actualizaciones
      if (this.connectionError) {
        this.connectionError = false;
        console.log('✅ [MATCHMAKING] Error limpiado - recibida actualización');
      }
      if (this.isReconnecting) {
        this.isReconnecting = false;
        console.log('✅ [MATCHMAKING] Reconexión exitosa');
      }
    },
    
    // 🔧 FIX MOBILE: Método de reconexión DESHABILITADO - el socket se reconecta automáticamente
    // Este método ya no se usa porque deshabilitamos el watchdog agresivo
    async attemptReconnection() {
      console.log('⚠️ [WATCHDOG] attemptReconnection() llamado pero está deshabilitado - el socket se reconecta automáticamente');
      // No hacer nada - el socket tiene reconexión automática configurada
    },
    
    // 🔧 FIX MOBILE: Reintentar conexión manualmente (desde botón)
    async retryConnection() {
      console.log('🔄 [RETRY] Reintentando conexión manualmente');
      
      // Resetear estado de error
      this.connectionError = false;
      this.isReconnecting = false;
      
      // Reiniciar timestamp de última actualización
      this.lastMatchmakingUpdate = Date.now();
      
      // Reiniciar watchdog (aunque esté simplificado)
      this.startMatchmakingWatchdog();
      
      // Reiniciar mensaje de conexión
      this.connectingMessage = this.getConnectingMessage();
      
      // 🔧 FIX: Recargar el iframe SOLO cuando el usuario hace clic manualmente en "Reintentar"
      // Esto es seguro porque es una acción explícita del usuario
      if (this.$refs.gameFrame) {
        const currentSrc = this.$refs.gameFrame.src;
        this.$refs.gameFrame.src = '';
        setTimeout(() => {
          this.$refs.gameFrame.src = currentSrc;
          this.lastMatchmakingUpdate = Date.now();
        }, 100);
      }
    },

    // 🔧 FIX: Validar playersRoom contra el tipo de mesa
    validatePlayersRoom(playersRoom, tableContext) {
      if (!tableContext) {
        console.warn('⚠️ [WAITING-ROOM] No hay tableContext para validar playersRoom');
        return playersRoom || 2;
      }
      
      const tableType = tableContext.type;
      const maxPlayers = tableContext.max_players;
      
      console.log('🔍 [WAITING-ROOM] Validando playersRoom:', {
        playersRoomActual: playersRoom,
        tableType: tableType,
        maxPlayers: maxPlayers
      });
      
      // Determinar el valor correcto basado en el tipo de mesa
      let correctPlayersRoom = playersRoom;
      
      if (tableType === 'cpu') {
        correctPlayersRoom = 1;
      } else if (tableType === 'online-2' || tableType === 'invite') {
        correctPlayersRoom = 2;
      } else if (tableType === 'online-4') {
        correctPlayersRoom = 4;
      } else if (maxPlayers) {
        // Usar maxPlayers si está disponible
        correctPlayersRoom = maxPlayers;
      }
      
      // Validar que coincida
      if (playersRoom !== correctPlayersRoom) {
        console.error('❌ [WAITING-ROOM] INCONSISTENCIA DETECTADA:');
        console.error('   playersRoom:', playersRoom);
        console.error('   tableType:', tableType);
        console.error('   maxPlayers:', maxPlayers);
        console.error('   Valor correcto:', correctPlayersRoom);
        console.error('   🔧 CORRIGIENDO automáticamente...');
      }
      
      return correctPlayersRoom;
    },
    
    buildGameUrl(mode) {
      const firstName = this.getFirstName(this.playerName);
      
      // Validar que el mode no sea null
      const gameMode = mode || this.gameMode || 'cpu';
      const tableContext = this.ensureSelectedTableDefaults();
      
      if (!tableContext) {
        console.error('❌ [WAITING-ROOM] No hay información de mesa para construir la URL');
        // 🔧 FIX: Agregar cache buster incluso en el fallback
        return `${GAME_CONFIG.GAME_URL}?mode=${gameMode}&playerName=${firstName}&_cb=${Date.now()}`;
      }
      
      console.log('🎮 [WAITING-ROOM] Construyendo URL con modo:', {
        modeParam: mode,
        thisGameMode: this.gameMode,
        finalMode: gameMode,
        playersRoom: this.playersRoom,
        selectedTable: tableContext
      });
      
      // 🔧 OPTIMIZATION: Usar cache buster solo cuando sea necesario (nueva sesión)
      // No invalidar caché en cada carga - permite que el navegador cachee recursos estáticos
      const sessionId = this.currentSessionId || this.generateSessionId();
      const isNewSession = !this.currentSessionId;
      
      const params = new URLSearchParams({
        mode: gameMode,
        playerName: firstName,
        playersRoom: this.playersRoom.toString(),
        players: GAME_CONFIG.DEFAULT_PLAYERS.toString(),
        gameType: GAME_CONFIG.DEFAULT_GAME_TYPE,
        points: GAME_CONFIG.DEFAULT_POINTS.toString(),
        inviteMode: this.inviteMode ? 'true' : 'false',
        // 🔧 FIX: Agregar sessionId para aislar cada partida
        sessionId: sessionId,
        // 🔧 FIX: Silenciar juego por defecto para gestión externa
        mute: 'true'
      });
      
      // 🔧 OPTIMIZATION: Solo agregar cache buster si es una nueva sesión
      // Esto permite que recursos estáticos se cacheen entre partidas del mismo usuario
      if (isNewSession) {
        const cacheBuster = Date.now();
        params.set('timestamp', cacheBuster.toString());
        params.set('_cb', cacheBuster.toString());
      }
      
      // Añadir datos de la mesa seleccionada si están disponibles
      if (tableContext && tableContext.id) {
        params.append('tableId', tableContext.id.toString());
        params.append('tableName', tableContext.name || 'Mesa Desconocida');
        params.append('winPoints', (tableContext.win_points || 100).toString());
        params.append('winnerPayout', (tableContext.winner_payout || 0).toString());
        params.append('entryPrice', (tableContext.entry_price || 0).toString());
        params.append('tableType', tableContext.type || 'cpu');
        
        // Añadir datos específicos según el tipo de mesa
        if (tableContext.type === 'cpu') {
          params.append('opponentType', 'cpu');
          params.append('difficulty', 'normal');
        } else if (tableContext.type === 'online-2') {
          params.append('opponentType', 'human');
          params.append('maxPlayers', '2');
        } else if (tableContext.type === 'online-4') {
          params.append('opponentType', 'human');
          params.append('maxPlayers', '4');
        } else if (tableContext.type === 'invite') {
          params.append('opponentType', 'human');
          params.append('inviteMode', 'true');
          params.append('maxPlayers', '2');
        }
        
        console.log('🎮 [WAITING-ROOM] Añadiendo datos de mesa a URL:', {
          tableId: tableContext.id,
          tableName: tableContext.name,
          tableType: tableContext.type,
          gameMode,
          winPoints: tableContext.win_points,
          winnerPayout: tableContext.winner_payout,
          entryPrice: tableContext.entry_price,
          playersRoom: this.playersRoom
        });
      } else {
        console.warn('⚠️ [WAITING-ROOM] selectedTable es null o no tiene id, usando valores por defecto');
      }
      
      return `${GAME_CONFIG.GAME_URL}?${params.toString()}`;
    },
    
    onGameLoad() {
      // Enviar datos al juego cuando esté cargado
      // 🔧 FIX: Usar $refs.gameFrame en lugar de this.gameFrame (que nunca se asigna)
      if (this.$refs.gameFrame && this.$refs.gameFrame.contentWindow) {
        const firstName = this.getFirstName(this.playerName);
        const tableContext = this.ensureSelectedTableDefaults();
        
        // Validar que el gameMode no sea null
        const gameMode = this.gameMode || 'cpu';
        
        if (!tableContext) {
          console.error('❌ [WAITING-ROOM] No hay mesa para enviar información al juego');
          return;
        }
        
        // 🔧 FIX: Validar playersRoom antes de enviar
        const validatedPlayersRoom = this.validatePlayersRoom(this.playersRoom, tableContext);
        if (validatedPlayersRoom !== this.playersRoom) {
          console.warn('⚠️ [WAITING-ROOM] playersRoom corregido de', this.playersRoom, 'a', validatedPlayersRoom);
          this.playersRoom = validatedPlayersRoom;
          
          // Actualizar matchmaking status con el valor correcto
          if (this.gameMode === 'online') {
            this.matchmakingStatus.expectedPlayers = validatedPlayersRoom;
            this.matchmakingStatus.playersNeeded = validatedPlayersRoom - 1;
          }
        }
        
        console.log('📤 [WAITING-ROOM] Enviando al iframe - playersRoom validado:', validatedPlayersRoom);
        
        const gameData = {
          mode: gameMode,
          playersRoom: validatedPlayersRoom, // 🔧 FIX: Usar valor validado
          playerName: firstName,
          opponentName: gameMode === 'cpu' ? 'La Banca' : 'Jugador 2',
          players: GAME_CONFIG.DEFAULT_PLAYERS,
          gameType: GAME_CONFIG.DEFAULT_GAME_TYPE,
          points: GAME_CONFIG.DEFAULT_POINTS,
          autoStart: true, // Iniciar automáticamente
          inviteMode: this.inviteMode, // Bandera para modo invitación
          winnerPayout: tableContext?.winner_payout || 0, // Agregar premio al ganador
          // Datos adicionales de la mesa
          tableId: tableContext?.id,
          tableName: tableContext?.name,
          tableType: tableContext?.type,
          winPoints: tableContext?.win_points,
          entryPrice: tableContext?.entry_price,
          // 🔧 FIX: Agregar sessionId para aislar cada partida
          sessionId: this.currentSessionId
        };

        console.log('🎮 [WAITING-ROOM] Enviando datos al juego:', gameData);
        
        // Enviar GAME_INIT para inicializar el socket
        // Esperar un poco para que el juego esté completamente cargado
        // 🔧 FIX: Usar $refs.gameFrame
        setTimeout(() => {
          if (this.$refs.gameFrame && this.$refs.gameFrame.contentWindow) {
            this.$refs.gameFrame.contentWindow.postMessage({
              type: 'GAME_INIT',
              data: gameData
            }, '*');
            console.log('✅ [WAITING-ROOM] GAME_INIT enviado correctamente');
          } else {
            console.error('❌ [WAITING-ROOM] No se pudo enviar GAME_INIT - iframe no disponible');
          }
        }, 1000);
      }
    },
    
    // 🔧 FIX: Generar ID único de sesión para aislar cada partida
    generateSessionId() {
      return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    },
    
    // 🔧 FIX: Reset COMPLETO de todo el estado - llamar ANTES de iniciar cualquier modo
    resetFullState(preservePlayerName = true) {
      console.log('🧹 [WAITING-ROOM] === RESET COMPLETO DE ESTADO ===');
      console.log('🧹 [WAITING-ROOM] Session anterior:', this.currentSessionId);
      
      // Detener todos los intervalos y timeouts activos
      this.stopMatchmakingMessageUpdater();
      
      if (this.iframeLoadTimeout) {
        clearTimeout(this.iframeLoadTimeout);
        this.iframeLoadTimeout = null;
      }
      
      // Guardar nombre si es necesario
      const savedPlayerName = preservePlayerName ? this.playerName : '';
      
      // === RESET DE ESTADO DE JUEGO ===
      this.gameStarted = false;
      this.isConnecting = false;
      this.gameMode = null;
      this.playersRoom = null;
      this.gameUrl = '';
      this.playerName = savedPlayerName;
      
      // === RESET DE ESTADO DE INVITACIÓN (CRÍTICO) ===
      this.inviteMode = false;
      this.roomCode = '';
      this.waitingForFriend = false;
      this.showInviteCode = false;
      this.showInviteChoiceModal = false;
      this.friendRoomCode = '';
      this.pendingRoomCodeToJoin = null;
      this.roomCodeValidated = false;
      this.isInviteGuest = false; // 🔧 FIX: Reset flag de invitado
      
      // === RESET DE ESTADO DE CONFIRMACIÓN ===
      this.showConfirmModal = false;
      this.pendingTable = null;
      this.pendingGameMode = null;
      this.pendingPlayersRoom = null;
      this.isJoiningTable = false;
      
      // === RESET DE MATCHMAKING ===
      this.matchmakingStatus = {
        currentPlayers: 0,
        expectedPlayers: 2,
        playersNeeded: 2
      };
      this.connectingMessage = 'Iniciando juego...';
      
      // === RESET DE ESTADO DE CARGA ===
      this.iframeLoadFailed = false;
      this.iframeLoadRetries = 0;
      this.isGameReady = false; // 🔧 FIX: Resetear flag de juego listo
      
      // === RESET DE OVERLAYS ===
      this.showLoadingOverlay = false;
      this.loadingOverlayMessage = 'Esperando jugadores...';
      
      // === RESET DE FLAGS DE RESULTADO ===
      this.resultSent = false;
      this.isSurrendering = false;
      this.isCancelling = false;
      
      // === RESET DE NOTIFICACIONES ===
      this.showBalanceNotification = false;
      this.balanceNotificationMessage = '';
      
      // === GENERAR NUEVA SESSION ID ===
      this.currentSessionId = this.generateSessionId();
      
      console.log('🧹 [WAITING-ROOM] Nueva session ID:', this.currentSessionId);
      console.log('🧹 [WAITING-ROOM] === RESET COMPLETADO ===');
    },
    
    resetGame() {
      // Llamar al reset completo preservando el nombre del jugador
      this.resetFullState(true);
    },

    // Métodos para modo de invitación
    showInviteChoice() {
      // Mostrar popup de elección para invitados
      this.showInviteChoiceModal = true;
      // Hacer scroll al inicio
      this.$nextTick(() => {
        window.scrollTo(0, 430);
      });
    },

    async createNewRoom() {
      // Crear nueva sala
      this.closeInviteChoiceModal();
      
      // 🔄 RESETEAR FLAG DE RESULTADO ENVIADO para nuevo juego
      this.resultSent = false;
      console.log('🔄 [WAITING-ROOM] Flag resultSent reseteado para nuevo juego (invitación)');
      
      // 🔧 FIX: Primero llamar al backend para descontar saldo y crear matchmaking
      if (!this.selectedTable) {
        console.error('❌ [WAITING-ROOM] No hay mesa seleccionada para crear sala');
        alert('Error: No se pudo identificar la mesa');
        return;
      }
      
      try {
        await this.syncUserBalance();
        const availableBalance = this.$store.state.games.userBalance || 0;

        if (this.selectedTable.entry_price > 0 && availableBalance < this.selectedTable.entry_price) {
          alert('Saldo insuficiente para crear esta sala. Recarga tu cuenta o elige otra mesa.');
          return;
        }

        console.log('🔄 [WAITING-ROOM] HOST: Creando sala en el backend...');
        
        const response = await this.$store.dispatch('games/joinTable', {
          tableId: this.selectedTable.id,
          entryPrice: this.selectedTable.entry_price
        });
        
        if (!response.success) {
          throw new Error(response.message || 'Error al crear sala');
        }
        
        if (this.selectedTable.entry_price > 0 && response.balanceDeducted === false) {
          throw new Error('No se pudo confirmar el descuento del saldo. La sala no se creará.');
        }
        
        console.log('✅ [WAITING-ROOM] HOST: Sala creada en backend:', response);
        
      } catch (error) {
        console.error('❌ [WAITING-ROOM] HOST: Error al crear sala:', error);
        alert('Error al crear sala: ' + error.message);
        return;
      }
      
      // Configurar para modo de invitación
      this.gameMode = 'online';
      this.playersRoom = 2;
      this.inviteMode = true;
      this.isInviteGuest = false; // 🔧 FIX: El HOST no es invitado
      this.isConnecting = true;
      this.connectingMessage = '🏠 Creando sala de invitación...';
      
      // 🔧 FIX: Iniciar actualizador de mensaje de matchmaking
      this.startMatchmakingMessageUpdater();
      // 🔧 FIX MOBILE: Iniciar watchdog para detectar desconexiones
      this.startMatchmakingWatchdog();
      
      // Construir URL del juego con parámetros
      this.gameUrl = this.buildGameUrl('online');
      
      // Simular tiempo de carga y ir directamente al juego
      setTimeout(() => {
        this.gameStarted = true;
        // ⚠️ NO desactivar isConnecting aquí - mantener el overlay hasta que el juego inicie (GAME_STARTED)
        // this.isConnecting = false;
        // No mostrar waitingForFriend - ir directamente al juego
        this.showInviteCode = true; // Mostrar código fuera del iframe
        console.log('✅ [WAITING-ROOM] HOST: Sala creada - Overlay permanece visible hasta GAME_STARTED');
      }, 2000);
    },

    joinExistingRoom() {
      // Mostrar interfaz para unirse a sala existente
      this.closeInviteChoiceModal();
      this.showJoinRoomInterface();
    },

    closeInviteChoiceModal() {
      // 🔧 FIX: Cerrar popup de elección y limpiar estados relacionados
      this.showInviteChoiceModal = false;
      
      // Si el usuario cierra sin elegir, limpiar contexto pendiente
      // PERO mantener el nombre del jugador
      this.inviteMode = false;
      this.pendingTable = null;
      this.pendingGameMode = null;
      this.pendingPlayersRoom = null;
      
      console.log('🔙 [WAITING-ROOM] Modal de invitación cerrado - Estados limpiados');
    },

    showJoinRoomInterface() {
      // Mostrar interfaz para unirse a sala existente
      // SOLO mostrar el popup, NO precargar el juego
      this.waitingForFriend = true;
      this.inviteMode = false;
      this.gameMode = 'online';
      this.playersRoom = 2;
      this.friendRoomCode = ''; // Limpiar el código anterior
      
      console.log('📋 [WAITING-ROOM] Mostrando popup para unirse a sala (sin precargar juego)');
      
      // NO construir URL ni cargar el juego aquí
      // El juego se cargará SOLO cuando el usuario haga clic en "Unirse a la Sala"
    },


    async joinRoomAsFriend() {
      // Validar que el código no esté vacío
      if (!this.friendRoomCode.trim()) {
        alert('Por favor ingresa el código de la sala');
        return;
      }
      
      // Validar que el código tenga 4 dígitos
      if (this.friendRoomCode.length !== 4) {
        alert('El código debe tener 4 dígitos');
        return;
      }
      
      // 🔄 RESETEAR FLAG DE RESULTADO ENVIADO para nuevo juego
      this.resultSent = false;
      console.log('🔄 [WAITING-ROOM] Flag resultSent reseteado para nuevo juego (unirse a sala)');
      
      console.log('🔗 [WAITING-ROOM] Iniciando proceso de unirse con código:', this.friendRoomCode);
      
      // Guardar código para enviar cuando el juego esté listo
      this.pendingRoomCodeToJoin = this.friendRoomCode.trim();
      
      console.log('💾 [WAITING-ROOM] Código guardado, esperando GAME_READY:', this.pendingRoomCodeToJoin);
      
      // 🔧 FIX: Buscar y asignar la mesa de tipo 'invite' para que el invitado tenga los datos necesarios
      const inviteTable = this.groupedTables['invite']?.[0];
      if (inviteTable) {
        this.selectedTable = inviteTable;
        console.log('✅ [WAITING-ROOM] Mesa de invitación asignada para invitado:', inviteTable);
        
        // 🔧 FIX CRÍTICO: Usar el endpoint correcto /join-room en lugar de /join
        try {
          await this.syncUserBalance();
          const availableBalance = this.$store.state.games.userBalance || 0;

          if (inviteTable.entry_price > 0 && availableBalance < inviteTable.entry_price) {
            alert('Saldo insuficiente para unirte a esta sala.');
            return;
          }

          console.log('🔄 [WAITING-ROOM] Uniéndose a sala por código en el backend...');
          const user = getUserData(this.$store, localStorage);
          
          const response = await fetch(`${GAME_CONFIG.API_BASE_URL}/tables/${inviteTable.id}/join-room`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${user.token || ''}`
            },
            body: JSON.stringify({
              room_code: this.pendingRoomCodeToJoin
            })
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            alert(`Error al unirse a la sala: ${errorData.message || 'Error desconocido'}`);
            console.error('❌ [WAITING-ROOM] Error al unirse con código:', errorData);
            return;
          }
          
          const result = await response.json();
          console.log('✅ [WAITING-ROOM] Invitado unido exitosamente a la sala:', result);
        
        if (!this.didBackendConfirmCharge(result, inviteTable.entry_price)) {
          alert('No se pudo confirmar el descuento del saldo. Intenta nuevamente.');
          return;
        }
          
          // Marcar que el código ya fue validado exitosamente
          // A partir de este punto, se debe mostrar el botón "Rendirse" en lugar de "Cancelar"
          this.roomCodeValidated = true;
          console.log('✅ [WAITING-ROOM] Código validado - se mostrará botón "Rendirse"');
          
          // Actualizar saldo si viene en la respuesta
          this.updateBalanceFromPayload(result);
          
        } catch (error) {
          console.error('❌ [WAITING-ROOM] Error al unirse a sala:', error);
          alert('Error al unirse a la sala. Por favor intenta nuevamente.');
          return;
        }
      } else {
        console.warn('⚠️ [WAITING-ROOM] No se encontró mesa de invitación');
        alert('No se encontró la mesa de invitación.');
        return;
      }
      
      // Configurar estado para modo online
      this.gameMode = 'online';
      this.playersRoom = 2;
      this.inviteMode = false; // IMPORTANTE: false porque no estamos creando, estamos uniéndonos
      this.isInviteGuest = true; // 🔧 FIX: Marcar como INVITADO para mensajes específicos
      this.isConnecting = true;
      this.connectingMessage = '🔗 Enlazando con la sala...';
      
      // 🔧 FIX: Iniciar actualizador de mensaje de matchmaking
      this.startMatchmakingMessageUpdater();
      // 🔧 FIX MOBILE: Iniciar watchdog para detectar desconexiones
      this.startMatchmakingWatchdog();
      
      // Construir URL del juego
      this.gameUrl = this.buildGameUrl('online');
      
      console.log('🎮 [WAITING-ROOM] URL del juego construida:', this.gameUrl);
      
      // Limpiar el input
      this.friendRoomCode = '';
      
      // Iniciar carga del iframe - el código se enviará cuando recibamos GAME_READY
      setTimeout(() => {
        this.gameStarted = true;
        // ⚠️ NO desactivar isConnecting aquí - mantener el popup hasta que el juego esté listo
        // this.isConnecting = false; // Se desactivará en handleAllPlayersJoined
        this.waitingForFriend = false;
        this.showInviteCode = false;
        
        console.log('✅ [WAITING-ROOM] Iframe cargado, esperando mensaje GAME_READY del juego...');
        console.log('⏳ [WAITING-ROOM] Popup "Configurando juego..." permanece visible hasta ALL_PLAYERS_JOINED');
      }, 1000);
    },

    handleRoomJoinError(data) {
      // Manejar error al unirse a la sala
      console.error('Error al unirse a la sala:', data);
      
      // Mostrar mensaje de error
      alert('Error: ' + (data.error || 'No se pudo unir a la sala'));
      
      // Resetear estado
      this.isConnecting = false;
      this.waitingForFriend = false;
      this.inviteMode = false;
    },
    
    handleGameMessage(event) {
      // Verificar origen del mensaje
      const allowedOrigins = [
        'http://localhost:3030',
        'http://localhost:8080',
        'https://kubgame.dominues.com',
        'https://dominues.com',
        'https://www.dominues.com'
      ];
      
      if (!allowedOrigins.includes(event.origin)) {
        return;
      }
      
      // Validar que el mensaje tenga la estructura esperada
      if (!event.data || typeof event.data !== 'object') {
        return;
      }
      
      const { type, data, sessionId } = event.data;
      
      // Validar que el mensaje tenga un tipo válido
      if (!type || typeof type !== 'string') {
        return;
      }
      
      // 🔧 FIX: Validar sessionId para evitar mensajes de sesiones anteriores
      // Solo validar si el mensaje tiene sessionId (para compatibilidad)
      if (sessionId && this.currentSessionId && sessionId !== this.currentSessionId) {
        console.warn('⚠️ [WAITING-ROOM] Mensaje ignorado - Session ID no coincide:', {
          messageSessionId: sessionId,
          currentSessionId: this.currentSessionId,
          messageType: type
        });
        return;
      }
      
      switch (type) {
        case 'GAME_END':
          this.handleGameEnd(data);
          break;
        case 'GAME_OVER_CONTINUE':
          this.handleGameOverContinue(data);
          break;
        case 'GAME_OVER_AUTO_REDIRECT':
          this.handleGameOverAutoRedirect(data);
          break;
        case 'DISCONNECT_WIN':
          this.handleDisconnectWin(data);
          break;
        case 'DISCONNECT_LOSE':
          this.handleDisconnectLose(data);
          break;
        case 'ROOM_CODE_GENERATED':
          this.handleRoomCodeGenerated(data);
          break;
        case 'ROOM_JOIN_ERROR':
          this.handleRoomJoinError(data);
          break;
        case 'GAME_ERROR':
          this.handleGameError(data);
          break;
        case 'GAME_LOADED':
          this.handleGameLoaded(data);
          break;
        case 'MATCHMAKING_STATUS':
          this.handleMatchmakingStatus(data);
          break;
        case 'ALL_PLAYERS_JOINED':
        case 'GAME_READY':
        case 'GAME_STARTING':
          // 🔧 FIX MOBILE: Marcar actualización para cualquier evento del juego durante matchmaking
          if (this.isConnecting && this.gameMode === 'online') {
            this.markMatchmakingUpdate();
          }
          this.handleAllPlayersJoined(data, type);
          break;
        case 'GAME_STARTED':
          this.handleGameStarted(data);
          break;
        case 'PLAYER_FORFEIT':
          this.handlePlayerForfeit(data);
          break;
        case 'PLAYER_FAULT_LIMIT':
          this.handlePlayerFaultLimit(data);
          break;
        case 'MATCHMAKING_WARNING':
          // 🔧 FIX MOBILE: Marcar actualización cuando hay advertencias (significa que el servidor está activo)
          this.markMatchmakingUpdate();
          this.handleMatchmakingWarning(data);
          break;
        default:
          // 🔧 FIX MOBILE: Para cualquier otro mensaje durante matchmaking, marcarlo como actualización
          if (this.isConnecting && this.gameMode === 'online' && type && type !== 'ADAPTER_READY') {
            this.markMatchmakingUpdate();
          }
          break;
      }
    },
    
    async handleGameEnd(data) {
      // Manejar fin del juego
      console.log('✅ [WAITING-ROOM] Juego terminado normalmente:', data);
      console.log('✅ [WAITING-ROOM] Datos completos del evento GAME_END:', JSON.stringify(data, null, 2));
      
      // 🚫 PREVENIR ENVÍOS DUPLICADOS
      if (this.resultSent) {
        console.log('⏭️ [WAITING-ROOM] Resultado ya enviado previamente - Ignorando evento duplicado');
        return;
      }
      
      // ⚠️ VERIFICAR SI ES UNA DESCONEXIÓN
      const isDisconnect = data.disconnected || data.opponentDisconnected || data.playerDisconnected;
      const isLoser = data.isWinner === false;
      
      // 🚨 SI ES UNA DESCONEXIÓN Y EL JUGADOR ACTUAL PERDIÓ → NO ENVIAR RESULTADO
      if (isDisconnect && isLoser) {
        console.log('⏭️ [WAITING-ROOM] Jugador perdió por desconexión - NO enviar resultado (solo el ganador lo hará)');
        console.log('⏭️ [WAITING-ROOM] Datos de desconexión:', {
          disconnected: data.disconnected,
          opponentDisconnected: data.opponentDisconnected,
          playerDisconnected: data.playerDisconnected,
          isWinner: data.isWinner
        });
        
        // Mostrar mensaje de derrota
        this.showGameResultMessage({
          playerName: data.playerName,
          opponentName: data.opponentName,
          playerScore: data.playerScore || 0,
          opponentScore: data.opponentScore || 0,
          isWinner: false,
          gameData: data
        });
        
        // Redirigir al dashboard
        setTimeout(() => {
          console.log('🏠 Redirigiendo al dashboard después de derrota por desconexión...');
          window.location.href = GAME_CONFIG.DASHBOARD_URL;
        }, 3000);
        
        return; // ← IMPORTANTE: Salir sin enviar resultado
      }
      
      // 🔧 FIX: Construir gameData completo con toda la información del juego
      // Asegurar que roomCode esté disponible (del estado local o de los datos recibidos)
      const roomCode = this.roomCode || data.roomCode || (data.gameData && data.gameData.roomCode);
      
      const completeGameData = {
        playerName: data.playerName,
        opponentName: data.opponentName,
        playerScore: data.playerScore,
        opponentScore: data.opponentScore,
        isWinner: data.isWinner,
        winner: data.winner,
        gameMode: data.gameMode || this.gameMode,
        roomCode: roomCode, // 🔧 FIX: Código de sala para identificar el emparejamiento
        timestamp: new Date().toISOString(),
        disconnected: isDisconnect, // Marcar si es desconexión
        opponentDisconnected: data.opponentDisconnected || false,
        disconnectReason: data.disconnectReason || null,
        surrendered: data.surrendered || false, // 🔧 FIX: Incluir flag de rendición
        opponentSurrendered: data.opponentSurrendered || false, // 🔧 FIX: Incluir flag de oponente rendido
        // Incluir cualquier dato adicional que venga
        ...(data.gameData || {})
      };
      
      console.log('🔑 [WAITING-ROOM] roomCode usado en gameData:', roomCode);
      
      const gameResult = {
        playerName: data.playerName,
        opponentName: data.opponentName,
        playerScore: data.playerScore,
        opponentScore: data.opponentScore,
        isWinner: data.isWinner,
        winner: data.winner,
        gameMode: data.gameMode || this.gameMode,
        roomCode: roomCode, // 🔧 FIX: Incluir roomCode en gameResult también
        surrendered: data.surrendered || false, // 🔧 FIX: Incluir flag de rendición
        opponentSurrendered: data.opponentSurrendered || false, // 🔧 FIX: Incluir flag de oponente rendido
        gameData: completeGameData
      };
      
      console.log('✅ [WAITING-ROOM] Game result processed:', gameResult);
      console.log('✅ [WAITING-ROOM] Enviando resultado al backend');
      console.log('🔑 [WAITING-ROOM] roomCode en gameResult:', roomCode);
      console.log('🏳️ [WAITING-ROOM] surrendered:', gameResult.surrendered, 'opponentSurrendered:', gameResult.opponentSurrendered);
      
      // 🔒 MARCAR FLAG PARA PREVENIR DUPLICADOS
      this.resultSent = true;
      
      // 🔧 FIX: Resetear isSurrendering cuando se procesa el resultado
      this.isSurrendering = false;
      
      // Enviar datos al backend de Laravel (solo si no es perdedor por desconexión)
      await this.sendGameResultToBackend(gameResult);
      
      // Emitir evento al componente padre
      this.$emit('game-ended', gameResult);
    },
    
    handleGameOverContinue(data) {
      // Manejar clic manual en CONTINUE desde el juego
      console.log('GAME_OVER_CONTINUE recibido (clic manual):', data);
      
      // Mostrar mensaje de resultado si tenemos datos del juego
      if (data.gameResult) {
        this.showGameResultMessage(data.gameResult);
      }
      
      // Redirigir al dashboard después de 1 segundo
      console.log('Redirigiendo al dashboard (clic manual)...');
      setTimeout(() => {
        window.location.href = GAME_CONFIG.DASHBOARD_URL;
      }, 1000);
    },
    
    handleGameOverAutoRedirect(data) {
      // Manejar auto-redirect después de 2 segundos
      console.log('GAME_OVER_AUTO_REDIRECT recibido (auto-redirect):', data);
      
      // Mostrar mensaje de resultado si tenemos datos del juego
      if (data.gameResult) {
        this.showGameResultMessage(data.gameResult);
      }
      
      // Redirigir al dashboard inmediatamente (ya pasaron 2 segundos en el juego)
      console.log('Auto-redirigiendo al dashboard...');
      setTimeout(() => {
        window.location.href = GAME_CONFIG.DASHBOARD_URL;
      }, 500); // Redirigir rápidamente
    },
    
    async handleDisconnectWin(data) {
      // Manejar victoria por desconexión del oponente
      console.log('🏆 [WAITING-ROOM] Victoria por desconexión del oponente:', data);
      
      // ⚠️ IMPORTANTE: NO enviar resultado aquí
      // El resultado ya fue enviado por handleGameEnd() y el backend creó la derrota automáticamente
      console.log('⏭️ [WAITING-ROOM] Victoria por desconexión - Resultado ya procesado en handleGameEnd()');
      
      // Crear mensaje especial indicando que el oponente se salió
      const disconnectMessage = `Tu oponente ${data.disconnectedPlayer} se salió de la partida`;
      console.log('Disconnect WIN message:', disconnectMessage);
      
      // Mostrar mensaje de resultado especial
      this.showDisconnectResultMessage(data, disconnectMessage);
      
      // ❌ NO ENVIAR AL BACKEND - Ya fue enviado por handleGameEnd()
      console.log('⏭️ [WAITING-ROOM] Omitiendo envío al backend (ya procesado)');
      
      // Redirigir al dashboard después de mostrar el mensaje
      setTimeout(() => {
        console.log('🏠 Redirigiendo al dashboard después de victoria por desconexión...');
        window.location.href = GAME_CONFIG.DASHBOARD_URL;
      }, 4000); // 4 segundos para mostrar el mensaje
    },
    
    async handleDisconnectLose(data) {
      // Manejar derrota por desconexión del jugador actual
      console.log('🚨 [WAITING-ROOM] Derrota por desconexión:', data);
      console.log('🚨 [WAITING-ROOM] Datos completos del evento DISCONNECT_LOSE:', JSON.stringify(data, null, 2));
      
      // ⚠️ IMPORTANTE: El jugador que se desconectó NO debe enviar resultado al backend
      // Solo el ganador enviará el resultado y el backend creará automáticamente la derrota del oponente
      console.log('⏭️ [WAITING-ROOM] Jugador desconectado - NO enviar resultado (el ganador lo hará)');
      
      // Crear mensaje especial para derrota por desconexión
      const disconnectMessage = `Perdiste por desconexión - ${data.winner} ganó`;
      console.log('Disconnect lose message:', disconnectMessage);
      
      // Mostrar mensaje de derrota
      this.showDisconnectLoseMessage(data);
      
      // ❌ NO ENVIAR AL BACKEND - El ganador se encargará
      console.log('⏭️ [WAITING-ROOM] Omitiendo envío al backend (el ganador registrará ambos resultados)');
      
      // Redirigir al dashboard después de mostrar el mensaje
      setTimeout(() => {
        console.log('🏠 Redirigiendo al dashboard después de desconexión...');
        window.location.href = GAME_CONFIG.DASHBOARD_URL;
      }, 3000); // 3 segundos para mostrar el mensaje
    },
    
    async handleRoomCodeGenerated(data) {
      // Manejar código de invitación generado
      // Actualizar el código en el estado local
      this.roomCode = data.roomCode;
      
      console.log('🔑 [WAITING-ROOM] Código de sala generado:', data.roomCode);
      
      // 🔧 FIX: Actualizar mensaje para el HOST
      if (this.inviteMode && !this.isInviteGuest) {
        this.connectingMessage = '✅ Sala lista - Esperando a tu amigo...';
      }
      
      // 🔧 FIX CRÍTICO: Enviar el room_code al backend para actualizarlo
      const safeTable = this.ensureSelectedTableDefaults();
      if (safeTable) {
        try {
          const user = getUserData(this.$store, localStorage);
          const response = await fetch(`${GAME_CONFIG.API_BASE_URL}/tables/${safeTable.id}/update-room-code`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${user.token || ''}`
            },
            body: JSON.stringify({
              room_code: data.roomCode
            })
          });
          
          if (response.ok) {
            const result = await response.json();
            console.log('✅ [WAITING-ROOM] room_code actualizado en backend:', result);
          } else {
            console.error('❌ [WAITING-ROOM] Error al actualizar room_code:', response.status);
          }
        } catch (error) {
          console.error('❌ [WAITING-ROOM] Error enviando room_code al backend:', error);
        }
      }
      
      // Si estamos en modo invitación, mostrar la interfaz de invitación fuera del iframe
      if (this.inviteMode) {
        this.showInviteCode = true; // Mostrar interfaz de invitación fuera del iframe
      } else {
        // Mostrar modal con código de invitación (para otros casos)
        this.showInviteCodeModal(data.roomCode);
      }
    },
    
    joinRoomWithCode(roomCode) {
      console.log('🔗 [WAITING-ROOM] Enviando JOIN_ROOM_WITH_CODE al juego:', roomCode);
      
      // Enviar código al juego para unirse
      if (this.$refs.gameFrame && this.$refs.gameFrame.contentWindow) {
        this.$refs.gameFrame.contentWindow.postMessage({
          type: 'JOIN_ROOM_WITH_CODE',
          data: { roomCode: roomCode }
        }, '*');
        
        console.log('✅ [WAITING-ROOM] Mensaje JOIN_ROOM_WITH_CODE enviado');
      } else {
        console.error('❌ [WAITING-ROOM] gameFrame no disponible');
      }
    },
    
    async sendGameResultToBackend(gameData) {
      try {
        // Obtener datos del usuario y mesa
        const user = getUserData(this.$store, localStorage);
        
        // 🔧 FIX: Si no hay selectedTable (modo invitado), intentar obtenerla de groupedTables
        if (!this.selectedTable && this.gameMode === 'online') {
          const inviteTable = this.groupedTables['invite']?.[0];
          if (inviteTable) {
            this.selectedTable = inviteTable;
            console.log('✅ [WAITING-ROOM] Mesa recuperada desde groupedTables para enviar resultado:', inviteTable);
          }
        }

        const safeTable = this.ensureSelectedTableDefaults();
        
        // Usar el tableId de la mesa seleccionada o fallback a URL
        const tableId = safeTable?.id || getTableId();
        
        // 🔧 FIX: Detectar si es juego multi-jugador (4 jugadores)
        const isMultiplayer = this.playersRoom === 4 || safeTable?.type === 'online-4';
        
        console.log('🎮 [WAITING-ROOM] Enviando resultado con datos:', {
          selectedTable: safeTable,
          tableId: tableId,
          gameMode: this.gameMode,
          playersRoom: this.playersRoom,
          isMultiplayer: isMultiplayer,
          gameData: gameData
        });
        
        // Calcular montos usando la configuración de la mesa o valores por defecto
        const entryPrice = safeTable?.entry_price ?? GAME_CONFIG.DEFAULT_BET_AMOUNT;
        const winnerPayout = safeTable?.winner_payout ?? (entryPrice * 2);
        const betAmounts = calculateBetAmounts(entryPrice, gameData.isWinner, winnerPayout);
        
        // 🔧 FIX: Construir datos base
        const baseResultData = {
          tableId: tableId,
          userId: user.id,
          betAmount: betAmounts.betAmount,
          totalPot: betAmounts.totalPot,
          houseFee: betAmounts.houseFee,
          winnerAmount: betAmounts.winnerAmount,
          isWinner: gameData.isWinner,
          gameData: gameData.gameData || gameData,
          playerName: gameData.playerName,
          roomCode: gameData.roomCode || this.roomCode || (gameData.gameData && gameData.gameData.roomCode),
          tableName: safeTable?.name || 'Mesa Online',
          tableType: safeTable?.type || 'invite',
          gameMode: this.gameMode,
          entryPrice: safeTable?.entry_price ?? 0,
          winnerPayout: safeTable?.winner_payout ?? 0
        };
        
        // 🔧 FIX: Para juegos de 4 jugadores, agregar datos multi-jugador
        let resultData;
        if (isMultiplayer) {
          console.log('🎮 [WAITING-ROOM] MODO MULTI-JUGADOR detectado - Enviando datos completos');
          
          // Extraer datos de todos los jugadores desde gameData
          const allPlayerNames = gameData.gameData?.playerNames || [];
          const allScores = gameData.gameData?.scores || [];
          const winner = gameData.winner || gameData.gameData?.winner;
          
          resultData = {
            ...baseResultData,
            // 🔧 FIX: Flags para identificar juego multi-jugador
            isMultiplayer: true,
            playersCount: 4,
            // 🔧 FIX: Datos de todos los jugadores
            allPlayers: allPlayerNames,
            allScores: allScores,
            winner: winner,
            // Para compatibilidad con backend actual
            opponentName: winner, // El ganador como "oponente principal"
            playerScore: allScores[allPlayerNames.indexOf(gameData.playerName)] || 0,
            opponentScore: allScores[allPlayerNames.indexOf(winner)] || 0
          };
          
          console.log('📊 [WAITING-ROOM] Datos multi-jugador preparados:', {
            allPlayers: allPlayerNames,
            allScores: allScores,
            winner: winner,
            currentPlayer: gameData.playerName,
            isWinner: gameData.isWinner
          });
        } else {
          // Juego 1v1 normal (2 jugadores)
          resultData = {
            ...baseResultData,
            opponentName: gameData.opponentName,
            playerScore: gameData.playerScore,
            opponentScore: gameData.opponentScore,
            isMultiplayer: false,
            playersCount: 2
          };
        }
        
        console.log('Enviando resultado al backend:', resultData);
        
        // Enviar al backend de Laravel
        const response = await fetch(`${GAME_CONFIG.API_BASE_URL}/game/result`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${user.token || ''}`
          },
          body: JSON.stringify(resultData)
        });
        
        if (response.ok) {
          const result = await response.json();
          console.log('Resultado guardado exitosamente:', result);
          
          // Mostrar mensaje de resultado
          this.showGameResultMessage(gameData);
          
          // Redirigir al dashboard después de un delay
          setTimeout(() => {
            window.location.href = GAME_CONFIG.DASHBOARD_URL;
          }, GAME_CONFIG.REDIRECT_DELAY);
          
        } else if (response.status === 401) {
          console.error('Error 401: No autorizado. Token de autenticación inválido o faltante.');
          throw new Error('Error de autenticación: Token inválido o faltante');
        } else {
          const errorText = await response.text();
          console.error('Error del servidor:', response.status, errorText);
          throw new Error(`Error del servidor: ${response.status} - ${errorText}`);
        }
        
      } catch (error) {
        console.error('Error enviando resultado al backend:', error);
        
        // 🔧 FIX: Aunque falle el backend, mostrar el resultado al usuario
        console.log('⚠️ [WAITING-ROOM] Mostrando resultado a pesar del error del backend');
        this.showGameResultMessage(gameData);
        
        // Redirigir al dashboard de todas formas
        setTimeout(() => {
          console.log('🏠 [WAITING-ROOM] Redirigiendo al dashboard a pesar del error');
          window.location.href = GAME_CONFIG.DASHBOARD_URL;
        }, GAME_CONFIG.REDIRECT_DELAY);
        
        this.$emit('game-error', { message: GAME_CONFIG.MESSAGES.ERROR, error });
      }
    },
    
    getUserData() {
      // Obtener datos del usuario desde el store o localStorage
      let user = null;
      
      // Intentar obtener desde Vuex store
      if (this.$store && this.$store.state.user) {
        user = this.$store.state.user;
        console.log('Usuario obtenido desde store:', user);
      }
      
      // Intentar obtener desde localStorage
      if (!user) {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          try {
            user = JSON.parse(storedUser);
            console.log('Usuario obtenido desde localStorage:', user);
          } catch (e) {
            console.error('Error parsing stored user:', e);
          }
        }
      }
      
      // Intentar obtener token desde localStorage directamente
      if (!user || !user.token) {
        const token = localStorage.getItem('token') || localStorage.getItem('auth_token');
        if (token) {
          user = user || {};
          user.token = token;
          console.log('Token obtenido desde localStorage:', token);
        }
      }
      
      // Fallback para desarrollo
      if (!user) {
        user = {
          id: 1,
          name: this.getFirstName(this.playerName),
          token: 'dev-token'
        };
        console.log('Usando datos de fallback:', user);
      }
      
      console.log('Datos de usuario finales:', user);
      return user;
    },
    
    getTableId() {
      // Obtener ID de la mesa desde la URL o props
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('tableId') || 1; // Fallback a mesa 1
    },
    
    showGameResultMessage(gameData) {
      console.log('🎮 [WAITING-ROOM] Mostrando mensaje de resultado:', {
        gameData: gameData,
        isWinner: gameData.isWinner,
        playerName: gameData.playerName,
        playersRoom: this.playersRoom
      });
      
      // 🔧 FIX: Detectar si es juego multi-jugador
      const isMultiplayer = this.playersRoom === 4 || (gameData.gameData && gameData.gameData.playerNames && gameData.gameData.playerNames.length > 2);
      
      let messageContent;
      
      if (isMultiplayer) {
        // 🔧 FIX: Mostrar resultados para juego de 4 jugadores
        console.log('🎮 [WAITING-ROOM] Mostrando resultados MULTI-JUGADOR');
        
        const allPlayers = gameData.gameData?.playerNames || [];
        const allScores = gameData.gameData?.scores || [];
        const winner = gameData.winner || gameData.gameData?.winner;
        
        // Crear array de jugadores con scores
        const players = allPlayers.map((name, index) => ({
          name,
          score: allScores[index] || 0,
          isWinner: name === winner,
          isCurrentPlayer: name === gameData.playerName
        }));
        
        // Ordenar por score (descendente)
        players.sort((a, b) => b.score - a.score);
        
        // Generar tabla de resultados
        const playersTable = players.map((player, index) => `
          <tr style="
            background: ${player.isCurrentPlayer ? 'rgba(76, 175, 80, 0.1)' : 'transparent'};
            border-bottom: 1px solid #e0e0e0;
          ">
            <td style="padding: 10px; text-align: left;">
              <strong style="color: ${player.isWinner ? '#4CAF50' : '#333'};">
                ${index + 1}. ${player.name}
                ${player.isWinner ? '👑' : ''}
                ${player.isCurrentPlayer ? ' (Tú)' : ''}
              </strong>
            </td>
            <td style="padding: 10px; text-align: right; font-size: 18px; font-weight: bold; color: ${player.isWinner ? '#4CAF50' : '#666'};">
              ${player.score}
            </td>
          </tr>
        `).join('');
        
        messageContent = `
          <h2 style="color: ${gameData.isWinner ? '#4CAF50' : '#f44336'}; margin-bottom: 15px; font-size: 28px; font-weight: bold;">
            ${gameData.isWinner ? GAME_CONFIG.MESSAGES.WIN : GAME_CONFIG.MESSAGES.LOSE}
          </h2>
          <p style="font-size: 18px; margin-bottom: 20px; color: ${gameData.isWinner ? '#2e7d32' : '#c62828'}; font-weight: 500;">
            ${gameData.isWinner ? GAME_CONFIG.MESSAGES.WIN_SUBTITLE : GAME_CONFIG.MESSAGES.LOSE_SUBTITLE}
          </p>
          <div style="margin: 20px 0;">
            <h3 style="color: #666; font-size: 14px; margin-bottom: 10px; text-transform: uppercase;">
              Resultados Finales
            </h3>
            <table style="width: 100%; border-collapse: collapse;">
              ${playersTable}
            </table>
          </div>
        `;
      } else {
        // Juego 1v1 normal (2 jugadores)
        messageContent = `
          <h2 style="color: ${gameData.isWinner ? '#4CAF50' : '#f44336'}; margin-bottom: 15px; font-size: 28px; font-weight: bold;">
            ${gameData.isWinner ? GAME_CONFIG.MESSAGES.WIN : GAME_CONFIG.MESSAGES.LOSE}
          </h2>
          <p style="font-size: 18px; margin-bottom: 20px; color: ${gameData.isWinner ? '#2e7d32' : '#c62828'}; font-weight: 500;">
            ${gameData.isWinner ? GAME_CONFIG.MESSAGES.WIN_SUBTITLE : GAME_CONFIG.MESSAGES.LOSE_SUBTITLE}
          </p>
        `;
      }
      
      // Determinar tiempo de redirección según resultado
      const redirectDelay = gameData.isWinner ? GAME_CONFIG.REDIRECT_DELAY_WIN : GAME_CONFIG.REDIRECT_DELAY;
      const redirectSeconds = Math.floor(redirectDelay / 1000);
      const redirectMessage = gameData.isWinner ? GAME_CONFIG.MESSAGES.REDIRECTING_WIN : GAME_CONFIG.MESSAGES.REDIRECTING;
      
      // Crear modal de resultado
      const modal = document.createElement('div');
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        font-family: Arial, sans-serif;
      `;
      
      // Canvas para confeti (solo para ganadores)
      const confettiCanvas = gameData.isWinner ? `
        <canvas id="confetti-canvas" style="
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 10001;
        "></canvas>
      ` : '';
      
      modal.innerHTML = `
        ${confettiCanvas}
        <div style="
          background: white;
          padding: 30px;
          border-radius: 15px;
          text-align: center;
          max-width: 500px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          position: relative;
          z-index: 10002;
        ">
          ${messageContent}
          <p style="font-size: 14px; color: #666; margin-top: 20px;">${redirectMessage}</p>
          <div style="margin-top: 20px;">
            <div style="
              width: 100%;
              height: 4px;
              background: #e0e0e0;
              border-radius: 2px;
              overflow: hidden;
            ">
              <div style="
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, #4CAF50, #8BC34A);
                animation: progress ${redirectSeconds}s linear forwards;
              "></div>
            </div>
          </div>
        </div>
        <style>
          @keyframes progress {
            from { transform: translateX(-100%); }
            to { transform: translateX(0%); }
          }
        </style>
      `;
      
      document.body.appendChild(modal);
      
      // Agregar efecto de confeti para ganadores
      if (gameData.isWinner) {
        this.startConfetti();
      }
      
      // Remover modal después del delay configurado
      setTimeout(() => {
        if (modal.parentNode) {
          modal.parentNode.removeChild(modal);
        }
        if (gameData.isWinner) {
          this.stopConfetti();
        }
      }, redirectDelay);
    },
    
    showDisconnectResultMessage(gameData, disconnectMessage) {
      // Mostrar mensaje especial de victoria por desconexión
      const modal = document.createElement('div');
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        font-family: Arial, sans-serif;
        animation: fadeIn 0.3s ease-in;
      `;
      
      modal.innerHTML = `
        <div style="
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px;
          border-radius: 20px;
          text-align: center;
          max-width: 500px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          border: 3px solid #FFD700;
          animation: scaleIn 0.3s ease-out;
        ">
          <div style="
            font-size: 80px;
            margin-bottom: 20px;
            animation: bounce 1s ease-in-out infinite;
          ">
            🏆
          </div>
          <h2 style="
            color: #FFD700;
            margin-bottom: 15px;
            font-size: 32px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            font-weight: bold;
          ">
            ${GAME_CONFIG.MESSAGES.WIN}
          </h2>
          <div style="
            background: rgba(255,255,255,0.2);
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            border: 1px solid rgba(255,255,255,0.3);
          ">
            <p style="
              font-size: 20px;
              margin-bottom: 10px;
              color: white;
              font-weight: bold;
              line-height: 1.5;
            ">
              ${disconnectMessage}
            </p>
            <p style="
              font-size: 18px;
              color: rgba(255,255,255,0.95);
              margin-top: 15px;
            ">
              ${GAME_CONFIG.MESSAGES.WIN_SUBTITLE}
            </p>
          </div>
          <p style="
            font-size: 14px;
            color: rgba(255,255,255,0.8);
            margin-bottom: 15px;
          ">
            Redirigiendo al dashboard...
          </p>
          <div style="margin-top: 20px;">
            <div style="
              width: 100%;
              height: 6px;
              background: rgba(255,255,255,0.3);
              border-radius: 3px;
              overflow: hidden;
            ">
              <div style="
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, #FFD700, #FFA500);
                animation: progress 4s linear forwards;
                box-shadow: 0 0 10px rgba(255,215,0,0.5);
              "></div>
            </div>
          </div>
        </div>
        <style>
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scaleIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          @keyframes progress {
            from { transform: translateX(-100%); }
            to { transform: translateX(0%); }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        </style>
      `;
      
      document.body.appendChild(modal);
      
      // Remover modal después de 4 segundos
      setTimeout(() => {
        if (modal.parentNode) {
          modal.parentNode.removeChild(modal);
        }
      }, 4000);
    },
    
    showDisconnectLoseMessage(gameData) {
      // Mostrar mensaje especial de derrota por desconexión
      const modal = document.createElement('div');
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        font-family: Arial, sans-serif;
        animation: fadeIn 0.3s ease-in;
      `;
      
      modal.innerHTML = `
        <div style="
          background: linear-gradient(135deg, #f44336 0%, #e91e63 100%);
          padding: 40px;
          border-radius: 20px;
          text-align: center;
          max-width: 500px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          border: 3px solid #ff5252;
          animation: scaleIn 0.3s ease-out;
        ">
          <div style="
            font-size: 80px;
            margin-bottom: 20px;
          ">
            ⚠️
          </div>
          <h2 style="
            color: white;
            margin-bottom: 15px;
            font-size: 32px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            font-weight: bold;
          ">
            ${GAME_CONFIG.MESSAGES.LOSE}
          </h2>
          <div style="
            background: rgba(255,255,255,0.2);
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            border: 1px solid rgba(255,255,255,0.3);
          ">
            <p style="
              font-size: 20px;
              margin-bottom: 10px;
              color: white;
              font-weight: bold;
              line-height: 1.5;
            ">
              Se perdió la conexión
            </p>
            <p style="
              font-size: 18px;
              color: rgba(255,255,255,0.95);
              margin-top: 15px;
            ">
              ${GAME_CONFIG.MESSAGES.LOSE_SUBTITLE}
            </p>
            <p style="
              font-size: 14px;
              color: rgba(255,255,255,0.8);
              margin-top: 10px;
            ">
              Razón: ${gameData.disconnectReason || 'Tu conexión se perdió'}
            </p>
          </div>
          <p style="
            font-size: 14px;
            color: rgba(255,255,255,0.8);
            margin-bottom: 15px;
          ">
            Redirigiendo al dashboard...
          </p>
          <div style="margin-top: 20px;">
            <div style="
              width: 100%;
              height: 6px;
              background: rgba(255,255,255,0.3);
              border-radius: 3px;
              overflow: hidden;
            ">
              <div style="
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, #ff5252, #ff1744);
                animation: progress 4s linear forwards;
                box-shadow: 0 0 10px rgba(255,82,82,0.5);
              "></div>
            </div>
          </div>
        </div>
        <style>
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scaleIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          @keyframes progress {
            from { transform: translateX(-100%); }
            to { transform: translateX(0%); }
          }
        </style>
      `;
      
      document.body.appendChild(modal);
      
      // Remover modal después de 4 segundos
      setTimeout(() => {
        if (modal.parentNode) {
          modal.parentNode.removeChild(modal);
        }
      }, 4000);
    },
    
    showInviteCodeModal(roomCode) {
      // Mostrar modal con código de invitación
      const modal = document.createElement('div');
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        font-family: Arial, sans-serif;
      `;
      
      modal.innerHTML = `
        <div id="modalContent" style="
          background: white;
          padding: 40px;
          border-radius: 20px;
          text-align: center;
          max-width: 500px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.3);
          position: relative;
        ">
          <button id="closeModalBtn" style="
            position: absolute;
            top: 10px;
            right: 10px;
            background: #f44336;
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 24px;
            line-height: 40px;
            cursor: pointer;
            text-align: center;
            box-shadow: 0 4px 15px rgba(244, 67, 54, 0.4);
            transition: all 0.3s ease;
            z-index: 10;
            font-weight: bold;
          " onmouseover="this.style.transform='rotate(90deg) scale(1.1)'; this.style.background='#d32f2f'" onmouseout="this.style.transform='rotate(0deg) scale(1)'; this.style.background='#f44336'">
            ✕
          </button>
          
          <h2 style="color: #4CAF50; margin-bottom: 20px; font-size: 28px;">
            🎮 ¡SALA CREADA! 🎮
          </h2>
          <p style="font-size: 18px; margin-bottom: 25px; color: #333;">
            Comparte este código con tus amigos para que se unan:
          </p>
          
          <div style="
            background: linear-gradient(135deg, #4CAF50, #45a049);
            color: white;
            padding: 20px;
            border-radius: 15px;
            margin: 20px 0;
            font-size: 36px;
            font-weight: bold;
            letter-spacing: 8px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            box-shadow: 0 8px 20px rgba(76, 175, 80, 0.3);
          ">
            ${roomCode}
          </div>
          
          <div style="margin: 25px 0;">
            <button id="copyCodeBtn" style="
              background: linear-gradient(135deg, #2196F3, #1976D2);
              color: white;
              border: none;
              padding: 15px 30px;
              border-radius: 25px;
              font-size: 16px;
              font-weight: bold;
              cursor: pointer;
              margin: 0 10px;
              box-shadow: 0 4px 15px rgba(33, 150, 243, 0.3);
              transition: all 0.3s ease;
            " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
              📋 Copiar Código
            </button>
            
            <button id="shareCodeBtn" style="
              background: linear-gradient(135deg, #FF9800, #F57C00);
              color: white;
              border: none;
              padding: 15px 30px;
              border-radius: 25px;
              font-size: 16px;
              font-weight: bold;
              cursor: pointer;
              margin: 0 10px;
              box-shadow: 0 4px 15px rgba(255, 152, 0, 0.3);
              transition: all 0.3s ease;
            " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
              📤 Compartir
            </button>
          </div>
          
          <p style="font-size: 14px; color: #666; margin-top: 20px;">
            Esperando a que se unan otros jugadores...
          </p>
        </div>
      `;
      
      document.body.appendChild(modal);
      
      // Agregar funcionalidad de copiar código
      const copyBtn = modal.querySelector('#copyCodeBtn');
      const shareBtn = modal.querySelector('#shareCodeBtn');
      
      copyBtn.addEventListener('click', async () => {
        try {
          // Método 1: Intentar con clipboard API
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(roomCode);
            console.log('✅ Código copiado con clipboard API:', roomCode);
          } else {
            // Método 2: Fallback usando textarea temporal
            const textarea = document.createElement('textarea');
            textarea.value = roomCode;
            textarea.style.position = 'fixed';
            textarea.style.left = '-9999px';
            textarea.style.top = '0';
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            
            try {
              const successful = document.execCommand('copy');
              if (successful) {
                console.log('✅ Código copiado con execCommand:', roomCode);
              } else {
                throw new Error('execCommand falló');
              }
            } finally {
              document.body.removeChild(textarea);
            }
          }
          
          // Feedback visual
          copyBtn.textContent = '✅ ¡Copiado!';
          copyBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
          setTimeout(() => {
            copyBtn.textContent = '📋 Copiar Código';
            copyBtn.style.background = 'linear-gradient(135deg, #2196F3, #1976D2)';
          }, 2000);
          
        } catch (err) {
          console.error('❌ Error al copiar:', err);
          // Mostrar código para que el usuario lo copie manualmente
          alert(`No se pudo copiar automáticamente. Código: ${roomCode}`);
        }
      });
      
      shareBtn.addEventListener('click', async () => {
        const shareText = `¡Únete a mi partida de dominó! Código: ${roomCode}`;
        
        try {
        if (navigator.share) {
            // Intentar compartir nativamente
            await navigator.share({
            title: 'Invitación a partida de dominó',
            text: shareText
          });
            console.log('✅ Compartido exitosamente');
        } else {
          // Fallback: copiar al portapapeles
            if (navigator.clipboard && navigator.clipboard.writeText) {
              await navigator.clipboard.writeText(shareText);
              console.log('✅ Texto compartido copiado con clipboard API');
            } else {
              // Fallback usando textarea temporal
              const textarea = document.createElement('textarea');
              textarea.value = shareText;
              textarea.style.position = 'fixed';
              textarea.style.left = '-9999px';
              textarea.style.top = '0';
              document.body.appendChild(textarea);
              textarea.focus();
              textarea.select();
              
              try {
                const successful = document.execCommand('copy');
                if (successful) {
                  console.log('✅ Texto compartido copiado con execCommand');
                } else {
                  throw new Error('execCommand falló');
                }
              } finally {
                document.body.removeChild(textarea);
              }
            }
            
            // Feedback visual
            shareBtn.textContent = '✅ ¡Copiado!';
            shareBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            setTimeout(() => {
              shareBtn.textContent = '📤 Compartir';
              shareBtn.style.background = 'linear-gradient(135deg, #FF9800, #F57C00)';
            }, 2000);
          }
        } catch (err) {
          console.error('❌ Error al compartir:', err);
          alert(`No se pudo compartir. Código: ${roomCode}`);
        }
      });
      
      // Agregar funcionalidad del botón de cerrar
      const closeBtn = modal.querySelector('#closeModalBtn');
      const closeModalFunc = () => {
        if (modal.parentNode) {
          modal.parentNode.removeChild(modal);
          console.log('✅ Modal cerrado');
          
          // NO activar overlay aquí - dejar que el creador pueda clickear START
          console.log('⏳ Esperando a que el creador presione START...');
        }
      };
      
      closeBtn.addEventListener('click', closeModalFunc);
      
      // También cerrar al hacer click fuera del modal
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModalFunc();
        }
      });
      
      // NO cerrar automáticamente - dejar que el usuario lo cierre cuando esté listo
      // Esto permite al creador copiar/compartir el código sin presión de tiempo
      console.log('💡 Modal permanecerá abierto hasta que el usuario lo cierre');
    },
    
    handleGameLoaded(data) {
      // Manejar cuando el juego está cargado y listo
      console.log('🎮 [WAITING-ROOM] Juego cargado:', data);
      
      // 🔧 FIX MOBILE: Marcar actualización cuando el juego está cargado
      this.markMatchmakingUpdate();
      
      // 🔧 FIX: Limpiar timeout de carga - el juego cargó correctamente
      if (this.iframeLoadTimeout) {
        clearTimeout(this.iframeLoadTimeout);
        this.iframeLoadTimeout = null;
      }
      this.iframeLoadFailed = false;
      
      // 🔧 FIX: Usar getConnectingMessage() que maneja modo invitación correctamente
      if (this.gameMode === 'online' || this.selectedTable?.type === 'online-2' || this.selectedTable?.type === 'online-4' || this.selectedTable?.type === 'invite') {
        this.connectingMessage = this.getConnectingMessage();
      }
      
      console.log('✅ [WAITING-ROOM] Timeout de carga cancelado - Juego respondió correctamente');
    },
    
    handleMatchmakingStatus(data) {
      // Manejar actualizaciones del estado de matchmaking
      console.log('📊 [WAITING-ROOM] ==========================================');
      console.log('📊 [WAITING-ROOM] MATCHMAKING_STATUS recibido del backend:', data);
      console.log('📊 [WAITING-ROOM] Estado actual antes de actualizar:', {
        isConnecting: this.isConnecting,
        gameStarted: this.gameStarted,
        gameMode: this.gameMode,
        tableType: this.selectedTable?.type,
        playersRoom: this.playersRoom,
        matchmakingStatus: JSON.parse(JSON.stringify(this.matchmakingStatus)),
        connectingMessage: this.connectingMessage
      });
      
      // 🔧 FIX MOBILE: Marcar que se recibió una actualización
      this.markMatchmakingUpdate();
      
      if (data && typeof data.currentPlayers !== 'undefined' && typeof data.expectedPlayers !== 'undefined') {
        // 🔧 FIX: Actualizar estado de matchmaking
        const oldStatus = JSON.parse(JSON.stringify(this.matchmakingStatus));
        
        this.matchmakingStatus = {
          currentPlayers: data.currentPlayers,
          expectedPlayers: data.expectedPlayers,
          playersNeeded: data.playersNeeded || (data.expectedPlayers - data.currentPlayers)
        };
        
        console.log('📊 [WAITING-ROOM] Estado de matchmaking ACTUALIZADO:');
        console.log('   Anterior:', oldStatus);
        console.log('   Nuevo:', this.matchmakingStatus);
        
        // 🔧 FIX: Usar getConnectingMessage() que maneja correctamente modo invitación vs online
        if (this.gameMode === 'online' || this.selectedTable?.type === 'online-2' || this.selectedTable?.type === 'online-4' || this.selectedTable?.type === 'invite') {
          const newMessage = this.getConnectingMessage();
          
          console.log('📊 [WAITING-ROOM] Actualizando mensaje:');
          console.log('   De:', this.connectingMessage);
          console.log('   A:', newMessage);
          this.connectingMessage = newMessage;
        }
        console.log('📊 [WAITING-ROOM] ==========================================');
          } else {
        console.warn('⚠️ [WAITING-ROOM] Datos de matchmaking incompletos:', data);
      }
    },
    
    handleMatchmakingWarning(data) {
      // 🔧 Manejar advertencia de timeout de matchmaking
      console.log('⚠️ [WAITING-ROOM] MATCHMAKING_WARNING recibido:', data);
      
      if (data && data.secondsLeft) {
        // Actualizar mensaje con advertencia
        const warningMessage = `⚠️ ${data.secondsLeft} segundos para encontrar oponente...`;
        this.connectingMessage = warningMessage;
        
        console.log('⚠️ [WAITING-ROOM] Advertencia de timeout mostrada:', warningMessage);
      }
    },
    
    handleAllPlayersJoined(data, messageType) {
      // Manejar cuando todos los jugadores se unen o el juego está iniciando
      console.log('✅ [WAITING-ROOM] Evento recibido:', messageType, data);
      
      // 🔧 FIX: Limpiar timeout - el juego está respondiendo
      if (this.iframeLoadTimeout) {
        clearTimeout(this.iframeLoadTimeout);
        this.iframeLoadTimeout = null;
      }
      
      // Si es GAME_READY, manejar el envío del código del invitado
      if (messageType === 'GAME_READY') {
        console.log('🎮 [WAITING-ROOM] Juego cargado completamente');
        
        // 🔧 FIX: Marcar que el juego está cargado y listo
        this.isGameReady = true;
        console.log('✅ [WAITING-ROOM] isGameReady = true');
        
        // 🔧 FIX: Usar getConnectingMessage() que maneja modo invitación correctamente
        if (this.gameMode === 'online' || this.selectedTable?.type === 'online-2' || this.selectedTable?.type === 'online-4' || this.selectedTable?.type === 'invite') {
          this.connectingMessage = this.getConnectingMessage();
        }
        
        if (this.pendingRoomCodeToJoin) {
          console.log('🔗 [WAITING-ROOM] Enviando código pendiente al juego:', this.pendingRoomCodeToJoin);
          
          // Pequeño delay para asegurar que el juego esté 100% listo
          setTimeout(() => {
            this.joinRoomWithCode(this.pendingRoomCodeToJoin);
            // Limpiar el código pendiente
            this.pendingRoomCodeToJoin = null;
          }, 500);
        }
        // No cerrar modales en GAME_READY (solo es la carga inicial)
        return;
      }
      
      // Para ALL_PLAYERS_JOINED y GAME_STARTING:
      // Cerrar el modal de invitación (tanto para creador como invitado)
      console.log('🎮 [WAITING-ROOM] Todos los jugadores listos - Cerrando modales');
      this.showInviteCode = false;
      this.waitingForFriend = false;
      
      // Ocultar overlay de loading
      this.showLoadingOverlay = false;
      
      // ⚠️ NO ocultar isConnecting aquí - se ocultará cuando el juego realmente inicie (GAME_STARTED)
      // Esto permite que el invitado siga viendo el overlay hasta que el juego esté 100% listo
      console.log('⏳ [WAITING-ROOM] Manteniendo overlay visible hasta que el juego inicie...');
      
      console.log('📺 [WAITING-ROOM] Modales cerrados - Esperando inicio del juego');
      
      // 🎯 Auto-start: Ahora se maneja directamente en game.js después del auto-click en NEXT
      // El juego automáticamente hace: NEXT (1 seg) -> START (3 seg después)
      console.log('✅ [WAITING-ROOM] Auto-start se manejará automáticamente en el juego');
    },
    
    handleGameStarted(data) {
      // Manejar cuando el juego realmente ha iniciado (después del auto-click en START)
      console.log('🎮 [WAITING-ROOM] GAME_STARTED recibido - Ocultando overlay', data);
      console.log('🔍 [WAITING-ROOM] Estado actual - isConnecting:', this.isConnecting, 'gameStarted:', this.gameStarted);
      
      // 🔧 FIX: Detener actualizador de mensaje de matchmaking
      this.stopMatchmakingMessageUpdater();
      // 🔧 FIX MOBILE: Detener watchdog cuando el juego inicia
      this.stopMatchmakingWatchdog();
      
      // Ahora SÍ ocultar el overlay de configurando juego
      this.isConnecting = false;
      
      console.log('✅ [WAITING-ROOM] Overlay ocultado - isConnecting ahora es:', this.isConnecting);
      console.log('🎮 [WAITING-ROOM] Juego visible y jugando');
    },
    
    handleGameError(data) {
      // Manejar errores del juego
      console.error('Error en el juego:', data);
      this.$emit('game-error', data);
    },
    
    exitGame() {
      // Emitir evento para salir del juego
      this.$emit('exit');
    },

    async handleSurrender(options = {}) {
      const {
        skipConfirm = false,
        notifyIframe = true,
        reason = 'surrender',
        auto = false,
        playerNameOverride = null
      } = options;

      if (this.resultSent) {
        console.log('⏭️ [WAITING-ROOM] Resultado ya enviado, ignorando rendición duplicada.');
        return;
      }

      if (!skipConfirm) {
        const confirmed = confirm('¿Estás seguro que deseas rendirte? Esto contará como una derrota.');
        if (!confirmed) {
          return;
        }
      }

      if (this.isSurrendering) {
        console.log('⏳ [WAITING-ROOM] Ya se está procesando una rendición, ignorando petición duplicada.');
        return;
      }

      // 🔧 MODO ESPECIAL: Online 4 jugadores
      // Para probar si el juego soporta continuar con 3 jugadores:
      // - NO enviamos PLAYER_SURRENDER al iframe
      // - NO enviamos GAME_END ni resultado al backend
      // - Solo sacamos a este jugador al dashboard, dejando que el socket se desconecte
      const isFourPlayerOnline = this.gameMode === 'online' && this.playersRoom === 4;
      if (isFourPlayerOnline) {
        console.log('🏳️ [WAITING-ROOM] Rendición en modo online 4 jugadores - solo redirigir al dashboard, sin enviar datos.');
        this.isSurrendering = true;
        window.location.href = GAME_CONFIG.DASHBOARD_URL;
        return;
      }

      this.isSurrendering = true;

      try {
        console.log('🏳️ [WAITING-ROOM] Procesando rendición...', { reason, auto });

        const surrenderingName = playerNameOverride || this.getFirstName(this.playerName);

        // 🔧 FIX: Solo notificar al juego, NO enviar directamente al backend
        // El juego procesará la rendición y enviará GAME_END con todos los datos correctos (incluyendo roomCode)
        if (notifyIframe && this.$refs.gameFrame && this.$refs.gameFrame.contentWindow) {
          this.$refs.gameFrame.contentWindow.postMessage({
            type: 'PLAYER_SURRENDER',
            data: {
              playerName: surrenderingName,
              roomCode: this.roomCode, // Enviar roomCode al juego para que lo incluya en el resultado
              reason
            }
          }, '*');
          console.log('✅ [WAITING-ROOM] Señal PLAYER_SURRENDER enviada al juego');
          console.log('🔑 [WAITING-ROOM] roomCode enviado al juego:', this.roomCode);
          console.log('⏳ [WAITING-ROOM] Esperando que el juego procese la rendición y envíe GAME_END...');
        } else {
          console.error('❌ [WAITING-ROOM] No se puede notificar al juego - iframe no disponible');
          throw new Error('No se puede comunicar con el juego');
        }

        // 🔧 FIX: NO enviar directamente al backend aquí
        // El juego enviará GAME_END con isWinner: false y handleGameEnd lo procesará
        // Esto asegura que el roomCode y todos los datos estén correctos
        
      } catch (error) {
        console.error('❌ [WAITING-ROOM] Error al procesar la rendición:', error);
        if (!auto) {
          alert('Error al procesar la rendición. Por favor intenta nuevamente.');
        } else {
          alert('Se produjo un error al registrar la desconexión.');
        }
        // Solo resetear isSurrendering si hay error, de lo contrario esperar GAME_END
        this.isSurrendering = false;
      }
      // NO resetear isSurrendering aquí si todo salió bien - se reseteará cuando se reciba GAME_END en handleGameEnd
    },

    handlePlayerForfeit(data) {
      console.log('🏳️ [WAITING-ROOM] Evento PLAYER_FORFEIT recibido:', data);

      if (!data) {
        return;
      }

      const forfeitingName = (data.playerName || '').toLowerCase();
      const localFirstName = this.getFirstName(this.playerName).toLowerCase();

      if (forfeitingName && forfeitingName === localFirstName) {
        console.log('🚨 [WAITING-ROOM] El cliente local abandonó la partida. Procesando rendición automática...');
        this.handleSurrender({
          skipConfirm: true,
          notifyIframe: false,
          reason: data.reason || 'disconnect',
          auto: true,
          playerNameOverride: this.getFirstName(this.playerName)
        });
      } else {
        const message = `${data.playerName || 'Un jugador'} abandonó la partida (${data.reason || 'forfeit'})`;
        console.log('ℹ️ [WAITING-ROOM] Oponente se rindió o desconectó:', message);

        // Mostrar mensaje en el overlay si seguimos esperando a que el juego resuelva el resultado
        this.loadingOverlayMessage = message;
        this.showLoadingOverlay = true;
      }
    },

    handlePlayerFaultLimit(data) {
      console.log('⚠️ [WAITING-ROOM] PLAYER_FAULT_LIMIT recibido:', data);

      if (this.resultSent || this.isSurrendering) {
        console.log('⏭️ [WAITING-ROOM] Rendición ya procesada, ignorando PLAYER_FAULT_LIMIT');
        return;
      }

      this.loadingOverlayMessage = 'Has acumulado 3 faltas. Rendición automática...';
      this.showLoadingOverlay = true;

      this.handleSurrender({
        skipConfirm: true,
        reason: 'fault_limit',
        auto: false,
        playerNameOverride: this.getFirstName(this.playerName)
      });
    },
    
    async copyRoomCode() {
      // Copiar código de sala al portapapeles (desde template)
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(this.roomCode);
          console.log('✅ Código copiado:', this.roomCode);
          alert('¡Código copiado al portapapeles!');
        } else {
          // Fallback usando textarea temporal
          const textarea = document.createElement('textarea');
          textarea.value = this.roomCode;
          textarea.style.position = 'fixed';
          textarea.style.left = '-9999px';
          textarea.style.top = '0';
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();
          
          try {
            const successful = document.execCommand('copy');
            if (successful) {
              console.log('✅ Código copiado con execCommand:', this.roomCode);
              alert('¡Código copiado al portapapeles!');
            } else {
              throw new Error('execCommand falló');
            }
          } finally {
            document.body.removeChild(textarea);
          }
        }
      } catch (err) {
        console.error('❌ Error al copiar:', err);
        alert(`No se pudo copiar automáticamente. Código: ${this.roomCode}`);
      }
    },
    
    async shareRoomCode() {
      // Compartir código de sala
      const shareText = `¡Únete a mi partida de dominó! Código: ${this.roomCode}`;
      
      try {
        if (navigator.share) {
          await navigator.share({
            title: 'Invitación a partida de dominó',
            text: shareText
          });
          console.log('✅ Compartido exitosamente');
        } else {
          // Fallback: copiar al portapapeles
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(shareText);
            console.log('✅ Texto compartido copiado');
            alert('¡Mensaje copiado al portapapeles!');
          } else {
            // Fallback usando textarea temporal
            const textarea = document.createElement('textarea');
            textarea.value = shareText;
            textarea.style.position = 'fixed';
            textarea.style.left = '-9999px';
            textarea.style.top = '0';
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            
            try {
              const successful = document.execCommand('copy');
              if (successful) {
                console.log('✅ Texto compartido copiado con execCommand');
                alert('¡Mensaje copiado al portapapeles!');
              } else {
                throw new Error('execCommand falló');
              }
            } finally {
              document.body.removeChild(textarea);
            }
          }
        }
      } catch (err) {
        console.error('❌ Error al compartir:', err);
        alert(`No se pudo compartir. Código: ${this.roomCode}`);
      }
    },
    
    // 🎉 Métodos de confeti para celebración de victoria
    startConfetti() {
      const canvas = document.getElementById('confetti-canvas');
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Crear partículas de confeti
      const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#FFD93D', '#6BCF7F'];
      this.confettiParticles = [];
      
      for (let i = 0; i < 150; i++) {
        this.confettiParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height - canvas.height,
          size: Math.random() * 8 + 4,
          speedY: Math.random() * 3 + 2,
          speedX: Math.random() * 2 - 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 5 - 2.5
        });
      }
      
      // Animar confeti
      const animateConfetti = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        this.confettiParticles.forEach(particle => {
          ctx.save();
          ctx.translate(particle.x, particle.y);
          ctx.rotate(particle.rotation * Math.PI / 180);
          ctx.fillStyle = particle.color;
          ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
          ctx.restore();
          
          // Actualizar posición
          particle.y += particle.speedY;
          particle.x += particle.speedX;
          particle.rotation += particle.rotationSpeed;
          
          // Reiniciar partícula si sale de la pantalla
          if (particle.y > canvas.height) {
            particle.y = -particle.size;
            particle.x = Math.random() * canvas.width;
          }
        });
        
        this.confettiAnimationFrame = requestAnimationFrame(animateConfetti);
      };
      
      animateConfetti();
      console.log('🎉 [WAITING-ROOM] Confeti iniciado');
    },
    
    stopConfetti() {
      if (this.confettiAnimationFrame) {
        cancelAnimationFrame(this.confettiAnimationFrame);
        this.confettiAnimationFrame = null;
      }
      this.confettiParticles = [];
      
      const canvas = document.getElementById('confetti-canvas');
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      console.log('🎉 [WAITING-ROOM] Confeti detenido');
    },
    
    async handleCancelSearch() {
      // Cancelar búsqueda y reembolsar
      if (!confirm('¿Seguro que quieres cancelar? Se te devolverá el monto pagado.')) {
        return;
      }
      
      this.isCancelling = true;
      
      try {
        console.log('🔄 [WAITING-ROOM] Cancelando búsqueda de partida...');
        const safeTable = this.ensureSelectedTableDefaults();
        
        if (!safeTable) {
          throw new Error('No se pudo identificar la mesa');
        }
        
        const user = getUserData(this.$store, localStorage);
        const response = await fetch(`${GAME_CONFIG.API_BASE_URL}/tables/${safeTable.id}/leave`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${user.token || ''}`
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al cancelar');
        }
        
        const result = await response.json();
        console.log('✅ [WAITING-ROOM] Búsqueda cancelada y reembolso procesado:', result);
        
        // Actualizar saldo en Vuex
        this.updateBalanceFromPayload(result);
        
        // Mensaje de confirmación
        alert(`Búsqueda cancelada. Se te ha reembolsado ${safeTable.entry_price} Dcoins`);
        
        // Resetear juego y volver al dashboard
        this.resetGame();
        window.location.href = GAME_CONFIG.DASHBOARD_URL;
        
      } catch (error) {
        console.error('❌ [WAITING-ROOM] Error al cancelar búsqueda:', error);
        alert('Error al cancelar: ' + error.message);
      } finally {
        this.isCancelling = false;
      }
    },

    async cancelRoomAndRefund() {
      // Cancelar sala y reembolsar al HOST
      if (!confirm('¿Seguro que quieres cancelar la sala? Se te devolverá el monto pagado.')) {
        return;
      }
      
      this.isCancelling = true;
      
      try {
        console.log('🔄 [WAITING-ROOM] HOST: Cancelando sala y solicitando reembolso...');
        const safeTable = this.ensureSelectedTableDefaults();
        
        if (!safeTable) {
          throw new Error('No se pudo identificar la mesa');
        }
        
        const user = getUserData(this.$store, localStorage);
        const response = await fetch(`${GAME_CONFIG.API_BASE_URL}/tables/${safeTable.id}/leave`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${user.token || ''}`
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al cancelar sala');
        }
        
        const result = await response.json();
        console.log('✅ [WAITING-ROOM] HOST: Sala cancelada y reembolso procesado:', result);
        
        // Actualizar saldo en Vuex
        this.updateBalanceFromPayload(result);
        
        // Mensaje de confirmación
        alert(`Sala cancelada. Se te ha reembolsado ${safeTable.entry_price} Dcoins`);
        
        // Resetear juego y volver al dashboard
        this.resetGame();
        window.location.href = GAME_CONFIG.DASHBOARD_URL;
        
      } catch (error) {
        console.error('❌ [WAITING-ROOM] HOST: Error al cancelar sala:', error);
        alert('Error al cancelar sala: ' + error.message);
      } finally {
        this.isCancelling = false;
      }
    }
  },
  
  async mounted() {
    // 🔧 CACHE CONTROL: El router ya maneja la limpieza de caché
    // Este componente se monta solo después de que el router forzó la recarga
    console.log('🔧 [WAITING-ROOM] Componente montado con cache buster activo');
    
    // Escuchar mensajes del juego
    window.addEventListener('message', this.handleGameMessage);
    
    // Escuchar eventos de actualización de balance
    window.addEventListener('balance-updated', this.handleBalanceUpdate);
    
    // Sincronizar balance y cargar mesas
    await Promise.all([
      this.syncUserBalance(true),
      this.loadGameTables()
    ]);
    
    // 🔧 Iniciar actualización periódica de jugadores en línea (cada 10 segundos)
    this.startOnlinePlayersUpdate();
  },
  
  beforeUnmount() {
    // 🔧 FIX: Detener actualizador de mensaje de matchmaking
    this.stopMatchmakingMessageUpdater();
    // 🔧 FIX MOBILE: Detener watchdog
    this.stopMatchmakingWatchdog();
    
    // 🔧 FIX: Limpiar timeout de carga
    if (this.iframeLoadTimeout) {
      clearTimeout(this.iframeLoadTimeout);
      this.iframeLoadTimeout = null;
    }
    
    // 🔧 Detener actualización de jugadores en línea
    this.stopOnlinePlayersUpdate();
    
    window.removeEventListener('message', this.handleGameMessage);
    window.removeEventListener('balance-updated', this.handleBalanceUpdate);
  }
}
</script>

<style scoped>
/* Fondo principal con gradiente y elementos decorativos */
.waiting-room {
  min-height: 100vh;
  min-height: 100dvh;
  background: linear-gradient(135deg, #2d1b69 0%, #4a2c7a 50%, #6b46c1 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

/* Elementos decorativos de fondo */
.background-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.casino-chip {
  position: absolute;
  font-size: 2rem;
  opacity: 0.1;
  animation: float 6s ease-in-out infinite;
}

.casino-chip.chip-1 { top: 10%; left: 10%; animation-delay: 0s; }
.casino-chip.chip-2 { top: 20%; right: 15%; animation-delay: 1s; }
.casino-chip.chip-3 { top: 60%; left: 5%; animation-delay: 2s; }
.casino-chip.chip-4 { top: 70%; right: 10%; animation-delay: 3s; }
.casino-chip.chip-5 { top: 40%; left: 20%; animation-delay: 4s; }
.casino-chip.chip-6 { top: 80%; right: 20%; animation-delay: 5s; }

.playing-card {
  position: absolute;
  font-size: 3rem;
  opacity: 0.08;
  animation: rotate 8s linear infinite;
}

.playing-card.card-1 { top: 15%; right: 20%; animation-delay: 0s; }
.playing-card.card-2 { top: 50%; left: 10%; animation-delay: 2s; }
.playing-card.card-3 { top: 75%; right: 30%; animation-delay: 4s; }
.playing-card.card-4 { top: 30%; left: 30%; animation-delay: 6s; }

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Contenedor principal */
.waiting-container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  padding: 25px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2);
  max-width: 1280px;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 2;
  border: 2px solid rgba(255, 165, 0, 0.2);
}

/* Header del jugador */
.player-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 2px solid rgba(255, 165, 0, 0.1);
}

.player-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.player-avatar {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  box-shadow: 0 8px 20px rgba(255, 107, 53, 0.3);
}

.player-details h2 {
  margin: 0;
  color: #2d1b69;
  font-size: 1.8rem;
  font-weight: 800;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.game-subtitle {
  margin: 5px 0 0 0;
  color: #666;
  font-size: 1rem;
  font-weight: 500;
}

.game-status {
  display: flex;
  align-items: center;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(34, 197, 94, 0.1);
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #22c55e;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.status-indicator span {
  color: #22c55e;
  font-weight: 600;
  font-size: 0.9rem;
}

/* Títulos de modos */
.modes-title {
  color: #2d1b69;
  margin-bottom: 10px;
  font-size: 2.2rem;
  font-weight: 800;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.modes-subtitle {
  color: #666;
  margin-bottom: 40px;
  font-size: 1.1rem;
  font-weight: 500;
}

/* Opciones de modo */
.mode-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  margin-bottom: 40px;
}

.mode-card {
  position: relative;
  background: white;
  border-radius: 20px;
  padding: 25px;
  cursor: pointer;
  transition: all 0.4s ease;
  border: 2px solid transparent;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 200px;
}

.mode-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.mode-card:hover::before {
  opacity: 1;
}

.mode-card:hover:not(.disabled) {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

.mode-card.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

/* Badge del modo */
.mode-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(255, 107, 53, 0.3);
}

/* Icono del modo */
.mode-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 2.5rem;
  color: white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.cpu-mode .mode-icon {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
}

.online-mode .mode-icon {
  background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
}

/* Contenido del modo */
.mode-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mode-content h4 {
  margin: 0 0 10px 0;
  color: #2d1b69;
  font-size: 1.4rem;
  font-weight: 700;
}

.mode-content p {
  margin: 0 0 15px 0;
  color: #666;
  font-size: 1rem;
  line-height: 1.4;
}

/* Precio del modo */
.mode-price {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 15px;
  padding: 12px 20px;
  background: rgba(45, 27, 105, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(45, 27, 105, 0.1);
}

.price-label {
  font-size: 0.9rem;
  color: #666;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.price-value {
  font-size: 1.2rem;
  font-weight: 800;
  color: #2d1b69;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.price-value.free {
  color: #22c55e;
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 1.3rem;
  text-shadow: none;
}

.mode-features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-bottom: 20px;
}

.feature {
  background: rgba(45, 27, 105, 0.1);
  color: #2d1b69;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

/* 🔧 Indicador de jugadores en línea por mesa */
.online-players-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 10px;
  padding: 8px 12px;
  background: linear-gradient(135deg, rgba(46, 204, 113, 0.15) 0%, rgba(39, 174, 96, 0.15) 100%);
  border: 1px solid rgba(46, 204, 113, 0.3);
  border-radius: 8px;
  font-size: 0.85rem;
  color: #2ecc71;
  font-weight: 600;
  animation: pulse 2s ease-in-out infinite;
}

.online-players-indicator i {
  font-size: 0.9rem;
  color: #2ecc71;
}

.online-players-indicator .players-count {
  font-size: 1.1rem;
  font-weight: 800;
  color: #27ae60;
  text-shadow: 0 0 8px rgba(46, 204, 113, 0.5);
}

.online-players-indicator .players-text {
  font-size: 0.8rem;
  opacity: 0.9;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.02);
  }
}

/* 🔧 Indicador global de jugadores en línea - MÁS VISIBLE */
.global-online-indicator {
  margin: 20px 0 30px 0;
  padding: 18px 30px;
  background: linear-gradient(135deg, rgba(52, 152, 219, 0.25) 0%, rgba(41, 128, 185, 0.25) 100%);
  border: 3px solid rgba(52, 152, 219, 0.6);
  border-radius: 18px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 25px rgba(52, 152, 219, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  text-align: center;
  position: relative;
  z-index: 10;
}

.online-indicator-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #2980b9;
  font-size: 1.2rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.online-icon {
  font-size: 1.5rem;
  color: #3498db;
}

.players-number {
  font-size: 1.8rem;
  font-weight: 900;
  color: #2980b9;
  text-shadow: 0 0 15px rgba(52, 152, 219, 0.6);
  margin-right: 8px;
}

.players-label {
  font-size: 1.1rem;
  font-weight: 600;
  color: #34495e;
}

.online-dot {
  font-size: 0.8rem;
  color: #95a5a6;
  animation: none;
}

.online-text {
  font-weight: 500;
  color: #3498db;
}

.online-text strong {
  font-size: 1.5rem;
  font-weight: 900;
  color: #2980b9;
  text-shadow: 0 0 15px rgba(52, 152, 219, 0.6);
  margin-right: 5px;
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

.online-dot.has-players {
  color: #2ecc71;
  animation: blink 1.5s ease-in-out infinite;
}

.online-dot:not(.has-players) {
  color: #95a5a6;
  animation: none;
}

/* Botón de acción */
.mode-action {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
  transition: all 0.3s ease;
}

.mode-card:hover:not(.disabled) .mode-action {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
}

/* Botón de salir */
.exit-section {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 2px solid rgba(255, 165, 0, 0.1);
}

.exit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  padding: 18px 30px;
  background: linear-gradient(135deg, #6b46c1 0%, #4c1d95 100%);
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(107, 70, 193, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.exit-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(107, 70, 193, 0.4);
  background: linear-gradient(135deg, #4c1d95 0%, #3b0764 100%);
}

.exit-btn i {
  font-size: 1.2rem;
}

/* Estado de conexión */
.connecting-state {
  padding: 60px 40px;
  text-align: center;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 107, 53, 0.2);
  border-top: 4px solid #ff6b35;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 30px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.connecting-text {
  color: #2d1b69;
  font-size: 1.2rem;
  font-weight: 600;
}

/* Contenedor del juego */
.game-container {
  position: relative;
  width: 100%;
  height: 700px;
  border-radius: 0px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(255, 165, 0, 0.2);
}

.game-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

/* Botón de Rendirse */
.surrender-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(231, 76, 60, 0.4);
  z-index: 1001;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.surrender-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(231, 76, 60, 0.6);
  background: linear-gradient(135deg, #c0392b 0%, #a93226 100%);
}

.surrender-btn:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 10px rgba(231, 76, 60, 0.4);
}

.surrender-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.surrender-btn i {
  font-size: 1.1rem;
}

.surrender-btn.cancel-btn {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  box-shadow: 0 4px 15px rgba(245, 158, 11, 0.4);
}

.surrender-btn.cancel-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
  box-shadow: 0 6px 20px rgba(245, 158, 11, 0.6);
}

.surrender-btn.cancel-btn:active:not(:disabled) {
  box-shadow: 0 2px 10px rgba(245, 158, 11, 0.4);
}

/* Loading Overlay - Cubre el juego mientras espera jugadores */
.game-loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #2d1b69 0%, #4a2c7a 50%, #6b46c1 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.loading-overlay-content {
  text-align: center;
  color: white;
  padding: 40px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.2);
  max-width: 500px;
}

.loading-spinner-large {
  width: 80px;
  height: 80px;
  border: 6px solid rgba(255, 165, 0, 0.2);
  border-top: 6px solid #ff6b35;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 30px;
}

.loading-overlay-content h2 {
  color: white;
  font-size: 2rem;
  margin: 20px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.overlay-room-code {
  font-size: 1.2rem;
  margin: 20px 0;
  padding: 15px 30px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  border: 2px solid rgba(255, 165, 0, 0.3);
}

.overlay-room-code strong {
  color: #ffa500;
  font-size: 1.5rem;
  letter-spacing: 4px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

/* 🔧 FIX: Estilos para información de matchmaking */
.matchmaking-info {
  font-size: 1.1rem;
  margin: 15px 0;
  padding: 12px 25px;
  background: rgba(76, 175, 80, 0.2);
  border-radius: 12px;
  border: 2px solid rgba(76, 175, 80, 0.4);
  color: #a7f3d0;
  font-weight: 600;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
}

.waiting-dots {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
}

.waiting-dots span {
  width: 12px;
  height: 12px;
  background: #ffa500;
  border-radius: 50%;
  animation: bounce 1.4s ease-in-out infinite;
}

.waiting-dots span:nth-child(1) {
  animation-delay: 0s;
}

.waiting-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.waiting-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1.2);
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 1024px) {
  .mode-options {
    grid-template-columns: repeat(2, 1fr);
    gap: 22px;
  }
}

@media (max-width: 768px) {
  .waiting-room {
    padding: 0;
  }

  .waiting-container {
    padding: 10px;
    margin: 0;
    border-radius: 0;
    max-width: 100%;
    width: 100%;
    box-shadow: none;
  }
  
  .waiting-container.game-active {
    padding: 0;
    margin: 0;
    border-radius: 0;
  }
  
  .mode-options {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .player-header {
    flex-direction: column;
    gap: 10px;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .player-details h2 {
    font-size: 1.3rem;
    margin-bottom: 4px;
  }
  
  .game-subtitle {
    font-size: 0.85rem;
    margin-bottom: 8px;
  }
  
  .status-indicator {
    padding: 5px 10px;
  }
  
  .status-indicator span {
    font-size: 0.75rem;
  }
  
  .modes-title {
    font-size: 1.4rem;
    margin-bottom: 6px;
  }
  
  .modes-subtitle {
    font-size: 0.9rem;
    margin-bottom: 20px;
  }
  
  .mode-card {
    padding: 15px;
    min-height: auto;
  }
  
  .mode-content h4 {
    font-size: 1.1rem;
    margin-bottom: 6px;
  }
  
  .mode-content p {
    font-size: 0.85rem;
    margin-bottom: 10px;
  }
  
  .price-label {
    font-size: 0.7rem;
  }
  
  .price-value {
    font-size: 0.9rem;
  }
  
  .price-value.free {
    font-size: 1rem;
  }
  
  .feature {
    font-size: 0.7rem;
    padding: 2px 6px;
  }
  
  .game-container {
    height: calc(100vh - 140px);
    border-radius: 0;
    max-width: 100%;
    width: 100%;
  }

  .surrender-btn {
    top: 10px;
    right: 10px;
    padding: 6px 10px;
    font-size: 0.7rem;
    gap: 3px;
    max-width: 120px;
  }

  .surrender-btn i {
    font-size: 0.8rem;
  }
  
  .surrender-btn span {
    display: inline-block;
  }
  
  .casino-chip, .playing-card {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .waiting-room {
    padding: 0;
  }

  .waiting-container {
    padding: 8px;
    margin: 0;
    border-radius: 0;
    max-width: 100%;
    width: 100%;
    box-shadow: none;
  }
  
  .waiting-container.game-active {
    padding: 0;
    margin: 0;
    border-radius: 0;
    max-width: 100%;
    width: 100%;
  }
  
  .game-container {
    height: calc(100vh - 100px);
    border-radius: 0;
    border-left: none;
    border-right: none;
    max-width: 100%;
    width: 100%;
  }

  .surrender-btn {
    top: 8px;
    right: 8px;
    padding: 5px 8px;
    font-size: 0.65rem;
    gap: 3px;
    max-width: 100px;
  }

  .surrender-btn i {
    font-size: 0.75rem;
  }
  
  .surrender-btn span {
    display: inline-block;
  }
  
  .mode-options {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  
  .player-header {
    margin-bottom: 15px;
    gap: 8px;
  }
  
  .player-details h2 {
    font-size: 1.2rem;
    line-height: 1.2;
  }
  
  .game-subtitle {
    font-size: 0.8rem;
    line-height: 1.3;
  }
  
  .modes-title {
    font-size: 1.3rem;
    margin-bottom: 4px;
  }
  
  .modes-subtitle {
    font-size: 0.85rem;
    margin-bottom: 15px;
  }
  
  .mode-card {
    padding: 12px;
    min-height: auto;
  }
  
  .mode-content h4 {
    font-size: 1rem;
    margin-bottom: 4px;
  }
  
  .mode-content p {
    font-size: 0.8rem;
    margin-bottom: 8px;
    line-height: 1.3;
  }
  
  .price-label {
    font-size: 0.65rem;
  }
  
  .price-value {
    font-size: 0.85rem;
  }
  
  .price-value.free {
    font-size: 0.9rem;
  }
  
  .feature {
    font-size: 0.65rem;
    padding: 2px 5px;
  }
  
  .mode-icon {
    width: 50px;
    height: 50px;
    font-size: 1.8rem;
  }
  
  .exit-btn {
    padding: 12px 20px;
    font-size: 0.9rem;
  }
}

/* Estilos para modo de invitación */
.invite-mode {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: 2px solid #667eea;
  position: relative;
  overflow: hidden;
}

.invite-mode::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
  z-index: 1;
  border-radius: inherit;
}

.invite-mode .mode-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  position: relative;
  z-index: 2;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 2.5rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.invite-mode .mode-badge {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 2;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.invite-mode .mode-content {
  position: relative;
  z-index: 2;
}

.invite-mode .mode-content h4 {
  color: #ffffff !important;
  font-weight: 700 !important;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.7) !important;
  font-size: 1.4rem !important;
  margin: 0 0 10px 0 !important;
}

.invite-mode .mode-content p {
  color: #f8f8f8 !important;
  font-weight: 500 !important;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6) !important;
  font-size: 1rem !important;
  margin: 0 0 15px 0 !important;
}

.invite-mode .mode-price {
  position: relative;
  z-index: 2;
}

.invite-mode .price-label {
  color: #e8e8e8 !important;
  font-weight: 600 !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4) !important;
}

.invite-mode .price-value {
  color: #ffffff !important;
  font-weight: 700 !important;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5) !important;
  font-size: 1.1rem !important;
}

.invite-mode .mode-features {
  position: relative;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-bottom: 20px;
}

.invite-mode .feature {
  color: #ffffff !important;
  font-weight: 600 !important;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6) !important;
  background: rgba(255, 255, 255, 0.25) !important;
  border: 1px solid rgba(255, 255, 255, 0.4) !important;
  backdrop-filter: blur(5px) !important;
}

.invite-mode .mode-action {
  position: relative;
  z-index: 2;
  color: #ffffff !important;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5) !important;
}

.invite-waiting-state {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  font-family: 'Arial', sans-serif;
}

/* Modo overlay - cuando el juego está cargando */
.invite-waiting-state.overlay-mode {
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
}

/* Modal de elección para invitación */
.invite-choice-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(5px);
}

.choice-container {
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.choice-header h2 {
  color: #333;
  margin-bottom: 10px;
  font-size: 28px;
}

.choice-header p {
  color: #666;
  font-size: 16px;
  margin-bottom: 30px;
}

.choice-options {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
}

.choice-btn {
  display: flex;
  align-items: center;
  padding: 20px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  background: #f8f9fa;
  border: 2px solid transparent;
}

.choice-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.create-btn {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  border-color: #4CAF50;
}

.create-btn .choice-content h3,
.create-btn .choice-content p {
  color: white !important;
}

.create-btn:hover {
  background: linear-gradient(135deg, #45a049, #3d8b40);
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 10px 25px rgba(76, 175, 80, 0.4);
}

.join-btn {
  background: linear-gradient(135deg, #2196F3, #1976D2);
  border-color: #2196F3;
}

.join-btn .choice-content h3,
.join-btn .choice-content p {
  color: white !important;
}

.join-btn:hover {
  background: linear-gradient(135deg, #1976D2, #1565C0);
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 10px 25px rgba(33, 150, 243, 0.4);
}

.choice-icon {
  font-size: 32px;
  margin-right: 20px;
  min-width: 50px;
  color: white;
}

.choice-content h3 {
  margin: 0 0 5px 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.choice-content p {
  margin: 0;
  font-size: 14px;
  opacity: 0.9;
  color: #666;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 20px;
  color: #999;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #f0f0f0;
  color: #333;
}

/* Media queries para modal de invitación en móvil */
@media (max-width: 768px) {
  .choice-container {
    padding: 20px 15px;
    width: calc(100% - 20px);
    margin: 10px;
    border-radius: 15px;
  }

  .choice-header h2 {
    font-size: 20px;
    margin-bottom: 5px;
  }

  .choice-header p {
    font-size: 13px;
    margin-bottom: 15px;
  }

  .choice-options {
    gap: 10px;
    margin-bottom: 15px;
  }

  .choice-btn {
    padding: 12px;
    border-radius: 12px;
  }

  .choice-icon {
    font-size: 24px;
    margin-right: 12px;
    min-width: 35px;
  }

  .choice-content h3 {
    font-size: 15px;
    margin-bottom: 2px;
  }

  .choice-content p {
    font-size: 11px;
    line-height: 1.3;
  }

  .close-btn {
    width: 30px;
    height: 30px;
    top: 10px;
    right: 10px;
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .choice-container {
    padding: 15px 12px;
    width: calc(100% - 16px);
    margin: 8px;
    border-radius: 12px;
  }

  .choice-header h2 {
    font-size: 18px;
    margin-bottom: 4px;
  }

  .choice-header p {
    font-size: 12px;
    margin-bottom: 12px;
  }

  .choice-options {
    gap: 8px;
    margin-bottom: 12px;
  }

  .choice-btn {
    padding: 10px;
    border-radius: 10px;
    flex-direction: column;
    text-align: center;
  }

  .choice-icon {
    font-size: 32px;
    margin-right: 0;
    margin-bottom: 6px;
    min-width: auto;
  }

  .choice-content h3 {
    font-size: 14px;
    margin-bottom: 3px;
  }

  .choice-content p {
    font-size: 10px;
    line-height: 1.2;
  }

  .close-btn {
    width: 26px;
    height: 26px;
    top: 8px;
    right: 8px;
    font-size: 14px;
  }

  .create-btn:hover,
  .join-btn:hover {
    transform: translateY(0) scale(1);
  }

  .create-btn:active,
  .join-btn:active {
    transform: scale(0.98);
  }
}

@media (max-width: 360px) {
  .choice-container {
    padding: 18px 12px;
    width: calc(100% - 24px);
    margin: 12px;
  }

  .choice-header h2 {
    font-size: 18px;
  }

  .choice-header p {
    font-size: 12px;
  }

  .choice-icon {
    font-size: 32px;
    margin-bottom: 6px;
  }

  .choice-content h3 {
    font-size: 14px;
  }

  .choice-content p {
    font-size: 10px;
  }
}

.invite-container {
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  animation: slideInUp 0.5s ease-out;
  position: relative;
}

.close-invite-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: #f44336;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(244, 67, 54, 0.4);
  transition: all 0.3s ease;
  z-index: 10;
}

.close-invite-btn:hover {
  transform: rotate(90deg) scale(1.1);
  background: #d32f2f;
  box-shadow: 0 6px 20px rgba(244, 67, 54, 0.6);
}

.close-invite-btn i {
  font-size: 20px;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.invite-header h2 {
  color: #333;
  font-size: 2rem;
  margin-bottom: 10px;
  font-weight: 700;
}

.invite-header p {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 30px;
}

.room-code-display {
  margin: 30px 0;
}

.code-label {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 15px;
  font-weight: 600;
}

.code-value {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  padding: 20px;
  border-radius: 15px;
  font-size: 2.5rem;
  font-weight: bold;
  letter-spacing: 8px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  box-shadow: 0 8px 20px rgba(76, 175, 80, 0.3);
  margin: 10px 0;
}

.code-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  color: #666;
  font-size: 1.1rem;
}

.invite-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin: 30px 0;
  flex-wrap: wrap;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 15px 25px;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  min-width: 150px;
  justify-content: center;
}

.copy-btn {
  background: linear-gradient(135deg, #2196F3, #1976D2);
  color: white;
  box-shadow: 0 4px 15px rgba(33, 150, 243, 0.3);
}

.copy-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(33, 150, 243, 0.4);
}

.share-btn {
  background: linear-gradient(135deg, #FF9800, #F57C00);
  color: white;
  box-shadow: 0 4px 15px rgba(255, 152, 0, 0.3);
}

.share-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 152, 0, 0.4);
}

.cancel-btn {
  background: linear-gradient(135deg, #f44336, #d32f2f);
  color: white;
  box-shadow: 0 4px 15px rgba(244, 67, 54, 0.3);
}

.cancel-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(244, 67, 54, 0.4);
}

.cancel-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.waiting-status {
  margin: 30px 0;
  padding: 20px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 15px;
  border: 2px solid rgba(102, 126, 234, 0.2);
}

.waiting-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  color: #667eea;
  font-size: 1.1rem;
  font-weight: 600;
}

/* Estado del creador */
.creator-status {
  margin: 25px 0;
  padding: 20px;
  background: linear-gradient(135deg, #27AE60, #2ECC71);
  border-radius: 15px;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.status-message {
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  justify-content: center;
}

.status-message i {
  font-size: 20px;
  color: #D5F5E0;
}

.pulse-dot {
  width: 12px;
  height: 12px;
  background: #667eea;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.join-room-section {
  margin-top: 40px;
  padding-top: 30px;
  border-top: 2px solid rgba(102, 126, 234, 0.1);
}

.join-room-section h3 {
  color: #333;
  font-size: 1.3rem;
  margin-bottom: 20px;
  font-weight: 600;
}

.join-input-group {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.room-code-input {
  padding: 15px 20px;
  border: 2px solid #ddd;
  border-radius: 10px;
  font-size: 1.2rem;
  text-align: center;
  width: 150px;
  font-weight: bold;
  letter-spacing: 2px;
  transition: all 0.3s ease;
}

.room-code-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.join-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 15px 25px;
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
}

.join-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
}

.join-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}


/* Responsive para móviles */
@media (max-width: 768px) {
  .invite-container {
    padding: 30px 20px;
    margin: 0;
    border-radius: 0;
    max-width: 100%;
    width: 100%;
  }
  
  .invite-header h2 {
    font-size: 1.6rem;
  }
  
  .code-value {
    font-size: 2rem;
    letter-spacing: 6px;
    padding: 15px;
  }
  
  .invite-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .action-btn {
    width: 100%;
    max-width: 250px;
  }
  
  .join-input-group {
    flex-direction: column;
    align-items: stretch;
  }
  
  .room-code-input {
    width: 100%;
    max-width: 200px;
    margin: 0 auto;
  }
  
  .join-btn {
    width: 100%;
    margin: 0 auto;
  }
}

/* Estilos para el popup de confirmación */
.confirm-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease-out;
}

.confirm-modal {
  background: linear-gradient(135deg, #2d1b69 0%, #4a2c7a 100%);
  border-radius: 20px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  border: 2px solid rgba(255, 165, 0, 0.3);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  animation: slideUp 0.3s ease-out;
}

.confirm-header {
  text-align: center;
  margin-bottom: 25px;
}

.confirm-header h2 {
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 10px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.confirm-header p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  margin: 0;
}

.confirm-content {
  margin-bottom: 30px;
}

.table-info {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.table-name {
  color: white;
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 8px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

.table-description {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.4;
}

.payment-info {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.payment-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px 0;
}

.payment-item:last-child {
  margin-bottom: 0;
}

.payment-item.total {
  border-top: 2px solid rgba(255, 165, 0, 0.3);
  padding-top: 15px;
  margin-top: 15px;
  font-weight: 700;
}

.payment-item .label {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
}

.payment-item .amount {
  color: #ffa500;
  font-size: 1.2rem;
  font-weight: 700;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

.payment-item .amount.free {
  color: #2ecc71;
  font-size: 1.3rem;
}

.payment-item .points {
  color: #3498db;
  font-size: 1.2rem;
  font-weight: 700;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

.payment-item .prize-amount {
  color: #27ae60;
  font-size: 1.2rem;
  font-weight: 700;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

.warning-message {
  background: rgba(231, 76, 60, 0.2);
  border: 1px solid rgba(231, 76, 60, 0.4);
  border-radius: 10px;
  padding: 15px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #e74c3c;
  font-weight: 600;
}

.warning-message i {
  font-size: 1.2rem;
}

.confirm-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.cancel-btn, .confirm-btn {
  padding: 15px 30px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 140px;
  justify-content: center;
}

.cancel-btn {
  background: linear-gradient(135deg, #95a5a6, #7f8c8d);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.cancel-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #7f8c8d, #6c7b7c);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.confirm-btn {
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.confirm-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #229954, #27ae60);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.cancel-btn:disabled, .confirm-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive para el popup */
@media (max-width: 768px) {
  .confirm-modal {
    padding: 15px;
    margin: 15px;
    max-width: none;
    width: calc(100% - 30px);
  }
  
  .confirm-header {
    margin-bottom: 15px;
  }
  
  .confirm-header h2 {
    font-size: 1.3rem;
    margin-bottom: 5px;
  }
  
  .confirm-header p {
    font-size: 0.85rem;
  }
  
  .confirm-content {
    margin-bottom: 20px;
  }
  
  .table-info {
    padding: 12px;
    margin-bottom: 12px;
  }
  
  .table-name {
    font-size: 1.1rem;
    margin-bottom: 5px;
  }
  
  .table-description {
    font-size: 0.85rem;
  }
  
  .payment-info {
    padding: 12px;
  }
  
  .payment-item {
    margin-bottom: 10px;
    padding: 8px 0;
  }
  
  .payment-item.total {
    padding-top: 10px;
    margin-top: 10px;
  }
  
  .payment-item .label {
    font-size: 0.9rem;
  }
  
  .payment-item .amount {
    font-size: 1.1rem;
  }
  
  .payment-item .points {
    font-size: 1rem;
  }
  
  .payment-item .prize-amount {
    font-size: 1.1rem;
  }
  
  .warning-message {
    padding: 10px;
    margin-top: 12px;
    font-size: 0.85rem;
  }
  
  .warning-message i {
    font-size: 1rem;
  }
  
  .confirm-actions {
    flex-direction: column;
    gap: 10px;
  }
  
  .cancel-btn, .confirm-btn {
    width: 100%;
    min-width: auto;
    padding: 12px 20px;
    font-size: 0.95rem;
  }
}

/* Estilos para notificación de balance */
.balance-notification {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  animation: slideInRight 0.3s ease-out;
  min-width: 300px;
  max-width: 400px;
}

.balance-notification.success {
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  border: 2px solid rgba(39, 174, 96, 0.3);
  color: white;
}

.balance-notification.deduction {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  border: 2px solid rgba(231, 76, 60, 0.3);
  color: white;
}

.notification-content {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  font-size: 14px;
}

.notification-content i {
  font-size: 18px;
  opacity: 0.9;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive para notificación */
@media (max-width: 768px) {
  .balance-notification {
    top: 10px;
    right: 10px;
    left: 10px;
    min-width: auto;
    max-width: none;
    padding: 12px 15px;
  }
  
  .notification-content {
    font-size: 13px;
    gap: 10px;
  }
  
  .notification-content i {
    font-size: 16px;
  }
}

</style>
