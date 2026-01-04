<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand">
          <i class="bi bi-people-fill"></i> Sistema de Empleados
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item" v-if="isLoggedIn">
              <router-link to="/empleados" class="nav-link">
                <i class="bi bi-people"></i> Empleados
              </router-link>
            </li>
            <li class="nav-item" v-if="isLoggedIn">
              <router-link to="/asistencias" class="nav-link">
                <i class="bi bi-clock"></i> Asistencias
              </router-link>
            </li>
            <li class="nav-item" v-if="isLoggedIn">
              <router-link to="/licencias" class="nav-link">
                <i class="bi bi-calendar"></i> Licencias
              </router-link>
            </li>
            <li class="nav-item" v-if="isLoggedIn">
              <router-link to="/auditoria" class="nav-link">
                <i class="bi bi-clock-history"></i> Auditoría
              </router-link>
            </li>
            <li class="nav-item" v-if="isLoggedIn">
              <router-link to="/graficos" class="nav-link">
                <i class="bi bi-graph-up"></i> Gráficos
              </router-link>
            </li>
            <li class="nav-item" v-if="isLoggedIn">
              <ThemeToggle />
            </li>
            <li class="nav-item" v-if="isLoggedIn">
              <button @click="logout" class="btn btn-outline-light btn-sm ms-2">
                <i class="bi bi-box-arrow-right"></i> Salir
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <main class="container mt-4">
      <router-view :key="$route.fullPath" />
    </main>
    <ToastContainer />
  </div>
</template>

<script>
import ToastContainer from './components/ToastContainer.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import { useTheme } from './services/theme.service'

export default {
  name: 'App',
  components: {
    ToastContainer,
    ThemeToggle
  },
  data() {
    return {
      isLoggedIn: false
    }
  },
  mounted() {
    this.isLoggedIn = !!localStorage.getItem('token')
    const theme = useTheme()
    theme.initTheme()
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('usuario')
      this.$router.push('/login')
      this.isLoggedIn = false
    }
  },
  watch: {
    $route() {
      this.isLoggedIn = !!localStorage.getItem('token')
    }
  }
}
</script>

<style>
body {
  background-color: #f8f9fa;
}

.navbar {
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

main {
  min-height: calc(100vh - 60px);
}
</style>
