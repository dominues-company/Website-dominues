<template>
  <div v-if="showControl" class="music-control">
    <button
      type="button"
      class="music-control__btn"
      :title="isMuted ? 'Activar música del sitio' : 'Silenciar música del sitio'"
      @click="toggleMute"
    >
      <i :class="isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up'"></i>
    </button>
    <input
      type="range"
      class="music-control__slider"
      min="0"
      max="100"
      :value="volumePercent"
      :disabled="isMuted"
      aria-label="Volumen de la música del sitio"
      @input="onVolumeInput"
    />
  </div>
  <audio ref="audioPlayer" loop preload="auto">
    <source src="/assets/sounds/music_game.mp3" type="audio/mpeg">
  </audio>
</template>

<script>
import AuthService from '@/services/auth.service';

const STORAGE_VOLUME = 'dominues_bg_music_volume';
const STORAGE_MUTED = 'dominues_bg_music_muted';
const DEFAULT_VOLUME = 0.15;

export default {
  name: 'BackgroundMusic',
  data() {
    return {
      isPlaying: false,
      userInteracted: false,
      volume: DEFAULT_VOLUME,
      isMuted: false
    };
  },
  computed: {
    showControl() {
      return !this.$route.matched.some(record => record.meta.hideLayout);
    },
    volumePercent() {
      return Math.round(this.volume * 100);
    }
  },
  mounted() {
    this.loadPreferences();
    this.applyVolumeToAudio();

    window.addEventListener('valid-session', this.handleValidSession);
    window.addEventListener('invalid-session', this.handleInvalidSession);
    window.addEventListener('pause-background-music', this.pauseMusic);
    window.addEventListener('resume-background-music', this.resumeMusic);
    window.addEventListener('click', this.handleUserInteraction);
    window.addEventListener('keydown', this.handleUserInteraction);

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
    loadPreferences() {
      const savedVolume = parseFloat(localStorage.getItem(STORAGE_VOLUME));
      if (!Number.isNaN(savedVolume) && savedVolume >= 0 && savedVolume <= 1) {
        this.volume = savedVolume;
      }

      const savedMuted = localStorage.getItem(STORAGE_MUTED);
      if (savedMuted === 'true') {
        this.isMuted = true;
      }
    },
    savePreferences() {
      localStorage.setItem(STORAGE_VOLUME, String(this.volume));
      localStorage.setItem(STORAGE_MUTED, String(this.isMuted));
    },
    applyVolumeToAudio() {
      const audio = this.$refs.audioPlayer;
      if (audio) {
        audio.volume = this.isMuted ? 0 : this.volume;
      }
    },
    toggleMute() {
      this.isMuted = !this.isMuted;
      this.applyVolumeToAudio();
      this.savePreferences();

      if (this.isMuted) {
        this.pauseMusic();
      } else if (AuthService.isAuthenticated()) {
        this.attemptPlay();
      }
    },
    onVolumeInput(event) {
      this.volume = Math.min(100, Math.max(0, Number(event.target.value))) / 100;
      this.isMuted = this.volume === 0;
      this.applyVolumeToAudio();
      this.savePreferences();

      if (!this.isMuted && AuthService.isAuthenticated() && !this.isPlaying) {
        this.attemptPlay();
      }
    },
    checkInitialState() {
      if (AuthService.isAuthenticated() && !this.isMuted) {
        this.attemptPlay();
      }
    },
    handleValidSession() {
      if (!this.isMuted) {
        this.attemptPlay();
      }
    },
    handleInvalidSession() {
      this.stopMusic();
    },
    handleUserInteraction() {
      this.userInteracted = true;
      if (AuthService.isAuthenticated() && !this.isPlaying && !this.isMuted) {
        this.attemptPlay();
      }

      if (this.isPlaying) {
        window.removeEventListener('click', this.handleUserInteraction);
        window.removeEventListener('keydown', this.handleUserInteraction);
      }
    },
    async attemptPlay() {
      const audio = this.$refs.audioPlayer;
      if (!audio || this.isMuted) return;

      try {
        this.applyVolumeToAudio();
        await audio.play();
        this.isPlaying = true;
      } catch (error) {
        console.warn('Autoplay bloqueado o falló:', error);
      }
    },
    pauseMusic() {
      const audio = this.$refs.audioPlayer;
      if (audio && this.isPlaying) {
        audio.pause();
        this.isPlaying = false;
      }
    },
    resumeMusic() {
      if (this.isMuted) return;

      const audio = this.$refs.audioPlayer;
      if (audio && !this.isPlaying && AuthService.isAuthenticated()) {
        this.applyVolumeToAudio();
        audio.play().then(() => {
          this.isPlaying = true;
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
};
</script>

<style scoped>
.music-control {
  position: fixed;
  bottom: 24px;
  left: 24px;
  z-index: 9998;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: rgba(46, 3, 39, 0.92);
  border: 1px solid rgba(255, 200, 39, 0.35);
  border-radius: 999px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
}

.music-control__btn {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 200, 39, 0.15);
  color: #ffc827;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.music-control__btn:hover {
  background: rgba(255, 200, 39, 0.28);
}

.music-control__slider {
  width: 90px;
  accent-color: #ffc827;
  cursor: pointer;
}

.music-control__slider:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

@media (max-width: 575px) {
  .music-control {
    bottom: 16px;
    left: 16px;
    padding: 6px 10px;
  }

  .music-control__slider {
    width: 72px;
  }
}
</style>
