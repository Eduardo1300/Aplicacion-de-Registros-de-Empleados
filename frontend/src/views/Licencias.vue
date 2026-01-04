<template>
  <div class="licencias">
    <h2><i class="bi bi-calendar"></i> Solicitudes de Licencia</h2>
    <p class="text-muted">Gestionar solicitudes de licencia y vacaciones</p>
    <div class="card">
      <div class="table-responsive">
        <table class="table table-hover mb-0">
          <thead class="table-light">
            <tr>
              <th>Empleado</th>
              <th>Tipo</th>
              <th>Desde</th>
              <th>Hasta</th>
              <th>Días</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="licencia in licencias" :key="licencia.id">
              <td>{{ licencia.empleado?.nombre }}</td>
              <td>{{ licencia.tipoLicencia?.nombre }}</td>
              <td>{{ formatDate(licencia.fechaInicio) }}</td>
              <td>{{ formatDate(licencia.fechaFin) }}</td>
              <td>{{ licencia.diasSolicitados }}</td>
              <td>
                <span :class="`badge bg-${getEstadoBadge(licencia.estado)}`">
                  {{ licencia.estado }}
                </span>
              </td>
              <td>
                <button v-if="licencia.estado === 'PENDIENTE'" 
                        @click="aprobar(licencia.id)" 
                        class="btn btn-sm btn-success me-1">
                  <i class="bi bi-check"></i>
                </button>
                <button v-if="licencia.estado === 'PENDIENTE'" 
                        @click="rechazar(licencia.id)" 
                        class="btn btn-sm btn-danger">
                  <i class="bi bi-x"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../services/api'

export default {
  name: 'Licencias',
  data() {
    return {
      licencias: []
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
    async aprobar(id) {
      try {
        await api.aprobarLicencia(id)
        this.loadLicencias()
        alert('Licencia aprobada')
      } catch (err) {
        alert('Error aprobando licencia')
      }
    },
    async rechazar(id) {
      try {
        await api.rechazarLicencia(id)
        this.loadLicencias()
        alert('Licencia rechazada')
      } catch (err) {
        alert('Error rechazando licencia')
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('es-ES')
    },
    getEstadoBadge(estado) {
      const map = {
        'PENDIENTE': 'warning',
        'APROBADA': 'success',
        'RECHAZADA': 'danger'
      }
      return map[estado] || 'secondary'
    }
  }
}
</script>
