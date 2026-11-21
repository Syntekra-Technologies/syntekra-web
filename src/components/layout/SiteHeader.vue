<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from 'vue'
import { contactHref, primaryNav, site } from '@/config/site'
import ButtonLink from '@/components/ui/ButtonLink.vue'
import SiteLogo from '@/components/ui/SiteLogo.vue'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'

const menuOpen = ref(false)
const scrolled = ref(false)
const menuButton = useTemplateRef<HTMLButtonElement>('menuButton')
const menuPanel = useTemplateRef<HTMLElement>('menuPanel')

const desktopQuery = '(min-width: 64rem)'
let desktopMedia: MediaQueryList | null = null
let scrollFrame = 0

function updateScrolled() {
  scrollFrame = 0
  scrolled.value = window.scrollY > 8
}

function onScroll() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrolled)
}

function closeMenu(options: { restoreFocus?: boolean } = {}) {
  if (!menuOpen.value) return
  menuOpen.value = false
  if (options.restoreFocus) menuButton.value?.focus()
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && menuOpen.value) {
    event.preventDefault()
    closeMenu({ restoreFocus: true })
  }
}

function onDesktopChange(event: MediaQueryListEvent) {
  if (event.matches) closeMenu()
}

watch(menuOpen, async (open) => {
  document.documentElement.style.overflow = open ? 'hidden' : ''
  if (open) {
    await nextTick()
    menuPanel.value?.querySelector<HTMLElement>('a, button')?.focus()
  }
})

onMounted(() => {
  updateScrolled()
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('keydown', onKeydown)
  desktopMedia = window.matchMedia(desktopQuery)
  desktopMedia.addEventListener('change', onDesktopChange)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('keydown', onKeydown)
  desktopMedia?.removeEventListener('change', onDesktopChange)
  if (scrollFrame) cancelAnimationFrame(scrollFrame)
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b bg-canvas transition-colors duration-300"
    :class="scrolled || menuOpen ? 'border-line' : 'border-transparent'"
  >
    <div class="container-page flex h-(--sx-header-h) items-center gap-8">
      <a href="#top" class="-m-1 shrink-0 p-1" @click="closeMenu()">
        <SiteLogo :height="28" />
      </a>

      <nav aria-label="Primary" class="hidden lg:block">
        <ul class="flex items-center gap-1">
          <li v-for="item in primaryNav" :key="item.href">
            <a
              :href="item.href"
              class="rounded-xs px-3 py-2 text-sm font-medium text-body transition-colors duration-200 hover:text-ink"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </nav>

      <div class="ml-auto flex items-center gap-2">
        <a
          v-if="site.clientPortal.enabled"
          :href="site.clientPortal.url"
          class="hidden rounded-xs px-3 py-2 text-sm font-medium text-body transition-colors hover:text-ink lg:inline-flex"
        >
          {{ site.clientPortal.label }}
        </a>
        <ThemeToggle />
        <div class="ml-2 hidden lg:block">
          <ButtonLink :href="contactHref" size="md">Discuss a project</ButtonLink>
        </div>

        <button
          ref="menuButton"
          type="button"
          class="inline-flex size-10 items-center justify-center rounded-xs text-ink hover:bg-raised lg:hidden"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          @click="menuOpen = !menuOpen"
        >
          <span class="sr-only">{{ menuOpen ? 'Close menu' : 'Open menu' }}</span>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <!--
              A single `transform` keeps the order explicit: move each line to the
              vertical center first, then rotate around the icon center (11, 11).
              Separate translate/rotate utilities would rotate first and miss the center.
            -->
            <path
              class="origin-center transition-transform duration-200"
              :class="menuOpen ? '[transform:rotate(45deg)_translateY(4px)]' : ''"
              d="M3 7h16"
              stroke="currentColor"
              stroke-width="1.5"
            />
            <path
              class="origin-center transition-transform duration-200"
              :class="menuOpen ? '[transform:rotate(-45deg)_translateY(-4px)]' : ''"
              d="M3 15h16"
              stroke="currentColor"
              stroke-width="1.5"
            />
          </svg>
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-show="menuOpen"
        id="mobile-menu"
        ref="menuPanel"
        class="fixed inset-x-0 top-(--sx-header-h) bottom-0 overflow-y-auto border-t border-line bg-canvas lg:hidden"
      >
        <nav aria-label="Mobile" class="container-page flex min-h-full flex-col pt-6 pb-10">
          <ul class="divide-y divide-line border-b border-line">
            <li v-for="item in primaryNav" :key="item.href">
              <a
                :href="item.href"
                class="flex items-center justify-between py-4 font-display text-2xl font-medium tracking-tight text-ink"
                @click="closeMenu()"
              >
                {{ item.label }}
              </a>
            </li>
            <li v-if="site.clientPortal.enabled">
              <a
                :href="site.clientPortal.url"
                class="flex items-center justify-between py-4 font-display text-2xl font-medium tracking-tight text-ink"
              >
                {{ site.clientPortal.label }}
              </a>
            </li>
          </ul>
          <div class="mt-auto pt-10">
            <ButtonLink :href="contactHref" arrow class="w-full" @click="closeMenu()">
              Discuss a project
            </ButtonLink>
            <p class="mt-6 text-sm text-muted">{{ site.tagline }}</p>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>
