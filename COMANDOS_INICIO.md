# Comandos de Inicio Rápido

## 🚀 Opción 1: Docker (RECOMENDADO)

```bash
cd backend-nest
docker-compose up --build
```

Listo en ~30 segundos. La app estará en: **http://localhost:3000**

---

## 🚀 Opción 2: Local - Windows

```bash
cd backend-nest
migrate.bat
npm install
npm run start:dev
```

---

## 🚀 Opción 3: Local - Linux/Mac

```bash
cd backend-nest
chmod +x migrate.sh
./migrate.sh
npm install
npm run start:dev
```

---

## 🎯 Verificar que funciona

```bash
curl http://localhost:3000/api/empleado
```

Debería retornar una lista vacía: `[]`

---

## 📱 Frontend

```bash
cd frontend
npm install
npm run start
```

Acceso en: **http://localhost:4200**

---

## 🛑 Detener la aplicación

**Docker:**
```bash
docker-compose down
```

**Local:**
Presionar `Ctrl+C` en la terminal

---

## 📚 Documentación

- [GUIA_MIGRACION.md](GUIA_MIGRACION.md) - Guía completa
- [INICIO_RAPIDO.md](INICIO_RAPIDO.md) - Inicio rápido
- [MIGRACION_COMPLETADA.md](MIGRACION_COMPLETADA.md) - Resumen
- [backend-nest/README.md](backend-nest/README.md) - Detalles técnicos

---

## ⚠️ Problemas comunes

### PostgreSQL no está instalado
→ Descargar: https://www.postgresql.org/download/

### Port 3000 en uso
→ Cambiar en `.env`: `PORT=3001`

### Errores de compilación
→ Ejecutar: `npm install && npm run build`

---

¡Listo! 🎉
