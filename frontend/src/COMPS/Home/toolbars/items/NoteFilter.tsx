import { Button, Menu, MenuItem, Checkbox, FormControlLabel } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";

export const NoteFilter = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [filters, setFilters] = useState({
        active: true,
        archived: false,
        meeting: false,
        brainstorm: false,
        research: false,
        bug: false,
    });

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFilterChange = (filterName: keyof typeof filters) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: !prev[filterName]
        }));
        // TODO: Implement filter functionality
        console.log('Filters:', { ...filters, [filterName]: !filters[filterName] });
    };

    return (
        <>
            <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={handleClick}
                sx={{
                    textTransform: 'none',
                    color: '#000',
                    borderColor: '#e0e0e0',
                    '&:hover': {
                        borderColor: '#bdbdbd',
                        backgroundColor: '#f5f5f5',
                    }
                }}
            >
                Filter
            </Button>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem dense>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={filters.active}
                                onChange={() => handleFilterChange('active')}
                                size="small"
                            />
                        }
                        label="Active"
                    />
                </MenuItem>
                <MenuItem dense>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={filters.archived}
                                onChange={() => handleFilterChange('archived')}
                                size="small"
                            />
                        }
                        label="Archived"
                    />
                </MenuItem>
                <MenuItem dense disabled>
                    <em>Types:</em>
                </MenuItem>
                <MenuItem dense>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={filters.meeting}
                                onChange={() => handleFilterChange('meeting')}
                                size="small"
                            />
                        }
                        label="Meeting"
                    />
                </MenuItem>
                <MenuItem dense>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={filters.brainstorm}
                                onChange={() => handleFilterChange('brainstorm')}
                                size="small"
                            />
                        }
                        label="Brainstorm"
                    />
                </MenuItem>
                <MenuItem dense>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={filters.research}
                                onChange={() => handleFilterChange('research')}
                                size="small"
                            />
                        }
                        label="Research"
                    />
                </MenuItem>
                <MenuItem dense>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={filters.bug}
                                onChange={() => handleFilterChange('bug')}
                                size="small"
                            />
                        }
                        label="Bug"
                    />
                </MenuItem>
            </Menu>
        </>
    );
};
