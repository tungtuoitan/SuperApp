# ⚠️ ERROR HANDLING - Complete Error Strategy

> **Philosophy**: Errors will happen. Handle them gracefully, inform users clearly, log for debugging.

---

## 🎯 Error Handling Strategy

### Error Handling Layers

```
┌─────────────────────────────────────────────────────┐
│  UI Layer - User-Friendly Messages                  │
│  - Error Boundaries                                 │
│  - Toast Notifications                              │
│  - Inline Error Messages                            │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  Component Layer - Error Display Logic              │
│  - Conditional Rendering                            │
│  - Fallback UI                                      │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  Hook Layer - Error State Management                │
│  - React Query Error Handling                       │
│  - Custom Error Hooks                               │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  Service Layer - Error Transformation               │
│  - API Error Parsing                                │
│  - Error Type Classification                        │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  API Client Layer - HTTP Error Detection            │
│  - Status Code Handling                             │
│  - Network Error Detection                          │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  Logging/Monitoring - Error Tracking                │
│  - Sentry, LogRocket, etc.                          │
│  - Console Logging (Development)                    │
└─────────────────────────────────────────────────────┘
```

---

## 🔤 Error Types & Classification

### Custom Error Classes

```typescript
// shared/errors/AppError.ts

// Base error class
export class AppError extends Error {
    constructor(
        public message: string,
        public code?: string,
        public statusCode?: number,
        public details?: unknown
    ) {
        super(message)
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor)
    }

    toJSON() {
        return {
            name: this.name,
            message: this.message,
            code: this.code,
            statusCode: this.statusCode,
            details: this.details,
        }
    }
}

// Network errors
export class NetworkError extends AppError {
    constructor(message = 'Network error occurred') {
        super(message, 'NETWORK_ERROR', 0)
    }
}

// API errors
export class ApiError extends AppError {
    constructor(
        statusCode: number,
        message: string,
        code?: string,
        details?: unknown
    ) {
        super(message, code, statusCode, details)
    }

    static fromResponse(status: number, data: any): ApiError {
        const message = data?.message || 'An error occurred'
        const code = data?.code || `HTTP_${status}`
        return new ApiError(status, message, code, data)
    }
}

// Authentication errors
export class AuthenticationError extends AppError {
    constructor(message = 'Authentication required') {
        super(message, 'AUTH_ERROR', 401)
    }
}

// Authorization errors
export class AuthorizationError extends AppError {
    constructor(message = 'You do not have permission to perform this action') {
        super(message, 'PERMISSION_DENIED', 403)
    }
}

// Validation errors
export class ValidationError extends AppError {
    constructor(
        message: string,
        public errors: Record<string, string[]>
    ) {
        super(message, 'VALIDATION_ERROR', 400, errors)
    }
}

// Not found errors
export class NotFoundError extends AppError {
    constructor(resource = 'Resource') {
        super(`${resource} not found`, 'NOT_FOUND', 404)
    }
}

// Timeout errors
export class TimeoutError extends AppError {
    constructor(message = 'Request timed out') {
        super(message, 'TIMEOUT', 408)
    }
}

// Server errors
export class ServerError extends AppError {
    constructor(message = 'Internal server error') {
        super(message, 'SERVER_ERROR', 500)
    }
}

// Rate limit errors
export class RateLimitError extends AppError {
    constructor(message = 'Too many requests. Please try again later.') {
        super(message, 'RATE_LIMIT', 429)
    }
}
```

---

## 🌐 API Client Error Handling

### Comprehensive Error Handling in API Client

