# 🔒 TYPE SAFETY - TypeScript Best Practices

> **Philosophy**: If it compiles, it works. Types are documentation.

---

## 🎯 Type Organization

### Type File Structure

```
src/
├── features/
│   └── notes/
│       └── types/
│           ├── note.types.ts      # Domain models
│           └── note.dto.ts        # API DTOs
│
└── shared/
    └── types/
        ├── common.types.ts        # Shared types
        ├── api.types.ts           # Generic API types
        └── utility.types.ts       # Utility types
```

---

## 📦 Domain Models

### Basic Domain Types

```typescript
// features/notes/types/note.types.ts

// Domain model (what we use in app)
export interface Note {
    noteId: number
    name: string
    description?: string
    type?: NoteType
    tags: string[]
    createdBy: string
    createdAt: Date
    updatedAt: Date
    isArchived: boolean
}

// Enums for fixed values
export enum NoteType {
    Meeting = 'meeting',
    Brainstorm = 'brainstorm',
    Research = 'research',
    Bug = 'bug',
}

// Or use union types (more flexible)
export type NoteType = 'meeting' | 'brainstorm' | 'research' | 'bug'

// Status types
export type NoteStatus = 'draft' | 'published' | 'archived'

// Query parameters
export interface GetNotesParams {
    page?: number
    pageSize?: number
    search?: string
    type?: NoteType
    isArchived?: boolean
    sortBy?: 'createdAt' | 'updatedAt' | 'name'
    sortOrder?: 'asc' | 'desc'
}
```

---

## 🔄 DTOs (Data Transfer Objects)

### API Request/Response Types

```typescript
// features/notes/types/note.dto.ts

// What backend sends (dates as strings)
export interface NoteDTO {
    noteId: number
    name: string
    description?: string
    type?: string
    tags: string[]
    createdBy: string
    createdAt: string // ISO string
    updatedAt: string // ISO string
    isArchived: boolean
}

// Create request
export interface CreateNoteDTO {
    name: string
    description?: string
    type?: NoteType
    tags?: string[]
}

// Update request (all fields optional except what you want to enforce)
export interface UpdateNoteDTO {
    name?: string
    description?: string
    type?: NoteType
    tags?: string[]
    isArchived?: boolean
}

// Bulk operations
export interface BulkDeleteDTO {
    ids: number[]
}

export interface BulkUpdateDTO {
    ids: number[]
    updates: Partial<UpdateNoteDTO>
}
```

---

## 🌐 API Types

### Generic API Patterns

```typescript
// shared/types/api.types.ts

// Generic API response wrapper
export interface ApiResponse<T> {
    data: T
    success: boolean
    message?: string
    errors?: ApiError[]
}

// API error
export interface ApiError {
    field?: string
    message: string
    code?: string
}

// Paginated response
export interface PaginatedResponse<T> {
    data: T[]
    pagination: {
        page: number
        pageSize: number
        totalItems: number
        totalPages: number
        hasNext: boolean
        hasPrevious: boolean
    }
}

// List response with metadata
export interface ListResponse<T> {
    items: T[]
    total: number
}
```

---

## 🛠️ Utility Types

### Custom Utility Types

```typescript
// shared/types/utility.types.ts

// Make all properties required
export type Required<T> = {
    [P in keyof T]-?: T[P]
}

// Make specific properties required
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

// Example usage
type NoteWithRequiredName = RequiredFields<Note, 'name' | 'description'>

// Make all properties optional except specified
export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>

// Example
type UpdateNoteRequest = PartialExcept<Note, 'noteId'>

// Nullable type
export type Nullable<T> = T | null

// Maybe type (undefined or T)
export type Maybe<T> = T | undefined

// Dictionary/Map type
export type Dictionary<T> = Record<string, T>

// ID type (can be number or string)
export type ID = string | number

// Timestamp type
export type Timestamp = string | Date

// Prettify - Show full type in IDE
export type Prettify<T> = {
    [K in keyof T]: T[K]
} & {}
```

