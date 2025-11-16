import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { EstadisticasService, HorariosPicoDTO } from '../../../services/estadisticas.service';

@Component({
  selector: 'app-horarios-pico-charts',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './horarios-pico-charts.component.html',
  styleUrls: ['./horarios-pico-charts.component.css']
})
export class HorariosPicoChartsComponent implements OnInit {
  
  horariosPicoChartConfig: ChartConfiguration<'bar'> = {
    type: 'bar',
    data: {
      labels: [],
      datasets: [
        {
          label: 'Registros de Entrada',
          data: [],
          backgroundColor: 'rgba(33, 150, 243, 0.7)',
          borderColor: 'rgba(33, 150, 243, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      indexAxis: 'y' as const,
      scales: {
        x: {
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
    this.estadisticasService.getHorariosPico().subscribe({
      next: (data: HorariosPicoDTO) => {
        this.actualizarGrafico(data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando horarios pico:', err);
        this.error = 'Error al cargar los horarios pico';
        this.loading = false;
      }
    });
  }

  private actualizarGrafico(data: HorariosPicoDTO): void {
    const labels = data.horasPico.map(h => h.horaFormato);
    const cantidades = data.horasPico.map(h => h.cantidad);

    if (this.horariosPicoChartConfig.data.labels) {
      this.horariosPicoChartConfig.data.labels = labels;
    }
    
    (this.horariosPicoChartConfig.data.datasets[0].data as number[]) = cantidades;
  }
}
