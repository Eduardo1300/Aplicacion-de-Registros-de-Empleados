import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoLicencia } from '../../entities/tipoLicencia.entity';

@Injectable()
export class TipoLicenciaService {
  constructor(
    @InjectRepository(TipoLicencia)
    private tipoLicenciaRepository: Repository<TipoLicencia>,
  ) {}

  async findAll(): Promise<TipoLicencia[]> {
    return this.tipoLicenciaRepository.find();
  }

  async findById(id: number): Promise<TipoLicencia> {
    const tipo = await this.tipoLicenciaRepository.findOne({ where: { id } });
    if (!tipo) throw new BadRequestException('Tipo de licencia no encontrado');
    return tipo;
  }

  async create(nombre: string, descripcion?: string, diasAnuales?: number, remunerada?: boolean): Promise<TipoLicencia> {
    const tipo = this.tipoLicenciaRepository.create({
      nombre,
      descripcion,
      diasAnuales: diasAnuales || 0,
      remunerada: remunerada ?? true,
    });
    return this.tipoLicenciaRepository.save(tipo);
  }

  async update(id: number, updateData: Partial<TipoLicencia>): Promise<TipoLicencia | null> {
    const tipo = await this.findById(id);
    if (!tipo) return null;
    
    Object.assign(tipo, updateData);
    return this.tipoLicenciaRepository.save(tipo);
  }

  async delete(id: number): Promise<void> {
    const tipo = await this.findById(id);
    await this.tipoLicenciaRepository.remove(tipo);
  }
}
