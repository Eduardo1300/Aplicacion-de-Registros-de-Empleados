<template>
  <div class="export-buttons">
    <div class="export-group">
      <button
        @click="handleExportExcel"
        class="export-btn export-excel"
        title="Descargar como Excel"
        :disabled="disabled || !hasData"
      >
        <i class="bi bi-file-earmark-spreadsheet"></i>
        <span>Excel</span>
      </button>
      <button
        @click="handleExportCSV"
        class="export-btn export-csv"
        title="Descargar como CSV"
        :disabled="disabled || !hasData"
      >
        <i class="bi bi-file-text"></i>
        <span>CSV</span>
      </button>
      <button
        @click="handleExportPDF"
        class="export-btn export-pdf"
        title="Descargar como PDF"
        :disabled="disabled || !hasData"
      >
        <i class="bi bi-file-earmark-pdf"></i>
        <span>PDF</span>
      </button>
      <button
        v-if="showPrint"
        @click="handlePrint"
        class="export-btn export-print"
        title="Imprimir"
        :disabled="disabled"
      >
        <i class="bi bi-printer"></i>
        <span>Imprimir</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { exportToExcel, exportToCSV, exportTableToPDF, generateTableHTML } from '../services/export'

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  tableId: {
    type: String,
    default: null
  },
  filename: {
    type: String,
    default: 'export'
  },
  title: {
    type: String,
    default: 'Reporte'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  showPrint: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['exported', 'error'])

const hasData = computed(() => {
  if (props.data && props.data.length > 0) return true
  if (props.tableId) {
    const table = document.getElementById(props.tableId)
    if (table) {
      const rows = table.querySelectorAll('tbody tr')
      return rows.length > 0
    }
  }
  return false
})

const dataToExport = computed(() => {
  if (props.data && props.data.length > 0) {
    return props.data.map(item => flattenObject(item))
  }
  
  if (props.tableId) {
    const table = document.getElementById(props.tableId)
    if (table) {
      return extractTableData(table)
    }
  }
  
  return []
})

const flattenObject = (obj, prefix = '') => {
  const result = {}
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = prefix ? `${prefix}_${key}` : key
      const value = obj[key]
      
      if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        Object.assign(result, flattenObject(value, newKey))
      } else {
        if (value !== null && typeof value === 'object' && Array.isArray(value)) {
          result[newKey] = value.length + ' elementos'
        } else {
          result[newKey] = value !== null ? String(value) : ''
        }
      }
    }
  }
  
  return result
}

const extractTableData = (table) => {
  const headers = Array.from(table.querySelectorAll('th'))
    .map(th => th.textContent.trim())
  
  const rows = Array.from(table.querySelectorAll('tbody tr'))
    .map(tr => {
      const cells = Array.from(tr.querySelectorAll('td'))
        .map(td => td.textContent.trim())
      
      const row = {}
      headers.forEach((header, index) => {
        row[header] = cells[index] || ''
      })
      return row
    })
  
  return rows
}

const handleExportExcel = () => {
  if (!hasData.value) {
    console.warn('No data to export')
    return
  }
  try {
    if (props.tableId) {
      exportTableToExcel(props.tableId, `${props.filename}.xlsx`, props.title)
    } else {
      exportToExcel(dataToExport.value, `${props.filename}.xlsx`, props.title)
    }
    emit('exported', { format: 'excel', filename: `${props.filename}.xlsx` })
  } catch (error) {
    console.error('Error exportando a Excel:', error)
    emit('error', error)
  }
}

const handleExportCSV = () => {
  if (!hasData.value) {
    console.warn('No data to export')
    return
  }
  try {
    exportToCSV(dataToExport.value, `${props.filename}.csv`)
    emit('exported', { format: 'csv', filename: `${props.filename}.csv` })
  } catch (error) {
    console.error('Error exportando a CSV:', error)
    emit('error', error)
  }
}

const handleExportPDF = async () => {
  if (!hasData.value) {
    console.warn('No data to export')
    return
  }
  try {
    if (props.tableId) {
      await exportTableToPDF(props.tableId, `${props.filename}.pdf`, props.title)
    } else {
      const flattenedData = dataToExport.value
      if (flattenedData.length > 0) {
        const columns = Object.keys(flattenedData[0])
        const html = generateTableHTML(flattenedData, columns, props.title)
        await exportToPDF(html, `${props.filename}.pdf`)
      }
    }
    emit('exported', { format: 'pdf', filename: `${props.filename}.pdf` })
  } catch (error) {
    console.error('Error exportando a PDF:', error)
    emit('error', error)
  }
}

const handlePrint = () => {
  window.print()
  emit('exported', { format: 'print' })
}
</script>

<style scoped>
.export-buttons {
  display: flex;
  align-items: center;
  gap: 12px;
}

.export-group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.export-label {
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
  white-space: nowrap;
  margin: 0;
}

.export-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.export-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.export-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.export-excel {
  border-color: #10b981;
  color: #10b981;
}

.export-excel:hover:not(:disabled) {
  background: #f0fdf4;
}

.export-csv {
  border-color: #f59e0b;
  color: #f59e0b;
}

.export-csv:hover:not(:disabled) {
  background: #fffbeb;
}

.export-pdf {
  border-color: #ef4444;
  color: #ef4444;
}

.export-pdf:hover:not(:disabled) {
  background: #fef2f2;
}

.export-print {
  border-color: #3b82f6;
  color: #3b82f6;
}

.export-print:hover:not(:disabled) {
  background: #f0f9ff;
}

.export-btn i {
  font-size: 14px;
}

@media (max-width: 768px) {
  .export-buttons {
    flex-wrap: wrap;
  }

  .export-btn {
    padding: 6px 10px;
    font-size: 11px;
  }

  .export-label {
    font-size: 12px;
  }
}
</style>
