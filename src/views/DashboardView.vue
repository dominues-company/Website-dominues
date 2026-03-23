<template>
  <div>
    <GameSection />
    
    <!-- Modal de anuncio del Pote Mensual -->
    <MonthlyPotAnnouncement
      :show="showPotModal"
      :potData="potData"
      :topPlayers="topPlayers"
      @close="closePotModal"
    />
  </div>
</template>

<script>
import GameSection from '@/components/home/GameSection.vue'
import MonthlyPotAnnouncement from '@/components/modals/MonthlyPotAnnouncement.vue'
import api from '@/services/api'

export default {
  name: 'DashboardView',
  components: {
    GameSection,
    MonthlyPotAnnouncement
  },
  data() {
    return {
      showPotModal: false,
      potData: {
        amount: 0,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        month_name: '',
        description: ''
      },
      topPlayers: []
    }
  },
  mounted() {
    this.checkAndShowPotAnnouncement();
    
    // 🔧 Reanudar música de fondo al volver al dashboard
    window.dispatchEvent(new CustomEvent('resume-background-music'))
    console.log('🔊 [DASHBOARD] Música de fondo reanudada al volver al dashboard')
  },
  methods: {
    async checkAndShowPotAnnouncement() {
      // Verificar si ya se mostró en esta sesión
      const alreadySeen = sessionStorage.getItem('pot_announcement_seen');
      
      if (alreadySeen === 'true') {
        return;
      }

      try {
        const response = await api.get('/api/monthly-pot/current');
        
        if (response.data.success && response.data.has_pot) {
          this.potData = response.data.pot;
          this.topPlayers = response.data.top_players || [];
          
          // Mostrar modal después de un pequeño delay para mejor UX
          setTimeout(() => {
            this.showPotModal = true;
          }, 800);
        }
      } catch (error) {
        console.error('Error loading pot announcement:', error);
        // No mostrar error al usuario, es solo un anuncio
      }
    },
    
    closePotModal() {
      this.showPotModal = false;
    }
  }
}
</script>