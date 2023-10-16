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
      path: '/müsteri-yorumlari',
      name: 'müsteriYorumlari',
      component: () => import('../views/CustomerComments.vue')

    },
    {
      path: '/hakkimizda',
      name: 'hakkimizda',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')

    },
    {
        path: '/iletisim',
        name: 'iletisim',
        component: () => import('../views/ContactView.vue')
      },
  ]
})

export default router
