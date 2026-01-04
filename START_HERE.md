# 🚀 INICIA EL PROYECTO AQUÍ

## ⚡ 3 Pasos para Ejecutar

### 1️⃣ Backend + Base de Datos (Con Docker)
```bash
cd backend-nest
docker-compose up -d
```
✅ **Backend**: http://localhost:3000  
✅ **Base de Datos**: PostgreSQL corriendo  
✅ **Usuarios**: admin/admin123 creados automáticamente

### 2️⃣ Instalar Frontend
```bash
cd frontend
npm install
```

### 3️⃣ Ejecutar Frontend
```bash
npm run dev
```
✅ **Frontend**: http://localhost:4200

---

## 🔐 Login

### Credenciales de Prueba

```
ADMIN
├─ Usuario: admin
└─ Contraseña: admin123

EMPLEADO
├─ Usuario: empleado
└─ Contraseña: empleado123
```

---

## 📱 Acceso

| Componente | URL |
|-----------|-----|
| Frontend | http://localhost:4200 |
| Backend API | http://localhost:3000/api |

---

## 🐛 Si Algo Falla

### ❌ Backend no inicia
```bash
# Verificar Docker
docker-compose ps
docker-compose logs

# Reiniciar
docker-compose down -v
docker-compose up -d
```

### ❌ Frontend no se conecta
- Verificar backend corriendo en puerto 3000
- Limpiar localStorage: `localStorage.clear()`
- Recargar página

### ❌ npm dependencies error
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Documentación Completa

- **Backend**: [backend-nest/README.md](./backend-nest/README.md)
- **Frontend**: [frontend/README.md](./frontend/README.md)
- **Proyecto**: [README.md](./README.md)

---

## ✅ ¿Qué puedo hacer?

1. ✅ **Login** con admin/admin123
2. ✅ **Ver Dashboard** con estadísticas
3. ✅ **Crear Empleados** nuevo CRUD
4. ✅ **Registrar Asistencias** diarias
5. ✅ **Solicitar Licencias** y aprobar

---

**¡Listo para comenzar!** 🎉

Cualquier duda revisar README en cada carpeta.
