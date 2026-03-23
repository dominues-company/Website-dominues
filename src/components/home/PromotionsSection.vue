<template>
  <section id="promociones" class="container py-5">
    <div class="text-center mb-5">
      <h2 class="fw-bold">{{ title }}</h2>
      <p class="text-muted">{{ subtitle }}</p>
    </div>
    
    <div class="row">
      <div class="col-lg-6 mb-4" v-for="(promo, index) in promotions" :key="index">
        <div class="card">
          <div class="row g-0">
            <div class="col-md-4">
              <img :src="promo.image" class="img-fluid rounded-start h-100 w-100" style="object-fit: cover;" :alt="promo.title">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{{ promo.title }}</h5>
                <p class="card-text">{{ promo.description }}</p>
                <button class="btn btn-primary" @click="getPromotion(promo)">{{ promo.buttonText }}</button>
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
  name: 'PromotionsSection',
  data() {
    return {
      title: 'Promociones Especiales',
      subtitle: 'Ofertas exclusivas que no querrás perderte',
      promotions: [
        {
          title: 'Bono de Fin de Semana',
          description: '50% extra en todos tus depósitos durante el fin de semana + 20 giros gratis.',
          image: 'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
          buttonText: 'Obtener Bono'
        },
        {
          title: 'Torneos Semanales',
          description: 'Participa en nuestros torneos semanales de dominó con un premio garantizado de $10,000.',
          image: 'https://images.unsplash.com/photo-1564013434775-f71db0030976?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
          buttonText: 'Inscribirme'
        }
      ]
    }
  },
  methods: {
    getPromotion(promo) {
      // Aquí iría la lógica para aplicar la promoción
      alert(`Aplicando promoción: ${promo.title}`)
    }
  }
}
</script>