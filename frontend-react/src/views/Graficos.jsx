import { useState, useEffect } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, RadialLinearScale, Filler } from 'chart.js'
import { Bar, Pie, Line, Doughnut, Radar } from 'react-chartjs-2'
import api from '../services/api'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, RadialLinearScale, Filler)

const Graficos = () => {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState(null)
  const [empleados, setEmpleados] = useState([])
  const [asistencias, setAsistencias] = useState([])

  useEffect(() => { loadData() }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [statsRes, empleadosRes, asistenciaRes] = await Promise.all([
        api.getEstadisticas(),
        api.getEmpleados(),
        api.getAsistencias()
      ])
      setStats(statsRes.data)
      setEmpleados(empleadosRes.data)
      setAsistencias(asistenciaRes.data)
    } catch (err) { console.error('Error:', err) }
    finally { setLoading(false) }
  }

  const colores = {
    purple: ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe'],
    green: ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#d1fae5'],
    blue: ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe'],
    red: ['#ef4444', '#f87171', '#fca5a5', '#fecaca', '#fee2e2'],
    yellow: ['#f59e0b', '#fbbf24', '#fcd34d', '#fde68a', '#fef3c7'],
    pink: ['#ec4899', '#f472b6', '#f9a8d4', '#fbcfe8', '#fce7f3'],
    cyan: ['#06b6d4', '#22d3ee', '#67e8f9', '#a5f3fc', '#cffafe']
  }

  const last30Days = [...Array(30)].map((_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (29 - i))
    return date.toISOString().split('T')[0]
  })

  const attendanceByDay = last30Days.map(date => {
    const present = asistencias.filter(a => a.fechaAsistencia === date && a.estado === 'PRESENTE').length
    const tardanza = asistencias.filter(a => a.fechaAsistencia === date && a.estado === 'TARDANZA').length
    const ausente = asistencias.filter(a => a.fechaAsistencia === date && a.estado === 'AUSENTE').length
    return { date, present, tardanza, ausente }
  })

  const asistenciaList = Array.isArray(asistencias) ? asistencia : []

  const departmentCounts = empleados.reduce((acc, emp) => {
    const dept = emp.departamento?.nombre || 'Sin asignar'
    acc[dept] = (acc[dept] || 0) + 1
    return acc
  }, {})

  const positionCounts = empleados.reduce((acc, emp) => {
    const cargo = emp.cargo?.nombre || 'Sin cargo'
    acc[cargo] = (acc[cargo] || 0) + 1
    return acc
  }, {})

  const asistenciaCounts = asistenciaList.reduce((acc, a) => {
    acc[a.estado] = (acc[a.estado] || 0) + 1
    return acc
  }, {})

  const empleadoStats = {
    activos: empleados.filter(e => e.estado === 'Activo').length,
    inactivos: empleados.filter(e => e.estado === 'Inactivo').length,
 }

  const barChartData = {
    labels: ['Activos', 'Inactivos'],
    datasets: [{
      label: 'Empleados por Estado',
      data: [empleadoStats.activos, empleadoStats.inactivos],
      backgroundColor: [colores.green[0], colores.red[0]],
      borderColor: [colores.green[1], colores.red[1]],
      borderWidth: 2,
      borderRadius: 8,
      barThickness: 60
    }]
  }

  const pieChartData = {
    labels: Object.keys(departmentCounts),
    datasets: [{
      data: Object.values(departmentCounts),
      backgroundColor: [...colores.purple, ...colores.blue, ...colores.green, ...colores.yellow],
      borderWidth: 3,
      borderColor: '#fff',
      hoverOffset: 15
    }]
  }

  const doughnutData = {
    labels: Object.keys(positionCounts),
    datasets: [{
      data: Object.values(positionCounts),
      backgroundColor: [...colores.pink, ...colores.cyan, ...colores.yellow, ...colores.purple],
      borderWidth: 2,
      borderColor: '#fff',
      hoverOffset: 10
    }]
  }

  const lineChartData = {
    labels: last30Days.slice(-14).map(d => {
      const date = new Date(d)
      return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
    }),
    datasets: [
      {
        label: 'Presentes',
        data: attendanceByDay.slice(-14).map(d => d.present),
        borderColor: colores.green[0],
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: colores.green[0]
      },
      {
        label: 'Tardanzas',
        data: attendanceByDay.slice(-14).map(d => d.tardanza),
        borderColor: colores.yellow[0],
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: colores.yellow[0]
      },
      {
        label: 'Ausentes',
        data: attendanceByDay.slice(-14).map(d => d.ausente),
        borderColor: colores.red[0],
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: colores.red[0]
      }
    ]
  }

  const radarData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Esta Semana',
        data: [12, 15, 13, 14, 16, 8, 0],
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        borderColor: colores.purple[0],
        borderWidth: 2,
        pointBackgroundColor: colores.purple[0],
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: colores.purple[0]
      },
      {
        label: 'Semana Anterior',
        data: [10, 12, 14, 11, 15, 6, 0],
        backgroundColor: 'rgba(6, 182, 212, 0.2)',
        borderColor: colores.cyan[0],
        borderWidth: 2,
        pointBackgroundColor: colores.cyan[0],
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: colores.cyan[0]
      }
    ]
  }

  const barHorizontalData = {
    labels: Object.keys(asistenciaCounts),
    datasets: [{
      label: 'Estado de Asistencias',
      data: Object.values(asistenciaCounts),
      backgroundColor: [colores.green[0], colores.yellow[0], colores.red[0]],
      borderRadius: 8,
      barThickness: 40
    }]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { padding: 20, usePointStyle: true, font: { size: 12 } }
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 12,
        cornerRadius: 8,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 }
      }
    }
  }

  const barOptions = {
    ...chartOptions,
    scales: {
      y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
      x: { grid: { display: false } }
    }
  }

  const horizontalBarOptions = {
    ...chartOptions,
    indexAxis: 'y',
    scales: {
      x: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
      y: { grid: { display: false } }
    }
  }

  const pieOptions = {
    ...chartOptions,
    cutout: '60%'
  }

  const radarOptions = {
    ...chartOptions,
    scales: {
      r: {
        beginAtZero: true,
        grid: { color: 'rgba(0,0,0,0.1)' },
        pointLabels: { font: { size: 12 } },
        ticks: { display: false }
      }
    }
  }

  if (loading) return (
    <div className="flex justify-center items-center h-96">
      <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl bg-gradient-purple shadow-lg">
          <i className="bi bi-graph-up-arrow"></i>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Analítico</h1>
          <p className="text-gray-500">Análisis completo del sistema de empleados</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Total Empleados', value: stats?.empleados?.total || empleados.length, icon: 'bi-people-fill', color: 'from-purple-500 to-indigo-600', iconColor: 'text-purple-100' },
          { title: 'Activos', value: stats?.empleados?.activos || empleadoStats.activos, icon: 'bi-person-check-fill', color: 'from-green-500 to-emerald-600', iconColor: 'text-green-100' },
          { title: 'Inactivos', value: stats?.empleados?.inactivos || empleadoStats.inactivos, icon: 'bi-person-x-fill', color: 'from-red-500 to-rose-600', iconColor: 'text-red-100' },
          { title: 'Asistencia Hoy', value: `${stats?.asistencias?.porcentajeAsistencia || 0}%`, icon: 'bi-clock-history', color: 'from-blue-500 to-cyan-600', iconColor: 'text-blue-100' }
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all transform hover:-translate-y-1">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
              <i className={`bi ${stat.icon} ${stat.iconColor} text-xl`}></i>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
            <div className="text-gray-500 text-sm font-medium">{stat.title}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">Tendencia de Asistencias (Últimos 14 días)</h3>
            <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-medium">En Tiempo Real</span>
          </div>
          <div className="h-80">
            <Line data={lineChartData} options={barOptions} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Estado de Asistencias</h3>
          <div className="h-64">
            <Doughnut data={pieChartData} options={pieOptions} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Empleados por Departamento</h3>
          <div className="h-64">
            <Pie data={pieChartData} options={pieOptions} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Empleados por Cargo</h3>
          <div className="h-64">
            <Doughnut data={doughnutData} options={pieOptions} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Estado de Empleados</h3>
          <div className="h-64">
            <Bar data={barChartData} options={horizontalBarOptions} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Comparación Semanal</h3>
          <div className="h-64">
            <Radar data={radarData} options={radarOptions} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Resumen de Estados</h3>
          <div className="h-64">
            <Bar data={barHorizontalData} options={horizontalBarOptions} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Graficos
