import { ChangeEvent, MouseEvent } from 'react';
import {Content} from './Content';
import {usePopupStore} from './PopupStore';

export const usePopupHelper = () => {
    const { setPopup } = usePopupStore();

    const openPopup = (event: MouseEvent<HTMLSpanElement> | undefined) => {
        event?.preventDefault();
        event?.stopPropagation();
        setPopup(prev => ({ ...prev, open: true, anchorEl: event?.currentTarget as HTMLSpanElement, content: <Content /> }));
    }

    const closePopup = (event: MouseEvent<HTMLSpanElement> | undefined) => {
        event?.preventDefault();
        event?.stopPropagation();
        setPopup(prev => ({ ...prev, open: false, anchorEl: null, content: null }));
    }

    return {
        openPopup,
        closePopup
    }
}