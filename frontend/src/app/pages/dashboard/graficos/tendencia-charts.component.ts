import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { EstadisticasService, TendenciaAsistencia } from '../../../services/estadisticas.service';

@Component({
  selector: 'app-tendencia-charts',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './tendencia-charts.component.html',
  styleUrls: ['./tendencia-charts.component.css']
})
export class TendenciaChartsComponent implements OnInit {
  
  // Gráfico de línea - Tendencia últimos 30 días
  tendenciaChartConfig: ChartConfiguration<'line'> = {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          label: 'Presentes',
          data: [],
          borderColor: 'rgba(75, 192, 75, 1)',
          backgroundColor: 'rgba(75, 192, 75, 0.1)',
          borderWidth: 2,
          tension: 0.3,
          fill: true
        },
        {
          label: 'Ausentes',
          data: [],
          borderColor: 'rgba(192, 75, 75, 1)',
          backgroundColor: 'rgba(192, 75, 75, 0.1)',
          borderWidth: 2,
          tension: 0.3,
          fill: true
        },
        {
          label: 'Retardos',
          data: [],
          borderColor: 'rgba(255, 193, 7, 1)',
          backgroundColor: 'rgba(255, 193, 7, 0.1)',
          borderWidth: 2,
          tension: 0.3,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
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
    this.estadisticasService.getTendenciaAsistencia30Dias().subscribe({
      next: (data: TendenciaAsistencia[]) => {
        this.actualizarGrafico(data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando tendencias:', err);
        this.error = 'Error al cargar las tendencias';
        this.loading = false;
      }
    });
  }

  private actualizarGrafico(tendencias: TendenciaAsistencia[]): void {
    const labels = tendencias.map(t => t.fecha);
    const presentes = tendencias.map(t => t.presentes);
    const ausentes = tendencias.map(t => t.ausentes);
    const retardos = tendencias.map(t => t.retardos);

    if (this.tendenciaChartConfig.data.labels) {
      this.tendenciaChartConfig.data.labels = labels;
    }
    
    (this.tendenciaChartConfig.data.datasets[0].data as number[]) = presentes;
    (this.tendenciaChartConfig.data.datasets[1].data as number[]) = ausentes;
    (this.tendenciaChartConfig.data.datasets[2].data as number[]) = retardos;
  }
}
