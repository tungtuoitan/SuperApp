# 🌐 API LAYER - HTTP Communication & Services

> **Philosophy**: Clean separation between network layer and business logic.

---

## 🏗️ API Architecture

```
Component
    ↓
React Query Hook
    ↓
Service Layer (Business Logic)
    ↓
API Client (HTTP)
    ↓
Backend API
```

---

## 🔧 API Client Setup

### Axios-based Client

```typescript
// lib/api-client.ts
import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios'

class ApiClient {
    private instance: AxiosInstance

    constructor() {
        this.instance = axios.create({
            baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json',
            },
        })

        this.setupInterceptors()
    }

    private setupInterceptors() {
        // Request interceptor
        this.instance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                // Add auth token
                const token = localStorage.getItem('token')
                if (token && config.headers) {
                    config.headers.Authorization = `Bearer ${token}`
                }

                // Log in development
                if (import.meta.env.DEV) {
                    console.log('→', config.method?.toUpperCase(), config.url)
                }

                return config
            },
            (error: AxiosError) => {
                return Promise.reject(error)
            }
        )

        // Response interceptor
        this.instance.interceptors.response.use(
            (response) => {
                // Log in development
                if (import.meta.env.DEV) {
                    console.log('←', response.status, response.config.url)
                }
                return response
            },
            (error: AxiosError) => {
                // Handle common errors
                if (error.response?.status === 401) {
                    // Unauthorized - clear token and redirect
                    localStorage.removeItem('token')
                    window.location.href = '/login'
                }

                if (error.response?.status === 403) {
                    // Forbidden
                    console.error('Access forbidden')
                }

                if (error.response?.status >= 500) {
                    // Server error
                    console.error('Server error:', error.response.status)
                }

                return Promise.reject(error)
            }
        )
    }

    // GET request
    async get<T>(url: string, config?: any): Promise<T> {
        const response = await this.instance.get<T>(url, config)
        return response.data
    }

    // POST request
    async post<T>(url: string, data?: any, config?: any): Promise<T> {
        const response = await this.instance.post<T>(url, data, config)
        return response.data
    }

    // PUT request
    async put<T>(url: string, data?: any, config?: any): Promise<T> {
        const response = await this.instance.put<T>(url, data, config)
        return response.data
    }

    // PATCH request
    async patch<T>(url: string, data?: any, config?: any): Promise<T> {
        const response = await this.instance.patch<T>(url, data, config)
        return response.data
    }

    // DELETE request
    async delete<T>(url: string, config?: any): Promise<T> {
        const response = await this.instance.delete<T>(url, config)
        return response.data
    }
}

export const apiClient = new ApiClient()
```

---

### Fetch-based Client (Alternative)

```typescript
// lib/api-client.ts
class ApiClient {
    private baseURL: string

    constructor() {
        this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
    }

    private getHeaders(): HeadersInit {
        const token = localStorage.getItem('token')
        return {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
        }
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
            // Handle errors
            if (response.status === 401) {
                localStorage.removeItem('token')
                window.location.href = '/login'
            }

            const error = await response.json().catch(() => ({}))
            throw new Error(error.message || `HTTP ${response.status}`)
        }

        return response.json()
    }

    async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
        const url = new URL(`${this.baseURL}${endpoint}`)
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    url.searchParams.append(key, String(value))
                }
            })
        }

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: this.getHeaders(),
        })

        return this.handleResponse<T>(response)
    }

    async post<T>(endpoint: string, data?: any): Promise<T> {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        })

        return this.handleResponse<T>(response)
    }

    async put<T>(endpoint: string, data?: any): Promise<T> {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        })

        return this.handleResponse<T>(response)
    }

    async delete<T>(endpoint: string): Promise<T> {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        })

        return this.handleResponse<T>(response)
    }
}

export const apiClient = new ApiClient()
```

---

## 🎯 Service Layer Pattern

### Service Class Structure

