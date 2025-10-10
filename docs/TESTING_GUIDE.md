# 🧪 TESTING GUIDE - Testing Strategies & Patterns

> **Philosophy**: Write tests that give you confidence, not just coverage.

---

## 🎯 Testing Strategy

### Testing Pyramid

```
        ┌─────────┐
        │   E2E   │  ← Few, slow, expensive
        └─────────┘
      ┌─────────────┐
      │ Integration │  ← Some, medium speed
      └─────────────┘
    ┌─────────────────┐
    │  Unit Tests     │  ← Many, fast, cheap
    └─────────────────┘
```

### What to Test

| Level | What | Tools | Example |
|-------|------|-------|---------|
| **Unit** | Pure functions, utilities | Vitest | `formatDate()` |
| **Component** | Component behavior | Testing Library | `<Button />` clicks |
| **Integration** | Features working together | Testing Library + MSW | Form submission flow |
| **E2E** | Critical user flows | Playwright/Cypress | Login → Create Note |

---

## 🛠️ Testing Setup

### Install Dependencies

```bash
# Testing framework
npm install -D vitest

# React testing utilities
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event

# Mock Service Worker (API mocking)
npm install -D msw

# Test coverage
npm install -D @vitest/coverage-v8
```

### Vitest Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setup.ts',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: [
                'node_modules/',
                'src/test/',
                '**/*.test.{ts,tsx}',
                '**/*.spec.{ts,tsx}',
            ],
        },
    },
})
```

### Test Setup File

```typescript
// src/test/setup.ts
import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Cleanup after each test
afterEach(() => {
    cleanup()
})

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
})

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    takeRecords() {
        return []
    }
    unobserve() {}
}
```

---

## 🧪 Unit Tests

### Testing Utilities

```typescript
// shared/utils/format.test.ts
import { describe, it, expect } from 'vitest'
import { formatDate, formatCurrency, truncateText } from './format'

describe('formatDate', () => {
    it('formats date correctly', () => {
        const date = new Date('2024-01-15T10:30:00Z')
        const result = formatDate(date)
        expect(result).toBe('Jan 15, 2024')
    })

    it('handles invalid dates', () => {
        const result = formatDate(new Date('invalid'))
        expect(result).toBe('Invalid Date')
    })
})

describe('formatCurrency', () => {
    it('formats USD correctly', () => {
        expect(formatCurrency(1234.56, 'USD')).toBe('$1,234.56')
    })

    it('formats EUR correctly', () => {
        expect(formatCurrency(1234.56, 'EUR')).toBe('€1,234.56')
    })

    it('handles zero', () => {
        expect(formatCurrency(0, 'USD')).toBe('$0.00')
    })

    it('handles negative numbers', () => {
        expect(formatCurrency(-100, 'USD')).toBe('-$100.00')
    })
})

describe('truncateText', () => {
    it('truncates long text', () => {
        const text = 'This is a very long text that needs truncation'
        expect(truncateText(text, 20)).toBe('This is a very long...')
    })

    it('does not truncate short text', () => {
        const text = 'Short text'
        expect(truncateText(text, 20)).toBe('Short text')
    })
})
```

### Testing Validators

```typescript
// shared/utils/validation.test.ts
import { describe, it, expect } from 'vitest'
import { validateEmail, validatePassword, validateRequired } from './validation'

describe('validateEmail', () => {
    it('validates correct email', () => {
        expect(validateEmail('user@example.com')).toBe(null)
    })

    it('rejects invalid email', () => {
        expect(validateEmail('invalid-email')).toBe('Invalid email address')
    })

    it('rejects empty email', () => {
        expect(validateEmail('')).toBe('Invalid email address')
    })
})

