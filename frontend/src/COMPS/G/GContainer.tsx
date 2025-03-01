import {useEffect, useLayoutEffect} from "react";
import {useGridContainerStore} from "./2_GridContainer/GridContainerStore";
import {GFilterDrawer} from "./6_Filter/Drawer/GFilterDrawer";
import GridContainer from "./2_GridContainer/GridContainer";
import {useFoStore} from "./0_Fo/FoStore";
import {useFoHelpers} from "./0_Fo/FoHelpers";
import {useGridContainerHelpers} from "./2_GridContainer/GridContainerHelpers";
import DNDContainer from "./2_GridContainer/DNDContainer";



export default function GContainer() {
    const { setAllPrs, refreshGrid, setRefreshGrid, searchText} = useGridContainerStore();
    const { loadPrs } = useGridContainerHelpers();
    const { lastFoId } = useFoStore();
    const { loadFos } = useFoHelpers();

    // init
    useEffect(() => {
        loadPrs();
    }, []);

    useEffect(() => {
        if(refreshGrid) {
            (async _ => {
                return Promise.all([
                    loadPrs(),
                    loadFos(),
                ])
                .then(() => setTimeout(() => setRefreshGrid(false), 500))
            })();
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
            <DNDContainer/>
            <GFilterDrawer/>
        </div>
    )
}

