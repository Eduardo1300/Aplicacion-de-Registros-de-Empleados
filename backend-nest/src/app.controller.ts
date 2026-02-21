import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empleado } from './entities/empleado.entity';
import { Asistencia, EstadoAsistencia } from './entities/asistencia.entity';
import { SolicitudLicencia } from './entities/solicitudLicencia.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(Empleado)
    private empleadoRepository: Repository<Empleado>,
    @InjectRepository(Asistencia)
    private asistenciaRepository: Repository<Asistencia>,
    @InjectRepository(SolicitudLicencia)
    private licenciaRepository: Repository<SolicitudLicencia>,
  ) {}

  @Get()
  getHello() {
    return 'Sistema de Registro de Empleados API';
  }

  @Get('api/estadisticas')
  async getEstadisticas() {
    const today = new Date().toISOString().split('T')[0]
    
    const totalEmpleados = await this.empleadoRepository.count()
    const empleadosActivos = await this.empleadoRepository.count({ where: { estado: 'Activo' } })
    const empleadosInactivos = await this.empleadoRepository.count({ where: { estado: 'Inactivo' } })
    
    const presenteHoy = await this.asistenciaRepository.count({ 
      where: { fechaAsistencia: new Date(today), estado: EstadoAsistencia.PRESENTE } 
    })
    const ausenteHoy = await this.asistenciaRepository.count({ 
      where: { fechaAsistencia: new Date(today), estado: EstadoAsistencia.AUSENTE } 
    })
    const conPermiso = await this.asistenciaRepository.count({ 
      where: { fechaAsistencia: new Date(today), estado: EstadoAsistencia.TARDANZA } 
    })
    
    const licenciasPendientes = await this.licenciaRepository.count({ where: { estado: 'Pendiente' } })
    const licenciasAprobadas = await this.licenciaRepository.count({ where: { estado: 'Aprobada' } })
    const licenciasRechazadas = await this.licenciaRepository.count({ where: { estado: 'Rechazada' } })

    const porcentajeAsistencia = totalEmpleados > 0 
      ? Math.round((presenteHoy / totalEmpleados) * 100) 
      : 0

    return {
      empleados: {
        total: totalEmpleados,
        activos: empleadosActivos,
        inactivos: empleadosInactivos
      },
      asistencias: {
        presente: presenteHoy,
        ausente: ausenteHoy,
        conPermiso: conPermiso,
        porcentajeAsistencia
      },
      licencias: {
        pendiente: licenciasPendientes,
        aprobada: licenciasAprobadas,
        rechazada: licenciasRechazadas
      }
    }
  }
}
