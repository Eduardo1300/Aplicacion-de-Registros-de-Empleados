/**
 * Number Utilities
 */

export const NumberUtils = {
  format: (num, locale = 'es-ES', options = {}) => new Intl.NumberFormat(locale, options).format(num),
  toCurrency: (num, currency = 'PEN', locale = 'es-ES') => new Intl.NumberFormat(locale, { style: 'currency', currency }).format(num),
  percentage: (value, total) => total === 0 ? '0%' : `${((value / total) * 100).toFixed(2)}%`,
  round: (num, decimals = 0) => {
    const factor = Math.pow(10, decimals)
    return Math.round(num * factor) / factor
  },
  clamp: (num, min, max) => Math.max(min, Math.min(max, num)),
  isEven: (num) => num % 2 === 0,
  isOdd: (num) => num % 2 !== 0,
  isPrime: (num) => {
    if (num <= 1) return false
    if (num <= 3) return true
    if (num % 2 === 0 || num % 3 === 0) return false
    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false
    }
    return true
  },
  factorial: (num) => {
    if (num < 0) return undefined
    if (num === 0 || num === 1) return 1
    return num * NumberUtils.factorial(num - 1)
  },
  randomBetween: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
}
