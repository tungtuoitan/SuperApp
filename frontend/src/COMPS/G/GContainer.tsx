import {useEffect} from "react";
import { getPrs} from "./GAPIs";
import {Pr, Pr2} from "./GTypes";
import {useGridContainerStore} from "./2_GridContainer/GridContainerStore";
import {GFilterDrawer} from "./6_Filter/Drawer/GFilterDrawer";
import GridContainer from "./2_GridContainer/GridContainer";



export default function GContainer() {
    const { setAllPrs, refreshGrid, setRefreshGrid, searchText } = useGridContainerStore();

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
                setRefreshGrid(false);
            });
        }
    }, [refreshGrid]);

    return (
        <div id ='GContainer' 
            style={{ 
                width: '100%',
                height: '100%',
                // padding: '0 10px 10px 10px',
                position: 'relative',
                outline: 'none',
        }}>
            <GridContainer/>
            <GFilterDrawer/>
        </div>
    )
}

