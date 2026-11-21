<script setup lang="ts">
/**
 * Brand marker: an isometric face drawn with the exact edge slope of the
 * Syntekra symbol (69 / 126.65). Used as a bullet and section marker.
 */
withDefaults(defineProps<{ variant?: 'solid' | 'outline'; size?: number }>(), {
  variant: 'solid',
  size: 12,
})
</script>

<template>
  <svg
    class="shrink-0"
    :width="size"
    :height="size * 0.545"
    viewBox="0 0 22 12"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M11 0.6 L21.2 6 L11 11.4 L0.8 6 Z"
      :fill="variant === 'solid' ? 'currentColor' : 'none'"
      :stroke="variant === 'outline' ? 'currentColor' : 'none'"
      stroke-width="1.4"
      stroke-linejoin="round"
    />
  </svg>
</template>
