<template>
  <section class="why-section padding-top padding-bottom overflow-hidden">
        <div class="container">
            <div class="row justify-content-between gy-5">
                <div class="col-lg-5 col-xl-4">
                    <div class="section-header mb-4">
                        <h2 class="section-header__title">¿Por Qué Jugar al Dominó con Nosotros?</h2>
                        <p>En nuestra plataforma, puedes disfrutar de un juego de dominó seguro, divertido y competitivo. Juega contra otros usuarios y mejora tus habilidades mientras te diviertes.</p>
                    </div>
                    <p>Disfruta de la mejor experiencia de juego en línea, donde puedes unirte a partidas con jugadores de todo el mundo. ¡No importa tu nivel de experiencia, tenemos una mesa para ti! Con reglas claras, seguridad garantizada y un ambiente amistoso, siempre es el momento adecuado para jugar al dominó.</p>
                </div>
                <div class="col-lg-7 col-xl-7">
                    <div class="row gy-4 gy-md-5 gy-lg-4 gy-xl-5">
                        <div class="col-lg-6 col-sm-6">
                            <div class="why-item">
                                <div class="why-item__thumb">
                                    <i class="fas fa-shield-alt"></i>
                                </div>
                                <div class="why-item__content">
                                    <h4 class="title">Juegos de Dominó Seguros</h4>
                                    <p>Disfruta de partidas seguras y justas. Nuestra plataforma asegura que todas las partidas sean transparentes y sin trampa.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 col-sm-6">
                            <div class="why-item">
                                <div class="why-item__thumb">
                                    <i class="fas fa-dice-six"></i>
                                </div>
                                <div class="why-item__content">
                                    <h4 class="title">Ambiente Competitivo</h4>
                                    <p>Participa en partidas emocionantes contra jugadores de todo el mundo y demuestra tus habilidades en cada ronda.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 col-sm-6">
                            <div class="why-item">
                                <div class="why-item__thumb">
                                    <i class="fas fa-trophy"></i>
                                </div>
                                <div class="why-item__content">
                                    <h4 class="title">Más Oportunidades de Destacar</h4>
                                    <p>Con nuestros torneos y mesas de desafíos, tendrás muchas oportunidades de demostrar tu destreza y obtener incentivos por mérito.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 col-sm-6">
                            <div class="why-item">
                                <div class="why-item__thumb">
                                    <i class="fas fa-coins"></i>
                                </div>
                                <div class="why-item__content">
                                    <h4 class="title">Participa, Destaca y Redime</h4>
                                    <p>Al competir con nosotros, no solo perfeccionas tu técnica: también puedes obtener Incentivos de Mérito por tu destreza en los desafíos.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="shapes">
            <img :src="getImageUrl('img_13.png')" alt="why" class="shape shape1">
        </div>
    </section>
</template>

<script>
export default {
  name: 'StarSection',
  
  methods: {
    getImageUrl(name) {
      return require(`@/assets/img/${name}`)
    }
  }
}
</script>