import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';

export const CHIP = styled(Chip)(({ theme }) => ({
    backgroundColor:  theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(theme.palette.grey[200], 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[200], 0.12),
    },
})) as typeof Chip;