describe('validatePassword', () => {
    it('validates strong password', () => {
        expect(validatePassword('SecureP@ss123')).toBe(null)
    })

    it('rejects short password', () => {
        const result = validatePassword('weak')
        expect(result).toContain('at least 8 characters')
    })
})
```

---

## 🧩 Component Tests

### Testing Simple Components

```typescript
// shared/components/ui/Button/Button.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
    it('renders children', () => {
        render(<Button>Click me</Button>)
        expect(screen.getByText('Click me')).toBeInTheDocument()
    })

    it('calls onClick when clicked', async () => {
        const handleClick = vi.fn()
        const user = userEvent.setup()

        render(<Button onClick={handleClick}>Click me</Button>)

        await user.click(screen.getByText('Click me'))
        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('is disabled when disabled prop is true', () => {
        render(<Button disabled>Click me</Button>)
        expect(screen.getByText('Click me')).toBeDisabled()
    })

    it('shows loading state', () => {
        render(<Button loading>Click me</Button>)
        expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('applies correct variant styles', () => {
        const { rerender } = render(<Button variant="primary">Primary</Button>)
        expect(screen.getByText('Primary')).toHaveClass('variant-primary')

        rerender(<Button variant="secondary">Secondary</Button>)
        expect(screen.getByText('Secondary')).toHaveClass('variant-secondary')
    })
})
```

### Testing Components with State

```typescript
// features/notes/components/NoteCard/NoteCard.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NoteCard } from './NoteCard'

const mockNote = {
    noteId: 1,
    name: 'Test Note',
    description: 'Test description',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    isArchived: false,
    tags: ['test', 'sample'],
    createdBy: 'user@example.com',
}

describe('NoteCard', () => {
    it('renders note information', () => {
        render(<NoteCard note={mockNote} />)

        expect(screen.getByText('Test Note')).toBeInTheDocument()
        expect(screen.getByText('Test description')).toBeInTheDocument()
    })

    it('shows archived badge when archived', () => {
        render(<NoteCard note={{ ...mockNote, isArchived: true }} />)
        expect(screen.getByText('Archived')).toBeInTheDocument()
    })

    it('calls onEdit when edit button clicked', async () => {
        const handleEdit = vi.fn()
        const user = userEvent.setup()

        render(<NoteCard note={mockNote} onEdit={handleEdit} />)

        await user.click(screen.getByRole('button', { name: /edit/i }))
        expect(handleEdit).toHaveBeenCalledWith(mockNote)
    })

    it('renders tags', () => {
        render(<NoteCard note={mockNote} />)

        expect(screen.getByText('#test')).toBeInTheDocument()
        expect(screen.getByText('#sample')).toBeInTheDocument()
    })
})
```

---

## 🪝 Testing Hooks

### Testing Custom Hooks with React Query

```typescript
// features/notes/hooks/useNotes.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useNotes } from './useNotes'
import { noteService } from '../services/noteService'

// Mock the service
vi.mock('../services/noteService')

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry: false },
        },
    })

    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

describe('useNotes', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('fetches notes successfully', async () => {
        const mockNotes = [
            { noteId: 1, name: 'Note 1' },
            { noteId: 2, name: 'Note 2' },
        ]

        vi.mocked(noteService.getNotes).mockResolvedValue(mockNotes)

        const { result } = renderHook(() => useNotes(), {
            wrapper: createWrapper(),
        })

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false)
        })

        expect(result.current.data).toEqual(mockNotes)
        expect(result.current.error).toBe(null)
    })

    it('handles error', async () => {
        const error = new Error('Failed to fetch')
        vi.mocked(noteService.getNotes).mockRejectedValue(error)

        const { result } = renderHook(() => useNotes(), {
            wrapper: createWrapper(),
        })

        await waitFor(() => {
            expect(result.current.error).toBeTruthy()
        })

        expect(result.current.data).toBeUndefined()
    })
})
```

### Testing Mutations

```typescript
// features/notes/hooks/useCreateNote.test.ts
import { describe, it, expect, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useCreateNote } from './useCreateNote'
import { noteService } from '../services/noteService'

vi.mock('../services/noteService')

describe('useCreateNote', () => {
    it('creates note successfully', async () => {
        const newNote = { noteId: 1, name: 'New Note' }
        vi.mocked(noteService.createNote).mockResolvedValue(newNote)

        const { result } = renderHook(() => useCreateNote(), {
            wrapper: createWrapper(),
        })

        const createData = { name: 'New Note' }

        await result.current.mutateAsync(createData)

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true)
        })

        expect(noteService.createNote).toHaveBeenCalledWith(createData)
    })
})
```

---

## 🔗 Integration Tests

### Testing Form Submission Flow

```typescript
// features/notes/components/NoteForm/NoteForm.integration.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NoteForm } from './NoteForm'
import { noteService } from '../../services/noteService'

