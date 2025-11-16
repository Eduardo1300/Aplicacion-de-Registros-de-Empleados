import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Falta {
  id: number;
  empleadoId: number;
  fecha: string;
  tipo: string;
  descripcion?: string;
  estado?: string;
}

@Injectable({ providedIn: 'root' })
export class FaltaService {
  private apiUrl = 'http://localhost:8080/api/falta';

  constructor(private http: HttpClient) {}

  obtenerFaltasPorEmpleado(empleadoId: number): Observable<Falta[]> {
    return this.http.get<Falta[]>(`${this.apiUrl}/empleado/${empleadoId}`);
  }
  
  obtenerFaltaPorId(id: number): Observable<Falta> {
    return this.http.get<Falta>(`${this.apiUrl}/${id}`);
  }
  
  crearFalta(falta: Falta): Observable<Falta> {
    return this.http.post<Falta>(this.apiUrl, falta);
  }
  
  actualizarFalta(id: number, falta: Falta): Observable<Falta> {
    return this.http.put<Falta>(`${this.apiUrl}/${id}`, falta);
  }
}
