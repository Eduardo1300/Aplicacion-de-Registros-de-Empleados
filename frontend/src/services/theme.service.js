import { reactive, watch } from 'vue'

/**
 * Servicio de Temas (Light/Dark Mode)
 */

const state = reactive({
  theme: localStorage.getItem('theme') || 'light',
  isDark: localStorage.getItem('theme') === 'dark'
})

/**
 * Aplicar tema
 */
const applyTheme = (theme) => {
  state.theme = theme
  state.isDark = theme === 'dark'
  
  const html = document.documentElement
  if (theme === 'dark') {
    html.setAttribute('data-theme', 'dark')
    html.style.colorScheme = 'dark'
  } else {
    html.removeAttribute('data-theme')
    html.style.colorScheme = 'light'
  }
  
  localStorage.setItem('theme', theme)
}

/**
 * Cambiar tema
 */
const toggleTheme = () => {
  const newTheme = state.theme === 'light' ? 'dark' : 'light'
  applyTheme(newTheme)
}

/**
 * Obtener tema actual
 */
const getTheme = () => state.theme

/**
 * Inicializar tema
 */
const initTheme = () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const savedTheme = localStorage.getItem('theme')
  
  const theme = savedTheme || (prefersDark ? 'dark' : 'light')
  applyTheme(theme)
}

/**
 * Escuchar cambios de preferencia del sistema
 */
if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light')
    }
  })
}

export const useTheme = () => ({
  theme: state.theme,
  isDark: state.isDark,
  toggleTheme,
  applyTheme,
  getTheme,
  initTheme
})

export default useTheme
