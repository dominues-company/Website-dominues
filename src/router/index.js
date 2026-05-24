// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store'


// Importar componentes
import Home from '../views/HomeView.vue';
import Dashboard from '../views/DashboardView.vue';
import Login from '../views/LoginView.vue';
import Register from '../views/RegisterView.vue';
import ForgotPassword from '../views/ForgotPasswordView.vue';
import GameView from '../views/GameView.vue';
import Recharge from '../views/RechargeView.vue';
import Withdrawal from '../views/WithdrawalView.vue';
import Transactions from '../views/TransactionsView.vue';
import Profile from '../views/ProfileView.vue';
import PrivacyView from '../views/PrivacyView.vue';
import TermsView from '../views/TermsView.vue';
import AMLView from '../views/AMLView.vue';
import ResponsibleGamblingView from '../views/ResponsibleGamblingView.vue';
import ContactView from '../views/ContactView.vue';
import FaqView from '../views/FaqView.vue';
// import PoteView from '../views/PoteView.vue'; // Movido a lazy loading

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: Home,
    meta: { guest: true }
  },
  {
    path: '/privacy',
    name: 'PrivacyView',
    component: PrivacyView,
    meta: { public: true }
  },
  {
    path: '/terms',
    name: 'TermsView',
    component: TermsView,
    meta: { public: true }
  },
  {
    path: '/aml',
    name: 'AMLView',
    component: AMLView,
    meta: { public: true }
  },
  {
    path: '/responsible-gambling',
    name: 'ResponsibleGamblingView',
    component: ResponsibleGamblingView,
    meta: { public: true }
  },
  {
    path: '/contact',
    name: 'ContactView',
    component: ContactView,
    meta: { public: true }
  },
  {
    path: '/faq',
    name: 'FaqView',
    component: FaqView,
    meta: { public: true }
  },
  {
    path: '/dashboard',
    name: 'DashboardView',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'LoginView',
    component: Login,
    meta: { guest: true }
  },
  {
    path: '/register',
    name: 'RegisterView',
    component: Register,
    meta: { guest: true }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPasswordView',
    component: ForgotPassword,
    meta: { guest: true }
  },
  {
    path: '/games',
    name: 'GameView',
    component: GameView,
    meta: { requiresAuth: true }
  },
  {
    path: '/recharge',
    name: 'RechargeView',
    component: Recharge,
    meta: { requiresAuth: true }
  },
  {
    path: '/withdraw',
    name: 'WithdrawalView',
    component: Withdrawal,
    meta: { requiresAuth: true }
  },
  {
    path: '/transactions',
    name: 'TransactionsView',
    component: Transactions,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'ProfileView',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/waiting-room/:tableId',
    name: 'WaitingRoomPage',
    component: () => import('@/components/waiting/WaitingRoomPage.vue'),
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/pote',
    name: 'PoteView',
    component: () => import('@/views/PoteView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/history',
    name: 'GameHistoryView',
    component: () => import('@/views/GameHistoryView.vue'),
    meta: { requiresAuth: true }
  },
  // ... otras rutas
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      return new Promise((resolve) => {
        const tryScroll = (attempts = 0) => {
          const element = document.querySelector(to.hash)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
            resolve({ el: to.hash, behavior: 'smooth' })
          } else if (attempts < 30) {
            setTimeout(() => tryScroll(attempts + 1), 50)
          } else {
            resolve({ top: 0 })
          }
        }

        setTimeout(() => tryScroll(), 100)
      })
    }

    return { top: 0 }
  }
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated'];
  
  // 🔧 CACHE CONTROL: Forzar limpieza de caché al acceder a waiting-room
  if (to.name === 'WaitingRoomPage' && !to.query._nocache) {
    console.log('🔧 [ROUTER] Accediendo a WaitingRoom - Forzando recarga sin caché');
    const cacheBuster = Date.now();
    // Usar replace para evitar agregar entrada al historial
    window.location.replace(`/waiting-room/${to.params.tableId}?_nocache=${cacheBuster}`);
    return; // No llamar next() porque estamos redirigiendo
  }
  
  // Verificar si la ruta está bloqueada
  if (to.matched.some(record => record.meta.blocked)) {
    // Redirigir al dashboard si intenta acceder a una ruta bloqueada
    next('/dashboard');
    return;
  }
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath } // Redirigir al login si no está autenticado
      });
    } else {
      next(); // Deja que pase si está autenticado
    }
  } 
  // Rutas que son solo para visitantes (login, register, etc.)
  else if (to.matched.some(record => record.meta.guest)) {
    if (isAuthenticated) {
      next('/dashboard'); // Redirigir a dashboard si está autenticado
    } else {
      next(); // Deja que pase si no está autenticado
    }
  } else if (to.matched.some(record => record.meta.public)) {
    next(); // Páginas legales/públicas: siempre accesibles
  } else {
    next(); // Deja que pase
  }
});

export default router;