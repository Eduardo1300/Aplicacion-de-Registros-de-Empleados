<template>
  <div class="card">
    <div class="card-header">
      <h5 class="card-title mb-0">{{ title }}</h5>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>{{ label }}</th>
              <th style="width: 100px;">{{ unit }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in data" :key="item.id">
              <td>{{ item.name }}</td>
              <td>
                <div class="progress" style="height: 6px;">
                  <div 
                    class="progress-bar" 
                    :style="{ width: (item.value / max * 100) + '%' }"
                  ></div>
                </div>
              </td>
              <td>{{ item.value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, default: 'Chart' },
  label: { type: String, default: 'Nombre' },
  unit: { type: String, default: 'Valor' },
  data: { type: Array, required: true }
})

const max = computed(() => {
  return Math.max(...props.data.map(d => d.value || 0))
})
</script>

<style scoped>
.progress {
  background-color: #e9ecef;
}

.progress-bar {
  background-color: #0d6efd;
}
</style>
