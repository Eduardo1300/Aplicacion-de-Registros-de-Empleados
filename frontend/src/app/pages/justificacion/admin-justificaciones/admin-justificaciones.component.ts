import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JustificacionService } from '../justificacion.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-justificaciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-justificaciones.component.html',
  styleUrls: ['./admin-justificaciones.component.css']
})
export class AdminJustificacionesComponent implements OnInit {
  justificaciones: any[] = [];
  cargando = true;
  error = '';
  rol: string | null = null;
  filtroEstado = 'PENDIENTE';

  constructor(
    private justificacionService: JustificacionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.rol = this.authService.getRolActual();
    console.log('Rol actual:', this.rol); // Debug
    if (this.rol && this.rol.toUpperCase() === 'ADMIN') {
      this.cargarJustificaciones();
    } else {
      this.error = 'Solo administradores pueden acceder a este módulo. Rol: ' + this.rol;
      this.cargando = false;
    }
  }

  cargarJustificaciones(): void {
    this.cargando = true;
    this.justificacionService.obtenerTodas().subscribe({
      next: (justificaciones: any) => {
        // Asegurar que justificaciones es un array
        if (!justificaciones) {
          this.justificaciones = [];
        } else if (Array.isArray(justificaciones)) {
          // Filtrar por estado
          if (this.filtroEstado === 'PENDIENTE') {
            this.justificaciones = justificaciones.filter((j: any) => !j.estado || j.estado === 'Pendiente');
          } else {
            this.justificaciones = justificaciones;
          }
        } else {
          this.justificaciones = [];
        }
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar justificaciones:', err);
        this.error = 'Error al cargar justificaciones';
        this.justificaciones = [];
        this.cargando = false;
      }
    });
  }

  aprobarJustificacion(justificacion: any): void {
    const comentario = prompt('Comentario (opcional):', 'Aceptada');
    if (comentario === null) return;

    const actualizar = {
      ...justificacion,
      estado: 'APROBADA',
      comentario: comentario
    };

    console.log('Enviando:', actualizar);

    this.justificacionService.actualizarJustificacion(justificacion.id, actualizar).subscribe({
      next: (respuesta) => {
        console.log('Respuesta:', respuesta);
        alert('✅ Justificación aprobada correctamente');
        this.cargarJustificaciones();
      },
      error: (err) => {
        console.error('Error:', err);
        alert('❌ Error al aprobar: ' + err.message);
      }
    });
  }

  rechazarJustificacion(justificacion: any): void {
    const comentario = prompt('Motivo del rechazo:', '');
    if (comentario === null || comentario === '') {
      alert('Debes escribir un motivo de rechazo');
      return;
    }

    const actualizar = {
      ...justificacion,
      estado: 'RECHAZADA',
      comentario: comentario
    };

    console.log('Enviando:', actualizar);

    this.justificacionService.actualizarJustificacion(justificacion.id, actualizar).subscribe({
      next: (respuesta) => {
        console.log('Respuesta:', respuesta);
        alert('✅ Justificación rechazada correctamente');
        this.cargarJustificaciones();
      },
      error: (err) => {
        console.error('Error:', err);
        alert('❌ Error al rechazar: ' + err.message);
      }
    });
  }

  get justificacionesFiltradas(): any[] {
    if (!this.justificaciones || this.justificaciones.length === 0) {
      return [];
    }
    if (this.filtroEstado === 'TODAS') {
      return this.justificaciones;
    }
    return this.justificaciones.filter(j => 
      !j.estado || j.estado === 'Pendiente'
    );
  }
}
