/**
 * Design System - Complete MUI Theme Configuration
 * Main theme export combining all design tokens
 */

import { createTheme } from '@mui/material/styles'
import { colors, semanticColors } from './colors'
import { typography, fonts, fontWeights } from './typography'
import { spacing } from './spacing'
import { shadows } from './shadows'
import { borderRadius } from './borderRadius'
import { breakpoints } from './breakpoints'
import { zIndex } from './zIndex'

// Extend MUI theme for custom sidebar colors (legacy compatibility)
declare module '@mui/material/styles' {
    interface Palette {
        sidebar: {
            main: string;
            light: string;
            dark: string;
            contrastText: string;
        };
    }
    interface PaletteOptions {
        sidebar?: {
            main?: string;
            light?: string;
            dark?: string;
            contrastText?: string;
        };
    }
}

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
        // Custom sidebar colors (legacy compatibility)
        sidebar: {
            main: '#36454f',
            light: '#4a5a6a',
            dark: '#2a3840',
            contrastText: '#fff',
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
        borderRadius: parseInt(borderRadius.md), // 8px
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

// For backward compatibility with existing dataGridStyles
export const dataGridStyles = {
    root: {
        '& .MuiDataGrid-columnHeader': {
            height: '52px',
            backgroundColor: colors.neutral[50],
            borderColor: colors.neutral[200],
        },
        '& .MuiDataGrid-row': {
            height: '50px',
            '&:hover': {
                backgroundColor: colors.neutral[50],
            },
            '&.Mui-selected': {
                backgroundColor: colors.primary[50],
                '&:hover': {
                    backgroundColor: colors.primary[100],
                },
            },
        },
        '& .MuiDataGrid-cell': {
            borderWidth: '1px',
            borderColor: colors.neutral[200],
        },
    },
} as const