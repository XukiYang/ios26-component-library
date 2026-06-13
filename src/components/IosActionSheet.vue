<template>
  <Teleport to="body">
    <div v-if="visible" ref="backdropRef" class="ios-action-sheet-backdrop" @click="close">
      <div ref="sheetRef" class="ios-action-sheet" @click.stop>
        <div v-if="title" class="ios-action-sheet-header">
          <h3>{{ title }}</h3>
          <p v-if="message">{{ message }}</p>
        </div>
        <div class="ios-action-sheet-actions">
          <button
            v-for="action in actions"
            :key="action.label"
            class="ios-action-sheet-btn"
            :class="{
              'ios-action-sheet-btn--destructive': action.style === 'destructive',
              'ios-action-sheet-btn--cancel': action.style === 'cancel',
            }"
            @click="onAction(action)"
          >
            {{ action.label }}
          </button>
        </div>
        <button v-if="showCancel" class="ios-action-sheet-btn ios-action-sheet-btn--cancel-bold" @click="close">
          {{ cancelText }}
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
/**
 * IosActionSheet — iOS-style action sheet with multiple options.
 *
 * @prop {boolean} [modelValue=false] - Visibility state (v-model)
 * @prop {string} [title] - Optional title
 * @prop {string} [message] - Optional message below title
 * @prop {Array<{label: string, style?: 'default'|'destructive'}>} [actions=[]] - Action buttons
 * @prop {boolean} [showCancel=true] - Show cancel button
 * @prop {string} [cancelText='Cancel'] - Cancel button text
 *
 * @event {'update:modelValue'} update:modelValue - Emitted on close (v-model)
 * @event {'select'} select - Emitted when action is selected with action object
 */
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useGsap } from '../composables/useGsap.js'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: String,
  message: String,
  actions: { type: Array, default: () => [] },
  showCancel: { type: Boolean, default: true },
  cancelText: { type: String, default: 'Cancel' },
})

const emit = defineEmits(['update:modelValue', 'select'])

const { tween, reducedMotion, SPRING, DURATION } = useGsap()
const visible = ref(false)
const backdropRef = ref(null)
const sheetRef = ref(null)

watch(() => props.modelValue, (show) => {
  if (show) {
    visible.value = true
    requestAnimationFrame(() => {
      if (!backdropRef.value || !sheetRef.value) return
      tween(backdropRef.value, { opacity: 1, duration: DURATION.normal, ease: 'power2.out' })
      tween(sheetRef.value, {
        y: '0%',
        duration: reducedMotion ? 0 : DURATION.slow,
        ease: SPRING.ease,
      })
    })
  } else if (visible.value) {
    tween(backdropRef.value, { opacity: 0, duration: DURATION.normal, ease: 'power2.in' })
    tween(sheetRef.value, {
      y: '100%',
      duration: DURATION.normal,
      ease: 'power2.in',
      onComplete: () => { visible.value = false },
    })
  }
})

function close() {
  emit('update:modelValue', false)
}

function onAction(action) {
  emit('select', action)
  close()
}

function onKeydown(e) {
  if (e.key === 'Escape') close()
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
.ios-action-sheet-backdrop {
  position: fixed;
  inset: 0;
  background: var(--backdrop-bg);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
  padding: var(--space-4);
  opacity: 0;
}

.ios-action-sheet {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  transform: translateY(100%);
}

.ios-action-sheet-header {
  background: var(--bg-grouped-secondary);
  border-radius: var(--radius-xl);
  padding: var(--space-4);
  text-align: center;
  box-shadow: var(--shadow-lg);
}

.ios-action-sheet-header h3 {
  font: var(--type-headline);
  color: var(--label-primary);
  margin: 0;
}

.ios-action-sheet-header p {
  font: var(--type-footnote);
  color: var(--label-secondary);
  margin: var(--space-1) 0 0;
}

.ios-action-sheet-actions {
  background: var(--bg-grouped-secondary);
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.ios-action-sheet-btn {
  width: 100%;
  padding: var(--space-4);
  border: none;
  background: transparent;
  font: var(--type-body);
  color: var(--color-blue);
  cursor: pointer;
  transition: background-color var(--duration-fast) var(--ease-default);
  -webkit-tap-highlight-color: transparent;
}

.ios-action-sheet-btn + .ios-action-sheet-btn {
  border-top: var(--separator-height) solid var(--separator);
}

.ios-action-sheet-btn:hover {
  background: var(--fill-quaternary);
}

.ios-action-sheet-btn:active {
  background: var(--fill-tertiary);
}

.ios-action-sheet-btn--destructive {
  color: var(--color-red);
}

.ios-action-sheet-btn--cancel {
  color: var(--label-secondary);
}

.ios-action-sheet-btn--cancel-bold {
  background: var(--bg-grouped-secondary);
  border-radius: var(--radius-xl);
  font-weight: var(--weight-semibold);
  color: var(--color-blue);
}

.ios-action-sheet-btn:focus-visible {
  box-shadow: var(--focus-ring);
}
</style>
