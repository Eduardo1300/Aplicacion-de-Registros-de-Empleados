<template>
  <div class="empleados-container">
    <!-- Header -->
    <div class="empleados-header">
      <div class="header-left">
        <div class="header-icon">
          <i class="bi bi-people-fill"></i>
        </div>
        <div class="header-text">
          <h1 class="page-title">Gestión de Empleados</h1>
          <p class="page-subtitle">Administra la información de todos los empleados</p>
        </div>
      </div>
      <button @click="openModal()" class="btn-new">
        <span class="btn-icon">
          <i class="bi bi-plus-lg"></i>
        </span>
        <span class="btn-text">Nuevo Empleado</span>
        <div class="btn-shine"></div>
      </button>
    </div>

    <!-- Advanced Search Component -->
    <AdvancedSearch
      :fields="['Nombre', 'DNI', 'Correo', 'Departamento', 'Estado']"
      @search="handleAdvancedSearch"
    />

    <!-- Search & Filter Bar -->
    <div class="search-bar">
      <div class="search-input-wrapper">
        <div class="search-icon">
          <i class="bi bi-search"></i>
        </div>
        <input 
          type="text" 
          placeholder="Buscar por nombre, DNI o correo..."
          v-model="searchQuery"
          class="search-input"
        />
        <button v-if="searchQuery" @click="searchQuery = ''" class="clear-btn">
          <i class="bi bi-x"></i>
        </button>
      </div>
      <div class="result-info">
        <div class="result-count">
          <span class="count-number">{{ filteredEmpleados.length }}</span>
          <span class="count-label">registros</span>
        </div>
        <div class="result-badge" v-if="searchQuery">
          <i class="bi bi-funnel"></i>
          Filtrado
        </div>
      </div>
      <ExportButtons
        :data="filteredEmpleados"
        filename="empleados"
        title="Listado de Empleados"
        @exported="handleExported"
      />
    </div>

    <!-- Empty State -->
    <div v-if="empleados.length === 0" class="empty-state">
      <div class="empty-illustration">
        <svg viewBox="0 0 200 200" class="empty-svg">
          <circle cx="100" cy="80" r="40" fill="#f1f5f9"/>
          <rect x="60" y="130" width="80" height="50" rx="10" fill="#f1f5f9"/>
          <circle cx="100" cy="80" r="30" fill="#e2e8f0"/>
          <path d="M85 75 L95 85 L115 65" stroke="#94a3b8" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h3>No hay empleados registrados</h3>
      <p>Comienza agregando tu primer empleado al sistema</p>
      <button @click="openModal()" class="btn-empty">
        <i class="bi bi-plus-lg"></i> Crear Empleado
      </button>
    </div>

    <!-- Table Card -->
    <div v-else class="table-card">
      <div class="table-header">
        <div class="table-title">
          <i class="bi bi-table"></i>
          <span>Lista de Empleados</span>
        </div>
        <div class="table-actions">
          <span class="action-hint">Los empleados inactivos se muestran en gris</span>
        </div>
      </div>
      
      <div class="table-wrapper">
        <table class="empleados-table">
          <thead>
            <tr>
              <th class="col-num">#</th>
              <th class="col-name">
                <i class="bi bi-person"></i> Nombre Completo
              </th>
              <th class="col-dni">
                <i class="bi bi-id-card"></i> DNI
              </th>
              <th class="col-email">
                <i class="bi bi-envelope"></i> Correo
              </th>
              <th class="col-dept">
                <i class="bi bi-building"></i> Departamento
              </th>
              <th class="col-estado">
                <i class="bi bi-toggle-on"></i> Estado
              </th>
              <th class="col-actions">
                <i class="bi bi-three-dots"></i> Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(empleado, index) in paginatedEmpleados" :key="empleado.id" 
                class="table-row"
                :class="{ 'row-inactive': empleado.estado === 'Inactivo' }">
              <td class="col-num">
                <span class="row-number">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</span>
              </td>
              <td class="col-name">
                <div class="employee-cell">
                  <div class="employee-avatar" :class="getAvatarClass(empleado.estado)">
                    {{ getInitials(empleado.nombre, empleado.apellido) }}
                  </div>
                  <div class="employee-info">
                    <span class="employee-name">{{ empleado.nombre }} {{ empleado.apellido }}</span>
                    <span class="employee-meta">{{ empleado.cargo?.nombre || 'Sin cargo' }}</span>
                  </div>
                </div>
              </td>
              <td class="col-dni">
                <span class="badge-dni">{{ empleado.dni }}</span>
              </td>
              <td class="col-email">
                <div class="email-cell">
                  <i class="bi bi-envelope-at"></i>
                  <span class="email-text">{{ empleado.correo || '-' }}</span>
                </div>
              </td>
              <td class="col-dept">
                <span class="dept-badge" :class="getDeptClass(empleado.departamento?.nombre)">
                  <i class="bi bi-building"></i>
                  {{ empleado.departamento?.nombre || '-' }}
                </span>
              </td>
              <td class="col-estado">
                <span class="estado-chip" :class="getEstadoClass(empleado.estado)">
                  <span class="chip-dot"></span>
                  {{ empleado.estado }}
                </span>
              </td>
              <td class="col-actions">
                <div class="action-buttons">
                  <button 
                    @click="editEmpleado(empleado)" 
                    class="btn-action btn-edit"
                    title="Editar"
                  >
                    <i class="bi bi-pencil-fill"></i>
                  </button>
                  <button 
                    @click="confirmDeleteDialog(empleado)" 
                    class="btn-action btn-delete"
                    title="Eliminar"
                  >
                    <i class="bi bi-trash-fill"></i>
                  </button>
                  <button 
                    @click="viewEmpleado(empleado)"
                    class="btn-action btn-view"
                    title="Ver detalles"
                  >
                    <i class="bi bi-eye-fill"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Component -->
      <Pagination
        v-model="currentPage"
        :total="filteredEmpleados.length"
        :items-per-page="itemsPerPage"
        @update:items-per-page="itemsPerPage = $event"
      />
    </div>

    <!-- Modal -->
    <transition name="modal">
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title-wrapper">
              <div class="modal-icon" :class="editingId ? 'edit' : 'add'">
                <i :class="editingId ? 'bi bi-pencil' : 'bi bi-person-plus'"></i>
              </div>
              <h2>{{ editingId ? 'Editar Empleado' : 'Nuevo Empleado' }}</h2>
            </div>
            <button type="button" class="btn-close" @click="closeModal">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>

          <form @submit.prevent="saveEmpleado" class="modal-form">
            <div class="form-row">
              <div class="form-group">
                <label>
                  <i class="bi bi-person"></i> Nombre
                </label>
                <input 
                  v-model="formData.nombre" 
                  type="text" 
                  placeholder="Ingrese nombre"
                  required 
                />
              </div>

              <div class="form-group">
                <label>
                  <i class="bi bi-person"></i> Apellido
                </label>
                <input 
                  v-model="formData.apellido" 
                  type="text" 
                  placeholder="Ingrese apellido"
                  required 
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>
                  <i class="bi bi-id-card"></i> DNI
                </label>
                <input 
                  v-model="formData.dni" 
                  type="text" 
                  placeholder="Ingrese DNI"
                  required 
                />
              </div>

              <div class="form-group">
                <label>
                  <i class="bi bi-envelope"></i> Correo Electrónico
                </label>
                <input 
                  v-model="formData.correo" 
                  type="email" 
                  placeholder="correo@ejemplo.com"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>
                  <i class="bi bi-telephone"></i> Teléfono
                </label>
                <input 
                  v-model="formData.telefono" 
                  type="text" 
                  placeholder="Ingrese número de teléfono"
                />
              </div>

              <div class="form-group">
                <label>
                  <i class="bi bi-calendar"></i> Fecha de Ingreso
                </label>
                <input 
                  v-model="formData.fechaIngreso" 
                  type="date"
                  required
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>
                  <i class="bi bi-building"></i> Departamento
                </label>
                <div class="select-wrapper">
                  <select v-model.number="formData.departamentoId">
                    <option :value="null">Seleccionar departamento</option>
                    <option v-for="dept in departamentos" :key="dept.id" :value="dept.id">
                      {{ dept.nombre }}
                    </option>
                  </select>
                  <i class="bi bi-chevron-down"></i>
                </div>
              </div>

              <div class="form-group">
                <label>
                  <i class="bi bi-briefcase"></i> Cargo
                </label>
                <div class="select-wrapper">
                  <select v-model.number="formData.cargoId">
                    <option :value="null">Seleccionar cargo</option>
                    <option v-for="cargo in cargos" :key="cargo.id" :value="cargo.id">
                      {{ cargo.nombre }}
                    </option>
                  </select>
                  <i class="bi bi-chevron-down"></i>
                </div>
              </div>
            </div>

            <div class="form-group full-width">
              <label>
                <i class="bi bi-toggle-on"></i> Estado
              </label>
              <div class="radio-group">
                <label class="radio-item" :class="{ active: formData.estado === 'Activo' }">
                  <input type="radio" v-model="formData.estado" value="Activo" />
                  <span class="radio-icon">
                    <i class="bi bi-check-circle-fill"></i>
                  </span>
                  <span class="radio-label">Activo</span>
                </label>
                <label class="radio-item" :class="{ active: formData.estado === 'Inactivo' }">
                  <input type="radio" v-model="formData.estado" value="Inactivo" />
                  <span class="radio-icon">
                    <i class="bi bi-x-circle-fill"></i>
                  </span>
                  <span class="radio-label">Inactivo</span>
                </label>
                <label class="radio-item" :class="{ active: formData.estado === 'Licencia' }">
                  <input type="radio" v-model="formData.estado" value="Licencia" />
                  <span class="radio-icon">
                    <i class="bi bi-pause-circle-fill"></i>
                  </span>
                  <span class="radio-label">Licencia</span>
                </label>
              </div>
            </div>

            <div class="modal-actions">
              <button type="button" @click="closeModal" class="btn-cancel">
                <i class="bi bi-x-lg"></i> Cancelar
              </button>
              <button type="submit" class="btn-submit">
                <i class="bi bi-check-lg"></i> {{ editingId ? 'Actualizar' : 'Guardar' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>

    <!-- Confirm Dialog Component -->
    <ConfirmDialog
      ref="confirmDialog"
      title="Eliminar Empleado"
      message="¿Está seguro de que desea eliminar este empleado?"
      type="danger"
      action-text="Eliminar"
      :require-confirmation-text="true"
      confirmation-text="ELIMINAR"
      @confirmed="confirmDeleteWithDialog"
    />

    <!-- View Employee Details Modal -->
    <transition name="modal">
      <div v-if="showViewModal" class="modal-overlay" @click.self="closeViewModal">
        <div class="modal-content view-modal">
          <div class="modal-header view-header">
            <div class="view-avatar" :class="getAvatarClass(viewEmployee?.estado)">
              <i class="bi bi-person-fill"></i>
            </div>
            <div class="view-title">
              <h2>{{ viewEmployee?.nombre }} {{ viewEmployee?.apellido }}</h2>
              <span class="view-subtitle">{{ viewEmployee?.cargo?.nombre || 'Sin cargo asignado' }}</span>
            </div>
            <button type="button" class="btn-close" @click="closeViewModal">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>

          <div class="modal-body view-body">
            <div class="info-section">
              <h4 class="section-title">
                <i class="bi bi-card-text"></i> Información Personal
              </h4>
              <div class="info-grid">
                <div class="info-item">
                  <span class="info-label">DNI</span>
                  <span class="info-value">{{ viewEmployee?.dni || '-' }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Correo</span>
                  <span class="info-value">{{ viewEmployee?.correo || '-' }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Teléfono</span>
                  <span class="info-value">{{ viewEmployee?.telefono || '-' }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Fecha de Ingreso</span>
                  <span class="info-value">{{ formatDate(viewEmployee?.fechaIngreso) }}</span>
                </div>
              </div>
            </div>

            <div class="info-section">
              <h4 class="section-title">
                <i class="bi bi-building"></i> Información Laboral
              </h4>
              <div class="info-grid">
                <div class="info-item">
                  <span class="info-label">Departamento</span>
                  <span class="info-value">{{ viewEmployee?.departamento?.nombre || '-' }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Cargo</span>
                  <span class="info-value">{{ viewEmployee?.cargo?.nombre || '-' }}</span>
                </div>
                <div class="info-item full-width">
                  <span class="info-label">Estado</span>
                  <span class="estado-chip" :class="getEstadoClass(viewEmployee?.estado)">
                    <span class="chip-dot"></span>
                    {{ viewEmployee?.estado || '-' }}
                  </span>
                </div>
              </div>
            </div>

            <div v-if="viewEmployee?.observaciones" class="info-section">
              <h4 class="section-title">
                <i class="bi bi-sticky"></i> Observaciones
              </h4>
              <p class="observaciones-text">{{ viewEmployee.observaciones }}</p>
            </div>
          </div>

          <div class="modal-footer view-footer">
            <button @click="editFromView" class="btn-edit-from-view">
              <i class="bi bi-pencil"></i> Editar Empleado
            </button>
            <button @click="closeViewModal" class="btn-close-view">
              <i class="bi bi-x-lg"></i> Cerrar
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
import Pagination from '../components/Pagination.vue'
import ExportButtons from '../components/ExportButtons.vue'
import AdvancedSearch from '../components/AdvancedSearch.vue'
import ConfirmDialog from '../components/ConfirmDialog.vue'

export default {
  name: 'Empleados',
  components: {
    Pagination,
    ExportButtons,
    AdvancedSearch,
    ConfirmDialog
  },
  data() {
    return {
      empleados: [],
      showModal: false,
      showDeleteConfirm: false,
      showViewModal: false,
      deleteId: null,
      editingId: null,
      viewEmployee: null,
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 10,
      notification: useNotification(),
      formData: {
        nombre: '',
        apellido: '',
        dni: '',
        correo: '',
        telefono: '',
        fechaIngreso: '',
        departamentoId: null,
        cargoId: null,
        estado: 'Activo'
      },
      departamentos: [],
      cargos: []
    }
  },
  computed: {
    filteredEmpleados() {
      if (!this.searchQuery) return this.empleados
      
      const query = this.searchQuery.toLowerCase()
      return this.empleados.filter(emp => 
        `${emp.nombre} ${emp.apellido}`.toLowerCase().includes(query) ||
        emp.dni.toLowerCase().includes(query) ||
        emp.correo?.toLowerCase().includes(query)
      )
    },
    paginatedEmpleados() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredEmpleados.slice(start, end)
    }
  },
  mounted() {
    this.loadEmpleados()
    this.loadDepartamentos()
    this.loadCargos()
  },
  methods: {
    async loadEmpleados() {
      try {
        const response = await api.getEmpleados()
        this.empleados = response.data || []
        this.notification.info('Empleados cargados', 2000)
      } catch (err) {
        console.error('Error cargando empleados:', err)
        this.notification.error('Error al cargar empleados')
      }
    },
    async loadDepartamentos() {
      try {
        const response = await api.getDepartamentos()
        this.departamentos = response.data || []
      } catch (err) {
        console.error('Error cargando departamentos:', err)
      }
    },
    async loadCargos() {
      try {
        const response = await api.getCargos()
        this.cargos = response.data || []
      } catch (err) {
        console.error('Error cargando cargos:', err)
      }
    },
    openModal() {
      this.resetForm()
      this.showModal = true
    },
    editEmpleado(empleado) {
      this.editingId = empleado.id
      this.formData = { ...empleado }
      this.showModal = true
    },
    viewEmpleado(empleado) {
      this.viewEmployee = empleado
      this.showViewModal = true
    },
    closeViewModal() {
      this.showViewModal = false
      this.viewEmployee = null
    },
    editFromView() {
      if (this.viewEmployee) {
        this.editEmpleado(this.viewEmployee)
        this.closeViewModal()
      }
    },
    formatDate(date) {
      if (!date) return '-'
      return new Date(date).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    },
    async saveEmpleado() {
      try {
        const isCreating = !this.editingId
        if (this.editingId) {
          await api.updateEmpleado(this.editingId, this.formData)
          this.notification.success('Empleado actualizado correctamente')
        } else {
          await api.createEmpleado(this.formData)
          this.notification.success('Empleado creado correctamente')
        }
        this.closeModal()
        this.loadEmpleados()
      } catch (err) {
        this.notification.error('Error guardando empleado')
        console.error(err)
      }
    },
    confirmDeleteDialog(empleado) {
      this.deleteId = empleado.id
      this.deletingEmpleado = empleado
      this.$refs.confirmDialog.show()
    },
    async confirmDeleteWithDialog() {
      try {
        await api.deleteEmpleado(this.deleteId)
        this.notification.success('Empleado eliminado correctamente')
        this.deleteId = null
        this.deletingEmpleado = null
        this.loadEmpleados()
      } catch (err) {
        this.notification.error('Error al eliminar empleado')
        console.error(err)
      }
    },
    closeModal() {
      this.showModal = false
      this.resetForm()
    },
    resetForm() {
      this.formData = { 
        nombre: '',
        apellido: '',
        dni: '',
        correo: '',
        telefono: '',
        fechaIngreso: '',
        departamentoId: null,
        cargoId: null,
        estado: 'Activo'
      }
      this.editingId = null
    },
    getInitials(nombre, apellido) {
      return `${(nombre || '').charAt(0)}${(apellido || '').charAt(0)}`.toUpperCase()
    },
    getAvatarClass(estado) {
      return estado === 'Activo' ? 'avatar-active' : 'avatar-inactive'
    },
    getDeptClass(dept) {
      const classes = {
        'Recursos Humanos': 'dept-rh',
        'Tecnología': 'dept-tech',
        'Ventas': 'dept-sales',
        'Contabilidad': 'dept-accounting',
        'Marketing': 'dept-marketing'
      }
      return classes[dept] || 'dept-default'
    },
    getEstadoClass(estado) {
      return {
        'Activo': 'estado-activo',
        'Inactivo': 'estado-inactivo',
        'Licencia': 'estado-licencia'
      }[estado] || ''
    },
    handleExported(event) {
      this.notification.success(`¡Exportado a ${event.format}!`, 2000)
    },
    handleAdvancedSearch(query) {
      if (!query.text && query.filters.length === 0) {
        this.searchQuery = ''
        return
      }

      this.searchQuery = query.text || ''
      
      let filtered = this.empleados
      
      if (query.text) {
        const text = query.text.toLowerCase()
        filtered = filtered.filter(emp => 
          `${emp.nombre} ${emp.apellido} ${emp.dni} ${emp.correo || ''}`.toLowerCase().includes(text)
        )
      }

      if (query.filters.length > 0) {
        filtered = filtered.filter(emp => {
          for (const filter of query.filters) {
            let fieldValue = ''
            const fieldName = filter.field?.toLowerCase()
            
            if (fieldName === 'nombre') fieldValue = emp.nombre || ''
            else if (fieldName === 'apellido') fieldValue = emp.apellido || ''
            else if (fieldName === 'dni') fieldValue = emp.dni || ''
            else if (fieldName === 'correo') fieldValue = emp.correo || ''
            else if (fieldName === 'departamento') fieldValue = emp.departamento?.nombre || ''
            else if (fieldName === 'estado') fieldValue = emp.estado || ''
            else fieldValue = String(emp[fieldName] || '')
            
            const filterVal = filter.value.toLowerCase()
            const fieldValueLower = fieldValue.toLowerCase()

            switch (filter.operator) {
              case 'contains':
                if (!fieldValueLower.includes(filterVal)) return false
                break
              case 'equals':
                if (fieldValueLower !== filterVal) return false
                break
              case 'startsWith':
                if (!fieldValueLower.startsWith(filterVal)) return false
                break
              case 'endsWith':
                if (!fieldValueLower.endsWith(filterVal)) return false
                break
            }
          }
          return true
        })
      }

      this.currentPage = 1
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

.empleados-container {
  background: #f8fafc;
  min-height: 100vh;
  padding: 32px 24px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Header */
.empleados-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 26px;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
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

.btn-new {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 14px 24px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;
}

.btn-new:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.btn-new .btn-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-new .btn-text {
  position: relative;
  z-index: 1;
}

.btn-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.btn-new:hover .btn-shine {
  left: 100%;
}

/* Search Bar */
.search-bar {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.search-input-wrapper {
  flex: 1;
  min-width: 280px;
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
  transition: all 0.2s ease;
}

.search-input-wrapper:focus-within {
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.search-icon {
  width: 44px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  font-size: 16px;
}

.search-input {
  flex: 1;
  border: none;
  padding: 14px 0;
  font-size: 14px;
  background: transparent;
  outline: none;
  font-family: inherit;
}

.search-input::placeholder {
  color: #cbd5e1;
}

.clear-btn {
  width: 36px;
  height: 36px;
  margin-right: 8px;
  background: #f1f5f9;
  border: none;
  border-radius: 8px;
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.clear-btn:hover {
  background: #e2e8f0;
  color: #1e293b;
}

.result-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.result-count {
  background: white;
  padding: 10px 16px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #e2e8f0;
}

.count-number {
  font-size: 20px;
  font-weight: 700;
  color: #667eea;
}

.count-label {
  font-size: 13px;
  color: #64748b;
}

.result-badge {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
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
  margin-bottom: 28px;
  font-size: 15px;
}

.btn-empty {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-empty:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
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
  color: #667eea;
}

.action-hint {
  font-size: 13px;
  color: #94a3b8;
}

.table-wrapper {
  overflow-x: auto;
}

.empleados-table {
  width: 100%;
  border-collapse: collapse;
}

.empleados-table thead {
  background: linear-gradient(135deg, #667eea08 0%, #764ba208 100%);
  border-bottom: 2px solid #e2e8f0;
}

.empleados-table th {
  padding: 16px 20px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.empleados-table th i {
  margin-right: 8px;
  color: #667eea;
}

.table-row {
  border-bottom: 1px solid #f1f5f9;
  transition: all 0.2s ease;
}

.table-row:hover {
  background: #f8fafc;
}

.table-row.row-inactive {
  background: #f8fafc;
  opacity: 0.7;
}

.table-row.row-inactive .employee-name {
  color: #64748b;
}

.empleados-table td {
  padding: 16px 20px;
  font-size: 14px;
  color: #334155;
  vertical-align: middle;
}

.col-num { width: 60px; text-align: center; }
.col-name { width: 28%; }
.col-dni { width: 12%; }
.col-email { width: 20%; }
.col-dept { width: 15%; }
.col-estado { width: 12%; }
.col-actions { width: 100px; text-align: center; }

.row-number {
  background: #f1f5f9;
  color: #64748b;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
}

.employee-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.employee-avatar {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.employee-avatar.avatar-active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.employee-avatar.avatar-inactive {
  background: #e2e8f0;
  color: #64748b;
}

.employee-info {
  flex: 1;
  min-width: 0;
}

.employee-name {
  display: block;
  font-weight: 600;
  color: #1e293b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.employee-meta {
  display: block;
  font-size: 12px;
  color: #94a3b8;
  margin-top: 2px;
}

.badge-dni {
  background: #f0f4ff;
  color: #667eea;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  font-family: 'SF Mono', 'Monaco', monospace;
}

.email-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.email-cell i {
  color: #94a3b8;
  font-size: 14px;
}

.email-text {
  color: #64748b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dept-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
}

.dept-badge i {
  font-size: 12px;
}

.dept-rh { background: #fef3c7; color: #92400e; }
.dept-tech { background: #dbeafe; color: #1e40af; }
.dept-sales { background: #dcfce7; color: #166534; }
.dept-accounting { background: #f3e8ff; color: #7c3aed; }
.dept-marketing { background: #fce7f3; color: #be185d; }
.dept-default { background: #f1f5f9; color: #475569; }

.estado-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.estado-chip.estado-activo {
  background: #dcfce7;
  color: #166534;
}

.estado-chip.estado-inactivo {
  background: #fee2e2;
  color: #991b1b;
}

.estado-chip.estado-licencia {
  background: #fef3c7;
  color: #92400e;
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

.btn-edit {
  color: #f59e0b;
  background: #fef3c7;
}

.btn-edit:hover {
  background: #fcd34d;
  transform: scale(1.1);
}

.btn-delete {
  color: #ef4444;
  background: #fee2e2;
}

.btn-delete:hover {
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

.modal-content {
  background: white;
  border-radius: 24px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
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

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #e2e8f0;
}

.modal-title-wrapper {
  display: flex;
  align-items: center;
  gap: 14px;
}

.modal-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
}

.modal-icon.add {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.modal-icon.edit {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
}

.modal-header h2 {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.btn-close {
  background: #f1f5f9;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  transition: all 0.2s ease;
}

.btn-close:hover {
  background: #e2e8f0;
  color: #1e293b;
}

.modal-form {
  padding: 24px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 4px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.form-group label i {
  color: #667eea;
  font-size: 14px;
}

.form-group input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  transition: all 0.2s ease;
  font-family: inherit;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.form-group input::placeholder {
  color: #cbd5e1;
}

.select-wrapper {
  position: relative;
}

.select-wrapper select {
  width: 100%;
  padding: 12px 16px;
  padding-right: 40px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  appearance: none;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

.select-wrapper select:focus {
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

.radio-group {
  display: flex;
  gap: 12px;
}

.radio-item {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.radio-item input {
  display: none;
}

.radio-item .radio-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  background: #f1f5f9;
  color: #94a3b8;
  transition: all 0.2s ease;
}

.radio-item.active {
  border-color: #667eea;
  background: #f0f4ff;
}

.radio-item.active .radio-icon {
  background: #667eea;
  color: white;
}

.radio-item .radio-label {
  font-size: 14px;
  font-weight: 500;
  color: #475569;
}

.modal-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e2e8f0;
}

.btn-cancel,
.btn-submit {
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

.btn-submit {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-submit:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
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
  .col-name { width: 30%; }
  .col-email { width: 22%; }
  .col-dni { width: 13%; }
  .col-dept { width: 15%; }
  .col-estado { width: 12%; }
  .col-actions { width: 90px; }
}

@media (max-width: 768px) {
  .empleados-container {
    padding: 24px 16px;
  }

  .empleados-header {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }

  .header-left {
    flex-direction: column;
    text-align: center;
  }

  .btn-new {
    width: 100%;
    justify-content: center;
  }

  .page-title {
    font-size: 24px;
  }

  .search-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .search-input-wrapper {
    min-width: 100%;
  }

  .result-info {
    justify-content: center;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .radio-group {
    flex-direction: column;
  }

  .empleados-table th,
  .empleados-table td {
    padding: 12px 14px;
  }

  .col-email { display: none; }
  .col-dept { display: none; }

  .modal-content {
    max-height: 100vh;
    border-radius: 20px 20px 0 0;
    margin-top: auto;
  }
}

@media (max-width: 480px) {
  .empleados-container {
    padding: 20px 12px;
  }

  .page-title {
    font-size: 22px;
  }

  .empleados-table {
    font-size: 13px;
  }

  .col-num { display: none; }

  .employee-avatar {
    width: 36px;
    height: 36px;
    font-size: 12px;
  }

  .employee-cell {
    gap: 10px;
  }

  .action-buttons {
    gap: 4px;
  }

  .btn-action {
    width: 32px;
    height: 32px;
    font-size: 12px;
  }

  .empty-state {
    padding: 40px 24px;
  }
}

/* View Modal Styles */
.view-modal {
  max-width: 520px;
}

.view-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 28px;
  background: linear-gradient(135deg, #667eea08 0%, #764ba208 100%);
  border-bottom: 1px solid #e2e8f0;
}

.view-avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  flex-shrink: 0;
}

.view-avatar.avatar-active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.view-avatar.avatar-inactive {
  background: #e2e8f0;
  color: #64748b;
}

.view-title {
  flex: 1;
}

.view-title h2 {
  font-size: 22px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 6px;
}

.view-subtitle {
  font-size: 14px;
  color: #64748b;
}

.view-body {
  padding: 28px;
  max-height: 400px;
  overflow-y: auto;
}

.info-section {
  margin-bottom: 24px;
}

.info-section:last-child {
  margin-bottom: 0;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #475569;
  margin: 0 0 16px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.section-title i {
  color: #667eea;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-item.full-width {
  grid-column: 1 / -1;
}

.info-label {
  font-size: 12px;
  font-weight: 500;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.info-value {
  font-size: 14px;
  color: #1e293b;
  font-weight: 500;
}

.observaciones-text {
  background: #f8fafc;
  padding: 14px;
  border-radius: 10px;
  font-size: 14px;
  color: #475569;
  line-height: 1.6;
  margin: 0;
}

.view-footer {
  display: flex;
  gap: 12px;
  padding: 20px 28px;
  border-top: 1px solid #e2e8f0;
  background: #fafbfc;
  border-radius: 0 0 24px 24px;
}

.btn-edit-from-view,
.btn-close-view {
  flex: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
}

.btn-edit-from-view {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.btn-edit-from-view:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

.btn-close-view {
  background: #f1f5f9;
  color: #475569;
}

.btn-close-view:hover {
  background: #e2e8f0;
}

@media (max-width: 480px) {
  .empleados-container {
    padding: 20px 12px;
  }

  .page-title {
    font-size: 22px;
  }

  .empleados-table {
    font-size: 13px;
  }

  .col-num { display: none; }

  .employee-avatar {
    width: 36px;
    height: 36px;
    font-size: 12px;
  }

  .employee-cell {
    gap: 10px;
  }

  .action-buttons {
    gap: 4px;
  }

  .btn-action {
    width: 32px;
    height: 32px;
    font-size: 12px;
  }

  .empty-state {
    padding: 40px 24px;
  }

  .view-modal {
    max-width: 100%;
    margin: 0;
    border-radius: 20px 20px 0 0;
    max-height: 90vh;
  }

  .view-header {
    flex-direction: column;
    text-align: center;
    padding: 24px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .view-footer {
    flex-direction: column;
  }
}
</style>
