import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../../services/api'

const MisAsistencias = () => {
  const navigate = useNavigate()
  const [asistencias, setAsistencias] = useState([])
  const [loading, setLoading] = useState(true)

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
          <Link to="/empleado/mis-asistencias" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white bg-gradient-green"><i className="bi bi-calendar-check"></i><span>Mis Asistencias</span></Link>
          <Link to="/empleado/licencias" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100"><i className="bi bi-calendar"></i><span>Mis Licencias</span></Link>
          <Link to="/empleado/solicitar-licencia" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100"><i className="bi bi-plus-circle"></i><span>Solicitar Licencia</span></Link>
          <Link to="/empleado/perfil" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100"><i className="bi bi-person"></i><span>Mi Perfil</span></Link>
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 w-full"><i className="bi bi-box-arrow-right"></i><span>Cerrar Sesión</span></button>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Mis Asistencias</h1>
        {loading ? (
          <div className="flex justify-center py-12"><div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div></div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead><tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Fecha</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Entrada</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Salida</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Tipo</th>
              </tr></thead>
              <tbody>
                {asistencias.map((asistencia) => (
                  <tr key={asistencia.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-700">{asistencia.fechaAsistencia}</td>
                    <td className="px-4 py-3 text-gray-700">{asistencia.hora_entrada || '-'}</td>
                    <td className="px-4 py-3 text-gray-700">{asistencia.hora_salida || '-'}</td>
                    <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${asistencia.estado === 'PRESENTE' ? 'bg-green-100 text-green-700' : asistencia.estado === 'TARDANZA' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>{asistencia.estado}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}

export default MisAsistencias

