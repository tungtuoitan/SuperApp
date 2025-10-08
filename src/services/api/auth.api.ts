/**
 * Authentication API Service
 */

import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '../../config/api.config';
import { LoginRequest, LoginResponse, ExchangeTokenResponse } from '../../types';
import { getLocaleLanguage } from '../../utils/locale';

export const authApi = {
  /**
   * Login with username and password
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const formData = new FormData();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);

    const headers = {
      'Accept-Language': getLocaleLanguage(),
    };

    const response = await apiClient.post<LoginResponse>(
      API_ENDPOINTS.auth.login,
      formData,
      headers
    );

    return response;
  },

  /**
   * Exchange authorization code for token
   */
  async exchangeCodeForToken(code: string): Promise<ExchangeTokenResponse> {
    const response = await apiClient.post<ExchangeTokenResponse>(
      API_ENDPOINTS.auth.exchangeToken,
      { code }
    );

    return response;
  },
};
