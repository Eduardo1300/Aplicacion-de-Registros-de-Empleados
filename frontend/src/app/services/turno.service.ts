import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Turno {
  id?: number;
  nombre: string;
  horaInicio: string;
  horaFin: string;
  descansoInicio?: string;
  descansoFin?: string;
  horasTrabajo?: number;
  descripcion?: string;
  activo?: boolean;
  color?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  private apiUrl = 'http://localhost:8080/api/v1/turnos';

  constructor(private http: HttpClient) {}

  crearTurno(turno: Turno): Observable<Turno> {
    return this.http.post<Turno>(this.apiUrl, turno);
  }

  listarTurnos(): Observable<Turno[]> {
    return this.http.get<Turno[]>(this.apiUrl);
  }

  listarTurnosActivos(): Observable<Turno[]> {
    return this.http.get<Turno[]>(`${this.apiUrl}/activos`);
  }

  obtenerTurno(id: number): Observable<Turno> {
    return this.http.get<Turno>(`${this.apiUrl}/${id}`);
  }

  actualizarTurno(id: number, turno: Turno): Observable<Turno> {
    return this.http.put<Turno>(`${this.apiUrl}/${id}`, turno);
  }

  eliminarTurno(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
