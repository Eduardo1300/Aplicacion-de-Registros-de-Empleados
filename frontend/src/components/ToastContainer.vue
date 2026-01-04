<template>
  <div class="toast-container">
    <transition-group name="toast-slide" tag="div">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast-wrapper"
        :class="{ 'is-visible': toast.isVisible }"
      >
        <div
          class="toast"
          :style="{
            backgroundColor: toast.bgColor,
            borderLeftColor: toast.borderColor
          }"
        >
          <!-- Icono del toast -->
          <div class="toast-icon">
            <span>{{ toast.icon }}</span>
          </div>

          <!-- Contenido del toast -->
          <div class="toast-content">
            <p class="toast-message">{{ toast.message }}</p>
          </div>

          <!-- Botón cerrar -->
          <button
            class="toast-close"
            @click="removeToast(toast.id)"
            aria-label="Cerrar notificación"
          >
            <i class="bi bi-x"></i>
          </button>

          <!-- Barra de progreso -->
          <div
            class="toast-progress"
            :style="{ width: toast.progress + '%' }"
          ></div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getNotificationState, getRemoveToast } from '../services/notification.service'

const notificationState = getNotificationState()
const removeToast = getRemoveToast()

// Computed para obtener los toasts reactivamente
const toasts = computed(() => notificationState.toasts)
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  pointer-events: none;
  max-width: 450px;
}

.toast-wrapper {
  margin-bottom: 12px;
  pointer-events: auto;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.toast-wrapper.is-visible {
  opacity: 1;
}

.toast {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background-color: #10b981;
  border-left: 5px solid #059669;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  background-color: var(--toast-bg);
  border-left-color: var(--toast-border);
  min-height: 48px;
  font-size: 14px;
}

.toast-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  flex-shrink: 0;
  font-weight: bold;
  color: white;
  font-size: 14px;
}

.toast-content {
  flex: 1;
  min-width: 0;
}

.toast-message {
  margin: 0;
  color: white;
  font-weight: 500;
  word-break: break-word;
  line-height: 1.4;
}

.toast-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: none;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 4px;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s ease;
  font-size: 16px;
  line-height: 1;
}

.toast-close:hover {
  background-color: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.toast-close:active {
  transform: scale(0.95);
}

.toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background-color: rgba(255, 255, 255, 0.5);
  transition: width 0.05s linear;
}

/* Transiciones de entrada y salida */
.toast-slide-enter-active {
  animation: slideInRight 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.toast-slide-leave-active {
  animation: slideOutRight 0.3s cubic-bezier(0.36, 0, 0.66, -0.56);
}

.toast-slide-move {
  transition: all 0.3s ease;
}

@keyframes slideInRight {
  from {
    transform: translateX(450px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOutRight {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(450px);
    opacity: 0;
  }
}

/* Responsive */
@media (max-width: 640px) {
  .toast-container {
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
  }

  .toast {
    padding: 12px 14px;
    font-size: 13px;
  }

  .toast-icon {
    width: 22px;
    height: 22px;
    font-size: 12px;
  }

  .toast-close {
    width: 24px;
    height: 24px;
    font-size: 14px;
  }

  @keyframes slideInRight {
    from {
      transform: translateX(100vw);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100vw);
      opacity: 0;
    }
  }
}

/* Dark mode support (opcional) */
@media (prefers-color-scheme: dark) {
  .toast-progress {
    background-color: rgba(255, 255, 255, 0.4);
  }
}
</style>
