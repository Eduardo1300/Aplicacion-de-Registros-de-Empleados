import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../../services/api'
import { useToast } from '../../context/ToastContext'

const MiPerfil = () => {
  const navigate = useNavigate()
  const { success, error } = useToast()
  const [empleado, setEmpleado] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    correo: '',
    telefono: ''
  })

  useEffect(() => {
    const token = localStorage.getItem('empleadoToken')
    const emp = localStorage.getItem('empleado')
    if (!token || !emp) { navigate('/login'); return }
    const parsedEmp = JSON.parse(emp)
    setEmpleado(parsedEmp)
    setFormData({
      correo: parsedEmp.correo || '',
      telefono: parsedEmp.telefono || ''
    })
  }, [navigate])

  const logout = () => {
    localStorage.removeItem('empleadoToken')
    localStorage.removeItem('empleado')
    navigate('/login')
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      await api.updatePerfil(formData)
      const updatedEmp = { ...empleado, ...formData }
      setEmpleado(updatedEmp)
      localStorage.setItem('empleado', JSON.stringify(updatedEmp))
      success('Perfil actualizado correctamente')
      setEditMode(false)
    } catch (err) {
      error('Error al actualizar perfil')
    } finally {
      setLoading(false)
    }
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-800">Información Personal</h2>
              {!editMode && (
                <button onClick={() => setEditMode(true)} className="text-green-600 hover:text-green-700 text-sm font-medium">
                  <i className="bi bi-pencil mr-1"></i> Editar
                </button>
              )}
            </div>

            <div className="text-center mb-6">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl text-white font-bold bg-gradient-green">
                {empleado.nombre?.[0]}{empleado.apellido?.[0]}
              </div>
              <h3 className="text-xl font-bold text-gray-800">{empleado.nombre} {empleado.apellido}</h3>
              <p className="text-gray-500">{empleado.cargo?.nombre || 'Empleado'}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">{empleado.estado}</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-600 bg-gray-200"><i className="bi bi-credit-card"></i></div>
                <div><p className="text-xs text-gray-500">DNI</p><p className="font-semibold text-gray-800">{empleado.dni}</p></div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-600 bg-gray-200"><i className="bi bi-envelope"></i></div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Correo electrónico</p>
                  {editMode ? (
                    <input type="email" value={formData.correo} onChange={(e) => setFormData({...formData, correo: e.target.value})}
                      className="w-full px-2 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="correo@email.com" />
                  ) : (
                    <p className="font-semibold text-gray-800">{empleado.correo || 'No registrado'}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-600 bg-gray-200"><i className="bi bi-telephone"></i></div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Teléfono</p>
                  {editMode ? (
                    <input type="tel" value={formData.telefono} onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                      className="w-full px-2 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="951123456" />
                  ) : (
                    <p className="font-semibold text-gray-800">{empleado.telefono || 'No registrado'}</p>
                  )}
                </div>
              </div>
            </div>

            {editMode && (
              <div className="flex gap-3 mt-6">
                <button onClick={() => setEditMode(false)} className="flex-1 py-2 px-4 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50">
                  Cancelar
                </button>
                <button onClick={handleSave} disabled={loading} className="flex-1 py-2 px-4 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50">
                  {loading ? 'Guardando...' : 'Guardar cambios'}
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Información Laboral</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-600 bg-gray-200"><i className="bi bi-building"></i></div>
                  <div><p className="text-xs text-gray-500">Departamento</p><p className="font-semibold text-gray-800">{empleado.departamento?.nombre || 'No asignado'}</p></div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-600 bg-gray-200"><i className="bi bi-briefcase"></i></div>
                  <div><p className="text-xs text-gray-500">Cargo</p><p className="font-semibold text-gray-800">{empleado.cargo?.nombre || 'Sin cargo'}</p></div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-600 bg-gray-200"><i className="bi bi-calendar-plus"></i></div>
                  <div><p className="text-xs text-gray-500">Fecha de Ingreso</p><p className="font-semibold text-gray-800">{empleado.fecha_ingreso || 'No registrada'}</p></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Vacaciones</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-green-600 bg-green-100"><i className="bi bi-calendar-check"></i></div>
                    <div><p className="text-sm text-gray-500">Días disponibles</p><p className="font-bold text-green-600 text-lg">{empleado.dias_vacaciones - (empleado.dias_vacaciones_usados || 0)}</p></div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-yellow-600 bg-yellow-100"><i className="bi bi-calendar-minus"></i></div>
                    <div><p className="text-sm text-gray-500">Días usados</p><p className="font-bold text-yellow-600 text-lg">{empleado.dias_vacaciones_usados || 0}</p></div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-blue-600 bg-blue-100"><i className="bi bi-calendar3"></i></div>
                    <div><p className="text-sm text-gray-500">Total días anuales</p><p className="font-bold text-blue-600 text-lg">{empleado.dias_vacaciones || 0}</p></div>
                  </div>
                </div>
              </div>
            </div>

            <button onClick={logout} className="w-full py-3 rounded-xl text-red-600 font-semibold hover:bg-red-50 flex items-center justify-center gap-2 bg-white shadow-sm border border-gray-100">
              <i className="bi bi-box-arrow-right"></i> Cerrar Sesión
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default MiPerfil
