/**
 * ADAPTADOR VUE-DOMINÓ - AUTO-PLAY COMPLETO
 * Automatiza TODA la interfaz del juego para ir directo al tablero
 */

(function() {
    'use strict';
    
    console.log('🎮 [ADAPTER] Adaptador Auto-Play cargado');
    
    let gameState = {
        userData: null,
        gameMode: null,
        tableId: null,
        initialized: false,
        autoMode: false
    };
    
    /**
     * 🚫 OCULTAR INTERFAZ INMEDIATAMENTE
     */
    function hideAllUI() {
        const style = document.createElement('style');
        style.id = 'vue-adapter-styles';
        style.textContent = `
            /* Ocultar TODA la interfaz excepto canvas */
            body > *:not(#mainHolder):not(canvas):not(script):not(style) {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                position: absolute !important;
                left: -9999px !important;
                top: -9999px !important;
            }
            
            #mainHolder {
                background: transparent !important;
                width: 100% !important;
                height: 100% !important;
                position: relative !important;
            }
            
            #mainHolder > *:not(canvas) {
                display: none !important;
            }
            
            canvas {
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                position: relative !important;
                left: auto !important;
                top: auto !important;
                background: transparent !important;
            }
        `;
        
        if (!document.getElementById('vue-adapter-styles')) {
            document.head.appendChild(style);
        }
    }
    
    /**
     * 🔄 FUNCIÓN PARA AUTOMATIZAR COMPLETAMENTE EL JUEGO
     */
    function automateGame() {
        console.log('🔄 [ADAPTER] Automatizando juego...');
        
        // Continuar automatizando cada 200ms
        const automateInterval = setInterval(() => {
            
            // 1. Buscar y llenar campo de nombre
            const nameInput = document.getElementById('userName') || document.querySelector('input[type="text"]');
            if (nameInput && gameState.userData && gameState.userData.userName) {
                nameInput.value = gameState.userData.userName;
                console.log('📝 [ADAPTER] Nombre configurado:', gameState.userData.userName);
            }
            
            // 2. Buscar y hacer clic en botón ENTER/START/PLAY
            const buttons = [
                document.getElementById('enterName'),
                document.getElementById('buttonStart'),
                document.getElementById('playButton'),
                document.querySelector('.button'),
                document.querySelector('input[type="button"]')
            ];
            
            // Buscar botones por texto
            const allButtons = document.querySelectorAll('button, input[type="button"], .button');
            allButtons.forEach(btn => {
                const text = btn.textContent || btn.value || '';
                if (text.includes('ENTER') || text.includes('START') || text.includes('PLAY')) {
                    buttons.push(btn);
                }
            });
            
            buttons.forEach(button => {
                if (button && button.style.display !== 'none' && button.offsetParent !== null) {
                    console.log('🖱️ [ADAPTER] Haciendo clic automático en:', button.id || button.className);
                    button.click();
                }
            });
            
            // 3. Si existe función goPage, ir directo al juego
            if (typeof goPage === 'function') {
                console.log('📄 [ADAPTER] Forzando ir a game');
                goPage('game');
            }
            
            // 4. Si existe función para iniciar socket
            if (typeof initSocket === 'function' && !gameState.socketInitialized) {
                console.log('🔌 [ADAPTER] Inicializando socket');
                initSocket('playdominoes');
                gameState.socketInitialized = true;
            }
            
            // 5. Auto-conectar usuario si existe la función
            if (typeof addSocketUser === 'function' && gameState.userData && !gameState.userConnected) {
                console.log('👤 [ADAPTER] Auto-conectando usuario');
                addSocketUser();
                gameState.userConnected = true;
            }
            
        }, 200);
        
        // Detener automatización después de 30 segundos
        setTimeout(() => {
            clearInterval(automateInterval);
            console.log('⏹️ [ADAPTER] Automatización completada');
        }, 30000);
    }
    
    /**
     * 📨 ESCUCHAR MENSAJES DESDE VUE
     */
    window.addEventListener('message', function(event) {
        const allowedOrigins = [
            'http://localhost:8080',
            'http://localhost:3000',
            'http://127.0.0.1:8080',
            'http://127.0.0.1:3000',
            window.location.origin
        ];
        
        if (!allowedOrigins.includes(event.origin)) {
            return;
        }
        
        const { type, data } = event.data || {};
        console.log('📨 [ADAPTER] Mensaje desde Vue:', type, data);
        
        if (type === 'START_GAME') {
            gameState.userData = data;
            gameState.gameMode = data.gameMode;
            gameState.tableId = data.tableId;
            gameState.initialized = true;
            gameState.autoMode = true;
            
            // Configurar variables globales del juego
            if (typeof gameData !== 'undefined') {
                gameData.drawMode = true;
                gameData.targetPoints = 10;
                gameData.autoPlay = true;
            }
            
            window.drawMode = true;
            window.targetPoints = 10;
            window.autoPlay = true;
            
            // Configurar multiplayer settings
            if (typeof multiplayerSettings !== 'undefined') {
                multiplayerSettings.enable = data.gameMode !== 'cpu';
                multiplayerSettings.localPlay = data.gameMode === 'cpu';
                multiplayerSettings.roomLists = false;
                multiplayerSettings.enterName = false;
                multiplayerSettings.findPlayerTimer = false;
                multiplayerSettings.forceQuit = true;
            }
            
            console.log('🎯 [ADAPTER] Juego configurado para modo:', data.gameMode);
            
            // Enviar confirmación a Vue
            sendToVue('GAME_INITIALIZED', {
                success: true,
                mode: data.gameMode,
                tableId: data.tableId
            });
            
            // Iniciar automatización
            setTimeout(() => {
                automateGame();
            }, 500);
        }
    });
    
    /**
     * 📤 ENVIAR MENSAJE A VUE
     */
    function sendToVue(type, data = {}) {
        try {
            const message = { type, data };
            console.log('📤 [ADAPTER] Enviando a Vue:', type);
            window.parent.postMessage(message, '*');
        } catch (error) {
            console.error('❌ [ADAPTER] Error enviando mensaje:', error);
        }
    }
    
    /**
     * 🏆 INTERCEPTAR RESULTADOS DEL JUEGO
     */
    
    // Interceptar función de fin de juego
    ['endGame', 'gameEnd', 'finishGame'].forEach(funcName => {
        const originalFunc = window[funcName];
        if (typeof originalFunc === 'function') {
            window[funcName] = function(winner, data) {
                console.log(`🏆 [ADAPTER] ${funcName} - Ganador:`, winner);
                
                const isWinner = winner === 'player' || 
                               (typeof socketData !== 'undefined' && winner === socketData.username) ||
                               (data && data.winner === 'user');
                
                sendToVue('GAME_RESULT', {
                    isWinner: isWinner,
                    winner: winner,
                    gameData: data,
                    playerData: gameState.userData,
                    tableId: gameState.tableId,
                    mode: gameState.gameMode
                });
                
                // Llamar función original
                if (originalFunc) {
                    originalFunc.call(this, winner, data);
                }
            };
        }
    });
    
    // Interceptar updateSocketGame para resultados
    const originalUpdateSocketGame = window.updateSocketGame;
    if (typeof originalUpdateSocketGame === 'function') {
        window.updateSocketGame = function(status, data, others) {
            if (status === 'end' || status === 'finish' || status === 'gameend') {
                console.log('🏆 [ADAPTER] Socket game terminado:', data);
                
                const isWinner = data && (data.winner === 'user' || data.userWin === true);
                
                sendToVue('GAME_RESULT', {
                    isWinner: isWinner,
                    gameData: data,
                    playerData: gameState.userData,
                    tableId: gameState.tableId,
                    mode: gameState.gameMode
                });
            }
            
            // Llamar función original
            if (originalUpdateSocketGame) {
                originalUpdateSocketGame.call(this, status, data, others);
            }
        };
    }
    
    /**
     * 🎯 INICIALIZACIÓN AL CARGAR
     */
    
    // Ocultar UI inmediatamente
    hideAllUI();
    
    // Al cargar DOM
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🎯 [ADAPTER] DOM cargado');
        hideAllUI();
        
        // Enviar señal de que está listo
        setTimeout(() => {
            sendToVue('ADAPTER_READY', {
                status: 'loaded',
                timestamp: new Date().toISOString()
            });
        }, 500);
    });
    
    // Al cargar window
    window.addEventListener('load', function() {
        console.log('🎯 [ADAPTER] Window cargado');
        hideAllUI();
        
        // Si no se ha inicializado aún, comenzar automatización básica
        if (!gameState.initialized) {
            setTimeout(() => {
                automateGame();
            }, 1000);
        }
    });
    
    // Ocultar UI continuamente durante los primeros 10 segundos
    const hideInterval = setInterval(() => {
        hideAllUI();
    }, 500);
    
    setTimeout(() => {
        clearInterval(hideInterval);
    }, 10000);
    
    console.log('✅ [ADAPTER] Adaptador Auto-Play inicializado');
    
})();