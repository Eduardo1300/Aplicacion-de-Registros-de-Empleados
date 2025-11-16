import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authToken = authService.getToken();

  // Agregar token a TODAS las requests de la API
  if (authToken && req.url.includes('http://localhost:8080/api/')) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
        'Accept': 'application/json;charset=UTF-8'
      }
    });
    console.log('Interceptor: Agregando token a', req.url);
    return next(authReq);
  }

  return next(req);
};