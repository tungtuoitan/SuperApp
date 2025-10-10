# 🎨 STYLING GUIDE - Material-UI Styling Patterns

> **Philosophy**: Use the right tool for the job. Consistency over cleverness.
> 
> **🔗 Related**: See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for design tokens, colors, typography, and UI standards.

---

## 🎯 Styling Methods

### Decision Matrix

| Method | Use For | Example |
|--------|---------|---------|
| **sx prop** | Layout, spacing, quick styles | `<Box sx={{ padding: '16px' }}>` |
| **styled()** | Reusable components, complex styles | `const StyledCard = styled(Card)(...)` |
| **theme** | Global styles, colors, typography | `theme.palette.primary.main` |
| **GlobalStyles** | App-wide CSS resets | Body, html defaults |

---

## 🎨 MUI Theme Configuration

### Theme Setup

The MUI theme is configured using our design system tokens. See the complete configuration in [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md).

### Using Design Tokens

```typescript
// lib/theme/index.ts
import { createTheme } from '@mui/material/styles'
import { colors, semanticColors } from './colors'
import { typography, fonts, fontWeights } from './typography'
import { spacing } from './spacing'
import { shadows } from './shadows'
import { borderRadius } from './borderRadius'

export const theme = createTheme({
    palette: {
        primary: { main: colors.primary[500] },
        secondary: { main: colors.secondary[500] },
        error: { main: colors.error[500] },
        warning: { main: colors.warning[500] },
        info: { main: colors.info[500] },
        success: { main: colors.success[500] },
        text: semanticColors.text,
        background: semanticColors.background,
        divider: semanticColors.divider,
        action: semanticColors.action,
    },
    typography: {
        fontFamily: fonts.primary,
        ...typography,
    },
    spacing: 8, // Base spacing unit (8px)
    shape: {
        borderRadius: parseInt(borderRadius.md), // 8px
    },
    // See DESIGN_SYSTEM.md for complete configuration
})
```

```typescript
import { spacing, colors, shadows, borderRadius } from '@/lib/theme'

// ✅ GOOD: Using design tokens
<Card sx={{
    padding: spacing[6],          // 24px
    backgroundColor: colors.primary[50],
    boxShadow: shadows.sm,
    borderRadius: borderRadius.lg,
}} />

// ❌ BAD: Hardcoded values  
<Card sx={{
    padding: '24px',
    backgroundColor: '#E3F2FD',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    borderRadius: '12px',
}} />
```

### Theme Provider Setup

```typescript
// main.tsx or App.tsx
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from '@/lib/theme'

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline /> {/* Normalize CSS */}
            {/* Your app */}
        </ThemeProvider>
    )
}
```

---

## 📏 Using sx Prop

### When to Use sx

**✅ Use for:**
- Layout (flex, grid)
- Spacing (margin, padding)
- Quick one-off styles
- Responsive design
- Simple state-dependent styles

### Basic Usage

```typescript
// Layout
<Box sx={{ 
    display: 'flex', 
    alignItems: 'center', 
    gap: '16px' 
}}>
    <Button>Click</Button>
</Box>

// Spacing (use pixels directly)
<Box sx={{ 
    padding: '24px',
    margin: '16px 0',
}}>
    Content
</Box>

// Colors from theme
<Typography sx={{ 
    color: 'primary.main',
    backgroundColor: 'background.paper',
}}>
    Text
</Typography>

// Width & Height
<Box sx={{ 
    width: '100%',
    height: '400px',
    maxWidth: '1200px',
}}>
    Content
</Box>
```

### Responsive Design

```typescript
<Box sx={{
    // Mobile first
    padding: '16px',
    
    // Tablet and up
    '@media (min-width: 768px)': {
        padding: '24px',
    },
    
    // Desktop and up
    '@media (min-width: 1024px)': {
        padding: '32px',
    },
    
    // Or use MUI breakpoints
    padding: {
        xs: '16px',  // 0px
        sm: '24px',  // 600px
        md: '32px',  // 900px
        lg: '40px',  // 1200px
        xl: '48px',  // 1536px
    },
}}>
    Content
</Box>
```

