import { createRouter, createWebHistory } from 'vue-router'
import throwCoins from '@/views/throwCoins.vue'
import singleServer from '@/views/singleServer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/throwCoins'
    },
    {
      path: '/throwCoins',
      name: 'throwCoins',
      component: throwCoins
    },
    {
      path: '/singleServer',
      name: 'singleServer',
      component: singleServer,
    }
  ]
})

export default router