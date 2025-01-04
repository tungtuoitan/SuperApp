import {useEffect} from "react";
import PridContainer from "./2_PridContainer/PridContainer";
import { getPrs} from "./PrAPIs";
import {Pr} from "./PrTypes";
import {usePridContainerStore} from "./2_PridContainer/PridContainerStore";


export default function PRContainer() {
    const { setAllPrs } = usePridContainerStore();

    useEffect(() => {
        getPrs()
        .then((data: Pr[]) => setAllPrs(data.filter((pr) => pr.activeC== 'Act')));
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

