# 🎨 COMMON PATTERNS - Reusable Solutions

> **Philosophy**: Don't reinvent the wheel. Learn patterns, apply them consistently.

---

## 📚 Table of Contents

1. [Data Fetching Patterns](#data-fetching-patterns)
2. [Form Patterns](#form-patterns)
3. [List Patterns](#list-patterns)
4. [Dialog Patterns](#dialog-patterns)
5. [Authentication Patterns](#authentication-patterns)
6. [Search & Filter Patterns](#search--filter-patterns)
7. [Error Handling Patterns](#error-handling-patterns)
8. [Loading Patterns](#loading-patterns)
9. [Pagination Patterns](#pagination-patterns)
10. [File Upload Patterns](#file-upload-patterns)

---

## 🔄 Data Fetching Patterns

### Pattern 1: Simple List Fetching

```typescript
// Component
function NotesList() {
    const { data: notes, isLoading, error } = useNotes()

    if (isLoading) return <Spinner />
    if (error) return <ErrorAlert error={error} />
    if (!notes || notes.length === 0) return <EmptyState />

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {notes.map(note => (
                <NoteCard key={note.noteId} note={note} />
            ))}
        </Box>
    )
}
```

### Pattern 2: Detail View with Dependencies

```typescript
// Fetch note and its related data
function NoteDetail({ noteId }: { noteId: number }) {
    // Main data
    const { data: note, isLoading: noteLoading } = useNote(noteId)

    // Dependent data (only fetch when note exists)
    const { data: comments } = useNoteComments(noteId, {
        enabled: !!note,
    })

    const { data: attachments } = useNoteAttachments(noteId, {
        enabled: !!note,
    })

    if (noteLoading) return <Spinner />
    if (!note) return <NotFound />

    return (
        <Box>
            <NoteHeader note={note} />
            <NoteContent note={note} />
            <NoteComments comments={comments} />
            <NoteAttachments attachments={attachments} />
        </Box>
    )
}
```

### Pattern 3: Prefetching on Hover

```typescript
function NoteList({ notes }: { notes: Note[] }) {
    const queryClient = useQueryClient()

    const handleMouseEnter = (noteId: number) => {
        // Prefetch note details
        queryClient.prefetchQuery({
            queryKey: ['notes', noteId],
            queryFn: () => noteService.getNoteById(noteId),
        })
    }

    return (
        <div>
            {notes.map(note => (
                <div
                    key={note.noteId}
                    onMouseEnter={() => handleMouseEnter(note.noteId)}
                >
                    <NoteCard note={note} />
                </div>
            ))}
        </div>
    )
}
```

---

## 📝 Form Patterns

### Pattern 1: Controlled Form with React Hook Form

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const noteSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional(),
    type: z.enum(['meeting', 'brainstorm', 'research']).optional(),
})

type NoteFormData = z.infer<typeof noteSchema>

function NoteForm({ onSubmit }: { onSubmit: (data: NoteFormData) => void }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<NoteFormData>({
        resolver: zodResolver(noteSchema),
    })

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
                multiline
                rows={4}
                fullWidth
            />

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
        </form>
    )
}
```

### Pattern 2: Multi-Step Form

```typescript
function MultiStepForm() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        step1: {},
        step2: {},
        step3: {},
    })

    const handleStep1Submit = (data: Step1Data) => {
        setFormData(prev => ({ ...prev, step1: data }))
        setStep(2)
    }

    const handleStep2Submit = (data: Step2Data) => {
        setFormData(prev => ({ ...prev, step2: data }))
        setStep(3)
    }

    const handleFinalSubmit = async (data: Step3Data) => {
        const completeData = {
            ...formData.step1,
            ...formData.step2,
            ...data,
        }
        await createNote(completeData)
    }

    return (
        <Box>
            <Stepper activeStep={step - 1}>
                <Step>Basic Info</Step>
                <Step>Details</Step>
                <Step>Review</Step>
            </Stepper>

            {step === 1 && <Step1Form onNext={handleStep1Submit} />}
            {step === 2 && (
                <Step2Form
                    onNext={handleStep2Submit}
                    onBack={() => setStep(1)}
                />
            )}
            {step === 3 && (
                <Step3Form
                    data={formData}
                    onSubmit={handleFinalSubmit}
                    onBack={() => setStep(2)}
                />
            )}
        </Box>
    )
}
```

### Pattern 3: Form with Optimistic Update

```typescript
function EditNoteForm({ note }: { note: Note }) {
    const updateNote = useUpdateNote()
    const queryClient = useQueryClient()

    const handleSubmit = async (data: UpdateNoteDTO) => {
        // Optimistic update
        queryClient.setQueryData(['notes', note.noteId], {
            ...note,
            ...data,
        })

        try {
            await updateNote.mutateAsync({ id: note.noteId, data })
            toast.success('Note updated!')
        } catch (error) {
            // Rollback on error
            queryClient.setQueryData(['notes', note.noteId], note)
            toast.error('Failed to update note')
        }
    }

    return <NoteForm initialData={note} onSubmit={handleSubmit} />
}
```

---

## 📋 List Patterns

### Pattern 1: Virtualized List

```typescript
import { FixedSizeList } from 'react-window'

function VirtualizedNoteList({ notes }: { notes: Note[] }) {
    const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
        <div style={style}>
            <NoteCard note={notes[index]} />
        </div>
    )

    return (
        <FixedSizeList
            height={600}
            itemCount={notes.length}
            itemSize={100}
            width="100%"
        >
            {Row}
        </FixedSizeList>
    )
}
```

### Pattern 2: Infinite Scroll

```typescript
function useInfiniteNotes() {
    return useInfiniteQuery({
        queryKey: ['notes', 'infinite'],
        queryFn: ({ pageParam = 1 }) =>
            noteService.getNotes({ page: pageParam, pageSize: 20 }),
        getNextPageParam: (lastPage, pages) => {
            return lastPage.hasMore ? pages.length + 1 : undefined
        },
        initialPageParam: 1,
    })
}

function InfiniteNoteList() {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteNotes()
    const observerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage()
                }
            },
            { threshold: 1 }
        )

        if (observerRef.current) {
            observer.observe(observerRef.current)
        }

        return () => observer.disconnect()
    }, [fetchNextPage, hasNextPage])

    return (
        <Box>
            {data?.pages.map((page) =>
                page.data.map((note) => <NoteCard key={note.noteId} note={note} />)
            )}
            <div ref={observerRef} />
            {isFetchingNextPage && <Spinner />}
        </Box>
    )
}
```

### Pattern 3: Sortable/Filterable List

```typescript
function NotesListWithFilters() {
    const [sortBy, setSortBy] = useState<'name' | 'date'>('date')
    const [filterType, setFilterType] = useState<NoteType | 'all'>('all')

    const { data: notes } = useNotes({
        sortBy,
        type: filterType === 'all' ? undefined : filterType,
    })

    return (
        <Box>
            <Box sx={{ display: 'flex', gap: '16px', mb: '16px' }}>
                <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="date">Date</MenuItem>
                </Select>

                <Select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                    <MenuItem value="all">All Types</MenuItem>
                    <MenuItem value="meeting">Meeting</MenuItem>
                    <MenuItem value="brainstorm">Brainstorm</MenuItem>
                </Select>
            </Box>

            <NoteGrid notes={notes} />
        </Box>
    )
}
```

---

## 💬 Dialog Patterns

### Pattern 1: Controlled Dialog

```typescript
function NoteDialogExample() {
    const [open, setOpen] = useState(false)
    const [selectedNote, setSelectedNote] = useState<Note | null>(null)

    const handleOpen = (note: Note) => {
        setSelectedNote(note)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setTimeout(() => setSelectedNote(null), 200) // After animation
    }

    return (
        <>
            <Button onClick={() => handleOpen(someNote)}>Open Dialog</Button>

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>Edit Note</DialogTitle>
                <DialogContent>
                    {selectedNote && <NoteForm note={selectedNote} />}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained">Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
```

### Pattern 2: Confirmation Dialog

```typescript
function useConfirmDialog() {
    const [open, setOpen] = useState(false)
    const [config, setConfig] = useState<{
        title: string
        message: string
        onConfirm: () => void
    }>()

    const confirm = (
        title: string,
        message: string,
        onConfirm: () => void
    ) => {
        setConfig({ title, message, onConfirm })
        setOpen(true)
    }

    const handleConfirm = () => {
        config?.onConfirm()
        setOpen(false)
    }

    const dialog = (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>{config?.title}</DialogTitle>
            <DialogContent>
                <Typography>{config?.message}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleConfirm} color="error" variant="contained">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )

    return { confirm, dialog }
}

// Usage
function DeleteButton({ noteId }: { noteId: number }) {
    const { confirm, dialog } = useConfirmDialog()
    const deleteNote = useDeleteNote()

    const handleDelete = () => {
        confirm(
            'Delete Note',
            'Are you sure you want to delete this note?',
            async () => {
                await deleteNote.mutateAsync(noteId)
            }
        )
    }

    return (
        <>
            <Button onClick={handleDelete} color="error">
                Delete
            </Button>
            {dialog}
        </>
    )
}
```

---

## 🔐 Authentication Patterns

### Pattern 1: Protected Route

```typescript
// components/ProtectedRoute.tsx
function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) {
        return <FullPageSpinner />
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return <>{children}</>
}

