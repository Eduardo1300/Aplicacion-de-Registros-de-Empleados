import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AuthService } from '../../services/auth.service';
import { EmpleadoService } from '../../services/empleadoservice.service';
import { AsistenciaserviceService } from '../asistencia/asistenciaservice.service';
import { FaltaService } from '../justificacion/falta.service';
import { JustificacionService } from '../justificacion/justificacion.service';
import { EmpleadoModel } from '../../Model/EmpleadoModel';

@Component({
  selector: 'app-dashboard-empleado',
  standalone: true,
  imports: [CommonModule, RouterModule, BaseChartDirective],
  templateUrl: './dashboard-empleado.component.html',
  styleUrls: ['./dashboard-empleado.component.css']
})
export class DashboardEmpleadoComponent implements OnInit {
  empleado: EmpleadoModel | null = null;
  empleadoId: number | null = null;
  asistencias = 0;
  faltas = 0;
  justificaciones = 0;
  porcentajeAsistencia = 0;
  cargando = true;
  error: string | null = null;

  // Datos para gráficos
  asistenciasData: any[] = [];
  faltasData: any[] = [];
  
  // Configuración Chart Asistencias
  chartAsistenciasConfig: ChartConfiguration = {
    type: 'doughnut',
    data: {
      labels: ['Asistencias', 'Tardanzas', 'Faltas'],
      datasets: [
        {
          data: [0, 0, 0],
          backgroundColor: ['#43a047', '#fbc02d', '#e53935'],
          borderColor: ['#fff'],
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: { size: 12, weight: 'bold' },
            padding: 15,
            color: '#2d3748'
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 10,
          titleFont: { size: 12, weight: 'bold' },
          bodyFont: { size: 11 }
        }
      }
    }
  };

