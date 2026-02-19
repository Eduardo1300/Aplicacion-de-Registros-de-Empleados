-- Migración para agregar campos de empleado login
-- Ejecutar después de init.sql

-- Agregar campos faltantes a la tabla empleados
ALTER TABLE empleados ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);
ALTER TABLE empleados ADD COLUMN IF NOT EXISTS dias_vacaciones INTEGER DEFAULT 15;
ALTER TABLE empleados ADD COLUMN IF NOT EXISTS dias_vacaciones_usados INTEGER DEFAULT 0;

-- Actualizar empleados existentes con valores por defecto
UPDATE empleados SET dias_vacaciones = 15 WHERE dias_vacaciones IS NULL;
UPDATE empleados SET dias_vacaciones_usados = 0 WHERE dias_vacaciones_usados IS NULL;

-- Crear empleados de prueba para el portal de empleados
-- Password para todos: empleado123 (bcrypt hash)
INSERT INTO empleados (nombre, apellido, dni, correo, telefono, fechaIngreso, estado, password_hash, dias_vacaciones, dias_vacaciones_usados, departamento_id, cargo_id)
VALUES
('Juan', 'Pérez García', '12345678', 'juan.perez@empresa.com', '987654321', '2024-01-15', 'Activo', '$2a$10$OVBhvpTKy9pQmKF3RzAQ3eN8q5VMbp8S3UZxPM3G6L5W2E.Fy/.n.', 15, 0, 1, 1),
('María', 'López Hernández', '87654321', 'maria.lopez@empresa.com', '912345678', '2024-03-20', 'Activo', '$2a$10$OVBhvpTKy9pQmKF3RzAQ3eN8q5VMbp8S3UZxPM3G6L5W2E.Fy/.n.', 15, 2, 2, 2),
('Carlos', 'Ramírez Torres', '11223344', 'carlos.ramirez@empresa.com', '923456789', '2024-06-01', 'Activo', '$2a$10$OVBhvpTKy9pQmKF3RzAQ3eN8q5VMbp8S3UZxPM3G6L5W2E.Fy/.n.', 15, 0, 1, 3)
ON CONFLICT (dni) DO NOTHING;

-- Insertar algunos registros de asistencia de ejemplo para hoy
INSERT INTO asistencias (empleado_id, fechaAsistencia, horaEntrada, horaSalida, estado)
SELECT
  e.id,
  CURRENT_DATE,
  '08:00:00',
  '18:00:00',
  'PRESENTE'::estado_asistencia
FROM empleados e
WHERE e.dni = '12345678'
AND NOT EXISTS (
  SELECT 1 FROM asistencia WHERE empleado_id = e.id AND fechaAsistencia = CURRENT_DATE
);

-- Insertar registro de ayer
INSERT INTO asistencia (empleado_id, fechaAsistencia, horaEntrada, horaSalida, minutosTardanza, estado)
SELECT
  e.id,
  CURRENT_DATE - INTERVAL '1 day',
  '08:15:00',
  '18:00:00',
  15,
  'TARDANZA'::estado_asistencia
FROM empleados e
WHERE e.dni = '12345678'
AND NOT EXISTS (
  SELECT 1 FROM asistencia WHERE empleado_id = e.id AND fechaAsistencia = CURRENT_DATE - INTERVAL '1 day'
);

-- Insertar solicitudes de licencia de ejemplo
INSERT INTO solicitudes_licencia (empleado_id, tipo_licencia_id, fechaInicio, fechaFin, diasSolicitados, razon, estado)
SELECT
  e.id,
  1,
  CURRENT_DATE + INTERVAL '7 days',
  CURRENT_DATE + INTERVAL '10 days',
  4,
  'Vacaciones programadas',
  'PENDIENTE'
FROM empleados e
WHERE e.dni = '12345678'
AND NOT EXISTS (
  SELECT 1 FROM solicitudes_licencia WHERE empleado_id = e.id AND estado = 'PENDIENTE'
);

INSERT INTO solicitudes_licencia (empleado_id, tipo_licencia_id, fechaInicio, fechaFin, diasSolicitados, razon, estado)
SELECT
  e.id,
  2,
  CURRENT_DATE - INTERVAL '5 days',
  CURRENT_DATE - INTERVAL '3 days',
  3,
  'Licencia médica',
  'APROBADA'
FROM empleados e
WHERE e.dni = '87654321'
AND NOT EXISTS (
  SELECT 1 FROM solicitudes_licencia WHERE empleado_id = e.id AND estado = 'APROBADA'
);

-- Actualizar saldos de licencia
INSERT INTO saldos_licencia (empleado_id, tipo_licencia_id, anio, diasDisponibles, diasUsados)
SELECT
  e.id,
  1,
  EXTRACT(YEAR FROM CURRENT_DATE)::integer,
  15,
  0
FROM empleados e
ON CONFLICT (empleado_id, tipo_licencia_id, anio)
DO UPDATE SET diasDisponibles = 15;

-- Verificar la estructura actual de empleados
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'empleados'
ORDER BY ordinal_position;
