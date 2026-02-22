import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../../services/api'

const MarcarAsistencia = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [tipo, setTipo] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('empleadoToken')
    if (!token) navigate('/empleado/login')
  }, [navigate])

  const marcarAsistencia = async () => {
    setLoading(true)
    setMensaje('')
    try {
      await api.marcarEntrada()
      setMensaje('Asistencia marcada exitosamente')
      setTipo('success')
    } catch (err) {
      setMensaje(err.response?.data?.message || 'Error al marcar asistencia')
      setTipo('error')
    } finally { setLoading(false) }
  }

  const logout = () => {
    localStorage.removeItem('empleadoToken')
    localStorage.removeItem('empleado')
    navigate('/empleado/login')
  }

  const navItems = [
    { to: '/empleado/dashboard', icon: 'bi-house', label: 'Inicio' },
    { to: '/empleado/asistencia', icon: 'bi-clock', label: 'Asistencia', active: true },
    { to: '/empleado/mis-asistencias', icon: 'bi-calendar-check', label: 'Mis Asistencias' },
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
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Marcar Asistencia</h1>
          <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-600 p-2">
            <i className="bi bi-list text-2xl"></i>
          </button>
        </div>
        
        <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100 max-w-md mx-auto text-center">
          <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 rounded-full flex items-center justify-center text-4xl md:text-5xl text-white bg-gradient-green shadow-gradient-green">
            <i className="bi bi-clock-fill"></i>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Registro de Asistencia</h2>
          <p className="text-gray-500 mb-4 md:mb-6 text-sm md:text-base">{new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <button onClick={marcarAsistencia} disabled={loading}
            className="w-full py-3 md:py-4 rounded-xl text-white font-semibold text-base md:text-lg disabled:opacity-70 flex items-center justify-center gap-2 bg-gradient-green shadow-gradient-green">
            {loading ? (<><span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> Registrando...</>) : (<><i className="bi bi-check-circle"></i> Marcar Asistencia</>)}
          </button>

          {mensaje && (
            <div className={`mt-4 p-3 rounded-xl ${tipo === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {mensaje}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default MarcarAsistencia
