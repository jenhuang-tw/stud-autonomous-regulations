<template>
  <div class="container mx-auto px-4 py-8">
    <NuxtLink to="/" class="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline mb-6">
      <Icon name="heroicons-outline:arrow-left" class="w-5 h-5 mr-1" />
      回首頁
    </NuxtLink>

    <div v-if="loading" class="text-center text-lg text-secondary-600 dark:text-secondary-400">載入中...</div>
    <div v-else-if="error" class="text-center text-red-500 text-lg">錯誤：{{ error }}</div>
    <div v-else-if="!organization">
      <h1 class="text-4xl font-extrabold text-center text-red-500 mb-8">組織未找到</h1>
      <p class="text-center text-secondary-600 dark:text-secondary-400">很抱歉，找不到代號為 "{{ orgId }}" 的學生自治組織。</p>
    </div>
    <div v-else>
      <h1 class="text-4xl font-extrabold text-center text-primary-700 dark:text-primary-300 mb-8">
        {{ organization.name }} 法規
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RegulationCard
          v-for="regulation in organization.regulations"
          :key="regulation.id"
          :orgId="orgId"
          :regulation="regulation"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useOrganizations } from '~/composables/useOrganizations';

const route = useRoute();
const orgId = route.params.org as string;

const { organizations, loading, error, fetchOrganizations } = useOrganizations();

onMounted(() => {
  fetchOrganizations();
});

const organization = computed(() => {
  return organizations.value.find(org => org.id === orgId);
});
</script>
