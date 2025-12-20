import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { DepartamentoService } from './departamento.service';

@Controller('api/departamento')
export class DepartamentoController {
  constructor(private departamentoService: DepartamentoService) {}

  @Get()
  async findAll() {
    return this.departamentoService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.departamentoService.findById(Number(id));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: { nombre: string; descripcion?: string }) {
    return this.departamentoService.create(body.nombre, body.descripcion);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() body: { nombre?: string; descripcion?: string },
  ) {
    return this.departamentoService.update(Number(id), body.nombre, body.descripcion);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    return this.departamentoService.delete(Number(id));
  }
}
