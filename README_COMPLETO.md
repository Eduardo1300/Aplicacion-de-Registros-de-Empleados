# 📚 Sistema de Registro de Empleados - Documentación Completa

## 🎯 Descripción del Proyecto

Sistema web integral para gestionar empleados, asistencia, licencias y generar reportes en una organización. Incluye autenticación, control de acceso por roles y análisis de datos en tiempo real.

**Tecnología:** React + NestJS + PostgreSQL  
**Estado:** ✅ En Producción  
**Versión:** 2.0.1

---

## 📋 Tabla de Contenidos

1. [Stack Tecnológico](#stack-tecnológico)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Instalación y Configuración](#instalación-y-configuración)
4. [Guía de Uso](#guía-de-uso)
5. [API REST](#api-rest)
6. [Base de Datos](#base-de-datos)
7. [Arquitectura](#arquitectura)
8. [Autenticación y Seguridad](#autenticación-y-seguridad)
9. [Deployment](#deployment)
10. [Troubleshooting](#troubleshooting)

---

## 🛠️ Stack Tecnológico

### Backend
- **NestJS** ^11.0 - Framework principal
- **TypeScript** ^5.0 - Lenguaje tipado
- **PostgreSQL** 15+ - Base de datos relacional
- **TypeORM** ^0.3.28 - ORM para mapeo
- **Passport.js** ^0.7.0 - Autenticación
- **JWT** ^11.0.2 - Tokens seguros
- **bcryptjs** ^3.0.3 - Hash de contraseñas

### Frontend
- **React** ^18.0 - Framework UI
- **Vite** ^5.0 - Build tool
- **Tailwind CSS** ^3.0 - Estilos
- **React Router** ^6.0 - Enrutamiento
- **Axios** ^1.0 - Cliente HTTP
- **Chart.js** ^4.0 - Gráficos
- **React Hot Toast** ^2.0 - Notificaciones

### DevOps
- **Docker** & **Docker Compose** - Contenedización
- **Render** - Hosting backend
- **Vercel** - Hosting frontend

---

## 📁 Estructura del Proyecto

```
Sistema-de-Registro-de-Empleados/
│
├── backend-nest/
│   ├── src/
│   │   ├── auth/               # Autenticación JWT
│   │   ├── modules/
│   │   │   ├── empleado/       # CRUD empleados
│   │   │   ├── asistencia/     # Control asistencia
│   │   │   ├── licencia/       # Solicitudes licencia
│   │   │   ├── departamento/   # Departamentos
│   │   │   ├── cargo/          # Puestos
│   │   │   └── permission/     # Permisos
│   │   ├── entities/           # Modelos BD
│   │   ├── dto/                # Validación
│   │   ├── database/           # Configuración
│   │   └── main.ts             # Entry point
│   ├── .env                    # Variables entorno
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── package.json
│
├── frontend-react/
│   ├── src/
│   │   ├── components/         # Componentes UI
│   │   ├── views/              # Páginas principales
│   │   ├── services/           # API calls
│   │   ├── router/             # Enrutamiento
│   │   ├── context/            # State management
│   │   ├── utils/              # Funciones auxiliares
│   │   ├── styles/             # CSS/Tailwind
│   │   ├── assets/             # Imágenes/iconos
│   │   └── App.jsx             # Componente raíz
│   ├── .env                    # Variables entorno
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md                   # Este archivo
```

---

## 🚀 Instalación y Configuración

### Requisitos Previos
```
✅ Node.js >= 18
✅ npm >= 9
✅ PostgreSQL >= 13
✅ Git
```

### Paso 1: Clonar Repositorio
```bash
git clone https://github.com/Eduardo1300/Aplicacion-de-Registros-de-Empleados.git
cd Sistema-de-Registro-de-Empleados
```

### Paso 2: Configurar Backend

```bash
cd backend-nest
npm install

# Crear .env
cat > .env << EOF
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=bd_registro_empleados
NODE_ENV=development
PORT=3001
JWT_SECRET=clave-segura-muy-larga-1234567890
EOF

# Iniciar servidor
npm run start:dev
```

### Paso 3: Configurar Frontend

```bash
cd ../frontend-react
npm install

# Crear .env
cat > .env << EOF
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=Sistema de Empleados
EOF

# Iniciar servidor
npm run dev
```

### Paso 4: Acceder a la Aplicación

```
Frontend: http://localhost:5173
Backend: http://localhost:3001
```

**Credenciales por defecto:**
```
Email: admin@empresa.com
Password: Admin123!
```

---

## 📖 Guía de Uso

### 🔐 Módulo de Autenticación

**Login:**
1. Ir a `/login`
2. Ingresar email y contraseña
3. Token JWT se almacena automáticamente
4. Redirigir a Dashboard

**Roles disponibles:**
- `admin` - Acceso total
- `manager` - Gestión de empleados
- `employee` - Solo vista de información

### 👥 Módulo de Empleados

**Funciones:**
- ✅ Crear nuevo empleado
- ✅ Ver lista con paginación
- ✅ Editar información
- ✅ Cambiar estado (Activo/Inactivo)
- ✅ Asignar departamento y cargo
- ✅ Eliminar empleado

**Campos requeridos:**
- Nombre y Apellido
- DNI (único)
- Email (único)
- Teléfono
- Fecha de ingreso
- Departamento
- Cargo

### 📝 Módulo de Asistencias

**Funciones:**
- ✅ Registrar asistencia diaria
- ✅ Ver historial
- ✅ Generar reportes por período
- ✅ Estadísticas automáticas

**Estados:**
- `PRESENTE` - Llegó a tiempo
- `TARDANZA` - Llegó tarde
- `AUSENTE` - No asistió

### 📋 Módulo de Licencias

**Funciones:**
- ✅ Solicitar licencia
- ✅ Ver solicitudes pendientes
- ✅ Aprobar/Rechazar solicitudes
- ✅ Historial completo
- ✅ Cálculo automático de días

**Estados:**
- `PENDIENTE` - En espera
- `APROBADA` - Licencia concedida
- `RECHAZADA` - Licencia denegada

### 📊 Dashboard y Gráficos

**Visualizaciones:**
- Total de empleados
- Asistencias del día
- Licencias pendientes
- Gráficos de tendencias
- Estadísticas por departamento
- Reportes exportables

---

## 🔌 API REST

### URL Base
```
http://localhost:3001/api
```

### Headers Requeridos
```
Authorization: Bearer {token}
Content-Type: application/json
```

### Autenticación

**Login**
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@empresa.com",
  "password": "Admin123!"
}

Respuesta:
{
  "access_token": "eyJhbGc...",
  "user": {
    "id": 1,
    "email": "admin@empresa.com",
    "nombre": "Administrador"
  }
}
```

### Endpoints Principales

#### Empleados
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/empleado` | Listar todos |
| GET | `/empleado/:id` | Obtener uno |
| POST | `/empleado` | Crear |
| PUT | `/empleado/:id` | Actualizar |
| DELETE | `/empleado/:id` | Eliminar |

#### Asistencias
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/asistencia` | Listar |
| POST | `/asistencia` | Registrar |
| GET | `/asistencia/estadisticas/empleado/:id` | Reportes |

#### Licencias
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/solicitud-licencia` | Listar |
| POST | `/solicitud-licencia` | Solicitar |
| POST | `/solicitud-licencia/:id/aprobar` | Aprobar |
| POST | `/solicitud-licencia/:id/rechazar` | Rechazar |

#### Departamentos
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/departamento` | Listar |
| POST | `/departamento` | Crear |
| PUT | `/departamento/:id` | Actualizar |
| DELETE | `/departamento/:id` | Eliminar |

#### Cargos
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/cargo` | Listar |
| POST | `/cargo` | Crear |
| PUT | `/cargo/:id` | Actualizar |
| DELETE | `/cargo/:id` | Eliminar |

### Ejemplo: Crear Empleado
```bash
curl -X POST http://localhost:3001/api/empleado \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan",
    "apellido": "Pérez",
    "dni": "12345678",
    "email": "juan@empresa.com",
    "telefono": "987654321",
    "fechaIngreso": "2024-02-20",
    "estado": "Activo",
    "departamentoId": 1,
    "cargoId": 1
  }'
```

---

## 🗄️ Base de Datos

### Diagrama de Entidades

```
USUARIO → ROL
  ↓
EMPLEADO
  ├─ DEPARTAMENTO
  ├─ CARGO
  ├─ ASISTENCIA (1 a muchos)
  └─ SOLICITUD_LICENCIA (1 a muchos)
```

### Tablas Principales

#### USUARIO
```sql
id | email | password (hash) | nombre | rol_id | created_at
```

#### EMPLEADO
```sql
id | nombre | apellido | dni | email | telefono | 
fechaIngreso | estado | departamento_id | cargo_id | created_at
```

#### ASISTENCIA
```sql
id | empleado_id | estado | fechaAsistencia | 
horaIngreso | horaSalida | observaciones | created_at
```

#### SOLICITUD_LICENCIA
```sql
id | empleado_id | estado | fechaInicio | fechaFin | 
razon | aprobadoPor | fechaAprobacion | created_at
```

#### DEPARTAMENTO
```sql
id | nombre | descripcion | created_at
```

#### CARGO
```sql
id | nombre | descripcion | salarioBase | created_at
```

---

## 🏗️ Arquitectura

### Arquitectura General

```
┌─────────────────────────┐
│   Cliente (Navegador)   │
├─────────────────────────┤
│   Frontend (React)      │
│   - Componentes         │
│   - State Management    │
│   - UI/UX              │
├─────────────────────────┤
│   API Client (Axios)    │
├─────────────────────────┤
│   REST API (NestJS)     │
│   - Controllers         │
│   - Services            │
│   - Guards & Pipes      │
├─────────────────────────┤
│   TypeORM (ORM)         │
├─────────────────────────┤
│   PostgreSQL (BD)       │
└─────────────────────────┘
```

### Patrones de Diseño

**Backend:**
- Repository Pattern - Acceso a datos
- Dependency Injection - Inyección de dependencias
- DTO Pattern - Validación de datos
- Guard Pattern - Protección de rutas
- Pipe Pattern - Transformación de datos

**Frontend:**
- Component Pattern - Componentes reutilizables
- Context API - Gestión de estado global
- Service Layer - Lógica de negocio
- Protected Routes - Rutas privadas

---

## 🔐 Autenticación y Seguridad

### JWT (JSON Web Tokens)

**Flujo:**
1. Usuario login con credenciales
2. Backend valida y genera JWT
3. Frontend almacena token en localStorage
4. Próximas requests incluyen token en header
5. Backend valida token y permite acceso

**Estructura del JWT:**
```
Header.Payload.Signature

Payload contiene:
{
  "sub": 1,
  "email": "user@empresa.com",
  "iat": 1704067200,
  "exp": 1704153600
}
```

### Medidas de Seguridad

✅ Contraseñas hasheadas con bcryptjs  
✅ JWT firmados y verificados  
✅ CORS configurado  
✅ DTOs validan entrada de usuarios  
✅ Guards protegen rutas por rol  
✅ SQL Injection prevenido con TypeORM  
✅ XSS prevenido en React  

---

## 📦 Deployment

### Desplegar en Render (Backend)

1. **Conectar GitHub repo**
   - Ir a render.com
   - Crear nuevo Web Service
   - Seleccionar repositorio

2. **Configurar**
   ```
   Build Command: cd backend-nest && npm install && npm run build
   Start Command: cd backend-nest && npm start
   ```

3. **Variables de Entorno**
   ```
   DATABASE_URL=postgresql://user:pass@host/db
   NODE_ENV=production
   JWT_SECRET=clave-super-segura
   ```

### Desplegar en Vercel (Frontend)

1. **Conectar GitHub repo**
   - Ir a vercel.com
   - New Project
   - Seleccionar repositorio

2. **Configurar**
   ```
   Framework: Vite
   Root Directory: frontend-react
   ```

3. **Variables de Entorno**
   ```
   VITE_API_URL=https://tu-backend.onrender.com/api
   ```

### Con Docker

```bash
# Build
docker-compose build

# Run
docker-compose up -d

# Access
Frontend: http://localhost
Backend: http://localhost:3001
```

---

## 🛠️ Comandos Útiles

### Backend
```bash
# Desarrollo
npm run start:dev

# Producción
npm run start:prod

# Build
npm run build

# Tests
npm run test
npm run test:cov

# Lint
npm run lint

# Migraciones BD
npm run typeorm migration:run
npm run typeorm migration:revert
```

### Frontend
```bash
# Desarrollo
npm run dev

# Build
npm run build

# Preview
npm run preview

# Lint
npm run lint

# Format
npm run format
```

---

## ⚠️ Troubleshooting

### Error: "Cannot find module pg"
```bash
cd backend-nest
npm install pg typeorm
```

### Error: Puerto 3001 en uso
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :3001
kill -9 <PID>
```

### Error: BD no conecta
```bash
# Verificar PostgreSQL corre
psql -U postgres

# Ver conexión en .env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
```

### Error: CORS
- Backend debe estar en http://localhost:3001
- Frontend VITE_API_URL debe ser correcto
- Verificar CORS habilitado en main.ts

### Error: Token inválido
- Limpiar localStorage: `localStorage.clear()`
- Hacer login nuevamente
- Verificar JWT_SECRET igual en .env y código

### Frontend no conecta Backend
- Verificar Backend corre: `npm run start:dev`
- Revisar VITE_API_URL en .env
- Verificar CORS en backend
- Verificar puerto correcto (3001)

---

## 📞 Usuarios de Prueba

| Rol | Email | Password |
|-----|-------|----------|
| Admin | admin@empresa.com | Admin123! |
| Manager | manager@empresa.com | Manager123! |
| Employee | employee@empresa.com | Employee123! |

---

## 📝 Datos de Prueba

Base de datos precargada con:
- ✅ 10+ empleados
- ✅ 5 departamentos
- ✅ 10+ registros asistencia
- ✅ 5 solicitudes licencia
- ✅ 3 usuarios diferentes

---

## 🚀 Próximas Mejoras

- [ ] WebSocket para notificaciones real-time
- [ ] OAuth (Google/Microsoft login)
- [ ] Microservicios si crece
- [ ] Redis para caching
- [ ] GraphQL como alternativa a REST
- [ ] Mobile app con React Native
- [ ] Email notifications automáticas

---

## 📄 Licencia

MIT License - Libre para usar, modificar y distribuir

---

## 👤 Desarrollador

**Eduardo**  
GitHub: [@Eduardo1300](https://github.com/Eduardo1300)

---

## 📞 Soporte

Para problemas o preguntas:
1. Revisar esta documentación
2. Consultar sección [Troubleshooting](#troubleshooting)
3. Abrir issue en GitHub
4. Contactar con el equipo

---

**Última actualización:** Febrero 2026  
**Versión:** 2.0.1  
**Estado:** ✅ Producción
