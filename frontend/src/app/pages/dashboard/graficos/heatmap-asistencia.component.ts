import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstadisticasService, HeatmapAsistenciaDTO, EmpleadoHeatmap } from '../../../services/estadisticas.service';

@Component({
  selector: 'app-heatmap-asistencia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './heatmap-asistencia.component.html',
  styleUrls: ['./heatmap-asistencia.component.css']
})
export class HeatmapAsistenciaComponent implements OnInit {
  
  heatmapData: EmpleadoHeatmap[] = [];
  loading = true;
  error: string | null = null;
  
  year: number = new Date().getFullYear();
  month: number = new Date().getMonth() + 1;
  
  meses = [
    { valor: 1, nombre: 'Enero' },
    { valor: 2, nombre: 'Febrero' },
    { valor: 3, nombre: 'Marzo' },
    { valor: 4, nombre: 'Abril' },
    { valor: 5, nombre: 'Mayo' },
    { valor: 6, nombre: 'Junio' },
    { valor: 7, nombre: 'Julio' },
    { valor: 8, nombre: 'Agosto' },
    { valor: 9, nombre: 'Septiembre' },
    { valor: 10, nombre: 'Octubre' },
    { valor: 11, nombre: 'Noviembre' },
    { valor: 12, nombre: 'Diciembre' }
  ];

  constructor(private estadisticasService: EstadisticasService) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.loading = true;
    this.estadisticasService.getHeatmapAsistencia(this.year, this.month).subscribe({
      next: (data: HeatmapAsistenciaDTO) => {
        this.heatmapData = data.datos;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando heatmap:', err);
        this.error = 'Error al cargar el heatmap de asistencia';
        this.loading = false;
      }
    });
  }

  onMesChange(): void {
    this.cargarDatos();
  }

  getEstadoColor(estado: string): string {
    switch (estado) {
      case 'Asistio':
        return '#4CAF50'; // Verde
      case 'Tardanza':
        return '#FFC107'; // Amarillo
      case 'Inasistencia':
        return '#F44336'; // Rojo
      case 'AUSENTE':
        return '#F44336'; // Rojo
      default:
        return '#E0E0E0'; // Gris
    }
  }

  getEstadoTitulo(estado: string): string {
    switch (estado) {
      case 'Asistio':
        return 'Asistió';
      case 'Tardanza':
        return 'Tardanza';
      case 'Inasistencia':
        return 'Inasistencia';
      case 'AUSENTE':
        return 'Ausente';
      default:
        return 'Desconocido';
    }
  }

  getDiasDelMes(): number {
    return new Date(this.year, this.month, 0).getDate();
  }
}
