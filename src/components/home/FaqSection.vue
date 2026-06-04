<template>
  <section class="faq-section padding-top padding-bottom overflow-hidden" id="faq">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-7 col-xl-6">
          <div class="section-header text-center">
            <h2 class="section-header__title">{{ faqData.sectionTitle }}</h2>
            <p>{{ faqData.sectionSubtitle }}</p>
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
import faqData from '../../../content/faq.json';

export default {
  name: 'FaqSection',
  data() {
    return {
      faqData,
      openLeft: null,
      openRight: null,
      faqLeft: faqData.left,
      faqRight: faqData.right
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
