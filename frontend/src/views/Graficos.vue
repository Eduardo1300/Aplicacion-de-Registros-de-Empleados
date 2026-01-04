<template>
  <div class="charts-page">
    <!-- Header -->
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
          <i class="bi bi-download"></i> Descargar Reporte
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-icon" style="background: #007bff;">
          <i class="bi bi-people-fill"></i>
        </div>
        <div class="stat-content">
          <h3>Total Empleados</h3>
          <p class="stat-value">{{ totalEmpleados }}</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background: #28a745;">
          <i class="bi bi-check-circle-fill"></i>
        </div>
        <div class="stat-content">
          <h3>Empleados Activos</h3>
          <p class="stat-value">{{ empleadosActivos }}</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background: #ffc107;">
          <i class="bi bi-clock-fill"></i>
        </div>
        <div class="stat-content">
          <h3>Presentes Hoy</h3>
          <p class="stat-value">{{ presentesHoy }}</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background: #dc3545;">
          <i class="bi bi-exclamation-circle-fill"></i>
        </div>
        <div class="stat-content">
          <h3>Ausencias</h3>
          <p class="stat-value">{{ ausenciasHoy }}</p>
        </div>
      </div>
    </div>

    <!-- Charts Grid -->
    <div class="charts-container">
      <!-- Row 1 -->
      <div class="chart-wrapper full-width">
        <div class="chart-header">
          <h3>Empleados por Departamento</h3>
          <p class="chart-subtitle">Distribución de empleados en cada departamento</p>
        </div>
        <Bar :data="chartEmpleadosPorDepartamento" :options="chartOptions" />
      </div>

      <!-- Row 2 -->
      <div class="chart-wrapper">
        <div class="chart-header">
          <h3>Estado de Empleados</h3>
          <p class="chart-subtitle">Distribución de estados</p>
        </div>
        <Doughnut :data="chartEstadoEmpleados" :options="chartOptionsPie" />
      </div>

      <div class="chart-wrapper">
        <div class="chart-header">
          <h3>Asistencias por Día</h3>
          <p class="chart-subtitle">Últimos 7 días</p>
        </div>
        <Line :data="chartAsistenciasUltimos7Dias" :options="chartOptions" />
      </div>

      <!-- Row 3 -->
      <div class="chart-wrapper">
        <div class="chart-header">
          <h3>Géneros</h3>
          <p class="chart-subtitle">Distribución por género</p>
        </div>
        <Pie :data="chartGeneros" :options="chartOptionsPie" />
      </div>

      <div class="chart-wrapper">
        <div class="chart-header">
          <h3>Salarios Promedio</h3>
          <p class="chart-subtitle">Por departamento</p>
        </div>
        <Bar :data="chartSalariosPromedio" :options="chartOptions" />
      </div>

      <!-- Row 4 -->
      <div class="chart-wrapper full-width">
        <div class="chart-header">
          <h3>Licencias Solicitadas</h3>
          <p class="chart-subtitle">Estado de solicitudes de licencia</p>
        </div>
        <Bar :data="chartLicencias" :options="chartOptions" />
      </div>

      <!-- Row 5 -->
      <div class="chart-wrapper">
        <div class="chart-header">
          <h3>Años de Antigüedad</h3>
          <p class="chart-subtitle">Distribución de antigüedad</p>
        </div>
        <Radar :data="chartAntiguedad" :options="chartOptionsRadar" />
      </div>

      <div class="chart-wrapper">
        <div class="chart-header">
          <h3>Tasa de Asistencia</h3>
          <p class="chart-subtitle">Por empleado (Top 10)</p>
        </div>
        <Radar :data="chartTasaAsistencia" :options="chartOptionsRadar" />
      </div>

      <!-- Row 6 -->
      <div class="chart-wrapper full-width">
        <div class="chart-header">
          <h3>Tendencia de Asistencias (Últimos 30 días)</h3>
          <p class="chart-subtitle">Gráfico de tendencia</p>
        </div>
        <Line :data="chartTendenciaAsistencias" :options="chartOptionsLine" />
      </div>
    </div>
  </div>
</template>

