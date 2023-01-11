import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Maps from '../views/Maps.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/map',
      name: 'maps',
      component: Maps,
    },
  ]
})

export default router
