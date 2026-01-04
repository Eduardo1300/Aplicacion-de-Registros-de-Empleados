# 🔧 GUÍA DE TROUBLESHOOTING

## 🚨 Problemas Comunes y Soluciones

---

## 1. ❌ Backend no inicia

### Síntoma
```
Error: ECONNREFUSED - Database connection failed
Error: listen EADDRINUSE :::3000
```

### Solución

#### Opción A: Reiniciar Docker
```bash
cd backend-nest

# Detener todo
docker-compose down -v

# Limpiar volúmenes
docker volume prune

# Iniciar nuevamente
docker-compose up -d

# Ver logs
docker-compose logs -f
```

#### Opción B: Puerto 3000 ocupado
```bash
# Windows - Ver qué ocupa el puerto
netstat -ano | findstr :3000

# Matar el proceso (reemplaza PID)
taskkill /PID 12345 /F

# Linux/Mac
lsof -i :3000
kill -9 PID
```

#### Opción C: PostgreSQL no conecta
```bash
# Verificar que PostgreSQL está corriendo
docker-compose ps

# Ver logs de PostgreSQL
docker-compose logs postgres

# Reiniciar solo BD
docker-compose restart postgres
```

---

## 2. ❌ Frontend no carga

### Síntoma
```
Error: Cannot GET /
Blank white page
ERR_CONNECTION_REFUSED
```

### Solución

#### Opción A: Puerto 4200 ocupado
```bash
# Verificar puerto
netstat -ano | findstr :4200

# Cambiar puerto en vite.config.js
export default {
  server: {
    port: 3100  // Cambiar a otro puerto
  }
}
```

#### Opción B: npm dependencies no instaladas
```bash
cd frontend

# Limpiar e reinstalar
rm -rf node_modules package-lock.json

# Instalar nuevamente
npm install

# Ejecutar
npm run dev
```

#### Opción C: Caché de Vite
```bash
# Limpiar caché de Vite
rm -rf frontend/.vite

# Reiniciar
npm run dev
```

---

## 3. ❌ Frontend no conecta con Backend

### Síntoma
```
Error: Failed to fetch from http://localhost:3000/api/auth/login
CORS error
Network tab: 500 error
```

### Solución

#### Paso 1: Verificar Backend está corriendo
```bash
# Esto debería devolver algo (aunque sea error)
curl http://localhost:3000/api/auth/login

# Si no funciona, backend no está corriendo
# Ejecutar: npm run start:dev en backend-nest/
```

#### Paso 2: Verificar URL en api.js
```javascript
// frontend/src/services/api.js debe tener:
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api'  // ✅ Correcto
})
```

#### Paso 3: CORS habilitado en backend
```typescript
// backend-nest/src/main.ts debe tener:
app.enableCors({
  origin: 'http://localhost:4200',
  credentials: true
})
```

#### Paso 4: Limpiar cache del navegador
```javascript
// Abrir Console del navegador y ejecutar:
localStorage.clear()
sessionStorage.clear()
// Recargar la página Ctrl+Shift+R
```

---

## 4. ❌ Error de autenticación

### Síntoma
```
"Invalid credentials"
"User not found"
"Token expired"
401 Unauthorized
```

### Solución

#### Opción A: Credenciales incorrectas
```
Verificar que estén correctas:
Usuario: admin (no "admin@email.com")
Contraseña: admin123 (exactamente)
```

#### Opción B: Base de datos sin usuarios
```bash
# Verificar en PostgreSQL
psql -U postgres -d bd_registro_empleados

# Ejecutar:
SELECT * FROM usuarios;

# Si está vacío, ejecutar init.sql
psql -U postgres -d bd_registro_empleados < backend-nest/init.sql
```

#### Opción C: Token expirado
```javascript
// En navegador:
localStorage.removeItem('token')
// Volver a hacer login
```

#### Opción D: JWT Secret no coincide
```typescript
// Verificar JWT_SECRET en:
// backend-nest/src/main.ts (o .env)

// Debe ser consistente. Si cambiaste, cambiar en ambos lados:
// 1. Backend: main.ts o .env
// 2. Frontend: No necesita, usa el token que backend devuelve
```

---

## 5. ❌ Errores 404 en API

### Síntoma
```
404 Not Found en /api/empleado
404 Not Found en /api/asistencia
```

### Solución

#### Paso 1: Verificar Backend compiló correctamente
```bash
cd backend-nest

# Limpiar dist
rm -rf dist

# Recompilar
npm run build

# Si hay errores, revisar:
npx tsc --noEmit
```

#### Paso 2: Verificar rutas en módulos
```typescript
// Debe estar en los controllers:
@Controller('empleado')    // ✅ Correcto
@Controller('api/empleado') // ❌ Incorrecto
```

#### Paso 3: Reiniciar backend
```bash
npm run start:dev

# Debería mostrar:
"Nest application successfully started on port 3000"
```

---

## 6. ❌ Error de base de datos

### Síntoma
```
"database does not exist"
"relation ... does not exist"
"Connection timeout"
```

### Solución

#### Opción A: Base de datos no existe
```bash
# Crear base de datos
createdb bd_registro_empleados

# O con Docker:
docker exec postgres-db createdb -U postgres bd_registro_empleados

# Inicializar con script
psql bd_registro_empleados < backend-nest/init.sql
```

#### Opción B: Tablas no existen
```bash
# Ejecutar script de inicialización
psql -U postgres -d bd_registro_empleados < backend-nest/init.sql

# O con Docker:
docker exec -i postgres-db psql -U postgres -d bd_registro_empleados < backend-nest/init.sql
```