vi.mock('../../services/noteService')

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry: false },
        },
    })

    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

describe('NoteForm Integration', () => {
    it('submits form successfully', async () => {
        const mockNote = { noteId: 1, name: 'New Note', description: 'Description' }
        vi.mocked(noteService.createNote).mockResolvedValue(mockNote)

        const onSuccess = vi.fn()
        const user = userEvent.setup()

        render(<NoteForm onSuccess={onSuccess} />, {
            wrapper: createWrapper(),
        })

        // Fill form
        await user.type(screen.getByLabelText(/name/i), 'New Note')
        await user.type(screen.getByLabelText(/description/i), 'Description')

        // Submit
        await user.click(screen.getByRole('button', { name: /save/i }))

        // Wait for success
        await waitFor(() => {
            expect(onSuccess).toHaveBeenCalled()
        })

        expect(noteService.createNote).toHaveBeenCalledWith({
            name: 'New Note',
            description: 'Description',
        })
    })

    it('shows validation errors', async () => {
        const user = userEvent.setup()

        render(<NoteForm onSuccess={vi.fn()} />, {
            wrapper: createWrapper(),
        })

        // Submit without filling
        await user.click(screen.getByRole('button', { name: /save/i }))

        // Check for error message
        expect(await screen.findByText(/name is required/i)).toBeInTheDocument()
    })

    it('handles API errors', async () => {
        vi.mocked(noteService.createNote).mockRejectedValue(
            new Error('API Error')
        )

        const user = userEvent.setup()

        render(<NoteForm onSuccess={vi.fn()} />, {
            wrapper: createWrapper(),
        })

        // Fill and submit
        await user.type(screen.getByLabelText(/name/i), 'New Note')
        await user.click(screen.getByRole('button', { name: /save/i }))

        // Check for error message
        expect(await screen.findByText(/failed to create note/i)).toBeInTheDocument()
    })
})
```

---

## 🌐 API Mocking with MSW

### MSW Setup

```typescript
// src/test/mocks/handlers.ts
import { http, HttpResponse } from 'msw'

export const handlers = [
    // GET notes
    http.get('/api/notes', () => {
        return HttpResponse.json({
            data: [
                {
                    noteId: 1,
                    name: 'Test Note 1',
                    description: 'Description 1',
                    createdAt: '2024-01-15T10:00:00Z',
                    updatedAt: '2024-01-15T10:00:00Z',
                    isArchived: false,
                },
                {
                    noteId: 2,
                    name: 'Test Note 2',
                    description: 'Description 2',
                    createdAt: '2024-01-16T10:00:00Z',
                    updatedAt: '2024-01-16T10:00:00Z',
                    isArchived: false,
                },
            ],
            success: true,
        })
    }),

    // POST note
    http.post('/api/notes', async ({ request }) => {
        const body = await request.json()

        return HttpResponse.json({
            data: {
                noteId: 3,
                ...body,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                isArchived: false,
            },
            success: true,
        })
    }),

    // PUT note
    http.put('/api/notes/:id', async ({ params, request }) => {
        const body = await request.json()

        return HttpResponse.json({
            data: {
                noteId: Number(params.id),
                ...body,
                updatedAt: new Date().toISOString(),
            },
            success: true,
        })
    }),

    // DELETE note
    http.delete('/api/notes/:id', () => {
        return HttpResponse.json({
            success: true,
        })
    }),

    // Error scenario
    http.get('/api/notes/error', () => {
        return HttpResponse.json(
            {
                success: false,
                message: 'Internal server error',
            },
            { status: 500 }
        )
    }),
]
```

```typescript
// src/test/mocks/server.ts
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)
```

```typescript
// src/test/setup.ts (add to existing setup)
import { server } from './mocks/server'
import { beforeAll, afterEach, afterAll } from 'vitest'

// Start server before all tests
beforeAll(() => server.listen())

// Reset handlers after each test
afterEach(() => server.resetHandlers())

