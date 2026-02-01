import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('empleadoToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => Promise.reject(error))

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('empleadoToken')
      localStorage.removeItem('empleadoUser')
      if (window.location.pathname !== '/empleado/login') {
        window.location.href = '/empleado/login'
      }
    }
    return Promise.reject(error)
  }
)

export default {
  loginEmpleado(credentials) {
    return apiClient.post('/auth/login-empleado', credentials)
  },

  getPerfil() {
    return apiClient.get('/auth/perfil')
  },

  updatePerfil(data) {
    return apiClient.put('/auth/perfil', data)
  },

  cambiarPassword(data) {
    return apiClient.put('/auth/cambiar-password', data)
  },

  marcarEntrada(data) {
    return apiClient.post('/asistencia/entrada', data)
  },

  marcarSalida(data) {
    return apiClient.post('/asistencia/salida', data)
  },

  getAsistenciaHoy() {
    return apiClient.get('/asistencia/hoy')
  },

  getHistorialAsistencia(params) {
    return apiClient.get('/asistencia/historial', { params })
  },

  crearSolicitudLicencia(data) {
    return apiClient.post('/solicitud-licencia', data)
  },

  getMisSolicitudesLicencia() {
    return apiClient.get('/solicitud-licencia/mis')
  },

  getSolicitudLicencia(id) {
    return apiClient.get(`/solicitud-licencia/${id}`)
  },

  cancelarSolicitudLicencia(id) {
    return apiClient.delete(`/solicitud-licencia/${id}`)
  },

  getSaldoVacaciones() {
    return apiClient.get('/vacaciones/saldo')
  },

  logout() {
    localStorage.removeItem('empleadoToken')
    localStorage.removeItem('empleadoUser')
  },

  getToken() {
    return localStorage.getItem('empleadoToken')
  },

  getEmpleado() {
    const user = localStorage.getItem('empleadoUser')
    return user ? JSON.parse(user) : null
  },

  isAuthenticated() {
    return !!this.getToken()
  }
}
