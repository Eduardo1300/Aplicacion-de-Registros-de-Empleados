<template>
  <div class="badge-group">
    <span 
      v-for="(item, idx) in items" 
      :key="idx"
      class="badge me-2"
      :class="`bg-${item.variant || 'secondary'}`"
    >
      {{ item.label }}
      <button 
        v-if="removable"
        type="button" 
        class="btn-close btn-close-white ms-1"
        @click="remove(idx)"
      ></button>
    </span>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  items: { type: Array, required: true },
  removable: { type: Boolean, default: false }
})

const emit = defineEmits(['remove'])
const items = ref(props.items)

const remove = (idx) => {
  items.value.splice(idx, 1)
  emit('remove', idx)
}
</script>

<style scoped>
.badge-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.badge {
  display: inline-flex;
  align-items: center;
}

.btn-close {
  cursor: pointer;
}
</style>
