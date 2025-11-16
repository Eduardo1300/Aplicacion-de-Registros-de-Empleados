import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { EstadisticasService } from '../../../services/estadisticas.service';

@Component({
  selector: 'app-distribucion-empleados-charts',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './distribucion-empleados-charts.component.html',
  styleUrls: ['./distribucion-empleados-charts.component.css']
})
export class DistribucionEmpleadosChartsComponent implements OnInit {
  
  distribucionChartConfig: ChartConfiguration<'doughnut'> = {
    type: 'doughnut',
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
            'rgba(255, 159, 64, 0.7)',
            'rgba(201, 203, 207, 0.7)',
            'rgba(106, 17, 203, 0.7)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(201, 203, 207, 1)',
            'rgba(106, 17, 203, 1)'
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
    this.estadisticasService.getDistribucionEmpleados().subscribe({
      next: (data: any) => {
        this.actualizarGrafico(data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando distribución:', err);
        this.error = 'Error al cargar la distribución de empleados';
        this.loading = false;
      }
    });
  }

  private actualizarGrafico(data: any): void {
    const labels = Object.keys(data);
    const valores = Object.values(data) as number[];

    if (this.distribucionChartConfig.data.labels) {
      this.distribucionChartConfig.data.labels = labels;
    }
    
    (this.distribucionChartConfig.data.datasets[0].data as number[]) = valores;
  }
}
