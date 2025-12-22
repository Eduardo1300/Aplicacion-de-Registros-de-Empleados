import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asistencia } from './asistencia';
import { AsistenciaModel } from '../../Model/AsistenciaModel'

@Injectable({
  providedIn: 'root'
})
export class AsistenciaserviceService {

  constructor(private httpClient: HttpClient) { }
  getAllAsistencia(): Observable<Asistencia[]>{
    return this.httpClient.get<Asistencia[]>("http://localhost:3000/api/asistencia");
  }
  getAsistenciaById(id: number): Observable<Asistencia>{
    return this.httpClient.get<Asistencia>("http://localhost:8080/api/asistencia/"+id);
  }
  saveAsistencia(asistencia: AsistenciaModel): Observable<Asistencia>{
    return this.httpClient.post<Asistencia>("http://localhost:8080/api/asistencia",asistencia);
  }
  updateAsistencia(id: number): Observable<any>{
    return this.httpClient.patch(`http://localhost:8080/api/asistencia/${id}`,{});
  }
  getAsistenciaHoy(): Observable<Asistencia[]>{
    return this.httpClient.get<Asistencia[]>("http://localhost:8080/api/asistencia/hoy")
  }
}
