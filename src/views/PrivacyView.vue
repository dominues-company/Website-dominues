<template>
  <LegalPageLayout
    title="Política de Privacidad"
    :content="content"
  />
</template>

<script>
import LegalPageLayout from '@/components/legal/LegalPageLayout.vue';

export default {
  name: 'PrivacyView',
  components: { LegalPageLayout },
  data() {
    return {
      content: `
        <p>En Dominues recopilamos solo los datos mínimos necesarios (correo, usuario, país) para gestionar tu cuenta y la seguridad del jugador. No compartimos ni vendemos datos a terceros.</p>
        <p>Al utilizar la plataforma, consientes el tratamiento de tus datos conforme a esta finalidad. Utilizamos pasarelas de terceros (como Cryptomus); no almacenamos claves privadas ni datos sensibles de tarjetas.</p>
        <p>Nos reservamos el derecho de solicitar prueba de identidad (KYC) antes de procesar retiros. Los datos se tratan según nuestra <a href="/terms" style="color:#FFC827;">Política de Privacidad y Términos de Uso</a> completa.</p>
        <p><strong>Última actualización:</strong> 2025. Para dudas sobre privacidad o datos: <a href="mailto:legal@dominues.com" style="color:#FFC827;">legal@dominues.com</a>. Soporte general: <a href="mailto:support@dominues.com" style="color:#FFC827;">support@dominues.com</a>. También puedes contactarnos por WhatsApp o Telegram desde la web.</p>
      `
    };
  }
};
</script>
