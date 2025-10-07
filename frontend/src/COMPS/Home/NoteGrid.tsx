import React, { useState, useEffect } from 'react';
import styled from '@mui/material/styles/styled';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Note } from './NoteTypes';
import { Chip, Box, CircularProgress, Alert } from '@mui/material';
import { notesApi } from './NotesApi';
import NoteDetailDialog from './NoteDetailDialog';

export const NoteGridWrapper = styled('div')({
//   display: 'flex',
  height: '100%',
  border: '1px solid red',
  flexFlow: 'column',
  '& .MuiDataGrid-columnsContainer': {
    lineHeight: '56px!important',
  }
});

export const GridContainerWrapper = styled('div')({
  width: '100%',
//   border: '1px solid blue',
  height: '100% !important',
  backgroundColor: '#fff',
//   border: 'none!important',
  '& .MuiDataGrid-root': {
    border: 'none!important',
  },
  '& .MuiDataGrid-row': {
    height: '50px!important',
    maxHeight: '50px!important',
    minHeight: '50px!important',
    margin: 0,
    '&:hover': {
      backgroundColor: '#f5f5f5',
    }
  },
  '& .MuiDataGrid-cell': {
    height: '50px!important',
    maxHeight: '50px!important',
    minHeight: '50px!important',
    display: 'flex!important',
    alignItems: 'center!important',
    justifyContent: 'flex-start!important',
    // borderBottom: '1px solid #e0e0e0!important',
    borderWidth: '1px!important',
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 600,
  },
  '& .MuiDataGrid-viewport': {
    // Remove max-height constraints for better scroll performance
  },
  '& .MuiDataGrid-renderingZone': {
    // Remove max-height constraints for better scroll performance
  },
  '& .MuiDataGrid-row.Mui-selected': {
    backgroundColor: '#fdecea',
    '&:hover': {
      backgroundColor: '#f9e6e6',
    }
  },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#fafafa',
    // borderBottom: '1px solid #e0e0e0!important',
  },
});

interface NoteGridProps {
  notes?: Note[];
}

const NoteGrid: React.FC<NoteGridProps> = ({ notes }) => {
  const [apiNotes, setApiNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedNotes = await notesApi.getNotes({ getAll: true });
        setApiNotes(fetchedNotes);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch notes');
        console.error('Error fetching notes:', err);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch from API if no notes are provided as props
    if (!notes) {
      fetchNotes();
    } else {
      setLoading(false);
    }
  }, [notes]);

  // Sort notes by createdAt date (latest first)
  const displayNotes = [...((notes || apiNotes) ?? [])].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedNote(null);
  };

  const handleNoteSave = async (updatedNote: Note) => {
    try {
      setError(null);
      const result = await notesApi.iuNote(updatedNote);

      if (result.options?.success) {
        // Update local state with the saved note
        if (notes === undefined) {
          setApiNotes(prev => prev.map(n => n.noteId === updatedNote.noteId ? updatedNote : n));
        }
        console.log('Note saved successfully:', result);
      } else {
        setError(result.options?.message || 'Failed to save note');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save note');
      console.error('Error saving note:', err);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getTypeColor = (type?: string) => {
    const colors: { [key: string]: string } = {
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
        <div
          style={{
            cursor: 'pointer',
            color: '#1976d2',
            textDecoration: 'underline',
            fontWeight: 500
          }}
          onClick={() => handleNoteClick(params.row)}
        >
          {params.value}
        </div>
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
        <div style={{ 
          whiteSpace: 'normal', 
          wordWrap: 'break-word',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>
          {params.value || 'No description'}
        </div>
      )
    },
    {
      field: 'tags',
      headerName: 'Tags',
      width: 200,
      renderCell: (params) => {
        if (!params.value) return <span style={{ padding: '4px' }}>No tags</span>;
        
        const tags = params.value.split(',');
        const displayTags = tags.slice(0, 2);
        const remainingCount = tags.length - 2;
        
        return (
          <Box sx={{ 
            display: 'flex', 
            gap: 0.5, 
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
        <GridContainerWrapper className="note-grid-container">
          <DataGrid
            getRowId={(row) => row.noteId}
            rows={displayNotes}
            columns={columns}
            rowHeight={50}
            loading={loading}
            checkboxSelection
            disableRowSelectionOnClick
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 25,
                },
              },
            }}
            pageSizeOptions={[25, 50, 100]}
            density="compact"
            getRowClassName={(params) =>
              params.row.isArchived ? "row-archived" : ""
            }
            rowBufferPx={250}
            columnBufferPx={150}
            disableVirtualization={false}
            sx={{
              '& .MuiDataGrid-columnHeader': {
                height: '52px !important',
                minHeight: '52px !important',
                display: 'flex !important',
                alignItems: 'center !important',
              },
              '& .MuiDataGrid-row': {
                height: '50px !important',
                minHeight: '50px !important',
                maxHeight: '50px !important',
              },
              '& .MuiDataGrid-cell': {
                display: 'flex !important',
                alignItems: 'center !important',
              }
            }}
          />
        </GridContainerWrapper>

      <NoteDetailDialog
        open={dialogOpen}
        note={selectedNote}
        onClose={handleDialogClose}
        onSave={handleNoteSave}
      />
    </>
  );
};

export default NoteGrid;