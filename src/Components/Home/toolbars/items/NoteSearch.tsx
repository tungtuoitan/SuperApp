import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

export const NoteSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
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
