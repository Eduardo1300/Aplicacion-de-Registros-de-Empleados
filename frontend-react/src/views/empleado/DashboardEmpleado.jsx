import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SaldoLicencias from '../../components/SaldoLicencias'

const DashboardEmpleado = () => {
  const navigate = useNavigate()
  const [empleado, setEmpleado] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('empleadoToken')
    if (!token) { navigate('/empleado/login'); return }
    const emp = localStorage.getItem('empleado')
    if (emp) setEmpleado(JSON.parse(emp))
  }, [navigate])

  const getCurrentDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date().toLocaleDateString('es-ES', options)
  }

  const logout = () => {
    localStorage.removeItem('empleadoToken')
    localStorage.removeItem('empleado')
    navigate('/empleado/login')
  }

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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Bienvenido, {empleado?.nombre || 'Empleado'}</h1>
            <p className="text-gray-500 text-sm">{getCurrentDate()}</p>
          </div>
          <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-600 p-2">
            <i className="bi bi-list text-2xl"></i>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 md:mb-8">
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link to="/empleado/asistencia" className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-white text-xl bg-gradient-green"><i className="bi bi-clock-fill"></i></div>
                  <div>
                    <div className="font-semibold text-gray-800">Asistencia</div>
                    <div className="text-sm text-gray-500 hidden sm:block">Registra tu asistencia</div>
                  </div>
                </div>
              </Link>
              <Link to="/empleado/licencias" className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-white text-xl bg-gradient-yellow"><i className="bi bi-calendar-check-fill"></i></div>
                  <div>
                    <div className="font-semibold text-gray-800">Mis Licencias</div>
                    <div className="text-sm text-gray-500 hidden sm:block">Ver licencias</div>
                  </div>
                </div>
              </Link>
              <Link to="/empleado/perfil" className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-white text-xl bg-gradient-purple"><i className="bi bi-person-fill"></i></div>
                  <div>
                    <div className="font-semibold text-gray-800">Mi Perfil</div>
                    <div className="text-sm text-gray-500 hidden sm:block">Actualizar datos</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <SaldoLicencias diasDisponibles={12} diasUsados={8} diasTotales={20} />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-blue"><i className="bi bi-info-circle"></i></div>
            <h3 className="font-semibold text-gray-800">Información Importante</h3>
          </div>
          <p className="text-gray-600 text-sm md:text-base">Recuerda marcar tu asistencia diariamente. Si tienes alguna consulta sobre tus licencias o permisos, contacta al área de recursos humanos.</p>
        </div>
      </main>
    </div>
  )
}

export default DashboardEmpleado
