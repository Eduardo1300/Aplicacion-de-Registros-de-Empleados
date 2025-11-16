import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TurnoService, Turno } from '../../services/turno.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-horarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {
  turnos: Turno[] = [];
  nuevoTurno: Turno = {
    nombre: '',
    horaInicio: '08:00',
    horaFin: '17:00',
    descansoInicio: '12:00',
    descansoFin: '13:00',
    horasTrabajo: 8,
    activo: true
  };

  mostrarFormulario = false;
  cargando = false;
  editandoId: number | null = null;

  constructor(
    private turnoService: TurnoService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.cargarTurnos();
  }

  cargarTurnos(): void {
    this.cargando = true;
    this.turnoService.listarTurnosActivos().subscribe({
      next: (datos) => {
        this.turnos = datos;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar turnos:', error);
        this.cargando = false;
        this.notificationService.error('Error al cargar turnos');
      }
    });
  }

  crearTurno(): void {
    if (!this.nuevoTurno.nombre || !this.nuevoTurno.horaInicio || !this.nuevoTurno.horaFin) {
      this.notificationService.warning('Completa todos los campos requeridos');
      return;
    }

    if (this.editandoId) {
      this.turnoService.actualizarTurno(this.editandoId, this.nuevoTurno).subscribe({
        next: () => {
          this.cargarTurnos();
          this.reiniciarFormulario();
          this.notificationService.success('Turno actualizado exitosamente');
        },
        error: (error) => {
          console.error('Error:', error);
          this.notificationService.error('Error al actualizar turno');
        }
      });
    } else {
      this.turnoService.crearTurno(this.nuevoTurno).subscribe({
        next: () => {
          this.cargarTurnos();
          this.reiniciarFormulario();
          this.notificationService.success('Turno creado exitosamente');
        },
        error: (error) => {
          console.error('Error:', error);
          this.notificationService.error('Error al crear turno');
        }
      });
    }
  }

  editarTurno(turno: Turno): void {
    this.nuevoTurno = { ...turno };
    this.editandoId = turno.id || null;
    this.mostrarFormulario = true;
  }

  eliminarTurno(id: number | undefined): void {
    if (!id || !confirm('¿Deseas eliminar este turno?')) return;

    this.turnoService.eliminarTurno(id).subscribe({
      next: () => {
        this.cargarTurnos();
        this.notificationService.success('Turno eliminado');
      },
      error: (error) => {
        console.error('Error:', error);
        this.notificationService.error('Error al eliminar turno');
      }
    });
  }

  reiniciarFormulario(): void {
    this.nuevoTurno = {
      nombre: '',
      horaInicio: '08:00',
      horaFin: '17:00',
      descansoInicio: '12:00',
      descansoFin: '13:00',
      horasTrabajo: 8,
      activo: true
    };
    this.mostrarFormulario = false;
    this.editandoId = null;
  }

  toggleFormulario(): void {
    if (this.mostrarFormulario) {
      this.reiniciarFormulario();
    } else {
      this.mostrarFormulario = true;
    }
  }

  calcularHoras(): void {
    if (this.nuevoTurno.horaInicio && this.nuevoTurno.horaFin) {
      const inicio = parseInt(this.nuevoTurno.horaInicio.split(':')[0]);
      const fin = parseInt(this.nuevoTurno.horaFin.split(':')[0]);
      let horas = fin - inicio;
      
      if (this.nuevoTurno.descansoInicio && this.nuevoTurno.descansoFin) {
        const descansoInicio = parseInt(this.nuevoTurno.descansoInicio.split(':')[0]);
        const descansoFin = parseInt(this.nuevoTurno.descansoFin.split(':')[0]);
        horas -= (descansoFin - descansoInicio);
      }
      
      this.nuevoTurno.horasTrabajo = Math.max(0, horas);
    }
  }
}