#### Opción C: PostgreSQL no inicia
```bash
# Ver estado
docker-compose ps

# Ver logs
docker-compose logs postgres

# Reiniciar
docker-compose restart postgres

# Esperar 10 segundos y verificar
docker-compose ps
```

---

## 7. ❌ npm install falla

### Síntoma
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE could not resolve dependency
npm ERR! peer dep missing
```

### Solución

```bash
# Opción 1: Forzar instalación
npm install --legacy-peer-deps

# Opción 2: Limpiar e reinstalar
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

# Opción 3: Usar versión específica de npm
npm install -g npm@10

# Opción 4: Revisar node_modules
npm ls  # Ver dependencias en conflicto
```

---

## 8. ❌ Puerto ya en uso

### Síntoma
```
Error: listen EADDRINUSE :::3000
Error: listen EADDRINUSE :::4200
Error: listen EADDRINUSE :::5432
```

### Solución - Windows
```bash
# Ver qué ocupa el puerto
netstat -ano | findstr :3000

# Resultado: TCP ... LISTENING 12345
# Matar proceso
taskkill /PID 12345 /F

# Verificar está libre
netstat -ano | findstr :3000
```

### Solución - Linux/Mac
```bash
# Ver qué ocupa el puerto
lsof -i :3000

# Resultado: node  12345 user
# Matar proceso
kill -9 12345

# Verificar está libre
lsof -i :3000
```

### Solución - Cambiar puerto
```javascript
// vite.config.js (Frontend)
export default {
  server: {
    port: 3100  // Cambiar a otro
  }
}

// backend-nest/src/main.ts
await app.listen(3001)  // Cambiar a otro
```

---

## 9. ❌ CORS Error

### Síntoma
```
Access to XMLHttpRequest at 'http://localhost:3000/api/login' 
from origin 'http://localhost:4200' has been blocked by CORS policy
```

### Solución

#### Verificar Backend tiene CORS habilitado
```typescript
// backend-nest/src/main.ts
const app = await NestFactory.create(AppModule);

app.enableCors({
  origin: [
    'http://localhost:4200',
    'http://localhost:3100'
  ],
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
});

await app.listen(3000);
```

---

## 10. ❌ Vue Router no funciona

### Síntoma
```
Blank page después de login
Routes no cargan
"Cannot find component"
```

### Solución

#### Verificar router/index.js existe
```bash
ls -la frontend/src/router/

# Debe existir index.js
```

#### Verificar main.js importa router
```javascript
// frontend/src/main.js debe tener:
import { createRouter, createWebHistory } from 'vue-router'
import routes from './router'

const router = createRouter({
  history: createWebHistory(),
  routes: routes.default || routes
})

app.use(router)
```

#### Verificar views existen
```bash
ls -la frontend/src/views/
# Debe haber: Login.vue, Dashboard.vue, etc
```

---

## 11. ❌ Axios Interceptor no funciona

### Síntoma
```
Token no se envía en Authorization header
"Unauthorized" en requests
```

### Solución

#### Verificar api.js tiene interceptor
```javascript
// frontend/src/services/api.js
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api'
})

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default apiClient
```

#### Verificar token está en localStorage
```javascript
// En Console del navegador:
localStorage.getItem('token')

// Debe devolver algo como:
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## 12. ❌ Error de TypeScript en Backend

### Síntoma
```
error TS2307: Cannot find module
error TS2688: Cannot find type definition
```

### Solución

```bash
cd backend-nest

# Reinstalar dependencias
npm install

# Compilar sin ejecutar
npx tsc

# Limpiar y recompilar
rm -rf dist
npm run build

# Ver errores específicos
npm run build 2>&1 | head -20
```

---

## 🔍 VERIFICACIÓN COMPLETA

### Checklist de Troubleshooting

```
[ ] Node.js 18+ instalado: node -v
[ ] npm 9+ instalado: npm -v
[ ] PostgreSQL corriendo: psql --version
[ ] Docker corriendo: docker --version
[ ] Backend en puerto 3000: curl http://localhost:3000
[ ] Frontend en puerto 4200: curl http://localhost:4200
[ ] BD "bd_registro_empleados" existe: psql -l
[ ] Usuarios en BD: psql bd_registro_empleados -c "SELECT * FROM usuarios"
[ ] Token en localStorage: F12 → Application → localStorage
[ ] Axios URL correcta: http://localhost:3000/api
[ ] CORS habilitado en backend
[ ] Rutas protegidas con guards
[ ] npm dependencies sin vulnerabilidades: npm audit
```

---

## 🆘 ÚLTIMO RECURSO: Reset Completo

```bash
# 1. Parar todo
docker-compose down -v
cd frontend && rm -rf node_modules package-lock.json && cd ..

# 2. Limpiar Docker
docker system prune -a -v

# 3. Limpiar caché
npm cache clean --force

# 4. Iniciar desde cero
docker-compose up -d
cd frontend && npm install && npm run dev
```

---

## 📞 CONTACTO

Si nada funciona:

1. Revisar los logs:
   ```bash
   docker-compose logs -f
   ```

2. Revisar archivos críticos:
   - `backend-nest/src/main.ts` (CORS, puerto)
   - `frontend/src/services/api.js` (URL)
   - `frontend/src/router/index.js` (rutas)

3. Revisar documentación:
   - [backend-nest/README.md](./backend-nest/README.md)
   - [frontend/README.md](./frontend/README.md)

---

**Versión**: 1.0  
**Última actualización**: 22 de Diciembre 2025