// Usage in routes
<Route
    path="/notes"
    element={
        <ProtectedRoute>
            <NotesPage />
        </ProtectedRoute>
    }
/>
```

### Pattern 2: Role-Based Access

```typescript
function RequireRole({ 
    roles, 
    children 
}: { 
    roles: string[]
    children: React.ReactNode 
}) {
    const { user } = useAuth()

    if (!user || !roles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />
    }

    return <>{children}</>
}

// Usage
<Route
    path="/admin"
    element={
        <RequireRole roles={['admin']}>
            <AdminPage />
        </RequireRole>
    }
/>
```

### Pattern 3: Persistent Login

```typescript
function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Check for stored token on mount
        const token = localStorage.getItem('token')
        if (token) {
            authService
                .verifyToken(token)
                .then(setUser)
                .catch(() => localStorage.removeItem('token'))
                .finally(() => setIsLoading(false))
        } else {
            setIsLoading(false)
        }
    }, [])

    const login = async (credentials: LoginRequest) => {
        const response = await authService.login(credentials)
        setUser(response.user)
        localStorage.setItem('token', response.token)
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('token')
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
```

---

## 🔍 Search & Filter Patterns

### Pattern 1: Debounced Search

```typescript
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => clearTimeout(handler)
    }, [value, delay])

    return debouncedValue
}

