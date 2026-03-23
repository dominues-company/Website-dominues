<template>
  <section class="container py-5">
    <div class="text-center mb-5">
      <h2 class="fw-bold">{{ title }}</h2>
      <p class="text-muted">{{ subtitle }}</p>
    </div>
    
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="d-flex flex-wrap justify-content-center gap-4">
          <img v-for="(method, index) in paymentMethods" :key="index" 
               :src="method.logo" :alt="method.name" height="50">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PaymentMethods',
  data() {
    return {
      title: 'Métodos de Pago',
      subtitle: 'Depósitos y retiros rápidos y seguros',
      paymentMethods: [
        { name: 'Visa', logo: 'https://logowik.com/content/uploads/images/visa-payment-card1873.jpg' },
        { name: 'MasterCard', logo: 'https://logowik.com/content/uploads/images/897_mastercard.jpg' },
        { name: 'PayPal', logo: 'https://logowik.com/content/uploads/images/paypal7428.jpg' },
        { name: 'Bitcoin', logo: 'https://download.logo.wine/logo/Bitcoin/Bitcoin-Logo.wine.png' },
        { name: 'Ethereum', logo: 'https://logowik.com/content/uploads/images/ethereum3291.jpg' },
        { name: 'Neteller', logo: 'https://logowik.com/content/uploads/images/neteller1695.jpg' },
        { name: 'Skrill', logo: 'https://logowik.com/content/uploads/images/skrill6712.jpg' }
      ]
    }
  }
}
</script>