import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { Permission } from '../../entities/permission.entity';
import { RolePermission } from '../../entities/role-permission.entity';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('permissions')
@UseGuards(JwtAuthGuard)
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Get()
  async getAllPermissions(): Promise<Permission[]> {
    return this.permissionService.getAllPermissions();
  }

  @Post()
  async createPermission(
    @Body() data: { resource: string; action: string; descripcion?: string },
  ): Promise<Permission> {
    return this.permissionService.createPermission(data.resource, data.action, data.descripcion);
  }

  @Put(':id')
  async updatePermission(
    @Param('id') id: number,
    @Body() data: { resource: string; action: string; descripcion: string },
  ): Promise<Permission> {
    return this.permissionService.updatePermission(id, data.resource, data.action, data.descripcion);
  }

  @Delete(':id')
  async deletePermission(@Param('id') id: number): Promise<void> {
    return this.permissionService.deletePermission(id);
  }

  @Get('role/:rolId')
  async getRolePermissions(@Param('rolId') rolId: number): Promise<Permission[]> {
    return this.permissionService.getRolePermissions(rolId);
  }

  @Post('role/:rolId/assign/:permissionId')
  async assignPermissionToRole(
    @Param('rolId') rolId: number,
    @Param('permissionId') permissionId: number,
  ): Promise<RolePermission> {
    return this.permissionService.assignPermissionToRole(rolId, permissionId);
  }

  @Delete('role/:rolId/remove/:permissionId')
  async removePermissionFromRole(
    @Param('rolId') rolId: number,
    @Param('permissionId') permissionId: number,
  ): Promise<void> {
    return this.permissionService.removePermissionFromRole(rolId, permissionId);
  }

  @Get('role/:rolId/detailed')
  async getRolePermissionsDetailed(@Param('rolId') rolId: number): Promise<RolePermission[]> {
    return this.permissionService.getRolePermissionsDetailed(rolId);
  }
}
