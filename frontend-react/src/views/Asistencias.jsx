import { useState, useEffect } from 'react'
import api from '../services/api'
import { useToast } from '../context/ToastContext'
import { exportAsistenciasToPDF } from '../utils/exportPDF'
import { exportAsistenciasToExcel } from '../utils/exportExcel'

const Asistencias = () => {
  const { success, error } = useToast()
  const [asistencias, setAsistencias] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    empleadoId: '',
    fecha: new Date().toISOString().split('T')[0],
    horaEntrada: '',
    horaSalida: '',
    tipo: 'Presente'
  })
  const [empleados, setEmpleados] = useState([])

  useEffect(() => {
    loadAsistencias()
    loadEmpleados()
  }, [])

  const loadAsistencias = async () => {
    try {
      setLoading(true)
      const response = await api.getAsistencias()
      setAsistencias(response.data)
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadEmpleados = async () => {
    try {
      const response = await api.getEmpleados()
      setEmpleados(response.data.filter(e => e.estado === 'Activo'))
    } catch (err) {
      console.error('Error:', err)
    }
  }

  const filteredAsistencias = asistencias.filter(a => {
    const query = searchQuery.toLowerCase()
    return (
      a.empleado?.nombre?.toLowerCase().includes(query) ||
      a.empleado?.apellido?.toLowerCase().includes(query) ||
      a.fecha?.includes(query)
    )
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.createAsistencia(formData)
      loadAsistencias()
      setShowModal(false)
      setFormData({
        empleadoId: '',
        fecha: new Date().toISOString().split('T')[0],
        horaEntrada: '',
        horaSalida: '',
        tipo: 'Presente'
      })
      success('Asistencia registrada correctamente')
    } catch (err) {
      error('Error al registrar asistencia')
      console.error('Error:', err)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar esta asistencia?')) {
      try {
        await api.deleteAsistencia(id)
        loadAsistencias()
        success('Asistencia eliminada correctamente')
      } catch (err) {
        error('Error al eliminar asistencia')
        console.error('Error:', err)
      }
    }
  }

  const handleExportPDF = () => {
    exportAsistenciasToPDF(asistencias)
    success('PDF exportado correctamente')
  }

  const handleExportExcel = () => {
    exportAsistenciasToExcel(asistencias)
    success('Excel exportado correctamente')
  }

  const getTipoBadge = (tipo) => {
    const tipos = { 'Presente': 'bg-green-100 text-green-700', 'Ausente': 'bg-red-100 text-red-700', 'Permiso': 'bg-yellow-100 text-yellow-700' }
    return tipos[tipo] || 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl bg-gradient-green shadow-gradient-green">
            <i className="bi bi-clock-fill"></i>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Control de Asistencias</h1>
            <p className="text-gray-500 text-sm">Registra y gestiona las asistencias de empleados</p>
          </div>
        </div>
        <button onClick={() => setShowModal(true)} 
                className="px-4 py-2 rounded-lg text-white font-medium flex items-center gap-2 bg-gradient-green shadow-gradient-green">
          <i className="bi bi-plus-lg"></i> Nueva Asistencia
        </button>
      </div>

      <div className="flex gap-4 mb-6 items-center flex-wrap">
        <div className="relative flex-1 max-w-md">
          <input type="text" placeholder="Buscar por empleado o fecha..."
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500" />
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
        <div className="flex justify-center py-12"><div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div></div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead><tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Fecha</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Empleado</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Entrada</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Salida</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Tipo</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Acciones</th>
            </tr></thead>
            <tbody>
              {filteredAsistencias.map((asistencia) => (
                <tr key={asistencia.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700">{asistencia.fecha}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold bg-gradient-green">
                        {asistencia.empleado?.nombre?.[0]}{asistencia.empleado?.apellido?.[0]}
                      </div>
                      <span className="text-gray-800">{asistencia.empleado?.nombre} {asistencia.empleado?.apellido}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{asistencia.horaEntrada || '-'}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{asistencia.horaSalida || '-'}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${getTipoBadge(asistencia.tipo)}`}>{asistencia.tipo}</span></td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleDelete(asistencia.id)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50">
                      <i className="bi bi-trash text-red-500"></i>
                    </button>
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
              <h3 className="text-lg font-semibold">Nueva Asistencia</h3>
              <button onClick={() => setShowModal(false)} className="text-2xl text-gray-500"><i className="bi bi-x-lg"></i></button>
            </div>
            <form onSubmit={handleSubmit} className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Empleado</label>
                <select value={formData.empleadoId} onChange={e => setFormData({...formData, empleadoId: e.target.value})} required
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="">Seleccionar empleado</option>
                  {empleados.map(emp => (<option key={emp.id} value={emp.id}>{emp.nombre} {emp.apellido}</option>))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                  <input type="date" value={formData.fecha} onChange={e => setFormData({...formData, fecha: e.target.value})} required
                         className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                  <select value={formData.tipo} onChange={e => setFormData({...formData, tipo: e.target.value})}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="Presente">Presente</option>
                    <option value="Ausente">Ausente</option>
                    <option value="Permiso">Permiso</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hora Entrada</label>
                  <input type="time" value={formData.horaEntrada} onChange={e => setFormData({...formData, horaEntrada: e.target.value})}
                         className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hora Salida</label>
                  <input type="time" value={formData.horaSalida} onChange={e => setFormData({...formData, horaSalida: e.target.value})}
                         className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600">Cancelar</button>
                <button type="submit" className="px-4 py-2 rounded-lg text-white bg-gradient-green">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Asistencias

