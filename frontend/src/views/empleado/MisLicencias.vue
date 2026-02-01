<template>
  <EmpleadoLayout>
    <div class="mis-licencias-container">
      <div class="page-header">
        <h1>Mis Licencias</h1>
        <router-link to="/empleado/solicitar-licencia" class="btn-nueva">
          <i class="bi bi-plus-lg"></i> Nueva Solicitud
        </router-link>
      </div>

      <div class="stats-row">
        <div class="stat-item">
          <i class="bi bi-clock-history"></i>
          <div>
            <span class="stat-num">{{ estadisticas.pendientes }}</span>
            <span class="stat-label">Pendientes</span>
          </div>
        </div>
        <div class="stat-item success">
          <i class="bi bi-check-circle"></i>
          <div>
            <span class="stat-num">{{ estadisticas.aprobadas }}</span>
            <span class="stat-label">Aprobadas</span>
          </div>
        </div>
        <div class="stat-item danger">
          <i class="bi bi-x-circle"></i>
          <div>
            <span class="stat-num">{{ estadisticas.rechazadas }}</span>
            <span class="stat-label">Rechazadas</span>
          </div>
        </div>
        <div class="stat-item info">
          <i class="bi bi-calendar-check"></i>
          <div>
            <span class="stat-num">{{ estadisticas.total_dias }}</span>
            <span class="stat-label">Días aprobados</span>
          </div>
        </div>
      </div>

      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          @click="filtroActual = tab.value"
          class="tab"
          :class="{ active: filtroActual === tab.value }"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="licencias-list">
        <div
          v-for="licencia in licenciasFiltradas"
          :key="licencia.id"
          class="licencia-card"
          :class="licencia.estado.toLowerCase()"
        >
          <div class="licencia-header">
            <div class="licencia-tipo">
              <i :class="getTipoIcon(licencia.tipo)"></i>
              <span>{{ formatTipo(licencia.tipo) }}</span>
            </div>
            <span class="licencia-estado" :class="licencia.estado.toLowerCase()">
              {{ licencia.estado }}
            </span>
          </div>

          <div class="licencia-body">
            <div class="licencia-fechas">
              <div class="fecha-item">
                <span class="label">Desde</span>
                <span class="value">{{ formatDate(licencia.fecha_inicio) }}</span>
              </div>
              <div class="fecha-arrow">
                <i class="bi bi-arrow-right"></i>
              </div>
              <div class="fecha-item">
                <span class="label">Hasta</span>
                <span class="value">{{ formatDate(licencia.fecha_fin) }}</span>
              </div>
            </div>
            <div class="licencia-dias">
              <span>{{ licencia.dias_solicitados }} días</span>
            </div>
          </div>

          <div v-if="licencia.motivo" class="licencia-motivo">
            <i class="bi bi-chat-text"></i>
            <span>{{ licencia.motivo }}</span>
          </div>

          <div class="licencia-footer">
            <span class="licencia-fecha">
              Solicitado el {{ formatDateTime(licencia.created_at) }}
            </span>
            <button
              v-if="licencia.estado === 'PENDIENTE'"
              @click="cancelarLicencia(licencia.id)"
              class="btn-cancelar"
            >
              <i class="bi bi-x-lg"></i> Cancelar
            </button>
          </div>
        </div>

        <div v-if="licenciasFiltradas.length === 0" class="empty-state">
          <i class="bi bi-inbox"></i>
          <h3>No hay licencias</h3>
          <p>{{ filtroActual === 'todos' ? 'Aún no has solicitado ninguna licencia' : 'No hay licencias con este estado' }}</p>
          <router-link v-if="filtroActual === 'todos'" to="/empleado/solicitar-licencia" class="btn-empty">
            Solicitar Licencia
          </router-link>
        </div>
      </div>
    </div>
  </EmpleadoLayout>
</template>

<script>
import EmpleadoLayout from '../../components/empleado/EmpleadoLayout.vue'
import authEmpleado from '../../services/authEmpleado'
import { useNotification } from '../../services/notification.service'

