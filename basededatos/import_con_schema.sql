-- Crear esquema para los datos importados
CREATE SCHEMA IF NOT EXISTS registro_empleados;

-- Establecer el esquema por defecto para esta sesión
SET search_path TO registro_empleados, public;

-- Ahora incluir el backup
\i bd_registro_empleados_backup.sql
