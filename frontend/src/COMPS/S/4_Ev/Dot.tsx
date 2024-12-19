import {_4css} from "./4css";


type DotProps = {
    bg?: string;
}
export default function Dot (props: DotProps) {
    const { bg = _4css.dot.bgLow } = props;
    return (
        <div style={{
            height: _4css.dot.height,
            width: _4css.dot.width,
            borderRadius: _4css.dot.borderRadius,
            background: bg,
        }}>
        </div>
    )
    
}