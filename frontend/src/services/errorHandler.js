export function handleApiError(error, fallbackMessage = 'Ocurrió un error') {
  if (error.response) {
    const { status, data } = error.response
    switch (status) {
      case 400:
        return data?.message || 'Datos inválidos'
      case 401:
        return 'No autorizado. Por favor inicie sesión nuevamente'
      case 403:
        return 'No tiene permisos para realizar esta acción'
      case 404:
        return 'Recurso no encontrado'
      case 422:
        return data?.message || 'Datos de validación inválidos'
      case 500:
        return 'Error del servidor. Por favor intente más tarde'
      default:
        return data?.message || fallbackMessage
    }
  } else if (error.request) {
    return 'No se pudo conectar al servidor. Verifique su conexión'
  } else if (error.code === 'ECONNABORTED') {
    return 'La solicitud tardó demasiado. Por favor intente nuevamente'
  }
  return fallbackMessage
}

export function getErrorCode(error) {
  if (error.response) {
    return error.response.status
  } else if (error.request) {
    return 'NETWORK_ERROR'
  } else if (error.code === 'ECONNABORTED') {
    return 'TIMEOUT'
  }
  return 'UNKNOWN'
}
