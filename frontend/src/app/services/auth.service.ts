import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface AuthResponse {
  token: string;
  nombreUsuario: string;
  rol: string;
  empleadoNombre: string;
  empleadoId: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly USERNAME_KEY = 'AUTH_USERNAME';
  private readonly EMPLEADO_ID_KEY = 'EMPLEADO_ID';
  private readonly API_URL = 'http://localhost:8080/api/auth';

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) {}

  login(nombre: string, clave: string): Observable<AuthResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, { nombreUsuario: nombre, clave: clave }, { headers })
      .pipe(
        tap(response => {
          this.storeSession(response.token, nombre, response.empleadoId);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.USERNAME_KEY);
    localStorage.removeItem(this.EMPLEADO_ID_KEY);
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.JWT_TOKEN);
  }

  private storeSession(token: string, username: string, empleadoId?: number): void {
    localStorage.setItem(this.JWT_TOKEN, token);
    localStorage.setItem(this.USERNAME_KEY, username);
    if (empleadoId) {
      localStorage.setItem(this.EMPLEADO_ID_KEY, empleadoId.toString());
      console.log('EmpleadoId guardado en localStorage:', empleadoId);
    }
    this.loggedIn.next(true);
  }

  getUsuarioActual(): { nombre: string } | null {
    const username = localStorage.getItem(this.USERNAME_KEY);
    if (this.hasToken() && username) {
        return { nombre: username }; 
    }
    return null;
  }

  getRolActual(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      if (decoded.role) return decoded.role;
      return null;
    } catch (e) {
      console.error('Error decodificando JWT:', e);
      return null;
    }
  }
  
  getEmpleadoIdActual(): number | null {
    const empleadoIdStored = localStorage.getItem(this.EMPLEADO_ID_KEY);
    if (empleadoIdStored) {
      return Number(empleadoIdStored);
    }

    const token = this.getToken();
    if (!token) {
      return null;
    }
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      if (decoded.empleadoId) {
        const id = Number(decoded.empleadoId);
        localStorage.setItem(this.EMPLEADO_ID_KEY, id.toString());
        return id;
      }
      return null;
    } catch (e) {
      console.error('Error decodificando JWT:', e);
      return null;
    }
  }
}