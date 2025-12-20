import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Empleado } from './empleado.entity';
import { TipoLicencia } from './tipoLicencia.entity';
import { Usuario } from './usuario.entity';

@Entity('solicitudes_licencia')
export class SolicitudLicencia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fechaInicio: Date;

  @Column({ type: 'date' })
  fechaFin: Date;

  @Column({ type: 'int', nullable: true })
  diasSolicitados: number;

  @Column({ type: 'text', nullable: true })
  razon: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  documentoAdjunto: string;

  @Column({ type: 'varchar', length: 50, default: 'PENDIENTE' })
  estado: string; // PENDIENTE, APROBADA, RECHAZADA, CANCELADA

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @Column({ type: 'boolean', default: true })
  afectaSaldo: boolean;

  @CreateDateColumn()
  fechaSolicitud: Date;

  @Column({ type: 'timestamp', nullable: true })
  fechaRespuesta: Date;

  @ManyToOne(() => Empleado, (empleado) => empleado.solicitudesLicencia)
  @JoinColumn({ name: 'empleado_id' })
  empleado: Empleado;

  @ManyToOne(() => TipoLicencia, (tipo) => tipo.solicitudes)
  @JoinColumn({ name: 'tipo_licencia_id' })
  tipoLicencia: TipoLicencia;

  @ManyToOne(() => Usuario, (usuario) => usuario.solicitudesAprobadas, { nullable: true })
  @JoinColumn({ name: 'usuario_aprobador_id' })
  usuarioAprobador: Usuario;
}
