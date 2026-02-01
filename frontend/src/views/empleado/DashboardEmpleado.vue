<template>
  <EmpleadoLayout>
    <div class="dashboard-container">
      <div class="dashboard-header">
        <div class="saludo">
          <h1>{{ saludo }}, {{ empleado?.nombre }}!</h1>
          <p>{{ fechaActual }}</p>
        </div>
      </div>

      <div class="dashboard-grid">
        <div class="widget-asistencia">
          <div class="asistencia-card" :class="estadoAsistencia.clase">
            <div class="asistencia-icon">
              <i :class="estadoAsistencia.icono"></i>
            </div>
            <div class="asistencia-info">
              <h3>{{ estadoAsistencia.titulo }}</h3>
              <p>{{ estadoAsistencia.hora }}</p>
            </div>
          </div>

          <div class="botones-asistencia">
            <button
              @click="marcarEntrada"
              :disabled="!puedeMarcarEntrada || loading"
              class="btn-entrada"
            >
              <i class="bi bi-box-arrow-in-right"></i>
              Marcar Entrada
            </button>
            <button
              @click="marcarSalida"
              :disabled="!puedeMarcarSalida || loading"
              class="btn-salida"
            >
              <i class="bi bi-box-arrow-right"></i>
              Marcar Salida
            </button>
          </div>
        </div>

        <div class="widget-vacaciones">
          <div class="vacaciones-header">
            <i class="bi bi-plane"></i>
            <h3>Vacaciones</h3>
          </div>
          <div class="vacaciones-info">
            <div class="dias-display">
              <span class="dias-num">{{ diasDisponibles }}</span>
              <span class="dias-label">días disponibles</span>
            </div>
            <div class="dias-bar">
              <div class="dias-used" :style="{ width: porcentajeUsado + '%' }"></div>
            </div>
            <p class="dias-detail">De 15 días anuales</p>
          </div>
        </div>

        <div class="widget-resumen">
          <h3>Resumen del Mes</h3>
          <div class="resumen-grid">
            <div class="resumen-item">
              <i class="bi bi-check-circle"></i>
              <div>
                <span class="resumen-num">{{ resumen.dias_trabajados }}</span>
                <span class="resumen-label">Días trabajados</span>
              </div>
            </div>
            <div class="resumen-item warning">
              <i class="bi bi-clock"></i>
              <div>
                <span class="resumen-num">{{ resumen.tardanzas }}</span>
                <span class="resumen-label">Tardanzas</span>
              </div>
            </div>
            <div class="resumen-item danger">
              <i class="bi bi-x-circle"></i>
              <div>
                <span class="resumen-num">{{ resumen.faltas }}</span>
                <span class="resumen-label">Faltas</span>
              </div>
            </div>
            <div class="resumen-item info">
              <i class="bi bi-calendar-check"></i>
              <div>
                <span class="resumen-num">{{ resumen.licencias }}</span>
                <span class="resumen-label">Licencias</span>
              </div>
            </div>
          </div>
        </div>

        <div class="widget-proximas">
          <h3>Próximas Licencias</h3>
          <div v-if="proximasLicencias.length === 0" class="empty-licencias">
            <i class="bi bi-calendar-x"></i>
            <p>No tienes licencias próximas</p>
          </div>
          <div v-else class="licencias-list">
            <div v-for="licencia in proximasLicencias" :key="licencia.id" class="licencia-item">
              <div class="licencia-fecha">
                <span class="mes">{{ getMonthName(licencia.fecha_inicio) }}</span>
                <span class="dia">{{ getDay(licencia.fecha_inicio) }}</span>
              </div>
              <div class="licencia-info">
                <span class="licencia-tipo">{{ formatTipo(licencia.tipo) }}</span>
                <span class="licencia-dias">{{ licencia.dias_solicitados }} días</span>
              </div>
              <span class="licencia-estado" :class="licencia.estado.toLowerCase()">
                {{ licencia.estado }}
              </span>
            </div>
          </div>
        </div>

        <div class="widget-notificaciones">
          <h3>Notificaciones</h3>
          <div v-if="notificaciones.length === 0" class="empty-notif">
            <i class="bi bi-bell-slash"></i>
            <p>Sin notificaciones</p>
          </div>
          <div v-else class="notificaciones-list">
            <div v-for="notif in notificaciones" :key="notif.id" class="notif-item">
              <i :class="notif.icono"></i>
              <div class="notif-content">
                <p>{{ notif.mensaje }}</p>
                <span class="notif-time">{{ notif.hora }}</span>
              </div>
            </div>
          </div>
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
  name: 'DashboardEmpleado',
  components: {
    EmpleadoLayout
  },
  data() {
    return {
      loading: false,
      asistenciaHoy: null,
      diasDisponibles: 15,
      diasUsados: 3,
      resumen: {
        dias_trabajados: 20,
        tardanzas: 1,
        faltas: 0,
        licencias: 2
      },
      proximasLicencias: [],
      notificaciones: []
    }
  },
  computed: {
    empleado() {
      return authEmpleado.getEmpleado()
    },
    saludo() {
      const hora = new Date().getHours()
      if (hora < 12) return 'Buenos días'
      if (hora < 18) return 'Buenas tardes'
      return 'Buenas noches'
    },
    fechaActual() {
      return new Date().toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    },
    puedeMarcarEntrada() {
      return !this.asistenciaHoy?.hora_entrada
    },
    puedeMarcarSalida() {
      return this.asistenciaHoy?.hora_entrada && !this.asistenciaHoy?.hora_salida
    },
    porcentajeUsado() {
      return (this.diasUsados / 15) * 100
    },
    estadoAsistencia() {
      if (!this.asistenciaHoy) {
        return {
          titulo: 'Sin registrar',
          hora: 'Marca tu entrada para comenzar',
          icono: 'bi bi-clock-history',
          clase: 'pending'
        }
      }
      if (this.asistenciaHoy.hora_entrada && !this.asistenciaHoy.hora_salida) {
        return {
          titulo: 'En progreso',
          hora: `Entrada: ${this.asistenciaHoy.hora_entrada}`,
          icono: 'bi bi-play-circle',
          clase: 'in-progress'
        }
      }
      return {
        titulo: 'Completado',
        hora: `${this.asistenciaHoy.hora_entrada} - ${this.asistenciaHoy.hora_salida}`,
        icono: 'bi bi-check-circle',
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
        const [asistencia, saldo] = await Promise.all([
          authEmpleado.getAsistenciaHoy().catch(() => ({ data: null })),
          authEmpleado.getSaldoVacaciones().catch(() => ({ data: { disponibles: 15, usados: 3 } }))
        ])
        
        this.asistenciaHoy = asistencia.data
        this.diasDisponibles = saldo.data?.disponibles || 15
        this.diasUsados = saldo.data?.usados || 3
      } catch (err) {
        console.error('Error cargando datos:', err)
      } finally {
        this.loading = false
      }
    },
    async marcarEntrada() {
      this.loading = true
      try {
        await authEmpleado.marcarEntrada()
        const notification = useNotification()
        notification.success('¡Entrada registrada!', 3000)
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
        notification.success('¡Salida registrada!', 3000)
        await this.cargarDatos()
      } catch (err) {
        const notification = useNotification()
        notification.error(err.response?.data?.message || 'Error al marcar salida')
      } finally {
        this.loading = false
      }
    },
    getMonthName(fecha) {
      return new Date(fecha).toLocaleDateString('es-ES', { month: 'short' })
    },
    getDay(fecha) {
      return new Date(fecha).getDate()
    },
    formatTipo(tipo) {
      const tipos = {
        'VACACION': 'Vacaciones',
        'MEDICA': 'Licencia Médica',
        'PERSONAL': 'Asunto Personal'
      }
      return tipos[tipo] || tipo
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  margin-bottom: 28px;
}

.saludo h1 {
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 6px;
}

.saludo p {
  color: #64748b;
  font-size: 15px;
  text-transform: capitalize;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.widget-asistencia {
  grid-column: span 2;
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid #e2e8f0;
}

.asistencia-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
}

.asistencia-card.pending {
  background: #f1f5f9;
}

.asistencia-card.in-progress {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
}

.asistencia-card.completed {
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
}

.asistencia-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
}

