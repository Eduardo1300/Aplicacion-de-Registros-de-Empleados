# GUÍA COMPLETA DE MIGRACIÓN - Spring Boot a NestJS con PostgreSQL

## 📋 Resumen de Cambios

### Backend
- **Antes**: Spring Boot 3.4.4 + MySQL 8
- **Después**: NestJS 11 + PostgreSQL 15

### Base de Datos
- **Antes**: MySQL (Puerto 3306)
- **Después**: PostgreSQL (Puerto 5432)

### Puerto de Aplicación
- **Antes**: 8080 (Spring Boot)
- **Después**: 3000 (NestJS)

---

## 🚀 PASOS DE INSTALACIÓN Y EJECUCIÓN

### OPCIÓN 1: Con Docker (RECOMENDADO)

#### Requisitos
- Docker
- Docker Compose

#### Pasos

1. **Navegue al directorio del backend NestJS**
```bash
cd backend-nest
```

2. **Ejecute Docker Compose**
```bash
docker-compose up --build
```

Esto iniciará automáticamente:
- PostgreSQL en el puerto 5432
- NestJS Backend en el puerto 3000

3. **Verificar que funciona**
```bash
curl http://localhost:3000/api/auth/login
```

---

### OPCIÓN 2: Instalación Local

#### Requisitos
- Node.js 18+
- npm 8+
- PostgreSQL 12+

#### Pasos

1. **Instalar PostgreSQL**
   - Descargar de: https://www.postgresql.org/download/
   - Crear usuario y contraseña (por defecto: postgres/postgres)

2. **Crear la base de datos**
```bash
cd backend-nest

# En Windows:
migrate.bat

# En Linux/Mac:
chmod +x migrate.sh
./migrate.sh
```

O manualmente:
```bash
# Conectarse a PostgreSQL
psql -U postgres

# Crear base de datos
CREATE DATABASE bd_registro_empleados;

# Ejecutar el script de inicialización
psql -U postgres -d bd_registro_empleados -f init.sql
```

3. **Configurar variables de entorno**

Crear archivo `.env` en `backend-nest/`:
```
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=bd_registro_empleados
PORT=3000
JWT_SECRET=tu_clave_secreta_super_segura_y_larga_para_jwt_1234567890
```

4. **Instalar dependencias**
```bash
npm install
```

5. **Ejecutar en desarrollo**
```bash
npm run start:dev
```

6. **Ejecutar en producción**
```bash
npm run build
npm run start:prod
```

---

## 📱 Actualizar Frontend

### Cambios en environment.ts

El archivo ya ha sido actualizado automáticamente para apuntar a:
```typescript
apiUrl: 'http://localhost:3000/api'
```

Si necesita hacerlo manualmente:
1. Abra: `frontend/src/environments/environment.ts`
2. Cambie: `http://localhost:9090/api` → `http://localhost:3000/api`

### Ejecutar Frontend
```bash
cd frontend
npm install
npm run start
```

La aplicación estará disponible en: http://localhost:4200

---

## 🔌 Endpoints de la API

### Autenticación
```
POST   /api/auth/login           - Login con usuario y contraseña
POST   /api/auth/register        - Registrar nuevo usuario
```

### Empleados
```
GET    /api/empleado             - Listar todos los empleados
GET    /api/empleado/:id         - Obtener empleado por ID
POST   /api/empleado             - Crear nuevo empleado
PUT    /api/empleado/:id         - Actualizar empleado
DELETE /api/empleado/:id         - Eliminar empleado
GET    /api/empleado/dni/:dni    - Obtener empleado por DNI
GET    /api/empleado/departamento/:id - Listar empleados por departamento
```

### Asistencia
```
GET    /api/asistencia           - Listar todas las asistencias
GET    /api/asistencia/:id       - Obtener asistencia por ID
POST   /api/asistencia           - Registrar asistencia
PUT    /api/asistencia/:id       - Actualizar asistencia
DELETE /api/asistencia/:id       - Eliminar asistencia
GET    /api/asistencia/empleado/:id - Listar asistencias de un empleado
GET    /api/asistencia/rango/:inicio/:fin - Asistencias en rango de fechas
```

### Departamentos
```
GET    /api/departamento         - Listar departamentos
GET    /api/departamento/:id     - Obtener departamento
POST   /api/departamento         - Crear departamento
PUT    /api/departamento/:id     - Actualizar departamento
DELETE /api/departamento/:id     - Eliminar departamento
```

### Cargos
```
GET    /api/cargo                - Listar cargos
GET    /api/cargo/:id            - Obtener cargo
POST   /api/cargo                - Crear cargo
PUT    /api/cargo/:id            - Actualizar cargo
DELETE /api/cargo/:id            - Eliminar cargo
```

