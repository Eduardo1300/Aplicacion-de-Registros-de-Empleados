/**
 * Sorting Service - Servicio de ordenamiento avanzado
 */

export const useSorting = () => ({
  sort: (data = [], field, order = 'asc') => {
    const sorted = [...data]
    sorted.sort((a, b) => {
      const aVal = a[field], bVal = b[field]
      if (aVal < bVal) return order === 'asc' ? -1 : 1
      if (aVal > bVal) return order === 'asc' ? 1 : -1
      return 0
    })
    return sorted
  },
  multiSort: (data = [], fields = []) => {
    return [...data].sort((a, b) => {
      for (const { field, order } of fields) {
        const aVal = a[field], bVal = b[field]
        if (aVal !== bVal) return aVal < bVal ? (order === 'asc' ? -1 : 1) : (order === 'asc' ? 1 : -1)
      }
      return 0
    })
  },
  reverse: (data = []) => [...data].reverse(),
  shuffle: (data = []) => [...data].sort(() => Math.random() - 0.5),
  group: (data = [], field) => {
    const grouped = {}
    data.forEach(item => {
      const key = item[field]
      if (!grouped[key]) grouped[key] = []
      grouped[key].push(item)
    })
    return grouped
  }
})
