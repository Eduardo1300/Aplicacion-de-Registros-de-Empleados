# 📋 REFERENCIA RÁPIDA - Toast Notifications

## 1️⃣ Importar

```javascript
import { useNotification } from '../services/notification.service'
```

## 2️⃣ Instanciar

```javascript
data() {
  return {
    notification: useNotification()
  }
}
```

## 3️⃣ Usar

```javascript
// Éxito
this.notification.success('Mensaje')

// Error
this.notification.error('Mensaje')

// Advertencia
this.notification.warning('Mensaje')

// Información
this.notification.info('Mensaje')
```

---

## 🎨 Colores por Tipo

| Tipo | Color | Hex | Uso |
|------|-------|-----|-----|
| Success | Verde | #10b981 | Operaciones exitosas |
| Error | Rojo | #ef4444 | Errores |
| Warning | Amarillo | #f59e0b | Advertencias |
| Info | Azul | #3b82f6 | Información |

---

## ⏱️ Duración

```javascript
// Default: 3000ms (3 segundos)
this.notification.success('Mensaje')

// Personalizado (5 segundos)
this.notification.success('Mensaje', 5000)

// Sin auto-cerrar
this.notification.warning('Mensaje', 0)
```

---

## 🔗 Métodos Disponibles

### `success(message, duration?)`
```javascript
this.notification.success('¡Éxito!')
this.notification.success('Guardado', 5000)
```

### `error(message, duration?)`
```javascript
this.notification.error('Algo salió mal')
this.notification.error('Error 500', 5000)
```

### `warning(message, duration?)`
```javascript
this.notification.warning('Verifica esto')
this.notification.warning('Campo requerido', 3000)
```

### `info(message, duration?)`
```javascript
this.notification.info('Información importante')
this.notification.info('5 elementos cargados', 2000)
```

---

## 📚 Patrones Comunes

### CRUD - Crear

```javascript
async save() {
  try {
    await api.create(this.data)
    this.notification.success('Creado correctamente')
  } catch (err) {
    this.notification.error('Error al crear')
  }
}
```

### CRUD - Actualizar

```javascript
async update(id) {
  try {
    await api.update(id, this.data)
    this.notification.success('Actualizado correctamente')
  } catch (err) {
    this.notification.error('Error al actualizar')
  }
}
```

### CRUD - Eliminar

```javascript
async delete(id) {
  try {
    await api.delete(id)
    this.notification.success('Eliminado correctamente', 2000)
  } catch (err) {
    this.notification.error('Error al eliminar')
  }
}
```

### Validación

```javascript
submit() {
  if (!this.name) {
    this.notification.warning('El nombre es obligatorio')
    return
  }
  this.save()
}
```

### Carga de Datos

```javascript
async load() {
  try {
    this.data = await api.get()
    this.notification.info('Datos cargados', 2000)
  } catch (err) {
    this.notification.error('Error al cargar')
  }
}
```

### Con Retraso

```javascript
async loginAndRedirect() {
  try {
    const res = await api.login(this.form)
    this.notification.success(`¡Bienvenido ${res.name}!`)
    setTimeout(() => {
      this.$router.push('/dashboard')
    }, 1500)
  } catch (err) {
    this.notification.error('Login fallido')
  }
}
```

---

## 🔄 Manejo de Errores

### Por tipo de error

```javascript
async operation() {
  try {
    await api.doSomething()
  } catch (err) {
    const status = err.response?.status
    
    if (status === 401) {
      this.notification.error('Sesión expirada')
    } else if (status === 403) {
      this.notification.error('Permiso denegado')
    } else if (status === 404) {
      this.notification.warning('No encontrado')
    } else if (status === 500) {
      this.notification.error('Error del servidor')
    } else {
      this.notification.error('Error desconocido')
    }
  }
}
```

### Con mensaje del servidor

```javascript
async operation() {
  try {
    await api.doSomething()
    this.notification.success('OK')
  } catch (err) {
    const msg = err.response?.data?.message || 'Error'
    this.notification.error(msg)
  }
}
```

---

## 🎯 Casos de Uso Reales

### Login

```javascript
async handleLogin() {
  try {
    const res = await api.login(this.form)
    localStorage.setItem('token', res.token)
    this.notification.success(`¡Bienvenido ${res.name}!`)
    setTimeout(() => this.$router.push('/'), 500)
  } catch (err) {
    this.notification.error('Credenciales inválidas')
  }
}
```

### Guardar Perfil

```javascript
async saveProfile() {
  try {
    await api.updateProfile(this.profile)
    this.notification.success('Perfil actualizado')
  } catch (err) {
    this.notification.error('Error al guardar perfil')
  }
}
```

### Cambiar Contraseña

