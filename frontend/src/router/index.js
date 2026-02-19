import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Empleados from '../views/Empleados.vue'
import Asistencias from '../views/Asistencias.vue'
import Licencias from '../views/Licencias.vue'
import Auditoria from '../views/pages/auditoria/Auditoria.vue'
import Graficos from '../views/Graficos.vue'
import LoginEmpleado from '../views/empleado/LoginEmpleado.vue'
import DashboardEmpleado from '../views/empleado/DashboardEmpleado.vue'
import MarcarAsistencia from '../views/empleado/MarcarAsistencia.vue'
import MisAsistencias from '../views/empleado/MisAsistencias.vue'
import MisLicencias from '../views/empleado/MisLicencias.vue'
import SolicitarLicencia from '../views/empleado/SolicitarLicencia.vue'
import MiPerfil from '../views/empleado/MiPerfil.vue'

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
  {
    path: '/graficos',
    component: Graficos,
    name: 'Graficos',
    meta: { requiresAuth: true }
  },
  { path: '/empleado/login', component: LoginEmpleado, name: 'LoginEmpleado' },
  {
    path: '/empleado/dashboard',
    component: DashboardEmpleado,
    name: 'DashboardEmpleado',
    meta: { requiresAuthEmpleado: true }
  },
  {
    path: '/empleado/asistencia',
    component: MarcarAsistencia,
    name: 'MarcarAsistencia',
    meta: { requiresAuthEmpleado: true }
  },
  {
    path: '/empleado/mis-asistencias',
    component: MisAsistencias,
    name: 'MisAsistencias',
    meta: { requiresAuthEmpleado: true }
  },
  {
    path: '/empleado/licencias',
    component: MisLicencias,
    name: 'MisLicencias',
    meta: { requiresAuthEmpleado: true }
  },
  {
    path: '/empleado/solicitar-licencia',
    component: SolicitarLicencia,
    name: 'SolicitarLicencia',
    meta: { requiresAuthEmpleado: true }
  },
  {
    path: '/empleado/perfil',
    component: MiPerfil,
    name: 'MiPerfil',
    meta: { requiresAuthEmpleado: true }
  },
  { path: '/', redirect: '/dashboard' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard principal - verificar tipo de usuario
router.beforeEach((to, from, next) => {
  const tokenAdmin = localStorage.getItem('token')
  const tokenEmpleado = localStorage.getItem('empleadoToken')
  
  // Si intenta acceder a rutas de empleado con token de admin
  if (to.path.startsWith('/empleado/') && tokenAdmin) {
    next('/dashboard')
    return
  }
  
  // Si intenta acceder a rutas de admin con token de empleado
  if (!to.path.startsWith('/empleado/') && !to.path.startsWith('/login') && 
      to.path !== '/' && tokenEmpleado && !tokenAdmin) {
    next('/empleado/dashboard')
    return
  }
  
  // Rutas que requieren auth de admin
  if (to.meta.requiresAuth) {
    if (!tokenAdmin) {
      next('/login')
      return
    }
    if (to.path === '/login') {
      next('/dashboard')
      return
    }
  }
  
  // Rutas que requieren auth de empleado
  if (to.meta.requiresAuthEmpleado) {
    if (!tokenEmpleado) {
      next('/empleado/login')
      return
    }
    if (to.path === '/empleado/login') {
      next('/empleado/dashboard')
      return
    }
  }
  
  // Login de admin
  if (to.path === '/login' && tokenAdmin) {
    next('/dashboard')
    return
  }
  
  // Login de empleado
  if (to.path === '/empleado/login' && tokenEmpleado) {
    next('/empleado/dashboard')
    return
  }
  
  // Redirección root
  if (to.path === '/') {
    if (tokenAdmin) {
      next('/dashboard')
    } else if (tokenEmpleado) {
      next('/empleado/dashboard')
    } else {
      next('/login')
    }
    return
  }
  
  next()
})

// Scroll a top cuando cambia de ruta
router.afterEach((to, from) => {
  window.scrollTo(0, 0)
})

export default router
