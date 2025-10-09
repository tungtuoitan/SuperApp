# Updated Hook Architecture: Store + Helper Pattern

## Overview

The hooks have been refactored to follow the same pattern as `NoteStore` and `useNoteHelpers`, separating state management from business logic for better maintainability and consistency.

## New Architecture Pattern

### Store Pattern (State Management)
- **Location**: `src/store/{feature}/`
- **Purpose**: Centralized state management using Context API
- **Contains**: State variables and their setters only
- **Example**: `AuthStore`, `DialogStore`, `ApiStore`

### Helper Hook Pattern (Business Logic)  
- **Location**: `src/hooks/use{Feature}Helpers.ts`
- **Purpose**: Business logic functions that operate on store state
- **Contains**: Functions only, no state or useEffect
- **Example**: `useAuthHelpers`, `useDialogHelpers`, `useApiHelpers`

## What Changed

### ✅ Before (Old Pattern)
```typescript
// useAuth.ts - Mixed state + logic
const { loading, error, login, logout } = useAuth();

// useDialog.ts - Local state management  
const { open, data, openDialog, closeDialog } = useDialog<User>();

// useApi.ts - Generic but local state
const { data, loading, error, execute } = useApi(apiFunction);
```

### ✅ After (New Pattern)
```typescript
// Get state from store
const { auth, isAuthenticated, loading, error } = useAuthStore();
// Get functions from helpers
const { login, logout } = useAuthHelpers();

// Get dialog state from store
const { open, data, loading } = useDialogStore();
// Get dialog functions from helpers  
const { openDialog, closeDialog } = useDialogHelpers();

// Get API state from store
const { data, loading, error, apiCalls } = useApiStore();
// Get API functions from helpers
const { execute, executeWithId } = useApiHelpers();
```

## New Files Created

### Stores
- `src/store/auth/AuthStore.tsx` - Authentication state management
- `src/store/dialog/DialogStore.tsx` - Dialog state management  
- `src/store/api/ApiStore.tsx` - API call state management

### Helper Hooks
- `src/hooks/useAuthHelpers.ts` - Authentication functions
- `src/hooks/useDialogHelpers.ts` - Dialog operation functions
- `src/hooks/useApiHelpers.ts` - API call functions

### Old Files (Preserved for Reference)
- `src/hooks/useAuth.old.ts` - Original useAuth hook
- `src/hooks/useDialog.old.ts` - Original useDialog hook
- `src/hooks/useApi.old.ts` - Original useApi hook

## Usage Examples

### Authentication

```typescript
import { useAuthStore, useAuthHelpers } from '@/hooks';

function LoginPage() {
    // Get state from store
    const { 
        auth, 
        isAuthenticated, 
        loginLoading, 
        loginError 
    } = useAuthStore();
    
    // Get functions from helpers
    const { login, logout } = useAuthHelpers();

    const handleLogin = async () => {
        try {
            await login(username, password);
            // Store is automatically updated
        } catch (error) {
            // Error state is in the store
        }
    };

    if (loginLoading) return <CircularProgress />;
    if (loginError) return <Alert severity="error">{loginError}</Alert>;

    return (
        <div>
            {isAuthenticated ? (
                <div>Welcome {auth.userName}!</div>
            ) : (
                <LoginForm onLogin={handleLogin} />
            )}
        </div>
    );
}
```

### Dialog Management

```typescript
import { useDialogStore, useDialogHelpers } from '@/hooks';

function UserTable() {
    // Get state from store
    const { 
        open, 
        data, 
        loading, 
        error 
    } = useDialogStore();
    
    // Get functions from helpers
    const { 
        openDialog, 
        closeDialog, 
        setDialogLoading 
    } = useDialogHelpers<User>();

    const handleEditUser = (user: User) => {
        openDialog(user, 'edit', 'Edit User');
    };

    const handleSaveUser = async () => {
        setDialogLoading(true);
        try {
            // Save logic here
            closeDialog();
        } catch (error) {
            // Error handling
        }
    };

    return (
        <>
            <DataGrid
                rows={users}
                onRowClick={(params) => handleEditUser(params.row)}
            />
            
            <Dialog open={open} onClose={closeDialog}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    {loading && <CircularProgress />}
                    {error && <Alert severity="error">{error}</Alert>}
                    {data && <UserEditForm user={data} onSave={handleSaveUser} />}
                </DialogContent>
            </Dialog>
        </>
    );
}
```

