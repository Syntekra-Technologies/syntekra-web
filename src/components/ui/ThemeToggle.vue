<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme'

const { theme, mounted, toggleTheme } = useTheme()

const label = computed(() => {
  if (!mounted.value) return 'Toggle color theme'
  return theme.value === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
})
</script>

<template>
  <button
    type="button"
    class="inline-flex size-10 items-center justify-center rounded-xs text-muted transition-colors duration-200 hover:bg-raised hover:text-ink"
    :aria-label="label"
    :title="label"
    @click="toggleTheme"
  >
    <!-- Icons switch purely with CSS, so the correct one shows before hydration. -->
    <svg
      class="dark:hidden"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M15.2 11.1A6.6 6.6 0 0 1 6.9 2.8a6.6 6.6 0 1 0 8.3 8.3Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
    </svg>
    <svg
      class="hidden dark:block"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="9" cy="9" r="3.25" stroke="currentColor" stroke-width="1.5" />
      <path
        d="M9 1.5v1.75M9 14.75v1.75M1.5 9h1.75M14.75 9h1.75M3.7 3.7l1.24 1.24M13.06 13.06l1.24 1.24M3.7 14.3l1.24-1.24M13.06 4.94l1.24-1.24"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  </button>
</template>
