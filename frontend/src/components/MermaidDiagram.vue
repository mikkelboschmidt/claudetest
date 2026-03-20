<script setup>
import { ref, onMounted, watch } from 'vue'
import mermaid from 'mermaid'

const props = defineProps({
  chart: { type: String, required: true },
})

const container = ref(null)
const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`

mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
})

async function render() {
  if (!container.value) return
  const { svg } = await mermaid.render(id, props.chart)
  container.value.innerHTML = svg
}

onMounted(render)
watch(() => props.chart, render)
</script>

<template>
  <div ref="container" class="mermaid-container"></div>
</template>

<style scoped>
.mermaid-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.mermaid-container :deep(svg) {
  max-width: 100%;
  height: auto;
}
</style>
