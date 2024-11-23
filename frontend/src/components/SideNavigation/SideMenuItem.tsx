import { ListItem, styled } from "@mui/material";
import { SAComponent, SAModule } from "../../Config/sitemap";
import { useNavigationStore } from "./Store/NavigationStore";
import { useEffect, useState } from "react";
import { SideMenuExpander } from "./SideMenuExpander";
import { SideMenuSubItemChild } from "./SideMenuSubItemChild";
import { useSideMenuItemEvents } from "./Hooks/SideMenuItemEvents";
import { SideMenuSubItem } from "./SideMenuSubItem";
import { useSideMenuHelper } from "./Hooks/SideMenuHelper";



export interface ISideMenuProps{
    item: SAModule,
}

export const MenuItemWrapper = styled('div')({
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    alignItems: 'flex-start',
    '& .close': {
        display: 'none',
        height: 0,
        transition: 'all .4s ease',
    },
   '& .mini': {
        display: 'none',
    },
    '& .hide': {
        left: '-10000px!important',
    },
    '& .item-link:hover': {
        cursor: 'pointer'
    },
    '& .home-link:hover, .single-link:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.87)!important',
        cursor: 'pointer',
        color: '#fff',
    },
    '& .single-link.active': {
        backgroundColor: 'rgba(0, 0, 0, 0.87)!important',
    },
})

export const PopupMenuItemWrapper = styled('div')({
    flexShrink: 0,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
   
    
})

export const MenuItemLine = styled('div')({
    alignItems: 'center',
    display: 'flex',
    width: '100%',
    flexDirection: 'row',


})

export const IconWrapper = styled('div')({
    height: '100%',
    width: '1.5rem',
    paddingBottom: '12px',
    paddingTop: '12px',
    color: '#fff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',


})

export const ItemLink = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    flexGrow: 1,
    margin: 0,
    padding: '0 12px',
    color: '#fff',
})

export const ItemLabel = styled('span')({
    color: '#fff',
    fontSize: '1em',
    flexGrow: 1,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: '6px',
    fontWeight: 400,
})

export const SideMenuItemDetail = ({item}:{item: SAComponent}) => {
    return (
        <>
            {
                (item?.items ?? []).map(subItem => (
                        <SideMenuSubItemChild item={subItem} popupMenu={false} />
                ))
            }
        </>
    )
}

export const SideMenuItem = (props: ISideMenuProps) => {
    const {item} = props;
    const {expanded} = useNavigationStore();
    const {menuItemIcon} = useSideMenuHelper();
    const {onMouseEnterHandlerSideMenu,onMouseLeaveHandlerSideMenu,onClickHandlerSideMenu} = useSideMenuItemEvents();
    const [isExpanded,setIsExpanded] = useState(expanded);
    useEffect(() => {
        setIsExpanded(expanded);
    },[expanded])

    return (
        <>
        <MenuItemWrapper>
            <MenuItemLine>
                <SideMenuExpander code={item.code} />
                <ItemLink 
                onMouseEnter={(e) => {}}
                onMouseLeave={(e) => {}}
                onClick={(e) => {
                    console.log(1)
                    onClickHandlerSideMenu(e,item.code)
                }}
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        position: 'relative',
                        flexGrow: 1,
                        margin: 0,
                        padding: '0 12px',
                        height: '40px',
                        color: '#fff',
                    }}
                    id={item.code} 
                    className="item-link">
                    <IconWrapper>
                        {menuItemIcon(item.code)}
                        {(isExpanded ?? false)===true && <ItemLabel>{item.name}</ItemLabel>}
                    </IconWrapper>
                </ItemLink>
            </MenuItemLine>
            <MenuItemWrapper 
                className={`
                ${item.open===true ? '' : 'close'}
                ${(isExpanded===true || item.active===true) ? '' : 'mini'}
                ${item.active === true ? 'active' : ''}
                  `}>
                {
                    (item.items ?? []).filter(x => x.code!=="home" && !(x.isHide??false)).map(subItem => {
                        return (
                                <>
                                    <SideMenuSubItem item={subItem} popupMenu={false} />
                                    <SideMenuItemDetail item={subItem} />
                                </>
                        )
                    })
                }
            </MenuItemWrapper>
        </MenuItemWrapper>
        </>
    )
}