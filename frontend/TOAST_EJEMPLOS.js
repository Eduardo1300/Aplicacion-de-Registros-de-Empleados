// ============================================================================
// EJEMPLOS DE CÓDIGO LISTOS PARA COPIAR-PEGAR
// Sistema de Notificaciones Toast - Vue.js 3
// ============================================================================

// ============================================================================
// 1. IMPORTAR EN CUALQUIER COMPONENTE
// ============================================================================

// Opción A: En setup()
import { useNotification } from '../services/notification.service'

export default {
  setup() {
    const notification = useNotification()
    
    return {
      notification
    }
  }
}

// Opción B: En data()
import { useNotification } from '../services/notification.service'

export default {
  data() {
    return {
      notification: useNotification()
    }
  }
}

// ============================================================================
// 2. NOTIFICACIONES SIMPLES
// ============================================================================

// Éxito
this.notification.success('¡Operación completada!')

// Error
this.notification.error('Algo salió mal')

// Advertencia
this.notification.warning('Presta atención a esto')

// Información
this.notification.info('Información importante')

// ============================================================================
// 3. CON DURACIÓN PERSONALIZADA
// ============================================================================

// Mostrar durante 2 segundos
this.notification.success('Listo', 2000)

// Mostrar durante 5 segundos
this.notification.error('Error grave', 5000)

// Mostrar indefinidamente (el usuario lo cierra manualmente)
this.notification.warning('Espera a que lo cierres', 0)

// ============================================================================
// 4. PATRÓN: OPERACIONES ASINCRÓNICAS
// ============================================================================

async createUser() {
  try {
    const response = await api.post('/users', this.formData)
    this.notification.success('Usuario creado exitosamente')
    this.loadUsers()  // Recargar lista
  } catch (error) {
    this.notification.error(error.response?.data?.message || 'Error al crear usuario')
  }
}

async updateUser(id) {
  try {
    await api.put(`/users/${id}`, this.formData)
    this.notification.success('Usuario actualizado')
    this.loadUsers()
  } catch (error) {
    this.notification.error('Error al actualizar usuario')
  }
}

async deleteUser(id) {
  try {
    await api.delete(`/users/${id}`)
    this.notification.success('Usuario eliminado', 2000)
    this.loadUsers()
  } catch (error) {
    this.notification.error('No se pudo eliminar el usuario')
  }
}

// ============================================================================
// 5. PATRÓN: VALIDACIÓN DE FORMULARIOS
// ============================================================================

submitForm() {
  // Validar campo obligatorio
  if (!this.formData.nombre?.trim()) {
    this.notification.warning('El nombre es obligatorio')
    return
  }

  if (!this.formData.correo?.trim()) {
    this.notification.warning('El correo es obligatorio')
    return
  }

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(this.formData.correo)) {
    this.notification.error('El correo no es válido')
    return
  }

  // Validar teléfono
  if (this.formData.telefono && !/^\d{7,}$/.test(this.formData.telefono.replace(/\D/g, ''))) {
    this.notification.warning('El teléfono debe tener al menos 7 dígitos')
    return
  }

  // Si todo es válido
  this.saveForm()
}

// ============================================================================
// 6. PATRÓN: MANEJO DE ERRORES DE API
// ============================================================================

async loadData() {
  try {
    const response = await api.get('/data')
    this.data = response.data
    this.notification.info('Datos cargados', 2000)
  } catch (error) {
    if (error.response?.status === 401) {
      this.notification.error('Sesión expirada, por favor inicia sesión')
      this.$router.push('/login')
    } else if (error.response?.status === 403) {
      this.notification.error('No tienes permiso para acceder')
    } else if (error.response?.status === 404) {
      this.notification.warning('No se encontraron datos')
    } else if (error.response?.status === 500) {
      this.notification.error('Error del servidor, intenta más tarde')
    } else if (error.request) {
      this.notification.error('Error de conexión, verifica tu internet')
    } else {
      this.notification.error('Error desconocido')
    }
  }
}

// ============================================================================
// 7. PATRÓN: OPERACIONES EXITOSAS CON RETRASO
// ============================================================================

async loginUser() {
  try {
    const response = await api.login(this.credentials)
    const { token, user } = response.data
    
    // Guardar datos
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    
    // Mostrar notificación
    this.notification.success(`¡Bienvenido, ${user.nombre}!`)
    
    // Navegar después de que se vea la notificación
    setTimeout(() => {
      this.$router.push('/dashboard')
    }, 1500)
  } catch (error) {
    this.notification.error('Usuario o contraseña incorrectos')
  }
}

