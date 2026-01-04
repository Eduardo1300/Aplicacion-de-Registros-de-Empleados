<template>
  <div class="dashboard-container">
    <!-- Header Section -->
    <div class="dashboard-header">
      <div class="header-content">
        <div class="header-left">
          <h1 class="page-title">
            <i class="bi bi-speedometer2"></i> Dashboard
          </h1>
          <p class="page-subtitle">Bienvenido, <strong>{{ usuario?.nombreUsuario }}</strong></p>
        </div>
        <div class="header-right">
          <div class="current-date">
            <i class="bi bi-calendar3"></i>
            <span>{{ getCurrentDate() }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Cards Section -->
    <div class="stats-section">
      <div class="stat-card stat-card-1">
        <div class="stat-icon">
          <i class="bi bi-people-fill"></i>
        </div>
        <div class="stat-content">
          <p class="stat-label">Total de Empleados</p>
          <h2 class="stat-number">{{ stats.empleados }}</h2>
          <span class="stat-change">Activos en el sistema</span>
        </div>
      </div>

      <div class="stat-card stat-card-2">
        <div class="stat-icon">
          <i class="bi bi-clock-fill"></i>
        </div>
        <div class="stat-content">
          <p class="stat-label">Asistencias Hoy</p>
          <h2 class="stat-number">{{ stats.asistenciasHoy }}</h2>
          <span class="stat-change">Registrados hasta ahora</span>
        </div>
      </div>

      <div class="stat-card stat-card-3">
        <div class="stat-icon">
          <i class="bi bi-calendar-check-fill"></i>
        </div>
        <div class="stat-content">
          <p class="stat-label">Licencias Pendientes</p>
          <h2 class="stat-number">{{ stats.licenciasPendientes }}</h2>
          <span class="stat-change">Requieren aprobación</span>
        </div>
      </div>

      <div class="stat-card stat-card-4">
        <div class="stat-icon">
          <i class="bi bi-building-fill"></i>
        </div>
        <div class="stat-content">
          <p class="stat-label">Departamentos</p>
          <h2 class="stat-number">{{ stats.departamentos }}</h2>
          <span class="stat-change">En la organización</span>
        </div>
      </div>
    </div>

    <!-- Quick Actions Section -->
    <div class="actions-section">
      <div class="section-header">
        <h3 class="section-title">
          <i class="bi bi-lightning-fill"></i> Acciones Rápidas
        </h3>
        <p class="section-description">Accede rápidamente a las funcionalidades principales</p>
      </div>
      
      <div class="actions-grid">
        <router-link to="/empleados" class="action-btn btn-primary">
          <div class="btn-icon">
            <i class="bi bi-person-plus-fill"></i>
          </div>
          <div class="btn-content">
            <span class="btn-title">Nuevo Empleado</span>
            <span class="btn-desc">Registrar empleado</span>
          </div>
          <div class="btn-arrow">
            <i class="bi bi-arrow-right"></i>
          </div>
        </router-link>

        <router-link to="/asistencias" class="action-btn btn-success">
          <div class="btn-icon">
            <i class="bi bi-clock-history"></i>
          </div>
          <div class="btn-content">
            <span class="btn-title">Registrar Asistencia</span>
            <span class="btn-desc">Control de presencia</span>
          </div>
          <div class="btn-arrow">
            <i class="bi bi-arrow-right"></i>
          </div>
        </router-link>

        <router-link to="/licencias" class="action-btn btn-warning">
          <div class="btn-icon">
            <i class="bi bi-calendar2-check"></i>
          </div>
          <div class="btn-content">
            <span class="btn-title">Solicitar Licencia</span>
            <span class="btn-desc">Gestión de vacaciones</span>
          </div>
          <div class="btn-arrow">
            <i class="bi bi-arrow-right"></i>
          </div>
        </router-link>

        <router-link to="/empleados" class="action-btn btn-info">
          <div class="btn-icon">
            <i class="bi bi-eye-fill"></i>
          </div>
          <div class="btn-content">
            <span class="btn-title">Ver Todos</span>
            <span class="btn-desc">Lista de empleados</span>
          </div>
          <div class="btn-arrow">
            <i class="bi bi-arrow-right"></i>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Summary Section -->
    <div class="summary-section">
      <div class="summary-card">
        <div class="summary-icon">
          <i class="bi bi-graph-up"></i>
        </div>
        <div class="summary-content">
          <h4>Sistema Activo</h4>
          <p>Todos los módulos funcionando correctamente</p>
        </div>
      </div>

      <div class="summary-card">
        <div class="summary-icon">
          <i class="bi bi-shield-check"></i>
        </div>
        <div class="summary-content">
          <h4>Sesión Segura</h4>
          <p>Tu sesión está protegida y autorizada</p>
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
    },
    getCurrentDate() {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      return new Date().toLocaleDateString('es-ES', options)
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

.dashboard-container {
  background: linear-gradient(135deg, #f5f7fa 0%, #f0f4f8 100%);
  min-height: 100vh;
  padding: 32px 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Header */
.dashboard-header {
  margin-bottom: 40px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.header-left {
  flex: 1;
  min-width: 250px;
}

.page-title {
  font-size: 36px;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 8px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.page-title i {
  color: #667eea;
}

.page-subtitle {
  color: #718096;
  font-size: 15px;
  margin: 0;
}

.page-subtitle strong {
  color: #667eea;
  font-weight: 600;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.current-date {
  background: white;
  padding: 12px 20px;
  border-radius: 10px;
  color: #718096;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.current-date i {
  color: #667eea;
}

/* Stats Cards */
.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.stat-card {
  background: white;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  gap: 16px;
  align-items: flex-start;
  transition: all 0.3s ease;
  border-left: 4px solid;
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  right: -50px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  opacity: 0.1;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.stat-card-1 {
  border-left-color: #667eea;
}

.stat-card-1::before {
  background: #667eea;
}

.stat-card-2 {
  border-left-color: #10b981;
}

.stat-card-2::before {
  background: #10b981;
}

.stat-card-3 {
  border-left-color: #f59e0b;
}

.stat-card-3::before {
  background: #f59e0b;
}

.stat-card-4 {
  border-left-color: #3b82f6;
}

.stat-card-4::before {
  background: #3b82f6;
}

.stat-icon {
  font-size: 36px;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  flex-shrink: 0;
}

.stat-card-1 .stat-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.stat-card-2 .stat-icon {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.stat-card-3 .stat-icon {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
}

.stat-card-4 .stat-icon {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 12px;
  font-weight: 600;
  color: #718096;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.stat-number {
  font-size: 32px;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 6px;
}

.stat-change {
  font-size: 13px;
  color: #a0aec0;
}

/* Actions Section */
.actions-section {
  margin-bottom: 40px;
}

.section-header {
  margin-bottom: 24px;
}

.section-title {
  font-size: 22px;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 6px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-title i {
  color: #667eea;
}

.section-description {
  color: #718096;
  font-size: 14px;
  margin: 0;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px;
  background: white;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-left: 4px solid;
  position: relative;
  overflow: hidden;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.action-btn::before {
  content: '';
  position: absolute;
  top: 0;
  right: -100%;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  transition: right 0.3s ease;
}

.action-btn:hover::before {
  right: 0;
}

.action-btn.btn-primary {
  border-left-color: #667eea;
}

.action-btn.btn-primary .btn-icon {
  color: #667eea;
  background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
}

.action-btn.btn-success {
  border-left-color: #10b981;
}

.action-btn.btn-success .btn-icon {
  color: #10b981;
  background: linear-gradient(135deg, #10b98115 0%, #05966915 100%);
}

.action-btn.btn-warning {
  border-left-color: #f59e0b;
}

.action-btn.btn-warning .btn-icon {
  color: #f59e0b;
  background: linear-gradient(135deg, #f59e0b15 0%, #d9770615 100%);
}

.action-btn.btn-info {
  border-left-color: #3b82f6;
}

.action-btn.btn-info .btn-icon {
  color: #3b82f6;
  background: linear-gradient(135deg, #3b82f515 0%, #2563eb15 100%);
}

.btn-icon {
  font-size: 24px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.action-btn:hover .btn-icon {
  transform: scale(1.1);
}

.btn-content {
  flex: 1;
  position: relative;
  z-index: 1;
}

.btn-title {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 4px;
}

.btn-desc {
  display: block;
  font-size: 12px;
  color: #a0aec0;
}

.btn-arrow {
  font-size: 18px;
  color: #cbd5e0;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.action-btn:hover .btn-arrow {
  color: #667eea;
  transform: translateX(4px);
}

/* Summary Section */
.summary-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.summary-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.summary-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.summary-icon {
  font-size: 28px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
  flex-shrink: 0;
}

.summary-content h4 {
  font-size: 14px;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 4px;
}

.summary-content p {
  font-size: 13px;
  color: #718096;
  margin: 0;
}

/* Responsive */
@media (max-width: 1024px) {
  .stats-section {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
  }

  .stat-card {
    padding: 18px;
  }

  .stat-number {
    font-size: 28px;
  }
}

@media (max-width: 768px) {
  .dashboard-container {
    padding: 20px 16px;
  }

  .header-content {
    flex-direction: column;
    align-items: stretch;
  }

  .header-right {
    justify-content: center;
  }

  .page-title {
    font-size: 28px;
  }

  .stats-section {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 12px;
  }

  .stat-card {
    padding: 16px;
    gap: 12px;
    flex-direction: column;
    text-align: center;
  }

  .stat-icon {
    width: 50px;
    height: 50px;
    font-size: 28px;
    margin: 0 auto;
  }

  .stat-label {
    font-size: 11px;
  }

  .stat-number {
    font-size: 24px;
  }

  .actions-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 12px;
  }

  .action-btn {
    padding: 14px;
    gap: 10px;
    flex-direction: column;
    text-align: center;
  }

  .btn-arrow {
    display: none;
  }

  .btn-icon {
    width: 45px;
    height: 45px;
    font-size: 20px;
  }

  .btn-title {
    font-size: 13px;
  }

  .btn-desc {
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .dashboard-container {
    padding: 16px 12px;
  }

  .page-title {
    font-size: 24px;
  }

  .stats-section {
    grid-template-columns: 1fr;
  }

  .stat-card {
    flex-direction: row;
  }

  .actions-grid {
    grid-template-columns: 1fr;
  }

  .summary-section {
    grid-template-columns: 1fr;
  }
}
</style>