---

## 🎯 Component Props Types

### Component Props Patterns

```typescript
// Basic component props
interface ButtonProps {
    children: React.ReactNode
    onClick?: () => void
    disabled?: boolean
    loading?: boolean
    variant?: 'primary' | 'secondary' | 'danger'
    size?: 'small' | 'medium' | 'large'
}

// Component with required children
interface CardProps {
    children: React.ReactNode // Required
    title?: string
    subtitle?: string
}

// Component with optional children
interface ContainerProps {
    children?: React.ReactNode
    className?: string
}

// Component with render prop
interface DataListProps<T> {
    data: T[]
    renderItem: (item: T) => React.ReactNode
    keyExtractor: (item: T) => string | number
}

// Component extending HTML element props
interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean
    variant?: 'primary' | 'secondary'
}

// Component with generic type
interface SelectProps<T> {
    options: T[]
    value: T
    onChange: (value: T) => void
    getLabel: (option: T) => string
    getValue: (option: T) => string | number
}
```

---

## 🪝 Hook Types

### Custom Hook Return Types

```typescript
// Query hook return type
interface UseNotesReturn {
    notes: Note[]
    isLoading: boolean
    error: Error | null
    refetch: () => void
}

export function useNotes(): UseNotesReturn {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['notes'],
        queryFn: noteService.getNotes,
    })

    return {
        notes: data || [],
        isLoading,
        error,
        refetch,
    }
}

// Mutation hook return type
interface UseCreateNoteReturn {
    createNote: (data: CreateNoteDTO) => Promise<Note>
    isCreating: boolean
    error: Error | null
}

export function useCreateNote(): UseCreateNoteReturn {
    const mutation = useMutation({
        mutationFn: noteService.createNote,
    })

    return {
        createNote: mutation.mutateAsync,
        isCreating: mutation.isPending,
        error: mutation.error,
    }
}

// Complex hook with multiple actions
interface UseNoteActionsReturn {
    createNote: (data: CreateNoteDTO) => Promise<Note>
    updateNote: (id: number, data: UpdateNoteDTO) => Promise<Note>
    deleteNote: (id: number) => Promise<void>
    archiveNote: (id: number) => Promise<Note>
    isLoading: boolean
}
```

---

## 🎨 Event Handler Types

### Typed Event Handlers

```typescript
// Mouse events
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.currentTarget)
}

const handleDivClick = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log(event.target)
}

// Form events
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
}

const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
}

const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(event.target.value)
}

const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value)
}

// Keyboard events
const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
        console.log('Enter pressed')
    }
}

// Focus events
const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    console.log('Input focused')
}

// Generic handler (avoid if possible)
const handleGenericEvent = (event: React.SyntheticEvent) => {
    console.log(event)
}
```

---

## 🔄 Type Transformations

### Useful Type Transformations

```typescript
// Pick specific properties
type NotePreview = Pick<Note, 'noteId' | 'name' | 'createdAt'>

// Omit specific properties
type NoteWithoutDates = Omit<Note, 'createdAt' | 'updatedAt'>

// Partial (all optional)
type PartialNote = Partial<Note>

// Required (all required)
type RequiredNote = Required<Note>

// Readonly
type ReadonlyNote = Readonly<Note>

// Record type
type NoteById = Record<number, Note>

// Extract union member
type NoteTypeValue = Extract<NoteType, 'meeting' | 'brainstorm'>

// Exclude union member
type NotBugType = Exclude<NoteType, 'bug'>

// NonNullable
type NonNullableNote = NonNullable<Note | null | undefined>

// ReturnType (get function return type)
type CreateNoteReturn = ReturnType<typeof noteService.createNote>

// Parameters (get function parameters)
type CreateNoteParams = Parameters<typeof noteService.createNote>

// Awaited (unwrap Promise)
type NoteData = Awaited<ReturnType<typeof noteService.getNotes>>
```

---

## 🎯 Advanced Patterns

