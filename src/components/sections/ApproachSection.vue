<script setup lang="ts">
import IsoMarker from '@/components/ui/IsoMarker.vue'
import SectionLabel from '@/components/ui/SectionLabel.vue'

interface Step {
  title: string
  description: string
  outcome: string
}

const steps: Step[] = [
  {
    title: 'Understand the problem',
    description:
      'We start with how the work happens today: the people, systems, data and constraints involved. We agree on what success looks like before proposing anything.',
    outcome: 'A clear problem statement, scope and priorities.',
  },
  {
    title: 'Design the solution',
    description:
      'We define the architecture, data flows, integrations and interfaces, and choose the simplest design that will hold up over time.',
    outcome: 'A technical design and a realistic delivery plan.',
  },
  {
    title: 'Build and integrate',
    description:
      'We build in short, reviewable increments and connect to your existing systems early, so risks surface while they are still inexpensive to fix.',
    outcome: 'Working software you can review as it grows.',
  },
  {
    title: 'Test, deploy and improve',
    description:
      'Automated tests, controlled releases and monitoring. After launch we measure, refine and support the system as your needs change.',
    outcome: 'A monitored production system that keeps improving.',
  },
]
</script>

<template>
  <section id="approach" aria-labelledby="approach-title" class="py-20 sm:py-24 lg:py-32">
    <div class="container-page">
      <div class="grid gap-x-10 gap-y-6 lg:grid-cols-12 lg:items-end">
        <div class="lg:col-span-7">
          <SectionLabel>Approach</SectionLabel>
          <h2 id="approach-title" class="mt-6 max-w-[20ch] text-headline">
            A clear process, from first conversation to production.
          </h2>
        </div>
        <p class="max-w-md text-body lg:col-span-4 lg:col-start-9">
          The process is simple and visible, so you always know what is being built, why it matters
          and what comes next.
        </p>
      </div>

      <div class="relative mt-14 lg:mt-20">
        <!-- Process rail: vertical on small screens, horizontal on desktop -->
        <span
          class="absolute top-[5px] bottom-0 left-[9.5px] w-px bg-line-strong lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto"
          aria-hidden="true"
        />

        <ol class="relative grid gap-y-12 lg:grid-cols-4 lg:gap-x-10">
          <li
            v-for="(step, i) in steps"
            :key="step.title"
            class="relative flex flex-col pl-10 lg:pl-0"
          >
            <span
              class="absolute top-0 left-0 bg-canvas pr-0 text-brand lg:static lg:-ml-1 lg:w-fit lg:px-1 dark:text-accent"
              aria-hidden="true"
            >
              <IsoMarker :variant="i === steps.length - 1 ? 'solid' : 'outline'" :size="20" />
            </span>

            <p class="font-mono text-xs text-muted lg:mt-8">Step {{ i + 1 }}</p>
            <h3 class="mt-3 text-title">{{ step.title }}</h3>
            <p class="mt-4 leading-relaxed text-body lg:mb-8">{{ step.description }}</p>

            <div class="mt-6 border-t border-line pt-4 lg:mt-auto">
              <p class="label text-muted">Outcome</p>
              <p class="mt-2 text-[0.9375rem] font-medium text-ink">{{ step.outcome }}</p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
