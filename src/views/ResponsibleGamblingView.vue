<template>
  <LegalPageLayout
    title="Juego Responsable"
    :content="content"
  />
</template>

<script>
import LegalPageLayout from '@/components/legal/LegalPageLayout.vue';

export default {
  name: 'ResponsibleGamblingView',
  components: { LegalPageLayout },
  data() {
    return {
      content: `
        <h2>Restricción de edad y autoexclusión</h2>
        <p>El uso de Dominues está <strong>prohibido para menores de 18 años</strong> (o la mayoría de edad legal en tu país). Nos reservamos el derecho de solicitar prueba de edad en cualquier momento.</p>
        <p>Si sientes que el juego está afectando tu bienestar financiero o personal, puedes solicitar el <strong>cierre voluntario de tu cuenta (autoexclusión)</strong>. Contáctanos por WhatsApp o Telegram para gestionarlo.</p>
        <h2>Responsabilidad</h2>
        <p>Dominues no se hace responsable por las decisiones de apuesta del usuario. El juego es solo para fines de entretenimiento. Juega con moderación.</p>
        <p>Más detalles en nuestros <a href="/terms" style="color:#FFC827;">Términos y Condiciones</a>.</p>
      `
    };
  }
};
</script>
