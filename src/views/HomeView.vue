<template>
  <div>
    <BannerSection />
    <AboutSection />
    <GameSection />
    <StarSection />
    <HeroSection />
    <FaqSection />
    <TopSection />
    <TestimonialsSection />
  </div>
</template>

<script>
import BannerSection from '@/components/home/BannerSection.vue'
import AboutSection from '@/components/home/AboutSection.vue'
import GameSection from '@/components/home/GameSection.vue'
import StarSection from '@/components/home/StarSection.vue'
import HeroSection from '@/components/home/HeroSection.vue'
import FaqSection from '@/components/home/FaqSection.vue'
import TopSection from '@/components/home/TopSection.vue'
import TestimonialsSection from '@/components/home/TestimonialsSection.vue'
export default {
  name: 'HomeView',
  components: {
    BannerSection,
    AboutSection,
    GameSection,
    StarSection,
    HeroSection,
    FaqSection,
    TopSection,
    TestimonialsSection
  },
  mounted() {
    // 🔧 Reanudar música de fondo al volver a la página principal
    window.dispatchEvent(new CustomEvent('resume-background-music'))
    console.log('🔊 [HOME] Música de fondo reanudada al volver a la página principal')
  }
}
</script>