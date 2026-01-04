<template>
  <div class="auditoria-container">
    <!-- Header -->
    <div class="auditoria-header">
      <div class="header-left">
        <h1 class="page-title">
          <i class="bi bi-clock-history"></i> Auditoría de Cambios
        </h1>
        <p class="page-subtitle">Registros detallados de modificaciones en el sistema</p>
      </div>
    </div>

    <!-- Filtros -->
    <div class="filter-bar">
      <div class="filter-item">
        <label>Tipo de Entidad:</label>
        <select v-model="filterEntityType" class="filter-input">
          <option value="">Todas las entidades</option>
          <option value="Empleado">Empleados</option>
          <option value="Asistencia">Asistencias</option>
          <option value="Licencia">Licencias</option>
          <option value="Usuario">Usuarios</option>
        </select>
      </div>
      
      <div class="filter-item">
        <label>Acción:</label>
        <select v-model="filterAction" class="filter-input">
          <option value="">Todas las acciones</option>
          <option value="CREATE">Crear</option>
          <option value="UPDATE">Actualizar</option>
          <option value="DELETE">Eliminar</option>
          <option value="APPROVE">Aprobar</option>
          <option value="REJECT">Rechazar</option>
        </select>
      </div>

      <div class="filter-item">
        <label>Desde:</label>
        <input v-model="filterStartDate" type="datetime-local" class="filter-input">
      </div>

      <div class="filter-item">
        <label>Hasta:</label>
        <input v-model="filterEndDate" type="datetime-local" class="filter-input">
      </div>

      <button @click="applyFilters" class="btn-apply">
        <i class="bi bi-search"></i> Filtrar
      </button>
      <button @click="resetFilters" class="btn-reset">
        <i class="bi bi-arrow-counterclockwise"></i> Restablecer
      </button>
      <ExportButtons
        :data="filteredLogs"
        filename="auditoria-cambios"
        title="Auditoría de Cambios"
        @exported="handleExported"
      />
    </div>

    <!-- Empty State -->
    <div v-if="auditLogs.length === 0" class="empty-state">
      <div class="empty-icon">
        <i class="bi bi-inbox"></i>
      </div>
      <h3>No hay registros de auditoría</h3>
      <p>Los cambios en el sistema aparecerán aquí</p>
    </div>

    <!-- Timeline View -->
    <div v-else class="audit-timeline">
      <div v-for="log in filteredLogs" :key="log.id" class="timeline-item" :class="getActionClass(log.action)">
        <div class="timeline-marker">
          <i :class="getActionIcon(log.action)"></i>
        </div>
        
        <div class="timeline-content">
          <div class="log-header">
            <div class="log-title">
              <span class="action-badge" :class="log.action.toLowerCase()">
                {{ log.action }}
              </span>
              <span class="entity-name">{{ log.entityName }} #{{ log.entityId }}</span>
            </div>
            <div class="log-date">
              {{ formatDate(log.createdAt) }}
            </div>
          </div>

          <div class="log-body">
            <div class="log-user">
              <i class="bi bi-person-circle"></i>
              <strong>Usuario:</strong> {{ log.username }}
            </div>
            
            <div v-if="log.changes" class="log-changes">
              <strong>Cambios realizados:</strong>
              <p>{{ log.changes }}</p>
            </div>

            <div v-if="log.oldValues && log.newValues" class="log-comparison">
              <div class="comparison-row">
                <div class="comparison-col">
                  <h5>Valores Anteriores</h5>
                  <pre>{{ formatJson(log.oldValues) }}</pre>
                </div>
                <div class="comparison-col">
                  <h5>Valores Nuevos</h5>
                  <pre>{{ formatJson(log.newValues) }}</pre>
                </div>
              </div>
            </div>

            <div class="log-metadata">
              <span v-if="log.ipAddress" class="metadata-item">
                <i class="bi bi-globe"></i> IP: {{ log.ipAddress }}
              </span>
              <span v-if="log.reason" class="metadata-item">
                <i class="bi bi-info-circle"></i> Razón: {{ log.reason }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="filteredLogs.length > itemsPerPage" class="pagination-container">
      <Pagination
        v-model="currentPage"
        :total="filteredLogs.length"
        :itemsPerPage="itemsPerPage"
        :maxVisiblePages="5"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAuditLogsByDateRange } from '../../../services/audit.service'
import { useNotification } from '../../../services/notification'
import ExportButtons from '../../../components/ExportButtons.vue'
import Pagination from '../../../components/Pagination.vue'

const router = useRouter()
const notification = useNotification()
const auditLogs = ref([])
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Filtros
const filterEntityType = ref('')
const filterAction = ref('')
const filterStartDate = ref(getDateString(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)))
const filterEndDate = ref(getDateString(new Date()))
const loading = ref(false)

// Computed
const filteredLogs = computed(() => {
  return auditLogs.value.filter(log => {
    if (filterEntityType.value && log.entityName !== filterEntityType.value) return false
    if (filterAction.value && log.action !== filterAction.value) return false
    return true
  })
})

const paginatedLogs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredLogs.value.slice(start, end)
})

// Métodos
const getDateString = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

const formatJson = (jsonString) => {
  try {
    const obj = JSON.parse(jsonString)
    return JSON.stringify(obj, null, 2)
  } catch (e) {
    return jsonString
  }
}

