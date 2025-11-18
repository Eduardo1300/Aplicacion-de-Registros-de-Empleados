-- Crear tabla de tipos de licencia
CREATE TABLE IF NOT EXISTS tipo_licencia (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    dias_disponibles INT NOT NULL,
    requiere_aprobacion BOOLEAN DEFAULT TRUE,
    puede_acumularse BOOLEAN DEFAULT FALSE,
    requiere_documento BOOLEAN DEFAULT FALSE,
    porcentaje_descuento_salario DECIMAL(5,2) DEFAULT 0,
    renovacion_anual BOOLEAN DEFAULT TRUE,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Crear tabla de solicitud de licencia
CREATE TABLE IF NOT EXISTS solicitud_licencia (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    empleado_id BIGINT NOT NULL,
    tipo_licencia_id BIGINT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    dias_solicitados INT,
    razon TEXT,
    documento_adjunto VARCHAR(255),
    estado VARCHAR(50) DEFAULT 'PENDIENTE',
    usuario_aprobador_id BIGINT,
    fecha_solicitud DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_respuesta DATETIME,
    observaciones TEXT,
    afecta_saldo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (empleado_id) REFERENCES empleados(id),
    FOREIGN KEY (tipo_licencia_id) REFERENCES tipo_licencia(id),
    FOREIGN KEY (usuario_aprobador_id) REFERENCES usuarios(id),
    INDEX idx_empleado_estado (empleado_id, estado),
    INDEX idx_fecha (fecha_solicitud)
);

-- Crear tabla de saldo de licencias
CREATE TABLE IF NOT EXISTS saldo_licencia (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    empleado_id BIGINT NOT NULL,
    tipo_licencia_id BIGINT NOT NULL,
    dias_disponibles INT NOT NULL,
    dias_usados INT DEFAULT 0,
    anio INT NOT NULL,
    FOREIGN KEY (empleado_id) REFERENCES empleados(id),
    FOREIGN KEY (tipo_licencia_id) REFERENCES tipo_licencia(id),
    UNIQUE KEY unique_empleado_tipo_anio (empleado_id, tipo_licencia_id, anio)
);

-- Crear tabla de tipos de permiso
CREATE TABLE IF NOT EXISTS tipo_permiso (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    requiere_aprobacion BOOLEAN DEFAULT TRUE,
    requiere_documento BOOLEAN DEFAULT FALSE,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de solicitud de permiso
CREATE TABLE IF NOT EXISTS solicitud_permiso (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    empleado_id BIGINT NOT NULL,
    tipo_permiso_id BIGINT NOT NULL,
    fecha_permiso DATE NOT NULL,
    hora_inicio TIME,
    hora_fin TIME,
    motivo TEXT,
    documento_adjunto VARCHAR(255),
    estado VARCHAR(50) DEFAULT 'PENDIENTE',
    usuario_aprobador_id BIGINT,
    fecha_solicitud DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_respuesta DATETIME,
    observaciones TEXT,
    FOREIGN KEY (empleado_id) REFERENCES empleados(id),
    FOREIGN KEY (tipo_permiso_id) REFERENCES tipo_permiso(id),
    FOREIGN KEY (usuario_aprobador_id) REFERENCES usuarios(id),
    INDEX idx_empleado_estado (empleado_id, estado)
);

-- Insertar tipos de licencia por defecto
INSERT IGNORE INTO tipo_licencia (nombre, descripcion, dias_disponibles, requiere_aprobacion, puede_acumularse, activo) VALUES
('Vacaciones', 'Licencia anual de vacaciones', 15, TRUE, FALSE, TRUE),
('Enfermedad', 'Licencia por enfermedad', 10, TRUE, TRUE, TRUE),
('Maternidad', 'Licencia de maternidad', 112, TRUE, FALSE, TRUE),
('Paternidad', 'Licencia de paternidad', 14, TRUE, FALSE, TRUE),
('Fallecimiento', 'Licencia por fallecimiento de familiares', 3, FALSE, FALSE, TRUE),
('Otros', 'Otras licencias', 5, TRUE, FALSE, TRUE);

-- Insertar tipos de permiso por defecto
INSERT IGNORE INTO tipo_permiso (nombre, descripcion, requiere_aprobacion, requiere_documento, activo) VALUES
('Permiso Médico', 'Permiso para citas médicas', TRUE, FALSE, TRUE),
('Permiso Personal', 'Permiso personal por asuntos propios', TRUE, TRUE, TRUE),
('Permiso Judicial', 'Permiso para comparecencias judiciales', TRUE, TRUE, TRUE),
('Permiso Religiosa', 'Permiso por razones religiosas', TRUE, FALSE, TRUE);
