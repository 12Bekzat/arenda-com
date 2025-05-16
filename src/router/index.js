import Catalog from '@/views/Catalog.vue'
import Home from '@/views/Home.vue'
import HomeDetails from '@/views/HomeDetails.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/catalog',
      name: 'Catalog',
      component: Catalog
    },
    {
      path: '/details',
      name: 'HomeDetails',
      component: HomeDetails
    },
  ],
})

export default router
