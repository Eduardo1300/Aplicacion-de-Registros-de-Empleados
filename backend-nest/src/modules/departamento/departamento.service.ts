import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Departamento } from '../../entities/departamento.entity';

@Injectable()
export class DepartamentoService {
  constructor(
    @InjectRepository(Departamento)
    private departamentoRepository: Repository<Departamento>,
  ) {}

  async findAll(): Promise<Departamento[]> {
    return this.departamentoRepository.find({ relations: ['empleados'] });
  }

  async findById(id: number): Promise<Departamento | null> {
    const departamento = await this.departamentoRepository.findOne({
      where: { id },
      relations: ['empleados'],
    });
    if (!departamento) throw new BadRequestException('Departamento no encontrado');
    return departamento;
  }

  async create(nombre: string, descripcion?: string): Promise<Departamento> {
    const departamento = this.departamentoRepository.create({ nombre, descripcion });
    return this.departamentoRepository.save(departamento);
  }

  async update(id: number, nombre?: string, descripcion?: string): Promise<Departamento | null> {
    const departamento = await this.findById(id);
    if (!departamento) return null;
    
    if (nombre) departamento.nombre = nombre;
    if (descripcion) departamento.descripcion = descripcion;
    return this.departamentoRepository.save(departamento);
  }

  async delete(id: number): Promise<void> {
    const departamento = await this.findById(id);
    if (departamento) {
      await this.departamentoRepository.remove(departamento);
    }
  }
}
