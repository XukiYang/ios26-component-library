<template>
  <div
    class="ios-card"
    :class="[
      `ios-card--${variant}`,
      { 'ios-card--pressable': pressable },
    ]"
    :role="pressable ? 'button' : undefined"
    :tabindex="pressable ? 0 : undefined"
    @click="pressable && $emit('click', $event)"
    @keydown.enter="pressable && $emit('click', $event)"
  >
    <slot />
  </div>
</template>

<script setup>
/**
 * IosCard — Liquid Glass card container.
 *
 * @prop {'glass'|'solid'|'elevated'} [variant='glass'] - Card visual style
 * @prop {boolean} [pressable=false] - Make card clickable with press feedback
 *
 * @event {'click'} click - Emitted when pressable card is clicked
 */
defineProps({
  variant: {
    type: String,
    default: 'glass',
    validator: (v) => ['glass', 'solid', 'elevated'].includes(v),
  },
  pressable: { type: Boolean, default: false },
})

defineEmits(['click'])
</script>

<style scoped>
.ios-card {
  padding: var(--space-4);
  border-radius: var(--radius-md);
  transition: transform var(--duration-fast) var(--ease-default), box-shadow var(--duration-fast) var(--ease-default);
}

.ios-card--glass {
  background: var(--bg-grouped-secondary);
  border: var(--border-hairline) solid var(--separator);
}

.ios-card--solid {
  background: var(--bg-grouped-secondary);
}

.ios-card--elevated {
  background: var(--bg-grouped-secondary);
  box-shadow: var(--shadow-sm);
}

.ios-card--pressable {
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}

.ios-card--pressable:active {
  transform: scale(0.98);
}

.ios-card--pressable:focus-visible {
  box-shadow: var(--focus-ring);
}
</style>
