import api from './api'

/**
 * Servicio para obtener estadísticas del sistema
 */

export const getEmpleadoStats = async () => {
  try {
    const response = await api.get('/empleados')
    const empleados = response.data.data || response.data
    
    return {
      total: empleados.length,
      activos: empleados.filter(e => e.estado === 'ACTIVO').length,
      inactivos: empleados.filter(e => e.estado === 'INACTIVO').length,
      porGenero: {
        masculino: empleados.filter(e => e.genero === 'MASCULINO').length,
        femenino: empleados.filter(e => e.genero === 'FEMENINO').length,
        otro: empleados.filter(e => e.genero !== 'MASCULINO' && e.genero !== 'FEMENINO').length
      }
    }
  } catch (error) {
    console.error('Error fetching empleado stats:', error)
    throw error
  }
}

export const getAsistenciaStats = async () => {
  try {
    const response = await api.get('/asistencias')
    const asistencias = response.data.data || response.data
    
    const today = new Date().toISOString().split('T')[0]
    
    return {
      total: asistencias.length,
      presente: asistencias.filter(a => a.estado === 'PRESENTE').length,
      ausente: asistencias.filter(a => a.estado === 'AUSENTE').length,
      retardo: asistencias.filter(a => a.estado === 'RETARDO').length,
      conPermiso: asistencias.filter(a => a.estado === 'CON_PERMISO').length,
      hoy: asistencias.filter(a => a.fecha === today).length,
      porcentajeAsistencia: asistencias.length > 0 
        ? Math.round((asistencias.filter(a => a.estado === 'PRESENTE').length / asistencias.length) * 100)
        : 0
    }
  } catch (error) {
    console.error('Error fetching asistencia stats:', error)
    throw error
  }
}

export const getLicenciaStats = async () => {
  try {
    const response = await api.get('/licencias')
    const licencias = response.data.data || response.data
    
    return {
      total: licencias.length,
      pendiente: licencias.filter(l => l.estado === 'PENDIENTE').length,
      aprobada: licencias.filter(l => l.estado === 'APROBADA').length,
      rechazada: licencias.filter(l => l.estado === 'RECHAZADA').length,
      diasSolicitados: licencias.reduce((sum, l) => sum + (l.diasSolicitados || 0), 0),
      porcentajeAprobacion: licencias.length > 0
        ? Math.round((licencias.filter(l => l.estado === 'APROBADA').length / licencias.length) * 100)
        : 0
    }
  } catch (error) {
    console.error('Error fetching licencia stats:', error)
    throw error
  }
}

export const getSystemStats = async () => {
  try {
    const [empleados, asistencias, licencias] = await Promise.all([
      getEmpleadoStats(),
      getAsistenciaStats(),
      getLicenciaStats()
    ])
    
    return {
      empleados,
      asistencias,
      licencias,
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    console.error('Error fetching system stats:', error)
    throw error
  }
}

/**
 * Obtiene datos para gráficos
 */
export const getChartData = async () => {
  try {
    const [empleadoStats, asistenciaStats, licenciaStats] = await Promise.all([
      getEmpleadoStats(),
      getAsistenciaStats(),
      getLicenciaStats()
    ])
    
    return {
      empleadosPorGenero: {
        labels: ['Masculino', 'Femenino', 'Otro'],
        data: [empleadoStats.porGenero.masculino, empleadoStats.porGenero.femenino, empleadoStats.porGenero.otro]
      },
      asistenciaResumen: {
        labels: ['Presente', 'Ausente', 'Retardo', 'Con Permiso'],
        data: [asistenciaStats.presente, asistenciaStats.ausente, asistenciaStats.retardo, asistenciaStats.conPermiso]
      },
      licenciasEstado: {
        labels: ['Pendiente', 'Aprobada', 'Rechazada'],
        data: [licenciaStats.pendiente, licenciaStats.aprobada, licenciaStats.rechazada]
      }
    }
  } catch (error) {
    console.error('Error fetching chart data:', error)
    throw error
  }
}

export default {
  getEmpleadoStats,
  getAsistenciaStats,
  getLicenciaStats,
  getSystemStats,
  getChartData
}
