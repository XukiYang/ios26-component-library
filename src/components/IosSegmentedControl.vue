<template>
  <div ref="controlRef" class="ios-segmented-control" role="tablist">
    <div ref="indicatorRef" class="ios-segment-indicator" />
    <button
      v-for="(label, i) in segments"
      :key="label"
      role="tab"
      class="ios-segment"
      :class="{ 'ios-segment-active': modelValue === i }"
      :aria-selected="modelValue === i"
      @click="onSelect(i)"
    >
      {{ label }}
    </button>
  </div>
</template>

<script setup>
/**
 * IosSegmentedControl — Equal-width segmented control with animated indicator.
 *
 * @prop {string[]} segments - Segment labels (required)
 * @prop {number} [modelValue=0] - Active segment index (v-model)
 *
 * @event {'update:modelValue'} update:modelValue - Emitted on select (v-model)
 * @event {'change'} change - Emitted on select with index
 */
import { ref, watch, onMounted, nextTick } from 'vue'
import { useGsap } from '../composables/useGsap.js'

const props = defineProps({
  segments: { type: Array, required: true },
  modelValue: { type: Number, default: 0 },
})

const emit = defineEmits(['update:modelValue', 'change'])

const { tween, DURATION } = useGsap()
const indicatorRef = ref(null)
const controlRef = ref(null)

function moveIndicator(index) {
  const control = controlRef.value
  const indicator = indicatorRef.value
  if (!control || !indicator) return
  const n = props.segments.length
  const trackW = control.offsetWidth - 4
  const segW = trackW / n
  const x = index * segW
  const w = segW
  tween(indicator, {
    x: x + 2,
    width: w,
    duration: DURATION.slow,
    ease: 'power2.out',
  })
}

watch(() => props.modelValue, (i) => moveIndicator(i))

onMounted(() => nextTick(() => moveIndicator(props.modelValue)))

function onSelect(index) {
  emit('update:modelValue', index)
  emit('change', index)
}
</script>

<style scoped>
.ios-segmented-control {
  position: relative;
  display: flex;
  height: var(--space-8);
  background: var(--fill-tertiary);
  border-radius: var(--radius-lg);
  padding: var(--space-1);
}

.ios-segment-indicator {
  position: absolute;
  top: var(--space-1);
  left: var(--space-1);
  height: calc(100% - var(--space-1) * 2);
  background: var(--bg-primary);
  border-radius: var(--radius-md);
  border: var(--border-hairline) solid var(--separator);
  z-index: 0;
}

.ios-segment {
  flex: 1;
  position: relative;
  z-index: 1;
  min-width: var(--btn-height-md);
  padding: 0 var(--space-2);
  border: none;
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--label-secondary);
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--text-footnote);
  font-weight: var(--weight-regular);
  transition: color var(--duration-normal) ease;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  white-space: nowrap;
}

.ios-segment.ios-segment-active {
  color: var(--label-primary);
  font-weight: var(--weight-semibold);
}
</style>
