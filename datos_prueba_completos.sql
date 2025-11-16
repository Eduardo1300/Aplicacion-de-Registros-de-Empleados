-- =============================================
-- SCRIPT SQL - INSERCIÓN DE DATOS DE PRUEBA
-- Sistema de Registro de Empleados
-- =============================================

USE bd_registro_empleados;

-- =============================================
-- 1. DATOS INICIALES - ESTRUCTURA BASE
-- =============================================

-- Limpiar datos anteriores (opcional - comentar si no deseas)
-- DELETE FROM asistencia;
-- DELETE FROM empleado;
-- DELETE FROM departamento;

-- =============================================
-- 2. INSERTAR DEPARTAMENTOS
-- =============================================

INSERT INTO departamentos (nombre, descripcion, estado, fecha_creacion) VALUES
('Recursos Humanos', 'Departamento de Gestión de Recursos Humanos', 'ACTIVO', NOW()),
('Sistemas', 'Departamento de Tecnología e Informática', 'ACTIVO', NOW()),
('Ventas', 'Departamento de Ventas y Comercial', 'ACTIVO', NOW()),
('Marketing', 'Departamento de Marketing y Comunicación', 'ACTIVO', NOW()),
('Finanzas', 'Departamento de Contabilidad y Finanzas', 'ACTIVO', NOW()),
('Operaciones', 'Departamento de Operaciones y Logística', 'ACTIVO', NOW()),
('Servicio al Cliente', 'Departamento de Atención al Cliente', 'ACTIVO', NOW()),
('Producción', 'Departamento de Producción', 'ACTIVO', NOW());

-- =============================================
-- 3. INSERTAR CARGOS
-- =============================================

INSERT INTO cargos (nombre, descripcion, nivel, estado, fecha_creacion) VALUES
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
-- 4. INSERTAR EMPLEADOS (40 empleados)
-- =============================================

INSERT INTO empleados (nombre, apellido, dni, correo, telefono, fecha_ingreso, departamento_id, cargo_id, estado, fecha_creacion) VALUES
-- Recursos Humanos (5 empleados)
('Juan', 'García López', '12345678', 'juan.garcia@company.com', '999888777', '2020-01-15', 1, 1, 'ACTIVO', NOW()),
('María', 'López Rodríguez', '87654321', 'maria.lopez@company.com', '999888776', '2020-02-20', 1, 2, 'ACTIVO', NOW()),
('Carlos', 'Rodríguez Martínez', '11223344', 'carlos.rodriguez@company.com', '999888775', '2020-03-10', 1, 3, 'ACTIVO', NOW()),
('Ana', 'Martínez García', '55667788', 'ana.martinez@company.com', '999888774', '2021-01-05', 1, 4, 'ACTIVO', NOW()),
('Luis', 'Fernández López', '99001122', 'luis.fernandez@company.com', '999888773', '2021-06-15', 1, 11, 'ACTIVO', NOW()),

-- Sistemas (8 empleados)
('Pedro', 'Sánchez Díaz', '33445566', 'pedro.sanchez@company.com', '999888772', '2019-11-20', 2, 2, 'ACTIVO', NOW()),
('Roberto', 'Díaz López', '77889900', 'roberto.diaz@company.com', '999888771', '2020-05-10', 2, 6, 'ACTIVO', NOW()),
('Jorge', 'López García', '44556677', 'jorge.lopez@company.com', '999888770', '2020-08-15', 2, 7, 'ACTIVO', NOW()),
('Miguel', 'García Fernández', '88990011', 'miguel.garcia@company.com', '999888769', '2021-02-01', 2, 7, 'ACTIVO', NOW()),
('Fernando', 'Fernández Martínez', '22334455', 'fernando.fernandez@company.com', '999888768', '2021-07-20', 2, 8, 'ACTIVO', NOW()),
('Ricardo', 'Martínez Sánchez', '66778899', 'ricardo.martinez@company.com', '999888767', '2021-09-10', 2, 8, 'ACTIVO', NOW()),
('José', 'Sánchez López', '11112222', 'jose.sanchez@company.com', '999888766', '2022-01-15', 2, 11, 'ACTIVO', NOW()),
('Alfonso', 'Rodríguez García', '33334444', 'alfonso.rodriguez@company.com', '999888765', '2022-03-01', 2, 11, 'ACTIVO', NOW()),

