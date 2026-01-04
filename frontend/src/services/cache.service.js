/**
 * Cache Service - Caché inteligente con expiración
 */

import { ref } from 'vue'

const cache = ref(new Map())

export const useCache = () => ({
  set: (key, value, ttl = null) => {
    cache.value.set(key, {
      value,
      expires: ttl ? Date.now() + ttl : null
    })
  },
  get: (key) => {
    const item = cache.value.get(key)
    if (!item) return null
    if (item.expires && Date.now() > item.expires) {
      cache.value.delete(key)
      return null
    }
    return item.value
  },
  has: (key) => cache.value.has(key) && (!cache.value.get(key).expires || Date.now() <= cache.value.get(key).expires),
  remove: (key) => cache.value.delete(key),
  clear: () => cache.value.clear(),
  getSize: () => cache.value.size,
  cleanup: () => {
    const now = Date.now()
    for (const [key, item] of cache.value) {
      if (item.expires && now > item.expires) cache.value.delete(key)
    }
  }
})
