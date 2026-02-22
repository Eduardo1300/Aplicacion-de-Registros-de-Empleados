import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TipoLicenciaService } from './tipo-licencia.service';

@Controller('api/tipos-licencia')
export class TipoLicenciaController {
  constructor(private readonly tipoLicenciaService: TipoLicenciaService) {}

  @Get()
  findAll() {
    return this.tipoLicenciaService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.tipoLicenciaService.findById(+id);
  }

  @Post()
  create(@Body() body: { nombre: string; descripcion?: string; diasAnuales?: number; remunerada?: boolean }) {
    return this.tipoLicenciaService.create(body.nombre, body.descripcion, body.diasAnuales, body.remunerada);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: { nombre?: string; descripcion?: string; diasAnuales?: number; remunerada?: boolean }) {
    return this.tipoLicenciaService.update(+id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tipoLicenciaService.delete(+id);
  }
}
