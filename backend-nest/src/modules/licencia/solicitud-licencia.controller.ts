import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { SolicitudLicenciaService } from './solicitud-licencia.service';

@Controller('api/solicitud-licencia')
export class SolicitudLicenciaController {
  constructor(private solicitudService: SolicitudLicenciaService) {}

  @Get()
  async findAll() {
    return this.solicitudService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.solicitudService.findById(Number(id));
  }

  @Get('empleado/:empleadoId')
  async findByEmpleado(@Param('empleadoId') empleadoId: string) {
    return this.solicitudService.findByEmpleado(Number(empleadoId));
  }

  @Get('estado/:estado')
  async findByEstado(@Param('estado') estado: string) {
    return this.solicitudService.findByEstado(estado);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() solicitudData: any) {
    return this.solicitudService.create(solicitudData);
  }

  @Post(':id/aprobar')
  @UseGuards(JwtAuthGuard)
  async aprobar(
    @Param('id') id: string,
    @Body() body: { usuarioAprobadorId: number; observaciones?: string },
  ) {
    return this.solicitudService.aprobar(Number(id), body.usuarioAprobadorId, body.observaciones);
  }

  @Post(':id/rechazar')
  @UseGuards(JwtAuthGuard)
  async rechazar(
    @Param('id') id: string,
    @Body() body: { usuarioAprobadorId: number; observaciones: string },
  ) {
    return this.solicitudService.rechazar(Number(id), body.usuarioAprobadorId, body.observaciones);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    return this.solicitudService.delete(Number(id));
  }
}
