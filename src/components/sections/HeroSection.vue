<script setup lang="ts">
import { contactHref } from '@/config/site'
import { services } from '@/content/services'
import ButtonLink from '@/components/ui/ButtonLink.vue'
import IconArrow from '@/components/ui/IconArrow.vue'
import SystemsDiagram from '@/components/visuals/SystemsDiagram.vue'
</script>

<template>
  <section aria-labelledby="hero-title" class="relative">
    <div
      class="container-page grid gap-x-10 gap-y-14 pt-14 pb-16 sm:pt-20 lg:grid-cols-12 lg:pt-24 lg:pb-24 xl:pt-28"
    >
      <div class="lg:col-span-7">

        <h1 id="hero-title" class="mt-7 max-w-[13ch] text-display sm:max-w-[14ch]">
          Software engineered around the way your business works.
        </h1>

        <p class="mt-7 max-w-xl text-lead text-body">
          Syntekra designs and builds custom applications, connects the systems you already rely on,
          and automates the work that slows your team down, including AI agents that operate inside
          real business processes.
        </p>

        <div class="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
          <ButtonLink :href="contactHref" arrow>Discuss a project</ButtonLink>
          <a
            href="#services"
            class="group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink"
          >
            <span
              class="border-b border-line-strong pb-0.5 transition-colors duration-200 group-hover:border-ink"
            >
              Explore our services
            </span>
            <span class="text-muted transition-transform duration-200 group-hover:translate-y-0.5">
              <IconArrow direction="down" />
            </span>
          </a>
        </div>
      </div>

      <figure class="relative lg:col-span-5 lg:-mr-4 lg:self-end xl:-mr-8">
        <SystemsDiagram />
      </figure>
    </div>

    <!-- Service index: a quick map of what we do, linking to each service. -->
    <nav aria-label="Service overview" class="container-page">
      <ol class="grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
        <li
          v-for="service in services"
          :key="service.id"
          class="border-line max-lg:border-b sm:max-lg:odd:border-r sm:max-lg:odd:pr-6 sm:max-lg:even:pl-6 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
        >
          <a :href="`#${service.id}`" class="group relative block h-full py-6 lg:py-8">
            <span
              class="absolute inset-x-0 -top-px h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
              aria-hidden="true"
            />
            <span class="block font-mono text-xs text-muted">{{ service.index }}</span>
            <span
              class="mt-3 block font-display text-[1.0625rem] leading-snug font-medium tracking-tight text-ink"
            >
              {{ service.title }}
            </span>
            <span class="mt-1.5 block text-sm text-muted">{{ service.short }}</span>
          </a>
        </li>
      </ol>
    </nav>
  </section>
</template>
