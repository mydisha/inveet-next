import { useCallback, useState } from 'react';
import { AuthUtils } from '../lib/auth';

/**
 * Custom hook for authentication-related functionality
 */
export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);

  const logout = useCallback(async (options: {
    redirectTo?: string;
    showFeedback?: boolean;
  } = {}) => {
    setIsLoading(true);
    try {
      await AuthUtils.logout(options);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const isAuthenticated = useCallback(() => {
    return AuthUtils.isAuthenticated();
  }, []);

  const getAuthToken = useCallback(() => {
    return AuthUtils.getAuthToken();
  }, []);

  const getCsrfToken = useCallback(() => {
    return AuthUtils.getCsrfToken();
  }, []);

  const refreshCsrfToken = useCallback(async () => {
    return await AuthUtils.refreshCsrfToken();
  }, []);

  const initializeCsrfToken = useCallback(async () => {
    return await AuthUtils.initializeCsrfToken();
  }, []);

  return {
    logout,
    isAuthenticated,
    getAuthToken,
    getCsrfToken,
    refreshCsrfToken,
    initializeCsrfToken,
    isLoading,
  };
}
