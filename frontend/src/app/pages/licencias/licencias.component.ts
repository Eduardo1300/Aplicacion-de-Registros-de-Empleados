import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LicenciaService, TipoLicencia, SolicitudLicencia } from '../../services/licencia.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-licencias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './licencias.component.html',
  styleUrls: ['./licencias.component.css']
})
export class LicenciasComponent implements OnInit {
  tiposLicencia: TipoLicencia[] = [];
  solicitudes: SolicitudLicencia[] = [];
  solicitudesPendientes: SolicitudLicencia[] = [];
  
  nuevaSolicitud: SolicitudLicencia = {
    empleadoId: 0,
    tipoLicenciaId: 0,
    fechaInicio: new Date(),
    fechaFin: new Date(),
    diasSolicitados: 0,
    razon: ''
  };

  pestanaActiva: 'solicitar' | 'mis-solicitudes' | 'pendientes' = 'solicitar';
  cargando = false;

  constructor(
    private licenciaService: LicenciaService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.cargarTiposLicencia();
    this.cargarSolicitudes();
  }

  cargarTiposLicencia(): void {
    this.licenciaService.listarTiposLicenciaActivos().subscribe({
      next: (datos) => {
        this.tiposLicencia = datos;
      },
      error: (error) => {
        console.error('Error al cargar tipos de licencia:', error);
        this.notificationService.error('Error al cargar tipos de licencia');
      }
    });
  }

  cargarSolicitudes(): void {
    this.cargando = true;
    this.licenciaService.listarSolicitudesLicencia().subscribe({
      next: (datos) => {
        this.solicitudes = datos;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar solicitudes:', error);
        this.cargando = false;
        this.notificationService.error('Error al cargar solicitudes');
      }
    });

    this.licenciaService.listarSolicitudesPendientes().subscribe({
      next: (datos) => {
        this.solicitudesPendientes = datos;
      },
      error: (error) => {
        console.error('Error al cargar solicitudes pendientes:', error);
      }
    });
  }

  crearSolicitud(): void {
    if (!this.nuevaSolicitud.tipoLicenciaId || !this.nuevaSolicitud.diasSolicitados) {
      this.notificationService.warning('Completa todos los campos requeridos');
      return;
    }

    this.licenciaService.crearSolicitudLicencia(this.nuevaSolicitud).subscribe({
      next: () => {
        this.notificationService.success('Solicitud de licencia creada');
        this.reiniciarFormulario();
        this.cargarSolicitudes();
      },
      error: (error) => {
        console.error('Error:', error);
        this.notificationService.error('Error al crear solicitud');
      }
    });
  }

  aprobarSolicitud(id: number | undefined): void {
    if (!id) return;

    this.licenciaService.aprobarSolicitud(id).subscribe({
      next: () => {
        this.notificationService.success('Solicitud aprobada');
        this.cargarSolicitudes();
      },
      error: (error) => {
        console.error('Error:', error);
        this.notificationService.error('Error al aprobar solicitud');
      }
    });
  }

  rechazarSolicitud(id: number | undefined): void {
    if (!id) return;

    const observaciones = prompt('Motivo del rechazo:');
    if (!observaciones) return;

    this.licenciaService.rechazarSolicitud(id, observaciones).subscribe({
      next: () => {
        this.notificationService.success('Solicitud rechazada');
        this.cargarSolicitudes();
      },
      error: (error) => {
        console.error('Error:', error);
        this.notificationService.error('Error al rechazar solicitud');
      }
    });
  }

  eliminarSolicitud(id: number | undefined): void {
    if (!id || !confirm('¿Deseas eliminar esta solicitud?')) return;

    this.licenciaService.eliminarSolicitud(id).subscribe({
      next: () => {
        this.notificationService.success('Solicitud eliminada');
        this.cargarSolicitudes();
      },
      error: (error) => {
        console.error('Error:', error);
        this.notificationService.error('Error al eliminar solicitud');
      }
    });
  }

  reiniciarFormulario(): void {
    this.nuevaSolicitud = {
      empleadoId: 0,
      tipoLicenciaId: 0,
      fechaInicio: new Date(),
      fechaFin: new Date(),
      diasSolicitados: 0,
      razon: ''
    };
  }

  cambiarPestana(pestana: 'solicitar' | 'mis-solicitudes' | 'pendientes'): void {
    this.pestanaActiva = pestana;
  }
}
