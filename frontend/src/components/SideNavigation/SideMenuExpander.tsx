import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useEffect, useState } from 'react';
import { useNavigationStore } from './store/NavigationStore';
import { SAModule } from '../../config/sitemap';
import styled from '@emotion/styled';
import { useSideMenuExpanderEvents } from './hooks/SideMenuExpanderEvents';
import { IconButton } from '@mui/material';

export interface ISideMenuExpandedProps {
    code: string
}

export const ExpanderWrapper = styled('div')({
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 99999,
    '& button svg': {
        color: '#fff',
    }
})

export const SideMenuExpander = (props: ISideMenuExpandedProps) => {
    const {code} = props;
    const {menuItems,expanded} = useNavigationStore();
    const [itemCode, setItemCode] = useState(code);
    const [isOpen, setIsOpen] = useState(false);
    const [item, setItem] = useState({} as SAModule);
    const {onClickHandlerClose,onClickHandlerOpen} = useSideMenuExpanderEvents();
    useEffect(() => {
        const xitem = menuItems.filter(x => x.code===itemCode);
        setItem(xitem[0]);
        setIsOpen(xitem.length>0 && xitem[0].open===true);
    },[menuItems])
    return (
        <>
        {(item.items ?? []).length>0 && expanded === true 
            ? <ExpanderWrapper>
                {isOpen===true
                ? <IconButton onClick={(e) => onClickHandlerClose(e,code)}><KeyboardArrowUpIcon /></IconButton>
                : <IconButton onClick={(e) => onClickHandlerOpen(e,code)}><KeyboardArrowDownIcon /></IconButton>}
              </ExpanderWrapper>
        : null}
        </>
    )
}