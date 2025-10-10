# 🎨 DESIGN SYSTEM - Design Tokens & Standards

> **Philosophy**: Consistency creates trust. Define once, use everywhere.

---

## 📚 Table of Contents

1. [Color System](#color-system)
2. [Typography](#typography)
3. [Spacing System](#spacing-system)
4. [Shadows & Elevation](#shadows--elevation)
5. [Border Radius](#border-radius)
6. [Breakpoints](#breakpoints)
7. [Z-Index Scale](#z-index-scale)
8. [Transitions & Animations](#transitions--animations)
9. [Icons](#icons)
10. [Usage Examples](#usage-examples)

---

## 🎨 Color System

### Primary Colors

```typescript
// lib/theme/colors.ts

export const colors = {
    // Primary - Brand color
    primary: {
        50: '#E3F2FD',
        100: '#BBDEFB',
        200: '#90CAF9',
        300: '#64B5F6',
        400: '#42A5F5',
        500: '#1976D2',  // Main
        600: '#1565C0',
        700: '#0D47A1',
        800: '#0A3D91',
        900: '#073282',
    },

    // Secondary - Accent color
    secondary: {
        50: '#F3E5F5',
        100: '#E1BEE7',
        200: '#CE93D8',
        300: '#BA68C6',
        400: '#AB47BC',
        500: '#9C27B0',  // Main
        600: '#8E24AA',
        700: '#7B1FA2',
        800: '#6A1B9A',
        900: '#4A148C',
    },

    // Neutral - Grays
    neutral: {
        50: '#FAFAFA',
        100: '#F5F5F5',
        200: '#EEEEEE',
        300: '#E0E0E0',
        400: '#BDBDBD',
        500: '#9E9E9E',  // Main
        600: '#757575',
        700: '#616161',
        800: '#424242',
        900: '#212121',
    },

    // Success - Green
    success: {
        50: '#E8F5E9',
        100: '#C8E6C9',
        200: '#A5D6A7',
        300: '#81C784',
        400: '#66BB6A',
        500: '#4CAF50',  // Main
        600: '#43A047',
        700: '#388E3C',
        800: '#2E7D32',
        900: '#1B5E20',
    },

    // Warning - Orange
    warning: {
        50: '#FFF3E0',
        100: '#FFE0B2',
        200: '#FFCC80',
        300: '#FFB74D',
        400: '#FFA726',
        500: '#FF9800',  // Main
        600: '#FB8C00',
        700: '#F57C00',
        800: '#EF6C00',
        900: '#E65100',
    },

    // Error - Red
    error: {
        50: '#FFEBEE',
        100: '#FFCDD2',
        200: '#EF9A9A',
        300: '#E57373',
        400: '#EF5350',
        500: '#F44336',  // Main
        600: '#E53935',
        700: '#D32F2F',
        800: '#C62828',
        900: '#B71C1C',
    },

    // Info - Blue
    info: {
        50: '#E1F5FE',
        100: '#B3E5FC',
        200: '#81D4FA',
        300: '#4FC3F7',
        400: '#29B6F6',
        500: '#03A9F4',  // Main
        600: '#039BE5',
        700: '#0288D1',
        800: '#0277BD',
        900: '#01579B',
    },
} as const

// Semantic colors (mapped from base colors)
export const semanticColors = {
    // Text
    text: {
        primary: colors.neutral[900],
        secondary: colors.neutral[600],
        disabled: colors.neutral[400],
        inverse: '#FFFFFF',
    },

    // Background
    background: {
        default: '#FAFAFA',
        paper: '#FFFFFF',
        elevated: '#FFFFFF',
        overlay: 'rgba(0, 0, 0, 0.5)',
    },

    // Border
    border: {
        light: colors.neutral[200],
        main: colors.neutral[300],
        dark: colors.neutral[400],
    },

    // Action
    action: {
        active: colors.primary[500],
        hover: 'rgba(0, 0, 0, 0.04)',
        selected: 'rgba(25, 118, 210, 0.08)',
        disabled: colors.neutral[300],
        disabledBackground: colors.neutral[100],
        focus: 'rgba(25, 118, 210, 0.12)',
    },

    // Divider
    divider: colors.neutral[200],
} as const
```

### Color Usage Guidelines

```typescript
// ✅ GOOD: Use semantic colors
<Typography sx={{ color: 'text.primary' }}>Text</Typography>
<Box sx={{ backgroundColor: 'background.paper' }}>Content</Box>

// ✅ GOOD: Use theme colors
<Button sx={{ backgroundColor: 'primary.main' }}>Click</Button>

// ❌ BAD: Hardcoded colors
<Typography sx={{ color: '#212121' }}>Text</Typography>
<Box sx={{ backgroundColor: 'white' }}>Content</Box>
```

---

## 📝 Typography

### Font Families

```typescript
// lib/theme/typography.ts

export const fonts = {
    // Primary font (UI)
    primary: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    
    // Secondary font (Headings)
    secondary: '"Poppins", "Inter", "Roboto", sans-serif',
    
    // Monospace (Code)
    mono: '"Fira Code", "Consolas", "Monaco", monospace',
} as const

// Font imports (add to index.html)
// <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
// <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
```

### Font Sizes & Line Heights

```typescript
export const typography = {
    // Display (Extra large headings)
    display1: {
        fontSize: '3.5rem',      // 56px
        lineHeight: 1.2,
        fontWeight: 700,
        letterSpacing: '-0.02em',
    },
    display2: {
        fontSize: '3rem',        // 48px
        lineHeight: 1.2,
        fontWeight: 700,
        letterSpacing: '-0.01em',
    },

    // Headings
    h1: {
        fontSize: '2.5rem',      // 40px
        lineHeight: 1.3,
        fontWeight: 600,
        letterSpacing: '-0.01em',
    },
    h2: {
        fontSize: '2rem',        // 32px
        lineHeight: 1.3,
        fontWeight: 600,
        letterSpacing: '-0.005em',
    },
    h3: {
        fontSize: '1.75rem',     // 28px
        lineHeight: 1.4,
        fontWeight: 600,
        letterSpacing: '0',
    },
    h4: {
        fontSize: '1.5rem',      // 24px
        lineHeight: 1.4,
        fontWeight: 600,
        letterSpacing: '0',
    },
    h5: {
        fontSize: '1.25rem',     // 20px
        lineHeight: 1.5,
        fontWeight: 600,
        letterSpacing: '0',
    },
    h6: {
        fontSize: '1rem',        // 16px
        lineHeight: 1.5,
        fontWeight: 600,
        letterSpacing: '0',
    },

    // Body text
    body1: {
        fontSize: '1rem',        // 16px
        lineHeight: 1.5,
        fontWeight: 400,
        letterSpacing: '0',
    },
    body2: {
        fontSize: '0.875rem',    // 14px
        lineHeight: 1.43,
        fontWeight: 400,
        letterSpacing: '0',
    },

    // Small text
    caption: {
        fontSize: '0.75rem',     // 12px
        lineHeight: 1.66,
        fontWeight: 400,
        letterSpacing: '0.03em',
    },
    overline: {
        fontSize: '0.75rem',     // 12px
        lineHeight: 2.66,
        fontWeight: 500,
        letterSpacing: '0.08em',
        textTransform: 'uppercase' as const,
    },

    // Button
    button: {
        fontSize: '0.875rem',    // 14px
        lineHeight: 1.75,
        fontWeight: 500,
        letterSpacing: '0.02em',
        textTransform: 'none' as const,
    },

    // Code
    code: {
        fontSize: '0.875rem',    // 14px
        lineHeight: 1.6,
        fontWeight: 400,
        fontFamily: fonts.mono,
    },
} as const

// Font weights
export const fontWeights = {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
} as const
```

### Typography Usage

```typescript
// ✅ GOOD: Using typography variants
<Typography variant="h1">Page Title</Typography>
<Typography variant="body1">Regular text</Typography>
<Typography variant="caption">Small text</Typography>

// ✅ GOOD: Custom typography
<Typography sx={{
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: 1.4,
}}>
    Custom text
</Typography>
```

---

## 📏 Spacing System

### Base Spacing Scale (8px base)

```typescript
// lib/theme/spacing.ts

export const spacing = {
    0: '0px',
    1: '4px',      // 0.5 * 8
    2: '8px',      // 1 * 8
    3: '12px',     // 1.5 * 8
    4: '16px',     // 2 * 8
    5: '20px',     // 2.5 * 8
    6: '24px',     // 3 * 8
    7: '28px',     // 3.5 * 8
    8: '32px',     // 4 * 8
    9: '36px',     // 4.5 * 8
    10: '40px',    // 5 * 8
    12: '48px',    // 6 * 8
    16: '64px',    // 8 * 8
    20: '80px',    // 10 * 8
    24: '96px',    // 12 * 8
    32: '128px',   // 16 * 8
    40: '160px',   // 20 * 8
    48: '192px',   // 24 * 8
    56: '224px',   // 28 * 8
    64: '256px',   // 32 * 8
} as const

// Semantic spacing (common use cases)
export const semanticSpacing = {
    // Component spacing
    componentPadding: spacing[6],      // 24px
    componentGap: spacing[4],          // 16px
    
    // Container spacing
    containerPadding: {
        mobile: spacing[4],            // 16px
        tablet: spacing[6],            // 24px
        desktop: spacing[8],           // 32px
    },
    
    // Section spacing
    sectionMargin: {
        small: spacing[8],             // 32px
        medium: spacing[12],           // 48px
        large: spacing[16],            // 64px
    },
    
    // Element spacing
    elementGap: {
        tiny: spacing[1],              // 4px
        small: spacing[2],             // 8px
        medium: spacing[4],            // 16px
        large: spacing[6],             // 24px
    },
} as const
```

### Spacing Usage

```typescript
// ✅ GOOD: Using spacing tokens
<Box sx={{ padding: '24px', margin: '16px 0', gap: '16px' }} />

// ✅ GOOD: Responsive spacing
<Box sx={{
    padding: {
        xs: '16px',
        md: '24px',
        lg: '32px',
    },
}} />
```

---

## 🌓 Shadows & Elevation

### Shadow Scale

```typescript
// lib/theme/shadows.ts

export const shadows = {
    none: 'none',
    
    // Subtle shadows
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    
    // Default shadow
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    
    // Medium shadows
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    
    // Large shadows
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    
    // Inner shadow
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    
    // Elevation shadows (MUI style)
    elevation1: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    elevation2: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
    elevation3: '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
    elevation4: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    elevation6: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
    elevation8: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
    elevation12: '0px 7px 8px -4px rgba(0,0,0,0.2), 0px 12px 17px 2px rgba(0,0,0,0.14), 0px 5px 22px 4px rgba(0,0,0,0.12)',
    elevation16: '0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12)',
    elevation24: '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)',
} as const

// Semantic shadows
export const semanticShadows = {
    card: shadows.sm,
    cardHover: shadows.lg,
    dialog: shadows.elevation24,
    dropdown: shadows.lg,
    tooltip: shadows.md,
    button: shadows.sm,
    buttonHover: shadows.md,
} as const
```

---

## 🔲 Border Radius

```typescript
// lib/theme/borderRadius.ts

export const borderRadius = {
    none: '0px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
    full: '9999px',  // Fully rounded
} as const

// Semantic border radius
export const semanticBorderRadius = {
    button: borderRadius.md,
    card: borderRadius.lg,
    input: borderRadius.md,
    dialog: borderRadius.xl,
    chip: borderRadius.full,
    avatar: borderRadius.full,
} as const
```

---

## 📱 Breakpoints

```typescript
// lib/theme/breakpoints.ts

export const breakpoints = {
    xs: 0,       // Extra small (phone)
    sm: 600,     // Small (tablet)
    md: 900,     // Medium (small laptop)
    lg: 1200,    // Large (desktop)
    xl: 1536,    // Extra large (large desktop)
} as const

// Media queries
export const mediaQueries = {
    xs: `@media (min-width: ${breakpoints.xs}px)`,
    sm: `@media (min-width: ${breakpoints.sm}px)`,
    md: `@media (min-width: ${breakpoints.md}px)`,
    lg: `@media (min-width: ${breakpoints.lg}px)`,
    xl: `@media (min-width: ${breakpoints.xl}px)`,
} as const

// Container max widths
export const containerMaxWidth = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
} as const
```

---

## 📚 Z-Index Scale

```typescript
// lib/theme/zIndex.ts

export const zIndex = {
    hide: -1,
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modalBackdrop: 1300,
    modal: 1400,
    popover: 1500,
    tooltip: 1600,
    notification: 1700,
} as const
```

---

## ⚡ Transitions & Animations

```typescript
// lib/theme/transitions.ts

export const transitions = {
    // Durations
    duration: {
        fastest: '100ms',
        fast: '200ms',
        normal: '300ms',
        slow: '400ms',
        slowest: '500ms',
    },

    // Timing functions
    easing: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },

    // Common transitions
    common: {
        short: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
        standard: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
        complex: '400ms cubic-bezier(0.4, 0, 0.2, 1)',
    },
} as const

// Predefined transitions
export const commonTransitions = {
    fade: `opacity ${transitions.duration.normal} ${transitions.easing.easeInOut}`,
    slide: `transform ${transitions.duration.normal} ${transitions.easing.easeInOut}`,
    grow: `transform ${transitions.duration.normal} ${transitions.easing.easeInOut}`,
    all: `all ${transitions.duration.normal} ${transitions.easing.easeInOut}`,
} as const
```

---

## 🎯 Icons

```typescript
// Icon sizes
export const iconSizes = {
    xs: '16px',
    sm: '20px',
    md: '24px',
    lg: '32px',
    xl: '40px',
} as const

// Using Material Icons or Lucide React
import { Home, Settings, User } from 'lucide-react'

<Home size={24} />
<Settings size={20} />
```

---

## 🎨 Complete MUI Theme Configuration

```typescript
// lib/theme/index.ts
import { createTheme } from '@mui/material/styles'
import { colors, semanticColors } from './colors'
import { typography, fonts, fontWeights } from './typography'
import { spacing } from './spacing'
import { shadows } from './shadows'
import { borderRadius } from './borderRadius'
import { breakpoints } from './breakpoints'
import { zIndex } from './zIndex'

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: colors.primary[500],
            light: colors.primary[300],
            dark: colors.primary[700],
            contrastText: '#fff',
        },
        secondary: {
            main: colors.secondary[500],
            light: colors.secondary[300],
            dark: colors.secondary[700],
            contrastText: '#fff',
        },
        error: {
            main: colors.error[500],
            light: colors.error[300],
            dark: colors.error[700],
        },
        warning: {
            main: colors.warning[500],
            light: colors.warning[300],
            dark: colors.warning[700],
        },
        info: {
            main: colors.info[500],
            light: colors.info[300],
            dark: colors.info[700],
        },
        success: {
            main: colors.success[500],
            light: colors.success[300],
            dark: colors.success[700],
        },
        text: semanticColors.text,
        background: semanticColors.background,
        divider: semanticColors.divider,
        action: semanticColors.action,
    },

    typography: {
        fontFamily: fonts.primary,
        fontSize: 14,
        ...typography,
    },

    spacing: 8, // Base spacing unit

    shape: {
        borderRadius: 8,
    },

    breakpoints: {
        values: breakpoints,
    },

    zIndex: {
        ...zIndex,
    },

    shadows: [
        'none',
        shadows.elevation1,
        shadows.elevation2,
        shadows.elevation3,
        shadows.elevation4,
        shadows.elevation4,
        shadows.elevation6,
        shadows.elevation6,
        shadows.elevation8,
        shadows.elevation8,
        shadows.elevation8,
        shadows.elevation8,
        shadows.elevation12,
        shadows.elevation12,
        shadows.elevation12,
        shadows.elevation12,
        shadows.elevation16,
        shadows.elevation16,
        shadows.elevation16,
        shadows.elevation16,
        shadows.elevation16,
        shadows.elevation16,
        shadows.elevation24,
        shadows.elevation24,
        shadows.elevation24,
    ] as any,

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: fontWeights.medium,
                    borderRadius: borderRadius.md,
                    padding: `${spacing[2]} ${spacing[4]}`,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: borderRadius.lg,
                    boxShadow: shadows.sm,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: borderRadius.md,
                    },
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: borderRadius.xl,
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: borderRadius.full,
                },
            },
        },
    },
})

export * from './colors'
export * from './typography'
export * from './spacing'
export * from './shadows'
export * from './borderRadius'
export * from './breakpoints'
export * from './zIndex'
export * from './transitions'
```

---

## 💡 Usage Examples

### Example 1: Card Component

```typescript
import { Card, Typography } from '@mui/material'
import { colors, spacing, borderRadius, shadows } from '@/lib/theme'

function ProductCard() {
    return (
        <Card sx={{
            padding: spacing[6],
            borderRadius: borderRadius.lg,
            boxShadow: shadows.sm,
            transition: 'all 0.2s ease',
            '&:hover': {
                boxShadow: shadows.lg,
                transform: 'translateY(-2px)',
            },
        }}>
            <Typography variant="h5" sx={{ color: 'text.primary', mb: spacing[2] }}>
                Product Name
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Product description
            </Typography>
        </Card>
    )
}
```

### Example 2: Button with Custom Colors

```typescript
import { Button } from '@mui/material'
import { colors, spacing, borderRadius } from '@/lib/theme'

function CustomButton() {
    return (
        <Button sx={{
            backgroundColor: colors.primary[500],
            color: '#fff',
            padding: `${spacing[3]} ${spacing[6]}`,
            borderRadius: borderRadius.md,
            '&:hover': {
                backgroundColor: colors.primary[600],
            },
        }}>
            Click Me
        </Button>
    )
}
```

### Example 3: Responsive Layout

```typescript
import { Box, Container } from '@mui/material'
import { spacing, breakpoints } from '@/lib/theme'

function ResponsiveLayout() {
    return (
        <Container maxWidth="lg">
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                },
                gap: spacing[4],
                padding: {
                    xs: spacing[4],
                    md: spacing[6],
                    lg: spacing[8],
                },
            }}>
                {/* Grid items */}
            </Box>
        </Container>
    )
}
```

---

## 📝 Design Tokens Checklist

When adding new components:

- [ ] Uses design system colors
- [ ] Uses typography scale
- [ ] Uses spacing scale
- [ ] Uses appropriate shadows
- [ ] Uses consistent border radius
- [ ] Responsive design implemented
- [ ] Transitions/animations added
- [ ] Accessible color contrast
- [ ] Hover/focus states defined
- [ ] Works in light/dark mode (if applicable)

---

**Remember**: A good design system makes development faster and ensures consistency!