.asistencia-card.pending .asistencia-icon {
  background: #e2e8f0;
  color: #64748b;
}

.asistencia-card.in-progress .asistencia-icon {
  background: #3b82f6;
  color: white;
}

.asistencia-card.completed .asistencia-icon {
  background: #22c55e;
  color: white;
}

.asistencia-info h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 4px;
}

.asistencia-info p {
  color: #64748b;
  font-size: 14px;
  margin: 0;
}

.botones-asistencia {
  display: flex;
  gap: 12px;
}

.btn-entrada,
.btn-salida {
  flex: 1;
  padding: 14px 20px;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.btn-entrada {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-entrada:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.btn-salida {
  background: #f1f5f9;
  color: #475569;
  border: 2px solid #e2e8f0;
}

.btn-salida:hover:not(:disabled) {
  background: #e2e8f0;
}

.btn-entrada:disabled,
.btn-salida:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.widget-vacaciones {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid #e2e8f0;
}

.vacaciones-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.vacaciones-header i {
  font-size: 22px;
  color: #f59e0b;
}

.vacaciones-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.dias-display {
  text-align: center;
  margin-bottom: 16px;
}

.dias-num {
  display: block;
  font-size: 42px;
  font-weight: 700;
  color: #1e293b;
  line-height: 1;
}

.dias-label {
  font-size: 14px;
  color: #64748b;
}

.dias-bar {
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.dias-used {
  height: 100%;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.dias-detail {
  text-align: center;
  font-size: 12px;
  color: #94a3b8;
  margin: 0;
}

.widget-resumen {
  grid-column: span 2;
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid #e2e8f0;
}

.widget-resumen h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 20px;
}

.resumen-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.resumen-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 12px;
}

.resumen-item i {
  font-size: 24px;
  color: #22c55e;
}

.resumen-item.warning i {
  color: #f59e0b;
}

.resumen-item.danger i {
  color: #ef4444;
}

.resumen-item.info i {
  color: #3b82f6;
}

.resumen-num {
  display: block;
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
}

.resumen-label {
  font-size: 12px;
  color: #64748b;
}

.widget-proximas {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid #e2e8f0;
}

.widget-proximas h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 20px;
}

.empty-licencias {
  text-align: center;
  padding: 32px;
  color: #94a3b8;
}

.empty-licencias i {
  font-size: 40px;
  margin-bottom: 12px;
}

.licencias-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.licencia-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px;
  background: #f8fafc;
  border-radius: 10px;
}

