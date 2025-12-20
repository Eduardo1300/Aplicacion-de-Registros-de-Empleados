import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Rol } from './rol.entity';
import { Empleado } from './empleado.entity';
import { SolicitudLicencia } from './solicitudLicencia.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  nombreUsuario: string;

  @Column({ type: 'varchar', length: 255 })
  clave: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;

  @ManyToOne(() => Rol, (rol) => rol.usuarios, { eager: true })
  @JoinColumn({ name: 'rol_id' })
  rol: Rol;

  @OneToOne(() => Empleado, (empleado) => empleado.usuario, { nullable: true })
  @JoinColumn({ name: 'empleado_id' })
  empleado: Empleado;

  @OneToMany(() => SolicitudLicencia, (solicitud) => solicitud.usuarioAprobador)
  solicitudesAprobadas: SolicitudLicencia[];
}
