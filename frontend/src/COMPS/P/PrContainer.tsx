import {useEffect} from "react";
import PridContainer from "./2_PridContainer/PridContainer";
import { getPrs} from "./PrAPIs";
import {Pr, Pr2} from "./PrTypes";
import {usePridContainerStore} from "./2_PridContainer/PridContainerStore";


export default function PRContainer() {
    const { setAllPrs } = usePridContainerStore();

    useEffect(() => {
        getPrs()
        .then((data: Pr2[]) => {
            let proData = data.filter((pr) => pr.activeC== 'Act')
            proData.map((pr) => {
                pr.pesults = pr.pesults ? JSON.parse(pr.pesults) : []
                return pr
            })
            setAllPrs(proData);
        });
    }, []);

    return (
        <div id ='PRContainer' 
            style={{ 
                width: '100%',
                height: '100%',
                // padding: '0 10px 10px 10px',
                position: 'relative',
                outline: 'none',
        }}>
            <PridContainer/>
        </div>
    )
}