const getActionIcon = (action) => {
  const icons = {
    CREATE: 'bi bi-plus-circle',
    UPDATE: 'bi bi-pencil-square',
    DELETE: 'bi bi-trash3',
    APPROVE: 'bi bi-check-circle',
    REJECT: 'bi bi-x-circle',
    LOGIN: 'bi bi-box-arrow-in-right',
    LOGOUT: 'bi bi-box-arrow-right',
    VIEW: 'bi bi-eye',
    EXPORT: 'bi bi-download'
  }
  return icons[action] || 'bi bi-clock-history'
}

const getActionClass = (action) => {
  return `action-${action.toLowerCase()}`
}

const applyFilters = async () => {
  try {
    loading.value = true
    const startDate = new Date(filterStartDate.value)
    const endDate = new Date(filterEndDate.value)
    
    const response = await getAuditLogsByDateRange(startDate, endDate)
    if (response.success) {
      auditLogs.value = response.data
      currentPage.value = 1
      notification.success(`Se cargaron ${response.count} registros de auditoría`)
    }
  } catch (error) {
    notification.error('Error al cargar los registros de auditoría')
  } finally {
    loading.value = false
  }
}

const resetFilters = () => {
  filterEntityType.value = ''
  filterAction.value = ''
  filterStartDate.value = getDateString(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
  filterEndDate.value = getDateString(new Date())
  currentPage.value = 1
  applyFilters()
}

const handleExported = (event) => {
  notification.success(`Datos exportados como ${event.format}`)
}

onMounted(() => {
  applyFilters()
})
</script>

<style scoped>
.auditoria-container {
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.auditoria-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.page-title {
  font-size: 28px;
  font-weight: bold;
  color: #2c3e50;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.page-subtitle {
  color: #7f8c8d;
  margin: 5px 0 0;
  font-size: 14px;
}

.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 25px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.filter-item label {
  font-weight: 600;
  color: #2c3e50;
  font-size: 13px;
}

.filter-input {
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  min-width: 200px;
}

.btn-apply, .btn-reset {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  align-self: flex-end;
}

.btn-apply {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-apply:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-reset {
  background: #ecf0f1;
  color: #2c3e50;
}

.btn-reset:hover {
  background: #bdc3c7;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.empty-icon {
  font-size: 64px;
  color: #bdc3c7;
  margin-bottom: 15px;
}

.empty-state h3 {
  color: #2c3e50;
  margin: 10px 0;
}

.empty-state p {
  color: #7f8c8d;
  margin: 0;
}

.audit-timeline {
  position: relative;
  padding: 20px 0;
}

.audit-timeline::before {
  content: '';
  position: absolute;
  left: 40px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, #667eea, #764ba2);
}

.timeline-item {
  display: flex;
  margin-bottom: 30px;
  position: relative;
}

.timeline-marker {
  position: absolute;
  left: 0;
  width: 80px;
  height: 80px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.timeline-item.action-create .timeline-marker {
  color: #27ae60;
  background: #d5f4e6;
}

.timeline-item.action-update .timeline-marker {
  color: #3498db;
  background: #d6eaf8;
}

.timeline-item.action-delete .timeline-marker {
  color: #e74c3c;
  background: #fadbd8;
}

.timeline-item.action-approve .timeline-marker {
  color: #27ae60;
  background: #d5f4e6;
}

.timeline-item.action-reject .timeline-marker {
  color: #e74c3c;
  background: #fadbd8;
}

.timeline-content {
  margin-left: 120px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ecf0f1;
}

.log-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.action-badge {
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.action-badge.create {
  background: #d5f4e6;
  color: #27ae60;
}

.action-badge.update {
  background: #d6eaf8;
  color: #3498db;
}

.action-badge.delete {
  background: #fadbd8;
  color: #e74c3c;
}

.action-badge.approve {
  background: #d5f4e6;
  color: #27ae60;
}

.action-badge.reject {
  background: #fadbd8;
  color: #e74c3c;
}

.entity-name {
  font-weight: 600;
  color: #2c3e50;
}

.log-date {
  color: #7f8c8d;
  font-size: 13px;
}

.log-body {
  color: #2c3e50;
}

.log-user {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 14px;
}

.log-user i {
  font-size: 18px;
}

.log-changes {
  background: #f8f9fa;
  padding: 12px;
  border-radius: 6px;
  margin: 12px 0;
}

.log-changes strong {
  display: block;
  margin-bottom: 8px;
  color: #2c3e50;
}

.log-changes p {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  color: #555;
}

.log-comparison {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #ecf0f1;
}

.comparison-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-top: 10px;
}

.comparison-col h5 {
  margin: 0 0 10px;
  font-size: 13px;
  color: #2c3e50;
}

.comparison-col pre {
  background: #f8f9fa;
  padding: 10px;
  border-radius: 6px;
  font-size: 11px;
  overflow: auto;
  max-height: 200px;
  margin: 0;
}

.log-metadata {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #ecf0f1;
  font-size: 13px;
  color: #7f8c8d;
}

.metadata-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

@media (max-width: 768px) {
  .filter-bar {
    flex-direction: column;
  }

  .filter-input {
    min-width: 100%;
  }

  .btn-apply, .btn-reset {
    width: 100%;
    justify-content: center;
  }

  .comparison-row {
    grid-template-columns: 1fr;
  }

  .audit-timeline::before {
    left: 25px;
  }

  .timeline-marker {
    left: -10px;
    width: 60px;
    height: 60px;
    font-size: 20px;
  }

  .timeline-content {
    margin-left: 80px;
  }

  .log-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .log-date {
    margin-top: 8px;
  }
}
</style>
