/**
 * QR Code Generator - Generador de códigos QR
 */

export const useQRCodeGenerator = () => ({
  generate: async (text, options = {}) => {
    const QRCode = window.QRCode
    if (!QRCode) {
      console.error('QRCode library not loaded')
      return null
    }
    return new Promise((resolve) => {
      const qr = new QRCode({
        text,
        width: options.width || 200,
        height: options.height || 200,
        colorDark: options.dark || '#000000',
        colorLight: options.light || '#ffffff',
        correctLevel: options.level || 'M'
      })
      resolve(qr.canvas.toDataURL())
    })
  },
  downloadQRCode: async (text, filename = 'qrcode') => {
    const dataUrl = await this.generate(text)
    if (dataUrl) {
      const a = document.createElement('a')
      a.href = dataUrl
      a.download = `${filename}.png`
      a.click()
    }
  }
})
