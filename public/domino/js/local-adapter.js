/**
 * Adaptador para comunicación entre Vue.js y Juego de Dominó Local
 * Maneja la inicialización del juego con datos del usuario y la comunicación bidireccional
 */

class DominoLocalAdapter {
    constructor() {
        this.gameData = null;
        this.isGameRunning = false;
        this.vueCallbacks = {};
        
        // Escuchar mensajes del parent (Vue.js)
        window.addEventListener('message', this.handleVueMessage.bind(this));
        
        // Configurar variables globales del juego para modo local
        this.setupLocalMode();
    }

    /**
     * Configurar el juego para modo local
     */
    setupLocalMode() {
        // Asegurar que el modo local esté activado
        if (typeof multiplayerSettings !== 'undefined') {
            multiplayerSettings.enable = false;
            multiplayerSettings.localPlay = true;
            multiplayerSettings.roomLists = false;
            multiplayerSettings.enterName = false;
        }

        // Configurar socket data para modo local
        if (typeof socketData !== 'undefined') {
            socketData.online = false;
            socketData.username = '';
            socketData.index = 0;
        }
    }

    /**
     * Manejar mensajes desde Vue.js
     */
    handleVueMessage(event) {
        if (event.origin !== window.location.origin) return;

        const { type, data } = event.data || {};

        switch (type) {
            case 'GAME_INIT':
                this.initializeGame(data);
                break;
            case 'GAME_CONFIG':
                this.configureGame(data);
                break;
            default:
                console.log('Mensaje no reconocido:', type, data);
        }
    }

    /**
     * Inicializar el juego con datos de Vue.js
     */
    initializeGame(data) {
        console.log('[DOMINO-ADAPTER] Inicializando juego con datos:', data);
        
        this.gameData = data;
        
        // Configurar nombres de jugadores
        const playerName = data.names[0] || 'Jugador';
        const bancaName = 'La Banca';
        
        // Configurar datos del juego
        if (typeof gameSettings !== 'undefined') {
            gameSettings.totalPlayers = 2; // Siempre 2 jugadores en modo local
            gameSettings.playerNames = [playerName, bancaName];
            gameSettings.userIds = data.userIds || [data.userId, null];
            gameSettings.currentUserId = data.userId;
            gameSettings.betAmount = data.apuesta || 50;
            gameSettings.tableId = data.mesaId;
            gameSettings.userBalance = data.balance || 0;
        }

        // Configurar variables globales del juego
        if (typeof gameData !== 'undefined') {
            gameData.players = 2;
            gameData.playerNames = [playerName, bancaName];
            gameData.currentPlayer = 0; // El usuario siempre empieza
            gameData.localMode = true;
            gameData.betAmount = data.apuesta || 50;
            gameData.tableId = data.mesaId;
            gameData.point = 0; // Índice para 10 puntos
            gameData.draw = true; // Activar draw dominoes
        }

        // Configurar opciones del juego automáticamente
        this.configureGameOptions();
        
        // Actualizar textos en pantalla si existen
        this.updateGameTexts(playerName, bancaName);
        
        // Marcar juego como iniciado
        this.isGameRunning = true;
        
        // Notificar a Vue que el juego se inicializó
        this.sendMessageToVue('GAME_INITIALIZED', {
            success: true,
            players: [playerName, bancaName],
            gameId: data.mesaId
        });

        // Iniciar el juego directamente con configuración automática
        setTimeout(() => {
            this.autoConfigureAndStart();
        }, 1000);
    }

    /**
     * Actualizar textos del juego
     */
    updateGameTexts(playerName, bancaName) {
        // Actualizar nombres de jugadores en la interfaz si los elementos existen
        if (typeof updatePlayerName === 'function') {
            updatePlayerName(0, playerName);
            updatePlayerName(1, bancaName);
        }

        // Actualizar otros textos relevantes
        if (typeof statusTxt !== 'undefined' && statusTxt.text !== undefined) {
            statusTxt.text = `${playerName} vs ${bancaName}`;
        }
    }

