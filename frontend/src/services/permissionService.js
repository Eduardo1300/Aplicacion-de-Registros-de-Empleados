import { usePermissions } from '../composables/usePermissions';

/**
 * Servicio de Permisos para Vue
 * Proporciona métodos para trabajar con permisos de usuario
 */
class PermissionService {
  constructor() {
    this.permissions = usePermissions();
  }

  /**
   * Inicializar permisos desde respuesta de login
   */
  initializeFromLogin(loginResponse) {
    const permisos = loginResponse.permisos || [];
    const rol = loginResponse.rol || '';
    this.permissions.setPermissions(permisos, rol);
  }

  /**
   * Cargar permisos desde localStorage
   */
  loadFromStorage() {
    this.permissions.loadPermissionsFromStorage();
  }

  /**
   * Verificar permiso individual
   */
  can(resource, action) {
    return this.permissions.canAccess(resource, action);
  }

  /**
   * Verificar si tiene TODOS los permisos (AND)
   */
  canAll(permissionsList) {
    return this.permissions.canAccessAll(permissionsList);
  }

  /**
   * Verificar si tiene ALGUNO de los permisos (OR)
   */
  canAny(permissionsList) {
    return this.permissions.canAccessAny(permissionsList);
  }

  /**
   * Obtener todos los permisos
   */
  getAll() {
    return this.permissions.getPermissions();
  }

  /**
   * Obtener rol del usuario
   */
  getRole() {
    return this.permissions.userRole.value || localStorage.getItem('userRole');
  }

  /**
   * Limpiar permisos (logout)
   */
  clear() {
    this.permissions.clearPermissions();
  }

  /**
   * Obtener permisos de un recurso
   */
  getResourcePermissions(resource) {
    return this.permissions.getResourcePermissions(resource);
  }

  /**
   * Verificar si es ADMIN
   */
  isAdmin() {
    return this.getRole() === 'ADMIN';
  }
}

export default new PermissionService();
