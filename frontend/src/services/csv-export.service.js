/**
 * CSV Export/Import Service - Exportación e importación CSV
 */

export const useCsvService = () => ({
  exportToCSV: (data = [], filename = 'export') => {
    if (data.length === 0) return
    const headers = Object.keys(data[0])
    const csv = [headers.join(',')]
    data.forEach(row => {
      const values = headers.map(h => {
        const val = row[h]
        return typeof val === 'string' && val.includes(',') ? `"${val}"` : val
      })
      csv.push(values.join(','))
    })
    const blob = new Blob([csv.join('\n')], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}-${Date.now()}.csv`
    a.click()
  },
  parseCSV: (text) => {
    const lines = text.split('\n')
    if (lines.length < 2) return []
    const headers = lines[0].split(',')
    return lines.slice(1).map(line => {
      const values = line.split(',')
      const obj = {}
      headers.forEach((h, i) => obj[h.trim()] = values[i]?.trim() || '')
      return obj
    })
  }
})
