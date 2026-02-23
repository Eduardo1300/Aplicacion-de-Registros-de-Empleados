import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../../services/api'

const MisAsistencias = () => {
  const navigate = useNavigate()
  const [asistencias, setAsistencias] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('empleadoToken')
    if (!token) {
      navigate('/empleado/login')
      return
    }
    loadAsistencias()
  }, [navigate])

  const loadAsistencias = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.getMisAsistencias()
      const data = response.data
      if (Array.isArray(data)) {
        setAsistencias(data)
      } else {
        setAsistencias([])
      }
    } catch (err) {
      console.error('Error:', err)
      setError('Error al cargar las asistencias')
      setAsistencias([])
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('empleadoToken')
    localStorage.removeItem('empleado')
    navigate('/empleado/login')
  }

  const getEstadoBadge = (estado) => {
    if (estado === 'PRESENTE') return 'bg-green-100 text-green-700'
    if (estado === 'TARDANZA') return 'bg-yellow-100 text-yellow-700'
    if (estado === 'AUSENTE') return 'bg-red-100 text-red-700'
    return 'bg-gray-100 text-gray-700'
  }

  const getEstadoLabel = (estado) => {
    if (estado === 'PRESENTE') return 'Presente'
    if (estado === 'TARDANZA') return 'Tardanza'
    if (estado === 'AUSENTE') return 'Ausente'
    return estado || 'Sin registro'
  }

  const presentes = Array.isArray(asistencias) ? asistencia.filter(a => a.estado === 'PRESENTE').length : 0
  const tardanzas = Array.isArray(asistencias) ? asistencia.filter(a => a.estado === 'TARDANZA').length : 0

  const navItems = [
    { to: '/empleado/dashboard', icon: 'bi-house', label: 'Inicio' },
    { to: '/empleado/asistencia', icon: 'bi-clock', label: 'Asistencia' },
    { to: '/empleado/mis-asistencias', icon: 'bi-calendar-check', label: 'Mis Asistencias', active: true },
    { to: '/empleado/licencias', icon: 'bi-calendar', label: 'Licencias' },
    { to: '/empleado/solicitar-licencia', icon: 'bi-plus-circle', label: 'Solicitar' },
    { to: '/empleado/perfil', icon: 'bi-person', label: 'Mi Perfil' },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-green">
              <i className="bi bi-person-badge"></i>
            </div>
            <span className="font-semibold text-gray-800">Empleado</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-500">
            <i className="bi bi-x-lg text-xl"></i>
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${item.active ? 'text-white bg-gradient-green' : 'text-gray-600 hover:bg-gray-100'}`}>
              <i className={`bi ${item.icon}`}></i>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 w-full">
            <i className="bi bi-box-arrow-right"></i>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)}></div>}

      <main className="flex-1 p-4 md:p-8">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Mis Asistencias</h1>
            <p className="text-gray-500 text-sm">Historial de registros</p>
          </div>
          <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-600 p-2">
            <i className="bi bi-list text-2xl"></i>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                <i className="bi bi-calendar-check"></i>
              </div>
              <div>
                <p className="text-xs text-gray-500">Total</p>
                <p className="text-xl font-bold text-gray-800">{asistencias.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                <i className="bi bi-check-circle"></i>
              </div>
              <div>
                <p className="text-xs text-gray-500">Presentes</p>
                <p className="text-xl font-bold text-gray-800">{presentes}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-600">
                <i className="bi bi-exclamation-circle"></i>
              </div>
              <div>
                <p className="text-xs text-gray-500">Tardanzas</p>
                <p className="text-xl font-bold text-gray-800">{tardanzas}</p>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        ) : asistencia.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center text-3xl text-gray-300">
              <i className="bi bi-inbox"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No hay registros</h3>
            <p className="text-gray-500 mb-4">No tienes asistencias registradas</p>
            <Link to="/empleado/asistencia" className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <i className="bi bi-plus-lg"></i> Registrar Asistencia
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-3 md:px-4 py-3 text-left text-sm font-semibold text-gray-600">Fecha</th>
                    <th className="px-3 md:px-4 py-3 text-left text-sm font-semibold text-gray-600">Entrada</th>
                    <th className="px-3 md:px-4 py-3 text-left text-sm font-semibold text-gray-600">Salida</th>
                    <th className="px-3 md:px-4 py-3 text-left text-sm font-semibold text-gray-600">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {asistencias.map((asistencia) => (
                    <tr key={asistencia.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-3 md:px-4 py-3 text-gray-700 text-sm">{asistencia.fechaAsistencia || '-'}</td>
                      <td className="px-3 md:px-4 py-3 text-gray-700 text-sm">{asistencia.hora_entrada || '-'}</td>
                      <td className="px-3 md:px-4 py-3 text-gray-700 text-sm">{asistencia.hora_salida || '-'}</td>
                      <td className="px-3 md:px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoBadge(asistencia.estado)}`}>
                          {getEstadoLabel(asistencia.estado)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default MisAsistencias
