<template>
  <div
    class="ios-skeleton"
    :class="[
      `ios-skeleton--${variant}`,
      { 'ios-skeleton--animated': animated },
    ]"
    :style="style"
  />
</template>

<script setup>
/**
 * IosSkeleton — Loading placeholder with shimmer animation.
 *
 * @prop {'text'|'circle'|'rect'|'rounded'} [variant='rect'] - Shape variant
 * @prop {string|number} [width] - Width (px or CSS value)
 * @prop {string|number} [height] - Height (px or CSS value)
 * @prop {boolean} [animated=true] - Show shimmer animation
 */
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'rect',
    validator: (v) => ['text', 'circle', 'rect', 'rounded'].includes(v),
  },
  width: [String, Number],
  height: [String, Number],
  animated: { type: Boolean, default: true },
})

function toCss(v) {
  if (v === undefined || v === null) return undefined
  return typeof v === 'number' ? `${v}px` : v
}

const style = computed(() => ({
  width: toCss(props.width),
  height: toCss(props.height),
}))
</script>

<style scoped>
.ios-skeleton {
  background: var(--fill-tertiary);
  position: relative;
  overflow: hidden;
}

.ios-skeleton--text {
  height: var(--space-4);
  border-radius: var(--radius-xs);
}

.ios-skeleton--circle {
  border-radius: 50%;
}

.ios-skeleton--rect {
  border-radius: var(--radius-md);
}

.ios-skeleton--rounded {
  border-radius: var(--radius-xl);
}

.ios-skeleton--animated::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 100%
  );
  animation: ios-skeleton-shimmer 1.5s infinite;
}

@keyframes ios-skeleton-shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
</style>
