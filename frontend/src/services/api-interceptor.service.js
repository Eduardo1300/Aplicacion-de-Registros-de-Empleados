/**
 * API Response Interceptor - Interceptor de respuestas API mejorado
 */

export const createApiInterceptor = () => {
  const interceptors = []

  const addInterceptor = (request, response, error) => {
    interceptors.push({ request, response, error })
  }

  const execute = async (config) => {
    // Request interceptors
    let modifiedConfig = config
    for (const interceptor of interceptors) {
      if (interceptor.request) {
        modifiedConfig = await interceptor.request(modifiedConfig)
      }
    }
    return modifiedConfig
  }

  const executeResponse = async (response) => {
    let modifiedResponse = response
    for (const interceptor of interceptors) {
      if (interceptor.response) {
        modifiedResponse = await interceptor.response(modifiedResponse)
      }
    }
    return modifiedResponse
  }

  const executeError = async (error) => {
    let modifiedException = error
    for (const interceptor of interceptors) {
      if (interceptor.error) {
        modifiedException = await interceptor.error(modifiedException)
      }
    }
    return modifiedException
  }

  return { addInterceptor, execute, executeResponse, executeError }
}
