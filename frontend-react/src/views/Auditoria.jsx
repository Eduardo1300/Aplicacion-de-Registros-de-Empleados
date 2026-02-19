import { useState, useEffect } from 'react'
import api from '../services/api'

const Auditoria = () => {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => { loadAuditoria() }, [])

  const loadAuditoria = async () => {
    try {
      setLoading(true)
      const response = await api.getAuditoria()
      setLogs(response.data)
    } catch (err) { console.error('Error:', err) }
    finally { setLoading(false) }
  }

  const filteredLogs = logs.filter(log => {
    const query = searchQuery.toLowerCase()
    return log.usuario?.toLowerCase().includes(query) || log.accion?.toLowerCase().includes(query) || log.entidad?.toLowerCase().includes(query)
  })

  const getAccionBadge = (accion) => {
    if (accion?.includes('CREATE')) return 'bg-green-100 text-green-700'
    if (accion?.includes('UPDATE')) return 'bg-yellow-100 text-yellow-700'
    if (accion?.includes('DELETE')) return 'bg-red-100 text-red-700'
    return 'bg-blue-100 text-blue-700'
  }

  return (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl bg-gradient-indigo shadow-gradient-blue">
          <i className="bi bi-clock-history"></i>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Auditoría del Sistema</h1>
          <p className="text-gray-500 text-sm">Registro de todas las acciones realizadas</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <input type="text" placeholder="Buscar en auditoría..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div></div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
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
                  <td className="px-4 py-3 text-sm text-gray-700">{new Date(log.fecha).toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{log.usuario || 'Sistema'}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${getAccionBadge(log.accion)}`}>{log.accion}</span></td>
                  <td className="px-4 py-3 text-sm text-gray-700">{log.entidad}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{log.detalles || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Auditoria

