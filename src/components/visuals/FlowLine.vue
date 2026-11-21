<script setup lang="ts">
/**
 * Compact three-step flow: source -> what we build -> outcome.
 * The middle node is the part Syntekra builds and is emphasized.
 */
import IsoMarker from '@/components/ui/IsoMarker.vue'

defineProps<{ steps: [string, string, string] }>()
</script>

<template>
  <ol class="flex items-center text-[0.8125rem] leading-tight">
    <template v-for="(step, i) in steps" :key="step">
      <li
        class="flex min-w-0 items-center gap-2"
        :class="i === 1 ? 'font-medium text-ink' : 'text-muted'"
      >
        <span class="shrink-0" :class="i === 1 ? 'text-brand-cyan' : 'text-muted'">
          <IsoMarker :variant="i === 1 ? 'solid' : 'outline'" :size="11" />
        </span>
        <span>{{ step }}</span>
      </li>
      <li
        v-if="i < steps.length - 1"
        class="relative mx-2 h-px min-w-4 flex-1 bg-line-strong sm:mx-3 sm:min-w-6"
        aria-hidden="true"
      >
        <span
          class="absolute top-1/2 right-0 size-1.5 -translate-y-1/2 rotate-45 border-t border-r border-line-strong"
        />
      </li>
    </template>
  </ol>
</template>
