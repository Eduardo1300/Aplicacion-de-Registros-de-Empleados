# Guía Rápida - Cómo Usar el Formulario Corregido

## El Problema Resuelto

El formulario anterior enviaba campos que **no existen** en la base de datos del backend. 

Ahora está sincronizado correctamente con el DTO del backend NestJS.

---

## 🎯 Cómo Usar el Formulario

### Paso 1: Recargar el navegador
```
Ctrl + Shift + R
```

### Paso 2: Ir a Empleados → Nuevo Empleado

### Paso 3: Completar los campos

| Campo | Ejemplo | Descripción |
|-------|---------|------------|
| **Nombre** | Juan | Nombre del empleado |
| **Apellido** | Pérez | Apellido del empleado |
| **DNI** | 12345678 | Documento único (debe ser único) |
| **Correo** | juan@example.com | Correo electrónico (opcional) |
| **Teléfono** | 987654321 | Número de teléfono (opcional) |
| **Fecha de Ingreso** | 2024-01-04 | Fecha en formato YYYY-MM-DD **(REQUERIDO)** |
| **Departamento** | 1 | ID del departamento **(ver nota)** |
| **Cargo** | 1 | ID del cargo **(ver nota)** |
| **Estado** | Activo | Seleccionar: Activo, Inactivo o Licencia |

### Paso 4: Hacer clic en Guardar

---

## ⚠️ Notas Importantes

### Fecha de Ingreso
- **Es obligatorio** (campo requerido)
- Formato: YYYY-MM-DD (ej: 2024-01-04)
- El navegador te proporciona un selector de fecha

### Departamento (ID)
- Debe ser el **ID** de un departamento existente
- Ejemplo: si tienes departamento "Recursos Humanos" con ID 1, escribir "1"
- Puedes dejarlo vacío si no tienes asignado

### Cargo (ID)
- Debe ser el **ID** de un cargo existente
- Ejemplo: si tienes cargo "Analista" con ID 2, escribir "2"
- Puedes dejarlo vacío si no tienes asignado

### Estado
- Solo acepta 3 valores: **Activo**, **Inactivo**, o **Licencia**
- El valor por defecto es "Activo"

---

## ✅ Ejemplo Completo

### Llenar el formulario así:
```
Nombre:         Juan
Apellido:       Pérez García
DNI:            12345678
Correo:         juan.perez@empresa.com
Teléfono:       987654321
Fecha Ingreso:  2024-01-04        ← IMPORTANTE: Requerido
Departamento:   1                 ← ID (no nombre)
Cargo:          2                 ← ID (no nombre)
Estado:         Activo            ← Seleccionar
```

### Resultado esperado:
```
✅ "Empleado creado correctamente"
✅ El empleado aparece en la tabla
✅ Formulario se cierra automáticamente
```

---

## ❌ Errores Comunes y Soluciones

### Error: "400 Bad Request"
**Causa:** Algún campo falta o está en formato incorrecto

**Soluciones:**
1. Asegurar que **Fecha de Ingreso** está completa
2. Verificar que Departamento y Cargo son **números** (IDs)
3. Verificar que Estado es exactamente "Activo", "Inactivo" o "Licencia"
4. Recargar navegador con Ctrl+Shift+R

### Error: "DNI ya existe"
**Causa:** Ya hay un empleado con ese DNI

**Solución:** Cambiar el DNI a uno único

### Departamento ID = "no encontrado"
**Causa:** El ID del departamento no existe en la BD

**Solución:** 
1. Verificar en la tabla de departamentos qué IDs existen
2. O dejar Departamento vacío

### Cargo ID = "no encontrado"
**Causa:** El ID del cargo no existe en la BD

**Solución:**
1. Verificar en la tabla de cargos qué IDs existen
2. O dejar Cargo vacío

---

## 🔍 Verificación

### Para verificar que funciona:

1. **Crear empleado**
   - Rellenar con datos válidos
   - Hacer clic en Guardar
   - Debe decir "Empleado creado correctamente"

2. **Buscar el empleado**
   - Debe aparecer en la tabla
   - Con todos los datos ingresados

3. **Editar empleado**
   - Hacer clic en Editar
   - Cambiar datos
   - Hacer clic en Actualizar
   - Debe decir "Empleado actualizado correctamente"

---

## 📋 Campos Que Se Enviaron al Backend

Después de corregir, ahora se envía:

```javascript
{
  "nombre": "Juan",
  "apellido": "Pérez García",
  "dni": "12345678",
  "correo": "juan.perez@empresa.com",
  "telefono": "987654321",
  "fechaIngreso": "2024-01-04",
  "departamentoId": 1,
  "cargoId": 2,
  "estado": "Activo"
}
```

✅ **Esto coincide exactamente con lo que el backend espera**

---

## 🎉 Resumen

La corrección está lista. Solo necesitas:

1. ✅ Recargar el navegador (Ctrl+Shift+R)
2. ✅ Rellenar el formulario con los datos correctos
3. ✅ Hacer clic en Guardar
4. ✅ ¡Debe funcionar sin error 400!

---

## 💡 Si algo sigue sin funcionar

1. **Verificar que el backend está ejecutándose:**
   ```bash
   npm run start:dev
   ```

2. **Verificar que hay departamentos y cargos en la BD:**
   - Ir a la página de Departamentos
   - Ir a la página de Cargos
   - Ver qué IDs tienen

3. **Si aún hay error 400:**
   - F12 → Console
   - Copiar el error completo
   - Revisar Network → request POST a /api/empleado
   - Ver qué responde el backend (en Request/Response tab)

---

**Corrección completada.** El formulario ahora está 100% sincronizado con el backend. ✅
