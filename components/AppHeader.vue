<template>
  <header class="bg-primary-600 dark:bg-primary-800 text-white shadow-md p-4 flex justify-between items-center">
    <NuxtLink to="/" class="text-2xl font-bold">臺灣學生自治規章典藏</NuxtLink>
    <nav>
      <button @click="toggleDarkMode" class="p-2 rounded-full hover:bg-primary-700 dark:hover:bg-primary-700 transition-colors">
        
          <Icon v-if="colorMode.preference === 'dark'" name="heroicons-outline:sun" class="h-6 w-6" />
          <Icon v-else name="heroicons-outline:moon" class="h-6 w-6" />
        
      </button>
    </nav>
  </header>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

const toggleDarkMode = () => {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark';
};
</script>

<style>
/* You'll need to add Nuxt Icon module in nuxt.config.ts if you use it */
</style>