```javascript
async changePassword() {
  if (this.newPassword.length < 8) {
    this.notification.warning('Mínimo 8 caracteres')
    return
  }
  if (this.newPassword !== this.confirmPassword) {
    this.notification.error('Las contraseñas no coinciden')
    return
  }
  try {
    await api.changePassword(this.currentPassword, this.newPassword)
    this.notification.success('Contraseña cambiada')
  } catch (err) {
    this.notification.error('Error al cambiar contraseña')
  }
}
```

### Búsqueda

```javascript
async search() {
  if (!this.query) {
    this.notification.warning('Ingresa un término')
    return
  }
  try {
    this.results = await api.search(this.query)
    if (this.results.length === 0) {
      this.notification.info('No hay resultados')
    }
  } catch (err) {
    this.notification.error('Error en búsqueda')
  }
}
```

### Descarga

```javascript
async download() {
  try {
    this.notification.info('Descargando...', 0)
    const data = await api.export()
    // ... descargar archivo
    this.notification.success('Descargado')
  } catch (err) {
    this.notification.error('Error en descarga')
  }
}
```

### Carga de Archivo

```javascript
async uploadFile(file) {
  if (file.size > 5 * 1024 * 1024) {
    this.notification.error('Archivo muy grande')
    return
  }
  try {
    this.notification.info('Subiendo...', 0)
    await api.upload(file)
    this.notification.success('Subido exitosamente')
  } catch (err) {
    this.notification.error('Error en carga')
  }
}
```

### Operación Larga

```javascript
async processData() {
  this.notification.info('Procesando...', 0)
  try {
    const result = await api.heavyOperation()
    this.notification.success(`Procesados ${result.count} elementos`)
  } catch (err) {
    this.notification.error('Error en procesamiento')
  }
}
```

---

## ⚙️ Configuración

### Cambiar duración por defecto

```javascript
// Componentes con 5 segundos por defecto
const notification = useNotification(5000)
```

### Cambiar colores

En `src/services/notification.service.js`:

```javascript
const toastConfig = {
  success: { bgColor: '#10b981', borderColor: '#059669' },
  error: { bgColor: '#ef4444', borderColor: '#dc2626' },
  warning: { bgColor: '#f59e0b', borderColor: '#d97706' },
  info: { bgColor: '#3b82f6', borderColor: '#2563eb' }
}
```

### Cambiar iconos

En el mismo archivo:

```javascript
success: { icon: '✓' },   // Cambiar símbolo
error: { icon: '✗' },
warning: { icon: '⚠' },
info: { icon: 'ℹ' }
```

---

## 🎨 Personalización

### Estilos del toast

En `src/components/ToastContainer.vue` → `<style>`:

```css
.toast {
  padding: 14px 16px;      /* Espaciado */
  border-radius: 8px;      /* Esquinas */
  border-left: 5px solid;  /* Grosor borde */
  box-shadow: ...          /* Sombra */
}
```

### Animaciones

```css
@keyframes slideInRight {
  from { transform: translateX(450px); }
  to { transform: translateX(0); }
}

@keyframes slideOutRight {
  from { transform: translateX(0); }
  to { transform: translateX(450px); }
}
```

---

## 🐛 Debugging

### Ver estado actual

```javascript
import { getNotificationState } from '../services/notification.service'
const state = getNotificationState()
console.log(state.toasts)
```

### Probar en consola

```javascript
// En F12 → Console
const { useNotification } = await import('/src/services/notification.service.js')
const n = useNotification()
n.success('Test desde consola')
```

---

## 📱 Responsive

✅ Desktop: Max 450px
✅ Tablet: Adaptable
✅ Mobile: Full-width con márgenes

Ajusta en `ToastContainer.vue`:

```css
@media (max-width: 640px) {
  .toast-container {
    top: 10px;
    right: 10px;
    left: 10px;  /* Para mobile */
  }
}
```

---

## 📖 Links de Documentación

- **Guía Rápida:** `TOAST_GUIA_RAPIDA.md`
- **Documentación Completa:** `TOAST_DOCUMENTATION.md`
- **20+ Ejemplos:** `TOAST_EJEMPLOS.js`
- **Checklist:** `TOAST_CHECKLIST.md`
- **Resumen:** `TOAST_RESUMEN.md`

---

## 💡 Tips

1. **Siempre valida antes de mostrar error**
2. **Usa info para feedback de carga**
3. **Combina success + navegación**
4. **No spammees notificaciones**
5. **Personaliza mensajes según contexto**

---

## ✅ Checklist Rápido

- [ ] Importaste `useNotification`
- [ ] Instanciaste en `data()`
- [ ] Usas los 4 métodos correctamente
- [ ] Manejas errores con `.error()`
- [ ] Usas `.success()` después de operaciones
- [ ] Personalizas duración cuando es necesario
- [ ] Toasts se ven correctamente en móvil

---

**Última actualización:** 3 de enero de 2026  
**Versión:** 1.0  
**Listo para:** Producción ✅
