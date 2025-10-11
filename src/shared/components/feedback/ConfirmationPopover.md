# ConfirmationPopover Component

A shared, reusable confirmation popover component that provides a consistent user experience for confirmation dialogs across the SuperApp application.

## Features

- **Consistent Design**: Follows SuperApp design system tokens
- **Accessible**: Proper focus management and keyboard navigation
- **Flexible**: Customizable messages, button text, and styling
- **Type Safe**: Full TypeScript support
- **Hook Integration**: Comes with a custom hook for easy state management

## Basic Usage

### With Custom Hook (Recommended)

```tsx
import { ConfirmationPopover } from '@/shared/components/feedback/ConfirmationPopover';
import { useConfirmationPopover } from '@/shared/hooks/useConfirmationPopover';

function MyComponent() {
    const deleteConfirmation = useConfirmationPopover({
        confirmText: 'Delete',
        confirmColor: 'error',
        buttonVariant: 'contained'
    });

    const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        deleteConfirmation.show({
            event,
            message: 'Do you want to delete this item?',
            onConfirm: () => {
                // Handle deletion
                deleteItem();
            }
        });
    };

    return (
        <>
            <Button onClick={handleDeleteClick}>Delete</Button>
            <ConfirmationPopover {...deleteConfirmation.getPopoverProps()} />
        </>
    );
}
```

### Direct Component Usage

```tsx
import { ConfirmationPopover } from '@/shared/components/feedback/ConfirmationPopover';

function MyComponent() {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setShowConfirm(true);
    };

    const handleConfirm = () => {
        deleteItem();
        setShowConfirm(false);
        setAnchorEl(null);
    };

    const handleCancel = () => {
        setShowConfirm(false);
        setAnchorEl(null);
    };

    return (
        <>
            <Button onClick={handleDeleteClick}>Delete</Button>
            <ConfirmationPopover
                open={showConfirm}
                anchorEl={anchorEl}
                message="Are you sure you want to delete this item?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </>
    );
}
```

## API Reference

### ConfirmationPopover Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | Whether the popover is open |
| `anchorEl` | `HTMLElement \| null` | - | Element to anchor the popover to |
| `message` | `string` | - | Message to display in the popover |
| `confirmText` | `string` | `'Ok'` | Text for the confirm button |
| `cancelText` | `string` | `'Cancel'` | Text for the cancel button |
| `confirmColor` | `'inherit' \| 'primary' \| 'secondary' \| 'success' \| 'error' \| 'info' \| 'warning'` | `'primary'` | Color for the confirm button |
| `cancelColor` | `'inherit' \| 'primary' \| 'secondary' \| 'success' \| 'error' \| 'info' \| 'warning'` | `'inherit'` | Color for the cancel button |
| `buttonVariant` | `'text' \| 'outlined' \| 'contained'` | `'text'` | Variant for buttons |
| `width` | `string` | - | Custom width for the popover |
| `zIndex` | `number` | `1300` | Z-index for the popover |
| `onConfirm` | `() => void` | - | Callback when confirm button is clicked |
| `onCancel` | `() => void` | - | Callback when cancel button is clicked |
| `onClose` | `() => void` | - | Callback when popover is closed |

### useConfirmationPopover Hook

#### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `confirmText` | `string` | `'Ok'` | Default text for the confirm button |
| `cancelText` | `string` | `'Cancel'` | Default text for the cancel button |
| `confirmColor` | `'inherit' \| 'primary' \| 'secondary' \| 'success' \| 'error' \| 'info' \| 'warning'` | `'primary'` | Default color for the confirm button |
| `cancelColor` | `'inherit' \| 'primary' \| 'secondary' \| 'success' \| 'error' \| 'info' \| 'warning'` | `'inherit'` | Default color for the cancel button |
| `buttonVariant` | `'text' \| 'outlined' \| 'contained'` | `'text'` | Default variant for buttons |
| `width` | `string` | - | Default width for the popover |
| `zIndex` | `number` | `1300` | Default z-index for the popover |

#### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `state` | `ConfirmationPopoverState` | Current state of the confirmation popover |
| `show` | `(params: ShowParams) => void` | Show the confirmation popover |
| `hide` | `() => void` | Hide the confirmation popover |
| `getPopoverProps` | `() => ConfirmationPopoverProps` | Get props for the ConfirmationPopover component |
| `isOpen` | `boolean` | Whether the popover is currently open |

## Examples

### Delete Confirmation

```tsx
const deleteConfirmation = useConfirmationPopover({
    confirmText: 'Delete',
    confirmColor: 'error',
    buttonVariant: 'contained'
});

const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    deleteConfirmation.show({
        event,
        message: 'Do you want to delete this note? This action cannot be undone.',
        onConfirm: async () => {
            await deleteNote();
            toast.success('Note deleted successfully');
        }
    });
};
```

### Save Confirmation

```tsx
const saveConfirmation = useConfirmationPopover({
    confirmText: 'Save',
    confirmColor: 'primary',
    buttonVariant: 'contained'
});

const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
    saveConfirmation.show({
        event,
        message: 'Save changes to this document?',
        onConfirm: async () => {
            await saveDocument();
            toast.success('Document saved successfully');
        }
    });
};
```

## Design System Integration

The component automatically uses design system tokens:

- **Spacing**: Uses the spacing scale from `@/lib/theme`
- **Border Radius**: Uses border radius tokens
- **Shadows**: Uses shadow tokens
- **Colors**: Uses semantic color tokens
- **Typography**: Inherits from theme typography

## Accessibility

- Proper focus management
- Keyboard navigation support
- Screen reader friendly
- ARIA attributes automatically applied

## Migration from window.confirm

Replace native browser confirm dialogs:

```tsx
// Before
const handleDelete = () => {
    const confirmed = window.confirm('Are you sure?');
    if (confirmed) {
        deleteItem();
    }
};

// After
const deleteConfirmation = useConfirmationPopover();

const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    deleteConfirmation.show({
        event,
        message: 'Are you sure?',
        onConfirm: () => deleteItem()
    });
};
```