<template>
  <EmpleadoLayout>
    <div class="mis-asistencias-container">
      <div class="page-header">
        <h1>Historial de Asistencias</h1>
      </div>

      <div class="filters">
        <div class="filter-group">
          <select v-model="filtros.mes" class="filter-input">
            <option value="">Todos los meses</option>
            <option v-for="(mes, i) in meses" :key="i" :value="i + 1">{{ mes }}</option>
          </select>
          <select v-model="filtros.año" class="filter-input">
            <option value="">Todos los años</option>
            <option v-for="año in años" :key="año" :value="año">{{ año }}</option>
          </select>
        </div>
        <button @click="aplicarFiltros" class="btn-filter">
          <i class="bi bi-funnel"></i> Filtrar
        </button>
      </div>

      <div class="resumen-cards">
        <div class="resumen-card">
          <i class="bi bi-check-circle"></i>
          <div>
            <span class="num">{{ resumen.dias_trabajados }}</span>
            <span class="label">Días trabajados</span>
          </div>
        </div>
        <div class="resumen-card warning">
          <i class="bi bi-clock"></i>
          <div>
            <span class="num">{{ resumen.tardanzas }}</span>
            <span class="label">Tardanzas</span>
          </div>
        </div>
        <div class="resumen-card danger">
          <i class="bi bi-x-circle"></i>
          <div>
            <span class="num">{{ resumen.faltas }}</span>
            <span class="label">Faltas</span>
          </div>
        </div>
        <div class="resumen-card info">
          <i class="bi bi-hourglass-split"></i>
          <div>
            <span class="num">{{ resumen.horas_extras }}</span>
            <span class="label">Horas extra</span>
          </div>
        </div>
      </div>

      <div class="tabla-container">
        <table class="asistencias-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Día</th>
              <th>Entrada</th>
              <th>Salida</th>
              <th>Horas</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="asistencia in registros" :key="asistencia.id">
              <td>{{ formatDate(asistencia.fecha) }}</td>
              <td>{{ getDayName(asistencia.fecha) }}</td>
              <td>{{ asistencia.hora_entrada || '-' }}</td>
              <td>{{ asistencia.hora_salida || '-' }}</td>
              <td>{{ calcularHoras(asistencia) }}</td>
              <td>
                <span class="estado-badge" :class="getEstadoClass(asistencia)">
                  {{ getEstado(asistencia) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="registros.length === 0" class="empty-state">
          <i class="bi bi-calendar-x"></i>
          <h3>No hay registros</h3>
          <p>No se encontraron registros para los filtros seleccionados</p>
        </div>
      </div>
    </div>
  </EmpleadoLayout>
</template>

<script>
import EmpleadoLayout from '../../components/empleado/EmpleadoLayout.vue'
import authEmpleado from '../../services/authEmpleado'

export default {
  name: 'MisAsistencias',
  components: {
    EmpleadoLayout
  },
  data() {
    return {
      loading: false,
      registros: [],
      resumen: {
        dias_trabajados: 0,
        tardanzas: 0,
        faltas: 0,
        horas_extras: 0
      },
      filtros: {
        mes: new Date().getMonth() + 1,
        año: new Date().getFullYear()
      },
      meses: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
              'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    }
  },
  computed: {
    años() {
      const actual = new Date().getFullYear()
      return [actual - 1, actual, actual + 1]
    }
  },
  async mounted() {
    await this.cargarAsistencias()
  },
  methods: {
    async cargarAsistencias() {
      this.loading = true
      try {
        const params = {}
        if (this.filtros.mes) params.mes = this.filtros.mes
        if (this.filtros.año) params.año = this.filtros.año

        const response = await authEmpleado.getHistorialAsistencia(params)
        this.registros = response.data || []
        this.calcularResumen()
      } catch (err) {
        console.error('Error:', err)
      } finally {
        this.loading = false
      }
    },
    aplicarFiltros() {
      this.cargarAsistencias()
    },
    calcularResumen() {
      this.resumen = {
        dias_trabajados: this.registros.filter(a => a.hora_entrada && a.hora_salida).length,
        tardanzas: this.registros.filter(a => a.hora_entrada && a.hora_entrada > '08:15:00').length,
        faltas: this.registros.filter(a => !a.hora_entrada).length,
        horas_extras: 0
      }
    },
    formatDate(fecha) {
      return new Date(fecha).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    },
    getDayName(fecha) {
      return new Date(fecha).toLocaleDateString('es-ES', { weekday: 'short' })
    },
    calcularHoras(asistencia) {
      if (!asistencia.hora_entrada || !asistencia.hora_salida) return '-'
      const entrada = new Date(`2000-01-01 ${asistencia.hora_entrada}`)
      const salida = new Date(`2000-01-01 ${asistencia.hora_salida}`)
      const diff = Math.floor((salida - entrada) / (1000 * 60))
      const horas = Math.floor(diff / 60)
      const minutos = diff % 60
      return `${horas}h ${minutos}m`
    },
    getEstado(asistencia) {
      if (!asistencia.hora_entrada) return 'Ausente'
      if (asistencia.hora_entrada > '08:15:00') return 'Tardanza'
      if (!asistencia.hora_salida) return 'Incompleta'
      return 'Completo'
    },
    getEstadoClass(asistencia) {
      const estado = this.getEstado(asistencia)
      return {
        'Ausente': 'badge-danger',
        'Tardanza': 'badge-warning',
        'Incompleta': 'badge-info',
        'Completo': 'badge-success'
      }[estado] || ''
    }
  }
}
</script>

<style scoped>
.mis-asistencias-container {
  max-width: 1000px;
  margin: 0 auto;
}

.page-header h1 {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 24px;
}

.filters {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  gap: 12px;
}

.filter-input {
  padding: 10px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 14px;
  background: white;
  cursor: pointer;
}

.filter-input:focus {
  outline: none;
  border-color: #667eea;
}

.btn-filter {
  padding: 10px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
}

.btn-filter:hover {
  background: #5a67d8;
}

.resumen-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.resumen-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  border: 1px solid #e2e8f0;
}

.resumen-card i {
  font-size: 28px;
  color: #22c55e;
}

.resumen-card.warning i {
  color: #f59e0b;
}

.resumen-card.danger i {
  color: #ef4444;
}

.resumen-card.info i {
  color: #3b82f6;
}

.resumen-card .num {
  display: block;
  font-size: 26px;
  font-weight: 700;
  color: #1e293b;
}

.resumen-card .label {
  font-size: 13px;
  color: #64748b;
}

.tabla-container {
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}

.asistencias-table {
  width: 100%;
  border-collapse: collapse;
}

.asistencias-table th {
  background: #f8fafc;
  padding: 14px 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.asistencias-table td {
  padding: 14px 16px;
  border-bottom: 1px solid #f1f5f9;
  color: #334155;
  font-size: 14px;
}

.asistencias-table tr:hover td {
  background: #f8fafc;
}

.estado-badge {
  padding: 4px 12px;
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

.empty-state {
  text-align: center;
  padding: 60px 40px;
}

.empty-state i {
  font-size: 48px;
  color: #cbd5e1;
  margin-bottom: 16px;
}

.empty-state h3 {
  font-size: 18px;
  color: #1e293b;
  margin: 0 0 8px;
}

.empty-state p {
  color: #64748b;
  margin: 0;
}

@media (max-width: 768px) {
  .resumen-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .resumen-cards {
    grid-template-columns: 1fr;
  }

  .filter-group {
    flex-direction: column;
    width: 100%;
  }
}
</style>
