-- ============================================================
-- SEED DATA - PERMISOS Y ASIGNACIONES POR ROL
-- ============================================================

-- INSERTAR PERMISOS
INSERT INTO permissions (resource, action, descripcion) VALUES
-- Empleados
('empleados', 'read', 'Ver lista de empleados'),
('empleados', 'create', 'Crear empleado'),
('empleados', 'update', 'Editar empleado'),
('empleados', 'delete', 'Eliminar empleado'),
('empleados', 'export', 'Exportar empleados'),

-- Asistencias
('asistencias', 'read', 'Ver asistencias'),
('asistencias', 'create', 'Registrar asistencia'),
('asistencias', 'update', 'Editar asistencia'),
('asistencias', 'delete', 'Eliminar asistencia'),
('asistencias', 'export', 'Exportar asistencias'),

-- Licencias
('licencias', 'read', 'Ver licencias'),
('licencias', 'create', 'Solicitar licencia'),
('licencias', 'update', 'Editar licencia'),
('licencias', 'delete', 'Eliminar licencia'),
('licencias', 'approve', 'Aprobar licencia'),
('licencias', 'reject', 'Rechazar licencia'),
('licencias', 'export', 'Exportar licencias'),

-- Departamentos
('departamentos', 'read', 'Ver departamentos'),
('departamentos', 'create', 'Crear departamento'),
('departamentos', 'update', 'Editar departamento'),
('departamentos', 'delete', 'Eliminar departamento'),

-- Cargos
('cargos', 'read', 'Ver cargos'),
('cargos', 'create', 'Crear cargo'),
('cargos', 'update', 'Editar cargo'),
('cargos', 'delete', 'Eliminar cargo'),

-- Roles y Permisos
('roles', 'read', 'Ver roles'),
('roles', 'create', 'Crear rol'),
('roles', 'update', 'Editar rol'),
('roles', 'delete', 'Eliminar rol'),
('permissions', 'read', 'Ver permisos'),
('permissions', 'create', 'Crear permiso'),
('permissions', 'update', 'Editar permiso'),
('permissions', 'delete', 'Eliminar permiso'),
('permissions', 'assign', 'Asignar permisos a rol'),

-- Dashboard
('dashboard', 'read', 'Ver dashboard'),
('reports', 'read', 'Ver reportes'),
('reports', 'export', 'Exportar reportes'),

-- Usuarios
('usuarios', 'read', 'Ver usuarios'),
('usuarios', 'create', 'Crear usuario'),
('usuarios', 'update', 'Editar usuario'),
('usuarios', 'delete', 'Eliminar usuario'),
ON CONFLICT (resource, action) DO NOTHING;

-- ASIGNAR PERMISOS AL ROL ADMIN (obtener rol_id)
DO $$
DECLARE 
  admin_role_id INT;
  perm_id INT;
BEGIN
  -- Obtener ID del rol ADMIN
  SELECT id INTO admin_role_id FROM roles WHERE nombre = 'ADMIN' LIMIT 1;
  
  IF admin_role_id IS NOT NULL THEN
    -- Insertar todos los permisos para ADMIN
    INSERT INTO role_permissions (rol_id, permission_id)
    SELECT admin_role_id, id FROM permissions
    WHERE NOT EXISTS (
      SELECT 1 FROM role_permissions 
      WHERE rol_id = admin_role_id 
      AND permission_id = permissions.id
    )
    ON CONFLICT DO NOTHING;
  END IF;
END $$;

-- ASIGNAR PERMISOS AL ROL EMPLEADO (obtener rol_id)
DO $$
DECLARE 
  empleado_role_id INT;
BEGIN
  SELECT id INTO empleado_role_id FROM roles WHERE nombre = 'EMPLEADO' LIMIT 1;
  
  IF empleado_role_id IS NOT NULL THEN
    -- Insertar permisos limitados para EMPLEADO
    INSERT INTO role_permissions (rol_id, permission_id)
    SELECT empleado_role_id, id FROM permissions
    WHERE resource IN ('empleados', 'asistencias', 'licencias', 'dashboard')
    AND action IN ('read', 'create', 'export')
    AND NOT EXISTS (
      SELECT 1 FROM role_permissions 
      WHERE rol_id = empleado_role_id 
      AND permission_id = permissions.id
    )
    ON CONFLICT DO NOTHING;
  END IF;
END $$;
