import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private isDevelopment = !environment.production;

  constructor() {}

  log(message: string, data?: any): void {
    if (this.isDevelopment) {
      console.log(`[LOG] ${message}`, data || '');
    }
    // TODO: Send to backend logging service in production
  }

  error(message: string, error?: any): void {
    console.error(`[ERROR] ${message}`, error || '');
    // TODO: Send to error tracking service (Sentry, etc.)
  }

  warn(message: string, data?: any): void {
    console.warn(`[WARN] ${message}`, data || '');
  }

  info(message: string, data?: any): void {
    console.info(`[INFO] ${message}`, data || '');
  }
}
