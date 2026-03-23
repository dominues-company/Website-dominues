<template>
  <LegalPageLayout
    title="Contacto"
    :content="content"
  />
</template>

<script>
import LegalPageLayout from '@/components/legal/LegalPageLayout.vue';

export default {
  name: 'ContactView',
  components: { LegalPageLayout },
  data() {
    return {
      content: `
        <p>¿Necesitas ayuda o tienes una consulta? Estamos contigo.</p>
        <h3>Email oficial</h3>
        <p><strong>Soporte:</strong> <a href="mailto:support@dominues.com" style="color:#FFC827;">support@dominues.com</a></p>
        <p><strong>Asuntos legales / privacidad:</strong> <a href="mailto:legal@dominues.com" style="color:#FFC827;">legal@dominues.com</a></p>
        <h3>Soporte por mensajería</h3>
        <p>También puedes usar el botón de <strong>WhatsApp</strong> o <strong>Telegram</strong> en la web y un agente te atenderá en tiempo récord (recargas, retiros, incidencias).</p>
        <p><a href="/" style="color:#FFC827;">← Volver al inicio</a></p>
      `
    };
  }
};
</script>
