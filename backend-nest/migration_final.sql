-- Migration: Portal de Empleados
-- Ejecutar: psql -U postgres -d bd_registro_empleados -f migration_final.sql

-- 1. Crear empleados de prueba (DNI: 12345678, Password: empleado123)
INSERT INTO empleados (nombre, apellido, dni, correo, telefono, "fechaIngreso", estado, password_hash, dias_vacaciones, dias_vacaciones_usados, departamento_id, cargo_id)
SELECT 'Juan', 'Perez Garcia', '12345678', 'juan.perez@empresa.com', '987654321', '2024-01-15', 'Activo', '$2b$10$L1t1pmgNf2h/ch/xZ42MC.oGdvWvyiRpjR9EW/GfewQj.bLaCWI3G', 15, 0, 1, 1
WHERE NOT EXISTS (SELECT 1 FROM empleados WHERE dni = '12345678');

INSERT INTO empleados (nombre, apellido, dni, correo, telefono, "fechaIngreso", estado, password_hash, dias_vacaciones, dias_vacaciones_usados, departamento_id, cargo_id)
SELECT 'Maria', 'Lopez Hernandez', '87654321', 'maria.lopez@empresa.com', '912345678', '2024-03-20', 'Activo', '$2b$10$L1t1pmgNf2h/ch/xZ42MC.oGdvWvyiRpjR9EW/GfewQj.bLaCWI3G', 15, 2, 2, 2
WHERE NOT EXISTS (SELECT 1 FROM empleados WHERE dni = '87654321');

-- 2. Insertar asistencia de ejemplo
INSERT INTO asistenciaS (empleado_id, "fechaAsistencia", hora_entrada, hora_salida, estado)
SELECT e.id, CURRENT_DATE, '08:00:00', '18:00:00', 'PRESENTE'::asistencias_estado_enum
FROM empleados e
WHERE e.dni = '12345678'
AND NOT EXISTS (
  SELECT 1 FROM asistenciaS WHERE empleado_id = e.id AND "fechaAsistencia" = CURRENT_DATE
);

-- 3. Insertar licencia de ejemplo
INSERT INTO solicitudes_licencia (empleado_id, tipo_licencia_id, "fechaInicio", "fechaFin", "diasSolicitados", razon, estado)
SELECT e.id, 1, CURRENT_DATE + 7, CURRENT_DATE + 10, 4, 'Vacaciones programadas', 'PENDIENTE'
FROM empleados e
WHERE e.dni = '12345678'
AND NOT EXISTS (
  SELECT 1 FROM solicitudes_licencia WHERE empleado_id = e.id AND estado = 'PENDIENTE'
);

-- 4. Insertar saldo de licencia
INSERT INTO saldos_licencia (empleado_id, tipo_licencia_id, anio, "diasDisponibles", "diasUsados")
SELECT e.id, 1, EXTRACT(YEAR FROM CURRENT_DATE)::integer, 15, 0
FROM empleados e
WHERE e.dni = '12345678'
AND NOT EXISTS (
  SELECT 1 FROM saldos_licencia WHERE empleado_id = e.id AND tipo_licencia_id = 1 AND anio = EXTRACT(YEAR FROM CURRENT_DATE)::integer
);

-- 5. Verificar
SELECT id, nombre, apellido, dni FROM empleados WHERE dni IN ('12345678', '87654321');
