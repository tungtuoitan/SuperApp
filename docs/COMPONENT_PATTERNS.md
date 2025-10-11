# 🧩 COMPONENT PATTERNS - Building Blocks

> **Philosophy**: Components should be simple, predictable, and composable.
> 
> **🔗 Related**: See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for design tokens and styling standards.

---

## 📐 Component Architecture

### Component Hierarchy

```
Pages (Route components)
    ↓
Layouts (Structure)
    ↓
Features (Domain components)
    ↓
Shared Components (Reusable UI)
```

---

## �️ Component Classification

### Component Types by Data Flow

We distinguish between two main types of components based on their relationship with data and state:

#### 🖼️ Presentational Components

**Purpose**: Display server data without modification capabilities

**Characteristics**:
- **Read-only data display**: Only receive and display server data
- **No direct context access**: Don't use UI state/functions from context directly
- **Props-based**: All UI interactions passed as props from parent
- **Performance optimized**: Use `React.memo`, `useMemo`, `useCallback`
- **Pure presentation**: Focus solely on rendering data

**Example**: `NoteGrid`

```typescript
// ✅ GOOD: Presentational component
interface NoteGridProps {
    onNoteClick?: (note: Note) => void; // UI interaction passed as prop
}

export const NoteGrid = React.memo(function NoteGrid({ onNoteClick }: NoteGridProps) {
    // ✅ Only React Query for server state
    const { data: notes, isLoading } = useNotes();
    
    // ✅ No context subscriptions - avoids unnecessary re-renders
    // ✅ Memoized derived state
    const sortedNotes = useMemo(() => {
        if (!notes) return [];
        return [...notes].sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }, [notes]);

    // ✅ Memoized columns
    const columns = useMemo(() => [
        // Column definitions...
    ], [onNoteClick]);

    return <DataGrid rows={sortedNotes} columns={columns} loading={isLoading} />;
});

// ✅ Parent passes UI interactions as props
function NotesPage() {
    const { openDialog } = useNoteUI(); // Context access at page level
    
    const handleNoteClick = useCallback((note: Note) => {
        openDialog(note);
    }, [openDialog]);
    
    return <NoteGrid onNoteClick={handleNoteClick} />;
}
```

**Benefits**:
- High performance (no unnecessary re-renders)
- Easy to test and reason about
- Reusable across different contexts
- Clear separation of concerns

---

#### ⚡ Interactive Components

**Purpose**: Handle data updates and complex UI interactions

**Characteristics**:
- **Data modification**: Can create, update, delete server data
- **Context integration**: Access UI state and functions from context
- **Form handling**: Manage form state and validation
- **Complex interactions**: Handle dialogs, confirmations, multi-step flows

**Example**: `NoteDetailDialog`

```typescript
// ✅ GOOD: Interactive component
export function NoteDetailDialog() {
    // ✅ Context access for UI state and interactions
    const { selectedNote, isDialogOpen, closeDialog, updateSelectedNote } = useNoteUI();
    
    // ✅ Server data mutations
    const updateNote = useUpdateNote();
    const deleteNote = useDeleteNote();
    
    // ✅ Form state management
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: selectedNote
    });
    
    const handleSave = async (data: UpdateNoteDTO) => {
        try {
            const updatedNote = await updateNote.mutateAsync({ 
                id: selectedNote.noteId, 
                data 
            });
            updateSelectedNote(updatedNote); // Update context
            toast.success('Note updated!');
        } catch (error) {
            toast.error('Failed to update note');
        }
    };
    
    return (
        <Dialog open={isDialogOpen} onClose={closeDialog}>
            <form onSubmit={handleSubmit(handleSave)}>
                {/* Form fields... */}
                <Button type="submit">Save</Button>
            </form>
        </Dialog>
    );
}
```

**Benefits**:
- Handles complex user interactions
- Manages data mutations
- Integrates with app-wide state
- Provides rich user experience

---

### 📋 Component Classification Guidelines

| Aspect | Presentational | Interactive |
|--------|---------------|-------------|
| **Data Access** | React Query only | React Query + Context |
| **Data Flow** | Read-only display | Read + Write |
| **Context Usage** | None (props only) | Full context access |
| **Performance** | `React.memo` + `useMemo` | Standard optimization |
| **Props** | UI callbacks passed down | Minimal props |
| **Examples** | `NoteGrid`, `UserList` | `NoteDialog`, `CreateForm` |
| **Testing** | Easy (pure functions) | Complex (mocked context) |

