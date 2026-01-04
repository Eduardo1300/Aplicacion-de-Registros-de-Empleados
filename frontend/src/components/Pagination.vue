<template>
  <div class="pagination-wrapper">
    <div class="pagination-info">
      <span class="result-count">
        Mostrando <strong>{{ startItem }}</strong> - <strong>{{ endItem }}</strong> de <strong>{{ total }}</strong> registros
      </span>
    </div>

    <nav aria-label="Paginación" v-if="totalPages > 1">
      <ul class="pagination">
        <!-- Botón Primera Página -->
        <li class="page-item" :class="{ disabled: isFirstPage }">
          <button
            @click="goToPage(1)"
            class="page-link"
            :disabled="isFirstPage"
            title="Primera página"
          >
            <i class="bi bi-chevron-double-left"></i>
          </button>
        </li>

        <!-- Botón Anterior -->
        <li class="page-item" :class="{ disabled: isFirstPage }">
          <button
            @click="previousPage"
            class="page-link"
            :disabled="isFirstPage"
            title="Página anterior"
          >
            <i class="bi bi-chevron-left"></i>
          </button>
        </li>

        <!-- Números de Página -->
        <li
          v-for="pageNum in visiblePages"
          :key="pageNum"
          class="page-item"
          :class="{ active: pageNum === currentPage }"
        >
          <button
            @click="goToPage(pageNum)"
            class="page-link"
            :disabled="pageNum === '...'"
          >
            {{ pageNum }}
          </button>
        </li>

        <!-- Botón Siguiente -->
        <li class="page-item" :class="{ disabled: isLastPage }">
          <button
            @click="nextPage"
            class="page-link"
            :disabled="isLastPage"
            title="Página siguiente"
          >
            <i class="bi bi-chevron-right"></i>
          </button>
        </li>

        <!-- Botón Última Página -->
        <li class="page-item" :class="{ disabled: isLastPage }">
          <button
            @click="goToPage(totalPages)"
            class="page-link"
            :disabled="isLastPage"
            title="Última página"
          >
            <i class="bi bi-chevron-double-right"></i>
          </button>
        </li>
      </ul>
    </nav>

    <!-- Selector de Items por Página -->
    <div class="items-per-page">
      <label for="items-select">Items por página:</label>
      <select id="items-select" v-model.number="itemsPerPageLocal" class="form-select">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 1
  },
  total: {
    type: Number,
    required: true
  },
  itemsPerPage: {
    type: Number,
    default: 10
  },
  maxVisiblePages: {
    type: Number,
    default: 7
  }
})

const emit = defineEmits(['update:modelValue', 'update:itemsPerPage'])

const currentPage = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const itemsPerPageLocal = ref(props.itemsPerPage)

watch(itemsPerPageLocal, (newValue) => {
  emit('update:itemsPerPage', newValue)
  currentPage.value = 1 // Reset a página 1
})

// Cálculos
const totalPages = computed(() => {
  return Math.ceil(props.total / itemsPerPageLocal.value)
})

const isFirstPage = computed(() => currentPage.value === 1)
const isLastPage = computed(() => currentPage.value === totalPages.value)

const startItem = computed(() => {
  return (currentPage.value - 1) * itemsPerPageLocal.value + 1
})

const endItem = computed(() => {
  return Math.min(currentPage.value * itemsPerPageLocal.value, props.total)
})

// Páginas visibles
const visiblePages = computed(() => {
  const pages = []
  const half = Math.floor(props.maxVisiblePages / 2)
  let start = Math.max(1, currentPage.value - half)
  let end = Math.min(totalPages.value, currentPage.value + half)

  if (end - start < props.maxVisiblePages - 1) {
    if (start === 1) {
      end = Math.min(totalPages.value, start + props.maxVisiblePages - 1)
    } else {
      start = Math.max(1, end - props.maxVisiblePages + 1)
    }
  }

  if (start > 1) {
    pages.push(1)
    if (start > 2) pages.push('...')
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (end < totalPages.value) {
    if (end < totalPages.value - 1) pages.push('...')
    pages.push(totalPages.value)
  }

  return pages
})

// Métodos
const goToPage = (page) => {
  if (typeof page === 'number' && page > 0 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const nextPage = () => {
  if (!isLastPage.value) {
    currentPage.value++
  }
}

const previousPage = () => {
  if (!isFirstPage.value) {
    currentPage.value--
  }
}
</script>

<style scoped>
.pagination-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 20px;
  background: white;
  border-top: 1px solid #e2e8f0;
  flex-wrap: wrap;
}

.pagination-info {
  flex: 1;
  min-width: 200px;
}

.result-count {
  font-size: 14px;
  color: #718096;
}

.result-count strong {
  font-weight: 600;
  color: #2d3748;
}

nav {
  flex: 1;
  min-width: 300px;
}

.pagination {
  display: flex;
  gap: 6px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.page-item {
  margin: 0;
}

.page-item.disabled .page-link {
  pointer-events: none;
  opacity: 0.5;
  cursor: not-allowed;
}

.page-item.active .page-link {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: #667eea;
  color: white;
  font-weight: 600;
}

.page-link {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 10px;
  min-width: 38px;
  height: 38px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  color: #4a5568;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.page-link:hover:not(:disabled) {
  border-color: #667eea;
  color: #667eea;
  background: #f7fafc;
}

.items-per-page {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 0 0 auto;
}

.items-per-page label {
  font-size: 13px;
  font-weight: 500;
  color: #4a5568;
  white-space: nowrap;
  margin: 0;
}

.items-per-page .form-select {
  padding: 6px 10px;
  font-size: 13px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 60px;
}

.items-per-page .form-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

@media (max-width: 768px) {
  .pagination-wrapper {
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }

  .pagination-info,
  nav,
  .items-per-page {
    width: 100%;
  }

  .pagination {
    justify-content: center;
    flex-wrap: wrap;
  }

  .page-link {
    padding: 6px 8px;
    min-width: 34px;
    height: 34px;
    font-size: 12px;
  }

  .items-per-page {
    justify-content: center;
  }
}
</style>
