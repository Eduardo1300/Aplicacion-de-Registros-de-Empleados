import axios from 'axios'

const API_URL = 'https://aplicacion-de-registros-de-empleados-production.up.railway.app/api'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

const empleadoClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

empleadoClient.interceptors.request.use(config => {
  const token = localStorage.getItem('empleadoToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => Promise.reject(error))

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => Promise.reject(error))

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('token')
          if (window.location.pathname !== '/login') {
            window.location.href = '/login'
          }
          break
        case 403:
          console.error('Acceso prohibido')
          break
        case 404:
          console.error('Recurso no encontrado')
          break
        case 500:
          console.error('Error del servidor')
          break
      }
    } else if (error.request) {
      console.error('Error de conexión: no se recibió respuesta del servidor')
    } else if (error.code === 'ECONNABORTED') {
      console.error('Timeout: la solicitud tardó demasiado')
    }
    return Promise.reject(error)
  }
)

export default {
  login: (credentials) => apiClient.post('/auth/login', credentials),
  register: (data) => apiClient.post('/auth/register', data),
  loginEmpleado: (credentials) => apiClient.post('/auth/login-empleado', credentials),

  getEmpleados: () => apiClient.get('/empleado'),
  getEmpleado: (id) => apiClient.get(`/empleado/${id}`),
  createEmpleado: (data) => apiClient.post('/empleado', data),
  updateEmpleado: (id, data) => apiClient.put(`/empleado/${id}`, data),
  deleteEmpleado: (id) => apiClient.delete(`/empleado/${id}`),

  getAsistencias: () => apiClient.get('/asistencia'),
  getAsistencia: (id) => apiClient.get(`/asistencia/${id}`),
  createAsistencia: (data) => apiClient.post('/asistencia', data),
  updateAsistencia: (id, data) => apiClient.put(`/asistencia/${id}`, data),
  deleteAsistencia: (id) => apiClient.delete(`/asistencia/${id}`),

  getDepartamentos: () => apiClient.get('/departamento'),
  getDepartamento: (id) => apiClient.get(`/departamento/${id}`),
  createDepartamento: (data) => apiClient.post('/departamento', data),
  updateDepartamento: (id, data) => apiClient.put(`/departamento/${id}`, data),
  deleteDepartamento: (id) => apiClient.delete(`/departamento/${id}`),

  getCargos: () => apiClient.get('/cargo'),
  getCargo: (id) => apiClient.get(`/cargo/${id}`),
  createCargo: (data) => apiClient.post('/cargo', data),
  updateCargo: (id, data) => apiClient.put(`/cargo/${id}`, data),
  deleteCargo: (id) => apiClient.delete(`/cargo/${id}`),

  getSolicitudesLicencia: () => apiClient.get('/solicitud-licencia'),
  getSolicitudLicencia: (id) => apiClient.get(`/solicitud-licencia/${id}`),
  createSolicitudLicencia: (data) => apiClient.post('/solicitud-licencia', data),
  aprobarLicencia: (id, data = {}) => apiClient.post(`/solicitud-licencia/${id}/aprobar`, data),
  rechazarLicencia: (id, data = {}) => apiClient.post(`/solicitud-licencia/${id}/rechazar`, data),
  deleteSolicitudLicencia: (id) => apiClient.delete(`/solicitud-licencia/${id}`),

  getEstadisticas: () => apiClient.get('/estadisticas'),
  getEstadisticasDepartamento: (id) => apiClient.get(`/estadisticas/departamento/${id}`),

  getTiposLicencia: () => apiClient.get('/tipos-licencia'),

  getAuditoria: () => apiClient.get('/auditoria'),
  getAuditoriaByEntity: (entity) => apiClient.get(`/auditoria?entity=${entity}`),

  getAsistenciaHoy: () => empleadoClient.get('/asistencia/hoy'),
  marcarEntrada: () => empleadoClient.post('/asistencia/entrada'),
  marcarSalida: () => empleadoClient.post('/asistencia/salida'),
  getMisAsistencias: (mes, año) => empleadoClient.get('/asistencia/historial', { params: { mes, año } }),
  getMiPerfil: () => empleadoClient.get('/empleado/me'),
  
  misSolicitudesLicencia: () => empleadoClient.get('/solicitud-licencia/mis'),
  crearSolicitudLicencia: (data) => empleadoClient.post('/solicitud-licencia', data),
  updatePerfil: (data) => empleadoClient.put('/auth/perfil', data),
}
