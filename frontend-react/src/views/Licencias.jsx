import { useState, useEffect } from 'react'
import api from '../services/api'
import { useToast } from '../context/ToastContext'
import { exportLicenciasToPDF } from '../utils/exportPDF'
import { exportLicenciasToExcel } from '../utils/exportExcel'
import Pagination from '../components/Pagination'

const Licencias = () => {
  const { success, error } = useToast()
  const [licencias, setLicencias] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterEstado, setFilterEstado] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [showModal, setShowModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [confirmAction, setConfirmAction] = useState(null)
  const [formData, setFormData] = useState({
    empleadoId: '',
    tipoLicenciaId: '',
    fechaInicio: '',
    fechaFin: '',
    razon: ''
  })
  const [empleados, setEmpleados] = useState([])
  const [tiposLicencia, setTiposLicencia] = useState([])

  useEffect(() => {
    loadLicencias()
    loadEmpleados()
    loadTiposLicencia()
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

  const loadTiposLicencia = async () => {
    try {
      const response = await api.getTiposLicencia()
      setTiposLicencia(response.data)
    } catch (err) { console.error('Error:', err) }
  }

  const filteredLicencias = licencias.filter(l => {
    const query = searchQuery.toLowerCase()
    const matchesSearch = l.empleado?.nombre?.toLowerCase().includes(query) || l.estado?.toLowerCase().includes(query)
    const matchesEstado = !filterEstado || l.estado === filterEstado
    return matchesSearch && matchesEstado
  })

  const totalPages = Math.ceil(filteredLicencias.length / itemsPerPage)
  const paginatedLicencias = filteredLicencias.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.createSolicitudLicencia(formData)
      loadLicencias()
      setShowModal(false)
      setFormData({ empleadoId: '', tipoLicenciaId: '', fechaInicio: '', fechaFin: '', razon: '' })
    } catch (err) { console.error('Error:', err) }
  }

  const handleAprobar = (id) => {
    setConfirmAction({ type: 'aprobar', id })
    setShowConfirmModal(true)
  }

  const handleRechazar = (id) => {
    setConfirmAction({ type: 'rechazar', id })
    setShowConfirmModal(true)
  }

  const confirmDecision = async () => {
    if (!confirmAction) return
    try {
      if (confirmAction.type === 'aprobar') {
        await api.aprobarLicencia(confirmAction.id, { usuarioAprobadorId: 3, observaciones: 'Aprobado' })
        success('Licencia aprobada correctamente')
      } else {
        await api.rechazarLicencia(confirmAction.id, { usuarioAprobadorId: 3, observaciones: 'Rechazado' })
        success('Licencia rechazada correctamente')
      }
      loadLicencias()
      setShowConfirmModal(false)
      setConfirmAction(null)
    } catch (err) {
      error(`Error al ${confirmAction.type === 'aprobar' ? 'aprobar' : 'rechazar'} licencia`)
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
    const estados = { 
      'PENDIENTE': 'bg-yellow-100 text-yellow-700', 
      'APROBADA': 'bg-green-100 text-green-700', 
      'RECHAZADA': 'bg-red-100 text-red-700',
      'Pendiente': 'bg-yellow-100 text-yellow-700', 
      'Aprobada': 'bg-green-100 text-green-700', 
      'Rechazada': 'bg-red-100 text-red-700' 
    }
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
        <div className="relative flex-1 min-w-[200px]">
          <input type="text" placeholder="Buscar licencias..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
          <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>
        <select value={filterEstado} onChange={(e) => { setFilterEstado(e.target.value); setCurrentPage(1); }}
          className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500">
          <option value="">Todos los estados</option>
          <option value="PENDIENTE">Pendiente</option>
          <option value="APROBADA">Aprobada</option>
          <option value="RECHAZADA">Rechazada</option>
        </select>
        <div className="flex gap-2">
          <button onClick={handleExportPDF} className="px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center gap-2">
            <i className="bi bi-file-earmark-pdf text-red-500"></i> <span className="hidden sm:inline">PDF</span>
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
          <div className="overflow-x-auto">
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
              {paginatedLicencias.map((licencia) => (
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
                    {(licencia.estado === 'PENDIENTE' || licencia.estado === 'Pendiente') && (
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
          {totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          )}
        </div>
      )}

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowConfirmModal(false)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  confirmAction?.type === 'aprobar' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <i className={`bi ${
                    confirmAction?.type === 'aprobar' ? 'bi-check-lg text-green-600' : 'bi-x-lg text-red-600'
                  } text-xl`}></i>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-center mb-2 text-gray-800">
                {confirmAction?.type === 'aprobar' ? '¿Aprobar Licencia?' : '¿Rechazar Licencia?'}
              </h3>
              <p className="text-gray-600 text-center mb-6">
                {confirmAction?.type === 'aprobar' 
                  ? '¿Estás seguro de que deseas aprobar esta solicitud de licencia?' 
                  : '¿Estás seguro de que deseas rechazar esta solicitud de licencia?'}
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    setShowConfirmModal(false)
                    setConfirmAction(null)
                  }} 
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium"
                >
                  Cancelar
                </button>
                <button 
                  onClick={confirmDecision} 
                  className={`flex-1 px-4 py-2 rounded-lg text-white font-medium ${
                    confirmAction?.type === 'aprobar' 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {confirmAction?.type === 'aprobar' ? 'Aprobar' : 'Rechazar'}
                </button>
              </div>
            </div>
          </div>
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
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Licencia</label>
                <select value={formData.tipoLicenciaId} onChange={e => setFormData({...formData, tipoLicenciaId: e.target.value})} required
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                  <option value="">Seleccionar tipo</option>
                  {tiposLicencia.map(tipo => (<option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>))}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Razón</label>
                <textarea value={formData.razon} onChange={e => setFormData({...formData, razon: e.target.value})} rows="3"
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

