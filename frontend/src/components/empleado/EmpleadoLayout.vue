<template>
  <div class="empleado-layout">
    <SidebarEmpleado />
    <main class="empleado-main">
      <header class="empleado-header">
        <div class="header-left">
          <button class="btn-menu-toggle" @click="toggleSidebar">
            <i class="bi bi-list"></i>
          </button>
          <div class="breadcrumb">
            <span class="current-page">{{ currentPageTitle }}</span>
          </div>
        </div>
        <div class="header-right">
          <div class="empleado-info">
            <div class="empleado-avatar">
              {{ getInitials }}
            </div>
            <div class="empleado-details">
              <span class="empleado-nombre">{{ empleado?.nombre }}</span>
              <span class="empleado-cargo">{{ empleado?.cargo?.nombre || 'Empleado' }}</span>
            </div>
          </div>
        </div>
      </header>
      <div class="empleado-content">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<script>
import SidebarEmpleado from './SidebarEmpleado.vue'
import authEmpleado from '../../services/authEmpleado'

export default {
  name: 'EmpleadoLayout',
  components: {
    SidebarEmpleado
  },
  data() {
    return {
      sidebarOpen: true
    }
  },
  computed: {
    empleado() {
      return authEmpleado.getEmpleado()
    },
    getInitials() {
      if (!this.empleado) return '?'
      return `${(this.empleado.nombre || '').charAt(0)}${(this.empleado.apellido || '').charAt(0)}`.toUpperCase()
    },
    currentPageTitle() {
      const titles = {
        '/empleado/dashboard': 'Dashboard',
        '/empleado/asistencia': 'Marcar Asistencia',
        '/empleado/mis-asistencias': 'Historial de Asistencias',
        '/empleado/licencias': 'Mis Licencias',
        '/empleado/solicitar-licencia': 'Solicitar Licencia',
        '/empleado/perfil': 'Mi Perfil'
      }
      return titles[this.$route.path] || 'Portal del Empleado'
    }
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
      document.querySelector('.empleado-layout')?.classList.toggle('sidebar-collapsed', !this.sidebarOpen)
    }
  }
}
</script>

<style scoped>
.empleado-layout {
  display: flex;
  min-height: 100vh;
  background: #f8fafc;
}

.empleado-layout.sidebar-collapsed .sidebar-empleado {
  width: 0;
  overflow: hidden;
}

.empleado-layout.sidebar-collapsed .empleado-main {
  margin-left: 0;
}

.empleado-main {
  flex: 1;
  margin-left: 260px;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s ease;
}

.empleado-header {
  background: white;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.btn-menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  color: #475569;
  cursor: pointer;
  padding: 4px;
}

.breadcrumb .current-page {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
}

.empleado-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.empleado-avatar {
  width: 42px;
  height: 42px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
}

.empleado-details {
  display: flex;
  flex-direction: column;
}

.empleado-nombre {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.empleado-cargo {
  font-size: 12px;
  color: #64748b;
}

.empleado-content {
  flex: 1;
  padding: 24px;
}

@media (max-width: 1024px) {
  .empleado-main {
    margin-left: 0;
  }

  .btn-menu-toggle {
    display: block;
  }
}

@media (max-width: 640px) {
  .empleado-header {
    padding: 12px 16px;
  }

  .empleado-content {
    padding: 16px;
  }

  .empleado-details {
    display: none;
  }
}
</style>
