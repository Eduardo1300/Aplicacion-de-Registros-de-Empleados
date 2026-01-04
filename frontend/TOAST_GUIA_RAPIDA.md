# 🎉 Toast Notifications - Guía Rápida

## ✅ Estado: 100% Implementado

Los archivos ya están listos en tu proyecto. Solo necesitas conocer cómo usarlos.

## 📁 Archivos Creados

```
frontend/
├── src/
│   ├── components/
│   │   └── ToastContainer.vue              ✅ Componente toast (automático)
│   ├── services/
│   │   └── notification.service.js         ✅ Lógica de notificaciones
│   └── App.vue                             ✅ Actualizado con ToastContainer
├── TOAST_DOCUMENTATION.md                  📖 Documentación completa
└── TOAST_EJEMPLOS.js                       💡 20+ ejemplos de código
```

## 🚀 Uso Inmediato (3 pasos)

### Paso 1: Importar en tu componente

```javascript
import { useNotification } from '../services/notification.service'
```

### Paso 2: Crear la instancia en data()

```javascript
data() {
  return {
    notification: useNotification()
  }
}
```

### Paso 3: Usar en tus métodos

```javascript
this.notification.success('¡Éxito!')
this.notification.error('Algo salió mal')
this.notification.warning('Ten cuidado')
this.notification.info('Información')
```

## 🎨 Colores y Estilos

| Tipo | Color | Uso |
|------|-------|-----|
| 🟢 Success | Verde (#10b981) | Operaciones exitosas |
| 🔴 Error | Rojo (#ef4444) | Errores y fallos |
| 🟡 Warning | Amarillo (#f59e0b) | Advertencias |
| 🔵 Info | Azul (#3b82f6) | Información general |

## 💻 Ejemplos Rápidos

### Operaciones CRUD

```javascript
// Crear
async saveUser() {
  try {
    await api.createUser(this.formData)
    this.notification.success('Usuario creado')
    this.loadUsers()
  } catch (err) {
    this.notification.error('Error al crear')
  }
}

// Eliminar
async deleteUser(id) {
  try {
    await api.deleteUser(id)
    this.notification.success('Usuario eliminado', 2000)
  } catch (err) {
    this.notification.error('Error al eliminar')
  }
}
```

### Validación

```javascript
submitForm() {
  if (!this.name) {
    this.notification.warning('El nombre es obligatorio')
    return
  }
  this.saveForm()
}
```

### Manejo de Errores

```javascript
async loadData() {
  try {
    const response = await api.getData()
    this.data = response.data
  } catch (err) {
    if (err.response?.status === 401) {
      this.notification.error('Sesión expirada')
    } else {
      this.notification.error('Error al cargar datos')
    }
  }
}
```

## ⏱️ Duración Personalizada

```javascript
// Por defecto: 3 segundos
this.notification.success('Mensaje')

// Personalizado: 5 segundos
this.notification.success('Mensaje', 5000)

// Sin auto-cerrar: El usuario lo cierra
this.notification.warning('Atención', 0)

// Corto: 1 segundo
this.notification.info('Cargando...', 1000)
```

## 🔧 Personalización

### Cambiar colores

En `src/services/notification.service.js`, línea ~15:

```javascript
const toastConfig = {
  success: {
    icon: '✓',
    bgColor: '#10b981',      // ← Cambiar color
    borderColor: '#059669'   // ← Cambiar borde
  }
}
```

### Cambiar iconos

En el mismo archivo:

```javascript
success: { icon: '✅' }      // Emoji en vez de símbolo
error: { icon: '❌' }        // Icono personalizado
warning: { icon: '⚠️' }
info: { icon: 'ℹ️' }
```

### Cambiar estilos

En `src/components/ToastContainer.vue`, busca `<style scoped>`:

```css
.toast {
  padding: 14px 16px;        /* Más/menos espaciado */
  border-radius: 8px;        /* Esquinas más redondeadas */
  max-width: 450px;          /* Ancho máximo */
}
```

## 📱 Responsivo

✅ Funciona en escritorio, tablet y móvil
✅ Se adapta al ancho de la pantalla
✅ Toca el botón ✕ para cerrar manualmente
✅ Auto-cierre después de la duración

## 🎯 Casos de Uso Principales

### 1. Login exitoso
```javascript
this.notification.success(`¡Bienvenido ${user.name}!`)
```

### 2. Validación fallida
```javascript
this.notification.warning('Email inválido')
```

### 3. Operación completada
```javascript
this.notification.success('Cambios guardados')
```

### 4. Error de servidor
```javascript
this.notification.error('Error del servidor (500)')
```

### 5. Información útil
```javascript
this.notification.info('10 registros cargados')
```

## 🐛 Troubleshooting

**P: No aparecen los toasts**
R: Verifica que `<ToastContainer />` esté en `App.vue`

**P: Los toasts no desaparecen**
R: Aumenta el tiempo: `notification.warning('msg', 5000)`

**P: Quiero múltiples toasts**
R: Ya está soportado, solo crea varios:
```javascript
this.notification.success('Primero')
this.notification.error('Segundo')
this.notification.info('Tercero')
```

**P: Necesito un toast permanente**
R: Usa duración 0:
```javascript
this.notification.warning('Importante', 0)
```

## 📖 Documentación Completa

Lee `TOAST_DOCUMENTATION.md` para:
- API completa
- Todos los parámetros
- 20+ ejemplos reales
- Casos de uso avanzados

## 💡 Tips

1. **Siempre validar antes de mostrar error:**
   ```javascript
   if (error.response?.data?.message) {
     this.notification.error(error.response.data.message)
   }
   ```

2. **Usar info para feedback de carga:**
   ```javascript
   this.notification.info('Procesando...', 0)
   // ... hacer operación
   this.notification.success('Listo')
   ```

3. **Combinar con rutas:**
   ```javascript
   this.notification.success('Guardado')
   this.$router.push('/dashboard')
   ```

4. **No spammear notificaciones:**
   ```javascript
   // ❌ Malo - mostrará 100 toasts
   for (let i = 0; i < 100; i++) {
     this.notification.info('item ' + i)
   }

   // ✅ Bueno - resumen
   this.notification.success('100 items procesados')
   ```

## 🎊 ¡Listo para usar!

No hay configuración adicional necesaria. Solo importa y usa.

```javascript
import { useNotification } from '../services/notification.service'

// En data()
notification: useNotification()

// En métodos
this.notification.success('¡Funciona!')
```

---

**Fecha de creación:** 3 de enero de 2026  
**Versión:** 1.0  
**Estado:** ✅ Listo para producción
