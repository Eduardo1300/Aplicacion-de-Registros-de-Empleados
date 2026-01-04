<template>
  <div class="stat-card" :class="[type, { gradient: gradient }]">
    <div class="stat-header">
      <div class="stat-icon">
        <i :class="icon"></i>
      </div>
      <div class="stat-trend" v-if="trend" :class="trend > 0 ? 'positive' : 'negative'">
        <i :class="trend > 0 ? 'bi bi-arrow-up' : 'bi bi-arrow-down'"></i>
        {{ Math.abs(trend) }}%
      </div>
    </div>
    
    <div class="stat-body">
      <h3 class="stat-title">{{ title }}</h3>
      <p class="stat-value">{{ formattedValue }}</p>
      <p v-if="subtitle" class="stat-subtitle">{{ subtitle }}</p>
    </div>
    
    <div v-if="extra" class="stat-extra">
      {{ extra }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [Number, String],
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'success', 'warning', 'danger', 'info'].includes(value)
  },
  format: {
    type: String,
    default: 'number',
    validator: (value) => ['number', 'percent', 'currency', 'text'].includes(value)
  },
  subtitle: {
    type: String,
    default: null
  },
  trend: {
    type: Number,
    default: null
  },
  extra: {
    type: String,
    default: null
  },
  gradient: {
    type: Boolean,
    default: true
  }
})

const formattedValue = computed(() => {
  switch (props.format) {
    case 'percent':
      return `${props.value}%`
    case 'currency':
      return `$${props.value.toLocaleString()}`
    case 'text':
      return props.value
    default:
      return props.value.toLocaleString()
  }
})
</script>

<style scoped>
.stat-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border-left: 4px solid;
}

.stat-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-4px);
}

.stat-card.primary {
  border-left-color: #667eea;
}

.stat-card.success {
  border-left-color: #27ae60;
}

.stat-card.warning {
  border-left-color: #f39c12;
}

.stat-card.danger {
  border-left-color: #e74c3c;
}

.stat-card.info {
  border-left-color: #3498db;
}

.stat-card.gradient {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.stat-card.primary .stat-icon {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

.stat-card.success .stat-icon {
  background: rgba(39, 174, 96, 0.1);
  color: #27ae60;
}

.stat-card.warning .stat-icon {
  background: rgba(243, 156, 18, 0.1);
  color: #f39c12;
}

.stat-card.danger .stat-icon {
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
}

.stat-card.info .stat-icon {
  background: rgba(52, 152, 219, 0.1);
  color: #3498db;
}

.stat-trend {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.stat-trend.positive {
  background: rgba(39, 174, 96, 0.1);
  color: #27ae60;
}

.stat-trend.negative {
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
}

.stat-body {
  margin-bottom: 10px;
}

.stat-title {
  margin: 0 0 8px;
  font-size: 13px;
  color: #7f8c8d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.stat-value {
  margin: 0;
  font-size: 28px;
  font-weight: bold;
  color: #2c3e50;
}

.stat-subtitle {
  margin: 5px 0 0;
  font-size: 12px;
  color: #95a5a6;
}

.stat-extra {
  font-size: 12px;
  color: #7f8c8d;
  padding-top: 10px;
  border-top: 1px solid #ecf0f1;
}

@media (max-width: 768px) {
  .stat-card {
    padding: 16px;
  }

  .stat-value {
    font-size: 22px;
  }

  .stat-icon {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
}
</style>
