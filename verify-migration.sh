#!/bin/bash

# Script de verificación de migración
echo "=================================================="
echo "VERIFICACIÓN DE MIGRACIÓN"
echo "=================================================="
echo ""

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

SUCCESS=0
FAIL=0

# Función para verificar archivo
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1"
        ((SUCCESS++))
    else
        echo -e "${RED}✗${NC} $1"
        ((FAIL++))
    fi
}

# Función para verificar directorio
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1/"
        ((SUCCESS++))
    else
        echo -e "${RED}✗${NC} $1/"
        ((FAIL++))
    fi
}

echo -e "${YELLOW}Verificando estructura del proyecto...${NC}"
echo ""

# Archivos de configuración
echo "Archivos de configuración:"
check_file "backend-nest/.env"
check_file "backend-nest/.env.production"
check_file "backend-nest/docker-compose.yml"
check_file "backend-nest/Dockerfile"
check_file "backend-nest/init.sql"
echo ""

# Directorios principales
echo "Directorios del proyecto:"
check_dir "backend-nest/src"
check_dir "backend-nest/dist"
check_dir "backend-nest/node_modules"
echo ""

# Entidades
echo "Entidades TypeORM:"
check_file "backend-nest/src/entities/departamento.entity.ts"
check_file "backend-nest/src/entities/cargo.entity.ts"
check_file "backend-nest/src/entities/rol.entity.ts"
check_file "backend-nest/src/entities/usuario.entity.ts"
check_file "backend-nest/src/entities/empleado.entity.ts"
check_file "backend-nest/src/entities/asistencia.entity.ts"
check_file "backend-nest/src/entities/tipo-licencia.entity.ts"
check_file "backend-nest/src/entities/solicitud-licencia.entity.ts"
check_file "backend-nest/src/entities/saldo-licencia.entity.ts"
echo ""

# Módulos
echo "Módulos NestJS:"
check_dir "backend-nest/src/modules/empleado"
check_dir "backend-nest/src/modules/asistencia"
check_dir "backend-nest/src/modules/departamento"
check_dir "backend-nest/src/modules/cargo"
check_dir "backend-nest/src/modules/licencia"
check_dir "backend-nest/src/auth"
echo ""

# Servicios
echo "Servicios:"
check_file "backend-nest/src/modules/empleado/empleado.service.ts"
check_file "backend-nest/src/modules/asistencia/asistencia.service.ts"
check_file "backend-nest/src/modules/departamento/departamento.service.ts"
check_file "backend-nest/src/modules/cargo/cargo.service.ts"
check_file "backend-nest/src/modules/licencia/tipo-licencia.service.ts"
check_file "backend-nest/src/modules/licencia/solicitud-licencia.service.ts"
check_file "backend-nest/src/modules/licencia/saldo-licencia.service.ts"
check_file "backend-nest/src/auth/auth.service.ts"
echo ""

# Controladores
echo "Controladores:"
check_file "backend-nest/src/modules/empleado/empleado.controller.ts"
check_file "backend-nest/src/modules/asistencia/asistencia.controller.ts"
check_file "backend-nest/src/modules/departamento/departamento.controller.ts"
check_file "backend-nest/src/modules/cargo/cargo.controller.ts"
check_file "backend-nest/src/modules/licencia/solicitud-licencia.controller.ts"
check_file "backend-nest/src/auth/auth.controller.ts"
echo ""

# DTOs
echo "DTOs:"
check_file "backend-nest/src/dto/login.dto.ts"
check_file "backend-nest/src/dto/login-response.dto.ts"
check_file "backend-nest/src/dto/create-empleado.dto.ts"
check_file "backend-nest/src/dto/create-asistencia.dto.ts"
echo ""

# Archivos principales
echo "Archivos principales:"
check_file "backend-nest/src/app.module.ts"
check_file "backend-nest/src/main.ts"
check_file "backend-nest/package.json"
echo ""

# Documentación
echo "Documentación:"
check_file "GUIA_MIGRACION.md"
check_file "INICIO_RAPIDO.md"
check_file "MIGRACION_COMPLETADA.md"
check_file "backend-nest/README.md"
echo ""

# Frontend
echo "Frontend actualizado:"
check_file "frontend/src/environments/environment.ts"
echo ""

# Scripts de migración
echo "Scripts de migración:"
check_file "backend-nest/migrate.sh"
check_file "backend-nest/migrate.bat"
check_file "backend-nest/setup.sh"
check_file "backend-nest/setup.bat"
echo ""

# Resumen
echo "=================================================="
echo "RESUMEN DE VERIFICACIÓN"
echo "=================================================="
echo -e "${GREEN}Verificados: $SUCCESS${NC}"
echo -e "${RED}Faltantes: $FAIL${NC}"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}✓ ¡MIGRACIÓN COMPLETADA EXITOSAMENTE!${NC}"
    echo ""
    echo "Próximos pasos:"
    echo "1. Ejecute: cd backend-nest"
    echo "2. Opción A (Docker): docker-compose up --build"
    echo "2. Opción B (Local): npm run start:dev"
    echo ""
    exit 0
else
    echo -e "${RED}✗ Se encontraron archivos faltantes${NC}"
    exit 1
fi
