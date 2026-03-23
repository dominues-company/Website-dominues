<template>
  <div class="legal-page">
    <div class="legal-page__inner">
      <h1 class="legal-page__title">{{ title }}</h1>
      <div class="legal-page__content" v-html="content"></div>
      <p class="legal-page__back">
        <router-link to="/" class="btn btn-outline-light">← Volver al inicio</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LegalPageLayout',
  props: {
    title: { type: String, required: true },
    content: { type: String, required: true }
  }
};
</script>

<style scoped>
.legal-page {
  min-height: 100vh;
  padding: 120px 20px 60px;
  background: linear-gradient(135deg, #2e0327 0%, #1a0118 100%);
}
.legal-page__inner {
  max-width: 800px;
  margin: 0 auto;
  color: #e0e0e0;
}
.legal-page__title {
  color: #fff;
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #FFC827;
  padding-bottom: 0.5rem;
}
.legal-page__content {
  line-height: 1.7;
  font-size: 0.95rem;
}
.legal-page__content >>> h2,
.legal-page__content >>> h3 {
  color: #FFC827;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}
.legal-page__content >>> p {
  margin-bottom: 0.75rem;
}
.legal-page__content >>> ul,
.legal-page__content >>> ol {
  margin: 0.5rem 0 1rem 1.25rem;
}
.legal-page__back {
  margin-top: 2rem;
}
.legal-page__back a:hover {
  color: #FFC827;
  border-color: #FFC827;
}
</style>
