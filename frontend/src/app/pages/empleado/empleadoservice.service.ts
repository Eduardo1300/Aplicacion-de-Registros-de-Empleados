import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from './empleado';
import { Departamento } from '../departamento/Departamento';
import { EmpleadoModel } from '../../Model/EmpleadoModel';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoserviceService {
  constructor(private httpClient: HttpClient) { }
  getAllEmpleado(): Observable<Empleado[]>{
    return this.httpClient.get<Empleado[]>("http://localhost:8080/api/empleado");
  }
  getEmpleadoById(id: number): Observable<Empleado>{
    return this.httpClient.get<Empleado>("http://localhost:8080/api/empleado/"+id);
  }
  saveEmpleado(empleado: EmpleadoModel): Observable<Empleado>{
    return this.httpClient.post<Empleado>("http://localhost:8080/api/empleado",empleado);
  }
  updateEmpleado(empleado: Empleado): Observable<Empleado>{
    return this.httpClient.put<Empleado>("http://localhost:8080/api/empleado/"+empleado.id,empleado);
  }
  getDepartamentos(): Observable<Departamento[]>{
    return this.httpClient.get<Departamento[]>("http://localhost:8080/api/departamento")
  }
  getCargos(): Observable<any[]>{
    return this.httpClient.get<any[]>("http://localhost:8080/api/cargo")
  }
}
