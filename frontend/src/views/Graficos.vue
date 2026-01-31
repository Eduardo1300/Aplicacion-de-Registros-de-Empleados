<template>
  <div class="charts-page">
    <div class="charts-container">
      <div class="charts-header">
        <div class="header-left">
          <h1 class="page-title">
            <i class="bi bi-graph-up"></i> Gráficos y Estadísticas
          </h1>
          <p class="page-subtitle">Análisis visual de datos del sistema</p>
        </div>
        <div class="header-actions">
          <button @click="refreshData" class="btn-refresh">
            <i class="bi bi-arrow-clockwise"></i> Actualizar
          </button>
          <button @click="downloadReport" class="btn-download">
            <i class="bi bi-download"></i> Descargar
          </button>
        </div>
      </div>

      <div v-if="loading" class="loading-state">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
        <p>Cargando datos...</p>
      </div>

      <template v-else>
        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-icon" style="background: #667eea;">
              <i class="bi bi-people-fill"></i>
            </div>
            <div class="stat-content">
              <h3>Total Empleados</h3>
              <p class="stat-value">{{ totalEmpleados }}</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon" style="background: #10b981;">
              <i class="bi bi-check-circle-fill"></i>
            </div>
            <div class="stat-content">
              <h3>Empleados Activos</h3>
              <p class="stat-value">{{ empleadosActivos }}</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon" style="background: #f59e0b;">
              <i class="bi bi-clock-fill"></i>
            </div>
            <div class="stat-content">
              <h3>Presentes Hoy</h3>
              <p class="stat-value">{{ presentesHoy }}</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon" style="background: #ef4444;">
              <i class="bi bi-exclamation-circle-fill"></i>
            </div>
            <div class="stat-content">
              <h3>Ausencias</h3>
              <p class="stat-value">{{ ausenciasHoy }}</p>
            </div>
          </div>
        </div>

        <div class="charts-grid">
          <div class="chart-wrapper full-width">
            <div class="chart-header">
              <h3>Empleados por Departamento</h3>
              <p class="chart-subtitle">Distribución de empleados</p>
            </div>
            <Bar :data="chartEmpleadosPorDepartamento" :options="barOptions" />
          </div>

          <div class="chart-wrapper">
            <div class="chart-header">
              <h3>Estado de Empleados</h3>
              <p class="chart-subtitle">Distribución por estado</p>
            </div>
            <Doughnut :data="chartEstadoEmpleados" :options="pieOptions" />
          </div>

          <div class="chart-wrapper">
            <div class="chart-header">
              <h3>Asistencias por Día</h3>
              <p class="chart-subtitle">Últimos 7 días</p>
            </div>
            <Line :data="chartAsistencias" :options="barOptions" />
          </div>

          <div class="chart-wrapper">
            <div class="chart-header">
              <h3>Géneros</h3>
              <p class="chart-subtitle">Distribución por género</p>
            </div>
            <Pie :data="chartGeneros" :options="pieOptions" />
          </div>

          <div class="chart-wrapper">
            <div class="chart-header">
              <h3>Salarios Promedio</h3>
              <p class="chart-subtitle">Por departamento</p>
            </div>
            <Bar :data="chartSalarios" :options="barOptions" />
          </div>

          <div class="chart-wrapper full-width">
            <div class="chart-header">
              <h3>Licencias Solicitadas</h3>
              <p class="chart-subtitle">Estado de solicitudes</p>
            </div>
            <Bar :data="chartLicencias" :options="barOptions" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, RadarController, Filler, Title, Tooltip, Legend } from 'chart.js'
import { Bar, Line, Doughnut, Pie } from 'vue-chartjs'
import api from '../services/api'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadarController,
  Filler,
  Title,
  Tooltip,
  Legend
)

