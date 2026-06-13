<template>
  <label
    class="ios-checkbox"
    :class="{ 'ios-checkbox-disabled': disabled }"
  >
    <input
      type="checkbox"
      class="ios-checkbox-input"
      :checked="modelValue"
      :disabled="disabled"
      @change="onChange"
    />
    <span class="ios-checkbox-indicator">
      <svg v-if="modelValue" class="ios-checkbox-check" viewBox="0 0 12 10" fill="none">
        <path d="M1 5L4.5 8.5L11 1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
    <span v-if="label" class="ios-checkbox-label">{{ label }}</span>
  </label>
</template>

<script setup>
/**
 * IosCheckbox — iOS-style checkbox with v-model support.
 *
 * @prop {boolean} [modelValue=false] - Checked state (v-model)
 * @prop {string} [label] - Optional label text
 * @prop {boolean} [disabled=false] - Disabled state
 *
 * @event {'update:modelValue'} update:modelValue - Emitted on change (v-model)
 * @event {'change'} change - Emitted on change with new value
 */
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  label: String,
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'change'])

function onChange(e) {
  const val = e.target.checked
  emit('update:modelValue', val)
  emit('change', val)
}
</script>

<style scoped>
.ios-checkbox {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.ios-checkbox-input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  pointer-events: none;
}

.ios-checkbox-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: var(--radius-sm);
  border: 2px solid var(--label-tertiary);
  background: transparent;
  transition: all var(--duration-fast) var(--ease-default);
  flex-shrink: 0;
}

.ios-checkbox-input:checked + .ios-checkbox-indicator {
  background: var(--accent-blue);
  border-color: var(--accent-blue);
}

.ios-checkbox-input:focus-visible + .ios-checkbox-indicator {
  box-shadow: var(--focus-ring);
}

.ios-checkbox-check {
  width: 12px;
  height: 10px;
  color: var(--white);
}

.ios-checkbox-label {
  font: var(--type-body);
  color: var(--label-primary);
}

.ios-checkbox-disabled {
  opacity: var(--opacity-disabled);
  pointer-events: none;
}
</style>
