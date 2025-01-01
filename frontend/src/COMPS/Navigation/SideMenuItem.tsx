import { Tooltip } from "@mui/material";
import { useNavigationStore } from "./NavigationStore";
import { useSideMenuHelper } from "./SideMenuHelper";
import {IconWrapper, ISideMenuProps, MenuItemWrapper, Wink} from "./Nui";





export const SideMenuItem = (props: ISideMenuProps) => {
    const { menuItemIcon } = useSideMenuHelper();
    const { expanded, menuItems, setSideMenuOpen } = useNavigationStore();
    return (
        <MenuItemWrapper
            style={{ marginTop: '5px' }}>
            <Tooltip title={expanded === true ? '' : props.item.name} placement="right">
                <Wink id={props.item.id} className="single-link"
                    to={props.item.link}
                    onClick={() => {
                        menuItems.map(x => {
                            x.open = false;
                            x.active = true;
                            return x;
                        })
                    }}
                    onMouseEnter={() => {
                        if (expanded === false) {
                            setSideMenuOpen(false);
                        }
                    }}
                    >
                    <IconWrapper>
                        {menuItemIcon(props.item.code)}
                        {/* {expanded === true && <ItemLabel>{props.item.name}</ItemLabel>} */}
                    </IconWrapper>
                </Wink>
            </Tooltip>
        </MenuItemWrapper>
    )
}