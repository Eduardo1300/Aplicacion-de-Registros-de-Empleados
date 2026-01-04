<template>
  <div class="login-container">
    <div class="login-gradient-bg"></div>
    
    <div class="login-wrapper">
      <div class="login-card">
        <div class="login-header">
          <div class="logo-circle">
            <i class="bi bi-person-badge"></i>
          </div>
          <h1 class="login-title">Sistema de Registro</h1>
          <p class="login-subtitle">Gestión Integral de Empleados</p>
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="usuario" class="form-label">
              <i class="bi bi-person-fill"></i> Usuario
            </label>
            <div class="input-wrapper">
              <input 
                id="usuario"
                v-model="formData.nombreUsuario" 
                type="text" 
                class="form-control"
                placeholder="Ingrese su usuario"
                required
              />
              <span class="input-icon"><i class="bi bi-person"></i></span>
            </div>
          </div>
          
          <div class="form-group">
            <label for="clave" class="form-label">
              <i class="bi bi-lock-fill"></i> Contraseña
            </label>
            <div class="input-wrapper">
              <input 
                id="clave"
                v-model="formData.clave" 
                type="password" 
                class="form-control"
                placeholder="Ingrese su contraseña"
                required
              />
              <span class="input-icon"><i class="bi bi-lock"></i></span>
            </div>
          </div>

          <transition name="fade">
            <div v-if="error" class="alert-error">
              <i class="bi bi-exclamation-circle-fill"></i>
              <span>{{ error }}</span>
              <button type="button" class="btn-close-alert" @click="error = ''">
                <i class="bi bi-x"></i>
              </button>
            </div>
          </transition>

          <button type="submit" class="btn-login" :disabled="loading">
            <span v-if="!loading" class="btn-text">
              <i class="bi bi-arrow-right-circle-fill"></i> Iniciar Sesión
            </span>
            <span v-else class="btn-loading">
              <span class="spinner"></span> Verificando...
            </span>
          </button>
        </form>

        <div class="divider">
          <span>Credenciales de Demostración</span>
        </div>

        <div class="demo-credentials">
          <div class="credential-item admin">
            <div class="credential-icon">
              <i class="bi bi-shield-lock"></i>
            </div>
            <h6>Administrador</h6>
            <div class="credential-code">
              <span class="code-user">admin</span>
              <span class="code-divider">/</span>
              <span class="code-pass">admin123</span>
            </div>
          </div>
          <div class="credential-item employee">
            <div class="credential-icon">
              <i class="bi bi-person-check"></i>
            </div>
            <h6>Empleado</h6>
            <div class="credential-code">
              <span class="code-user">empleado</span>
              <span class="code-divider">/</span>
              <span class="code-pass">empleado123</span>
            </div>
          </div>
        </div>
      </div>

      <div class="login-footer">
        <p>&copy; 2026 Sistema de Registro de Empleados. Todos los derechos reservados.</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../services/api'

