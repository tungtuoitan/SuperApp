import { cDateToGh, toCDate, useTLBaseBgHelpers } from "./TLBaseBgHelpers";

export const RedLine = () => {
    const { w$R_Red } = useTLBaseBgHelpers();

    return (
        <div
            style={{
                height: '100%',
                width: 1,
                background: 'red',
                position: 'absolute',
                // top: 0,
                left: w$R_Red(),
            }}/>
    )
}