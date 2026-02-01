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

// Guard para rutas protegidas (admin)
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

// Guard para rutas de empleado
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuthEmpleado) {
    const isEmpleadoLoggedIn = !!localStorage.getItem('empleadoToken')
    if (!isEmpleadoLoggedIn) {
      next('/empleado/login')
    } else {
      next()
    }
  } else if (to.path === '/empleado/login' && !!localStorage.getItem('empleadoToken')) {
    next('/empleado/dashboard')
  } else {
    next()
  }
})

// Scroll a top cuando cambia de ruta
router.afterEach((to, from) => {
  window.scrollTo(0, 0)
})

export default router
