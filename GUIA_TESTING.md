# Guía de Testing - Corrección del Error 400 Bad Request

## Objetivo
Verificar que la corrección del formulario de empleados envía todos los campos requeridos y que el error 400 se ha resuelto.

## Pre-requisitos
1. Backend NestJS ejecutándose en `http://localhost:3000`
2. Frontend Vue ejecutándose (desarrollo o build)
3. Usuario autenticado en el sistema

## Pruebas a Realizar

### Test 1: Crear Nuevo Empleado (POST)
**Pasos:**
1. Navegar a la página de Empleados
2. Hacer clic en botón "Nuevo Empleado" (o similar)
3. Completar el formulario con datos válidos:
   - **Nombre:** Juan
   - **Apellido:** Pérez
   - **DNI:** 12345678
   - **Correo:** juan@ejemplo.com
   - **Teléfono:** 987654321
   - **Dirección:** Calle Principal 123
   - **Puesto:** Ingeniero
   - **Salario:** 3000
   - **Estado:** Activo

4. Hacer clic en "Guardar"

**Resultado Esperado:**
- ✅ Sin error 400
- ✅ Mensaje de éxito: "Empleado creado correctamente"
- ✅ El nuevo empleado aparece en la tabla
- ✅ Formulario se cierra y resetea

**Resultado Incorrecto:**
- ❌ Error 400 Bad Request
- ❌ Error genérico sin detalles
- ❌ Formulario no cierra

---

### Test 2: Editar Empleado Existente (PUT)
**Pasos:**
1. En la tabla de empleados, hacer clic en el botón "Editar" de cualquier empleado
2. Modificar al menos un campo:
   - Cambiar teléfono
   - Cambiar salario
   - Cambiar estado
3. Hacer clic en "Actualizar"

**Resultado Esperado:**
- ✅ Sin error 400
- ✅ Mensaje de éxito: "Empleado actualizado correctamente"
- ✅ Los cambios se reflejan en la tabla
- ✅ Formulario se cierra

**Resultado Incorrecto:**
- ❌ Error 400 Bad Request
- ❌ Los cambios no se guardan
- ❌ Error en consola

---

### Test 3: Verificar Estructura de Datos (Console)
**Pasos:**
1. Abrir la consola del navegador (F12)
2. Navegar a empleados
3. Hacer clic en "Nuevo Empleado"
4. En la consola, ejecutar:
   ```javascript
   // Buscar el componente Vue y verificar formData
   let app = document.querySelector('#app').__vue_app__.config.globalProperties
   console.log('formData:', app.$data.formData)
   ```

**Resultado Esperado:**
Debería mostrar un objeto con todos estos campos:
```javascript
{
  nombre: '',
  apellido: '',
  dni: '',
  correo: '',
  telefono: '',      // ✅ NUEVO
  direccion: '',     // ✅ NUEVO
  departamento: null, // ✅ NUEVO
  puesto: '',        // ✅ NUEVO
  salario: 0,        // ✅ NUEVO
  estado: 'activo'   // ✅ NUEVO
}
```

---

### Test 4: Verificar Network Request (Network Tab)
**Pasos:**
1. Abrir las herramientas de desarrollador (F12)
2. Ir a la pestaña "Network"
3. Limpiar la lista de requests
4. Llenar el formulario y hacer clic en "Guardar"
5. Buscar el request POST a `/api/empleado`
6. Hacer clic en el request
7. Ver la pestaña "Request" y verificar el payload

**Resultado Esperado:**
El body del request debe contener:
```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "dni": "12345678",
  "correo": "juan@ejemplo.com",
  "telefono": "987654321",
  "direccion": "Calle Principal 123",
  "departamento": null,
  "puesto": "Ingeniero",
  "salario": 3000,
  "estado": "activo"
}
```

El response debe ser:
- ✅ Status: 200 o 201 (no 400)
- ✅ Body: Objeto del empleado creado/actualizado

---

### Test 5: Prueba de Validación (Campos Vacíos)
**Pasos:**
1. Abrir el formulario
2. Dejar campos requeridos vacíos (nombre, apellido, dni)
3. Intentar guardar

**Resultado Esperado:**
- ✅ El formulario previene el envío (HTML5 validation)
- ✅ Se muestra validación visual
- ✅ No se envía request al servidor

---

## Campos Mapeados en Formulario

| Campo en Código | Campo en Form | Tipo | Requerido | Valor por Defecto |
|-----------------|---------------|------|-----------|-------------------|
| nombre | Nombre | text | Sí | '' |
| apellido | Apellido | text | Sí | '' |
| dni | DNI | text | Sí | '' |
| correo | Correo Electrónico | email | No | '' |
| telefono | Teléfono | text | No | '' |
| direccion | Dirección | text | No | '' |
| puesto | Puesto | text | No | '' |
| salario | Salario | number | No | 0 |
| estado | Estado | select | No | 'activo' |
| departamento | - | null | No | null |

---

## Si Aún Hay Error 400

**Pasos de Diagnóstico:**

1. **Verificar que el navegador tiene la versión actualizada:**
   ```bash
   # En la carpeta frontend
   npm run build
   ```
   - Luego recargar el navegador (Ctrl+Shift+R)

2. **Revisar el mensaje de error completo en consola:**
   - F12 > Console
   - Buscar detalles del error
   - Puede mostrar qué campos falta o son inválidos

3. **Verificar backend con curl:**
   ```bash
   curl -X POST http://localhost:3000/api/empleado \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <TOKEN>" \
     -d '{
       "nombre": "Test",
       "apellido": "Usuario",
       "dni": "99999999",
       "correo": "test@test.com",
       "telefono": "123456789",
       "direccion": "Test",
       "puesto": "Tester",
       "salario": 1000,
       "estado": "activo"
     }'
   ```

4. **Revisar validaciones en backend:**
   - Las validaciones de DTOs pueden rechazar datos
   - Verificar tipos de datos (número vs string)
   - Revisar formatos esperados (email, teléfono, etc.)

---

## Checklist de Verificación

- [ ] Test 1: Crear empleado exitosamente
- [ ] Test 2: Editar empleado exitosamente
- [ ] Test 3: formData tiene todos los campos (10 campos)
- [ ] Test 4: Network request contiene todos los campos
- [ ] Test 5: Validación HTML funciona
- [ ] Console: Sin errores relacionados con formData
- [ ] Build: 0 errors (363 modules)
- [ ] La tabla muestra correctamente empleados

---

## Siguiente Paso

Si todos los tests pasan:
1. ✅ El problema está resuelto
2. Pasar a verificar otros endpoints (Asistencias, Departamentos, Licencias)
3. Implementar mejoras sugeridas en `CORRECCIONES_APLICADAS.md`

Si algún test falla:
1. Documentar exactamente cuál falla
2. Revisar el error específico en consola
3. Verificar con backend qué campos/formatos espera
4. Actualizar `formData` si es necesario
