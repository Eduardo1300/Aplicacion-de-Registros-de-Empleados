import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { EstadisticasService } from '../../../services/estadisticas.service';

@Component({
  selector: 'app-justificaciones-charts',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './justificaciones-charts.component.html',
  styleUrls: ['./justificaciones-charts.component.css']
})
export class JustificacionesChartsComponent implements OnInit {
  
  justificacionesChartConfig: ChartConfiguration<'pie'> = {
    type: 'pie',
    data: {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true
    }
  };

  loading = true;
  error: string | null = null;

  constructor(private estadisticasService: EstadisticasService) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.loading = true;
    this.estadisticasService.getJustificacionesPorTipo().subscribe({
      next: (data: any) => {
        this.actualizarGrafico(data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando justificaciones:', err);
        this.error = 'Error al cargar las justificaciones';
        this.loading = false;
      }
    });
  }

  private actualizarGrafico(data: any): void {
    const labels = Object.keys(data);
    const valores = Object.values(data) as number[];

    if (this.justificacionesChartConfig.data.labels) {
      this.justificacionesChartConfig.data.labels = labels;
    }
    
    (this.justificacionesChartConfig.data.datasets[0].data as number[]) = valores;
  }
}
