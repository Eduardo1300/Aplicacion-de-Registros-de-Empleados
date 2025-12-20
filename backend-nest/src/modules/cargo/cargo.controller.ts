import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth';
import { CargoService } from './cargo.service';

@Controller('api/cargo')
export class CargoController {
  constructor(private cargoService: CargoService) {}

  @Get()
  async findAll() {
    return this.cargoService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.cargoService.findById(Number(id));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: { nombre: string; descripcion?: string }) {
    return this.cargoService.create(body.nombre, body.descripcion);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() body: { nombre?: string; descripcion?: string },
  ) {
    return this.cargoService.update(Number(id), body.nombre, body.descripcion);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    return this.cargoService.delete(Number(id));
  }
}
