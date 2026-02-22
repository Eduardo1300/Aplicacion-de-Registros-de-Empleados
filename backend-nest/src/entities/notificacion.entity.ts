import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('notificaciones')
export class Notificacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuarioId: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuarioId' })
  usuario: Usuario;

  @Column({ length: 100 })
  tipo: string; // 'licencia', 'asistencia', 'general'

  @Column({ length: 255 })
  titulo: string;

  @Column('text')
  mensaje: string;

  @Column({ length: 50, default: 'no_leido' })
  estado: 'leido' | 'no_leido'; // 'leido', 'no_leido'

  @Column({ nullable: true })
  enlace: string; // URL del recurso relacionado

  @CreateDateColumn()
  fechaCreacion: Date;

  @Column({ type: 'timestamp', nullable: true })
  fechaLectura: Date;
}
