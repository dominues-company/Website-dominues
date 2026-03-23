<template>
  <!-- Footer Section Starts Here -->
  <footer class="footer-section bg_img" :style="{ background: `url(${getImageUrl('footer/bg.jpg')}) center` }">
      <div class="footer-top">
          <div class="container">
              <div class="footer-wrapper d-flex flex-wrap align-items-center justify-content-md-between justify-content-center">
                  <div class="logo mb-3 mb-md-0"><router-link to="/"><img :src="getImageUrl('img_31.png')" alt="Dominues"></router-link></div>
                  <ul class="footer-links d-flex flex-wrap justify-content-center">
                      <li><router-link class="nav-link" :class="{ active: $route.path === '/' }" to="#games">Juegos</router-link></li>
                      <li><router-link class="nav-link" :class="{ active: $route.path === '/' }" to="#faq">Preguntas Frecuentes</router-link></li>
                      <li><router-link class="nav-link" :class="{ active: $route.path === '/privacy' }" to="/privacy">Privacidad</router-link></li>
                      <li><router-link class="nav-link" :class="{ active: $route.path === '/terms' }" to="/terms">Términos y Condiciones</router-link></li>
                      <li><router-link class="nav-link" :class="{ active: $route.path === '/responsible-gambling' }" to="/responsible-gambling">Juego Responsable</router-link></li>
                      <li><router-link class="nav-link" :class="{ active: $route.path === '/aml' }" to="/aml">AML</router-link></li>
                      <li><router-link class="nav-link" :class="{ active: $route.path === '/contact' }" to="/contact">Contacto</router-link></li>
                  </ul>
              </div>
          </div>
      </div>
      <div class="footer-bottom">
          <div class="container">
              <div class="footer-wrapper d-flex flex-wrap justify-content-center align-items-center text-center">
                  <p class="copyright text-white">Copyrights &copy; {{ currentYear }} Dominues. Todos los derechos reservados.</p>
              </div>
          </div>
      </div>
      <div class="shapes">
          <img :src="getImageUrl('img_32.png')" alt="footer" class="shape1">
      </div>
  </footer>
<!-- Footer Section Ends Here -->
</template>

<script>
 
export default {
  name: 'FooterComponent',
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  },
  methods: {
    getImageUrl(name) {
      return require(`@/assets/img/${name}`)
    }
  }
}
</script>

<style scoped>
/* Footer responsive styles */
.footer-top {
  padding-bottom: 20px;
}

.footer-wrapper {
  gap: 15px;
}

@media (max-width: 991px) {
  .footer-section {
    padding: 30px 0 25px;
  }
  
  .footer-top {
    padding-bottom: 15px;
  }
  
  .footer-wrapper {
    gap: 10px;
  }
  
  .logo {
    width: 100%;
    text-align: center;
    margin-bottom: 20px !important;
  }
  
  .logo img {
    max-width: 120px;
    max-height: 50px;
    height: auto;
  }
  
  .footer-links {
    flex-direction: column !important;
    width: 100%;
    align-items: center;
  }
  
  .footer-links li {
    margin: 5px 0;
    padding: 3px 5px !important;
  }
  
  .footer-bottom {
    margin-top: 15px;
    padding-top: 15px;
  }
  
  .copyright {
    font-size: 0.85rem;
    line-height: 1.6;
  }
}

@media (max-width: 575px) {
  .footer-section {
    padding: 25px 0 20px;
  }
  
  .logo img {
    max-width: 100px;
    max-height: 40px;
  }
  
  .footer-links li {
    font-size: 0.9rem;
    padding: 2px 5px !important;
  }
  
  .copyright {
    font-size: 0.75rem;
  }
}
</style>