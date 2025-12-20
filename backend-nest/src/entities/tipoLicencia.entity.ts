import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { SolicitudLicencia } from './solicitudLicencia.entity';
import { SaldoLicencia } from './saldoLicencia.entity';

@Entity('tipos_licencia')
export class TipoLicencia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'int', default: 0 })
  diasAnuales: number;

  @Column({ type: 'boolean', default: true })
  remunerada: boolean;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;

  @OneToMany(() => SolicitudLicencia, (solicitud) => solicitud.tipoLicencia)
  solicitudes: SolicitudLicencia[];

  @OneToMany(() => SaldoLicencia, (saldo) => saldo.tipoLicencia)
  saldos: SaldoLicencia[];
}
