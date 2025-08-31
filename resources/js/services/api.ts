import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { apiEndpoints, getApiUrl } from '../routes';

// Create axios instance with default configuration
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_URL || 'http://localhost:8001',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true, // Important for Laravel Sanctum
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
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
      await api.post(apiEndpoints.auth.logout);
      localStorage.removeItem('auth_token');
    } catch (error) {
      console.error('Logout error:', error);
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
