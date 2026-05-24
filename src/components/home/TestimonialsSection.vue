<template>
  <section class="testimonial-section padding-top padding-bottom overflow-hidden">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-7 col-xl-6">
                    <div class="section-header text-center">
                        <h2 class="section-header__title">Estamos empezando</h2>
                        <p>Somos una plataforma nueva de dominó online. Cada partida nos ayuda a mejorar. Si te gusta el juego, queremos que seas de los primeros en probarla.</p>
                    </div>
                </div>
            </div>
            <div class="testimonial-slider">
                <div class="single-slide">
                    <div class="testimonial-item bg_img" :style="{ background: `url(${getImageUrl('bg_test.png')}) center` }">
                        <div class="testimonial-inner">
                            <div class="testimonial-item__content">
                                <div class="quote-icon"><i class="fas fa-quote-left"></i></div>
                                <p>La encontré buscando dominó online. Es sencilla: entras, eliges mesa y juegas. Sin complicaciones.</p>
                            </div>
                            <div class="thumb-wrapper">
                                <div class="thumb">
                                    <img :src="getImageUrl('img_26.png')" alt="top">
                                </div>
                                <div class="content">
                                    <h6 class="name">Carlos Rodríguez</h6>
                                    <span class="designation">Jugador reciente</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="single-slide">
                    <div class="testimonial-item bg_img" :style="{ background: `url(${getImageUrl('bg_test.png')}) center` }">
                        <div class="testimonial-inner">
                            <div class="testimonial-item__content">
                                <div class="quote-icon"><i class="fas fa-quote-left"></i></div>
                                <p>Llevo pocos días jugando. Me gusta que puedo entrar rápido a una mesa y retar a alguien al momento.</p>
                            </div>
                            <div class="thumb-wrapper">
                                <div class="thumb">
                                    <img :src="getImageUrl('img_27.png')" alt="top">
                                </div>
                                <div class="content">
                                    <h6 class="name">María González</h6>
                                    <span class="designation">Usuario nuevo</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="single-slide">
                    <div class="testimonial-item bg_img" :style="{ background: `url(${getImageUrl('bg_test.png')}) center` }">
                        <div class="testimonial-inner">
                            <div class="testimonial-item__content">
                                <div class="quote-icon"><i class="fas fa-quote-left"></i></div>
                                <p>Plataforma recién lanzada, pero el juego va fluido. Ojalá se una más gente para tener más rivales.</p>
                            </div>
                            <div class="thumb-wrapper">
                                <div class="thumb">
                                    <img :src="getImageUrl('img_28.png')" alt="top">
                                </div>
                                <div class="content">
                                    <h6 class="name">José Martínez</h6>
                                    <span class="designation">Jugador habitual</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="single-slide">
                    <div class="testimonial-item bg_img" :style="{ background: `url(${getImageUrl('bg_test.png')}) center` }">
                        <div class="testimonial-inner">
                            <div class="testimonial-item__content">
                                <div class="quote-icon"><i class="fas fa-quote-left"></i></div>
                                <p>Probé la plataforma en sus primeros días. Funciona bien y se nota que van mejorando cosas poco a poco.</p>
                            </div>
                            <div class="thumb-wrapper">
                                <div class="thumb">
                                    <img :src="getImageUrl('img_29.png')" alt="top">
                                </div>
                                <div class="content">
                                    <h6 class="name">Ana Pérez</h6>
                                    <span class="designation">De los primeros</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="shapes">
            <img :src="getImageUrl('img_30.png')" alt="why" class="shape shape1">
        </div>
    </section>
</template>

<script>
export default {
  name: 'AppDownload',
  methods: {
    getImageUrl(name) {
      return require(`@/assets/img/${name}`)
    }
  }
}
</script>