<template>
  <nav class="breadcrumb" v-if="items.length > 0">
    <ol class="breadcrumb mb-0">
      <li class="breadcrumb-item" v-for="(item, idx) in items" :key="idx">
        <a v-if="item.to" @click="navigate(item.to)" class="cursor-pointer">
          {{ item.label }}
        </a>
        <span v-else>{{ item.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  items: {
    type: Array,
    required: true,
    validator: (arr) => arr.every(item => item.label)
  }
})

const router = useRouter()
const navigate = (to) => {
  if (to) router.push(to)
}
</script>

<style scoped>
.breadcrumb {
  background: transparent;
}

a {
  color: #007bff;
  cursor: pointer;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
