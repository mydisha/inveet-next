import axios, { AxiosInstance } from 'axios';

// Create axios instance with default configuration (same as the main API service)
const baseURL = import.meta.env.VITE_APP_URL || window.location.origin;

const api: AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true, // Important for Laravel Sanctum
});

// Request interceptor to add CSRF token
api.interceptors.request.use(
  (config) => {
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

/**
 * Make a GET request to an API endpoint
 */
export async function apiGet(url: string): Promise<any> {
  const response = await api.get(url);
  return response.data;
}

/**
 * Make a POST request to an API endpoint
 */
export async function apiPost(url: string, data: any = {}): Promise<any> {
  const response = await api.post(url, data);
  return response.data;
}

/**
 * Make a PUT request to an API endpoint
 */
export async function apiPut(url: string, data: any = {}): Promise<any> {
  const response = await api.put(url, data);
  return response.data;
}

/**
 * Make a DELETE request to an API endpoint
 */
export async function apiDelete(url: string): Promise<any> {
  const response = await api.delete(url);
  return response.data;
}
