-- Módulo Nómina y Compensación
CREATE TABLE salarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    empleado_id BIGINT NOT NULL,
    monto_base DECIMAL(10, 2) NOT NULL,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME,
    tipo_salario VARCHAR(50),
    estado VARCHAR(50),
    frecuencia_pago VARCHAR(50),
    fecha_creacion DATETIME,
    FOREIGN KEY (empleado_id) REFERENCES empleados(id)
);

CREATE TABLE bonificaciones (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    empleado_id BIGINT NOT NULL,
    tipo_bonificacion VARCHAR(100) NOT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    descripcion TEXT,
    fecha_otorgamiento DATETIME,
    periodo VARCHAR(50),
    aprobado_por VARCHAR(100),
    estado VARCHAR(50),
    fecha_creacion DATETIME,
    FOREIGN KEY (empleado_id) REFERENCES empleados(id)
);

CREATE TABLE deducciones (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    empleado_id BIGINT NOT NULL,
    tipo_deduccion VARCHAR(100) NOT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    porcentaje DECIMAL(5, 2),
    descripcion TEXT,
    fecha_deduccion DATETIME,
    periodo VARCHAR(50),
    motivo VARCHAR(255),
    estado VARCHAR(50),
    fecha_creacion DATETIME,
    FOREIGN KEY (empleado_id) REFERENCES empleados(id)
);

CREATE TABLE historial_pagos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    empleado_id BIGINT NOT NULL,
    periodo_pago VARCHAR(50) NOT NULL,
    fecha_pago DATETIME NOT NULL,
    salario_base DECIMAL(10, 2) NOT NULL,
    total_bonificaciones DECIMAL(10, 2),
    total_deducciones DECIMAL(10, 2),
    monto_neto DECIMAL(10, 2) NOT NULL,
    dias_trabajados INT,
    horas_extra DECIMAL(10, 2),
    monto_horas_extra DECIMAL(10, 2),
    estado VARCHAR(50),
    metodo_pago VARCHAR(50),
    comprobante_numero VARCHAR(100),
    fecha_creacion DATETIME,
    FOREIGN KEY (empleado_id) REFERENCES empleados(id)
);

-- Módulo Recursos Humanos
CREATE TABLE perfiles_rrhh (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    empleado_id BIGINT NOT NULL UNIQUE,
    resumen_ejecutivo TEXT,
    formacion_academica TEXT,
    experiencia_previa TEXT,
    competencias_principales TEXT,
    idiomas VARCHAR(255),
    certificaciones TEXT,
    habilidades_especiales TEXT,
    area_desarrollo VARCHAR(255),
    fecha_creacion DATETIME,
    fecha_actualizacion DATETIME,
    FOREIGN KEY (empleado_id) REFERENCES empleados(id)
);

CREATE TABLE competencias (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    empleado_id BIGINT NOT NULL,
    nombre_competencia VARCHAR(255) NOT NULL,
    nivel VARCHAR(50),
    descripcion TEXT,
    fecha_adquisicion DATETIME,
    certificada BOOLEAN DEFAULT FALSE,
    vigencia DATETIME,
    evidencia_url VARCHAR(255),
    estado VARCHAR(50),
    fecha_creacion DATETIME,
    FOREIGN KEY (empleado_id) REFERENCES empleados(id)
);

CREATE TABLE evaluaciones (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    empleado_id BIGINT NOT NULL,
    periodo_evaluacion VARCHAR(50) NOT NULL,
    calificacion_general INT,
    desempen_laboral INT,
    puntualidad INT,
    colaboracion_equipo INT,
    cumplimiento_objetivos INT,
    iniciativa INT,
    comunicacion INT,
    comentarios_evaluador TEXT,
    fortalezas TEXT,
    areas_mejora TEXT,
    evaluado_por VARCHAR(100),
    fecha_evaluacion DATETIME NOT NULL,
    estado VARCHAR(50),
    fecha_creacion DATETIME,
    FOREIGN KEY (empleado_id) REFERENCES empleados(id)
);

CREATE TABLE historial_rrhh (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    empleado_id BIGINT NOT NULL,
    tipo_evento VARCHAR(100) NOT NULL,
    descripcion TEXT,
    cargo_anterior VARCHAR(100),
    cargo_nuevo VARCHAR(100),
    departamento_anterior VARCHAR(100),
    departamento_nuevo VARCHAR(100),
    fecha_evento DATETIME NOT NULL,
    registrado_por VARCHAR(100),
    documento_adjunto VARCHAR(255),
    observaciones TEXT,
    fecha_creacion DATETIME,
    FOREIGN KEY (empleado_id) REFERENCES empleados(id)
);

