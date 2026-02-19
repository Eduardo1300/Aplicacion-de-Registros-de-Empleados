import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Empleado } from './empleado.entity';

export enum EstadoAsistencia {
  PRESENTE = 'PRESENTE',
  TARDANZA = 'TARDANZA',
  AUSENTE = 'AUSENTE',
}

@Entity('asistencias')
export class Asistencia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fechaAsistencia: Date;

  @Column({ type: 'time', nullable: true, name: 'hora_entrada' })
  hora_entrada: string;

  @Column({ type: 'time', nullable: true, name: 'hora_salida' })
  hora_salida: string;

  @Column({ type: 'enum', enum: EstadoAsistencia })
  estado: EstadoAsistencia;

  @Column({ type: 'int', nullable: true })
  minutosTardanza: number;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @CreateDateColumn()
  fechaCreacion: Date;

  @Column({ type: 'int', nullable: true })
  empleado_id: number;

  @ManyToOne(() => Empleado, (empleado) => empleado.asistencias)
  @JoinColumn({ name: 'empleado_id' })
  empleado: Empleado;
}
