<script setup lang="ts">
/**
 * Project enquiry form.
 *
 * Sends a JSON POST to `site.contact.formEndpoint`:
 *   { name, email, company, topic, message }
 * Any 2xx response is treated as success. The endpoint is expected to handle
 * validation, spam protection and delivery (e.g. an ASP.NET Core API route).
 */
import { nextTick, reactive, ref, useTemplateRef } from 'vue'
import { site } from '@/config/site'
import { services } from '@/content/services'
import IconArrow from '@/components/ui/IconArrow.vue'
import { buttonClasses } from '@/components/ui/button'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const topics = [...services.map((s) => s.title), 'Not sure yet']

const form = reactive({
  name: '',
  email: '',
  company: '',
  topic: '',
  message: '',
  /** Honeypot: hidden from people, often filled by bots. */
  website: '',
})

const status = ref<Status>('idle')
const successHeading = useTemplateRef<HTMLElement>('successHeading')

async function submit() {
  if (status.value === 'submitting') return

  if (form.website) {
    status.value = 'success'
    return
  }

  status.value = 'submitting'
  try {
    const response = await fetch(site.contact.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim(),
        topic: form.topic,
        message: form.message.trim(),
      }),
    })
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
    status.value = 'success'
    await nextTick()
    successHeading.value?.focus()
  } catch {
    status.value = 'error'
  }
}

const fieldClass =
  'block w-full rounded-xs border border-line-strong bg-surface px-4 text-[0.9375rem] text-ink ' +
  'placeholder:text-muted/70 transition-colors duration-150 hover:border-muted ' +
  'focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-accent'
const labelClass = 'mb-2 block text-sm font-medium text-ink'
</script>

<template>
  <div v-if="status === 'success'" class="border-t border-line-strong pt-8">
    <h3 ref="successHeading" tabindex="-1" class="text-title focus:outline-none">
      Thank you. Your message has been sent.
    </h3>
    <p class="mt-4 max-w-md leading-relaxed text-body">
      We will read it carefully and reply by email with a few questions or a proposed next step.
    </p>
  </div>

  <form v-else class="grid gap-x-5 gap-y-6 sm:grid-cols-2" @submit.prevent="submit">
    <div>
      <label for="contact-name" :class="labelClass">Name</label>
      <input
        id="contact-name"
        v-model="form.name"
        type="text"
        name="name"
        autocomplete="name"
        required
        maxlength="120"
        :class="[fieldClass, 'h-12']"
      />
    </div>

    <div>
      <label for="contact-email" :class="labelClass">Work email</label>
      <input
        id="contact-email"
        v-model="form.email"
        type="email"
        name="email"
        autocomplete="email"
        required
        maxlength="200"
        :class="[fieldClass, 'h-12']"
      />
    </div>

    <div>
      <label for="contact-company" :class="labelClass">
        Company <span class="font-normal text-muted">(optional)</span>
      </label>
      <input
        id="contact-company"
        v-model="form.company"
        type="text"
        name="company"
        autocomplete="organization"
        maxlength="160"
        :class="[fieldClass, 'h-12']"
      />
    </div>

    <div>
      <label for="contact-topic" :class="labelClass">Area of interest</label>
      <div class="relative">
        <select
          id="contact-topic"
          v-model="form.topic"
          name="topic"
          required
          :class="[fieldClass, 'h-12 appearance-none pr-10', !form.topic && 'text-muted']"
        >
          <option value="" disabled>Select an option</option>
          <option v-for="topic in topics" :key="topic" :value="topic">{{ topic }}</option>
        </select>
        <span
          class="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted"
          aria-hidden="true"
        >
          <IconArrow direction="down" />
        </span>
      </div>
    </div>

    <div class="sm:col-span-2">
      <label for="contact-message" :class="labelClass">What are you working on?</label>
      <textarea
        id="contact-message"
        v-model="form.message"
        name="message"
        rows="5"
        required
        maxlength="5000"
        aria-describedby="contact-message-hint"
        :class="[fieldClass, 'resize-y py-3 leading-relaxed']"
      />
      <p id="contact-message-hint" class="mt-2 text-sm text-muted">
        A few sentences about the process, system or idea is enough to start.
      </p>
    </div>

    <div class="hidden" aria-hidden="true">
      <label for="contact-website">Leave this field empty</label>
      <input
        id="contact-website"
        v-model="form.website"
        type="text"
        name="website"
        tabindex="-1"
        autocomplete="off"
      />
    </div>

    <div class="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
      <button
        type="submit"
        :class="buttonClasses('primary', 'lg')"
        :disabled="status === 'submitting'"
      >
        {{ status === 'submitting' ? 'Sending…' : 'Send message' }}
        <span
          v-if="status !== 'submitting'"
          class="transition-transform duration-200 group-hover/button:translate-x-0.5"
        >
          <IconArrow />
        </span>
      </button>

      <p role="status" aria-live="polite" class="text-sm">
        <span v-if="status === 'error'" class="text-[#ff9b9b]">
          Your message could not be sent. Please try again<template v-if="site.contact.email">
            or email us at
            <a :href="`mailto:${site.contact.email}`" class="underline underline-offset-2">{{
              site.contact.email
            }}</a></template
          >.
        </span>
      </p>
    </div>
  </form>
</template>
