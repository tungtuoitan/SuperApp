import { _1css } from "./1css";
import { useTLBaseBgHelpers } from "./TLBaseBgHelpers";

export const RedLine = () => {
    const { w$BgStart_red } = useTLBaseBgHelpers();

    return (
        <div
            style={{
                height: '100%',
                width: _1css.redline.w,
                background: _1css.redline.bg,
                position: 'absolute',
                // top: 0,
                left: w$BgStart_red,
            }} />
    )
}