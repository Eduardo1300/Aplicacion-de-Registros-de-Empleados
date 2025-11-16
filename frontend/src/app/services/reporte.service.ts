import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Reporte {
  id?: number;
  titulo: string;
  descripcion: string;
  tipoReporte: string;
  fechaGeneracion?: Date;
  usuarioGeneradorId: number;
  departamentoId?: number;
  fechaInicio: Date;
  fechaFin: Date;
  estado?: string;
  rutaArchivo?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private apiUrl = 'http://localhost:8080/api/v1/reportes';

  constructor(private http: HttpClient) {}

  crearReporte(reporte: Reporte): Observable<Reporte> {
    return this.http.post<Reporte>(this.apiUrl, reporte);
  }

  listarReportes(): Observable<Reporte[]> {
    return this.http.get<Reporte[]>(this.apiUrl);
  }

  obtenerReporte(id: number): Observable<Reporte> {
    return this.http.get<Reporte>(`${this.apiUrl}/${id}`);
  }

  actualizarReporte(id: number, reporte: Reporte): Observable<Reporte> {
    return this.http.put<Reporte>(`${this.apiUrl}/${id}`, reporte);
  }

  eliminarReporte(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  generarReporte(id: number): Observable<Reporte> {
    return this.http.post<Reporte>(`${this.apiUrl}/${id}/generar`, {});
  }

  listarPorTipo(tipo: string): Observable<Reporte[]> {
    return this.http.get<Reporte[]>(`${this.apiUrl}/tipo/${tipo}`);
  }

  exportarPDF(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/exportar/pdf`, { responseType: 'blob' });
  }

  exportarExcel(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/exportar/excel`, { responseType: 'blob' });
  }
}
