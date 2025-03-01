import {dateToCDate} from "../../S/3_TimeConfig/TimeHelpers";
import {useGridContainerStore} from "../2_GridContainer/GridContainerStore";
import {PetailForm} from "../3_Petail/3ty";
import {usePetailFormStore} from "../3_Petail/PetailFormsStore";
import {getPrs, iuFos, iuPr} from "../GAPIs";
import {useGAllTabsStore} from "./GAllTabsStore";
import {Pr, Pr2, PrsResult} from "../GTypes";
import {useSnackbar} from "notistack";
import {paSid, toSid} from "../GHelpers";
import {useFoStore} from "../0_Fo/FoStore";
import {FotailForm} from "../9_Fotail/9ty";
import {useFotailFormStore} from "../9_Fotail/FotailFormsStore";
import {iconType} from "../../MainNav/Nhe";
import {g} from "../GConstants";
import {deepClone} from "@mui/x-data-grid/internals";
import {Fo} from "../0_Fo/FoTypes";
import {set} from "lodash";
import {Cooltip} from "../../CommonHelpers/2_CoolTip";
import {IconButton} from "@mui/material";
import UndoIcon from '@mui/icons-material/Undo';
import {sr} from "../../S/TLConstants";

export const useGAllTabHelpers = () => {
    const { gAllTabIds, setGAllTabIds, curTabIndex, setCurTabIndex } = useGAllTabsStore();
    const [petails, dispatch] = usePetailFormStore();
    const [fotails, dispatchFo] = useFotailFormStore();
    const {rowSelectionModel, setRowSelectionModel, allPrs, setAllPrs, setRefreshGrid, setLoadingGrid} = useGridContainerStore();
    const { allFos } = useFoStore();
    const { enqueueSnackbar } = useSnackbar();
    const {lastFoId } = useFoStore();

    const createNewPetail = (e:any) => {
        e.preventDefault();
        e.stopPropagation();
        const today = new Date();
        today.setHours(0, 0, 0, 0); 

        if (gAllTabIds.includes('Pr-0')) {
            setCurTabIndex(gAllTabIds.indexOf('Pr-0'));
        } 
        else {
            setGAllTabIds((prev) => {
                const newPetail: PetailForm = {
                    id: toSid('Pr', 0),
                    name: "New Pr",
                    parentId: lastFoId,
    
                    types: 'Doi',
                    repeatType: "evda",
    
                    timeStart: dateToCDate(today),
                    timeEnd: null,
    
                    activeC: "Act",
                    statusC: "Ope",
                    prioriC: "Low",
    
                    pesults: [],
    
                    fink: null,
                    desc: null,
                    knowC: sr.newKnowledge.c,
                    knowLevelC: sr.knowLevel.b1.c,

                };
                dispatch({ type: "INSE", payload: newPetail });
                setCurTabIndex(prev.length)
                return [...prev, 'Pr-0'];
            })
        }
    }
    const createNewKnowledge = (e:any) => {
        e.preventDefault();
        e.stopPropagation();
        const today = new Date();
        today.setHours(0, 0, 0, 0); 

        if (gAllTabIds.includes('Pr-0')) {
            setCurTabIndex(gAllTabIds.indexOf('Pr-0'));
        } 
        else {
            setGAllTabIds((prev) => {
                const newPetail: PetailForm = {
                    id: toSid('Pr', 0),
                    name: "New Knowledge",
                    parentId: lastFoId,
    
                    types: 'knowledge',
                    repeatType: "evda",
    
                    timeStart: dateToCDate(today),
                    timeEnd: null,
    
                    activeC: "Act",
                    statusC: "Ope",
                    prioriC: "Low",
    
                    pesults: [],
                    fink: null,
                    desc: null,
                    knowC: sr.newKnowledge.c,
                    knowLevelC: sr.knowLevel.b1.c,

                };
                dispatch({ type: "INSE", payload: newPetail });
                setCurTabIndex(prev.length)
                return [...prev, 'Pr-0'];
            })
        }
    }

    const createNewFolder = (e:any) => {
        e.preventDefault();
        e.stopPropagation();
        const today = new Date();
        today.setHours(0, 0, 0, 0); 

        if (gAllTabIds.includes('Fo-0')) {
            setCurTabIndex(gAllTabIds.indexOf('Fo-0'));
        } 
        else {
            setGAllTabIds((prev) => {
                const newFotail: FotailForm = {
                    id: toSid('Fo', 0),
                    name: "New Folder",
                    iconId: "folder",
                    parentId: lastFoId,
                    
                    activeC: "Act",
                    prioriC: "Low",

                    fink: "",
                    desc: '',

                };
                dispatchFo({ type: "INSE", payload: newFotail });
                setCurTabIndex(prev.length)
                return [...prev, 'Fo-0'];
            })
        }
    }

    const createNewLink = (e:any) => {
        e.preventDefault();
        e.stopPropagation();
        const today = new Date();
        today.setHours(0, 0, 0, 0); 

        if (gAllTabIds.includes('Fo-0')) {
            setCurTabIndex(gAllTabIds.indexOf('Fo-0'));
        } 
        else {
            setGAllTabIds((prev) => {
                const newFotail: FotailForm = {
                    id: toSid('Fo', 0),
                    name: "New Link",
                    parentId: lastFoId,
                    iconId: "link", // every Fo type:link has a link icon, if not, it's a folder
                    
                    activeC: "Act",
                    prioriC: "Low",

                    fink: "",
                    desc: '',

                };
                dispatchFo({ type: "INSE", payload: newFotail });
                setCurTabIndex(prev.length)
                return [...prev, 'Fo-0'];
            })
        }
    }
    

    

    return { 
        createNewPetail, 
        createNewFolder,
        createNewLink,
        createNewKnowledge
     }
}