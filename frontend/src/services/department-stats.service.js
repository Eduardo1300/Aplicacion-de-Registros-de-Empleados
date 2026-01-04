/**
 * Servicio de Estadísticas por Departamento
 */

import api from './api'

export const getDepartamentoStats = async (deptoId) => {
  try {
    const response = await api.get(`/departamentos/${deptoId}/estadisticas`)
    return response.data
  } catch (error) {
    console.error('Error obteniendo stats departamento:', error)
    throw error
  }
}

export const getEmpleadosPorDepartamento = async () => {
  try {
    const response = await api.get('/estadisticas/empleados-por-departamento')
    return response.data
  } catch (error) {
    console.error('Error obteniendo empleados por depto:', error)
    throw error
  }
}

export const getAsistenciaPorDepartamento = async (inicio, fin) => {
  try {
    const response = await api.get('/estadisticas/asistencia-por-departamento', {
      params: {
        startDate: inicio.toISOString(),
        endDate: fin.toISOString()
      }
    })
    return response.data
  } catch (error) {
    console.error('Error obteniendo asistencia por depto:', error)
    throw error
  }
}

export const getLicenciasPorDepartamento = async (inicio, fin) => {
  try {
    const response = await api.get('/estadisticas/licencias-por-departamento', {
      params: {
        startDate: inicio.toISOString(),
        endDate: fin.toISOString()
      }
    })
    return response.data
  } catch (error) {
    console.error('Error obteniendo licencias por depto:', error)
    throw error
  }
}

export const getComparativaDeptos = async () => {
  try {
    const response = await api.get('/estadisticas/comparativa-departamentos')
    return response.data
  } catch (error) {
    console.error('Error obteniendo comparativa:', error)
    throw error
  }
}

export const getRankingEmpleados = async (deptoId, tipo = 'asistencia') => {
  try {
    const response = await api.get(`/departamentos/${deptoId}/ranking`, {
      params: { tipo }
    })
    return response.data
  } catch (error) {
    console.error('Error obteniendo ranking:', error)
    throw error
  }
}

export const getCostosNominaPorDepartamento = async (mes, ano) => {
  try {
    const response = await api.get('/estadisticas/costos-nomina-por-departamento', {
      params: { mes, ano }
    })
    return response.data
  } catch (error) {
    console.error('Error obteniendo costos:', error)
    throw error
  }
}
