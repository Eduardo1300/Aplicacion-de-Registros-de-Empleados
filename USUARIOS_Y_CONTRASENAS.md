# 👤 Usuarios y Contraseñas - Sistema de Registro de Empleados

## Usuarios Predefinidos

| Usuario | Contraseña | Rol | Descripción |
|---------|-----------|-----|------------|
| `admin` | `admin123` | ADMIN | Administrador del sistema |
| `empleado` | `admin123` | EMPLEADO | Usuario empleado regular |

## Cómo Iniciar Sesión

### Opción 1: Frontend Angular
1. Ir a `http://localhost:4200`
2. Ingresar usuario y contraseña
3. Hacer clic en "Iniciar Sesión"

### Opción 2: API REST (curl)

```bash
# Login como admin
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"nombreUsuario": "admin", "clave": "admin123"}'

# Respuesta:
# {
#   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
#   "nombreUsuario": "admin",
#   "rol": "ADMIN",
#   "empleadoNombre": "Admin",
#   "empleadoId": null
# }
```

## Registro de Nuevos Usuarios

Aunque hay usuarios predefinidos, también puedes registrar nuevos usuarios:

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d {
    "nombreUsuario": "nuevousuario",
    "clave": "micontraseña123",
    "rolId": 2
  }
```

### Roles Disponibles:
- **1** = ADMIN (Administrador)
- **2** = EMPLEADO (Empleado regular)

## Seguridad

⚠️ **IMPORTANTE:**
- Las contraseñas están hasheadas con bcryptjs (rounds: 10)
- Nunca se almacenan en texto plano
- Los tokens JWT expiran en 24 horas
- CAMBIAR las contraseñas por defecto en producción

## Endpoints de Autenticación

### POST /api/auth/login
Autentica un usuario y retorna un JWT token

**Body:**
```json
{
  "nombreUsuario": "admin",
  "clave": "admin123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "nombreUsuario": "admin",
  "rol": "ADMIN",
  "empleadoNombre": "Admin",
  "empleadoId": null
}
```

### POST /api/auth/register
Registra un nuevo usuario

**Body:**
```json
{
  "nombreUsuario": "nuevousuario",
  "clave": "password123",
  "rolId": 2
}
```

**Response (201):**
```json
{
  "id": 3,
  "nombreUsuario": "nuevousuario",
  "rol": "EMPLEADO",
  "message": "Usuario registrado exitosamente"
}
```

## Usando el Token JWT

Una vez autenticado, incluir el token en el header Authorization para acceder a endpoints protegidos:

```bash
curl -X GET http://localhost:3000/api/empleado \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## Permisos por Rol

### ADMIN
- ✅ Ver todos los empleados
- ✅ Crear/Editar/Eliminar empleados
- ✅ Ver reportes
- ✅ Aprobar/Rechazar licencias
- ✅ Gestionar departamentos y cargos
- ✅ Ver asistencias de todos

### EMPLEADO
- ✅ Ver su información personal
- ✅ Registrar asistencia
- ✅ Solicitar licencias
- ✅ Ver sus solicitudes de licencia
- ❌ No puede editar otros empleados
- ❌ No puede aprobar licencias
- ❌ No puede eliminar datos

## Recuperación de Contraseña

Actualmente no hay sistema de recuperación implementado. Para resetear contraseña:

```sql
-- Conectarse a PostgreSQL como admin
psql -U postgres -d bd_registro_empleados

-- Resetear contraseña (debe hashear manualmente o usar API register)
UPDATE usuarios SET clave = 'nueva_clave_hasheada' WHERE nombre_usuario = 'admin';
```

## Cambiar Contraseña

Para cambiar contraseña, registrar nuevo usuario y eliminar el anterior, o actualizar directamente en BD:

```bash
# Registrar nuevo usuario
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombreUsuario": "admin",
    "clave": "nuevacontraseña456",
    "rolId": 1
  }'
```

---

**Última actualización:** 21/12/2025  
**Sistema:** Sistema de Registro de Empleados  
**Versión:** 1.0 (Migrado a NestJS + PostgreSQL)
