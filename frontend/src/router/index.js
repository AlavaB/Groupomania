import Vue from 'vue'
import VueRouter from 'vue-router'
//import App from '../App.vue'

import Login from '../components/Login'
import Signup from '../components/Signup'
import Profile from '../components/Profile'
import Forum from '../components/Forum'
import Test from '../components/Test'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Forum',
    component: Forum
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
