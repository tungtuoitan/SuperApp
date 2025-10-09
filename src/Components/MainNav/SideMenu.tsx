import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import { Tooltip } from '@mui/material';

import { useNavigationStore } from '../../contexts/NavigationContext';
import { sitemaps } from './AllIcon';
import { SideMenuItem } from './SideMenuItem';
import { Expander, ExpanderArrow, NavigationList, SideMenuWrapper } from './SideMenuItem.styles';

/**
 * Side navigation menu component.
 * 
 * This component renders the application's side navigation menu with:
 * - Collapsible/expandable functionality
 * - Navigation items from sitemap configuration
 * - Toggle button with directional arrow icons
 * - Tooltip feedback for expand/collapse action
 * - Dynamic styling based on expansion state
 * 
 * The menu can be toggled between expanded (showing labels) and collapsed
 * (showing only icons) states to optimize screen space usage.
 * 
 * @returns The side navigation menu component
 */
export function SideMenu() {
    const { expanded, setExpanded } = useNavigationStore();

    /**
     * Handle the expansion toggle for the sidebar.
     * Toggles between expanded and collapsed states.
     */
    const handleToggleExpansion = () => {
        setExpanded(!expanded);
    };

    return (
        <SideMenuWrapper className={expanded ? 'expanded' : 'collapsed'}>
            <NavigationList>
                {sitemaps.map(item => (
                    <SideMenuItem 
                        key={item.code} 
                        item={item} 
                        expanded={expanded} 
                    />
                ))}
            </NavigationList>
            
            <Expander className={`expander ${expanded ? 'expanded' : ''}`}>
                <Tooltip 
                    title={expanded ? 'Show Less' : 'Show More'} 
                    placement="right"
                >
                    <ExpanderArrow
                        onClick={handleToggleExpansion}
                        sx={{ cursor: 'pointer' }}
                    >
                        {expanded ? (
                            <KeyboardDoubleArrowLeftOutlinedIcon />
                        ) : (
                            <KeyboardDoubleArrowRightOutlinedIcon />
                        )}
                    </ExpanderArrow>
                </Tooltip>
            </Expander>
        </SideMenuWrapper>
    );
}
