// 1. React and third-party libraries
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Chip, Box } from '@mui/material';

// 2. Internal hooks
import { useDialogHelpers, useNoteHelpers } from '../../hooks';
import { useNoteStore } from '../../store/notes/NoteStore';
import { useDialogStore } from '../../store/dialog/DialogStore';

// 3. Internal types
import type { Note } from '../../types';

// 4. Internal config
import { dataGridStyles } from '../../config/theme';

// 5. Components
import NoteDetailDialog from './NoteDetailDialog';

/**
 * Props interface for the NoteGrid component.
 */
interface NoteGridProps {
    /** Optional array of notes to display. If not provided, notes will be fetched from API */
    notesProp?: Note[];
}

/**
 * Note grid component for displaying and managing notes in a data grid.
 * 
 * This component provides a comprehensive interface for note management with:
 * - Data grid display with sortable columns
 * - Note details dialog for viewing/editing
 * - CRUD operations (create, read, update, delete)
 * - Type-based color coding for notes
 * - Responsive design with proper cell rendering
 * - Error handling and loading states
 * 
 * The component can work with provided notes or fetch them from the API
 * using the useNotes hook. It integrates with the note detail dialog
 * for editing functionality.
 * 
 * @param props - Component props containing optional notes array
 * @returns Data grid component with note management functionality
 */
