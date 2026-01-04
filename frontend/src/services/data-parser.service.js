/**
 * Data Parser Service - Servicio para parsear diferentes formatos
 */

export const useDataParser = () => ({
  parseJSON: (str) => {
    try {
      return { success: true, data: JSON.parse(str) }
    } catch (e) {
      return { success: false, error: e.message }
    }
  },
  parseXML: (str) => {
    try {
      const parser = new DOMParser()
      const xml = parser.parseFromString(str, 'text/xml')
      if (xml.getElementsByTagName('parsererror').length) {
        throw new Error('XML Parse Error')
      }
      return { success: true, data: xml }
    } catch (e) {
      return { success: false, error: e.message }
    }
  },
  parseCSV: (str) => {
    try {
      const lines = str.split('\n')
      const headers = lines[0].split(',')
      const data = lines.slice(1).map(line => {
        const obj = {}
        line.split(',').forEach((val, i) => obj[headers[i]] = val)
        return obj
      })
      return { success: true, data }
    } catch (e) {
      return { success: false, error: e.message }
    }
  },
  stringifyJSON: (obj, pretty = false) => pretty ? JSON.stringify(obj, null, 2) : JSON.stringify(obj)
})
