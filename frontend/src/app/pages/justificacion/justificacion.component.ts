import { Component, OnInit } from '@angular/core';
import { FaltaService, Falta } from './falta.service';
import { JustificacionService, Justificacion } from './justificacion.service';
import { AuthService } from '../../services/auth.service';
import { AsistenciaserviceService } from '../asistencia/asistenciaservice.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-justificacion',
  templateUrl: './justificacion.component.html',
  styleUrls: ['./justificacion.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, DatePipe]
})
export class JustificacionComponent implements OnInit {
  faltas: Falta[] = [];
  asistencias: any[] = [];
  asistenciasConFalta: any[] = [];
  justificacionesEmpleado: Justificacion[] = [];
  justificacion: Justificacion = { descripcion: '', documentoUrl: '' };
  enviado = false;
  error = '';
  mensaje = '';
  empleadoId: number | null = null;
  mostrarFormulario = false;
  faltaSeleccionada: any | null = null;

  constructor(
    private faltaService: FaltaService,
    private justificacionService: JustificacionService,
    private asistenciaService: AsistenciaserviceService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const empleadoId = this.authService.getEmpleadoIdActual();
    if (empleadoId) {
      this.empleadoId = empleadoId;
      this.cargarDatos();
      this.cargarJustificacionesEmpleado();
    } else {
      this.error = 'No se encontró el empleado para el usuario logueado.';
    }
  }

  cargarDatos(): void {
    if (this.empleadoId != null) {
      this.asistenciaService.getAllAsistencia().subscribe({
        next: (asistencias: any) => {
          this.asistencias = asistencias.filter((a: any) => a.empleado?.id === this.empleadoId);
          
          this.asistenciasConFalta = this.asistencias.filter((a: any) => 
            a.estadoAsist === 'Tardanza' || a.estadoAsist === 'Inasistencia'
          );
        },
        error: (err) => {
          console.error('Error al cargar asistencias:', err);
        }
      });

      this.faltaService.obtenerFaltasPorEmpleado(this.empleadoId).subscribe({
        next: (faltas) => {
          this.faltas = faltas;
        },
        error: (err) => {
          console.error('Error al cargar faltas:', err);
        }
      });
    }
  }

  cargarJustificacionesEmpleado(): void {
    if (this.empleadoId != null) {
      this.justificacionService.obtenerTodas().subscribe({
        next: (justificaciones) => {
          this.justificacionesEmpleado = justificaciones.filter(j => j.asistencia?.empleado?.id === this.empleadoId);
        },
        error: (err) => {
          console.error('Error al cargar justificaciones:', err);
        }
      });
    }
  }

  abrirFormulario(falta: any): void {
    this.faltaSeleccionada = falta;
    this.justificacion = { 
      descripcion: '', 
      documentoUrl: '' 
    };
    this.mostrarFormulario = true;
    this.enviado = false;
    this.error = '';
    this.mensaje = '';
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.faltaSeleccionada = null;
    this.justificacion = { descripcion: '', documentoUrl: '' };
  }

  enviarJustificacion(): void {
    if (!this.justificacion.descripcion || this.justificacion.descripcion.trim() === '') {
      this.error = 'Por favor ingresa una descripción.';
      return;
    }

    if (!this.faltaSeleccionada) {
      this.error = 'No hay falta seleccionada.';
      return;
    }

    const asistenciaId = this.faltaSeleccionada.id || this.faltaSeleccionada.asistencia?.id;

    if (!asistenciaId) {
      this.error = 'No se encontró el registro de asistencia para esta falta.';
      return;
    }

    const justificacionEnviar = {
      ...this.justificacion,
      asistencia: {
        id: asistenciaId
      }
    };

    this.justificacionService.enviarJustificacion(justificacionEnviar).subscribe({
      next: (respuesta) => {
        this.enviado = true;
        this.error = '';
        this.mensaje = '✅ Justificación enviada correctamente. Está pendiente de aprobación.';
        setTimeout(() => {
          this.cerrarFormulario();
          this.cargarDatos();
          this.cargarJustificacionesEmpleado();
          this.mensaje = '';
        }, 2000);
      },
      error: (err) => {
        console.error('Error al enviar justificación:', err);
        this.error = 'Error al enviar la justificación. Intenta de nuevo.';
        this.enviado = false;
      }
    });
  }

  getTipoIcon(tipo: string | undefined): string {
    switch (tipo?.toUpperCase()) {
      case 'TARDANZA':
        return 'fas fa-hourglass-end';
      case 'FALTA':
        return 'fas fa-user-slash';
      case 'SALIDA_ANTICIPADA':
        return 'fas fa-sign-out-alt';
      default:
        return 'fas fa-info-circle';
    }
  }

  getTipoBadgeClass(tipo: string | undefined): string {
    switch (tipo?.toUpperCase()) {
      case 'TARDANZA':
        return 'bg-warning';
      case 'FALTA':
        return 'bg-danger';
      case 'SALIDA_ANTICIPADA':
        return 'bg-info';
      default:
        return 'bg-secondary';
    }
  }

  getEstadoBadgeClass(estado: string | undefined): string {
    switch (estado?.toUpperCase()) {
      case 'PENDIENTE':
        return 'bg-secondary';
      case 'JUSTIFICADA':
        return 'bg-success';
      case 'RECHAZADA':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }

  getFaltasSinJustificar(): any[] {
    return this.asistenciasConFalta.filter(asistencia => {
      const justificada = this.justificacionesEmpleado.some(j => j.asistencia && j.asistencia.id === asistencia.id);
      return !justificada;
    });
  }

  getFaltasJustificadas(): any[] {
    return this.justificacionesEmpleado;
  }

  getTipoDeAsistencia(estadoAsist: string): string {
    if (estadoAsist === 'Tardanza') {
      return 'TARDANZA';
    } else if (estadoAsist === 'Inasistencia') {
      return 'FALTA';
    }
    return estadoAsist.toUpperCase();
  }
}
