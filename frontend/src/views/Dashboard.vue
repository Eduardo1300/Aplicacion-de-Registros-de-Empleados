<template>
  <div class="dashboard">
    <div class="row mb-4">
      <div class="col">
        <h1>
          <i class="bi bi-speedometer2"></i> Dashboard
        </h1>
        <p class="text-muted">Bienvenido, {{ usuario?.nombreUsuario }}</p>
      </div>
    </div>

    <div class="row">
      <div class="col-md-3 mb-3">
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-title">
              <i class="bi bi-people text-primary" style="font-size: 2rem;"></i>
            </h5>
            <p class="card-text">Empleados</p>
            <h2>{{ stats.empleados || 0 }}</h2>
          </div>
        </div>
      </div>

      <div class="col-md-3 mb-3">
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-title">
              <i class="bi bi-clock text-success" style="font-size: 2rem;"></i>
            </h5>
            <p class="card-text">Asistencias Hoy</p>
            <h2>{{ stats.asistenciasHoy || 0 }}</h2>
          </div>
        </div>
      </div>

      <div class="col-md-3 mb-3">
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-title">
              <i class="bi bi-calendar text-warning" style="font-size: 2rem;"></i>
            </h5>
            <p class="card-text">Licencias Pendientes</p>
            <h2>{{ stats.licenciasPendientes || 0 }}</h2>
          </div>
        </div>
      </div>

      <div class="col-md-3 mb-3">
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-title">
              <i class="bi bi-building text-info" style="font-size: 2rem;"></i>
            </h5>
            <p class="card-text">Departamentos</p>
            <h2>{{ stats.departamentos || 0 }}</h2>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">
              <i class="bi bi-lightning"></i> Acciones Rápidas
            </h5>
          </div>
          <div class="card-body">
            <router-link to="/empleados" class="btn btn-outline-primary me-2">
              <i class="bi bi-plus-circle"></i> Nuevo Empleado
            </router-link>
            <router-link to="/asistencias" class="btn btn-outline-success me-2">
              <i class="bi bi-clock"></i> Registrar Asistencia
            </router-link>
            <router-link to="/licencias" class="btn btn-outline-warning">
              <i class="bi bi-calendar-check"></i> Solicitar Licencia
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../services/api'

export default {
  name: 'Dashboard',
  data() {
    return {
      usuario: null,
      stats: {
        empleados: 0,
        asistenciasHoy: 0,
        licenciasPendientes: 0,
        departamentos: 0
      }
    }
  },
  mounted() {
    this.loadUsuario()
    this.loadStats()
  },
  methods: {
    loadUsuario() {
      const usuario = localStorage.getItem('usuario')
      if (usuario) {
        this.usuario = JSON.parse(usuario)
      }
    },
    async loadStats() {
      try {
        const [empleados, asistencias, licencias] = await Promise.all([
          api.getEmpleados(),
          api.getAsistencias(),
          api.getSolicitudesLicencia()
        ])
        
        this.stats.empleados = empleados.data?.length || 0
        this.stats.asistenciasHoy = asistencias.data?.filter(a => 
          new Date(a.fechaAsistencia).toDateString() === new Date().toDateString()
        ).length || 0
        this.stats.licenciasPendientes = licencias.data?.filter(l => l.estado === 'PENDIENTE').length || 0
        this.stats.departamentos = 5 // Simulado
      } catch (err) {
        console.error('Error cargando estadísticas:', err)
      }
    }
  }
}
</script>