```typescript
// features/notes/services/noteService.ts
import { apiClient } from '@/lib/api-client'
import type { Note, CreateNoteDTO, UpdateNoteDTO, GetNotesParams } from '../types/note.types'

// API Response wrapper (if backend uses this pattern)
interface ApiResponse<T> {
    data: T
    success: boolean
    message?: string
}

class NoteService {
    private readonly basePath = '/api/notes'

    /**
     * Get all notes with optional filters
     */
    async getNotes(params?: GetNotesParams): Promise<Note[]> {
        const response = await apiClient.get<ApiResponse<Note[]>>(this.basePath, {
            params,
        })

        return response.data || []
    }

    /**
     * Get single note by ID
     */
    async getNoteById(id: number): Promise<Note> {
        const response = await apiClient.get<ApiResponse<Note>>(`${this.basePath}/${id}`)

        if (!response.data) {
            throw new Error('Note not found')
        }

        return response.data
    }

    /**
     * Create new note
     */
    async createNote(data: CreateNoteDTO): Promise<Note> {
        const response = await apiClient.post<ApiResponse<Note>>(this.basePath, data)

        if (!response.data) {
            throw new Error('Failed to create note')
        }

        return response.data
    }

    /**
     * Update existing note
     */
    async updateNote(id: number, data: UpdateNoteDTO): Promise<Note> {
        const response = await apiClient.put<ApiResponse<Note>>(
            `${this.basePath}/${id}`,
            data
        )

        if (!response.data) {
            throw new Error('Failed to update note')
        }

        return response.data
    }

    /**
     * Delete note
     */
    async deleteNote(id: number): Promise<void> {
        await apiClient.delete(`${this.basePath}/${id}`)
    }

    /**
     * Archive note (business logic convenience method)
     */
    async archiveNote(id: number): Promise<Note> {
        return this.updateNote(id, { isArchived: true })
    }

    /**
     * Unarchive note
     */
    async unarchiveNote(id: number): Promise<Note> {
        return this.updateNote(id, { isArchived: false })
    }

    /**
     * Bulk delete notes
     */
    async bulkDelete(ids: number[]): Promise<void> {
        await apiClient.post(`${this.basePath}/bulk-delete`, { ids })
    }
}

// Export singleton instance
export const noteService = new NoteService()
```

---

## 🔄 Data Transformation

### DTO to Domain Model

```typescript
// Backend returns dates as strings, we want Date objects
interface NoteDTO {
    noteId: number
    name: string
    description?: string
    createdAt: string // ISO string
    updatedAt: string // ISO string
    isArchived: boolean
}

// Our domain model
interface Note {
    noteId: number
    name: string
    description?: string
    createdAt: Date // Date object
    updatedAt: Date // Date object
    isArchived: boolean
}

class NoteService {
    private transformNote(dto: NoteDTO): Note {
        return {
            ...dto,
            createdAt: new Date(dto.createdAt),
            updatedAt: new Date(dto.updatedAt),
        }
    }

    async getNotes(params?: GetNotesParams): Promise<Note[]> {
        const response = await apiClient.get<ApiResponse<NoteDTO[]>>('/api/notes', {
            params,
        })

        return response.data.map(this.transformNote)
    }
}
```

---

## 🔐 Authentication Service

```typescript
// features/auth/services/authService.ts
import { apiClient } from '@/lib/api-client'
import type { User, LoginRequest, LoginResponse } from '../types/auth.types'

class AuthService {
    private readonly basePath = '/api/auth'

    /**
     * Login with credentials
     */
    async login(credentials: LoginRequest): Promise<LoginResponse> {
        const response = await apiClient.post<LoginResponse>(
            `${this.basePath}/login`,
            credentials
        )

        // Store token
        if (response.token) {
            localStorage.setItem('token', response.token)
        }

        return response
    }

    /**
     * Logout user
     */
    async logout(): Promise<void> {
        try {
            await apiClient.post(`${this.basePath}/logout`)
        } finally {
            // Always clear local data
            localStorage.removeItem('token')
        }
    }

    /**
     * Get current user profile
     */
    async getCurrentUser(): Promise<User> {
        return apiClient.get<User>(`${this.basePath}/me`)
    }

    /**
     * Verify token validity
     */
    async verifyToken(token: string): Promise<User> {
        return apiClient.post<User>(`${this.basePath}/verify`, { token })
    }

    /**
     * Refresh access token
     */
    async refreshToken(): Promise<{ token: string }> {
        const response = await apiClient.post<{ token: string }>(
            `${this.basePath}/refresh`
        )

        if (response.token) {
            localStorage.setItem('token', response.token)
        }

        return response
    }

    /**
     * Request password reset
     */
    async requestPasswordReset(email: string): Promise<void> {
        await apiClient.post(`${this.basePath}/forgot-password`, { email })
    }

    /**
     * Reset password with token
     */
    async resetPassword(token: string, newPassword: string): Promise<void> {
        await apiClient.post(`${this.basePath}/reset-password`, {
            token,
            password: newPassword,
        })
    }
}

export const authService = new AuthService()
```

