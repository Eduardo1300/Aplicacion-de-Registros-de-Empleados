import { EstadoAsistencia } from '../entities/asistencia.entity';

export class CreateAsistenciaDto {
  empleadoId: number;
  fechaAsistencia: Date;
  horaEntrada?: string;
  horaSalida?: string;
  estado: EstadoAsistencia;
  minutosTardanza?: number;
  observaciones?: string;
}
