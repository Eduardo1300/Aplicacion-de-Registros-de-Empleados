import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { RateLimitService } from './rate-limit.service';

@Injectable()
export class RateLimitGuard implements CanActivate {
  constructor(private rateLimitService: RateLimitService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    // Obtener IP del cliente o usar token de usuario
    const key = request.user?.id || request.ip || request.headers['x-forwarded-for'] || 'unknown';

    // Verificar si se permite
    if (!this.rateLimitService.isAllowed(key)) {
      const retryAfter = Math.ceil(this.rateLimitService.getRemainingTime(key) / 1000);
      
      response.setHeader('Retry-After', retryAfter);
      response.setHeader('X-RateLimit-Limit', 100);
      response.setHeader('X-RateLimit-Remaining', 0);
      
      throw new HttpException(
        {
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
          message: `Demasiadas solicitudes. Intenta de nuevo en ${retryAfter} segundos.`,
          retryAfter,
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    // Agregar headers de rate limit
    response.setHeader('X-RateLimit-Limit', 100);
    response.setHeader(
      'X-RateLimit-Remaining',
      100 - this.rateLimitService.getRequestCount(key)
    );

    return true;
  }
}