    /**
     * Configurar opciones automáticamente
     */
    configureGameOptions() {
        console.log('[DOMINO-ADAPTER] Configurando opciones del juego...');
        
        // Configurar variables globales si existen
        if (typeof gameData !== 'undefined') {
            gameData.totalPlayers = 2; // 2 jugadores
            gameData.pointIndex = 0; // 10 puntos (índice 0)
            gameData.typeIndex = 0; // Draw dominoes (índice 0)
            gameData.draw = true; // Activar pila de fichas
        }

        // Configurar opciones específicas del dominó
        if (typeof pointsArr !== 'undefined' && pointsArr.length > 0) {
            gameData.pointIndex = 0; // Primer elemento debería ser 10 puntos
        }

        if (typeof typeArr !== 'undefined' && typeArr.length > 0) {
            gameData.typeIndex = 0; // Primer elemento debería ser "Draw"
        }
    }

    /**
     * Auto configurar y empezar el juego
     */
    autoConfigureAndStart() {
        console.log('[DOMINO-ADAPTER] Auto configurando y empezando...');
        
        try {
            // Configurar jugadores (2 players)
            if (typeof updateGamePlayers === 'function') {
                updateGamePlayers(2);
            }

            // Configurar puntos (10 puntos)
            if (typeof updateGamePoints === 'function') {
                updateGamePoints(0); // índice 0 para 10 puntos
            }

            // Configurar tipo (Draw Dominoes)
            if (typeof updateGameType === 'function') {
                updateGameType(0); // índice 0 para Draw
            }

            // Ir directamente al juego
            setTimeout(() => {
                this.startLocalGame();
            }, 500);

        } catch (error) {
            console.error('[DOMINO-ADAPTER] Error en auto configuración:', error);
            // Intentar inicio directo si falla la configuración
            this.startLocalGame();
        }
    }

    /**
     * Iniciar el juego local
     */
    startLocalGame() {
        console.log('[DOMINO-ADAPTER] Iniciando juego local...');
        
        try {
            // Intentar diferentes formas de iniciar el juego
            if (typeof startGame === 'function') {
                startGame();
            } else if (typeof beginGame === 'function') {
                beginGame();
            } else if (typeof initGame === 'function') {
                initGame();
            } else if (typeof goPage === 'function') {
                goPage('game');
            } else if (typeof clickStart === 'function') {
                clickStart();
            } else {
                console.warn('[DOMINO-ADAPTER] No se encontró función para iniciar el juego');
                
                // Intentar simular click en botón START
                this.simulateStartClick();
            }
        } catch (error) {
            console.error('[DOMINO-ADAPTER] Error al iniciar el juego:', error);
            this.sendMessageToVue('GAME_ERROR', {
                error: 'Error al iniciar el juego: ' + error.message
            });
        }
    }

    /**
     * Simular click en botón START
     */
    simulateStartClick() {
        console.log('[DOMINO-ADAPTER] Intentando simular click en START...');
        
        // Buscar y clickear el botón START
        if (typeof buttonStart !== 'undefined' && buttonStart.dispatchEvent) {
            const clickEvent = new createjs.Event('click');
            buttonStart.dispatchEvent(clickEvent);
        } else {
            // Intentar usar la función de clic directamente
            if (typeof clickStart === 'function') {
                clickStart();
            } else {
                console.warn('[DOMINO-ADAPTER] No se pudo simular click en START');
            }
        }
    }

    /**
     * Manejar finalización del juego
     */
    handleGameEnd(result) {
        console.log('[DOMINO-ADAPTER] Juego terminado:', result);
        
        // Determinar ganador
        const isWinner = result.winnerId === this.gameData.userId;
        
        // Enviar resultado a Vue.js
        this.sendMessageToVue('GAME_RESULT', {
            userId: this.gameData.userId,
            result: isWinner ? 'gano' : 'perdio',
            winnerId: result.winnerId,
            apuesta: this.gameData.apuesta,
            mesaId: this.gameData.mesaId,
            playerNames: this.gameData.names,
            gameData: result
        });
        
        this.isGameRunning = false;
    }

    /**
     * Enviar mensaje a Vue.js
     */
    sendMessageToVue(type, data) {
        if (window.parent && window.parent !== window) {
            window.parent.postMessage({
                type: type,
                data: data
            }, '*');
        }
    }

