# Cambios Línea por Línea - Empleados.vue

## Archivo Modificado
`frontend/src/views/Empleados.vue`

---

## Cambio 1: Data Initialization (Línea 254)

### Localización
```
archivo: frontend/src/views/Empleados.vue
sección: data()
línea: 254
```

### Antes (4 campos)
```javascript
      formData: {
        nombre: '',
        apellido: '',
        dni: '',
        correo: ''
      },
```

### Después (10 campos)
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
      },
```

### Cambios Específicos
- ✅ Agregado: `telefono: ''`
- ✅ Agregado: `direccion: ''`
- ✅ Agregado: `departamento: null` (tipo diferente para relación)
- ✅ Agregado: `puesto: ''`
- ✅ Agregado: `salario: 0` (número)
- ✅ Agregado: `estado: 'activo'` (valor por defecto)

---

## Cambio 2: Formulario HTML - Nuevos Inputs (Línea 171-207)

### Localización
```
archivo: frontend/src/views/Empleados.vue
sección: template → modal-form
línea: 171-207
ubicación: después del input "Correo Electrónico"
```

### Código Agregado

#### Input 1: Teléfono (Línea 171-177)
```vue
<div class="form-group">
  <label>Teléfono</label>
  <input 
    v-model="formData.telefono" 
    type="text" 
    placeholder="Ingrese número de teléfono"
  />
</div>
```

#### Input 2: Dirección (Línea 179-185)
```vue
<div class="form-group">
  <label>Dirección</label>
  <input 
    v-model="formData.direccion" 
    type="text" 
    placeholder="Ingrese dirección"
  />
</div>
```

#### Input 3: Puesto (Línea 187-193)
```vue
<div class="form-group">
  <label>Puesto</label>
  <input 
    v-model="formData.puesto" 
    type="text" 
    placeholder="Ingrese puesto"
  />
</div>
```

#### Input 4: Salario (Línea 195-202)
```vue
<div class="form-group">
  <label>Salario</label>
  <input 
    v-model.number="formData.salario" 
    type="number" 
    placeholder="Ingrese salario"
    min="0"
  />
</div>
```

**Nota Importante:** `v-model.number` asegura que se envíe como número, no string

#### Select 5: Estado (Línea 204-207)
```vue
<div class="form-group">
  <label>Estado</label>
  <select v-model="formData.estado">
    <option value="activo">Activo</option>
    <option value="inactivo">Inactivo</option>
    <option value="licencia">Licencia</option>
  </select>
</div>
```

---

## Cambio 3: resetForm() Method (Línea 358-370)

### Localización
```
archivo: frontend/src/views/Empleados.vue
sección: script → methods
línea: 358-370
```

### Antes (4 campos)
```javascript
    resetForm() {
      this.formData = { nombre: '', apellido: '', dni: '', correo: '' }
      this.editingId = null
    },
```

### Después (10 campos)
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
    },
```

### Por Qué Este Cambio
- Cuando se abre el modal para crear un nuevo empleado
- Cuando se cierra el modal (confirmación de guardado)
- Ahora resetea todos los 10 campos, no solo 4
- Mantiene valores por defecto apropiados

---

## Resumen de Cambios

### Estadísticas
| Métrica | Valor |
|---------|-------|
| Líneas Agregadas | ~35 |
| Líneas Eliminadas | 0 |
| Líneas Modificadas | 2 |
| Campos Nuevos | 6 |
| Inputs Nuevos en Formulario | 5 |
| Métodos Modificados | 1 |
| Métodos Nuevos | 0 |
| Servicios Modificados | 0 |

### Campos Modificados en formData
```
Antes:    4 campos (nombre, apellido, dni, correo)
Después: 10 campos (+6 campos nuevos)

Nuevos Campos Agregados:
  1. telefono (string)
  2. direccion (string)
  3. departamento (null/relación)
  4. puesto (string)
  5. salario (number)
  6. estado (string/enum)
```

### Elementos UI Modificados en HTML
```
Antes:    4 inputs en el formulario
Después:  9 inputs en el formulario

Nuevos Inputs Agregados:
  1. Input Teléfono (type="text")
  2. Input Dirección (type="text")
  3. Input Puesto (type="text")
  4. Input Salario (type="number")
  5. Select Estado (select con 3 opciones)
```

