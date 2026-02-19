import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../../services/api'

const MarcarAsistencia = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [tipo, setTipo] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('empleadoToken')
    if (!token) navigate('/empleado/login')
  }, [navigate])

  const marcarAsistencia = async () => {
    setLoading(true)
    setMensaje('')
    try {
      const empleado = JSON.parse(localStorage.getItem('empleado'))
      const data = { empleadoId: empleado.id, fecha: new Date().toISOString().split('T')[0], horaEntrada: new Date().toTimeString().split(' ')[0].slice(0, 5), tipo: 'Presente' }
      await api.createAsistencia(data)
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
          <Link to="/empleado/asistencia" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white bg-gradient-green"><i className="bi bi-clock"></i><span>Marcar Asistencia</span></Link>
          <Link to="/empleado/mis-asistencias" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100"><i className="bi bi-calendar-check"></i><span>Mis Asistencias</span></Link>
          <Link to="/empleado/licencias" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100"><i className="bi bi-calendar"></i><span>Mis Licencias</span></Link>
          <Link to="/empleado/solicitar-licencia" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100"><i className="bi bi-plus-circle"></i><span>Solicitar Licencia</span></Link>
          <Link to="/empleado/perfil" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100"><i className="bi bi-person"></i><span>Mi Perfil</span></Link>
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 w-full"><i className="bi bi-box-arrow-right"></i><span>Cerrar Sesión</span></button>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Marcar Asistencia</h1>
        
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 max-w-md mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-5xl text-white bg-gradient-green shadow-gradient-green">
            <i className="bi bi-clock-fill"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Registro de Asistencia</h2>
          <p className="text-gray-500 mb-6">{new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <button onClick={marcarAsistencia} disabled={loading}
            className="w-full py-4 rounded-xl text-white font-semibold text-lg disabled:opacity-70 flex items-center justify-center gap-2 bg-gradient-green shadow-gradient-green">
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

