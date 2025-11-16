-- =============================================
-- SCRIPT SQL - DATOS DE PRUEBA COMPLETOS v3
-- Sistema de Registro de Empleados
-- =============================================

USE bd_registro_empleados;

-- =============================================
-- 1. INSERTAR DEPARTAMENTOS (si no existen)
-- =============================================

INSERT IGNORE INTO departamentos (nombre, descripcion, estado, fecha_creacion) VALUES
('Recursos Humanos', 'Departamento de Gestión de Recursos Humanos', 'ACTIVO', NOW()),
('Sistemas', 'Departamento de Tecnología e Informática', 'ACTIVO', NOW()),
('Ventas', 'Departamento de Ventas y Comercial', 'ACTIVO', NOW()),
('Marketing', 'Departamento de Marketing y Comunicación', 'ACTIVO', NOW()),
('Finanzas', 'Departamento de Contabilidad y Finanzas', 'ACTIVO', NOW()),
('Operaciones', 'Departamento de Operaciones y Logística', 'ACTIVO', NOW()),
('Servicio al Cliente', 'Departamento de Atención al Cliente', 'ACTIVO', NOW()),
('Producción', 'Departamento de Producción', 'ACTIVO', NOW());

-- =============================================
-- 2. INSERTAR CARGOS (si no existen)
-- =============================================

INSERT IGNORE INTO cargos (nombre, descripcion, nivel, estado, fecha_creacion) VALUES
('Gerente General', 'Gerente de la empresa', 1, 'ACTIVO', NOW()),
('Gerente de Departamento', 'Gerente de departamento', 2, 'ACTIVO', NOW()),
('Jefe de Área', 'Jefe de área o equipo', 3, 'ACTIVO', NOW()),
('Coordinador', 'Coordinador de proyectos', 4, 'ACTIVO', NOW()),
('Especialista', 'Especialista técnico', 4, 'ACTIVO', NOW()),
('Analista', 'Analista de sistemas', 4, 'ACTIVO', NOW()),
('Desarrollador Senior', 'Desarrollador senior', 4, 'ACTIVO', NOW()),
('Desarrollador Junior', 'Desarrollador junior', 5, 'ACTIVO', NOW()),
('Vendedor', 'Representante de ventas', 5, 'ACTIVO', NOW()),
('Contador', 'Contador de empresa', 4, 'ACTIVO', NOW()),
('Asistente', 'Asistente administrativo', 5, 'ACTIVO', NOW()),
('Operario', 'Operario de producción', 5, 'ACTIVO', NOW()),
('Supervisor', 'Supervisor de área', 3, 'ACTIVO', NOW());

-- =============================================
-- 3. INSERTAR EMPLEADOS (30 empleados con DNIs únicos)
-- =============================================

INSERT IGNORE INTO empleados (nombre, apellido, dni, correo, telefono, fecha_ingreso, departamento_id, cargo_id, estado, fecha_creacion) VALUES
('Juan', 'García López', '10001234', 'juan.garcia@company.com', '9998887770', '2020-01-15', 1, 1, 'ACTIVO', NOW()),
('María', 'López Rodríguez', '10002234', 'maria.lopez@company.com', '9998887771', '2020-02-20', 1, 2, 'ACTIVO', NOW()),
('Carlos', 'Rodríguez Martínez', '10003234', 'carlos.rodriguez@company.com', '9998887772', '2020-03-10', 1, 3, 'ACTIVO', NOW()),
('Ana', 'Martínez García', '10004234', 'ana.martinez@company.com', '9998887773', '2021-01-05', 1, 4, 'ACTIVO', NOW()),
('Luis', 'Fernández López', '10005234', 'luis.fernandez@company.com', '9998887774', '2021-06-15', 1, 11, 'ACTIVO', NOW()),

('Pedro', 'Sánchez Díaz', '10006234', 'pedro.sanchez@company.com', '9998887775', '2019-11-20', 2, 2, 'ACTIVO', NOW()),
('Roberto', 'Díaz López', '10007234', 'roberto.diaz@company.com', '9998887776', '2020-05-10', 2, 6, 'ACTIVO', NOW()),
('Jorge', 'López García', '10008234', 'jorge.lopez@company.com', '9998887777', '2020-08-15', 2, 7, 'ACTIVO', NOW()),
('Miguel', 'García Fernández', '10009234', 'miguel.garcia@company.com', '9998887778', '2021-02-01', 2, 7, 'ACTIVO', NOW()),
('Fernando', 'Fernández Martínez', '10010234', 'fernando.fernandez@company.com', '9998887779', '2021-07-20', 2, 8, 'ACTIVO', NOW()),
('Ricardo', 'Martínez Sánchez', '10011234', 'ricardo.martinez@company.com', '9998887780', '2021-09-10', 2, 8, 'ACTIVO', NOW()),
('José', 'Sánchez López', '10012234', 'jose.sanchez@company.com', '9998887781', '2022-01-15', 2, 11, 'ACTIVO', NOW()),

