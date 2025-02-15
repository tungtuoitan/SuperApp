import { PopoverOrigin, PopoverVirtualElement } from "@mui/material/Popover"
import { Dispatch, SetStateAction, createContext, useContext, useState } from "react"


export interface IPopupProps {
    open: boolean
    anchorEl: Element | (() => Element) | PopoverVirtualElement | (() => PopoverVirtualElement) | null | undefined
    onCloseCallback: () => void
    anchorOrigin?: PopoverOrigin | undefined
    content?: React.ReactNode
}

export interface PopupContextData {
    popup: IPopupProps
    setPopup: Dispatch<SetStateAction<IPopupProps>>
}

export const ContentPopoverContextDefaultValue: PopupContextData = {   
    popup: {
        open: false,
        anchorEl: null,
        onCloseCallback: () => {},
        anchorOrigin: { vertical: 'bottom', horizontal: 'center' } as PopoverOrigin,
    },
    setPopup: () => {},
}

export const PopupStore = createContext<PopupContextData>(ContentPopoverContextDefaultValue);

export const usePopupStore = () => useContext(PopupStore);

export const PopupProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [popup, setPopup] = useState<IPopupProps>({
        open: false,
        anchorEl: null,
        onCloseCallback: () => {},
        anchorOrigin: { vertical: 'top', horizontal: 'center' } as PopoverOrigin,
    });
    
    return (
        <PopupStore.Provider
            value={{
                popup,
                setPopup
            }}>
                {children}
        </PopupStore.Provider>
    )
}
