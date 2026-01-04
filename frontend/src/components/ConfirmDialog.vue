<template>
  <!-- Modal Backdrop -->
  <Teleport to="body">
    <div v-if="isVisible" class="modal-backdrop fade show"></div>
    
    <!-- Confirm Dialog Modal -->
    <div v-if="isVisible" class="modal fade show d-block" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <!-- Header -->
          <div :class="['modal-header', `border-${type}`]">
            <h5 class="modal-title">
              <i :class="['bi', getIconClass]"></i>
              {{ title }}
            </h5>
            <button 
              type="button" 
              class="btn-close" 
              @click="cancel"
            ></button>
          </div>

          <!-- Body -->
          <div class="modal-body">
            <p class="mb-3">{{ message }}</p>
            
            <!-- Additional Info -->
            <div v-if="details" class="alert alert-info">
              <small>
                <strong>Detalles:</strong> {{ details }}
              </small>
            </div>

            <!-- Warning for Destructive Actions -->
            <div v-if="type === 'danger'" class="alert alert-warning">
              <i class="bi bi-exclamation-triangle"></i>
              <small>
                <strong>Esta acción no se puede deshacer.</strong> Por favor, confirma que deseas continuar.
              </small>
            </div>

            <!-- Confirmation Input (for critical actions) -->
            <div v-if="requireConfirmationText" class="mt-3">
              <label class="form-label">
                Escribe <strong>"{{ confirmationText }}"</strong> para confirmar:
              </label>
              <input
                v-model="userConfirmationInput"
                type="text"
                class="form-control"
                :placeholder="`Escribe: ${confirmationText}`"
                @keyup.enter="userConfirmationInput === confirmationText && confirm()"
              />
              <small class="text-muted">
                {{ userConfirmationInput.length }} de {{ confirmationText.length }} caracteres
              </small>
            </div>
          </div>

          <!-- Footer -->
          <div class="modal-footer">
            <button 
              type="button" 
              class="btn btn-secondary"
              @click="cancel"
            >
              <i class="bi bi-x-circle"></i> Cancelar
            </button>
            <button 
              type="button" 
              :class="['btn', `btn-${type}`]"
              :disabled="!isConfirmEnabled"
              @click="confirm"
            >
              <i class="bi" :class="getButtonIconClass"></i>
              {{ actionText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, Teleport } from 'vue'
import { useNotification } from '../services/notification'

const notification = useNotification()

// Props
const props = defineProps({
  title: {
    type: String,
    default: 'Confirmar acción'
  },
  message: {
    type: String,
    default: '¿Estás seguro de esta acción?'
  },
  details: {
    type: String,
    default: null
  },
  type: {
    type: String,
    enum: ['primary', 'success', 'warning', 'danger', 'info'],
    default: 'primary'
  },
  actionText: {
    type: String,
    default: 'Confirmar'
  },
  requireConfirmationText: {
    type: Boolean,
    default: false
  },
  confirmationText: {
    type: String,
    default: 'CONFIRMAR'
  }
})

// Emits
const emit = defineEmits(['confirmed', 'cancelled', 'update:visible'])

// State
const isVisible = ref(false)
const userConfirmationInput = ref('')
let resolveCallback = null
let rejectCallback = null

// Computed
const isConfirmEnabled = computed(() => {
  if (props.requireConfirmationText) {
    return userConfirmationInput.value === props.confirmationText
  }
  return true
})

const getIconClass = computed(() => {
  const icons = {
    primary: 'bi-question-circle',
    success: 'bi-check-circle',
    warning: 'bi-exclamation-circle',
    danger: 'bi-trash-fill',
    info: 'bi-info-circle'
  }
  return icons[props.type] || 'bi-question-circle'
})

const getButtonIconClass = computed(() => {
  const icons = {
    primary: 'bi-check',
    success: 'bi-check-circle',
    warning: 'bi-exclamation-triangle',
    danger: 'bi-trash',
    info: 'bi-info-circle'
  }
  return icons[props.type] || 'bi-check'
})

// Methods
const show = () => {
  isVisible.value = true
  userConfirmationInput.value = ''
  return new Promise((resolve, reject) => {
    resolveCallback = resolve
    rejectCallback = reject
  })
}

const confirm = () => {
  if (!isConfirmEnabled.value) return

  isVisible.value = false
  emit('confirmed')
  
  if (resolveCallback) {
    resolveCallback(true)
  }

  notification.success('Acción confirmada')
}

const cancel = () => {
  isVisible.value = false
  emit('cancelled')
  userConfirmationInput.value = ''
  
  if (rejectCallback) {
    rejectCallback(new Error('Acción cancelada'))
  }
}

// Expose methods for parent
defineExpose({
  show,
  isVisible
})
</script>

<style scoped>
.modal.d-block {
  display: flex !important;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}

.modal-dialog {
  width: 100%;
  margin: auto;
  position: relative;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1040;
}

.modal-content {
  background: var(--color-card-bg);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.modal-header {
  border-bottom: 2px solid var(--color-border);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-header.border-danger {
  border-bottom-color: #dc3545 !important;
}

.modal-header.border-warning {
  border-bottom-color: #ffc107 !important;
}

.modal-header.border-primary {
  border-bottom-color: #667eea !important;
}

.modal-header h5 {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
}

.modal-header i {
  font-size: 1.25rem;
}

.modal-body {
  padding: 1.5rem;
}

.modal-body p {
  color: var(--color-text);
  line-height: 1.6;
}

.modal-body .alert {
  margin: 0;
}

.modal-body .form-label {
  color: var(--color-text);
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.modal-body .form-control {
  background: var(--color-input-bg);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.modal-body .form-control:focus {
  background: var(--color-input-bg);
  color: var(--color-text);
  border-color: #667eea;
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}

.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.modal-footer .btn {
  min-width: 100px;
}

.modal-footer .btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Dark mode */
[data-theme="dark"] .modal-content {
  background: #2d2d2d;
  border-color: #404040;
}

[data-theme="dark"] .modal-header {
  border-bottom-color: #404040;
}

[data-theme="dark"] .modal-body {
  color: #e0e0e0;
}

[data-theme="dark"] .modal-footer {
  border-top-color: #404040;
}

[data-theme="dark"] .form-control {
  background: #3a3a3a !important;
  color: #e0e0e0 !important;
  border-color: #404040 !important;
}

[data-theme="dark"] .form-control:focus {
  background: #3a3a3a !important;
  color: #e0e0e0 !important;
  border-color: #667eea !important;
}

/* Responsive */
@media (max-width: 576px) {
  .modal-dialog {
    width: 90%;
    margin: 1rem auto;
  }

  .modal-header,
  .modal-body,
  .modal-footer {
    padding: 1rem;
  }

  .modal-header h5 {
    font-size: 1rem;
  }
}
</style>
