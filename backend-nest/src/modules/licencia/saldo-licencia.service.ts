import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaldoLicencia } from '../../entities/saldoLicencia.entity';

@Injectable()
export class SaldoLicenciaService {
  constructor(
    @InjectRepository(SaldoLicencia)
    private saldoRepository: Repository<SaldoLicencia>,
  ) {}

  async findByEmpleadoAndAnio(empleadoId: number, anio: number): Promise<SaldoLicencia[]> {
    return this.saldoRepository.find({
      where: { empleado: { id: empleadoId }, anio },
      relations: ['tipoLicencia'],
    });
  }

  async findById(id: number): Promise<SaldoLicencia> {
    const saldo = await this.saldoRepository.findOne({
      where: { id },
      relations: ['empleado', 'tipoLicencia'],
    });
    if (!saldo) throw new BadRequestException('Saldo no encontrado');
    return saldo;
  }

  async create(empleadoId: number, tipoLicenciaId: number, diasDisponibles: number, anio: number): Promise<SaldoLicencia> {
    const saldo = this.saldoRepository.create({
      empleado: { id: empleadoId },
      tipoLicencia: { id: tipoLicenciaId },
      diasDisponibles,
      anio,
      diasUsados: 0,
    });
    return this.saldoRepository.save(saldo);
  }

  async deducirDias(id: number, dias: number): Promise<SaldoLicencia> {
    const saldo = await this.findById(id);
    if (saldo.diasDisponibles < dias) {
      throw new BadRequestException('Días insuficientes');
    }
    saldo.diasDisponibles -= dias;
    saldo.diasUsados += dias;
    return this.saldoRepository.save(saldo);
  }

  async agregarDias(id: number, dias: number): Promise<SaldoLicencia> {
    const saldo = await this.findById(id);
    saldo.diasDisponibles += dias;
    return this.saldoRepository.save(saldo);
  }
}
