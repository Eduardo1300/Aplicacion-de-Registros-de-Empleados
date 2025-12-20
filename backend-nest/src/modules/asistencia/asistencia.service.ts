import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asistencia, EstadoAsistencia } from '../../entities/asistencia.entity';
import { CreateAsistenciaDto } from '../../dto/create-asistencia.dto';

@Injectable()
export class AsistenciaService {
  constructor(
    @InjectRepository(Asistencia)
    private asistenciaRepository: Repository<Asistencia>,
  ) {}

  async findAll(): Promise<Asistencia[]> {
    return this.asistenciaRepository.find({
      relations: ['empleado'],
    });
  }

  async findById(id: number): Promise<Asistencia | null> {
    const asistencia = await this.asistenciaRepository.findOne({
      where: { id },
      relations: ['empleado'],
    });

    if (!asistencia) {
      throw new BadRequestException('Asistencia no encontrada');
    }

    return asistencia;
  }

  async findByEmpleado(empleadoId: number, fecha?: Date): Promise<Asistencia[]> {
    const query = this.asistenciaRepository.createQueryBuilder('a')
      .where('a.empleado_id = :empleadoId', { empleadoId })
      .orderBy('a.fechaAsistencia', 'DESC');

    if (fecha) {
      query.andWhere('DATE(a.fechaAsistencia) = :fecha', { fecha });
    }

    return query.getMany();
  }

  async create(createAsistenciaDto: CreateAsistenciaDto): Promise<Asistencia> {
    const asistencia = this.asistenciaRepository.create(createAsistenciaDto);
    return this.asistenciaRepository.save(asistencia);
  }

  async update(id: number, updateData: Partial<Asistencia>): Promise<Asistencia | null> {
    const asistencia = await this.findById(id);
    if (!asistencia) return null;
    
    Object.assign(asistencia, updateData);
    return this.asistenciaRepository.save(asistencia);
  }

  async delete(id: number): Promise<void> {
    const asistencia = await this.findById(id);
    if (asistencia) {
      await this.asistenciaRepository.remove(asistencia);
    }
  }

  async findByFechaRango(fechaInicio: Date, fechaFin: Date): Promise<Asistencia[]> {
    return this.asistenciaRepository
      .createQueryBuilder('a')
      .where('a.fechaAsistencia >= :fechaInicio', { fechaInicio })
      .andWhere('a.fechaAsistencia <= :fechaFin', { fechaFin })
      .leftJoinAndSelect('a.empleado', 'empleado')
      .getMany();
  }
}
