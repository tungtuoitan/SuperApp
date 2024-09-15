import { forwardRef, useEffect, useState } from "react"
import { ISideMenuProps, IconWrapper, ItemLabel, MenuItemWrapper } from "./SideMenuItem";
import { NavLink, NavLinkProps } from "react-router-dom";
import { ListItem, Tooltip } from "@mui/material";
import { useNavigationStore } from "./store/NavigationStore";
import { useAppMenuHelper } from "./hooks/AppMenuHelper";


export const SingleMenuItem = (props: ISideMenuProps) => {
    const { menuItemIcon } = useAppMenuHelper();
    const { expanded, menuItems, setSideMenuOpen } = useNavigationStore();
    return (
        <MenuItemWrapper
            style={{ marginTop: '5px' }}>
            <Tooltip title={expanded === true ? '' : props.item.name} placement="right">
                <ListItem
                    className="single-link"
                    onClick={() => {
                        console.log(0)
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
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        position: 'relative',
                        flexGrow: 1,
                        margin: 0,
                        padding: '0 12px',
                        height: '35px',
                        color: '#fff',
                    }}
                    component={
                        forwardRef((props: NavLinkProps, ref: any) =>
                            <NavLink {...props} ref={ref} />)
                    }
                    to={props.item.link}
                    id={props.item.id}>
                    <IconWrapper>
                        {menuItemIcon(props.item.code)}
                        {expanded === true && <ItemLabel>{props.item.name}</ItemLabel>}
                    </IconWrapper>
                </ListItem>
            </Tooltip>
        </MenuItemWrapper>
    )
}