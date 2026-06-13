<template>
  <nav class="ios-tabbar">
    <button
      v-for="item in items"
      :key="item.id"
      class="ios-tabbar-item"
      :class="{ 'ios-tabbar-active': modelValue === item.id }"
      @click="onSelect(item.id)"
    >
      <IosIcon v-if="item.iconName" :name="item.iconName" size="24" data-testid="tab-icon" />
      <span v-else class="ios-tabbar-icon">{{ item.icon }}</span>
      <span class="ios-tabbar-label">{{ item.label }}</span>
    </button>
  </nav>
</template>

<script setup>
/**
 * IosTabBar — Bottom tab bar navigation.
 *
 * @prop {Array<{id: string, icon?: string, iconName?: string, label: string}>} items - Tab items (required). Use `iconName` for IosIcon, `icon` for text/emoji fallback.
 * @prop {string} [modelValue=''] - Active tab id (v-model)
 *
 * @event {'update:modelValue'} update:modelValue - Emitted on tab select (v-model)
 * @event {'change'} change - Emitted on tab select with id
 */
import IosIcon from './IosIcon.vue'

const props = defineProps({
  items: { type: Array, required: true },
  modelValue: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue', 'change'])

function onSelect(id) {
  emit('update:modelValue', id)
  emit('change', id)
}
</script>

<style scoped>
.ios-tabbar {
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  height: var(--tabbar-height);
  padding: var(--space-1) 0 var(--space-2);
  position: sticky;
  bottom: 0;
  z-index: 100;
  background: var(--tabbar-bg);
  border-top: var(--separator-height) solid var(--separator);
}
.ios-tabbar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--label-secondary);
  padding: var(--space-1) var(--space-3);
  -webkit-tap-highlight-color: transparent;
}
.ios-tabbar-item:focus-visible { box-shadow: var(--focus-ring); }
.ios-tabbar-item.ios-tabbar-active { color: var(--color-blue); }
.ios-tabbar-icon { font-size: var(--tab-icon-size); line-height: 1; }
.ios-tabbar-label {
  font: var(--type-caption2);
}
</style>
