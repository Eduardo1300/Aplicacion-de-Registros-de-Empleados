import { usePermissions } from '../composables/usePermissions';

/**
 * Directiva v-can para mostrar/ocultar elementos basado en permisos
 * Uso: v-can="'resource:action'" o v-can="{ resource: 'empleados', action: 'create' }"
 */
export const vCan = {
  mounted(el, binding) {
    const { canAccess } = usePermissions();
    let hasPermission = false;

    if (typeof binding.value === 'string') {
      // Formato: 'resource:action'
      const [resource, action] = binding.value.split(':');
      hasPermission = canAccess(resource, action);
    } else if (typeof binding.value === 'object') {
      // Formato: { resource: 'empleados', action: 'create' }
      hasPermission = canAccess(binding.value.resource, binding.value.action);
    }

    if (!hasPermission) {
      el.style.display = 'none';
      el.setAttribute('aria-hidden', 'true');
    }
  },
  updated(el, binding) {
    // Re-evaluar permisos si la directiva se actualiza
    const { canAccess } = usePermissions();
    let hasPermission = false;

    if (typeof binding.value === 'string') {
      const [resource, action] = binding.value.split(':');
      hasPermission = canAccess(resource, action);
    } else if (typeof binding.value === 'object') {
      hasPermission = canAccess(binding.value.resource, binding.value.action);
    }

    if (!hasPermission) {
      el.style.display = 'none';
      el.setAttribute('aria-hidden', 'true');
    } else {
      el.style.display = '';
      el.removeAttribute('aria-hidden');
    }
  },
};
