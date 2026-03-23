<template>
   <!-- About Section Starts Here -->
    <section class="about-section padding-top padding-bottom overflow-hidden" id="about">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6">
                    <div class="about-content">
                        <div class="section-header">
                            <h2 class="section-header__title">Sobre el Juego de Dominó</h2>
                            <p>El dominó es un juego de mesa popular que se juega con fichas rectangulares divididas en dos partes. Cada jugador recibe un número determinado de fichas y el objetivo es colocar todas las fichas en el tablero antes que los demás. En nuestro juego online de dominó, puedes disfrutar de partidas emocionantes contra jugadores de todo el mundo y poner a prueba tus habilidades estratégicas.</p>
                        </div>
                        <!-- <a href="#" class="cmn--btn active">Know More</a> -->
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="aobut-thumb section-thumb">
                        <img :src="getImageUrl('img_3.png')" alt="about" class="ms-lg-5">
                    </div>
                </div>
            </div>
        </div>
        <div class="shapes">
            <img :src="getImageUrl('img_4.png')" alt="about" class="shape shape1">
        </div>
    </section>
    <!-- About Section Ends Here -->
</template>

<script>
export default {
  name: 'AboutSection',
  methods: {
    getImageUrl(name) {
      return require(`@/assets/img/${name}`)
    }
  }
}
</script>