-- Script para cargar datos de ejemplo en la base de datos

-- Insertar departamentos
INSERT INTO departamentos (nombre, descripcion) VALUES
  ('Recursos Humanos', 'Departamento de Recursos Humanos'),
  ('Sistemas', 'Departamento de Sistemas e Informática'),
  ('Contabilidad', 'Departamento de Contabilidad'),
  ('Ventas', 'Departamento de Ventas'),
  ('Logística', 'Departamento de Logística')
ON CONFLICT DO NOTHING;

-- Insertar cargos
INSERT INTO cargos (nombre, descripcion) VALUES
  ('Gerente', 'Gerente de Departamento'),
  ('Jefe de Equipo', 'Jefe de Equipo'),
  ('Analista', 'Analista'),
  ('Especialista', 'Especialista'),
  ('Técnico', 'Técnico'),
  ('Asistente', 'Asistente'),
  ('Coordinador', 'Coordinador')
ON CONFLICT DO NOTHING;

-- Insertar empleados
INSERT INTO empleados (nombre, apellido, dni, correo, telefono, "fechaIngreso", estado, departamento_id, cargo_id) VALUES
  ('Juan', 'Pérez García', '12345678', 'juan.perez@empresa.com', '987654321', '2023-01-15', 'Activo', 2, 1),
  ('María', 'López Martínez', '87654321', 'maria.lopez@empresa.com', '987654322', '2023-02-20', 'Activo', 1, 2),
  ('Carlos', 'Rodríguez Fernández', '11223344', 'carlos.rodriguez@empresa.com', '987654323', '2023-03-10', 'Activo', 2, 3),
  ('Ana', 'González Sánchez', '55667788', 'ana.gonzalez@empresa.com', '987654324', '2023-04-05', 'Activo', 3, 3),
  ('Roberto', 'Martínez López', '99887766', 'roberto.martinez@empresa.com', '987654325', '2023-05-12', 'Activo', 4, 2),
  ('Laura', 'Sánchez García', '44556677', 'laura.sanchez@empresa.com', '987654326', '2023-06-18', 'Activo', 5, 4),
  ('David', 'Flores Jiménez', '22334455', 'david.flores@empresa.com', '987654327', '2023-07-22', 'Activo', 2, 5),
  ('Elena', 'Hernández Castro', '77889900', 'elena.hernandez@empresa.com', '987654328', '2023-08-30', 'Activo', 1, 6),
  ('Francisco', 'Moreno Ruiz', '33445566', 'francisco.moreno@empresa.com', '987654329', '2023-09-14', 'Activo', 3, 5)
ON CONFLICT DO NOTHING;

-- Insertar asistencias de ejemplo (últimos 10 días)
INSERT INTO asistencias (empleado_id, "fechaAsistencia", "horaEntrada", "horaSalida", estado, "minutosTardanza") VALUES
  (1, CURRENT_DATE - 9, '08:00:00', '17:00:00', 'PRESENTE', 0),
  (1, CURRENT_DATE - 8, '08:15:00', '17:30:00', 'TARDANZA', 15),
  (1, CURRENT_DATE - 7, '08:00:00', '17:00:00', 'PRESENTE', 0),
  (2, CURRENT_DATE - 9, '08:00:00', '17:00:00', 'PRESENTE', 0),
  (2, CURRENT_DATE - 8, '08:00:00', '17:00:00', 'PRESENTE', 0),
  (2, CURRENT_DATE - 7, NULL, NULL, 'AUSENTE', 0),
  (3, CURRENT_DATE - 9, '08:30:00', '17:30:00', 'TARDANZA', 30),
  (3, CURRENT_DATE - 8, '08:00:00', '17:00:00', 'PRESENTE', 0),
  (3, CURRENT_DATE - 7, '08:00:00', '17:00:00', 'PRESENTE', 0),
  (4, CURRENT_DATE - 9, '08:00:00', '17:00:00', 'PRESENTE', 0),
  (5, CURRENT_DATE - 8, '08:00:00', '17:00:00', 'PRESENTE', 0),
  (6, CURRENT_DATE - 7, '08:00:00', '17:00:00', 'PRESENTE', 0)
ON CONFLICT DO NOTHING;

-- Insertar saldos de licencia para todos los empleados
INSERT INTO saldos_licencia (empleado_id, tipo_licencia_id, "diasDisponibles", "diasUsados", anio) 
SELECT e.id, tl.id, tl."diasAnuales", 0, 2026
FROM empleados e
CROSS JOIN tipos_licencia tl
ON CONFLICT DO NOTHING;

-- Insertar algunas solicitudes de licencia de ejemplo
INSERT INTO solicitudes_licencia (empleado_id, tipo_licencia_id, "fechaInicio", "fechaFin", "diasSolicitados", razon, estado, usuario_aprobador_id, "afectaSaldo") VALUES
  (1, 1, CURRENT_DATE + 10, CURRENT_DATE + 14, 5, 'Vacaciones personales', 'PENDIENTE', 1, true),
  (2, 2, CURRENT_DATE + 5, CURRENT_DATE + 6, 1, 'Consulta médica', 'APROBADO', 1, true),
  (3, 3, CURRENT_DATE + 20, CURRENT_DATE + 22, 2, 'Asuntos personales', 'RECHAZADO', 1, false),
  (4, 1, CURRENT_DATE - 30, CURRENT_DATE - 25, 5, 'Vacaciones', 'APROBADO', 1, true)
ON CONFLICT DO NOTHING;
