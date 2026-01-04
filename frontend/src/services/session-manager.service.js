/**
 * Session Manager - Gestor de sesiones de usuario
 */

import { ref } from 'vue'

const sessions = ref(new Map())
const currentSession = ref(null)

export const useSessionManager = () => ({
  createSession: (userId, data = {}) => {
    const sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
    sessions.value.set(sessionId, {
      id: sessionId,
      userId,
      createdAt: new Date(),
      lastActivity: new Date(),
      data,
      isActive: true
    })
    currentSession.value = sessionId
    localStorage.setItem('sessionId', sessionId)
    return sessionId
  },
  getSession: (id) => sessions.value.get(id),
  getCurrentSession: () => sessions.value.get(currentSession.value),
  updateActivity: (id) => {
    const session = sessions.value.get(id)
    if (session) session.lastActivity = new Date()
  },
  endSession: (id) => {
    const session = sessions.value.get(id)
    if (session) session.isActive = false
    if (currentSession.value === id) currentSession.value = null
  },
  getActiveSessions: () => Array.from(sessions.value.values()).filter(s => s.isActive),
  destroyExpiredSessions: (maxIdleMinutes = 30) => {
    const now = new Date()
    sessions.value.forEach((session, id) => {
      if ((now - session.lastActivity) / 60000 > maxIdleMinutes) {
        session.isActive = false
      }
    })
  }
})
