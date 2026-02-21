import { useState, useEffect } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js'
import { Bar, Pie, Line } from 'react-chartjs-2'
import api from '../services/api'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement)

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

  const barChartData = {
    labels: ['Total', 'Activos', 'Inactivos', 'Asistencias', 'Ausentes'],
    datasets: [{
      label: 'Estadísticas del Sistema',
      data: [
        stats?.empleados?.total || 0,
        stats?.empleados?.activos || 0,
        stats?.empleados?.inactivos || 0,
        stats?.asistencias?.presente || 0,
        stats?.asistencias?.ausente || 0
      ],
      backgroundColor: [
        'rgba(102, 126, 234, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(245, 158, 11, 0.8)'
      ],
      borderWidth: 1
    }]
  }

  const departmentCounts = empleados.reduce((acc, emp) => {
    const dept = emp.departamento?.nombre || 'Sin asignar'
    acc[dept] = (acc[dept] || 0) + 1
    return acc
  }, {})

  const pieChartData = {
    labels: Object.keys(departmentCounts),
    datasets: [{
      data: Object.values(departmentCounts),
      backgroundColor: [
        'rgba(102, 126, 234, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(34, 197, 94, 0.8)'
      ],
      borderWidth: 2,
      borderColor: '#fff'
    }]
  }

  const last7Days = [...Array(7)].map((_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    return date.toISOString().split('T')[0]
  })

  const attendanceByDay = last7Days.map(date => {
    return asistencias.filter(a => a.fechaAsistencia === date && a.estado === 'PRESENTE').length
  })

  const lineChartData = {
    labels: last7Days.map(d => {
      const date = new Date(d)
      return date.toLocaleDateString('es-ES', { weekday: 'short' })
    }),
    datasets: [{
      label: 'Asistencias por Día',
      data: attendanceByDay,
      borderColor: 'rgba(16, 185, 129, 1)',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      tension: 0.4,
      fill: true
    }]
  }

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Estadísticas Generales' }
    }
  }

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right' },
      title: { display: true, text: 'Empleados por Departamento' }
    }
  }

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Asistencias últimos 7 días' }
    }
  }

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  return (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl bg-gradient-blue shadow-gradient-blue">
          <i className="bi bi-graph-up"></i>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Estadísticas y Gráficos</h1>
          <p className="text-gray-500 text-sm">Visualiza el rendimiento del sistema</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl p-5 flex items-center gap-4 shadow-sm border border-gray-100">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl bg-gradient-purple"><i className="bi bi-people-fill"></i></div>
          <div><div className="text-3xl font-bold text-gray-800">{stats?.empleados?.total || 0}</div><div className="text-gray-500 text-sm">Total Empleados</div></div>
        </div>
        <div className="bg-white rounded-xl p-5 flex items-center gap-4 shadow-sm border border-gray-100">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl bg-gradient-green"><i className="bi bi-person-check"></i></div>
          <div><div className="text-3xl font-bold text-gray-800">{stats?.empleados?.activos || 0}</div><div className="text-gray-500 text-sm">Empleados Activos</div></div>
        </div>
        <div className="bg-white rounded-xl p-5 flex items-center gap-4 shadow-sm border border-gray-100">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl bg-gradient-yellow"><i className="bi bi-person-dash"></i></div>
          <div><div className="text-3xl font-bold text-gray-800">{stats?.empleados?.inactivos || 0}</div><div className="text-gray-500 text-sm">Empleados Inactivos</div></div>
        </div>
        <div className="bg-white rounded-xl p-5 flex items-center gap-4 shadow-sm border border-gray-100">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl bg-gradient-blue"><i className="bi bi-clock-fill"></i></div>
          <div><div className="text-3xl font-bold text-gray-800">{stats?.asistencias?.porcentajeAsistencia || 0}%</div><div className="text-gray-500 text-sm">Asistencia Hoy</div></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="h-80"><Bar data={barChartData} options={barOptions} /></div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="h-80"><Pie data={pieChartData} options={pieOptions} /></div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="h-80"><Line data={lineChartData} options={lineOptions} /></div>
      </div>
    </div>
  )
}

export default Graficos