### API Calls

```typescript
import { useApiStore, useApiHelpers } from '@/hooks';
import { usersApi } from '@/services/api';

function UsersList() {
    // Get state from store
    const { 
        data: users, 
        loading, 
        error,
        apiCalls 
    } = useApiStore();
    
    // Get functions from helpers
    const { execute, executeWithId } = useApiHelpers();

    useEffect(() => {
        // Execute API call
        execute(usersApi.getUsers);
    }, []);

    const handleRefresh = () => {
        execute(usersApi.getUsers);
    };

    const handleDeleteUser = async (userId: number) => {
        // Execute with specific ID for tracking
        await executeWithId(`delete-${userId}`, usersApi.deleteUser, userId);
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <div>
            <Button onClick={handleRefresh}>Refresh</Button>
            {users?.map(user => (
                <UserCard 
                    key={user.id} 
                    user={user} 
                    onDelete={() => handleDeleteUser(user.id)}
                    deleting={apiCalls[`delete-${user.id}`]?.loading}
                />
            ))}
        </div>
    );
}
```

## Provider Setup

Make sure to wrap your app with the new providers in `Main.tsx`:

```typescript
import { 
    AuthProvider, 
    DialogProvider, 
    ApiProvider,
    NoteProvider 
} from '../store';

export function Main() {
    return (
        <BrowserRouter>
            <SnackbarProvider>
                <AuthProvider>
                    <DialogProvider>
                        <ApiProvider>
                            <NoteProvider>
                                <MainNav />
                            </NoteProvider>
                        </ApiProvider>
                    </DialogProvider>
                </AuthProvider>
            </SnackbarProvider>
        </BrowserRouter>
    );
}
```

## Migration Guide

### For Components Currently Using Old Hooks

1. **Update imports**:
   ```typescript
   // Old
   import { useAuth, useDialog, useApi } from '@/hooks';
   
   // New
   import { useAuthHelpers, useDialogHelpers, useApiHelpers } from '@/hooks';
   import { useAuthStore, useDialogStore, useApiStore } from '@/store';
   ```

2. **Separate state and functions**:
   ```typescript
   // Old
   const { loading, error, login } = useAuth();
   
   // New  
   const { loading, error } = useAuthStore();
   const { login } = useAuthHelpers();
   ```

3. **Update providers in your app setup**

### Key Benefits

1. **Consistency**: All features now follow the same Store + Helper pattern
2. **Separation of Concerns**: State management separate from business logic
3. **Centralized State**: All state is managed in stores, accessible from anywhere
4. **Type Safety**: Full TypeScript support with proper interfaces
5. **Testability**: Easier to test business logic separately from state
6. **Scalability**: Clear pattern for adding new features

## Helper Hook Rules

✅ **DO**:
- Return only functions
- Use store setters for state updates
- Handle errors and pass them to store
- Follow the pattern: get setters from store, return functions

❌ **DON'T**:
- Accept parameters (hooks should be parameter-free)
- Use useEffect (components handle timing)
- Maintain local state (use store instead)
- Mix state and business logic

## Store Rules

✅ **DO**:
- Provide state and setters
- Follow naming convention: `{Feature}Store`, `{Feature}Provider`, `use{Feature}Store`
- Include loading, error, and data states
- Use TypeScript interfaces

❌ **DON'T**:
- Include business logic
- Make API calls directly
- Handle side effects

This new architecture provides better separation of concerns, improved maintainability, and consistency across the entire application.