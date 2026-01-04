# 📚 EJEMPLOS DE USO PRÁCTICO

## 1. Sistema de Caché

### Guardar datos de usuario con expiración
```javascript
import { useCache } from '@/services/cache.service.js'

const { set, get, has } = useCache()

// Guardar datos por 5 minutos
set('currentUser', { id: 1, nombre: 'Juan' }, 5 * 60 * 1000)

// Recuperar datos
const user = get('currentUser')

// Verificar si existe
if (has('currentUser')) {
  console.log('Usuario en caché')
}
```

---

## 2. Notificaciones Toast

### Notificar acciones al usuario
```javascript
import { useToast } from '@/services/toast.service.js'

const { success, error, warning, info } = useToast()

// Guardar empleado
try {
  await saveEmpleado(data)
  success('✅ Empleado guardado correctamente')
} catch (e) {
  error('❌ Error al guardar: ' + e.message)
}

// Advertencia
warning('⚠️ Este cambio afectará a otros usuarios')

// Info
info('ℹ️ El sistema se sincronizará en breve')
```

---

## 3. Búsqueda Avanzada

### Buscar en tabla de empleados
```javascript
import { useSearch } from '@/services/search.service.js'

const { search, searchByField, addToHistory, getHistory } = useSearch()

// Búsqueda general en todos los campos
const results1 = search('Juan', empleados)

// Búsqueda en campo específico
const results2 = searchByField('juan@email.com', empleados, 'email')

// Búsqueda en múltiples campos
const results3 = search('2024-01', empleados) 
// Busca '2024-01' en cualquier campo

// Agregar al historial
addToHistory('Juan Pérez')

// Ver historial
const history = getHistory() // ['Juan Pérez', ...]
```

---

## 4. Ordenamiento de Datos

### Ordenar tabla dinámicamente
```javascript
import { useSorting } from '@/services/sorting.service.js'

const { sort, multiSort, group, shuffle } = useSorting()

// Ordenar por un campo
const porNombre = sort(empleados, 'nombre', 'asc')
const porFecha = sort(empleados, 'fechaIngreso', 'desc')

// Ordenar por múltiples campos
const sorted = multiSort(empleados, [
  { field: 'departamento', order: 'asc' },
  { field: 'nombre', order: 'asc' }
])

// Agrupar por departamento
const byDept = group(empleados, 'departamento')
// { 'RH': [...], 'TI': [...], ... }

// Shuffle (aleatorio)
const shuffled = shuffle(empleados)
```

---

## 5. Filtrado Avanzado

### Crear filtros complejos
```javascript
import { useFilter } from '@/services/filter.service.js'

const { filterByField, filterByRange, filterByCondition } = useFilter()

// Filtrar por un valor exacto
const activos = filterByField(empleados, 'estado', 'activo')

// Filtrar por rango
const mayoresDe30 = filterByRange(empleados, 'edad', 30, 100)

// Filtrar con condiciones complejas
const resultados = filterByCondition(empleados, [
  { field: 'edad', operator: '>=', value: 25 },
  { field: 'estado', operator: '===', value: 'activo' },
  { field: 'salario', operator: '>', value: 2000 },
  { field: 'departamentos', operator: 'in', value: ['RH', 'TI'] }
])
```

---

## 6. Encriptación

### Proteger datos sensibles
```javascript
import { useEncryption } from '@/services/encryption.service.js'

const { encode, decode, hash, generateToken } = useEncryption()

// Codificar datos
const encoded = encode('informacion_sensible')
// Resultado: aW5mb3JtYWNpb25fc2Vuc2libGU=

// Decodificar
const decoded = decode(encoded)
// Resultado: informacion_sensible

// Hash SHA-256 para contraseñas
const passwordHash = await hash('miContraseña123')

// Generar token único
const token = generateToken()
// Resultado: 8h7g9k2a1f7d3s9q...
```

---

## 7. Exportación de Datos

