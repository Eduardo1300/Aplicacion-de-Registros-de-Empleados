import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../../services/api'

const MisAsistencias = () => {
  const navigate = useNavigate()
  const [asistencias, setAsistencias] = useState([])
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('empleadoToken')
    if (!token) { navigate('/empleado/login'); return }
    loadAsistencias()
  }, [navigate])

  const loadAsistencias = async () => {
    try {
      setLoading(true)
      const response = await api.getMisAsistencias()
      setAsistencias(response.data || [])
    } catch (err) { console.error('Error:', err) }
    finally { setLoading(false) }
  }

  const logout = () => { localStorage.removeItem('empleadoToken'); localStorage.removeItem('empleado'); navigate('/empleado/login') }

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
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Mis Asistencias</h1>
          <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-600 p-2">
            <i className="bi bi-list text-2xl"></i>
          </button>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12"><div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div></div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="bg-gray-50">
                  <th className="px-3 md:px-4 py-3 text-left text-sm font-semibold text-gray-600">Fecha</th>
                  <th className="px-3 md:px-4 py-3 text-left text-sm font-semibold text-gray-600">Entrada</th>
                  <th className="px-3 md:px-4 py-3 text-left text-sm font-semibold text-gray-600">Salida</th>
                  <th className="px-3 md:px-4 py-3 text-left text-sm font-semibold text-gray-600">Tipo</th>
                </tr></thead>
                <tbody>
                  {asistencias.map((asistencia) => (
                    <tr key={asistencia.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-3 md:px-4 py-3 text-gray-700 text-sm">{asistencia.fechaAsistencia}</td>
                      <td className="px-3 md:px-4 py-3 text-gray-700 text-sm">{asistencia.hora_entrada || '-'}</td>
                      <td className="px-3 md:px-4 py-3 text-gray-700 text-sm">{asistencia.hora_salida || '-'}</td>
                      <td className="px-3 md:px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${asistencia.estado === 'PRESENTE' ? 'bg-green-100 text-green-700' : asistencia.estado === 'TARDANZA' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>{asistencia.estado}</span></td>
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
