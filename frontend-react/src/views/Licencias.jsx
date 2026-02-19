import { useState, useEffect } from 'react'
import api from '../services/api'
import { useToast } from '../context/ToastContext'
import { exportLicenciasToPDF } from '../utils/exportPDF'
import { exportLicenciasToExcel } from '../utils/exportExcel'

const Licencias = () => {
  const { success, error } = useToast()
  const [licencias, setLicencias] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    empleadoId: '',
    tipoLicenciaId: '',
    fechaInicio: '',
    fechaFin: '',
    motivo: ''
  })
  const [empleados, setEmpleados] = useState([])
  const [tiposLicencia, setTiposLicencia] = useState([])

  useEffect(() => {
    loadLicencias()
    loadEmpleados()
  }, [])

  const loadLicencias = async () => {
    try {
      setLoading(true)
      const response = await api.getSolicitudesLicencia()
      setLicencias(response.data)
    } catch (err) { console.error('Error:', err) }
    finally { setLoading(false) }
  }

  const loadEmpleados = async () => {
    try {
      const response = await api.getEmpleados()
      setEmpleados(response.data)
    } catch (err) { console.error('Error:', err) }
  }

  const filteredLicencias = licencias.filter(l => {
    const query = searchQuery.toLowerCase()
    return l.empleado?.nombre?.toLowerCase().includes(query) || l.estado?.toLowerCase().includes(query)
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.createSolicitudLicencia(formData)
      loadLicencias()
      setShowModal(false)
      setFormData({ empleadoId: '', tipoLicenciaId: '', fechaInicio: '', fechaFin: '', motivo: '' })
    } catch (err) { console.error('Error:', err) }
  }

  const handleAprobar = async (id) => {
    try { 
      await api.aprobarLicencia(id); 
      loadLicencias(); 
      success('Licencia aprobada correctamente')
    } catch (err) { 
      error('Error al aprobar licencia')
      console.error('Error:', err) 
    }
  }

  const handleRechazar = async (id) => {
    try { 
      await api.rechazarLicencia(id); 
      loadLicencias(); 
      success('Licencia rechazada correctamente')
    } catch (err) { 
      error('Error al rechazar licencia')
      console.error('Error:', err) 
    }
  }

  const handleExportPDF = () => {
    exportLicenciasToPDF(licencias)
    success('PDF exportado correctamente')
  }

  const handleExportExcel = () => {
    exportLicenciasToExcel(licencias)
    success('Excel exportado correctamente')
  }

  const getEstadoBadge = (estado) => {
    const estados = { 'Pendiente': 'bg-yellow-100 text-yellow-700', 'Aprobada': 'bg-green-100 text-green-700', 'Rechazada': 'bg-red-100 text-red-700' }
    return estados[estado] || 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl bg-gradient-yellow shadow-gradient-yellow">
            <i className="bi bi-calendar-check-fill"></i>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Gestión de Licencias</h1>
            <p className="text-gray-500 text-sm">Administra las solicitudes de licencias</p>
          </div>
        </div>
        <button onClick={() => setShowModal(true)} 
                className="px-4 py-2 rounded-lg text-white font-medium flex items-center gap-2 bg-gradient-yellow">
          <i className="bi bi-plus-lg"></i> Nueva Solicitud
        </button>
      </div>

      <div className="flex gap-4 mb-6 items-center flex-wrap">
        <div className="relative flex-1 max-w-md">
          <input type="text" placeholder="Buscar licencias..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
          <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>
        <div className="flex gap-2">
          <button onClick={handleExportPDF} className="px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center gap-2">
            <i className="bi bi-file-earmark-pdf text-red-500"></i> PDF
          </button>
          <button onClick={handleExportExcel} className="px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center gap-2">
            <i className="bi bi-file-earmark-excel text-green-500"></i> Excel
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div></div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead><tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Empleado</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Tipo</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Fecha Inicio</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Fecha Fin</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Estado</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Acciones</th>
            </tr></thead>
            <tbody>
              {filteredLicencias.map((licencia) => (
                <tr key={licencia.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold bg-gradient-yellow">
                        {licencia.empleado?.nombre?.[0]}{licencia.empleado?.apellido?.[0]}
                      </div>
                      <span>{licencia.empleado?.nombre} {licencia.empleado?.apellido}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{licencia.tipoLicencia?.nombre || '-'}</td>
                  <td className="px-4 py-3">{licencia.fechaInicio}</td>
                  <td className="px-4 py-3">{licencia.fechaFin}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoBadge(licencia.estado)}`}>{licencia.estado}</span></td>
                  <td className="px-4 py-3">
                    {licencia.estado === 'Pendiente' && (
                      <div className="flex gap-2">
                        <button onClick={() => handleAprobar(licencia.id)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-green-50" title="Aprobar">
                          <i className="bi bi-check-circle text-green-600"></i>
                        </button>
                        <button onClick={() => handleRechazar(licencia.id)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50" title="Rechazar">
                          <i className="bi bi-x-circle text-red-600"></i>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Nueva Solicitud de Licencia</h3>
              <button onClick={() => setShowModal(false)} className="text-2xl text-gray-500"><i className="bi bi-x-lg"></i></button>
            </div>
            <form onSubmit={handleSubmit} className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Empleado</label>
                <select value={formData.empleadoId} onChange={e => setFormData({...formData, empleadoId: e.target.value})} required
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                  <option value="">Seleccionar empleado</option>
                  {empleados.map(emp => (<option key={emp.id} value={emp.id}>{emp.nombre} {emp.apellido}</option>))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicio</label>
                  <input type="date" value={formData.fechaInicio} onChange={e => setFormData({...formData, fechaInicio: e.target.value})} required
                         className="w-full px-3 py-2 rounded-lg border border-gray-200" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Fin</label>
                  <input type="date" value={formData.fechaFin} onChange={e => setFormData({...formData, fechaFin: e.target.value})} required
                         className="w-full px-3 py-2 rounded-lg border border-gray-200" />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Motivo</label>
                <textarea value={formData.motivo} onChange={e => setFormData({...formData, motivo: e.target.value})} rows="3"
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600">Cancelar</button>
                <button type="submit" className="px-4 py-2 rounded-lg text-white bg-gradient-yellow">Enviar Solicitud</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Licencias