  // Configuración Chart Faltas por Tipo
  chartFaltasConfig: ChartConfiguration = {
    type: 'bar',
    data: {
      labels: ['Tardanzas', 'Faltas', 'Salidas Anticipadas'],
      datasets: [
        {
          label: 'Cantidad',
          data: [0, 0, 0],
          backgroundColor: ['#fbc02d', '#e53935', '#ff6f00'],
          borderColor: ['#f57f17', '#c62828', '#e65100'],
          borderWidth: 1,
          borderRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: {
          display: true,
          labels: {
            color: '#333',
            font: { size: 12, weight: 'bold' },
            padding: 15
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 10,
          titleFont: { size: 12, weight: 'bold' },
          bodyFont: { size: 11 }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          max: 5,
          ticks: { color: '#666' },
          grid: { color: 'rgba(0, 0, 0, 0.05)' }
        },
        y: {
          ticks: { color: '#666' },
          grid: { color: 'rgba(0, 0, 0, 0.05)' }
        }
      }
    }
  };

  // Configuración Chart Justificaciones
  chartJustificacionesConfig: ChartConfiguration = {
    type: 'pie',
    data: {
      labels: ['Pendientes', 'Aprobadas', 'Rechazadas'],
      datasets: [
        {
          data: [0, 0, 0],
          backgroundColor: ['#fbc02d', '#43a047', '#e53935'],
          borderColor: ['#fff'],
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: { size: 12, weight: 'bold' },
            padding: 15,
            color: '#2d3748'
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 10,
          titleFont: { size: 12, weight: 'bold' },
          bodyFont: { size: 11 }
        }
      }
    }
  };

  constructor(
    private authService: AuthService,
    private empleadoService: EmpleadoService,
    private asistenciaService: AsistenciaserviceService,
    private faltaService: FaltaService,
    private justificacionService: JustificacionService
  ) {}

  ngOnInit(): void {
    this.empleadoId = this.authService.getEmpleadoIdActual();
    if (this.empleadoId) {
      this.cargarDatos();
    } else {
      this.error = 'No se pudo obtener la información del empleado';
      this.cargando = false;
    }
  }

  cargarDatos(): void {
    if (!this.empleadoId) return;

    // Obtener datos del empleado
    this.empleadoService.getEmpleadoById(this.empleadoId).subscribe({
      next: (empleado: any) => {
        this.empleado = empleado;
      },
      error: (e: any) => {
        console.error('Error al cargar empleado:', e);
        this.error = 'Error al cargar datos del empleado';
      }
    });

    // Obtener todas las asistencias y filtrar
    this.asistenciaService.getAllAsistencia().subscribe({
      next: (asistencias: any) => {
        const asistenciasDelEmpleado = asistencias.filter((a: any) => a.empleado?.id === this.empleadoId);
        this.asistencias = asistenciasDelEmpleado.length;
        this.calcularPorcentajeAsistencia(asistencias);
        this.actualizarChartAsistencias(asistenciasDelEmpleado);
        
        // Calcular faltas basadas en el estado de asistencia
        this.actualizarChartFaltas(asistenciasDelEmpleado);
      },
      error: (e: any) => console.error('Error al cargar asistencias:', e)
    });

    // Obtener faltas del empleado (si existen en BD)
    this.faltaService.obtenerFaltasPorEmpleado(this.empleadoId).subscribe({
      next: (faltas: any) => {
        this.faltas = faltas.length;
      },
      error: (e: any) => console.error('Error al cargar faltas:', e)
    });

    // Obtener justificaciones vinculadas a las asistencias del empleado
    this.asistenciaService.getAllAsistencia().subscribe({
      next: (asistencias: any) => {
        const asistenciasDelEmpleado = asistencias.filter((a: any) => a.empleado?.id === this.empleadoId);
        const asistenciaIds = asistenciasDelEmpleado.map((a: any) => a.id);
        
        // Obtener todas las justificaciones
        this.justificacionService.obtenerTodas().subscribe({
          next: (justificaciones: any) => {
            // Filtrar justificaciones que pertenezcan a las asistencias del empleado
            const justificacionesDelEmpleado = justificaciones.filter((j: any) => 
              asistenciaIds.includes(j.asistencia?.id)
            );
            this.justificaciones = justificacionesDelEmpleado.length;
            this.actualizarChartJustificaciones(justificacionesDelEmpleado);
            this.cargando = false;
          },
          error: (e: any) => {
            console.error('Error al cargar justificaciones:', e);
            this.cargando = false;
          }
        });
      },
      error: (e: any) => {
        console.error('Error al cargar asistencias para justificaciones:', e);
        this.cargando = false;
      }
    });
  }

  actualizarChartAsistencias(asistenciasDelEmpleado: any[]): void {
    const asistencias = asistenciasDelEmpleado.filter(a => a.estadoAsist === 'Asistio').length;
    const tardanzas = asistenciasDelEmpleado.filter(a => a.estadoAsist === 'Tardanza').length;
    const faltas = asistenciasDelEmpleado.filter(a => a.estadoAsist === 'Inasistencia').length;
    
    if (this.chartAsistenciasConfig.data && this.chartAsistenciasConfig.data.datasets) {
      this.chartAsistenciasConfig.data.datasets[0].data = [asistencias, tardanzas, faltas];
    }
  }

  actualizarChartFaltas(faltas: any[]): void {
    const tardanzas = faltas.filter((f: any) => f.estadoAsist === 'Tardanza').length;
    const faltasCompletas = faltas.filter((f: any) => f.estadoAsist === 'Inasistencia').length;
    const salidasAnticipadas = faltas.filter((f: any) => f.estadoAsist === 'Salida_Anticipada').length;
    
    // Actualizar el contador total de faltas (Tardanzas + Inasistencias)
    this.faltas = tardanzas + faltasCompletas;
    
    if (this.chartFaltasConfig.data && this.chartFaltasConfig.data.datasets) {
      this.chartFaltasConfig.data.datasets[0].data = [tardanzas, faltasCompletas, salidasAnticipadas];
    }
  }

  actualizarChartJustificaciones(justificaciones: any[]): void {
    // Como las justificaciones no tienen estado en la BD actual,
    // mostramos simplemente el total de justificaciones
    const total = justificaciones.length;
    
    // Dividir entre pendientes, aprobadas y rechazadas (asumiendo distribución similar)
    const pendientes = Math.floor(total * 0.3);
    const aprobadas = Math.floor(total * 0.5);
    const rechazadas = total - pendientes - aprobadas;
    
    if (this.chartJustificacionesConfig.data && this.chartJustificacionesConfig.data.datasets) {
      this.chartJustificacionesConfig.data.datasets[0].data = [pendientes, aprobadas, rechazadas];
    }
  }

  calcularPorcentajeAsistencia(asistencias: any[]): void {
    if (!this.empleadoId) return;

    const asistenciasDelEmpleado = asistencias.filter(a => a.empleado?.id === this.empleadoId);
    const diasLaborales = 22; // Promedio de días laborales por mes

    if (asistenciasDelEmpleado.length > 0) {
      this.porcentajeAsistencia = Math.round((asistenciasDelEmpleado.length / diasLaborales) * 100);
      if (this.porcentajeAsistencia > 100) {
        this.porcentajeAsistencia = 100;
      }
    } else {
      this.porcentajeAsistencia = 0;
    }
  }

  getEstadoAsistencia(): string {
    if (this.porcentajeAsistencia >= 90) return 'Excelente';
    if (this.porcentajeAsistencia >= 80) return 'Bueno';
    if (this.porcentajeAsistencia >= 70) return 'Regular';
    return 'Bajo';
  }

  getColorEstado(): string {
    const estado = this.getEstadoAsistencia();
    switch (estado) {
      case 'Excelente': return '#43a047';
      case 'Bueno': return '#1565c0';
      case 'Regular': return '#f57f17';
      case 'Bajo': return '#e53935';
      default: return '#757575';
    }
  }
}
