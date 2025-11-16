import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmpleadoModel } from '../Model/EmpleadoModel';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiUrl = 'http://localhost:8080/api/empleado'; // Corregido para coincidir con el backend

  constructor(private http: HttpClient) {}

  obtenerEmpleados(): Observable<EmpleadoModel[]> {
    return this.http.get<EmpleadoModel[]>(this.apiUrl);
  }

  getEmpleadoById(id: number): Observable<EmpleadoModel> {
    return this.http.get<EmpleadoModel>(`${this.apiUrl}/${id}`);
  }

  saveEmpleado(empleado: EmpleadoModel): Observable<EmpleadoModel> {
    return this.http.post<EmpleadoModel>(this.apiUrl, empleado);
  }

  updateEmpleado(empleado: EmpleadoModel): Observable<EmpleadoModel> {
    return this.http.put<EmpleadoModel>(`${this.apiUrl}/${empleado.id}`, empleado);
  }
}