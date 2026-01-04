<template>
  <div class="advanced-search-container">
    <!-- Header -->
    <div class="search-header">
      <h5 class="mb-0">
        <i class="bi bi-search"></i> Búsqueda Avanzada
      </h5>
      <button 
        @click="toggleAdvanced" 
        class="btn btn-sm btn-outline-secondary"
        :aria-expanded="isExpanded"
      >
        <i class="bi" :class="isExpanded ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
      </button>
    </div>

    <!-- Search Bar -->
    <div class="search-bar">
      <div class="input-group">
        <span class="input-group-text">
          <i class="bi bi-search"></i>
        </span>
        <input
          v-model="searchText"
          type="text"
          class="form-control"
          placeholder="Buscar en todos los campos..."
          @input="performSearch"
        />
        <button 
          @click="clearSearch" 
          class="btn btn-outline-secondary"
          v-if="searchText"
        >
          <i class="bi bi-x-circle"></i>
        </button>
      </div>

      <!-- Saved Searches Dropdown -->
      <div class="ms-2">
        <div class="dropdown">
          <button
            class="btn btn-outline-info btn-sm dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="bi bi-bookmark"></i> Guardadas
          </button>
          <ul class="dropdown-menu">
            <li v-if="savedSearches.length === 0">
              <span class="dropdown-item-text text-muted">Sin búsquedas guardadas</span>
            </li>
            <li v-for="search in savedSearches" :key="search.id">
              <a class="dropdown-item" href="#" @click.prevent="loadSearch(search)">
                <i class="bi bi-check-circle"></i> {{ search.name }}
              </a>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <a class="dropdown-item text-danger" href="#" @click.prevent="clearSavedSearches">
                <i class="bi bi-trash"></i> Limpiar todo
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Advanced Filters (Expandable) -->
    <div v-if="isExpanded" class="advanced-filters mt-3">
      <div class="filter-row">
        <!-- Field Selector -->
        <div class="filter-group">
          <label class="form-label">Campo</label>
          <select v-model="selectedField" class="form-select form-select-sm">
            <option value="">Seleccionar campo...</option>
            <option v-for="field in availableFields" :key="field" :value="field">
              {{ field }}
            </option>
          </select>
        </div>

        <!-- Operator Selector -->
        <div class="filter-group">
          <label class="form-label">Operador</label>
          <select v-model="selectedOperator" class="form-select form-select-sm">
            <option value="contains">Contiene</option>
            <option value="equals">Igual a</option>
            <option value="startsWith">Comienza con</option>
            <option value="endsWith">Termina con</option>
            <option value="gt">Mayor que</option>
            <option value="lt">Menor que</option>
            <option value="between">Entre</option>
          </select>
        </div>

        <!-- Value Input -->
        <div class="filter-group">
          <label class="form-label">Valor</label>
          <input
            v-model="filterValue"
            type="text"
            class="form-control form-control-sm"
            placeholder="Valor a buscar..."
          />
        </div>

        <!-- Add Filter Button -->
        <div class="filter-group align-self-end">
          <button @click="addFilter" class="btn btn-sm btn-primary">
            <i class="bi bi-plus"></i> Agregar
          </button>
        </div>
      </div>

      <!-- Applied Filters -->
      <div v-if="filters.length > 0" class="applied-filters mt-2">
        <div class="filter-badge-group">
          <span 
            v-for="(filter, idx) in filters" 
            :key="idx"
            class="badge bg-info"
          >
            {{ filter.field }} {{ filter.operator }} "{{ filter.value }}"
            <i 
              class="bi bi-x-circle ms-1 cursor-pointer" 
              @click="removeFilter(idx)"
              style="cursor: pointer"
            ></i>
          </span>
        </div>

        <!-- Save Search -->
        <div class="mt-2">
          <div class="input-group input-group-sm">
            <input
              v-model="searchName"
              type="text"
              class="form-control"
              placeholder="Nombre para guardar esta búsqueda..."
            />
            <button @click="saveSearch" class="btn btn-outline-success">
              <i class="bi bi-bookmark-check"></i> Guardar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Search Info -->
    <div v-if="resultCount !== null" class="search-info mt-2">
      <small class="text-muted">
        <i class="bi bi-info-circle"></i>
        {{ resultCount }} resultado(s) encontrado(s)
      </small>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useNotification } from '../services/notification'

