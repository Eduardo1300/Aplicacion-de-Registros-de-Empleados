@echo off
REM Script de inicio rápido para Sistema de Registro de Empleados (Windows)

echo.
echo ==========================================
echo Sistema de Registro de Empleados
echo Backend NestJS + PostgreSQL
echo ==========================================
echo.

REM Verificar si Node está instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo Error: Node.js no está instalado
    exit /b 1
)

echo [OK] Node.js encontrado
echo.

echo Instalando dependencias del proyecto...
call npm install

echo.
echo Compilando proyecto...
call npm run build

echo.
echo ==========================================
echo [OK] ¡Configuracion completada!
echo ==========================================
echo.
echo Para iniciar el servidor en modo desarrollo:
echo npm run start:dev
echo.
echo Para iniciar el servidor en produccion:
echo npm run start:prod
echo.
echo Con Docker Compose:
echo docker-compose up --build
echo.
