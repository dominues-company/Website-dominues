<template>
  <div class="jackpot-counter text-center">
    <div class="container">
      <span>Jackpot Actual: <span class="counter-value">{{ formattedJackpot }}</span> — ¡Juega ahora y conviértete en el próximo ganador!</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JackpotCounter',
  data() {
    return {
      jackpotValue: 1234567
    }
  },
  computed: {
    formattedJackpot() {
      return '$' + this.jackpotValue.toLocaleString()
    }
  },
  mounted() {
    // Actualizar el valor del Jackpot cada 3 segundos
    setInterval(() => {
      this.jackpotValue += Math.floor(Math.random() * 100)
    }, 3000)
  }
}
</script>