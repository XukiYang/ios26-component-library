<template>
  <Teleport to="body">
    <div v-if="visible" ref="backdropRef" class="ios-picker-backdrop" @click="close">
      <div ref="pickerRef" class="ios-picker" @click.stop>
        <div class="ios-picker-header">
          <button class="ios-picker-cancel" @click="close">Cancel</button>
          <span v-if="title" class="ios-picker-title">{{ title }}</span>
          <button class="ios-picker-done" @click="onConfirm">Done</button>
        </div>
        <div class="ios-picker-wheel-container">
          <div
            v-for="(column, colIdx) in columns"
            :key="colIdx"
            class="ios-picker-wheel"
            tabindex="0"
            @touchstart="onTouchStart($event, colIdx)"
            @touchmove="onTouchMove($event, colIdx)"
            @touchend="onTouchEnd($event, colIdx)"
            @wheel.prevent="onWheel($event, colIdx)"
            @keydown="onKeydown($event, colIdx)"
          >
            <div
              :ref="el => { if (el) wheelRefs[colIdx] = el }"
              class="ios-picker-wheel-inner"
            >
              <div
                v-for="(option, optIdx) in column"
                :key="optIdx"
                class="ios-picker-option"
                :class="{ 'ios-picker-option--selected': selectedIndices[colIdx] === optIdx }"
              >
                {{ typeof option === 'string' ? option : option.label }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
/**
 * IosPicker — iOS-style wheel picker with multiple columns.
 *
 * @prop {boolean} [modelValue=false] - Visibility state (v-model)
 * @prop {Array<Array<string|{label: string, value: any}>>} [columns=[[]]] - Picker columns
 * @prop {Array<number>} [selectedIndices] - Selected index per column (v-model:selectedIndices)
 * @prop {string} [title] - Optional title
 *
 * @event {'update:modelValue'} update:modelValue - Emitted on close (v-model)
 * @event {'update:selectedIndices'} update:selectedIndices - Emitted on selection change
 * @event {'confirm'} confirm - Emitted on confirm with selected values
 */
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue'
import { useGsap } from '../composables/useGsap.js'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  columns: { type: Array, default: () => [[]] },
  selectedIndices: { type: Array, default: () => [] },
  title: String,
})

const emit = defineEmits(['update:modelValue', 'update:selectedIndices', 'confirm'])

const { tween, gsap, reducedMotion, SPRING, DURATION } = useGsap()

const ITEM_HEIGHT = 46

const visible = ref(false)
const backdropRef = ref(null)
const pickerRef = ref(null)
const wheelRefs = reactive({})

const offsets = reactive([])
const touchStartY = reactive([])
const touchStartOffset = reactive([])
const touchVelocity = reactive([])

watch(() => props.columns, (cols) => {
  while (offsets.length < cols.length) offsets.push(0)
  while (touchStartY.length < cols.length) touchStartY.push(0)
  while (touchStartOffset.length < cols.length) touchStartOffset.push(0)
  while (touchVelocity.length < cols.length) touchVelocity.push({ y: 0, t: 0 })
}, { immediate: true })

watch(() => props.selectedIndices, (indices) => {
  indices.forEach((idx, colIdx) => {
    offsets[colIdx] = -idx * ITEM_HEIGHT
  })
}, { immediate: true })

