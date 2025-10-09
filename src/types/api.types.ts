/**
 * API Request & Response Types
 * Type definitions for all API communication including requests, responses, and data transformation
 */

import type { Note } from './models';

/**
 * Generic API Response wrapper
 * Standard response structure for all API endpoints
 */
export interface ApiResponse<T> {
    options?: {
        success: boolean;
        message?: string;
    };
    data?: T;
}

/**
 * Notes API - Request Types
 */

/**
 * Parameters for fetching notes from the API
 */
export interface GetNotesParams {
    getAll?: boolean;
    searchText?: string;
}

/**
 * Request payload for creating a new note
 */
export interface CreateNoteRequest {
    name: string;
    description?: string;
    tags?: string;
    type?: string;
    createdBy?: string;
}

/**
 * Request payload for updating an existing note
 */
export interface UpdateNoteRequest {
    noteId: number;
    name: string;
    description?: string;
    tags?: string;
    type?: string;
}

/**
 * Notes API - Response Types
 */

/**
 * Note response structure from the API
 * Raw API response with ISO date strings (before transformation to Date objects)
 */
export interface NoteResponse {
    noteId: number;
    name: string;
    description?: string;
    tags?: string;
    type?: string;
    createdBy?: string;
    createdAt: string; // ISO date string from API
    updatedAt?: string; // ISO date string from API
    isArchived: boolean;
}

/**
 * API response wrapper for notes list endpoint
 */
export interface NotesApiResponse extends ApiResponse<NoteResponse[]> {}

/**
 * API response wrapper for note create/update operations
 */
export interface NoteCreateUpdateResponse extends ApiResponse<NoteResponse> {}

/**
 * Authentication API Types
 */

/**
 * Login request payload for user authentication
 */
export interface LoginRequest {
    username: string;
    password: string;
}

/**
 * Login response containing authentication token and user info
 */
export interface LoginResponse {
    token: string;
    userId?: number;
    userName?: string;
}

/**
 * Token exchange response for OAuth/external authentication
 */
export interface ExchangeTokenResponse {
    id_token: string;
    access_token: string;
    expires_in: number;
}

/**
 * Generic types for API calls
 */

/**
 * Supported HTTP methods for API requests
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * Configuration object for API requests
 */
export interface ApiRequestConfig {
    method?: HttpMethod;
    headers?: Record<string, string>;
    body?: any;
    params?: Record<string, string | number | boolean>;
}