    /**
     * Configurar hooks para interceptar eventos del juego
     */
    setupGameHooks() {
        console.log('[DOMINO-ADAPTER] Configurando hooks del juego...');
        
        // Hook para cuando termine el juego
        if (typeof gameData !== 'undefined') {
            const originalEndGame = window.endGame;
            window.endGame = (result) => {
                this.handleGameEnd(result);
                if (originalEndGame) {
                    originalEndGame(result);
                }
            };
        }

        // Hook para eventos de victoria
        const originalGameComplete = window.gameComplete;
        window.gameComplete = (winnerId, score) => {
            this.handleGameEnd({
                winnerId: winnerId,
                score: score,
                timestamp: new Date().toISOString()
            });
            if (originalGameComplete) {
                originalGameComplete(winnerId, score);
            }
        };

        // Hook para interceptar cambios de página
        const originalGoPage = window.goPage;
        window.goPage = (page) => {
            console.log('[DOMINO-ADAPTER] Cambiando a página:', page);
            
            if (page === 'result') {
                // Interceptar cuando vaya a resultados
                setTimeout(() => {
                    this.checkGameResult();
                }, 1000);
            }
            
            if (originalGoPage) {
                originalGoPage(page);
            }
        };

        // Hook para interceptar configuración automática
        this.overrideGameSettings();
    }

    /**
     * Sobrescribir configuraciones del juego
     */
    overrideGameSettings() {
        // Sobrescribir función de configuración de jugadores
        if (typeof updateGamePlayers !== 'undefined') {
            const originalUpdatePlayers = window.updateGamePlayers;
            window.updateGamePlayers = (players) => {
                console.log('[DOMINO-ADAPTER] Forzando 2 jugadores');
                if (originalUpdatePlayers) {
                    originalUpdatePlayers(2); // Siempre 2 jugadores
                }
            };
        }

        // Sobrescribir función de configuración de puntos
        if (typeof updateGamePoints !== 'undefined') {
            const originalUpdatePoints = window.updateGamePoints;
            window.updateGamePoints = (pointIndex) => {
                console.log('[DOMINO-ADAPTER] Forzando 10 puntos (índice 0)');
                if (originalUpdatePoints) {
                    originalUpdatePoints(0); // Siempre 10 puntos
                }
            };
        }

        // Sobrescribir función de configuración de tipo
        if (typeof updateGameType !== 'undefined') {
            const originalUpdateType = window.updateGameType;
            window.updateGameType = (typeIndex) => {
                console.log('[DOMINO-ADAPTER] Forzando Draw Dominoes (índice 0)');
                if (originalUpdateType) {
                    originalUpdateType(0); // Siempre Draw
                }
            };
        }
    }

    /**
     * Verificar resultado del juego
     */
    checkGameResult() {
        console.log('[DOMINO-ADAPTER] Verificando resultado del juego...');
        
        // Intentar obtener el resultado del juego
        if (typeof gameData !== 'undefined' && gameData.winner !== undefined) {
            const isUserWinner = gameData.winner === 0; // Asumiendo que el usuario es el jugador 0
            
            this.handleGameEnd({
                winnerId: isUserWinner ? this.gameData.userId : null,
                score: gameData.score || [0, 0],
                winner: gameData.winner,
                timestamp: new Date().toISOString()
            });
        }
    }
}

// Inicializar el adaptador cuando se cargue la página
window.addEventListener('load', () => {
    console.log('[DOMINO-ADAPTER] Inicializando adaptador...');
    window.dominoAdapter = new DominoLocalAdapter();
    
    // Configurar hooks después de que el juego se haya cargado
    setTimeout(() => {
        window.dominoAdapter.setupGameHooks();
    }, 2000);
});

// Funciones auxiliares para compatibilidad
window.setPlayerName = function(playerIndex, name) {
    if (window.dominoAdapter && window.dominoAdapter.gameData) {
        window.dominoAdapter.gameData.names[playerIndex] = name;
        window.dominoAdapter.updateGameTexts(
            window.dominoAdapter.gameData.names[0],
            window.dominoAdapter.gameData.names[1]
        );
    }
};

window.getGameData = function() {
    return window.dominoAdapter ? window.dominoAdapter.gameData : null;
};

console.log('[DOMINO-ADAPTER] Adaptador cargado exitosamente');