.licencia-fecha {
  width: 48px;
  text-align: center;
  background: white;
  border-radius: 8px;
  padding: 8px;
  border: 1px solid #e2e8f0;
}

.licencia-fecha .mes {
  display: block;
  font-size: 11px;
  color: #64748b;
  text-transform: uppercase;
}

.licencia-fecha .dia {
  display: block;
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
}

.licencia-info {
  flex: 1;
}

.licencia-tipo {
  display: block;
  font-weight: 600;
  color: #1e293b;
  font-size: 14px;
}

.licencia-dias {
  font-size: 12px;
  color: #64748b;
}

.licencia-estado {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
}

.licencia-estado.aprobada {
  background: #dcfce7;
  color: #166534;
}

.licencia-estado.pendiente {
  background: #fef3c7;
  color: #92400e;
}

.widget-notificaciones {
  grid-column: span 3;
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid #e2e8f0;
}

.widget-notificaciones h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 20px;
}

.empty-notif {
  text-align: center;
  padding: 32px;
  color: #94a3b8;
}

.notificaciones-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.notif-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px;
  background: #f8fafc;
  border-radius: 10px;
}

.notif-item i {
  font-size: 20px;
  color: #3b82f6;
  margin-top: 2px;
}

.notif-content p {
  margin: 0 0 4px;
  color: #1e293b;
  font-size: 14px;
}

.notif-time {
  font-size: 12px;
  color: #94a3b8;
}

@media (max-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .widget-asistencia,
  .widget-resumen {
    grid-column: span 1;
  }

  .resumen-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .botones-asistencia {
    flex-direction: column;
  }

  .resumen-grid {
    grid-template-columns: 1fr;
  }
}
</style>
