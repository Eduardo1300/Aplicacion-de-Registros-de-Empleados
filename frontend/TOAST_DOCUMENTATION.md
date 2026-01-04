# Sistema de Notificaciones Toast - Documentación

## Descripción

Sistema profesional de notificaciones Toast para Vue.js 3 integrado en el proyecto Sistema-de-Registro-de-Empleados. Proporciona notificaciones no invasivas con animaciones suaves y auto-cierre.

## Características

✅ **4 Tipos de notificación**: success, error, warning, info
✅ **Auto-dismiss**: Se cierran automáticamente después de 3 segundos (configurable)
✅ **Animaciones suaves**: Entrada y salida fluidas desde la derecha
✅ **Botón cerrar**: Permite cerrar manualmente el toast
✅ **Barra de progreso**: Muestra el tiempo restante visualmente
✅ **Diseño responsivo**: Se adapta a pantallas móviles
✅ **Estilos moderno**: Colores profesionales con sombras y efectos
✅ **Composable**:Fácil de usar con la Composition API

## Colores

| Tipo | Color | Código |
|------|-------|--------|
| Success | Verde | #10b981 |
| Error | Rojo | #ef4444 |
| Warning | Amarillo | #f59e0b |
| Info | Azul | #3b82f6 |

## Instalación

Los archivos ya están creados en el proyecto:

```
frontend/
├── src/
│   ├── components/
│   │   └── ToastContainer.vue       ✅ Creado
│   ├── services/
│   │   └── notification.service.js  ✅ Creado
│   └── App.vue                      ✅ Actualizado
```

## Uso

### 1. Importar el composable

```javascript
import { useNotification } from '../services/notification.service'

export default {
  setup() {
    const notification = useNotification()
    
    return {
      notification
    }
  }
}
```

### 2. Alternativa: En data()

```javascript
data() {
  return {
    notification: useNotification()
  }
}
```

### 3. Llamar los métodos

```javascript
// Notificación de éxito
this.notification.success('¡Operación completada!')

// Notificación de error
this.notification.error('Algo salió mal')

// Notificación de advertencia
this.notification.warning('Por favor, revisa esto')

// Notificación de información
this.notification.info('Aquí hay información importante')
```

### 4. Duración personalizada

```javascript
// Mostrar durante 5 segundos
this.notification.success('Mensaje especial', 5000)

// Mostrar permanentemente (0 = sin auto-dismiss)
this.notification.warning('Espera a cerrar', 0)
```

## Ejemplos de Implementación

### Ejemplo 1: Login.vue (Autenticación)

```javascript
async handleLogin() {
  this.loading = true
  
  try {
    const response = await api.login(this.formData)
    const { token, nombreUsuario } = response.data
    
    localStorage.setItem('token', token)
    localStorage.setItem('usuario', JSON.stringify({ nombreUsuario }))
    
    // Mostrar notificación de éxito
    this.notification.success(`¡Bienvenido ${nombreUsuario}!`)
    
    // Navegar después de mostrar el toast
    setTimeout(() => {
      this.$router.push('/dashboard')
    }, 500)
  } catch (err) {
    const errorMsg = err.response?.data?.message || 'Error en la autenticación'
    // Mostrar notificación de error
    this.notification.error(errorMsg)
  } finally {
    this.loading = false
  }
}
```

### Ejemplo 2: Empleados.vue (CRUD)

```javascript
async saveEmpleado() {
  try {
    if (this.editingId) {
      await api.updateEmpleado(this.editingId, this.formData)
      this.notification.success('Empleado actualizado correctamente')
    } else {
      await api.createEmpleado(this.formData)
      this.notification.success('Empleado creado correctamente')
    }
    this.closeModal()
    this.loadEmpleados()
  } catch (err) {
    this.notification.error('Error guardando empleado')
  }
}

async confirmDelete() {
  try {
    await api.deleteEmpleado(this.deleteId)
    this.notification.success('Empleado eliminado correctamente')
    this.loadEmpleados()
  } catch (err) {
    this.notification.error('Error al eliminar empleado')
  }
}

async loadEmpleados() {
  try {
    const response = await api.getEmpleados()
    this.empleados = response.data || []
    this.notification.info('Empleados cargados', 2000)
  } catch (err) {
    this.notification.error('Error al cargar empleados')
  }
}
```

### Ejemplo 3: Validaciones

```javascript
submitForm() {
  // Validar campo obligatorio
  if (!this.formData.nombre) {
    this.notification.warning('El nombre es obligatorio')
    return
  }

  if (!this.formData.correo) {
    this.notification.warning('El correo es obligatorio')
    return
  }

  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(this.formData.correo)) {
    this.notification.error('Formato de correo inválido')
    return
  }

  // Si todo está bien...
  this.saveData()
}
```

## API Completa

### useNotification(defaultDuration = 3000)

Retorna un objeto con los siguientes métodos:

#### `success(message, duration?)`
Notificación de éxito con icono ✓

**Parámetros:**
- `message` (string) - Mensaje a mostrar
- `duration` (number, opcional) - Duración en ms. Default: 3000

**Retorna:** ID del toast (número)

**Ejemplo:**
```javascript
const toastId = this.notification.success('¡Perfecto!')
```

