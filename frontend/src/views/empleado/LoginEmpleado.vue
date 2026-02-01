<template>
  <div class="login-empleado-container">
    <div class="login-card">
      <div class="login-header">
        <div class="logo">
          <i class="bi bi-building"></i>
        </div>
        <h1>Portal del Empleado</h1>
        <p>Inicia sesión para acceder a tu cuenta</p>
      </div>

      <form @submit.prevent="login" class="login-form">
        <div class="form-group">
          <label>
            <i class="bi bi-id-card"></i> DNI
          </label>
          <input
            v-model="form.dni"
            type="text"
            placeholder="Ingresa tu DNI"
            required
            maxlength="8"
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label>
            <i class="bi bi-key"></i> Contraseña
          </label>
          <div class="password-wrapper">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Ingresa tu contraseña"
              required
              class="form-input"
            />
            <button
              type="button"
              class="toggle-password"
              @click="showPassword = !showPassword"
            >
              <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </button>
          </div>
        </div>

        <div v-if="error" class="error-message">
          <i class="bi bi-exclamation-circle"></i>
          {{ error }}
        </div>

        <button type="submit" class="btn-login" :disabled="loading">
          <span v-if="loading" class="spinner"></span>
          <span v-else>Iniciar Sesión</span>
        </button>
      </form>

      <div class="login-footer">
        <router-link to="/" class="back-link">
          <i class="bi bi-arrow-left"></i>
          Volver al inicio
        </router-link>
      </div>
    </div>

    <div class="login-info">
      <h3>¿Qué puedes hacer aquí?</h3>
      <ul>
        <li>
          <i class="bi bi-clock"></i>
          <span>Marcar tu asistencia diaria</span>
        </li>
        <li>
          <i class="bi bi-calendar-check"></i>
          <span>Solicitar licencias y vacaciones</span>
        </li>
        <li>
          <i class="bi bi-person"></i>
          <span>Ver tu información personal</span>
        </li>
        <li>
          <i class="bi bi-file-text"></i>
          <span>Consultar tu historial de asistencia</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '../services/api'
import { useNotification } from '../services/notification.service'

export default {
  name: 'LoginEmpleado',
  data() {
    return {
      form: {
        dni: '',
        password: ''
      },
      showPassword: false,
      loading: false,
      error: ''
    }
  },
  methods: {
    async login() {
      this.loading = true
      this.error = ''

      try {
        const response = await api.loginEmpleado(this.form)
        localStorage.setItem('empleadoToken', response.data.token)
        localStorage.setItem('empleadoUser', JSON.stringify(response.data.empleado))
        
        const notification = useNotification()
        notification.success('¡Bienvenido!', 2000)
        
        this.$router.push('/empleado/dashboard')
      } catch (err) {
        this.error = err.response?.data?.message || 'Error al iniciar sesión'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.login-empleado-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.login-card {
  background: white;
  border-radius: 24px;
  padding: 48px 40px;
  width: 100%;
  max-width: 440px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.login-header {
  text-align: center;
  margin-bottom: 36px;
}

.logo {
  width: 72px;
  height: 72px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 32px;
  color: white;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.login-header h1 {
  font-size: 26px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px;
}

.login-header p {
  color: #64748b;
  font-size: 15px;
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  display: flex;
  align-items: center;
  gap: 6px;
}

.form-group label i {
  color: #667eea;
}

.form-input {
  padding: 14px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 15px;
  transition: all 0.2s ease;
  font-family: inherit;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.password-wrapper {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 4px;
  font-size: 18px;
}

.toggle-password:hover {
  color: #64748b;
}

.error-message {
  background: #fee2e2;
  color: #991b1b;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-login {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 16px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-login:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.btn-login:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.login-footer {
  margin-top: 32px;
  text-align: center;
}

.back-link {
  color: #64748b;
  text-decoration: none;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: #667eea;
}

.login-info {
  display: none;
  margin-left: 48px;
  color: white;
  max-width: 280px;
}

.login-info h3 {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 24px;
}

.login-info ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.login-info li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
}

.login-info li i {
  font-size: 20px;
  opacity: 0.9;
}

@media (min-width: 1024px) {
  .login-card {
    margin-right: 0;
  }

  .login-info {
    display: block;
  }
}

@media (max-width: 480px) {
  .login-card {
    padding: 32px 24px;
  }

  .login-header h1 {
    font-size: 22px;
  }
}
</style>
