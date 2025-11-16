import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-avanzado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-avanzado.component.html',
  styleUrl: './dashboard-avanzado.component.css'
})
export class DashboardAvanzadoComponent implements OnInit {
  kpis: any[] = [];
  productividad: any[] = [];
  comparativas: any[] = [];
  predicciones: any[] = [];

  ngOnInit(): void {
    this.cargarKPIs();
    this.cargarProductividad();
    this.cargarComparativas();
    this.cargarPredicciones();
  }

  cargarKPIs(): void {
    this.kpis = [
      { titulo: 'Total Empleados', valor: '150', porcentaje: '+5%', icono: 'people' },
      { titulo: 'Puntualidad', valor: '95%', porcentaje: '+2%', icono: 'clock' },
      { titulo: 'Desempeño', valor: '8.5/10', porcentaje: '+0.5', icono: 'bar-chart' },
      { titulo: 'Satisfacción', valor: '87%', porcentaje: '+3%', icono: 'smile' }
    ];
  }

  cargarProductividad(): void {
    this.productividad = [
      { departamento: 'Ventas', productividad: 95, meta: 100 },
      { departamento: 'Tecnología', productividad: 88, meta: 100 },
      { departamento: 'RRHH', productividad: 92, meta: 100 },
      { departamento: 'Finanzas', productividad: 90, meta: 100 }
    ];
  }

  cargarComparativas(): void {
    this.comparativas = [
      { mes: 'Enero', asistencia: 95, licencias: 5, horas_extra: 120 },
      { mes: 'Febrero', asistencia: 93, licencias: 8, horas_extra: 140 },
      { mes: 'Marzo', asistencia: 96, licencias: 4, horas_extra: 110 },
      { mes: 'Abril', asistencia: 94, licencias: 6, horas_extra: 130 }
    ];
  }

  cargarPredicciones(): void {
    this.predicciones = [
      { periodo: 'Mayo', asistencia_pred: 92, productividad_pred: 89, rotacion_pred: 3.2 },
      { periodo: 'Junio', asistencia_pred: 91, productividad_pred: 87, rotacion_pred: 3.5 },
      { periodo: 'Julio', asistencia_pred: 90, productividad_pred: 85, rotacion_pred: 4.0 }
    ];
  }

  getColor(valor: number): string {
    if (valor >= 90) return '#10b981';
    if (valor >= 80) return '#f59e0b';
    return '#ef4444';
  }
}
