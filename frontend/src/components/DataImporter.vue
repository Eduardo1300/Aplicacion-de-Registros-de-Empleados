<template>
  <div class="data-importer-container">
    <!-- Header -->
    <div class="importer-header">
      <h4>
        <i class="bi bi-upload"></i> Importar Datos
      </h4>
      <p class="text-muted">Carga masiva de empleados desde CSV o Excel</p>
    </div>

    <!-- Step 1: Upload -->
    <div v-if="currentStep === 1" class="step-upload">
      <!-- Drag and Drop -->
      <div
        @drop.prevent="handleDrop"
        @dragover.prevent="isDragging = true"
        @dragleave="isDragging = false"
        :class="['drop-zone', { dragging: isDragging }]"
      >
        <div class="drop-content">
          <i class="bi bi-cloud-arrow-up"></i>
          <h5>Arrastra tu archivo aquí</h5>
          <p>o haz clic para seleccionar</p>
          <input
            type="file"
            ref="fileInput"
            @change="handleFileSelect"
            accept=".csv,.xlsx,.xls"
            style="display: none"
          />
          <button @click="$refs.fileInput.click()" class="btn btn-primary">
            <i class="bi bi-folder-open"></i> Seleccionar Archivo
          </button>
        </div>
      </div>

      <!-- File Info -->
      <div v-if="selectedFile" class="file-info">
        <i class="bi bi-check-circle-fill text-success"></i>
        <div>
          <strong>{{ selectedFile.name }}</strong>
          <small class="text-muted">{{ formatFileSize(selectedFile.size) }}</small>
        </div>
        <button @click="selectedFile = null" class="btn-remove">
          <i class="bi bi-x"></i>
        </button>
      </div>

      <!-- Supported Formats -->
      <div class="supported-formats">
        <p class="text-muted">
          <i class="bi bi-info-circle"></i>
          Formatos soportados: CSV, XLSX, XLS (máximo 10MB)
        </p>
      </div>

      <!-- Next Button -->
      <button
        @click="processFile"
        :disabled="!selectedFile || isProcessing"
        class="btn btn-primary btn-lg"
      >
        <i v-if="!isProcessing" class="bi bi-arrow-right"></i>
        <span v-if="isProcessing">
          <i class="spinner-border spinner-border-sm"></i> Procesando...
        </span>
        <span v-else>Siguiente</span>
      </button>
    </div>

    <!-- Step 2: Column Mapping -->
    <div v-if="currentStep === 2" class="step-mapping">
      <h5>Mapeo de Columnas</h5>
      <p class="text-muted">Relaciona las columnas del archivo con los campos del sistema</p>

      <div class="mapping-table">
        <div v-for="(col, idx) in csvHeaders" :key="idx" class="mapping-row">
          <div class="mapping-col-name">{{ col }}</div>
          <i class="bi bi-arrow-right"></i>
          <select v-model="columnMapping[col]" class="form-select">
            <option value="">-- No importar --</option>
            <option value="nombre">Nombre</option>
            <option value="apellido">Apellido</option>
            <option value="dni">DNI</option>
            <option value="correo">Correo</option>
            <option value="telefono">Teléfono</option>
            <option value="departamento">Departamento</option>
            <option value="cargo">Cargo</option>
            <option value="fechaIngreso">Fecha de Ingreso</option>
          </select>
        </div>
      </div>

      <div class="navigation-buttons">
        <button @click="currentStep = 1" class="btn btn-secondary">
          <i class="bi bi-arrow-left"></i> Atrás
        </button>
        <button @click="currentStep = 3" class="btn btn-primary">
          Siguiente <i class="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>

    <!-- Step 3: Preview -->
    <div v-if="currentStep === 3" class="step-preview">
      <h5>Vista Previa</h5>
      <p class="text-muted">Revisa los datos antes de importar</p>

      <div class="preview-table-wrapper">
        <table class="preview-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>DNI</th>
              <th>Correo</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, idx) in previewData" :key="idx" :class="row.estado">
              <td>{{ idx + 1 }}</td>
              <td>{{ row.nombre }} {{ row.apellido }}</td>
              <td>{{ row.dni }}</td>
              <td>{{ row.correo }}</td>
              <td>
                <span v-if="row.valido" class="badge bg-success">
                  <i class="bi bi-check"></i> Válido
                </span>
                <span v-else class="badge bg-danger">
                  <i class="bi bi-x"></i> Inválido
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="import-stats">
        <div class="stat">
          <span class="label">Total registros:</span>
          <span class="value">{{ previewData.length }}</span>
        </div>
        <div class="stat">
          <span class="label">Válidos:</span>
          <span class="value text-success">{{ validRecords }}</span>
        </div>
        <div class="stat">
          <span class="label">Inválidos:</span>
          <span class="value text-danger">{{ invalidRecords }}</span>
        </div>
      </div>

      <div v-if="invalidRecords > 0" class="alert alert-warning">
        <i class="bi bi-exclamation-triangle"></i>
        <strong>Advertencia:</strong> {{ invalidRecords }} registro(s) tienen errores y no serán importados
      </div>

      <div class="navigation-buttons">
        <button @click="currentStep = 2" class="btn btn-secondary">
          <i class="bi bi-arrow-left"></i> Atrás
        </button>
        <button
          @click="importData"
          :disabled="validRecords === 0 || isImporting"
          class="btn btn-success btn-lg"
        >
          <i v-if="!isImporting" class="bi bi-check-lg"></i>
          <span v-if="isImporting">
            <i class="spinner-border spinner-border-sm"></i> Importando...
          </span>
          <span v-else>Importar {{ validRecords }} registros</span>
        </button>
      </div>
    </div>

    <!-- Step 4: Results -->
    <div v-if="currentStep === 4" class="step-results">
      <div :class="['result-icon', importResults.success ? 'success' : 'error']">
        <i :class="importResults.success ? 'bi bi-check-circle-fill' : 'bi bi-exclamation-circle-fill'"></i>
      </div>

      <h4>{{ importResults.success ? '¡Importación Exitosa!' : 'Error en la Importación' }}</h4>
      <p>{{ importResults.message }}</p>

      <div class="result-stats">
        <div class="stat">
          <i class="bi bi-check-circle text-success"></i>
          <div>
            <strong>Importados:</strong> {{ importResults.imported }}
          </div>
        </div>
        <div class="stat">
          <i class="bi bi-x-circle text-danger"></i>
          <div>
            <strong>Errores:</strong> {{ importResults.errors }}
          </div>
        </div>
      </div>

      <div class="navigation-buttons">
        <button @click="resetImporter" class="btn btn-primary btn-lg">
          <i class="bi bi-arrow-clockwise"></i> Importar Más
        </button>
      </div>
    </div>

    <!-- Step Indicator -->
    <div class="step-indicator">
      <div v-for="step in 4" :key="step" :class="['step', { active: currentStep >= step }]">
        {{ step }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useNotification } from '../services/notification'
