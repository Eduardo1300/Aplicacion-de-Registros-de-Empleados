/**
 * Servicio de Reportes Automáticos
 * Generar y programar reportes
 */

import api from './api'

export const generarReporteAsistencia = async (inicio, fin, deptoId = null) => {
  try {
    const response = await api.get('/reportes/asistencia', {
      params: {
        startDate: inicio.toISOString(),
        endDate: fin.toISOString(),
        departamentoId: deptoId
      }
    })
    return response.data
  } catch (error) {
    console.error('Error generando reporte asistencia:', error)
    throw error
  }
}

export const generarReporteLicencias = async (inicio, fin, deptoId = null) => {
  try {
    const response = await api.get('/reportes/licencias', {
      params: {
        startDate: inicio.toISOString(),
        endDate: fin.toISOString(),
        departamentoId: deptoId
      }
    })
    return response.data
  } catch (error) {
    console.error('Error generando reporte licencias:', error)
    throw error
  }
}

export const generarReporteNomina = async (mes, ano, deptoId = null) => {
  try {
    const response = await api.get('/reportes/nomina', {
      params: {
        mes,
        ano,
        departamentoId: deptoId
      }
    })
    return response.data
  } catch (error) {
    console.error('Error generando reporte nómina:', error)
    throw error
  }
}

export const programarReporte = async (config) => {
  try {
    const response = await api.post('/reportes/programar', config)
    return response.data
  } catch (error) {
    console.error('Error programando reporte:', error)
    throw error
  }
}

export const obtenerReportesProgramados = async () => {
  try {
    const response = await api.get('/reportes/programados')
    return response.data
  } catch (error) {
    console.error('Error obteniendo reportes programados:', error)
    throw error
  }
}

export const eliminarReporteProgramado = async (id) => {
  try {
    const response = await api.delete(`/reportes/programados/${id}`)
    return response.data
  } catch (error) {
    console.error('Error eliminando reporte programado:', error)
    throw error
  }
}

export const obtenerHistorialReportes = async (tipo, limite = 20) => {
  try {
    const response = await api.get('/reportes/historial', {
      params: { tipo, limite }
    })
    return response.data
  } catch (error) {
    console.error('Error obteniendo historial:', error)
    throw error
  }
}

export const descargarReporte = async (id) => {
  try {
    const response = await api.get(`/reportes/${id}/descargar`, {
      responseType: 'blob'
    })
    return response.data
  } catch (error) {
    console.error('Error descargando reporte:', error)
    throw error
  }
}

// Plantillas de reportes
export const REPORT_TEMPLATES = {
  ASISTENCIA_DIARIA: 'asistencia_diaria',
  ASISTENCIA_SEMANAL: 'asistencia_semanal',
  ASISTENCIA_MENSUAL: 'asistencia_mensual',
  LICENCIAS_MENSUALES: 'licencias_mensuales',
  LICENCIAS_PENDIENTES: 'licencias_pendientes',
  NOMINA_MENSUAL: 'nomina_mensual',
  RESUMEN_EJECUTIVO: 'resumen_ejecutivo'
}

// Frecuencias de programación
export const REPORT_FREQUENCIES = {
  DIARIA: 'diaria',
  SEMANAL: 'semanal',
  MENSUAL: 'mensual',
  TRIMESTRAL: 'trimestral'
}
