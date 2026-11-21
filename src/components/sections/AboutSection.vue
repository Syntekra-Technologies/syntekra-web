<script setup lang="ts">
import { site } from '@/config/site'
import SectionLabel from '@/components/ui/SectionLabel.vue'
import symbol from '@/assets/logos/icon/syntekra-icon.svg'

interface Principle {
  title: string
  text: string
}

const principles: Principle[] = [
  {
    title: 'Engineering first',
    text: 'Decisions are driven by sound engineering: clear architecture, readable code, tested behavior and documentation that remains useful after handover.',
  },
  {
    title: 'Tailored, not complicated',
    text: 'We fit the solution to the problem. Sometimes that is a new platform. Often it is a well-placed integration or a small, focused tool.',
  },
  {
    title: 'Practical innovation',
    text: 'We use AI and automation where they create real, measurable value, and we are direct about where they do not.',
  },
  {
    title: 'Built for the long term',
    text: 'Reliability and maintainability come first, so the systems we build remain an asset as your business grows, not a liability.',
  },
]
</script>

<template>
  <section
    id="about"
    aria-labelledby="about-title"
    class="border-t border-line bg-surface py-20 sm:py-24 lg:py-32"
  >
    <div class="container-page grid gap-x-10 gap-y-14 lg:grid-cols-12">
      <div class="lg:col-span-5">
        <SectionLabel>About Syntekra</SectionLabel>
        <h2 id="about-title" class="mt-6 max-w-[16ch] text-headline">
          An engineering company, first and foremost.
        </h2>
        <p class="mt-6 max-w-md text-lead text-body">
          We build software for businesses that need technology to fit their operations, not the
          other way around.
        </p>
        <p class="mt-5 max-w-md leading-relaxed text-body">
          We work closely with the people who run those operations, explain trade-offs in plain
          language, and stay responsible for what we build after it goes live.
        </p>

        <div class="mt-12 flex items-center gap-4 border-t border-line pt-6">
          <img :src="symbol" alt="" width="29" height="32" class="shrink-0" decoding="async" />
          <p class="font-display text-lg font-medium tracking-tight text-ink">{{ site.tagline }}</p>
        </div>
      </div>

      <div class="lg:col-span-6 lg:col-start-7">
        <dl class="grid border-t border-line sm:grid-cols-2">
          <div
            v-for="(principle, i) in principles"
            :key="principle.title"
            class="border-b border-line py-8 sm:odd:pr-8 sm:even:border-l sm:even:pl-8 lg:py-10"
          >
            <dt class="flex items-baseline gap-3">
              <span class="font-mono text-xs text-muted">0{{ i + 1 }}</span>
              <span class="font-display text-xl font-medium tracking-tight text-ink">
                {{ principle.title }}
              </span>
            </dt>
            <dd class="mt-4 leading-relaxed text-body">{{ principle.text }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>
