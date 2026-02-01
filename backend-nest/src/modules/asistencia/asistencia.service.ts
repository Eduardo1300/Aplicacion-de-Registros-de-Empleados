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

  // Métodos para empleados
  async getHoy(empleadoId: number) {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const mañana = new Date(hoy);
    mañana.setDate(mañana.getDate() + 1);

    const asistencia = await this.asistenciaRepository.findOne({
      where: {
        empleado: { id: empleadoId },
        fechaAsistencia: hoy,
      },
    });

    return asistencia || null;
  }

  async marcarEntrada(empleadoId: number) {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const existente = await this.asistenciaRepository.findOne({
      where: {
        empleado: { id: empleadoId },
        fechaAsistencia: hoy,
      },
    });

    if (existente?.horaEntrada) {
      throw new BadRequestException('Ya registraste la entrada hoy');
    }

    const ahora = new Date().toTimeString().split(' ')[0].substring(0, 8);

    if (existente) {
      existente.horaEntrada = ahora;
      return this.asistenciaRepository.save(existente);
    }

    const nueva = this.asistenciaRepository.create({
      empleado: { id: empleadoId },
      fechaAsistencia: hoy,
      horaEntrada: ahora,
      estado: ahora > '08:15:00' ? EstadoAsistencia.TARDANZA : EstadoAsistencia.PRESENTE,
    });

    return this.asistenciaRepository.save(nueva);
  }

  async marcarSalida(empleadoId: number) {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const asistencia = await this.asistenciaRepository.findOne({
      where: {
        empleado: { id: empleadoId },
        fechaAsistencia: hoy,
      },
    });

    if (!asistencia) {
      throw new BadRequestException('No has registrado la entrada hoy');
    }

    if (asistencia.horaSalida) {
      throw new BadRequestException('Ya registraste la salida hoy');
    }

    const ahora = new Date().toTimeString().split(' ')[0].substring(0, 8);
    asistencia.horaSalida = ahora;

    return this.asistenciaRepository.save(asistencia);
  }

  async getHistorial(empleadoId: number, mes?: number, año?: number) {
    const query = this.asistenciaRepository.createQueryBuilder('a')
      .where('a.empleado_id = :empleadoId', { empleadoId })
      .orderBy('a.fechaAsistencia', 'DESC');

    if (mes && año) {
      query.andWhere('EXTRACT(MONTH FROM a.fechaAsistencia) = :mes', { mes })
        .andWhere('EXTRACT(YEAR FROM a.fechaAsistencia) = :año', { año });
    }

    return query.getMany();
  }
}
