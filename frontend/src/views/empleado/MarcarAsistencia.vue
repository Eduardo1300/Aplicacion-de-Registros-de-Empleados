<template>
  <EmpleadoLayout>
    <div class="asistencia-container">
      <h1>Marcar Asistencia</h1>

      <div class="estado-actual">
        <div class="estado-card" :class="estado.clase">
          <div class="estado-icon">
            <i :class="estado.icono"></i>
          </div>
          <div class="estado-info">
            <h3>{{ estado.titulo }}</h3>
            <p>{{ estado.hora }}</p>
          </div>
        </div>
      </div>

      <div class="botones-marcado">
        <button
          @click="marcarEntrada"
          :disabled="!puedeMarcarEntrada || loading"
          class="btn-marcado btn-entrada"
        >
          <div class="btn-icon">
            <i class="bi bi-box-arrow-in-right"></i>
          </div>
          <div class="btn-text">
            <span class="btn-title">Entrada</span>
            <span class="btn-desc">8:00 AM - 6:00 PM</span>
          </div>
          <div class="btn-check" v-if="asistenciaHoy?.hora_entrada">
            <i class="bi bi-check-circle-fill"></i>
          </div>
        </button>

        <button
          @click="marcarSalida"
          :disabled="!puedeMarcarSalida || loading"
          class="btn-marcado btn-salida"
        >
          <div class="btn-icon">
            <i class="bi bi-box-arrow-right"></i>
          </div>
          <div class="btn-text">
            <span class="btn-title">Salida</span>
            <span class="btn-desc">Hasta las 6:00 PM</span>
          </div>
          <div class="btn-check" v-if="asistenciaHoy?.hora_salida">
            <i class="bi bi-check-circle-fill"></i>
          </div>
        </button>
      </div>

      <div class="historial-reciente">
        <h3>Últimos 7 días</h3>
        <div class="historial-table">
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Entrada</th>
                <th>Salida</th>
                <th>Horas</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in historial" :key="item.id">
                <td>{{ formatDate(item.fecha) }}</td>
                <td>{{ item.hora_entrada || '-' }}</td>
                <td>{{ item.hora_salida || '-' }}</td>
                <td>{{ calcularHoras(item) }}</td>
                <td>
                  <span class="estado-badge" :class="getEstadoClass(item)">
                    {{ getEstado(item) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
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
  name: 'MarcarAsistencia',
  components: {
    EmpleadoLayout
  },
  data() {
    return {
      loading: false,
      asistenciaHoy: null,
      historial: []
    }
  },
  computed: {
    puedeMarcarEntrada() {
      return !this.asistenciaHoy?.hora_entrada
    },
    puedeMarcarSalida() {
      return this.asistenciaHoy?.hora_entrada && !this.asistenciaHoy?.hora_salida
    },
    estado() {
      if (!this.asistenciaHoy) {
        return {
          titulo: 'Sin registrar',
          hora: 'Marca tu entrada para comenzar el día',
          icono: 'bi bi-clock-history',
          clase: 'pending'
        }
      }
      if (this.asistenciaHoy.hora_entrada && !this.asistenciaHoy.hora_salida) {
        return {
          titulo: 'En progreso',
          hora: `Entrada registrada a las ${this.asistenciaHoy.hora_entrada}`,
          icono: 'bi bi-play-circle-fill',
          clase: 'in-progress'
        }
      }
      return {
        titulo: 'Día completado',
        hora: `${this.asistenciaHoy.hora_entrada} - ${this.asistenciaHoy.hora_salida}`,
        icono: 'bi bi-check-circle-fill',
        clase: 'completed'
      }
    }
  },
  async mounted() {
    await this.cargarDatos()
  },
  methods: {
    async cargarDatos() {
      this.loading = true
      try {
        const [hoy, historial] = await Promise.all([
          authEmpleado.getAsistenciaHoy().catch(() => ({ data: null })),
          authEmpleado.getHistorialAsistencia({ limit: 7 }).catch(() => ({ data: [] }))
        ])
        
        this.asistenciaHoy = hoy.data
        this.historial = historial.data || []
      } catch (err) {
        console.error('Error:', err)
      } finally {
        this.loading = false
      }
    },
    async marcarEntrada() {
      this.loading = true
      try {
        await authEmpleado.marcarEntrada()
        const notification = useNotification()
        notification.success('¡Entrada registrada correctamente!', 3000)
        await this.cargarDatos()
      } catch (err) {
        const notification = useNotification()
        notification.error(err.response?.data?.message || 'Error al marcar entrada')
      } finally {
        this.loading = false
      }
    },
    async marcarSalida() {
      this.loading = true
      try {
        await authEmpleado.marcarSalida()
        const notification = useNotification()
        notification.success('¡Salida registrada correctamente!', 3000)
        await this.cargarDatos()
      } catch (err) {
        const notification = useNotification()
        notification.error(err.response?.data?.message || 'Error al marcar salida')
      } finally {
        this.loading = false
      }
    },
    formatDate(fecha) {
      return new Date(fecha).toLocaleDateString('es-ES', {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
      })
    },
    calcularHoras(item) {
      if (!item.hora_entrada || !item.hora_salida) return '-'
      const entrada = new Date(`2000-01-01 ${item.hora_entrada}`)
      const salida = new Date(`2000-01-01 ${item.hora_salida}`)
      const diff = Math.floor((salida - entrada) / (1000 * 60))
      const horas = Math.floor(diff / 60)
      const minutos = diff % 60
      return `${horas}h ${minutos}m`
    },
    getEstado(item) {
      if (!item.hora_entrada) return 'Ausente'
      if (item.hora_entrada > '08:15:00') return 'Tardanza'
      if (!item.hora_salida) return 'Incompleta'
      return 'Completo'
    },
    getEstadoClass(item) {
      const estado = this.getEstado(item)
      return {
        'ausente': 'badge-danger',
        'tardanza': 'badge-warning',
        'incompleta': 'badge-info',
        'completo': 'badge-success'
      }[estado] || ''
    }
  }
}
</script>

<style scoped>
.asistencia-container {
  max-width: 900px;
  margin: 0 auto;
}

h1 {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 24px;
}

.estado-actual {
  margin-bottom: 28px;
}

.estado-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 28px;
  border-radius: 16px;
}

