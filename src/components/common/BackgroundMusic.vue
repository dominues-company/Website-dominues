<template>
  <div class="background-music" style="display: none;">
    <audio ref="audioPlayer" loop>
      <source src="/assets/sounds/music_game.mp3" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
  </div>
</template>

<script>
import AuthService from '@/services/auth.service';

export default {
  name: 'BackgroundMusic',
  data() {
    return {
      isPlaying: false,
      userInteracted: false
    };
  },
  mounted() {
    // Escuchar eventos de sesión
    window.addEventListener('valid-session', this.handleValidSession);
    window.addEventListener('invalid-session', this.handleInvalidSession);
    
    // 🔧 FIX: Escuchar eventos de pausa/reanudación desde el juego
    window.addEventListener('pause-background-music', this.pauseMusic);
    window.addEventListener('resume-background-music', this.resumeMusic);
    
    // Necesitamos interacción del usuario para reproducir audio en la mayoría de navegadores
    window.addEventListener('click', this.handleUserInteraction);
    window.addEventListener('keydown', this.handleUserInteraction);
    
    // Verificar estado inicial
    this.checkInitialState();
  },
  beforeUnmount() {
    window.removeEventListener('valid-session', this.handleValidSession);
    window.removeEventListener('invalid-session', this.handleInvalidSession);
    window.removeEventListener('pause-background-music', this.pauseMusic);
    window.removeEventListener('resume-background-music', this.resumeMusic);
    window.removeEventListener('click', this.handleUserInteraction);
    window.removeEventListener('keydown', this.handleUserInteraction);
    this.stopMusic();
  },
  methods: {
    checkInitialState() {
      if (AuthService.isAuthenticated()) {
        this.attemptPlay();
      }
    },
    handleValidSession() {
      this.attemptPlay();
    },
    handleInvalidSession() {
      this.stopMusic();
    },
    handleUserInteraction() {
      this.userInteracted = true;
      if (AuthService.isAuthenticated() && !this.isPlaying) {
        this.attemptPlay();
      }
      
      // Remover listeners después de la primera interacción exitosa
      if (this.isPlaying) {
        window.removeEventListener('click', this.handleUserInteraction);
        window.removeEventListener('keydown', this.handleUserInteraction);
      }
    },
    async attemptPlay() {
      const audio = this.$refs.audioPlayer;
      if (!audio) return;
      
      try {
        audio.volume = 0.3; // Volumen moderado
        await audio.play();
        this.isPlaying = true;
      } catch (error) {
        console.warn('Autoplay bloqueado o falló:', error);
        // Si falla por autoplay policy, esperaremos a la interacción del usuario
      }
    },
    pauseMusic() {
      const audio = this.$refs.audioPlayer;
      if (audio && this.isPlaying) {
        audio.pause();
        this.isPlaying = false;
        console.log('🔇 [BACKGROUND-MUSIC] Música pausada');
      }
    },
    resumeMusic() {
      const audio = this.$refs.audioPlayer;
      if (audio && !this.isPlaying && AuthService.isAuthenticated()) {
        audio.play().then(() => {
          this.isPlaying = true;
          console.log('🔊 [BACKGROUND-MUSIC] Música reanudada');
        }).catch(error => {
          console.warn('No se pudo reanudar la música:', error);
        });
      }
    },
    stopMusic() {
      const audio = this.$refs.audioPlayer;
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
        this.isPlaying = false;
      }
    }
  }
}
</script>
