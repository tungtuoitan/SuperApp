
import { NavLink, NavLinkProps } from "react-router-dom";
import { ListItem, Tooltip } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import { SAModule, sitemaps } from "../../Config/sitemap";
import { useSideMenuHelper } from "./Hooks/SideMenuHelper";
import { useNavigationStore } from "./Store/NavigationStore";
import { IconWrapper, ItemLabel, MenuItemWrapper } from "./SideMenuItem";


export const HomeLink = () => {
    const [home, setHome] = useState<SAModule>({} as SAModule);
    const { menuItemIcon } = useSideMenuHelper();
    const { expanded, menuItems, setSideMenuOpen } = useNavigationStore();
    useEffect(() => {
        setHome(sitemaps.filter(x => x.code === 'home')[0])
    })
    return (
        <MenuItemWrapper
            style={{ marginTop: '5px' }}>
            <Tooltip title={expanded === true ? '' : 'HOME'} placement="right">
                <ListItem
                    className="home-link"
                    onClick={() => {
                        // setcurrentSectionTitle('');
                        menuItems.map(x => {
                            x.open = false;
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
                    to={'/home'}
                    id={'home'}>
                    <IconWrapper>
                        {menuItemIcon('home')}
                        {expanded === true && <ItemLabel>HOME</ItemLabel>}
                    </IconWrapper>
                </ListItem>
            </Tooltip>
        </MenuItemWrapper>
    )
}