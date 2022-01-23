import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Authorized from '../components/Authorized.vue'
import Repos from '../components/Repos.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/repos',
    name: 'Repos',
    component: Repos
  },
  {
    path: '/authorized',
    name: 'Authorized',
    component: Authorized
  }
]
const router = new VueRouter({
  routes
})

export default router