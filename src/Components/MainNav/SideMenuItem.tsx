/**
 * SideMenuItem Component
 * Phase 6: Separated component logic from styled components
 */

import { Tooltip } from "@mui/material";
import { SAModule } from "./SAModule";
import { getIcon } from "./AllIcon";
import {
    MenuItemWrapper,
    Wink,
    IconWrapper,
    ItemLabel
} from "./SideMenuItem.styles";

export interface ISideMenuProps {
    item: SAModule;
    expanded?: boolean;
}

// Re-export styled components for backward compatibility with other components
export {
    SideNavRoot,
    BodyWrapper,
    SideMenuWrapper,
    NavigationList,
    Expander,
    ExpanderArrow,
    SideNavigationWrapper,
    MenuItemLine,
    ItemLink,
    PopupMenuItemWrapper
} from "./SideMenuItem.styles";

/**
 * SideMenuItem - Presentation Component
 * Displays a single navigation menu item in the sidebar
 */
export const SideMenuItem = (props: ISideMenuProps) => {
    return (
        <MenuItemWrapper sx={{ marginTop: '5px' }}>
            <Tooltip title={props.expanded ? '' : props.item.name} placement="right">
                <Wink id={props.item.id} className="single-link" to={props.item.link}>
                    <IconWrapper>
                        {getIcon({ code: props.item.code, type: 'sidebar' })}
                    </IconWrapper>
                    {props.expanded && (
                        <ItemLabel>{props.item.name}</ItemLabel>
                    )}
                </Wink>
            </Tooltip>
        </MenuItemWrapper>
    );
};
