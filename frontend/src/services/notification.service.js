import { reactive } from 'vue'

// Estado reactivo global para notificaciones
const notificationState = reactive({
  toasts: []
})

let toastIdCounter = 0

// Configuración de tipos de notificación
const toastConfig = {
  success: {
    icon: '✓',
    type: 'success',
    bgColor: '#10b981',
    borderColor: '#059669'
  },
  error: {
    icon: '✗',
    type: 'error',
    bgColor: '#ef4444',
    borderColor: '#dc2626'
  },
  warning: {
    icon: '⚠',
    type: 'warning',
    bgColor: '#f59e0b',
    borderColor: '#d97706'
  },
  info: {
    icon: 'ℹ',
    type: 'info',
    bgColor: '#3b82f6',
    borderColor: '#2563eb'
  }
}

/**
 * Crea una notificación toast
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de notificación (success, error, warning, info)
 * @param {number} duration - Duración en milisegundos (default: 3000)
 */
function createToast(message, type = 'info', duration = 3000) {
  const id = toastIdCounter++
  const config = toastConfig[type]

  const toast = {
    id,
    message,
    type,
    icon: config.icon,
    bgColor: config.bgColor,
    borderColor: config.borderColor,
    isVisible: true,
    progress: 100
  }

  notificationState.toasts.push(toast)

  // Animación de progreso
  let progressInterval
  if (duration > 0) {
    const startTime = Date.now()
    const interval = 50 // Actualizar cada 50ms

    progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, duration - elapsed)
      toast.progress = (remaining / duration) * 100

      if (remaining === 0) {
        clearInterval(progressInterval)
        removeToast(id)
      }
    }, interval)
  }

  return id
}

/**
 * Elimina una notificación por ID
 * @param {number} id - ID del toast a eliminar
 */
function removeToast(id) {
  const index = notificationState.toasts.findIndex(t => t.id === id)
  if (index > -1) {
    notificationState.toasts[index].isVisible = false

    // Esperar a que termine la animación de salida antes de eliminar
    setTimeout(() => {
      notificationState.toasts.splice(index, 1)
    }, 300)
  }
}

/**
 * Composable useNotification - Retorna objeto con métodos para crear notificaciones
 * @param {number} defaultDuration - Duración por defecto en ms (default: 3000)
 * @returns {Object} Objeto con métodos success(), error(), warning(), info()
 */
export function useNotification(defaultDuration = 3000) {
  return {
    /**
     * Notificación de éxito
     * @param {string} message - Mensaje a mostrar
     * @param {number} duration - Duración en ms (usa defaultDuration si no se especifica)
     */
    success: (message, duration = defaultDuration) => {
      return createToast(message, 'success', duration)
    },

    /**
     * Notificación de error
     * @param {string} message - Mensaje a mostrar
     * @param {number} duration - Duración en ms (usa defaultDuration si no se especifica)
     */
    error: (message, duration = defaultDuration) => {
      return createToast(message, 'error', duration)
    },

    /**
     * Notificación de advertencia
     * @param {string} message - Mensaje a mostrar
     * @param {number} duration - Duración en ms (usa defaultDuration si no se especifica)
     */
    warning: (message, duration = defaultDuration) => {
      return createToast(message, 'warning', duration)
    },

    /**
     * Notificación de información
     * @param {string} message - Mensaje a mostrar
     * @param {number} duration - Duración en ms (usa defaultDuration si no se especifica)
     */
    info: (message, duration = defaultDuration) => {
      return createToast(message, 'info', duration)
    }
  }
}

/**
 * Getter para acceder al estado de notificaciones (usado por el componente)
 */
export function getNotificationState() {
  return notificationState
}

/**
 * Getter para el método removeToast (usado por el componente)
 */
export function getRemoveToast() {
  return removeToast
}
