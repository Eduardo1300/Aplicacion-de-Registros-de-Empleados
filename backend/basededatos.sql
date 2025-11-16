-- =============================================
-- SCRIPT SQL - NUEVAS TABLAS DE MÓDULOS
-- Sistema de Registro de Empleados
-- =============================================

USE bd_registro_empleados;

-- =============================================
-- MÓDULO 1: REPORTES Y ANÁLISIS
-- =============================================

-- Tabla: Reporte
CREATE TABLE IF NOT EXISTS reporte (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    tipo_reporte VARCHAR(50) NOT NULL,
    fecha_generacion DATETIME,
    usuario_generador_id BIGINT NOT NULL,
    departamento_id BIGINT,
    fecha_inicio DATE,
    fecha_fin DATE,
    estado VARCHAR(50) NOT NULL DEFAULT 'BORRADOR',
    contenido_pdf LONGBLOB,
    contenido_excel LONGBLOB,
    fecha_actualizacion DATETIME,
    es_automatico BOOLEAN DEFAULT FALSE,
    ruta_archivo VARCHAR(500),
    FOREIGN KEY (usuario_generador_id) REFERENCES usuario(id),
    FOREIGN KEY (departamento_id) REFERENCES departamento(id),
    INDEX idx_tipo_reporte (tipo_reporte),
    INDEX idx_estado (estado),
    INDEX idx_fecha_generacion (fecha_generacion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: Análisis Tardanzas
CREATE TABLE IF NOT EXISTS analisis_tardanzas (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    empleado_id BIGINT NOT NULL,
    periodo DATE,
    cantidad_tardanzas INT DEFAULT 0,
    minutos_totales INT DEFAULT 0,
    tendencia VARCHAR(50) DEFAULT 'ESTABLE',
    promedio_minutos DECIMAL(10,2),
    limite_permitido INT DEFAULT 180,
    excede_limite BOOLEAN DEFAULT FALSE,
    observaciones TEXT,
    FOREIGN KEY (empleado_id) REFERENCES empleado(id),
    UNIQUE KEY uk_empleado_periodo (empleado_id, periodo),
    INDEX idx_empleado_id (empleado_id),
    INDEX idx_periodo (periodo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: Análisis Desempeño
CREATE TABLE IF NOT EXISTS analisis_desempeño (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    departamento_id BIGINT NOT NULL,
    periodo DATE,
    productividad DECIMAL(5,2),
    cumplimiento DECIMAL(5,2),
    puntualidad DECIMAL(5,2),
    indicadores JSON,
    meta_productividad DECIMAL(5,2),
    meta_cumplimiento DECIMAL(5,2),
    observaciones TEXT,
    estado_desempeño VARCHAR(50),
    FOREIGN KEY (departamento_id) REFERENCES departamento(id),
    UNIQUE KEY uk_departamento_periodo (departamento_id, periodo),
    INDEX idx_departamento_id (departamento_id),
    INDEX idx_periodo (periodo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: Configuración Reporte
CREATE TABLE IF NOT EXISTS configuracion_reporte (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    usuario_creador_id BIGINT NOT NULL,
    tipo_reporte VARCHAR(50) NOT NULL,
    filtros JSON,
    columnas JSON,
    graficos_incluidos JSON,
    frecuencia VARCHAR(50),
    proximo_envio DATETIME,
    emails_destino JSON,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion DATETIME,
    fecha_ultima_ejecucion DATETIME,
    FOREIGN KEY (usuario_creador_id) REFERENCES usuario(id),
    INDEX idx_usuario_creador (usuario_creador_id),
    INDEX idx_activo (activo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- MÓDULO 2: GESTIÓN DE HORARIOS
-- =============================================

-- Tabla: Turno
CREATE TABLE IF NOT EXISTS turno (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    descanso_inicio TIME,
    descanso_fin TIME,
    horas_trabajo INT,
    descripcion TEXT,
    activo BOOLEAN DEFAULT TRUE,
    color VARCHAR(50),
    icono VARCHAR(50),
    UNIQUE KEY uk_nombre (nombre),
    INDEX idx_activo (activo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: Asignación Horario
CREATE TABLE IF NOT EXISTS asignacion_horario (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    empleado_id BIGINT NOT NULL,
    turno_id BIGINT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE,
    estado VARCHAR(50) DEFAULT 'ACTIVO',
    razon_cambio TEXT,
    creado_por BIGINT,
    fecha_creacion DATE,
    observaciones TEXT,
    FOREIGN KEY (empleado_id) REFERENCES empleado(id),
    FOREIGN KEY (turno_id) REFERENCES turno(id),
    INDEX idx_empleado_id (empleado_id),
    INDEX idx_estado (estado),
    INDEX idx_fecha_inicio (fecha_inicio)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: Hora Extra
CREATE TABLE IF NOT EXISTS hora_extra (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    empleado_id BIGINT NOT NULL,
    fecha DATE NOT NULL,
    horas_extra DECIMAL(5,2),
    razon TEXT,
    aprobado BOOLEAN DEFAULT FALSE,
    usuario_aprobador_id BIGINT,
    fecha_aprobacion DATE,
    observaciones TEXT,
    compensada BOOLEAN DEFAULT FALSE,
    monto_pago DECIMAL(10,2),
    FOREIGN KEY (empleado_id) REFERENCES empleado(id),
    FOREIGN KEY (usuario_aprobador_id) REFERENCES usuario(id),
    INDEX idx_empleado_id (empleado_id),
    INDEX idx_fecha (fecha),
    INDEX idx_aprobado (aprobado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: Cambio Horario
CREATE TABLE IF NOT EXISTS cambio_horario (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    empleado_id BIGINT NOT NULL,
    horario_anterior_id BIGINT,
    horario_nuevo_id BIGINT NOT NULL,
    fecha_efectiva DATE NOT NULL,
    razon TEXT,
    solicitado_por_id BIGINT,
    estado VARCHAR(50) DEFAULT 'PENDIENTE',
    fecha_solicitud DATE,
    notificado BOOLEAN DEFAULT FALSE,
    observaciones TEXT,
    FOREIGN KEY (empleado_id) REFERENCES empleado(id),
    FOREIGN KEY (horario_anterior_id) REFERENCES turno(id),
    FOREIGN KEY (horario_nuevo_id) REFERENCES turno(id),
    FOREIGN KEY (solicitado_por_id) REFERENCES usuario(id),
    INDEX idx_empleado_id (empleado_id),
    INDEX idx_estado (estado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- MÓDULO 3: PERMISOS Y LICENCIAS
-- =============================================

-- Tabla: Tipo Licencia
CREATE TABLE IF NOT EXISTS tipo_licencia (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    dias_disponibles INT,
    requiere_aprobacion BOOLEAN DEFAULT TRUE,
    puede_acumularse BOOLEAN DEFAULT FALSE,
    requiere_documento BOOLEAN DEFAULT FALSE,
    activo BOOLEAN DEFAULT TRUE,
    porcentaje_descuento_salario DECIMAL(5,2) DEFAULT 0,
    renovacion_anual BOOLEAN DEFAULT TRUE,
    UNIQUE KEY uk_nombre (nombre),
    INDEX idx_activo (activo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: Saldo Licencia
CREATE TABLE IF NOT EXISTS saldo_licencia (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    empleado_id BIGINT NOT NULL,
    tipo_licencia_id BIGINT NOT NULL,
    saldo_disponible INT,
    saldo_usado INT DEFAULT 0,
    saldo_acumulado INT DEFAULT 0,
    anio INT,
    fecha_reinicio DATE,
    fecha_actualizacion DATE,
    observaciones TEXT,
    FOREIGN KEY (empleado_id) REFERENCES empleado(id),
    FOREIGN KEY (tipo_licencia_id) REFERENCES tipo_licencia(id),
    UNIQUE KEY uk_empleado_tipo_anio (empleado_id, tipo_licencia_id, anio),
    INDEX idx_empleado_id (empleado_id),
    INDEX idx_anio (anio)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: Solicitud Licencia
CREATE TABLE IF NOT EXISTS solicitud_licencia (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    empleado_id BIGINT NOT NULL,
    tipo_licencia_id BIGINT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    dias_solicitados INT,
    razon TEXT,
    documento_adjunto VARCHAR(500),
    estado VARCHAR(50) DEFAULT 'PENDIENTE',
    usuario_aprobador_id BIGINT,
    fecha_solicitud DATETIME NOT NULL,
    fecha_respuesta DATETIME,
    observaciones TEXT,
    afecta_saldo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (empleado_id) REFERENCES empleado(id),
    FOREIGN KEY (tipo_licencia_id) REFERENCES tipo_licencia(id),
    FOREIGN KEY (usuario_aprobador_id) REFERENCES usuario(id),
    INDEX idx_empleado_id (empleado_id),
    INDEX idx_estado (estado),
    INDEX idx_fecha_solicitud (fecha_solicitud)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: Tipo Permiso
CREATE TABLE IF NOT EXISTS tipo_permiso (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    tiempo_permitido INT,
    requiere_documento BOOLEAN DEFAULT FALSE,
    requiere_aprobacion BOOLEAN DEFAULT TRUE,
    activo BOOLEAN DEFAULT TRUE,
    descuento_salario BOOLEAN DEFAULT FALSE,
    limite_mensual INT,
    UNIQUE KEY uk_nombre (nombre),
    INDEX idx_activo (activo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: Solicitud Permiso
CREATE TABLE IF NOT EXISTS solicitud_permiso (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    empleado_id BIGINT NOT NULL,
    tipo_permiso_id BIGINT NOT NULL,
    fecha DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    razon TEXT,
    estado VARCHAR(50) DEFAULT 'PENDIENTE',
    usuario_aprobador_id BIGINT,
    fecha_solicitud DATETIME,
    fecha_respuesta DATETIME,
    observaciones TEXT,
    documento_adjunto VARCHAR(500),
    FOREIGN KEY (empleado_id) REFERENCES empleado(id),
    FOREIGN KEY (tipo_permiso_id) REFERENCES tipo_permiso(id),
    FOREIGN KEY (usuario_aprobador_id) REFERENCES usuario(id),
    INDEX idx_empleado_id (empleado_id),
    INDEX idx_estado (estado),
    INDEX idx_fecha (fecha)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- DATOS INICIALES
-- =============================================

-- Tipos de Licencia
INSERT INTO tipo_licencia (nombre, descripcion, dias_disponibles, requiere_aprobacion, puede_acumularse, activo, renovacion_anual) 
VALUES 
('Vacaciones', 'Días de vacaciones anuales', 30, true, false, true, true),
('Enfermedad', 'Ausencia por enfermedad', 15, true, false, true, true),
('Personal', 'Licencia personal', 5, true, false, true, true),
('Maternidad', 'Licencia de maternidad', 90, false, false, true, false),
('Paternidad', 'Licencia de paternidad', 10, false, false, true, false);

-- Tipos de Permiso
INSERT INTO tipo_permiso (nombre, descripcion, tiempo_permitido, requiere_documento, requiere_aprobacion, activo, descuento_salario) 
VALUES 
('Médico', 'Permiso para citas médicas', 120, true, true, true, false),
('Personal', 'Permiso personal', 60, false, true, true, true),
('Asuntos administrativos', 'Permiso para trámites', 120, false, true, true, false),
('Descanso', 'Permiso de descanso', 30, false, false, true, true);

-- Turnos
INSERT INTO turno (nombre, hora_inicio, hora_fin, descanso_inicio, descanso_fin, horas_trabajo, activo, color) 
VALUES 
('Mañana', '08:00:00', '17:00:00', '12:00:00', '13:00:00', 8, true, '#4CAF50'),
('Tarde', '14:00:00', '23:00:00', '18:00:00', '18:30:00', 8, true, '#FF9800'),
('Noche', '22:00:00', '07:00:00', '02:00:00', '03:00:00', 8, true, '#673AB7'),
('Matutino', '06:00:00', '14:00:00', '10:00:00', '10:30:00', 8, true, '#2196F3'),
('Vespertino', '14:00:00', '22:00:00', '18:00:00', '19:00:00', 8, true, '#9C27B0');

-- =============================================
-- FIN DEL SCRIPT
-- =============================================
