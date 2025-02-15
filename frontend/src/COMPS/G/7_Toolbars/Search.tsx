import { ChangeEvent, FC, KeyboardEvent, useRef } from "react";
import { InputBase, styled } from "@mui/material"
import {Theme} from "@emotion/react";
import SearchIcon from '@mui/icons-material/Search';


export const SearchIcons = styled('div')({
  display: 'flex',
  flexFlow: 'row',
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  paddingRight: 0,
})

export const ProgressIcon = styled('div')({
  padding: '1px 5px 1px 1px',
  color: '#1976d2',
  marginBottom: '8px',
  fontSize: '.8em',
})

interface SearchProps {
    onChangeHandlerSearch: (event: ChangeEvent<HTMLInputElement>) => void;
    onKeyUpHandlerSearch: (event: KeyboardEvent<HTMLInputElement>) => void;
    searchTextValue?: string | undefined;
}

export const Search: FC<React.PropsWithChildren<React.PropsWithChildren<SearchProps>>> = (props: SearchProps) => {
    const { onChangeHandlerSearch, onKeyUpHandlerSearch, searchTextValue } = props;
    const inputRef = useRef<HTMLInputElement | undefined>(null);
    if (searchTextValue && inputRef.current) {
        inputRef.current.value = searchTextValue;
    }
    return (
        <div 
            style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            <SearchIcons>
                <SearchIcon />
            </SearchIcons>
            <InputBase
                className={"search-input"}
                sx={{ paddingLeft: '30px'}}
                inputRef={inputRef}
                autoFocus={true}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={onChangeHandlerSearch}
                onKeyUp={onKeyUpHandlerSearch}
            />
        </div>
    )
}