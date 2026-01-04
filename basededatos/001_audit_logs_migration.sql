-- Script de Migración: Auditoría de Cambios
-- Fecha: 2026-01-03
-- Descripción: Crea la tabla de logs de auditoría para rastrear cambios en el sistema

CREATE TABLE IF NOT EXISTS audit_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    entity_name VARCHAR(100) NOT NULL,
    entity_id BIGINT NOT NULL,
    action VARCHAR(20) NOT NULL,
    user_id BIGINT,
    username VARCHAR(100) NOT NULL,
    old_values LONGTEXT,
    new_values LONGTEXT,
    changes LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ip_address VARCHAR(500),
    user_agent VARCHAR(500),
    reason VARCHAR(1000),
    
    -- Índices para búsquedas rápidas
    INDEX idx_entity_id (entity_name, entity_id),
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_created_at (created_at),
    INDEX idx_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Comentarios de tabla
ALTER TABLE audit_logs COMMENT = 'Registro de auditoría: Registra todos los cambios en el sistema';

-- Comentarios de columnas
ALTER TABLE audit_logs MODIFY entity_name VARCHAR(100) COMMENT 'Nombre de la entidad modificada (Empleado, Licencia, Asistencia, etc)';
ALTER TABLE audit_logs MODIFY entity_id BIGINT COMMENT 'ID de la entidad modificada';
ALTER TABLE audit_logs MODIFY action VARCHAR(20) COMMENT 'Tipo de acción: CREATE, UPDATE, DELETE, APPROVE, REJECT, etc';
ALTER TABLE audit_logs MODIFY user_id BIGINT COMMENT 'ID del usuario que realizó la acción';
ALTER TABLE audit_logs MODIFY username VARCHAR(100) COMMENT 'Nombre de usuario';
ALTER TABLE audit_logs MODIFY old_values LONGTEXT COMMENT 'Valores anteriores en formato JSON';
ALTER TABLE audit_logs MODIFY new_values LONGTEXT COMMENT 'Valores nuevos en formato JSON';
ALTER TABLE audit_logs MODIFY changes LONGTEXT COMMENT 'Descripción de los cambios realizados';
ALTER TABLE audit_logs MODIFY created_at TIMESTAMP COMMENT 'Fecha y hora de la acción';
ALTER TABLE audit_logs MODIFY ip_address VARCHAR(500) COMMENT 'Dirección IP del usuario';
ALTER TABLE audit_logs MODIFY user_agent VARCHAR(500) COMMENT 'User Agent del navegador';
ALTER TABLE audit_logs MODIFY reason VARCHAR(1000) COMMENT 'Razón del cambio (opcional)';
