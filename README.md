# Sistema de Registro de Empleados

## Descripción
Sistema web completo para la gestión de empleados, asistencias, justificaciones, turnos y departamentos en una organización. Incluye autenticación JWT, roles de usuario (ADMIN y EMPLEADO), panel de administración, dashboard estadístico y gestión de incidencias.

## Tecnologías Utilizadas
- **Backend:** Java 21, Spring Boot 3, Spring Security, Hibernate/JPA, MySQL 8
- **Frontend:** Angular 16+, TypeScript, Bootstrap 5
- **Base de Datos:** MySQL 8

## Estructura del Proyecto
```
Sistema-de-Registro-de-Empleados/
├── backend/         # API REST Spring Boot
├── frontend/        # Aplicación Angular
├── basededatos.sql  # Script de creación de BD y tablas
├── README.md        # Este archivo
```


## Arquitectura del Sistema

**Backend:** API REST modular con arquitectura en capas (Controller – Service – Repository – Entity).

**Seguridad:** Autenticación JWT y autorización por roles (ADMIN / EMPLEADO).

**Frontend:** Angular modularizado con lazy loading, guards y servicios centralizados para consumo de API.

**Comunicación:** HTTP + JSON entre Angular y Spring Boot.

**Persistencia:** JPA + Hibernate conectados a MySQL.

**Gestión de errores:** Global Exception Handler con respuestas estandarizadas.

## Diagrama de la Arquitectura

```
┌──────────────┐     HTTP      ┌───────────────┐      JDBC/Hibernate     ┌────────────┐
│   Angular     │  <────────→  │  Spring Boot   │  <──────────────→      │   MySQL     │
│  (Frontend)   │               │     (API)      │                        │   BD        │
└──────────────┘               └───────────────┘                        └────────────┘
```

## Cómo Contribuir / Testing

**Testing**

- Backend preparado para pruebas con JUnit y Mockito (estructura generada por Spring Initializr).

## Estado del Proyecto / Roadmap

**✅ Completado**:
- Autenticación y autorización
- CRUD de empleados, departamentos, cargos
- Asistencias y justificaciones
- Turnos y horarios
- Licencias y permisos
- Nómina y salarios
- Evaluaciones de desempeño
- Reportes personalizados
- Estadísticas y análisis
- Notificaciones
- Auditoría y trazabilidad
- Encoding UTF-8 completo
- Dashboards (Admin y Empleado)

**Mejoras futuras**

- Implementar asistencia por geolocalización.
- Integrar subida de documentos en justificaciones y licencias.
- Migración futura a PostgreSQL.
- Dockerización del backend y frontend.
- Integración con sistemas de terceros (RH, contabilidad).
- Mejoras en algoritmos de reportes.
- Integración de firma digital en documentos.

## Tablas de la Base de Datos (40+)
- **Usuarios**: usuario, rol
- **Empleados**: empleado, departamento, cargo, horario, turno
- **Asistencias**: asistencia, falta, justificacion
- **Licencias y Permisos**: tipo_licencia, solicitud_licencia, saldo_licencia, tipo_permiso, solicitud_permiso
- **Nómina**: salario, historial_pago, deduccion, bonificacion, hora_extra
- **Evaluaciones**: evaluacion, competencia, analisis_desempenio
- **Reportes**: reporte, configuracion_reporte
- **Notificaciones**: notificacion
- **Logs**: log_acceso, auditoria
- **Sistema**: rol_granular, mensaje, documento, anuncio, contacto_formulario

## Instalación y Ejecución

### 1. Base de Datos
- Crear la base de datos ejecutando el script `basededatos_completa.sql` en MySQL.
- Usuario por defecto: `root` / contraseña: `mysql` (ajustar en `application.properties` si es necesario).

### 2. Backend (Spring Boot)
```bash
cd backend
mvn clean package
java -jar target/registro-empleados-0.0.1-SNAPSHOT.jar
```
- El backend corre por defecto en `http://localhost:8080`
- Configuración en `src/main/resources/application.properties`

### 3. Frontend (Angular)
```bash
cd frontend
npm install
ng serve
```
- El frontend corre por defecto en `http://localhost:4200`

## Notas Técnicas
- El backend y frontend deben estar corriendo para el funcionamiento completo.
- Si cambias el puerto o credenciales de la BD, actualiza ambos proyectos.
- El backend maneja errores y validaciones, devolviendo mensajes claros al frontend.
- El frontend muestra mensajes de error personalizados para duplicados y validaciones.
- La base de datos utiliza UTF-8MB4 para soportar todos los caracteres especiales.
- Los controladores utilizan `/api` para rutas públicas y `/api/v1` para la versión 1 de la API.
- JWT se genera con algoritmo HS256 y contiene claims de: token, nombreUsuario, rol, empleadoId.
- Todos los datos de empleados se muestran con encoding UTF-8 (tildes, acentos correctos).

## Contacto
Desarrollado por Eduardo1300
