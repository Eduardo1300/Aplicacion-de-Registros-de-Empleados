/**
 * Encryption Service - Servicio de encriptación simple
 */

export const useEncryption = () => ({
  encode: (str) => btoa(encodeURIComponent(str)),
  decode: (str) => {
    try {
      return decodeURIComponent(atob(str))
    } catch (e) {
      return str
    }
  },
  hash: async (str) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(str)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('')
  },
  generateToken: () => Math.random().toString(36).substr(2) + Date.now().toString(36),
  obfuscate: (str) => str.split('').map((c, i) => String.fromCharCode(c.charCodeAt(0) + i)).join(''),
  deobfuscate: (str) => str.split('').map((c, i) => String.fromCharCode(c.charCodeAt(0) - i)).join('')
})
