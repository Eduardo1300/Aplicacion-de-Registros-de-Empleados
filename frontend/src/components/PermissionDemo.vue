<template>
  <div class="permission-demo">
    <div class="demo-header">
      <h2>🔐 Demo de Sistema RBAC</h2>
      <p class="subtitle">Demostración de permisos basados en roles</p>
    </div>

    <div class="demo-content">
      <!-- Información del Usuario -->
      <div class="info-section">
        <h3>👤 Información del Usuario</h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">Rol:</span>
            <span class="value">{{ userRole || 'N/A' }}</span>
          </div>
          <div class="info-item">
            <span class="label">Total Permisos:</span>
            <span class="value">{{ totalPermissions }}</span>
          </div>
          <div class="info-item">
            <span class="label">Es Admin:</span>
            <span class="value badge" :class="isAdmin ? 'badge-success' : 'badge-danger'">
              {{ isAdmin ? 'Sí' : 'No' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Verificación de Permisos -->
      <div class="permissions-section">
        <h3>🔑 Verificación de Permisos</h3>
        <div class="permissions-grid">
          <div class="permission-check" v-for="(perm, index) in permissionChecks" :key="index">
            <div class="permission-name">{{ perm.resource }}:{{ perm.action }}</div>
            <div class="permission-status">
              <span v-if="canAccess(perm.resource, perm.action)" class="badge badge-success">
                ✓ Permitido
              </span>
              <span v-else class="badge badge-danger">
                ✗ Denegado
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Ejemplos de Uso con v-can -->
      <div class="examples-section">
        <h3>📋 Ejemplos de Uso (v-can)</h3>

        <div class="example-group">
          <h4>Botones Condicionales</h4>
          <div class="button-group">
            <button v-can="'empleados:create'" class="btn btn-success">
              ➕ Crear Empleado
            </button>
            <button v-can="'empleados:update'" class="btn btn-primary">
              ✏️ Editar Empleado
            </button>
            <button v-can="'empleados:delete'" class="btn btn-danger">
              🗑️ Eliminar Empleado
            </button>
            <button v-can="'empleados:export'" class="btn btn-info">
              📥 Exportar Empleados
            </button>
          </div>
        </div>

        <div class="example-group">
          <h4>Permisos de Licencias</h4>
          <div class="button-group">
            <button v-can="'licencias:create'" class="btn btn-success">
              📝 Solicitar Licencia
            </button>
            <button v-can="'licencias:approve'" class="btn btn-success">
              ✅ Aprobar Licencia
            </button>
            <button v-can="'licencias:reject'" class="btn btn-warning">
              ❌ Rechazar Licencia
            </button>
          </div>
        </div>

        <div class="example-group">
          <h4>Gestión de Sistema</h4>
          <div class="button-group">
            <button v-can="'permissions:assign'" class="btn btn-danger">
              🔧 Asignar Permisos
            </button>
            <button v-can="'usuarios:create'" class="btn btn-danger">
              👥 Crear Usuario
            </button>
            <button v-can="'roles:update'" class="btn btn-danger">
              🎭 Editar Roles
            </button>
          </div>
        </div>
      </div>

      <!-- Lista de Todos los Permisos -->
      <div class="all-permissions-section">
        <h3>📚 Todos tus Permisos</h3>
        <div v-if="allPermissions.length > 0" class="permissions-list">
          <div v-for="perm in allPermissions" :key="`${perm.resource}-${perm.action}`" class="permission-item">
            <span class="resource">{{ perm.resource }}</span>
            <span class="separator">:</span>
            <span class="action">{{ perm.action }}</span>
          </div>
        </div>
        <p v-else class="empty-message">No hay permisos asignados</p>
      </div>

      <!-- Código de Ejemplo -->
      <div class="code-section">
        <h3>💻 Código de Ejemplo</h3>

        <div class="code-example">
          <h4>En un componente Vue:</h4>
          <pre><code>import { usePermissions } from '@/composables/usePermissions'

export default {
  setup() {
    const { canAccess } = usePermissions()
    
    return {
      canCreateEmpleado: canAccess('empleados', 'create'),
      canDeleteEmpleado: canAccess('empleados', 'delete'),
    }
  }
}</code></pre>
        </div>

        <div class="code-example">
          <h4>En un template Vue:</h4>
          <pre><code>&lt;button v-can="'empleados:create'"&gt;
  ➕ Crear Empleado
&lt;/button&gt;

&lt;button v-can="{ resource: 'empleados', action: 'delete' }"&gt;
  🗑️ Eliminar
&lt;/button&gt;</code></pre>
        </div>

        <div class="code-example">
          <h4>Usando permissionService:</h4>
          <pre><code>import permissionService from '@/services/permissionService'

// Verificar un permiso
if (permissionService.can('empleados', 'create')) {
  // Hacer algo
}

// Verificar múltiples (AND)
const can = permissionService.canAll([
  { resource: 'empleados', action: 'create' },
  { resource: 'empleados', action: 'update' }
])

// Verificar múltiples (OR)
const canDo = permissionService.canAny([
  { resource: 'empleados', action: 'delete' },
  { resource: 'empleados', action: 'create' }
])</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { usePermissions } from '../composables/usePermissions';
import permissionService from '../services/permissionService';

export default {
  name: 'PermissionDemo',
  setup() {
    const { canAccess, getPermissions } = usePermissions();

    const userRole = computed(() => permissionService.getRole());
    const isAdmin = computed(() => permissionService.isAdmin());
    const allPermissions = computed(() => getPermissions());
    const totalPermissions = computed(() => allPermissions.value.length);

    // Permisos a verificar
    const permissionChecks = [
      { resource: 'empleados', action: 'read' },
      { resource: 'empleados', action: 'create' },
      { resource: 'empleados', action: 'update' },
      { resource: 'empleados', action: 'delete' },
      { resource: 'empleados', action: 'export' },
      { resource: 'licencias', action: 'approve' },
      { resource: 'permissions', action: 'assign' },
      { resource: 'usuarios', action: 'create' },
    ];

    return {
      canAccess,
      userRole,
      isAdmin,
      allPermissions,
      totalPermissions,
      permissionChecks,
    };
  },
};
</script>

<style scoped>
.permission-demo {
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.demo-header {
  text-align: center;
  margin-bottom: 30px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 20px;
}

.demo-header h2 {
  margin: 0;
  font-size: 28px;
  font-weight: bold;
}

.subtitle {
  margin: 10px 0 0 0;
  opacity: 0.9;
  font-size: 14px;
}

.demo-content {
  display: grid;
  gap: 30px;
}

.info-section,
.permissions-section,
.examples-section,
.all-permissions-section,
.code-section {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

h3 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 18px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  padding-bottom: 10px;
}

h4 {
  margin-top: 0;
  font-size: 14px;
  color: #e0e0ff;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
}

.label {
  font-weight: 600;
  font-size: 13px;
}

.value {
  font-weight: bold;
  font-size: 14px;
}

.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
}

.badge-success {
  background: #4caf50;
  color: white;
}

.badge-danger {
  background: #f44336;
  color: white;
}

.permissions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 12px;
}

.permission-check {
  background: rgba(255, 255, 255, 0.05);
  padding: 12px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 3px solid #e0e0ff;
}

.permission-name {
  font-family: 'Courier New', monospace;
  font-size: 13px;
  font-weight: 500;
}

.permission-status {
  margin-left: 10px;
}

.example-group {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.example-group:last-child {
  margin-bottom: 0;
  border-bottom: none;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.btn {
  padding: 10px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn:hover:not([style*='display: none']) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.btn-success {
  background: #4caf50;
  color: white;
}

.btn-primary {
  background: #2196f3;
  color: white;
}

.btn-danger {
  background: #f44336;
  color: white;
}

.btn-warning {
  background: #ff9800;
  color: white;
}

.btn-info {
  background: #00bcd4;
  color: white;
}

.permissions-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}

.permission-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 12px;
  border-radius: 5px;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  border-left: 3px solid #4caf50;
}

.resource {
  font-weight: bold;
  color: #ffeb3b;
}

.separator {
  color: #e0e0ff;
  margin: 0 4px;
}

.action {
  color: #81c784;
}

.empty-message {
  text-align: center;
  padding: 20px;
  opacity: 0.7;
  font-style: italic;
}

.code-section {
  background: #1e1e2e;
  color: #e0e0ff;
}

.code-example {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.code-example:last-child {
  margin-bottom: 0;
  border-bottom: none;
}

.code-example h4 {
  color: #64b5f6;
  margin-bottom: 8px;
}

pre {
  background: rgba(0, 0, 0, 0.3);
  padding: 12px;
  border-radius: 5px;
  overflow-x: auto;
  margin: 0;
  font-size: 12px;
  line-height: 1.4;
  border-left: 3px solid #64b5f6;
}

code {
  font-family: 'Courier New', monospace;
  color: #a5d6ff;
}

@media (max-width: 768px) {
  .permission-demo {
    padding: 15px;
  }

  .demo-header h2 {
    font-size: 22px;
  }

  .info-grid,
  .permissions-grid {
    grid-template-columns: 1fr;
  }

  .button-group {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    text-align: center;
  }
}
</style>