import * as XLSX from 'xlsx'

const notification = useNotification()

// State
const currentStep = ref(1)
const selectedFile = ref(null)
const isDragging = ref(false)
const isProcessing = ref(false)
const isImporting = ref(false)
const fileInput = ref(null)

// Data
const csvHeaders = ref([])
const csvData = ref([])
const columnMapping = ref({})
const previewData = ref([])
const importResults = ref({ success: false, imported: 0, errors: 0, message: '' })

// Computed
const validRecords = computed(() => previewData.value.filter(r => r.valido).length)
const invalidRecords = computed(() => previewData.value.filter(r => !r.valido).length)

// Methods
const handleDrop = (e) => {
  isDragging.value = false
  const files = e.dataTransfer.files
  if (files.length > 0) {
    selectedFile.value = files[0]
  }
}

const handleFileSelect = (e) => {
  selectedFile.value = e.target.files[0]
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

const processFile = async () => {
  if (!selectedFile.value) return

  isProcessing.value = true
  try {
    const data = await selectedFile.value.arrayBuffer()
    const workbook = XLSX.read(data, { type: 'array' })
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    const jsonData = XLSX.utils.sheet_to_json(worksheet)

    csvHeaders.value = Object.keys(jsonData[0] || {})
    csvData.value = jsonData

    // Inicializar mapping vacío
    columnMapping.value = {}
    csvHeaders.value.forEach(header => {
      columnMapping.value[header] = ''
    })

    currentStep.value = 2
    notification.success('Archivo procesado correctamente')
  } catch (error) {
    notification.error('Error procesando archivo: ' + error.message)
  } finally {
    isProcessing.value = false
  }
}

const generatePreview = () => {
  previewData.value = csvData.value.map((row, idx) => {
    const mappedRow = { valido: true, _errors: [] }

    // Mapear columnas
    for (const [csvCol, systemField] of Object.entries(columnMapping.value)) {
      if (systemField) {
        mappedRow[systemField] = row[csvCol]
      }
    }

    // Validar datos
    if (!mappedRow.nombre || mappedRow.nombre.trim() === '') {
      mappedRow.valido = false
      mappedRow._errors.push('Nombre requerido')
    }

    if (!mappedRow.dni || mappedRow.dni.toString().trim() === '') {
      mappedRow.valido = false
      mappedRow._errors.push('DNI requerido')
    }

    return mappedRow
  })
}

const importData = async () => {
  generatePreview()

  isImporting.value = true
  const recordsValidos = previewData.value.filter(r => r.valido)

  try {
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    importResults.value = {
      success: true,
      imported: recordsValidos.length,
      errors: invalidRecords.value,
      message: `Se importaron ${recordsValidos.length} empleados exitosamente`
    }

    currentStep.value = 4
    notification.success('Importación completada')
  } catch (error) {
    importResults.value = {
      success: false,
      imported: 0,
      errors: previewData.value.length,
      message: 'Error durante la importación'
    }
    currentStep.value = 4
    notification.error('Error en la importación')
  } finally {
    isImporting.value = false
  }
}

const resetImporter = () => {
  currentStep.value = 1
  selectedFile.value = null
  csvHeaders.value = []
  csvData.value = []
  columnMapping.value = {}
  previewData.value = []
}
</script>

<style scoped>
.data-importer-container {
  background: var(--color-card-bg);
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin: 2rem auto;
}

.importer-header {
  text-align: center;
  margin-bottom: 2rem;
  border-bottom: 2px solid var(--color-border);
  padding-bottom: 1rem;
}

.importer-header h4 {
  color: var(--color-text);
  margin: 0 0 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.importer-header p {
  margin: 0;
}

/* Step Upload */
.drop-zone {
  border: 2px dashed var(--color-border);
  border-radius: 0.5rem;
  padding: 3rem 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
}

.drop-zone:hover {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.05);
}

.drop-zone.dragging {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.1);
  transform: scale(1.02);
}

