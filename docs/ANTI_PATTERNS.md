# 🚫 ANTI-PATTERNS - What NOT to Do

> **Philosophy**: Learn from mistakes. Avoid common pitfalls.

---

## 📚 Table of Contents

1. [State Management Anti-Patterns](#state-management-anti-patterns)
2. [Component Anti-Patterns](#component-anti-patterns)
3. [Hook Anti-Patterns](#hook-anti-patterns)
4. [Performance Anti-Patterns](#performance-anti-patterns)
5. [Type Safety Anti-Patterns](#type-safety-anti-patterns)
6. [API Anti-Patterns](#api-anti-patterns)
7. [Styling Anti-Patterns](#styling-anti-patterns)
8. [Testing Anti-Patterns](#testing-anti-patterns)

---

## 🔄 State Management Anti-Patterns

### ❌ Anti-Pattern 1: Using Context for Server State

```typescript
// ❌ BAD: Server state in Context
const NotesContext = createContext<{
    notes: Note[]
    loading: boolean
    fetchNotes: () => void
}>()

function NotesProvider({ children }) {
    const [notes, setNotes] = useState<Note[]>([])
    const [loading, setLoading] = useState(false)

    const fetchNotes = async () => {
        setLoading(true)
        const data = await noteService.getNotes()
        setNotes(data)
        setLoading(false)
    }

    return (
        <NotesContext.Provider value={{ notes, loading, fetchNotes }}>
            {children}
        </NotesContext.Provider>
    )
}

// ✅ GOOD: Use React Query for server state
function NotesList() {
    const { data: notes, isLoading } = useNotes()
    // React Query handles caching, refetching, loading states
}
```

**Why it's bad:**
- No caching
- Manual loading state management
- No automatic refetching
- Causes unnecessary re-renders
- More boilerplate code

---

### ❌ Anti-Pattern 2: Storing Derived State

```typescript
// ❌ BAD: Storing derived state
function NotesList() {
    const [notes, setNotes] = useState<Note[]>([])
    const [activeNotes, setActiveNotes] = useState<Note[]>([])

    useEffect(() => {
        setActiveNotes(notes.filter(n => !n.archived))
    }, [notes])

    return <div>{activeNotes.map(...)}</div>
}

// ✅ GOOD: Calculate on the fly
function NotesList() {
    const [notes, setNotes] = useState<Note[]>([])
    const activeNotes = notes.filter(n => !n.archived)

    return <div>{activeNotes.map(...)}</div>
}

// ✅ BETTER: Memoize if expensive
function NotesList() {
    const [notes, setNotes] = useState<Note[]>([])
    const activeNotes = useMemo(
        () => notes.filter(n => !n.archived),
        [notes]
    )

    return <div>{activeNotes.map(...)}</div>
}
```

**Why it's bad:**
- State synchronization bugs
- Extra re-renders
- More code to maintain
- Potential for stale data

---

### ❌ Anti-Pattern 3: Prop Drilling

```typescript
// ❌ BAD: Passing props through many levels
function App() {
    const [user, setUser] = useState<User | null>(null)
    return <Dashboard user={user} setUser={setUser} />
}

function Dashboard({ user, setUser }) {
    return <Sidebar user={user} setUser={setUser} />
}

function Sidebar({ user, setUser }) {
    return <UserMenu user={user} setUser={setUser} />
}

function UserMenu({ user, setUser }) {
    return <div>{user?.name}</div>
}

// ✅ GOOD: Use Context
function App() {
    return (
        <AuthProvider>
            <Dashboard />
        </AuthProvider>
    )
}

function UserMenu() {
    const { user } = useAuth()
    return <div>{user?.name}</div>
}
```

**Why it's bad:**
- Tightly coupled components
- Hard to refactor
- Difficult to test
- Props passed through components that don't need them

---

### ❌ Anti-Pattern 4: Too Much State

```typescript
// ❌ BAD: Everything in state
function NotesPage() {
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [selectedNote, setSelectedNote] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [filters, setFilters] = useState({})
    const [sortBy, setSortBy] = useState('date')
    const [page, setPage] = useState(1)
    // ... 20 more states
}

// ✅ GOOD: Split responsibilities
function NotesPage() {
    // Server state
    const { data: notes, isLoading } = useNotes()
    
    // UI state in custom hook or context
    const dialog = useNoteDialog()
    const filters = useNoteFilters()
    
    // Local state
    const [page, setPage] = useState(1)
}
```

**Why it's bad:**
- Hard to understand
- Difficult to maintain
- Easy to make mistakes
- Performance issues

---

## 🧩 Component Anti-Patterns

### ❌ Anti-Pattern 5: Massive Components

```typescript
// ❌ BAD: 500 line component doing everything
function Dashboard() {
    // 50 lines of state
    const [notes, setNotes] = useState([])
    const [users, setUsers] = useState([])
    const [stats, setStats] = useState({})
    // ...

    // 100 lines of effects
    useEffect(() => {
        fetchNotes()
    }, [])
    useEffect(() => {
        fetchUsers()
    }, [])
    // ...

    // 100 lines of handlers
    const handleNoteClick = () => { /* ... */ }
    const handleUserClick = () => { /* ... */ }
    // ...

    // 250 lines of JSX
    return (
        <div>
            {/* massive JSX */}
        </div>
    )
}

// ✅ GOOD: Split into smaller components
function Dashboard() {
    return (
        <Box>
            <DashboardHeader />
            <DashboardStats />
            <DashboardCharts />
            <DashboardNotes />
            <DashboardUsers />
        </Box>
    )
}
```

**Why it's bad:**
- Hard to understand
- Difficult to test
- Can't reuse parts
- Performance issues
- Merge conflicts in teams

---

### ❌ Anti-Pattern 6: Inline Object/Array Creation

```typescript
// ❌ BAD: Creates new object on every render
function NoteCard({ note }) {
    return (
        <Button
            style={{ padding: '16px', margin: '8px' }}
            onClick={() => console.log(note)}
        >
            {note.name}
        </Button>
    )
}

// ✅ GOOD: Define outside or use sx
const buttonStyle = { padding: '16px', margin: '8px' }

function NoteCard({ note }) {
    const handleClick = useCallback(() => {
        console.log(note)
    }, [note])

    return (
        <Button style={buttonStyle} onClick={handleClick}>
            {note.name}
        </Button>
    )
}

// ✅ BETTER: Use MUI sx prop
function NoteCard({ note }) {
    return (
        <Button sx={{ padding: '16px', margin: '8px' }}>
            {note.name}
        </Button>
    )
}
```

**Why it's bad:**
- New object reference on every render
- Breaks memoization
- Causes child re-renders
- Performance issues

---

### ❌ Anti-Pattern 7: Index as Key

```typescript
// ❌ BAD: Using index as key
notes.map((note, index) => (
    <NoteCard key={index} note={note} />
))

// ✅ GOOD: Use stable unique ID
notes.map(note => (
    <NoteCard key={note.noteId} note={note} />
))

// ❌ BAD: Using non-unique property
notes.map(note => (
    <NoteCard key={note.name} note={note} />
))
```

**Why it's bad:**
- Breaks React reconciliation
- State gets mixed up
- Performance issues
- Bugs with reordering

---

### ❌ Anti-Pattern 8: Conditional Hooks

```typescript
// ❌ BAD: Conditional hooks
function NoteDetail({ noteId }) {
    if (!noteId) {
        return <div>No note selected</div>
    }

    // ❌ Hook called conditionally!
    const { data: note } = useNote(noteId)

    return <div>{note?.name}</div>
}

// ✅ GOOD: Always call hooks
function NoteDetail({ noteId }) {
    const { data: note } = useNote(noteId, {
        enabled: !!noteId, // Control with enabled
    })

    if (!noteId) {
        return <div>No note selected</div>
    }

    return <div>{note?.name}</div>
}
```

**Why it's bad:**
- Breaks Rules of Hooks
- Unpredictable behavior
- Hard to debug
- React will throw errors

---

## 🪝 Hook Anti-Patterns

### ❌ Anti-Pattern 9: useEffect for Everything

```typescript
// ❌ BAD: Using useEffect to update state from props
function NoteCard({ note }) {
    const [localNote, setLocalNote] = useState(note)

    useEffect(() => {
        setLocalNote(note) // ❌ Anti-pattern!
    }, [note])

    return <div>{localNote.name}</div>
}

// ✅ GOOD: Just use the prop
function NoteCard({ note }) {
    return <div>{note.name}</div>
}

// ✅ GOOD: Only store edited values
function NoteCard({ note }) {
    const [editedName, setEditedName] = useState<string | null>(null)
    const displayName = editedName ?? note.name

    return <div>{displayName}</div>
}
```

**Why it's bad:**
- Unnecessary re-renders
- Synchronization bugs
- More complex code
- Harder to reason about

---

### ❌ Anti-Pattern 10: Missing Dependencies

```typescript
// ❌ BAD: Missing dependencies
function NotesList() {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        fetchNotes().then(setNotes)
    }, []) // ❌ Should include fetchNotes if it changes
}

// ✅ GOOD: Include all dependencies
function NotesList() {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        fetchNotes().then(setNotes)
    }, [fetchNotes]) // Or use useCallback for fetchNotes
}

// ✅ BETTER: Use React Query
function NotesList() {
    const { data: notes } = useNotes()
    // No useEffect needed!
}
```

**Why it's bad:**
- Stale closures
- Bugs with old data
- Hard to debug
- Linter warnings

---

## ⚡ Performance Anti-Patterns

### ❌ Anti-Pattern 11: Premature Optimization

```typescript
// ❌ BAD: Over-optimizing everything
const MemoizedButton = memo(({ label }) => (
    <button>{label}</button>
))

const MemoizedText = memo(({ text }) => (
    <span>{text}</span>
))

function App() {
    const handleClick = useCallback(() => {
        console.log('clicked')
    }, [])

    const text = useMemo(() => 'Hello', [])

    return (
        <div>
            <MemoizedText text={text} />
            <MemoizedButton label="Click" onClick={handleClick} />
        </div>
    )
}

// ✅ GOOD: Only optimize when needed
function App() {
    return (
        <div>
            <span>Hello</span>
            <button onClick={() => console.log('clicked')}>Click</button>
        </div>
    )
}
```

**Why it's bad:**
- Adds complexity for no benefit
- Makes code harder to read
- Can actually make things slower
- Premature optimization is evil

---

### ❌ Anti-Pattern 12: Not Virtualizing Long Lists

```typescript
// ❌ BAD: Rendering 10,000 items
function NotesList({ notes }) {
    return (
        <div>
            {notes.map(note => (
                <NoteCard key={note.noteId} note={note} />
            ))}
        </div>
    )
}

// ✅ GOOD: Use virtualization for long lists
import { FixedSizeList } from 'react-window'

function NotesList({ notes }) {
    const Row = ({ index, style }) => (
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

**Why it's bad:**
- Slow initial render
- Poor scroll performance
- High memory usage
- Bad user experience

---

## 🔒 Type Safety Anti-Patterns

### ❌ Anti-Pattern 13: Using `any`

```typescript
// ❌ BAD: Using any
function handleData(data: any) {
    return data.value // No type checking!
}

// ✅ GOOD: Use proper types
function handleData(data: { value: string }) {
    return data.value
}

// ✅ GOOD: Use unknown and narrow
function handleData(data: unknown) {
    if (typeof data === 'object' && data !== null && 'value' in data) {
        return (data as { value: string }).value
    }
    throw new Error('Invalid data')
}
```

**Why it's bad:**
- No type safety
- Runtime errors
- No autocomplete
- Defeats purpose of TypeScript

---

### ❌ Anti-Pattern 14: Type Assertions Without Validation

```typescript
// ❌ BAD: Unsafe type assertion
function processNote(data: unknown) {
    const note = data as Note // ❌ No validation!
    return note.name
}

// ✅ GOOD: Validate before asserting
function isNote(data: unknown): data is Note {
    return (
        typeof data === 'object' &&
        data !== null &&
        'noteId' in data &&
        'name' in data
    )
}

function processNote(data: unknown) {
    if (isNote(data)) {
        return data.name // ✅ Type-safe
    }
    throw new Error('Invalid note data')
}
```

**Why it's bad:**
- Runtime errors
- False sense of security
- Hard to debug
- Data corruption

---

## 🌐 API Anti-Patterns

### ❌ Anti-Pattern 15: Not Handling Errors

```typescript
// ❌ BAD: No error handling
async function fetchNotes() {
    const response = await fetch('/api/notes')
    const data = await response.json()
    return data
}

// ✅ GOOD: Proper error handling
async function fetchNotes() {
    try {
        const response = await fetch('/api/notes')
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`)
        }
        
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Failed to fetch notes:', error)
        throw error // Re-throw for upper layers
    }
}
```

**Why it's bad:**
- Silent failures
- Poor user experience
- Hard to debug
- Data inconsistencies

---

### ❌ Anti-Pattern 16: Fetching in useEffect

```typescript
// ❌ BAD: Manual data fetching
function NotesList() {
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch('/api/notes')
            .then(res => res.json())
            .then(setNotes)
            .finally(() => setLoading(false))
    }, [])

    return <div>{notes.map(...)}</div>
}

// ✅ GOOD: Use React Query
function NotesList() {
    const { data: notes, isLoading } = useNotes()
    return <div>{notes?.map(...)}</div>
}
```

**Why it's bad:**
- No caching
- Manual loading states
- No automatic refetching
- Race conditions
- Memory leaks if unmounted

---

## 🎨 Styling Anti-Patterns

### ❌ Anti-Pattern 17: Inline Styles

```typescript
// ❌ BAD: Inline styles
<div style={{ padding: '16px', color: 'blue' }}>
    Content
</div>

// ✅ GOOD: Use sx prop
<Box sx={{ padding: '16px', color: 'primary.main' }}>
    Content
</Box>

// ✅ GOOD: Use styled component
const StyledBox = styled(Box)({
    padding: '16px',
    color: theme => theme.palette.primary.main,
})
```

**Why it's bad:**
- No theme access
- Harder to maintain
- Can't use pseudo-selectors
- Performance issues

---

### ❌ Anti-Pattern 18: Magic Numbers

```typescript
// ❌ BAD: Magic numbers
<Box sx={{ 
    padding: '24px',
    marginTop: '16px',
    borderRadius: '8px',
    maxWidth: '1200px',
}} />

// ✅ GOOD: Use theme or constants
const LAYOUT = {
    padding: '24px',
    marginTop: '16px',
    borderRadius: '8px',
    maxWidth: '1200px',
}

<Box sx={{ ...LAYOUT }} />

// ✅ BETTER: Use theme
<Box sx={{ 
    padding: theme => theme.spacing(3),
    marginTop: theme => theme.spacing(2),
    borderRadius: theme => theme.shape.borderRadius,
}} />
```

**Why it's bad:**
- Hard to maintain consistency
- Difficult to update globally
- No single source of truth

---

## 🧪 Testing Anti-Patterns

### ❌ Anti-Pattern 19: Testing Implementation Details

```typescript
// ❌ BAD: Testing internal state
it('increments count', () => {
    const { result } = renderHook(() => useCounter())
    
    expect(result.current.count).toBe(0) // ❌ Internal state
    
    act(() => {
        result.current.increment()
    })
    
    expect(result.current.count).toBe(1) // ❌ Internal state
})

// ✅ GOOD: Test user-visible behavior
it('shows incremented count', () => {
    render(<Counter />)
    
    expect(screen.getByText('Count: 0')).toBeInTheDocument()
    
    fireEvent.click(screen.getByRole('button', { name: /increment/i }))
    
    expect(screen.getByText('Count: 1')).toBeInTheDocument()
})
```

**Why it's bad:**
- Brittle tests
- Breaks on refactoring
- Doesn't test real behavior
- False confidence

---

### ❌ Anti-Pattern 20: Not Cleaning Up

```typescript
// ❌ BAD: No cleanup
it('fetches data', () => {
    render(<DataComponent />)
    // Test ends, but requests may still be pending
})

// ✅ GOOD: Proper cleanup
afterEach(() => {
    cleanup()
    vi.clearAllMocks()
})

it('fetches data', async () => {
    render(<DataComponent />)
    await waitFor(() => {
        expect(screen.getByText('Data loaded')).toBeInTheDocument()
    })
})
```

**Why it's bad:**
- Memory leaks
- Test interference
- Flaky tests
- Hard to debug

---

## 📝 Quick Reference: Common Anti-Patterns

| Anti-Pattern | Why Bad | Solution |
|--------------|---------|----------|
| Context for server state | No caching, manual work | Use React Query |
| Storing derived state | Sync issues, bugs | Calculate or memoize |
| Prop drilling | Tight coupling | Use Context |
| Massive components | Hard to maintain | Split into smaller |
| Index as key | State bugs | Use unique ID |
| Conditional hooks | Breaks rules | Always call hooks |
| useEffect for everything | Complex, buggy | Use React Query |
| Using `any` | No type safety | Proper types |
| Not handling errors | Silent failures | Try/catch, error boundaries |
| Inline styles | Hard to maintain | Use sx or styled() |
| Testing implementation | Brittle tests | Test behavior |

---

## 🎯 How to Avoid Anti-Patterns

### 1. **Code Review Checklist**

- [ ] No `any` types
- [ ] No prop drilling (use Context if needed)
- [ ] No derived state stored
- [ ] No conditional hooks
- [ ] Proper error handling
- [ ] Keys are stable and unique
- [ ] No inline styles
- [ ] Tests test behavior, not implementation

### 2. **Use Linting Rules**

```json
// .eslintrc.json
{
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "rules": {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-unused-vars": "error"
    }
}
```

### 3. **Learn from Experience**

- Review your old code
- Learn from code reviews
- Study open source projects
- Read documentation
- Stay updated with best practices

---

**Remember**: Everyone makes mistakes. The key is to learn from them and avoid repeating them!