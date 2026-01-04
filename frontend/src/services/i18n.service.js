/**
 * i18n Service - Servicio de internacionalización (multiidioma)
 */

import { ref } from 'vue'

const currentLocale = ref(localStorage.getItem('locale') || 'es')
const translations = {
  es: { 'hello': 'Hola', 'goodbye': 'Adiós', 'welcome': 'Bienvenido', 'error': 'Error' },
  en: { 'hello': 'Hello', 'goodbye': 'Goodbye', 'welcome': 'Welcome', 'error': 'Error' },
  pt: { 'hello': 'Olá', 'goodbye': 'Adeus', 'welcome': 'Bem-vindo', 'error': 'Erro' },
  fr: { 'hello': 'Bonjour', 'goodbye': 'Au revoir', 'welcome': 'Bienvenue', 'error': 'Erreur' }
}

export const useI18n = () => ({
  currentLocale,
  availableLocales: Object.keys(translations),
  t: (key) => translations[currentLocale.value]?.[key] || key,
  setLocale: (locale) => {
    if (translations[locale]) {
      currentLocale.value = locale
      localStorage.setItem('locale', locale)
      document.documentElement.lang = locale
    }
  },
  addTranslations: (locale, msgs) => {
    if (!translations[locale]) translations[locale] = {}
    Object.assign(translations[locale], msgs)
  },
  getAll: (locale) => translations[locale] || {}
})
