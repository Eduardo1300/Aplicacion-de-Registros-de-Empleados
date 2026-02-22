# 📦 Importar Base de Datos en Render

## Método 1: Desde tu Terminal (Recomendado)

Abre tu terminal y navega a la carpeta del proyecto, luego ejecuta:

```bash
psql postgresql://tienda_db_0rhl_user:MgdRVS5Kn30WuQM64u7ZHBANrleLh0eb@dpg-d6d3kpsr85hc73bkaoa0-a.oregon-postgres.render.com/tienda_db_0rhl < basededatos/import_schema.sql
```

**Espera a que termine (pueden ser varios segundos).**

---

## Método 2: Desde Render Dashboard

1. Ve a [render.com](https://render.com)
2. Selecciona tu PostgreSQL database
3. Ve a la pestaña **"Query"**
4. Copia y pega el contenido de `basededatos/import_schema.sql`
5. Ejecuta (Click en el botón Run)

---

## Método 3: Verificar que se importó correctamente

Después de importar, ejecuta en tu terminal:

```bash
PGPASSWORD="MgdRVS5Kn30WuQM64u7ZHBANrleLh0eb" psql -h dpg-d6d3kpsr85hc73bkaoa0-a.oregon-postgres.render.com -U tienda_db_0rhl_user -d tienda_db_0rhl -c "SELECT * FROM information_schema.tables WHERE table_schema = 'registro_empleados';"
```

Deberías ver 11 tablas:
- asistencias
- departamentos
- empleados
- horarios
- justificaciones
- licencias
- nominas
- permisos
- roles
- usuarios
- y más...

---

## Datos de Conexión

| Parámetro | Valor |
|-----------|-------|
| **Host** | dpg-d6d3kpsr85hc73bkaoa0-a.oregon-postgres.render.com |
| **Usuario** | tienda_db_0rhl_user |
| **Contraseña** | MgdRVS5Kn30WuQM64u7ZHBANrleLh0eb |
| **Base de datos** | tienda_db_0rhl |
| **Puerto** | 5432 (por defecto) |
| **Schema** | registro_empleados |

---

## Archivos

- `bd_registro_empleados_backup.sql` - Backup completo de la BD local
- `import_schema.sql` - Script para importar con esquema `registro_empleados`

---

## ⚠️ Importante

- El script crea automáticamente el esquema `registro_empleados`
- Todas las tablas e datos estarán en ese esquema
- Si ya existen datos en Render, se **reemplazarán**

