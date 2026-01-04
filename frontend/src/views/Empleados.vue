<template>
  <div class="empleados">
    <div class="row mb-4">
      <div class="col">
        <h2><i class="bi bi-people"></i> Empleados</h2>
      </div>
      <div class="col-auto">
        <button @click="showModal = true" class="btn btn-primary">
          <i class="bi bi-plus-circle"></i> Nuevo
        </button>
      </div>
    </div>

    <div class="card">
      <div class="table-responsive">
        <table class="table table-hover mb-0">
          <thead class="table-light">
            <tr>
              <th>Nombre</th>
              <th>DNI</th>
              <th>Correo</th>
              <th>Departamento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="empleado in empleados" :key="empleado.id">
              <td>{{ empleado.nombre }} {{ empleado.apellido }}</td>
              <td>{{ empleado.dni }}</td>
              <td>{{ empleado.correo }}</td>
              <td>{{ empleado.departamento?.nombre || '-' }}</td>
              <td>
                <button @click="editEmpleado(empleado)" class="btn btn-sm btn-warning me-1">
                  <i class="bi bi-pencil"></i>
                </button>
                <button @click="deleteEmpleado(empleado.id)" class="btn btn-sm btn-danger">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal d-block" style="background: rgba(0,0,0,0.5);">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ editingId ? 'Editar' : 'Nuevo' }} Empleado</h5>
            <button type="button" class="btn-close" @click="showModal = false"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveEmpleado">
              <div class="mb-3">
                <label class="form-label">Nombre</label>
                <input v-model="formData.nombre" type="text" class="form-control" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Apellido</label>
                <input v-model="formData.apellido" type="text" class="form-control" required />
              </div>
              <div class="mb-3">
                <label class="form-label">DNI</label>
                <input v-model="formData.dni" type="text" class="form-control" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Correo</label>
                <input v-model="formData.correo" type="email" class="form-control" />
              </div>
              <button type="submit" class="btn btn-primary w-100">Guardar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../services/api'

export default {
  name: 'Empleados',
  data() {
    return {
      empleados: [],
      showModal: false,
      editingId: null,
      formData: {
        nombre: '',
        apellido: '',
        dni: '',
        correo: ''
      }
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
      } catch (err) {
        console.error('Error cargando empleados:', err)
        alert('Error al cargar empleados')
      }
    },
    editEmpleado(empleado) {
      this.editingId = empleado.id
      this.formData = { ...empleado }
      this.showModal = true
    },
    async saveEmpleado() {
      try {
        if (this.editingId) {
          await api.updateEmpleado(this.editingId, this.formData)
        } else {
          await api.createEmpleado(this.formData)
        }
        this.showModal = false
        this.resetForm()
        this.loadEmpleados()
      } catch (err) {
        alert('Error guardando empleado')
      }
    },
    async deleteEmpleado(id) {
      if (confirm('¿Eliminar empleado?')) {
        try {
          await api.deleteEmpleado(id)
          this.loadEmpleados()
        } catch (err) {
          alert('Error eliminando empleado')
        }
      }
    },
    resetForm() {
      this.formData = { nombre: '', apellido: '', dni: '', correo: '' }
      this.editingId = null
    }
  }
}
</script>
