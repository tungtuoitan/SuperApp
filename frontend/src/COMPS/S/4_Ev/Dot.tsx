import {_4css} from "./4css";


type DotProps = {
    bg?: string;
}
export default function Dot (props: DotProps) {
    const { bg = _4css.dot.bgLow } = props;
    return (
        <div style={{
            height: _4css.dot.he,
            width: _4css.dot.wi,
            borderRadius: _4css.dot.br,
            background: bg,
        }}>
        </div>
    )
    
}