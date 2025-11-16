  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { Departamento } from './Departamento';

  @Injectable({
    providedIn: 'root'
  })
  export class LstdepartamentoService {
    private apiUrl = 'http://localhost:8080/api/departamento';

    constructor(private http: HttpClient) { }

    getDepartamentos(): Observable<Departamento[]> {
      return this.http.get<Departamento[]>(this.apiUrl);
    }

    getDepartamentoById(id: number): Observable<Departamento> {
      return this.http.get<Departamento>(`${this.apiUrl}/${id}`);
    }

    agregarDepartamento(departamento: Partial<Departamento>): Observable<Departamento> {
      return this.http.post<Departamento>(this.apiUrl, departamento);
    }

    deleteDepartamento(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`);
    }

    actualizarDepartamento(id: number, departamento: Partial<Departamento>): Observable<Departamento> {
      return this.http.put<Departamento>(`${this.apiUrl}/${id}`, departamento);
    }
  }
