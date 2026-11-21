<script setup lang="ts">
withDefaults(defineProps<{ direction?: 'right' | 'down' | 'up' }>(), { direction: 'right' })
</script>

<template>
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    focusable="false"
    :class="{ 'rotate-90': direction === 'down', '-rotate-90': direction === 'up' }"
  >
    <path
      d="M2.5 8h10.5M9 3.75 13.25 8 9 12.25"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="square"
    />
  </svg>
</template>
