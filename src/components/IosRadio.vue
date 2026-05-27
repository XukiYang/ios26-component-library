<template>
  <label
    class="ios-radio"
    :class="{ 'ios-radio-disabled': disabled }"
  >
    <input
      type="radio"
      class="ios-radio-input"
      :name="name"
      :value="value"
      :checked="modelValue === value"
      :disabled="disabled"
      @change="onChange"
    />
    <span class="ios-radio-indicator" />
    <span v-if="label" class="ios-radio-label">{{ label }}</span>
  </label>
</template>

<script setup>
/**
 * IosRadio — iOS-style radio button with v-model support.
 *
 * @prop {string|number} [modelValue] - Selected value (v-model)
 * @prop {string|number} [value] - This radio's value
 * @prop {string} [name] - Radio group name
 * @prop {string} [label] - Optional label text
 * @prop {boolean} [disabled=false] - Disabled state
 *
 * @event {'update:modelValue'} update:modelValue - Emitted on select (v-model)
 * @event {'change'} change - Emitted on select with value
 */
const props = defineProps({
  modelValue: { type: [String, Number], default: undefined },
  value: { type: [String, Number], default: undefined },
  name: String,
  label: String,
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'change'])

function onChange() {
  emit('update:modelValue', props.value)
  emit('change', props.value)
}
</script>

<style scoped>
.ios-radio {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.ios-radio-input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  pointer-events: none;
}

.ios-radio-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid var(--label-tertiary);
  background: transparent;
  transition: all var(--duration-fast) var(--ease-default);
  flex-shrink: 0;
}

.ios-radio-input:checked + .ios-radio-indicator {
  border-color: var(--accent-blue);
}

.ios-radio-input:checked + .ios-radio-indicator::after {
  content: '';
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent-blue);
}

.ios-radio-input:focus-visible + .ios-radio-indicator {
  box-shadow: var(--focus-ring);
}

.ios-radio-label {
  font: var(--type-body);
  color: var(--label-primary);
}

.ios-radio-disabled {
  opacity: var(--opacity-disabled);
  pointer-events: none;
}
</style>
