/**
 * Shared Button Component
 * Reusable button component with consistent styling and behavior
 */

import React from 'react';
import { Button as MuiButton, CircularProgress } from '@mui/material';
import type { ButtonProps as MuiButtonProps } from '@mui/material';

interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'danger' | 'text';
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
}

export function Button({
    children,
    onClick,
    variant = 'primary',
    disabled = false,
    loading = false,
    fullWidth = false,
    ...props
}: ButtonProps) {
    const getVariantProps = () => {
        switch (variant) {
            case 'primary':
                return { variant: 'contained' as const, color: 'primary' as const };
            case 'secondary':
                return { variant: 'outlined' as const, color: 'primary' as const };
            case 'danger':
                return { variant: 'contained' as const, color: 'error' as const };
            case 'text':
                return { variant: 'text' as const, color: 'primary' as const };
            default:
                return { variant: 'contained' as const, color: 'primary' as const };
        }
    };

    return (
        <MuiButton
            {...getVariantProps()}
            onClick={onClick}
            disabled={disabled || loading}
            fullWidth={fullWidth}
            sx={{
                minWidth: '100px',
                textTransform: 'none',
                fontWeight: 500,
                ...props.sx,
            }}
            {...props}
        >
            {loading ? (
                <CircularProgress size={20} color="inherit" />
            ) : (
                children
            )}
        </MuiButton>
    );
}