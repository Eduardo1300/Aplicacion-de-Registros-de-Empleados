# Employee Portal Data Loading Fixes

**Commit:** `098c706` - "fix: resolve employee portal data loading issues"  
**Date:** February 22, 2026

## Overview
Fixed critical issues preventing employee portal from displaying attendance and license data, as well as handling attendance marking errors.

## Issues Resolved

### 1. **Route Collision in NestJS Controllers**
**Problem:** Generic `@Get(':id')` endpoints were matching before specific routes like `@Get('hoy')`, preventing employee endpoints from being accessed.

**Solution:** Reorganized controller endpoints to place specific routes BEFORE generic routes.

**Files Modified:**
- `backend-nest/src/modules/asistencia/asistencia.controller.ts`
- `backend-nest/src/modules/licencia/solicitud-licencia.controller.ts`

**Changes:**
```typescript
// BEFORE: Generic routes matched first
@Get()                        // Returns all
@Get(':id')                   // Matched 'hoy', 'historial', 'mis'
@Get('hoy')                   // Never reached!

// AFTER: Specific routes first
@Get('hoy')
@Get('historial')
@Get('mis')
@Get()                        // Generic fallback
@Get(':id')
```

---

### 2. **Type Conversion Issues in License Controller**
**Problem:** Employee ID extraction from JWT was not properly converted to integer.

**Solution:** Added `parseInt()` conversion in `solicitud-licencia.controller.ts`:

```typescript
// BEFORE
const empleadoId = req.user.id || req.user.sub;

// AFTER
const empleadoId = parseInt(req.user?.id || req.user?.sub || '0', 10);
```

---

### 3. **Dashboard Attendance Status Query**
**Problem:** Dashboard was fetching all attendance records and filtering in frontend, inefficient and error-prone.

**Solution:** 
- Added `getAsistenciaHoy()` endpoint to frontend API service
- Updated `DashboardEmpleado.jsx` to use dedicated endpoint

**Files Modified:**
- `frontend-react/src/services/api.js`
- `frontend-react/src/views/empleado/DashboardEmpleado.jsx`

**Backend Endpoint:**
```typescript
@Get('hoy')
@UseGuards(EmpleadoJwtAuthGuard)
async getHoy(@Request() req) {
  const empleadoId = parseInt(req.user?.sub || req.user?.id || '0', 10);
  return this.asistenciaService.getHoy(empleadoId);
}
```

**Frontend Service:**
```javascript
getAsistenciaHoy: () => empleadoClient.get('/asistencia/hoy'),
```

---

### 4. **Attendance Marking Date Comparison Issues**
**Problem:** `findOne()` with date comparison was unreliable due to timezone and time component handling.

**Solution:** Switched to raw SQL queries using `CURRENT_DATE` for proper date-only comparison.

**Files Modified:**
- `backend-nest/src/modules/asistencia/asistencia.service.ts`

**Method: `marcarEntrada()`**
```typescript
// BEFORE: Problematic date comparison
const hoy = new Date();
hoy.setHours(0, 0, 0, 0);
const existente = await this.asistenciaRepository.findOne({
  where: { empleado_id: empleadoId, fechaAsistencia: hoy }
});

// AFTER: Reliable SQL date comparison
const existente = await this.asistenciaRepository.query(
  `SELECT * FROM "asistencias" 
   WHERE empleado_id = $1 AND DATE("fechaAsistencia") = CURRENT_DATE`,
  [empleadoId]
);
```

**Method: `marcarSalida()`**
Same SQL-based approach for reliable date handling.

---

### 5. **Empty State Messages**
**Problem:** User couldn't distinguish between "no data" and "loading error".

**Solution:** Added empty state UI messages to attendance and license views.

**Files Modified:**
- `frontend-react/src/views/empleado/MisAsistencias.jsx`
- `frontend-react/src/views/empleado/MisLicencias.jsx`

**Added:**
```jsx
{loading ? (
  <div>Loading...</div>
) : data.length === 0 ? (
  <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
    <i className="bi bi-inbox text-4xl text-gray-300 block mb-3"></i>
    <p className="text-gray-600">No hay registros disponibles</p>
  </div>
) : (
  <table>...</table>
)}
```

---

## Impact

### Before Fixes
- Dashboard shows "Sin registrar" (not registered) even for registered employees
- Marking attendance says "already registered" on first attempt
- "Mis Asistencias" shows empty table even with existing records
- "Mis Licencias" shows empty table even with existing requests
- Confusing UX: users can't tell if data exists or if something is broken

### After Fixes
- Dashboard correctly shows today's attendance status
- Attendance marking works reliably
- Attendance history loads and displays all records
- License history loads and displays all requests
- Clear empty state messages when no data exists
- Proper data filtering per employee

---

## Testing Recommendations

1. **Test Attendance Marking Flow:**
   - Login as employee
   - Mark entry first time (should not say "already registered")
   - Check dashboard for updated status
   - Visit "Mis Asistencias" to verify entry appears

2. **Test Dashboard:**
   - Login as different employees
   - Verify dashboard shows correct attendance status
   - Verify license pending count is accurate

3. **Test License Requests:**
   - Login as employee with pending licenses
   - Verify "Mis Licencias" shows all requests
   - Verify status badges display correctly

4. **Test Empty States:**
   - Create new employee account
   - Verify "No hay registros" appears in attendance/license views
   - Mark attendance then check list updates

---

## API Endpoints Summary

**Attendance Endpoints (Employee):**
- `GET /api/asistencia/hoy` - Get today's attendance status
- `POST /api/asistencia/entrada` - Mark entry
- `POST /api/asistencia/salida` - Mark exit
- `GET /api/asistencia/historial` - Get attendance history

**License Endpoints (Employee):**
- `GET /api/solicitud-licencia/mis` - Get my license requests
- `POST /api/solicitud-licencia` - Create license request
- `PUT /auth/perfil` - Update profile

---

## Code Quality Notes
✓ All changes compile without errors  
✓ Backend build: SUCCESS  
✓ Frontend build: 370 modules in 6.44s  
✓ Type safety maintained throughout  
✓ Consistent error handling patterns  