.drop-content i {
  font-size: 3rem;
  color: #667eea;
  margin-bottom: 1rem;
}

.drop-content h5 {
  color: var(--color-text);
  margin: 1rem 0 0.5rem;
}

.drop-content p {
  color: var(--color-text-muted);
  margin: 0 0 1rem;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(40, 167, 69, 0.1);
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.file-info i {
  font-size: 1.5rem;
}

.btn-remove {
  margin-left: auto;
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  padding: 0.5rem;
}

.btn-remove:hover {
  color: #c82333;
}

.supported-formats {
  text-align: center;
  margin: 1rem 0;
}

/* Step Mapping */
.mapping-table {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.mapping-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.mapping-col-name {
  background: var(--color-bg);
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  min-width: 150px;
  font-weight: 600;
}

.mapping-row i {
  color: #667eea;
}

.mapping-row .form-select {
  flex: 1;
  min-width: 200px;
}

/* Step Preview */
.preview-table-wrapper {
  overflow-x: auto;
  margin-bottom: 2rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
}

.preview-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0;
}

.preview-table th,
.preview-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text);
}

.preview-table th {
  background: var(--color-bg);
  font-weight: 600;
}

.preview-table tbody tr:hover {
  background: rgba(102, 126, 234, 0.05);
}

.import-stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: var(--color-bg);
  border-radius: 0.5rem;
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat .label {
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

.stat .value {
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--color-text);
}

/* Step Results */
.result-icon {
  font-size: 4rem;
  text-align: center;
  margin-bottom: 1rem;
}

.result-icon.success {
  color: #28a745;
}

.result-icon.error {
  color: #dc3545;
}

.step-results h4 {
  text-align: center;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.step-results > p {
  text-align: center;
  color: var(--color-text-muted);
  margin-bottom: 2rem;
}

.result-stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: var(--color-bg);
  border-radius: 0.5rem;
}

.result-stats .stat {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.result-stats i {
  font-size: 1.5rem;
}

/* Navigation */
.navigation-buttons {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.navigation-buttons .btn {
  min-width: 150px;
}

/* Step Indicator */
.step-indicator {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-border);
}

.step {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  background: var(--color-bg);
  color: var(--color-text-muted);
  border: 2px solid var(--color-border);
  transition: all 0.3s ease;
}

.step.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.spinner-border {
  display: inline-block;
  margin-right: 0.5rem;
}
</style>
