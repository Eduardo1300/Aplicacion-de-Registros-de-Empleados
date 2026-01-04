<template>
  <div class="stats-card card mb-3" :class="{ 'bg-primary text-white': variant === 'primary' }">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-start">
        <div>
          <p class="card-text mb-1">{{ title }}</p>
          <h4 class="card-title mb-0">{{ value }}</h4>
        </div>
        <div v-if="icon" class="text-muted" style="font-size: 2rem;">
          <i :class="icon"></i>
        </div>
      </div>
      <div v-if="trend" class="mt-2">
        <small :class="trend > 0 ? 'text-success' : 'text-danger'">
          <i :class="trend > 0 ? 'bi bi-arrow-up' : 'bi bi-arrow-down'"></i>
          {{ Math.abs(trend) }}%
        </small>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  value: { type: [String, Number], required: true },
  icon: { type: String },
  trend: { type: Number },
  variant: { type: String, default: 'light' }
})
</script>

<style scoped>
.stats-card {
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
}

.stats-card.bg-primary {
  border: none;
}
</style>