**Decision Tree**:
```
Does component modify data?
├─ No → Can users interact with it?
│   ├─ No → Pure Display Component
│   └─ Yes → Presentational Component (pass interactions as props)
└─ Yes → Interactive Component (use context)
```

---

## �🎯 Component Types

### 1. Page Components

**Purpose**: Route-level components that compose features

**Location**: `src/pages/`

**Characteristics**:
- Thin wrapper around features
- Handle routing params
- Setup feature providers
- No complex logic

```typescript
// pages/NotesPage.tsx
import { NoteUIProvider } from '@/features/notes'
import { NoteGrid, NoteFilters, NoteDialog } from '@/features/notes'

import { Box } from '@mui/material'
import { spacing } from '@/lib/theme'

export function NotesPage() {
    return (
        <NoteUIProvider>
            <Box sx={{ padding: spacing[6] }}> {/* 24px */}
                <NoteFilters />
                <NoteGrid />
                <NoteDialog />
            </Box>
        </NoteUIProvider>
    )
}
```

---

### 2. Layout Components

**Purpose**: Define page structure

**Location**: `src/layouts/`

**Characteristics**:
- Structural only
- Handle navigation
- Wrap with common UI (header, sidebar, footer)

```typescript
// layouts/DashboardLayout.tsx
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

import { spacing } from '@/lib/theme'

export function DashboardLayout() {
    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <Sidebar />
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Header />
                <Box sx={{ 
                    flex: 1, 
                    overflow: 'auto', 
                    padding: spacing[6] // 24px
                }}>
                    <Outlet /> {/* Child routes render here */}
                </Box>
            </Box>
        </Box>
    )
}
```

---

### 3. Feature Components

**Purpose**: Domain-specific functionality

**Location**: `src/features/[feature]/components/`

**Characteristics**:
- Use React Query hooks
- Use feature context
- Handle business logic
- Compose shared components

```typescript
// features/notes/components/NoteGrid/NoteGrid.tsx
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useNotes } from '../../hooks/useNotes'
import { useNoteUI } from '../../store/NoteUIContext'
import { Button } from '@/shared/components/ui/Button'

export function NoteGrid() {
    // Data fetching
    const { filters, page, pageSize } = useNoteUI()
    const { data: notes, isLoading } = useNotes({ ...filters, page, pageSize })

    // UI state
    const { openDialog } = useNoteUI()

    // Columns definition
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 200 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <Button onClick={() => openDialog(params.row)}>
                    View
                </Button>
            ),
        },
    ]

    return (
        <DataGrid
            rows={notes || []}
            columns={columns}
            loading={isLoading}
            getRowId={(row) => row.id}
            autoHeight
        />
    )
}
```

---

### 4. Shared Components

**Purpose**: Reusable UI components

**Location**: `src/shared/components/`

**Characteristics**:
- Pure presentation
- Highly reusable
- No business logic
- Well-documented props

```typescript
// shared/components/ui/Button/Button.tsx
interface ButtonProps {
    children: React.ReactNode
    onClick?: () => void
    variant?: 'primary' | 'secondary' | 'danger'
    disabled?: boolean
    loading?: boolean
    fullWidth?: boolean
}

export function Button({
    children,
    onClick,
    variant = 'primary',
    disabled = false,
    loading = false,
    fullWidth = false,
}: ButtonProps) {
    return (
        <MuiButton
            onClick={onClick}
            disabled={disabled || loading}
            variant={variant === 'primary' ? 'contained' : 'outlined'}
            color={variant === 'danger' ? 'error' : 'primary'}
            fullWidth={fullWidth}
            sx={{ minWidth: '100px' }}
        >
            {loading ? <CircularProgress size={20} /> : children}
        </MuiButton>
    )
}
```

---

## 📏 Component Size Guidelines

### When to Split Components

**Split when:**
- File exceeds 200 lines
- Component has multiple responsibilities
- Logic can be reused elsewhere
- Difficult to test as single unit

**Keep together when:**
- Components are tightly coupled
- Logic is simple
- Only used in one place

### Example: Too Big → Split

