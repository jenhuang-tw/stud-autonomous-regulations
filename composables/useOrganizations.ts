import { ref } from 'vue';

interface Organization {
  id: string;
  name: string;
  shortName: string;
  regulations: Array<{
    id: string;
    name: string;
    shortName: string;
  }>;
}

export function useOrganizations() {
  const organizations = ref<Organization[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);

  const fetchOrganizations = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch('/regulation-files/organizations.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      organizations.value = await response.json();
    } catch (e: any) {
      console.error('Failed to fetch organizations:', e);
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  };

  return { organizations, loading, error, fetchOrganizations };
}
