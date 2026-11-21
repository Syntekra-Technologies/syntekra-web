<script setup lang="ts">

defineProps<{ index?: string }>()
</script>

<template>
  <p class="label flex items-center gap-3 text-muted">
    <span v-if="index" class="font-mono tracking-normal text-muted/80">{{ index }}</span>
    <span v-if="index" class="h-px w-5 bg-line-strong" aria-hidden="true" />
    <span><slot /></span>
  </p>
</template>
