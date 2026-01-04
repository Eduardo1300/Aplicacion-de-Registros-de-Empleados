/**
 * Servicio de Tareas Automáticas (Cron Jobs)
 */

import api from './api'

/**
 * Crear tarea automática
 */
export const crearTareaAutomatica = async (config) => {
  try {
    const response = await api.post('/tareas-automaticas', config)
    return response.data
  } catch (error) {
    console.error('Error creando tarea automática:', error)
    throw error
  }
}

/**
 * Obtener todas las tareas
 */
export const obtenerTareasAutomaticas = async () => {
  try {
    const response = await api.get('/tareas-automaticas')
    return response.data
  } catch (error) {
    console.error('Error obteniendo tareas:', error)
    throw error
  }
}

/**
 * Obtener tarea por ID
 */
export const obtenerTarea = async (id) => {
  try {
    const response = await api.get(`/tareas-automaticas/${id}`)
    return response.data
  } catch (error) {
    console.error('Error obteniendo tarea:', error)
    throw error
  }
}

/**
 * Actualizar tarea
 */
export const actualizarTarea = async (id, config) => {
  try {
    const response = await api.put(`/tareas-automaticas/${id}`, config)
    return response.data
  } catch (error) {
    console.error('Error actualizando tarea:', error)
    throw error
  }
}

/**
 * Eliminar tarea
 */
export const eliminarTarea = async (id) => {
  try {
    const response = await api.delete(`/tareas-automaticas/${id}`)
    return response.data
  } catch (error) {
    console.error('Error eliminando tarea:', error)
    throw error
  }
}

/**
 * Ejecutar tarea manualmente
 */
export const ejecutarTarea = async (id) => {
  try {
    const response = await api.post(`/tareas-automaticas/${id}/ejecutar`)
    return response.data
  } catch (error) {
    console.error('Error ejecutando tarea:', error)
    throw error
  }
}

/**
 * Obtener logs de ejecución de tarea
 */
export const obtenerLogsEjecucion = async (tareaId, limite = 50) => {
  try {
    const response = await api.get(`/tareas-automaticas/${tareaId}/logs`, {
      params: { limite }
    })
    return response.data
  } catch (error) {
    console.error('Error obteniendo logs:', error)
    throw error
  }
}

/**
 * Obtener estadísticas de tareas
 */
export const obtenerEstadisticasTareas = async () => {
  try {
    const response = await api.get('/tareas-automaticas/estadisticas')
    return response.data
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error)
    throw error
  }
}

/**
 * Tipos de tareas
 */
export const TIPOS_TAREA = {
  RECORDATORIO_ASISTENCIA: 'recordatorio_asistencia',
  GENERAR_REPORTE: 'generar_reporte',
  ACTUALIZAR_LICENCIAS: 'actualizar_licencias',
  NOTIFICACION_CUMPLEAÑOS: 'notificacion_cumpleaños',
  BACKUP_DATOS: 'backup_datos',
  LIMPIAR_AUDITORIA: 'limpiar_auditoria',
  ENVIO_EMAIL: 'envio_email',
  CALCULO_NOMINA: 'calculo_nomina'
}

/**
 * Frecuencias disponibles
 */
export const FRECUENCIAS_TAREA = {
  CADA_MINUTO: '*/1 * * * *',
  CADA_5_MINUTOS: '*/5 * * * *',
  CADA_10_MINUTOS: '*/10 * * * *',
  CADA_HORA: '0 * * * *',
  CADA_6_HORAS: '0 */6 * * *',
  CADA_12_HORAS: '0 0,12 * * *',
  DIARIAMENTE_8AM: '0 8 * * *',
  DIARIAMENTE_9PM: '0 21 * * *',
  LUNES_A_VIERNES_8AM: '0 8 * * 1-5',
  PRIMER_DIA_MES: '0 0 1 * *',
  CADA_LUNES: '0 0 * * 1',
  CUSTOM: null
}

/**
 * Descripción de frecuencias para UI
 */
export const FRECUENCIAS_LABELS = {
  '*/1 * * * *': 'Cada minuto',
  '*/5 * * * *': 'Cada 5 minutos',
  '*/10 * * * *': 'Cada 10 minutos',
  '0 * * * *': 'Cada hora',
  '0 */6 * * *': 'Cada 6 horas',
  '0 0,12 * * *': 'Cada 12 horas',
  '0 8 * * *': 'Diariamente a las 8 AM',
  '0 21 * * *': 'Diariamente a las 9 PM',
  '0 8 * * 1-5': 'Lunes a viernes a las 8 AM',
  '0 0 1 * *': 'Primer día del mes',
  '0 0 * * 1': 'Cada lunes'
}

/**
 * Estados de ejecución
 */
export const ESTADOS_EJECUCION = {
  PENDIENTE: 'pendiente',
  EJECUTANDO: 'ejecutando',
  EXITOSA: 'exitosa',
  FALLIDA: 'fallida'
}
