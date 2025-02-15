import { ChangeEvent, MouseEvent } from 'react';
import {usePopupStore} from './PopupStore';
import {Content} from './Content';

export const usePopupHelper = () => {
    const { setPopup } = usePopupStore();

    const openPopup = (event: MouseEvent<HTMLButtonElement> | undefined) => {
        event?.preventDefault();
        event?.stopPropagation();
        setPopup(prev => ({ ...prev, open: true, anchorEl: event?.currentTarget as HTMLButtonElement, content: <Content /> }));
    }

    const closePopup = (event: MouseEvent<HTMLButtonElement> | undefined) => {
        event?.preventDefault();
        event?.stopPropagation();
        setPopup(prev => ({ ...prev, open: false, anchorEl: null, content: null }));
    }

    return {
        openPopup,
        closePopup
    }
}