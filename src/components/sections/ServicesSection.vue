<script setup lang="ts">
import { contactHref } from '@/config/site'
import { services } from '@/content/services'
import IconArrow from '@/components/ui/IconArrow.vue'
import IsoMarker from '@/components/ui/IsoMarker.vue'
import SectionLabel from '@/components/ui/SectionLabel.vue'
</script>

<template>
  <section
    id="services"
    aria-labelledby="services-title"
    class="border-t border-line bg-surface py-20 sm:py-24 lg:py-32"
  >
    <div class="container-page grid gap-x-10 gap-y-14 lg:grid-cols-12">
      <header class="lg:sticky lg:top-[calc(var(--sx-header-h)+3rem)] lg:col-span-4 lg:self-start">
        <SectionLabel>Services</SectionLabel>
        <h2 id="services-title" class="mt-6 text-headline">
          Four disciplines, engineered to work together.
        </h2>
        <p class="mt-6 max-w-md text-body">
          Most business problems do not stop at one system. We combine software development,
          automation, AI and integration so a solution works end to end, rather than adding another
          isolated tool.
        </p>
        <a
          :href="contactHref"
          class="group mt-8 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-accent"
        >
          Talk to us about your requirements
          <span class="transition-transform duration-200 group-hover:translate-x-0.5">
            <IconArrow />
          </span>
        </a>
      </header>

      <div class="lg:col-span-8">
        <article
          v-for="service in services"
          :id="service.id"
          :key="service.id"
          :aria-labelledby="`${service.id}-title`"
          class="grid scroll-mt-28 gap-x-8 gap-y-5 border-t border-line py-10 first:border-t-0 first:pt-0 sm:grid-cols-[3.5rem_1fr] lg:py-12"
        >
          <p class="font-display text-lg leading-none font-medium text-muted sm:pt-1.5">
            {{ service.index }}
          </p>
          <div>
            <h3 :id="`${service.id}-title`" class="text-title">{{ service.title }}</h3>
            <p class="mt-4 max-w-2xl text-lg leading-relaxed font-medium text-ink/85">
              {{ service.summary }}
            </p>
            <p class="mt-4 max-w-2xl leading-relaxed text-body">{{ service.body }}</p>

            <ul
              class="mt-7 grid gap-x-8 gap-y-3 border-t border-dashed border-line pt-6 md:grid-cols-2"
            >
              <li
                v-for="item in service.includes"
                :key="item"
                class="flex items-baseline gap-3 text-[0.9375rem] text-body"
              >
                <span class="relative top-[-1px] text-brand dark:text-accent">
                  <IsoMarker variant="outline" :size="11" />
                </span>
                {{ item }}
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
