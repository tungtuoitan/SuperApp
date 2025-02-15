import {useEffect} from "react";
import PridContainer from "./2_GridContainer/PridContainer";
import { getPrs} from "./GAPIs";
import {Pr, Pr2} from "./GTypes";
import {usePridContainerStore} from "./2_GridContainer/PridContainerStore";
import {PrFilterDrawer} from "./6_Filter/Drawer/PrFilterDrawer";


export default function PRContainer() {
    const { setAllPrs, refreshPrid, setRefreshPrid, searchText } = usePridContainerStore();

    // init
    useEffect(() => {
        getPrs(searchText??'')
        .then((prs: Pr2[]) => {
            let proData = prs.filter((pr) => pr.activeC == "Act");
            const proData2: Pr2[] = proData.map((pr) => ({...pr, pesults: pr.pesults ? JSON.parse(pr.pesults) : []}));
            setAllPrs(proData2);
        })
    }, []);

    useEffect(() => {
        if(refreshPrid) {
            getPrs(searchText??'')
            .then((prs: Pr2[]) => {
                let proData = prs.filter((pr) => pr.activeC == "Act");
                const proData2: Pr2[] = proData.map((pr) => ({...pr, pesults: pr.pesults ? JSON.parse(pr.pesults) : []}));
                setAllPrs(proData2);
            })
            .finally(() => {
                setRefreshPrid(false);
            });
        }
    }, [refreshPrid]);

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
            <PrFilterDrawer/>
        </div>
    )
}

