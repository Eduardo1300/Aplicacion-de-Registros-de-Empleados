/**
 * Filter Service - Servicio de filtrado avanzado
 */

export const useFilter = () => ({
  filterByField: (data = [], field, value) => {
    return data.filter(item => item[field] === value)
  },
  filterByRange: (data = [], field, min, max) => {
    return data.filter(item => item[field] >= min && item[field] <= max)
  },
  filterMultiple: (data = [], filters = {}) => {
    return data.filter(item =>
      Object.entries(filters).every(([field, value]) =>
        Array.isArray(value) ? value.includes(item[field]) : item[field] === value
      )
    )
  },
  filterByCondition: (data = [], conditions = []) => {
    return data.filter(item =>
      conditions.every(({ field, operator, value }) => {
        const itemVal = item[field]
        if (operator === '===') return itemVal === value
        if (operator === '!==') return itemVal !== value
        if (operator === '>') return itemVal > value
        if (operator === '<') return itemVal < value
        if (operator === '>=') return itemVal >= value
        if (operator === '<=') return itemVal <= value
        if (operator === 'in') return value.includes(itemVal)
        if (operator === 'contains') return String(itemVal).includes(value)
        return true
      })
    )
  },
  filterBySearch: (data = [], query, fields = []) => {
    const q = query.toLowerCase()
    return data.filter(item =>
      fields.some(field => String(item[field] || '').toLowerCase().includes(q))
    )
  }
})
