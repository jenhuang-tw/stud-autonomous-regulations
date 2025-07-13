<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-extrabold text-center text-primary-700 dark:text-primary-300 mb-8">臺灣學生自治規章典藏</h1>

    <div class="mb-8 max-w-2xl mx-auto">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="搜尋法規全稱、簡稱或組織名稱..."
        class="w-full p-3 border border-secondary-300 dark:border-secondary-600 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100"
      />
    </div>

    <div v-if="loading" class="text-center text-lg text-secondary-600 dark:text-secondary-400">載入中...</div>
    <div v-else-if="error" class="text-center text-red-500 text-lg">錯誤：{{ error }}</div>
    <div v-else>
      <h2 class="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-6">學生自治組織</h2>
      <div v-if="filteredOrganizations.length === 0" class="text-center text-lg text-secondary-600 dark:text-secondary-400">
        沒有找到符合條件的組織或法規。
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="org in filteredOrganizations" :key="org.id"
             class="bg-white dark:bg-secondary-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 cursor-pointer"
             @click="navigateToOrganization(org.id)">
          <h3 class="text-xl font-semibold text-primary-700 dark:text-primary-300 mb-2">{{ org.name }}</h3>
          <p class="text-secondary-700 dark:text-secondary-300">{{ org.shortName }}</p>
          <div class="mt-4 text-sm text-secondary-600 dark:text-secondary-400">
            法規數量：{{ org.regulations.length }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useOrganizations } from '~/composables/useOrganizations';

const router = useRouter();
const { organizations, loading, error, fetchOrganizations } = useOrganizations();
const searchQuery = ref('');

onMounted(() => {
  fetchOrganizations();
});

const filteredOrganizations = computed(() => {
  if (!searchQuery.value) {
    return organizations.value;
  }
  const query = searchQuery.value.toLowerCase();
  return organizations.value.filter(org => {
    // Search in organization name or short name
    const orgMatch = org.name.toLowerCase().includes(query) || org.shortName.toLowerCase().includes(query);
    if (orgMatch) return true;

    // Search in regulation names within the organization
    const regulationMatch = org.regulations.some(reg =>
      reg.name.toLowerCase().includes(query) || reg.shortName.toLowerCase().includes(query)
    );
    return regulationMatch;
  });
});

const navigateToOrganization = (orgId: string) => {
  router.push(`/${orgId}`);
};
</script>
