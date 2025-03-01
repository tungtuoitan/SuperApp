
import { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import {Pr} from "../GTypes";


export interface QridContextData {
    qridOn: boolean;
    setQridOn: Dispatch<SetStateAction<boolean>>;
    reviewList: Pr[];
    setReviewList: Dispatch<SetStateAction<Pr[]>>;
};

export const ADiContextDefaultValue: QridContextData = {
    qridOn: false,
    setQridOn: () => { },
    reviewList: [],
    setReviewList: () => { },
};

const QridStore = createContext<QridContextData>(ADiContextDefaultValue);
export const useQridStore = () => useContext(QridStore);

export const QridProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [qridOn, setQridOn] = useState<boolean>(false);
    const [reviewList, setReviewList] = useState<Pr[]>([]);

    return (
        <QridStore.Provider
            value={{
                qridOn,
                setQridOn,
                reviewList,
                setReviewList,
            }}>
            {children}
        </QridStore.Provider>
    )
}