import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cargo } from '../../entities/cargo.entity';

@Injectable()
export class CargoService {
  constructor(
    @InjectRepository(Cargo)
    private cargoRepository: Repository<Cargo>,
  ) {}

  async findAll(): Promise<Cargo[]> {
    return this.cargoRepository.find();
  }

  async findById(id: number): Promise<Cargo | null> {
    const cargo = await this.cargoRepository.findOne({ where: { id } });
    if (!cargo) throw new BadRequestException('Cargo no encontrado');
    return cargo;
  }

  async create(nombre: string, descripcion?: string): Promise<Cargo> {
    const cargo = this.cargoRepository.create({ nombre, descripcion });
    return this.cargoRepository.save(cargo);
  }

  async update(id: number, nombre?: string, descripcion?: string): Promise<Cargo | null> {
    const cargo = await this.findById(id);
    if (!cargo) return null;
    
    if (nombre) cargo.nombre = nombre;
    if (descripcion) cargo.descripcion = descripcion;
    return this.cargoRepository.save(cargo);
  }

  async delete(id: number): Promise<void> {
    const cargo = await this.findById(id);
    if (cargo) {
      await this.cargoRepository.remove(cargo);
    }
  }
}
