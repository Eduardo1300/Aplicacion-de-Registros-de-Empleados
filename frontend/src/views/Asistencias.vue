<template>
  <div class="asistencias-container">
    <!-- Header -->
    <div class="asistencias-header">
      <div class="header-left">
        <h1 class="page-title">
          <i class="bi bi-clock-fill"></i> Registro de Asistencias
        </h1>
        <p class="page-subtitle">Control y seguimiento de presencia del personal</p>
      </div>
      <div class="header-stats">
        <div class="stat-badge">
          <i class="bi bi-check-circle-fill"></i>
          <span>{{ presentCount }} Presentes</span>
        </div>
        <div class="stat-badge warning">
          <i class="bi bi-exclamation-circle-fill"></i>
          <span>{{ tardanzaCount }} Tardanzas</span>
        </div>
        <div class="stat-badge danger">
          <i class="bi bi-x-circle-fill"></i>
          <span>{{ ausentesCount }} Ausentes</span>
        </div>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="filter-bar">
      <div class="filter-item">
        <label>Fecha:</label>
        <input type="date" v-model="filterDate" class="filter-input" />
      </div>
      <div class="filter-item">
        <label>Estado:</label>
        <select v-model="filterEstado" class="filter-input">
          <option value="">Todos los estados</option>
          <option value="PRESENTE">Presente</option>
          <option value="TARDANZA">Tardanza</option>
          <option value="AUSENTE">Ausente</option>
        </select>
      </div>
      <button @click="resetFilters" class="btn-reset">
        <i class="bi bi-arrow-counterclockwise"></i> Restablecer
      </button>
      <ExportButtons
        :data="filteredAsistencias"
        filename="asistencias"
        title="Registro de Asistencias"
        @exported="handleExported"
      />
    </div>

    <!-- Loading State -->
    <Loading :loading="loading" text="Cargando asistencias..." />

    <!-- Empty State -->
    <div v-if="asistencias.length === 0 && !loading" class="empty-state">
      <div class="empty-icon">
        <i class="bi bi-inbox"></i>
      </div>
      <h3>No hay registros de asistencia</h3>
      <p>Los registros aparecerán aquí cuando se realicen cargas de asistencia</p>
    </div>

    <!-- Table Card -->
    <div v-if="asistencias.length > 0 && !loading" class="table-card">
      <div class="table-wrapper">
        <table class="asistencias-table">
          <thead>
            <tr>
              <th class="col-empleado">
                <i class="bi bi-person"></i> Empleado
              </th>
              <th class="col-fecha">
                <i class="bi bi-calendar"></i> Fecha
              </th>
              <th class="col-entrada">
                <i class="bi bi-box-arrow-in-left"></i> Entrada
              </th>
              <th class="col-salida">
                <i class="bi bi-box-arrow-right"></i> Salida
              </th>
              <th class="col-duracion">
                <i class="bi bi-hourglass-split"></i> Duración
              </th>
              <th class="col-estado">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="asistencia in filteredAsistencias" :key="asistencia.id" class="table-row" :class="`estado-${asistencia.estado.toLowerCase()}`">
              <td class="col-empleado">
                <div class="empleado-cell">
                  <div class="empleado-avatar">
                    {{ getInitials(asistencia.empleado?.nombre, asistencia.empleado?.apellido) }}
                  </div>
                  <div class="empleado-info">
                    <span class="empleado-nombre">{{ asistencia.empleado?.nombre }}</span>
                  </div>
                </div>
              </td>
              <td class="col-fecha">
                <span class="fecha-badge">{{ formatDate(asistencia.fechaAsistencia) }}</span>
              </td>
              <td class="col-entrada">
                <span class="hora-text">{{ asistencia.horaEntrada || '-' }}</span>
              </td>
              <td class="col-salida">
                <span class="hora-text">{{ asistencia.horaSalida || '-' }}</span>
              </td>
              <td class="col-duracion">
                <span class="duracion-badge">{{ calculateDuration(asistencia) }}</span>
              </td>
              <td class="col-estado">
                <span :class="`estado-badge estado-${asistencia.estado.toLowerCase()}`">
                  <i :class="getEstadoIcon(asistencia.estado)"></i>
                  {{ asistencia.estado }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="filteredAsistencias.length > 0" class="pagination">
        <p>Mostrando {{ filteredAsistencias.length }} registros de {{ asistencias.length }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../services/api'
import { useNotification } from '../services/notification.service'
import ExportButtons from '../components/ExportButtons.vue'
import Loading from '../components/Loading.vue'

export default {
  name: 'Asistencias',
  components: {
    ExportButtons,
    Loading
  },
  data() {
    return {
      asistencias: [],
      loading: false,
      filterDate: '',
      filterEstado: ''
    }
  },
  computed: {
    filteredAsistencias() {
      return this.asistencias.filter(a => {
        const matchDate = !this.filterDate || 
          new Date(a.fechaAsistencia).toISOString().split('T')[0] === this.filterDate
        const matchEstado = !this.filterEstado || a.estado === this.filterEstado
        return matchDate && matchEstado
      })
    },
    presentCount() {
      return this.filteredAsistencias.filter(a => a.estado === 'PRESENTE').length
    },
    tardanzaCount() {
      return this.filteredAsistencias.filter(a => a.estado === 'TARDANZA').length
    },
    ausentesCount() {
      return this.filteredAsistencias.filter(a => a.estado === 'AUSENTE').length
    }
  },
  mounted() {
    this.loadAsistencias()
  },
  methods: {
    async loadAsistencias() {
      this.loading = true
      try {
        const response = await api.getAsistencias()
        this.asistencias = response.data || []
      } catch (err) {
        console.error('Error:', err)
        const notification = useNotification()
        notification.error('Error al cargar asistencias')
      } finally {
        this.loading = false
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('es-ES')
    },
    getEstadoIcon(estado) {
      const map = {
        'PRESENTE': 'bi bi-check-circle-fill',
        'TARDANZA': 'bi bi-exclamation-circle-fill',
        'AUSENTE': 'bi bi-x-circle-fill'
      }
      return map[estado] || 'bi bi-question-circle'
    },
    getEstadoBadge(estado) {
      const map = {
        'PRESENTE': 'success',
        'TARDANZA': 'warning',
        'AUSENTE': 'danger'
      }
      return map[estado] || 'secondary'
    },
    calculateDuration(asistencia) {
      if (!asistencia.horaEntrada || !asistencia.horaSalida) return '-'
      
      const entrada = new Date(`2000-01-01 ${asistencia.horaEntrada}`)
      const salida = new Date(`2000-01-01 ${asistencia.horaSalida}`)
      const diff = Math.floor((salida - entrada) / (1000 * 60))
      
      if (diff < 0) return '-'
      const horas = Math.floor(diff / 60)
      const minutos = diff % 60
      return `${horas}h ${minutos}m`
    },
    resetFilters() {
      this.filterDate = ''
      this.filterEstado = ''
    },
    getInitials(nombre, apellido) {
      return `${(nombre || '').charAt(0)}${(apellido || '').charAt(0)}`.toUpperCase()
    },
    handleExported(event) {
      const notification = useNotification()
      notification.success(`¡Exportado a ${event.format}!`, 2000)
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.asistencias-container {
  background: linear-gradient(135deg, #f5f7fa 0%, #f0f4f8 100%);
  min-height: 100vh;
  padding: 32px 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Header */
.asistencias-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.header-left {
  flex: 1;
  min-width: 250px;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 8px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.page-title i {
  color: #667eea;
}

.page-subtitle {
  color: #718096;
  font-size: 14px;
  margin: 0;
}

.header-stats {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.stat-badge {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 10px 16px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.2);
}

.stat-badge i {
  font-size: 16px;
}

.stat-badge.warning {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.2);
}

.stat-badge.danger {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.2);
}

/* Filter Bar */
.filter-bar {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-end;
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.filter-item label {
  font-size: 12px;
  font-weight: 600;
  color: #4a5568;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.filter-input {
  padding: 10px 14px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  transition: all 0.2s ease;
  min-width: 180px;
}

.filter-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.btn-reset {
  padding: 10px 16px;
  background: #f0f4f8;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  color: #4a5568;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
}

.btn-reset:hover {
  background: #e2e8f0;
  border-color: #cbd5e0;
}

/* Empty State */
.empty-state {
  background: white;
  border-radius: 14px;
  padding: 60px 40px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.empty-icon {
  font-size: 64px;
  color: #cbd5e0;
  margin-bottom: 20px;
}

.empty-state h3 {
  font-size: 20px;
  color: #2d3748;
  margin-bottom: 8px;
  font-weight: 600;
}

.empty-state p {
  color: #718096;
  font-size: 14px;
}

/* Table Card */
.table-card {
  background: white;
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.table-wrapper {
  overflow-x: auto;
}

.asistencias-table {
  width: 100%;
  border-collapse: collapse;
}

.asistencias-table thead {
  background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
  border-bottom: 2px solid #e2e8f0;
}

.asistencias-table th {
  padding: 14px 16px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.asistencias-table th i {
  margin-right: 6px;
  color: #667eea;
}

.table-row {
  border-bottom: 1px solid #e2e8f0;
  transition: all 0.2s ease;
}

.table-row:hover {
  background: #f7fafc;
}

.table-row.estado-presente {
  border-left: 4px solid #10b981;
}

.table-row.estado-tardanza {
  border-left: 4px solid #f59e0b;
}

.table-row.estado-ausente {
  border-left: 4px solid #ef4444;
}

.asistencias-table td {
  padding: 14px 16px;
  font-size: 14px;
  color: #2d3748;
}

.col-empleado { width: 20%; }
.col-fecha { width: 15%; }
.col-entrada { width: 12%; }
.col-salida { width: 12%; }
.col-duracion { width: 13%; }
.col-estado { width: 18%; }

.empleado-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.empleado-avatar {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 12px;
  flex-shrink: 0;
}

.empleado-nombre {
  display: block;
  font-weight: 600;
  color: #2d3748;
}

.fecha-badge {
  background: #f0f4ff;
  color: #667eea;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.hora-text {
  font-family: 'Monaco', 'Courier New', monospace;
  color: #718096;
  font-weight: 500;
}

.duracion-badge {
  background: #edf2f7;
  color: #4a5568;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.estado-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
}

.estado-presente {
  background: #dcfce7;
  color: #166534;
}

.estado-tardanza {
  background: #fef3c7;
  color: #92400e;
}

.estado-ausente {
  background: #fee2e2;
  color: #991b1b;
}

.estado-badge i {
  font-size: 14px;
}

/* Pagination */
.pagination {
  padding: 16px 24px;
  text-align: right;
  border-top: 1px solid #e2e8f0;
  font-size: 13px;
  color: #718096;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 1024px) {
  .col-empleado { width: 25%; }
  .col-fecha { width: 20%; }
  .col-entrada { width: 13%; }
  .col-salida { width: 13%; }
  .col-duracion { width: 12%; }
  .col-estado { width: 17%; }
}

@media (max-width: 768px) {
  .asistencias-container {
    padding: 20px 16px;
  }

  .asistencias-header {
    flex-direction: column;
    align-items: stretch;
  }

  .header-stats {
    justify-content: flex-start;
  }

  .page-title {
    font-size: 26px;
  }

  .filter-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-input {
    min-width: 100%;
  }

  .btn-reset {
    width: 100%;
    justify-content: center;
  }

  .col-empleado { width: 30%; }
  .col-fecha { width: 25%; }
  .col-entrada { display: none; }
  .col-salida { display: none; }
  .col-duracion { width: 20%; }
  .col-estado { width: 25%; }

  .asistencias-table th,
  .asistencias-table td {
    padding: 10px 8px;
  }

  .asistencias-table {
    font-size: 12px;
  }

  .estado-badge {
    padding: 4px 8px;
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .asistencias-container {
    padding: 16px 12px;
  }

  .page-title {
    font-size: 22px;
  }

  .header-stats {
    flex-direction: column;
    gap: 8px;
  }

  .stat-badge {
    width: 100%;
    justify-content: center;
  }

  .col-empleado { width: 40%; }
  .col-fecha { width: 30%; }
  .col-duracion { width: 30%; }
  .col-estado { display: none; }

  .empleado-avatar {
    width: 32px;
    height: 32px;
    font-size: 11px;
  }

  .empleado-cell {
    gap: 8px;
  }

  .empty-state {
    padding: 40px 20px;
  }
}
</style>
