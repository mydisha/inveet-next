import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { apiEndpoints } from '../routes';

// Create axios instance with default configuration
const baseURL = import.meta.env.VITE_APP_URL || window.location.origin;
console.log('🌐 API Base URL:', baseURL);

const api: AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true, // Important for Laravel Sanctum
});

// Request interceptor to add auth token and CSRF token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add CSRF token for stateful requests
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (csrfToken) {
      config.headers['X-CSRF-TOKEN'] = csrfToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    } else if (error.response?.status === 419) {
      // Page Expired - CSRF token mismatch, try to refresh token
      console.warn('CSRF token expired, attempting to refresh...');

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

          // Retry the original request with the new token
          if (error.config) {
            error.config.headers['X-CSRF-TOKEN'] = newToken;
            return api.request(error.config);
          }
        } else {
          // If CSRF refresh fails, redirect to login
          console.error('Failed to refresh CSRF token, redirecting to login');
          window.location.href = '/login';
        }
      } catch (refreshError) {
        console.error('Failed to refresh CSRF token:', refreshError);
        // If CSRF refresh fails, redirect to login
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Generic API response type
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: string;
}

// Generic error response type
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status: number;
}

// API service class
export class ApiService {
  // Authentication methods
  static async login(credentials: { email: string; password: string }) {
    try {
      const response = await api.post(apiEndpoints.auth.login, credentials);
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async register(userData: { name: string; email: string; password: string; password_confirmation: string }) {
    try {
      const response = await api.post(apiEndpoints.auth.register, userData);
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async logout() {
    try {
      console.log('🔄 API Service: Attempting logout...');
      console.log('   Current CSRF token:', document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')?.substring(0, 10) + '...');
      console.log('   Logout URL:', api.defaults.baseURL + apiEndpoints.auth.logout);

      const response = await api.post(apiEndpoints.auth.logout);
      console.log('✅ API Service: Logout response:', response.data);

      // Clear auth token and other auth-related data
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      localStorage.removeItem('wedding_data');
      return { success: true };
    } catch (error: any) {
      console.error('❌ API Service: Logout error:', error);

      // If we get 401 Unauthorized, try the public logout route
      if (error.response?.status === 401) {
        console.log('🔄 API Service: 401 error, trying public logout...');
        try {
          const publicResponse = await api.post('/api/logout-public');
          console.log('✅ API Service: Public logout response:', publicResponse.data);
        } catch (publicError) {
          console.error('❌ API Service: Public logout also failed:', publicError);
        }
      }

      // Always clear local data regardless of API success/failure
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      localStorage.removeItem('wedding_data');

      // Don't throw error for 401 - this is expected when session expires
      if (error.response?.status === 401) {
        return { success: true, message: 'Logged out (session expired)' };
      }

      throw error;
    }
  }

  static async forgotPassword(email: string) {
    try {
      const response = await api.post(apiEndpoints.auth.forgotPassword, { email });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async resetPassword(data: { token: string; email: string; password: string; password_confirmation: string }) {
    try {
      const response = await api.post(apiEndpoints.auth.resetPassword, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // User management methods
  static async getUserProfile() {
    try {
      const response = await api.get(apiEndpoints.user.profile);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async updateUserProfile(profileData: any) {
    try {
      const response = await api.put(apiEndpoints.user.updateProfile, profileData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Wedding management methods
  static async getWeddings() {
    try {
      const response = await api.get(apiEndpoints.weddings.index);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async createWedding(weddingData: any) {
    try {
      const response = await api.post(apiEndpoints.weddings.store, weddingData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async getWedding(id: string | number) {
    try {
      const response = await api.get(apiEndpoints.weddings.show(id));
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async updateWedding(id: string | number, weddingData: any) {
    try {
      const response = await api.put(apiEndpoints.weddings.update(id), weddingData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async deleteWedding(id: string | number) {
    try {
      const response = await api.delete(apiEndpoints.weddings.destroy(id));
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async getWeddingBySlug(slug: string) {
    try {
      const response = await api.get(apiEndpoints.weddings.findBySlug(slug));
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async getUserWeddings() {
    try {
      const response = await api.get(apiEndpoints.weddings.findByUserId);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async getDraftWeddings() {
    try {
      const response = await api.get(apiEndpoints.weddings.getDraftWeddings);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async publishWedding(id: string | number) {
    try {
      const response = await api.post(apiEndpoints.weddings.publish(id));
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async activateWedding(id: string | number) {
    try {
      const response = await api.post(apiEndpoints.weddings.activate(id));
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Package management methods
  static async getPackages() {
    try {
      const response = await api.get(apiEndpoints.packages.index);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async getActivePackages() {
    try {
      const response = await api.get(apiEndpoints.packages.getActive);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async getRecommendedPackages() {
    try {
      const response = await api.get(apiEndpoints.packages.getRecommended);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async getPackage(id: string | number) {
    try {
      const response = await api.get(apiEndpoints.packages.show(id));
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async calculatePackagePrice(id: string | number, data: any) {
    try {
      const response = await api.get(apiEndpoints.packages.calculatePrice(id), { params: data });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Theme management methods
  static async getThemes(filters?: { active_only?: boolean; user_id?: number }) {
    try {
      const params = filters ? { ...filters } : {};
      const response = await api.get(apiEndpoints.themes.index, { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async getActiveThemes() {
    try {
      const response = await api.get(apiEndpoints.themes.getActive);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async getTheme(id: string | number) {
    try {
      const response = await api.get(apiEndpoints.themes.show(id));
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async getThemeBySlug(slug: string) {
    try {
      const response = await api.get(apiEndpoints.themes.findBySlug(slug));
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Order management methods
  static async createOrder(orderData: any) {
    try {
      const response = await api.post(apiEndpoints.orders.store, orderData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async getUserOrders() {
    try {
      const response = await api.get(apiEndpoints.orders.findByUserId);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async getOrder(id: string | number) {
    try {
      const response = await api.get(apiEndpoints.orders.show(id));
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Special invitation methods
  static async createInvitation(invitationData: any) {
    try {
      const response = await api.post(apiEndpoints.invitations.store, invitationData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async getInvitationBySlug(slug: string) {
    try {
      const response = await api.get(apiEndpoints.invitations.findBySlug(slug));
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async validateInvitationPassword(id: string | number, password: string) {
    try {
      const response = await api.post(apiEndpoints.invitations.validatePassword(id), { password });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Utility methods
  static async healthCheck() {
    try {
      const response = await api.get(apiEndpoints.health);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Error handling helper
  private static handleError(error: any): ApiError {
    if (error.response) {
      // Server responded with error status
      return {
        message: error.response.data.message || 'An error occurred',
        errors: error.response.data.errors,
        status: error.response.status,
      };
    } else if (error.request) {
      // Request was made but no response received
      return {
        message: 'No response from server',
        status: 0,
      };
    } else {
      // Something else happened
      return {
        message: error.message || 'An unexpected error occurred',
        status: 0,
      };
    }
  }
}

// Export the api instance for direct use if needed
export { api };

// Export default API service
export default ApiService;
