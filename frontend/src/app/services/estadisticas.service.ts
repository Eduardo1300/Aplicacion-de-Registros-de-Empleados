import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface TendenciaAsistencia {
  fecha: string;
  presentes: number;
  ausentes: number;
  retardos: number;
  porcentaje: number;
}

export interface AsistenciaPorDepartamento {
  departamento: string;
  totalEmpleados: number;
  presentes: number;
  ausentes: number;
  retardos: number;
  porcentaje: number;
}

export interface EstadisticasDTO {
  totalEmpleados: number;
  presentesHoy: number;
  ausrentesHoy: number;
  retardosHoy: number;
  porcentajeAsistencia: number;
  asistenciaPorDepartamento: AsistenciaPorDepartamento[];
  tendenciaAsistencia?: TendenciaAsistencia[];
  distribucionEmpleados?: Map<string, number>;
  justificacionesPorTipo?: Map<string, number>;
}

export interface HoraPico {
  hora: number;
  horaFormato: string;
  cantidad: number;
  porcentaje: number;
}

export interface HorariosPicoDTO {
  horasPico: HoraPico[];
  registrosPorHora: Map<number, number>;
}

export interface DiaHeatmap {
  dia: number;
  estado: string;
  horaEntrada?: string;
  horaSalida?: string;
}

export interface EmpleadoHeatmap {
  empleadoId: number;
  empleadoNombre: string;
  departamento: string;
  dias: DiaHeatmap[];
}

export interface HeatmapAsistenciaDTO {
  datos: EmpleadoHeatmap[];
}

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {
  private apiUrl = `${environment.apiUrl}/estadisticas`;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene estadísticas del día actual
   */
  getEstadisticasHoy(): Observable<EstadisticasDTO> {
    return this.http.get<EstadisticasDTO>(`${this.apiUrl}/hoy`);
  }

  /**
   * Obtiene tendencia de asistencia últimos 30 días
   */
  getTendenciaAsistencia30Dias(): Observable<TendenciaAsistencia[]> {
    return this.http.get<TendenciaAsistencia[]>(`${this.apiUrl}/tendencia-30dias`);
  }

  /**
   * Obtiene horarios de mayor afluencia
   */
  getHorariosPico(): Observable<HorariosPicoDTO> {
    return this.http.get<HorariosPicoDTO>(`${this.apiUrl}/horarios-pico`);
  }

  /**
   * Obtiene distribución de empleados por departamento
   */
  getDistribucionEmpleados(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.apiUrl}/distribucion-empleados`);
  }

  /**
   * Obtiene justificaciones por tipo
   */
  getJustificacionesPorTipo(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.apiUrl}/justificaciones-tipo`);
  }

  /**
   * Obtiene heatmap de asistencia mensual
   */
  getHeatmapAsistencia(año: number = 2025, mes: number = new Date().getMonth() + 1): Observable<HeatmapAsistenciaDTO> {
    return this.http.get<HeatmapAsistenciaDTO>(`${this.apiUrl}/heatmap-asistencia?año=${año}&mes=${mes}`);
  }
}
