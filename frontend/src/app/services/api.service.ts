import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, finalize, filter, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private http: HttpClient,
    private logger: LoggerService
  ) {}

  // GET request
  get<T>(endpoint: string, params?: any, options?: any): Observable<T> {
    this.loadingSubject.next(true);
    let httpParams = new HttpParams();
    
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }

    this.logger.log(`GET ${endpoint}`, params);
    const getOptions = { params: httpParams, observe: 'body' as const, ...options };
    return (this.http.get<T>(`${this.apiUrl}${endpoint}`, getOptions) as Observable<T>)
      .pipe(
        catchError(error => this.handleError(error)),
        finalize(() => this.loadingSubject.next(false))
      );
  }

  // POST request
  post<T>(endpoint: string, body: any, options?: any): Observable<T> {
    this.loadingSubject.next(true);
    this.logger.log(`POST ${endpoint}`, body);
    const postOptions = { observe: 'body' as const, ...options };
    return (this.http.post<T>(`${this.apiUrl}${endpoint}`, body, postOptions) as Observable<T>)
      .pipe(
        catchError(error => this.handleError(error)),
        finalize(() => this.loadingSubject.next(false))
      );
  }

  // PUT request
  put<T>(endpoint: string, body: any, options?: any): Observable<T> {
    this.loadingSubject.next(true);
    this.logger.log(`PUT ${endpoint}`, body);
    const putOptions = { observe: 'body' as const, ...options };
    return (this.http.put<T>(`${this.apiUrl}${endpoint}`, body, putOptions) as Observable<T>)
      .pipe(
        catchError(error => this.handleError(error)),
        finalize(() => this.loadingSubject.next(false))
      );
  }

  // PATCH request
  patch<T>(endpoint: string, body: any, options?: any): Observable<T> {
    this.loadingSubject.next(true);
    this.logger.log(`PATCH ${endpoint}`, body);
    const patchOptions = { observe: 'body' as const, ...options };
    return (this.http.patch<T>(`${this.apiUrl}${endpoint}`, body, patchOptions) as Observable<T>)
      .pipe(
        catchError(error => this.handleError(error)),
        finalize(() => this.loadingSubject.next(false))
      );
  }

  // DELETE request
  delete<T>(endpoint: string, options?: any): Observable<T> {
    this.loadingSubject.next(true);
    this.logger.log(`DELETE ${endpoint}`);
    const deleteOptions = { observe: 'body' as const, ...options };
    return (this.http.delete<T>(`${this.apiUrl}${endpoint}`, deleteOptions) as Observable<T>)
      .pipe(
        catchError(error => this.handleError(error)),
        finalize(() => this.loadingSubject.next(false))
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Un error ha ocurrido';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
      this.logger.error('Client-side error', error.error);
    } else {
      errorMessage = error.error?.message || `Error ${error.status}: ${error.statusText}`;
      this.logger.error(`Server error ${error.status}`, errorMessage);
    }

    return throwError(() => new Error(errorMessage));
  }

  isLoading(): Observable<boolean> {
    return this.loading$;
  }
}
