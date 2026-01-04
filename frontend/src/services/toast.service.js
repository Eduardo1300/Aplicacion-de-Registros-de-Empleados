/**
 * Toast/Notification Service - Sistema de notificaciones mejorado
 */

import { ref } from 'vue'

const toasts = ref([])

export const useToast = () => {
  let id = 0
  const addToast = (message, type = 'info', duration = 3000) => {
    const toastId = id++
    const toast = { id: toastId, message, type }
    toasts.value.push(toast)
    if (duration > 0) setTimeout(() => removeToast(toastId), duration)
    return toastId
  }
  
  const removeToast = (id) => {
    const idx = toasts.value.findIndex(t => t.id === id)
    if (idx !== -1) toasts.value.splice(idx, 1)
  }
  
  return {
    toasts,
    success: (msg, duration) => addToast(msg, 'success', duration),
    error: (msg, duration) => addToast(msg, 'error', duration),
    warning: (msg, duration) => addToast(msg, 'warning', duration),
    info: (msg, duration) => addToast(msg, 'info', duration),
    remove: removeToast,
    clear: () => toasts.value = []
  }
}
