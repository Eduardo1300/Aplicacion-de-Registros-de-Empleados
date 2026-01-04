/**
 * Statistics Card Component - Tarjeta de estadísticas mejorada
 */

<template>
  <div class="stat-card" :class="{ 'stat-card-large': large }">
    <div class="stat-header">
      <h3 class="stat-title">{{ title }}</h3>
      <div class="stat-icon" :style="{ background: color }">
        <i :class="icon"></i>
      </div>
    </div>
    
    <div class="stat-content">
      <p class="stat-value">{{ value }}</p>
      <p v-if="subtitle" class="stat-subtitle">{{ subtitle }}</p>
    </div>
    
    <div v-if="showTrend" class="stat-trend" :class="{ 'trend-up': trendUp }">
      <i :class="trendUp ? 'bi bi-arrow-up' : 'bi bi-arrow-down'"></i>
      <span>{{ trendPercent }}% vs mes anterior</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: [String, Number],
  subtitle: String,
  icon: String,
  color: { type: String, default: '#667eea' },
  large: Boolean,
  showTrend: Boolean,
  trendUp: Boolean,
  trendPercent: Number
})
</script>

<style scoped>
.stat-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.stat-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.stat-card-large {
  padding: 30px;
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
}

.stat-title {
  margin: 0;
  font-size: 14px;
  color: #7f8c8d;
  font-weight: 600;
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
}

.stat-value {
  margin: 0;
  font-size: 32px;
  font-weight: bold;
  color: #2c3e50;
}

.stat-subtitle {
  margin: 5px 0 0;
  font-size: 13px;
  color: #95a5a6;
}

.stat-trend {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 10px;
  font-size: 12px;
  color: #e74c3c;
}

.stat-trend.trend-up {
  color: #27ae60;
}
</style>
