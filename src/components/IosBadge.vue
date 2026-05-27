<template>
  <span
    v-if="visible"
    class="ios-badge"
    :class="[
      `ios-badge--${variant}`,
      { 'ios-badge--dot': dot },
    ]"
  >
    <template v-if="!dot">{{ displayValue }}</template>
  </span>
</template>

<script setup>
/**
 * IosBadge — Notification badge / dot indicator.
 *
 * @prop {number|string} [value] - Badge number or text
 * @prop {boolean} [dot=false] - Show as dot (ignores value)
 * @prop {number} [max=99] - Max number before showing "99+"
 * @prop {'red'|'blue'|'green'|'orange'} [variant='red'] - Badge color
 * @prop {boolean} [visible=true] - Show/hide
 */
import { computed } from 'vue'

const props = defineProps({
  value: { type: [Number, String], default: undefined },
  dot: { type: Boolean, default: false },
  max: { type: Number, default: 99 },
  variant: {
    type: String,
    default: 'red',
    validator: (v) => ['red', 'blue', 'green', 'orange'].includes(v),
  },
  visible: { type: Boolean, default: true },
})

const displayValue = computed(() => {
  if (props.value === undefined || props.value === null) return ''
  const num = Number(props.value)
  if (isNaN(num)) return props.value
  return num > props.max ? `${props.max}+` : num
})
</script>

<style scoped>
.ios-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: var(--radius-full);
  font: var(--type-caption2);
  font-weight: var(--weight-semibold);
  color: var(--white);
  line-height: 1;
  white-space: nowrap;
}

.ios-badge--dot {
  min-width: 10px;
  width: 10px;
  height: 10px;
  padding: 0;
}

.ios-badge--red { background: var(--color-red); }
.ios-badge--blue { background: var(--color-blue); }
.ios-badge--green { background: var(--color-green); }
.ios-badge--orange { background: var(--color-orange); }
</style>
