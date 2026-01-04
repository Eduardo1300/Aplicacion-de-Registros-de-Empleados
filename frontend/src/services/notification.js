/**
 * Servicio de Notificaciones Toast
 * Sistema global para mostrar mensajes al usuario
 */

import { reactive } from 'vue'

// Estado global de notificaciones
const state = reactive({
  notifications: []
})

// ID único para cada notificación
let notificationId = 0

/**
 * Crea una notificación toast
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo: 'success', 'error', 'warning', 'info'
 * @param {number} duration - Duración en ms (0 = manual)
 */
const createNotification = (message, type = 'info', duration = 3000) => {
  const id = notificationId++
  
  const notification = {
    id,
    message,
    type,
    visible: true
  }
  
  state.notifications.push(notification)
  
  // Auto-dismiss si duration > 0
  if (duration > 0) {
    setTimeout(() => {
      removeNotification(id)
    }, duration)
  }
  
  return id
}

/**
 * Elimina una notificación por ID
 */
const removeNotification = (id) => {
  const index = state.notifications.findIndex(n => n.id === id)
  if (index !== -1) {
    state.notifications.splice(index, 1)
  }
}

/**
 * Limpia todas las notificaciones
 */
const clearAll = () => {
  state.notifications = []
}

/**
 * API pública
 */
export const useNotification = () => ({
  success: (message, duration = 3000) => createNotification(message, 'success', duration),
  error: (message, duration = 4000) => createNotification(message, 'error', duration),
  warning: (message, duration = 3500) => createNotification(message, 'warning', duration),
  info: (message, duration = 3000) => createNotification(message, 'info', duration),
  remove: removeNotification,
  clear: clearAll,
  notifications: state.notifications
})

export default useNotification
