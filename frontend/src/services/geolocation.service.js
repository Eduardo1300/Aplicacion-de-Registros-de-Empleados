/**
 * Geolocation Service - Servicio de geolocalización
 */

export const useGeolocation = () => ({
  getLocation: () => new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
          })
        },
        reject
      )
    } else {
      reject(new Error('Geolocation not supported'))
    }
  }),
  watchLocation: (callback) => {
    if ('geolocation' in navigator) {
      return navigator.geolocation.watchPosition(
        (position) => callback({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }),
        (error) => console.error(error)
      )
    }
  },
  calculateDistance: (lat1, lon1, lat2, lon2) => {
    const R = 6371
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }
})
