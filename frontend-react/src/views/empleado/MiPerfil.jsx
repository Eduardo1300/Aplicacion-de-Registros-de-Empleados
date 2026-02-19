import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const MiPerfil = () => {
  const navigate = useNavigate()
  const [empleado, setEmpleado] = useState(null)

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

  if (!empleado) return null

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-green"><i className="bi bi-person-badge"></i></div>
            <span className="font-semibold text-gray-800">Empleado</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link to="/empleado/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100"><i className="bi bi-house"></i><span>Inicio</span></Link>
          <Link to="/empleado/asistencia" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100"><i className="bi bi-clock"></i><span>Marcar Asistencia</span></Link>
          <Link to="/empleado/mis-asistencias" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100"><i className="bi bi-calendar-check"></i><span>Mis Asistencias</span></Link>
          <Link to="/empleado/licencias" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100"><i className="bi bi-calendar"></i><span>Mis Licencias</span></Link>
          <Link to="/empleado/solicitar-licencia" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100"><i className="bi bi-plus-circle"></i><span>Solicitar Licencia</span></Link>
          <Link to="/empleado/perfil" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white bg-gradient-green"><i className="bi bi-person"></i><span>Mi Perfil</span></Link>
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 w-full"><i className="bi bi-box-arrow-right"></i><span>Cerrar Sesión</span></button>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Mi Perfil</h1>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 max-w-xl">
          <div className="text-center mb-6">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl text-white font-bold bg-gradient-green">
              {empleado.nombre?.[0]}{empleado.apellido?.[0]}
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{empleado.nombre} {empleado.apellido}</h2>
            <p className="text-gray-500">{empleado.cargo?.nombre || 'Empleado'}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-600 bg-gray-200"><i className="bi bi-person"></i></div>
              <div><p className="text-sm text-gray-500">DNI</p><p className="font-semibold text-gray-800">{empleado.dni}</p></div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-600 bg-gray-200"><i className="bi bi-envelope"></i></div>
              <div><p className="text-sm text-gray-500">Correo</p><p className="font-semibold text-gray-800">{empleado.correo || 'No registrado'}</p></div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-600 bg-gray-200"><i className="bi bi-building"></i></div>
              <div><p className="text-sm text-gray-500">Departamento</p><p className="font-semibold text-gray-800">{empleado.departamento?.nombre || 'No asignado'}</p></div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-600 bg-gray-200"><i className="bi bi-toggle-on"></i></div>
              <div><p className="text-sm text-gray-500">Estado</p><span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">{empleado.estado}</span></div>
            </div>
          </div>

          <button onClick={logout} className="w-full mt-6 py-3 rounded-xl text-red-600 font-semibold hover:bg-red-50 flex items-center justify-center gap-2">
            <i className="bi bi-box-arrow-right"></i> Cerrar Sesión
          </button>
        </div>
      </main>
    </div>
  )
}

export default MiPerfil

