import { Controller, Get, Post, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { NotificacionesService } from './notificaciones.service';

@ApiTags('Notificaciones')
@ApiBearerAuth()
@Controller('notificaciones')
@UseGuards(JwtAuthGuard)
export class NotificacionesController {
  constructor(private notificacionesService: NotificacionesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las notificaciones del usuario' })
  async obtenerNotificaciones(@Request() req) {
    return this.notificacionesService.obtenerNotificaciones(req.user.id);
  }

  @Get('no-leidas')
  @ApiOperation({ summary: 'Obtener notificaciones no leídas' })
  async obtenerNoLeidas(@Request() req) {
    return this.notificacionesService.obtenerNoLeidas(req.user.id);
  }

  @Get('contar-no-leidas')
  @ApiOperation({ summary: 'Contar notificaciones no leídas' })
  async contarNoLeidas(@Request() req) {
    const count = await this.notificacionesService.contarNoLeidas(req.user.id);
    return { count };
  }

  @Post(':id/marcar-como-leida')
  @ApiOperation({ summary: 'Marcar notificación como leída' })
  async marcarComoLeida(@Param('id') id: number) {
    await this.notificacionesService.marcarComoLeida(id);
    return { mensaje: 'Notificación marcada como leída' };
  }

  @Post('marcar-todas-como-leidas')
  @ApiOperation({ summary: 'Marcar todas las notificaciones como leídas' })
  async marcarTodasComoLeidas(@Request() req) {
    await this.notificacionesService.marcarTodasComoLeidas(req.user.id);
    return { mensaje: 'Todas las notificaciones marcadas como leídas' };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar notificación' })
  async eliminar(@Param('id') id: number) {
    await this.notificacionesService.eliminar(id);
    return { mensaje: 'Notificación eliminada' };
  }
}
