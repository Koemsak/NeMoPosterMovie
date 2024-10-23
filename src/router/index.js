import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/movies',
    name: 'movies',
    component: () => import('../views/MovieView.vue')
  },
  {
    path: '/tv',
    name: 'tv',
    component: () => import('../views/SeriesView.vue')
  },
  {
    path: '/*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
