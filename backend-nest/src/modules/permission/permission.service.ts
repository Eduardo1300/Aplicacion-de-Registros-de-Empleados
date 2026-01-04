import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../../entities/permission.entity';
import { RolePermission } from '../../entities/role-permission.entity';
import { Usuario } from '../../entities/usuario.entity';
import { Rol } from '../../entities/rol.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    @InjectRepository(RolePermission)
    private rolePermissionRepository: Repository<RolePermission>,
    @InjectRepository(Rol)
    private rolRepository: Repository<Rol>,
  ) {}

  /**
   * Verificar si un usuario tiene permiso para una acción sobre un recurso
   */
  async canUserAccess(user: Usuario, resource: string, action: string): Promise<boolean> {
    if (!user || !user.rol) {
      return false;
    }

    // Los ADMIN tienen acceso a todo
    if (user.rol.nombre === 'ADMIN') {
      return true;
    }

    const rolePermissions = await this.rolePermissionRepository.find({
      where: {
        rol: { id: user.rol.id },
        permission: { resource, action },
      },
    });

    return rolePermissions.length > 0;
  }

  /**
   * Obtener todos los permisos
   */
  async getAllPermissions(): Promise<Permission[]> {
    return this.permissionRepository.find();
  }

  /**
   * Crear un nuevo permiso
   */
  async createPermission(resource: string, action: string, descripcion?: string): Promise<Permission> {
    const existing = await this.permissionRepository.findOne({
      where: { resource, action },
    });

    if (existing) {
      throw new BadRequestException(`El permiso ${resource}:${action} ya existe`);
    }

    const permission = this.permissionRepository.create({
      resource,
      action,
      descripcion,
    });

    return this.permissionRepository.save(permission);
  }

  /**
   * Obtener permisos de un rol
   */
  async getRolePermissions(rolId: number): Promise<Permission[]> {
    const rolePermissions = await this.rolePermissionRepository.find({
      where: { rol: { id: rolId } },
      relations: ['permission'],
    });

    return rolePermissions.map((rp) => rp.permission);
  }

  /**
   * Asignar permiso a un rol
   */
  async assignPermissionToRole(rolId: number, permissionId: number): Promise<RolePermission> {
    const rol = await this.rolRepository.findOne({ where: { id: rolId } });
    if (!rol) {
      throw new BadRequestException(`Rol con ID ${rolId} no encontrado`);
    }

    const permission = await this.permissionRepository.findOne({ where: { id: permissionId } });
    if (!permission) {
      throw new BadRequestException(`Permiso con ID ${permissionId} no encontrado`);
    }

    const existing = await this.rolePermissionRepository.findOne({
      where: { rol: { id: rolId }, permission: { id: permissionId } },
    });

    if (existing) {
      throw new BadRequestException(`El rol ya tiene este permiso`);
    }

    const rolePermission = this.rolePermissionRepository.create({
      rol,
      permission,
    });

    return this.rolePermissionRepository.save(rolePermission);
  }

  /**
   * Remover permiso de un rol
   */
  async removePermissionFromRole(rolId: number, permissionId: number): Promise<void> {
    await this.rolePermissionRepository.delete({
      rol: { id: rolId },
      permission: { id: permissionId },
    });
  }

  /**
   * Obtener todos los permisos de un rol con relaciones completas
   */
  async getRolePermissionsDetailed(rolId: number): Promise<RolePermission[]> {
    return this.rolePermissionRepository.find({
      where: { rol: { id: rolId } },
      relations: ['permission'],
    });
  }

  /**
   * Eliminar un permiso
   */
  async deletePermission(permissionId: number): Promise<void> {
    await this.permissionRepository.delete(permissionId);
  }

  /**
   * Actualizar un permiso
   */
  async updatePermission(permissionId: number, resource: string, action: string, descripcion: string): Promise<Permission> {
    const permission = await this.permissionRepository.findOne({ where: { id: permissionId } });

    if (!permission) {
      throw new BadRequestException(`Permiso con ID ${permissionId} no encontrado`);
    }

    permission.resource = resource;
    permission.action = action;
    permission.descripcion = descripcion;

    return this.permissionRepository.save(permission);
  }
}
