<template>
  <div class="mb-6">
    <label for="version-select" class="block text-lg font-medium text-secondary-700 dark:text-secondary-300 mb-2">選擇版本：</label>
    <select id="version-select" v-model="selectedVersionFilename"
            @change="handleVersionChange"
            class="block w-full p-2 border border-secondary-300 dark:border-secondary-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100">
      <option v-for="version in versions" :key="version.date" :value="version.filename">
        {{ version.date }} {{ version.isCurrent ? '(最新版)' : '' }} - {{ version.fullTitle }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const props = defineProps<{
  orgId: string;
  regulationId: string;
  versions: Array<{
    date: string;
    fullTitle: string;
    shortTitle: string;
    note: string;
    isCurrent: boolean;
    source: string;
    filename: string;
  }>;
  currentYmd?: string; // Current YMD from route params
}>();

const router = useRouter();
const route = useRoute();

const selectedVersionFilename = ref('');

// Initialize selectedVersionFilename based on current route or the latest version
onMounted(() => {
  if (props.currentYmd) {
    const foundVersion = props.versions.find(v => v.filename.replace('.txt', '') === props.currentYmd);
    if (foundVersion) {
      selectedVersionFilename.value = foundVersion.filename;
    } else {
      // Fallback to current if specific version not found (e.g., malformed URL)
      const current = props.versions.find(v => v.isCurrent);
      if (current) selectedVersionFilename.value = current.filename;
    }
  } else {
    // Default to the current version if no specific YMD in URL
    const current = props.versions.find(v => v.isCurrent);
    if (current) selectedVersionFilename.value = current.filename;
  }
});

const handleVersionChange = () => {
  const ymd = selectedVersionFilename.value.replace('.txt', '');
  if (ymd) {
    router.push(`/${props.orgId}/${props.regulationId}/${ymd}`);
  }
};

// Watch for route changes to update the selected version if navigating directly
watch(() => route.params.ymd, (newYmd) => {
  if (newYmd) {
    selectedVersionFilename.value = `${newYmd}.txt`;
  } else {
    const current = props.versions.find(v => v.isCurrent);
    if (current) selectedVersionFilename.value = current.filename;
  }
}, { immediate: true });
</script>