function SearchableNoteList() {
    const [searchText, setSearchText] = useState('')
    const debouncedSearch = useDebounce(searchText, 500)

    const { data: notes } = useNotes({ search: debouncedSearch })

    return (
        <Box>
            <TextField
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search notes..."
                fullWidth
            />
            <NoteGrid notes={notes} />
        </Box>
    )
}
```

### Pattern 2: Advanced Filters

```typescript
function useNoteFilters() {
    const [filters, setFilters] = useState({
        search: '',
        type: undefined as NoteType | undefined,
        dateRange: undefined as { start: Date; end: Date } | undefined,
        tags: [] as string[],
        archived: false,
    })

    const setSearch = (search: string) => {
        setFilters(prev => ({ ...prev, search }))
    }

    const setType = (type: NoteType | undefined) => {
        setFilters(prev => ({ ...prev, type }))
    }

    const setDateRange = (start: Date, end: Date) => {
        setFilters(prev => ({ ...prev, dateRange: { start, end } }))
    }

    const toggleTag = (tag: string) => {
        setFilters(prev => ({
            ...prev,
            tags: prev.tags.includes(tag)
                ? prev.tags.filter(t => t !== tag)
                : [...prev.tags, tag],
        }))
    }

    const reset = () => {
        setFilters({
            search: '',
            type: undefined,
            dateRange: undefined,
            tags: [],
            archived: false,
        })
    }

    return { filters, setSearch, setType, setDateRange, toggleTag, reset }
}
```

---

## ⚠️ Error Handling Patterns

### Pattern 1: Error Boundary

```typescript
class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { hasError: boolean; error?: Error }
> {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <Box sx={{ padding: '24px', textAlign: 'center' }}>
                    <Typography variant="h5" color="error">
                        Something went wrong
                    </Typography>
                    <Typography variant="body2" sx={{ mt: '8px' }}>
                        {this.state.error?.message}
                    </Typography>
                    <Button
                        onClick={() => window.location.reload()}
                        sx={{ mt: '16px' }}
                    >
                        Reload Page
                    </Button>
                </Box>
            )
        }

        return this.props.children
    }
}

// Usage
<ErrorBoundary>
    <App />
