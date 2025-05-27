import Admin from '@/views/Admin.vue'
import Catalog from '@/views/Catalog.vue'
import CreateHome from '@/views/CreateHome.vue'
import Favorites from '@/views/Favorites.vue'
import Home from '@/views/Home.vue'
import HomeDetails from '@/views/HomeDetails.vue'
import Login from '@/views/Login.vue'
import Messages from '@/views/Messages.vue'
import Profile from '@/views/Profile.vue'
import Register from '@/views/Register.vue'
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
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/create-home',
      name: 'CreateHome',
      component: CreateHome
    },
    {
      path: '/messages',
      name: 'Messages',
      component: Messages
    },
    {
      path: '/favorites',
      name: 'Favorites',
      component: Favorites
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
  ],
})

export default router
