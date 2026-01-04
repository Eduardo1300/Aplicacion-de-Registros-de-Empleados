<template>
  <div class="loading-overlay" v-if="isVisible">
    <div class="loading-content">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">{{ message }}</span>
      </div>
      <p class="mt-3 text-center">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  message: { type: String, default: 'Cargando...' }
})

const isVisible = ref(false)

const show = () => isVisible.value = true
const hide = () => isVisible.value = false

defineExpose({ show, hide })
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
}
</style>
