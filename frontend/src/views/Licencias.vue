<template>
  <div class="licencias-container">
    <!-- Header -->
    <div class="licencias-header">
      <div class="header-left">
        <h1 class="page-title">
          <i class="bi bi-calendar-check-fill"></i> Solicitudes de Licencia
        </h1>
        <p class="page-subtitle">Gestiona solicitudes de licencia y vacaciones del personal</p>
      </div>
      <div class="header-stats">
        <div class="stat-badge pending">
          <i class="bi bi-clock-fill"></i>
          <span>{{ pendienteCount }} Pendientes</span>
        </div>
        <div class="stat-badge approved">
          <i class="bi bi-check-circle-fill"></i>
          <span>{{ aprobadaCount }} Aprobadas</span>
        </div>
        <div class="stat-badge rejected">
          <i class="bi bi-x-circle-fill"></i>
          <span>{{ rechazadaCount }} Rechazadas</span>
        </div>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="filter-bar">
      <div class="filter-item">
        <label>Estado:</label>
        <select v-model="filterEstado" class="filter-input">
          <option value="">Todos los estados</option>
          <option value="PENDIENTE">Pendiente</option>
          <option value="APROBADA">Aprobada</option>
          <option value="RECHAZADA">Rechazada</option>
        </select>
      </div>
      <button @click="resetFilters" class="btn-reset">
        <i class="bi bi-arrow-counterclockwise"></i> Restablecer
      </button>
      <ExportButtons
        :data="filteredLicencias"
        filename="solicitudes-licencia"
        title="Solicitudes de Licencia"
        @exported="handleExported"
      />
    </div>

    <!-- Empty State -->
    <div v-if="licencias.length === 0" class="empty-state">
      <div class="empty-icon">
        <i class="bi bi-inbox"></i>
      </div>
      <h3>No hay solicitudes de licencia</h3>
      <p>Las solicitudes de licencia aparecerán aquí cuando se realicen</p>
    </div>

    <!-- Table Card -->
    <div v-else class="table-card">
      <div class="table-wrapper">
        <table class="licencias-table">
          <thead>
            <tr>
              <th class="col-empleado">
                <i class="bi bi-person"></i> Empleado
              </th>
              <th class="col-tipo">
                <i class="bi bi-tag"></i> Tipo
              </th>
              <th class="col-fechas">
                <i class="bi bi-calendar"></i> Fechas
              </th>
              <th class="col-dias">
                <i class="bi bi-hourglass-split"></i> Días
              </th>
              <th class="col-estado">Estado</th>
              <th class="col-acciones">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="licencia in filteredLicencias" :key="licencia.id" class="table-row" :class="`estado-${licencia.estado.toLowerCase()}`">
              <td class="col-empleado">
                <div class="empleado-cell">
                  <div class="empleado-avatar">
                    {{ getInitials(licencia.empleado?.nombre, licencia.empleado?.apellido) }}
                  </div>
                  <div class="empleado-info">
                    <span class="empleado-nombre">{{ licencia.empleado?.nombre }}</span>
                  </div>
                </div>
              </td>
              <td class="col-tipo">
                <span class="tipo-badge">{{ licencia.tipoLicencia?.nombre }}</span>
              </td>
              <td class="col-fechas">
                <div class="fecha-range">
                  <span class="fecha-inicio">{{ formatDate(licencia.fechaInicio) }}</span>
                  <i class="bi bi-arrow-right"></i>
                  <span class="fecha-fin">{{ formatDate(licencia.fechaFin) }}</span>
                </div>
              </td>
              <td class="col-dias">
                <span class="dias-badge">{{ licencia.diasSolicitados }}</span>
              </td>
              <td class="col-estado">
                <span :class="`estado-badge estado-${licencia.estado.toLowerCase()}`">
                  <i :class="getEstadoIcon(licencia.estado)"></i>
                  {{ licencia.estado }}
                </span>
              </td>
              <td class="col-acciones">
                <div class="action-buttons">
                  <button 
                    v-if="licencia.estado === 'PENDIENTE'" 
                    @click="mostrarConfirmacion('aprobar', licencia.id)" 
                    class="btn-action btn-approve"
                    title="Aprobar"
                  >
                    <i class="bi bi-check-lg"></i>
                  </button>
                  <button 
                    v-if="licencia.estado === 'PENDIENTE'" 
                    @click="mostrarConfirmacion('rechazar', licencia.id)" 
                    class="btn-action btn-reject"
                    title="Rechazar"
                  >
                    <i class="bi bi-x-lg"></i>
                  </button>
                  <span v-else class="badge-processed">
                    {{ licencia.estado === 'APROBADA' ? 'Aprobado' : 'Rechazado' }}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="filteredLicencias.length > 0" class="pagination">
        <p>Mostrando {{ filteredLicencias.length }} solicitudes de {{ licencias.length }}</p>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <transition name="modal">
      <div v-if="showConfirm" class="modal-overlay">
        <div class="modal-confirm">
          <div class="confirm-icon" :class="confirmAction">
            <i :class="confirmAction === 'aprobar' ? 'bi bi-check-circle' : 'bi bi-x-circle'"></i>
          </div>
          <h3>{{ confirmAction === 'aprobar' ? 'Aprobar Licencia' : 'Rechazar Licencia' }}</h3>
          <p>{{ confirmAction === 'aprobar' ? 
              '¿Está seguro de que desea aprobar esta solicitud de licencia?' : 
              '¿Está seguro de que desea rechazar esta solicitud de licencia?' }}</p>
          <div class="confirm-actions">
            <button @click="showConfirm = false" class="btn-cancel">
              Cancelar
            </button>
            <button 
              @click="confirmarAccion" 
              :class="`btn-${confirmAction}-confirm`"
            >
              <i :class="confirmAction === 'aprobar' ? 'bi bi-check-lg' : 'bi bi-x-lg'"></i>
              {{ confirmAction === 'aprobar' ? 'Aprobar' : 'Rechazar' }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import api from '../services/api'
import { useNotification } from '../services/notification.service'
import ExportButtons from '../components/ExportButtons.vue'

export default {
  name: 'Licencias',
  components: {
    ExportButtons
  },
  data() {
    return {
      licencias: [],
      filterEstado: '',
      showConfirm: false,
      confirmAction: '',
      confirmId: null
    }
  },
  computed: {
    filteredLicencias() {
      if (!this.filterEstado) return this.licencias
      return this.licencias.filter(l => l.estado === this.filterEstado)
    },
    pendienteCount() {
      return this.filteredLicencias.filter(l => l.estado === 'PENDIENTE').length
    },
    aprobadaCount() {
      return this.filteredLicencias.filter(l => l.estado === 'APROBADA').length
    },
    rechazadaCount() {
      return this.filteredLicencias.filter(l => l.estado === 'RECHAZADA').length
    }
  },
  mounted() {
    this.loadLicencias()
  },
  methods: {
    async loadLicencias() {
      try {
        const response = await api.getSolicitudesLicencia()
        this.licencias = response.data || []
      } catch (err) {
        console.error('Error:', err)
      }
    },
    mostrarConfirmacion(accion, id) {
      this.confirmAction = accion
      this.confirmId = id
      this.showConfirm = true
    },
    async confirmarAccion() {
      try {
        if (this.confirmAction === 'aprobar') {
          await api.aprobarLicencia(this.confirmId)
        } else {
          await api.rechazarLicencia(this.confirmId)
        }
        this.loadLicencias()
        this.showConfirm = false
      } catch (err) {
        alert(`Error ${this.confirmAction === 'aprobar' ? 'aprobando' : 'rechazando'} licencia`)
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('es-ES')
    },
    getEstadoIcon(estado) {
      const map = {
        'PENDIENTE': 'bi bi-clock-fill',
        'APROBADA': 'bi bi-check-circle-fill',
        'RECHAZADA': 'bi bi-x-circle-fill'
      }
      return map[estado] || 'bi bi-question-circle'
    },
    getEstadoBadge(estado) {
      const map = {
        'PENDIENTE': 'warning',
        'APROBADA': 'success',
        'RECHAZADA': 'danger'
      }
      return map[estado] || 'secondary'
    },
    resetFilters() {
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

.licencias-container {
  background: linear-gradient(135deg, #f5f7fa 0%, #f0f4f8 100%);
  min-height: 100vh;
  padding: 32px 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Header */
.licencias-header {
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
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
  padding: 10px 16px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.2);
}

.stat-badge i {
  font-size: 16px;
}

.stat-badge.approved {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.2);
}

.stat-badge.rejected {
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

.licencias-table {
  width: 100%;
  border-collapse: collapse;
}

.licencias-table thead {
  background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
  border-bottom: 2px solid #e2e8f0;
}

.licencias-table th {
  padding: 14px 16px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.licencias-table th i {
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

.table-row.estado-pendiente {
  border-left: 4px solid #f59e0b;
}

.table-row.estado-aprobada {
  border-left: 4px solid #10b981;
}

.table-row.estado-rechazada {
  border-left: 4px solid #ef4444;
}

.licencias-table td {
  padding: 14px 16px;
  font-size: 14px;
  color: #2d3748;
}

.col-empleado { width: 18%; }
.col-tipo { width: 15%; }
.col-fechas { width: 24%; }
.col-dias { width: 10%; }
.col-estado { width: 15%; }
.col-acciones { width: 18%; }

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

.tipo-badge {
  background: #e8ecff;
  color: #667eea;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.fecha-range {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
}

.fecha-inicio,
.fecha-fin {
  background: #f0f4ff;
  color: #667eea;
  padding: 3px 8px;
  border-radius: 4px;
  font-weight: 600;
  font-family: 'Monaco', 'Courier New', monospace;
}

.fecha-range i {
  color: #cbd5e0;
  font-size: 12px;
}

.dias-badge {
  background: #edf2f7;
  color: #4a5568;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
  min-width: 30px;
  text-align: center;
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

.estado-pendiente {
  background: #fef3c7;
  color: #92400e;
}

.estado-aprobada {
  background: #dcfce7;
  color: #166534;
}

.estado-rechazada {
  background: #fee2e2;
  color: #991b1b;
}

.estado-badge i {
  font-size: 14px;
}

.action-buttons {
  display: flex;
  gap: 6px;
}

.btn-action {
  background: none;
  border: none;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-approve {
  color: #10b981;
  background: #dcfce7;
}

.btn-approve:hover {
  background: #bbf7d0;
  transform: scale(1.1);
}

.btn-reject {
  color: #ef4444;
  background: #fee2e2;
}

.btn-reject:hover {
  background: #fecaca;
  transform: scale(1.1);
}

.badge-processed {
  display: inline-block;
  padding: 4px 8px;
  background: #f0f4f8;
  color: #718096;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-confirm {
  background: white;
  border-radius: 14px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  padding: 40px 30px;
  text-align: center;
  width: 100%;
  max-width: 400px;
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.confirm-icon {
  font-size: 56px;
  margin-bottom: 16px;
}

.confirm-icon.aprobar {
  color: #10b981;
}

.confirm-icon.rechazar {
  color: #ef4444;
}

.modal-confirm h3 {
  font-size: 18px;
  color: #2d3748;
  margin-bottom: 8px;
  font-weight: 600;
}

.modal-confirm p {
  color: #718096;
  font-size: 14px;
  margin-bottom: 24px;
}

.confirm-actions {
  display: flex;
  gap: 12px;
}

.btn-cancel {
  flex: 1;
  padding: 10px 16px;
  background: #f0f4f8;
  color: #4a5568;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-cancel:hover {
  background: #e2e8f0;
}

.btn-aprobar-confirm,
.btn-rechazar-confirm {
  flex: 1;
  padding: 10px 16px;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.btn-aprobar-confirm {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
}

.btn-aprobar-confirm:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

.btn-rechazar-confirm {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
}

.btn-rechazar-confirm:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
}

/* Transitions */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 1024px) {
  .col-empleado { width: 20%; }
  .col-tipo { width: 18%; }
  .col-fechas { width: 22%; }
  .col-dias { width: 12%; }
  .col-estado { width: 15%; }
  .col-acciones { width: 13%; }
}

@media (max-width: 768px) {
  .licencias-container {
    padding: 20px 16px;
  }

  .licencias-header {
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

  .col-empleado { width: 25%; }
  .col-tipo { width: 20%; }
  .col-fechas { display: none; }
  .col-dias { width: 15%; }
  .col-estado { width: 20%; }
  .col-acciones { width: 20%; }

  .licencias-table th,
  .licencias-table td {
    padding: 10px 8px;
  }

  .licencias-table {
    font-size: 12px;
  }

  .estado-badge {
    padding: 4px 8px;
    font-size: 11px;
  }

  .action-buttons {
    gap: 4px;
  }

  .btn-action {
    width: 30px;
    height: 30px;
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .licencias-container {
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

  .col-empleado { width: 35%; }
  .col-tipo { width: 25%; }
  .col-dias { width: 20%; }
  .col-estado { display: none; }
  .col-acciones { width: 20%; }

  .empleado-avatar {
    width: 32px;
    height: 32px;
    font-size: 11px;
  }

  .empleado-cell {
    gap: 8px;
  }

  .modal-confirm {
    padding: 30px 20px;
  }

  .empty-state {
    padding: 40px 20px;
  }
}
</style>
