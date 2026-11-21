<script setup lang="ts">
import { site } from '@/config/site'
import ContactForm from '@/components/contact/ContactForm.vue'
import IconArrow from '@/components/ui/IconArrow.vue'
import SectionLabel from '@/components/ui/SectionLabel.vue'

const hasForm = Boolean(site.contact.formEndpoint)
const hasEmail = Boolean(site.contact.email)
const showDevNotice = import.meta.env.DEV && !hasForm && !hasEmail

const nextSteps = [
  'We read your message and reply with any questions.',
  'A short call to understand your context, systems and goals.',
  'A written proposal with scope, approach and next steps.',
]
</script>

<template>
  <section id="contact" aria-labelledby="contact-title" class="py-20 sm:py-24 lg:py-32">
    <div class="container-page">
      <div
        class="contact-panel on-dark relative overflow-hidden bg-canvas px-6 py-14 text-body sm:px-12 sm:py-16 lg:px-16 lg:py-20"
      >
        <svg
          class="pointer-events-none absolute top-0 right-0 h-[70%] w-[65%] text-line-strong opacity-70"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <!-- Lattice built from the symbol's edge slope (69 / 126.65). -->
            <pattern id="contact-lattice" width="126.65" height="69" patternUnits="userSpaceOnUse">
              <path
                d="M0 0 L126.65 69 M0 69 L126.65 0"
                stroke="currentColor"
                stroke-width="1"
                fill="none"
              />
            </pattern>
            <linearGradient id="contact-lattice-fade" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="#fff" stop-opacity="0.9" />
              <stop offset="0.6" stop-color="#fff" stop-opacity="0" />
            </linearGradient>
            <mask id="contact-lattice-mask">
              <rect width="100%" height="100%" fill="url(#contact-lattice-fade)" />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#contact-lattice)"
            mask="url(#contact-lattice-mask)"
          />
        </svg>

        <div class="relative grid gap-x-12 gap-y-14 lg:grid-cols-12">
          <div :class="hasForm || hasEmail || showDevNotice ? 'lg:col-span-5' : 'lg:col-span-8'">
            <SectionLabel>Contact</SectionLabel>
            <h2 id="contact-title" class="mt-6 max-w-[14ch] text-headline">
              Let&rsquo;s discuss what you&rsquo;re building.
            </h2>
            <p class="mt-6 max-w-md text-lead text-body">
              Tell us about the process, system or idea you are working on. We will help you work
              out what to build, and what not to.
            </p>

            <ol class="mt-10 space-y-4 border-t border-line pt-8">
              <li v-for="(step, i) in nextSteps" :key="step" class="flex gap-4 text-[0.9375rem]">
                <span class="font-mono text-xs leading-6 text-muted">0{{ i + 1 }}</span>
                <span class="leading-6">{{ step }}</span>
              </li>
            </ol>
          </div>

          <div v-if="hasForm" class="lg:col-span-6 lg:col-start-7">
            <ContactForm />
            <p v-if="hasEmail" class="mt-8 border-t border-line pt-6 text-[0.9375rem] text-body">
              Prefer email? Write to
              <a
                :href="`mailto:${site.contact.email}`"
                class="font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink"
                >{{ site.contact.email }}</a
              >.
            </p>
          </div>

          <div v-else-if="hasEmail" class="flex flex-col justify-end lg:col-span-6 lg:col-start-7">
            <p class="label text-muted">Email</p>
            <a
              :href="`mailto:${site.contact.email}`"
              class="group mt-4 inline-flex items-center gap-4 font-display text-[clamp(1.5rem,1rem+2vw,2.5rem)] font-medium tracking-tight break-all text-ink"
            >
              <span
                class="border-b border-line-strong pb-1 transition-colors group-hover:border-ink"
              >
                {{ site.contact.email }}
              </span>
              <span class="text-accent transition-transform group-hover:translate-x-1">
                <IconArrow />
              </span>
            </a>
            <p class="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-body">
              A short description of your process or system and what you would like to change is all
              we need to start.
            </p>
          </div>

          <div
            v-else-if="showDevNotice"
            class="border border-dashed border-line-strong p-6 text-sm leading-relaxed lg:col-span-6 lg:col-start-7"
          >
            <p class="font-medium text-ink">Development notice: no contact channel configured.</p>
            <p class="mt-2">
              Set <code class="font-mono">VITE_CONTACT_EMAIL</code> and/or
              <code class="font-mono">VITE_CONTACT_FORM_ENDPOINT</code> (see
              <code class="font-mono">.env.example</code>). This notice is never shown in production
              builds.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Chamfered corner cut at the symbol's edge slope, echoing its hexagonal outline. */
.contact-panel {
  --cut: 3.5rem;
  clip-path: polygon(
    0 0,
    calc(100% - var(--cut)) 0,
    100% calc(var(--cut) * 0.5448),
    100% 100%,
    0 100%
  );
}
</style>
