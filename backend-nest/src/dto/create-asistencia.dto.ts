import { EstadoAsistencia } from '../entities/asistencia.entity';

export class CreateAsistenciaDto {
  empleadoId: number;
  fechaAsistencia: Date;
  horaEntrada?: string;
  horaSalida?: string;
  hora_entrada?: string;
  hora_salida?: string;
  estado: EstadoAsistencia;
  minutosTardanza?: number;
  observaciones?: string;
}
