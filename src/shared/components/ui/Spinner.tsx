/**
 * Spinner Component
 * Loading spinner with consistent styling
 */

import React from 'react';
import { Box, CircularProgress } from '@mui/material';

interface SpinnerProps {
    size?: number;
    fullPage?: boolean;
    message?: string;
}

export function Spinner({ size = 40, fullPage = false, message }: SpinnerProps) {
    const content = (
        <>
            <CircularProgress size={size} />
            {message && (
                <Box sx={{ mt: 2, textAlign: 'center', color: 'text.secondary' }}>
                    {message}
                </Box>
            )}
        </>
    );

    if (fullPage) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    width: '100%',
                }}
            >
                {content}
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
            }}
        >
            {content}
        </Box>
    );
}