-- Módulo Comunicación
CREATE TABLE notificaciones (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    empleado_id BIGINT NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    mensaje LONGTEXT NOT NULL,
    tipo VARCHAR(50),
    leida BOOLEAN DEFAULT FALSE,
    fecha_lectura DATETIME,
    enlace VARCHAR(255),
    remitente VARCHAR(100),
    prioridad VARCHAR(50),
    fecha_creacion DATETIME,
    FOREIGN KEY (empleado_id) REFERENCES empleados(id)
);

CREATE TABLE anuncios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    contenido LONGTEXT NOT NULL,
    autor VARCHAR(100),
    categoria VARCHAR(100),
    fecha_publicacion DATETIME NOT NULL,
    fecha_vencimiento DATETIME,
    visible BOOLEAN DEFAULT TRUE,
    destacado BOOLEAN DEFAULT FALSE,
    numero_visualizaciones INT DEFAULT 0,
    imagen_url VARCHAR(255),
    estado VARCHAR(50),
    fecha_creacion DATETIME
);

CREATE TABLE mensajes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    remitente_id BIGINT NOT NULL,
    destinatario_id BIGINT NOT NULL,
    asunto VARCHAR(255),
    contenido LONGTEXT NOT NULL,
    leido BOOLEAN DEFAULT FALSE,
    fecha_lectura DATETIME,
    archivos_adjuntos VARCHAR(255),
    tipo VARCHAR(50),
    prioridad VARCHAR(50),
    marcado_importante BOOLEAN DEFAULT FALSE,
    fecha_creacion DATETIME,
    FOREIGN KEY (remitente_id) REFERENCES empleados(id),
    FOREIGN KEY (destinatario_id) REFERENCES empleados(id)
);

CREATE TABLE contacto_formularios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    asunto VARCHAR(255) NOT NULL,
    mensaje LONGTEXT NOT NULL,
    tipo_consulta VARCHAR(50),
    estado VARCHAR(50) DEFAULT 'NUEVO',
    respondido_por VARCHAR(100),
    respuesta LONGTEXT,
    fecha_respuesta DATETIME,
    prioridad VARCHAR(50),
    fecha_creacion DATETIME
);

-- Módulo Seguridad y Acceso
CREATE TABLE log_acceso (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    empleado_id BIGINT NOT NULL,
    fecha_entrada DATETIME NOT NULL,
    fecha_salida DATETIME,
    ip_address VARCHAR(50),
    navegador VARCHAR(100),
    dispositivo VARCHAR(100),
    ubicacion VARCHAR(100),
    tipo_acceso VARCHAR(50),
    duracion_sesion BIGINT,
    motivo_cierre VARCHAR(50),
    estado VARCHAR(50),
    fecha_creacion DATETIME,
    FOREIGN KEY (empleado_id) REFERENCES empleados(id)
);

CREATE TABLE auditoria (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_id BIGINT,
    accion VARCHAR(100) NOT NULL,
    entidad VARCHAR(100) NOT NULL,
    id_entidad BIGINT,
    valores_anteriores LONGTEXT,
    valores_nuevos LONGTEXT,
    ip_address VARCHAR(50),
    navegador VARCHAR(100),
    descripcion TEXT,
    tabla_afectada VARCHAR(100),
    resultado VARCHAR(50),
    mensaje_error TEXT,
    fecha_creacion DATETIME
);

CREATE TABLE roles_granulares (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre_rol VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    permisos_modulo_nomina VARCHAR(255),
    permisos_modulo_rrhh VARCHAR(255),
    permisos_modulo_reportes VARCHAR(255),
    permisos_modulo_seguridad VARCHAR(255),
    permisos_modulo_empleados VARCHAR(255),
    permisos_modulo_comunicacion VARCHAR(255),
    puede_aprobar_solicitudes BOOLEAN DEFAULT FALSE,
    puede_ver_reportes_sensibles BOOLEAN DEFAULT FALSE,
    puede_editar_configuracion BOOLEAN DEFAULT FALSE,
    acceso_datos_sensibles BOOLEAN DEFAULT FALSE,
    estado VARCHAR(50),
    fecha_creacion DATETIME
);

-- Módulo Gestión Administrativa
CREATE TABLE documentos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    empleado_id BIGINT,
    titulo VARCHAR(255) NOT NULL,
    tipo_documento VARCHAR(100) NOT NULL,
    descripcion TEXT,
    ruta_archivo VARCHAR(500) NOT NULL,
    nombre_archivo VARCHAR(255),
    tamaño_archivo BIGINT,
    formato VARCHAR(50),
    fecha_documento DATETIME,
    fecha_vencimiento DATETIME,
    categoria VARCHAR(100),
    clasificacion VARCHAR(50),
    compartido_con VARCHAR(500),
    requiere_firma BOOLEAN DEFAULT FALSE,
    firmado BOOLEAN DEFAULT FALSE,
    estado VARCHAR(50),
    fecha_creacion DATETIME,
    FOREIGN KEY (empleado_id) REFERENCES empleados(id)
);