// Close server after all tests
afterAll(() => server.close())
```

---

## 🎭 Testing Patterns

### Pattern 1: Testing Loading States

```typescript
it('shows loading spinner', () => {
    render(<NoteList />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
})

it('hides loading spinner after data loads', async () => {
    render(<NoteList />)

    await waitFor(() => {
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    })
})
```

### Pattern 2: Testing Error States

```typescript
it('shows error message on failure', async () => {
    server.use(
        http.get('/api/notes', () => {
            return HttpResponse.json(
                { message: 'Error' },
                { status: 500 }
            )
        })
    )

    render(<NoteList />)

    expect(await screen.findByText(/failed to load/i)).toBeInTheDocument()
})
```

### Pattern 3: Testing Empty States

```typescript
it('shows empty state when no notes', async () => {
    server.use(
        http.get('/api/notes', () => {
            return HttpResponse.json({ data: [], success: true })
        })
    )

    render(<NoteList />)

    expect(await screen.findByText(/no notes found/i)).toBeInTheDocument()
})
```

### Pattern 4: Testing Conditional Rendering

```typescript
it('shows edit button only when user owns note', () => {
    const { rerender } = render(
        <NoteCard note={mockNote} currentUserId="user1" />
    )

    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument()

    rerender(<NoteCard note={mockNote} currentUserId="user2" />)

    expect(
        screen.queryByRole('button', { name: /edit/i })
    ).not.toBeInTheDocument()
})
```

### Pattern 5: Testing Async User Interactions

```typescript
it('deletes note when delete button clicked', async () => {
    const user = userEvent.setup()

    render(<NoteCard note={mockNote} />)

    await user.click(screen.getByRole('button', { name: /delete/i }))

    // Confirm dialog
    await user.click(screen.getByRole('button', { name: /confirm/i }))

    await waitFor(() => {
        expect(screen.queryByText(mockNote.name)).not.toBeInTheDocument()
    })
})
```

---

## 🎯 Test Helpers

### Custom Render with Providers

```typescript
// src/test/utils.tsx
import { render as rtlRender } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '@/lib/theme'

export function render(ui: React.ReactElement, options = {}) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry: false },
        },
    })

    function Wrapper({ children }: { children: React.ReactNode }) {
        return (
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    {children}
                </ThemeProvider>
            </QueryClientProvider>
        )
    }

    return rtlRender(ui, { wrapper: Wrapper, ...options })
}

// Re-export everything
export * from '@testing-library/react'
```

### Mock Data Factory

```typescript
// src/test/factories/noteFactory.ts
import type { Note } from '@/features/notes/types/note.types'

let id = 1

export function createMockNote(overrides?: Partial<Note>): Note {
    return {
        noteId: id++,
        name: 'Test Note',
        description: 'Test description',
        type: 'meeting',
        tags: ['test'],
        createdBy: 'user@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        isArchived: false,
        ...overrides,
    }
}

export function createMockNotes(count: number): Note[] {
    return Array.from({ length: count }, (_, i) =>
        createMockNote({ noteId: i + 1, name: `Note ${i + 1}` })
    )
}
```

---

## 🚫 Testing Anti-Patterns

### 1. **Testing Implementation Details**

```typescript
// ❌ BAD: Testing internal state
expect(component.state.count).toBe(5)

// ✅ GOOD: Testing user-visible behavior
expect(screen.getByText('Count: 5')).toBeInTheDocument()
```

### 2. **Too Many Assertions**

```typescript
// ❌ BAD: Testing everything in one test
it('form works', () => {
    // 50 lines of assertions
})

// ✅ GOOD: One behavior per test
it('shows validation error when name is empty', () => {
    // Test one thing
})

it('submits form with valid data', () => {
    // Test another thing
})
```

### 3. **Not Waiting for Async Operations**

```typescript
// ❌ BAD: Not waiting
it('loads data', () => {
    render(<NoteList />)
    expect(screen.getByText('Note 1')).toBeInTheDocument() // Fails!
})

// ✅ GOOD: Wait for data
it('loads data', async () => {
    render(<NoteList />)
    expect(await screen.findByText('Note 1')).toBeInTheDocument()
})
```

---

## 📝 Testing Checklist

- [ ] Test user-visible behavior, not implementation
- [ ] One assertion per test (generally)
- [ ] Use accessible queries (getByRole, getByLabelText)
- [ ] Wait for async operations
- [ ] Test error states
- [ ] Test loading states
- [ ] Test empty states
- [ ] Mock external dependencies
- [ ] Clean up after tests
- [ ] Tests are readable and maintainable

---

**Remember**: Tests should give you confidence to refactor. If they don't, they're testing the wrong things!