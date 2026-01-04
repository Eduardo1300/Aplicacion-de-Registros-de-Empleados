# 🔍 Guía de Debugging - Problema de Navegación en Gráficos

## 📋 Mejoras Implementadas v2

Se han agregado herramientas avanzadas de debugging para diagnosticar exactamente qué está pasando:

### 1. **Logging Detallado con Timestamps**
```javascript
[GRAFICOS] Component mounted at 14:32:45.123
[GRAFICOS] Current route: /graficos
[GRAFICOS] ===== INICIANDO CARGA DE DATOS =====
[GRAFICOS] Llamando APIs...
[GRAFICOS] ✅ Empleados cargados: 10
[GRAFICOS] ===== CARGA COMPLETADA EN 245ms =====
```

### 2. **Watcher para Monitorear Cambios de Ruta**
```javascript
watch: {
  '$route.path'(newPath, oldPath) {
    console.log('[GRAFICOS] Route changed from', oldPath, 'to', newPath)
  }
}
```

### 3. **Router Scroll Reset**
Ahora cuando cambias de ruta, automáticamente se resetea el scroll a la parte superior.

### 4. **Limpieza Completa de Datos**
```javascript
resetAllData() {
  // Limpia TODOS los datos: arrays, gráficos, estadísticas
  this.empleados = null
  this.totalEmpleados = 0
  // ... etc
}
```

## 🧪 Cómo Debuggear el Problema

### Paso 1: Abre la Consola del Navegador
```
Presiona F12 → Console
```

### Paso 2: Navega a Gráficos
Verás logs como:
```
[GRAFICOS] Component mounted at 14:32:45
[GRAFICOS] Current route: /graficos
[GRAFICOS] ===== INICIANDO CARGA DE DATOS =====
[GRAFICOS] Llamando APIs...
[GRAFICOS] ✅ Empleados cargados: 10
[GRAFICOS] ✅ Asistencias cargadas: 65
[GRAFICOS] ✅ Licencias cargadas: 4
[GRAFICOS] Calculando estadísticas...
[GRAFICOS] Generando gráficos...
[GRAFICOS] ===== CARGA COMPLETADA EN 245ms =====
```

### Paso 3: Haz clic en Otra Vista (Empleados)
Deberías ver:
```
[GRAFICOS] Route changed from /graficos to /empleados
[GRAFICOS] Saliendo de gráficos, limpiando recursos
[GRAFICOS] Data cleanup completed
[GRAFICOS] Component UNmounting at 14:33:10
[GRAFICOS] Cleaning up all data...
[GRAFICOS] Data cleanup completed
```

**Luego aparecerá el componente Empleados**

### Paso 4: Vuelve a Gráficos
El ciclo se repite desde el Paso 2.

## 🐛 Qué Buscar en los Logs

| Síntoma | Causa Probable | Solución |
|---------|---|---|
| No ves "Component mounted" | El router-view no está rechazando el componente | Verificar App.vue |
| No ves "Route changed" | El watcher no está funcionando | Verificar Vue version |
| Los logs se repiten indefinidamente | Hay un loop o re-render infinito | Ver Chromr DevTools → Performance |
| "Component UNmounting" no aparece | El beforeUnmount no se ejecuta | Problema crítico con Vue |

## 📊 Archivos Modificados

| Archivo | Cambios |
|---------|---------|
| `Graficos.vue` | ✅ Logging detallado, watcher, resetAllData() mejorado |
| `router/index.js` | ✅ Agregado `router.afterEach()` para scroll reset |
| `App.vue` | ✅ `:key="$route.fullPath"` en router-view |

## 🔧 Configuración de Console para Mejor Visualización

Si los logs te abruman, puedes filtrar por "[GRAFICOS]" en la consola:

1. En la barra de filter de la consola, escribe: `[GRAFICOS]`
2. Solo verás logs del componente Gráficos

## ⚠️ Si Aún No Funciona

Si después de estos cambios **sigue sin cambiar de vista**, es posible que:

1. **Vue no está destruyendo el componente**
   - Abre DevTools → Vue → Inspecciona el árbol de componentes
   - Verifica que Graficos se desmonte y se monte de nuevo

2. **Hay un CSS `position: fixed` o `z-index` alto**
   - Verifica en DevTools → Elements que no haya overlay invisible
   - Busca `position: fixed` en Graficos.vue styles

3. **El router-view no se está actualizando**
   - Verifica que `$route.fullPath` esté cambiando en la URL
   - Abre DevTools → Network → observa si hay cambios

## 🎯 Test Interactivo

Copia esto en la consola para testear manualmente:

```javascript
// Ver qué componente está activo
console.log('Componentes activos:', document.querySelector('[data-testid]')?.innerHTML)

// Resetear manualmente
window.location.hash = '#/empleados'
// O
router.push('/empleados')
```

## 📈 Mejoras Futuras Recomendadas

Si el problema persiste, las siguientes técnicas pueden ayudar:

1. **Usar Teleport** para los gráficos
2. **Mover lógica a Pinia/Store** (estado global)
3. **Reemplazar el router por hash router**
4. **Usar `<Suspense>` para mejor control de carga**

---

**Fecha:** Enero 2026  
**Compilación:** ✅ 369 módulos, 0 errores, 4.60s  
**Estado del Debugging:** Herramientas de logging instaladas, listo para diagnosticar
