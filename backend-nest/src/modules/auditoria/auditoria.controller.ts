import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('api/auditoria')
export class AuditoriaController {
  private auditLogs = [
    { id: 1, fecha: new Date('2026-02-21T08:30:00'), usuario: 'admin', accion: 'CREATE', entidad: 'empleados', detalles: 'Nuevo empleado registrado: Juan Pérez' },
    { id: 2, fecha: new Date('2026-02-21T09:15:00'), usuario: 'admin', accion: 'UPDATE', entidad: 'asistencias', detalles: 'Asistencia marcada: Juan Pérez - PRESENTE' },
    { id: 3, fecha: new Date('2026-02-21T10:00:00'), usuario: 'admin', accion: 'CREATE', entidad: 'licencias', detalles: 'Solicitud de licencia: María López' },
    { id: 4, fecha: new Date('2026-02-21T11:30:00'), usuario: 'admin', accion: 'UPDATE', entidad: 'empleados', detalles: 'Datos actualizados: Carlos Rodríguez' },
    { id: 5, fecha: new Date('2026-02-21T12:00:00'), usuario: 'admin', accion: 'DELETE', entidad: 'asistencias', detalles: 'Asistencia eliminada: ID #45' },
    { id: 6, fecha: new Date('2026-02-20T08:00:00'), usuario: 'admin', accion: 'CREATE', entidad: 'empleados', detalles: 'Nuevo empleado: Ana González' },
    { id: 7, fecha: new Date('2026-02-20T09:30:00'), usuario: 'admin', accion: 'UPDATE', entidad: 'licencias', detalles: 'Licencia aprobada: Roberto Martínez' },
    { id: 8, fecha: new Date('2026-02-20T10:45:00'), usuario: 'admin', accion: 'CREATE', entidad: 'departamentos', detalles: 'Nuevo departamento: Marketing' },
    { id: 9, fecha: new Date('2026-02-20T11:15:00'), usuario: 'admin', accion: 'UPDATE', entidad: 'usuarios', detalles: 'Password actualizado: admin' },
    { id: 10, fecha: new Date('2026-02-20T14:00:00'), usuario: 'admin', accion: 'DELETE', entidad: 'empleados', detalles: 'Empleado inactivado: Laura Sánchez' },
    { id: 11, fecha: new Date('2026-02-19T08:30:00'), usuario: 'admin', accion: 'CREATE', entidad: 'asistencias', detalles: 'Asistencia masiva importada: 23 registros' },
    { id: 12, fecha: new Date('2026-02-19T09:00:00'), usuario: 'admin', accion: 'UPDATE', entidad: 'cargos', detalles: 'Nuevo cargo creado: Director de Sistemas' },
    { id: 13, fecha: new Date('2026-02-19T10:30:00'), usuario: 'admin', accion: 'CREATE', entidad: 'licencias', detalles: 'Solicitud: David Flores - Vacaciones' },
    { id: 14, fecha: new Date('2026-02-19T11:00:00'), usuario: 'admin', accion: 'UPDATE', entidad: 'empleados', detalles: 'Cambio de departamento: Elena Hernández' },
    { id: 15, fecha: new Date('2026-02-19T15:00:00'), usuario: 'admin', accion: 'DELETE', entidad: 'asistencias', detalles: 'Registro eliminado: Francisco Moreno' },
    { id: 16, fecha: new Date('2026-02-18T08:00:00'), usuario: 'admin', accion: 'CREATE', entidad: 'empleados', detalles: 'Nuevo empleado: Sofia Ramírez' },
    { id: 17, fecha: new Date('2026-02-18T09:15:00'), usuario: 'admin', accion: 'CREATE', entidad: 'empleados', detalles: 'Nuevo empleado: Miguel Torres' },
    { id: 18, fecha: new Date('2026-02-18T10:30:00'), usuario: 'admin', accion: 'UPDATE', entidad: 'licencias', detalles: 'Licencia rechazada: Carmen Vega' },
    { id: 19, fecha: new Date('2026-02-18T11:45:00'), usuario: 'admin', accion: 'CREATE', entidad: 'auditoria', detalles: 'Reporte exportado: PDF' },
    { id: 20, fecha: new Date('2026-02-18T14:00:00'), usuario: 'admin', accion: 'DELETE', entidad: 'usuarios', detalles: 'Usuario desactivado: test_user' },
    { id: 21, fecha: new Date('2026-02-17T08:30:00'), usuario: 'admin', accion: 'CREATE', entidad: 'asistencias', detalles: 'Registro manual: Luis Mendoza' },
    { id: 22, fecha: new Date('2026-02-17T09:00:00'), usuario: 'admin', accion: 'UPDATE', entidad: 'empleados', detalles: 'Datos personales actualizados: Patricia Luna' },
    { id: 23, fecha: new Date('2026-02-17T10:15:00'), usuario: 'admin', accion: 'CREATE', entidad: 'licencias', detalles: 'Solicitud: Jorge Reyes - Médico' },
    { id: 24, fecha: new Date('2026-02-17T11:30:00'), usuario: 'admin', accion: 'UPDATE', entidad: 'departamentos', detalles: 'Descripción actualizada: RRHH' },
    { id: 25, fecha: new Date('2026-02-17T12:00:00'), usuario: 'admin', accion: 'DELETE', entidad: 'asistencias', detalles: 'Asistencia duplicada eliminada' },
  ];

  @Get()
  @UseGuards(JwtAuthGuard)
  getAuditoria(@Query('entity') entity?: string) {
    if (entity) {
      return this.auditLogs.filter(log => log.entidad === entity);
    }
    return this.auditLogs;
  }
}
