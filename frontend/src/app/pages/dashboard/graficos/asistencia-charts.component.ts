import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { EstadisticasService, AsistenciaPorDepartamento } from '../../../services/estadisticas.service';

@Component({
  selector: 'app-asistencia-charts',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './asistencia-charts.component.html',
  styleUrls: ['./asistencia-charts.component.css']
})
export class AsistenciaChartsComponent implements OnInit {
  
  // Gráfico de barras - Asistencia por departamento
  departamentosChartConfig: ChartConfiguration<'bar'> = {
    type: 'bar',
    data: {
      labels: [],
      datasets: [
        {
          label: 'Presentes',
          data: [],
          backgroundColor: 'rgba(75, 192, 75, 0.7)',
          borderColor: 'rgba(75, 192, 75, 1)',
          borderWidth: 1
        },
        {
          label: 'Ausentes',
          data: [],
          backgroundColor: 'rgba(192, 75, 75, 0.7)',
          borderColor: 'rgba(192, 75, 75, 1)',
          borderWidth: 1
        },
        {
          label: 'Retardos',
          data: [],
          backgroundColor: 'rgba(255, 193, 7, 0.7)',
          borderColor: 'rgba(255, 193, 7, 1)',
          borderWidth: 1
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

  // Gráfico tipo dona - Porcentajes
  porcentajeChartConfig: ChartConfiguration<'doughnut'> = {
    type: 'doughnut',
    data: {
      labels: ['Presentes', 'Ausentes', 'Retardos'],
      datasets: [
        {
          data: [],
          backgroundColor: [
            'rgba(75, 192, 75, 0.7)',
            'rgba(192, 75, 75, 0.7)',
            'rgba(255, 193, 7, 0.7)'
          ],
          borderColor: [
            'rgba(75, 192, 75, 1)',
            'rgba(192, 75, 75, 1)',
            'rgba(255, 193, 7, 1)'
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
    this.estadisticasService.getEstadisticasHoy().subscribe({
      next: (data) => {
        this.actualizarGraficos(data.asistenciaPorDepartamento);
        this.actualizarPorcentaje(data.presentesHoy, data.ausrentesHoy, data.retardosHoy);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando estadísticas:', err);
        this.error = 'Error al cargar las estadísticas';
        this.loading = false;
      }
    });
  }

  private actualizarGraficos(departamentos: AsistenciaPorDepartamento[]): void {
    const labels = departamentos.map(d => d.departamento);
    const presentes = departamentos.map(d => d.presentes);
    const ausentes = departamentos.map(d => d.ausentes);
    const retardos = departamentos.map(d => d.retardos);

    if (this.departamentosChartConfig.data.labels) {
      this.departamentosChartConfig.data.labels = labels;
    }
    
    (this.departamentosChartConfig.data.datasets[0].data as number[]) = presentes;
    (this.departamentosChartConfig.data.datasets[1].data as number[]) = ausentes;
    (this.departamentosChartConfig.data.datasets[2].data as number[]) = retardos;
  }

  private actualizarPorcentaje(presentes: number, ausentes: number, retardos: number): void {
    const datos = this.porcentajeChartConfig.data.datasets[0].data as number[];
    datos[0] = presentes;
    datos[1] = ausentes;
    datos[2] = retardos;
  }
}