// ============================================================================
// 8. PATRÓN: NOTIFICACIONES EN BULK/LOTE
// ============================================================================

async importarDatos() {
  try {
    const response = await api.post('/import', this.file)
    const { creados, actualizados, errores } = response.data
    
    if (creados > 0) {
      this.notification.success(`${creados} registros creados`)
    }
    if (actualizados > 0) {
      this.notification.success(`${actualizados} registros actualizados`)
    }
    if (errores > 0) {
      this.notification.warning(`${errores} registros con error`)
    }
    
    this.reloadData()
  } catch (error) {
    this.notification.error('Error al importar datos')
  }
}

// ============================================================================
// 9. PATRÓN: CONFIRMACIÓN ANTES DE ACCIÓN
// ============================================================================

confirmDelete(id, nombre) {
  // En template: @click="showConfirmDialog = true"
  this.itemToDelete = { id, nombre }
  this.showConfirmDialog = true
}

async finalizeDelete() {
  try {
    await api.delete(`/items/${this.itemToDelete.id}`)
    this.notification.success(`${this.itemToDelete.nombre} eliminado`, 2000)
    this.showConfirmDialog = false
    this.loadItems()
  } catch (error) {
    this.notification.error('No se pudo eliminar el elemento')
  }
}

// ============================================================================
// 10. PATRÓN: CAMBIO DE ESTADO CON NOTIFICACIÓN
// ============================================================================

async toggleActive(id, currentStatus) {
  try {
    const newStatus = !currentStatus
    await api.patch(`/items/${id}`, { active: newStatus })
    
    const message = newStatus ? 'Activado' : 'Desactivado'
    this.notification.success(`${message} correctamente`, 2000)
    this.loadItems()
  } catch (error) {
    this.notification.error('Error al cambiar estado')
  }
}

// ============================================================================
// 11. PATRÓN: NOTIFICACIONES EN CICLO DE VIDA
// ============================================================================

export default {
  mounted() {
    this.loadData()
  },
  
  beforeUnmount() {
    // Mostrar notificación si hay cambios sin guardar
    if (this.hasUnsavedChanges) {
      this.notification.warning('Tienes cambios sin guardar', 0)
    }
  }
}

// ============================================================================
// 12. PATRÓN: FEEDBACK DE BÚSQUEDA
// ============================================================================

async searchItems() {
  if (!this.searchTerm?.trim()) {
    this.notification.warning('Ingresa un término de búsqueda')
    return
  }

  try {
    const response = await api.get('/search', {
      params: { q: this.searchTerm }
    })
    
    if (response.data.length === 0) {
      this.notification.info('No se encontraron resultados', 3000)
    } else {
      this.notification.success(`${response.data.length} resultados encontrados`, 2000)
    }
    
    this.results = response.data
  } catch (error) {
    this.notification.error('Error en la búsqueda')
  }
}

// ============================================================================
// 13. PATRÓN: DESCARGA/EXPORTACIÓN
// ============================================================================

async downloadReport() {
  try {
    this.notification.info('Generando archivo...', 0)  // Sin auto-cierre
    const response = await api.get('/reports/export', {
      responseType: 'blob'
    })
    
    // Crear descarga
    const url = window.URL.createObjectURL(response.data)
    const link = document.createElement('a')
    link.href = url
    link.download = `reporte-${new Date().toISOString()}.pdf`
    link.click()
    
    // La notificación se cierra manualmente después
    setTimeout(() => {
      this.notification.success('Descarga completada', 3000)
    }, 500)
  } catch (error) {
    this.notification.error('Error al descargar el archivo')
  }
}

// ============================================================================
// 14. PATRÓN: VALIDACIÓN ASINCRÓNICA
// ============================================================================

async checkEmailUniqueness(email) {
  try {
    const response = await api.get(`/check-email/${email}`)
    
    if (response.data.exists) {
      this.notification.warning('Este correo ya está registrado')
      return false
    }
    
    this.notification.success('Correo disponible', 1500)
    return true
  } catch (error) {
    this.notification.error('Error al verificar correo')
    return false
  }
}

// ============================================================================
// 15. PATRÓN: CAMBIO DE CONTRASEÑA
// ============================================================================

