<template>
  <div class="licencias-container">
    <!-- Header -->
    <div class="licencias-header">
      <div class="header-left">
        <div class="header-icon">
          <i class="bi bi-calendar-check-fill"></i>
        </div>
        <div class="header-text">
          <h1 class="page-title">Solicitudes de Licencia</h1>
          <p class="page-subtitle">Gestiona solicitudes de licencia y vacaciones del personal</p>
        </div>
      </div>
      <div class="header-stats">
        <div class="stat-badge pending">
          <div class="stat-icon">
            <i class="bi bi-clock-fill"></i>
          </div>
          <div class="stat-info">
            <span class="stat-number">{{ pendienteCount }}</span>
            <span class="stat-label">Pendientes</span>
          </div>
        </div>
        <div class="stat-badge approved">
          <div class="stat-icon">
            <i class="bi bi-check-circle-fill"></i>
          </div>
          <div class="stat-info">
            <span class="stat-number">{{ aprobadaCount }}</span>
            <span class="stat-label">Aprobadas</span>
          </div>
        </div>
        <div class="stat-badge rejected">
          <div class="stat-icon">
            <i class="bi bi-x-circle-fill"></i>
          </div>
          <div class="stat-info">
            <span class="stat-number">{{ rechazadaCount }}</span>
            <span class="stat-label">Rechazadas</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="filter-bar">
      <div class="filter-group">
        <div class="filter-item">
          <label>
            <i class="bi bi-funnel"></i> Estado
          </label>
          <div class="select-wrapper">
            <select v-model="filterEstado" class="filter-input">
              <option value="">Todos los estados</option>
              <option value="PENDIENTE">Pendiente</option>
              <option value="APROBADA">Aprobada</option>
              <option value="RECHAZADA">Rechazada</option>
            </select>
            <i class="bi bi-chevron-down"></i>
          </div>
        </div>
      </div>
      <div class="filter-actions">
        <button @click="resetFilters" class="btn-reset">
          <i class="bi bi-arrow-counterclockwise"></i>
          <span>Restablecer</span>
        </button>
        <ExportButtons
          :data="filteredLicencias"
          filename="solicitudes-licencia"
          title="Solicitudes de Licencia"
          @exported="handleExported"
        />
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="licencias.length === 0" class="empty-state">
      <div class="empty-illustration">
        <svg viewBox="0 0 200 200" class="empty-svg">
          <rect x="40" y="60" width="120" height="80" rx="8" fill="#f1f5f9"/>
          <rect x="50" y="70" width="100" height="60" rx="4" fill="white"/>
          <line x1="60" y1="90" x2="140" y2="90" stroke="#e2e8f0" stroke-width="2"/>
          <line x1="60" y1="105" x2="120" y2="105" stroke="#e2e8f0" stroke-width="2"/>
          <line x1="60" y1="120" x2="130" y2="120" stroke="#e2e8f0" stroke-width="2"/>
          <circle cx="100" cy="160" r="30" fill="#f1f5f9"/>
          <path d="M85 160 L95 170 L115 150" stroke="#94a3b8" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h3>No hay solicitudes de licencia</h3>
      <p>Las solicitudes de licencia aparecerán aquí cuando se realicen</p>
    </div>

    <!-- Table Card -->
    <div v-else class="table-card">
      <div class="table-header">
        <div class="table-title">
          <i class="bi bi-calendar-range"></i>
          <span>Lista de Solicitudes</span>
        </div>
        <div class="table-info">
          <span class="info-badge">
            <i class="bi bi-info-circle"></i>
            Haz clic en los estados para filtrar
          </span>
        </div>
      </div>
      
      <div class="table-wrapper">
        <table class="licencias-table">
          <thead>
            <tr>
              <th class="col-num">#</th>
              <th class="col-empleado">
                <i class="bi bi-person"></i> Empleado
              </th>
              <th class="col-tipo">
                <i class="bi bi-tag"></i> Tipo
              </th>
              <th class="col-fechas">
                <i class="bi bi-calendar-range"></i> Período
              </th>
              <th class="col-dias">
                <i class="bi bi-hourglass-split"></i> Días
              </th>
              <th class="col-motivo">
                <i class="bi bi-chat-text"></i> Motivo
              </th>
              <th class="col-estado">
                <i class="bi bi-flag"></i> Estado
              </th>
              <th class="col-acciones">
                <i class="bi bi-gear"></i> Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(licencia, index) in filteredLicencias" :key="licencia.id" 
                class="table-row" 
                :class="`estado-${licencia.estado.toLowerCase()}`">
              <td class="col-num">
                <span class="row-number">{{ index + 1 }}</span>
              </td>
              <td class="col-empleado">
                <div class="empleado-cell">
                  <div class="empleado-avatar" :class="getAvatarClass(licencia.estado)">
                    {{ getInitials(licencia.empleado?.nombre, licencia.empleado?.apellido) }}
                  </div>
                  <div class="empleado-info">
                    <span class="empleado-nombre">
                      {{ licencia.empleado?.nombre }} {{ licencia.empleado?.apellido }}
                    </span>
                    <span class="empleado-meta">ID: {{ licencia.empleado?.id }}</span>
                  </div>
                </div>
              </td>
              <td class="col-tipo">
                <span class="tipo-badge">
                  <i class="bi bi-tag-fill"></i>
                  {{ licencia.tipoLicencia?.nombre || 'General' }}
                </span>
              </td>
              <td class="col-fechas">
                <div class="fecha-range">
                  <div class="fecha-item">
                    <span class="fecha-label">Desde</span>
                    <span class="fecha-value">{{ formatDate(licencia.fechaInicio) }}</span>
                  </div>
                  <div class="fecha-arrow">
                    <i class="bi bi-arrow-right"></i>
                  </div>
                  <div class="fecha-item">
                    <span class="fecha-label">Hasta</span>
                    <span class="fecha-value">{{ formatDate(licencia.fechaFin) }}</span>
                  </div>
                </div>
              </td>
              <td class="col-dias">
                <span class="dias-badge">
                  <i class="bi bi-calendar-week"></i>
                  {{ licencia.diasSolicitados }} días
                </span>
              </td>
              <td class="col-motivo">
                <span class="motivo-text" :title="licencia.motivo || 'Sin especificar'">
                  {{ truncateMotivo(licencia.motivo) }}
                </span>
              </td>
              <td class="col-estado">
                <button 
                  class="estado-chip" 
                  :class="getEstadoClass(licencia.estado)"
                  @click="filterEstado = licencia.estado"
                >
                  <span class="chip-dot"></span>
                  {{ formatEstado(licencia.estado) }}
                </button>
              </td>
              <td class="col-acciones">
                <div class="action-buttons" v-if="licencia.estado === 'PENDIENTE'">
                  <button 
                    @click="mostrarConfirmacion('aprobar', licencia.id)" 
                    class="btn-action btn-approve"
                    title="Aprobar"
                  >
                    <i class="bi bi-check-lg"></i>
                  </button>
                  <button 
                    @click="mostrarConfirmacion('rechazar', licencia.id)" 
                    class="btn-action btn-reject"
                    title="Rechazar"
                  >
                    <i class="bi bi-x-lg"></i>
                  </button>
                  <button 
                    @click="viewLicencia(licencia)"
                    class="btn-action btn-view"
                    title="Ver detalles"
                  >
                    <i class="bi bi-eye"></i>
                  </button>
                </div>
                <span v-else class="badge-processed">
                  <i class="bi bi-check-circle"></i>
                  {{ licencia.estado === 'APROBADA' ? 'Procesado' : 'Rechazado' }}
                </span>
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
      <div v-if="showConfirm" class="modal-overlay" @click.self="showConfirm = false">
        <div class="modal-confirm">
          <div class="confirm-icon-wrapper">
            <div class="confirm-icon" :class="confirmAction">
              <i :class="confirmAction === 'aprobar' ? 'bi bi-check-circle' : 'bi bi-x-circle'"></i>
            </div>
          </div>
          <h3>{{ confirmAction === 'aprobar' ? 'Aprobar Licencia' : 'Rechazar Licencia' }}</h3>
          <p>{{ confirmAction === 'aprobar' ? 
              '¿Está seguro de que desea aprobar esta solicitud de licencia?' : 
              '¿Está seguro de que desea rechazar esta solicitud de licencia?' }}</p>
          
          <div v-if="confirmAction === 'rechazar'" class="form-group">
            <label>Motivo del rechazo (opcional)</label>
            <textarea 
              v-model="rechazoMotivo" 
              placeholder="Ingrese el motivo del rechazo..."
              rows="3"
              class="rechazo-input"
            ></textarea>
          </div>
          
          <div class="confirm-actions">
            <button @click="showConfirm = false" class="btn-cancel">
              <i class="bi bi-x-lg"></i> Cancelar
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
      confirmId: null,
      rechazoMotivo: ''
    }
  },
  computed: {
    filteredLicencias() {
      if (!this.filterEstado) return this.licencias
      return this.licencias.filter(l => l.estado === this.filterEstado)
    },
    pendienteCount() {
      return this.licencias.filter(l => l.estado === 'PENDIENTE').length
    },
    aprobadaCount() {
      return this.licencias.filter(l => l.estado === 'APROBADA').length
    },
    rechazadaCount() {
      return this.licencias.filter(l => l.estado === 'RECHAZADA').length
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
      this.rechazoMotivo = ''
      this.showConfirm = true
    },
    async confirmarAccion() {
      try {
        if (this.confirmAction === 'aprobar') {
          await api.aprobarLicencia(this.confirmId)
        } else {
          await api.rechazarLicencia(this.confirmId, { motivo: this.rechazoMotivo })
        }
        this.loadLicencias()
        this.showConfirm = false
        const notification = useNotification()
        notification.success(`Licencia ${this.confirmAction === 'aprobar' ? 'aprobada' : 'rechazada'} correctamente`)
      } catch (err) {
        const notification = useNotification()
        notification.error(`Error ${this.confirmAction === 'aprobar' ? 'aprobando' : 'rechazando'} licencia`)
      }
    },
    viewLicencia(licencia) {
      const notification = useNotification()
      notification.info(`Viendo solicitud de ${licencia.empleado?.nombre}`)
    },
    formatDate(date) {
      if (!date) return '-'
      return new Date(date).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    },
    formatEstado(estado) {
      return {
        'PENDIENTE': 'Pendiente',
        'APROBADA': 'Aprobada',
        'RECHAZADA': 'Rechazada'
      }[estado] || estado
    },
    truncateMotivo(motivo) {
      if (!motivo) return '-'
      return motivo.length > 30 ? motivo.substring(0, 30) + '...' : motivo
    },
    getInitials(nombre, apellido) {
      return `${(nombre || '').charAt(0)}${(apellido || '').charAt(0)}`.toUpperCase()
    },
    getAvatarClass(estado) {
      return estado === 'APROBADA' ? 'avatar-success' : 
             estado === 'RECHAZADA' ? 'avatar-danger' : 'avatar-warning'
    },
    getEstadoClass(estado) {
      return {
        'PENDIENTE': 'estado-pendiente',
        'APROBADA': 'estado-aprobada',
        'RECHAZADA': 'estado-rechazada'
      }[estado] || ''
    },
    resetFilters() {
      this.filterEstado = ''
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
  background: #f8fafc;
  min-height: 100vh;
  padding: 32px 24px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Header */
.licencias-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 26px;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
}

.header-text {
  flex: 1;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 6px;
  letter-spacing: -0.5px;
}

.page-subtitle {
  color: #64748b;
  font-size: 14px;
  margin: 0;
}

.header-stats {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.stat-badge {
  background: white;
  padding: 12px 16px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

.stat-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.stat-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.stat-badge.pending .stat-icon {
  background: linear-gradient(135deg, #fef3c7 0%, #fcd34d 100%);
  color: #d97706;
}

.stat-badge.approved .stat-icon {
  background: linear-gradient(135deg, #dcfce7 0%, #86efac 100%);
  color: #16a34a;
}

.stat-badge.rejected .stat-icon {
  background: linear-gradient(135deg, #fee2e2 0%, #fca5a5 100%);
  color: #dc2626;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 22px;
  font-weight: 700;
  color: #1e293b;
  line-height: 1;
}

.stat-label {
  font-size: 12px;
  color: #64748b;
  margin-top: 4px;
}

/* Filter Bar */
.filter-bar {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
}

.filter-group {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-item label {
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.filter-item label i {
  color: #667eea;
}

.select-wrapper {
  position: relative;
}

.filter-input {
  padding: 12px 40px 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  background: white;
  font-family: inherit;
  min-width: 180px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.select-wrapper i {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  pointer-events: none;
}

.filter-actions {
  display: flex;
  gap: 12px;
}

.btn-reset {
  padding: 12px 20px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  color: #64748b;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.btn-reset:hover {
  background: #f8fafc;
  border-color: #cbd5e0;
  color: #475569;
}

/* Empty State */
.empty-state {
  background: white;
  border-radius: 20px;
  padding: 60px 40px;
  text-align: center;
  border: 1px solid #e2e8f0;
}

.empty-illustration {
  margin-bottom: 24px;
}

.empty-svg {
  width: 120px;
  height: 120px;
}

.empty-state h3 {
  font-size: 22px;
  color: #1e293b;
  margin-bottom: 10px;
  font-weight: 600;
}

.empty-state p {
  color: #64748b;
  font-size: 15px;
}

/* Table Card */
.table-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid #e2e8f0;
  overflow: hidden;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e2e8f0;
  background: #fafbfc;
}

.table-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
}

.table-title i {
  color: #f59e0b;
}

.info-badge {
  font-size: 13px;
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 6px;
}

.table-wrapper {
  overflow-x: auto;
}

.licencias-table {
  width: 100%;
  border-collapse: collapse;
}

.licencias-table thead {
  background: linear-gradient(135deg, #f59e0b08 0%, #d9770608 100%);
  border-bottom: 2px solid #e2e8f0;
}

.licencias-table th {
  padding: 16px 20px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.licencias-table th i {
  margin-right: 8px;
  color: #f59e0b;
}

.table-row {
  border-bottom: 1px solid #f1f5f9;
  transition: all 0.2s ease;
}

.table-row:hover {
  background: #fafbfc;
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
  padding: 16px 20px;
  font-size: 14px;
  color: #334155;
  vertical-align: middle;
}

.col-num { width: 50px; text-align: center; }
.col-empleado { width: 22%; }
.col-tipo { width: 14%; }
.col-fechas { width: 24%; }
.col-dias { width: 10%; }
.col-motivo { width: 14%; }
.col-estado { width: 12%; }
.col-acciones { width: 120px; text-align: center; }

.row-number {
  background: #f1f5f9;
  color: #64748b;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
}

.empleado-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.empleado-avatar {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  flex-shrink: 0;
}

.empleado-avatar.avatar-success {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.empleado-avatar.avatar-danger {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
}

.empleado-avatar.avatar-warning {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
}

.empleado-info {
  flex: 1;
  min-width: 0;
}

.empleado-nombre {
  display: block;
  font-weight: 600;
  color: #1e293b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.empleado-meta {
  display: block;
  font-size: 12px;
  color: #94a3b8;
  margin-top: 2px;
}

.tipo-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #f0f4ff;
  color: #667eea;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
}

.tipo-badge i {
  font-size: 10px;
}

.fecha-range {
  display: flex;
  align-items: center;
  gap: 10px;
}

.fecha-item {
  display: flex;
  flex-direction: column;
}

.fecha-label {
  font-size: 10px;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.fecha-value {
  background: #f1f5f9;
  color: #475569;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  font-family: 'SF Mono', 'Monaco', monospace;
}

.fecha-arrow {
  color: #cbd5e1;
}

.dias-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #fef3c7;
  color: #92400e;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
}

.dias-badge i {
  font-size: 12px;
}

.motivo-text {
  color: #64748b;
  font-size: 13px;
  display: block;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.estado-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.estado-chip.estado-pendiente {
  background: #fef3c7;
  color: #92400e;
}

.estado-chip.estado-aprobada {
  background: #dcfce7;
  color: #166534;
}

.estado-chip.estado-rechazada {
  background: #fee2e2;
  color: #991b1b;
}

.chip-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

.action-buttons {
  display: flex;
  gap: 6px;
}

.btn-action {
  background: none;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  display: flex;
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

.btn-view {
  color: #3b82f6;
  background: #dbeafe;
}

.btn-view:hover {
  background: #bfdbfe;
  transform: scale(1.1);
}

.badge-processed {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #f1f5f9;
  color: #64748b;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.badge-processed i {
  font-size: 12px;
}

/* Pagination */
.pagination {
  padding: 16px 24px;
  text-align: right;
  border-top: 1px solid #e2e8f0;
  font-size: 13px;
  color: #64748b;
  font-weight: 500;
  background: #fafbfc;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  backdrop-filter: blur(4px);
}

.modal-confirm {
  background: white;
  border-radius: 24px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 40px 32px;
  text-align: center;
  width: 100%;
  max-width: 440px;
  animation: modalSlide 0.3s ease-out;
}

@keyframes modalSlide {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.confirm-icon-wrapper {
  margin-bottom: 20px;
}

.confirm-icon {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
}

.confirm-icon.aprobar {
  background: linear-gradient(135deg, #dcfce7 0%, #86efac 100%);
  color: #16a34a;
}

.confirm-icon.rechazar {
  background: linear-gradient(135deg, #fee2e2 0%, #fca5a5 100%);
  color: #dc2626;
}

.modal-confirm h3 {
  font-size: 22px;
  color: #1e293b;
  margin-bottom: 12px;
  font-weight: 700;
}

.modal-confirm p {
  color: #64748b;
  font-size: 15px;
  margin-bottom: 24px;
  line-height: 1.6;
}

.rechazo-input {
  width: 100%;
  padding: 14px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  transition: all 0.2s ease;
}

.rechazo-input:focus {
  outline: none;
  border-color: #ef4444;
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
}

.confirm-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.btn-cancel,
.btn-aprobar-confirm,
.btn-rechazar-confirm {
  flex: 1;
  padding: 14px 20px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
}

.btn-cancel {
  background: #f1f5f9;
  color: #475569;
}

.btn-cancel:hover {
  background: #e2e8f0;
}

.btn-aprobar-confirm {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
}

.btn-aprobar-confirm:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

.btn-rechazar-confirm {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
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
@media (max-width: 1200px) {
  .col-fechas { width: 28%; }
  .col-motivo { width: 12%; }
}

@media (max-width: 1024px) {
  .col-empleado { width: 25%; }
  .col-tipo { width: 16%; }
  .col-fechas { width: 26%; }
  .col-dias { width: 12%; }
  .col-motivo { display: none; }
  .col-estado { width: 14%; }
  .col-acciones { width: 100px; }
}

@media (max-width: 768px) {
  .licencias-container {
    padding: 24px 16px;
  }

  .licencias-header {
    flex-direction: column;
    align-items: stretch;
  }

  .header-stats {
    justify-content: flex-start;
  }

  .stat-badge {
    flex: 1;
    justify-content: center;
  }

  .filter-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-group {
    flex-direction: column;
  }

  .filter-input {
    min-width: 100%;
  }

  .filter-actions {
    flex-direction: column;
  }

  .btn-reset {
    width: 100%;
    justify-content: center;
  }

  .col-empleado { width: 30%; }
  .col-tipo { width: 18%; }
  .col-fechas { display: none; }
  .col-dias { width: 15%; }
  .col-estado { width: 20%; }
  .col-acciones { width: 17%; }

  .licencias-table th,
  .licencias-table td {
    padding: 12px 14px;
  }

  .licencias-table {
    font-size: 13px;
  }

  .empleado-avatar {
    width: 36px;
    height: 36px;
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .licencias-container {
    padding: 20px 12px;
  }

  .page-title {
    font-size: 22px;
  }

  .header-stats {
    flex-direction: column;
  }

  .stat-badge {
    width: 100%;
  }

  .col-empleado { width: 40%; }
  .col-tipo { width: 25%; }
  .col-dias { width: 35%; }
  .col-estado, .col-acciones { display: none; }

  .empleado-cell {
    gap: 10px;
  }

  .modal-confirm {
    padding: 30px 24px;
    border-radius: 20px 20px 0 0;
    margin-top: auto;
  }
}
</style>
