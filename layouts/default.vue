<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-grow container mx-auto px-4 py-8">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

// Handle dark mode
const colorMode = useColorMode()

onMounted(() => {
  // Set initial color mode based on system preference or default to light
  if (process.client) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      document.documentElement.classList.add('dark');
      colorMode.preference = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      colorMode.preference = 'light';
    }
  }
});
</script>
