<template>
  <section class="faq-section padding-top padding-bottom overflow-hidden" id="faq">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-7 col-xl-6">
          <div class="section-header text-center">
            <h2 class="section-header__title">Preguntas Frecuentes</h2>
            <p>Todo lo que necesitas saber sobre Dominues. Si tienes otra duda, contáctanos.</p>
          </div>
        </div>
      </div>
      <div class="faq-wrapper row justify-content-between">
        <div class="col-lg-6">
          <div class="faq-item faq-item-vue" v-for="(item, index) in faqLeft" :key="'left-' + index">
            <div class="faq-item__title" @click="toggle(index, 'left')">
              <h5 class="title">{{ item.q }}</h5>
              <i class="fas fa-chevron-down faq-chevron" :class="{ rotated: openLeft === index }"></i>
            </div>
            <div class="faq-item__content" :class="{ open: openLeft === index }">
              <p v-html="item.a"></p>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="faq-item faq-item-vue" v-for="(item, index) in faqRight" :key="'right-' + index">
            <div class="faq-item__title" @click="toggle(index, 'right')">
              <h5 class="title">{{ item.q }}</h5>
              <i class="fas fa-chevron-down faq-chevron" :class="{ rotated: openRight === index }"></i>
            </div>
            <div class="faq-item__content" :class="{ open: openRight === index }">
              <p v-html="item.a"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="shapes">
      <img :src="getImageUrl('img_14.png')" alt="faq" class="shape shape1">
    </div>
  </section>
</template>

<script>
export default {
  name: 'FaqSection',
  data() {
    return {
      openLeft: null,
      openRight: null,
      faqLeft: [
        {
          q: '¿Qué es Dominues?',
          a: 'Es la plataforma definitiva para jugar dominó online con personas reales. Aquí no juegas contra la computadora, juegas contra otros apasionados del dominó y pones a prueba tu estrategia.'
        },
        {
          q: '¿Qué son los "Dcoins"?',
          a: 'Es nuestra moneda interna. Para que todo sea más fácil, te diremos cuánto vale. Así siempre sabes exactamente cuánto tienes y cuánto ganas.'
        },
        {
          q: '¿Cómo cargo saldo en mi cuenta?',
          a: '¡Es muy fácil! Tienes dos opciones:<br><strong>Si estás en Venezuela:</strong> Elige "Pago Móvil", dale al botón de WhatsApp y envíanos tu comprobante. ¡Te cargamos en minutos!<br><strong>Si estás en Chile o el resto del mundo:</strong> Elige "Pago Automático" y usa Cryptomus. Se acredita al instante sin hablar con nadie.'
        },
        {
          q: '¿Cómo retiro mis ganancias?',
          a: '¡Felicidades por ganar! Para retirar, solo ve a la sección de Retiros, elige tu método favorito (Banco o Cripto) y solicita el monto. Nosotros verificamos que todo esté en orden y te enviamos tu dinero de forma manual por seguridad.'
        }
      ],
      faqRight: [
        {
          q: '¿Es seguro jugar aquí?',
          a: 'Totalmente. Usamos servidores de alta velocidad (Render) para que no haya lag y tecnología de encriptación para proteger tus datos. Además, nuestro equipo supervisa las mesas para asegurar que el juego sea siempre limpio.'
        },
        {
          q: '¿Qué pasa si se me cae el internet en plena partida?',
          a: 'El dominó no espera: el sistema jugará por ti para no trancar la mesa, pero trata de jugar siempre con buena señal para no perder tu ventaja.'
        },
        {
          q: '¿Puedo jugar desde mi teléfono?',
          a: '¡Claro! No necesitas descargar nada pesado. Solo entra a nuestra web desde el navegador de tu celular, inicia sesión y ¡listo para la acción!'
        },
        {
          q: '¿Tengo un problema, quién me ayuda?',
          a: '¡Estamos contigo! Dale clic al botón de Soporte (WhatsApp o Telegram) y un agente real te ayudará a resolver cualquier duda en tiempo récord.'
        }
      ]
    };
  },
  methods: {
    getImageUrl(name) {
      return require(`@/assets/img/${name}`);
    },
    toggle(index, side) {
      if (side === 'left') {
        this.openLeft = this.openLeft === index ? null : index;
        this.openRight = null;
      } else {
        this.openRight = this.openRight === index ? null : index;
        this.openLeft = null;
      }
    }
  }
};
</script>

<style scoped>
.faq-item__title::before {
  display: none !important;
}
.faq-item__title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.faq-chevron {
  flex-shrink: 0;
  color: #FFC827;
  font-size: 14px;
  transition: transform 0.3s ease;
}
.faq-chevron.rotated {
  transform: rotate(180deg);
}
.faq-item__content {
  display: none;
  padding-bottom: 12px;
}
.faq-item__content.open {
  display: block;
}
.faq-item__content p {
  margin: 0;
  padding-top: 4px;
}
</style>
