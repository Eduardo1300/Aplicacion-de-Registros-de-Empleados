/**
 * Servicio de Análisis y Tendencias
 */

import api from './api'

/**
 * Obtener tendencias de asistencia (últimos 6 meses)
 */
export const getTendenciasAsistencia = async (empleadoId = null) => {
  try {
    const params = empleadoId ? { empleadoId } : {}
    const response = await api.get('/analisis/tendencias-asistencia', { params })
    return response.data
  } catch (error) {
    console.error('Error obteniendo tendencias asistencia:', error)
    throw error
  }
}

/**
 * Obtener tendencias de licencias
 */
export const getTendenciasLicencias = async () => {
  try {
    const response = await api.get('/analisis/tendencias-licencias')
    return response.data
  } catch (error) {
    console.error('Error obteniendo tendencias licencias:', error)
    throw error
  }
}

/**
 * Obtener rotación de empleados
 */
export const getRotacionEmpleados = async (meses = 12) => {
  try {
    const response = await api.get('/analisis/rotacion-empleados', {
      params: { meses }
    })
    return response.data
  } catch (error) {
    console.error('Error obteniendo rotación:', error)
    throw error
  }
}

/**
 * Predicción de ausencias (ML básico)
 */
export const predecirAusencias = async (empleadoId) => {
  try {
    const response = await api.get(`/analisis/predecir-ausencias/${empleadoId}`)
    return response.data
  } catch (error) {
    console.error('Error prediciendo ausencias:', error)
    throw error
  }
}

/**
 * Análisis de picos de licencias
 */
export const analizarPicosLicencias = async () => {
  try {
    const response = await api.get('/analisis/picos-licencias')
    return response.data
  } catch (error) {
    console.error('Error analizando picos:', error)
    throw error
  }
}

/**
 * Comparativa histórica
 */
export const getComparativaHistorica = async (periodo1Start, periodo1End, periodo2Start, periodo2End) => {
  try {
    const response = await api.get('/analisis/comparativa-historica', {
      params: {
        p1Start: periodo1Start.toISOString(),
        p1End: periodo1End.toISOString(),
        p2Start: periodo2Start.toISOString(),
        p2End: periodo2End.toISOString()
      }
    })
    return response.data
  } catch (error) {
    console.error('Error obteniendo comparativa:', error)
    throw error
  }
}

/**
 * KPIs y métricas clave
 */
export const getKPIs = async () => {
  try {
    const response = await api.get('/analisis/kpis')
    return response.data
  } catch (error) {
    console.error('Error obteniendo KPIs:', error)
    throw error
  }
}

/**
 * Análisis de productividad
 */
export const getProductividad = async (deptoId = null) => {
  try {
    const params = deptoId ? { deptoId } : {}
    const response = await api.get('/analisis/productividad', { params })
    return response.data
  } catch (error) {
    console.error('Error obteniendo productividad:', error)
    throw error
  }
}

/**
 * Generar reporte de análisis
 */
export const generarReporteAnalisis = async (tipo) => {
  try {
    const response = await api.get(`/analisis/reporte/${tipo}`, {
      responseType: 'blob'
    })
    return response.data
  } catch (error) {
    console.error('Error generando reporte:', error)
    throw error
  }
}

// Tipos de análisis
export const ANALYSIS_TYPES = {
  ASISTENCIA: 'asistencia',
  LICENCIAS: 'licencias',
  ROTACION: 'rotacion',
  PRODUCTIVIDAD: 'productividad',
  COSTOS: 'costos',
  CUMPLIMIENTO: 'cumplimiento'
}

// Funciones de cálculo local para análisis

/**
 * Calcular tendencia (crecimiento o decrecimiento)
 */
export const calcularTendencia = (valores) => {
  if (valores.length < 2) return 0
  
  const primero = valores[0]
  const ultimo = valores[valores.length - 1]
  const diferencia = ultimo - primero
  const porcentaje = (diferencia / primero) * 100
  
  return parseFloat(porcentaje.toFixed(2))
}

/**
 * Calcular promedio
 */
export const calcularPromedio = (valores) => {
  if (valores.length === 0) return 0
  const suma = valores.reduce((a, b) => a + b, 0)
  return parseFloat((suma / valores.length).toFixed(2))
}

/**
 * Detectar anomalías
 */
export const detectarAnomalias = (valores) => {
  const promedio = calcularPromedio(valores)
  const desviacion = Math.sqrt(
    valores.reduce((sum, val) => sum + Math.pow(val - promedio, 2), 0) / valores.length
  )
  
  return valores.map((val, idx) => ({
    indice: idx,
    valor: val,
    esAnomalia: Math.abs(val - promedio) > desviacion * 2
  }))
}

/**
 * Calcular media móvil
 */
export const calcularMediaMovil = (valores, periodo = 3) => {
  const resultado = []
  for (let i = 0; i < valores.length; i++) {
    if (i < periodo - 1) {
      resultado.push(null)
    } else {
      const suma = valores.slice(i - periodo + 1, i + 1).reduce((a, b) => a + b, 0)
      resultado.push(suma / periodo)
    }
  }
  return resultado
}
