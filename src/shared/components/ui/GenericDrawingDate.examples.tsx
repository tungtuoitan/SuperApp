import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { GenericDrawingDate } from './GenericDrawingDate';
import { spacing } from '@/lib/theme';

/**
 * Examples showcasing the GenericDrawingDate component usage.
 * Demonstrates both size variants and various states.
 */
export const GenericDrawingDateExamples = () => {
    const [smallDate, setSmallDate] = useState<Date | null>(new Date());
    const [tinyDate, setTinyDate] = useState<Date | null>(new Date());
    const [errorDate, setErrorDate] = useState<Date | null>(null);

    return (
        <Box sx={{ 
            padding: spacing[5], 
            display: 'flex', 
            flexDirection: 'column', 
            gap: spacing[5] 
        }}>
            <Typography variant="h6">GenericDrawingDate Examples</Typography>
            
            <Box>
                <Typography variant="subtitle1" sx={{ mb: spacing[2] }}>
                    Small Size (Default - GenericTextField compatible):
                </Typography>
                <GenericDrawingDate
                    size="small"
                    label="Start Date"
                    name="startDate"
                    value={smallDate}
                    onChange={setSmallDate}
                />
            </Box>

            <Box>
                <Typography variant="subtitle1" sx={{ mb: spacing[2] }}>
                    Tiny Size (CADDrawings compatible):
                </Typography>
                <GenericDrawingDate
                    size="tiny"
                    label="Drawing Date"
                    name="drawingDate"
                    value={tinyDate}
                    onChange={setTinyDate}
                />
            </Box>

            <Box>
                <Typography variant="subtitle1" sx={{ mb: spacing[2] }}>
                    Tiny Size with Error:
                </Typography>
                <GenericDrawingDate
                    size="tiny"
                    label="Due Date"
                    name="dueDate"
                    value={errorDate}
                    onChange={setErrorDate}
                    error={!errorDate}
                />
            </Box>

            <Box>
                <Typography variant="subtitle1" sx={{ mb: spacing[2] }}>
                    Disabled State:
                </Typography>
                <GenericDrawingDate
                    size="small"
                    label="Disabled Date"
                    name="disabledDate"
                    value={new Date()}
                    disabled={true}
                />
            </Box>

            <Box>
                <Typography variant="subtitle1" sx={{ mb: spacing[2] }}>
                    Custom Format (European style):
                </Typography>
                <GenericDrawingDate
                    size="small"
                    label="European Date"
                    name="europeanDate"
                    format="dd/MM/yyyy"
                    value={new Date()}
                    onChange={() => {}}
                />
            </Box>
        </Box>
    );
};

export default GenericDrawingDateExamples;