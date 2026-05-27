<template>
  <div class="ios-circular-progress" :style="containerStyle">
    <svg class="ios-circular-progress-svg" :width="size" :height="size" :viewBox="viewBox">
      <circle
        class="ios-circular-progress-track"
        :cx="center"
        :cy="center"
        :r="radius"
        fill="none"
        :stroke-width="strokeWidth"
      />
      <circle
        class="ios-circular-progress-fill"
        :cx="center"
        :cy="center"
        :r="radius"
        fill="none"
        :stroke-width="strokeWidth"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
        :style="{ stroke: color }"
      />
    </svg>
    <span v-if="showLabel" class="ios-circular-progress-label">
      <slot>{{ Math.round(progress) }}%</slot>
    </span>
  </div>
</template>

<script setup>
/**
 * IosCircularProgress — Circular/ring progress indicator.
 *
 * @prop {number} [progress=0] - Progress percentage (0-100)
 * @prop {number} [size=64] - SVG width/height in px
 * @prop {number} [strokeWidth=6] - Ring thickness
 * @prop {string} [color='var(--color-blue)'] - Fill color
 * @prop {boolean} [showLabel=false] - Show percentage label in center
 */
import { computed } from 'vue'

const props = defineProps({
  progress: { type: Number, default: 0 },
  size: { type: Number, default: 64 },
  strokeWidth: { type: Number, default: 6 },
  color: { type: String, default: 'var(--color-blue)' },
  showLabel: { type: Boolean, default: false },
})

const center = computed(() => props.size / 2)
const radius = computed(() => (props.size - props.strokeWidth) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const viewBox = computed(() => `0 0 ${props.size} ${props.size}`)
const containerStyle = computed(() => ({ width: `${props.size}px`, height: `${props.size}px` }))

const dashOffset = computed(() => {
  const clamped = Math.min(100, Math.max(0, props.progress))
  return circumference.value * (1 - clamped / 100)
})
</script>

<style scoped>
.ios-circular-progress {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.ios-circular-progress-svg {
  transform: rotate(-90deg);
}

.ios-circular-progress-track {
  stroke: var(--fill-tertiary);
}

.ios-circular-progress-fill {
  stroke: var(--color-blue);
  stroke-linecap: round;
  transition: stroke-dashoffset var(--duration-slow) var(--ease-default);
}

.ios-circular-progress-label {
  position: absolute;
  font: var(--type-caption2);
  font-weight: var(--weight-semibold);
  color: var(--label-primary);
}
</style>
