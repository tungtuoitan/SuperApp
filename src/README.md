# Source Code Organization

## Directory Structure

```
src/
├── config/                    # Configuration & Settings
├── services/                  # External Services & API
├── hooks/                     # Custom React Hooks
├── contexts/                  # Global State (Context API)
├── types/                     # TypeScript Definitions
├── utils/                     # Utility Functions
├── styles/                    # Shared Styles
└── components/                # React Components
```

## Quick Import Guide

### Config
```typescript
import { API_ENDPOINTS } from './config/api.config';
import { APP_CONFIG } from './config/app.config';
import { theme } from './config/theme';
```

### Services
```typescript
import { authApi, notesApi } from './services/api';
import { storageService, STORAGE_KEYS } from './services/storage.service';
```

### Hooks
```typescript
import { useAuth, useNotes, useDialog, useApi } from './hooks';
```

### Contexts
```typescript
import { useAuthStore, AuthProvider } from './contexts';
import { useNavigationStore, NavProvider } from './contexts';
```

### Types
```typescript
import { Note, User } from './types';
import { ApiResponse, GetNotesParams } from './types';
```

### Utils
```typescript
import { formatDate, isEmpty } from './utils';
import { NOTE_TYPES, NOTE_TYPE_COLORS } from './utils';
```

### Styles
```typescript
import { Grow, FlexCenter } from './styles';
```

## Examples

### Fetch Notes
```typescript
const { notes, loading, error } = useNotes();
```

### Login
```typescript
const { login, loading, error } = useAuth();
await login(username, password);
```

### Dialog State
```typescript
const { open, data, openDialog, closeDialog } = useDialog<Note>();
```

## More Info

See [Migration-Guide.md](../docs/Migration-Guide.md) for detailed examples.