```typescript
// ❌ BAD: 500 lines, doing too much
function NoteGrid() {
    // 100 lines of state
    // 100 lines of handlers
    // 300 lines of JSX
}

// ✅ GOOD: Split into smaller components
function NoteGrid() {
    return (
        <div>
            <NoteGridToolbar />
            <NoteGridTable />
            <NoteGridPagination />
        </div>
    )
}
```

---

## 🎨 Design System Integration

### Using Design Tokens in Components

Components should always use design system tokens instead of hardcoded values:

```typescript
// ❌ BAD: Hardcoded values
import { Card, Typography, Box } from '@mui/material'

function ProductCard({ product }: { product: Product }) {
    return (
        <Card sx={{
            padding: '24px',
            margin: '16px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            backgroundColor: '#ffffff',
        }}>
            <Typography sx={{ fontSize: '20px', color: '#1a1a1a' }}>
                {product.name}
            </Typography>
        </Card>
    )
}

// ✅ GOOD: Using design tokens
import { Card, Typography, Box } from '@mui/material'
import { spacing, borderRadius, shadows, colors } from '@/lib/theme'

function ProductCard({ product }: { product: Product }) {
    return (
        <Card sx={{
            padding: spacing[6],           // 24px
            margin: spacing[4],            // 16px  
            borderRadius: borderRadius.lg, // 12px
            boxShadow: shadows.sm,
            backgroundColor: 'background.paper', // Uses theme colors
        }}>
            <Typography 
                variant="h5" 
                sx={{ color: 'text.primary' }} // Semantic color
            >
                {product.name}
            </Typography>
        </Card>
    )
}
```

### Responsive Design with Breakpoints

```typescript
import { Box } from '@mui/material'
import { spacing, breakpoints } from '@/lib/theme'

function ResponsiveGrid({ children }: { children: React.ReactNode }) {
    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: {
                xs: '1fr',                    // Mobile: 1 column
                sm: 'repeat(2, 1fr)',        // Tablet: 2 columns  
                lg: 'repeat(3, 1fr)',        // Desktop: 3 columns
            },
            gap: {
                xs: spacing[4],               // Mobile: 16px gap
                md: spacing[6],               // Desktop: 24px gap
            },
            padding: {
                xs: spacing[4],               // Mobile: 16px padding
                md: spacing[8],               // Desktop: 32px padding
            },
        }}>
            {children}
        </Box>
    )
}
```

### Consistent Animation and Transitions

```typescript
import { Button } from '@mui/material'
import { transitions, shadows } from '@/lib/theme'

function AnimatedButton({ children, ...props }: ButtonProps) {
    return (
        <Button
            sx={{
                transition: transitions.common.standard,  // 300ms ease
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: shadows.lg,
                },
                '&:active': {
                    transform: 'translateY(0)',
                    transition: transitions.common.short,  // 200ms for faster feedback
                },
            }}
            {...props}
        >
            {children}
        </Button>
    )
}
```

### Color Usage Guidelines

```typescript
import { Alert, Chip } from '@mui/material'
import { colors } from '@/lib/theme'

// ✅ GOOD: Use semantic colors from theme
function StatusChip({ status }: { status: 'success' | 'warning' | 'error' }) {
    return (
        <Chip 
            label={status}
            color={status} // Uses theme colors automatically
        />
    )
}

// ✅ GOOD: Use design system colors when needed
function CustomIndicator({ type }: { type: 'online' | 'offline' }) {
    return (
        <Box sx={{
            width: '12px',
            height: '12px', 
            borderRadius: '50%',
            backgroundColor: type === 'online' ? colors.success[500] : colors.neutral[400],
        }} />
    )
}

// ✅ GOOD: Use semantic text colors
function MessageText({ message }: { message: string }) {
    return (
        <Typography sx={{ 
            color: 'text.secondary', // Automatically adjusts for light/dark mode
        }}>
            {message}
        </Typography>
    )
}
```

---

## 🧩 Component Patterns

