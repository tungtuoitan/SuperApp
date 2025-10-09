/**
 * Authentication API Service
 * Handles user authentication, login, and token management operations
 */

import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '../../config/api.config';
import { getLocaleLanguage } from '../../utils/locale';
import type { LoginRequest, LoginResponse, ExchangeTokenResponse } from '../../types';

export const authApi = {
    /**
     * Login with username and password
     * @param credentials User login credentials (username and password)
     * @returns Promise resolving to login response with token and user data
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
     * @param code Authorization code from OAuth provider
     * @returns Promise resolving to token exchange response
     */
    async exchangeCodeForToken(code: string): Promise<ExchangeTokenResponse> {
        const response = await apiClient.post<ExchangeTokenResponse>(
            API_ENDPOINTS.auth.exchangeToken,
            { code }
        );

        return response;
    },
};