---

## 📤 File Upload Service

```typescript
// shared/services/uploadService.ts
import { apiClient } from '@/lib/api-client'

interface UploadProgress {
    loaded: number
    total: number
    percentage: number
}

class UploadService {
    /**
     * Upload single file
     */
    async uploadFile(
        file: File,
        onProgress?: (progress: UploadProgress) => void
    ): Promise<{ url: string; id: string }> {
        const formData = new FormData()
        formData.append('file', file)

        const response = await apiClient.post<{ url: string; id: string }>(
            '/api/upload',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent: any) => {
                    if (onProgress && progressEvent.total) {
                        const percentage = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        )
                        onProgress({
                            loaded: progressEvent.loaded,
                            total: progressEvent.total,
                            percentage,
                        })
                    }
                },
            }
        )

        return response
    }

    /**
     * Upload multiple files
     */
    async uploadFiles(
        files: File[],
        onProgress?: (progress: UploadProgress) => void
    ): Promise<Array<{ url: string; id: string }>> {
        const formData = new FormData()
        files.forEach((file) => formData.append('files', file))

        const response = await apiClient.post<Array<{ url: string; id: string }>>(
            '/api/upload/multiple',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent: any) => {
                    if (onProgress && progressEvent.total) {
                        const percentage = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        )
                        onProgress({
                            loaded: progressEvent.loaded,
                            total: progressEvent.total,
                            percentage,
                        })
                    }
                },
            }
        )

        return response
    }

    /**
     * Delete uploaded file
     */
    async deleteFile(fileId: string): Promise<void> {
        await apiClient.delete(`/api/upload/${fileId}`)
    }
}

export const uploadService = new UploadService()
```

---

## ⚠️ Error Handling

### Custom Error Classes

```typescript
// lib/errors.ts
export class ApiError extends Error {
    constructor(
        public status: number,
        public message: string,
        public data?: any
    ) {
        super(message)
        this.name = 'ApiError'
    }
}

export class NetworkError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'NetworkError'
    }
}

export class ValidationError extends Error {
    constructor(
        message: string,
        public errors: Record<string, string[]>
    ) {
        super(message)
        this.name = 'ValidationError'
    }
}
```

### Error Handling in Service

```typescript
class NoteService {
    async getNotes(params?: GetNotesParams): Promise<Note[]> {
        try {
            const response = await apiClient.get<ApiResponse<Note[]>>('/api/notes', {
                params,
            })
            return response.data || []
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    // Server responded with error
                    throw new ApiError(
                        error.response.status,
                        error.response.data?.message || 'Failed to fetch notes',
                        error.response.data
                    )
                } else if (error.request) {
                    // No response received
                    throw new NetworkError('No response from server')
                }
            }
            // Re-throw unknown errors
            throw error
        }
    }
}
```

### Error Handling in Components

```typescript
function NotesList() {
    const { data: notes, error } = useNotes()

    if (error) {
        if (error instanceof ApiError) {
            if (error.status === 404) {
                return <NotFound />
            }
            if (error.status === 403) {
                return <Forbidden />
            }
            return <ErrorAlert message={error.message} />
        }

        if (error instanceof NetworkError) {
            return <NetworkErrorAlert />
        }

        return <ErrorAlert message="An unexpected error occurred" />
    }

    return <NoteGrid notes={notes} />
}
```

---

## 🔄 Retry Logic

### Retry Configuration

