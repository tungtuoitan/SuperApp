import { cDateToGh, numbToCDate, useTLBaseBgHelpers } from "./TLBaseBgHelpers";

export const RedLine = () => {
    const { w$BgStart_red } = useTLBaseBgHelpers();

    return (
        <div
            style={{
                height: '100%',
                width: 1,
                background: 'red',
                position: 'absolute',
                // top: 0,
                left: w$BgStart_red,
            }}/>
    )
}