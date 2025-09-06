import { router } from '@inertiajs/react';

/**
 * Centralized authentication utilities
 */
export class AuthUtils {
  /**
   * Logout user using Inertia.js
   * @param options - Logout options
   */
  static async logout(options: {
    redirectTo?: string;
    showFeedback?: boolean;
  } = {}): Promise<void> {
    const { redirectTo = '/login', showFeedback = true } = options;

    try {
      // Use Inertia.js to perform logout
      router.post('/logout', {}, {
        onSuccess: () => {
          // Clear local data on successful logout
          this.clearAuthData();
          if (showFeedback) {
            console.log('Logout successful');
          }
        },
        onError: (errors) => {
          console.error('Logout error:', errors);
          // Clear local data even on error
          this.clearAuthData();
          // Fallback to form-based logout
          this.logoutViaForm();
        },
        onFinish: () => {
          // Additional cleanup if needed
          console.log('Logout process finished');
        }
      });

    } catch (error) {
      console.error('Logout exception:', error);
      // Clear local data even if everything fails
      this.clearAuthData();
      // Fallback to form-based logout
      this.logoutViaForm();
    }
  }

  /**
   * Logout using traditional form submission (fallback method)
   */
  private static logoutViaForm(): void {
    console.log('Using form-based logout fallback');

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

      // Submit form
      document.body.appendChild(form);
      form.submit();
    } else {
      console.error('CSRF token not found. Cannot perform form-based logout.');
      // Final fallback: redirect to home page
      window.location.href = '/';
    }
  }

  /**
   * Clear all authentication-related data from localStorage
   */
  private static clearAuthData(): void {
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
  }

  /**
   * Check if user is authenticated
   * This is a client-side check only - server-side validation should be used for security
   */
  static isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('user');
    const isAuth = !!(token && user);
    return isAuth;
  }

  /**
   * Server-side authentication check
   * This should be used for critical authentication decisions
   */
  static async checkServerAuth(): Promise<boolean> {
    try {

      const response = await fetch('/api/user/profile', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        }
      });


      if (response.ok) {
        return true;
      } else if (response.status === 401) {
        // Clear local data if server says we're not authenticated
        this.clearAuthData();
        return false;
      } else if (response.status === 419) {
        // Clear local data and try to refresh CSRF token
        this.clearAuthData();
        return false;
      } else {
        return false;
      }
    } catch (error) {
      // If network error, assume not authenticated for security
      return false;
    }
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

        return newToken;
      }
    } catch (error) {
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
      }
    }
  }

  /**
   * Force refresh CSRF token - useful after login/logout
   */
  static async forceRefreshCsrfToken(): Promise<string | null> {
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

        if (!newToken) {
          return null;
        }

        // Update the meta tag with the new token
        const metaTag = document.querySelector('meta[name="csrf-token"]');
        if (metaTag) {
          const oldToken = metaTag.getAttribute('content');
          metaTag.setAttribute('content', newToken);
        } else {
        }

        return newToken;
      } else {
      }
    } catch (error) {
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
