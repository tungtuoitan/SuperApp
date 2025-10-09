import { styled } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

/**
 * Enhanced tooltip component with increased maximum width.
 * 
 * This component extends the standard MUI Tooltip with:
 * - Increased max width (500px) for longer content
 * - Same API as standard Tooltip component
 * - Proper class forwarding for styling
 * 
 * Use this component when you need to display longer tooltip content
 * that would be truncated in the standard tooltip.
 * 
 * @example
 * ```tsx
 * <Tooltip2 title="This is a longer tooltip message that needs more space">
 *   <Button>Hover me</Button>
 * </Tooltip2>
 * ```
 */
export const Tooltip2 = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 500,
    },
});