const props = defineProps({
  fields: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['search'])

const notification = useNotification()

// State
const searchText = ref('')
const isExpanded = ref(false)
const selectedField = ref('')
const selectedOperator = ref('contains')
const filterValue = ref('')
const filters = ref([])
const savedSearches = ref([])
const searchName = ref('')
const resultCount = ref(null)

// Computed
const availableFields = computed(() => props.fields)

// Methods
const toggleAdvanced = () => {
  isExpanded.value = !isExpanded.value
}

const performSearch = () => {
  const query = {
    text: searchText.value,
    filters: filters.value
  }
  emit('search', query)
  resultCount.value = 0 // Will be updated by parent
  
  // Load saved searches from localStorage
  loadSavedSearchesFromStorage()
}

const clearSearch = () => {
  searchText.value = ''
  filters.value = []
  selectedField.value = ''
  filterValue.value = ''
  performSearch()
}

const addFilter = () => {
  if (!selectedField.value || !filterValue.value) {
    notification.warning('Por favor completa campo y valor')
    return
  }

  filters.value.push({
    field: selectedField.value,
    operator: selectedOperator.value,
    value: filterValue.value
  })

  selectedField.value = ''
  filterValue.value = ''
  performSearch()
}

const removeFilter = (index) => {
  filters.value.splice(index, 1)
  performSearch()
}

const saveSearch = () => {
  if (!searchName.value.trim()) {
    notification.warning('Por favor ingresa un nombre para la búsqueda')
    return
  }

  const newSearch = {
    id: Date.now(),
    name: searchName.value,
    text: searchText.value,
    filters: [...filters.value],
    timestamp: new Date().toLocaleString('es-ES')
  }

  savedSearches.value.push(newSearch)
  saveSearchesToStorage()
  notification.success(`Búsqueda "${searchName.value}" guardada`)
  searchName.value = ''
}

const loadSearch = (search) => {
  searchText.value = search.text
  filters.value = [...search.filters]
  performSearch()
}

const clearSavedSearches = () => {
  if (confirm('¿Eliminar todas las búsquedas guardadas?')) {
    savedSearches.value = []
    localStorage.removeItem('advancedSearches')
    notification.success('Búsquedas guardadas eliminadas')
  }
}

const saveSearchesToStorage = () => {
  localStorage.setItem('advancedSearches', JSON.stringify(savedSearches.value))
}

const loadSavedSearchesFromStorage = () => {
  const stored = localStorage.getItem('advancedSearches')
  if (stored) {
    savedSearches.value = JSON.parse(stored)
  }
}

// Initialize
loadSavedSearchesFromStorage()
</script>

<style scoped>
.advanced-search-container {
  background: var(--color-card-bg);
  padding: 1rem;
  border-radius: 0.375rem;
  border: 1px solid var(--color-border);
  margin-bottom: 1rem;
}

.search-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 2px solid var(--color-border);
  padding-bottom: 0.5rem;
}

.search-header h5 {
  color: var(--color-text);
  font-weight: 600;
}

.search-header i {
  margin-right: 0.5rem;
  color: #667eea;
}

.search-bar {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.search-bar .input-group {
  flex: 1;
  min-width: 200px;
}

.advanced-filters {
  background: var(--color-bg);
  padding: 1rem;
  border-radius: 0.375rem;
  border-left: 4px solid #667eea;
}

.filter-row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: flex-end;
}

.filter-group {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 150px;
}

.filter-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: 0.25rem;
}

.filter-group .form-control,
.filter-group .form-select {
  font-size: 0.875rem;
}

.applied-filters {
  background: var(--color-card-bg);
  padding: 1rem;
  border-radius: 0.375rem;
  border: 1px dashed var(--color-border);
}

.filter-badge-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.badge {
  font-size: 0.85rem;
  padding: 0.5rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.badge i {
  cursor: pointer;
  transition: color 0.2s;
}

.badge i:hover {
  color: #fff;
}

.search-info {
  color: #6c757d;
  font-size: 0.875rem;
}

/* Dark mode */
[data-theme="dark"] .advanced-search-container {
  background: #2d2d2d;
  border-color: #404040;
}

[data-theme="dark"] .search-header {
  border-bottom-color: #404040;
}

[data-theme="dark"] .advanced-filters {
  background: #1a1a1a;
}

[data-theme="dark"] .applied-filters {
  background: #2d2d2d;
  border-color: #404040;
}

/* Responsive */
@media (max-width: 768px) {
  .search-bar {
    flex-direction: column;
  }

  .search-bar .input-group {
    min-width: 100%;
  }

  .filter-row {
    flex-direction: column;
  }

  .filter-group {
    min-width: 100%;
  }
}
</style>
