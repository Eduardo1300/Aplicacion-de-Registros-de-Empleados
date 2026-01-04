/**
 * Badge Component - Etiqueta/Badge reutilizable
 */

<template>
  <span class="badge" :class="[`badge-${variant}`, { 'badge-pill': pill }]">
    <i v-if="icon" :class="icon" class="badge-icon"></i>
    <slot />
  </span>
</template>

<script setup>
defineProps({
  variant: { type: String, default: 'primary' },
  pill: Boolean,
  icon: String
})
</script>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.badge-pill {
  border-radius: 20px;
  padding: 6px 16px;
}

.badge-primary {
  background: #667eea;
  color: white;
}

.badge-success {
  background: #27ae60;
  color: white;
}

.badge-danger {
  background: #e74c3c;
  color: white;
}

.badge-warning {
  background: #f39c12;
  color: white;
}

.badge-info {
  background: #3498db;
  color: white;
}

.badge-light {
  background: #ecf0f1;
  color: #333;
}

.badge-icon {
  font-size: 11px;
}
</style>
