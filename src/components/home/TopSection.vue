<template>
  <section class="top-section padding-top padding-bottom bg_img" :style="{ background: `url(${getImageUrl('bg_top.png')}) center` }">
    <div class="container">
      <div class="row align-items-center gy-5">
        <div class="col-lg-4">
          <h3 class="part-title mb-4">Partidas recientes</h3>
          <div class="top-investor-slider">
            <div v-for="player in recentPlayers" :key="'recent-' + player.name" class="investor-item">
              <div class="investor-item__thumb">
                <img
                  :src="getAvatarUrl(player.avatarSeed)"
                  :alt="player.name"
                  class="player-avatar"
                  loading="lazy"
                >
                <p class="amount">{{ player.amount }}</p>
              </div>
              <div class="investor-item__content">
                <h6 class="name">{{ player.name }}</h6>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="cla-wrapper text-center">
            <h3 class="title mb-4">Dominó online, <br> partidas con premios reales</h3>
            <a :href="isAuthenticated ? '#games' : '/login'" class="cmn--btn active btn--md radius-0">Empezar a jugar</a>
            <div class="thumb">
              <img :src="getImageUrl('img_20.png')" alt="Premios">
            </div>
            <p class="top-tagline">
              Demuestra quién manda en la mesa! 🀄<br>
              Juega tus mejores piedras y acumula Dcoins todos los días
            </p>
          </div>
        </div>

        <div class="col-lg-4">
          <h3 class="part-title mb-4">Jugadores activos</h3>
          <div class="top-investor-slider">
            <div v-for="player in activePlayers" :key="'active-' + player.name" class="investor-item">
              <div class="investor-item__thumb">
                <img
                  :src="getAvatarUrl(player.avatarSeed)"
                  :alt="player.name"
                  class="player-avatar"
                  loading="lazy"
                >
                <p class="amount">{{ player.amount }}</p>
              </div>
              <div class="investor-item__content">
                <h6 class="name">{{ player.name }}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AuthService from '@/services/auth.service';

export default {
  name: 'TopSection',
  data() {
    return {
      recentPlayers: [
        { name: 'Carlos Rodríguez', amount: '200 Dcoins', avatarSeed: 'carlos-mesa-ganada' },
        { name: 'Luis Mendoza', amount: '120 Dcoins', avatarSeed: 'luis-racha-120' },
        { name: 'Valentina Pérez', amount: '50 Dcoins', avatarSeed: 'valentina-ganadora' }
      ],
      activePlayers: [
        { name: 'Valentina Pérez', amount: '50 Dcoins', avatarSeed: 'valentina-ganadora-v2' },
        { name: 'Carlos Rodríguez', amount: '200 Dcoins', avatarSeed: 'carlos-mesa-ganada-v2' },
        { name: 'Luis Mendoza', amount: '120 Dcoins', avatarSeed: 'luis-racha-120-v2' }
      ]
    };
  },
  computed: {
    isAuthenticated() {
      return AuthService.isAuthenticated();
    }
  },
  methods: {
    getImageUrl(name) {
      return require(`@/assets/img/${name}`);
    },
    getAvatarUrl(seed) {
      const params = new URLSearchParams({
        seed,
        backgroundColor: 'ffc827,f5d78e,e8b86d',
        radius: '50'
      });
      return `https://api.dicebear.com/9.x/personas/svg?${params.toString()}`;
    }
  }
};
</script>

<style scoped>
.player-avatar {
  object-fit: cover;
  background: #ffc827;
}

.top-tagline {
  margin-top: 1.25rem;
  margin-bottom: 0;
  font-size: 15px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.88);
  font-weight: 400;
  max-width: 320px;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 991px) {
  .top-tagline {
    font-size: 14px;
    max-width: 100%;
    padding: 0 0.5rem;
  }
}
</style>
