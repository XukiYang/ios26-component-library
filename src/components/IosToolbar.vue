<template>
  <header class="ios-toolbar" :class="{ 'ios-collapsed': collapsed }">
    <div class="ios-toolbar-leading">
      <slot name="leading" />
    </div>
    <div class="ios-toolbar-title">{{ title }}</div>
    <div class="ios-toolbar-trailing">
      <slot name="trailing" />
    </div>
  </header>
  <div v-if="largeTitle && !collapsed" class="ios-toolbar-large-title">
    {{ title }}
  </div>
</template>

<script setup>
/**
 * IosToolbar — Top toolbar with optional large title and collapse support.
 *
 * @prop {string} title - Toolbar title (required)
 * @prop {boolean} [largeTitle=false] - Show large title below toolbar
 * @prop {number} [scrollY=0] - Current scroll position (collapses when > 44)
 */
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  largeTitle: Boolean,
  scrollY: { type: Number, default: 0 },
})

const collapsed = computed(() => props.scrollY > 44)
</script>

<style scoped>
.ios-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--toolbar-height);
  padding: 0 var(--space-4);
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--toolbar-bg);
  border-bottom: var(--separator-height) solid var(--separator);
}
.ios-toolbar-title {
  font: var(--type-headline);
}
.ios-toolbar-leading,
.ios-toolbar-trailing { display: flex; gap: var(--space-2); min-width: 60px; }
.ios-toolbar-trailing { justify-content: flex-end; }
.ios-toolbar-large-title {
  padding: 0 var(--space-4) var(--space-2);
  font: var(--type-large-title);
}
</style>
