/**
 * Search Service - Servicio de búsqueda avanzada
 */

import { ref } from 'vue'

const searchHistory = ref([])

export const useSearch = () => ({
  search: (query, data = []) => {
    const normalized = query.toLowerCase().trim()
    return data.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(normalized)
      )
    )
  },
  searchByField: (query, data = [], field) => {
    return data.filter(item =>
      String(item[field] || '').toLowerCase().includes(query.toLowerCase())
    )
  },
  searchMultiple: (query, data = [], fields = []) => {
    return data.filter(item =>
      fields.some(field =>
        String(item[field] || '').toLowerCase().includes(query.toLowerCase())
      )
    )
  },
  addToHistory: (query) => {
    if (!searchHistory.value.includes(query)) searchHistory.value.unshift(query)
    if (searchHistory.value.length > 10) searchHistory.value.pop()
  },
  getHistory: () => searchHistory.value,
  clearHistory: () => searchHistory.value = []
})
