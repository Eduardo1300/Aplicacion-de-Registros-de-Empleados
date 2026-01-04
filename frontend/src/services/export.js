/**
 * Servicio de Exportación de Datos
 * Soporta: Excel (XLSX), PDF, CSV
 */

import * as XLSX from 'xlsx'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

/**
 * Exporta un array de objetos a Excel
 * @param {Array} data - Datos a exportar
 * @param {string} filename - Nombre del archivo
 * @param {string} sheetName - Nombre de la hoja
 */
export const exportToExcel = (data, filename = 'export.xlsx', sheetName = 'Data') => {
  if (!data || data.length === 0) {
    console.warn('No data to export')
    return
  }

  // Crear workbook
  const ws = XLSX.utils.json_to_sheet(data)
  
  // Ajustar ancho de columnas
  const colWidths = Object.keys(data[0]).map(key => ({
    wch: Math.max(12, key.length + 2)
  }))
  ws['!cols'] = colWidths

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, sheetName)

  // Descargar
  XLSX.writeFile(wb, filename)
}

/**
 * Exporta un array de objetos a CSV
 * @param {Array} data - Datos a exportar
 * @param {string} filename - Nombre del archivo
 */
export const exportToCSV = (data, filename = 'export.csv') => {
  if (!data || data.length === 0) {
    console.warn('No data to export')
    return
  }

  const ws = XLSX.utils.json_to_sheet(data)
  const csv = XLSX.utils.sheet_to_csv(ws)

  // Crear blob y descargar
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  downloadBlob(blob, filename)
}

/**
 * Exporta HTML a PDF usando jsPDF y html2canvas
 * @param {string} htmlContent - Contenido HTML
 * @param {string} filename - Nombre del archivo
 */
export const exportToPDF = async (htmlContent, filename = 'export.pdf') => {
  try {
    // Crear elemento temporal
    const element = document.createElement('div')
    element.innerHTML = htmlContent
    element.style.padding = '10px'
    element.style.backgroundColor = 'white'
    document.body.appendChild(element)

    // Convertir a canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#ffffff'
    })

    // Crear PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })

    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = pageWidth - 10
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    let heightLeft = imgHeight
    let position = 0

    const imgData = canvas.toDataURL('image/png')

    // Agregar imágenes a múltiples páginas si es necesario
    while (heightLeft >= 0) {
      pdf.addImage(imgData, 'PNG', 5, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
      position -= pageHeight
      if (heightLeft > 0) {
        pdf.addPage()
      }
    }

    pdf.save(filename)

    // Limpiar elemento temporal
    document.body.removeChild(element)
  } catch (error) {
    console.error('Error generating PDF:', error)
  }
}

/**
 * Exporta una tabla HTML a PDF
 * @param {string} tableId - ID de la tabla HTML
 * @param {string} filename - Nombre del archivo
 * @param {string} title - Título del documento
 */
export const exportTableToPDF = async (tableId, filename = 'table.pdf', title = 'Reporte') => {
  const table = document.getElementById(tableId)
  
  if (!table) {
    console.error(`Table with id '${tableId}' not found`)
    return
  }

  const htmlContent = `
    <h1 style="text-align: center; margin-bottom: 20px;">${title}</h1>
    <p style="text-align: center; color: #666; margin-bottom: 20px; font-size: 12px;">
      Generado el: ${new Date().toLocaleString('es-ES')}
    </p>
    ${table.outerHTML}
  `

  await exportToPDF(htmlContent, filename)
}

/**
 * Exporta una tabla HTML a Excel
 * @param {string} tableId - ID de la tabla HTML
 * @param {string} filename - Nombre del archivo
 * @param {string} sheetName - Nombre de la hoja
 */
export const exportTableToExcel = (tableId, filename = 'table.xlsx', sheetName = 'Datos') => {
  const table = document.getElementById(tableId)
  
  if (!table) {
    console.error(`Table with id '${tableId}' not found`)
    return
  }

  const ws = XLSX.utils.table_to_sheet(table)
  
  // Ajustar ancho de columnas
  const colWidths = Array.from(table.querySelectorAll('th')).map(th => ({
    wch: Math.max(12, th.textContent.length + 2)
  }))
  ws['!cols'] = colWidths

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, sheetName)

  XLSX.writeFile(wb, filename)
}

/**
 * Exporta array de objetos a tabla HTML formateada
 * @param {Array} data - Datos a exportar
 * @param {Array} columns - Columnas a mostrar (nombres de propiedades)
 * @param {string} title - Título de la tabla
 * @returns {string} HTML de la tabla
 */
export const generateTableHTML = (data, columns = null, title = 'Reporte') => {
  if (!data || data.length === 0) {
    return `<p>No hay datos para mostrar</p>`
  }

  // Usar todas las columnas si no se especifican
  const cols = columns || Object.keys(data[0])

  let html = `
    <div style="padding: 20px; font-family: Arial, sans-serif;">
      <h2 style="text-align: center; color: #333; margin-bottom: 10px;">${title}</h2>
      <p style="text-align: center; color: #999; font-size: 12px; margin-bottom: 20px;">
        Generado el ${new Date().toLocaleString('es-ES')}
      </p>
      <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
        <thead>
          <tr style="background-color: #f5f5f5; border-bottom: 2px solid #ddd;">
  `

  // Encabezados
  cols.forEach(col => {
    html += `<th style="padding: 10px; text-align: left; font-weight: bold; border: 1px solid #ddd;">${col}</th>`
  })

  html += `</tr></thead><tbody>`

  // Datos
  data.forEach((row, idx) => {
    const bgColor = idx % 2 === 0 ? '#fff' : '#f9f9f9'
    html += `<tr style="background-color: ${bgColor}; border-bottom: 1px solid #ddd;">`
    
    cols.forEach(col => {
      const value = row[col] || '-'
      html += `<td style="padding: 10px; border: 1px solid #ddd;">${formatValue(value)}</td>`
    })
    
    html += `</tr>`
  })

  html += `</tbody></table></div>`
  
  return html
}

/**
 * Formatea un valor para mostrar en tabla
 */
const formatValue = (value) => {
  if (value === null || value === undefined) return '-'
  if (value instanceof Date) return value.toLocaleDateString('es-ES')
  if (typeof value === 'boolean') return value ? 'Sí' : 'No'
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}

/**
 * Descarga un blob como archivo
 */
const downloadBlob = (blob, filename) => {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

/**
 * Genera datos para descarga con delimitador personalizado
 */
export const exportWithDelimiter = (data, filename, delimiter = ',') => {
  if (!data || data.length === 0) {
    console.warn('No data to export')
    return
  }

  const keys = Object.keys(data[0])
  
  // Encabezados
  let content = keys.map(k => `"${k}"`).join(delimiter) + '\n'
  
  // Datos
  data.forEach(row => {
    content += keys.map(k => {
      const value = row[k] || ''
      // Escapar comillas en valores
      return `"${String(value).replace(/"/g, '""')}"`
    }).join(delimiter) + '\n'
  })

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' })
  downloadBlob(blob, filename)
}

export default {
  exportToExcel,
  exportToCSV,
  exportToPDF,
  exportTableToPDF,
  exportTableToExcel,
  generateTableHTML,
  exportWithDelimiter
}
