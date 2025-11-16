import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TipoLicencia {
  id?: number;
  nombre: string;
  descripcion?: string;
  diasDisponibles: number;
  requiereAprobacion?: boolean;
  puedeAcumularse?: boolean;
  requiereDocumento?: boolean;
  activo?: boolean;
}

export interface SolicitudLicencia {
  id?: number;
  empleadoId: number;
  tipoLicenciaId: number;
  fechaInicio: Date;
  fechaFin: Date;
  diasSolicitados: number;
  razon: string;
  documentoAdjunto?: string;
  estado?: string;
  usuarioAprobadorId?: number;
  fechaSolicitud?: Date;
  observaciones?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LicenciaService {
  private apiUrlTipos = 'http://localhost:8080/api/v1/tipos-licencia';
  private apiUrlSolicitudes = 'http://localhost:8080/api/v1/solicitudes-licencia';

  constructor(private http: HttpClient) {}

  // Tipos de Licencia
  crearTipoLicencia(tipo: TipoLicencia): Observable<TipoLicencia> {
    return this.http.post<TipoLicencia>(this.apiUrlTipos, tipo);
  }

  listarTiposLicencia(): Observable<TipoLicencia[]> {
    return this.http.get<TipoLicencia[]>(this.apiUrlTipos);
  }

  listarTiposLicenciaActivos(): Observable<TipoLicencia[]> {
    return this.http.get<TipoLicencia[]>(`${this.apiUrlTipos}/activos`);
  }

  obtenerTipoLicencia(id: number): Observable<TipoLicencia> {
    return this.http.get<TipoLicencia>(`${this.apiUrlTipos}/${id}`);
  }

  actualizarTipoLicencia(id: number, tipo: TipoLicencia): Observable<TipoLicencia> {
    return this.http.put<TipoLicencia>(`${this.apiUrlTipos}/${id}`, tipo);
  }

  eliminarTipoLicencia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlTipos}/${id}`);
  }

  // Solicitudes de Licencia
  crearSolicitudLicencia(solicitud: SolicitudLicencia): Observable<SolicitudLicencia> {
    return this.http.post<SolicitudLicencia>(this.apiUrlSolicitudes, solicitud);
  }

  listarSolicitudesLicencia(): Observable<SolicitudLicencia[]> {
    return this.http.get<SolicitudLicencia[]>(this.apiUrlSolicitudes);
  }

  listarSolicitudesPendientes(): Observable<SolicitudLicencia[]> {
    return this.http.get<SolicitudLicencia[]>(`${this.apiUrlSolicitudes}/pendientes`);
  }

  listarSolicitudesPorEmpleado(empleadoId: number): Observable<SolicitudLicencia[]> {
    return this.http.get<SolicitudLicencia[]>(`${this.apiUrlSolicitudes}/empleado/${empleadoId}`);
  }

  obtenerSolicitud(id: number): Observable<SolicitudLicencia> {
    return this.http.get<SolicitudLicencia>(`${this.apiUrlSolicitudes}/${id}`);
  }

  aprobarSolicitud(id: number): Observable<SolicitudLicencia> {
    return this.http.put<SolicitudLicencia>(`${this.apiUrlSolicitudes}/${id}/aprobar`, {});
  }

  rechazarSolicitud(id: number, observaciones: string): Observable<SolicitudLicencia> {
    return this.http.put<SolicitudLicencia>(`${this.apiUrlSolicitudes}/${id}/rechazar`, observaciones);
  }

  eliminarSolicitud(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlSolicitudes}/${id}`);
  }
}
