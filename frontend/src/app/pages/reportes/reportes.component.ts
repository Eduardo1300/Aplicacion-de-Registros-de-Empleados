import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReporteService, Reporte } from '../../services/reporte.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  reportes: Reporte[] = [];
  nuevoReporte: Reporte = {
    titulo: '',
    descripcion: '',
    tipoReporte: 'ASISTENCIA',
    usuarioGeneradorId: 1,
    fechaInicio: new Date(),
    fechaFin: new Date()
  };
  mostrarFormulario = false;
  cargando = false;

  tiposReporte = [
    { valor: 'ASISTENCIA', etiqueta: 'Asistencia' },
    { valor: 'TARDANZAS', etiqueta: 'Tardanzas' },
    { valor: 'DESEMPEÑO', etiqueta: 'Desempeño' },
    { valor: 'SALARIO', etiqueta: 'Salario' },
    { valor: 'DEPARTAMENTO', etiqueta: 'Departamento' },
    { valor: 'HORARIO', etiqueta: 'Horario' }
  ];

  constructor(
    private reporteService: ReporteService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.cargarReportes();
  }

  cargarReportes(): void {
    this.cargando = true;
    this.reporteService.listarReportes().subscribe({
      next: (datos) => {
        this.reportes = datos;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar reportes:', error);
        this.cargando = false;
        this.notificationService.error('Error al cargar reportes');
      }
    });
  }

  crearReporte(): void {
    if (!this.nuevoReporte.titulo || !this.nuevoReporte.descripcion) {
      this.notificationService.warning('Por favor completa todos los campos');
      return;
    }

    this.reporteService.crearReporte(this.nuevoReporte).subscribe({
      next: (reporte) => {
        this.reportes.push(reporte);
        this.reiniciarFormulario();
        this.notificationService.success('Reporte creado exitosamente');
      },
      error: (error) => {
        console.error('Error al crear reporte:', error);
        this.notificationService.error('Error al crear reporte');
      }
    });
  }

  generarReporte(id: number | undefined): void {
    if (!id) return;
    
    this.reporteService.generarReporte(id).subscribe({
      next: () => {
        this.cargarReportes();
        this.notificationService.success('Reporte generado exitosamente');
      },
      error: (error) => {
        console.error('Error al generar reporte:', error);
        this.notificationService.error('Error al generar reporte');
      }
    });
  }

  exportarPDF(id: number | undefined): void {
    if (!id) return;
    
    this.reporteService.exportarPDF(id).subscribe({
      next: (blob) => {
        this.descargarArchivo(blob, 'reporte.pdf');
        this.notificationService.success('PDF descargado');
      },
      error: (error) => {
        console.error('Error al descargar PDF:', error);
        this.notificationService.error('Error al descargar PDF');
      }
    });
  }

  exportarExcel(id: number | undefined): void {
    if (!id) return;
    
    this.reporteService.exportarExcel(id).subscribe({
      next: (blob) => {
        this.descargarArchivo(blob, 'reporte.xlsx');
        this.notificationService.success('Excel descargado');
      },
      error: (error) => {
        console.error('Error al descargar Excel:', error);
        this.notificationService.error('Error al descargar Excel');
      }
    });
  }

  eliminarReporte(id: number | undefined): void {
    if (!id || !confirm('¿Deseas eliminar este reporte?')) return;
    
    this.reporteService.eliminarReporte(id).subscribe({
      next: () => {
        this.cargarReportes();
        this.notificationService.success('Reporte eliminado');
      },
      error: (error) => {
        console.error('Error al eliminar reporte:', error);
        this.notificationService.error('Error al eliminar reporte');
      }
    });
  }

  descargarArchivo(blob: Blob, nombre: string): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = nombre;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  reiniciarFormulario(): void {
    this.nuevoReporte = {
      titulo: '',
      descripcion: '',
      tipoReporte: 'ASISTENCIA',
      usuarioGeneradorId: 1,
      fechaInicio: new Date(),
      fechaFin: new Date()
    };
    this.mostrarFormulario = false;
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }
}
