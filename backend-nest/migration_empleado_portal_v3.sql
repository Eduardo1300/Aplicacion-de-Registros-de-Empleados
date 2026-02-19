-- Migracion para portal de empleados v3
-- Verificar tablas y columnas
SELECT 'empleados' as table_name, column_name FROM information_schema.columns WHERE table_name = 'empleados'
UNION ALL
SELECT 'asistencias', column_name FROM information_schema.columns WHERE table_name = 'asistencias'
UNION ALL
SELECT 'solicitudes_licencia', column_name FROM information_schema.columns WHERE table_name = 'solicitudes_licencia'
UNION ALL
SELECT 'saldos_licencia', column_name FROM information_schema.columns WHERE table_name = 'saldos_licencia'
ORDER BY table_name, column_name;
