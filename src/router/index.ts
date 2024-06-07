import { createRouter, createWebHistory } from 'vue-router'
import throwCoins from '@/views/throwCoins.vue'
import singleServer from '@/views/singleServer.vue'
import InventorySystem from '@/views/InventorySystem.vue'

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
    },
    {
      path: '/InventorySystem',
      name: 'InventorySystem',
      component: InventorySystem
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/throwCoins'
    }
  ]
})

export default router