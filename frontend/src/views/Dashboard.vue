<template>
  <div class="dashboard-container">
    <!-- Header Section -->
    <div class="dashboard-header">
      <div class="header-content">
        <div class="header-left">
          <h1 class="page-title">
            <span class="icon-wrapper">
              <i class="bi bi-speedometer2"></i>
            </span>
            Dashboard
          </h1>
          <p class="page-subtitle">
            <span class="greeting">¡Buenos días!</span>
            <span class="user-name">{{ usuario?.nombreUsuario }}</span>
          </p>
        </div>
        <div class="header-right">
          <div class="current-date">
            <div class="date-icon">
              <i class="bi bi-calendar3"></i>
            </div>
            <div class="date-text">
              <span class="date-day">{{ getCurrentDay() }}</span>
              <span class="date-full">{{ getCurrentDate() }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Cards Section -->
    <div class="stats-section">
      <div class="stat-card-wrapper">
        <div class="stat-card stat-primary">
          <div class="stat-bg-pattern"></div>
          <div class="stat-icon">
            <i class="bi bi-people-fill"></i>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ stats.empleados.total }}</div>
            <div class="stat-label">Total Empleados</div>
            <div class="stat-meta">
              <span class="meta-badge">
                <i class="bi bi-check-circle"></i>
                {{ stats.empleados.activos }} activos
              </span>
            </div>
          </div>
          <div class="stat-trend trend-up">
            <i class="bi bi-arrow-up"></i>
          </div>
        </div>
      </div>

      <div class="stat-card-wrapper">
        <div class="stat-card stat-success">
          <div class="stat-bg-pattern"></div>
          <div class="stat-icon">
            <i class="bi bi-clock-fill"></i>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ stats.asistencias.porcentajeAsistencia }}%</div>
            <div class="stat-label">Asistencia Hoy</div>
            <div class="stat-meta">
              <span class="meta-badge success">
                <i class="bi bi-person-check"></i>
                {{ stats.asistencias.presente }} presentes
              </span>
            </div>
          </div>
          <div class="stat-trend trend-stable">
            <i class="bi bi-dash"></i>
          </div>
        </div>
      </div>

      <div class="stat-card-wrapper">
        <div class="stat-card stat-warning">
          <div class="stat-bg-pattern"></div>
          <div class="stat-icon">
            <i class="bi bi-calendar-check-fill"></i>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ stats.licencias.pendiente }}</div>
            <div class="stat-label">Licencias Pendientes</div>
            <div class="stat-meta">
              <span class="meta-badge warning">
                <i class="bi bi-check-circle"></i>
                {{ stats.licencias.aprobada }} aprobadas
              </span>
            </div>
          </div>
          <div class="stat-trend trend-up">
            <i class="bi bi-arrow-up"></i>
          </div>
        </div>
      </div>

      <div class="stat-card-wrapper">
        <div class="stat-card stat-danger">
          <div class="stat-bg-pattern"></div>
          <div class="stat-icon">
            <i class="bi bi-exclamation-circle-fill"></i>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ stats.asistencias.ausente }}</div>
            <div class="stat-label">Ausentes Hoy</div>
            <div class="stat-meta">
              <span class="meta-badge danger">
                <i class="bi bi-person-x"></i>
                {{ stats.asistencias.conPermiso }} con permiso
              </span>
            </div>
          </div>
          <div class="stat-trend trend-down">
            <i class="bi bi-arrow-down"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions Section -->
    <div class="actions-section">
      <div class="section-header">
        <div class="section-icon">
          <i class="bi bi-lightning-fill"></i>
        </div>
        <div class="section-text">
          <h3 class="section-title">Acciones Rápidas</h3>
          <p class="section-description">Accede rápidamente a las funcionalidades principales</p>
        </div>
      </div>
      
      <div class="actions-grid">
        <router-link to="/empleados" class="action-btn btn-primary">
          <div class="btn-main">
            <div class="btn-icon">
              <i class="bi bi-person-plus-fill"></i>
            </div>
            <div class="btn-content">
              <span class="btn-title">Nuevo Empleado</span>
              <span class="btn-desc">Registrar empleado</span>
            </div>
          </div>
          <div class="btn-arrow">
            <i class="bi bi-arrow-right"></i>
          </div>
          <div class="btn-shine"></div>
        </router-link>

        <router-link to="/asistencias" class="action-btn btn-success">
          <div class="btn-main">
            <div class="btn-icon">
              <i class="bi bi-clock-history"></i>
            </div>
            <div class="btn-content">
              <span class="btn-title">Registrar Asistencia</span>
              <span class="btn-desc">Control de presencia</span>
            </div>
          </div>
          <div class="btn-arrow">
            <i class="bi bi-arrow-right"></i>
          </div>
          <div class="btn-shine"></div>
        </router-link>

        <router-link to="/licencias" class="action-btn btn-warning">
          <div class="btn-main">
            <div class="btn-icon">
              <i class="bi bi-calendar2-check"></i>
            </div>
            <div class="btn-content">
              <span class="btn-title">Solicitar Licencia</span>
              <span class="btn-desc">Gestión de vacaciones</span>
            </div>
          </div>
          <div class="btn-arrow">
            <i class="bi bi-arrow-right"></i>
          </div>
          <div class="btn-shine"></div>
        </router-link>

        <router-link to="/empleados" class="action-btn btn-info">
          <div class="btn-main">
            <div class="btn-icon">
              <i class="bi bi-eye-fill"></i>
            </div>
            <div class="btn-content">
              <span class="btn-title">Ver Todos</span>
              <span class="btn-desc">Lista de empleados</span>
            </div>
          </div>
          <div class="btn-arrow">
            <i class="bi bi-arrow-right"></i>
          </div>
          <div class="btn-shine"></div>
        </router-link>
      </div>
    </div>

    <!-- Summary Section -->
    <div class="summary-section">
      <div class="summary-card">
        <div class="summary-icon success">
          <i class="bi bi-graph-up-arrow"></i>
        </div>
        <div class="summary-content">
          <h4>Sistema Activo</h4>
          <p>Todos los módulos funcionando correctamente</p>
          <div class="summary-status">
            <span class="status-dot"></span>
            <span>Operativo</span>
          </div>
        </div>
      </div>

      <div class="summary-card">
        <div class="summary-icon info">
          <i class="bi bi-shield-check"></i>
        </div>
        <div class="summary-content">
          <h4>Sesión Segura</h4>
          <p>Tu sesión está protegida y autorizada</p>
          <div class="summary-status">
            <span class="status-dot success"></span>
            <span>Protegido</span>
          </div>
        </div>
      </div>

      <div class="summary-card">
        <div class="summary-icon primary">
          <i class="bi bi-cpu"></i>
        </div>
        <div class="summary-content">
          <h4> Rendimiento</h4>
          <p>Sistema funcionando de forma óptima</p>
          <div class="summary-status">
            <span class="status-dot"></span>
            <span>Optimizado</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../services/api'
