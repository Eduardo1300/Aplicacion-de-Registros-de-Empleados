-- Script de creación de base de datos completa
-- Este script contiene todas las tablas del sistema

-- Crear base de datos si no existe
CREATE DATABASE IF NOT EXISTS bd_registro_empleados;
USE bd_registro_empleados;

-- Tablas Base
CREATE TABLE IF NOT EXISTS roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre_rol VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    fecha_creacion DATETIME,
    fecha_actualizacion DATETIME
);

CREATE TABLE IF NOT EXISTS usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    correo VARCHAR(100),
    activo BOOLEAN DEFAULT TRUE,
    rol_id BIGINT,
    fecha_creacion DATETIME,
    FOREIGN KEY (rol_id) REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS departamentos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    estado VARCHAR(50),
    fecha_creacion DATETIME
);

CREATE TABLE IF NOT EXISTS cargos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    nivel INT,
    estado VARCHAR(50),
    fecha_creacion DATETIME
);

CREATE TABLE IF NOT EXISTS empleados (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    dni VARCHAR(20) NOT NULL UNIQUE,
    correo VARCHAR(100),
    telefono VARCHAR(20),
    fecha_ingreso DATETIME,
    departamento_id BIGINT,
    cargo_id BIGINT,
    estado VARCHAR(50),
    usuario_id BIGINT,
    fecha_creacion DATETIME,
    FOREIGN KEY (departamento_id) REFERENCES departamentos(id),
    FOREIGN KEY (cargo_id) REFERENCES cargos(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS horarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    empleado_id BIGINT NOT NULL,
    dia_semana INT,
    hora_entrada TIME,
    hora_salida TIME,
    descanso_inicio TIME,
    descanso_fin TIME,
    estado VARCHAR(50),
    fecha_creacion DATETIME,
    FOREIGN KEY (empleado_id) REFERENCES empleados(id)
);

CREATE TABLE IF NOT EXISTS asistencias (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    empleado_id BIGINT NOT NULL,
    fecha_asistencia DATE,
    hora_entrada TIME,
    hora_salida TIME,
    minutos_tardanza INT DEFAULT 0,
    estado VARCHAR(50),
    observaciones TEXT,
    fecha_creacion DATETIME,
    FOREIGN KEY (empleado_id) REFERENCES empleados(id),
    INDEX idx_empleado_fecha (empleado_id, fecha_asistencia)
);

CREATE TABLE IF NOT EXISTS faltas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    empleado_id BIGINT NOT NULL,
    fecha_falta DATE,
    tipo_falta VARCHAR(50),
    justificada BOOLEAN DEFAULT FALSE,
    estado VARCHAR(50),
    observaciones TEXT,
    fecha_creacion DATETIME,
    FOREIGN KEY (empleado_id) REFERENCES empleados(id)
);

CREATE TABLE IF NOT EXISTS justificaciones (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    empleado_id BIGINT NOT NULL,
    falta_id BIGINT,
    fecha_justificacion DATE,
    tipo_justificacion VARCHAR(100),
    descripcion TEXT,
    documento_soporte VARCHAR(255),
    estado VARCHAR(50),
    aprobado_por BIGINT,
    fecha_aprobacion DATETIME,
    observaciones TEXT,
    fecha_creacion DATETIME,
    FOREIGN KEY (empleado_id) REFERENCES empleados(id),
    FOREIGN KEY (falta_id) REFERENCES faltas(id),
    FOREIGN KEY (aprobado_por) REFERENCES empleados(id)
);

-- FASE 2: Reportes, Horarios, Licencias
CREATE TABLE IF NOT EXISTS reportes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    tipo_reporte VARCHAR(50),
    fecha_generacion DATETIME,
    periodo_inicio DATE,
    periodo_fin DATE,
    generado_por BIGINT,
    archivo_url VARCHAR(255),
    estado VARCHAR(50),
    fecha_creacion DATETIME,
    FOREIGN KEY (generado_por) REFERENCES empleados(id)
);

