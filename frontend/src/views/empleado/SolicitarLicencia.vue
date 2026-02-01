<template>
  <EmpleadoLayout>
    <div class="solicitar-licencia-container">
      <h1>Solicitar Licencia</h1>

      <div class="saldo-info">
        <div class="saldo-card">
          <i class="bi bi-calendar-range"></i>
          <div>
            <span class="saldo-num">{{ diasDisponibles }}</span>
            <span class="saldo-label">Días de vacaciones disponibles</span>
          </div>
        </div>
        <p class="saldo-detail">Tienes 15 días de vacaciones por año. Los días médicos y personales no descontarán de este saldo.</p>
      </div>

      <form @submit.prevent="enviarSolicitud" class="solicitud-form">
        <div class="form-group">
          <label>
            <i class="bi bi-tag"></i> Tipo de Licencia
          </label>
          <select v-model="form.tipo" required class="form-input">
            <option value="">Seleccionar tipo</option>
            <option value="VACACION">Vacaciones</option>
            <option value="MEDICA">Licencia Médica</option>
            <option value="PERSONAL">Asunto Personal</option>
          </select>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>
              <i class="bi bi-calendar"></i> Fecha de Inicio
            </label>
            <input
              v-model="form.fecha_inicio"
              type="date"
              required
              class="form-input"
              :min="minDate"
            />
          </div>

          <div class="form-group">
            <label>
              <i class="bi bi-calendar"></i> Fecha de Fin
            </label>
            <input
              v-model="form.fecha_fin"
              type="date"
              required
              class="form-input"
              :min="form.fecha_inicio || minDate"
            />
          </div>
        </div>

        <div v-if="diasCalculados > 0" class="dias-info">
          <i class="bi bi-info-circle"></i>
          <span>Se solicitarán <strong>{{ diasCalculados }}</strong> día(s) de licencia</span>
        </div>

        <div v-if="form.tipo === 'VACACION' && diasCalculados > diasDisponibles" class="dias-error">
          <i class="bi bi-exclamation-triangle"></i>
          <span>No tienes suficientes días de vacaciones. Disponibles: {{ diasDisponibles }}</span>
        </div>

        <div class="form-group">
          <label>
            <i class="bi bi-chat-text"></i> Motivo (opcional)
          </label>
          <textarea
            v-model="form.motivo"
            placeholder="Describe el motivo de tu solicitud..."
            rows="4"
            class="form-input textarea"
          ></textarea>
        </div>

        <div class="form-actions">
          <button type="button" @click="$router.back()" class="btn-cancel">
            <i class="bi bi-x-lg"></i> Cancelar
          </button>
          <button
            type="submit"
            class="btn-submit"
            :disabled="!puedeEnviar || loading"
          >
            <span v-if="loading" class="spinner"></span>
            <span v-else><i class="bi bi-send"></i> Enviar Solicitud</span>
          </button>
        </div>
      </form>
    </div>
  </EmpleadoLayout>
</template>

<script>
import EmpleadoLayout from '../../components/empleado/EmpleadoLayout.vue'
import authEmpleado from '../../services/authEmpleado'
import { useNotification } from '../../services/notification.service'

export default {
  name: 'SolicitarLicencia',
  components: {
    EmpleadoLayout
  },
  data() {
    return {
      loading: false,
      diasDisponibles: 15,
      form: {
        tipo: '',
        fecha_inicio: '',
        fecha_fin: '',
        motivo: ''
      }
    }
  },
  computed: {
    minDate() {
      const today = new Date()
      return today.toISOString().split('T')[0]
    },
    diasCalculados() {
      if (!this.form.fecha_inicio || !this.form.fecha_fin) return 0
      const inicio = new Date(this.form.fecha_inicio)
      const fin = new Date(this.form.fecha_fin)
      const diffTime = Math.abs(fin - inicio)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
      return diffDays > 0 ? diffDays : 0
    },
    puedeEnviar() {
      if (!this.form.tipo || !this.form.fecha_inicio || !this.form.fecha_fin) return false
      if (this.diasCalculados <= 0) return false
      if (this.form.tipo === 'VACACION' && this.diasCalculados > this.diasDisponibles) return false
      return true
    }
  },
  async mounted() {
    await this.cargarSaldo()
  },
  methods: {
    async cargarSaldo() {
      try {
        const response = await authEmpleado.getSaldoVacaciones()
        this.diasDisponibles = response.data?.disponibles || 15
      } catch (err) {
        console.error('Error:', err)
      }
    },
    async enviarSolicitud() {
      if (!this.puedeEnviar) return
      
      this.loading = true
      try {
        await authEmpleado.crearSolicitudLicencia({
          tipo: this.form.tipo,
          fecha_inicio: this.form.fecha_inicio,
          fecha_fin: this.form.fecha_fin,
          motivo: this.form.motivo,
          dias_solicitados: this.diasCalculados
        })
        
        const notification = useNotification()
        notification.success('Solicitud enviada correctamente. Te notificaremos cuando sea procesada.')
        
        this.$router.push('/empleado/licencias')
      } catch (err) {
        const notification = useNotification()
        notification.error(err.response?.data?.message || 'Error al enviar solicitud')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.solicitar-licencia-container {
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 24px;
}

.saldo-info {
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  border: 1px solid #e2e8f0;
}

.saldo-card {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
}

.saldo-card i {
  font-size: 32px;
  color: #f59e0b;
}

.saldo-num {
  display: block;
  font-size: 36px;
  font-weight: 700;
  color: #1e293b;
  line-height: 1;
}

.saldo-label {
  font-size: 14px;
  color: #64748b;
}

.saldo-detail {
  font-size: 13px;
  color: #64748b;
  margin: 0;
  padding-top: 12px;
  border-top: 1px solid #f1f5f9;
}

.solicitud-form {
  background: white;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid #e2e8f0;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  margin-bottom: 8px;
}

.form-group label i {
  color: #667eea;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
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

.textarea {
  resize: vertical;
  min-height: 100px;
}

.dias-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #dbeafe;
  border-radius: 10px;
  color: #1e40af;
  font-size: 14px;
  margin-bottom: 20px;
}

.dias-error {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #fee2e2;
  border-radius: 10px;
  color: #991b1b;
  font-size: 14px;
  margin-bottom: 20px;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 28px;
}

.btn-cancel,
.btn-submit {
  flex: 1;
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

.btn-cancel {
  background: #f1f5f9;
  border: 2px solid #e2e8f0;
  color: #475569;
}

.btn-cancel:hover {
  background: #e2e8f0;
}

.btn-submit {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.btn-submit:disabled {
  opacity: 0.6;
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

@media (max-width: 480px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
