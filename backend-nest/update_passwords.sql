-- Establecer contraseñas para todos los empleados (DNI como contraseña)
-- Esto actualiza el campo password_hash para permitir login con DNI

-- Contraseña por defecto: 123456 (hash bcrypt)
-- hash: $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy

UPDATE empleados 
SET password_hash = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'
WHERE estado = 'Activo';
