import Vue from 'vue'
import VueRouter from 'vue-router'
//import App from '../App.vue'

import Login from '../components/Login'
import Signup from '../components/Signup'
import Header from '../components/Header'
import Profile from '../components/Profile'
import Forum from '../components/Forum'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/header',
    name: 'Header',
    component: Header
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/forum',
    name: 'Forum',
    component: Forum
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