```typescript
// lib/api-client.ts
import axios, { AxiosError, AxiosInstance } from 'axios'
import {
    ApiError,
    NetworkError,
    AuthenticationError,
    AuthorizationError,
    TimeoutError,
    RateLimitError,
    ServerError,
} from '@/shared/errors/AppError'

class ApiClient {
    private instance: AxiosInstance

    constructor() {
        this.instance = axios.create({
            baseURL: import.meta.env.VITE_API_URL,
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
            (config) => {
                const token = localStorage.getItem('token')
                if (token && config.headers) {
                    config.headers.Authorization = `Bearer ${token}`
                }
                return config
            },
            (error) => {
                return Promise.reject(this.handleError(error))
            }
        )

        // Response interceptor
        this.instance.interceptors.response.use(
            (response) => response,
            (error) => {
                return Promise.reject(this.handleError(error))
            }
        )
    }

    private handleError(error: unknown): AppError {
        // Axios error
        if (axios.isAxiosError(error)) {
            return this.handleAxiosError(error)
        }

        // Network error (no response)
        if (error instanceof Error && error.message === 'Network Error') {
            return new NetworkError('Unable to connect to the server')
        }

        // Generic error
        if (error instanceof Error) {
            return new AppError(error.message)
        }

        // Unknown error
        return new AppError('An unexpected error occurred')
    }

    private handleAxiosError(error: AxiosError): AppError {
        // No response (network error)
        if (!error.response) {
            if (error.code === 'ECONNABORTED') {
                return new TimeoutError()
            }
            return new NetworkError()
        }

        const { status, data } = error.response

        // Handle specific status codes
        switch (status) {
            case 400:
                return ApiError.fromResponse(status, data)

            case 401:
                // Clear auth and redirect
                localStorage.removeItem('token')
                window.location.href = '/login'
                return new AuthenticationError()

            case 403:
                return new AuthorizationError()

            case 404:
                return ApiError.fromResponse(status, data)

            case 408:
                return new TimeoutError()

            case 429:
                return new RateLimitError()

            case 500:
            case 502:
            case 503:
            case 504:
                return new ServerError(
                    data?.message || 'Server error. Please try again later.'
                )

            default:
                return ApiError.fromResponse(status, data)
        }
    }

    async get<T>(url: string, config?: any): Promise<T> {
        try {
            const response = await this.instance.get<T>(url, config)
            return response.data
        } catch (error) {
            throw this.handleError(error)
        }
    }

    async post<T>(url: string, data?: any, config?: any): Promise<T> {
        try {
            const response = await this.instance.post<T>(url, data, config)
            return response.data
        } catch (error) {
            throw this.handleError(error)
        }
    }

    async put<T>(url: string, data?: any, config?: any): Promise<T> {
        try {
            const response = await this.instance.put<T>(url, data, config)
            return response.data
        } catch (error) {
            throw this.handleError(error)
        }
    }

    async delete<T>(url: string, config?: any): Promise<T> {
        try {
            const response = await this.instance.delete<T>(url, config)
            return response.data
        } catch (error) {
            throw this.handleError(error)
        }
    }
}

export const apiClient = new ApiClient()
```

---

## 🪝 React Query Error Handling

### Global Error Handling with React Query

```typescript
// lib/react-query.ts
import { QueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { AppError, AuthenticationError } from '@/shared/errors/AppError'

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: (failureCount, error) => {
                // Don't retry on auth errors
                if (error instanceof AuthenticationError) {
                    return false
                }
                // Retry up to 3 times for other errors
                return failureCount < 3
            },
            staleTime: 5 * 60 * 1000,
            onError: (error) => {
                handleQueryError(error)
            },
        },
        mutations: {
            onError: (error) => {
                handleMutationError(error)
            },
        },
    },
})

function handleQueryError(error: unknown) {
    if (error instanceof AppError) {
        // Don't show toast for auth errors (already redirected)
        if (!(error instanceof AuthenticationError)) {
            toast.error(error.message)
        }
        
        // Log error for debugging
        console.error('Query error:', error.toJSON())
    } else {
        toast.error('Failed to load data')
        console.error('Query error:', error)
    }
}

function handleMutationError(error: unknown) {
    if (error instanceof AppError) {
        toast.error(error.message)
        console.error('Mutation error:', error.toJSON())
    } else {
        toast.error('Operation failed')
        console.error('Mutation error:', error)
    }
}
```

---

## 🎨 UI Error Components

### Error Alert Component

```typescript
// shared/components/feedback/ErrorAlert.tsx
import { Alert, AlertTitle, Button, Box } from '@mui/material'
import { AppError } from '@/shared/errors/AppError'

interface ErrorAlertProps {
    error: Error | AppError | null
    onRetry?: () => void
    showDetails?: boolean
}

export function ErrorAlert({ error, onRetry, showDetails = false }: ErrorAlertProps) {
    if (!error) return null

    const isAppError = error instanceof AppError
    const title = isAppError ? getErrorTitle(error) : 'Error'
    const message = error.message

    return (
        <Alert
            severity="error"
            sx={{ marginBottom: '16px' }}
            action={
                onRetry && (
                    <Button color="inherit" size="small" onClick={onRetry}>
                        Retry
                    </Button>
                )
            }
        >
            <AlertTitle>{title}</AlertTitle>
            {message}
            
            {showDetails && isAppError && error.code && (
                <Box sx={{ marginTop: '8px', fontSize: '0.875rem', opacity: 0.8 }}>
                    Error Code: {error.code}
                </Box>
            )}
        </Alert>
    )
}

function getErrorTitle(error: AppError): string {
    if (error.statusCode === 404) return 'Not Found'
    if (error.statusCode === 403) return 'Access Denied'
    if (error.statusCode === 401) return 'Authentication Required'
    if (error.statusCode && error.statusCode >= 500) return 'Server Error'
    return 'Error'
}
```

