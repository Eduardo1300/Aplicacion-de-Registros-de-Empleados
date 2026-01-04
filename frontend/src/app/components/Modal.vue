<template>
  <div class="modal fade" :class="{ show: isVisible }" :style="{ display: isVisible ? 'block' : 'none' }">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="btn-close" @click="close"></button>
        </div>
        <div class="modal-body">
          <slot></slot>
          <div v-if="showLoadingBar" class="progress mt-3">
            <div class="progress-bar progress-bar-animated" style="width: 100%"></div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="close">{{ cancelText }}</button>
          <button 
            type="button" 
            class="btn btn-primary" 
            @click="confirm"
            :disabled="isLoading"
          >
            <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="isVisible" class="modal-backdrop fade show"></div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: { type: String, default: 'Modal' },
  confirmText: { type: String, default: 'Confirmar' },
  cancelText: { type: String, default: 'Cancelar' },
  isLoading: { type: Boolean, default: false },
  showLoadingBar: { type: Boolean, default: false }
})

const emit = defineEmits(['confirm', 'cancel'])
const isVisible = ref(false)

const open = () => isVisible.value = true
const close = () => {
  isVisible.value = false
  emit('cancel')
}
const confirm = () => {
  emit('confirm')
  if (!props.isLoading) close()
}

defineExpose({ open, close })
</script>

<style scoped>
.modal.show {
  animation: modalFadeIn 0.3s ease-out;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
