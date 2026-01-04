/**
 * String Utilities
 */

export const StringUtils = {
  capitalize: (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '',
  capitalizeWords: (str) => str ? str.split(' ').map(word => StringUtils.capitalize(word)).join(' ') : '',
  slugify: (str) => str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, ''),
  truncate: (str, length, suffix = '...') => !str || str.length <= length ? str : str.slice(0, length - suffix.length) + suffix,
  highlight: (str, query) => !query ? str : str.replace(new RegExp(`(${query})`, 'gi'), '[highlight]$1[/highlight]'),
  removeAccents: (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
  reverse: (str) => str.split('').reverse().join(''),
  isPalindrome: (str) => {
    const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '')
    return clean === StringUtils.reverse(clean)
  },
  repeat: (str, count) => Array(count + 1).join(str),
  pad: (str, length, char = ' ', side = 'both') => {
    const pad = StringUtils.repeat(char, Math.ceil((length - str.length) / 2))
    if (side === 'left') return pad + str
    if (side === 'right') return str + pad
    return pad + str + pad
  }
}
