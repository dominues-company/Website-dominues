<template>
  <LegalPageLayout
    v-if="ready"
    :title="title"
    :content="content"
  />
  <div v-else-if="error" class="legal-page legal-page--state">
    <div class="legal-page__inner">
      <p>{{ error }}</p>
      <router-link to="/" class="btn btn-outline-light">← Volver al inicio</router-link>
    </div>
  </div>
  <div v-else class="legal-page legal-page--state">
    <div class="legal-page__inner">
      <p>Cargando contenido…</p>
    </div>
  </div>
</template>

<script>
import LegalPageLayout from '@/components/legal/LegalPageLayout.vue';
import { getPageMeta, loadHtmlContent } from '@/utils/contentLoader';

export default {
  name: 'LegalContentView',
  components: { LegalPageLayout },
  data() {
    return {
      ready: false,
      error: null,
      title: '',
      content: ''
    };
  },
  watch: {
    '$route.meta.contentKey': {
      immediate: true,
      handler() {
        this.loadContent();
      }
    }
  },
  methods: {
    async loadContent() {
      const key = this.$route.meta.contentKey;
      const meta = getPageMeta(key);

      this.ready = false;
      this.error = null;

      if (!meta) {
        this.error = 'Página no configurada.';
        return;
      }

      try {
        this.title = meta.title;
        this.content = await loadHtmlContent(meta.file);
        this.ready = true;
      } catch (e) {
        console.error('[LegalContentView]', e);
        this.error = 'No se pudo cargar esta página. Intenta más tarde.';
      }
    }
  }
};
</script>

<style scoped>
.legal-page--state {
  min-height: 100vh;
  padding: 120px 20px 60px;
  background: linear-gradient(135deg, #2e0327 0%, #1a0118 100%);
  color: #e0e0e0;
}
.legal-page__inner {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}
</style>
