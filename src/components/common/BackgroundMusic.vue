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
  <audio v-show="false" ref="audioPlayer" loop preload="auto">
    <source src="/assets/sounds/music_game.mp3" type="audio/mpeg">
  </audio>
</template>

<script>
import { mapGetters } from 'vuex';
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
      isMuted: false,
      pausedByVisibility: false,
      soundEnabledByUser: false
    };
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
    showControl() {
      return this.isAuthenticated
        && !this.$route.matched.some(record => record.meta.hideLayout);
    },
    volumePercent() {
      return Math.round(this.volume * 100);
    },
    isMobile() {
      return window.matchMedia('(max-width: 991px)').matches;
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
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    window.addEventListener('pagehide', this.handlePageHide);
    window.addEventListener('blur', this.handleWindowBlur);

    this.checkInitialState();
  },
  beforeUnmount() {
    window.removeEventListener('valid-session', this.handleValidSession);
    window.removeEventListener('invalid-session', this.handleInvalidSession);
    window.removeEventListener('pause-background-music', this.pauseMusic);
    window.removeEventListener('resume-background-music', this.resumeMusic);
    window.removeEventListener('click', this.handleUserInteraction);
    window.removeEventListener('keydown', this.handleUserInteraction);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    window.removeEventListener('pagehide', this.handlePageHide);
    window.removeEventListener('blur', this.handleWindowBlur);
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
      } else if (savedMuted === 'false') {
        this.isMuted = false;
        this.soundEnabledByUser = true;
      } else if (this.isMobile) {
        // En móvil: sin sonido hasta que el usuario lo active explícitamente
        this.isMuted = true;
      }
    },
    isPageVisible() {
      return document.visibilityState === 'visible';
    },
    canPlay() {
      if (!this.isAuthenticated || this.isMuted || !this.isPageVisible()) {
        return false;
      }
      if (this.isMobile && !this.soundEnabledByUser) {
        return false;
      }
      return true;
    },
    markSoundEnabledByUser() {
      this.soundEnabledByUser = true;
      this.isMuted = false;
    },
    handleVisibilityChange() {
      if (document.visibilityState === 'hidden') {
        if (this.isPlaying) {
          this.pausedByVisibility = true;
        }
        this.pauseMusic();
        return;
      }

      if (this.pausedByVisibility && this.canPlay()) {
        this.pausedByVisibility = false;
        this.attemptPlay();
      }
    },
    handlePageHide() {
      this.pausedByVisibility = this.isPlaying;
      this.pauseMusic();
    },
    handleWindowBlur() {
      // Respaldo en iOS/Android al cambiar a otra app (p. ej. WhatsApp)
      if (!this.isPageVisible()) {
        this.handleVisibilityChange();
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
      if (this.isMuted) {
        this.markSoundEnabledByUser();
      } else {
        this.isMuted = true;
      }
      this.applyVolumeToAudio();
      this.savePreferences();

      if (this.isMuted) {
        this.pauseMusic();
      } else {
        this.attemptPlay();
      }
    },
    onVolumeInput(event) {
      this.volume = Math.min(100, Math.max(0, Number(event.target.value))) / 100;
      if (this.volume === 0) {
        this.isMuted = true;
      } else {
        this.markSoundEnabledByUser();
      }
      this.applyVolumeToAudio();
      this.savePreferences();

      if (!this.isMuted && !this.isPlaying) {
        this.attemptPlay();
      }
    },
    checkInitialState() {
      if (this.canPlay()) {
        this.attemptPlay();
      }
    },
    handleValidSession() {
      if (this.canPlay()) {
        this.attemptPlay();
      }
    },
    handleInvalidSession() {
      this.stopMusic();
    },
    handleUserInteraction() {
      this.userInteracted = true;
      // En móvil no autoplay con taps genéricos; solo con el control de volumen
      if (!this.isMobile && this.canPlay() && !this.isPlaying) {
        this.attemptPlay();
      }

      if (this.isPlaying) {
        window.removeEventListener('click', this.handleUserInteraction);
        window.removeEventListener('keydown', this.handleUserInteraction);
      }
    },
    async attemptPlay() {
      const audio = this.$refs.audioPlayer;
      if (!audio || !this.canPlay()) return;

      try {
        this.applyVolumeToAudio();
        await audio.play();
        this.isPlaying = true;
        this.pausedByVisibility = false;
      } catch (error) {
        console.warn('Autoplay bloqueado o falló:', error);
      }
    },
    pauseMusic() {
      const audio = this.$refs.audioPlayer;
      if (audio) {
        audio.pause();
        this.isPlaying = false;
      }
    },
    resumeMusic() {
      if (!this.canPlay()) return;

      const audio = this.$refs.audioPlayer;
      if (audio && !this.isPlaying) {
        this.applyVolumeToAudio();
        audio.play().then(() => {
          this.isPlaying = true;
          this.pausedByVisibility = false;
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
  },
  watch: {
    isAuthenticated(authenticated) {
      if (!authenticated) {
        this.stopMusic();
        this.soundEnabledByUser = false;
      } else if (this.canPlay()) {
        this.attemptPlay();
      }
    },
    showControl(visible) {
      if (!visible) {
        this.pauseMusic();
      } else if (this.canPlay()) {
        this.attemptPlay();
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
