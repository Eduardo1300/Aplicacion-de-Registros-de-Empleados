-- Script para cargar más datos de ejemplo (CORREGIDO para IDs existentes)

-- Agregar más solicitudes de licencia con IDs de empleados correctos
INSERT INTO solicitudes_licencia (empleado_id, tipo_licencia_id, "fechaInicio", "fechaFin", "diasSolicitados", razon, estado, "fechaRespuesta", usuario_aprobador_id, "afectaSaldo") VALUES
  (22, 1, '2026-02-01', '2026-02-05', 5, 'Vacaciones de fin de año', 'APROBADA', '2026-01-21', 3, true),
  (23, 2, '2026-02-10', '2026-02-11', 1, 'Cita con el médico', 'APROBADA', '2026-01-26', 3, true),
  (24, 3, '2026-02-15', '2026-02-16', 2, 'Asuntos familiares', 'PENDIENTE', NULL, NULL, false),
  (29, 1, '2026-03-01', '2026-03-10', 8, 'Vacaciones programadas', 'PENDIENTE', NULL, NULL, true),
  (30, 2, '2026-02-20', '2026-02-21', 2, 'Exámenes médicos', 'APROBADA', '2026-02-11', 3, true),
  (31, 3, '2026-02-25', '2026-02-28', 4, 'Mudanza', 'PENDIENTE', NULL, NULL, false),
  (32, 1, '2026-03-15', '2026-03-20', 6, 'Vacaciones', 'PENDIENTE', NULL, NULL, true),
  (33, 2, '2026-02-18', '2026-02-19', 1, 'Chequeo médico', 'APROBADA', '2026-02-13', 3, true),
  (34, 3, '2026-03-01', '2026-03-03', 3, 'Permiso personal', 'RECHAZADA', '2026-02-21', 3, false),
  (35, 1, '2026-04-01', '2026-04-10', 10, 'Vacaciones de Semana Santa', 'PENDIENTE', NULL, NULL, true),
  (36, 2, '2026-02-22', '2026-02-22', 1, 'Emergencia familiar', 'APROBADA', '2026-02-19', 3, true),
  (37, 3, '2026-03-10', '2026-03-12', 3, 'Trámites legales', 'PENDIENTE', NULL, NULL, false),
  (38, 1, '2026-05-01', '2026-05-05', 5, 'Vacaciones por festividad', 'PENDIENTE', NULL, NULL, true),
  (39, 2, '2026-03-05', '2026-03-06', 2, 'Consulta médica especializada', 'APROBADA', '2026-02-26', 3, true),
  (40, 3, '2026-04-15', '2026-04-18', 4, 'Motivos personales', 'PENDIENTE', NULL, NULL, false),
  (41, 1, '2026-06-01', '2026-06-15', 15, 'Vacaciones de medio año', 'PENDIENTE', NULL, NULL, true)
ON CONFLICT DO NOTHING;
