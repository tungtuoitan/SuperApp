import {useEffect} from "react";
import PridContainer from "./2_PridContainer/PridContainer";
import { getPrs} from "./PrAPIs";
import {Pr} from "./PrTypes";
import {usePridStore} from "./2_PridContainer/PridContainerStore";


export default function PRContainer() {
    const { setAllPrs } = usePridStore();

    useEffect(() => {
        getPrs().then((data: Pr[]) => setAllPrs(data))
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

