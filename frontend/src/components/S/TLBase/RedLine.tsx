import { cDateToGh, toCDate, useTLBaseHelpers } from "./TLBaseHelpers";

export const RedLine = () => {
    const { w$R_Red } = useTLBaseHelpers();

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