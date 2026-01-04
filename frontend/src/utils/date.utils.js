/**
 * Date Utilities
 */

const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

export const DateUtils = {
  formatDate: (date, format = 'dd/MM/yyyy') => {
    const d = new Date(date)
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    const dayName = dayNames[d.getDay()]
    const monthName = monthNames[d.getMonth()]
    return format.replace('dd', day).replace('MM', month).replace('yyyy', year).replace('ddd', dayName).replace('mmm', monthName)
  },
  addDays: (date, days) => {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  },
  addMonths: (date, months) => {
    const result = new Date(date)
    result.setMonth(result.getMonth() + months)
    return result
  },
  getDaysUntil: (date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const target = new Date(date)
    target.setHours(0, 0, 0, 0)
    return Math.floor((target - today) / (1000 * 60 * 60 * 24))
  },
  getWeekday: (date) => dayNames[new Date(date).getDay()],
  isWeekend: (date) => {
    const day = new Date(date).getDay()
    return day === 0 || day === 6
  },
  getDayOfYear: (date) => {
    const d = new Date(date)
    const start = new Date(d.getFullYear(), 0, 0)
    return Math.floor((d - start) / (1000 * 60 * 60 * 24))
  },
  getWeek: (date) => {
    const d = new Date(date)
    d.setHours(0, 0, 0, 0)
    d.setDate(d.getDate() + 4 - (d.getDay() || 7))
    const yearStart = new Date(d.getFullYear(), 0, 1)
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
  },
  isSameDay: (date1, date2) => {
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()
  },
  getDaysBetween: (date1, date2) => {
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    const diff = Math.abs(d2 - d1)
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }
}
