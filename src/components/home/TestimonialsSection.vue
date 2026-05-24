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
        <div
          v-for="testimonial in testimonials"
          :key="testimonial.name"
          class="single-slide"
        >
          <div class="testimonial-item bg_img" :style="{ background: `url(${getImageUrl('bg_test.png')}) center` }">
            <div class="testimonial-inner">
              <div class="testimonial-item__content">
                <div class="quote-icon"><i class="fas fa-quote-left"></i></div>
                <p>{{ testimonial.quote }}</p>
              </div>
              <div class="thumb-wrapper">
                <div class="thumb">
                  <img
                    :src="getAvatarUrl(testimonial.avatarSeed)"
                    :alt="testimonial.name"
                    class="testimonial-avatar"
                    loading="lazy"
                  >
                </div>
                <div class="content">
                  <h6 class="name">{{ testimonial.name }}</h6>
                  <span class="designation">{{ testimonial.designation }}</span>
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
  name: 'TestimonialsSection',
  data() {
    return {
      testimonials: [
        {
          name: 'Carlos Rodríguez',
          designation: 'Jugador reciente',
          quote: 'La encontré buscando dominó online. Es sencilla: entras, eliges mesa y juegas. Sin complicaciones.',
          avatarSeed: 'carlos-testimonial'
        },
        {
          name: 'María González',
          designation: 'Usuario nuevo',
          quote: 'Llevo pocos días jugando. Me gusta que puedo entrar rápido a una mesa y retar a alguien al momento.',
          avatarSeed: 'maria-testimonial'
        },
        {
          name: 'José Martínez',
          designation: 'Jugador habitual',
          quote: 'Plataforma recién lanzada, pero el juego va fluido. Ojalá se una más gente para tener más rivales.',
          avatarSeed: 'jose-testimonial'
        },
        {
          name: 'Ana Pérez',
          designation: 'De los primeros',
          quote: 'Probé la plataforma en sus primeros días. Funciona bien y se nota que van mejorando cosas poco a poco.',
          avatarSeed: 'ana-testimonial'
        }
      ]
    };
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
.testimonial-avatar {
  object-fit: cover;
}
</style>
