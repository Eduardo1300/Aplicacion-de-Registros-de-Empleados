# 🚀 Instrucciones Paso a Paso - Cómo Probar la Corrección

## ⏱️ Tiempo Total: 5 minutos

---

## Paso 1: Recargar el Navegador (30 segundos)

### Opción A: Recarga normal
```
Presiona: Ctrl + R
```

### Opción B: Recarga fuerte (recomendado para limpiar caché)
```
Presiona: Ctrl + Shift + R
```

**Espera a que cargue completamente** ✅

---

## Paso 2: Navegar a la Sección de Empleados (30 segundos)

1. En el menú lateral, busca **"Empleados"**
2. Haz clic en **"Empleados"**
3. Deberías ver una tabla con los empleados existentes

✅ Si ves la tabla, continúa

---

## Paso 3: Abrir Formulario de Nuevo Empleado (30 segundos)

Busca un botón que diga:
- "Nuevo Empleado" o
- "+ Nuevo" o
- "Agregar Empleado"

Haz clic en ese botón.

**Deberías ver un modal con el formulario** ✅

---

## Paso 4: Rellenar el Formulario (2 minutos)

### Campos a completar:

#### 1. Nombre (Obligatorio)
```
Escribe: Juan
```

#### 2. Apellido (Obligatorio)
```
Escribe: Pérez
```

#### 3. DNI (Obligatorio)
```
Escribe: 12345678
(Debe ser único - no puede existir otro con ese DNI)
```

#### 4. Correo (Opcional)
```
Escribe: juan@empresa.com
(o cualquier correo válido)
```

#### 5. Teléfono (Opcional)
```
Escribe: 987654321
```

#### 6. Fecha de Ingreso ⭐ (OBLIGATORIO)
```
Haz clic en el campo de fecha
Selecciona: 2024-01-04
(o cualquier fecha válida)
```

#### 7. Departamento (Opcional pero necesario un ID válido)
```
Escribe: 1
(si tienes un departamento con ID 1)
```

#### 8. Cargo (Opcional pero necesario un ID válido)
```
Escribe: 1
(si tienes un cargo con ID 1)
```

#### 9. Estado (Seleccionar)
```
Despliega el menú y selecciona: "Activo"
```

### Ejemplo Visual del Formulario Completo:
```
┌─────────────────────────────────────┐
│ Nuevo Empleado                   [X]│
├─────────────────────────────────────┤
│ Nombre                              │
│ [Juan               ]               │
│                                     │
│ Apellido                            │
│ [Pérez              ]               │
│                                     │
│ DNI                                 │
│ [12345678           ]               │
│                                     │
│ Correo Electrónico                  │
│ [juan@empresa.com   ]               │
│                                     │
│ Teléfono                            │
│ [987654321          ]               │
│                                     │
│ Fecha de Ingreso *                  │
│ [2024-01-04         ]               │
│                                     │
│ Departamento                        │
│ [1                  ]               │
│                                     │
│ Cargo                               │
│ [1                  ]               │
│                                     │
│ Estado                              │
│ [Activo           ▼]               │
│                                     │
│   [Cancelar]      [✓ Guardar]      │
└─────────────────────────────────────┘
```

---

## Paso 5: Hacer Clic en Guardar (30 segundos)

1. Busca el botón **"Guardar"** o **"✓ Guardar"** en la parte inferior derecha
2. Haz clic en él
3. **Espera unos segundos**

---

## Paso 6: Verificar Resultado ✅

### Resultado Esperado (CORRECCIÓN FUNCIONANDO)
```
✅ Desaparece el modal (se cierra solo)
✅ Aparece un mensaje: "Empleado creado correctamente"
✅ El nuevo empleado "Juan Pérez" aparece en la tabla
✅ Puedes verlo con DNI 12345678 en la lista
```

### Resultado Incorrecto (AÚN HAY PROBLEMA)
```
❌ Vuelve a salir error "400 Bad Request"
❌ El modal no se cierra
❌ Aparece mensaje de error genérico
```

---

## 🔍 Si Hay Error 400 Aún

### Paso 1: Verificar Campos
- ✅ ¿Completaste TODOS los campos (especialmente Fecha de Ingreso)?
- ✅ ¿La Fecha de Ingreso está en formato YYYY-MM-DD?
- ✅ ¿El DNI es único (no existe otro empleado con ese DNI)?

### Paso 2: Verificar IDs
- ✅ ¿El Departamento (ID) existe? Verifica en la tabla de Departamentos
- ✅ ¿El Cargo (ID) existe? Verifica en la tabla de Cargos
- ✅ Si no existen, déjalos vacíos o prueba con IDs conocidos (1, 2, etc.)

### Paso 3: Abrir Console del Navegador
1. Presiona **F12**
2. Haz clic en la pestaña **"Console"**
3. Vuelve a intentar guardar
4. Busca el error rojo que aparece
5. Copia el mensaje de error

### Paso 4: Verificar Network Request
1. Presiona **F12**
2. Haz clic en la pestaña **"Network"**
3. Vuelve a intentar guardar
4. Busca el request POST a `/api/empleado`
5. Haz clic en él
6. Ve a la pestaña **"Response"**
7. Mira qué mensaje da el backend

---

## ✨ Verificación Adicional (Opcional)

### Verificar Que Se Envían los Datos Correctos

1. Presiona **F12**
2. Pestaña **"Network"**
3. Rellena el formulario y guardar
4. Busca POST `/api/empleado`
5. Haz clic en él
6. Pestaña **"Request"** o **"Payload"**
7. Deberías ver algo como:
```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "dni": "12345678",
  "correo": "juan@empresa.com",
  "telefono": "987654321",
  "fechaIngreso": "2024-01-04",
  "departamentoId": 1,
  "cargoId": 1,
  "estado": "Activo"
}
```

✅ Si ves estos datos, el frontend está enviando correctamente

---

## 📋 Checklist Final

```
□ Navegador recargado (Ctrl+Shift+R)
□ Abierta sección Empleados
□ Modal de formulario abierto
□ Campos completos:
  □ Nombre: Juan
  □ Apellido: Pérez
  □ DNI: 12345678
  □ Correo: juan@empresa.com
  □ Teléfono: 987654321
  □ Fecha Ingreso: 2024-01-04
  □ Departamento: 1
  □ Cargo: 1
  □ Estado: Activo
□ Clic en Guardar
□ Verificar resultado
```

---

## 🎉 Si Todo Funciona

**¡Felicidades!** La corrección está lista.

Ahora puedes:
1. ✅ Crear nuevos empleados
2. ✅ Editar empleados existentes
3. ✅ Ver los empleados en la tabla
4. ✅ Sin errores 400

---

## 📞 Próximos Pasos

Si la corrección funciona:
1. Probar con más empleados
2. Probar la edición de empleados
3. Probar eliminación (si existe)
4. Verificar que aparecen en reportes

Si aún hay problemas:
1. Revisar el mensaje de error exacto
2. Verificar que el backend (NestJS) está corriendo
3. Revisar los IDs de Departamentos y Cargos existentes
4. Contactar con más detalles del error

---

**¡Listo para empezar!** 🚀
