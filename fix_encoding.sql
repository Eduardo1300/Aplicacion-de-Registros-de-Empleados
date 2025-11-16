-- Fix encoding for employees
SET FOREIGN_KEY_CHECKS=0;

UPDATE empleados SET nombre = 'Juan', apellido = 'García López' WHERE id = 42;
UPDATE empleados SET nombre = 'María', apellido = 'López Rodríguez' WHERE id = 43;
UPDATE empleados SET nombre = 'Carlos', apellido = 'Rodríguez Martínez' WHERE id = 44;
UPDATE empleados SET nombre = 'Ana', apellido = 'Martínez García' WHERE id = 45;
UPDATE empleados SET nombre = 'Luis', apellido = 'Fernández López' WHERE id = 46;
UPDATE empleados SET nombre = 'Pedro', apellido = 'Sánchez Díaz' WHERE id = 47;
UPDATE empleados SET nombre = 'Roberto', apellido = 'Díaz López' WHERE id = 48;
UPDATE empleados SET nombre = 'Jorge', apellido = 'López García' WHERE id = 49;
UPDATE empleados SET nombre = 'Miguel', apellido = 'García Fernández' WHERE id = 50;
UPDATE empleados SET nombre = 'Fernando', apellido = 'Fernández Martínez' WHERE id = 51;
UPDATE empleados SET nombre = 'Ricardo', apellido = 'Martínez Sánchez' WHERE id = 52;
UPDATE empleados SET nombre = 'José', apellido = 'Sánchez López' WHERE id = 53;
UPDATE empleados SET nombre = 'David', apellido = 'Rodríguez López' WHERE id = 54;
UPDATE empleados SET nombre = 'Víctor', apellido = 'López Martínez' WHERE id = 55;
UPDATE empleados SET nombre = 'Andrés', apellido = 'Martínez García' WHERE id = 56;
UPDATE empleados SET nombre = 'Enrique', apellido = 'García López' WHERE id = 57;
UPDATE empleados SET nombre = 'Felipe', apellido = 'López Rodríguez' WHERE id = 58;
UPDATE empleados SET nombre = 'Gerardo', apellido = 'Rodríguez Martínez' WHERE id = 59;
UPDATE empleados SET nombre = 'Juliana', apellido = 'García Rodríguez' WHERE id = 60;
UPDATE empleados SET nombre = 'Katia', apellido = 'Rodríguez López' WHERE id = 61;
UPDATE empleados SET nombre = 'Lorena', apellido = 'López Martínez' WHERE id = 62;
UPDATE empleados SET nombre = 'Pablo', apellido = 'Rodríguez Martínez' WHERE id = 63;
UPDATE empleados SET nombre = 'Quique', apellido = 'Martínez López' WHERE id = 64;
UPDATE empleados SET nombre = 'Ramón', apellido = 'López García' WHERE id = 65;
UPDATE empleados SET nombre = 'Ubaldo', apellido = 'López Martínez' WHERE id = 66;
UPDATE empleados SET nombre = 'Valentín', apellido = 'Martínez García' WHERE id = 67;
UPDATE empleados SET nombre = 'Yasmin', apellido = 'Rodríguez Martínez' WHERE id = 68;
UPDATE empleados SET nombre = 'Zacarías', apellido = 'Martínez López' WHERE id = 69;
UPDATE empleados SET nombre = 'Arturo', apellido = 'García Rodríguez' WHERE id = 70;
UPDATE empleados SET nombre = 'Braulio', apellido = 'Rodríguez López' WHERE id = 71;

-- Fix departamentos
UPDATE departamentos SET descripcion = 'Departamento de Gestión de Recursos Humanos' WHERE id = 1;
UPDATE departamentos SET descripcion = 'Departamento de Tecnología e Informática' WHERE id = 2;
UPDATE departamentos SET descripcion = 'Departamento de Ventas y Comercial' WHERE id = 3;
UPDATE departamentos SET descripcion = 'Departamento de Marketing y Comunicación' WHERE id = 4;
UPDATE departamentos SET descripcion = 'Departamento de Contabilidad y Finanzas' WHERE id = 5;
UPDATE departamentos SET descripcion = 'Departamento de Operaciones y Logística' WHERE id = 6;
UPDATE departamentos SET descripcion = 'Departamento de Atención al Cliente' WHERE id = 7;
UPDATE departamentos SET descripcion = 'Departamento de Producción' WHERE id = 8;

-- Fix cargos
UPDATE cargos SET descripcion = 'Jefe de área o equipo' WHERE id = 3;
UPDATE cargos SET descripcion = 'Especialista técnico' WHERE id = 5;
UPDATE cargos SET descripcion = 'Representante de ventas' WHERE id = 9;

SET FOREIGN_KEY_CHECKS=1;

SELECT "Encoding fixed!" as status;