watch(() => props.modelValue, (show) => {
  if (show) {
    visible.value = true
    props.selectedIndices.forEach((idx, colIdx) => {
      offsets[colIdx] = -idx * ITEM_HEIGHT
    })
    requestAnimationFrame(() => {
      if (!backdropRef.value || !pickerRef.value) return
      tween(backdropRef.value, { opacity: 1, duration: DURATION.normal, ease: 'power2.out' })
      tween(pickerRef.value, {
        y: '0%',
        duration: reducedMotion ? 0 : DURATION.slow,
        ease: SPRING.ease,
      })
    })
  } else if (visible.value) {
    tween(backdropRef.value, { opacity: 0, duration: DURATION.normal, ease: 'power2.in' })
    tween(pickerRef.value, {
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

function onConfirm() {
  emit('confirm', [...props.selectedIndices])
  close()
}

function snapToIndex(colIdx, index) {
  const col = props.columns[colIdx]
  const clamped = Math.max(0, Math.min(col.length - 1, index))
  const el = wheelRefs[colIdx]
  if (el) {
    tween(el, {
      y: -clamped * ITEM_HEIGHT,
      duration: reducedMotion ? 0 : DURATION.slow,
      ease: SPRING.ease,
    })
  }
  offsets[colIdx] = -clamped * ITEM_HEIGHT
  const newIndices = [...props.selectedIndices]
  newIndices[colIdx] = clamped
  emit('update:selectedIndices', newIndices)
}

function onTouchStart(e, colIdx) {
  touchStartY[colIdx] = e.touches[0].clientY
  touchStartOffset[colIdx] = offsets[colIdx]
  touchVelocity[colIdx] = { y: 0, t: Date.now() }
}

function onTouchMove(e, colIdx) {
  const now = Date.now()
  const dy = e.touches[0].clientY - touchStartY[colIdx]
  const newOffset = touchStartOffset[colIdx] + dy
  const col = props.columns[colIdx]
  const maxOffset = 0
  const minOffset = -(col.length - 1) * ITEM_HEIGHT

  const prev = touchVelocity[colIdx]
  const dt = now - prev.t
  if (dt > 0) {
    touchVelocity[colIdx] = {
      y: (e.touches[0].clientY - prev.y) / dt,
      t: now,
    }
  }

  const el = wheelRefs[colIdx]
  if (el) {
    gsap.set(el, { y: Math.max(minOffset, Math.min(maxOffset, newOffset)) })
  }
  offsets[colIdx] = Math.max(minOffset, Math.min(maxOffset, newOffset))
}

function onTouchEnd(e, colIdx) {
  const vel = touchVelocity[colIdx]?.y || 0
  const col = props.columns[colIdx]
  const minOffset = -(col.length - 1) * ITEM_HEIGHT

  if (Math.abs(vel) > 0.3) {
    const momentum = vel * 150
    const target = Math.max(minOffset, Math.min(0, offsets[colIdx] + momentum))
    const rawIndex = Math.round(-target / ITEM_HEIGHT)
    const clampedIndex = Math.max(0, Math.min(col.length - 1, rawIndex))
    snapToIndex(colIdx, clampedIndex)
  } else {
    const rawIndex = Math.round(-offsets[colIdx] / ITEM_HEIGHT)
    snapToIndex(colIdx, rawIndex)
  }
}

function onWheel(e, colIdx) {
  const direction = e.deltaY > 0 ? 1 : -1
  const currentIndex = Math.round(-offsets[colIdx] / ITEM_HEIGHT)
  snapToIndex(colIdx, currentIndex + direction)
}

function onKeydown(e, colIdx) {
  const col = props.columns[colIdx]
  let direction = 0

  if (e.key === 'ArrowUp') {
    direction = -1
  } else if (e.key === 'ArrowDown') {
    direction = 1
  } else if (e.key === 'Enter') {
    onConfirm()
    return
  } else {
    return
  }

  e.preventDefault()
  const currentIndex = Math.round(-offsets[colIdx] / ITEM_HEIGHT)
  snapToIndex(colIdx, currentIndex + direction)
}

function onGlobalKeydown(e) {
  if (e.key === 'Escape') close()
}

onMounted(() => {
  document.addEventListener('keydown', onGlobalKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onGlobalKeydown)
})
</script>

<style scoped>
.ios-picker-backdrop {
  position: fixed;
  inset: 0;
  background: var(--backdrop-bg);
  display: flex;
  align-items: flex-end;
  z-index: 1000;
  opacity: 0;
}

.ios-picker {
  width: 100%;
  background: var(--bg-primary);
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  transform: translateY(100%);
}

.ios-picker-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-4);
  border-bottom: var(--separator-height) solid var(--separator);
}

.ios-picker-title {
  font: var(--type-headline);
  color: var(--label-primary);
}

.ios-picker-cancel,
.ios-picker-done {
  border: none;
  background: transparent;
  font: var(--type-body);
  color: var(--color-blue);
  cursor: pointer;
  padding: var(--space-1) var(--space-2);
  -webkit-tap-highlight-color: transparent;
}

.ios-picker-done {
  font-weight: var(--weight-semibold);
}

.ios-picker-cancel:focus-visible,
.ios-picker-done:focus-visible {
  box-shadow: var(--focus-ring);
}

.ios-picker-wheel-container {
  display: flex;
  height: 230px;
  overflow: hidden;
}

.ios-picker-wheel {
  flex: 1;
  position: relative;
  overflow: hidden;
  height: 230px;
}

.ios-picker-wheel::before,
.ios-picker-wheel::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 92px;
  z-index: 1;
  pointer-events: none;
}

.ios-picker-wheel::before {
  top: 0;
  background: linear-gradient(to bottom, var(--bg-primary), transparent);
}

.ios-picker-wheel::after {
  bottom: 0;
  background: linear-gradient(to top, var(--bg-primary), transparent);
}

.ios-picker-wheel-inner {
  padding: 92px 0;
  will-change: transform;
}

.ios-picker-option {
  height: var(--btn-height-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font: var(--type-body);
  color: var(--label-secondary);
}

.ios-picker-option--selected {
  color: var(--label-primary);
  font-weight: var(--weight-semibold);
}
</style>
