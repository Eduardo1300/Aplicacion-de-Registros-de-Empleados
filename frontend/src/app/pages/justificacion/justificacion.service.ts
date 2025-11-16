import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Justificacion {
  id?: number;
  asistenciaId?: number;
  descripcion: string;
  documentoUrl?: string;
  fechaRegistro?: string;
  estado?: string;
  comentario?: string;
  asistencia?: {
    id: number;
    empleado?: { id: number };
    estadoAsist?: string;
    fecha?: string;
  };
}

@Injectable({ providedIn: 'root' })
export class JustificacionService {
  private apiUrl = 'http://localhost:8080/api/justificacion';

  constructor(private http: HttpClient) {}

  enviarJustificacion(justificacion: any): Observable<Justificacion> {
    return this.http.post<Justificacion>(this.apiUrl, justificacion);
  }
  
  obtenerJustificacion(id: number): Observable<Justificacion> {
    return this.http.get<Justificacion>(`${this.apiUrl}/${id}`);
  }
  
  obtenerTodas(): Observable<Justificacion[]> {
    return this.http.get<Justificacion[]>(this.apiUrl);
  }
  
  obtenerPorAsistencia(asistenciaId: number): Observable<Justificacion[]> {
    return this.http.get<Justificacion[]>(`${this.apiUrl}/asistencia/${asistenciaId}`);
  }
  
  actualizarJustificacion(id: number, justificacion: Justificacion): Observable<Justificacion> {
    return this.http.put<Justificacion>(`${this.apiUrl}/${id}`, justificacion);
  }
  
  eliminarJustificacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
