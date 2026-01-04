/**
 * Rate Limiter Service - Servicio de limitación de velocidad
 */

export const useRateLimiter = () => {
  const limits = new Map()

  return {
    canExecute: (key, maxAttempts = 5, timeWindow = 60000) => {
      const now = Date.now()
      if (!limits.has(key)) {
        limits.set(key, { attempts: [now], blocked: false, blockedUntil: 0 })
        return true
      }

      const data = limits.get(key)
      if (data.blockedUntil && now < data.blockedUntil) return false

      data.attempts = data.attempts.filter(t => now - t < timeWindow)
      if (data.attempts.length >= maxAttempts) {
        data.blockedUntil = now + timeWindow
        return false
      }

      data.attempts.push(now)
      return true
    },
    reset: (key) => limits.delete(key),
    resetAll: () => limits.clear(),
    getStatus: (key) => limits.get(key) || null
  }
}