-- Ventas (8 empleados)
('David', 'Rodríguez López', '55556666', 'david.rodriguez@company.com', '999888764', '2020-04-10', 3, 2, 'ACTIVO', NOW()),
('Víctor', 'López Martínez', '77778888', 'victor.lopez@company.com', '999888763', '2020-09-20', 3, 3, 'ACTIVO', NOW()),
('Andrés', 'Martínez García', '99990000', 'andres.martinez@company.com', '999888762', '2020-11-05', 3, 9, 'ACTIVO', NOW()),
('Enrique', 'García López', '11113333', 'enrique.garcia@company.com', '999888761', '2021-03-15', 3, 9, 'ACTIVO', NOW()),
('Felipe', 'López Rodríguez', '55557777', 'felipe.lopez@company.com', '999888760', '2021-05-10', 3, 9, 'ACTIVO', NOW()),
('Gerardo', 'Rodríguez Martínez', '88881111', 'gerardo.rodriguez@company.com', '999888759', '2021-08-20', 3, 9, 'ACTIVO', NOW()),
('Héctor', 'Martínez López', '22225555', 'hector.martinez@company.com', '999888758', '2022-02-01', 3, 11, 'ACTIVO', NOW()),
('Ignacio', 'López García', '66664444', 'ignacio.lopez@company.com', '999888757', '2022-04-15', 3, 11, 'ACTIVO', NOW()),

-- Marketing (6 empleados)
('Juliana', 'García Rodríguez', '33336666', 'juliana.garcia@company.com', '999888756', '2020-06-01', 4, 2, 'ACTIVO', NOW()),
('Katia', 'Rodríguez López', '77771111', 'katia.rodriguez@company.com', '999888755', '2021-01-10', 4, 5, 'ACTIVO', NOW()),
('Lorena', 'López Martínez', '99992222', 'lorena.lopez@company.com', '999888754', '2021-04-20', 4, 5, 'ACTIVO', NOW()),
('Mariana', 'Martínez García', '22228888', 'mariana.martinez@company.com', '999888753', '2021-10-05', 4, 11, 'ACTIVO', NOW()),
('Natalia', 'García López', '55559999', 'natalia.garcia@company.com', '999888752', '2022-01-20', 4, 11, 'ACTIVO', NOW()),
('Olivia', 'López Rodríguez', '88883333', 'olivia.lopez@company.com', '999888751', '2022-05-10', 4, 11, 'ACTIVO', NOW()),

-- Finanzas (5 empleados)
('Pablo', 'Rodríguez Martínez', '11115555', 'pablo.rodriguez@company.com', '999888750', '2020-03-15', 5, 2, 'ACTIVO', NOW()),
('Quique', 'Martínez López', '66665555', 'quique.martinez@company.com', '999888749', '2020-07-20', 5, 10, 'ACTIVO', NOW()),
('Ramón', 'López García', '99993333', 'ramon.lopez@company.com', '999888748', '2021-02-10', 5, 10, 'ACTIVO', NOW()),
('Sergio', 'García Rodríguez', '22226666', 'sergio.garcia@company.com', '999888747', '2021-11-01', 5, 10, 'ACTIVO', NOW()),
('Tomás', 'Rodríguez López', '55557777', 'tomas.rodriguez@company.com', '999888746', '2022-03-20', 5, 11, 'ACTIVO', NOW()),

-- Operaciones (4 empleados)
('Ubaldo', 'López Martínez', '88884444', 'ubaldo.lopez@company.com', '999888745', '2020-05-01', 6, 2, 'ACTIVO', NOW()),
('Valentín', 'Martínez García', '11116666', 'valentin.martinez@company.com', '999888744', '2021-06-15', 6, 3, 'ACTIVO', NOW()),
('Wilfredo', 'García López', '99994444', 'wilfredo.garcia@company.com', '999888743', '2021-12-10', 6, 11, 'ACTIVO', NOW()),
('Ximena', 'López Rodríguez', '22227777', 'ximena.lopez@company.com', '999888742', '2022-02-15', 6, 11, 'ACTIVO', NOW()),

