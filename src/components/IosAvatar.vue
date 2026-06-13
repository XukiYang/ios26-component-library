<template>
  <div
    class="ios-avatar"
    :class="[`ios-avatar--${size}`]"
    :style="style"
  >
    <img v-if="src && !imgError" :src="src" :alt="alt" class="ios-avatar-img" @error="imgError = true" />
    <span v-else-if="initials" class="ios-avatar-initials">{{ initials }}</span>
    <IosIcon v-else name="user" :size="iconSize" class="ios-avatar-icon" />
    <slot />
  </div>
</template>

<script setup>
/**
 * IosAvatar — User avatar with image, initials, or fallback icon.
 *
 * @prop {string} [src] - Image URL
 * @prop {string} [alt=''] - Image alt text
 * @prop {string} [initials] - Fallback initials (e.g. "JD")
 * @prop {'sm'|'md'|'lg'|'xl'} [size='md'] - Avatar size
 * @prop {string} [color] - Background color override
 */
import { ref, computed } from 'vue'
import IosIcon from './IosIcon.vue'

const props = defineProps({
  src: String,
  alt: { type: String, default: '' },
  initials: String,
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg', 'xl'].includes(v),
  },
  color: String,
})

const imgError = ref(false)

const style = computed(() => {
  const s = {}
  if (props.color && !props.src) s.backgroundColor = props.color
  return s
})

const iconSize = computed(() => {
  const map = { sm: 14, md: 20, lg: 28, xl: 36 }
  return map[props.size] || 20
})
</script>

<style scoped>
.ios-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  background: var(--fill-secondary);
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
}

.ios-avatar--sm { width: var(--space-7); height: var(--space-7); }
.ios-avatar--md { width: var(--space-8); height: var(--space-8); }
.ios-avatar--lg { width: var(--space-12); height: var(--space-12); }
.ios-avatar--xl { width: var(--space-16); height: var(--space-16); }

.ios-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ios-avatar-initials {
  font-weight: var(--weight-semibold);
  color: var(--label-primary);
  user-select: none;
}

.ios-avatar--sm .ios-avatar-initials { font-size: var(--text-caption2); }
.ios-avatar--md .ios-avatar-initials { font-size: var(--text-caption1); }
.ios-avatar--lg .ios-avatar-initials { font-size: var(--text-subheadline); }
.ios-avatar--xl .ios-avatar-initials { font-size: var(--text-headline); }

.ios-avatar-icon {
  color: var(--label-tertiary);
}
</style>
