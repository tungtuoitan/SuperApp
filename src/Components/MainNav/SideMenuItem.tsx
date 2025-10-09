import { Tooltip } from '@mui/material';

import { useNavigationStore } from '../../contexts/NavigationContext';
import { getIcon } from './AllIcon';
import { SAModule } from './SAModule';
import {
    MenuItemWrapper,
    Wink,
    IconWrapper,
    ItemLabel
} from './SideMenuItem.styles';

/**
 * Props interface for the SideMenuItem component.
 */
export interface ISideMenuProps {
    /** Navigation module item to display */
    item: SAModule;
    /** Whether the sidebar is in expanded state */
    expanded?: boolean;
}

/**
 * Side navigation menu item component.
 * 
 * This component renders a single navigation item in the sidebar with:
 * - Icon representation of the module
 * - Text label (visible when expanded)
 * - Selection state management
 * - Tooltip for collapsed state
 * - Click handling for navigation
 * 
 * The component adapts its appearance based on the sidebar expansion state
 * and highlights the currently selected item.
 * 
 * @param props - Component props containing item and expansion state
 * @returns A navigation menu item component
 */
export function SideMenuItem(props: ISideMenuProps) {
    const { selectedItemId, setSelectedItemId } = useNavigationStore();
    
    /**
     * Handle menu item click.
     * Updates the selected item in the navigation context.
     */
    const handleClick = () => {
        setSelectedItemId(props.item.id);
    };
    
    const isSelected = selectedItemId === props.item.id;
    
    return (
        <MenuItemWrapper>
            <Tooltip 
                title={props.expanded ? '' : props.item.name} 
                placement="right"
                disableHoverListener={props.expanded}
            >
                <Wink 
                    id={props.item.id} 
                    className={`single-link ${isSelected ? 'selected' : ''}`}
                    to={props.item.link}
                    onClick={handleClick}
                >
                    <IconWrapper>
                        {getIcon({ code: props.item.code, type: 'sidebar' })}
                    </IconWrapper>
                    <ItemLabel 
                        className={props.expanded ? 'expanded' : 'collapsed'}
                    >
                        {props.item.name}
                    </ItemLabel>
                </Wink>
            </Tooltip>
        </MenuItemWrapper>
    );
}
