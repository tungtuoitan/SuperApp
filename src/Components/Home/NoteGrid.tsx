import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Note } from '../../types';
import { Chip, Box } from '@mui/material';
import { useNotes, useDialog } from '../../hooks';
import NoteDetailDialog from './NoteDetailDialog';
import { dataGridStyles } from '../../config/theme';

interface NoteGridProps {
  notes?: Note[];
}

export function NoteGrid({ notes }: NoteGridProps) {
  // Use custom hooks for state management
  const { notes: apiNotes, loading, error, saveNote } = useNotes(!notes ? { getAll: true } : undefined);
  const { open: dialogOpen, data: selectedNote, openDialog, closeDialog } = useDialog<Note>();

  // Use provided notes or fetched notes
  const displayNotes = notes || apiNotes;

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
      await saveNote(updatedNote);
      console.log('Note saved successfully:', updatedNote);
      closeDialog();
    } catch (err) {
      console.error('Error saving note:', err);
      // Error is already handled by the useNotes hook
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
        //   loading={loading}
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
        open={dialogOpen}
        note={selectedNote}
        onClose={handleDialogClose}
        onSave={handleNoteSave}
      />
    </>
  );
};