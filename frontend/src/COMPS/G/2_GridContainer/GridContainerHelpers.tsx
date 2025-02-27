import { GridColDef } from "@mui/x-data-grid";
import { Pr, Pr2, PrsResult } from "../GTypes";
import { Pesult, PetailForm } from "../3_Petail/3ty";
import {usePetailFormStore} from "../3_Petail/PetailFormsStore";
import {useGridContainerStore} from "./GridContainerStore";
import {useGAllTabsStore} from "../1_GAllTabs/GAllTabsStore";
import {useSRsStore} from "../../S/8_SRs/SRsStore";
import {Icon, IconButton, styled} from "@mui/material";
import {useADiStore} from "../5_Adi/ADiStore";
import {useADiaHelpers} from "../5_Adi/ADiaHelpers";
import {getPrs, iuPr} from "../GAPIs";
import {useFoStore} from "../0_Fo/FoStore";
import {paSid, toSid} from "../GHelpers";
import {g} from "../GConstants";
import {getIcon, iconType} from "../../MainNav/Nhe";
import {FotailForm} from "../9_Fotail/9ty";
import {useFotailFormStore} from "../9_Fotail/FotailFormsStore";
import {_2cs} from "./2cs";
import {useRowHelpers} from "./RowHelpers";
import {Fo} from "../0_Fo/FoTypes";
import {sr} from "../../S/TLConstants";
import {GridStatee} from "./2ty";
import {dateToCDate, isSameDate} from "../../S/3_TimeConfig/TimeHelpers";

const ContainerRow = styled('div')({
    display:'flex', flexDirection:'row', width: '100%', height: '100%'
});

