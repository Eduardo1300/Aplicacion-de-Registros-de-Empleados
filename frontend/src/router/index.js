import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Empleados from '../views/Empleados.vue'
import Asistencias from '../views/Asistencias.vue'
import Licencias from '../views/Licencias.vue'
import Auditoria from '../views/pages/auditoria/Auditoria.vue'

const routes = [
  { path: '/login', component: Login, name: 'Login' },
  { 
    path: '/dashboard', 
    component: Dashboard, 
    name: 'Dashboard',
    meta: { requiresAuth: true }
  },
  { 
    path: '/empleados', 
    component: Empleados, 
    name: 'Empleados',
    meta: { requiresAuth: true }
  },
  { 
    path: '/asistencias', 
    component: Asistencias, 
    name: 'Asistencias',
    meta: { requiresAuth: true }
  },
  { 
    path: '/licencias', 
    component: Licencias, 
    name: 'Licencias',
    meta: { requiresAuth: true }
  },
  { 
    path: '/auditoria', 
    component: Auditoria, 
    name: 'Auditoria',
    meta: { requiresAuth: true }
  },
  { path: '/', redirect: '/dashboard' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard para rutas protegidas
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token')
  
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else if (to.path === '/login' && isLoggedIn) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
