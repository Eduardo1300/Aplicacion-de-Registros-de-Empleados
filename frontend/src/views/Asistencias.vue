<template>
  <div class="asistencias">
    <h2><i class="bi bi-clock"></i> Asistencias</h2>
    <p class="text-muted">Registro de asistencias del personal</p>
    <div class="card">
      <div class="table-responsive">
        <table class="table table-hover mb-0">
          <thead class="table-light">
            <tr>
              <th>Empleado</th>
              <th>Fecha</th>
              <th>Entrada</th>
              <th>Salida</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="asistencia in asistencias" :key="asistencia.id">
              <td>{{ asistencia.empleado?.nombre }}</td>
              <td>{{ formatDate(asistencia.fechaAsistencia) }}</td>
              <td>{{ asistencia.horaEntrada || '-' }}</td>
              <td>{{ asistencia.horaSalida || '-' }}</td>
              <td>
                <span :class="`badge bg-${getEstadoBadge(asistencia.estado)}`">
                  {{ asistencia.estado }}
                </span>
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
  name: 'Asistencias',
  data() {
    return {
      asistencias: []
    }
  },
  mounted() {
    this.loadAsistencias()
  },
  methods: {
    async loadAsistencias() {
      try {
        const response = await api.getAsistencias()
        this.asistencias = response.data || []
      } catch (err) {
        console.error('Error:', err)
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('es-ES')
    },
    getEstadoBadge(estado) {
      const map = {
        'PRESENTE': 'success',
        'TARDANZA': 'warning',
        'AUSENTE': 'danger'
      }
      return map[estado] || 'secondary'
    }
  }
}
</script>
