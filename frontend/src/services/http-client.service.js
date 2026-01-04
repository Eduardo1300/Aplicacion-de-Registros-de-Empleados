/**
 * HTTP Client Service - Cliente HTTP mejorado con retry
 */

export const useHttpClient = () => {
  const request = async (url, options = {}, retries = 3) => {
    let lastError
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            ...options.headers
          },
          ...options
        })
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return await response.json()
      } catch (error) {
        lastError = error
        if (i < retries - 1) await new Promise(r => setTimeout(r, 1000 * Math.pow(2, i)))
      }
    }
    throw lastError
  }

  return {
    get: (url, options) => request(url, { ...options, method: 'GET' }),
    post: (url, data, options) => request(url, { ...options, method: 'POST', body: JSON.stringify(data) }),
    put: (url, data, options) => request(url, { ...options, method: 'PUT', body: JSON.stringify(data) }),
    delete: (url, options) => request(url, { ...options, method: 'DELETE' }),
    request
  }
}
