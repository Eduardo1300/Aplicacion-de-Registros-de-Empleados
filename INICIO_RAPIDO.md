# INICIO RÁPIDO - Sistema de Registro de Empleados

## ✅ Migración Completada

Su aplicación ha sido migrada exitosamente de:
- **Spring Boot 3.4.4** → **NestJS 11**
- **MySQL 8** → **PostgreSQL 15**

---

## 🚀 OPCIÓN 1: Con Docker (RECOMENDADO)

### Requisitos
- Docker Desktop instalado

### Pasos
```bash
cd backend-nest
docker-compose up --build
```

✅ Listo en 30 segundos

### Acceder a la aplicación
- Backend: http://localhost:3000/api
- PostgreSQL: localhost:5432

---

## 🚀 OPCIÓN 2: Sin Docker

### Requisitos
- PostgreSQL instalado
- Node.js 18+ instalado

### Pasos Windows
```bash
cd backend-nest
migrate.bat
npm install
npm run start:dev
```

### Pasos Linux/Mac
```bash
cd backend-nest
chmod +x migrate.sh
./migrate.sh
npm install
npm run start:dev
```

✅ Backend estará en http://localhost:3000

---

## 🎯 Próximos Pasos

1. **Iniciar el Frontend**
   ```bash
   cd frontend
   npm install
   npm run start
   ```
   Acceso en: http://localhost:4200

2. **Crear usuario administrador** (opcional)
   ```sql
   INSERT INTO roles (nombre, descripcion) VALUES 
   ('ADMIN', 'Administrador');
   
   INSERT INTO usuarios (nombre_usuario, clave, rol_id, activo) VALUES 
   ('admin', 'hashed_password', 1, true);
   ```

3. **Obtener lista de empleados**
   ```bash
   curl http://localhost:3000/api/empleado
   ```

---

## 📚 Documentación Completa

Ver `GUIA_MIGRACION.md` para información detallada sobre:
- Estructura del proyecto
- Endpoints disponibles
- Troubleshooting
- Seguridad
- Migraciones de datos

---

## 🔧 Comandos Útiles

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build && npm run start:prod

# Compilar
npm run build

# Tests
npm run test

# Linting
npm run lint

# Docker
docker-compose up --build
docker-compose down
```

---

## ⚠️ Variables de Entorno Importantes

El archivo `.env` ya está configurado con valores por defecto:
- `DB_HOST=localhost`
- `DB_PORT=5432`
- `DB_USERNAME=postgres`
- `DB_PASSWORD=postgres`
- `DB_NAME=bd_registro_empleados`
- `PORT=3000`

**Para cambiar**, edite `.env` antes de iniciar.

---

## 🆘 Problemas Comunes

### "Port 3000 already in use"
```bash
# Cambiar puerto en .env
PORT=3001
```

### "Cannot connect to database"
Asegurese que PostgreSQL está corriendo:
```bash
# Windows
Services → PostgreSQL → Start

# Linux
sudo systemctl start postgresql

# Mac
brew services start postgresql
```

### "Database does not exist"
```bash
# Ejecutar manualmente
psql -U postgres -d bd_registro_empleados -f init.sql
```

---

¿Necesita ayuda? Revise los logs o la documentación completa en `GUIA_MIGRACION.md`
