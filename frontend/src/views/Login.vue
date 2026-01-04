<template>
  <div class="login-container">
    <div class="card shadow" style="max-width: 400px; margin: 100px auto;">
      <div class="card-body p-5">
        <h2 class="text-center mb-4">
          <i class="bi bi-people-fill text-primary"></i> Sistema de Empleados
        </h2>
        
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label class="form-label">Usuario</label>
            <input 
              v-model="formData.nombreUsuario" 
              type="text" 
              class="form-control"
              placeholder="admin"
              required
            />
          </div>
          
          <div class="mb-3">
            <label class="form-label">Contraseña</label>
            <input 
              v-model="formData.clave" 
              type="password" 
              class="form-control"
              placeholder="admin123"
              required
            />
          </div>

          <div v-if="error" class="alert alert-danger" role="alert">
            {{ error }}
          </div>

          <button type="submit" class="btn btn-primary w-100" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
            {{ loading ? 'Iniciando...' : 'Iniciar Sesión' }}
          </button>
        </form>

        <hr />

        <p class="text-center text-muted small">
          <strong>Demo:</strong><br />
          admin / admin123<br />
          empleado / empleado123
        </p>
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
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
</style>
