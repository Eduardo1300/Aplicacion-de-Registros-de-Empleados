import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Empleado } from './empleado.entity';
import { TipoLicencia } from './tipoLicencia.entity';

@Entity('saldos_licencia')
export class SaldoLicencia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  diasDisponibles: number;

  @Column({ type: 'int', default: 0 })
  diasUsados: number;

  @Column({ type: 'int' })
  anio: number;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;

  @ManyToOne(() => Empleado, (empleado) => empleado.saldosLicencia)
  @JoinColumn({ name: 'empleado_id' })
  empleado: Empleado;

  @ManyToOne(() => TipoLicencia, (tipo) => tipo.saldos)
  @JoinColumn({ name: 'tipo_licencia_id' })
  tipoLicencia: TipoLicencia;
}
