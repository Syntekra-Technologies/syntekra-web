<script setup lang="ts">
/**
 * Official Syntekra logo. Uses the supplied SVG files unmodified:
 * navy wordmark on light backgrounds, white wordmark on dark backgrounds.
 */
import { computed } from 'vue'
import logoNavy from '@/assets/logos/full-logo/syntekra-logo-navy.svg'
import logoWhite from '@/assets/logos/full-logo/syntekra-logo-white.svg'

const LOGO_RATIO = 1217.8 / 254.9

const props = withDefaults(
  defineProps<{
    /** Rendered height in px. Width follows the original aspect ratio. */
    height?: number
    /** Always use the white wordmark (for permanently dark surfaces). */
    onDark?: boolean
  }>(),
  { height: 30, onDark: false },
)

const width = computed(() => Math.round(props.height * LOGO_RATIO))
</script>

<template>
  <img
    v-if="onDark"
    :src="logoWhite"
    alt="Syntekra"
    :width="width"
    :height="height"
    class="block max-w-none"
    decoding="async"
  />
  <template v-else>
    <img
      :src="logoNavy"
      alt="Syntekra"
      :width="width"
      :height="height"
      class="block max-w-none dark:hidden"
      decoding="async"
    />
    <img
      :src="logoWhite"
      alt="Syntekra"
      :width="width"
      :height="height"
      class="hidden max-w-none dark:block"
      decoding="async"
    />
  </template>
</template>
