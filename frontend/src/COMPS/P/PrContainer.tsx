import {useEffect} from "react";
import PridContainer from "./2_PridContainer/PridContainer";
import { getPrs} from "./PrAPIs";
import {Pr, Pr2} from "./PrTypes";
import {usePridContainerStore} from "./2_PridContainer/PridContainerStore";


export default function PRContainer() {
    const { setAllPrs } = usePridContainerStore();

    useEffect(() => {
        getPrs()
        .then((prs: Pr2[]) => {
            let proData = prs.filter((pr) => pr.activeC == "Act");
            const proData2: Pr2[] = proData.map((pr) => ({...pr, pesults: pr.pesults ? JSON.parse(pr.pesults) : []}));
            setAllPrs(proData2);
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