### Conditional Styles

```typescript
// Based on props
<Button sx={{
    backgroundColor: isActive ? 'primary.main' : 'grey.300',
    color: isActive ? 'white' : 'text.secondary',
    '&:hover': {
        backgroundColor: isActive ? 'primary.dark' : 'grey.400',
    },
}}>
    Click
</Button>

// Based on state
<Box sx={{
    opacity: isLoading ? 0.5 : 1,
    pointerEvents: isLoading ? 'none' : 'auto',
}}>
    Content
</Box>
```

### Common Patterns

```typescript
// Flexbox centering
<Box sx={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    height: '100vh',
}}>
    <Spinner />
</Box>

// Flex layout
<Box sx={{ 
    display: 'flex', 
    flexDirection: 'column',
    gap: '16px',
}}>
    <Item />
    <Item />
</Box>

// Grid layout
<Box sx={{ 
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
}}>
    <Card />
    <Card />
    <Card />
</Box>

// Scrollable container
<Box sx={{ 
    height: '400px',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: '4px',
    },
}}>
    Content
</Box>
```

---

## 🎭 Using styled()

### When to Use styled()

**✅ Use for:**
- Reusable styled components
- Complex hover/focus states
- Multiple pseudo-selectors
- Component variants
- Shared styles across app

### Basic Usage

```typescript
import { styled } from '@mui/material/styles'
import { Paper, Button } from '@mui/material'

// Styled component
const StyledCard = styled(Paper)(({ theme }) => ({
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'all 0.2s ease',
    
    '&:hover': {
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        transform: 'translateY(-2px)',
    },
}))

// Usage
<StyledCard>
    <Typography>Content</Typography>
</StyledCard>
```

### With Props

```typescript
interface StyledButtonProps {
    variant?: 'primary' | 'secondary' | 'danger'
    size?: 'small' | 'medium' | 'large'
}

const StyledButton = styled(Button)<StyledButtonProps>(({ theme, variant, size }) => ({
    borderRadius: '8px',
    fontWeight: 500,
    textTransform: 'none',
    
    // Size variants
    ...(size === 'small' && {
        padding: '6px 12px',
        fontSize: '0.875rem',
    }),
    ...(size === 'medium' && {
        padding: '8px 16px',
        fontSize: '1rem',
    }),
    ...(size === 'large' && {
        padding: '12px 24px',
        fontSize: '1.125rem',
    }),
    
    // Color variants
    ...(variant === 'primary' && {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
    }),
    ...(variant === 'secondary' && {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
        },
    }),
    ...(variant === 'danger' && {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.error.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
        },
    }),
}))

// Usage
<StyledButton variant="primary" size="medium">
    Click Me
</StyledButton>
```

### Complex Styles

```typescript
const StyledDataGrid = styled('div')(({ theme }) => ({
    height: '100%',
    width: '100%',
    
    '& .MuiDataGrid-root': {
        border: 'none',
        borderRadius: '8px',
    },
    
    '& .MuiDataGrid-columnHeaders': {
        backgroundColor: theme.palette.grey[100],
        borderBottom: `2px solid ${theme.palette.divider}`,
        fontWeight: 600,
    },
    
    '& .MuiDataGrid-row': {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
        '&.Mui-selected': {
            backgroundColor: theme.palette.primary.light + '20',
            '&:hover': {
                backgroundColor: theme.palette.primary.light + '30',
            },
        },
    },
    
    '& .MuiDataGrid-cell': {
        borderBottom: `1px solid ${theme.palette.divider}`,
        '&:focus': {
            outline: 'none',
        },
    },
}))
```

---

## 🎨 Common Styling Patterns

### Pattern 1: Card with Hover Effect

```typescript
const HoverCard = styled(Card)(({ theme }) => ({
    padding: '24px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    
    '&:hover': {
        boxShadow: theme.shadows[4],
        transform: 'translateY(-4px)',
    },
}))
```

### Pattern 2: Status Badge

