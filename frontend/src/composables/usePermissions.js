import { ref, computed } from 'vue';

const permissions = ref([]);
const userRole = ref('');

export function usePermissions() {
  /**
   * Cargar permisos desde localStorage o desde el response del login
   */
  const loadPermissionsFromStorage = () => {
    try {
      const stored = localStorage.getItem('permissions');
      if (stored) {
        permissions.value = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading permissions from storage:', error);
      permissions.value = [];
    }
  };

  /**
   * Cargar permisos desde response de login
   */
  const setPermissions = (permissionsList, role = '') => {
    permissions.value = permissionsList || [];
    if (role) {
      userRole.value = role;
    }
    // Guardar en localStorage
    localStorage.setItem('permissions', JSON.stringify(permissions.value));
    if (role) {
      localStorage.setItem('userRole', role);
    }
  };

  /**
   * Verificar si el usuario tiene permiso para una acción en un recurso
   * @param {string} resource - Nombre del recurso (ej: 'empleados')
   * @param {string} action - Nombre de la acción (ej: 'create', 'edit', 'delete')
   * @returns {boolean} true si tiene permiso, false en caso contrario
   */
  const canAccess = (resource, action) => {
    if (!resource || !action) {
      return false;
    }

    // Cargar desde storage si está vacío
    if (permissions.value.length === 0) {
      loadPermissionsFromStorage();
    }

    // Si es ADMIN, tiene acceso a todo
    const role = userRole.value || localStorage.getItem('userRole');
    if (role === 'ADMIN') {
      return true;
    }

    // Buscar el permiso
    return permissions.value.some(
      (perm) => perm.resource === resource && perm.action === action
    );
  };

  /**
   * Verificar múltiples permisos (AND lógico)
   */
  const canAccessAll = (permissionsArray) => {
    return permissionsArray.every(({ resource, action }) =>
      canAccess(resource, action)
    );
  };

  /**
   * Verificar múltiples permisos (OR lógico)
   */
  const canAccessAny = (permissionsArray) => {
    return permissionsArray.some(({ resource, action }) =>
      canAccess(resource, action)
    );
  };

  /**
   * Obtener todos los permisos
   */
  const getPermissions = () => {
    if (permissions.value.length === 0) {
      loadPermissionsFromStorage();
    }
    return permissions.value;
  };

  /**
   * Limpiar permisos (logout)
   */
  const clearPermissions = () => {
    permissions.value = [];
    userRole.value = '';
    localStorage.removeItem('permissions');
    localStorage.removeItem('userRole');
  };

  /**
   * Obtener permisos de un recurso específico
   */
  const getResourcePermissions = (resource) => {
    return getPermissions()
      .filter((perm) => perm.resource === resource)
      .map((perm) => perm.action);
  };

  return {
    permissions: computed(() => permissions.value),
    userRole: computed(() => userRole.value),
    loadPermissionsFromStorage,
    setPermissions,
    canAccess,
    canAccessAll,
    canAccessAny,
    getPermissions,
    clearPermissions,
    getResourcePermissions,
  };
}
