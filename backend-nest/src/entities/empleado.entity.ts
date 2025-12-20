import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Departamento } from './departamento.entity';
import { Cargo } from './cargo.entity';
import { Usuario } from './usuario.entity';
import { Asistencia } from './asistencia.entity';
import { SolicitudLicencia } from './solicitudLicencia.entity';
import { SaldoLicencia } from './saldoLicencia.entity';

@Entity('empleados')
export class Empleado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 255 })
  apellido: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  dni: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  correo: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono: string;

  @Column({ type: 'date' })
  fechaIngreso: Date;

  @Column({ type: 'varchar', length: 50, default: 'Activo' })
  estado: string;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;

  @ManyToOne(() => Departamento, (departamento) => departamento.empleados, { nullable: true, eager: true })
  @JoinColumn({ name: 'departamento_id' })
  departamento: Departamento;

  @ManyToOne(() => Cargo, (cargo) => cargo.empleados, { nullable: true, eager: true })
  @JoinColumn({ name: 'cargo_id' })
  cargo: Cargo;

  @OneToOne(() => Usuario, (usuario) => usuario.empleado, { nullable: true })
  usuario: Usuario;

  @OneToMany(() => Asistencia, (asistencia) => asistencia.empleado)
  asistencias: Asistencia[];

  @OneToMany(() => SolicitudLicencia, (solicitud) => solicitud.empleado)
  solicitudesLicencia: SolicitudLicencia[];

  @OneToMany(() => SaldoLicencia, (saldo) => saldo.empleado)
  saldosLicencia: SaldoLicencia[];
}
