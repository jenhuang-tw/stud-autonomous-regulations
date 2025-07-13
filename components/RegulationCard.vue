<template>
  <NuxtLink :to="`/${orgId}/${regulation.id}`"
            class="block bg-white dark:bg-secondary-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
    <h3 class="text-xl font-semibold text-primary-700 dark:text-primary-300 mb-2">{{ regulation.name }}</h3>
    <p class="text-secondary-700 dark:text-secondary-300 text-sm">{{ regulation.shortName }}</p>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  orgId: string;
  regulation: {
    id: string;
    name: string;
    shortName: string;
  };
}>();
</script>
