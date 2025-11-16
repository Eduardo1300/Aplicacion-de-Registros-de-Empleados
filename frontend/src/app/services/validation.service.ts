import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  constructor() {}

  // Email validation
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Phone validation (Perú format)
  isValidPhone(phone: string): boolean {
    const phoneRegex = /^(\+51|0)?[1-9]\d{8,9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  // DNI validation (Peru format)
  isValidDNI(dni: string): boolean {
    const dniRegex = /^\d{8}$/;
    return dniRegex.test(dni);
  }

  // Password strength validation
  isStrongPassword(password: string): boolean {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special char
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongRegex.test(password);
  }

  // Required field validation
  isNotEmpty(value: any): boolean {
    if (typeof value === 'string') {
      return value.trim().length > 0;
    }
    return value != null && value !== '';
  }

  // Min length validation
  minLength(value: string, length: number): boolean {
    return !!value && value.length >= length;
  }

  // Max length validation
  maxLength(value: string, length: number): boolean {
    return !!value && value.length <= length;
  }

  // Number validation
  isNumber(value: any): boolean {
    return !isNaN(value) && value !== '';
  }

  // Date validation
  isValidDate(dateString: string): boolean {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  }

  // URL validation
  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  // Get validation error message
  getErrorMessage(control: AbstractControl | null, fieldName: string): string {
    if (!control) return '';

    if (control.hasError('required')) {
      return `${fieldName} es requerido`;
    }
    if (control.hasError('minlength')) {
      return `${fieldName} debe tener al menos ${control.getError('minlength').requiredLength} caracteres`;
    }
    if (control.hasError('maxlength')) {
      return `${fieldName} no puede exceder ${control.getError('maxlength').requiredLength} caracteres`;
    }
    if (control.hasError('email')) {
      return `${fieldName} debe ser un email válido`;
    }
    if (control.hasError('pattern')) {
      return `${fieldName} tiene un formato inválido`;
    }

    return '';
  }
}