CREATE TABLE catalogo_departamentos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre_departamento VARCHAR(255) NOT NULL UNIQUE,
    codigo_departamento VARCHAR(50) UNIQUE,
    descripcion TEXT,
    jefe_departamento VARCHAR(100),
    telefono_contacto VARCHAR(20),
    email_contacto VARCHAR(100),
    ubicacion_fisica VARCHAR(255),
    presupuesto_anual DECIMAL(12, 2),
    numero_empleados INT DEFAULT 0,
    estado VARCHAR(50),
    fecha_creacion DATETIME
);

CREATE TABLE organigrama (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre_posicion VARCHAR(255) NOT NULL,
    nivel_jerarquico INT NOT NULL,
    empleado_id BIGINT,
    superior_id BIGINT,
    departamento VARCHAR(100),
    cantidad_subordinados INT DEFAULT 0,
    tipo_posicion VARCHAR(50),
    area_negocio VARCHAR(100),
    sede VARCHAR(100),
    descripcion_puesto TEXT,
    requisitos_minimos TEXT,
    responsabilidades TEXT,
    vigencia_desde DATETIME,
    vigencia_hasta DATETIME,
    estado VARCHAR(50),
    fecha_creacion DATETIME,
    FOREIGN KEY (empleado_id) REFERENCES empleados(id),
    FOREIGN KEY (superior_id) REFERENCES empleados(id)
);

CREATE TABLE historico_empleado (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    empleado_id BIGINT NOT NULL,
    tipo_cambio VARCHAR(100) NOT NULL,
    valor_anterior VARCHAR(500),
    valor_nuevo VARCHAR(500),
    cambio_realizado_por VARCHAR(100),
    motivo_cambio TEXT,
    documento_soporte VARCHAR(255),
    aprobado BOOLEAN DEFAULT FALSE,
    aprobado_por VARCHAR(100),
    fecha_cambio_efectivo DATETIME NOT NULL,
    vigencia_desde DATETIME,
    vigencia_hasta DATETIME,
    fecha_creacion DATETIME,
    FOREIGN KEY (empleado_id) REFERENCES empleados(id)
);

-- Crear índices para mejorar performance
CREATE INDEX idx_salarios_empleado ON salarios(empleado_id);
CREATE INDEX idx_salarios_estado ON salarios(estado);
CREATE INDEX idx_bonificaciones_empleado ON bonificaciones(empleado_id);
CREATE INDEX idx_bonificaciones_estado ON bonificaciones(estado);
CREATE INDEX idx_deducciones_empleado ON deducciones(empleado_id);
CREATE INDEX idx_deducciones_estado ON deducciones(estado);
CREATE INDEX idx_historial_pagos_empleado ON historial_pagos(empleado_id);
CREATE INDEX idx_historial_pagos_periodo ON historial_pagos(periodo_pago);
CREATE INDEX idx_historial_pagos_estado ON historial_pagos(estado);

CREATE INDEX idx_competencias_empleado ON competencias(empleado_id);
CREATE INDEX idx_evaluaciones_empleado ON evaluaciones(empleado_id);
CREATE INDEX idx_evaluaciones_periodo ON evaluaciones(periodo_evaluacion);
CREATE INDEX idx_historial_rrhh_empleado ON historial_rrhh(empleado_id);

CREATE INDEX idx_notificaciones_empleado ON notificaciones(empleado_id);
CREATE INDEX idx_notificaciones_leida ON notificaciones(leida);
CREATE INDEX idx_mensajes_destinatario ON mensajes(destinatario_id);
CREATE INDEX idx_mensajes_remitente ON mensajes(remitente_id);

CREATE INDEX idx_log_acceso_empleado ON log_acceso(empleado_id);
CREATE INDEX idx_log_acceso_fecha ON log_acceso(fecha_entrada);
CREATE INDEX idx_auditoria_usuario ON auditoria(usuario_id);
CREATE INDEX idx_auditoria_accion ON auditoria(accion);

CREATE INDEX idx_documentos_empleado ON documentos(empleado_id);
CREATE INDEX idx_organigrama_empleado ON organigrama(empleado_id);
CREATE INDEX idx_organigrama_superior ON organigrama(superior_id);
CREATE INDEX idx_historico_empleado_empleado ON historico_empleado(empleado_id);
