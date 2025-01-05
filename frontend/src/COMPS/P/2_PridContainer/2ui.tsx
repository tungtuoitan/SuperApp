import { Link } from "react-router-dom";
import {usePridContainerHelpers} from "./PridContainerHelpers";
import {usePridContainerStore} from "./PridContainerStore";
import {truncateText} from "./2he";

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
    const {rowSelectionModel} = usePridContainerStore();

    return (
        <>
            {(rowSelectionModel.includes(id)||rowSelectionModel.includes(id.toString())) 
                ? <div style={{fontWeight:'bold'}}>{truncateText(title.toUpperCase(), 38)}</div>
                : 
                <Link 
                    className="nink" 
                    to={link} 
                    style={{ textDecoration: "none", fontWeight: "bold" }}
                    onClick={(e) => openPetail(id)}
                    >
                        {truncateText(title.toUpperCase(), 38)}
                </Link>
            }
        </>
    );
};
