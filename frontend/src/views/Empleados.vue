<template>
  <div class="empleados-container">
    <!-- Header -->
    <div class="empleados-header">
      <div class="header-left">
        <h1 class="page-title">
          <i class="bi bi-people-fill"></i> Gestión de Empleados
        </h1>
        <p class="page-subtitle">Administra la información de todos los empleados</p>
      </div>
      <button @click="showModal = true" class="btn-new">
        <i class="bi bi-plus-lg"></i> Nuevo Empleado
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
        <i class="bi bi-search"></i>
        <input 
          type="text" 
          placeholder="Buscar por nombre, DNI o correo..."
          v-model="searchQuery"
          class="search-input"
        />
      </div>
      <div class="result-count">
        {{ filteredEmpleados.length }} registros
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
      <div class="empty-icon">
        <i class="bi bi-inbox"></i>
      </div>
      <h3>No hay empleados registrados</h3>
      <p>Comienza agregando tu primer empleado al sistema</p>
      <button @click="showModal = true" class="btn-empty">
        <i class="bi bi-plus-lg"></i> Crear Empleado
      </button>
    </div>

    <!-- Table Card -->
    <div v-else class="table-card">
      <div class="table-wrapper">
        <table class="empleados-table">
          <thead>
            <tr>
              <th class="col-name">
                <i class="bi bi-person"></i> Nombre
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
              <th class="col-actions">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="empleado in paginatedEmpleados" :key="empleado.id" class="table-row">
              <td class="col-name">
                <div class="employee-cell">
                  <div class="employee-avatar">
                    {{ getInitials(empleado.nombre, empleado.apellido) }}
                  </div>
                  <div class="employee-info">
                    <span class="employee-name">{{ empleado.nombre }} {{ empleado.apellido }}</span>
                  </div>
                </div>
              </td>
              <td class="col-dni">
                <span class="badge-dni">{{ empleado.dni }}</span>
              </td>
              <td class="col-email">
                <span class="email-text">{{ empleado.correo }}</span>
              </td>
              <td class="col-dept">
                <span class="dept-badge">{{ empleado.departamento?.nombre || '-' }}</span>
              </td>
              <td class="col-actions">
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
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <h2>{{ editingId ? 'Editar Empleado' : 'Nuevo Empleado' }}</h2>
            <button type="button" class="btn-close" @click="closeModal">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>

          <form @submit.prevent="saveEmpleado" class="modal-form">
            <div class="form-group">
              <label>Nombre</label>
              <input 
                v-model="formData.nombre" 
                type="text" 
                placeholder="Ingrese nombre"
                required 
              />
            </div>

            <div class="form-group">
              <label>Apellido</label>
              <input 
                v-model="formData.apellido" 
                type="text" 
                placeholder="Ingrese apellido"
                required 
              />
            </div>

            <div class="form-group">
              <label>DNI</label>
              <input 
                v-model="formData.dni" 
                type="text" 
                placeholder="Ingrese DNI"
                required 
              />
            </div>

            <div class="form-group">
              <label>Correo Electrónico</label>
              <input 
                v-model="formData.correo" 
                type="email" 
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div class="modal-actions">
              <button type="button" @click="closeModal" class="btn-cancel">
                Cancelar
              </button>
              <button type="submit" class="btn-submit">
                <i class="bi bi-check-lg"></i> {{ editingId ? 'Actualizar' : 'Guardar' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>

    <!-- Delete Confirmation Modal -->
    <transition name="modal">
      <div v-if="showDeleteConfirm" class="modal-overlay">
        <div class="modal-confirm">
          <div class="confirm-icon">
            <i class="bi bi-exclamation-circle"></i>
          </div>
          <h3>Confirmar eliminación</h3>
          <p>¿Está seguro de que desea eliminar este empleado? Esta acción no se puede deshacer.</p>
          <div class="confirm-actions">
            <button @click="showDeleteConfirm = false" class="btn-cancel">
              Cancelar
            </button>
            <button @click="confirmDelete" class="btn-delete-confirm">
              <i class="bi bi-trash-fill"></i> Eliminar
            </button>
          </div>
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
      deleteId: null,
      editingId: null,
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 10,
      notification: useNotification(),
      formData: {
        nombre: '',
        apellido: '',
        dni: '',
        correo: ''
      }
    }
  },
  computed: {
    filteredEmpleados() {
      if (!this.searchQuery) return this.empleados
      
      const query = this.searchQuery.toLowerCase()
      return this.empleados.filter(emp => 
        `${emp.nombre} ${emp.apellido}`.toLowerCase().includes(query) ||
        emp.dni.toLowerCase().includes(query) ||
        emp.correo.toLowerCase().includes(query)
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
    editEmpleado(empleado) {
      this.editingId = empleado.id
      this.formData = { ...empleado }
      this.showModal = true
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
    deleteEmpleado(id) {
      this.deleteId = id
      this.showDeleteConfirm = true
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
    async confirmDelete() {
      try {
        await api.deleteEmpleado(this.deleteId)
        this.notification.success('Empleado eliminado correctamente')
        this.showDeleteConfirm = false
        this.deleteId = null
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
      this.formData = { nombre: '', apellido: '', dni: '', correo: '' }
      this.editingId = null
    },
    getInitials(nombre, apellido) {
      return `${(nombre || '').charAt(0)}${(apellido || '').charAt(0)}`.toUpperCase()
    },
    handleExported(event) {
      this.notification.success(`¡Exportado a ${event.format}!`, 2000)
    },
    handleAdvancedSearch(query) {
      // query = { text: 'search text', filters: [...] }
      if (!query.text && query.filters.length === 0) {
        this.searchQuery = ''
        return
      }

      // Implement advanced search filtering
      const filtered = this.empleados.filter(emp => {
        // Text search
        if (query.text) {
          const text = query.text.toLowerCase()
          const matches = `${emp.nombre} ${emp.apellido} ${emp.dni} ${emp.correo}`.toLowerCase().includes(text)
          if (!matches) return false
        }

        // Field-specific filters
        for (const filter of query.filters) {
          const fieldValue = String(emp[filter.field.toLowerCase()] || '').toLowerCase()
          const filterVal = filter.value.toLowerCase()

          switch (filter.operator) {
            case 'contains':
              if (!fieldValue.includes(filterVal)) return false
              break
            case 'equals':
              if (fieldValue !== filterVal) return false
              break
            case 'startsWith':
              if (!fieldValue.startsWith(filterVal)) return false
              break
            case 'endsWith':
              if (!fieldValue.endsWith(filterVal)) return false
              break
          }
        }
        return true
      })

      this.filteredEmpleados = filtered
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
  background: linear-gradient(135deg, #f5f7fa 0%, #f0f4f8 100%);
  min-height: 100vh;
  padding: 32px 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Header */
.empleados-header {
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

.btn-new {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-new:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
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
  min-width: 250px;
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 10px;
  padding: 0 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.search-input-wrapper i {
  color: #a0aec0;
  margin-right: 10px;
  font-size: 16px;
}

.search-input {
  flex: 1;
  border: none;
  padding: 12px 0;
  font-size: 14px;
  background: transparent;
  outline: none;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.search-input::placeholder {
  color: #cbd5e0;
}

.result-count {
  background: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
  color: #718096;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
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
  margin-bottom: 24px;
  font-size: 14px;
}

.btn-empty {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
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
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.table-wrapper {
  overflow-x: auto;
}

.empleados-table {
  width: 100%;
  border-collapse: collapse;
}

.empleados-table thead {
  background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
  border-bottom: 2px solid #e2e8f0;
}

.empleados-table th {
  padding: 14px 16px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.empleados-table th i {
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

.empleados-table td {
  padding: 14px 16px;
  font-size: 14px;
  color: #2d3748;
}

.col-name { width: 25%; }
.col-dni { width: 15%; }
.col-email { width: 25%; }
.col-dept { width: 20%; }
.col-actions { width: 15%; text-align: center; }

.employee-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.employee-avatar {
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

.employee-info {
  flex: 1;
}

.employee-name {
  display: block;
  font-weight: 600;
  color: #2d3748;
}

.badge-dni {
  background: #f0f4ff;
  color: #667eea;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  font-family: 'Monaco', 'Courier New', monospace;
}

.email-text {
  color: #718096;
}

.dept-badge {
  background: #e8f6f0;
  color: #10b981;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
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

.modal-content {
  background: white;
  border-radius: 14px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 500px;
  animation: slideUp 0.3s ease-out;
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

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e2e8f0;
}

.modal-header h2 {
  font-size: 20px;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
}

.btn-close {
  background: none;
  border: none;
  font-size: 20px;
  color: #a0aec0;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.btn-close:hover {
  background: #f0f4f8;
  color: #2d3748;
}

.modal-form {
  padding: 24px;
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-group input {
  width: 100%;
  padding: 10px 14px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  transition: all 0.2s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group input::placeholder {
  color: #cbd5e0;
}

.modal-actions {
  display: flex;
  gap: 12px;
  margin-top: 28px;
}

.btn-cancel,
.btn-submit {
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 14px;
}

.btn-cancel {
  background: #f0f4f8;
  color: #4a5568;
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

/* Confirmation Modal */
.confirm-icon {
  font-size: 56px;
  color: #f59e0b;
  margin-bottom: 16px;
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

.btn-delete-confirm {
  flex: 1;
  padding: 10px 16px;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
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

.btn-delete-confirm:hover {
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
@media (max-width: 768px) {
  .empleados-container {
    padding: 20px 16px;
  }

  .empleados-header {
    flex-direction: column;
    align-items: stretch;
  }

  .btn-new {
    width: 100%;
    justify-content: center;
  }

  .page-title {
    font-size: 26px;
  }

  .search-bar {
    flex-direction: column;
  }

  .search-input-wrapper {
    min-width: 100%;
  }

  .result-count {
    width: 100%;
    text-align: center;
  }

  .col-name { width: 40%; }
  .col-dni { width: 20%; }
  .col-email { display: none; }
  .col-dept { display: none; }
  .col-actions { width: 20%; }

  .table-row:not(:hover) .btn-action {
    padding: 6px;
  }

  .modal-content {
    max-width: 100%;
  }

  .empty-state {
    padding: 40px 20px;
  }
}

@media (max-width: 480px) {
  .empleados-container {
    padding: 16px 12px;
  }

  .page-title {
    font-size: 22px;
  }

  .empleados-table {
    font-size: 12px;
  }

  .empleados-table th,
  .empleados-table td {
    padding: 10px 8px;
  }

  .col-name { width: 50%; }
  .col-dni { width: 30%; }
  .col-actions { width: 20%; }

  .employee-avatar {
    width: 32px;
    height: 32px;
    font-size: 11px;
  }

  .employee-cell {
    gap: 8px;
  }

  .modal-confirm {
    padding: 30px 20px;
  }
}
</style>