<script>
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, RadarController, Filler, Title, Tooltip, Legend } from 'chart.js'
import { Bar, Line, Doughnut, Pie, Radar } from 'vue-chartjs'
import api from '../services/api'
import { useNotification } from '../services/notification.service'

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
    Pie,
    Radar
  },
  data() {
    return {
      notification: useNotification(),
      empleados: [],
      asistencias: [],
      licencias: [],
      departamentos: [],
      
      // Computed stats
      totalEmpleados: 0,
      empleadosActivos: 0,
      presentesHoy: 0,
      ausenciasHoy: 0,
      
      // Charts data
      chartEmpleadosPorDepartamento: { labels: [], datasets: [] },
      chartEstadoEmpleados: { labels: [], datasets: [] },
      chartAsistenciasUltimos7Dias: { labels: [], datasets: [] },
      chartGeneros: { labels: [], datasets: [] },
      chartSalariosPromedio: { labels: [], datasets: [] },
      chartLicencias: { labels: [], datasets: [] },
      chartAntiguedad: { labels: [], datasets: [] },
      chartTasaAsistencia: { labels: [], datasets: [] },
      chartTendenciaAsistencias: { labels: [], datasets: [] },
      
      // Chart options
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          title: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
      chartOptionsPie: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'right',
          },
        }
      },
      chartOptionsRadar: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100
          }
        }
      },
      chartOptionsLine: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData() {
      try {
        // Load all data
        const [empleadosRes, asistenciasRes, licenciasRes] = await Promise.all([
          api.getEmpleados(),
          api.getAsistencias(),
          api.getSolicitudesLicencia()
        ])

        this.empleados = empleadosRes.data || []
        this.asistencias = asistenciasRes.data || []
        this.licencias = licenciasRes.data || []

        this.calculateStats()
        this.generateCharts()
      } catch (error) {
        console.error('Error cargando datos:', error)
        this.notification.error('Error al cargar datos para gráficos')
      }
    },

    calculateStats() {
      this.totalEmpleados = this.empleados.length
      this.empleadosActivos = this.empleados.filter(e => e.estado === 'Activo').length

      const today = new Date().toISOString().split('T')[0]
      const asistenciasHoy = this.asistencias.filter(a => 
        a.fechaAsistencia?.split('T')[0] === today
      )
      this.presentesHoy = asistenciasHoy.filter(a => a.estado === 'PRESENTE').length
      this.ausenciasHoy = asistenciasHoy.filter(a => a.estado === 'AUSENTE').length
    },

    generateCharts() {
      this.generateEmpleadosPorDepartamento()
      this.generateEstadoEmpleados()
      this.generateAsistenciasUltimos7Dias()
      this.generateGeneros()
      this.generateSalariosPromedio()
      this.generateLicencias()
      this.generateAntiguedad()
      this.generateTasaAsistencia()
      this.generateTendenciaAsistencias()
    },

    generateEmpleadosPorDepartamento() {
      const departamentos = {}
      this.empleados.forEach(emp => {
        const dept = emp.departamento?.nombre || 'Sin Departamento'
        departamentos[dept] = (departamentos[dept] || 0) + 1
      })

      this.chartEmpleadosPorDepartamento = {
        labels: Object.keys(departamentos),
        datasets: [{
          label: 'Cantidad de Empleados',
          data: Object.values(departamentos),
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(199, 199, 199, 0.8)',
            'rgba(83, 102, 255, 0.8)',
          ],
          borderColor: 'rgba(0, 0, 0, 0.1)',
          borderWidth: 1
        }]
      }
    },

    generateEstadoEmpleados() {
      const estados = {}
      this.empleados.forEach(emp => {
        estados[emp.estado] = (estados[emp.estado] || 0) + 1
      })

      this.chartEstadoEmpleados = {
        labels: Object.keys(estados),
        datasets: [{
          data: Object.values(estados),
          backgroundColor: [
            'rgba(40, 167, 69, 0.8)',  // Activo - verde
            'rgba(220, 53, 69, 0.8)',  // Inactivo - rojo
            'rgba(255, 193, 7, 0.8)'   // Licencia - amarillo
          ]
        }]
      }
    },

    generateAsistenciasUltimos7Dias() {
      const dias = {}
      const hoy = new Date()
      
      // Crear array de últimos 7 días
      for (let i = 6; i >= 0; i--) {
        const fecha = new Date(hoy)
        fecha.setDate(fecha.getDate() - i)
        const fechaStr = fecha.toISOString().split('T')[0]
        dias[fechaStr] = { PRESENTE: 0, TARDANZA: 0, AUSENTE: 0 }
      }

      // Agrupar asistencias por día
      this.asistencias.forEach(a => {
        const fecha = a.fechaAsistencia?.split('T')[0]
        if (dias[fecha]) {
          dias[fecha][a.estado] = (dias[fecha][a.estado] || 0) + 1
        }
      })

      const labels = Object.keys(dias).map(f => {
        const date = new Date(f)
        return date.toLocaleDateString('es-ES', { weekday: 'short', month: 'short', day: 'numeric' })
      })

      this.chartAsistenciasUltimos7Dias = {
        labels,
        datasets: [
          {
            label: 'Presentes',
            data: Object.values(dias).map(d => d.PRESENTE),
            backgroundColor: 'rgba(40, 167, 69, 0.8)',
            borderColor: 'rgba(40, 167, 69, 1)',
            borderWidth: 1
          },
          {
            label: 'Tardanzas',
            data: Object.values(dias).map(d => d.TARDANZA),
            backgroundColor: 'rgba(255, 193, 7, 0.8)',
            borderColor: 'rgba(255, 193, 7, 1)',
            borderWidth: 1
          },
          {
            label: 'Ausentes',
            data: Object.values(dias).map(d => d.AUSENTE),
            backgroundColor: 'rgba(220, 53, 69, 0.8)',
            borderColor: 'rgba(220, 53, 69, 1)',
            borderWidth: 1
          }
        ]
      }
    },

    generateGeneros() {
      const generos = {}
      this.empleados.forEach(emp => {
        const genero = emp.genero || 'No especificado'
        generos[genero] = (generos[genero] || 0) + 1
      })

      this.chartGeneros = {
        labels: Object.keys(generos),
        datasets: [{
          data: Object.values(generos),
          backgroundColor: [
            'rgba(173, 216, 230, 0.8)',  // Azul - Masculino
            'rgba(255, 192, 203, 0.8)',  // Rosa - Femenino
            'rgba(211, 211, 211, 0.8)'   // Gris - Otro
          ]
        }]
      }
    },

    generateSalariosPromedio() {
      const salarios = {}
      this.empleados.forEach(emp => {
        const dept = emp.departamento?.nombre || 'Sin Departamento'
        if (!salarios[dept]) {
          salarios[dept] = { total: 0, count: 0 }
        }
        salarios[dept].total += emp.salario || 0
        salarios[dept].count += 1
      })

      const promedios = {}
      Object.keys(salarios).forEach(dept => {
        promedios[dept] = Math.round(salarios[dept].total / salarios[dept].count)
      })

      this.chartSalariosPromedio = {
        labels: Object.keys(promedios),
        datasets: [{
          label: 'Salario Promedio ($)',
          data: Object.values(promedios),
          backgroundColor: 'rgba(54, 162, 235, 0.8)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      }
    },

    generateLicencias() {
      const estadosLicencia = {}
      this.licencias.forEach(l => {
        estadosLicencia[l.estado] = (estadosLicencia[l.estado] || 0) + 1
      })

      this.chartLicencias = {
        labels: Object.keys(estadosLicencia),
        datasets: [{
          label: 'Solicitudes de Licencia',
          data: Object.values(estadosLicencia),
          backgroundColor: [
            'rgba(255, 206, 86, 0.8)',   // Pendiente - amarillo
            'rgba(40, 167, 69, 0.8)',    // Aprobada - verde
            'rgba(220, 53, 69, 0.8)'     // Rechazada - rojo
          ],
          borderColor: 'rgba(0, 0, 0, 0.1)',
          borderWidth: 1
        }]
      }
    },

    generateAntiguedad() {
      const antiguedad = { '0-1': 0, '1-3': 0, '3-5': 0, '5-10': 0, '+10': 0 }
      
      this.empleados.forEach(emp => {
        if (!emp.fechaIngreso) return
        const fechaIngreso = new Date(emp.fechaIngreso)
        const hoy = new Date()
        const anios = (hoy - fechaIngreso) / (365.25 * 24 * 60 * 60 * 1000)

        if (anios < 1) antiguedad['0-1']++
        else if (anios < 3) antiguedad['1-3']++
        else if (anios < 5) antiguedad['3-5']++
        else if (anios < 10) antiguedad['5-10']++
        else antiguedad['+10']++
      })

      this.chartAntiguedad = {
        labels: Object.keys(antiguedad),
        datasets: [{
          label: 'Empleados',
          data: Object.values(antiguedad),
          backgroundColor: 'rgba(153, 102, 255, 0.8)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 2,
          fill: true
        }]
      }
    },

    generateTasaAsistencia() {
      const tasaAsistencia = {}
      
      this.empleados.slice(0, 10).forEach(emp => {
        const asistenciasEmpleado = this.asistencias.filter(a => a.empleado?.id === emp.id)
        const presentes = asistenciasEmpleado.filter(a => a.estado === 'PRESENTE').length
        const tasa = asistenciasEmpleado.length > 0 ? (presentes / asistenciasEmpleado.length) * 100 : 0
        tasaAsistencia[`${emp.nombre} ${emp.apellido}`.substring(0, 10)] = Math.round(tasa)
      })

      this.chartTasaAsistencia = {
        labels: Object.keys(tasaAsistencia),
        datasets: [{
          label: 'Tasa de Asistencia (%)',
          data: Object.values(tasaAsistencia),
          backgroundColor: 'rgba(75, 192, 192, 0.8)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          fill: true
        }]
      }
    },

    generateTendenciaAsistencias() {
      const diasTendencia = {}
      const hace30 = new Date()
      hace30.setDate(hace30.getDate() - 30)
      
      // Crear array de últimos 30 días
      for (let i = 30; i >= 0; i--) {
        const fecha = new Date()
        fecha.setDate(fecha.getDate() - i)
        const fechaStr = fecha.toISOString().split('T')[0]
        diasTendencia[fechaStr] = 0
      }

      // Contar presentes por día
      this.asistencias.forEach(a => {
        const fecha = a.fechaAsistencia?.split('T')[0]
        if (diasTendencia[fecha] !== undefined && a.estado === 'PRESENTE') {
          diasTendencia[fecha]++
        }
      })

      const labels = Object.keys(diasTendencia).map(f => {
        const date = new Date(f)
        return date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })
      })

      this.chartTendenciaAsistencias = {
        labels,
        datasets: [{
          label: 'Presentes por Día',
          data: Object.values(diasTendencia),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      }
    },

    refreshData() {
      this.loadData()
      this.notification.success('Datos actualizados')
    },

    downloadReport() {
      this.notification.success('Descargando reporte...')
      // TODO: Implementar descarga de PDF con gráficos
    }
  }
}
</script>

<style scoped>
.charts-page {
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.charts-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1.5rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header-left h1 {
  margin: 0;
  font-size: 2rem;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.header-left .page-subtitle {
  margin: 0.5rem 0 0 0;
  color: #666;
  font-size: 0.95rem;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.btn-refresh, .btn-download {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-refresh {
  background: #17a2b8;
  color: white;
}

.btn-refresh:hover {
  background: #138496;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(23, 162, 184, 0.3);
}

.btn-download {
  background: #28a745;
  color: white;
}

.btn-download:hover {
  background: #218838;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
}

/* Stats Cards */
.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  gap: 1.5rem;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}

.stat-content h3 {
  margin: 0;
  font-size: 0.95rem;
  color: #666;
  font-weight: 500;
}

.stat-value {
  margin: 0.5rem 0 0 0;
  font-size: 2rem;
  font-weight: bold;
  color: #333;
}

/* Charts Container */
.charts-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 2rem;
}

.chart-wrapper {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.chart-wrapper:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.chart-wrapper.full-width {
  grid-column: 1 / -1;
  min-height: 400px;
}

.chart-header {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.chart-header h3 {
  margin: 0;
  font-size: 1.3rem;
  color: #333;
}

.chart-subtitle {
  margin: 0.5rem 0 0 0;
  color: #999;
  font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 1200px) {
  .charts-container {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
}

@media (max-width: 768px) {
  .charts-page {
    padding: 1rem;
  }

  .charts-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .header-left h1 {
    font-size: 1.5rem;
  }

  .header-actions {
    width: 100%;
  }

  .btn-refresh, .btn-download {
    flex: 1;
    justify-content: center;
  }

  .stats-row {
    grid-template-columns: 1fr;
  }

  .charts-container {
    grid-template-columns: 1fr;
  }

  .chart-wrapper {
    padding: 1rem;
  }

  .chart-wrapper.full-width {
    min-height: 300px;
  }
}
</style>
