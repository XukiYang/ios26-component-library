<template>
  <div class="ios-date-picker">
    <label v-if="label" class="ios-date-picker-label">{{ label }}</label>
    <input
      class="ios-date-picker-input"
      :type="type"
      :value="modelValue"
      :min="min"
      :max="max"
      :disabled="disabled"
      @input="onInput"
    />
  </div>
</template>

<script setup>
/**
 * IosDatePicker — iOS-style date/time picker using native input.
 *
 * Uses the browser's native date/time picker for maximum compatibility.
 * For a custom iOS wheel picker, use IosPicker instead.
 *
 * @prop {string} [modelValue=''] - Date value (v-model, ISO format YYYY-MM-DD or HH:mm)
 * @prop {'date'|'time'|'datetime-local'} [type='date'] - Input type
 * @prop {string} [label] - Optional label text
 * @prop {string} [min] - Minimum date
 * @prop {string} [max] - Maximum date
 * @prop {boolean} [disabled=false] - Disabled state
 *
 * @event {'update:modelValue'} update:modelValue - Emitted on change (v-model)
 * @event {'change'} change - Emitted on change with value
 */
defineProps({
  modelValue: { type: String, default: '' },
  type: {
    type: String,
    default: 'date',
    validator: (v) => ['date', 'time', 'datetime-local'].includes(v),
  },
  label: String,
  min: String,
  max: String,
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'change'])

function onInput(e) {
  const val = e.target.value
  emit('update:modelValue', val)
  emit('change', val)
}
</script>

<style scoped>
.ios-date-picker {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.ios-date-picker-label {
  font: var(--type-subheadline);
  color: var(--label-secondary);
}

.ios-date-picker-input {
  width: 100%;
  border: none;
  background: var(--fill-tertiary);
  border-radius: var(--radius-lg);
  padding: var(--space-3);
  outline: none;
  color: var(--label-primary);
  font: var(--type-body);
  box-shadow: inset 0 0 0 0 transparent;
  transition: box-shadow var(--duration-normal) ease;
  -webkit-appearance: none;
}

.ios-date-picker-input:focus {
  box-shadow: var(--focus-ring);
}

.ios-date-picker-input:disabled {
  opacity: var(--opacity-disabled);
  pointer-events: none;
}

.ios-date-picker-input::-webkit-calendar-picker-indicator {
  filter: invert(var(--opacity-muted));
  cursor: pointer;
}
</style>
