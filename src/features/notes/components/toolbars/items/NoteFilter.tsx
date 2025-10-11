import { Badge, Tooltip, IconButton } from "@mui/material";
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';

/**
 * Note Filter toolbar component
 * Matches the exact UI pattern from ITRequestFilter
 */
export const NoteFilter = () => {
    return (
        <Badge badgeContent={0} color="primary">
            <Tooltip title="Filter" aria-label="filter">
                <IconButton
                    sx={{
                            color: 'rgba(0, 0, 0, 0.54)',
                        }}
                >
                    <Badge badgeContent={0} color="primary">
                        <TuneOutlinedIcon />
                    </Badge>
                </IconButton>
            </Tooltip>
        </Badge>
    );
};