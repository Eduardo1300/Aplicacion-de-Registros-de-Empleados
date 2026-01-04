/**
 * Servicio de Validación Avanzada
 * Valida datos del sistema
 */

// Patrón DNI válido
const dniRegex = /^[0-9]{8}$/

// Validar DNI
export const validarDNI = (dni) => {
  if (!dni || typeof dni !== 'string') return false
  
  const clean = dni.trim().toUpperCase()
  if (!dniRegex.test(clean.replace(/\D/g, ''))) return false
  
  // Validar con dígito verificador (opcional pero recomendado)
  const numeros = clean.replace(/\D/g, '')
  if (numeros.length !== 8) return false
  
  return true
}

// Validar Email
export const validarEmail = (email) => {
  if (!email) return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validar Teléfono (Perú)
export const validarTelefono = (telefono) => {
  if (!telefono) return false
  const clean = telefono.replace(/\D/g, '')
  return clean.length >= 7 && clean.length <= 12
}

// Validar Fecha (no pasada, no lejana)
export const validarFecha = (fecha, permitePassada = false, diasFuturosMax = 365) => {
  if (!fecha) return false
  
  const date = new Date(fecha)
  if (isNaN(date)) return false
  
  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0)
  
  // Validar que no sea pasada
  if (!permitePassada && date < hoy) return false
  
  // Validar que no sea muy lejana
  const diasDiferencia = Math.floor((date - hoy) / (1000 * 60 * 60 * 24))
  if (diasDiferencia > diasFuturosMax) return false
  
  return true
}

// Validar Requerido
export const validarRequerido = (valor) => {
  if (Array.isArray(valor)) return valor.length > 0
  if (typeof valor === 'string') return valor.trim().length > 0
  return valor != null
}

// Validar Longitud
export const validarLongitud = (valor, minimo, maximo) => {
  if (!valor) return false
  const len = String(valor).length
  return len >= minimo && len <= maximo
}

// Validar URL
export const validarURL = (url) => {
  if (!url) return false
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Validar Número
export const validarNumero = (valor, minimo = null, maximo = null) => {
  const num = Number(valor)
  if (isNaN(num)) return false
  if (minimo !== null && num < minimo) return false
  if (maximo !== null && num > maximo) return false
  return true
}

// Validar Solo Letras
export const validarSoloLetras = (valor) => {
  if (!valor) return false
  return /^[a-záéíóúñ\s]+$/i.test(valor)
}

// Validar Alpanumérico
export const validarAlfanumerico = (valor) => {
  if (!valor) return false
  return /^[a-z0-9áéíóúñ\s]+$/i.test(valor)
}

// Validar No Duplicado (requiere array de valores existentes)
export const validarUnico = (valor, valoresExistentes = []) => {
  if (!valor) return false
  return !valoresExistentes.includes(valor.toLowerCase())
}

/**
 * Objeto de Reglas de Validación
 * Uso: rulesObject.email('usuario@email.com')
 */
export const Rules = {
  required: (value) => validarRequerido(value) || 'Campo requerido',
  email: (value) => validarEmail(value) || 'Email no válido',
  dni: (value) => validarDNI(value) || 'DNI no válido (8 dígitos)',
  telefono: (value) => validarTelefono(value) || 'Teléfono no válido',
  fecha: (value, pasada = false) => validarFecha(value, pasada) || 'Fecha no válida',
  url: (value) => validarURL(value) || 'URL no válida',
  soloLetras: (value) => validarSoloLetras(value) || 'Solo se permiten letras',
  alfanumerico: (value) => validarAlfanumerico(value) || 'Solo letras y números',
  minLength: (min) => (value) => {
    const len = String(value || '').length
    return len >= min || `Mínimo ${min} caracteres`
  },
  maxLength: (max) => (value) => {
    const len = String(value || '').length
    return len <= max || `Máximo ${max} caracteres`
  },
  between: (min, max) => (value) => {
    const len = String(value || '').length
    return (len >= min && len <= max) || `Entre ${min} y ${max} caracteres`
  },
  number: (value) => validarNumero(value) || 'Debe ser un número',
  min: (min) => (value) => {
    const num = Number(value)
    return num >= min || `Mínimo ${min}`
  },
  max: (max) => (value) => {
    const num = Number(value)
    return num <= max || `Máximo ${max}`
  },
  custom: (fn) => fn
}

/**
 * Validar un objeto contra reglas
 * @param {Object} datos - Datos a validar
 * @param {Object} reglas - Reglas { campo: [rule1, rule2, ...] }
 * @returns {Object} { valido: boolean, errores: { campo: [mensajes] } }
 */
export const validarObjeto = (datos, reglas) => {
  const errores = {}
  let valido = true

  for (const [campo, arrayReglas] of Object.entries(reglas)) {
    const valor = datos[campo]
    const mensajes = []

    for (const regla of arrayReglas) {
      const resultado = typeof regla === 'function' ? regla(valor) : regla
      if (resultado !== true && resultado) {
        mensajes.push(resultado)
        valido = false
      }
    }

    if (mensajes.length > 0) {
      errores[campo] = mensajes
    }
  }

  return { valido, errores }
}
