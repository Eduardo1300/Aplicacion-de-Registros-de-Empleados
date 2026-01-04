/**
 * Storage Service - Gestión de localStorage y sessionStorage
 */

export const useStorage = () => ({
  set: (key, value, type = 'local') => {
    const storage = type === 'session' ? sessionStorage : localStorage
    try { storage.setItem(key, JSON.stringify(value)) } catch (e) { console.error('Error saving:', e) }
  },
  get: (key, type = 'local') => {
    const storage = type === 'session' ? sessionStorage : localStorage
    try {
      const item = storage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch { return null }
  },
  remove: (key, type = 'local') => {
    const storage = type === 'session' ? sessionStorage : localStorage
    storage.removeItem(key)
  },
  clear: (type = 'local') => {
    const storage = type === 'session' ? sessionStorage : localStorage
    storage.clear()
  },
  getAll: (type = 'local') => {
    const storage = type === 'session' ? sessionStorage : localStorage
    const result = {}
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i)
      result[key] = JSON.parse(storage.getItem(key))
    }
    return result
  }
})
