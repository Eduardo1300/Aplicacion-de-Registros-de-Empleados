import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

const Dashboard = () => {
  const [stats, setStats] = useState({
    empleados: { total: 0, activos: 0, inactivos: 0 },
    asistencias: { presente: 0, ausente: 0, porcentajeAsistencia: 0, conPermiso: 0 },
    licencias: { pendiente: 0, aprobada: 0, rechazada: 0 }
  })
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const usuario = localStorage.getItem('usuario')
    if (usuario) {
      setUser(JSON.parse(usuario))
    }
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      setLoading(true)
      const response = await api.getEstadisticas()
      setStats(response.data)
    } catch (err) {
      console.error('Error cargando estadísticas:', err)
    } finally {
      setLoading(false)
    }
  }

  const getCurrentDay = () => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    return days[new Date().getDay()]
  }

  const getCurrentDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date().toLocaleDateString('es-ES', options)
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-start mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <span className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl bg-gradient-purple shadow-gradient-purple">
              <i className="bi bi-speedometer2"></i>
            </span>
            Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            <span className="text-gray-500">¡Buenos días!</span>
            <span className="text-purple-600 font-semibold ml-2">{user?.nombreUsuario}</span>
          </p>
        </div>
        <div className="bg-white px-5 py-3 rounded-xl flex items-center gap-3 shadow-sm border border-gray-100">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white bg-gradient-purple">
            <i className="bi bi-calendar3"></i>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-800">{getCurrentDay()}</span>
            <span className="text-xs text-gray-500">{getCurrentDate()}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full opacity-10 bg-purple-500"></div>
          <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl mb-4 bg-gradient-purple shadow-gradient-purple">
            <i className="bi bi-people-fill"></i>
          </div>
          <div className="text-4xl font-bold text-gray-800">{stats.empleados.total}</div>
          <div className="text-gray-500 text-sm mt-1">Total Empleados</div>
          <div className="mt-3 inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-green-100 text-green-700">
            <i className="bi bi-check-circle"></i>
            {stats.empleados.activos} activos
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full opacity-10 bg-green-500"></div>
          <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl mb-4 bg-gradient-green shadow-gradient-green">
            <i className="bi bi-clock-fill"></i>
          </div>
          <div className="text-4xl font-bold text-gray-800">{stats.asistencias.porcentajeAsistencia}%</div>
          <div className="text-gray-500 text-sm mt-1">Asistencia Hoy</div>
          <div className="mt-3 inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-green-100 text-green-700">
            <i className="bi bi-person-check"></i>
            {stats.asistencias.presente} presentes
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full opacity-10 bg-yellow-500"></div>
          <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl mb-4 bg-gradient-yellow shadow-gradient-yellow">
            <i className="bi bi-calendar-check-fill"></i>
          </div>
          <div className="text-4xl font-bold text-gray-800">{stats.licencias.pendiente}</div>
          <div className="text-gray-500 text-sm mt-1">Licencias Pendientes</div>
          <div className="mt-3 inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-yellow-100 text-yellow-700">
            <i className="bi bi-check-circle"></i>
            {stats.licencias.aprobada} aprobadas
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full opacity-10 bg-red-500"></div>
          <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl mb-4 bg-gradient-red shadow-red-500">
            <i className="bi bi-exclamation-circle-fill"></i>
          </div>
          <div className="text-4xl font-bold text-gray-800">{stats.asistencias.ausente}</div>
          <div className="text-gray-500 text-sm mt-1">Ausentes Hoy</div>
          <div className="mt-3 inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-red-100 text-red-700">
            <i className="bi bi-person-x"></i>
            {stats.asistencias.conPermiso} con permiso
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white bg-gradient-purple shadow-gradient-purple">
            <i className="bi bi-lightning-fill"></i>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Acciones Rápidas</h3>
            <p className="text-sm text-gray-500">Accede rápidamente a las funcionalidades principales</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/empleados" className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1 border-l-4 border-l-purple-500">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-purple-500 bg-purple-100">
                <i className="bi bi-person-plus-fill text-xl"></i>
              </div>
              <div>
                <div className="font-semibold text-gray-800">Nuevo Empleado</div>
                <div className="text-xs text-gray-500">Registrar empleado</div>
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-purple-500 hover:text-white transition-colors">
              <i className="bi bi-arrow-right"></i>
            </div>
          </Link>

          <Link to="/asistencias" className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1 border-l-4 border-l-green-500">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-green-500 bg-green-100">
                <i className="bi bi-clock-history text-xl"></i>
              </div>
              <div>
                <div className="font-semibold text-gray-800">Registrar Asistencia</div>
                <div className="text-xs text-gray-500">Control de presencia</div>
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-green-500 hover:text-white transition-colors">
              <i className="bi bi-arrow-right"></i>
            </div>
          </Link>

          <Link to="/licencias" className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1 border-l-4 border-l-yellow-500">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-yellow-500 bg-yellow-100">
                <i className="bi bi-calendar2-check text-xl"></i>
              </div>
              <div>
                <div className="font-semibold text-gray-800">Gestionar Licencias</div>
                <div className="text-xs text-gray-500">Aprobar o rechazar</div>
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-yellow-500 hover:text-white transition-colors">
              <i className="bi bi-arrow-right"></i>
            </div>
          </Link>

          <Link to="/empleados" className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1 border-l-4 border-l-blue-500">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-blue-500 bg-blue-100">
                <i className="bi bi-eye-fill text-xl"></i>
              </div>
              <div>
                <div className="font-semibold text-gray-800">Ver Todos</div>
                <div className="text-xs text-gray-500">Lista de empleados</div>
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-blue-500 hover:text-white transition-colors">
              <i className="bi bi-arrow-right"></i>
            </div>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 flex items-start gap-4 shadow-sm border border-gray-100">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl bg-gradient-green">
            <i className="bi bi-graph-up-arrow"></i>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Sistema Activo</h4>
            <p className="text-sm text-gray-500">Todos los módulos funcionando correctamente</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs text-gray-500">Operativo</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 flex items-start gap-4 shadow-sm border border-gray-100">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl bg-gradient-blue">
            <i className="bi bi-shield-check"></i>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Sesión Segura</h4>
            <p className="text-sm text-gray-500">Tu sesión está protegida y autorizada</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-xs text-gray-500">Protegido</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 flex items-start gap-4 shadow-sm border border-gray-100">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl bg-gradient-purple">
            <i className="bi bi-cpu"></i>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Rendimiento</h4>
            <p className="text-sm text-gray-500">Sistema funcionando de forma óptima</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-xs text-gray-500">Optimizado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

