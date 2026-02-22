import { useState, useEffect } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js'
import { Bar, Pie, Doughnut, Line } from 'react-chartjs-2'
import api from '../services/api'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement)

const Auditoria = () => {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => { loadAuditoria() }, [])

  const loadAuditoria = async () => {
    try {
      setLoading(true)
      const response = await api.getAuditoria()
      setLogs(response.data || [])
    } catch (err) { 
      console.error('Error:', err)
      setLogs([])
    }
    finally { setLoading(false) }
  }

  const filteredLogs = logs.filter(log => {
    const query = searchQuery.toLowerCase()
    const matchesSearch = log.usuario?.toLowerCase().includes(query) || 
                         log.accion?.toLowerCase().includes(query) || 
                         log.entidad?.toLowerCase().includes(query) ||
                         log.detalles?.toLowerCase().includes(query)
    const matchesFilter = filter === 'all' || log.entidad === filter
    return matchesSearch && matchesFilter
  })

  const getAccionBadge = (accion) => {
    if (accion?.includes('CREATE')) return 'bg-green-100 text-green-700'
    if (accion?.includes('UPDATE')) return 'bg-yellow-100 text-yellow-700'
    if (accion?.includes('DELETE')) return 'bg-red-100 text-red-700'
    return 'bg-blue-100 text-blue-700'
  }

  const actionCounts = logs.reduce((acc, log) => {
    acc[log.accion] = (acc[log.accion] || 0) + 1
    return acc
  }, {})

  const entityCounts = logs.reduce((acc, log) => {
    acc[log.entidad] = (acc[log.entidad] || 0) + 1
    return acc
  }, {})

  const dailyCounts = logs.reduce((acc, log) => {
    const date = new Date(log.fecha).toLocaleDateString('es-ES')
    acc[date] = (acc[date] || 0) + 1
    return acc
  }, {})

  const userCounts = logs.reduce((acc, log) => {
    const user = log.usuario || 'Sistema'
    acc[user] = (acc[user] || 0) + 1
    return acc
  }, {})

  const pieData = {
    labels: Object.keys(actionCounts),
    datasets: [{
      data: Object.values(actionCounts),
      backgroundColor: ['#10b981', '#f59e0b', '#ef4444', '#3b82f6'],
      borderWidth: 2,
      borderColor: '#fff'
    }]
  }

  const doughnutData = {
    labels: Object.keys(entityCounts),
    datasets: [{
      data: Object.values(entityCounts),
      backgroundColor: ['#8b5cf6', '#06b6d4', '#f43f5e', '#10b981', '#f59e0b', '#3b82f6', '#ec4899'],
      borderWidth: 2,
      borderColor: '#fff'
    }]
  }

  const barData = {
    labels: Object.keys(userCounts).slice(0, 5),
    datasets: [{
      label: 'Acciones por Usuario',
      data: Object.values(userCounts).slice(0, 5),
      backgroundColor: '#8b5cf6',
      borderRadius: 8
    }]
  }

  const lineData = {
    labels: Object.keys(dailyCounts).slice(-7),
    datasets: [{
      label: 'Actividades por Día',
      data: Object.values(dailyCounts).slice(-7),
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.4
    }]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } }
  }

  const uniqueEntities = [...new Set(logs.map(l => l.entidad))]

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg">
          <i className="bi bi-clock-history"></i>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Auditoría del Sistema</h1>
          <p className="text-gray-500">Registro completo de todas las acciones realizadas</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Total Acciones', value: logs.length, icon: 'bi-list-task', color: 'from-blue-500 to-cyan-500' },
          { title: 'Creaciones', value: actionCounts.CREATE || 0, icon: 'bi-plus-circle', color: 'from-green-500 to-emerald-500' },
          { title: 'Actualizaciones', value: actionCounts.UPDATE || 0, icon: 'bi-pencil', color: 'from-yellow-500 to-orange-500' },
          { title: 'Eliminaciones', value: actionCounts.DELETE || 0, icon: 'bi-trash', color: 'from-red-500 to-rose-500' }
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
              <i className={`bi ${stat.icon} text-white text-xl`}></i>
            </div>
            <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
            <div className="text-gray-500 text-sm">{stat.title}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Acciones por Tipo</h3>
          <div className="h-64"><Pie data={pieData} options={chartOptions} /></div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Entidades Afectadas</h3>
          <div className="h-64"><Doughnut data={doughnutData} options={chartOptions} /></div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Usuarios Activos</h3>
          <div className="h-64"><Bar data={barData} options={chartOptions} /></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Actividad por Día (Última Semana)</h3>
        <div className="h-64"><Line data={lineData} options={chartOptions} /></div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <input type="text" placeholder="Buscar en auditoría..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="all">Todas las entidades</option>
            {uniqueEntities.map(e => <option key={e} value={e}>{e}</option>)}
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Fecha</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Usuario</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Acción</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Entidad</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Detalles</th>
              </tr></thead>
              <tbody>
                {filteredLogs.map((log, index) => (
                  <tr key={index} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-700">{new Date(log.fecha).toLocaleString('es-ES')}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-medium">{log.usuario || 'Sistema'}</td>
                    <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${getAccionBadge(log.accion)}`}>{log.accion}</span></td>
                    <td className="px-4 py-3 text-sm text-gray-700">{log.entidad}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{log.detalles || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!loading && filteredLogs.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <i className="bi bi-inbox text-4xl mb-2"></i>
            <p>No se encontraron resultados</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Auditoria
