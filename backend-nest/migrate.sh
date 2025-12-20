#!/bin/bash

# Script para migrar datos de MySQL a PostgreSQL
# Requiere tener PostgreSQL instalado y accesible

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}========================================${NC}"
echo -e "${YELLOW}Migración de Base de Datos${NC}"
echo -e "${YELLOW}MySQL → PostgreSQL${NC}"
echo -e "${YELLOW}========================================${NC}"
echo ""

# Variables de configuración
MYSQL_HOST="${MYSQL_HOST:-localhost}"
MYSQL_USER="${MYSQL_USER:-root}"
MYSQL_PASSWORD="${MYSQL_PASSWORD:-mysql}"
MYSQL_DB="bd_registro_empleados"

PG_HOST="${DB_HOST:-localhost}"
PG_PORT="${DB_PORT:-5432}"
PG_USER="${DB_USERNAME:-postgres}"
PG_PASSWORD="${DB_PASSWORD:-postgres}"
PG_DB="${DB_NAME:-bd_registro_empleados}"

echo -e "${YELLOW}Configuración:${NC}"
echo "MySQL: $MYSQL_HOST/$MYSQL_DB"
echo "PostgreSQL: $PG_HOST:$PG_PORT/$PG_DB"
echo ""

# Crear la base de datos PostgreSQL si no existe
echo -e "${YELLOW}Creando base de datos PostgreSQL...${NC}"
PGPASSWORD=$PG_PASSWORD psql -h $PG_HOST -U $PG_USER -tc "SELECT 1 FROM pg_database WHERE datname = '$PG_DB'" | grep -q 1 || PGPASSWORD=$PG_PASSWORD psql -h $PG_HOST -U $PG_USER -c "CREATE DATABASE $PG_DB"

# Ejecutar el script de inicialización
echo -e "${YELLOW}Creando tablas...${NC}"
PGPASSWORD=$PG_PASSWORD psql -h $PG_HOST -U $PG_USER -d $PG_DB -f init.sql

echo -e "${GREEN}✓ Migración completada exitosamente${NC}"
echo ""
echo -e "${YELLOW}Pasos siguientes:${NC}"
echo "1. Configurar las variables de entorno en .env"
echo "2. Ejecutar: npm install"
echo "3. Ejecutar en desarrollo: npm run start:dev"
echo "4. O con Docker: docker-compose up --build"
