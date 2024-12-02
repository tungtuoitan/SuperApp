import { ListItem, Tooltip, styled } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import { useSideMenuSubItemEvents } from "./Hooks/SideMenuSubItemEvents";
import { SAComponent } from "../../Config/sitemap";
import { useNavigationStore } from "./Store/NavigationStore";
import { useSideMenuHelper } from "./Hooks/SideMenuHelper";

export interface ISideSubMenuProps{
    item: SAComponent
    popupMenu: boolean
}

export const MenuSubItemWrapper = styled('div')({
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    alignItems: 'flex-start',
    
})

export const SubMenuItemLine = styled('div')({
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    color: 'rgb(54, 69, 79)',
    padding: 0,
    '& .sub-item-link.child': {
        'svg': {
            height: '.9rem',
            width: '.9rem',
        }
    },
    '& .sub-item-link.child.expanded': {
        paddingLeft: '40px!important',
    },
    '& .sub-item-link:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.87)!important',
        cursor: 'pointer',
        color: '#fff',
    },
    '& .sub-item-link.active': {
        backgroundColor: 'rgba(0, 0, 0, 0.87)!important',
    },
    '& svg': {
        width: '1.2rem',
        height: '1.2rem',
    }
})

export const SubIconWrapper = styled('div')({
    paddingBottom: '0',
    paddingTop: '0',
    color: '#f1f1f18f',
    '& svg': {
        width: '1.2rem',
        height: '1.2rem',
    }
})

export const SubItemLink = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    flexGrow: 1,
    margin: 0,
    padding: '0 12px',

})

export const SubItemLabel = styled('div')({
    fontSize: '.8rem',
    paddingLeft: '10px',
})

export const SideMenuSubItemChild = (props: ISideSubMenuProps) => {
    const {item,popupMenu} = props;
    const {expanded} = useNavigationStore();
    const {menuItemIcon} = useSideMenuHelper();
    const {onClickHandlerSubItem,onMouseEnterHandlerSubItem} = useSideMenuSubItemEvents();
    const [isActive,setIsActive] = useState(item.active);
    useEffect(() => {
        setIsActive(item.active);
    },[item])
    return (
            <SubMenuItemLine>
                <Tooltip title={expanded===true ? '' : item.name} placement="right">
                    <ListItem 
                        onClick={(e: any) => onClickHandlerSubItem(e,item.code)}
                        onMouseEnter={onMouseEnterHandlerSubItem}
                        className={`sub-item-link child ${expanded ? 'expanded' : ''} ${item.active ? 'active' : ''}`}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            position: 'relative',
                            flexGrow: 1,
                            margin: 0,
                            padding: '0 15px',
                            color: '#bbb9b9',
                            width: `${expanded ? '200px' : '48px'}`,
                            lineHeight: '35px',
                            height: '35px',
                        }}
                        component={forwardRef((props: NavLinkProps, ref: any) =>
                            <NavLink {...props} ref={ref} to={item.link || '#'} />)}
                        to={item.link}
                        id={item.code}>
                        {menuItemIcon(item.code)}
                        {(popupMenu===true || expanded===true) && <SubItemLabel>{item.name}</SubItemLabel>}
                    </ListItem>
                </Tooltip>
            </SubMenuItemLine>
    )
}