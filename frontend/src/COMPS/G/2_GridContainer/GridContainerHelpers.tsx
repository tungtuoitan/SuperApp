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
import {Kesult} from "../10_Rialog/10ty";

const ContainerRow = styled('div')({
    display:'flex', flexDirection:'row', width: '100%', height: '100%'
});

export const useGridContainerHelpers = () => {
    const [petails, dispatch] = usePetailFormStore();
    const [fotails, dispatchFo] = useFotailFormStore();
    const { allPrs, setAllPrs, rowSelectionModel, readyCuttingRows, currentHoveringRow, activeId, setCurrentHoveringRow,refreshGrid, setRefreshGrid, searchText, displayDeleltedRows, gridState} = useGridContainerStore();
    const { setADia, aDia } = useADiStore();
    const { openDia } = useADiaHelpers();
    const { gAllTabIds,setGAllTabIds,curTabIndex, setCurTabIndex} = useGAllTabsStore();
    const { sRs } = useSRsStore();
    const {allFos,setLastFoId, lastFoId} = useFoStore();
    const { PrRow,
        FolderRow,
        KnowledgeRow,
        JustLinkRow} = useRowHelpers();

const sortFolders = (folders: Fo[]): Fo[] => {
    // Tạo một map để tra cứu folder theo id
    const folderMap: Record<string, Fo> = {};
    folders.forEach((folder) => {
        folderMap[folder.id] = { ...folder, children: [], level: 0 };
    });

    // Xây dựng cấu trúc cây
    const rootFolders: Fo[] = [];
    folders.forEach((folder) => {
        if (folder.parentId && folderMap[folder.parentId]) {
            folder.level = (folderMap[folder.parentId]?.level ?? 0) + 1; // Gán level dựa vào cha
            if (folderMap[folder.parentId] && Array.isArray(folderMap[folder.parentId].children)) {
                (folderMap[folder.parentId].children as Fo[]).push(folderMap[folder.id]);
            }
        } else {
            rootFolders.push(folderMap[folder.id]); // Nếu không có parentId => là root
        }
    });

    // Hàm để flatten cây ra thành mảng theo thứ tự cha trước con sau
    const result: Fo[] = [];
    const flatten = (nodes: Fo[], depth = 0) => {
        nodes.sort((a, b) => a.name.localeCompare(b.name, "vi")); // Sắp xếp theo A-Z (có dấu)
        nodes.forEach((node) => {
            node.level = depth; // Cập nhật level
            result.push({ ...node, name: " ".repeat(depth * 4) + node.name });
            if (node.children && node.children.length > 0) {
                flatten(node.children, depth + 1);
            }
        });
    };

    flatten(rootFolders);
    return result;
};
        

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
               

            
            case 'open-knowledge':
                allGItems = allPrs.filter(pr => pr.types.includes(sr.knowledge.c) && pr.statusC === sr.status.open.c)
                return allGItems.filter(r => r.activeC === 'Act').sort((a, b) => a.name.localeCompare(b.name, 'vi'))

                
            case 'inprogress-review-today':
                allGItems = allPrs.filter(pr => pr.types.includes(sr.knowledge.c) && pr.statusC === sr.status.inProgress.c)
                allGItems = allGItems.filter(pr => {
                    const pesults = (pr as Pr).pesults as Kesult[];
                    let nextReview = pesults[pesults.length - 1]?.nextReview;
                    if(nextReview) {
                        const nextReviewDate = new Date(nextReview) as Date;
                        nextReviewDate.setHours(0, 0, 0, 0)
                        const today = new Date() as Date;
                        today.setHours(0, 0, 0, 0)
                        
                        return  nextReviewDate.getTime() <= today.getTime();
                    }
                    return true; // case: nextReview is null
                });
                                
                return allGItems.filter(r => r.activeC === 'Act').sort((a, b) => a.name.localeCompare(b.name, 'vi'))

            case 'inprogress-review-later':
                allGItems = allPrs.filter(pr => pr.types.includes(sr.knowledge.c) && pr.statusC === sr.status.inProgress.c)
                allGItems = allGItems.filter(pr => {
                    const pesults = (pr as Pr).pesults as Kesult[];
                    const nextReview = pesults[pesults.length - 1]?.nextReview;
                    if(nextReview) {
                        const nextReviewDate = new Date(nextReview) as Date;
                        nextReviewDate.setHours(0, 0, 0, 0)
                        const today = new Date() as Date;
                        today.setHours(0, 0, 0, 0)
                        
                        return  nextReviewDate.getTime() > today.getTime();
                    }
                    return false; // case: nextReview is null
                });
                return allGItems.filter(r => r.activeC === 'Act').sort((a, b) => a.name.localeCompare(b.name, 'vi'))
            
            
            
            
                case 'relearn':
                allGItems = allPrs.filter(pr => pr.types.includes(sr.knowledge.c) && pr.statusC === sr.status.inProgress.c 
                                // && pr.statusC === sr.knowledgeOnRelearn.c
                                )
                return allGItems.filter(r => r.activeC === 'Act').sort((a, b) => a.name.localeCompare(b.name, 'vi'))
         
            case 'all-knowledge':
                allGItems = allPrs.filter(pr => pr.types.includes(sr.knowledge.c))
                                .sort((a, b) => a.name.localeCompare(b.name, 'vi'))
                return allGItems.filter(r => r.activeC === 'Act')
                
            case 'all-folder':
                allGItems = sortFolders(allFos.filter(fo => fo.iconId !== ('link' as iconType)))    
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
                knowLevelC: ev.knowLevelC,
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


