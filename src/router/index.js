import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'anasayfa',
      component: HomeView
    },
    {
      path: '/calisma-saatleri',
      name: 'calismaSaatleri',
      component: () => import('../views/WorkingHours.vue')
    },
    {
      path: '/musteri-yorumlari',
      name: 'müsteriYorumlari',
      component: () => import('../views/CommentView.vue')
    },
    {
      path: '/randevu-al',
      name: 'randevuAl',
      component: () => import('../views/GetAppView.vue')
    },
    {
      path: '/randevu-onay',
      name: 'randevuOnay',
      component: () => import('../views/AppConfirmView.vue')
    },
    {
      path: '/randevu-detay',
      name: 'randevuDetay',
      component: () => import('../views/AppDetailView.vue')
    },
    {
      path: '/hakkimizda',
      name: 'hakkimizda',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/iletisim',
      name: 'iletisim',
      component: () => import('../views/ContactView.vue')
    },

    {
      path: '/404',
      name: 'hataSayfasi',
      component: () => import('../views/errorPage.vue')
    },

    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/errorPage.vue')
    }
  ]
})

export default router
