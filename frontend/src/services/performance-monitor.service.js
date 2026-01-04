/**
 * Performance Monitor - Monitor de rendimiento
 */

export const usePerformanceMonitor = () => {
  const metrics = []

  return {
    mark: (label) => {
      performance.mark(label)
    },
    measure: (label, startMark, endMark) => {
      try {
        performance.measure(label, startMark, endMark)
        const measure = performance.getEntriesByName(label)[0]
        metrics.push({
          label,
          duration: measure.duration,
          timestamp: new Date()
        })
        return measure.duration
      } catch (e) {
        console.error('Measure error:', e)
      }
    },
    getMetrics: () => metrics,
    getAverageDuration: (label) => {
      const filtered = metrics.filter(m => m.label === label)
      if (filtered.length === 0) return 0
      const sum = filtered.reduce((a, b) => a + b.duration, 0)
      return sum / filtered.length
    },
    clear: () => metrics.splice(0),
    getMemoryUsage: () => {
      if (performance.memory) {
        return {
          usedJSHeapSize: (performance.memory.usedJSHeapSize / 1048576).toFixed(2) + ' MB',
          totalJSHeapSize: (performance.memory.totalJSHeapSize / 1048576).toFixed(2) + ' MB',
          jsHeapSizeLimit: (performance.memory.jsHeapSizeLimit / 1048576).toFixed(2) + ' MB'
        }
      }
      return null
    }
  }
}
