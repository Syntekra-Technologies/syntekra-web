<script setup lang="ts">
import IconArrow from './IconArrow.vue'
import { buttonClasses, type ButtonSize, type ButtonVariant } from './button'

withDefaults(
  defineProps<{
    href: string
    variant?: ButtonVariant
    size?: ButtonSize
    arrow?: boolean
  }>(),
  { variant: 'primary', size: 'lg', arrow: false },
)
</script>

<template>
  <a :href="href" :class="buttonClasses(variant, size)">
    <slot />
    <span
      v-if="arrow"
      class="transition-transform duration-200 ease-out group-hover/button:translate-x-0.5"
    >
      <IconArrow />
    </span>
  </a>
</template>