</ErrorBoundary>
```

### Pattern 2: Global Error Handler

```typescript
function GlobalErrorHandler({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const handleError = (event: ErrorEvent) => {
            console.error('Global error:', event.error)
            toast.error('An unexpected error occurred')
        }

        const handleRejection = (event: PromiseRejectionEvent) => {
            console.error('Unhandled rejection:', event.reason)
            toast.error('An unexpected error occurred')
        }

        window.addEventListener('error', handleError)
        window.addEventListener('unhandledrejection', handleRejection)

        return () => {
            window.removeEventListener('error', handleError)
            window.removeEventListener('unhandledrejection', handleRejection)
        }
    }, [])

    return <>{children}</>
}
```

---

## ⏳ Loading Patterns

### Pattern 1: Skeleton Loader

```typescript
function NoteCardSkeleton() {
    return (
        <Card sx={{ padding: '16px' }}>
            <Skeleton variant="text" width="60%" height={24} />
            <Skeleton variant="text" width="100%" height={20} />
            <Skeleton variant="text" width="100%" height={20} />
            <Skeleton variant="rectangular" width="100%" height={40} sx={{ mt: '16px' }} />
        </Card>
    )
}

function NotesList() {
    const { data: notes, isLoading } = useNotes()

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                    <NoteCardSkeleton key={i} />
                ))}
            </Box>
        )
    }

    return <NoteGrid notes={notes} />
}
```

### Pattern 2: Progressive Loading

```typescript
function NotePage({ noteId }: { noteId: number }) {
    // Load critical data first
    const { data: note, isLoading } = useNote(noteId)

    // Load secondary data in parallel
    const { data: comments } = useNoteComments(noteId)
    const { data: attachments } = useNoteAttachments(noteId)

    if (isLoading) return <Spinner />
    if (!note) return <NotFound />

    return (
        <Box>
            {/* Show main content immediately */}
            <NoteContent note={note} />

            {/* Show loaders for secondary data */}
            <Suspense fallback={<CommentsSkeleton />}>
                <NoteComments comments={comments} />
            </Suspense>

            <Suspense fallback={<AttachmentsSkeleton />}>
                <NoteAttachments attachments={attachments} />
            </Suspense>
        </Box>
    )
}
```

---

## 📄 Pagination Patterns

### Pattern 1: Offset Pagination

```typescript
function PaginatedNoteList() {
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(25)

    const { data, isLoading } = useNotes({ page, pageSize })

    return (
        <Box>
            <NoteGrid notes={data?.items} loading={isLoading} />

            <Pagination
                count={Math.ceil((data?.total || 0) / pageSize)}
                page={page}
                onChange={(_, newPage) => setPage(newPage)}
            />
        </Box>
    )
}
```

### Pattern 2: Cursor Pagination

```typescript
function useCursorNotes() {
    const [cursor, setCursor] = useState<string | null>(null)

    const { data, isLoading } = useQuery({
        queryKey: ['notes', cursor],
        queryFn: () => noteService.getNotes({ cursor }),
    })

    const loadMore = () => {
        if (data?.nextCursor) {
            setCursor(data.nextCursor)
        }
    }

    return { notes: data?.items, isLoading, hasMore: !!data?.nextCursor, loadMore }
}
```

---

## 📤 File Upload Patterns

### Pattern 1: Single File Upload

```typescript
function FileUpload({ onUpload }: { onUpload: (file: File) => void }) {
    const [uploading, setUploading] = useState(false)
    const [progress, setProgress] = useState(0)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)

        try {
            await uploadService.uploadFile(file, (progress) => {
                setProgress(progress.percentage)
            })
            onUpload(file)
            toast.success('File uploaded successfully')
        } catch (error) {
            toast.error('Failed to upload file')
        } finally {
            setUploading(false)
            setProgress(0)
        }
    }

    return (
        <Box>
            <input
                type="file"
                onChange={handleFileChange}
                disabled={uploading}
                style={{ display: 'none' }}
                id="file-upload"
            />
            <label htmlFor="file-upload">
                <Button component="span" disabled={uploading}>
                    Upload File
                </Button>
            </label>

            {uploading && (
                <LinearProgress variant="determinate" value={progress} />
            )}
        </Box>
    )
}
```

### Pattern 2: Drag & Drop Upload

```typescript
function DragDropUpload({ onUpload }: { onUpload: (files: File[]) => void }) {
    const [isDragging, setIsDragging] = useState(false)

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)

        const files = Array.from(e.dataTransfer.files)
        onUpload(files)
    }

    return (
        <Box
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            sx={{
                border: '2px dashed',
                borderColor: isDragging ? 'primary.main' : 'grey.300',
                borderRadius: '8px',
                padding: '32px',
                textAlign: 'center',
                backgroundColor: isDragging ? 'action.hover' : 'transparent',
                cursor: 'pointer',
            }}
        >
            <Typography>Drag and drop files here</Typography>
        </Box>
    )
}
```

---

**Remember**: Patterns are guidelines, not rules. Adapt them to your specific needs!