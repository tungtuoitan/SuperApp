import Popover from "@mui/material/Popover"
import {usePopupStore} from "./PopupStore";
import {useFoStore} from "../FoStore";

export const getNewGUID = () => {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (Number(c) ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> Number(c) / 4).toString(16)
    );
}
export const ListFoPopup = () => {
    const { popup, setPopup } = usePopupStore();
    const { setOpeningFoIds } = useFoStore();
    return (
        <Popover 
            id={`content-popover-id-${getNewGUID()}`}
            open={popup?.open ?? false}
            anchorEl={popup?.anchorEl ?? null} 

            onClose={() => {                
                if (popup?.onCloseCallback)
                    popup?.onCloseCallback()
                setPopup({ ...popup, open: false, anchorEl: null, content: null})
                setOpeningFoIds([])
            }}
            anchorOrigin={popup?.anchorOrigin}
            sx={{ left: '-50px', top: '2px' }}
            >
                {popup?.content ?? null}
        </Popover>
    )
}