export function NoteGrid({ notesProp }: NoteGridProps) {
    // Get state from NoteStore
    const {
        notes,
        loading,
        error,
        searchText,
        setSearchText,
        loadingMasterGrid,
        setLoadingMasterGrid,
        refreshMasterGrid,
        setRefreshMasterGrid,
        pageSize,
        setPageSize,
        currentPage,
        setCurrentPage
    } = useNoteStore();
    
    // Get helper functions from useNoteHelpers
    const { createNote, updateNote, deleteNote } = useNoteHelpers();
    
    // Get dialog helper functions
    const { openDialog, closeDialog } = useDialogHelpers<Note>();
    
    // Get dialog state from DialogStore
    const { open, data } = useDialogStore();

    // Use provided notes or fetched notes
    const displayNotes = notesProp || notes;

    // Sort notes by createdAt date (latest first)
    const sortedNotes = [...(displayNotes ?? [])].sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    const handleNoteClick = (note: Note) => {
        openDialog(note);
    };

    const handleDialogClose = () => {
        closeDialog();
    };

    const handleNoteSave = async (updatedNote: Note) => {
        try {
            if (updatedNote.noteId && updatedNote.noteId > 0) {
                // Update existing note
                await updateNote(updatedNote.noteId, {
                    noteId: updatedNote.noteId,
                    name: updatedNote.name,
                    description: updatedNote.description,
                    tags: updatedNote.tags,
                    type: updatedNote.type,
                });
            } else {
                // Create new note
                await createNote({
                    name: updatedNote.name,
                    description: updatedNote.description,
                    tags: updatedNote.tags,
                    type: updatedNote.type,
                    createdBy: updatedNote.createdBy,
                });
            }
            closeDialog();
        } catch (err) {
            // Error is already handled by the useNotes hook
            console.error('Error saving note:', err);
        }
    };

    const handleNoteDelete = async (noteId: number) => {
        try {
            await deleteNote(noteId);
            closeDialog();
        } catch (err) {
            console.error('Error deleting note:', err);
        }
    };

    const formatDate = (date: Date): string => {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(date);
    };

    const getTypeColor = (type?: string): 'primary' | 'warning' | 'info' | 'error' | 'default' => {
        const colors: Record<string, 'primary' | 'warning' | 'info' | 'error' | 'default'> = {
            'Meeting': 'primary',
            'Brainstorm': 'warning',
            'Research': 'info',
            'Bug': 'error',
            'default': 'default'
        };
        return colors[type || 'default'] || colors.default;
    };

    const columns: GridColDef[] = [
        { 
            field: 'noteId', 
            headerName: 'ID', 
            width: 40,
            type: 'number'
        },
        {
            field: 'name',
            headerName: 'Note Name',
            width: 400,
            renderCell: (params) => (
                <Box
                    sx={{
                        cursor: 'pointer',
                        color: 'primary.main',
                        textDecoration: 'underline',
                        fontWeight: 500
                    }}
                    onClick={() => handleNoteClick(params.row)}
                >
                    {params.value}
                </Box>
            )
        },
        {
            field: 'type',
            headerName: 'Type',
            width: 120,
            renderCell: (params) => (
                <Chip 
                    label={params.value || 'N/A'} 
                    color={getTypeColor(params.value) as any}
                    size="small"
                    variant="outlined"
                />
            )
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 500,
            renderCell: (params) => (
                <Box sx={{
                    whiteSpace: 'normal',
                    wordWrap: 'break-word',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                }}>
                    {params.value || 'No description'}
                </Box>
            )
        },
        {
            field: 'tags',
            headerName: 'Tags',
            width: 200,
            renderCell: (params) => {
                if (!params.value) return <Box sx={{ padding: '4px' }}>No tags</Box>;

                const tags = params.value.split(',');
                const displayTags = tags.slice(0, 2);
                const remainingCount = tags.length - 2;

                return (
                    <Box sx={{
                        display: 'flex',
                        gap: '4px',
                        flexWrap: 'wrap',
                        padding: '4px',
                        alignItems: 'center'
                    }}>
                        {displayTags.map((tag: string, index: number) => (
                            <Chip
                                key={`${params.row.noteId}-${index}`}
                                label={`#${tag.trim()}`}
                                size="small"
                                variant="outlined"
                                color="secondary"
                                sx={{ fontSize: '0.7rem', height: '20px' }}
                            />
                        ))}
                        {remainingCount > 0 && (
                            <Chip
                                label={`+${remainingCount}`}
                                size="small"
                                variant="outlined"
                                sx={{ fontSize: '0.7rem', height: '20px' }}
                            />
                        )}
                    </Box>
                );
            }
        },
        {
            field: 'createdBy',
            headerName: 'Created By',
            width: 160
        },
        {
            field: 'createdAt',
            headerName: 'Created Date',
            width: 140,
            renderCell: (params) => formatDate(new Date(params.value))
        },
        {
            field: 'isArchived',
            headerName: 'Status',
            width: 100,
            renderCell: (params) => (
                <Chip 
                    label={params.value ? 'Archived' : 'Active'} 
                    color={params.value ? 'default' : 'success'}
                    size="small"
                    variant={params.value ? 'outlined' : 'filled'}
                />
            )
        }
    ];

    return (
        <>
            <Box sx={{
                width: '100%',
                height: '100%',
                backgroundColor: 'background.paper'
            }}>
                <DataGrid
                    getRowId={(row) => row.noteId}
                    rows={sortedNotes}
                    columns={columns}
                    rowHeight={50}
                    // loading={loading}
                    // checkboxSelection
                    disableRowSelectionOnClick
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 25,
                            },
                        },
                    }}
                    pageSizeOptions={[25, 50, 100]}
                    getRowClassName={(params) =>
                        params.row.isArchived ? "row-archived" : ""
                    }
                    rowBufferPx={250}
                    columnBufferPx={150}
                    disableVirtualization={false}
                    sx={{
                        ...dataGridStyles.root,
                        '& .MuiDataGrid-columnHeaders': {
                            borderBottom: '1px solid #e0e0e0 !important',
                        },
                        '& .MuiDataGrid-columnHeader': {
                            height: '52px',
                            minHeight: '52px',
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: 'white',
                        },
                        '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
                            outline: 'none',
                        },
                        '& .MuiDataGrid-row': {
                            height: '50px',
                            minHeight: '50px',
                            maxHeight: '50px',
                            borderBottom: '1px solid #e0e0e0',
                        },
                        '& .MuiDataGrid-cell': {
                            display: 'flex',
                            alignItems: 'center',
                        },
                        '& .MuiDataGrid-columnHeaderTitle': {
                            fontWeight: 600,
                        },
                    }}
                />
            </Box>

            <NoteDetailDialog
                open={open}
                note={data}
                onClose={handleDialogClose}
                onSave={handleNoteSave}
            />
        </>
    );
};