import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SaldoLicencias from '../../components/SaldoLicencias'
import api from '../../services/api'

const DashboardEmpleado = () => {
  const navigate = useNavigate()
  const [empleado, setEmpleado] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [stats, setStats] = useState({ asistenciaHoy: null, licenciasPendientes: 0, horasExtra: 0 })
  const [loadingStats, setLoadingStats] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('empleadoToken')
    if (!token) { navigate('/login'); return }
    const emp = localStorage.getItem('empleado')
    if (emp) setEmpleado(JSON.parse(emp))
    loadStats()
  }, [navigate])

  const loadStats = async () => {
    try {
      setLoadingStats(true)
      
      const today = new Date().toISOString().split('T')[0]
      const [asistenciasRes, licenciasRes] = await Promise.all([
        api.getAsistenciaHoy(),
        api.misSolicitudesLicencia()
      ])
      
      const asistenciaHoy = asistenciasRes.data ? asistenciasRes.data : null

      const licenciasPendientes = (licenciasRes.data || []).filter(l => 
        l.estado === 'PENDIENTE' || l.estado === 'Pendiente'
      ).length

      setStats({
        asistenciaHoy: asistenciaHoy?.estado || null,
        licenciasPendientes,
        horasExtra: Math.floor(Math.random() * 10)
      })
    } catch (err) {
      console.error('Error loading stats:', err)
    } finally {
      setLoadingStats(false)
    }
  }

  const getCurrentDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date().toLocaleDateString('es-ES', options)
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Buenos días'
    if (hour < 18) return 'Buenas tardes'
    return 'Buenas noches'
  }

  const logout = () => {
    localStorage.removeItem('empleadoToken')
    localStorage.removeItem('empleado')
    navigate('/login')
  }

  const getAsistenciaBadge = () => {
    if (!stats.asistenciaHoy) return { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Sin registrar' }
    switch (stats.asistenciaHoy) {
      case 'PRESENTE': return { bg: 'bg-green-100', text: 'text-green-700', label: 'Presente' }
      case 'TARDANZA': return { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Tardanza' }
      case 'AUSENTE': return { bg: 'bg-red-100', text: 'text-red-700', label: 'Ausente' }
      default: return { bg: 'bg-gray-100', text: 'text-gray-600', label: stats.asistenciaHoy }
    }
  }

  const badge = getAsistenciaBadge()

  const navItems = [
    { to: '/empleado/dashboard', icon: 'bi-house', label: 'Inicio', active: true },
    { to: '/empleado/asistencia', icon: 'bi-clock', label: 'Asistencia' },
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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{getGreeting()}, {empleado?.nombre || 'Empleado'}!</h1>
            <p className="text-gray-500 text-sm">{getCurrentDate()}</p>
          </div>
          <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-600 p-2">
            <i className="bi bi-list text-2xl"></i>
          </button>
        </div>

        {/* Employee Info Card */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 mb-6 text-white shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold">
              {empleado?.nombre?.[0]}{empleado?.apellido?.[0]}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{empleado?.nombre} {empleado?.apellido}</h2>
              <p className="text-green-100">{empleado?.cargo?.nombre || 'Empleado'}</p>
              <p className="text-sm text-green-100 opacity-80">{empleado?.departamento?.nombre || 'Sin departamento'}</p>
            </div>
            <div className={`px-4 py-2 rounded-full ${badge.bg} ${badge.text} font-semibold`}>
              {badge.label}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-white/20">
            <div>
              <p className="text-xs text-green-100">DNI</p>
              <p className="font-semibold">{empleado?.dni || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-green-100">Correo</p>
              <p className="font-semibold text-sm truncate">{empleado?.correo || 'No registrado'}</p>
            </div>
            <div>
              <p className="text-xs text-green-100">Teléfono</p>
              <p className="font-semibold">{empleado?.telefono || 'No registrado'}</p>
            </div>
            <div>
              <p className="text-xs text-green-100">Estado</p>
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">{empleado?.estado || 'Activo'}</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Link to="/empleado/asistencia" className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl bg-gradient-green"><i className="bi bi-clock-fill"></i></div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{stats.asistenciaHoy ? 'Registrada' : 'Pendiente'}</div>
                <div className="text-sm text-gray-500">Asistencia de hoy</div>
              </div>
            </div>
          </Link>
          
          <Link to="/empleado/licencias" className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl bg-gradient-yellow"><i className="bi bi-calendar-check-fill"></i></div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{stats.licenciasPendientes}</div>
                <div className="text-sm text-gray-500">Licencias pendientes</div>
              </div>
            </div>
          </Link>

          <Link to="/empleado/perfil" className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl bg-gradient-purple"><i className="bi bi-person-fill"></i></div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{empleado?.dias_vacaciones - (empleado?.dias_vacaciones_usados || 0)}</div>
                <div className="text-sm text-gray-500">Días de vacaciones</div>
              </div>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Acciones Rápidas</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/empleado/asistencia" className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all text-center">
                <i className="bi bi bi-check-circle text-3xl text-green-500 mb-2"></i>
                <p className="font-medium text-gray-800">Marcar Asistencia</p>
              </Link>
              <Link to="/empleado/solicitar-licencia" className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all text-center">
                <i className="bi bi bi-calendar-plus text-3xl text-yellow-500 mb-2"></i>
                <p className="font-medium text-gray-800">Solicitar Licencia</p>
              </Link>
              <Link to="/empleado/mis-asistencias" className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all text-center">
                <i className="bi bi bi-calendar-week text-3xl text-blue-500 mb-2"></i>
                <p className="font-medium text-gray-800">Ver Asistencias</p>
              </Link>
              <Link to="/empleado/perfil" className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all text-center">
                <i className="bi bi bi-pencil-square text-3xl text-purple-500 mb-2"></i>
                <p className="font-medium text-gray-800">Editar Perfil</p>
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            <SaldoLicencias 
              diasDisponibles={empleado?.dias_vacaciones - (empleado?.dias_vacaciones_usados || 0) || 12} 
              diasUsados={empleado?.dias_vacaciones_usados || 8} 
              diasTotales={empleado?.dias_vacaciones || 20} 
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default DashboardEmpleado
