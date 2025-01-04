import { Link } from "react-router-dom";
import {usePridContainerHelpers} from "./PridContainerHelpers";

export const Line = (name: string, value: any) => {
    return (
        <span style={{ lineHeight: "16px" }}>
            <strong>{name}: </strong>
            {value as string}
        </span>
    );
};

export const Nink = (id: number, title: string, link: string) => {
    const {openPetail} = usePridContainerHelpers();

    return (
        <Link 
            className="nink" 
            to={link} 
            style={{ textDecoration: "none", fontWeight: "bold" }}
            onClick={(e) => openPetail(id)}
            >
                {title.toUpperCase()}
        </Link>
    );
};
