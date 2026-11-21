<script setup lang="ts">
import { contactHref, primaryNav, site } from '@/config/site'
import SiteLogo from '@/components/ui/SiteLogo.vue'
import IconArrow from '@/components/ui/IconArrow.vue'

const year = new Date().getFullYear()
const footerNav = [...primaryNav, { label: 'Contact', href: contactHref }]
</script>

<template>
  <footer class="border-t border-line bg-canvas">
    <div class="container-page grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
      <div class="lg:col-span-5">
        <SiteLogo :height="26" />
        <p class="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-body">
          Custom software, AI agents, process automation and system integration for businesses that
          need technology to fit the way they operate.
        </p>
      </div>

      <nav aria-label="Footer" class="lg:col-span-3 lg:col-start-7">
        <h2 class="label font-sans text-muted">Company</h2>
        <ul class="mt-5 space-y-3">
          <li v-for="item in footerNav" :key="item.href">
            <a
              :href="item.href"
              class="text-[0.9375rem] text-body transition-colors hover:text-ink"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </nav>

      <div class="lg:col-span-3">
        <h2 class="label font-sans text-muted">Get in touch</h2>
        <ul class="mt-5 space-y-3">
          <li v-if="site.contact.email">
            <a
              :href="`mailto:${site.contact.email}`"
              class="text-[0.9375rem] text-body transition-colors hover:text-ink"
            >
              {{ site.contact.email }}
            </a>
          </li>
          <li>
            <a
              :href="contactHref"
              class="text-[0.9375rem] text-body transition-colors hover:text-ink"
            >
              Discuss a project
            </a>
          </li>
          <li v-if="site.clientPortal.enabled">
            <a
              :href="site.clientPortal.url"
              class="text-[0.9375rem] text-body transition-colors hover:text-ink"
            >
              {{ site.clientPortal.label }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="border-t border-line">
      <div
        class="container-page flex flex-col gap-4 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between"
      >
        <p>
          &copy; {{ year }} {{ site.name }}.
          <span class="whitespace-nowrap">{{ site.tagline }}.</span>
        </p>
        <a href="#top" class="inline-flex items-center gap-2 transition-colors hover:text-ink">
          Back to top
          <IconArrow direction="up" />
        </a>
      </div>
    </div>
  </footer>
</template>
