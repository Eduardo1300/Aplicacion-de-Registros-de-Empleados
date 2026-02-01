<template>
  <EmpleadoLayout>
    <div class="mi-perfil-container">
      <h1>Mi Perfil</h1>

      <div class="perfil-grid">
        <div class="perfil-card info-card">
          <div class="perfil-header">
            <div class="avatar">
              {{ getInitials }}
            </div>
            <div class="perfil-nombre">
              <h2>{{ empleado?.nombre }} {{ empleado?.apellido }}</h2>
              <span>{{ empleado?.cargo?.nombre || 'Empleado' }}</span>
            </div>
          </div>

          <div class="info-section">
            <h3>Datos Personales</h3>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">DNI</span>
                <span class="value">{{ empleado?.dni }}</span>
              </div>
              <div class="info-item">
                <span class="label">Correo</span>
                <span class="value">{{ empleado?.correo || '-' }}</span>
              </div>
              <div class="info-item">
                <span class="label">Teléfono</span>
                <span class="value">{{ empleado?.telefono || '-' }}</span>
              </div>
              <div class="info-item">
                <span class="label">Estado</span>
                <span class="value estado" :class="empleado?.estado?.toLowerCase()">
                  {{ empleado?.estado || '-' }}
                </span>
              </div>
            </div>
          </div>

          <div class="info-section">
            <h3>Datos Laborales</h3>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">Departamento</span>
                <span class="value">{{ empleado?.departamento?.nombre || '-' }}</span>
              </div>
              <div class="info-item">
                <span class="label">Cargo</span>
                <span class="value">{{ empleado?.cargo?.nombre || '-' }}</span>
              </div>
              <div class="info-item">
                <span class="label">Fecha de Ingreso</span>
                <span class="value">{{ formatDate(empleado?.fecha_ingreso) }}</span>
              </div>
              <div class="info-item">
                <span class="label">Vacaciones</span>
                <span class="value">{{ empleado?.dias_vacaciones_usados || 0 }} / 15 días</span>
              </div>
            </div>
          </div>
        </div>

        <div class="perfil-card actions-card">
          <div class="action-section">
            <h3>Editar Información</h3>
            <form @submit.prevent="guardarPerfil" class="edit-form">
              <div class="form-group">
                <label>Correo Electrónico</label>
                <input v-model="form.correo" type="email" class="form-input" />
              </div>
              <div class="form-group">
                <label>Teléfono</label>
                <input v-model="form.telefono" type="tel" class="form-input" />
              </div>
              <button type="submit" class="btn-save" :disabled="loading">
                <span v-if="loading">Guardando...</span>
                <span v-else><i class="bi bi-check-lg"></i> Guardar Cambios</span>
              </button>
            </form>
          </div>

          <div class="action-section">
            <h3>Cambiar Contraseña</h3>
            <form @submit.prevent="cambiarPassword" class="password-form">
              <div class="form-group">
                <label>Contraseña Actual</label>
                <div class="password-input">
                  <input
                    v-model="passwordForm.actual"
                    :type="showPassword.actual ? 'text' : 'password'"
                    class="form-input"
                  />
                  <button type="button" @click="showPassword.actual = !showPassword.actual">
                    <i :class="showPassword.actual ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                  </button>
                </div>
              </div>
              <div class="form-group">
                <label>Nueva Contraseña</label>
                <div class="password-input">
                  <input
                    v-model="passwordForm.nueva"
                    :type="showPassword.nueva ? 'text' : 'password'"
                    class="form-input"
                  />
                  <button type="button" @click="showPassword.nueva = !showPassword.nueva">
                    <i :class="showPassword.nueva ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                  </button>
                </div>
              </div>
              <div class="form-group">
                <label>Confirmar Contraseña</label>
                <div class="password-input">
                  <input
                    v-model="passwordForm.confirmar"
                    :type="showPassword.confirmar ? 'text' : 'password'"
                    class="form-input"
                  />
                  <button type="button" @click="showPassword.confirmar = !showPassword.confirmar">
                    <i :class="showPassword.confirmar ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                  </button>
                </div>
              </div>
              <button type="submit" class="btn-password" :disabled="!puedeCambiarPassword || loading">
                <i class="bi bi-key"></i> Cambiar Contraseña
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </EmpleadoLayout>
</template>

<script>
import EmpleadoLayout from '../../components/empleado/EmpleadoLayout.vue'
import authEmpleado from '../../services/authEmpleado'
import { useNotification } from '../../services/notification.service'

