<template>
  <svg
    class="ios-icon"
    :width="size"
    :height="size"
    :viewBox="viewBox"
    :fill="fill"
    :stroke="stroke"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    v-bind="$attrs"
  >
    <path :d="d" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  /** Icon identifier */
  name: { type: String, required: true },
  /** Icon width / height in pixels */
  size: { type: [Number, String], default: 20 },
  /** SVG fill colour */
  fill: { type: String, default: 'none' },
  /** SVG stroke colour */
  stroke: { type: String, default: 'currentColor' },
  /** SVG stroke width */
  strokeWidth: { type: [Number, String], default: 2 },
  /** SVG viewBox attribute */
  viewBox: { type: String, default: '0 0 24 24' },
})

/**
 * Built-in icon definitions (24x24 Heroicons-style outline paths).
 * Each value is a single `d` string; sub-paths are chained with `M` commands.
 * @type {Record<string, string>}
 */
const icons = {
  home:
    'M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5z' +
    'M9 21V12h6v9',

  user:
    'M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z' +
    'M12 14c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z',

  like:
    'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733' +
    '-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25' +
    'c0 7.22 9 12 9 12s9-4.78 9-12z',

  share:
    'M4 13v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6' +
    'M12 16V3l-5 5' +
    'M12 3l5 5',

  up: 'M18 15l-6-6-6 6',

  down: 'M6 9l6 6 6-6',

  comment:
    'M3 20l3-3h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12z',

  back: 'M15 18l-6-6 6-6',

  check: 'M5 13l4 4L19 7',

  search:
    'M21 21l-4.35-4.35' +
    'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z',

  close:
    'M18 6L6 18' +
    'M6 6l12 12',

  warning:
    'M12 2L2 20h20L12 2z' +
    'M12 9v4' +
    'M12 16v0',

  planet:
    'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z' +
    'M2 12h20' +
    'M12 2a8 8 0 0 0 0 20',

  'hourglass-null':
    'M6 4h12' +
    'M6 20h12' +
    'M6 4l6 8-6 8' +
    'M18 4l-6 8 6 8',

  'application-menu':
    'M3 6h18' +
    'M3 12h18' +
    'M3 18h18',
}

const d = computed(() => icons[props.name] || '')
</script>

<style scoped>
.ios-icon {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}
</style>
