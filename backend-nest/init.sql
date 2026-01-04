-- Script de inicialización de BD PostgreSQL para Sistema de Registro de Empleados
-- Esta migración reemplaza la BD MySQL anterior

-- Crear tabla de roles
CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE,
  descripcion VARCHAR(255),
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de departamentos
CREATE TABLE IF NOT EXISTS departamentos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de cargos
CREATE TABLE IF NOT EXISTS cargos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nombreUsuario VARCHAR(255) NOT NULL UNIQUE,
  clave VARCHAR(255) NOT NULL,
  activo BOOLEAN DEFAULT true,
  rol_id INTEGER NOT NULL REFERENCES roles(id),
  empleado_id INTEGER,
  fechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fechaActualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de empleados
CREATE TABLE IF NOT EXISTS empleados (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  apellido VARCHAR(255) NOT NULL,
  dni VARCHAR(20) NOT NULL UNIQUE,
  correo VARCHAR(255),
  telefono VARCHAR(20),
  fecha_ingreso DATE NOT NULL,
  estado VARCHAR(50) DEFAULT 'Activo',
  departamento_id INTEGER REFERENCES departamentos(id),
  cargo_id INTEGER REFERENCES cargos(id),
  usuario_id INTEGER UNIQUE REFERENCES usuarios(id),
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Agregar restricción de foreign key en usuarios para empleado_id
ALTER TABLE usuarios ADD CONSTRAINT fk_usuarios_empleado FOREIGN KEY (empleado_id) REFERENCES empleados(id) ON DELETE CASCADE;

-- Crear tabla de tipos de licencia
CREATE TABLE IF NOT EXISTS tipos_licencia (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  diasAnuales INTEGER DEFAULT 0,
  remunerada BOOLEAN DEFAULT true,
  fechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fechaActualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de asistencias
CREATE TABLE IF NOT EXISTS asistencias (
  id SERIAL PRIMARY KEY,
  empleado_id INTEGER NOT NULL REFERENCES empleados(id) ON DELETE CASCADE,
  fechaAsistencia DATE NOT NULL,
  hora_entrada TIME,
  hora_salida TIME,
  estado VARCHAR(50) NOT NULL,
  minutos_tardanza INTEGER,
  observaciones TEXT,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de solicitudes de licencia
CREATE TABLE IF NOT EXISTS solicitudes_licencia (
  id SERIAL PRIMARY KEY,
  empleado_id INTEGER NOT NULL REFERENCES empleados(id) ON DELETE CASCADE,
  tipo_licencia_id INTEGER NOT NULL REFERENCES tipos_licencia(id),
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE NOT NULL,
  dias_solicitados INTEGER,
  razon TEXT,
  documento_adjunto VARCHAR(255),
  estado VARCHAR(50) DEFAULT 'PENDIENTE',
  usuario_aprobador_id INTEGER REFERENCES usuarios(id),
  observaciones TEXT,
  afecta_saldo BOOLEAN DEFAULT true,
  fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_respuesta TIMESTAMP
);

-- Crear tabla de saldos de licencia
CREATE TABLE IF NOT EXISTS saldos_licencia (
  id SERIAL PRIMARY KEY,
  empleado_id INTEGER NOT NULL REFERENCES empleados(id) ON DELETE CASCADE,
  tipo_licencia_id INTEGER NOT NULL REFERENCES tipos_licencia(id),
  dias_disponibles INTEGER NOT NULL,
  dias_usados INTEGER DEFAULT 0,
  anio INTEGER NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(empleado_id, tipo_licencia_id, anio)
);

-- Insertar roles por defecto
INSERT INTO roles (nombre, descripcion) VALUES 
  ('ADMIN', 'Administrador del sistema'),
  ('EMPLEADO', 'Empleado regular')
ON CONFLICT (nombre) DO NOTHING;

-- Insertar usuarios por defecto
-- Usuario: admin, Contraseña: admin123 (hasheada)
-- Usuario: empleado, Contraseña: empleado123 (hasheada)
-- Para generar hashes, usar: bcryptjs con rounds=10
INSERT INTO usuarios (nombreUsuario, clave, activo, rol_id) VALUES
  ('admin', '$2a$10$jJD66jEeJNfFAZrj36uGN.DUEKaVc9FJZPmx1BqIRD8LWf3/8YeCq', true, 1),
  ('empleado', '$2a$10$OVBhvpTKy9pQmKF3RzAQ3eN8q5VMbp8S3UZxPM3G6L5W2E.Fy/.n.', true, 2)
ON CONFLICT (nombreUsuario) DO NOTHING;

-- Insertar tipos de licencia por defecto
INSERT INTO tipos_licencia (nombre, descripcion, diasAnuales, remunerada) VALUES
  ('Vacaciones', 'Licencia de vacaciones', 30, true),
  ('Enfermedad', 'Licencia por enfermedad', 0, true),
  ('Personal', 'Licencia personal', 0, false),
  ('Maternidad', 'Licencia de maternidad', 90, true),
  ('Paternidad', 'Licencia de paternidad', 30, true)
ON CONFLICT (nombre) DO NOTHING;

-- Crear índices para optimización
CREATE INDEX IF NOT EXISTS idx_empleados_dni ON empleados(dni);
CREATE INDEX IF NOT EXISTS idx_empleados_departamento ON empleados(departamento_id);
CREATE INDEX IF NOT EXISTS idx_empleados_cargo ON empleados(cargo_id);
CREATE INDEX IF NOT EXISTS idx_asistencias_empleado ON asistencias(empleado_id);
CREATE INDEX IF NOT EXISTS idx_asistencias_fecha ON asistencias(fechaAsistencia);
CREATE INDEX IF NOT EXISTS idx_solicitudes_empleado ON solicitudes_licencia(empleado_id);
CREATE INDEX IF NOT EXISTS idx_solicitudes_estado ON solicitudes_licencia(estado);
CREATE INDEX IF NOT EXISTS idx_saldos_empleado_anio ON saldos_licencia(empleado_id, anio);
