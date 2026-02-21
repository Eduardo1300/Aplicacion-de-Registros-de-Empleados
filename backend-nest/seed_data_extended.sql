-- Script para cargar más datos de ejemplo

-- Agregar más departamentos
INSERT INTO departamentos (nombre, descripcion) VALUES
  ('Marketing', 'Departamento de Marketing y Publicidad'),
  ('Atención al Cliente', 'Departamento de Atención al Cliente'),
  ('Producción', 'Departamento de Producción'),
  ('Compras', 'Departamento de Compras y Abastecimiento'),
  ('Legal', 'Departamento Legal y Compliance')
ON CONFLICT DO NOTHING;

-- Agregar más cargos
INSERT INTO cargos (nombre, descripcion) VALUES
  ('Director', 'Director de Departamento'),
  ('Supervisor', 'Supervisor de Área'),
  ('Auxiliar', 'Auxiliar'),
  ('Practikante', 'Practicante')
ON CONFLICT DO NOTHING;

-- Agregar más empleados
INSERT INTO empleados (nombre, apellido, dni, correo, telefono, "fechaIngreso", estado, departamento_id, cargo_id, password_hash) VALUES
  ('Sofia', 'Ramírez Torres', '11112222', 'sofia.ramirez@empresa.com', '951123456', '2023-10-01', 'Activo', 6, 1, '$2a$10$rVqKkHLqKJKJHJhKJHKJHeuKJHKKJHKJHKJHKJHKJHKJHKJH0e'),
  ('Miguel', 'Torres Sánchez', '22223333', 'miguel.torres@empresa.com', '951223456', '2023-10-15', 'Activo', 2, 3, '$2a$10$rVqKkHLqKJKJHJhKJHKJHeuKJHKKJHKJHKJHKJHKJHKJH0e'),
  ('Carmen', 'Vega Mendoza', '33334444', 'carmen.vega@empresa.com', '951323456', '2023-11-01', 'Activo', 7, 4, '$2a$10$rVqKkHLqKJKJHJhKJHKJHeuKJHKKJHKJHKJHKJHKJHKJH0e'),
  ('Luis', 'Mendoza Castro', '44445555', 'luis.mendoza@empresa.com', '951423456', '2023-11-15', 'Activo', 3, 2, '$2a$10$rVqKkHLqKJKJHJhKJHKJHeuKJHKKJHKJHKJHKJHKJHKJH0e'),
  ('Patricia', 'Luna Rivera', '55556666', 'patricia.luna@empresa.com', '951523456', '2023-12-01', 'Activo', 8, 5, '$2a$10$rVqKkHLqKJKJHJhKJHKJHeuKJHKKJHKJHKJHKJHKJHKJH0e'),
  ('Jorge', 'Reyes Ortega', '66667777', 'jorge.reyes@empresa.com', '951623456', '2023-12-15', 'Activo', 9, 3, '$2a$10$rVqKkHLqKJKJHJhKJHKJHeuKJHKKJHKJHKJHKJHKJHKJH0e'),
  ('Isabel', 'Herrera Peña', '77778888', 'isabel.herrera@empresa.com', '951723456', '2024-01-10', 'Activo', 1, 6, '$2a$10$rVqKkHLqKJKJHJhKJHKJHeuKJHKKJHKJHKJHKJHKJHKJH0e'),
  ('Ricardo', 'Navarro Soto', '88889999', 'ricardo.navarro@empresa.com', '951823456', '2024-01-20', 'Activo', 4, 4, '$2a$10$rVqKkHLqKJKJHJhKJHKJHeuKJHKKJHKJHKJHKJHKJHKJH0e'),
  ('Monica', 'Escobar Ruiz', '99990000', 'monica.escobar@empresa.com', '951923456', '2024-02-05', 'Activo', 5, 3, '$2a$10$rVqKkHLqKJKJHJhKJHKJHeuKJHKKJHKJHKJHKJHKJHKJH0e'),
  ('Alberto', 'Cortés Vargas', '10101010', 'alberto.cortes@empresa.com', '951023456', '2024-02-15', 'Activo', 6, 2, '$2a$10$rVqKkHLqKJKJHJhKJHKJHeuKJHKKJHKJHKJHKJHKJHKJH0e'),
  ('Claudia', 'Mora Jiménez', '20202020', 'claudia.mora@empresa.com', '951123457', '2024-03-01', 'Activo', 2, 5, '$2a$10$rVqKkHLqKJKJHJhKJHKJHeuKJHKKJHKJHKJHKJHKJHKJH0e'),
  ('Sergio', 'Aguilar Reyes', '30303030', 'sergio.aguilar@empresa.com', '951123458', '2024-03-10', 'Activo', 7, 6, '$2a$10$rVqKkHLqKJKJHJhKJHKJHeuKJHKKJHKJHKJHKJHKJHKJH0e'),
  ('Diana', 'Santos Molina', '40404040', 'diana.santos@empresa.com', '951123459', '2024-03-20', 'Activo', 3, 3, '$2a$10$rVqKkHLqKJKJHJhKJHKJHeuKJHKKJHKJHKJHKJHKJHKJH0e'),
  ('Fernando', 'García Huamán', '50505050', 'fernando.garcia@empresa.com', '951123460', '2024-04-01', 'Activo', 8, 4, '$2a$10$rVqKkHLqKJKJHJhKJHKJHeuKJHKKJHKJHKJHKJHKJH0e'),
  ('Lorena', 'Castro Delgado', '60606060', 'lorena.castro@empresa.com', '951123461', '2024-04-15', 'Inactivo', 1, 6, '$2a$10$rVqKkHLqKJKJHJhKJHKJHeuKJHKKJHKJHKJHKJHKJH0e'),
  ('Walter', 'Vargas Sánchez', '70707070', 'walter.vargas@empresa.com', '951123462', '2024-05-01', 'Activo', 9, 5, '$2a$10$rVqKkHLqKJKJHJhKJHKJHeuKJHKKJHKJHKJHKJHKJH0e'),
  ('Adriana', 'Quispe Flores', '80808080', 'adriana.quispe@empresa.com', '951123463', '2024-05-15', 'Activo', 4, 3, '$2a$10$rVqKkHLqKJKJHJhKJHKJHeuKJHKKJHKJHKJHKJHKJH0e'),
  ('Marco', 'Condori Mamani', '90909090', 'marco.condori@empresa.com', '951123464', '2024-06-01', 'Activo', 5, 4, '$2a$10$rVqKkHLqKJKJHJhKJHKJHeuKJHKKJHKJHKJHKJHKJH0e'),
  ('Jessica', 'Huanca Layme', '12121212', 'jessica.huanca@empresa.com', '951123465', '2024-06-15', 'Activo', 6, 2, '$2a$10$rVqKkHLqKJKJHJhKJHKJHeuKJHKKJHKJHKJHKJHKJH0e'),
  ('Kevin', 'Choquehuanca', '23232323', 'kevin.choquehuanca@empresa.com', '951123466', '2024-07-01', 'Activo', 2, 5, '$2a$10$rVqKkHLqKJKJHJhKJHKJHeuKJHKKJHKJHKJHKJHKJH0e')