('David', 'Rodríguez López', '10013234', 'david.rodriguez@company.com', '9998887782', '2020-04-10', 3, 2, 'ACTIVO', NOW()),
('Víctor', 'López Martínez', '10014234', 'victor.lopez@company.com', '9998887783', '2020-09-20', 3, 3, 'ACTIVO', NOW()),
('Andrés', 'Martínez García', '10015234', 'andres.martinez@company.com', '9998887784', '2020-11-05', 3, 9, 'ACTIVO', NOW()),
('Enrique', 'García López', '10016234', 'enrique.garcia@company.com', '9998887785', '2021-03-15', 3, 9, 'ACTIVO', NOW()),
('Felipe', 'López Rodríguez', '10017234', 'felipe.lopez@company.com', '9998887786', '2021-05-10', 3, 9, 'ACTIVO', NOW()),
('Gerardo', 'Rodríguez Martínez', '10018234', 'gerardo.rodriguez@company.com', '9998887787', '2021-08-20', 3, 9, 'ACTIVO', NOW()),

('Juliana', 'García Rodríguez', '10019234', 'juliana.garcia@company.com', '9998887788', '2020-06-01', 4, 2, 'ACTIVO', NOW()),
('Katia', 'Rodríguez López', '10020234', 'katia.rodriguez@company.com', '9998887789', '2021-01-10', 4, 5, 'ACTIVO', NOW()),
('Lorena', 'López Martínez', '10021234', 'lorena.lopez@company.com', '9998887790', '2021-04-20', 4, 5, 'ACTIVO', NOW()),

('Pablo', 'Rodríguez Martínez', '10022234', 'pablo.rodriguez@company.com', '9998887791', '2020-03-15', 5, 2, 'ACTIVO', NOW()),
('Quique', 'Martínez López', '10023234', 'quique.martinez@company.com', '9998887792', '2020-07-20', 5, 10, 'ACTIVO', NOW()),
('Ramón', 'López García', '10024234', 'ramon.lopez@company.com', '9998887793', '2021-02-10', 5, 10, 'ACTIVO', NOW()),

('Ubaldo', 'López Martínez', '10025234', 'ubaldo.lopez@company.com', '9998887794', '2020-05-01', 6, 2, 'ACTIVO', NOW()),
('Valentín', 'Martínez García', '10026234', 'valentin.martinez@company.com', '9998887795', '2021-06-15', 6, 3, 'ACTIVO', NOW()),

('Yasmin', 'Rodríguez Martínez', '10027234', 'yasmin.rodriguez@company.com', '9998887796', '2020-08-10', 7, 2, 'ACTIVO', NOW()),
('Zacarías', 'Martínez López', '10028234', 'zacarias.martinez@company.com', '9998887797', '2021-03-20', 7, 11, 'ACTIVO', NOW()),

('Arturo', 'García Rodríguez', '10029234', 'arturo.garcia@company.com', '9998887798', '2020-10-01', 8, 13, 'ACTIVO', NOW()),
('Braulio', 'Rodríguez López', '10030234', 'braulio.rodriguez@company.com', '9998887799', '2021-04-10', 8, 12, 'ACTIVO', NOW());

-- =============================================
-- 4. INSERTAR ASISTENCIAS - Últimos 30 días
-- =============================================

INSERT INTO asistencias (empleado_id, fecha_asistencia, hora_entrada, hora_salida, minutos_tardanza, estado, observaciones, fecha_creacion) 
SELECT 
  emp.id,
  DATE(NOW() - INTERVAL dias.n DAY) as fecha,
  '08:00:00' as hora_entrada,
  '17:00:00' as hora_salida,
  FLOOR(RAND() * 25) as tardanza,
  'PRESENTE' as estado,
  'Registro automático de asistencia',
  NOW()
FROM empleados emp
CROSS JOIN (
  SELECT 0 as n UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4
  UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9
  UNION SELECT 10 UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14
  UNION SELECT 15 UNION SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION SELECT 19
) dias;

-- =============================================
-- 5. INSERTAR TURNOS (si no existen)
-- =============================================

INSERT IGNORE INTO turnos (nombre, hora_inicio, hora_fin, descanso_inicio, descanso_fin, horas_trabajadas, estado, fecha_creacion) VALUES
('Mañana', '08:00:00', '17:00:00', '12:00:00', '13:00:00', 8, 'ACTIVO', NOW()),
('Tarde', '14:00:00', '23:00:00', '18:00:00', '18:30:00', 8, 'ACTIVO', NOW()),
('Noche', '22:00:00', '07:00:00', '02:00:00', '03:00:00', 8, 'ACTIVO', NOW()),
('Matutino', '06:00:00', '14:00:00', '10:00:00', '10:30:00', 8, 'ACTIVO', NOW()),
('Vespertino', '14:00:00', '22:00:00', '18:00:00', '19:00:00', 8, 'ACTIVO', NOW());

-- =============================================
-- 6. VERIFICAR DATOS INSERTADOS
-- =============================================

SELECT 'Empleados insertados:' as Info;
SELECT COUNT(*) as Total FROM empleados;

SELECT 'Asistencias insertadas:' as Info;
SELECT COUNT(*) as Total FROM asistencias;

SELECT 'Departamentos:' as Info;
SELECT COUNT(*) as Total FROM departamentos;

SELECT 'Cargos:' as Info;
SELECT COUNT(*) as Total FROM cargos;

-- =============================================
-- FIN DEL SCRIPT
-- =============================================