### Licencias
```
GET    /api/solicitud-licencia           - Listar solicitudes
GET    /api/solicitud-licencia/:id       - Obtener solicitud
POST   /api/solicitud-licencia           - Crear solicitud
DELETE /api/solicitud-licencia/:id       - Eliminar solicitud
GET    /api/solicitud-licencia/empleado/:id - Solicitudes de empleado
GET    /api/solicitud-licencia/estado/:estado - Solicitudes por estado
POST   /api/solicitud-licencia/:id/aprobar - Aprobar solicitud
POST   /api/solicitud-licencia/:id/rechazar - Rechazar solicitud
```

---

## 📊 Estructura de Carpetas

```
backend-nest/
├── src/
│   ├── auth/                    # Módulo de autenticación
│   │   ├── auth.service.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── jwt.strategy.ts
│   │   └── jwt-auth.guard.ts
│   ├── entities/                # Entidades TypeORM
│   │   ├── departamento.entity.ts
│   │   ├── cargo.entity.ts
│   │   ├── rol.entity.ts
│   │   ├── usuario.entity.ts
│   │   ├── empleado.entity.ts
│   │   ├── asistencia.entity.ts
│   │   ├── tipo-licencia.entity.ts
│   │   ├── solicitud-licencia.entity.ts
│   │   └── saldo-licencia.entity.ts
│   ├── modules/
│   │   ├── empleado/
│   │   ├── asistencia/
│   │   ├── departamento/
│   │   ├── cargo/
│   │   └── licencia/
│   ├── dto/                     # Data Transfer Objects
│   ├── database/
│   ├── app.module.ts
│   └── main.ts
├── init.sql                     # Script de inicialización de BD
├── docker-compose.yml           # Configuración Docker
├── Dockerfile                   # Imagen Docker
├── .env                         # Variables de entorno
├── package.json
└── README.md
```

---

## 🔐 Seguridad

### Cambios de Seguridad Implementados

1. **Hashing de Contraseñas**: Ahora usa bcryptjs en lugar de texto plano
   - Las contraseñas existentes necesitarán ser reseteadas

2. **JWT Tokens**: Implementado con @nestjs/jwt
   - Expiración: 24 horas
   - Algoritmo: HS256

3. **CORS**: Configurado para aceptar todas las origins en desarrollo

### Para Cambiar JWT_SECRET

Editar el archivo `.env`:
```
JWT_SECRET=su_clave_secreta_muy_larga_y_segura_aqui
```

---

## 🐛 Troubleshooting

### Error: "Cannot connect to database"
```bash
# Verificar que PostgreSQL está corriendo
# Windows: Buscar PostgreSQL en Servicios
# Linux: sudo systemctl status postgresql
# Mac: brew services list | grep postgresql
```

### Error: "Port 3000 already in use"
```bash
# Cambiar el puerto en .env
PORT=3001

# O matar el proceso en el puerto:
# Windows: netstat -ano | findstr :3000
# Linux: lsof -i :3000 | kill -9
```

### Error: "JWT Token expired"
```bash
# El token tiene 24 horas de expiración
# El usuario debe hacer login nuevamente
```

### Base de datos vacía después de iniciar
```bash
# Ejecutar el script de inicialización manualmente:
psql -U postgres -d bd_registro_empleados -f init.sql
```

---

## 📝 Migraciones de Datos (MySQL → PostgreSQL)

Si tiene datos en MySQL que necesita migrar:

1. **Exportar desde MySQL**
```bash
mysqldump -u root -p bd_registro_empleados > backup.sql
```

2. **Adaptar el script** (cambiar sintaxis SQL a PostgreSQL)

3. **Importar a PostgreSQL**
```bash
psql -U postgres -d bd_registro_empleados -f backup.sql
```

---

## 📚 Documentación Adicional

- **NestJS**: https://docs.nestjs.com
- **TypeORM**: https://typeorm.io
- **PostgreSQL**: https://www.postgresql.org/docs
- **JWT**: https://jwt.io

---

## ✅ Checklist de Migración

- [x] Backend migrado a NestJS
- [x] Base de datos migrada a PostgreSQL
- [x] Autenticación con JWT implementada
- [x] Todas las entidades creadas
- [x] Todos los servicios implementados
- [x] Todos los controladores creados
- [x] CORS configurado
- [x] Docker Compose configurado
- [x] Script de migración creado
- [x] Frontend actualizado para nuevo API

---

## 🎯 Próximos Pasos (Opcionales)

1. Implementar validación con `class-validator`
2. Agregar documentación Swagger/OpenAPI
3. Implementar paginación en endpoints
4. Agregar más módulos (reportes, nómina, etc.)
5. Configurar CI/CD con GitHub Actions
6. Agregar tests unitarios y e2e

---

¿Necesita ayuda? Revise los logs de la aplicación o contacte al equipo de desarrollo.
