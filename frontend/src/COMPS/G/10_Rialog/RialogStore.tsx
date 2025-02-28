
import { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import {Pr} from "../GTypes";
import {Kesult, ReviewItem, Rialog} from "./10ty";



export interface RialogContextData {
    rialog: Rialog|null;
    setRialog: Dispatch<SetStateAction<Rialog|null>>;
    reviewList: ReviewItem[];
    setReviewList: Dispatch<SetStateAction<ReviewItem[]>>;
    feymanList: Pr[];
    setFeymanList: Dispatch<SetStateAction<Pr[]>>;
    reviewStart: boolean;   
    setReviewStart: Dispatch<SetStateAction<boolean>>;
    firstTime: boolean; 
    setFirstTime: Dispatch<SetStateAction<boolean>>;
    reviewType: string;
    setReviewType: Dispatch<SetStateAction<string>>;
    usedTime: number;
    setUsedTime: Dispatch<SetStateAction<number>>;

};

export const ADiContextDefaultValue: RialogContextData = {
    rialog: null,
    setRialog: () => { },
    reviewList: [],
    setReviewList: () => { },
    feymanList: [],
    setFeymanList: () => { },
    reviewStart: false,
    setReviewStart: () => { },
    firstTime: true,
    setFirstTime: () => { },
    reviewType: '',
    setReviewType: () => { },
    usedTime: 0,
    setUsedTime: () => { },
};

const RialogStore = createContext<RialogContextData>(ADiContextDefaultValue);
export const useRialogStore = () => useContext(RialogStore);

export const RialogProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [rialog, setRialog] = useState<Rialog|null>(null);
    const [reviewList, setReviewList] = useState<ReviewItem[]>([]);
    const [feymanList, setFeymanList] = useState<Pr[]>([]);
    const [reviewStart, setReviewStart] = useState<boolean>(false);
    const [firstTime, setFirstTime] = useState<boolean>(true);
    const [reviewType, setReviewType] = useState<string>('');
    const [usedTime, setUsedTime] = useState(0);

    return (
        <RialogStore.Provider
            value={{
                rialog,
                setRialog,
                reviewList,
                setReviewList,
                feymanList,
                setFeymanList,
                reviewStart,
                setReviewStart,
                firstTime,
                setFirstTime,
                reviewType,
                setReviewType,
                usedTime,
                setUsedTime
            }}>
            {children}
        </RialogStore.Provider>
    )
}