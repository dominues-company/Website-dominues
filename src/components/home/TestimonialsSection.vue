<template>
  <section class="testimonial-section padding-top padding-bottom overflow-hidden">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-7 col-xl-6">
                    <div class="section-header text-center">
                        <h2 class="section-header__title">Lo que dicen nuestros Jugadores</h2>
                        <p>En nuestra plataforma de dominó, los jugadores disfrutan de una experiencia única, competitiva y divertida. Aquí te mostramos algunas opiniones de nuestros usuarios satisfechos.</p>
                    </div>
                </div>
            </div>
            <div class="testimonial-slider">
                <div class="single-slide">
                    <div class="testimonial-item bg_img" :style="{ background: `url(${getImageUrl('bg_test.png')}) center` }">
                        <div class="testimonial-inner">
                            <div class="testimonial-item__content">
                                <div class="quote-icon"><i class="fas fa-quote-left"></i></div>
                                <p>Me encanta jugar dominó en línea con mis amigos. La plataforma es increíblemente fácil de usar y siempre me ofrece una gran experiencia.</p>
                            </div>
                            <div class="thumb-wrapper">
                                <div class="thumb">
                                    <img :src="getImageUrl('img_26.png')" alt="top">
                                </div>
                                <div class="content">
                                    <h6 class="name">Carlos Rodríguez</h6>
                                    <span class="designation">Jugador de Dominó</span>
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
                                <p>Una plataforma excelente para mejorar mis habilidades en dominó. ¡He ganado varios torneos y cada día es más emocionante!</p>
                            </div>
                            <div class="thumb-wrapper">
                                <div class="thumb">
                                    <img :src="getImageUrl('img_27.png')" alt="top">
                                </div>
                                <div class="content">
                                    <h6 class="name">María González</h6>
                                    <span class="designation">Jugadora Profesional</span>
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
                                <p>Me encanta la comunidad de jugadores. Es fácil conectarse y siempre es un reto jugar contra otros de todo el mundo.</p>
                            </div>
                            <div class="thumb-wrapper">
                                <div class="thumb">
                                    <img :src="getImageUrl('img_28.png')" alt="top">
                                </div>
                                <div class="content">
                                    <h6 class="name">José Martínez</h6>
                                    <span class="designation">Jugador Habitual</span>
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
                                <p>Una plataforma que siempre está actualizada y ofrece nuevas características. ¡Mejoré mucho en mi juego desde que empecé a jugar aquí!</p>
                            </div>
                            <div class="thumb-wrapper">
                                <div class="thumb">
                                    <img :src="getImageUrl('img_29.png')" alt="top">
                                </div>
                                <div class="content">
                                    <h6 class="name">Ana Pérez</h6>
                                    <span class="designation">Jugadora Experta</span>
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