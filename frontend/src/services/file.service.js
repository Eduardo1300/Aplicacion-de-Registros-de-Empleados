/**
 * File Service - Servicio de manejo de archivos
 */

export const useFileService = () => ({
  readFile: (file) => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target.result)
    reader.onerror = reject
    reader.readAsText(file)
  }),
  readFileAsDataURL: (file) => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  }),
  downloadFile: (content, filename, type = 'text/plain') => {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  },
  getFileExtension: (filename) => filename.split('.').pop().toLowerCase(),
  getFileSize: (bytes) => {
    const units = ['B', 'KB', 'MB', 'GB']
    let size = bytes
    let unitIdx = 0
    while (size >= 1024 && unitIdx < units.length - 1) {
      size /= 1024
      unitIdx++
    }
    return `${size.toFixed(2)} ${units[unitIdx]}`
  }
})
