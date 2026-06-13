<template>
  <button
    class="ios-btn"
    :class="[`ios-btn-${variant}`, `ios-btn-${size}`]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
/**
 * IosButton — iOS 26 styled button with multiple variants.
 *
 * @prop {'filled'|'gray'|'tinted'|'plain'|'destructive'} [variant='filled'] - Button visual style
 * @prop {'small'|'medium'|'large'} [size='medium'] - Button size preset
 * @prop {boolean} [disabled=false] - Disabled state
 *
 * @event {'click'} click - Emitted on button click
 */
defineProps({
  variant: { type: String, default: 'filled' },
  size: { type: String, default: 'medium' },
  disabled: Boolean,
})

defineEmits(['click'])
</script>

<style scoped>
.ios-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  border: none;
  outline: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--text-body);
  font-weight: var(--weight-semibold);
  white-space: nowrap;
  transition:
    transform var(--duration-fast) var(--ease-spring),
    opacity var(--duration-fast) ease-in,
    background-color var(--duration-fast) ease-out;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}
.ios-btn:active:not(:disabled) {
  animation: ios-btn-bounce var(--duration-slow) var(--ease-spring);
  opacity: 0.7;
}
@keyframes ios-btn-bounce {
  0% { transform: scale(1); }
  40% { transform: scale(0.95); }
  70% { transform: scale(1.02); }
  100% { transform: scale(1); }
}
.ios-btn:disabled { opacity: var(--opacity-disabled); pointer-events: none; cursor: not-allowed; }
.ios-btn:focus-visible { outline: 2px solid var(--color-blue); outline-offset: 2px; }

/* Sizes */
.ios-btn-small  { height: var(--btn-height-sm); border-radius: var(--radius-sm); padding: 0 var(--space-4); font-size: var(--text-subheadline); min-width: var(--btn-height-md); }
.ios-btn-medium { height: var(--btn-height-md); border-radius: var(--radius-md); padding: 0 var(--space-5); min-width: var(--btn-height-md); }
.ios-btn-large  { height: var(--btn-height-lg); border-radius: var(--radius-lg); padding: 0 var(--space-6); font-size: var(--text-callout); min-width: var(--btn-height-md); }

/* Variants */
.ios-btn-filled { background-color: var(--color-blue); color: var(--white); }
.ios-btn-gray { background-color: var(--fill-quaternary); color: var(--label-primary); }
.ios-btn-tinted { background-color: color-mix(in srgb, var(--color-blue) 15%, transparent); color: var(--color-blue); }
.ios-btn-plain { background-color: transparent; color: var(--color-blue); }
.ios-btn-plain:active:not(:disabled) { background-color: var(--fill-quaternary); }
.ios-btn-destructive { background-color: var(--color-red); color: var(--white); }
.ios-btn-destructive:active:not(:disabled) { opacity: 0.85; }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .ios-btn { transition: opacity var(--duration-fast) ease-in, background-color var(--duration-fast) ease-out; }
  .ios-btn:active:not(:disabled) { animation: none; opacity: 0.7; }
}
</style>
