import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor para agregar token JWT
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => Promise.reject(error))

export default {
  // Auth endpoints
  login(credentials) {
    return apiClient.post('/auth/login', credentials)
  },
  register(data) {
    return apiClient.post('/auth/register', data)
  },

  // Empleado endpoints
  getEmpleados() {
    return apiClient.get('/empleado')
  },
  getEmpleado(id) {
    return apiClient.get(`/empleado/${id}`)
  },
  createEmpleado(data) {
    return apiClient.post('/empleado', data)
  },
  updateEmpleado(id, data) {
    return apiClient.put(`/empleado/${id}`, data)
  },
  deleteEmpleado(id) {
    return apiClient.delete(`/empleado/${id}`)
  },

  // Asistencia endpoints
  getAsistencias() {
    return apiClient.get('/asistencia')
  },
  getAsistencia(id) {
    return apiClient.get(`/asistencia/${id}`)
  },
  createAsistencia(data) {
    return apiClient.post('/asistencia', data)
  },
  updateAsistencia(id, data) {
    return apiClient.put(`/asistencia/${id}`, data)
  },
  deleteAsistencia(id) {
    return apiClient.delete(`/asistencia/${id}`)
  },

  // Departamento endpoints
  getDepartamentos() {
    return apiClient.get('/departamento')
  },
  getDepartamento(id) {
    return apiClient.get(`/departamento/${id}`)
  },
  createDepartamento(data) {
    return apiClient.post('/departamento', data)
  },
  updateDepartamento(id, data) {
    return apiClient.put(`/departamento/${id}`, data)
  },
  deleteDepartamento(id) {
    return apiClient.delete(`/departamento/${id}`)
  },

  // Cargo endpoints
  getCargos() {
    return apiClient.get('/cargo')
  },
  getCargo(id) {
    return apiClient.get(`/cargo/${id}`)
  },
  createCargo(data) {
    return apiClient.post('/cargo', data)
  },
  updateCargo(id, data) {
    return apiClient.put(`/cargo/${id}`, data)
  },
  deleteCargo(id) {
    return apiClient.delete(`/cargo/${id}`)
  },

  // Licencia endpoints
  getSolicitudesLicencia() {
    return apiClient.get('/solicitud-licencia')
  },
  getSolicitudLicencia(id) {
    return apiClient.get(`/solicitud-licencia/${id}`)
  },
  createSolicitudLicencia(data) {
    return apiClient.post('/solicitud-licencia', data)
  },
  aprobarLicencia(id) {
    return apiClient.post(`/solicitud-licencia/${id}/aprobar`)
  },
  rechazarLicencia(id) {
    return apiClient.post(`/solicitud-licencia/${id}/rechazar`)
  },
  deleteSolicitudLicencia(id) {
    return apiClient.delete(`/solicitud-licencia/${id}`)
  }
}