CREATE TABLE IF NOT EXISTS analisis_tardanzas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    periodo VARCHAR(50),
    total_tardanzas INT,
    empleado_mas_tardio BIGINT,
    minutos_promedio_tardanza INT,
    tendencia VARCHAR(50),
    fecha_creacion DATETIME,
    FOREIGN KEY (empleado_mas_tardio) REFERENCES empleados(id)
);

CREATE TABLE IF NOT EXISTS analisis_desempenio (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    empleado_id BIGINT,
    calificacion_desempenio INT,
    periodo VARCHAR(50),
    observaciones TEXT,
    recomendaciones TEXT,
    fecha_creacion DATETIME,
    FOREIGN KEY (empleado_id) REFERENCES empleados(id)
);

CREATE TABLE IF NOT EXISTS configuracion_reportes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre_configuracion VARCHAR(100),
    tipo_reporte VARCHAR(50),
    parametros VARCHAR(500),
    activo BOOLEAN,
    fecha_creacion DATETIME
);

CREATE TABLE IF NOT EXISTS turnos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    hora_inicio TIME,
    hora_fin TIME,
    descanso_inicio TIME,
    descanso_fin TIME,
    horas_trabajadas DECIMAL(5,2),
    estado VARCHAR(50),
    fecha_creacion DATETIME
);

CREATE TABLE IF NOT EXISTS asignacion_horarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    empleado_id BIGINT,
    turno_id BIGINT,
    fecha_inicio DATETIME,
    fecha_fin DATETIME,
    estado VARCHAR(50),
    fecha_creacion DATETIME,
    FOREIGN KEY (empleado_id) REFERENCES empleados(id),
    FOREIGN KEY (turno_id) REFERENCES turnos(id)
);

CREATE TABLE IF NOT EXISTS horas_extras (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    empleado_id BIGINT,
    fecha_horas_extra DATE,
    cantidad_horas DECIMAL(5,2),
    motivo VARCHAR(255),
    aprobado BOOLEAN,
    estado VARCHAR(50),
    fecha_creacion DATETIME,
    FOREIGN KEY (empleado_id) REFERENCES empleados(id)
);

CREATE TABLE IF NOT EXISTS cambios_horarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    empleado_id BIGINT,
    turno_anterior_id BIGINT,
    turno_nuevo_id BIGINT,
    fecha_cambio DATETIME,
    motivo VARCHAR(255),
    aprobado_por BIGINT,
    estado VARCHAR(50),
    fecha_creacion DATETIME,
    FOREIGN KEY (empleado_id) REFERENCES empleados(id),
    FOREIGN KEY (turno_anterior_id) REFERENCES turnos(id),
    FOREIGN KEY (turno_nuevo_id) REFERENCES turnos(id),
    FOREIGN KEY (aprobado_por) REFERENCES empleados(id)
);

CREATE TABLE IF NOT EXISTS tipo_licencias (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    dias_permitidos INT,
    estado VARCHAR(50),
    fecha_creacion DATETIME
);

CREATE TABLE IF NOT EXISTS saldo_licencias (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    empleado_id BIGINT,
    tipo_licencia_id BIGINT,
    dias_disponibles INT,
    dias_utilizados INT,
    anio INT,
    estado VARCHAR(50),
    fecha_creacion DATETIME,
    FOREIGN KEY (empleado_id) REFERENCES empleados(id),
    FOREIGN KEY (tipo_licencia_id) REFERENCES tipo_licencias(id)
);

CREATE TABLE IF NOT EXISTS solicitud_licencias (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    empleado_id BIGINT,
    tipo_licencia_id BIGINT,
    fecha_inicio DATETIME,
    fecha_fin DATETIME,
    dias_solicitados INT,
    motivo TEXT,
    estado VARCHAR(50),
    aprobado_por BIGINT,
    fecha_aprobacion DATETIME,
    observaciones TEXT,
    fecha_creacion DATETIME,
    FOREIGN KEY (empleado_id) REFERENCES empleados(id),
    FOREIGN KEY (tipo_licencia_id) REFERENCES tipo_licencias(id),
    FOREIGN KEY (aprobado_por) REFERENCES empleados(id)
);