-- Servicio al Cliente (3 empleados)
('Yasmin', 'Rodríguez Martínez', '55558888', 'yasmin.rodriguez@company.com', '999888741', '2020-08-10', 7, 2, 'ACTIVO', NOW()),
('Zacarías', 'Martínez López', '88885555', 'zacarias.martinez@company.com', '999888740', '2021-03-20', 7, 11, 'ACTIVO', NOW()),
('Zulema', 'López García', '11117777', 'zulema.lopez@company.com', '999888739', '2021-09-15', 7, 11, 'ACTIVO', NOW()),

-- Producción (2 empleados)
('Arturo', 'García Rodríguez', '99995555', 'arturo.garcia@company.com', '999888738', '2020-10-01', 8, 13, 'ACTIVO', NOW()),
('Braulio', 'Rodríguez López', '22228888', 'braulio.rodriguez@company.com', '999888737', '2021-04-10', 8, 12, 'ACTIVO', NOW());

-- =============================================
-- 5. INSERTAR ASISTENCIAS (300+ registros)
-- =============================================

-- Asistencias para los últimos 30 días para cada empleado
INSERT INTO asistencias (empleado_id, fecha_asistencia, hora_entrada, hora_salida, minutos_tardanza, estado, observaciones, fecha_creacion) VALUES
-- Empleado 1 - Juan García
(1, CURDATE() - INTERVAL 29 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(1, CURDATE() - INTERVAL 28 DAY, '08:05:00', '17:00:00', 5, 'PRESENTE', 'Tardanza menor', NOW()),
(1, CURDATE() - INTERVAL 27 DAY, '08:00:00', '17:15:00', 0, 'PRESENTE', 'Salida tardía', NOW()),
(1, CURDATE() - INTERVAL 26 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(1, CURDATE() - INTERVAL 25 DAY, '08:10:00', '17:00:00', 10, 'PRESENTE', 'Tardanza', NOW()),
(1, CURDATE() - INTERVAL 24 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(1, CURDATE() - INTERVAL 23 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(1, CURDATE() - INTERVAL 22 DAY, NULL, NULL, 0, 'AUSENTE', 'Falta sin justificación', NOW()),
(1, CURDATE() - INTERVAL 21 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(1, CURDATE() - INTERVAL 20 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(1, CURDATE() - INTERVAL 19 DAY, '08:03:00', '17:00:00', 3, 'PRESENTE', 'Tardanza menor', NOW()),
(1, CURDATE() - INTERVAL 18 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(1, CURDATE() - INTERVAL 17 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(1, CURDATE() - INTERVAL 16 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(1, CURDATE() - INTERVAL 15 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(1, CURDATE() - INTERVAL 14 DAY, '08:15:00', '17:00:00', 15, 'PRESENTE', 'Tardanza', NOW()),
(1, CURDATE() - INTERVAL 13 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(1, CURDATE() - INTERVAL 12 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(1, CURDATE() - INTERVAL 11 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(1, CURDATE() - INTERVAL 10 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(1, CURDATE() - INTERVAL 9 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(1, CURDATE() - INTERVAL 8 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(1, CURDATE() - INTERVAL 7 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(1, CURDATE() - INTERVAL 6 DAY, '08:05:00', '17:00:00', 5, 'PRESENTE', 'Tardanza menor', NOW()),
(1, CURDATE() - INTERVAL 5 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(1, CURDATE() - INTERVAL 4 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(1, CURDATE() - INTERVAL 3 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(1, CURDATE() - INTERVAL 2 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(1, CURDATE() - INTERVAL 1 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(1, CURDATE(), '08:00:00', NULL, 0, 'PRESENTE', 'En el turno', NOW()),

-- Empleado 2 - María López (datos variados)
(2, CURDATE() - INTERVAL 29 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(2, CURDATE() - INTERVAL 28 DAY, '08:30:00', '17:00:00', 30, 'PRESENTE', 'Tardanza justificada', NOW()),
(2, CURDATE() - INTERVAL 27 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(2, CURDATE() - INTERVAL 26 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(2, CURDATE() - INTERVAL 25 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(2, CURDATE() - INTERVAL 24 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(2, CURDATE() - INTERVAL 23 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(2, CURDATE() - INTERVAL 22 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(2, CURDATE() - INTERVAL 21 DAY, NULL, NULL, 0, 'AUSENTE', 'Licencia de enfermedad', NOW()),
(2, CURDATE() - INTERVAL 20 DAY, NULL, NULL, 0, 'AUSENTE', 'Licencia de enfermedad', NOW()),
(2, CURDATE() - INTERVAL 19 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(2, CURDATE() - INTERVAL 18 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(2, CURDATE() - INTERVAL 17 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(2, CURDATE() - INTERVAL 16 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(2, CURDATE() - INTERVAL 15 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(2, CURDATE() - INTERVAL 14 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(2, CURDATE() - INTERVAL 13 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(2, CURDATE() - INTERVAL 12 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(2, CURDATE() - INTERVAL 11 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(2, CURDATE() - INTERVAL 10 DAY, '08:10:00', '17:00:00', 10, 'PRESENTE', 'Tardanza', NOW()),
(2, CURDATE() - INTERVAL 9 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(2, CURDATE() - INTERVAL 8 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(2, CURDATE() - INTERVAL 7 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(2, CURDATE() - INTERVAL 6 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(2, CURDATE() - INTERVAL 5 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(2, CURDATE() - INTERVAL 4 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(2, CURDATE() - INTERVAL 3 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(2, CURDATE() - INTERVAL 2 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(2, CURDATE() - INTERVAL 1 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(2, CURDATE(), '08:00:00', NULL, 0, 'PRESENTE', 'En el turno', NOW()),

-- Empleado 3 - Carlos Rodríguez (datos variados con muchas tardanzas)
(3, CURDATE() - INTERVAL 29 DAY, '08:20:00', '17:00:00', 20, 'PRESENTE', 'Tardanza', NOW()),
(3, CURDATE() - INTERVAL 28 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(3, CURDATE() - INTERVAL 27 DAY, '08:15:00', '17:00:00', 15, 'PRESENTE', 'Tardanza', NOW()),
(3, CURDATE() - INTERVAL 26 DAY, '08:10:00', '17:00:00', 10, 'PRESENTE', 'Tardanza', NOW()),
(3, CURDATE() - INTERVAL 25 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(3, CURDATE() - INTERVAL 24 DAY, '08:25:00', '17:00:00', 25, 'PRESENTE', 'Tardanza', NOW()),
(3, CURDATE() - INTERVAL 23 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(3, CURDATE() - INTERVAL 22 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(3, CURDATE() - INTERVAL 21 DAY, '08:30:00', '17:00:00', 30, 'PRESENTE', 'Tardanza', NOW()),
(3, CURDATE() - INTERVAL 20 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(3, CURDATE() - INTERVAL 19 DAY, '08:10:00', '17:00:00', 10, 'PRESENTE', 'Tardanza', NOW()),
(3, CURDATE() - INTERVAL 18 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(3, CURDATE() - INTERVAL 17 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(3, CURDATE() - INTERVAL 16 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(3, CURDATE() - INTERVAL 15 DAY, '08:20:00', '17:00:00', 20, 'PRESENTE', 'Tardanza', NOW()),
(3, CURDATE() - INTERVAL 14 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(3, CURDATE() - INTERVAL 13 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(3, CURDATE() - INTERVAL 12 DAY, '08:15:00', '17:00:00', 15, 'PRESENTE', 'Tardanza', NOW()),
(3, CURDATE() - INTERVAL 11 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(3, CURDATE() - INTERVAL 10 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(3, CURDATE() - INTERVAL 9 DAY, '08:10:00', '17:00:00', 10, 'PRESENTE', 'Tardanza', NOW()),
(3, CURDATE() - INTERVAL 8 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(3, CURDATE() - INTERVAL 7 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(3, CURDATE() - INTERVAL 6 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(3, CURDATE() - INTERVAL 5 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(3, CURDATE() - INTERVAL 4 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(3, CURDATE() - INTERVAL 3 DAY, '08:05:00', '17:00:00', 5, 'PRESENTE', 'Tardanza menor', NOW()),
(3, CURDATE() - INTERVAL 2 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(3, CURDATE() - INTERVAL 1 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(3, CURDATE(), '08:00:00', NULL, 0, 'PRESENTE', 'En el turno', NOW()),

-- Empleado 4 - Ana Martínez (datos perfecto)
(4, CURDATE() - INTERVAL 29 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(4, CURDATE() - INTERVAL 28 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(4, CURDATE() - INTERVAL 27 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(4, CURDATE() - INTERVAL 26 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(4, CURDATE() - INTERVAL 25 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(4, CURDATE() - INTERVAL 24 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(4, CURDATE() - INTERVAL 23 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(4, CURDATE() - INTERVAL 22 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(4, CURDATE() - INTERVAL 21 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(4, CURDATE() - INTERVAL 20 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(4, CURDATE() - INTERVAL 19 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(4, CURDATE() - INTERVAL 18 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(4, CURDATE() - INTERVAL 17 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(4, CURDATE() - INTERVAL 16 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(4, CURDATE() - INTERVAL 15 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(4, CURDATE() - INTERVAL 14 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(4, CURDATE() - INTERVAL 13 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(4, CURDATE() - INTERVAL 12 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(4, CURDATE() - INTERVAL 11 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(4, CURDATE() - INTERVAL 10 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(4, CURDATE() - INTERVAL 9 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(4, CURDATE() - INTERVAL 8 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(4, CURDATE() - INTERVAL 7 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(4, CURDATE() - INTERVAL 6 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(4, CURDATE() - INTERVAL 5 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(4, CURDATE() - INTERVAL 4 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(4, CURDATE() - INTERVAL 3 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(4, CURDATE() - INTERVAL 2 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(4, CURDATE() - INTERVAL 1 DAY, '08:00:00', '17:00:00', 0, 'PRESENTE', 'Entrada normal', NOW()),
(4, CURDATE(), '08:00:00', NULL, 0, 'PRESENTE', 'En el turno', NOW());

-- =============================================
-- 6. INSERTAR MÁS EMPLEADOS CON ASISTENCIAS
-- =============================================

-- Para optimizar, insertamos asistencias para empleados 5 en adelante (cada uno 15 días)
INSERT INTO asistencias (empleado_id, fecha_asistencia, hora_entrada, hora_salida, minutos_tardanza, estado, observaciones, fecha_creacion) SELECT
  emp_id,
  DATE(NOW() - INTERVAL dias DAY) as fecha,
  '08:00:00' as hora_entrada,
  '17:00:00' as hora_salida,
  FLOOR(RAND() * 20) as tardanza,
  'PRESENTE' as estado,
  CASE WHEN FLOOR(RAND() * 10) = 1 THEN 'Tardanza' ELSE 'Entrada normal' END,
  NOW()
FROM (
  SELECT 5 as emp_id UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 
  UNION SELECT 10 UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14
  UNION SELECT 15 UNION SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION SELECT 19
  UNION SELECT 20 UNION SELECT 21 UNION SELECT 22 UNION SELECT 23 UNION SELECT 24
) employees
CROSS JOIN (
  SELECT 0 as dias UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4
  UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9
  UNION SELECT 10 UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14
) dias;

-- Asistencias para empleados 25 en adelante
INSERT INTO asistencias (empleado_id, fecha_asistencia, hora_entrada, hora_salida, minutos_tardanza, estado, observaciones, fecha_creacion) SELECT
  emp_id,
  DATE(NOW() - INTERVAL dias DAY) as fecha,
  '08:00:00' as hora_entrada,
  '17:00:00' as hora_salida,
  FLOOR(RAND() * 15) as tardanza,
  'PRESENTE' as estado,
  'Entrada normal',
  NOW()
FROM (
  SELECT 25 as emp_id UNION SELECT 26 UNION SELECT 27 UNION SELECT 28 UNION SELECT 29 
  UNION SELECT 30 UNION SELECT 31 UNION SELECT 32 UNION SELECT 33 UNION SELECT 34
  UNION SELECT 35 UNION SELECT 36 UNION SELECT 37 UNION SELECT 38 UNION SELECT 39
  UNION SELECT 40
) employees
CROSS JOIN (
  SELECT 0 as dias UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4
  UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9
  UNION SELECT 10 UNION SELECT 11 UNION SELECT 12
) dias;

-- =============================================
-- 7. INSERTAR FALTAS Y JUSTIFICACIONES
-- =============================================

INSERT INTO faltas (empleado_id, fecha_falta, tipo_falta, justificada, estado, observaciones, fecha_creacion) VALUES
(1, CURDATE() - INTERVAL 22 DAY, 'AUSENCIA_INJUSTIFICADA', FALSE, 'PENDIENTE', 'Falta sin justificación', NOW()),
(2, CURDATE() - INTERVAL 21 DAY, 'ENFERMEDAD', TRUE, 'APROBADA', 'Licencia médica', NOW()),
(2, CURDATE() - INTERVAL 20 DAY, 'ENFERMEDAD', TRUE, 'APROBADA', 'Continuación de licencia médica', NOW()),
(3, CURDATE() - INTERVAL 15 DAY, 'TARDANZA_EXCESIVA', FALSE, 'REVISIÓN', 'Acumuló tardanzas', NOW()),
(5, CURDATE() - INTERVAL 10 DAY, 'ASUNTO_PERSONAL', TRUE, 'APROBADA', 'Permiso personal', NOW()),
(6, CURDATE() - INTERVAL 8 DAY, 'AUSENCIA_INJUSTIFICADA', FALSE, 'PENDIENTE', 'No se presentó', NOW()),
(8, CURDATE() - INTERVAL 5 DAY, 'ENFERMEDAD', TRUE, 'APROBADA', 'Consulta médica', NOW()),
(10, CURDATE() - INTERVAL 12 DAY, 'TARDANZA_EXCESIVA', FALSE, 'REVISIÓN', 'Múltiples tardanzas', NOW());

INSERT INTO justificaciones (empleado_id, falta_id, fecha_justificacion, tipo_justificacion, descripcion, documento_soporte, estado, aprobado_por, fecha_aprobacion, observaciones, fecha_creacion) VALUES
(2, 2, CURDATE() - INTERVAL 20 DAY, 'CERTIFICADO_MEDICO', 'Consulta al doctor', 'certificado_medico_2025.pdf', 'APROBADA', 1, CURDATE() - INTERVAL 20 DAY, 'Documento válido', NOW()),
(2, 3, CURDATE() - INTERVAL 19 DAY, 'CERTIFICADO_MEDICO', 'Continuación de tratamiento', 'certificado_medico_2025_2.pdf', 'APROBADA', 1, CURDATE() - INTERVAL 19 DAY, 'Documento válido', NOW()),
(5, 5, CURDATE() - INTERVAL 9 DAY, 'PERMISO_SOLICITADO', 'Asunto familiar urgente', 'solicitud_permiso.pdf', 'APROBADA', 1, CURDATE() - INTERVAL 9 DAY, 'Aprobado por RH', NOW()),
(8, 7, CURDATE() - INTERVAL 4 DAY, 'CERTIFICADO_MEDICO', 'Dolor de muela', 'certificado_odontologico.pdf', 'APROBADA', 2, CURDATE() - INTERVAL 4 DAY, 'Válido y oportuno', NOW());

-- =============================================
-- 8. INSERTAR TURNOS
-- =============================================

INSERT INTO turnos (nombre, hora_inicio, hora_fin, descanso_inicio, descanso_fin, horas_trabajadas, estado, fecha_creacion) VALUES
('Mañana', '08:00:00', '17:00:00', '12:00:00', '13:00:00', 8, 'ACTIVO', NOW()),
('Tarde', '14:00:00', '23:00:00', '18:00:00', '18:30:00', 8, 'ACTIVO', NOW()),
('Noche', '22:00:00', '07:00:00', '02:00:00', '03:00:00', 8, 'ACTIVO', NOW()),
('Matutino', '06:00:00', '14:00:00', '10:00:00', '10:30:00', 8, 'ACTIVO', NOW()),
('Vespertino', '14:00:00', '22:00:00', '18:00:00', '19:00:00', 8, 'ACTIVO', NOW());

-- =============================================
-- FIN DEL SCRIPT
-- =============================================