### Exportar tabla de empleados
```javascript
import { useCsvService } from '@/services/csv-export.service.js'
import { usePdfExport } from '@/services/pdf-export.service.js'

const { exportToCSV, parseCSV } = useCsvService()
const { generatePDF } = usePdfExport()

// Exportar a CSV
const empleados = [
  { id: 1, nombre: 'Juan', email: 'juan@mail.com' },
  { id: 2, nombre: 'María', email: 'maria@mail.com' }
]

exportToCSV(empleados, 'empleados-2024')
// Descarga: empleados-2024-1704067200000.csv

// Exportar a PDF
await generatePDF('Reporte de Empleados', empleados, 
  ['ID', 'Nombre', 'Email'])

// Parsear CSV
const csvText = 'id,nombre\n1,Juan\n2,María'
const parsed = parseCSV(csvText)
// Resultado: [{ id: '1', nombre: 'Juan' }, ...]
```

---

## 8. Internacionalización

### Soporte multi-idioma
```javascript
import { useI18n } from '@/services/i18n.service.js'

const { t, setLocale, addTranslations } = useI18n()

// Traducir con idioma actual (español por defecto)
console.log(t('hello'))      // "Hola"
console.log(t('welcome'))    // "Bienvenido"

// Cambiar idioma
setLocale('en')
console.log(t('hello'))      // "Hello"
console.log(t('welcome'))    // "Welcome"

// Agregar nuevas traducciones
addTranslations('es', {
  'dashboard': 'Inicio',
  'empleados': 'Empleados',
  'reportes': 'Reportes'
})

setLocale('es')
console.log(t('dashboard'))  // "Inicio"

// Cambiar a portugués
setLocale('pt')
console.log(t('hello'))      // "Olá"
```

---

## 9. Notificaciones (Email/Push)

### Enviar notificaciones
```javascript
import { useNotifications } from '@/services/notification.service.js'

const { sendEmail, sendPushNotification, requestPermission } = useNotifications()

// Enviar email
await sendEmail(
  'empleado@mail.com',
  'Confirmación de Asistencia',
  'Tu asistencia de hoy ha sido confirmada'
)

// Solicitar permiso para notificaciones push
const allowed = await requestPermission()

if (allowed) {
  // Enviar notificación push
  await sendPushNotification('✅ Asistencia Confirmada', {
    body: 'Tu check-in de hoy fue registrado',
    icon: '/img/logo.png'
  })
}
```

---

## 10. Limitación de Velocidad

### Proteger endpoints críticos
```javascript
import { useRateLimiter } from '@/services/rate-limiter.service.js'

const { canExecute, reset } = useRateLimiter()

// Login: máximo 5 intentos en 1 minuto
async function handleLogin(credentials) {
  if (!canExecute('login', 5, 60000)) {
    error('❌ Demasiados intentos. Intenta en 1 minuto')
    return
  }
  
  try {
    await login(credentials)
    success('✅ Sesión iniciada')
  } catch (e) {
    error('❌ Credenciales incorrectas')
  }
}

// API: máximo 10 requests en 10 segundos
async function fetchData() {
  if (!canExecute('api_calls', 10, 10000)) {
    error('❌ Ralentiza tus requests')
    return
  }
  return fetch('/api/data')
}
```

---

## 11. Sesiones de Usuario

### Gestionar sesiones activas
```javascript
import { useSessionManager } from '@/services/session-manager.service.js'

const { 
  createSession, 
  getCurrentSession, 
  getActiveSessions,
  destroyExpiredSessions,
  endSession 
} = useSessionManager()

// Crear sesión al login
const sessionId = createSession(userId, {
  loginTime: new Date(),
  ip: userIP,
  userAgent: navigator.userAgent
})

// Obtener sesión actual
const session = getCurrentSession()
console.log(session.id)       // sess_1704067200000_abc...
console.log(session.createdAt) // Date...

// Ver todas las sesiones activas
const activeSessions = getActiveSessions()

// Destruir sesiones expiradas (más de 30 minutos sin actividad)
destroyExpiredSessions(30)

// Cerrar sesión manual
endSession(sessionId)
```

---

## 12. Modo Offline

