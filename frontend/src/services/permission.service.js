/**
 * Servicio de Permisos y Roles
 * Control de acceso basado en roles (RBAC)
 */

import { ref, computed } from 'vue'

// Tipos de roles
export const ROLES = {
  ADMIN: 'ADMIN',
  GERENTE: 'GERENTE',
  RECURSOS_HUMANOS: 'RECURSOS_HUMANOS',
  EMPLEADO: 'EMPLEADO'
}

// Permisos disponibles
export const PERMISOS = {
  // Empleados
  CREAR_EMPLEADO: 'crear_empleado',
  EDITAR_EMPLEADO: 'editar_empleado',
  ELIMINAR_EMPLEADO: 'eliminar_empleado',
  VER_EMPLEADOS: 'ver_empleados',
  EXPORTAR_EMPLEADOS: 'exportar_empleados',
  
  // Asistencias
  VER_ASISTENCIAS: 'ver_asistencias',
  REGISTRAR_ASISTENCIA: 'registrar_asistencia',
  EDITAR_ASISTENCIA: 'editar_asistencia',
  EXPORTAR_ASISTENCIAS: 'exportar_asistencias',
  
  // Licencias
  VER_LICENCIAS: 'ver_licencias',
  SOLICITAR_LICENCIA: 'solicitar_licencia',
  APROBAR_LICENCIA: 'aprobar_licencia',
  RECHAZAR_LICENCIA: 'rechazar_licencia',
  
  // Auditoría
  VER_AUDITORIA: 'ver_auditoria',
  EXPORTAR_AUDITORIA: 'exportar_auditoria',
  
  // Reportes
  VER_REPORTES: 'ver_reportes',
  GENERAR_REPORTES: 'generar_reportes',
  EXPORTAR_REPORTES: 'exportar_reportes',
  
  // Administración
  MANAGE_USERS: 'manage_users',
  MANAGE_ROLES: 'manage_roles',
  MANAGE_SETTINGS: 'manage_settings',
  VER_DASHBOARD_ADMIN: 'ver_dashboard_admin'
}

// Mapeo de roles a permisos
export const PERMISOS_POR_ROL = {
  [ROLES.ADMIN]: Object.values(PERMISOS), // Todo
  
  [ROLES.GERENTE]: [
    PERMISOS.VER_EMPLEADOS,
    PERMISOS.CREAR_EMPLEADO,
    PERMISOS.EDITAR_EMPLEADO,
    PERMISOS.EXPORTAR_EMPLEADOS,
    PERMISOS.VER_ASISTENCIAS,
    PERMISOS.EDITAR_ASISTENCIA,
    PERMISOS.EXPORTAR_ASISTENCIAS,
    PERMISOS.VER_LICENCIAS,
    PERMISOS.APROBAR_LICENCIA,
    PERMISOS.RECHAZAR_LICENCIA,
    PERMISOS.VER_AUDITORIA,
    PERMISOS.VER_REPORTES,
    PERMISOS.GENERAR_REPORTES,
    PERMISOS.EXPORTAR_REPORTES
  ],
  
  [ROLES.RECURSOS_HUMANOS]: [
    PERMISOS.VER_EMPLEADOS,
    PERMISOS.CREAR_EMPLEADO,
    PERMISOS.EDITAR_EMPLEADO,
    PERMISOS.EXPORTAR_EMPLEADOS,
    PERMISOS.VER_ASISTENCIAS,
    PERMISOS.REGISTRAR_ASISTENCIA,
    PERMISOS.EDITAR_ASISTENCIA,
    PERMISOS.EXPORTAR_ASISTENCIAS,
    PERMISOS.VER_LICENCIAS,
    PERMISOS.APROBAR_LICENCIA,
    PERMISOS.VER_AUDITORIA,
    PERMISOS.VER_REPORTES,
    PERMISOS.GENERAR_REPORTES,
    PERMISOS.EXPORTAR_REPORTES
  ],
  
  [ROLES.EMPLEADO]: [
    PERMISOS.VER_EMPLEADOS,
    PERMISOS.VER_ASISTENCIAS,
    PERMISOS.VER_LICENCIAS,
    PERMISOS.SOLICITAR_LICENCIA
  ]
}

// Estado reactivo del usuario
const usuarioActual = ref(null)

/**
 * Establecer usuario actual con su rol
 */
export const setUsuarioActual = (usuario) => {
  usuarioActual.value = usuario
}

/**
 * Obtener usuario actual
 */
export const getUsuarioActual = () => usuarioActual.value

/**
 * Obtener rol del usuario actual
 */
export const getRolActual = () => usuarioActual.value?.rol || null

/**
 * Verificar si usuario tiene permiso
 */
export const tienePermiso = (permiso) => {
  if (!usuarioActual.value) return false
  
  const rol = usuarioActual.value.rol
  const permisosDelRol = PERMISOS_POR_ROL[rol] || []
  
  return permisosDelRol.includes(permiso)
}

/**
 * Verificar si usuario tiene todos los permisos
 */
export const tieneTodosLosPermisos = (permisos) => {
  return Array.isArray(permisos) 
    ? permisos.every(p => tienePermiso(p))
    : tienePermiso(permisos)
}

/**
 * Verificar si usuario tiene alguno de los permisos
 */
export const tieneAlgunPermiso = (permisos) => {
  return Array.isArray(permisos)
    ? permisos.some(p => tienePermiso(p))
    : tienePermiso(permisos)
}

/**
 * Verificar si es admin
 */
export const esAdmin = () => getRolActual() === ROLES.ADMIN

/**
 * Verificar si es gerente
 */
export const esGerente = () => getRolActual() === ROLES.GERENTE

/**
 * Verificar si es RH
 */
export const esRH = () => getRolActual() === ROLES.RECURSOS_HUMANOS

/**
 * Obtener todos los permisos del usuario actual
 */
export const getPermisosUsuario = () => {
  const rol = getRolActual()
  return PERMISOS_POR_ROL[rol] || []
}

/**
 * Composable para usar en componentes
 */
export const usePermissions = () => {
  const rol = computed(() => getRolActual())
  
  const puede = (permiso) => tienePermiso(permiso)
  
  const puedeCrear = (recurso) => tienePermiso(`crear_${recurso}`)
  const puedeEditar = (recurso) => tienePermiso(`editar_${recurso}`)
  const puedeEliminar = (recurso) => tienePermiso(`eliminar_${recurso}`)
  const puedeVer = (recurso) => tienePermiso(`ver_${recurso}`)
  const puedeExportar = (recurso) => tienePermiso(`exportar_${recurso}`)
  
  return {
    rol,
    puede,
    puedeCrear,
    puedeEditar,
    puedeEliminar,
    puedeVer,
    puedeExportar,
    esAdmin,
    esGerente,
    esRH,
    permisosUsuario: computed(() => getPermisosUsuario())
  }
}

/**
 * Directiva v-can para mostrar elementos basado en permisos
 * Uso: v-can="PERMISOS.VER_EMPLEADOS"
 */
export const vCan = {
  mounted(el, binding) {
    if (!tienePermiso(binding.value)) {
      el.style.display = 'none'
      el.dataset.hiddenByPermission = 'true'
    }
  },
  updated(el, binding) {
    if (!tienePermiso(binding.value)) {
      el.style.display = 'none'
      el.dataset.hiddenByPermission = 'true'
    } else {
      el.style.display = ''
      delete el.dataset.hiddenByPermission
    }
  }
}
