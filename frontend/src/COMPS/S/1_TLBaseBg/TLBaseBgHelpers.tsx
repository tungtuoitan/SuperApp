import { useTimeConfigStore } from "../3_TimeConfig/TimeConfigStore";
import { clvs, hper, tl } from "../TLConstants";
import { useTLBaseBgStore } from "./TLBaseBgStore";
import { cDateToGh, dateToCDate } from "../3_TimeConfig/TimeHelpers";

export const useTLBaseBgHelpers = () => {
    const { TIList, zoomLv, TLBaseFrameRef, spotRatio } = useTLBaseBgStore();
    const { timeConfig } = useTimeConfigStore();
    const { dateReal } = useTLBaseBgStore();

    const getLevelByType = (type: 'parentEv' | 'childEv' | 'TI'): keyof typeof hper => { // means get level(hour/day/...) of childEv/ parentEv/ TI
        switch (type) {
            case 'parentEv':
                return clvs[timeConfig.level + 1 > clvs.length - 1 ? clvs.length - 1 : timeConfig.level + 1].Clevel
            case 'childEv':
                return clvs[timeConfig.level + 2 > clvs.length - 1 ? clvs.length - 1 : timeConfig.level + 2].Clevel
            case 'TI':
                return clvs[timeConfig.level + 3 > clvs.length - 1 ? clvs.length - 1 : timeConfig.level + 2].Clevel
        }
    }

    // C. TLBaseFrame
    const w$TLBaseFrame = TLBaseFrameRef.current ? TLBaseFrameRef.current.clientWidth : 0;
    const w$BaseTI = TIList.length > 0 ? w$TLBaseFrame / TIList.length : 0;

    // A. relate to TI
    const hourPerTI = hper[(getLevelByType('TI') === tl.week ? tl.day : getLevelByType('TI')) as keyof typeof hper];
    const pxPerTI = w$BaseTI * zoomLv;

    // B. Convert
    const RhPerPx = hourPerTI / pxPerTI;
    const RhToPx = (h: number) => h / RhPerPx
    const RpxToRh = (px: number) => px * RhPerPx



    // D. TLBaseBg
    const w$Bg = w$BaseTI * zoomLv * TIList.length
    const h$G_BgStart = (TIList[0] && TIList[0].date) ? cDateToGh(TIList[0].date) : 0;
    const h$G_BgEnd = h$G_BgStart + w$Bg * RhPerPx;
    const maxScrollLeft = TLBaseFrameRef.current ? (TLBaseFrameRef.current.scrollWidth - TLBaseFrameRef.current.clientWidth) : 0;

    // E. spot
    const w$BgStart_spot = () => w$Bg * spotRatio.current; //! những value thế này, nếu viết theo kiểu hàm, thì đôi lúc nó sẽ không reset value

    // F. Red line
    const realCDate = dateToCDate(dateReal);
    const h$G_red = cDateToGh(dateToCDate(dateReal));
    const w$BgStart_red = (cDateToGh(realCDate) - h$G_BgStart) / RhPerPx;


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
        getLevelByType,
    }
}

