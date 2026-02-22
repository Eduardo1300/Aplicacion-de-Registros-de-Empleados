import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../../services/api'

const SolicitarLicencia = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [tipo, setTipo] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [formData, setFormData] = useState({ tipoLicenciaId: '', fechaInicio: '', fechaFin: '', razon: '' })

  useEffect(() => {
    const token = localStorage.getItem('empleadoToken')
    if (!token) navigate('/empleado/login')
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMensaje('')
    try {
      await api.crearSolicitudLicencia(formData)
      setMensaje('Solicitud enviada correctamente')
      setTipo('success')
      setFormData({ tipoLicenciaId: '', fechaInicio: '', fechaFin: '', razon: '' })
    } catch (err) {
      setMensaje(err.response?.data?.message || 'Error al enviar solicitud')
      setTipo('error')
    } finally { setLoading(false) }
  }

  const logout = () => { localStorage.removeItem('empleadoToken'); localStorage.removeItem('empleado'); navigate('/empleado/login') }

  const navItems = [
    { to: '/empleado/dashboard', icon: 'bi-house', label: 'Inicio' },
    { to: '/empleado/asistencia', icon: 'bi-clock', label: 'Asistencia' },
    { to: '/empleado/mis-asistencias', icon: 'bi-calendar-check', label: 'Mis Asistencias' },
    { to: '/empleado/licencias', icon: 'bi-calendar', label: 'Licencias' },
    { to: '/empleado/solicitar-licencia', icon: 'bi-plus-circle', label: 'Solicitar', active: true },
    { to: '/empleado/perfil', icon: 'bi-person', label: 'Mi Perfil' },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-green"><i className="bi bi-person-badge"></i></div>
            <span className="font-semibold text-gray-800">Empleado</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-500">
            <i className="bi bi-x-lg text-xl"></i>
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${item.active ? 'text-white bg-gradient-green' : 'text-gray-600 hover:bg-gray-100'}`}>
              <i className={`bi ${item.icon}`}></i><span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 w-full"><i className="bi bi-box-arrow-right"></i><span>Cerrar Sesión</span></button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)}></div>}

      <main className="flex-1 p-4 md:p-8">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Solicitar Licencia</h1>
          <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-600 p-2">
            <i className="bi bi-list text-2xl"></i>
          </button>
        </div>

        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 max-w-xl">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Licencia</label>
              <select value={formData.tipoLicenciaId} onChange={(e) => setFormData({...formData, tipoLicenciaId: e.target.value})} required
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="">Seleccionar tipo</option>
                <option value="1">Vacaciones</option>
                <option value="2">Enfermedad</option>
                <option value="3">Personal</option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicio</label>
                <input type="date" value={formData.fechaInicio} onChange={(e) => setFormData({...formData, fechaInicio: e.target.value})} required
                       className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Fin</label>
                <input type="date" value={formData.fechaFin} onChange={(e) => setFormData({...formData, fechaFin: e.target.value})} required
                       className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Razón</label>
              <textarea value={formData.razon} onChange={(e) => setFormData({...formData, razon: e.target.value})} rows="4"
                        placeholder="Describe el motivo de tu solicitud"
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <button type="submit" disabled={loading}
                    className="w-full py-3 rounded-lg text-white font-semibold disabled:opacity-70 bg-gradient-green">
              {loading ? 'Enviando...' : 'Enviar Solicitud'}
            </button>
            {mensaje && (<div className={`mt-4 p-3 rounded-lg ${tipo === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{mensaje}</div>)}
          </form>
        </div>
      </main>
    </div>
  )
}

export default SolicitarLicencia
