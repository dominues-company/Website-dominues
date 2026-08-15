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
                  :src="getAvatarUrl(player)"
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
            <h3 class="title mb-4">Dominó online, <br> desafíos de destreza</h3>
            <a :href="isAuthenticated ? '#games' : '/login'" class="cmn--btn active btn--md radius-0">Empezar a jugar</a>
            <div class="thumb">
              <img :src="getImageUrl('img_20.png')" alt="Premios">
            </div>
            <p class="top-tagline">
              Demuestra quién manda en la mesa! 🀄<br>
              Juega tus mejores piedras y acumula Bs todos los días
            </p>
          </div>
        </div>

        <div class="col-lg-4">
          <h3 class="part-title mb-4">Jugadores activos</h3>
          <div class="top-investor-slider">
            <div v-for="player in activePlayers" :key="'active-' + player.name" class="investor-item">
              <div class="investor-item__thumb">
                <img
                  :src="getAvatarUrl(player)"
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
import { getPlayerAvatarUrl } from '@/utils/playerAvatar';

export default {
  name: 'TopSection',
  data() {
    return {
      recentPlayers: [
        { name: 'José Gregorio Márquez', amount: '200 Bs', avatarSeed: 'jose-gregorio-marquez', gender: 'male' },
        {
          name: 'Andrés Rangel',
          amount: '120 Bs',
          avatarSeed: 'andres-rangel-sin-arete',
          gender: 'male',
          avatarOverrides: {
            hair: 'mrClean,mrT,fonze',
            facialHairProbability: '40',
            earringsProbability: '0'
          }
        },
        { name: 'Valentina Soto', amount: '50 Bs', avatarSeed: 'valentina-soto', gender: 'female' }
      ],
      activePlayers: [
        { name: 'Valentina Soto', amount: '50 Bs', avatarSeed: 'valentina-soto-activa', gender: 'female' },
        {
          name: 'Luis Herrera',
          amount: '200 Bs',
          avatarSeed: 'luis-herrera-activo',
          gender: 'male',
          avatarOverrides: {
            hair: 'fonze,dannyPhantom,dougFunny',
            facialHair: 'beard',
            facialHairProbability: '60',
            glassesProbability: '35',
            earringsProbability: '0'
          }
        },
        {
          name: 'Pedro Hernandez',
          amount: '120 Bs',
          avatarSeed: 'pedro-hernandez-activo-lentes',
          gender: 'male',
          avatarOverrides: {
            hair: 'mrClean,mrT',
            facialHairProbability: '25',
            glassesProbability: '100',
            earringsProbability: '0'
          }
        }
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
    getAvatarUrl(player) {
      return getPlayerAvatarUrl(player.avatarSeed, player.gender, player.avatarOverrides);
    }
  }
};
</script>

<style scoped>
.player-avatar {
  object-fit: cover;
  background: #ffc827;
}

.investor-item .amount {
  white-space: nowrap;
  padding: 2px 14px;
  width: max-content;
  min-width: max-content;
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
