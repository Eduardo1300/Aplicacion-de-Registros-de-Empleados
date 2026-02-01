<template>
  <aside class="sidebar-empleado">
    <div class="sidebar-header">
      <div class="logo">
        <i class="bi bi-building"></i>
      </div>
      <div class="brand">
        <h1>Portal</h1>
        <span>Empleado</span>
      </div>
    </div>

    <nav class="sidebar-nav">
      <ul>
        <li v-for="item in menuItems" :key="item.path">
          <router-link
            :to="item.path"
            class="nav-link"
            :class="{ active: isActive(item.path) }"
          >
            <i :class="item.icon"></i>
            <span>{{ item.label }}</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <div class="sidebar-footer">
      <button @click="logout" class="btn-logout">
        <i class="bi bi-box-arrow-right"></i>
        <span>Cerrar Sesión</span>
      </button>
    </div>
  </aside>
</template>

<script>
import authEmpleado from '../../services/authEmpleado'

export default {
  name: 'SidebarEmpleado',
  data() {
    return {
      menuItems: [
        { path: '/empleado/dashboard', label: 'Dashboard', icon: 'bi bi-grid-1x2' },
        { path: '/empleado/asistencia', label: 'Mi Asistencia', icon: 'bi bi-clock' },
        { path: '/empleado/mis-asistencias', label: 'Historial', icon: 'bi bi-calendar3' },
        { path: '/empleado/licencias', label: 'Licencias', icon: 'bi bi-calendar-check' },
        { path: '/empleado/solicitar-licencia', label: 'Nueva Licencia', icon: 'bi bi-plus-circle' },
        { path: '/empleado/perfil', label: 'Mi Perfil', icon: 'bi bi-person' }
      ]
    }
  },
  methods: {
    isActive(path) {
      return this.$route.path === path || this.$route.path.startsWith(path + '/')
    },
    logout() {
      authEmpleado.logout()
      this.$router.push('/empleado/login')
    }
  }
}
</script>

<style scoped>
.sidebar-empleado {
  width: 260px;
  background: #1e293b;
  color: #e2e8f0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
}

.sidebar-header {
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 14px;
  border-bottom: 1px solid #334155;
}

.logo {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: white;
}

.brand h1 {
  font-size: 18px;
  font-weight: 700;
  color: white;
  margin: 0;
  line-height: 1.2;
}

.brand span {
  font-size: 12px;
  color: #94a3b8;
}

.sidebar-nav {
  flex: 1;
  padding: 16px 12px;
  overflow-y: auto;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 10px;
  color: #94a3b8;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background: #334155;
  color: #e2e8f0;
}

.nav-link.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.nav-link i {
  font-size: 18px;
  width: 24px;
  text-align: center;
}

.sidebar-footer {
  padding: 16px;
  border-top: 1px solid #334155;
}

.btn-logout {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: transparent;
  border: 1px solid #334155;
  border-radius: 10px;
  color: #94a3b8;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-logout:hover {
  background: #334155;
  color: #ef4444;
  border-color: #ef4444;
}

.btn-logout i {
  font-size: 18px;
}
</style>