> **📝 Note**: Before implementing components, refer to [Component Classification](#🏗️-component-classification) to determine whether your component should be **Presentational** (display-only with props) or **Interactive** (data-modifying with context access).

### Pattern 1: Simple Functional Component

```typescript
// For simple, stateless components
interface CardProps {
    title: string
    description?: string
    children?: React.ReactNode
}

export function Card({ title, description, children }: CardProps) {
    return (
        <div className="card">
            <h3>{title}</h3>
            {description && <p>{description}</p>}
            {children}
        </div>
    )
}
```

---

### Pattern 2: Component with Local State

```typescript
// For components with internal state
interface ExpandableCardProps {
    title: string
    children: React.ReactNode
}

export function ExpandableCard({ title, children }: ExpandableCardProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <Card>
            <div onClick={() => setIsExpanded(!isExpanded)}>
                <h3>{title}</h3>
                <span>{isExpanded ? '▼' : '▶'}</span>
            </div>
            {isExpanded && <div>{children}</div>}
        </Card>
    )
}
```

---

### Pattern 3: Component with Data Fetching

```typescript
// For components that fetch their own data
interface UserProfileProps {
    userId: number
}

export function UserProfile({ userId }: UserProfileProps) {
    const { data: user, isLoading, error } = useUser(userId)

    if (isLoading) return <Spinner />
    if (error) return <ErrorAlert error={error} />
    if (!user) return <NotFound />

    return (
        <Card>
            <Avatar src={user.avatar} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </Card>
    )
}
```

---

### Pattern 4: Compound Components

```typescript
// For components with sub-components
interface TabsProps {
    children: React.ReactNode
}

function Tabs({ children }: TabsProps) {
    const [activeTab, setActiveTab] = useState(0)

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div className="tabs">{children}</div>
        </TabsContext.Provider>
    )
}

function TabList({ children }: { children: React.ReactNode }) {
    return <div className="tab-list">{children}</div>
}

function Tab({ index, children }: { index: number; children: React.ReactNode }) {
    const { activeTab, setActiveTab } = useTabsContext()

    return (
        <button
            className={activeTab === index ? 'active' : ''}
            onClick={() => setActiveTab(index)}
        >
            {children}
        </button>
    )
}

function TabPanel({ index, children }: { index: number; children: React.ReactNode }) {
    const { activeTab } = useTabsContext()

    return activeTab === index ? <div>{children}</div> : null
}

// Export as compound component
Tabs.List = TabList
Tabs.Tab = Tab
Tabs.Panel = TabPanel

export { Tabs }

// Usage
<Tabs>
    <Tabs.List>
        <Tabs.Tab index={0}>Profile</Tabs.Tab>
        <Tabs.Tab index={1}>Settings</Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel index={0}>Profile content</Tabs.Panel>
    <Tabs.Panel index={1}>Settings content</Tabs.Panel>
</Tabs>
```

---

### Pattern 5: Render Props

```typescript
// For flexible component composition
interface MouseTrackerProps {
    children: (position: { x: number; y: number }) => React.ReactNode
}

export function MouseTracker({ children }: MouseTrackerProps) {
    const [position, setPosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return <>{children(position)}</>
}

// Usage
<MouseTracker>
    {({ x, y }) => (
        <div>
            Mouse position: {x}, {y}
        </div>
    )}
</MouseTracker>
```

---

## 🎯 Props Best Practices

### 1. **Clear Prop Types**

```typescript
// ❌ BAD: Unclear types
interface ButtonProps {
    data: any
    onClick: Function
}

// ✅ GOOD: Explicit types
interface ButtonProps {
    label: string
    onClick: () => void
    variant?: 'primary' | 'secondary'
    disabled?: boolean
}
```

---

### 2. **Required vs Optional Props**

```typescript
// Make intent clear
interface UserCardProps {
    user: User                    // Required
    onEdit?: (user: User) => void // Optional
    showAvatar?: boolean          // Optional with default
}

export function UserCard({ 
    user, 
    onEdit, 
    showAvatar = true  // Default value
}: UserCardProps) {
    return (
        <Card>
            {showAvatar && <Avatar src={user.avatar} />}
            <h3>{user.name}</h3>
            {onEdit && <Button onClick={() => onEdit(user)}>Edit</Button>}
        </Card>
    )
}
```

---

### 3. **Avoid Prop Drilling**

```typescript
// ❌ BAD: Passing props through many levels
function App() {
    const [user, setUser] = useState(null)
    return <Dashboard user={user} />
}

function Dashboard({ user }) {
    return <Sidebar user={user} />
}

function Sidebar({ user }) {
    return <UserMenu user={user} />
}

function UserMenu({ user }) {
    return <div>{user.name}</div>
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
    return <div>{user.name}</div>
}
```

---

### 4. **Destructure Props Thoughtfully**

```typescript
// ✅ GOOD: Destructure in signature for simple components
function Button({ label, onClick }: ButtonProps) {
    return <button onClick={onClick}>{label}</button>
}

// ✅ GOOD: Keep props object for many props
function ComplexCard(props: ComplexCardProps) {
    // Easier to pass down with {...props}
    return (
        <Card {...props}>
            <CardContent title={props.title} />
        </Card>
    )
}
```

---

## 🏗️ Component Organization

### Simple Component (Single File)

```typescript
// shared/components/ui/Badge.tsx
interface BadgeProps {
    label: string
    color?: 'primary' | 'secondary' | 'success' | 'error'
}

export function Badge({ label, color = 'primary' }: BadgeProps) {
    return (
        <span className={`badge badge-${color}`}>
            {label}
        </span>
    )
}
```

---

### Complex Component (Folder)

```
NoteGrid/
├── NoteGrid.tsx           # Main component
├── NoteGrid.hooks.ts      # Component-specific hooks
├── NoteGrid.utils.ts      # Helper functions
├── NoteGrid.types.ts      # Type definitions
├── NoteGrid.test.tsx      # Tests
└── index.ts               # Public exports
```

```typescript
// NoteGrid/NoteGrid.tsx
import { useNoteGridData } from './NoteGrid.hooks'
import { formatDate } from './NoteGrid.utils'
import type { NoteGridProps } from './NoteGrid.types'

export function NoteGrid(props: NoteGridProps) {
    const { notes, isLoading, handleRowClick } = useNoteGridData(props)

    return (
        <DataGrid
            rows={notes}
            loading={isLoading}
            onRowClick={handleRowClick}
        />
    )
}

// NoteGrid/NoteGrid.hooks.ts
export function useNoteGridData(props: NoteGridProps) {
    const { filters } = props
    const { data: notes, isLoading } = useNotes(filters)
    const { openDialog } = useNoteUI()

    const handleRowClick = (note: Note) => {
        openDialog(note)
    }

    return { notes, isLoading, handleRowClick }
}

// NoteGrid/NoteGrid.utils.ts
export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US').format(date)
}

// NoteGrid/index.ts
export { NoteGrid } from './NoteGrid'
export type { NoteGridProps } from './NoteGrid.types'
```

---

## ⚡ Performance Optimization

### 1. **React.memo**

```typescript
// Use for components with expensive renders
interface UserCardProps {
    user: User
}

export const UserCard = memo(function UserCard({ user }: UserCardProps) {
    return (
        <Card>
            <Avatar src={user.avatar} />
            <h3>{user.name}</h3>
            <p>{user.email}</p>
        </Card>
    )
})

// With custom comparison
export const UserCard = memo(
    function UserCard({ user }: UserCardProps) {
        return <Card>{user.name}</Card>
    },
    (prev, next) => {
        // Only re-render if user ID changed
        return prev.user.id === next.user.id
    }
)
```

---

### 2. **useMemo for Expensive Calculations**

```typescript
function NotesList({ notes }: { notes: Note[] }) {
    // ❌ BAD: Recalculates on every render
    const sortedNotes = notes.sort((a, b) => b.date - a.date)

    // ✅ GOOD: Only recalculates when notes change
    const sortedNotes = useMemo(() => {
        return notes.sort((a, b) => b.date - a.date)
    }, [notes])

    return <div>{sortedNotes.map(note => <NoteCard key={note.id} note={note} />)}</div>
}
```

---

### 3. **useCallback for Functions**

```typescript
function NotesList() {
    const { data: notes } = useNotes()
    const updateNote = useUpdateNote()

    // ❌ BAD: New function on every render
    const handleEdit = (note: Note) => {
        updateNote.mutate(note)
    }

    // ✅ GOOD: Stable function reference
    const handleEdit = useCallback((note: Note) => {
        updateNote.mutate(note)
    }, [updateNote])

    return (
        <div>
            {notes.map(note => (
                <NoteCard key={note.id} note={note} onEdit={handleEdit} />
            ))}
        </div>
    )
}
```

---

### 4. **Lazy Loading**

```typescript
// Lazy load heavy components
import { lazy, Suspense } from 'react'

const HeavyChart = lazy(() => import('./HeavyChart'))
const NoteEditor = lazy(() => import('./NoteEditor'))

function Dashboard() {
    return (
        <div>
            <Suspense fallback={<Spinner />}>
                <HeavyChart />
            </Suspense>
            
            <Suspense fallback={<Spinner />}>
                <NoteEditor />
            </Suspense>
        </div>
    )
}
```

---

### 5. **Virtualization for Long Lists**

```typescript
import { FixedSizeList } from 'react-window'

function NotesList({ notes }: { notes: Note[] }) {
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

---

## 🎭 Conditional Rendering

### Pattern 1: Early Returns

```typescript
// ✅ GOOD: Handle edge cases early
function UserProfile({ userId }: { userId: number }) {
    const { data: user, isLoading, error } = useUser(userId)

    if (isLoading) return <Spinner />
    if (error) return <ErrorAlert error={error} />
    if (!user) return <NotFound />

    // Main rendering
    return (
        <Card>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </Card>
    )
}
```

---

### Pattern 2: Conditional Content

```typescript
function NoteCard({ note, showActions }: NoteCardProps) {
    return (
        <Card>
            <h3>{note.title}</h3>
            <p>{note.description}</p>
            
            {/* Conditional rendering */}
            {showActions && (
                <div>
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                </div>
            )}
            
            {/* With ternary */}
            {note.isArchived ? (
                <Badge label="Archived" color="secondary" />
            ) : (
                <Badge label="Active" color="success" />
            )}
        </Card>
    )
}
```

---

### Pattern 3: Switch-like Rendering

```typescript
function NoteStatus({ status }: { status: 'draft' | 'published' | 'archived' }) {
    const statusConfig = {
        draft: { label: 'Draft', color: 'warning' },
        published: { label: 'Published', color: 'success' },
        archived: { label: 'Archived', color: 'secondary' },
    }

    const { label, color } = statusConfig[status]

    return <Badge label={label} color={color} />
}
```

---

## 🚫 Anti-Patterns

### 1. **Massive Components**

```typescript
// ❌ BAD: 500 lines component
function Dashboard() {
    // 100 lines of state
    // 100 lines of effects
    // 100 lines of handlers
    // 200 lines of JSX
}

// ✅ GOOD: Split into smaller components
function Dashboard() {
    return (
        <div>
            <DashboardHeader />
            <DashboardStats />
            <DashboardCharts />
            <DashboardTable />
        </div>
    )
}
```

---

### 2. **Inline Object/Array Creation**

```typescript
// ❌ BAD: Creates new object on every render
function NoteCard() {
    return <Button style={{ padding: '16px', margin: '8px' }}>Click</Button>
}

// ✅ GOOD: Define outside or use sx
const buttonStyle = { padding: '16px', margin: '8px' }

function NoteCard() {
    return <Button style={buttonStyle}>Click</Button>
}

// ✅ BETTER: Use sx prop with design tokens
import { spacing } from '@/lib/theme'

function NoteCard() {
    return <Button sx={{ padding: spacing[4], margin: spacing[2] }}>Click</Button>
}
```

---

### 3. **Unnecessary Context Subscriptions**

```typescript
// ❌ BAD: Component subscribes to context it doesn't need
function DataTable() {
    const { openDialog, searchText, filters } = useAppUI()
    // Re-renders when searchText or filters change, even though it only needs openDialog
    
    return <Table onRowClick={openDialog} />
}

// ✅ GOOD: Pass callback as prop to avoid subscription
function PageComponent() {
    const { openDialog } = useAppUI() // Only parent subscribes
    return <DataTable onRowClick={openDialog} />
}

function DataTable({ onRowClick }: { onRowClick?: (item: Item) => void }) {
    const { data } = useItems() // Only subscribes to relevant data
    
    return <Table onRowClick={onRowClick} />
}
```

---

### 4. **Index as Key**

```typescript
// ❌ BAD: Using index as key
notes.map((note, index) => <NoteCard key={index} note={note} />)

// ✅ GOOD: Use stable unique ID
notes.map(note => <NoteCard key={note.id} note={note} />)
```

---

## 📝 Component Checklist

When creating a new component:

- [ ] Clear, descriptive name
- [ ] Props interface defined
- [ ] Loading/error states handled
- [ ] Proper TypeScript types
- [ ] No prop drilling (use Context if needed)
- [ ] Performance considered (memo, useMemo, useCallback)
- [ ] Accessible (ARIA labels, keyboard navigation)
- [ ] Responsive design
- [ ] File size under 200 lines (split if larger)
- [ ] Reusable (not too specific)

---

**Remember**: Good components are simple, focused, and easy to understand. If it's getting complex, split it up!