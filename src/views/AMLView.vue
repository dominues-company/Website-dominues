<template>
  <LegalPageLayout
    title="Política AML (Anti-Lavado de Dinero)"
    :content="content"
  />
</template>

<script>
import LegalPageLayout from '@/components/legal/LegalPageLayout.vue';

export default {
  name: 'AMLView',
  components: { LegalPageLayout },
  data() {
    return {
      content: `
        <h2>Declaración de licitud de fondos</h2>
        <p>El usuario declara que los fondos utilizados para cargar saldo en Dominues (transferencias bancarias P2P/Pago Móvil o cripto) provienen de actividades lícitas y tienen procedencia legítima conforme a la legislación aplicable y estándares internacionales (GAFI).</p>
        <h2>Deslinde P2P</h2>
        <p>En transacciones persona a persona: el titular de la cuenta bancaria o billetera desde la cual se envía el dinero debe coincidir con el titular de la cuenta en Dominues. Se prohíben pagos de terceros. El usuario garantiza que no utiliza la plataforma para triangulación de fondos u otras actividades contrarias a la ley.</p>
        <h2>Bloqueos y KYC</h2>
        <p>Dominues se reserva el derecho de retener fondos de manera preventiva y solicitar documentación adicional (KYC) si detecta patrones inusuales o alertas. Cooperamos con las autoridades competentes en investigaciones legales.</p>
        <p>Para el texto completo de obligaciones y derechos, consulta nuestros <a href="/terms" style="color:#FFC827;">Términos y Condiciones</a>.</p>
      `
    };
  }
};
</script>
