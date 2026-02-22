import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empleado } from '../../entities/empleado.entity';
import { CreateEmpleadoDto } from '../../dto/create-empleado.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmpleadoService {
  constructor(
    @InjectRepository(Empleado)
    private empleadoRepository: Repository<Empleado>,
  ) {}

  async findAll(): Promise<Empleado[]> {
    return this.empleadoRepository.find({
      relations: ['departamento', 'cargo', 'usuario'],
    });
  }

  async findById(id: number): Promise<Empleado | null> {
    const empleado = await this.empleadoRepository.findOne({
      where: { id },
      relations: ['departamento', 'cargo', 'usuario'],
    });

    if (!empleado) {
      throw new BadRequestException('Empleado no encontrado');
    }

    return empleado;
  }

  async create(createEmpleadoDto: CreateEmpleadoDto): Promise<Empleado> {
    const existingEmpleado = await this.empleadoRepository.findOne({
      where: { dni: createEmpleadoDto.dni },
    });

    if (existingEmpleado) {
      throw new BadRequestException('DNI ya existe');
    }

    const empleadoData: any = {
      ...createEmpleadoDto,
      estado: createEmpleadoDto.estado || 'Activo',
    };

    if (createEmpleadoDto.password) {
      empleadoData.password_hash = await bcrypt.hash(createEmpleadoDto.password, 10);
    }

    const empleado = this.empleadoRepository.create(empleadoData);
    return (await this.empleadoRepository.save(empleado)) as unknown as Empleado;
  }

  async update(id: number, updateData: Partial<Empleado> & { password?: string }): Promise<Empleado | null> {
    const empleado = await this.findById(id);
    if (!empleado) return null;
    
    const dataToUpdate = updateData as any;
    
    if (dataToUpdate.password) {
      dataToUpdate.password_hash = await bcrypt.hash(dataToUpdate.password, 10);
      delete dataToUpdate.password;
    }
    
    Object.assign(empleado, dataToUpdate);
    return (await this.empleadoRepository.save(empleado)) as unknown as Empleado;
  }

  async delete(id: number): Promise<void> {
    const empleado = await this.findById(id);
    if (empleado) {
      empleado.estado = 'Inactivo';
      await this.empleadoRepository.save(empleado);
    }
  }

  async findByDni(dni: string): Promise<Empleado | null> {
    return this.empleadoRepository.findOne({
      where: { dni },
      relations: ['departamento', 'cargo'],
    });
  }

  async findByDepartamento(departamentoId: number): Promise<Empleado[]> {
    return this.empleadoRepository.find({
      where: { departamento: { id: departamentoId } },
      relations: ['departamento', 'cargo'],
    });
  }
}
