-- Migracion para portal de empleados
-- Ejecutar: psql -U postgres -d bd_registro_empleados -f migration_empleado_portal_v2.sql

-- Verificar columnas actuales
SELECT column_name FROM information_schema.columns WHERE table_name = 'empleados';

-- Agregar campos faltantes
ALTER TABLE empleados ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);
ALTER TABLE empleados ADD COLUMN IF NOT EXISTS dias_vacaciones INTEGER DEFAULT 15;
ALTER TABLE empleados ADD COLUMN IF NOT EXISTS dias_vacaciones_usados INTEGER DEFAULT 0;

-- Crear empleados de prueba (password: empleado123)
INSERT INTO empleados (nombre, apellido, dni, correo, telefono, "fechaIngreso", estado, password_hash, dias_vacaciones, dias_vacaciones_usados, departamento_id, cargo_id)
SELECT 'Juan', 'Perez Garcia', '12345678', 'juan.perez@empresa.com', '987654321', '2024-01-15', 'Activo', '$2a$10$OVBhvpTKy9pQmKF3RzAQ3eN8q5VMbp8S3UZxPM3G6L5W2E.Fy/.n.', 15, 0, 1, 1
WHERE NOT EXISTS (SELECT 1 FROM empleados WHERE dni = '12345678');

INSERT INTO empleados (nombre, apellido, dni, correo, telefono, "fechaIngreso", estado, password_hash, dias_vacaciones, dias_vacaciones_usados, departamento_id, cargo_id)
SELECT 'Maria', 'Lopez Hernandez', '87654321', 'maria.lopez@empresa.com', '912345678', '2024-03-20', 'Activo', '$2a$10$OVBhvpTKy9pQmKF3RzAQ3eN8q5VMbp8S3UZxPM3G6L5W2E.Fy/.n.', 15, 2, 2, 2
WHERE NOT EXISTS (SELECT 1 FROM empleados WHERE dni = '87654321');

-- Insertar asistencia de ejemplo
INSERT INTO asistencia (empleado_id, "fechaAsistencia", "horaEntrada", "horaSalida", estado)
SELECT e.id, CURRENT_DATE, '08:00:00', '18:00:00', 'PRESENTE'::estado_asistencia
FROM empleados e
WHERE e.dni = '12345678'
AND NOT EXISTS (
  SELECT 1 FROM asistencia WHERE empleado_id = e.id AND "fechaAsistencia" = CURRENT_DATE
);

-- Insertar licencia de ejemplo
INSERT INTO solicitudes_licencia (empleado_id, tipo_licencia_id, "fechaInicio", "fechaFin", diasSolicitados, razon, estado)
SELECT e.id, 1, CURRENT_DATE + 7, CURRENT_DATE + 10, 4, 'Vacaciones programadas', 'PENDIENTE'
FROM empleados e
WHERE e.dni = '12345678'
AND NOT EXISTS (
  SELECT 1 FROM solicitudes_licencia WHERE empleado_id = e.id AND estado = 'PENDIENTE'
);

-- Insertar saldo de licencia
INSERT INTO saldos_licencia (empleado_id, tipo_licencia_id, anio, diasDisponibles, diasUsados)
SELECT e.id, 1, EXTRACT(YEAR FROM CURRENT_DATE)::integer, 15, 0
FROM empleados e
WHERE e.dni = '12345678'
ON CONFLICT (empleado_id, tipo_licencia_id, anio)
DO UPDATE SET diasDisponibles = 15;

-- Verificar empleados creados
SELECT id, nombre, apellido, dni, dias_vacaciones, dias_vacaciones_usados FROM empleados WHERE dni IN ('12345678', '87654321');