import { getSystemStats } from '../services/estadisticas.service'
import StatCard from '../components/StatCard.vue'

export default {
  name: 'Dashboard',
  components: {
    StatCard
  },
  data() {
    return {
      usuario: null,
      stats: {
        empleados: { total: 0, activos: 0, inactivos: 0 },
        asistencias: { presente: 0, ausente: 0, porcentajeAsistencia: 0, conPermiso: 0 },
        licencias: { pendiente: 0, aprobada: 0, rechazada: 0 }
      },
      loading: false
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
        this.loading = true
        const response = await getSystemStats()
        this.stats = {
          empleados: response.empleados,
          asistencias: response.asistencias,
          licencias: response.licencias
        }
      } catch (err) {
        console.error('Error cargando estadísticas:', err)
      } finally {
        this.loading = false
      }
    },
    getCurrentDay() {
      const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
      return days[new Date().getDay()]
    },
    getCurrentDate() {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
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
  background: #f8fafc;
  min-height: 100vh;
  padding: 32px 24px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Header */
.dashboard-header {
  margin-bottom: 32px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  flex-wrap: wrap;
}

.header-left {
  flex: 1;
  min-width: 250px;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  letter-spacing: -0.5px;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
  font-size: 24px;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.page-subtitle {
  color: #64748b;
  font-size: 15px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.greeting {
  color: #64748b;
}

.user-name {
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
  padding: 16px 20px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid #e2e8f0;
}

.date-icon {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
}

.date-text {
  display: flex;
  flex-direction: column;
}

.date-day {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.date-full {
  font-size: 13px;
  color: #64748b;
}

/* Stats Cards */
.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.stat-card-wrapper {
  position: relative;
}

.stat-card {
  background: white;
  border-radius: 20px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
}

.stat-bg-pattern {
  position: absolute;
  top: 0;
  right: 0;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  opacity: 0.08;
  transform: translate(20%, -20%);
}

.stat-primary .stat-bg-pattern {
  background: #667eea;
}

.stat-success .stat-bg-pattern {
  background: #10b981;
}

.stat-warning .stat-bg-pattern {
  background: #f59e0b;
}

.stat-danger .stat-bg-pattern {
  background: #ef4444;
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
}

.stat-primary .stat-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.stat-success .stat-icon {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.stat-warning .stat-icon {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
}

.stat-danger .stat-icon {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.stat-content {
  position: relative;
  z-index: 1;
}

.stat-value {
  font-size: 36px;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.2;
  letter-spacing: -1px;
}

.stat-label {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 12px;
  font-weight: 500;
}

.stat-meta {
  display: flex;
  gap: 8px;
}

.meta-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #f1f5f9;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  color: #475569;
}

.meta-badge.success {
  background: #dcfce7;
  color: #166534;
}

.meta-badge.warning {
  background: #fef3c7;
  color: #92400e;
}

.meta-badge.danger {
  background: #fee2e2;
  color: #991b1b;
}

.meta-badge i {
  font-size: 12px;
}

.stat-trend {
  position: absolute;
  top: 24px;
  right: 24px;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
}

.trend-up {
  background: #dcfce7;
  color: #16a34a;
}

.trend-down {
  background: #fee2e2;
  color: #dc2626;
}

.trend-stable {
  background: #fef3c7;
  color: #d97706;
}

/* Actions Section */
.actions-section {
  margin-bottom: 32px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
}

.section-icon {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.section-text {
  flex: 1;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 4px;
  letter-spacing: -0.3px;
}

.section-description {
  color: #64748b;
  font-size: 14px;
  margin: 0;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: white;
  border-radius: 16px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
  position: relative;
  overflow: hidden;
}

.action-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.btn-main {
  display: flex;
  align-items: center;
  gap: 14px;
}

.btn-icon {
  width: 50px;
  height: 50px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.btn-content {
  flex: 1;
}

.btn-title {
  display: block;
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
}

.btn-desc {
  display: block;
  font-size: 13px;
  color: #64748b;
}

.btn-arrow {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  transition: all 0.3s ease;
}

.action-btn:hover .btn-arrow {
  background: #667eea;
  color: white;
  transform: translateX(4px);
}

.btn-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.5s ease;
}

.action-btn:hover .btn-shine {
  left: 100%;
}

.action-btn.btn-primary {
  border-left: 4px solid #667eea;
}

.action-btn.btn-primary .btn-icon {
  background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
  color: #667eea;
}

.action-btn.btn-success {
  border-left: 4px solid #10b981;
}

.action-btn.btn-success .btn-icon {
  background: linear-gradient(135deg, #10b98115 0%, #05966915 100%);
  color: #10b981;
}

.action-btn.btn-warning {
  border-left: 4px solid #f59e0b;
}

.action-btn.btn-warning .btn-icon {
  background: linear-gradient(135deg, #f59e0b15 0%, #d9770615 100%);
  color: #f59e0b;
}

.action-btn.btn-info {
  border-left: 4px solid #3b82f6;
}

.action-btn.btn-info .btn-icon {
  background: linear-gradient(135deg, #3b82f615 0%, #2563eb15 100%);
  color: #3b82f6;
}

/* Summary Section */
.summary-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.summary-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.summary-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
}

.summary-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
}

.summary-icon.success {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.summary-icon.info {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.summary-icon.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.summary-content h4 {
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 6px;
}

.summary-content p {
  font-size: 13px;
  color: #64748b;
  margin: 0 0 12px;
}

.summary-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  animation: pulse 2s infinite;
}

.status-dot.success {
  background: #10b981;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}

/* Responsive */
@media (max-width: 1024px) {
  .stats-section {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }

  .stat-value {
    font-size: 30px;
  }
}

@media (max-width: 768px) {
  .dashboard-container {
    padding: 24px 16px;
  }

  .header-content {
    flex-direction: column;
    align-items: stretch;
  }

  .header-right {
    justify-content: flex-start;
  }

  .page-title {
    font-size: 26px;
  }

  .page-title .icon-wrapper {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }

  .stats-section {
    grid-template-columns: 1fr;
  }

  .stat-card {
    padding: 20px;
  }

  .stat-value {
    font-size: 28px;
  }

  .actions-grid {
    grid-template-columns: 1fr;
  }

  .action-btn {
    padding: 16px;
  }

  .btn-icon {
    width: 44px;
    height: 44px;
    font-size: 20px;
  }

  .summary-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .dashboard-container {
    padding: 20px 12px;
  }

  .page-title {
    font-size: 24px;
  }

  .current-date {
    width: 100%;
    justify-content: center;
  }

  .stat-card {
    flex-direction: column;
    text-align: center;
  }

  .stat-trend {
    top: 16px;
    right: 16px;
  }

  .action-btn {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }

  .btn-main {
    flex-direction: column;
  }

  .btn-arrow {
    width: 100%;
    border-radius: 10px;
  }
}
</style>
