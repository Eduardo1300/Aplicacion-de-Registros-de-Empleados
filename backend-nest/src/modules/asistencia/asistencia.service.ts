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
    const asistencia = new Asistencia();
    asistencia.empleado_id = createAsistenciaDto.empleadoId;
    asistencia.fechaAsistencia = createAsistenciaDto.fechaAsistencia;
    asistencia.hora_entrada = (createAsistenciaDto.horaEntrada || createAsistenciaDto.hora_entrada) as string;
    asistencia.hora_salida = (createAsistenciaDto.horaSalida || createAsistenciaDto.hora_salida) as string;
    asistencia.estado = createAsistenciaDto.estado;
    asistencia.minutosTardanza = createAsistenciaDto.minutosTardanza as number;
    asistencia.observaciones = createAsistenciaDto.observaciones as string;
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
    try {
      const result = await this.asistenciaRepository.query(
        `SELECT * FROM "asistencias" WHERE empleado_id = $1 AND DATE("fechaAsistencia") = CURRENT_DATE`,
        [empleadoId]
      );
      return result.length > 0 ? result[0] : null;
    } catch (error) {
      console.error('Error en getHoy:', error);
      return null;
    }
  }

  async marcarEntrada(empleadoId: number) {
    const ahora = new Date().toTimeString().split(' ')[0].substring(0, 8);
    
    // Verificar si ya existe registro de hoy
    const existente = await this.asistenciaRepository.query(
      `SELECT * FROM "asistencias" WHERE empleado_id = $1 AND DATE("fechaAsistencia") = CURRENT_DATE`,
      [empleadoId]
    );

    if (existente.length > 0 && existente[0].hora_entrada) {
      throw new BadRequestException('Ya registraste la entrada hoy');
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (existente.length > 0) {
      // Actualizar el registro existente
      await this.asistenciaRepository.update(
        existente[0].id,
        { hora_entrada: ahora }
      );
      return this.asistenciaRepository.findOne({
        where: { id: existente[0].id }
      });
    }

    // Crear nuevo registro
    const nueva = this.asistenciaRepository.create({
      empleado_id: empleadoId,
      fechaAsistencia: hoy,
      hora_entrada: ahora,
      estado: ahora > '08:15:00' ? EstadoAsistencia.TARDANZA : EstadoAsistencia.PRESENTE,
    });

    return this.asistenciaRepository.save(nueva);
  }

  async marcarSalida(empleadoId: number) {
    const ahora = new Date().toTimeString().split(' ')[0].substring(0, 8);
    
    // Verificar si existe registro de hoy
    const existente = await this.asistenciaRepository.query(
      `SELECT * FROM "asistencias" WHERE empleado_id = $1 AND DATE("fechaAsistencia") = CURRENT_DATE`,
      [empleadoId]
    );

    if (existente.length === 0) {
      throw new BadRequestException('No has registrado la entrada hoy');
    }

    if (existente[0].hora_salida) {
      throw new BadRequestException('Ya registraste la salida hoy');
    }

    // Actualizar registro con hora de salida
    await this.asistenciaRepository.update(
      existente[0].id,
      { hora_salida: ahora }
    );

    return this.asistenciaRepository.findOne({
      where: { id: existente[0].id }
    });
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
