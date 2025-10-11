# GenericTagAutoComplete Component

A reusable multi-select autocomplete component for tags that handles comma-separated string values and automatically filters out already selected options.

## Features

- ✅ Multi-select functionality
- ✅ Automatic filtering of selected options
- ✅ Support for disabled options (`isActive: false`)
- ✅ Comma-separated string value handling
- ✅ Full TypeScript support
- ✅ Comprehensive testing
- ✅ Accessible design
- ✅ Customizable styling

## Usage

### Basic Usage

```tsx
import { GenericTagAutoComplete } from '@/shared/components/ui';

function MyComponent() {
    const [selectedTags, setSelectedTags] = useState<string>('');
    
    const tagOptions = [
        { id: '1', label: 'React', isActive: true },
        { id: '2', label: 'TypeScript', isActive: true },
        { id: '3', label: 'Material-UI', isActive: true },
    ];

    return (
        <GenericTagAutoComplete
            options={tagOptions}
            value={selectedTags}
            onChange={setSelectedTags}
            label="Tags"
            placeholder="+ Add Tag"
        />
    );
}
```

### With Form Integration

```tsx
import { GenericTagAutoComplete } from '@/shared/components/ui';
import { useFormik } from 'formik';

function FormExample() {
    const formik = useFormik({
        initialValues: {
            tags: '',
            // other fields...
        },
        onSubmit: (values) => {
            console.log('Selected tags:', values.tags); // e.g., "1,3,5"
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <GenericTagAutoComplete
                options={tagOptions}
                value={formik.values.tags}
                onChange={(newTags) => formik.setFieldValue('tags', newTags)}
                label="Project Tags"
                placeholder="+ Add Tag"
                disabled={formik.isSubmitting}
            />
            {/* other form fields... */}
        </form>
    );
}
```

### With Store Integration

```tsx
// In your component
function StyleForm() {
    const { styleDetailInput, setStyleDetailInput } = useStyleDetailStore();
    const { tagsOptions } = useStyleMilestoneStore();

    return (
        <GenericTagAutoComplete
            options={tagsOptions}
            value={styleDetailInput.tags}
            onChange={(newTags) => setStyleDetailInput({ isDirty: true, tags: newTags })}
            disabled={!isEdit}
            label="Style Tags"
            placeholder="+ Add Tag"
            data-testid="style-tags-autocomplete"
        />
    );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `IAutoCompleteOptions[]` | - | Array of available tag options |
| `value` | `string \| null` | - | Currently selected tags as comma-separated string |
| `onChange` | `(tagsString: string) => void` | - | Callback when tags change - receives comma-separated string of IDs |
| `disabled` | `boolean` | `false` | Whether the component is disabled |
| `label` | `string` | `'Tags'` | Label for the input field |
| `placeholder` | `string` | `'+ Add Tag'` | Placeholder text |
| `sx` | `any` | `{ marginTop: '15px' }` | Additional styling |
| `size` | `'small' \| 'medium'` | `'small'` | Size of the component |
| `data-testid` | `string` | - | Test ID for testing purposes |

## IAutoCompleteOptions Interface

```typescript
interface IAutoCompleteOptions {
    label: string;
    id: number | string;
    isActive?: boolean;
    type?: string;
    description?: string;
    level?: number;
}
```

## Data Flow

### Input Format
The component expects a comma-separated string of IDs:
```typescript
value="1,3,5" // Represents tags with IDs 1, 3, and 5
```

### Output Format
The `onChange` callback receives a comma-separated string:
```typescript
onChange("1,2,4") // When user selects tags with IDs 1, 2, and 4
```

### Option Filtering
The component automatically:
1. Shows only unselected options in the dropdown
2. Displays selected options as chips in the input
3. Handles disabled options (`isActive: false`)

## Styling

### Default Styling
The component uses Material-UI's default styling with minimal customization:

```tsx
<GenericTagAutoComplete
    options={options}
    onChange={onChange}
    sx={{ marginTop: '15px' }} // Default
/>
```

### Custom Styling
You can override styles using the `sx` prop:

```tsx
<GenericTagAutoComplete
    options={options}
    onChange={onChange}
    sx={{
        marginTop: '20px',
        '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: 'background.paper',
        },
        '& .MuiChip-root': {
            backgroundColor: 'primary.light',
        },
    }}