export default {
  name: 'MisLicencias',
  components: {
    EmpleadoLayout
  },
  data() {
    return {
      loading: false,
      licencias: [],
      filtroActual: 'todos',
      tabs: [
        { value: 'todos', label: 'Todas' },
        { value: 'PENDIENTE', label: 'Pendientes' },
        { value: 'APROBADA', label: 'Aprobadas' },
        { value: 'RECHAZADA', label: 'Rechazadas' }
      ]
    }
  },
  computed: {
    licenciasFiltradas() {
      if (this.filtroActual === 'todos') return this.licencias
      return this.licencias.filter(l => l.estado === this.filtroActual)
    },
    estadisticas() {
      return {
        pendientes: this.licencias.filter(l => l.estado === 'PENDIENTE').length,
        aprobadas: this.licencias.filter(l => l.estado === 'APROBADA').length,
        rechazadas: this.licencias.filter(l => l.estado === 'RECHAZADA').length,
        total_dias: this.licencias
          .filter(l => l.estado === 'APROBADA')
          .reduce((sum, l) => sum + (l.dias_solicitados || 0), 0)
      }
    }
  },
  async mounted() {
    await this.cargarLicencias()
  },
  methods: {
    async cargarLicencias() {
      this.loading = true
      try {
        const response = await authEmpleado.getMisSolicitudesLicencia()
        this.licencias = response.data || []
      } catch (err) {
        console.error('Error:', err)
      } finally {
        this.loading = false
      }
    },
    async cancelarLicencia(id) {
      if (!confirm('¿Estás seguro de que deseas cancelar esta solicitud?')) return
      
      this.loading = true
      try {
        await authEmpleado.cancelarSolicitudLicencia(id)
        const notification = useNotification()
        notification.success('Solicitud cancelada correctamente')
        await this.cargarLicencias()
      } catch (err) {
        const notification = useNotification()
        notification.error(err.response?.data?.message || 'Error al cancelar')
      } finally {
        this.loading = false
      }
    },
    formatTipo(tipo) {
      const tipos = {
        'VACACION': 'Vacaciones',
        'MEDICA': 'Licencia Médica',
        'PERSONAL': 'Asunto Personal'
      }
      return tipos[tipo] || tipo
    },
    getTipoIcon(tipo) {
      const iconos = {
        'VACACION': 'bi bi-plane',
        'MEDICA': 'bi bi-hospital',
        'PERSONAL': 'bi bi-person'
      }
      return iconos[tipo] || 'bi bi-calendar'
    },
    formatDate(fecha) {
      return new Date(fecha).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    },
    formatDateTime(fecha) {
      return new Date(fecha).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
.mis-licencias-container {
  max-width: 900px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-header h1 {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.btn-nueva {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
  font-weight: 600;
  text-decoration: none;
  font-size: 14px;
}

.btn-nueva:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.stat-item {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  border: 1px solid #e2e8f0;
}

.stat-item i {
  font-size: 28px;
  color: #f59e0b;
}

.stat-item.success i {
  color: #22c55e;
}

.stat-item.danger i {
  color: #ef4444;
}

.stat-item.info i {
  color: #3b82f6;
}

.stat-num {
  display: block;
  font-size: 26px;
  font-weight: 700;
  color: #1e293b;
}

.stat-label {
  font-size: 13px;
  color: #64748b;
}

.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 16px;
}

.tab {
  padding: 10px 20px;
  background: transparent;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab:hover {
  background: #f1f5f9;
}

.tab.active {
  background: #667eea;
  color: white;
}

.licencias-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.licencia-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #e2e8f0;
  border-left: 4px solid #f59e0b;
}

.licencia-card.aprobada {
  border-left-color: #22c55e;
}

.licencia-card.rechazada {
  border-left-color: #ef4444;
}

.licencia-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.licencia-tipo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #1e293b;
}

.licencia-tipo i {
  color: #667eea;
}

.licencia-estado {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.licencia-estado.pendiente {
  background: #fef3c7;
  color: #92400e;
}

.licencia-estado.aprobada {
  background: #dcfce7;
  color: #166534;
}

.licencia-estado.rechazada {
  background: #fee2e2;
  color: #991b1b;
}

.licencia-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.licencia-fechas {
  display: flex;
  align-items: center;
  gap: 16px;
}

.fecha-item .label {
  display: block;
  font-size: 11px;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.fecha-item .value {
  font-weight: 600;
  color: #1e293b;
}

.fecha-arrow {
  color: #cbd5e1;
}

.licencia-dias {
  background: #f1f5f9;
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #475569;
}

.licencia-motivo {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 8px;
  margin-bottom: 12px;
  font-size: 14px;
  color: #64748b;
}

.licencia-motivo i {
  color: #94a3b8;
  margin-top: 2px;
}

.licencia-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #f1f5f9;
}

.licencia-fecha {
  font-size: 12px;
  color: #94a3b8;
}

.btn-cancelar {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: transparent;
  border: 1px solid #ef4444;
  border-radius: 6px;
  color: #ef4444;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
}

.btn-cancelar:hover {
  background: #fee2e2;
}

.empty-state {
  text-align: center;
  padding: 60px 40px;
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
}

.empty-state i {
  font-size: 48px;
  color: #cbd5e1;
  margin-bottom: 16px;
}

.empty-state h3 {
  font-size: 18px;
  color: #1e293b;
  margin: 0 0 8px;
}

.empty-state p {
  color: #64748b;
  margin: 0 0 20px;
}

.btn-empty {
  display: inline-flex;
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
  font-weight: 600;
  text-decoration: none;
}

@media (max-width: 768px) {
  .stats-row {
    grid-template-columns: repeat(2, 1fr);
  }

  .licencia-body {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
