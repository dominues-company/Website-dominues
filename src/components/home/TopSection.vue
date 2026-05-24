<template>
  <section class="top-section padding-top padding-bottom bg_img" :style="{ background: `url(${getImageUrl('bg_top.png')}) center` }">
        <div class="container">
            <div class="row align-items-center gy-5">
                <div class="col-lg-4">
                    <h3 class="part-title mb-4">Partidas recientes</h3>
                    <div class="top-investor-slider">
                        <div v-for="player in recentPlayers" :key="'recent-' + player.name" class="investor-item">
                            <div class="investor-item__thumb">
                                <img :src="getImageUrl(player.image)" alt="top">
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
                            <img :src="getImageUrl('img_20.png')" alt="top">
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <h3 class="part-title mb-4">Jugadores activos</h3>
                    <div class="top-investor-slider">
                        <div v-for="player in activePlayers" :key="'active-' + player.name" class="investor-item">
                            <div class="investor-item__thumb">
                                <img :src="getImageUrl(player.image)" alt="top">
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
export default {
  name: 'FeatureBox',
  data() {
    return {
      recentPlayers: [
        { name: 'Carlos Rodríguez', amount: '$150', image: 'img_15.png' },
        { name: 'María González', amount: '$270', image: 'img_16.png' },
        { name: 'José Martínez', amount: '$52', image: 'img_17.png' }
      ],
      activePlayers: [
        { name: 'Carlos Rodríguez', amount: '$150', image: 'img_21.png' },
        { name: 'María González', amount: '$270', image: 'img_22.png' },
        { name: 'José Martínez', amount: '$52', image: 'img_23.png' }
      ]
    }
  },
  methods: {
    getImageUrl(name) {
      return require(`@/assets/img/${name}`)
    }
  }
}
</script>