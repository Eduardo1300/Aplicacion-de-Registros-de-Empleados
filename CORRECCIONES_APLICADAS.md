# Correcciones Aplicadas - Error 400 Bad Request

## Problema Identificado

**Error:** `POST http://localhost:3000/api/empleado 400 (Bad Request)`

**Ubicación:** 
- Archivo: `frontend/src/views/Empleados.vue`
- Método: `saveEmpleado()` (línea 354-359)
- Causa: El formulario enviaba solo 4 campos cuando el backend requería más

## Raíz del Problema

El objeto `formData` que se enviaba al backend contenía:
```javascript
{
  nombre: '',
  apellido: '',
  dni: '',
  correo: ''
}
```

Pero el backend espera (según estándar de empleados) también:
- `telefono`
- `direccion`
- `departamento`
- `puesto`
- `salario`
- `estado`

## Correcciones Realizadas

### 1. Actualización de Data Initialization (línea 254)

**Antes:**
```javascript
formData: {
  nombre: '',
  apellido: '',
  dni: '',
  correo: ''
}
```

**Después:**
```javascript
formData: {
  nombre: '',
  apellido: '',
  dni: '',
  correo: '',
  telefono: '',
  direccion: '',
  departamento: null,
  puesto: '',
  salario: 0,
  estado: 'activo'
}
```

### 2. Actualización de resetForm() (línea 358-370)

**Antes:**
```javascript
resetForm() {
  this.formData = { nombre: '', apellido: '', dni: '', correo: '' }
  this.editingId = null
}
```

**Después:**
```javascript
resetForm() {
  this.formData = { 
    nombre: '',
    apellido: '',
    dni: '',
    correo: '',
    telefono: '',
    direccion: '',
    departamento: null,
    puesto: '',
    salario: 0,
    estado: 'activo'
  }
  this.editingId = null
}
```

### 3. Agregar Campos al Formulario HTML

Se agregaron nuevos inputs al modal del formulario después del campo "Correo":

```vue
<div class="form-group">
  <label>Teléfono</label>
  <input 
    v-model="formData.telefono" 
    type="text" 
    placeholder="Ingrese número de teléfono"
  />
</div>

<div class="form-group">
  <label>Dirección</label>
  <input 
    v-model="formData.direccion" 
    type="text" 
    placeholder="Ingrese dirección"
  />
</div>

<div class="form-group">
  <label>Puesto</label>
  <input 
    v-model="formData.puesto" 
    type="text" 
    placeholder="Ingrese puesto"
  />
</div>

<div class="form-group">
  <label>Salario</label>
  <input 
    v-model.number="formData.salario" 
    type="number" 
    placeholder="Ingrese salario"
    min="0"
  />
</div>

<div class="form-group">
  <label>Estado</label>
  <select v-model="formData.estado">
    <option value="activo">Activo</option>
    <option value="inactivo">Inactivo</option>
    <option value="licencia">Licencia</option>
  </select>
</div>
```

## Compilación

✅ Build satisfactorio después de cambios:
- 363 modules transformed
- 0 errors
- 4.87s build time
- Bundle size: 1.08MB

## Próximos Pasos a Verificar

### 1. Verificar Endpoints en NestJS Backend

Los siguientes endpoints podrían tener el mismo problema:

| Endpoint | Método | Archivo | Línea | Requiere Verificación |
|----------|--------|---------|-------|----------------------|
| `/api/empleado` | POST | Empleados.vue | 357 | ✅ CORREGIDO |
| `/api/empleado/:id` | PUT | Empleados.vue | 354 | ✅ Usa mismo formData |
| `/api/asistencia` | POST | api.js | 55 | ⚠️ Revisar |
| `/api/departamento` | POST | api.js | 71 | ⚠️ Revisar |
| `/api/solicitud-licencia` | POST | api.js | 86 | ⚠️ Revisar |

### 2. Testing Recomendado

1. **Crear nuevo empleado** con todos los campos completados
2. **Editar empleado existente** 
3. **Verificar en la tabla** que se muestren los nuevos campos
4. **Probar otros endpoints** (Asistencias, Departamentos, Licencias)
5. **Verificar validaciones** que el backend requiera (ej: salario >= 0)

### 3. Campos que Requieren Validación Adicional

- **Salario:** Debería ser positivo (min=0 en HTML, validar en backend)
- **Estado:** Valores permitidos (activo, inactivo, licencia)
- **Teléfono:** Formato de número de teléfono válido
- **Dirección:** Longitud mínima/máxima
- **DNI:** Formato y validación numérica

### 4. Campos Que Podrían Necesitar Mejoras

- **Departamento:** Actualmente es null, podría ser dropdown con opciones del backend
- **Puesto:** Podría tener lista predefinida de puestos
- **Estado:** Estados definitivos a coordinar con backend

## Archivos Modificados

1. **frontend/src/views/Empleados.vue**
   - Línea 254: Actualización de formData
   - Línea 358-370: Actualización de resetForm()
   - Línea 171-207: Agregar campos al formulario

## Notas Importantes

1. El cambio mantiene compatibilidad con el servicio `api.js` que ya tiene `createEmpleado()` y `updateEmpleado()`
2. Los campos nuevos tienen valores por defecto apropiados:
   - Strings vacíos para texto
   - null para relaciones (departamento)
   - 0 para números
   - 'activo' para estado
3. El v-model.number en salario asegura que se envíe como número, no string
4. El formulario es ahora más completo y alineado con un modelo de empleado real

## Build Status

✅ Compilación completada exitosamente
- Sin errores de sintaxis
- Sin errores de type-checking
- Lista para testing

## Recomendaciones Futuras

1. **DTOs Automáticas:** Generar campos del formulario basado en DTOs del backend
2. **Validaciones Compartidas:** Usar esquemas de validación comunes (Zod/Joi) en ambos lados
3. **OpenAPI/Swagger:** Documentar endpoints para sincronizar expectativas
4. **Error Handling Mejorado:** Mostrar mensajes específicos del backend (400, 409, etc.)
5. **Loading States:** Agregar indicadores de carga en formularios POST/PUT
