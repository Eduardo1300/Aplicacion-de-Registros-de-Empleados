/**
 * Data Table Component - Tabla de datos avanzada
 */

<template>
  <div class="data-table-wrapper">
    <table class="data-table">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key" @click="sortBy(column.key)" class="table-header">
            {{ column.label }}
            <i v-if="sortField === column.key" :class="sortDesc ? 'bi bi-sort-down' : 'bi bi-sort-up'"></i>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, idx) in sortedData" :key="idx" class="table-row">
          <td v-for="column in columns" :key="column.key" class="table-cell">
            <slot :name="`cell-${column.key}`" :value="row[column.key]" :row="row">
              {{ row[column.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  columns: Array,
  data: Array
})

const sortField = ref(null)
const sortDesc = ref(false)

const sortBy = (field) => {
  if (sortField.value === field) {
    sortDesc.value = !sortDesc.value
  } else {
    sortField.value = field
    sortDesc.value = false
  }
}

const sortedData = computed(() => {
  if (!sortField.value) return props.data || []
  const sorted = [...(props.data || [])]
  sorted.sort((a, b) => {
    const aVal = a[sortField.value], bVal = b[sortField.value]
    if (aVal < bVal) return sortDesc.value ? 1 : -1
    if (aVal > bVal) return sortDesc.value ? -1 : 1
    return 0
  })
  return sorted
})
</script>

<style scoped>
.data-table-wrapper {
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.table-header {
  background: #f8f9fa;
  padding: 15px;
  text-align: left;
  font-weight: 600;
  color: #2c3e50;
  border-bottom: 2px solid #ecf0f1;
  cursor: pointer;
  user-select: none;
}

.table-header:hover {
  background: #ecf0f1;
}

.table-header i {
  margin-left: 5px;
  font-size: 12px;
}

.table-row {
  border-bottom: 1px solid #ecf0f1;
  transition: background 0.2s;
}

.table-row:hover {
  background: #f9f9f9;
}

.table-cell {
  padding: 15px;
  color: #555;
}
</style>
