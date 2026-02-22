import { useState, useEffect } from 'react'
import api from '../services/api'
import { useToast } from '../context/ToastContext'
import { exportEmployeesToPDF } from '../utils/exportPDF'
import { exportEmployeesToExcel } from '../utils/exportExcel'

const Empleados = () => {
  const { success, error } = useToast()
  const [empleados, setEmpleados] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [empleadoToDelete, setEmpleadoToDelete] = useState(null)
  const [editingEmpleado, setEditingEmpleado] = useState(null)
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    correo: '',
    telefono: '',
    departamentoId: '',
    cargoId: '',
    estado: 'Activo',
    fechaIngreso: new Date().toISOString().split('T')[0]
  })
  const [departamentos, setDepartamentos] = useState([])
  const [cargos, setCargos] = useState([])

  useEffect(() => {
    loadEmpleados()
    loadDepartamentos()
    loadCargos()
  }, [])

  const loadEmpleados = async () => {
    try {
      setLoading(true)
      const response = await api.getEmpleados()
      setEmpleados(response.data)
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadDepartamentos = async () => {
    try {
      const response = await api.getDepartamentos()
      setDepartamentos(response.data)
    } catch (err) {
      console.error('Error:', err)
    }
  }

  const loadCargos = async () => {
    try {
      const response = await api.getCargos()
      setCargos(response.data)
    } catch (err) {
      console.error('Error:', err)
    }
  }

  const filteredEmpleados = empleados.filter(emp => {
    const query = searchQuery.toLowerCase()
    return (
      emp.nombre?.toLowerCase().includes(query) ||
      emp.apellido?.toLowerCase().includes(query) ||
      emp.dni?.includes(query) ||
      emp.correo?.toLowerCase().includes(query)
    )
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingEmpleado) {
        await api.updateEmpleado(editingEmpleado.id, formData)
        success('Empleado actualizado correctamente')
      } else {
        await api.createEmpleado(formData)
        success('Empleado creado correctamente')
      }
      loadEmpleados()
      setShowModal(false)
      resetForm()
    } catch (err) {
      error('Error al guardar empleado')
      console.error('Error:', err)
    }
  }

  const handleEdit = (empleado) => {
    setEditingEmpleado(empleado)
    setFormData({
      nombre: empleado.nombre,
      apellido: empleado.apellido,
      dni: empleado.dni,
      correo: empleado.correo || '',
      telefono: empleado.telefono || '',
      departamentoId: empleado.departamentoId || empleado.departamento?.id || '',
      cargoId: empleado.cargoId || empleado.cargo?.id || '',
      estado: empleado.estado,
      fechaIngreso: empleado.fechaIngreso ? new Date(empleado.fechaIngreso).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
    })
    setShowModal(true)
  }

  const handleDelete = (id) => {
    setEmpleadoToDelete(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    try {
      await api.deleteEmpleado(empleadoToDelete)
      loadEmpleados()
      success('Empleado eliminado correctamente')
      setShowDeleteModal(false)
      setEmpleadoToDelete(null)
    } catch (err) {
      error('Error al eliminar empleado')
      console.error('Error:', err)
    }
  }

  const handleExportPDF = () => {
    exportEmployeesToPDF(empleados)
    success('PDF exportado correctamente')
  }

  const handleExportExcel = () => {
    exportEmployeesToExcel(empleados)
    success('Excel exportado correctamente')
  }

  const resetForm = () => {
    setEditingEmpleado(null)
    setFormData({
      nombre: '',
      apellido: '',
      dni: '',
      correo: '',
      telefono: '',
      departamentoId: '',
      cargoId: '',
      estado: 'Activo',
      fechaIngreso: new Date().toISOString().split('T')[0]
    })
  }

  const getInitials = (nombre, apellido) => {
    return `${nombre?.[0] || ''}${apellido?.[0] || ''}`.toUpperCase()
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl bg-gradient-purple shadow-gradient-purple">
            <i className="bi bi-people-fill"></i>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Gestión de Empleados</h1>
            <p className="text-gray-500 text-sm">Administra la información de todos los empleados</p>
          </div>
        </div>
        <button onClick={() => { resetForm(); setShowModal(true); }} 
                className="px-4 py-2 rounded-lg text-white font-medium flex items-center gap-2 transition-all hover:shadow-lg bg-gradient-purple shadow-gradient-purple">
          <i className="bi bi-plus-lg"></i>
          Nuevo Empleado
        </button>
      </div>

      <div className="flex gap-4 mb-6 items-center flex-wrap">
        <div className="relative flex-1 max-w-md">
          <input 
            type="text" 
            placeholder="Buscar por nombre, DNI o correo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <i className="bi bi-x"></i>
            </button>
          )}
        </div>
        <div className="bg-white px-3 py-1 rounded-lg border border-gray-200">
          <span className="text-purple-600 font-semibold">{filteredEmpleados.length}</span>
          <span className="text-gray-500 text-sm ml-1">empleados</span>
        </div>
        <div className="flex gap-2">
          <button onClick={handleExportPDF} className="px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center gap-2">
            <i className="bi bi-file-earmark-pdf text-red-500"></i> PDF
          </button>
          <button onClick={handleExportExcel} className="px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center gap-2">
            <i className="bi bi-file-earmark-excel text-green-500"></i> Excel
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredEmpleados.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-4xl text-gray-300 bg-gray-100">
            <i className="bi bi-people"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No hay empleados registrados</h3>
          <p className="text-gray-500 mb-4">Comienza agregando tu primer empleado al sistema</p>
          <button onClick={() => setShowModal(true)} 
                  className="px-4 py-2 rounded-lg text-white inline-flex items-center gap-2 bg-gradient-purple">
            <i className="bi bi-plus-lg"></i> Crear Empleado
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">#</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Nombre Completo</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">DNI</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Correo</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Departamento</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Estado</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmpleados.map((empleado, index) => (
                <tr key={empleado.id} className={`border-t border-gray-100 hover:bg-gray-50 ${empleado.estado === 'Inactivo' ? 'opacity-60' : ''}`}>
                  <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold bg-gradient-purple">
                        {getInitials(empleado.nombre, empleado.apellido)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{empleado.nombre} {empleado.apellido}</div>
                        <div className="text-xs text-gray-500">{empleado.cargo?.nombre || 'Sin cargo'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-700">{empleado.dni}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{empleado.correo || '-'}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-lg text-xs font-medium bg-purple-100 text-purple-700">
                      {empleado.departamento?.nombre || '-'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${empleado.estado === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {empleado.estado}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(empleado)} 
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm hover:bg-gray-100" 
                              title="Editar">
                        <i className="bi bi-pencil text-gray-600"></i>
                      </button>
                      <button onClick={() => handleDelete(empleado.id)} 
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm hover:bg-red-50" 
                              title="Eliminar">
                        <i className="bi bi-trash text-red-500"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">{editingEmpleado ? 'Editar Empleado' : 'Nuevo Empleado'}</h3>
              <button onClick={() => setShowModal(false)} className="bg-transparent border-none text-2xl text-gray-500 cursor-pointer">
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input 
                    type="text" 
                    value={formData.nombre}
                    onChange={e => setFormData({...formData, nombre: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                  <input 
                    type="text" 
                    value={formData.apellido}
                    onChange={e => setFormData({...formData, apellido: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
                  <input 
                    type="text" 
                    value={formData.dni}
                    onChange={e => setFormData({...formData, dni: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Correo</label>
                  <input 
                    type="email" 
                    value={formData.correo}
                    onChange={e => setFormData({...formData, correo: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input 
                    type="text" 
                    value={formData.telefono}
                    onChange={e => setFormData({...formData, telefono: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
                  <select 
                    value={formData.departamentoId}
                    onChange={e => setFormData({...formData, departamentoId: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Seleccionar</option>
                    {departamentos.map(dept => (
                      <option key={dept.id} value={dept.id}>{dept.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
                  <select 
                    value={formData.cargoId}
                    onChange={e => setFormData({...formData, cargoId: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Seleccionar</option>
                    {cargos.map(cargo => (
                      <option key={cargo.id} value={cargo.id}>{cargo.nombre}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Ingreso</label>
                  <input 
                    type="date" 
                    value={formData.fechaIngreso}
                    onChange={e => setFormData({...formData, fechaIngreso: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                  <select 
                    value={formData.estado}
                    onChange={e => setFormData({...formData, estado: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 rounded-lg text-white bg-gradient-purple">
                  {editingEmpleado ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowDeleteModal(false)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                <i className="bi bi-exclamation-triangle text-3xl text-red-500"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Confirmar Eliminación</h3>
              <p className="text-gray-600 mb-6">¿Estás seguro de eliminar este empleado? El empleado será marcado como inactivo.</p>
              <div className="flex justify-center gap-3">
                <button onClick={() => setShowDeleteModal(false)} className="px-6 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
                  Cancelar
                </button>
                <button onClick={confirmDelete} className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600">
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Empleados

