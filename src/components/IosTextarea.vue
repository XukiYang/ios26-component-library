<template>
  <div class="ios-textarea-wrapper" :class="{ 'ios-textarea-focused': focused }">
    <label v-if="label" class="ios-textarea-label">{{ label }}</label>
    <textarea
      class="ios-textarea"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      :maxlength="maxlength"
      :value="modelValue"
      @input="onInput"
      @focus="focused = true"
      @blur="focused = false"
    />
    <span v-if="maxlength" class="ios-textarea-counter">
      {{ (modelValue || '').length }}/{{ maxlength }}
    </span>
  </div>
</template>

<script setup>
/**
 * IosTextarea — iOS-style multi-line text input.
 *
 * @prop {string} [modelValue=''] - Text value (v-model)
 * @prop {string} [label] - Optional label text
 * @prop {string} [placeholder=''] - Placeholder text
 * @prop {boolean} [disabled=false] - Disabled state
 * @prop {number} [rows=4] - Visible text rows
 * @prop {number} [maxlength] - Maximum character count (shows counter)
 *
 * @event {'update:modelValue'} update:modelValue - Emitted on input (v-model)
 * @event {'input'} input - Emitted on input with value
 */
import { ref } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  label: String,
  placeholder: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  rows: { type: Number, default: 4 },
  maxlength: Number,
})

const emit = defineEmits(['update:modelValue', 'input'])

const focused = ref(false)

function onInput(e) {
  const val = e.target.value
  emit('update:modelValue', val)
  emit('input', val)
}
</script>

<style scoped>
.ios-textarea-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.ios-textarea-label {
  font: var(--type-subheadline);
  color: var(--label-secondary);
  transition: color var(--duration-normal) var(--ease-default);
}

.ios-textarea-focused .ios-textarea-label {
  color: var(--color-blue);
}

.ios-textarea {
  width: 100%;
  border: none;
  background: var(--fill-tertiary);
  border-radius: var(--radius-lg);
  padding: var(--space-3);
  outline: none;
  color: var(--label-primary);
  font: var(--type-body);
  resize: vertical;
  min-height: 80px;
  box-shadow: inset 0 0 0 0 transparent;
  transition: box-shadow var(--duration-normal) var(--ease-default);
}

.ios-textarea-focused .ios-textarea {
  box-shadow: var(--focus-ring);
}

.ios-textarea::placeholder {
  color: var(--label-tertiary);
}

.ios-textarea:disabled {
  opacity: var(--opacity-disabled);
  pointer-events: none;
}

.ios-textarea-counter {
  font: var(--type-caption1);
  color: var(--label-tertiary);
  text-align: right;
}
</style>
