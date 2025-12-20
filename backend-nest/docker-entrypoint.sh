#!/bin/bash
set -e

# Esperar a que PostgreSQL esté listo
echo "Esperando a PostgreSQL..."
sleep 10

# Crear la base de datos si no existe
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -U $DB_USERNAME -tc "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'" | grep -q 1 || PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -U $DB_USERNAME -c "CREATE DATABASE $DB_NAME"

echo "Base de datos lista"
exec "$@"
