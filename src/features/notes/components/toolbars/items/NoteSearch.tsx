import { styled } from '@mui/material/styles';
import { InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useRef } from "react";

const Search = styled('div')({
    position: 'relative',
    marginTop: '12px',
    marginLeft: 0,
    width: '300px',
    '& .MuiSvgIcon-root': {
        marginTop: '-5px',
    }
});

const SearchIconRoot = styled('div')({
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const InputBaseRoot = styled(InputBase)({
    // vertical padding + font size from searchIcon
    width: '100%',
    color: 'inherit',
    paddingLeft: 30
});

/**
 * Note Search toolbar component
 * Matches the exact UI pattern from ITRequestSearch
 */
export const NoteSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchLoading, setSearchLoading] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const handleSearch = () => {
        if (searchTerm.trim()) {
            setSearchLoading(true);
            console.log('Searching for:', searchTerm);

            // Simulate search delay
            setTimeout(() => {
                setSearchLoading(false);
            }, 1000);
        }
    };

    const onKeyUpHandlerSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        setSearchTerm(target.value);

        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <Search>
            <SearchIconRoot>
                <SearchIcon />
            </SearchIconRoot>
            <InputBaseRoot
                className={"search-input"}
                inputRef={searchInputRef}
                autoFocus={true}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onKeyUp={onKeyUpHandlerSearch}
            />
        </Search>
    );
};