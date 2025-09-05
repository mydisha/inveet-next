import { usePage } from '@inertiajs/react';
import { useMemo } from 'react';

/**
 * Hook to automatically detect the current path from the browser URL
 * This eliminates the need to manually pass currentPath from controllers
 */
export function useCurrentPath(): string {
  const { url } = usePage();

  return useMemo(() => {
    // Extract path from full URL (remove domain and query params)
    const path = new URL(url, window.location.origin).pathname;
    return path;
  }, [url]);
}
