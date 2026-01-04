/**
 * Offline Service - Soporte para modo offline
 */

import { ref } from 'vue'

const isOnline = ref(navigator.onLine)
const queuedRequests = ref([])

export const useOfflineService = () => {
  if (typeof window !== 'undefined') {
    window.addEventListener('online', () => {
      isOnline.value = true
      processQueue()
    })
    window.addEventListener('offline', () => {
      isOnline.value = false
    })
  }

  const queueRequest = (config) => {
    queuedRequests.value.push(config)
    localStorage.setItem('queued_requests', JSON.stringify(queuedRequests.value))
  }

  const processQueue = async () => {
    const requests = [...queuedRequests.value]
    queuedRequests.value = []
    for (const req of requests) {
      try {
        await fetch(req.url, req.options)
      } catch (e) {
        queueRequest(req)
      }
    }
    localStorage.removeItem('queued_requests')
  }

  return {
    isOnline,
    queuedRequests,
    queueRequest,
    processQueue,
    getQueueSize: () => queuedRequests.value.length
  }
}