ON CONFLICT DO NOTHING;

-- Agregar más asistencias (últimos 30 días para todos los empleados)
INSERT INTO asistencia (empleado_id, "fechaAsistencia", "hora_entrada", "hora_salida", estado, "minutos_tardanza") 
SELECT 
  e.id,
  CURRENT_DATE - (i * INTERVAL '1 day'),
  CASE 
    WHEN random() < 0.8 THEN '08:00:00'::time
    WHEN random() < 0.9 THEN '08:15:00'::time
    ELSE '08:30:00'::time
  END,
  '17:00:00'::time,
  CASE 
    WHEN random() < 0.85 THEN 'PRESENTE'::status_enum
    WHEN random() < 0.95 THEN 'TARDANZA'::status_enum
    ELSE 'AUSENTE'::status_enum
  END,
  CASE WHEN random() < 0.15 THEN floor(random() * 30)::int ELSE 0 END
FROM generate_series(0, 29) i
CROSS JOIN (
  SELECT id FROM empleados WHERE estado = 'Activo'
) e
WHERE (CURRENT_DATE - (i * INTERVAL '1 day')) >= '2026-01-01'::date
ON CONFLICT DO NOTHING;

-- Agregar más solicitudes de licencia
INSERT INTO solicitudes_licencia (empleado_id, tipo_licencia_id, "fechaInicio", "fechaFin", "dias_solicitados", razon, estado, "fecha_solicitud", "fecha_respuesta", usuario_aprobador_id, "afecta_saldo") VALUES
  (5, 1, '2026-02-01', '2026-02-05', 5, 'Vacaciones de fin de año', 'APROBADA', '2026-01-20', '2026-01-21', 1, true),
  (6, 2, '2026-02-10', '2026-02-11', 1, 'Cita con el médico', 'APROBADA', '2026-01-25', '2026-01-26', 1, true),
  (7, 3, '2026-02-15', '2026-02-16', 2, 'Asuntos familiares', 'PENDIENTE', '2026-01-28', NULL, NULL, false),
  (8, 1, '2026-03-01', '2026-03-10', 8, 'Vacaciones programadas', 'PENDIENTE', '2026-02-01', NULL, NULL, true),
  (9, 2, '2026-02-20', '2026-02-21', 2, 'Exámenes médicos', 'APROBADA', '2026-02-10', '2026-02-11', 1, true),
  (10, 3, '2026-02-25', '2026-02-28', 4, 'Mudanza', 'PENDIENTE', '2026-02-15', NULL, NULL, false),
  (11, 1, '2026-03-15', '2026-03-20', 6, 'Vacaciones', 'PENDIENTE', '2026-02-20', NULL, NULL, true),
  (12, 2, '2026-02-18', '2026-02-19', 1, 'Chequeo médico', 'APROBADA', '2026-02-12', '2026-02-13', 1, true),
  (13, 3, '2026-03-01', '2026-03-03', 3, 'Permiso personal', 'RECHAZADA', '2026-02-20', '2026-02-21', 1, false),
  (14, 1, '2026-04-01', '2026-04-10', 10, 'Vacaciones de Semana Santa', 'PENDIENTE', '2026-02-25', NULL, NULL, true),
  (15, 2, '2026-02-22', '2026-02-22', 1, 'Emergencia familiar', 'APROBADA', '2026-02-18', '2026-02-19', 1, true),
  (16, 3, '2026-03-10', '2026-03-12', 3, 'Trámites legales', 'PENDIENTE', '2026-02-28', NULL, NULL, false),
  (17, 1, '2026-05-01', '2026-05-05', 5, 'Vacaciones por festividad', 'PENDIENTE', '2026-03-01', NULL, NULL, true),
  (18, 2, '2026-03-05', '2026-03-06', 2, 'Consulta médica especializada', 'APROBADA', '2026-02-25', '2026-02-26', 1, true),
  (19, 3, '2026-04-15', '2026-04-18', 4, 'Motivos personales', 'PENDIENTE', '2026-03-10', NULL, NULL, false),
  (20, 1, '2026-06-01', '2026-06-15', 15, 'Vacaciones de medio año', 'PENDIENTE', '2026-03-15', NULL, NULL, true)
ON CONFLICT DO NOTHING;

-- Actualizar saldos de licencia para nuevos empleados
INSERT INTO saldos_licencia (empleado_id, tipo_licencia_id, "dias_disponibles", "dias_usados", anio)
SELECT e.id, tl.id, tl."dias_anuales", 0, 2026
FROM empleados e
CROSS JOIN tipos_licencia tl
WHERE NOT EXISTS (
  SELECT 1 FROM saldos_licencia sl 
  WHERE sl.empleado_id = e.id AND sl.tipo_licencia_id = tl.id AND sl.anio = 2026
)
ON CONFLICT DO NOTHING;
