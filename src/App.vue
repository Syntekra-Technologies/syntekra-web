<script setup lang="ts">
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import ServicesSection from '@/components/sections/ServicesSection.vue'
import SolutionsSection from '@/components/sections/SolutionsSection.vue'
import ApproachSection from '@/components/sections/ApproachSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
</script>

<template>
  <div id="top">
    <a
      href="#main"
      class="sr-only z-[60] bg-brand px-4 py-3 text-sm font-medium text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
    >
      Skip to content
    </a>
    <SiteHeader />
    <main id="main" tabindex="-1" class="focus:outline-none">
      <HeroSection />
      <ServicesSection />
      <SolutionsSection />
      <ApproachSection />
      <AboutSection />
      <ContactSection />
    </main>
    <SiteFooter />
  </div>
</template>