---

## Validación de Cambios

### Antes de los cambios
```bash
npm run build
# Resultado: ✓ 363 modules transformed. ✓ built in 4.48s
```

### Después de los cambios
```bash
npm run build
# Resultado: ✓ 363 modules transformed. ✓ built in 4.52s
# ✅ Misma cantidad de módulos
# ✅ Sin errores nuevos
# ✅ Tiempo de build similar
```

---

## Verificación de Integridad

### Métodos que usan formData
1. ✅ `saveEmpleado()` - Usa `this.formData` en `api.createEmpleado()` y `api.updateEmpleado()`
2. ✅ `resetForm()` - Reinicia `this.formData` con todos los campos
3. ✅ `editEmpleado()` - Carga datos en `this.formData` (automático con v-model)

### Servicios que consumen estos cambios
1. ✅ `api.createEmpleado(data)` - Recibe formData completo
2. ✅ `api.updateEmpleado(id, data)` - Recibe formData completo

### No hay cambios requeridos en
- ❌ api.js
- ❌ notification.service.js
- ❌ Otros servicios
- ❌ Componentes

---

## Rollback (Si es necesario)

Si algo sale mal, los cambios se pueden revertir eliminando:

1. Las 6 líneas nuevas de formData (línea 261-266)
2. Los 5 inputs nuevos del formulario (línea 171-207)
3. Volviendo resetForm() a la versión anterior (línea 358-370)

O simplemente:
```bash
git checkout frontend/src/views/Empleados.vue
```

---

## Notas de Implementación

### Decisiones de Diseño

1. **departamento: null**
   - Por qué null: Indica una relación a otra entidad
   - Mejora futura: Cargar lista de departamentos del backend
   - Alternativa actual: Input de texto o relación directa

2. **salario: 0**
   - Tipo: number (no string)
   - Validación HTML: min="0"
   - v-model.number: Asegura envío como número
   - Por qué: Cálculos y validaciones numéricas en backend

3. **estado: 'activo'**
   - Tipo: string enum
   - Valores válidos: 'activo', 'inactivo', 'licencia'
   - Control: select HTML para limitar opciones
   - Por qué: Evita valores inválidos

4. **telefono, direccion, puesto**
   - Tipo: string
   - No requerido: placeholder no indica obligatoriedad
   - Validación: Mínima (HTML5 básico)
   - Mejora futura: Validación de formato de teléfono

### Mejoras Futuras Recomendadas

1. **Validación avanzada de teléfono**
   ```javascript
   type="tel" con pattern regex
   ```

2. **Departamento como dropdown**
   ```vue
   <select v-model="formData.departamento">
     <option v-for="dept in departamentos" :value="dept.id">
       {{ dept.nombre }}
     </option>
   </select>
   ```

3. **Puestos predefinidos**
   ```vue
   <select v-model="formData.puesto">
     <option value="Ingeniero">Ingeniero</option>
     <option value="Analista">Analista</option>
     ...
   </select>
   ```

---

## Testing Point by Point

Para verificar cada cambio:

### Test Cambio 1 (formData en data())
```javascript
// En consola del navegador
console.log(this.$data.formData)
// Debe mostrar 10 campos, no 4
```

### Test Cambio 2 (Inputs en HTML)
```bash
# Contar inputs en el formulario
# Debe haber: nombre, apellido, dni, correo, telefono, direccion, puesto, salario, estado = 9 inputs
# Más 1 select = 10 elementos de entrada
```

### Test Cambio 3 (resetForm)
```javascript
// Llenar todos los campos
// Cerrar modal / abrir modal
// Debe resetear a valores por defecto correctos
```

---

## Control de Calidad

| Aspecto | Status | Verificación |
|---------|--------|-------------|
| Sintaxis Vue | ✅ | `npm run build` sin errores |
| Binding v-model | ✅ | Todos los inputs tienen v-model |
| Tipos de datos | ✅ | string (excepto salario=number, departamento=null) |
| Valores por defecto | ✅ | Acordes al tipo ('' para string, 0 para number, 'activo' para enum) |
| Formulario HTML5 | ✅ | Validaciones básicas en place |
| Compatibilidad API | ✅ | formData se envía como es a createEmpleado/updateEmpleado |
| Sin breaking changes | ✅ | Cambios forward-compatible |