```typescript
interface StatusBadgeProps {
    status: 'active' | 'inactive' | 'pending'
}

const StatusBadge = styled('span')<StatusBadgeProps>(({ theme, status }) => ({
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '16px',
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    
    ...(status === 'active' && {
        backgroundColor: theme.palette.success.light,
        color: theme.palette.success.dark,
    }),
    ...(status === 'inactive' && {
        backgroundColor: theme.palette.grey[300],
        color: theme.palette.grey[700],
    }),
    ...(status === 'pending' && {
        backgroundColor: theme.palette.warning.light,
        color: theme.palette.warning.dark,
    }),
}))
```

### Pattern 3: Glassmorphism Effect

```typescript
const GlassCard = styled(Paper)(({ theme }) => ({
    padding: '24px',
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
}))
```

### Pattern 4: Sidebar Layout

```typescript
const Sidebar = styled(Box)(({ theme }) => ({
    width: '240px',
    height: '100vh',
    backgroundColor: theme.palette.sidebar.main,
    color: theme.palette.sidebar.contrastText,
    padding: '16px',
    position: 'fixed',
    left: 0,
    top: 0,
    overflowY: 'auto',
    
    '& .menu-item': {
        padding: '12px 16px',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
        
        '&.active': {
            backgroundColor: theme.palette.primary.main,
            fontWeight: 600,
        },
    },
}))
```

### Pattern 5: Loading Skeleton

```typescript
const SkeletonCard = styled(Box)(({ theme }) => ({
    padding: '24px',
    
    '& .skeleton-line': {
        height: '16px',
        backgroundColor: theme.palette.grey[200],
        borderRadius: '4px',
        marginBottom: '12px',
        animation: 'pulse 1.5s ease-in-out infinite',
        
        '&:last-child': {
            width: '60%',
        },
    },
    
    '@keyframes pulse': {
        '0%': {
            opacity: 1,
        },
        '50%': {
            opacity: 0.5,
        },
        '100%': {
            opacity: 1,
        },
    },
}))
```

---

## 📐 Layout Patterns

### Flexbox Patterns

```typescript
// Horizontal layout with gap
<Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
    <Item />
    <Item />
</Box>

// Vertical layout
<Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Item />
    <Item />
</Box>

// Space between
<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <LeftContent />
    <RightContent />
</Box>

// Center content
<Box sx={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    minHeight: '100vh',
}}>
    <Content />
</Box>

// Wrap items
<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
    <Item />
    <Item />
    <Item />
</Box>
```

### Grid Patterns

```typescript
// Equal columns
<Box sx={{ 
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
}}>
    <Card />
    <Card />
    <Card />
</Box>

// Responsive grid
<Box sx={{ 
    display: 'grid',
    gridTemplateColumns: {
        xs: '1fr',           // Mobile: 1 column
        sm: 'repeat(2, 1fr)', // Tablet: 2 columns
        md: 'repeat(3, 1fr)', // Desktop: 3 columns
    },
    gap: '16px',
}}>
    <Card />
    <Card />
    <Card />
</Box>

// Auto-fit grid
<Box sx={{ 
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '16px',
}}>
    <Card />
    <Card />
    <Card />
</Box>

// Complex grid
<Box sx={{ 
    display: 'grid',
    gridTemplateColumns: '240px 1fr',
    gridTemplateRows: '60px 1fr',
    height: '100vh',
    gap: '0',
}}>
    <Box sx={{ gridColumn: '1 / 3', gridRow: '1' }}>Header</Box>
    <Box sx={{ gridColumn: '1', gridRow: '2' }}>Sidebar</Box>
    <Box sx={{ gridColumn: '2', gridRow: '2' }}>Content</Box>
</Box>
```

---

## 🎯 Spacing System

### Using Pixels (Recommended)

```typescript
// ✅ GOOD: Clear and explicit
<Box sx={{ 
    padding: '24px',
    margin: '16px 0',
    gap: '12px',
}} />

// Shorthand
<Box sx={{ 
    p: '24px',    // padding
    m: '16px',    // margin
    mt: '8px',    // margin-top
    mb: '8px',    // margin-bottom
    ml: '16px',   // margin-left
    mr: '16px',   // margin-right
    mx: '16px',   // margin horizontal
    my: '8px',    // margin vertical
}} />
```

