import { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNoteStore } from '../../../../store/notes/NoteStore';

/**
 * Note search component for filtering notes by search term.
 * 
 * This component provides a search input field with:
 * - Search icon for visual clarity
 * - Real-time input handling
 * - Placeholder text for user guidance
 * - Compact size suitable for toolbar placement
 * 
 * TODO: Implement actual search functionality to filter notes
 * based on the search term across note properties.
 * 
 * @returns Search input component for note filtering
 */
export function NoteSearch() {
    const [searchTerm, setSearchTerm] = useState("");
    
    // Use note store for search state management
    const {
        searchText,
        setSearchText,
        searchLoading,
        setSearchLoading,
        searchInputRef
    } = useNoteStore();

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setSearchText(event.target.value);
        // TODO: Implement search functionality
        console.log('Search term:', event.target.value);
    };

    return (
        <TextField
            placeholder="Search..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
            sx={{
                width: '300px',
                backgroundColor: '#fff',
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#e0e0e0',
                    },
                    '&:hover fieldset': {
                        borderColor: '#bdbdbd',
                    },
                }
            }}
        />
    );
};