### Discriminated Unions

```typescript
// Success or error result
type Result<T, E = Error> = 
    | { success: true; data: T }
    | { success: false; error: E }

// Usage
function parseNote(data: unknown): Result<Note> {
    try {
        // Parse logic
        const note = data as Note
        return { success: true, data: note }
    } catch (error) {
        return { success: false, error: error as Error }
    }
}

// Type guard
function isSuccess<T, E>(result: Result<T, E>): result is { success: true; data: T } {
    return result.success
}

// Usage with type narrowing
const result = parseNote(data)
if (isSuccess(result)) {
    console.log(result.data) // TypeScript knows it's data
} else {
    console.error(result.error) // TypeScript knows it's error
}
```

### Generic Components

```typescript
// Generic data table
interface DataTableProps<T> {
    data: T[]
    columns: Array<{
        key: keyof T
        header: string
        render?: (value: T[keyof T], item: T) => React.ReactNode
    }>
    onRowClick?: (item: T) => void
}

function DataTable<T extends { id: string | number }>({ 
    data, 
    columns, 
    onRowClick 
}: DataTableProps<T>) {
    return (
        <table>
            <thead>
                <tr>
                    {columns.map(col => (
                        <th key={String(col.key)}>{col.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map(item => (
                    <tr key={item.id} onClick={() => onRowClick?.(item)}>
                        {columns.map(col => (
                            <td key={String(col.key)}>
                                {col.render 
                                    ? col.render(item[col.key], item)
                                    : String(item[col.key])
                                }
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

// Usage
<DataTable<Note>
    data={notes}
    columns={[
        { key: 'name', header: 'Name' },
        { 
            key: 'createdAt', 
            header: 'Created',
            render: (date) => formatDate(date as Date)
        },
    ]}
    onRowClick={(note) => console.log(note)}
/>
```

### Type Guards

```typescript
// Type guard function
function isNote(value: unknown): value is Note {
    return (
        typeof value === 'object' &&
        value !== null &&
        'noteId' in value &&
        'name' in value
    )
}

// Usage
function processData(data: unknown) {
    if (isNote(data)) {
        console.log(data.noteId) // TypeScript knows it's a Note
    }
}

// Array type guard
function isNoteArray(value: unknown): value is Note[] {
    return Array.isArray(value) && value.every(isNote)
}

// Null check type guard
function isDefined<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined
}

// Usage with filter
const validNotes = notes.filter(isDefined)
```

---

## 🎨 Context Types

### Typed Context

```typescript
// Define context value type
interface AuthContextValue {
    user: User | null
    isAuthenticated: boolean
    login: (credentials: LoginRequest) => Promise<void>
    logout: () => void
}

// Create context with type
const AuthContext = createContext<AuthContextValue | null>(null)

// Typed hook with error checking
export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}

// Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)

    const value: AuthContextValue = {
        user,
        isAuthenticated: !!user,
        login: async (credentials) => {
            // Login logic
        },
        logout: () => {
            setUser(null)
        },
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
```

---

## 🔐 Type Safety Best Practices

### 1. **Never Use `any`**

```typescript
// ❌ BAD
function handleData(data: any) {
    return data.value
}

// ✅ GOOD: Use unknown and narrow
function handleData(data: unknown) {
    if (typeof data === 'object' && data !== null && 'value' in data) {
        return (data as { value: string }).value
    }
    throw new Error('Invalid data')
}

// ✅ BETTER: Use proper type
interface DataWithValue {
    value: string
}

function handleData(data: DataWithValue) {
    return data.value
}
```

---

### 2. **Type All Function Parameters and Returns**

```typescript
// ❌ BAD
function createNote(data) {
    return noteService.create(data)
}

// ✅ GOOD
function createNote(data: CreateNoteDTO): Promise<Note> {
    return noteService.create(data)
}

// ✅ GOOD: Async function
async function createNote(data: CreateNoteDTO): Promise<Note> {
    const note = await noteService.create(data)
    return note
}
```