/>
```

## Testing

### Component Testing
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GenericTagAutoComplete } from './TagAutoComplete';

test('selects and deselects tags', async () => {
    const mockOnChange = jest.fn();
    const options = [
        { id: '1', label: 'Tag 1' },
        { id: '2', label: 'Tag 2' },
    ];

    render(
        <GenericTagAutoComplete
            options={options}
            onChange={mockOnChange}
            data-testid="tag-autocomplete"
        />
    );

    // Open dropdown
    const input = screen.getByTestId('tag-autocomplete');
    await userEvent.click(input);

    // Select a tag
    await userEvent.click(screen.getByText('Tag 1'));

    expect(mockOnChange).toHaveBeenCalledWith('1');
});
```

### Integration Testing
```typescript
test('integrates with form state', () => {
    const mockSetTags = jest.fn();
    
    render(
        <GenericTagAutoComplete
            options={tagOptions}
            value="1,2"
            onChange={mockSetTags}
        />
    );

    // Verify selected tags are displayed
    expect(screen.getByText('Tag 1')).toBeInTheDocument();
    expect(screen.getByText('Tag 2')).toBeInTheDocument();
});
```

## Accessibility

The component follows Material-UI's accessibility guidelines:

- ✅ Proper ARIA labels
- ✅ Keyboard navigation support
- ✅ Screen reader compatibility
- ✅ Focus management
- ✅ Disabled state indication

## Performance Considerations

- Uses React's built-in optimization for option filtering
- Memoizes filtered options automatically
- Minimal re-renders with proper prop handling

## Common Patterns

### Converting to/from Array Format
If you need to work with arrays instead of comma-separated strings:

```typescript
// Convert comma-separated string to array
const tagsArray = tags ? tags.split(',') : [];

// Convert array to comma-separated string
const tagsString = tagsArray.join(',');

// Using with the component
<GenericTagAutoComplete
    options={options}
    value={tagsArray.join(',')}
    onChange={(newTags) => {
        const tagsArray = newTags ? newTags.split(',') : [];
        setMyTags(tagsArray);
    }}
/>
```

### Validation
```typescript
// Validate minimum number of tags
const validateTags = (value: string) => {
    const count = value ? value.split(',').length : 0;
    return count >= 2 ? undefined : 'Please select at least 2 tags';
};
```

### Loading State
```typescript
function TagsWithLoading() {
    const { data: options, isLoading } = useTagOptions();
    
    if (isLoading) return <Skeleton variant="rectangular" height={56} />;
    
    return (
        <GenericTagAutoComplete
            options={options || []}
            value={selectedTags}
            onChange={setSelectedTags}
        />
    );
}
```

## Migration from Original Code

If you're migrating from the original inline Autocomplete:

### Before
```typescript
<Autocomplete
    multiple
    options={tagsOptions.filter(option => !styleDetailInput.tags.includes(option.id))}
    value={tagsOptions.filter(option => styleDetailInput.tags.includes(option.id))}
    onChange={(event: any, newValue: IAutoCompleteOptions[] | null) => {
        if (newValue === null) {
            console.log('No options selected');
        } else {
            const idsString = newValue.map((option) => option.id).join(',');
            setStyleDetailInput({ isDirty: true, tags: idsString })
        }
    }}
    renderOption={renderOptions}
    getOptionLabel={(option) => option.label}
    renderInput={(params) => (
        <TextField {...params} label="Tags" placeholder="+ Add Tag" />
    )}
/>
```

### After
```typescript
<GenericTagAutoComplete
    options={tagsOptions}
    value={styleDetailInput.tags}
    onChange={(newTags) => setStyleDetailInput({ isDirty: true, tags: newTags })}
    label="Tags"
    placeholder="+ Add Tag"
/>
```

## Troubleshooting

### Common Issues

1. **Tags not showing as selected**
   - Check that the `value` prop contains the correct comma-separated string
   - Ensure the IDs in the value match the IDs in the options

2. **Options not filtering correctly**
   - Verify that the `id` field in options matches the format expected (string/number)
   - Check for type mismatches between string and number IDs

3. **onChange not firing**
   - Ensure the onChange prop is properly passed and not undefined
   - Check that the component isn't disabled

### Debug Tips

```typescript
// Add debug logging
<GenericTagAutoComplete
    options={options}
    value={value}
    onChange={(newValue) => {
        console.log('GenericTagAutoComplete onChange:', newValue);
        onChange(newValue);
    }}
/>
```