.estado-card.pending {
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
}

.estado-card.in-progress {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
}

.estado-card.completed {
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
}

.estado-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
}

.estado-card.pending .estado-icon {
  background: #e2e8f0;
  color: #64748b;
}

.estado-card.in-progress .estado-icon {
  background: #3b82f6;
  color: white;
}

.estado-card.completed .estado-icon {
  background: #22c55e;
  color: white;
}

.estado-info h3 {
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 6px;
}

.estado-info p {
  color: #64748b;
  font-size: 15px;
  margin: 0;
}

.botones-marcado {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 32px;
}

.btn-marcado {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  text-align: left;
}

.btn-marcado:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-entrada:hover:not(:disabled) {
  border-color: #667eea;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.15);
}

.btn-salida:hover:not(:disabled) {
  border-color: #22c55e;
  box-shadow: 0 4px 16px rgba(34, 197, 94, 0.15);
}

.btn-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
}

.btn-entrada .btn-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-salida .btn-icon {
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  color: white;
}

.btn-text {
  flex: 1;
}

.btn-title {
  display: block;
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
}

.btn-desc {
  font-size: 13px;
  color: #64748b;
}

.btn-check {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #22c55e;
}

.historial-reciente {
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #e2e8f0;
}

.historial-reciente h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 20px;
}

.historial-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px 16px;
  text-align: left;
  font-size: 14px;
}

th {
  background: #f8fafc;
  color: #64748b;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.5px;
}

td {
  border-bottom: 1px solid #f1f5f9;
  color: #334155;
}

tr:hover td {
  background: #f8fafc;
}

.estado-badge {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.badge-success {
  background: #dcfce7;
  color: #166534;
}

.badge-warning {
  background: #fef3c7;
  color: #92400e;
}

.badge-danger {
  background: #fee2e2;
  color: #991b1b;
}

.badge-info {
  background: #dbeafe;
  color: #1e40af;
}

@media (max-width: 640px) {
  .botones-marcado {
    grid-template-columns: 1fr;
  }
}
</style>
