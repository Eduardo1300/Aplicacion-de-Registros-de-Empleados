@echo off
REM Script para migrar datos de MySQL a PostgreSQL (Windows)
REM Requiere tener PostgreSQL instalado

setlocal enabledelayedexpansion

echo.
echo ========================================
echo Migracion de Base de Datos
echo MySQL - PostgreSQL
echo ========================================
echo.

REM Variables de configuracion
set MYSQL_HOST=localhost
set MYSQL_USER=root
set MYSQL_PASSWORD=mysql
set MYSQL_DB=bd_registro_empleados

set PG_HOST=localhost
set PG_PORT=5432
set PG_USER=postgres
set PG_PASSWORD=postgres
set PG_DB=bd_registro_empleados

echo Configuracion:
echo MySQL: %MYSQL_HOST%/%MYSQL_DB%
echo PostgreSQL: %PG_HOST%:%PG_PORT%/%PG_DB%
echo.

REM Crear la base de datos PostgreSQL si no existe
echo Creando base de datos PostgreSQL...
set PGPASSWORD=%PG_PASSWORD%
psql -h %PG_HOST% -U %PG_USER% -tc "SELECT 1 FROM pg_database WHERE datname = '%PG_DB%'" | findstr /R "1" >nul
if errorlevel 1 (
    psql -h %PG_HOST% -U %PG_USER% -c "CREATE DATABASE %PG_DB%"
)

REM Ejecutar el script de inicializacion
echo Creando tablas...
psql -h %PG_HOST% -U %PG_USER% -d %PG_DB% -f init.sql

echo.
echo [OK] Migracion completada exitosamente
echo.
echo Pasos siguientes:
echo 1. Configurar las variables de entorno en .env
echo 2. Ejecutar: npm install
echo 3. Ejecutar en desarrollo: npm run start:dev
echo 4. O con Docker: docker-compose up --build
echo.
