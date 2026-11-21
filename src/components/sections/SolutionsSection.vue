<script setup lang="ts">
import SectionLabel from '@/components/ui/SectionLabel.vue'
import FlowLine from '@/components/visuals/FlowLine.vue'

interface Solution {
  title: string
  situation: string
  approach: string
  flow: [string, string, string]
}

const solutions: Solution[] = [
  {
    title: 'Automating repetitive operations',
    situation:
      'Your team re-keys the same data across systems, chases approvals by email and assembles reports by hand.',
    approach:
      'Workflows that move data, route approvals and produce reports on schedule, with exceptions sent to the right person.',
    flow: ['Manual steps', 'Workflow', 'Reports'],
  },
  {
    title: 'Connecting disconnected systems',
    situation:
      'Customer, order and financial data live in separate tools that do not talk to each other.',
    approach:
      'An integration layer with documented APIs that keeps systems in sync and gives you one dependable source of truth.',
    flow: ['CRM', 'API layer', 'ERP'],
  },
  {
    title: 'Building internal business applications',
    situation:
      'Critical processes run on spreadsheets and shared folders that no longer keep up with the business.',
    approach:
      'A purpose-built application with the right data model, roles and permissions, and an interface your team will actually use.',
    flow: ['Spreadsheets', 'Application', 'Your team'],
  },
  {
    // Non-breaking hyphen keeps "AI-assisted" on one line.
    title: 'Creating AI‑assisted workflows',
    situation:
      'People spend hours reading, classifying and summarizing documents, tickets or emails.',
    approach:
      'AI agents that extract, classify and draft, connected to your systems, with human review before anything consequential happens.',
    flow: ['Documents', 'Agent + review', 'Your systems'],
  },
  {
    title: 'Modernizing existing software',
    situation:
      'A legacy system still does the job, but it is difficult to change, integrate or support.',
    approach:
      'Step-by-step modernization: stabilize, introduce clean APIs, then replace components without stopping the business.',
    flow: ['Legacy system', 'API boundary', 'New services'],
  },
]
</script>

<template>
  <section
    id="solutions"
    aria-labelledby="solutions-title"
    class="on-dark relative overflow-hidden bg-canvas py-20 text-body sm:py-24 lg:py-32"
  >
    <div class="container-page relative">
      <div class="grid gap-x-10 gap-y-6 lg:grid-cols-12 lg:items-end">
        <div class="lg:col-span-7">
          <SectionLabel>Solutions</SectionLabel>
          <h2 id="solutions-title" class="mt-6 max-w-[18ch] text-headline">
            Built for specific operational problems.
          </h2>
        </div>
        <p class="max-w-md text-body lg:col-span-4 lg:col-start-9">
          Every engagement starts from a concrete problem, not a technology. These are the
          situations we design for most often, and the shape a solution typically takes.
        </p>
      </div>

      <div class="mt-14 lg:mt-20">
        <!-- Column headings (desktop) -->
        <div
          class="label hidden grid-cols-12 gap-x-10 border-b border-line-strong pb-4 text-muted lg:grid"
          aria-hidden="true"
        >
          <span class="col-span-3">Problem</span>
          <span class="col-span-4">Situation</span>
          <span class="col-span-5">What we build</span>
        </div>

        <ol>
          <li
            v-for="(solution, i) in solutions"
            :key="solution.title"
            class="grid gap-x-10 gap-y-4 border-b border-line py-9 lg:grid-cols-12 lg:py-10"
          >
            <div class="flex gap-4 lg:col-span-3">
              <span class="font-mono text-xs leading-7 text-muted">0{{ i + 1 }}</span>
              <h3 class="text-xl leading-snug tracking-tight">{{ solution.title }}</h3>
            </div>
            <div class="lg:col-span-4">
              <p class="label mb-2 text-muted lg:hidden">Situation</p>
              <p class="leading-relaxed">{{ solution.situation }}</p>
            </div>
            <div class="lg:col-span-5">
              <p class="label mb-2 text-muted lg:hidden">What we build</p>
              <p class="leading-relaxed text-ink">{{ solution.approach }}</p>
              <FlowLine :steps="solution.flow" class="mt-6" />
            </div>
          </li>
        </ol>

        <p class="mt-8 max-w-2xl text-sm text-muted">
          Illustrative scenarios. Every solution is scoped to your systems, data and constraints.
        </p>
      </div>
    </div>
  </section>
</template>
