-- Script para corregir tildes en los nombres de empleados
-- Los datos fueron guardados con charset incorrecto, necesitamos convertirlos

UPDATE empleados SET nombre = 'Juan' WHERE dni = '10001234';
UPDATE empleados SET apellido = 'García López' WHERE dni = '10001234';
UPDATE empleados SET apellido = 'López Rodríguez' WHERE dni = '10002234';
UPDATE empleados SET apellido = 'Rodríguez Martínez' WHERE dni = '10003234';
UPDATE empleados SET apellido = 'Martínez García' WHERE dni = '10004234';
UPDATE empleados SET apellido = 'Fernández López' WHERE dni = '10005234';
UPDATE empleados SET apellido = 'Sánchez Díaz' WHERE dni = '10006234';
UPDATE empleados SET apellido = 'Díaz López' WHERE dni = '10007234';
UPDATE empleados SET apellido = 'López García' WHERE dni = '10008234';
UPDATE empleados SET apellido = 'García Fernández' WHERE dni = '10009234';
UPDATE empleados SET apellido = 'Fernández Martínez' WHERE dni = '10010234';
UPDATE empleados SET apellido = 'Martínez Sánchez' WHERE dni = '10011234';
UPDATE empleados SET apellido = 'Sánchez López' WHERE dni = '10012234';
UPDATE empleados SET apellido = 'Rodríguez López' WHERE dni = '10013234';
UPDATE empleados SET apellido = 'López Martínez' WHERE dni = '10014234';
UPDATE empleados SET apellido = 'Martínez García' WHERE dni = '10015234';
UPDATE empleados SET apellido = 'García López' WHERE dni = '10016234';
UPDATE empleados SET apellido = 'López Rodríguez' WHERE dni = '10017234';
UPDATE empleados SET apellido = 'Rodríguez Martínez' WHERE dni = '10018234';
UPDATE empleados SET apellido = 'García Rodríguez' WHERE dni = '10019234';
UPDATE empleados SET apellido = 'Rodríguez López' WHERE dni = '10020234';
UPDATE empleados SET apellido = 'López Martínez' WHERE dni = '10021234';
UPDATE empleados SET apellido = 'Rodríguez Martínez' WHERE dni = '10022234';
UPDATE empleados SET apellido = 'Martínez López' WHERE dni = '10023234';
UPDATE empleados SET apellido = 'López García' WHERE dni = '10024234';
UPDATE empleados SET apellido = 'López Martínez' WHERE dni = '10025234';
UPDATE empleados SET apellido = 'Martínez García' WHERE dni = '10026234';
UPDATE empleados SET apellido = 'Rodríguez Martínez' WHERE dni = '10027234';
UPDATE empleados SET apellido = 'Martínez López' WHERE dni = '10028234';
UPDATE empleados SET apellido = 'García Rodríguez' WHERE dni = '10029234';
UPDATE empleados SET apellido = 'Rodríguez López' WHERE dni = '10030234';

-- Agregar los nombres que les falta
UPDATE empleados SET nombre = 'María' WHERE dni = '10002234';
UPDATE empleados SET nombre = 'Carlos' WHERE dni = '10003234';
UPDATE empleados SET nombre = 'Ana' WHERE dni = '10004234';
UPDATE empleados SET nombre = 'Luis' WHERE dni = '10005234';
UPDATE empleados SET nombre = 'Pedro' WHERE dni = '10006234';
UPDATE empleados SET nombre = 'Roberto' WHERE dni = '10007234';
UPDATE empleados SET nombre = 'Jorge' WHERE dni = '10008234';
UPDATE empleados SET nombre = 'Miguel' WHERE dni = '10009234';
UPDATE empleados SET nombre = 'Fernando' WHERE dni = '10010234';
UPDATE empleados SET nombre = 'Ricardo' WHERE dni = '10011234';
UPDATE empleados SET nombre = 'José' WHERE dni = '10012234';
UPDATE empleados SET nombre = 'David' WHERE dni = '10013234';
UPDATE empleados SET nombre = 'Víctor' WHERE dni = '10014234';
UPDATE empleados SET nombre = 'Andrés' WHERE dni = '10015234';
UPDATE empleados SET nombre = 'Enrique' WHERE dni = '10016234';
UPDATE empleados SET nombre = 'Felipe' WHERE dni = '10017234';
UPDATE empleados SET nombre = 'Gerardo' WHERE dni = '10018234';
UPDATE empleados SET nombre = 'Juliana' WHERE dni = '10019234';
UPDATE empleados SET nombre = 'Katia' WHERE dni = '10020234';
UPDATE empleados SET nombre = 'Lorena' WHERE dni = '10021234';
UPDATE empleados SET nombre = 'Pablo' WHERE dni = '10022234';
UPDATE empleados SET nombre = 'Quique' WHERE dni = '10023234';
UPDATE empleados SET nombre = 'Ramón' WHERE dni = '10024234';
UPDATE empleados SET nombre = 'Ubaldo' WHERE dni = '10025234';
UPDATE empleados SET nombre = 'Valentín' WHERE dni = '10026234';
UPDATE empleados SET nombre = 'Yasmin' WHERE dni = '10027234';
UPDATE empleados SET nombre = 'Zacarías' WHERE dni = '10028234';
UPDATE empleados SET nombre = 'Arturo' WHERE dni = '10029234';
UPDATE empleados SET nombre = 'Braulio' WHERE dni = '10030234';

-- Verificar
SELECT id, nombre, apellido FROM empleados LIMIT 5;
