import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Router from './router'

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('token')
  })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [location])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    localStorage.removeItem('empleadoToken')
    localStorage.removeItem('empleado')
    setIsLoggedIn(false)
    navigate('/login')
  }

  const showNavbar = isLoggedIn && !location.pathname.startsWith('/empleado/') && location.pathname !== '/login'

  const navLinks = [
    { to: '/empleados', icon: 'bi-people', label: 'Empleados', path: '/empleados' },
    { to: '/asistencias', icon: 'bi-clock', label: 'Asistencias', path: '/asistencias' },
    { to: '/licencias', icon: 'bi-calendar', label: 'Licencias', path: '/licencias' },
    { to: '/auditoria', icon: 'bi-clock-history', label: 'Auditoria', path: '/auditoria' },
    { to: '/graficos', icon: 'bi-graph-up', label: 'Graficos', path: '/graficos' },
  ]

  return (
    <div id="app">
      {showNavbar && (
        <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link to="/dashboard" className="flex items-center gap-2 text-white font-semibold text-lg">
                <i className="bi bi-people-fill text-xl"></i>
                <span className="hidden sm:inline">Sistema de Empleados</span>
              </Link>
              
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link key={link.to} to={link.to} className={`px-3 py-2 rounded-lg text-white hover:bg-white/10 transition-colors text-sm ${location.pathname === link.path ? 'bg-white/20' : ''}`}>
                    <i className={`bi ${link.icon} mr-1`}></i>{link.label}
                  </Link>
                ))}
                <Link to="/login" className="px-3 py-2 rounded-lg text-white hover:bg-white/10 transition-colors text-sm">
                  <i className="bi bi-person-badge mr-1"></i>Portal
                </Link>
                <button className="relative px-3 py-2 rounded-lg text-white hover:bg-white/10 transition-colors text-sm">
                  <i className="bi bi-bell"></i>
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
                </button>
                <button onClick={logout} className="ml-2 px-3 py-2 rounded-lg border border-white/30 text-white hover:bg-white/10 transition-colors text-sm">
                  <i className="bi bi-box-arrow-right mr-1"></i><span className="hidden lg:inline">Salir</span>
                </button>
              </div>

              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white p-2">
                <i className={`bi ${mobileMenuOpen ? 'bi-x-lg' : 'bi-list'} text-2xl`}></i>
              </button>
            </div>

            {mobileMenuOpen && (
              <div className="md:hidden pb-4 space-y-1">
                {navLinks.map((link) => (
                  <Link key={link.to} to={link.to} className={`block px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-colors ${location.pathname === link.path ? 'bg-white/20' : ''}`}>
                    <i className={`bi ${link.icon} mr-2`}></i>{link.label}
                  </Link>
                ))}
                <Link to="/login" className="block px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-colors">
                  <i className="bi bi-person-badge mr-2"></i>Portal Empleado
                </Link>
                <button onClick={logout} className="w-full text-left px-4 py-2 rounded-lg border border-white/30 text-white hover:bg-white/10 transition-colors">
                  <i className="bi bi-box-arrow-right mr-2"></i>Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </nav>
      )}
      
      <Router />
    </div>
  )
}

export default App