async changePassword() {
  // Validar
  if (this.currentPassword !== this.storedPassword) {
    this.notification.error('Contraseña actual incorrecta')
    return
  }

  if (this.newPassword.length < 8) {
    this.notification.warning('La contraseña debe tener al menos 8 caracteres')
    return
  }

  if (this.newPassword !== this.confirmPassword) {
    this.notification.error('Las contraseñas no coinciden')
    return
  }

  try {
    await api.post('/change-password', {
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    })
    
    this.notification.success('Contraseña cambiada exitosamente')
    this.resetForm()
  } catch (error) {
    this.notification.error('Error al cambiar contraseña')
  }
}

// ============================================================================
// 16. PATRÓN: MÚLTIPLES OPERACIONES SIMULTÁNEAS
// ============================================================================

async syncAllData() {
  const results = {
    success: 0,
    failed: 0
  }

  try {
    // Ejecutar múltiples operaciones
    const promises = [
      api.post('/sync/usuarios'),
      api.post('/sync/empleados'),
      api.post('/sync/asistencias')
    ]

    const responses = await Promise.allSettled(promises)

    responses.forEach((result) => {
      if (result.status === 'fulfilled') {
        results.success++
      } else {
        results.failed++
      }
    })

    // Notificar resultados
    if (results.failed === 0) {
      this.notification.success(`Sincronización completada: ${results.success} elementos`)
    } else {
      this.notification.warning(
        `Sincronización parcial: ${results.success} OK, ${results.failed} fallaron`
      )
    }
  } catch (error) {
    this.notification.error('Error en la sincronización')
  }
}

// ============================================================================
// 17. USO EN WATCHERS
// ============================================================================

watch(
  () => this.formData.email,
  async (newEmail) => {
    if (!newEmail) return
    
    try {
      const response = await api.validateEmail(newEmail)
      if (!response.data.valid) {
        this.notification.warning('Correo no válido')
      }
    } catch (error) {
      this.notification.error('Error validando correo')
    }
  },
  { debounce: 1000 }  // Esperar 1 segundo después de dejar de escribir
)

// ============================================================================
// 18. PATRÓN: REINTENTOS CON NOTIFICACIÓN
// ============================================================================

async fetchDataWithRetry(maxRetries = 3) {
  let retries = 0

  const attempt = async () => {
    try {
      const response = await api.get('/data')
      this.notification.success('Datos cargados exitosamente', 2000)
      return response.data
    } catch (error) {
      retries++

      if (retries < maxRetries) {
        this.notification.warning(`Reintentando... (${retries}/${maxRetries})`, 2000)
        // Esperar 2 segundos antes de reintentar
        await new Promise(resolve => setTimeout(resolve, 2000))
        return attempt()
      } else {
        this.notification.error('No se pudieron cargar los datos después de varios intentos')
        throw error
      }
    }
  }

  return await attempt()
}

// ============================================================================
// 19. PATRÓN: NOTIFICACIONES EN EVENTOS
// ============================================================================

// En template:
// @submit.prevent="handleSubmit"
// @input="handleInput"
// @focus="handleFocus"
// @blur="handleBlur"

handleFocus() {
  // Limpiar errores previos sin notificación visual
  this.fieldError = null
}

handleBlur(fieldName) {
  // Validar al perder el foco
  if (!this.validateField(fieldName)) {
    const fieldLabel = this.getFieldLabel(fieldName)
    this.notification.warning(`${fieldLabel} no es válido`, 2000)
  }
}

handleInput(fieldName, value) {
  // Feedback en tiempo real (sin spam)
  if (this.shouldNotifyForInput(fieldName)) {
    this.notification.info(`${fieldName} actualizado`, 1000)
  }
}

// ============================================================================
// 20. PATRÓN: CARGA DE ARCHIVOS
// ============================================================================

async uploadFile(file) {
  // Validar tamaño
  const maxSize = 5 * 1024 * 1024  // 5MB
  if (file.size > maxSize) {
    this.notification.error('El archivo es muy grande (máximo 5MB)')
    return
  }

  // Validar tipo
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']
  if (!allowedTypes.includes(file.type)) {
    this.notification.warning('Tipo de archivo no permitido')
    return
  }

  try {
    this.notification.info('Subiendo archivo...', 0)  // Sin auto-cierre

    const formData = new FormData()
    formData.append('file', file)

    const response = await api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    this.notification.success('Archivo subido exitosamente')
    this.fileUrl = response.data.url
  } catch (error) {
    this.notification.error('Error al subir el archivo')
  }
}

// ============================================================================
// FIN DE EJEMPLOS
// ============================================================================
