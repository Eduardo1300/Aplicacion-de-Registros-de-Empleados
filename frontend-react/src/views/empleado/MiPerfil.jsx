import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const MiPerfil = () => {
  const navigate = useNavigate()
  const [empleado, setEmpleado] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('empleadoToken')
    const emp = localStorage.getItem('empleado')
    if (!token || !emp) { navigate('/empleado/login'); return }
    setEmpleado(JSON.parse(emp))
  }, [navigate])

  const logout = () => {
    localStorage.removeItem('empleadoToken')
    localStorage.removeItem('empleado')
    navigate('/empleado/login')
  }

  const navItems = [
    { to: '/empleado/dashboard', icon: 'bi-house', label: 'Inicio' },
    { to: '/empleado/asistencia', icon: 'bi-clock', label: 'Asistencia' },
    { to: '/empleado/mis-asistencias', icon: 'bi-calendar-check', label: 'Mis Asistencias' },
    { to: '/empleado/licencias', icon: 'bi-calendar', label: 'Licencias' },
    { to: '/empleado/solicitar-licencia', icon: 'bi-plus-circle', label: 'Solicitar' },
    { to: '/empleado/perfil', icon: 'bi-person', label: 'Mi Perfil', active: true },
  ]

  if (!empleado) return null

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
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Mi Perfil</h1>
          <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-600 p-2">
            <i className="bi bi-list text-2xl"></i>
          </button>
        </div>

        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 max-w-xl">
          <div className="text-center mb-4 md:mb-6">
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 md:mb-4 rounded-full flex items-center justify-center text-2xl md:text-3xl text-white font-bold bg-gradient-green">
              {empleado.nombre?.[0]}{empleado.apellido?.[0]}
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">{empleado.nombre} {empleado.apellido}</h2>
            <p className="text-gray-500 text-sm">{empleado.cargo?.nombre || 'Empleado'}</p>
          </div>

          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-600 bg-gray-200 shrink-0"><i className="bi bi-person"></i></div>
              <div><p className="text-xs md:text-sm text-gray-500">DNI</p><p className="font-semibold text-gray-800 text-sm md:text-base">{empleado.dni}</p></div>
            </div>
            <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-600 bg-gray-200 shrink-0"><i className="bi bi-envelope"></i></div>
              <div><p className="text-xs md:text-sm text-gray-500">Correo</p><p className="font-semibold text-gray-800 text-sm md:text-base">{empleado.correo || 'No registrado'}</p></div>
            </div>
            <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-600 bg-gray-200 shrink-0"><i className="bi bi-building"></i></div>
              <div><p className="text-xs md:text-sm text-gray-500">Departamento</p><p className="font-semibold text-gray-800 text-sm md:text-base">{empleado.departamento?.nombre || 'No asignado'}</p></div>
            </div>
            <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-600 bg-gray-200 shrink-0"><i className="bi bi-toggle-on"></i></div>
              <div><p className="text-xs md:text-sm text-gray-500">Estado</p><span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">{empleado.estado}</span></div>
            </div>
          </div>

          <button onClick={logout} className="w-full mt-4 md:mt-6 py-3 rounded-xl text-red-600 font-semibold hover:bg-red-50 flex items-center justify-center gap-2">
            <i className="bi bi-box-arrow-right"></i> Cerrar Sesión
          </button>
        </div>
      </main>
    </div>
  )
}

export default MiPerfil
