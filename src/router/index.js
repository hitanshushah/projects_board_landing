import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Demo from '../views/Demo.vue'
import CreateProject from '../views/CreateProject.vue'
import PublicPreview from '../views/PublicPreview.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/demo',
    name: 'Demo',
    component: Demo
  },
  {
    path: '/create',
    name: 'CreateProject',
    component: CreateProject
  },
  {
    path: '/public-preview',
    name: 'PublicPreview',
    component: PublicPreview
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
