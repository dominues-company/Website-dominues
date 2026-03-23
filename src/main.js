import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Importar Bootstrap y Font Awesome
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Configura jQuery
import $ from 'jquery';
window.$ = $;
window.jQuery = $;

// Importa Slick Slider y sus estilos
import 'slick-carousel';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { initGlobalJqueryPlugins } from '@/assets/js/global'; // Asegúrate de que la ruta sea correcta

// Importar estilos personalizados
import './assets/css/main.css';
import './assets/css/style_0.css';
import './assets/css/style_1.css';
import './assets/css/style_2.css';
import './assets/css/style_3.css';
import './assets/css/style_4.css';
import './assets/css/style_5.css';

// Configurar jQuery globalmente (opcional, para compatibilidad con plugins)
window.$ = $;
window.jQuery = $;

// Importar Laravel Echo y Pusher
import Echo from 'laravel-echo';
window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.VUE_APP_PUSHER_KEY,
    cluster: process.env.VUE_APP_PUSHER_CLUSTER,
    forceTLS: true
});

// Inicializar Vue
const app = createApp(App);

// Directiva personalizada para Slick Slider (opcional pero útil)
app.directive('slick', {
  mounted(el, binding) {
    $(el).slick(binding.value || {});
  },
  unmounted(el) {
    $(el).slick('unslick');
  },
});

app
  .use(router)
  .use(store)
  .mount('#app');

// Ejecuta los plugins de jQuery después del montaje
document.addEventListener('DOMContentLoaded', () => {
  initGlobalJqueryPlugins();
});

// Prevenir caché en desarrollo móvil
if (process.env.NODE_ENV === 'development') {
  // Forzar recarga completa cada vez que se detecta un cambio
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(registration => {
        registration.unregister();
      });
    });
  }
  
  // Agregar versión única a la URL para evitar caché
  const version = Date.now();
  console.log(`🔄 Versión de build: ${version}`);
  window.__APP_VERSION__ = version;
}