import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Note } from './NoteTypes';

interface NoteDetailDialogProps {
  open: boolean;
  note: Note | null;
  onClose: () => void;
  onSave?: (note: Note) => void;
}

const NoteDetailDialog: React.FC<NoteDetailDialogProps> = ({ open, note, onClose, onSave }) => {
  const [formData, setFormData] = React.useState<Partial<Note>>({});

  React.useEffect(() => {
    if (note) {
      setFormData(note);
    }
  }, [note]);

  const handleChange = (field: keyof Note, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (onSave && formData as Note) {
      onSave(formData as Note);
    }
    onClose();
  };

  if (!note) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          minHeight: '500px',
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle sx={{
        m: 0,
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <span>Note Details</span>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Note ID"
            value={formData.noteId || ''}
            disabled
            fullWidth
            size="small"
          />

          <TextField
            label="Note Name"
            value={formData.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Type"
            value={formData.type || ''}
            onChange={(e) => handleChange('type', e.target.value)}
            fullWidth
          />

          <TextField
            label="Description"
            value={formData.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            fullWidth
            multiline
            rows={4}
          />

          <TextField
            label="Tags"
            value={formData.tags || ''}
            onChange={(e) => handleChange('tags', e.target.value)}
            fullWidth
            helperText="Comma-separated tags"
          />

          <TextField
            label="Created By"
            value={formData.createdBy || ''}
            disabled
            fullWidth
            size="small"
          />

          <TextField
            label="Created At"
            value={formData.createdAt ? new Date(formData.createdAt).toLocaleString() : ''}
            disabled
            fullWidth
            size="small"
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: '1px solid #e0e0e0' }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NoteDetailDialog;
