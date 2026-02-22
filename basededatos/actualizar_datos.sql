-- Actualizar password del empleado Juan Pérez (DNI 12345678) a "123456"
-- El hash $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy corresponde a "123456"
UPDATE public.empleados 
SET password_hash = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'
WHERE dni = '12345678';

-- Asegurar que el empleado está activo
UPDATE public.empleados SET estado = 'Activo' WHERE dni = '12345678';

-- Agregar más empleados con password
INSERT INTO public.empleados (nombre, apellido, correo, telefono, estado, departamento_id, cargo_id, "fechaIngreso", "fechaCreacion", "fechaActualizacion", dni, password_hash, dias_vacaciones, dias_vacaciones_usados) VALUES
('Ana', 'García López', 'ana.garcia@empresa.com', '951111111', 'Activo', 1, 1, '2024-01-15', NOW(), NOW(), '11111111', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 15, 0),
('Pedro', 'Martínez Sánchez', 'pedro.martinez@empresa.com', '951222222', 'Activo', 2, 2, '2024-02-01', NOW(), NOW(), '22222222', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 15, 0),
('Laura', 'Jiménez Torres', 'laura.jimenez@empresa.com', '951333333', 'Activo', 3, 3, '2024-02-15', NOW(), NOW(), '33333333', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 15, 0),
('Diego', 'Ramírez Cruz', 'diego.ramirez@empresa.com', '951444444', 'Activo', 1, 4, '2024-03-01', NOW(), NOW(), '44444444', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 15, 0),
('María', 'Fernández Díaz', 'maria.fernandez@empresa.com', '951555555', 'Activo', 2, 5, '2024-03-15', NOW(), NOW(), '55555555', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 15, 0);

-- Agregar más asistencias para los últimos 30 días para los empleados activos
-- Obtener IDs de empleados activos
DO $$
DECLARE
    emp RECORD;
    fecha DATE;
    estado_var VARCHAR(10);
    hora_ent TIME;
BEGIN
    -- Iterar sobre empleados activos
    FOR emp IN SELECT id FROM public.empleados WHERE estado = 'Activo' LOOP
        -- Generar asistencia para los últimos 30 días
        FOR i IN 0..29 LOOP
            fecha := CURRENT_DATE - i;
            
            -- Random estado: 80% presente, 15% tardanza, 5% ausente
            CASE (RANDOM() * 100)::INT
                WHEN 0..79 THEN 
                    estado_var := 'PRESENTE';
                    hora_ent := '08:00:00'::TIME + (RANDOM() * 10)::INT * INTERVAL '1 minute';
                WHEN 80..94 THEN 
                    estado_var := 'TARDANZA';
                    hora_ent := '08:15:00'::TIME + (RANDOM() * 15)::INT * INTERVAL '1 minute';
                ELSE 
                    estado_var := 'AUSENTE';
                    hora_ent := NULL;
            END CASE;
            
            -- Insertar asistencia (solo si no existe para esa fecha)
            IF NOT EXISTS (
                SELECT 1 FROM public.asistencias 
                WHERE empleado_id = emp.id AND "fechaAsistencia" = fecha
            ) THEN
                INSERT INTO public.asistencias (empleado_id, "fechaAsistencia", estado, hora_entrada, hora_salida, "fechaCreacion")
                VALUES (
                    emp.id,
                    fecha,
                    estado_var::public.asistencias_estado_enum,
                    hora_ent,
                    CASE WHEN estado_var != 'AUSENTE' THEN '17:00:00'::TIME + (RANDOM() * 30)::INT * INTERVAL '1 minute' ELSE NULL END,
                    NOW()
                );
            END IF;
        END LOOP;
    END LOOP;
END $$;

-- Agregar licencias de ejemplo
INSERT INTO public.solicitud_licencia (empleado_id, tipo_licencia_id, "fechaInicio", "fechaFin", razon, estado, "fechaCreacion", "usuarioAprobadorId")
SELECT 
    e.id,
    (RANDOM() * 2 + 1)::INT,
    CURRENT_DATE + (RANDOM() * 10)::INT,
    CURRENT_DATE + (RANDOM() * 10 + 5)::INT,
    CASE (RANDOM() * 3)::INT
        WHEN 0 THEN 'Vacaciones programadas'
        WHEN 1 THEN 'Motivos personales'
        ELSE 'Consulta médica'
    END,
    CASE (RANDOM() * 3)::INT
        WHEN 0 THEN 'PENDIENTE'
        WHEN 1 THEN 'APROBADA'
        ELSE 'RECHAZADA'
    END,
    NOW(),
    3
FROM public.empleados e
WHERE e.estado = 'Activo'
LIMIT 20;
