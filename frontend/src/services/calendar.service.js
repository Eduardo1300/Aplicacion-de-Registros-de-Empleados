/**
 * Servicio de Calendario de Licencias
 */

import api from './api'

/**
 * Obtener eventos de licencias
 */
export const getLicenciasCalendario = async (inicio, fin, empleadoId = null, deptoId = null) => {
  try {
    const params = {
      startDate: inicio.toISOString(),
      endDate: fin.toISOString()
    }
    if (empleadoId) params.empleadoId = empleadoId
    if (deptoId) params.deptoId = deptoId
    
    const response = await api.get('/calendario/licencias', { params })
    
    // Transformar a formato FullCalendar
    return response.data.map(lic => ({
      id: lic.id,
      title: lic.empleado?.nombre || 'Sin nombre',
      start: lic.fechaInicio,
      end: new Date(new Date(lic.fechaFin).getTime() + 86400000).toISOString().split('T')[0], // +1 día
      backgroundColor: getColorByEstado(lic.estado),
      borderColor: getColorByEstado(lic.estado),
      extendedProps: {
        empleadoId: lic.empleadoId,
        estado: lic.estado,
        motivo: lic.motivo,
        diasUsados: lic.diasUsados,
        departamento: lic.empleado?.departamento?.nombre
      }
    }))
  } catch (error) {
    console.error('Error obteniendo licencias calendario:', error)
    throw error
  }
}

/**
 * Obtener vacaciones
 */
export const getVacacionesCalendario = async (ano, empleadoId = null) => {
  try {
    const params = { ano }
    if (empleadoId) params.empleadoId = empleadoId
    
    const response = await api.get('/calendario/vacaciones', { params })
    
    return response.data.map(vac => ({
      id: vac.id,
      title: `${vac.empleado?.nombre} - Vacaciones`,
      start: vac.fechaInicio,
      end: new Date(new Date(vac.fechaFin).getTime() + 86400000).toISOString().split('T')[0],
      backgroundColor: '#17a2b8',
      borderColor: '#17a2b8',
      extendedProps: {
        tipo: 'vacacion',
        empleadoId: vac.empleadoId,
        diasSolicitados: vac.diasSolicitados
      }
    }))
  } catch (error) {
    console.error('Error obteniendo vacaciones:', error)
    throw error
  }
}

/**
 * Detectar conflictos (múltiples personas en licencia simultáneamente)
 */
export const detectarConflictos = async (inicio, fin, deptoId = null) => {
  try {
    const params = {
      startDate: inicio.toISOString(),
      endDate: fin.toISOString()
    }
    if (deptoId) params.deptoId = deptoId
    
    const response = await api.get('/calendario/conflictos', { params })
    return response.data
  } catch (error) {
    console.error('Error detectando conflictos:', error)
    throw error
  }
}

/**
 * Reprogramar licencia (drag-and-drop)
 */
export const reprogramarLicencia = async (licenciaId, nuevaFechaInicio, nuevaFechaFin) => {
  try {
    const response = await api.put(`/licencias/${licenciaId}/reprogramar`, {
      nuevaFechaInicio,
      nuevaFechaFin
    })
    return response.data
  } catch (error) {
    console.error('Error reprogramando licencia:', error)
    throw error
  }
}

/**
 * Obtener disponibilidad de empleado en una fecha
 */
export const getDisponibilidad = async (empleadoId, fecha) => {
  try {
    const response = await api.get(`/empleados/${empleadoId}/disponibilidad`, {
      params: { fecha: new Date(fecha).toISOString().split('T')[0] }
    })
    return response.data
  } catch (error) {
    console.error('Error obteniendo disponibilidad:', error)
    throw error
  }
}

/**
 * Obtener resumen de licencias por empleado
 */
export const getResumenLicenciasEmpleado = async (empleadoId, ano) => {
  try {
    const response = await api.get(`/empleados/${empleadoId}/resumen-licencias`, {
      params: { ano }
    })
    return response.data
  } catch (error) {
    console.error('Error obteniendo resumen:', error)
    throw error
  }
}

/**
 * Estados de licencias
 */
export const ESTADOS_LICENCIA = {
  SOLICITADA: 'SOLICITADA',
  APROBADA: 'APROBADA',
  RECHAZADA: 'RECHAZADA',
  CANCELADA: 'CANCELADA'
}

/**
 * Obtener color por estado
 */
const getColorByEstado = (estado) => {
  const colores = {
    [ESTADOS_LICENCIA.SOLICITADA]: '#FFC107',  // Amarillo
    [ESTADOS_LICENCIA.APROBADA]: '#28A745',    // Verde
    [ESTADOS_LICENCIA.RECHAZADA]: '#DC3545',   // Rojo
    [ESTADOS_LICENCIA.CANCELADA]: '#6C757D'    // Gris
  }
  return colores[estado] || '#667EEA'
}

/**
 * Configuración inicial de FullCalendar
 */
export const getFullCalendarConfig = () => ({
  locale: 'es',
  firstDay: 1, // Lunes
  weekends: true,
  slotLabelInterval: '00:30:00',
  slotLabelFormat: {
    meridiem: 'short',
    hour: 'numeric',
    minute: '2-digit'
  },
  eventDisplay: 'block',
  displayEventTime: false,
  eventMinHeight: 40,
  contentHeight: 'auto',
  buttonText: {
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    list: 'Lista'
  }
})