### Error Boundary Component

```typescript
// shared/components/feedback/ErrorBoundary.tsx
import React, { Component, ReactNode } from 'react'
import { Box, Typography, Button } from '@mui/material'

interface Props {
    children: ReactNode
    fallback?: ReactNode
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface State {
    hasError: boolean
    error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            hasError: false,
            error: null,
        }
    }

    static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            error,
        }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Log error to monitoring service
        console.error('Error caught by boundary:', error, errorInfo)
        
        // Call optional error callback
        this.props.onError?.(error, errorInfo)

        // TODO: Send to error tracking service (Sentry, etc.)
        // logErrorToService(error, errorInfo)
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null })
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback
            }

            return (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '400px',
                        padding: '24px',
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h4" color="error" gutterBottom>
                        Oops! Something went wrong
                    </Typography>
                    
                    <Typography variant="body1" color="text.secondary" sx={{ mb: '24px' }}>
                        We're sorry for the inconvenience. Please try refreshing the page.
                    </Typography>

                    {import.meta.env.DEV && this.state.error && (
                        <Box
                            sx={{
                                padding: '16px',
                                backgroundColor: 'grey.100',
                                borderRadius: '4px',
                                marginBottom: '24px',
                                maxWidth: '600px',
                                textAlign: 'left',
                                overflow: 'auto',
                            }}
                        >
                            <Typography variant="caption" component="pre">
                                {this.state.error.message}
                                {'\n\n'}
                                {this.state.error.stack}
                            </Typography>
                        </Box>
                    )}

                    <Box sx={{ display: 'flex', gap: '16px' }}>
                        <Button variant="outlined" onClick={this.handleReset}>
                            Try Again
                        </Button>
                        <Button variant="contained" onClick={() => window.location.href = '/'}>
                            Go Home
                        </Button>
                    </Box>
                </Box>
            )
        }

        return this.props.children
    }
}
```

---

## 📝 Form Error Handling

### React Hook Form with Validation

```typescript
// features/notes/components/NoteForm.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ValidationError } from '@/shared/errors/AppError'

const noteSchema = z.object({
    name: z.string().min(1, 'Name is required').max(200, 'Name is too long'),
    description: z.string().max(1000, 'Description is too long').optional(),
})

type NoteFormData = z.infer<typeof noteSchema>

export function NoteForm() {
    const createNote = useCreateNote()
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<NoteFormData>({
        resolver: zodResolver(noteSchema),
    })

    const onSubmit = async (data: NoteFormData) => {
        try {
            await createNote.mutateAsync(data)
            toast.success('Note created successfully!')
        } catch (error) {
            // Handle validation errors from backend
            if (error instanceof ValidationError) {
                Object.entries(error.errors).forEach(([field, messages]) => {
                    setError(field as keyof NoteFormData, {
                        type: 'manual',
                        message: messages[0],
                    })
                })
            } else if (error instanceof AppError) {
                toast.error(error.message)
            } else {
                toast.error('Failed to create note')
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                {...register('name')}
                label="Name"
                error={!!errors.name}
                helperText={errors.name?.message}
                fullWidth
            />

            <TextField
                {...register('description')}
                label="Description"
                error={!!errors.description}
                helperText={errors.description?.message}
                multiline
                rows={4}
                fullWidth
            />

            <Button type="submit" disabled={createNote.isPending}>
                {createNote.isPending ? 'Creating...' : 'Create Note'}
            </Button>
        </form>
    )
}
```

---

## 🎯 Component-Level Error Handling

### Pattern 1: Error State in Component

```typescript
function NotesList() {
    const { data: notes, isLoading, error, refetch } = useNotes()

    // Loading state
    if (isLoading) {
        return <Spinner />
    }

    // Error state with retry
    if (error) {
        return (
            <ErrorAlert
                error={error as Error}
                onRetry={refetch}
            />
        )
    }

    // Empty state
    if (!notes || notes.length === 0) {
        return <EmptyState />
    }

    // Success state
    return <NoteGrid notes={notes} />
}
```

