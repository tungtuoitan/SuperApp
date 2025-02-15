import {useEffect} from "react";
import PridContainer from "./2_GridContainer/GridContainer";
import { getPrs} from "./GAPIs";
import {Pr, Pr2} from "./GTypes";
import {useGridContainerStore} from "./2_GridContainer/GridContainerStore";
import {PrFilterDrawer} from "./6_Filter/Drawer/PrFilterDrawer";
import {pr} from "./GConstants";



export default function PRContainer() {
    const { setAllPrs, refreshGrid, setRefreshPrid, searchText } = useGridContainerStore();

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
        if(refreshGrid) {
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
    }, [refreshGrid]);

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