### Common Spacing Values

```typescript
// Standard spacing scale
const spacing = {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
}

// Usage
<Box sx={{ 
    padding: '24px',      // lg
    margin: '16px 0',     // md vertical
    gap: '16px',          // md
}} />
```

---

## 🎨 Color Usage

### Using Theme Colors

```typescript
// Primary
<Typography sx={{ color: 'primary.main' }}>Text</Typography>
<Box sx={{ backgroundColor: 'primary.light' }}>Box</Box>

// Secondary
<Typography sx={{ color: 'secondary.main' }}>Text</Typography>

// Error, Warning, Info, Success
<Alert sx={{ backgroundColor: 'error.light' }}>Error</Alert>
<Badge sx={{ backgroundColor: 'success.main' }}>Success</Badge>

// Text colors
<Typography sx={{ color: 'text.primary' }}>Primary text</Typography>
<Typography sx={{ color: 'text.secondary' }}>Secondary text</Typography>
<Typography sx={{ color: 'text.disabled' }}>Disabled text</Typography>

// Grey scale
<Box sx={{ backgroundColor: 'grey.100' }}>Light grey</Box>
<Box sx={{ backgroundColor: 'grey.900' }}>Dark grey</Box>

// Background
<Box sx={{ backgroundColor: 'background.default' }}>Default bg</Box>
<Paper sx={{ backgroundColor: 'background.paper' }}>Paper bg</Paper>

// Custom colors
<Box sx={{ backgroundColor: 'sidebar.main' }}>Sidebar</Box>
```

### Color with Transparency

```typescript
<Box sx={{ 
    backgroundColor: 'rgba(25, 118, 210, 0.1)', // 10% opacity
    border: '1px solid rgba(25, 118, 210, 0.3)',
}} />

// Or use theme with transparency
<Box sx={{ 
    backgroundColor: (theme) => theme.palette.primary.main + '20', // 20 in hex = ~12% opacity
}} />
```

---

## 🚫 Anti-Patterns

### 1. **Don't Use Inline Styles**

```typescript
// ❌ BAD: Inline styles
<div style={{ padding: '16px', color: 'blue' }}>Content</div>

// ✅ GOOD: Use sx
<Box sx={{ padding: '16px', color: 'primary.main' }}>Content</Box>
```

### 2. **Don't Use CSS-in-JS for Simple Layouts**

```typescript
// ❌ BAD: Overkill for simple layout
const StyledContainer = styled('div')({
    display: 'flex',
    gap: '16px',
})

// ✅ GOOD: Use sx for simple cases
<Box sx={{ display: 'flex', gap: '16px' }}>
    Content
</Box>
```

### 3. **Don't Repeat Styles**

```typescript
// ❌ BAD: Repeating same styles
<Button sx={{ borderRadius: '8px', padding: '12px 24px' }}>One</Button>
<Button sx={{ borderRadius: '8px', padding: '12px 24px' }}>Two</Button>

// ✅ GOOD: Create reusable styled component
const RoundButton = styled(Button)({
    borderRadius: '8px',
    padding: '12px 24px',
})

<RoundButton>One</RoundButton>
<RoundButton>Two</RoundButton>
```

### 4. **Don't Mix Styling Approaches**

```typescript
// ❌ BAD: Mixed approaches
<Box 
    sx={{ padding: '16px' }}
    style={{ margin: '8px' }}
    className="custom-box"
>
    Content
</Box>

// ✅ GOOD: Consistent approach
<Box sx={{ padding: '16px', margin: '8px' }}>
    Content
</Box>
```

---

## 📝 Styling Checklist

- [ ] Use sx for layout and spacing
- [ ] Use styled() for reusable components
- [ ] Use pixels (px) for all measurements
- [ ] Use theme colors (no hardcoded colors)
- [ ] Responsive design considered
- [ ] Hover/focus states defined
- [ ] Consistent spacing scale
- [ ] No inline styles
- [ ] No CSS files (use MUI system)
- [ ] Accessible color contrast

---

**Remember**: Consistency is more important than perfection. Pick one approach and stick with it!