### Pattern 2: Inline Error Messages

```typescript
function NoteCard({ note }: { note: Note }) {
    const deleteNote = useDeleteNote()

    const handleDelete = async () => {
        try {
            await deleteNote.mutateAsync(note.noteId)
            toast.success('Note deleted')
        } catch (error) {
            // Show inline error
            if (error instanceof AuthorizationError) {
                toast.error('You do not have permission to delete this note')
            } else {
                toast.error('Failed to delete note')
            }
        }
    }

    return (
        <Card>
            <Typography>{note.name}</Typography>
            <Button onClick={handleDelete} disabled={deleteNote.isPending}>
                Delete
            </Button>
        </Card>
    )
}
```

---

## 📊 Error Logging & Monitoring

### Sentry Integration

```typescript
// lib/monitoring.ts
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'

export function initMonitoring() {
    if (import.meta.env.PROD) {
        Sentry.init({
            dsn: import.meta.env.VITE_SENTRY_DSN,
            integrations: [new BrowserTracing()],
            tracesSampleRate: 1.0,
            environment: import.meta.env.VITE_ENVIRONMENT,
        })
    }
}

export function logError(error: Error, context?: Record<string, any>) {
    if (import.meta.env.PROD) {
        Sentry.captureException(error, { extra: context })
    } else {
        console.error('Error:', error, context)
    }
}

// Usage in error boundary
componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logError(error, {
        componentStack: errorInfo.componentStack,
        ...errorInfo,
    })
}
```

---

## 🎨 User-Friendly Error Messages

### Error Message Dictionary

```typescript
// shared/utils/errorMessages.ts

export const ERROR_MESSAGES = {
    // Network errors
    NETWORK_ERROR: 'Unable to connect. Please check your internet connection.',
    TIMEOUT: 'Request took too long. Please try again.',

    // Authentication
    AUTH_REQUIRED: 'Please sign in to continue.',
    AUTH_INVALID: 'Invalid username or password.',
    AUTH_EXPIRED: 'Your session has expired. Please sign in again.',

    // Authorization
    PERMISSION_DENIED: 'You do not have permission to perform this action.',

    // Not found
    NOT_FOUND: 'The requested resource was not found.',
    NOTE_NOT_FOUND: 'Note not found.',

    // Validation
    VALIDATION_ERROR: 'Please check your input and try again.',
    REQUIRED_FIELD: 'This field is required.',

    // Server errors
    SERVER_ERROR: 'Something went wrong on our end. Please try again later.',

    // Rate limiting
    RATE_LIMIT: 'Too many requests. Please wait a moment and try again.',

    // Generic
    UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
} as const

export function getUserFriendlyMessage(error: AppError): string {
    if (error.code && error.code in ERROR_MESSAGES) {
        return ERROR_MESSAGES[error.code as keyof typeof ERROR_MESSAGES]
    }

    if (error.statusCode === 404) return ERROR_MESSAGES.NOT_FOUND
    if (error.statusCode === 403) return ERROR_MESSAGES.PERMISSION_DENIED
    if (error.statusCode === 401) return ERROR_MESSAGES.AUTH_REQUIRED
    if (error.statusCode && error.statusCode >= 500) return ERROR_MESSAGES.SERVER_ERROR

    return error.message || ERROR_MESSAGES.UNKNOWN_ERROR
}
```

---

## 📝 Error Handling Checklist

### For Every API Call

- [ ] Wrapped in try/catch or handled by React Query
- [ ] Error typed correctly (not `any`)
- [ ] User-friendly error message displayed
- [ ] Error logged for debugging
- [ ] Retry logic if appropriate
- [ ] Loading state shown during request
- [ ] Success feedback shown

### For Every Form

- [ ] Client-side validation (Zod/Yup)
- [ ] Server-side validation errors handled
- [ ] Field-level error messages
- [ ] Form-level error messages
- [ ] Disabled submit during submission
- [ ] Success feedback

### For Every Component

- [ ] Error boundary wrapping risky code
- [ ] Null/undefined checks
- [ ] Fallback UI for error states
- [ ] Retry mechanism if applicable

---

**Remember**: Good error handling is invisible when things work, and helpful when they don't!