CREATE TABLE IF NOT EXISTS tipo_permisos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    tiempo_maximo INT,
    unidad_tiempo VARCHAR(50),
    estado VARCHAR(50),
    fecha_creacion DATETIME
);

CREATE TABLE IF NOT EXISTS solicitud_permisos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    empleado_id BIGINT,
    tipo_permiso_id BIGINT,
    fecha_solicitud DATETIME,
    hora_inicio TIME,
    hora_fin TIME,
    motivo TEXT,
    estado VARCHAR(50),
    aprobado_por BIGINT,
    fecha_aprobacion DATETIME,
    observaciones TEXT,
    fecha_creacion DATETIME,
    FOREIGN KEY (empleado_id) REFERENCES empleados(id),
    FOREIGN KEY (tipo_permiso_id) REFERENCES tipo_permisos(id),
    FOREIGN KEY (aprobado_por) REFERENCES empleados(id)
);

-- FASE 3: Nómina, RRHH, Comunicación, Seguridad, Administración

-- Módulo Nómina y Compensación
CREATE TABLE IF NOT EXISTS salarios (
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

CREATE TABLE IF NOT EXISTS bonificaciones (
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

CREATE TABLE IF NOT EXISTS deducciones (
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

CREATE TABLE IF NOT EXISTS historial_pagos (
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
CREATE TABLE IF NOT EXISTS perfiles_rrhh (
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

CREATE TABLE IF NOT EXISTS competencias (
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

CREATE TABLE IF NOT EXISTS evaluaciones (
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

CREATE TABLE IF NOT EXISTS historial_rrhh (
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
CREATE TABLE IF NOT EXISTS notificaciones (
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

CREATE TABLE IF NOT EXISTS anuncios (
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

CREATE TABLE IF NOT EXISTS mensajes (
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

CREATE TABLE IF NOT EXISTS contacto_formularios (
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
CREATE TABLE IF NOT EXISTS log_acceso (
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

CREATE TABLE IF NOT EXISTS auditoria (
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

CREATE TABLE IF NOT EXISTS roles_granulares (
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
CREATE TABLE IF NOT EXISTS documentos (
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

CREATE TABLE IF NOT EXISTS catalogo_departamentos (
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

CREATE TABLE IF NOT EXISTS organigrama (
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

CREATE TABLE IF NOT EXISTS historico_empleado (
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
ALTER TABLE empleados ADD INDEX idx_empleado_departamento (departamento_id);
ALTER TABLE empleados ADD INDEX idx_empleado_cargo (cargo_id);
ALTER TABLE asistencias ADD INDEX idx_asistencia_empleado (empleado_id);
ALTER TABLE asistencias ADD INDEX idx_asistencia_fecha (fecha_asistencia);
ALTER TABLE salarios ADD INDEX idx_salarios_empleado (empleado_id);
ALTER TABLE bonificaciones ADD INDEX idx_bonificaciones_empleado (empleado_id);
ALTER TABLE deducciones ADD INDEX idx_deducciones_empleado (empleado_id);
ALTER TABLE historial_pagos ADD INDEX idx_historial_pagos_empleado (empleado_id);
ALTER TABLE competencias ADD INDEX idx_competencias_empleado (empleado_id);
ALTER TABLE evaluaciones ADD INDEX idx_evaluaciones_empleado (empleado_id);
ALTER TABLE notificaciones ADD INDEX idx_notificaciones_empleado (empleado_id);
ALTER TABLE mensajes ADD INDEX idx_mensajes_destinatario (destinatario_id);
ALTER TABLE log_acceso ADD INDEX idx_log_acceso_empleado (empleado_id);
ALTER TABLE documentos ADD INDEX idx_documentos_empleado (empleado_id);
ALTER TABLE organigrama ADD INDEX idx_organigrama_empleado (empleado_id);
