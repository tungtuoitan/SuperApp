import { useTimeConfigStore } from "../3_TimeConfig/TimeConfigStore";
import { clvs, hper, sr } from "../TLConstants";
import { useTLBaseBgStore } from "./TLBaseBgStore";
import { cDateToGh, dateToCDate } from "../3_TimeConfig/TimeHelpers";

export const useTLBaseBgHelpers = () => {
    const { TIList, zoomLv, TLBaseFrameRef, spotRatio, TLBaseFrameScrollLeft } = useTLBaseBgStore();
    const { timeConfig } = useTimeConfigStore();
    const { dateReal } = useTLBaseBgStore();

    // 1
    const getLevelCOf = (type: 'cevel' | 'parentEv' | 'childEv' | 'TI') => { // means get level(hour/day/...) of childEv/ parentEv/ TI
        switch (type) {
            case 'cevel':
                return clvs[timeConfig.cevelId].cevelC
            case 'parentEv':
                return timeConfig.cevelId === 5 
                ? clvs[timeConfig.cevelId + 1 > clvs.length - 1 ? clvs.length - 1 : timeConfig.cevelId + 0].cevelC
                : clvs[timeConfig.cevelId + 1 > clvs.length - 1 ? clvs.length - 1 : timeConfig.cevelId + 1].cevelC
            case 'childEv':
                return timeConfig.cevelId === 5
                ? clvs[timeConfig.cevelId + 2 > clvs.length - 1 ? clvs.length - 1 : timeConfig.cevelId + 1].cevelC
                : clvs[timeConfig.cevelId + 2 > clvs.length - 1 ? clvs.length - 1 : timeConfig.cevelId + 2].cevelC
            case 'TI':
                return clvs[timeConfig.cevelId + 3 > clvs.length - 1 ? clvs.length - 1 : timeConfig.cevelId + 2].cevelC
        }
    }

    // 2. TLBaseFrame
    const w$TLBaseFrame = TLBaseFrameRef.current ? TLBaseFrameRef.current.clientWidth : 0;
    const w$BaseTI = TIList.length > 0 ? w$TLBaseFrame / TIList.length : 0;
    
    // 3. TI
    const hourPerTI = hper[(getLevelCOf('TI') === sr.week.c ? sr.day.c : getLevelCOf('TI')) as keyof typeof hper];
    const pxPerTI = w$BaseTI * zoomLv;
    
    // 4. Convert
    const RhPerPx = hourPerTI / pxPerTI;
    const RhToPx = (h: number) => h / RhPerPx
    const RpxToRh = (px: number) => px * RhPerPx



    // 5. TLBaseBg
    const w$Bg = w$BaseTI * zoomLv * TIList.length
    const h$G_BgStart = (TIList[0] && TIList[0].date) ? cDateToGh(TIList[0].date) : 0;
    const h$G_BgEnd = h$G_BgStart + w$Bg * RhPerPx;
    const maxScrollLeft = TLBaseFrameRef.current ? (TLBaseFrameRef.current.scrollWidth - TLBaseFrameRef.current.clientWidth) : 0;

    // 6. spot
    const w$BgStart_spot = () => w$Bg * spotRatio.current; //! những value thế này, nếu viết theo kiểu hàm, thì đôi lúc nó sẽ không reset value

    // 7. Red line
    const realCDate = dateToCDate(dateReal);
    const h$G_red = cDateToGh(dateToCDate(dateReal));
    const w$BgStart_red = (cDateToGh(realCDate) - h$G_BgStart) / RhPerPx;
    
    const h$G_TLBaseFrameLeft = h$G_BgStart + RpxToRh(TLBaseFrameScrollLeft)

    return {
        hourPerTI,

        h$G_BgStart,
        h$G_BgEnd,
        h$G_red,

        w$BgStart_red,
        w$Bg,
        w$TLBaseFrame,
        w$BaseTI,
        w$BgStart_spot,
        maxScrollLeft,

        RhPerPx,
        RhToPx,
        RpxToRh,

        dateToCDate,
        getLevelCOf,

        h$G_TLBaseFrameLeft,
    }
}

