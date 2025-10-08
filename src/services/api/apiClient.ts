/**
 * Centralized API Client
 * Base HTTP client with interceptors and error handling
 */

import { API_CONFIG } from '../../config/api.config';
import { ApiRequestConfig } from '../../types';

/**
 * Custom API Error class for better error handling
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseURL = API_CONFIG.baseURL;
    this.defaultHeaders = API_CONFIG.headers;
  }

  /**
   * Build full URL with query parameters
   */
  private buildUrl(endpoint: string, params?: Record<string, string | number | boolean>): string {
    const url = `${this.baseURL}${endpoint}`;

    if (!params) return url;

    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });

    return `${url}?${searchParams.toString()}`;
  }

  /**
   * Generic request method
   */
  async request<T>(endpoint: string, config: ApiRequestConfig = {}): Promise<T> {
    const { method = 'GET', headers = {}, body, params } = config;

    const url = this.buildUrl(endpoint, params);

    const requestHeaders = {
      ...this.defaultHeaders,
      ...headers,
    };

    // Get auth token from localStorage if available
    const token = localStorage.getItem('userToken');
    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }

    const options: RequestInit = {
      method,
      headers: requestHeaders,
    };

    if (body) {
      if (body instanceof FormData) {
        // Remove Content-Type for FormData - browser will set it with boundary
        delete requestHeaders['Content-Type'];
        options.body = body;
      } else {
        options.body = JSON.stringify(body);
      }
    }

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new ApiError(
          response.status,
          response.statusText,
          `API request failed: ${response.statusText}`
        );
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error('Network Error:', error);
      throw new Error(`Network error: ${error}`);
    }
  }

  /**
   * Convenience methods
   */
  get<T>(endpoint: string, params?: Record<string, string | number | boolean>): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', params });
  }

  post<T>(endpoint: string, body?: any, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', body, headers });
  }

  put<T>(endpoint: string, body?: any): Promise<T> {
    return this.request<T>(endpoint, { method: 'PUT', body });
  }

  delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
