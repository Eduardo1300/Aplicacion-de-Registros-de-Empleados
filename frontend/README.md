# 🎉 Frontend Vue.js - Sistema de Registro de Empleados

> **Migración completada**: Angular → Vue.js 3

## 🚀 Inicio Rápido

### 1. Instalar dependencias
```bash
cd frontend
npm install
```

### 2. Desarrollo
```bash
npm run dev
```
- Frontend disponible en: **http://localhost:4200**

### 3. Build Producción
```bash
npm run build
```

## 📁 Estructura

```
frontend/
├── src/
│   ├── components/       # Componentes reutilizables
│   ├── views/           # Páginas principales
│   │   ├── Login.vue    # Autenticación
│   │   ├── Dashboard.vue # Panel principal
│   │   ├── Empleados.vue # CRUD empleados
│   │   ├── Asistencias.vue # Registro asistencias
│   │   └── Licencias.vue # Solicitudes licencias
│   ├── services/
│   │   └── api.js       # Cliente Axios + Endpoints
│   ├── router/
│   │   └── index.js     # Vue Router + Guards
│   ├── App.vue          # Componente raíz
│   ├── main.js          # Punto de entrada
│   └── style.css        # Estilos globales
├── vite.config.js       # Configuración Vite
├── index.html           # HTML template
└── package.json         # Dependencias
```

## 🔐 Credenciales de Prueba

| Usuario | Contraseña | Rol |
|---------|-----------|-----|
| admin | admin123 | ADMIN |
| empleado | empleado123 | EMPLEADO |

## 🛠️ Tecnologías

- **Vue.js 3** - Framework frontend
- **Vue Router 4** - Enrutamiento
- **Axios** - Cliente HTTP
- **Bootstrap 5** - Estilos
- **Vite** - Build tool

## 📡 API Connection

Conecta a: `http://localhost:3000/api`

**Endpoints mapeados:**
- `POST /auth/login` - Autenticación
- `GET /api/empleado` - Lista empleados
- `GET /api/asistencia` - Asistencias
- `GET /api/solicitud-licencia` - Licencias

## 🔄 Autenticación JWT

1. Login → Recibe token
2. Token guardado en localStorage
3. Interceptor añade token en Authorization header
4. Router Guard protege rutas

## 📱 Características

✅ Login y autenticación con JWT  
✅ Dashboard con estadísticas  
✅ CRUD de Empleados  
✅ Registro de Asistencias  
✅ Gestión de Licencias  
✅ Responsive Design  
✅ Manejo de errores  

## 🚨 Troubleshooting

**Error de conexión con backend:**
```bash
# Verificar que backend está corriendo en puerto 3000
npm run start:dev   # En backend-nest/
```

**Puerto 4200 ocupado:**
```javascript
// Cambiar en vite.config.js
server: {
  port: 3100  // Cambiar aquí
}
```

**Token expirado:**
- Volver a Login
- Token se renueva automáticamente

## 📦 Build Stats

- **Tamaño total:** ~800KB (minificado)
- **Archivos:** 5 vistas principales
- **Componentes:** Modulares y reutilizables

---

**Versión:** 1.0  
**Última actualización:** 22/12/2025
