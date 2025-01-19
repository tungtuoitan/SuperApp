import { Chip} from "@mui/material";

interface PChipProps {
    color: string;
    label: string;
    onDelete?: () => void
}

export const PChip:React.FC<React.PropsWithChildren<React.PropsWithChildren<PChipProps>>> = (props:PChipProps) => {
    const {label, color, onDelete} = props;
    return (
        <Chip
            sx={{
                color: `${color}!important`,
                border: `1px solid ${color}!important`,
                '& .MuiChip-deleteIcon': {
                    color: `${color}!important`
                },
            }}
            label={label}
            size="small"
            variant="outlined"
            onDelete={onDelete}
            />
    )
}