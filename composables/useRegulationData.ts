import { ref } from 'vue';
import yaml from 'js-yaml';

interface RegulationVersionMeta {
  date: string;
  fullTitle: string;
  shortTitle: string;
  note: string;
  isCurrent: boolean;
  source: string;
  filename: string;
}

interface RegulationVersionsData {
  current: string;
  versions: RegulationVersionMeta[];
}

interface RegulationContent {
  meta: RegulationVersionMeta | null;
  content: string;
}

export function useRegulationData() {
  const versionsData = ref<RegulationVersionsData | null>(null);
  const regulationContent = ref<RegulationContent | null>(null);
  const loading = ref(true);
  const error = ref<string | null>(null);

  const fetchRegulationVersions = async (orgId: string, regulationId: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`/tw-student-regulation-archive/regulation-files/${orgId}/${regulationId}/versions.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      versionsData.value = await response.json();
    } catch (e: any) {
      console.error('Failed to fetch regulation versions:', e);
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  };

  const fetchRegulationContent = async (orgId: string, regulationId: string, filename: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`/tw-student-regulation-archive/regulation-files/${orgId}/${regulationId}/${filename}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const text = await response.text();
      const parts = text.split('---');
      let meta: RegulationVersionMeta | null = null;
      let content = text;

      if (parts.length >= 3) {
        try {
          meta = yaml.load(parts[1]) as RegulationVersionMeta;
          content = parts.slice(2).join('---').trim();
        } catch (e) {
          console.error('Failed to parse YAML front matter:', e);
          // If YAML parsing fails, treat the whole file as content
          meta = null;
          content = text;
        }
      }

      regulationContent.value = { meta, content };

    } catch (e: any) {
      console.error('Failed to fetch regulation content:', e);
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  };

  return { versionsData, regulationContent, loading, error, fetchRegulationVersions, fetchRegulationContent };
}
