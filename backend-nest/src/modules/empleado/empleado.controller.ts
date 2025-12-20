import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth';
import { EmpleadoService } from './empleado.service';
import { CreateEmpleadoDto } from '../../dto/create-empleado.dto';

@Controller('api/empleado')
export class EmpleadoController {
  constructor(private empleadoService: EmpleadoService) {}

  @Get()
  async findAll() {
    return this.empleadoService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string) {
    return this.empleadoService.findById(Number(id));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createEmpleadoDto: CreateEmpleadoDto) {
    return this.empleadoService.create(createEmpleadoDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateEmpleadoDto>,
  ) {
    return this.empleadoService.update(Number(id), updateData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    return this.empleadoService.delete(Number(id));
  }

  @Get('dni/:dni')
  async findByDni(@Param('dni') dni: string) {
    return this.empleadoService.findByDni(dni);
  }

  @Get('departamento/:departamentoId')
  async findByDepartamento(@Param('departamentoId') departamentoId: string) {
    return this.empleadoService.findByDepartamento(Number(departamentoId));
  }
}
