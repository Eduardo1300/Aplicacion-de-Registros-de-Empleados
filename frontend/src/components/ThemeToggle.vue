<template>
  <div class="theme-toggle">
    <button 
      @click="toggleTheme"
      class="theme-btn"
      :title="isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
      :aria-label="isDark ? 'Modo claro' : 'Modo oscuro'"
    >
      <i :class="isDark ? 'bi bi-sun-fill' : 'bi bi-moon-fill'"></i>
      <span class="theme-label">{{ isDark ? 'Claro' : 'Oscuro' }}</span>
    </button>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useTheme } from '../services/theme.service'

const themeService = useTheme()
const state = reactive({
  isDark: themeService.isDark
})

const toggleTheme = () => {
  themeService.toggleTheme()
  state.isDark = themeService.isDark
}

const isDark = () => state.isDark
</script>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
}

.theme-btn {
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.theme-btn:hover {
  background: rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] .theme-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.theme-btn i {
  font-size: 16px;
}

.theme-label {
  display: none;
}

@media (min-width: 768px) {
  .theme-label {
    display: inline;
  }
}
</style>
