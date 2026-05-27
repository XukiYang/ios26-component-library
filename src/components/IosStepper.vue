<template>
  <div class="ios-stepper" :class="{ 'ios-stepper-disabled': disabled }">
    <button
      class="ios-stepper-btn"
      :disabled="disabled || modelValue <= min"
      @click="decrement"
      aria-label="Decrease"
    >
      <svg width="16" height="2" viewBox="0 0 16 2" fill="none">
        <path d="M1 1H15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
    <span class="ios-stepper-value">{{ modelValue }}</span>
    <button
      class="ios-stepper-btn"
      :disabled="disabled || modelValue >= max"
      @click="increment"
      aria-label="Increase"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 1V15M1 8H15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
/**
 * IosStepper — iOS-style numeric stepper (- N +).
 *
 * @prop {number} [modelValue=0] - Current value (v-model)
 * @prop {number} [min=0] - Minimum value
 * @prop {number} [max=100] - Maximum value
 * @prop {number} [step=1] - Increment step
 * @prop {boolean} [disabled=false] - Disabled state
 *
 * @event {'update:modelValue'} update:modelValue - Emitted on change (v-model)
 * @event {'change'} change - Emitted on change with new value
 */
const props = defineProps({
  modelValue: { type: Number, default: 0 },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  step: { type: Number, default: 1 },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'change'])

function decrement() {
  const val = Math.max(props.min, props.modelValue - props.step)
  emit('update:modelValue', val)
  emit('change', val)
}

function increment() {
  const val = Math.min(props.max, props.modelValue + props.step)
  emit('update:modelValue', val)
  emit('change', val)
}
</script>

<style scoped>
.ios-stepper {
  display: inline-flex;
  align-items: center;
  gap: 0;
  background: var(--fill-tertiary);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.ios-stepper-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 32px;
  border: none;
  background: transparent;
  color: var(--color-blue);
  cursor: pointer;
  transition: background-color var(--duration-fast);
  -webkit-tap-highlight-color: transparent;
  padding: 0;
}

.ios-stepper-btn:hover {
  background: var(--fill-quaternary);
}

.ios-stepper-btn:active {
  background: var(--fill-secondary);
}

.ios-stepper-btn:disabled {
  color: var(--label-tertiary);
  pointer-events: none;
}

.ios-stepper-value {
  min-width: 44px;
  text-align: center;
  font: var(--type-body);
  font-weight: var(--weight-medium);
  color: var(--label-primary);
  border-left: var(--separator-height) solid var(--separator);
  border-right: var(--separator-height) solid var(--separator);
  padding: var(--space-1) 0;
}

.ios-stepper-disabled {
  opacity: var(--opacity-disabled);
  pointer-events: none;
}
</style>