```typescript
// lib/api-client.ts
import axiosRetry from 'axios-retry'

class ApiClient {
    constructor() {
        this.instance = axios.create({ /* ... */ })

        // Setup retry logic
        axiosRetry(this.instance, {
            retries: 3,
            retryDelay: axiosRetry.exponentialDelay,
            retryCondition: (error) => {
                // Retry on network errors or 5xx errors
                return (
                    axiosRetry.isNetworkOrIdempotentRequestError(error) ||
                    (error.response?.status ?? 0) >= 500
                )
            },
        })
    }
}
```

---

## 📊 Request Cancellation

### Cancel Requests on Unmount

```typescript
// With Axios
import { useEffect } from 'react'
import axios from 'axios'

function useNotes() {
    useEffect(() => {
        const cancelToken = axios.CancelToken.source()

        fetchNotes(cancelToken.token)

        return () => {
            cancelToken.cancel('Component unmounted')
        }
    }, [])
}

// With React Query (built-in)
function useNotes() {
    return useQuery({
        queryKey: ['notes'],
        queryFn: async ({ signal }) => {
            // React Query automatically cancels on unmount
            return apiClient.get('/api/notes', { signal })
        },
    })
}
```

---

## 🎯 Query Parameters

### Building Query Strings

```typescript
// Utility for clean query params
function buildQueryParams(params: Record<string, any>): string {
    const searchParams = new URLSearchParams()

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            if (Array.isArray(value)) {
                value.forEach((item) => searchParams.append(key, String(item)))
            } else {
                searchParams.append(key, String(value))
            }
        }
    })

    return searchParams.toString()
}

// Usage in service
class NoteService {
    async getNotes(params?: GetNotesParams): Promise<Note[]> {
        const queryString = params ? `?${buildQueryParams(params)}` : ''
        return apiClient.get<Note[]>(`/api/notes${queryString}`)
    }
}
```

---

## 🔐 API Security

### CSRF Token

```typescript
class ApiClient {
    private setupInterceptors() {
        this.instance.interceptors.request.use((config) => {
            // Add CSRF token
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute('content')

            if (csrfToken && config.headers) {
                config.headers['X-CSRF-Token'] = csrfToken
            }

            return config
        })
    }
}
```

### API Key

```typescript
class ApiClient {
    private setupInterceptors() {
        this.instance.interceptors.request.use((config) => {
            // Add API key
            const apiKey = import.meta.env.VITE_API_KEY

            if (apiKey && config.headers) {
                config.headers['X-API-Key'] = apiKey
            }

            return config
        })
    }
}
```

---

## 📝 API Service Checklist

When creating a new service:

- [ ] Class-based with descriptive name (`NoteService`)
- [ ] Private `basePath` property
- [ ] All methods are async and return Promises
- [ ] Proper TypeScript types for params and returns
- [ ] Error handling with try/catch
- [ ] Data transformation if needed (DTO → Domain)
- [ ] JSDoc comments for public methods
- [ ] Export singleton instance
- [ ] Unit tests for service methods

---

## 🎯 Best Practices

### 1. **Keep Services Thin**

```typescript
// ❌ BAD: Business logic in service
class NoteService {
    async getActiveNotes(): Promise<Note[]> {
        const notes = await this.getNotes()
        return notes
            .filter(n => !n.archived)
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    }
}

// ✅ GOOD: Service only handles API
class NoteService {
    async getNotes(params?: GetNotesParams): Promise<Note[]> {
        return apiClient.get('/api/notes', { params })
    }
}

// Business logic in component or hook
function useActiveNotes() {
    const { data: notes } = useNotes()

    return useMemo(() => {
        return notes
            ?.filter(n => !n.archived)
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    }, [notes])
}
```

### 2. **Use Descriptive Method Names**

```typescript
// ✅ GOOD: Clear intent
getNotes()
createNote()
updateNote()
deleteNote()
archiveNote()
bulkDeleteNotes()
```

### 3. **Handle Errors Consistently**

```typescript
// ✅ GOOD: Consistent error handling
class NoteService {
    async getNotes(): Promise<Note[]> {
        try {
            return await apiClient.get('/api/notes')
        } catch (error) {
            console.error('Failed to fetch notes:', error)
            throw error // Re-throw for upper layers
        }
    }
}
```

---

**Remember**: Services are the bridge between React and your API. Keep them focused on communication, not business logic.