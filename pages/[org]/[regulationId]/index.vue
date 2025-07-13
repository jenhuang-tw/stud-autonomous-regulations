<template>
  <div class="container mx-auto px-4 py-8">
    <NuxtLink :to="`/${orgId}`" class="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline mb-6">
      <Icon name="heroicons-outline:arrow-left" class="w-5 h-5 mr-1" />
      返回組織法規
    </NuxtLink>

    <div v-if="loading" class="text-center text-lg text-secondary-600 dark:text-secondary-400">載入中...</div>
    <div v-else-if="error" class="text-center text-red-500 text-lg">錯誤：{{ error }}</div>
    <div v-else-if="!versionsData || !currentVersionFilename">
      <h1 class="text-4xl font-extrabold text-center text-red-500 mb-8">法規未找到</h1>
      <p class="text-center text-secondary-600 dark:text-secondary-400">很抱歉，找不到此法規的最新版本。</p>
    </div>
    <div v-else>
      <h1 class="text-4xl font-extrabold text-center text-primary-700 dark:text-primary-300 mb-8">
        {{ regulationContent?.meta?.fullTitle || '法規內容' }}
        <span v-if="regulationContent?.meta?.isCurrent" class="text-sm font-normal">(最新版)</span>
      </h1>

      <div class="bg-white dark:bg-secondary-800 rounded-lg shadow-md p-6 mb-6">
        <p class="text-secondary-700 dark:text-secondary-300 mb-2">
          <span class="font-semibold">簡稱：</span>{{ regulationContent?.meta?.shortTitle }}
        </p>
        <p class="text-secondary-700 dark:text-secondary-300 mb-2">
          <span class="font-semibold">審議註記：</span>{{ regulationContent?.meta?.note }}
        </p>
        <p class="text-secondary-700 dark:text-secondary-300 mb-2">
          <span class="font-semibold">資料來源：</span>{{ regulationContent?.meta?.source }}
        </p>
        <p class="text-secondary-700 dark:text-secondary-300">
          <span class="font-semibold">版本日期：</span>{{ regulationContent?.meta?.date }}
        </p>
      </div>

      <VersionSelector
        :orgId="orgId"
        :regulationId="regulationId"
        :versions="versionsData.versions"
        :currentYmd="currentVersionFilename.replace('.txt', '')"
      />

      <div class="prose dark:prose-invert max-w-none text-secondary-900 dark:text-secondary-100 bg-white dark:bg-secondary-800 p-6 rounded-lg shadow-md overflow-x-auto">
        <pre class="whitespace-pre-wrap font-sans">{{ regulationContent?.content }}</pre>
      </div>

      <div class="mt-8 flex justify-center space-x-4">
        <button @click="shareToFacebook" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center">
          <Icon name="logos:facebook" class="w-5 h-5 mr-2" />分享到 Facebook
        </button>
        <button @click="shareToLine" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full flex items-center">
          <Icon name="logos:line" class="w-5 h-5 mr-2" />分享到 LINE
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useRegulationData } from '~/composables/useRegulationData';

const route = useRoute();
const orgId = route.params.org as string;
const regulationId = route.params.regulationId as string;

const { versionsData, regulationContent, loading, error, fetchRegulationVersions, fetchRegulationContent } = useRegulationData();

const currentVersionFilename = ref<string | null>(null);

const fetchData = async () => {
  await fetchRegulationVersions(orgId, regulationId);
  if (versionsData.value && versionsData.value.current) {
    currentVersionFilename.value = versionsData.value.current + '.txt';
    await fetchRegulationContent(orgId, regulationId, currentVersionFilename.value);
  }
};

onMounted(fetchData);

// Watch for route changes (though this page doesn't change params for specific versions)
// This might be more relevant for the [ymd].vue page
watch(() => route.params, fetchData, { deep: true });

const shareToFacebook = () => {
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
};

const shareToLine = () => {
  const url = encodeURIComponent(window.location.href);
  window.open(`https://social-plugins.line.me/lineit/share?url=${url}`, '_blank', 'width=600,height=400');
};
</script>

<style>
/* Add any specific styles if needed, or rely on Tailwind's prose plugin */
</style>
