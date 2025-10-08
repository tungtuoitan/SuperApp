/**
 * API Request & Response Types
 */

import { Note } from './models';

// Generic API Response wrapper
export interface ApiResponse<T> {
  options?: {
    success: boolean;
    message?: string;
  };
  data?: T;
}

// Notes API
export interface GetNotesParams {
  getAll?: boolean;
  searchText?: string;
  types?: string;
  tags?: string;
  createdBy?: string;
}

export interface NotesApiResponse extends ApiResponse<Note[]> {}

export interface NoteCreateUpdateResponse extends ApiResponse<Note> {}

// Auth API
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId?: number;
  userName?: string;
}

export interface ExchangeTokenResponse {
  id_token: string;
  access_token: string;
  expires_in: number;
}

// Generic types for API calls
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface ApiRequestConfig {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string | number | boolean>;
}
