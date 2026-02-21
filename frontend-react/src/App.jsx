import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Router from './router'

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [location])

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    localStorage.removeItem('empleadoToken')
    localStorage.removeItem('empleado')
    setIsLoggedIn(false)
    navigate('/login')
  }

  const showNavbar = isLoggedIn && !location.pathname.startsWith('/empleado') && !location.pathname.startsWith('/login')

  return (
    <div id="app">
      {showNavbar && (
        <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center gap-2 text-white font-semibold text-lg">
                <i className="bi bi-people-fill text-xl"></i>
                Sistema de Empleados
              </Link>
              <div className="hidden md:flex items-center gap-1">
                <Link to="/empleados" className={`px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-colors ${location.pathname === '/empleados' ? 'bg-white/20' : ''}`}>
                  <i className="bi bi-people mr-2"></i>Empleados
                </Link>
                <Link to="/asistencias" className={`px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-colors ${location.pathname === '/asistencias' ? 'bg-white/20' : ''}`}>
                  <i className="bi bi-clock mr-2"></i>Asistencias
                </Link>
                <Link to="/licencias" className={`px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-colors ${location.pathname === '/licencias' ? 'bg-white/20' : ''}`}>
                  <i className="bi bi-calendar mr-2"></i>Licencias
                </Link>
                <Link to="/auditoria" className={`px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-colors ${location.pathname === '/auditoria' ? 'bg-white/20' : ''}`}>
                  <i className="bi bi-clock-history mr-2"></i>Auditoria
                </Link>
                <Link to="/graficos" className={`px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-colors ${location.pathname === '/graficos' ? 'bg-white/20' : ''}`}>
                  <i className="bi bi-graph-up mr-2"></i>Graficos
                </Link>
                <button onClick={logout} className="ml-4 px-4 py-2 rounded-lg border border-white/30 text-white hover:bg-white/10 transition-colors text-sm">
                  <i className="bi bi-box-arrow-right mr-1"></i>Salir
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}
      
      <Router />
    </div>
  )
}

export default App
