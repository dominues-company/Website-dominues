<template>
   <!-- Banner Section Starts Here -->
    <section class="banner-section bg_img overflow-hidden" :style="{ background: `url(${getImageUrl('bg.png')}) center` }">
        <div class="container">
            <div class="banner-wrapper d-flex flex-wrap align-items-center">
                <div class="banner-content">
                    <h1 class="banner-content__title">Juega <span class="text--base">Dominó Online</span> y Gana Increíbles Premios</h1>
                    <p class="banner-content__subtitle">JUEGA DOMINÓ ONLINE Y GANA CRIPTOMONEDAS. LA MEJOR PLATAFORMA DE DOMINÓ EN LÍNEA.</p>
                    <div class="button-wrapper">
                        <a href="/login" class="cmn--btn btn--lg">Juega Ahora</a>
                        <a href="/register" class="cmn--btn btn--lg">Regístrate</a>
                    </div>
                    <img :src="getImageUrl('img_1.png')" alt="" class="shape1">
                </div>
                <div class="banner-thumb">
                    <img :src="getImageUrl('img_2.png')" alt="banner">
                </div>
            </div>
        </div>
    </section>
    <!-- Banner Section Ends Here -->
</template>

<script>
export default {
  name: 'HeroSection',
  methods: {
    getImageUrl(name) {
      return require(`@/assets/img/${name}`)
    }
  }
}
</script>