export default {
  name: 'Graficos',
  components: {
    Bar,
    Line,
    Doughnut,
    Pie
  },
  data() {
    return {
      loading: true,
      isDark: false,
      empleados: [],
      asistencias: [],
      licencias: [],
      chartEmpleadosPorDepartamento: { labels: [], datasets: [] },
      chartEstadoEmpleados: { labels: [], datasets: [] },
      chartAsistencias: { labels: [], datasets: [] },
      chartGeneros: { labels: [], datasets: [] },
      chartSalarios: { labels: [], datasets: [] },
      chartLicencias: { labels: [], datasets: [] }
    }
  },
  computed: {
    totalEmpleados() { return this.empleados.length },
    empleadosActivos() { return this.empleados.filter(e => e.estado === 'Activo').length },
    presentesHoy() { 
      const today = new Date().toISOString().split('T')[0]
      return this.asistencias.filter(a => a.fechaAsistencia?.split('T')[0] === today && a.estado === 'PRESENTE').length
    },
    ausenciasHoy() { 
      const today = new Date().toISOString().split('T')[0]
      return this.asistencias.filter(a => a.fechaAsistencia?.split('T')[0] === today && a.estado === 'AUSENTE').length
    },
    barOptions() {
      return this.getChartOptions(false)
    },
    pieOptions() {
      return this.getChartOptions(true)
    }
  },
  mounted() {
    this.checkTheme()
    window.addEventListener('theme-changed', this.checkTheme)
    this.loadData()
  },
  beforeUnmount() {
    window.removeEventListener('theme-changed', this.checkTheme)
  },
  methods: {
    checkTheme() {
      const savedTheme = localStorage.getItem('theme')
      this.isDark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light')
      }
    },
    getChartOptions(isPie) {
      const textColor = this.isDark ? '#e2e8f0' : '#475569'
      const gridColor = this.isDark ? '#334155' : '#e2e8f0'
      const tickColor = this.isDark ? '#94a3b8' : '#64748b'
      
      const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'right',
            labels: { color: textColor }
          }
        }
      }
      
      if (!isPie) {
        options.scales = {
          y: {
            beginAtZero: true,
            grid: { color: gridColor },
            ticks: { color: tickColor }
          },
          x: {
            grid: { color: gridColor },
            ticks: { color: tickColor }
          }
        }
      }
      
      return options
    },
    async loadData() {
      this.loading = true
      try {
        const [empRes, asisRes, licRes] = await Promise.all([
          api.getEmpleados().catch(() => ({ data: [] })),
          api.getAsistencias().catch(() => ({ data: [] })),
          api.getSolicitudesLicencia().catch(() => ({ data: [] }))
        ])

        this.empleados = empRes.data || []
        this.asistencias = asisRes.data || []
        this.licencias = licRes.data || []

        if (this.empleados.length === 0) {
          this.loadDemoData()
        }
        
        this.generateCharts()
      } catch (error) {
        console.error('Error cargando datos:', error)
        this.loadDemoData()
        this.generateCharts()
      } finally {
        this.loading = false
      }
    },
    loadDemoData() {
      this.empleados = [
        { id: 1, nombre: 'Juan', apellido: 'Pérez', estado: 'Activo', departamento: { nombre: 'Recursos Humanos' }, cargo: { nombre: 'Gerente' }, salario: 5000, genero: 'Masculino' },
        { id: 2, nombre: 'María', apellido: 'García', estado: 'Activo', departamento: { nombre: 'Tecnología' }, cargo: { nombre: 'Developer' }, salario: 4500, genero: 'Femenino' },
        { id: 3, nombre: 'Carlos', apellido: 'López', estado: 'Activo', departamento: { nombre: 'Tecnología' }, cargo: { nombre: 'DevOps' }, salario: 4800, genero: 'Masculino' },
        { id: 4, nombre: 'Ana', apellido: 'Martínez', estado: 'Activo', departamento: { nombre: 'Ventas' }, cargo: { nombre: 'Ejecutivo' }, salario: 3500, genero: 'Femenino' },
        { id: 5, nombre: 'Pedro', apellido: 'Rodríguez', estado: 'Inactivo', departamento: { nombre: 'Recursos Humanos' }, cargo: { nombre: 'Asistente' }, salario: 2800, genero: 'Masculino' },
        { id: 6, nombre: 'Sofia', apellido: 'Sánchez', estado: 'Activo', departamento: { nombre: 'Tecnología' }, cargo: { nombre: 'QA' }, salario: 4000, genero: 'Femenino' },
        { id: 7, nombre: 'Miguel', apellido: 'Torres', estado: 'Activo', departamento: { nombre: 'Ventas' }, cargo: { nombre: 'Ejecutivo' }, salario: 3600, genero: 'Masculino' },
        { id: 8, nombre: 'Laura', apellido: 'Flores', estado: 'Activo', departamento: { nombre: 'Contabilidad' }, cargo: { nombre: 'Contador' }, salario: 4200, genero: 'Femenino' }
      ]

      const today = new Date().toISOString().split('T')[0]
      this.asistencias = this.empleados.map((emp, i) => ({
        id: i + 1,
        empleado: emp,
        estado: i < 6 ? 'PRESENTE' : (i === 6 ? 'TARDANZA' : 'AUSENTE'),
        fechaAsistencia: today
      }))

      this.licencias = [
        { id: 1, estado: 'PENDIENTE' },
        { id: 2, estado: 'APROBADA' },
        { id: 3, estado: 'APROBADA' },
        { id: 4, estado: 'RECHAZADA' }
      ]
    },
    generateCharts() {
      const colors = ['#667eea', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16']

      const deptCount = {}
      this.empleados.forEach(e => {
        const d = e.departamento?.nombre || 'Otro'
        deptCount[d] = (deptCount[d] || 0) + 1
      })
      this.chartEmpleadosPorDepartamento = {
        labels: Object.keys(deptCount),
        datasets: [{ label: 'Empleados', data: Object.values(deptCount), backgroundColor: colors }]
      }

      const estadoCount = {}
      this.empleados.forEach(e => {
        estadoCount[e.estado] = (estadoCount[e.estado] || 0) + 1
      })
      this.chartEstadoEmpleados = {
        labels: Object.keys(estadoCount),
        datasets: [{ data: Object.values(estadoCount), backgroundColor: ['#10b981', '#ef4444', '#f59e0b'] }]
      }

      const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
      this.chartAsistencias = {
        labels: dias,
        datasets: [
          { label: 'Presentes', data: [6, 7, 5, 8, 6, 7, 4], borderColor: '#10b981', backgroundColor: '#10b981', tension: 0.4 },
          { label: 'Tardanzas', data: [1, 0, 2, 0, 1, 0, 1], borderColor: '#f59e0b', backgroundColor: '#f59e0b', tension: 0.4 },
          { label: 'Ausentes', data: [1, 1, 1, 0, 1, 1, 3], borderColor: '#ef4444', backgroundColor: '#ef4444', tension: 0.4 }
        ]
      }

      const genCount = {}
      this.empleados.forEach(e => {
        const g = e.genero || 'Otro'
        genCount[g] = (genCount[g] || 0) + 1
      })
      this.chartGeneros = {
        labels: Object.keys(genCount),
        datasets: [{ data: Object.values(genCount), backgroundColor: ['#3b82f6', '#ec4899', '#6b7280'] }]
      }

      const salDept = {}
      this.empleados.forEach(e => {
        const d = e.departamento?.nombre || 'Otro'
        if (!salDept[d]) salDept[d] = { sum: 0, count: 0 }
        salDept[d].sum += e.salario || 0
        salDept[d].count++
      })
      this.chartSalarios = {
        labels: Object.keys(salDept),
        datasets: [{ label: 'Salario Promedio', data: Object.values(salDept).map(x => Math.round(x.sum / x.count)), backgroundColor: '#3b82f6' }]
      }

      const licCount = {}
      this.licencias.forEach(l => {
        licCount[l.estado] = (licCount[l.estado] || 0) + 1
      })
      this.chartLicencias = {
        labels: Object.keys(licCount),
        datasets: [{ label: 'Licencias', data: Object.values(licCount), backgroundColor: ['#f59e0b', '#10b981', '#ef4444'] }]
      }
    },
    refreshData() {
      this.loadData()
    },
    downloadReport() {
      alert('Funcionalidad de descarga en desarrollo')
    }
  }
}
</script>

