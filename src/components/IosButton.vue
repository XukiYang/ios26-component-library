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
  font: var(--type-body);
  font-weight: var(--weight-semibold);
  letter-spacing: 0.3px;
  white-space: nowrap;
  transition:
    transform var(--duration-fast) var(--ease-default),
    opacity var(--duration-fast) var(--ease-default),
    background-color var(--duration-fast) var(--ease-default);
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}
.ios-btn:active:not(:disabled) {
  transform: scale(0.97);
  opacity: 0.8;
}
.ios-btn:disabled { opacity: var(--opacity-disabled); pointer-events: none; cursor: not-allowed; }
.ios-btn:focus-visible { box-shadow: var(--focus-ring); }

/* Sizes */
.ios-btn-small  { height: var(--btn-height-sm); border-radius: var(--radius-sm); padding: 0 var(--space-4); font-size: var(--text-subheadline); min-width: var(--btn-height-md); letter-spacing: 0.2px; }
.ios-btn-medium { height: var(--btn-height-md); border-radius: var(--radius-md); padding: 0 var(--space-5); min-width: var(--btn-height-md); letter-spacing: 0.3px; }
.ios-btn-large  { height: var(--btn-height-lg); border-radius: var(--radius-lg); padding: 0 var(--space-6); font-size: var(--text-callout); min-width: var(--btn-height-md); letter-spacing: 0.4px; }

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
  .ios-btn { transition: opacity var(--duration-fast) var(--ease-default), background-color var(--duration-fast) var(--ease-default); }
  .ios-btn:active:not(:disabled) { opacity: 0.7; }
}
</style>
