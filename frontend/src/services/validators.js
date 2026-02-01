export const validators = {
  required(message = 'Este campo es obligatorio') {
    return (value) => {
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        return message
      }
      return true
    }
  },

  minLength(min, message = null) {
    return (value) => {
      if (!value) return true
      if (value.length < min) {
        return message || `Mínimo ${min} caracteres`
      }
      return true
    }
  },

  maxLength(max, message = null) {
    return (value) => {
      if (!value) return true
      if (value.length > max) {
        return message || `Máximo ${max} caracteres`
      }
      return true
    }
  },

  email(message = 'Correo electrónico inválido') {
    return (value) => {
      if (!value) return true
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        return message
      }
      return true
    }
  },

  dni(message = 'DNI inválido (8 dígitos)') {
    return (value) => {
      if (!value) return true
      const dniRegex = /^\d{8}$/
      if (!dniRegex.test(value)) {
        return message
      }
      return true
    }
  },

  phone(message = 'Teléfono inválido') {
    return (value) => {
      if (!value) return true
      const phoneRegex = /^[\d\s\-+()]{7,15}$/
      if (!phoneRegex.test(value)) {
        return message
      }
      return true
    }
  },

  numeric(message = 'Debe ser un número') {
    return (value) => {
      if (!value) return true
      if (isNaN(Number(value))) {
        return message
      }
      return true
    }
  },

  positive(message = 'Debe ser un número positivo') {
    return (value) => {
      if (!value) return true
      if (Number(value) <= 0) {
        return message
      }
      return true
    }
  },

  date(message = 'Fecha inválida') {
    return (value) => {
      if (!value) return true
      const date = new Date(value)
      if (isNaN(date.getTime())) {
        return message
      }
      return true
    }
  },

  futureDate(message = 'La fecha debe ser futura') {
    return (value) => {
      if (!value) return true
      const date = new Date(value)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (date < today) {
        return message
      }
      return true
    }
  },

  pastDate(message = 'La fecha debe ser pasada') {
    return (value) => {
      if (!value) return true
      const date = new Date(value)
      const today = new Date()
      today.setHours(23, 59, 59, 999)
      if (date > today) {
        return message
      }
      return true
    }
  },

  sameAs(fieldName, getOtherValue, message = 'Los campos no coinciden') {
    return (value) => {
      if (!value) return true
      const otherValue = getOtherValue()
      if (value !== otherValue) {
        return message
      }
      return true
    }
  },

  custom(validatorFn, message = 'Valor inválido') {
    return (value) => {
      if (!value) return true
      if (!validatorFn(value)) {
        return message
      }
      return true
    }
  },

  between(min, max, message = null) {
    return (value) => {
      if (!value) return true
      const num = Number(value)
      if (isNaN(num) || num < min || num > max) {
        return message || `El valor debe estar entre ${min} y ${max}`
      }
      return true
    }
  }
}

export function validateForm(rules, formData) {
  const errors = {}
  let isValid = true

  for (const [field, fieldRules] of Object.entries(rules)) {
    errors[field] = []
    const value = formData[field]

    for (const rule of fieldRules) {
      const result = typeof rule === 'function' ? rule(value) : rule
      if (result !== true && result) {
        errors[field].push(result)
        isValid = false
      }
    }

    if (errors[field].length === 0) {
      delete errors[field]
    }
  }

  return { isValid, errors }
}
