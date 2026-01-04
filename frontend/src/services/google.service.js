/**
 * Servicio de Integración con Google Calendar
 */

import api from './api'

/**
 * Obtener URL de autorización de Google OAuth 2.0
 */
export const getGoogleAuthUrl = () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
  const redirectUri = `${window.location.origin}/auth/google/callback`
  const scope = encodeURIComponent([
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.events'
  ].join(' '))
  
  return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`
}

/**
 * Intercambiar código por token
 */
export const intercambiarCodigoGoogleAuth = async (code) => {
  try {
    const response = await api.post('/integraciones/google/callback', { code })
    return response.data
  } catch (error) {
    console.error('Error intercambiando código Google:', error)
    throw error
  }
}

/**
 * Crear evento en Google Calendar
 */
export const crearEventoGoogleCalendar = async (licenciaId, evento) => {
  try {
    const response = await api.post('/integraciones/google/crear-evento', {
      licenciaId,
      ...evento
    })
    return response.data
  } catch (error) {
    console.error('Error creando evento Google:', error)
    throw error
  }
}

/**
 * Actualizar evento en Google Calendar
 */
export const actualizarEventoGoogleCalendar = async (eventId, evento) => {
  try {
    const response = await api.put(`/integraciones/google/eventos/${eventId}`, evento)
    return response.data
  } catch (error) {
    console.error('Error actualizando evento Google:', error)
    throw error
  }
}

/**
 * Eliminar evento de Google Calendar
 */
export const eliminarEventoGoogleCalendar = async (eventId) => {
  try {
    const response = await api.delete(`/integraciones/google/eventos/${eventId}`)
    return response.data
  } catch (error) {
    console.error('Error eliminando evento Google:', error)
    throw error
  }
}

/**
 * Obtener estado de sincronización
 */
export const obtenerEstadoSincronizacion = async () => {
  try {
    const response = await api.get('/integraciones/google/estado')
    return response.data
  } catch (error) {
    console.error('Error obteniendo estado sincronización:', error)
    throw error
  }
}

/**
 * Sincronizar licencias con Google Calendar
 */
export const sincronizarLicenciasGoogle = async () => {
  try {
    const response = await api.post('/integraciones/google/sincronizar')
    return response.data
  } catch (error) {
    console.error('Error sincronizando licencias:', error)
    throw error
  }
}

/**
 * Desconectar Google Calendar
 */
export const desconectarGoogleCalendar = async () => {
  try {
    const response = await api.post('/integraciones/google/desconectar')
    return response.data
  } catch (error) {
    console.error('Error desconectando Google:', error)
    throw error
  }
}

/**
 * Obtener configuración de sincronización
 */
export const obtenerConfiguracionGoogle = async () => {
  try {
    const response = await api.get('/integraciones/google/configuracion')
    return response.data
  } catch (error) {
    console.error('Error obteniendo configuración:', error)
    throw error
  }
}

/**
 * Actualizar configuración de sincronización
 */
export const actualizarConfiguracionGoogle = async (config) => {
  try {
    const response = await api.put('/integraciones/google/configuracion', config)
    return response.data
  } catch (error) {
    console.error('Error actualizando configuración:', error)
    throw error
  }
}

/**
 * Obtener calendarios disponibles
 */
export const obtenerCalendariosGoogle = async () => {
  try {
    const response = await api.get('/integraciones/google/calendarios')
    return response.data
  } catch (error) {
    console.error('Error obteniendo calendarios:', error)
    throw error
  }
}

/**
 * Verificar si Google Calendar está conectado
 */
export const estaGoogleConectado = async () => {
  try {
    const estado = await obtenerEstadoSincronizacion()
    return estado.conectado
  } catch {
    return false
  }
}

/**
 * Opciones de sincronización
 */
export const OPCIONES_SINCRONIZACION = {
  MANUAL: 'manual',
  AUTOMATICA_CADA_HORA: 'automatica_cada_hora',
  AUTOMATICA_CADA_DIA: 'automatica_cada_dia',
  BIDIRECCIONAL: 'bidireccional'
}

/**
 * Calendarios de eventos
 */
export const TIPOS_EVENTO_GOOGLE = {
  LICENCIA_APROBADA: 'Licencia aprobada',
  VACACIONES: 'Vacaciones',
  REUNION: 'Reunión',
  CAPACITACION: 'Capacitación'
}
