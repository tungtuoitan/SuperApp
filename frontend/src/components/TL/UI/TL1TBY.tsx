import React, { useEffect, useState } from "react";
import { TLBase } from "../TLBase/UI/TLBase";
import { cDate, TI, val } from "../TLConfigs";
import { useTLBaseStore } from "../TLBase/Store/TLBaseStore";
import { toCDate } from "../TLBase/TLBaseHelpers2";

export const TL1TBY = React.memo(() => {
    const [_100byList, set100byList] = useState<TI[]>([]);
    const {curL} = useTLBaseStore();

    useEffect(() => {
        const newList = [] as TI[];
        for (let i = 0; i < 12; i++) {
            const TI = {
                id: '_100byList-' + i.toString(),
                TILid: 1,
                // date: toCDate(-8000 + i * 1000, 1, 1)
                date: toCDate(-val['1tby'] + i*val['100by'], 1, 1)
            } as TI;
            newList.push(TI);
        }
        set100byList(newList);
    }, []);

    return (
        <div id='10000years'
            style={{
                display: 'flex',
                minWidth: 30,
            }}>
            {_100byList.map((_100by, index) => (
                 <TLBase TIid={_100by.id} TILid={_100by.TILid} TIDate={_100by.date} key={index} index={index} curLId={curL.TILid} zoomLv={curL.zoomLv} />
            ))}
        </div>
    );
})