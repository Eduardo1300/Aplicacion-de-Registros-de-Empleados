import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notificacion } from '../../entities/notificacion.entity';

@Injectable()
export class NotificacionesService {
  constructor(
    @InjectRepository(Notificacion)
    private notificacionRepository: Repository<Notificacion>,
  ) {}

  async crearNotificacion(
    usuarioId: number,
    tipo: string,
    titulo: string,
    mensaje: string,
    enlace?: string,
  ): Promise<Notificacion> {
    const notificacion = this.notificacionRepository.create({
      usuarioId,
      tipo,
      titulo,
      mensaje,
      enlace,
      estado: 'no_leido',
    });

    return this.notificacionRepository.save(notificacion);
  }

  async obtenerNotificaciones(usuarioId: number): Promise<Notificacion[]> {
    return this.notificacionRepository.find({
      where: { usuarioId },
      order: { fechaCreacion: 'DESC' },
    });
  }

  async obtenerNoLeidas(usuarioId: number): Promise<Notificacion[]> {
    return this.notificacionRepository.find({
      where: { usuarioId, estado: 'no_leido' },
      order: { fechaCreacion: 'DESC' },
    });
  }

  async marcarComoLeida(id: number): Promise<void> {
    await this.notificacionRepository.update(id, {
      estado: 'leido',
      fechaLectura: new Date(),
    });
  }

  async marcarTodasComoLeidas(usuarioId: number): Promise<void> {
    await this.notificacionRepository.update(
      { usuarioId, estado: 'no_leido' },
      {
        estado: 'leido',
        fechaLectura: new Date(),
      },
    );
  }

  async eliminar(id: number): Promise<void> {
    await this.notificacionRepository.delete(id);
  }

  async contarNoLeidas(usuarioId: number): Promise<number> {
    return this.notificacionRepository.count({
      where: { usuarioId, estado: 'no_leido' },
    });
  }
}