#### `error(message, duration?)`
Notificación de error con icono ✗

**Parámetros:**
- `message` (string) - Mensaje a mostrar
- `duration` (number, opcional) - Duración en ms. Default: 3000

**Retorna:** ID del toast (número)

**Ejemplo:**
```javascript
this.notification.error('Operación fallida', 5000)
```

#### `warning(message, duration?)`
Notificación de advertencia con icono ⚠

**Parámetros:**
- `message` (string) - Mensaje a mostrar
- `duration` (number, opcional) - Duración en ms. Default: 3000

**Retorna:** ID del toast (número)

**Ejemplo:**
```javascript
this.notification.warning('Revisa esto antes de continuar')
```

#### `info(message, duration?)`
Notificación informativa con icono ℹ

**Parámetros:**
- `message` (string) - Mensaje a mostrar
- `duration` (number, opcional) - Duración en ms. Default: 3000

**Retorna:** ID del toast (número)

**Ejemplo:**
```javascript
this.notification.info('Datos cargados correctamente')
```

## Componente ToastContainer.vue

El componente está completamente automatizado. Solo necesitas agregarlo a App.vue (ya está hecho).

**Props:** Ninguno (usa estado reactivo global)

**Características:**
- Escucha cambios en el estado global de notificaciones
- Renderiza múltiples toasts simultáneamente
- Animaciones de entrada/salida
- Barra de progreso animada
- Botón cerrar manual
- Totalmente responsivo

## Personalización

### Cambiar colores

Edita los objetos en `notification.service.js`:

```javascript
const toastConfig = {
  success: {
    icon: '✓',
    type: 'success',
    bgColor: '#10b981',  // ← Cambiar este color
    borderColor: '#059669'  // ← Y este
  },
  // ... resto de tipos
}
```

### Cambiar iconos

```javascript
success: {
  icon: '✅',  // Cambiar de ✓ a ✅
  // ...
}
```

### Cambiar duración por defecto

```javascript
// En componentes:
const notification = useNotification(5000)  // 5 segundos por defecto
```

### Modificar estilos

Edita el `<style>` en `ToastContainer.vue`:

```vue
<style scoped>
.toast {
  padding: 14px 16px;  // Ajustar padding
  border-radius: 8px;  // Ajustar border-radius
  /* etc... */
}
</style>
```

## Casos de Uso Comunes

### 1. Feedback de operaciones CRUD

```javascript
async deleteItem(id) {
  try {
    await api.delete(id)
    this.notification.success('Elemento eliminado')
    this.loadItems()
  } catch (error) {
    this.notification.error('No se pudo eliminar')
  }
}
```

### 2. Validación de formularios

```javascript
onSubmit() {
  if (!this.validateForm()) {
    this.notification.warning('Completa todos los campos')
    return
  }
  this.saveForm()
}
```

### 3. Errores de red

```javascript
async fetchData() {
  try {
    const response = await api.get('/data')
    this.data = response.data
  } catch (error) {
    if (error.response?.status === 404) {
      this.notification.warning('No se encontraron datos')
    } else if (error.response?.status === 500) {
      this.notification.error('Error del servidor')
    } else {
      this.notification.error('Error de conexión')
    }
  }
}
```

### 4. Operaciones de larga duración

```javascript
async exportData() {
  this.notification.info('Generando archivo...', 0)  // Sin auto-dismiss
  try {
    const response = await api.export()
    this.downloadFile(response.data)
    // El toast se cierra manualmente
  } catch (error) {
    this.notification.error('Error al exportar')
  }
}
```

## Ventajas vs Alternativas

| Característica | Toast Service | Alert | Console |
|---|---|---|---|
| No invasivo | ✅ | ❌ | ❌ |
| Visual | ✅ | ✅ | ❌ |
| Auto-dismiss | ✅ | ❌ | N/A |
| Múltiples toasts | ✅ | ❌ | ✅ |
| Animaciones | ✅ | ❌ | ❌ |
| Profesional | ✅ | ❌ | ❌ |

## Troubleshooting

### El ToastContainer no aparece
- Verifica que esté agregado en App.vue: `<ToastContainer />`
- Asegúrate de importarlo en el script

### Los toasts no se cierran
- Verifica que tengan una duración > 0
- Si no quieres auto-dismiss: `notification.info('mensaje', 0)`

### Los estilos se ven mal
- Asegúrate de que Bootstrap y Bootstrap Icons estén cargados
- Verifica que los estilos scoped de ToastContainer estén activos

### Múltiples toasts se apilan
- Esto es correcto, se apilan verticalmente desde arriba-derecha
- Si no quieres múltiples: cierra el anterior antes de crear uno nuevo

## Próximas Mejoras (Opcionales)

1. ✅ Agregar posiciones (top-left, top-center, etc.)
2. ✅ Sonidos de notificación
3. ✅ Toasts con acciones (botones)
4. ✅ Sistema de persistencia (toasts que no desaparecen)
5. ✅ Tema oscuro automático

## Licencia

Libre para usar en el proyecto Sistema-de-Registro-de-Empleados

---

**Creado el:** 3 de enero de 2026
**Última actualización:** 3 de enero de 2026
