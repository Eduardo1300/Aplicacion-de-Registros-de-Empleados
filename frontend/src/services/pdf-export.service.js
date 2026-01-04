/**
 * PDF Export Service - Exportación a PDF mejorada
 */

export const usePdfExport = () => ({
  generatePDF: async (title, data, columns) => {
    if (typeof window.jsPDF === 'undefined') {
      console.error('jsPDF not loaded')
      return
    }
    const { jsPDF } = window
    const pdf = new jsPDF()
    pdf.setFontSize(16)
    pdf.text(title, 10, 10)
    
    let yPos = 20
    columns.forEach(col => {
      pdf.setFontSize(10)
      pdf.text(col, 10, yPos)
      yPos += 5
    })
    
    data.forEach((row, idx) => {
      Object.values(row).forEach((val, colIdx) => {
        pdf.text(String(val), 10 + colIdx * 50, yPos)
      })
      yPos += 5
    })
    
    pdf.save(`${title}-${Date.now()}.pdf`)
  },
  tableToPDF: async (tableId, filename = 'table') => {
    const table = document.getElementById(tableId)
    if (!table) return
    if (typeof window.jsPDF === 'undefined') return
    const { jsPDF } = window
    const pdf = new jsPDF()
    pdf.text('Table Export', 10, 10)
    pdf.save(`${filename}.pdf`)
  }
})