export default {
  name: 'Login',
  data() {
    return {
      formData: {
        nombreUsuario: '',
        clave: ''
      },
      error: '',
      loading: false
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true
      this.error = ''
      
      try {
        const response = await api.login(this.formData)
        const { token, nombreUsuario, rol } = response.data
        
        localStorage.setItem('token', token)
        localStorage.setItem('usuario', JSON.stringify({ nombreUsuario, rol }))
        
        this.$router.push('/dashboard')
      } catch (err) {
        this.error = err.response?.data?.message || 'Error en la autenticación'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
  overflow: hidden;
}

.login-gradient-bg {
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: moveGradient 20s linear infinite;
}

@keyframes moveGradient {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

.login-wrapper {
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
}

.login-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  padding: 50px 40px;
  animation: slideInUp 0.5s ease-out;
  backdrop-filter: blur(10px);
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
}

.logo-circle {
  width: 90px;
  height: 90px;
  margin: 0 auto 25px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 45px;
  color: white;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.35);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.login-title {
  font-size: 32px;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 8px;
  letter-spacing: -0.5px;
}

.login-subtitle {
  color: #a0aec0;
  font-size: 15px;
  margin: 0;
  font-weight: 500;
}

.login-form {
  margin-bottom: 25px;
}

.form-group {
  margin-bottom: 22px;
}

.form-label {
  display: block;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 10px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-label i {
  margin-right: 6px;
  color: #667eea;
}

.input-wrapper {
  position: relative;
}

.form-control {
  width: 100%;
  height: 48px;
  padding: 12px 16px 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 15px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  transition: all 0.3s ease;
  background: #f7fafc;
}

.form-control:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-control::placeholder {
  color: #cbd5e0;
}

.input-icon {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
  font-size: 18px;
  pointer-events: none;
}

.form-control:focus ~ .input-icon {
  color: #667eea;
}

.alert-error {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a4a 100%);
  color: white;
  padding: 14px 16px;
  border-radius: 10px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.2);
  animation: slideInDown 0.3s ease-out;
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.alert-error i {
  font-size: 18px;
  flex-shrink: 0;
}

.btn-close-alert {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 18px;
  margin-left: auto;
  padding: 0;
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;
}

.btn-close-alert:hover {
  transform: rotate(90deg);
}

.btn-login {
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  margin-top: 8px;
}

.btn-login:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.btn-login:active:not(:disabled) {
  transform: translateY(-1px);
}

.btn-login:disabled {
  opacity: 0.8;
  cursor: not-allowed;
}

.btn-text,
.btn-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.divider {
  text-align: center;
  margin: 35px 0 25px;
  position: relative;
}

.divider span {
  background: white;
  padding: 0 12px;
  color: #a0aec0;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  z-index: 1;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, #e2e8f0 20%, #e2e8f0 80%, transparent);
  z-index: 0;
}

.demo-credentials {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.credential-item {
  padding: 18px;
  border-radius: 12px;
  text-align: center;
  border: 2px solid #e2e8f0;
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
  transition: all 0.3s ease;
  cursor: default;
}

.credential-item:hover {
  border-color: #667eea;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.1);
  transform: translateY(-2px);
}

.credential-item.admin {
  background: linear-gradient(135deg, #f0f4ff 0%, #e8ecff 100%);
}

.credential-item.employee {
  background: linear-gradient(135deg, #f0fdf4 0%, #e8f6f0 100%);
}

.credential-icon {
  font-size: 28px;
  margin-bottom: 10px;
  color: #667eea;
}

.credential-item.employee .credential-icon {
  color: #10b981;
}

.credential-item h6 {
  font-size: 12px;
  font-weight: 700;
  color: #2d3748;
  text-transform: uppercase;
  margin: 0 0 10px;
  letter-spacing: 0.5px;
}

.credential-code {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  flex-wrap: wrap;
  font-size: 13px;
}

.code-user,
.code-pass {
  background: white;
  padding: 4px 8px;
  border-radius: 6px;
  color: #764ba2;
  font-weight: 600;
  font-family: 'Monaco', 'Courier New', monospace;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.code-divider {
  color: #cbd5e0;
  font-weight: 700;
}

.login-footer {
  text-align: center;
  margin-top: 35px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.85);
  font-size: 13px;
}

.login-footer p {
  margin: 0;
}

@media (max-width: 600px) {
  .login-card {
    padding: 40px 25px;
    border-radius: 14px;
  }

  .login-title {
    font-size: 26px;
  }

  .login-subtitle {
    font-size: 14px;
  }

  .logo-circle {
    width: 75px;
    height: 75px;
    font-size: 36px;
  }

  .btn-login {
    height: 46px;
    font-size: 15px;
  }

  .form-control {
    height: 44px;
    padding: 10px 14px;
  }

  .demo-credentials {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .credential-item {
    padding: 14px;
  }
}

@media (max-width: 480px) {
  .login-container {
    padding: 15px;
  }

  .login-card {
    padding: 35px 20px;
  }

  .login-title {
    font-size: 24px;
  }

  .login-header {
    margin-bottom: 30px;
  }

  .form-group {
    margin-bottom: 18px;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
