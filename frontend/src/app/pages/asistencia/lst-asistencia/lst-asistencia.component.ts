import { Component, OnInit } from '@angular/core';
import { Asistencia } from '../asistencia';
import { AsistenciaserviceService } from '../asistenciaservice.service';
import { Empleado } from '../../empleado/empleado';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-lst-asistencia',
  standalone: true, // Declarar como standalone
  imports: [
    FormsModule,
    CommonModule // Añadir a imports
  ],
  templateUrl: './lst-asistencia.component.html',
  styleUrls: ['./lst-asistencia.component.css']
})
export class LstAsistenciaComponent implements OnInit {

  filtroNombre: string = '';
  asistencias: Asistencia[] = [];
  empleados: Empleado[] = [];
  rol: string | null = null;
  empleadoId: number | null = null;

  constructor(
    private asistenciaService: AsistenciaserviceService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.rol = this.authService.getRolActual();
    this.empleadoId = this.authService.getEmpleadoIdActual();

    if (this.rol === 'EMPLEADO' && this.empleadoId) {
      this.cargarAsistenciasDelEmpleado();
    } else {
      this.cargarTodasLasAsistencias();
    }
  }

  cargarAsistenciasDelEmpleado(): void {
    if (this.empleadoId) {
      this.asistenciaService.getAllAsistencia().subscribe({
        next: (response) => {
          this.asistencias = response.filter(a => a.empleado?.id === this.empleadoId);
        },
        error: (e) => {
          // Eliminar mensaje de error restrictivo
        },
      });
    }
  }

  cargarTodasLasAsistencias(): void {
    this.asistenciaService.getAllAsistencia().subscribe({
      next: (response) => {
        this.asistencias = response;
      },
      error: (e) => {
        // Eliminar mensaje de error restrictivo
      },
    });
  }

  get asistenciasFiltradas(): Asistencia[] {
    if (!this.filtroNombre) return this.asistencias;
    return this.asistencias.filter(item =>
      (item.empleado.nombre + ' ' + item.empleado.apellido).toLowerCase().includes(this.filtroNombre.toLowerCase())
    );
  }

  // Simula el estado de la asistencia basado en la hora de entrada
  getEstado(horaEntrada: string): string {
    if (!horaEntrada) {
      return 'Ausente';
    }
    // Asumimos que la hora de entrada es a las 9:00 AM
    return horaEntrada <= '09:00:00' ? 'A tiempo' : 'Tardanza';
  }

  // Devuelve la clase CSS correspondiente al estado
  getEstadoClass(horaEntrada: string): string {
    const estado = this.getEstado(horaEntrada);
    switch (estado) {
      case 'A tiempo':
        return 'status-a-tiempo';
      case 'Tardanza':
        return 'status-tardanza';
      default:
        return 'status-ausente';
    }
  }

  redirecTo(direccion: string) {
    this.router.navigate([`/pages/${direccion}`]);
  }
}