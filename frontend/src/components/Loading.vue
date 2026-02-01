<template>
  <div v-if="loading" class="loading-overlay" :class="{ 'fullscreen': fullscreen }">
    <div class="loading-spinner">
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
      <p v-if="text" class="loading-text">{{ text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    },
    fullscreen: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.loading-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.loading-overlay.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  z-index: 9999;
}

.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.spinner-ring {
  position: relative;
  width: 48px;
  height: 48px;
  border: 3px solid transparent;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.spinner-ring:nth-child(2) {
  width: 40px;
  height: 40px;
  border-top-color: #764ba2;
  animation-duration: 0.7s;
  animation-direction: reverse;
}

.spinner-ring:nth-child(3) {
  width: 32px;
  height: 32px;
  border-top-color: #f59e0b;
  animation-duration: 0.6s;
}

.loading-text {
  font-size: 14px;
  color: #64748b;
  margin: 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

[data-theme="dark"] .loading-overlay.fullscreen {
  background: rgba(15, 23, 42, 0.9);
}

[data-theme="dark"] .loading-text {
  color: #94a3b8;
}
</style>
