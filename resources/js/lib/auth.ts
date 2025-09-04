import { ApiService } from '../services/api';

/**
 * Centralized authentication utilities
 */
export class AuthUtils {
  /**
   * Logout user with multiple fallback methods
   * @param options - Logout options
   */
  static async logout(options: {
    useApi?: boolean;
    redirectTo?: string;
    showFeedback?: boolean;
  } = {}): Promise<void> {
    const { useApi = true, redirectTo = '/', showFeedback = true } = options;

    try {
      console.log('🚪 Starting logout process...');

      // Clear local data first to prevent any cached auth state
      this.clearAuthData();

      if (useApi) {
        // Try API-based logout first
        console.log('🔄 Attempting API logout...');
        try {
          await ApiService.logout();
          console.log('✅ API logout successful');
        } catch (apiError) {
          console.warn('⚠️ API logout failed, trying public logout...', apiError);
          // Try public logout as fallback
          try {
            await fetch('/api/logout-public', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
              },
              credentials: 'include'
            });
            console.log('✅ Public logout successful');
          } catch (publicError) {
            console.warn('⚠️ Public logout also failed:', publicError);
          }
        }
      } else {
        // Use form-based logout directly
        console.log('🔄 Using form-based logout...');
        this.logoutViaForm();
        return; // Form-based logout handles redirect
      }

      // Show success feedback
      if (showFeedback) {
        console.log('✅ Logged out successfully');
      }

      // Force redirect and clear any cached state
      console.log('🔄 Redirecting to:', redirectTo);

      // Clear any remaining auth state
      this.clearAuthData();

      // Force a hard redirect to clear all state
      window.location.replace(redirectTo);

    } catch (error) {
      console.error('❌ Logout process failed:', error);

      // Clear local data even if everything fails
      this.clearAuthData();

      // Force redirect to home page
      console.log('🔄 Forcing redirect to home page...');
      window.location.replace('/');
    }
  }

  /**
   * Logout using traditional form submission (fallback method)
   */
  private static logoutViaForm(): void {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/logout';

    // Add CSRF token
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (csrfToken) {
      const tokenInput = document.createElement('input');
      tokenInput.type = 'hidden';
      tokenInput.name = '_token';
      tokenInput.value = csrfToken;
      form.appendChild(tokenInput);
    } else {
      console.error('CSRF token not found. Cannot perform logout.');
      // Fallback: redirect to home page
      window.location.href = '/';
      return;
    }

    // Submit form
    document.body.appendChild(form);
    form.submit();
  }

  /**
   * Clear all authentication-related data from localStorage
   */
  private static clearAuthData(): void {
    console.log('🧹 Clearing authentication data...');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    localStorage.removeItem('wedding_data');
    localStorage.removeItem('csrf_token');
    // Clear any other auth-related keys
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.includes('auth') || key.includes('user') || key.includes('session'))) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
    console.log('✅ Authentication data cleared');
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('user');
    const isAuth = !!(token && user);
    console.log('🔍 Auth check:', { token: !!token, user: !!user, isAuth });
    return isAuth;
  }

  /**
   * Get stored auth token
   */
  static getAuthToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * Set auth token
   */
  static setAuthToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  /**
   * Remove auth token
   */
  static removeAuthToken(): void {
    localStorage.removeItem('auth_token');
  }

  /**
   * Get CSRF token from meta tag
   */
  static getCsrfToken(): string | null {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || null;
  }

    /**
   * Refresh CSRF token by making a request to get a new one
   */
  static async refreshCsrfToken(): Promise<string | null> {
    try {
      const response = await fetch('/api/csrf-token', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        }
      });

      if (response.ok) {
        const data = await response.json();
        const newToken = data.csrf_token;

        // Update the meta tag with the new token
        const metaTag = document.querySelector('meta[name="csrf-token"]');
        if (metaTag) {
          metaTag.setAttribute('content', newToken);
        }

        console.log('CSRF token refreshed successfully');
        return newToken;
      }
    } catch (error) {
      console.error('Failed to refresh CSRF token:', error);
    }

    return null;
  }

  /**
   * Initialize CSRF token refresh on page load
   * This ensures we have a fresh token after login redirects
   */
  static async initializeCsrfToken(): Promise<void> {
    // Only refresh if we're on a page that requires authentication
    const currentPath = window.location.pathname;
    const authRequiredPaths = ['/dashboard', '/my-weddings', '/wedding-invitations', '/profile', '/settings'];

    if (authRequiredPaths.some(path => currentPath.startsWith(path))) {
      try {
        await this.refreshCsrfToken();
      } catch (error) {
        console.error('Failed to initialize CSRF token:', error);
      }
    }
  }

  /**
   * Force refresh CSRF token - useful after login/logout
   */
  static async forceRefreshCsrfToken(): Promise<string | null> {
    try {
      console.log('🔄 Force refreshing CSRF token...');

      const response = await fetch('/api/csrf-token', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('📦 Server response data:', data);

        const newToken = data.csrf_token;

        if (!newToken) {
          console.error('❌ No CSRF token received from server');
          console.error('   Full response data:', data);
          return null;
        }

        // Update the meta tag with the new token
        const metaTag = document.querySelector('meta[name="csrf-token"]');
        if (metaTag) {
          const oldToken = metaTag.getAttribute('content');
          metaTag.setAttribute('content', newToken);
          console.log('✅ CSRF token force refreshed successfully');
          console.log('   Old token:', oldToken ? oldToken.substring(0, 10) + '...' : 'null');
          console.log('   New token:', newToken ? newToken.substring(0, 10) + '...' : 'null');
          console.log('   Timestamp:', data.timestamp);
          console.log('   Session ID:', data.session_id);
          if (data.debug) {
            console.log('   Debug info:', data.debug);
          }
        } else {
          console.error('❌ CSRF meta tag not found!');
        }

        return newToken;
      } else {
        console.error('❌ Failed to refresh CSRF token. Response status:', response.status);
        const errorText = await response.text();
        console.error('   Error response:', errorText);
      }
    } catch (error) {
      console.error('❌ Failed to force refresh CSRF token:', error);
    }

    return null;
  }
}

// Export individual functions for convenience
export const logout = AuthUtils.logout.bind(AuthUtils);
export const isAuthenticated = AuthUtils.isAuthenticated.bind(AuthUtils);
export const getAuthToken = AuthUtils.getAuthToken.bind(AuthUtils);
export const setAuthToken = AuthUtils.setAuthToken.bind(AuthUtils);
export const removeAuthToken = AuthUtils.removeAuthToken.bind(AuthUtils);
export const getCsrfToken = AuthUtils.getCsrfToken.bind(AuthUtils);
export const refreshCsrfToken = AuthUtils.refreshCsrfToken.bind(AuthUtils);
export const forceRefreshCsrfToken = AuthUtils.forceRefreshCsrfToken.bind(AuthUtils);
export const initializeCsrfToken = AuthUtils.initializeCsrfToken.bind(AuthUtils);
