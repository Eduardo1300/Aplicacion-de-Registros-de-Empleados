-- Migration: Portal de Empleados con caracteres correctos
-- Ejecutar: psql -U postgres -d bd_registro_empleados -f migration_utf8.sql

-- Insertar empleados con acentos
INSERT INTO empleados (nombre, apellido, dni, correo, telefono, "fechaIngreso", estado, password_hash, dias_vacaciones, dias_vacaciones_usados, departamento_id, cargo_id)
SELECT 'Juan', 'Pérez García', '12345678', 'juan.perez@empresa.com', '987654321', '2024-01-15', 'Activo', '$2b$10$L1t1pmgNf2h/ch/xZ42MC.oGdvWvyiRpjR9EW/GfewQj.bLaCWI3G', 15, 0, 1, 1
WHERE NOT EXISTS (SELECT 1 FROM empleados WHERE dni = '12345678');

INSERT INTO empleados (nombre, apellido, dni, correo, telefono, "fechaIngreso", estado, password_hash, dias_vacaciones, dias_vacaciones_usados, departamento_id, cargo_id)
SELECT 'María', 'López Hernández', '87654321', 'maria.lopez@empresa.com', '912345678', '2024-03-20', 'Activo', '$2b$10$L1t1pmgNf2h/ch/xZ42MC.oGdvWvyiRpjR9EW/GfewQj.bLaCWI3G', 15, 2, 2, 2
WHERE NOT EXISTS (SELECT 1 FROM empleados WHERE dni = '87654321');

INSERT INTO empleados (nombre, apellido, dni, correo, telefono, "fechaIngreso", estado, password_hash, dias_vacaciones, dias_vacaciones_usados, departamento_id, cargo_id)
SELECT 'Carlos', 'Rodríguez Fernández', '11223344', 'carlos.rodriguez@empresa.com', '923456789', '2024-02-10', 'Activo', '$2b$10$L1t1pmgNf2h/ch/xZ42MC.oGdvWvyiRpjR9EW/GfewQj.bLaCWI3G', 15, 0, 1, 3
WHERE NOT EXISTS (SELECT 1 FROM empleados WHERE dni = '11223344');

-- Verificar
SELECT id, nombre, apellido, dni FROM empleados;
