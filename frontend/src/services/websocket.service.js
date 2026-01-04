/**
 * Servicio de WebSocket para Notificaciones en Tiempo Real
 */

import { ref } from 'vue'

let socket = null
let reconnectAttempts = 0
const maxReconnectAttempts = 5

// Estado reactivo
const isConnected = ref(false)
const notifications = ref([])
const unreadCount = ref(0)

/**
 * Conectar WebSocket
 */
export const connectWebSocket = (token) => {
  return new Promise((resolve, reject) => {
    try {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
      const url = `${protocol}//${window.location.host}/ws?token=${token}`
      
      socket = new WebSocket(url)

      socket.addEventListener('open', () => {
        console.log('WebSocket conectado')
        isConnected.value = true
        reconnectAttempts = 0
        resolve()
      })

      socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data)
        handleNotification(data)
      })

      socket.addEventListener('error', (error) => {
        console.error('Error WebSocket:', error)
        reject(error)
      })

      socket.addEventListener('close', () => {
        console.warn('WebSocket desconectado')
        isConnected.value = false
        attemptReconnect(token)
      })
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * Intentar reconectar
 */
const attemptReconnect = (token) => {
  if (reconnectAttempts < maxReconnectAttempts) {
    reconnectAttempts++
    const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000)
    console.log(`Intentando reconectar en ${delay}ms...`)
    
    setTimeout(() => {
      connectWebSocket(token).catch(err => {
        console.error('Error reconectando:', err)
      })
    }, delay)
  }
}

/**
 * Procesar notificación recibida
 */
const handleNotification = (data) => {
  const notification = {
    id: Date.now(),
    type: data.type,
    title: data.title,
    message: data.message,
    timestamp: new Date().toISOString(),
    read: false,
    data: data.data || {}
  }

  notifications.value.unshift(notification)
  unreadCount.value++

  // Reproducir sonido (opcional)
  playNotificationSound()

  // Mostrar notificación del navegador
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(notification.title, {
      body: notification.message,
      icon: '/icon.png'
    })
  }
}

/**
 * Reproducir sonido de notificación
 */
const playNotificationSound = () => {
  const audio = new Audio('/sounds/notification.mp3')
  audio.volume = 0.5
  audio.play().catch(() => {
    // Silenciar errores si no hay sonido disponible
  })
}

/**
 * Marcar notificación como leída
 */
export const markAsRead = (notificationId) => {
  const notif = notifications.value.find(n => n.id === notificationId)
  if (notif && !notif.read) {
    notif.read = true
    unreadCount.value = Math.max(0, unreadCount.value - 1)
  }
}

/**
 * Marcar todas como leídas
 */
export const markAllAsRead = () => {
  notifications.value.forEach(n => {
    if (!n.read) {
      n.read = true
    }
  })
  unreadCount.value = 0
}

/**
 * Limpiar notificaciones antiguas
 */
export const clearOldNotifications = (daysOld = 7) => {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - daysOld)
  
  notifications.value = notifications.value.filter(n => {
    return new Date(n.timestamp) > cutoffDate
  })
}

/**
 * Enviar notificación (desde cliente)
 */
export const sendNotification = (type, title, message, data = {}) => {
  if (socket && isConnected.value) {
    socket.send(JSON.stringify({
      type,
      title,
      message,
      data
    }))
  }
}

/**
 * Desconectar WebSocket
 */
export const disconnectWebSocket = () => {
  if (socket) {
    socket.close()
    socket = null
  }
  isConnected.value = false
}

/**
 * Pedir permiso para notificaciones del navegador
 */
export const requestNotificationPermission = async () => {
  if ('Notification' in window) {
    if (Notification.permission === 'granted') {
      return true
    }
    
    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission()
      return permission === 'granted'
    }
  }
  return false
}

/**
 * Composable para usar notificaciones
 */
export const useWebSocketNotifications = () => {
  return {
    isConnected,
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearOldNotifications,
    sendNotification,
    requestNotificationPermission,
    connectWebSocket,
    disconnectWebSocket
  }
}

// Tipos de notificaciones comunes
export const NOTIFICATION_TYPES = {
  LICENCIA_APROBADA: 'licencia_aprobada',
  LICENCIA_RECHAZADA: 'licencia_rechazada',
  RECORDATORIO: 'recordatorio',
  ALERTA: 'alerta',
  CAMBIO_CRITICO: 'cambio_critico',
  INFO: 'info'
}