---

### 3. **Use Const Assertions**

```typescript
// ❌ BAD: Type is string[]
const noteTypes = ['meeting', 'brainstorm', 'research']

// ✅ GOOD: Type is readonly ['meeting', 'brainstorm', 'research']
const noteTypes = ['meeting', 'brainstorm', 'research'] as const

// Can now use as type
type NoteType = typeof noteTypes[number] // 'meeting' | 'brainstorm' | 'research'
```

---

### 4. **Use Type Inference Where Possible**

```typescript
// ❌ BAD: Unnecessary type annotation
const count: number = 5
const name: string = 'John'

// ✅ GOOD: Let TypeScript infer
const count = 5
const name = 'John'

// ❌ BAD: Unnecessary return type when obvious
function add(a: number, b: number): number {
    return a + b
}

// ✅ GOOD: Return type inferred
function add(a: number, b: number) {
    return a + b
}

// ✅ GOOD: Add return type for exported functions
export function add(a: number, b: number): number {
    return a + b
}
```

---

### 5. **Prefer Interfaces for Objects**

```typescript
// ✅ GOOD: Interface for object shape
interface User {
    id: number
    name: string
    email: string
}

// ✅ GOOD: Type for unions/primitives
type Status = 'active' | 'inactive'
type ID = string | number

// ✅ GOOD: Interface can be extended
interface AdminUser extends User {
    permissions: string[]
}
```

---

### 6. **Use Branded Types for IDs**

```typescript
// Create branded types to prevent mixing IDs
type NoteId = number & { readonly brand: unique symbol }
type UserId = number & { readonly brand: unique symbol }

// Helper to create branded types
function createNoteId(id: number): NoteId {
    return id as NoteId
}

function createUserId(id: number): UserId {
    return id as UserId
}

// Now you can't accidentally mix them
const noteId = createNoteId(1)
const userId = createUserId(1)

function getNote(id: NoteId) { /* ... */ }

getNote(noteId) // ✅ OK
getNote(userId) // ❌ Type error!
```

---

## 📝 Type Documentation

### JSDoc with TypeScript

```typescript
/**
 * Creates a new note
 * @param data - Note creation data
 * @returns Promise resolving to created note
 * @throws {ApiError} When API request fails
 * @example
 * ```ts
 * const note = await createNote({
 *   name: 'My Note',
 *   description: 'Note description'
 * })
 * ```
 */
async function createNote(data: CreateNoteDTO): Promise<Note> {
    return noteService.create(data)
}
```

---

## 🚫 Anti-Patterns

### 1. **Type Assertions Without Checks**

```typescript
// ❌ BAD: Unsafe assertion
const note = data as Note

// ✅ GOOD: Use type guard
if (isNote(data)) {
    const note = data // Type is narrowed to Note
}
```

---

### 2. **Optional Chaining Overuse**

```typescript
// ❌ BAD: Too defensive
const name = user?.profile?.name?.firstName?.value

// ✅ GOOD: Proper types
interface User {
    profile: {
        name: string
    }
}

const name = user.profile.name
```

---

### 3. **Using `{}` Type**

```typescript
// ❌ BAD: Too permissive
function process(data: {}) {
    // data can be anything except null/undefined
}

// ✅ GOOD: Use proper type
function process(data: Record<string, unknown>) {
    // Clear intent
}

// ✅ BETTER: Define exact type
interface ProcessData {
    id: number
    name: string
}

function process(data: ProcessData) {
    // Type safe
}
```

---

## 📝 Type Safety Checklist

- [ ] No `any` types
- [ ] All functions have return types
- [ ] All parameters are typed
- [ ] Event handlers properly typed
- [ ] Props interfaces defined
- [ ] API responses typed
- [ ] Use type guards for unknown data
- [ ] Use const assertions where appropriate
- [ ] Prefer interfaces for objects
- [ ] Document complex types with JSDoc

---

**Remember**: Good types make your code self-documenting and catch bugs at compile time!