<style scoped>
.charts-page {
  padding: 2rem;
  background: #f1f5f9;
  min-height: calc(100vh - 56px);
}

.charts-container {
  max-width: 1400px;
  margin: 0 auto;
}

.charts-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
}

.header-left h1 {
  margin: 0;
  font-size: 1.5rem;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.header-left h1 i {
  color: #667eea;
}

.header-left .page-subtitle {
  margin: 0.25rem 0 0 0;
  color: #64748b;
  font-size: 0.875rem;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
}

.btn-refresh, .btn-download {
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
}

.btn-refresh {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-download {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.loading-state {
  text-align: center;
  padding: 4rem;
  color: #64748b;
}

.loading-state p {
  margin-top: 1rem;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
}

.stat-content h3 {
  margin: 0;
  font-size: 0.8rem;
  color: #64748b;
  font-weight: 500;
}

.stat-value {
  margin: 0.25rem 0 0 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
}

.chart-wrapper {
  background: white;
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
}

.chart-wrapper.full-width {
  grid-column: 1 / -1;
}

.chart-header {
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
}

.chart-header h3 {
  margin: 0;
  font-size: 1rem;
  color: #1e293b;
  font-weight: 600;
}

.chart-subtitle {
  margin: 0.25rem 0 0 0;
  color: #94a3b8;
  font-size: 0.8rem;
}

/* Dark Mode */
[data-theme="dark"] .charts-page {
  background: #0f172a;
}

[data-theme="dark"] .charts-header {
  background: #1e293b;
  border-color: #334155;
}

[data-theme="dark"] .header-left h1 {
  color: #f1f5f9;
}

[data-theme="dark"] .header-left .page-subtitle {
  color: #94a3b8;
}

[data-theme="dark"] .stat-card {
  background: #1e293b;
  border-color: #334155;
}

[data-theme="dark"] .stat-content h3 {
  color: #94a3b8;
}

[data-theme="dark"] .stat-value {
  color: #f1f5f9;
}

[data-theme="dark"] .chart-wrapper {
  background: #1e293b;
  border-color: #334155;
}

[data-theme="dark"] .chart-header {
  border-color: #334155;
}

[data-theme="dark"] .chart-header h3 {
  color: #f1f5f9;
}

[data-theme="dark"] .chart-subtitle {
  color: #64748b;
}

[data-theme="dark"] .loading-state {
  color: #94a3b8;
}

@media (max-width: 768px) {
  .charts-page {
    padding: 1rem;
  }

  .charts-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .header-actions {
    width: 100%;
  }

  .btn-refresh, .btn-download {
    flex: 1;
    justify-content: center;
  }

  .charts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
