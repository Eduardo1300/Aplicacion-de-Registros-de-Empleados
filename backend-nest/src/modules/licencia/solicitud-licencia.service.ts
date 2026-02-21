import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SolicitudLicencia } from '../../entities/solicitudLicencia.entity';

@Injectable()
export class SolicitudLicenciaService {
  constructor(
    @InjectRepository(SolicitudLicencia)
    private solicitudRepository: Repository<SolicitudLicencia>,
  ) {}

  async findAll(): Promise<SolicitudLicencia[]> {
    return this.solicitudRepository.find({
      relations: ['empleado', 'tipoLicencia', 'usuarioAprobador'],
    });
  }

  async findById(id: number): Promise<SolicitudLicencia> {
    const solicitud = await this.solicitudRepository.findOne({
      where: { id },
      relations: ['empleado', 'tipoLicencia', 'usuarioAprobador'],
    });
    if (!solicitud) throw new BadRequestException('Solicitud no encontrada');
    return solicitud;
  }

  async findByEmpleado(empleadoId: number): Promise<SolicitudLicencia[]> {
    return this.solicitudRepository.find({
      where: { empleado: { id: empleadoId } },
      relations: ['tipoLicencia', 'usuarioAprobador'],
      order: { fechaSolicitud: 'DESC' },
    });
  }

  async findByEstado(estado: string): Promise<SolicitudLicencia[]> {
    return this.solicitudRepository.find({
      where: { estado },
      relations: ['empleado', 'tipoLicencia'],
    });
  }

  async create(solicitudData: Partial<SolicitudLicencia> & { empleadoId?: number; tipoLicenciaId?: number }): Promise<SolicitudLicencia> {
    const solicitud = new SolicitudLicencia();
    solicitud.fechaInicio = solicitudData.fechaInicio as Date;
    solicitud.fechaFin = solicitudData.fechaFin as Date;
    solicitud.razon = (solicitudData.razon || solicitudData['razón'] || '') as string;
    solicitud.observaciones = solicitudData.observaciones as string;
    solicitud.afectaSaldo = solicitudData.afectaSaldo ?? true;
    solicitud.estado = 'PENDIENTE';
    
    if (solicitudData.empleado) {
      solicitud.empleado = typeof solicitudData.empleado === 'number' 
        ? { id: solicitudData.empleado } as any
        : solicitudData.empleado;
    } else if (solicitudData.empleadoId) {
      solicitud.empleado = { id: solicitudData.empleadoId } as any;
    }
    
    if (solicitudData.tipoLicencia) {
      solicitud.tipoLicencia = typeof solicitudData.tipoLicencia === 'number'
        ? { id: solicitudData.tipoLicencia } as any
        : solicitudData.tipoLicencia;
    } else if (solicitudData.tipoLicenciaId) {
      solicitud.tipoLicencia = { id: solicitudData.tipoLicenciaId } as any;
    }

    return this.solicitudRepository.save(solicitud);
  }

  async aprobar(id: number, usuarioAprobadorId: number, observaciones?: string): Promise<SolicitudLicencia> {
    const solicitud = await this.findById(id);
    solicitud.estado = 'APROBADA';
    solicitud.usuarioAprobador = { id: usuarioAprobadorId } as any;
    solicitud.fechaRespuesta = new Date();
    if (observaciones) solicitud.observaciones = observaciones;
    return this.solicitudRepository.save(solicitud);
  }

  async rechazar(id: number, usuarioAprobadorId: number, observaciones: string): Promise<SolicitudLicencia> {
    const solicitud = await this.findById(id);
    solicitud.estado = 'RECHAZADA';
    solicitud.usuarioAprobador = { id: usuarioAprobadorId } as any;
    solicitud.fechaRespuesta = new Date();
    solicitud.observaciones = observaciones;
    return this.solicitudRepository.save(solicitud);
  }

  async delete(id: number): Promise<void> {
    const solicitud = await this.findById(id);
    await this.solicitudRepository.remove(solicitud);
  }
}
