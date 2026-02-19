import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const DashboardEmpleado = () => {
  const navigate = useNavigate()
  const [empleado, setEmpleado] = useState(null)

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
    { to: '/empleado/asistencia', icon: 'bi-clock', label: 'Marcar Asistencia' },
    { to: '/empleado/mis-asistencias', icon: 'bi-calendar-check', label: 'Mis Asistencias' },
    { to: '/empleado/licencias', icon: 'bi-calendar', label: 'Mis Licencias' },
    { to: '/empleado/solicitar-licencia', icon: 'bi-plus-circle', label: 'Solicitar Licencia' },
    { to: '/empleado/perfil', icon: 'bi-person', label: 'Mi Perfil' },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-green">
              <i className="bi bi-person-badge"></i>
            </div>
            <span className="font-semibold text-gray-800">Empleado</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${item.active ? 'text-white bg-gradient-green' : 'text-gray-600 hover:bg-gray-100'}`}>
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

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Bienvenido, {empleado?.nombre || 'Empleado'}</h1>
          <p className="text-gray-500">{getCurrentDate()}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link to="/empleado/asistencia" className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl bg-gradient-green"><i className="bi bi-clock-fill"></i></div>
              <div>
                <div className="font-semibold text-gray-800">Asistencia</div>
                <div className="text-sm text-gray-500">Registra tu asistencia diaria</div>
              </div>
            </div>
          </Link>
          <Link to="/empleado/licencias" className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl bg-gradient-yellow"><i className="bi bi-calendar-check-fill"></i></div>
              <div>
                <div className="font-semibold text-gray-800">Mis Licencias</div>
                <div className="text-sm text-gray-500">Ver licencias solicitadas</div>
              </div>
            </div>
          </Link>
          <Link to="/empleado/perfil" className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl bg-gradient-purple"><i className="bi bi-person-fill"></i></div>
              <div>
                <div className="font-semibold text-gray-800">Mi Perfil</div>
                <div className="text-sm text-gray-500">Actualizar mis datos</div>
              </div>
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-blue"><i className="bi bi-info-circle"></i></div>
            <h3 className="font-semibold text-gray-800">Información Importante</h3>
          </div>
          <p className="text-gray-600">Recuerda marcar tu asistencia diariamente. Si tienes alguna consulta sobre tus licencias o permisos, contacta al área de recursos humanos.</p>
        </div>
      </main>
    </div>
  )
}

export default DashboardEmpleado

