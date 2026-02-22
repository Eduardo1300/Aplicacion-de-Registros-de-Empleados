import { Injectable } from '@nestjs/common';

@Injectable()
export class RateLimitService {
  private requests: Map<string, number[]> = new Map();
  private readonly windowMs = 15 * 60 * 1000; // 15 minutos
  private readonly maxRequests = 100; // máximo 100 requests por ventana

  isAllowed(key: string): boolean {
    const now = Date.now();
    const userRequests = this.requests.get(key) || [];

    // Limpiar requests fuera de la ventana
    const validRequests = userRequests.filter(time => now - time < this.windowMs);

    if (validRequests.length >= this.maxRequests) {
      return false;
    }

    validRequests.push(now);
    this.requests.set(key, validRequests);

    return true;
  }

  getRemainingTime(key: string): number {
    const userRequests = this.requests.get(key) || [];
    if (userRequests.length === 0) return this.maxRequests;
    
    const oldestRequest = Math.min(...userRequests);
    const resetTime = oldestRequest + this.windowMs;
    return Math.max(0, resetTime - Date.now());
  }

  getRequestCount(key: string): number {
    const userRequests = this.requests.get(key) || [];
    return userRequests.length;
  }
}