export default {
  name: 'MiPerfil',
  components: {
    EmpleadoLayout
  },
  data() {
    return {
      loading: false,
      form: {
        correo: '',
        telefono: ''
      },
      passwordForm: {
        actual: '',
        nueva: '',
        confirmar: ''
      },
      showPassword: {
        actual: false,
        nueva: false,
        confirmar: false
      }
    }
  },
  computed: {
    empleado() {
      return authEmpleado.getEmpleado()
    },
    getInitials() {
      if (!this.empleado) return '?'
      return `${(this.empleado.nombre || '').charAt(0)}${(this.empleado.apellido || '').charAt(0)}`.toUpperCase()
    },
    puedeCambiarPassword() {
      return (
        this.passwordForm.actual.length > 0 &&
        this.passwordForm.nueva.length >= 6 &&
        this.passwordForm.nueva === this.passwordForm.confirmar
      )
    }
  },
  mounted() {
    this.cargarDatos()
  },
  methods: {
    cargarDatos() {
      if (this.empleado) {
        this.form.correo = this.empleado.correo || ''
        this.form.telefono = this.empleado.telefono || ''
      }
    },
    formatDate(fecha) {
      if (!fecha) return '-'
      return new Date(fecha).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    },
    async guardarPerfil() {
      this.loading = true
      try {
        await authEmpleado.updatePerfil(this.form)
        
        const user = authEmpleado.getEmpleado()
        user.correo = this.form.correo
        user.telefono = this.form.telefono
        localStorage.setItem('empleadoUser', JSON.stringify(user))
        
        const notification = useNotification()
        notification.success('Información actualizada correctamente')
      } catch (err) {
        const notification = useNotification()
        notification.error(err.response?.data?.message || 'Error al guardar')
      } finally {
        this.loading = false
      }
    },
    async cambiarPassword() {
      if (!this.puedeCambiarPassword) return
      
      this.loading = true
      try {
        await authEmpleado.cambiarPassword({
          password_actual: this.passwordForm.actual,
          password_nueva: this.passwordForm.nueva
        })
        
        this.passwordForm = { actual: '', nueva: '', confirmar: '' }
        
        const notification = useNotification()
        notification.success('Contraseña cambiada correctamente')
      } catch (err) {
        const notification = useNotification()
        notification.error(err.response?.data?.message || 'Error al cambiar contraseña')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.mi-perfil-container {
  max-width: 1000px;
  margin: 0 auto;
}

h1 {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 24px;
}

.perfil-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.perfil-card {
  background: white;
  border-radius: 16px;
  padding: 28px;
  border: 1px solid #e2e8f0;
}

.perfil-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f1f5f9;
}

.avatar {
  width: 72px;
  height: 72px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 26px;
  font-weight: 700;
}

.perfil-nombre h2 {
  font-size: 22px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 4px;
}

.perfil-nombre span {
  font-size: 14px;
  color: #64748b;
}

.info-section {
  margin-bottom: 24px;
}

.info-section:last-child {
  margin-bottom: 0;
}

.info-section h3 {
  font-size: 14px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 16px;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-item .label {
  font-size: 12px;
  color: #94a3b8;
}

.info-item .value {
  font-size: 14px;
  font-weight: 500;
  color: #1e293b;
}

.info-item .value.activo {
  color: #22c55e;
}

.info-item .value.inactivo {
  color: #ef4444;
}

.action-section {
  margin-bottom: 32px;
}

.action-section:last-child {
  margin-bottom: 0;
  padding-top: 24px;
  border-top: 1px solid #f1f5f9;
}

.action-section h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 20px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #475569;
  margin-bottom: 6px;
}

.form-input {
  width: 100%;
  padding: 12px 14px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 14px;
  font-family: inherit;
  transition: all 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.password-input {
  position: relative;
}

.password-input input {
  padding-right: 44px;
}

.password-input button {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 4px;
}

.btn-save,
.btn-password {
  width: 100%;
  padding: 14px 20px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 15px;
  transition: all 0.2s ease;
}

.btn-save {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
}

.btn-save:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-password {
  background: #f1f5f9;
  border: 2px solid #e2e8f0;
  color: #475569;
}

.btn-password:hover:not(:disabled) {
  background: #e2e8f0;
}

.btn-save:disabled,
.btn-password:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

@media (max-width: 768px) {
  .perfil-grid {
    grid-template-columns: 1fr;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>
