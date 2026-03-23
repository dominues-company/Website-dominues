<template>
  <section class="top-section padding-top padding-bottom bg_img" :style="{ background: `url(${getImageUrl('bg_top.png')}) center` }">
        <div class="container">
            <div class="row align-items-center gy-5">
                <div class="col-lg-4">
                    <h3 class="part-title mb-4">Últimos Ganadores</h3>
                    <div class="top-investor-slider">
                        <div class="investor-item">
                            <div class="investor-item__thumb">
                                <img :src="getImageUrl('img_15.png')" alt="top">
                                <p class="amount">$150</p>
                            </div>
                            <div class="investor-item__content">
                                <h6 class="name">Carlos Rodríguez</h6>
                            </div>
                        </div>
                        <div class="investor-item">
                            <div class="investor-item__thumb">
                                <img :src="getImageUrl('img_16.png')" alt="top">
                                <p class="amount">$270</p>
                            </div>
                            <div class="investor-item__content">
                                <h6 class="name">María González</h6>
                            </div>
                        </div>
                        <div class="investor-item">
                            <div class="investor-item__thumb">
                                <img :src="getImageUrl('img_17.png')" alt="top">
                                <p class="amount">$52000</p>
                            </div>
                            <div class="investor-item__content">
                                <h6 class="name">José Martínez</h6>
                            </div>
                        </div>
                        <div class="investor-item">
                            <div class="investor-item__thumb">
                                <img :src="getImageUrl('img_18.png')" alt="top">
                                <p class="amount">$150</p>
                            </div>
                            <div class="investor-item__content">
                                <h6 class="name">Carlos Rodríguez</h6>
                            </div>
                        </div>
                        <div class="investor-item">
                            <div class="investor-item__thumb">
                                <img :src="getImageUrl('img_19.png')" alt="top">
                                <p class="amount">$50</p>
                            </div>
                            <div class="investor-item__content">
                                <h6 class="name">José Martínez</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="cla-wrapper text-center">
                        <h3 class="title mb-4">¡GANA!!! y <br> Obtén millones de dólares</h3>
                        <a :href="isAuthenticated ? '#games' : '/login'" class="cmn--btn active btn--md radius-0">Jugar Ahora</a>
                        <div class="thumb">
                            <img :src="getImageUrl('img_20.png')" alt="top">
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <h3 class="part-title mb-4">Mejores Jugadores</h3>
                    <div class="top-investor-slider">
                        <div class="investor-item">
                            <div class="investor-item__thumb">
                                <img :src="getImageUrl('img_21.png')" alt="top">
                                <p class="amount">$150</p>
                            </div>
                            <div class="investor-item__content">
                                <h6 class="name">Carlos Rodríguez</h6>
                            </div>
                        </div>
                        <div class="investor-item">
                            <div class="investor-item__thumb">
                                <img :src="getImageUrl('img_22.png')" alt="top">
                                <p class="amount">$270</p>
                            </div>
                            <div class="investor-item__content">
                                <h6 class="name">María González</h6>
                            </div>
                        </div>
                        <div class="investor-item">
                            <div class="investor-item__thumb">
                                <img :src="getImageUrl('img_23.png')" alt="top">
                                <p class="amount">$52000</p>
                            </div>
                            <div class="investor-item__content">
                                <h6 class="name">José Martínez</h6>
                            </div>
                        </div>
                        <div class="investor-item">
                            <div class="investor-item__thumb">
                                <img :src="getImageUrl('img_24.png')" alt="top">
                                <p class="amount">$150</p>
                            </div>
                            <div class="investor-item__content">
                                <h6 class="name">Carlos Rodríguez</h6>
                            </div>
                        </div>
                        <div class="investor-item">
                            <div class="investor-item__thumb">
                                <img :src="getImageUrl('img_25.png')" alt="top">
                                <p class="amount">$50</p>
                            </div>
                            <div class="investor-item__content">
                                <h6 class="name">José Martínez</h6>
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
  methods: {
    getImageUrl(name) {
      return require(`@/assets/img/${name}`)
    }
  }
}
</script>