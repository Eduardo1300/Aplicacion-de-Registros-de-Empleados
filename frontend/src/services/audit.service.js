import api from './api'

/**
 * Servicio para auditoría de cambios
 */

export const getEntityHistory = async (entityName, entityId) => {
  try {
    const response = await api.get(`/audit-logs/entity/${entityName}/${entityId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching entity history:', error)
    throw error
  }
}

export const getUserActivity = async (userId) => {
  try {
    const response = await api.get(`/audit-logs/user/${userId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching user activity:', error)
    throw error
  }
}

export const getUserActivityByDateRange = async (userId, startDate, endDate) => {
  try {
    const response = await api.get(`/audit-logs/user/${userId}/date-range`, {
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching user activity by date range:', error)
    throw error
  }
}

export const getEntityHistoryByDateRange = async (entityName, startDate, endDate) => {
  try {
    const response = await api.get(`/audit-logs/entity/${entityName}/date-range`, {
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching entity history by date range:', error)
    throw error
  }
}

export const getAuditLogsByDateRange = async (startDate, endDate) => {
  try {
    const response = await api.get('/audit-logs/date-range', {
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching audit logs by date range:', error)
    throw error
  }
}

export const countUserChanges = async (userId, startDate, endDate) => {
  try {
    const response = await api.get(`/audit-logs/user/${userId}/count`, {
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      }
    })
    return response.data
  } catch (error) {
    console.error('Error counting user changes:', error)
    throw error
  }
}

export default {
  getEntityHistory,
  getUserActivity,
  getUserActivityByDateRange,
  getEntityHistoryByDateRange,
  getAuditLogsByDateRange,
  countUserChanges
}
