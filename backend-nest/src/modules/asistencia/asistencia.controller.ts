import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { AsistenciaService } from './asistencia.service';
import { CreateAsistenciaDto } from '../../dto/create-asistencia.dto';

@Controller('api/asistencia')
export class AsistenciaController {
  constructor(private asistenciaService: AsistenciaService) {}

  @Get()
  async findAll() {
    return this.asistenciaService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.asistenciaService.findById(Number(id));
  }

  @Get('empleado/:empleadoId')
  async findByEmpleado(
    @Param('empleadoId') empleadoId: string,
    @Query('fecha') fecha?: string,
  ) {
    return this.asistenciaService.findByEmpleado(Number(empleadoId), fecha ? new Date(fecha) : undefined);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createAsistenciaDto: CreateAsistenciaDto) {
    return this.asistenciaService.create(createAsistenciaDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateAsistenciaDto>,
  ) {
    return this.asistenciaService.update(Number(id), updateData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    return this.asistenciaService.delete(Number(id));
  }

  @Get('rango/:fechaInicio/:fechaFin')
  async findByFechaRango(
    @Param('fechaInicio') fechaInicio: string,
    @Param('fechaFin') fechaFin: string,
  ) {
    return this.asistenciaService.findByFechaRango(new Date(fechaInicio), new Date(fechaFin));
  }
}
