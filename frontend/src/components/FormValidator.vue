<template>
  <div class="form-field">
    <!-- Label -->
    <label v-if="label" :for="fieldId" class="form-label">
      {{ label }}
      <span v-if="required" class="required-asterisk">*</span>
    </label>

    <!-- Input Field -->
    <div class="input-wrapper">
      <input
        :id="fieldId"
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :class="['form-control', { 'is-invalid': hasError, 'is-valid': isValid }]"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="validateField"
        @keyup.enter="validateField"
      />

      <!-- Help Icon -->
      <span v-if="help" class="help-icon" :title="help">
        <i class="bi bi-info-circle"></i>
      </span>
    </div>

    <!-- Error Messages -->
    <div v-if="hasError" class="error-messages">
      <small v-for="(error, idx) in errors" :key="idx" class="error-text">
        <i class="bi bi-exclamation-circle"></i> {{ error }}
      </small>
    </div>

    <!-- Success Message -->
    <div v-else-if="isValid && validateOnChange" class="success-message">
      <small class="success-text">
        <i class="bi bi-check-circle"></i> Válido
      </small>
    </div>

    <!-- Help Text -->
    <small v-if="hint && !hasError" class="hint-text">{{ hint }}</small>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  fieldId: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: null
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  rules: {
    type: Array,
    default: () => []
  },
  required: {
    type: Boolean,
    default: false
  },
  hint: {
    type: String,
    default: null
  },
  help: {
    type: String,
    default: null
  },
  validateOnChange: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'validated'])

const errors = ref([])
const isValid = ref(false)

const hasError = computed(() => errors.value.length > 0)

const validateField = () => {
  errors.value = []
  isValid.value = false

  const valor = props.modelValue

  // Ejecutar cada regla
  for (const rule of props.rules) {
    const resultado = typeof rule === 'function' ? rule(valor) : rule
    if (resultado !== true && resultado) {
      errors.value.push(resultado)
    }
  }

  isValid.value = errors.value.length === 0 && valor !== ''
  
  emit('validated', {
    field: props.fieldId,
    valid: isValid.value,
    errors: errors.value
  })
}

// Exponer método para validar desde padre
defineExpose({
  validateField,
  isValid,
  errors
})
</script>

<style scoped>
.form-field {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-weight: 600;
  color: var(--color-text);
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
}

.required-asterisk {
  color: #dc3545;
  margin-left: 0.25rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.form-control {
  width: 100%;
  padding: 0.75rem 1rem;
  padding-right: 2.5rem;
  border: 2px solid var(--color-border);
  border-radius: 0.375rem;
  background: var(--color-input-bg);
  color: var(--color-text);
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-control:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
  background: var(--color-input-bg);
}

.form-control.is-invalid {
  border-color: #dc3545;
  background: rgba(220, 53, 69, 0.05);
}

.form-control.is-invalid:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}

.form-control.is-valid {
  border-color: #28a745;
  background: rgba(40, 167, 69, 0.05);
}

.form-control.is-valid:focus {
  border-color: #28a745;
  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
}

.help-icon {
  position: absolute;
  right: 0.75rem;
  color: #6c757d;
  cursor: help;
  font-size: 1.1rem;
}

.help-icon:hover {
  color: #495057;
}

.error-messages {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.error-text {
  color: #dc3545;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.error-text i {
  font-size: 1rem;
}

.success-message {
  display: block;
}

.success-text {
  color: #28a745;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.success-text i {
  font-size: 1rem;
}

.hint-text {
  color: #6c757d;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

/* Dark mode */
[data-theme="dark"] .form-label {
  color: #e0e0e0;
}

[data-theme="dark"] .form-control {
  background: #3a3a3a;
  color: #e0e0e0;
  border-color: #404040;
}

[data-theme="dark"] .form-control:focus {
  background: #3a3a3a;
  color: #e0e0e0;
  border-color: #667eea;
}

[data-theme="dark"] .help-icon {
  color: #808080;
}

[data-theme="dark"] .hint-text {
  color: #a0a0a0;
}

/* Responsive */
@media (max-width: 576px) {
  .form-field {
    margin-bottom: 1rem;
  }

  .form-control {
    font-size: 16px; /* Prevenir zoom en mobile */
  }
}
</style>
