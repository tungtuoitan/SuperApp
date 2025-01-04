import { Link } from "react-router-dom";

export const Line = (name: string, value: any) => {
    return (
        <span style={{ lineHeight: "16px" }}>
            <strong>{name}: </strong>
            {value as string}
        </span>
    );
};

export const Nink = (title: string, link: string) => {
    return (
        <span className="nink" style={{ fontWeight: "bold", fontSize: "13px" }}>
            <Link className="nink" to={link} style={{ textDecoration: "none" }}>
                {title.toUpperCase()}
            </Link>
        </span>
    );
};
