#!/bin/bash

# Script de inicio rápido para Sistema de Registro de Empleados

echo "=========================================="
echo "Sistema de Registro de Empleados"
echo "Backend NestJS + PostgreSQL"
echo "=========================================="
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Verificar si PostgreSQL está instalado
echo "Verificando dependencias..."
command -v postgres &> /dev/null || { echo "PostgreSQL no está instalado. Por favor instálalo primero."; exit 1; }
command -v node &> /dev/null || { echo "Node.js no está instalado. Por favor instálalo primero."; exit 1; }

echo -e "${GREEN}✓ Dependencias encontradas${NC}"
echo ""

# Crear y configurar base de datos
echo -e "${YELLOW}Configurando base de datos...${NC}"
./migrate.sh

echo ""
echo -e "${YELLOW}Instalando dependencias del proyecto...${NC}"
npm install

echo ""
echo -e "${YELLOW}Compilando proyecto...${NC}"
npm run build

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✓ ¡Configuración completada!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Para iniciar el servidor en modo desarrollo:"
echo -e "${YELLOW}npm run start:dev${NC}"
echo ""
echo "Para iniciar el servidor en producción:"
echo -e "${YELLOW}npm run start:prod${NC}"
echo ""
echo "Con Docker Compose:"
echo -e "${YELLOW}docker-compose up --build${NC}"
echo ""