### Sincronizar requests pendientes
```javascript
import { useOfflineService } from '@/services/offline.service.js'

const { isOnline, queueRequest, processQueue, getQueueSize } = useOfflineService()

// Guardar empleado (online o offline)
async function saveEmpleado(data) {
  if (!isOnline.value) {
    // Guardar en queue si está offline
    queueRequest({
      url: '/api/empleados',
      options: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }
    })
    info('📋 Guardado en cola. Se sincronizará cuando haya conexión')
    console.log(`Requests en cola: ${getQueueSize()}`)
  } else {
    // Enviar directamente si está online
    await fetch('/api/empleados', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    success('✅ Guardado')
  }
}

// El servicio auto-procesa la queue cuando regresa la conexión
```

---

## 13. Cliente HTTP con Reintentos

### Requests automáticos con retry
```javascript
import { useHttpClient } from '@/services/http-client.service.js'

const { get, post, put, delete: deleteReq } = useHttpClient()

// GET con retry automático (3 intentos por defecto)
const empleados = await get('/api/empleados')

// POST con data
const newEmpleado = await post('/api/empleados', {
  nombre: 'Juan',
  email: 'juan@mail.com'
})

// PUT para actualizar
const updated = await put('/api/empleados/1', {
  nombre: 'Juan Pedro'
})

// DELETE
await deleteReq('/api/empleados/1')

// Request personalizado con opciones
const custom = await useHttpClient().request('/api/custom', {
  method: 'PATCH',
  headers: { 'X-Custom': 'value' }
})
```

---

## 14. Monitoreo de Rendimiento

### Medir performance de operaciones
```javascript
import { usePerformanceMonitor } from '@/services/performance-monitor.service.js'

const { mark, measure, getMetrics, getAverageDuration, getMemoryUsage } = usePerformanceMonitor()

// Medir duración de una operación
mark('loadEmpleados-start')

const empleados = await fetchEmpleados()

mark('loadEmpleados-end')
const duration = measure('loadEmpleados', 'loadEmpleados-start', 'loadEmpleados-end')

console.log(`Cargó en ${duration.toFixed(2)}ms`)

// Ver promedio de duración
const avgDuration = getAverageDuration('loadEmpleados')
console.log(`Promedio: ${avgDuration.toFixed(2)}ms`)

// Ver uso de memoria
const memory = getMemoryUsage()
console.log(`Heap usado: ${memory.usedJSHeapSize}`)
console.log(`Heap total: ${memory.totalJSHeapSize}`)

// Ver todas las métricas
const allMetrics = getMetrics()
```

---

## 15. Geolocalización

### Usar ubicación del usuario
```javascript
import { useGeolocation } from '@/services/geolocation.service.js'

const { getLocation, watchLocation, calculateDistance } = useGeolocation()

// Obtener ubicación actual
const location = await getLocation()
console.log(`Lat: ${location.latitude}, Lon: ${location.longitude}`)
console.log(`Precisión: ${location.accuracy}m`)

// Monitorear ubicación en tiempo real
const watchId = watchLocation((location) => {
  console.log(`Nueva ubicación: ${location.latitude}, ${location.longitude}`)
  // Actualizar mapa, notificaciones, etc.
})

// Calcular distancia entre dos puntos (Haversine)
const distancia = calculateDistance(
  19.4326,  // lat1
  -99.1332, // lon1
  19.4240,  // lat2
  -99.1433  // lon2
)
console.log(`Distancia: ${distancia.toFixed(2)}km`)

// Detener monitoreo
navigator.geolocation.clearWatch(watchId)
```

---

## 16. Tema Dinámico

### Cambiar tema de la aplicación
```javascript
import { useTheme } from '@/services/theme.service.js'

const { apply, toggle, isDark, currentTheme, themes } = useTheme()

// Aplicar tema específico
apply('dark')
apply('light')
apply('ocean')
apply('forest')

// Ver tema actual
console.log(currentTheme.value) // 'dark'

// Verificar si está en dark mode
if (isDark()) {
  console.log('Tema oscuro activo')
}

// Alternar entre light y dark
toggle() // Si estaba en light, cambia a dark

// Ver temas disponibles
console.log(themes) // ['light', 'dark', 'ocean', 'forest']
```

---

## 17. Analytics