export const useGridContainerHelpers = () => {
    const [petails, dispatch] = usePetailFormStore();
    const [fotails, dispatchFo] = useFotailFormStore();
    const { allPrs, setAllPrs, rowSelectionModel, readyCuttingRows, currentHoveringRow, setCurrentHoveringRow,refreshGrid, setRefreshGrid, searchText, displayDeleltedRows, gridState} = useGridContainerStore();
    const { setADia, aDia } = useADiStore();
    const { openDia } = useADiaHelpers();
    const { gAllTabIds,setGAllTabIds,curTabIndex, setCurTabIndex} = useGAllTabsStore();
    const { sRs } = useSRsStore();
    const {allFos,setLastFoId, lastFoId} = useFoStore();
    const { PrRow,
        FolderRow,
        KnowledgeRow,
        JustLinkRow} = useRowHelpers();

    const getAllGitems = (type:GridStatee = gridState) => {
        let allGItems: (Pr|Fo)[] = [];
        switch (type) {
            case 'default':
                const allRealFos = allFos.filter(fo => fo.iconId !== ('link' as iconType) );
                const allLinks = allFos.filter(fo => fo.iconId === ('link' as iconType) );
        
                allGItems = [
                    ...allRealFos.filter(fo => fo.parentId === lastFoId)
                        .sort((a, b) => a.name.localeCompare(b.name, 'vi')),
                    ...allLinks.filter(fo => fo.parentId === lastFoId)
                        .sort((a, b) => a.name.localeCompare(b.name, 'vi')),
                    ...allPrs.filter(pr => pr.parentId === lastFoId)
                        .sort((a, b) => a.name.localeCompare(b.name, 'vi'))
                ]
                if(displayDeleltedRows) 
                    return allGItems;
                else
                    return allGItems.filter(r => r.activeC === 'Act')
               

            case 'relearn':
                allGItems = allPrs.filter(pr => pr.types.includes(sr.knowledge.c) && pr.statusC === sr.status.inProgress.c && pr.statusC === sr.knowledgeOnRelearn.c)
                                .sort((a, b) => a.name.localeCompare(b.name, 'vi'))
                return allGItems.filter(r => r.activeC === 'Act')

            case 'review-today':
                allGItems = allPrs.filter(pr => pr.types.includes(sr.knowledge.c) && pr.statusC === sr.status.inProgress.c && pr.knowC === sr.knowledgeOnReview.c &&  isSameDate(new Date(pr.pesults[pr.pesults.length - 1].time), new Date()))
                                .sort((a, b) => a.name.localeCompare(b.name, 'vi'))
                return allGItems.filter(r => r.activeC === 'Act')

            case 'open-knowledge':
                allGItems = allPrs.filter(pr => pr.types.includes(sr.knowledge.c) && pr.statusC === sr.status.open.c)
                                .sort((a, b) => a.name.localeCompare(b.name, 'vi'))
                return allGItems.filter(r => r.activeC === 'Act')
            case 'all-knowledge':
                allGItems = allPrs.filter(pr => pr.types.includes(sr.knowledge.c))
                                .sort((a, b) => a.name.localeCompare(b.name, 'vi'))
                return allGItems.filter(r => r.activeC === 'Act')
        }
    }
    const loadPrs = async () => {
        await getPrs(searchText??'')
            .then((prs: Pr2[]) => {
                let proData = prs
                // .filter((pr) => pr.activeC == "Act");
                const proData2: Pr2[] = proData.map((pr) => ({...pr, pesults: pr.pesults ? JSON.parse(pr.pesults) : []}));
                setAllPrs(proData2);
                return true;
            })
    }
    const openDetail = (rowId: string, type: 'Pr'|'Fo'|'Link') => {
        if (rowSelectionModel.includes(rowId) || rowSelectionModel.includes(rowId.toString())) return;
        if (gAllTabIds.includes(rowId)) {
            setCurTabIndex(gAllTabIds.indexOf(rowId));
        } 
        else {
            setGAllTabIds((prev) => {
                setCurTabIndex(prev.length); // tabIndex of that childEv is the last item on allTabIds, so it == prev.length
                return [...prev, rowId];
            });
        }

        if(type === 'Pr' ) {
            const ev = allPrs.filter((pr) => pr.id === rowId)[0];
            console.log(ev)
            const petail: PetailForm = {
                id: ev.id,
                name: ev.name,
                parentId: ev.parentId ?? 0,
                timeStart: ev.timeStart,
                timeEnd: ev.timeEnd,
                activeC: ev.activeC,
                prioriC: ev.prioriC,
                statusC: ev.statusC,
                fink: ev.fink,
                desc: ev.desc,
                types: ev.types,
                repeatType: ev.repeatType,
                pesults: ev.pesults,
                knowC: ev.knowC,
            };
            dispatch({ type: "INSE", payload: petail });
        }
        else if (type==='Fo'||type==='Link') {
            const fo = allFos.filter((fo) => fo.id === rowId)[0];
            const fotail: FotailForm = {
                id: fo.id,
                name: fo.name,
                parentId: fo.parentId,
                iconId: fo.iconId,
                
                activeC: fo.activeC,
                prioriC: fo.prioriC,

                fink: fo.fink,
                desc: fo.desc,
                pinIndex: fo.pinIndex,
            };
            dispatchFo({ type: "INSE", payload: fotail });
        }
    };

  
    const gridColumns = ():GridColDef[] => { 
        return [
        // { field: "id", headerName: "ID", width: 80 },
        {
            field: "info",
            headerName: "Info",
            width: 1700,
            renderCell: (params) => {
                const r = params.row

                return (
                <ContainerRow sx={{
                    opacity: (readyCuttingRows.includes(r.id) || r.activeC =='InAct') ? 0.5 : 1,
                }}>
                    {paSid(r.id).type === g.type.pr && !r.types.includes('knowledge')
                        ?   <>
                                {PrRow(r)}
                            </>
                        : paSid(r.id).type === g.type.pr && r.types.includes('knowledge')
                        ?   <>
                                {KnowledgeRow(r)}
                            </>
                    : paSid(r.id).type === g.type.fo && r.iconId !== 'link'
                        ?   <>
                                {FolderRow(r)}
                            </>
                    : paSid(r.id).type === g.type.fo && r.iconId === 'link'  
                    ?  <>
                            {JustLinkRow(r)}
                        </>
                    : null
                    }
                </ContainerRow>
                )
            },
        },
    ]}

    

   
    return {
        openDetail,
        gridColumns,
        getAllGitems,
        loadPrs,
    };
};


