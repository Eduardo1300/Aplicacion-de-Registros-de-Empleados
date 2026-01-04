import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionService } from '../modules/permission/permission.service';

@Injectable()
export class RequirePermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permissionService: PermissionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { resource, action } = this.reflector.get<{ resource: string; action: string }>(
      'permissions',
      context.getHandler(),
    ) || {};

    if (!resource || !action) {
      // Si no hay permisos definidos, permitir el acceso
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Usuario no autenticado');
    }

    const hasPermission = await this.permissionService.canUserAccess(user, resource, action);

    if (!hasPermission) {
      throw new ForbiddenException(`No tienes permisos para: ${resource}:${action}`);
    }

    return true;
  }
}