### Rastrear eventos del usuario
```javascript
import { useAnalytics } from '@/services/analytics.service.js'

const { track, trackPageView, trackUserAction, getStats, export: exportAnalytics } = useAnalytics()

// Rastrear evento personalizado
track('empleado_creado', {
  departamento: 'RH',
  timestamp: new Date(),
  userId: 1
})

// Rastrear página visitada
trackPageView('empleados')
trackPageView('reportes')

// Rastrear acción de usuario
trackUserAction('delete_empleado', {
  empleadoId: 5,
  razon: 'renuncia'
})

// Obtener estadísticas
const stats = getStats()
console.log(`Total eventos: ${stats.totalEvents}`)
console.log(`Eventos únicos: ${stats.uniqueEvents}`)

// Exportar datos para análisis
const jsonData = exportAnalytics()
downloadFile(jsonData, 'analytics.json', 'application/json')
```

---

## 18. Archivos

### Manipular archivos
```javascript
import { useFileService } from '@/services/file.service.js'

const { readFile, readFileAsDataURL, downloadFile, getFileExtension, getFileSize } = useFileService()

// Leer archivo de texto
const file = document.querySelector('input[type="file"]').files[0]
const content = await readFile(file)
console.log(content)

// Leer como URL de datos (imagen, etc)
const dataUrl = await readFileAsDataURL(file)
// Usar en <img :src="dataUrl">

// Descargar archivo
downloadFile('contenido,del,archivo', 'datos.csv', 'text/csv')
downloadFile(JSON.stringify(data), 'data.json', 'application/json')

// Obtener extensión
const ext = getFileExtension('documento.pdf') // 'pdf'

// Obtener tamaño legible
const size = getFileSize(1048576)  // '1.00 MB'
```

---

## 19. QR Code

### Generar códigos QR
```javascript
import { useQRCodeGenerator } from '@/services/qrcode.service.js'

const { generate, downloadQRCode } = useQRCodeGenerator()

// Generar QR
const qrDataUrl = await generate('https://ejemplo.com', {
  width: 300,
  height: 300,
  dark: '#000000',
  light: '#ffffff'
})

// Mostrar en imagen
const img = new Image()
img.src = qrDataUrl
document.body.appendChild(img)

// Descargar como PNG
await downloadQRCode('https://ejemplo.com', 'link_qr')
```

---

## 20. Componentes UI

### Usar componentes nuevos
```javascript
<template>
  <!-- Modal -->
  <Modal ref="modal" title="Confirmar Acción" 
    confirmText="Aceptar" cancelText="Cancelar"
    @confirm="handleConfirm" @cancel="handleCancel">
    ¿Deseas continuar con esta acción?
  </Modal>

  <!-- Loading Overlay -->
  <LoadingOverlay ref="loading" message="Guardando..." />

  <!-- Breadcrumb -->
  <Breadcrumb :items="[
    { label: 'Inicio', to: '/' },
    { label: 'Empleados', to: '/empleados' },
    { label: 'Detalle' }
  ]" />

  <!-- Badge Group -->
  <BadgeGroup :items="[
    { label: 'Activo', variant: 'success' },
    { label: 'RH', variant: 'info' }
  ]" :removable="true" />

  <!-- Stats Card -->
  <div class="row">
    <div class="col-md-3">
      <StatsCard title="Total Empleados" value="156" 
        icon="bi-people" trend="5.2" variant="primary" />
    </div>
  </div>

  <!-- Chart Bar -->
  <ChartBar title="Empleados por Departamento"
    label="Departamento" unit="Cantidad"
    :data="chartData" />
</template>

<script setup>
import Modal from '@/app/components/Modal.vue'
import LoadingOverlay from '@/app/components/LoadingOverlay.vue'
import Breadcrumb from '@/app/components/Breadcrumb.vue'
import BadgeGroup from '@/app/components/BadgeGroup.vue'
import StatsCard from '@/app/components/StatsCard.vue'
import ChartBar from '@/app/components/ChartBar.vue'

const chartData = [
  { id: 1, name: 'RH', value: 25 },
  { id: 2, name: 'TI', value: 45 },
  { id: 3, name: 'Ventas', value: 35 }
]
</script>
```

---

**Todos los servicios y componentes están listos para usar en tu aplicación Vue 3 Empleo.**

