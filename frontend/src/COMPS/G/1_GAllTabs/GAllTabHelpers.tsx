import {dateToCDate} from "../../S/3_TimeConfig/TimeHelpers";
import {useGridContainerStore} from "../2_GridContainer/GridContainerStore";
import {PetailForm} from "../3_Petail/3ty";
import {usePetailFormStore} from "../3_Petail/PetailFormsStore";
import {getPrs, iuPr} from "../GAPIs";
import {useGAllTabsStore} from "./GAllTabsStore";
import {Pr, Pr2} from "../GTypes";
import {useSnackbar} from "notistack";
import {paSid, toSid} from "../GHelpers";
import {useFoStore} from "../0_Fo/FoStore";
import {FotailForm} from "../9_Fotail/9ty";
import {useFotailFormStore} from "../9_Fotail/FotailFormsStore";

export const useGAllTabHelpers = () => {
    const { gAllTabIds, setGAllTabIds, curTabIndex, setCurTabIndex } = useGAllTabsStore();
    const [petails, dispatch] = usePetailFormStore();
    const [fotails, dispatchFo] = useFotailFormStore();
    const {rowSelectionModel, setRowSelectionModel, allPrs, setAllPrs} = useGridContainerStore();
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
                    shortName: "New Folder",
                    parentId: lastFoId,
    
                    activeC: "Act",
                    prioriC: "Low",
                    description: '',

                };
                dispatchFo({ type: "INSE", payload: newFotail });
                setCurTabIndex(prev.length)
                return [...prev, 'Fo-0'];
            })
        }

    }
    const deletePrs = (e:any) => {
        e.preventDefault();
        e.stopPropagation();
        const updatePromises = rowSelectionModel.map((id) => {
            const pr = allPrs.find((pr) => pr.id === id) ?? ({} as PetailForm);
            return iuPr({ ...pr, activeC: "InAct", pesults: JSON.stringify(pr.pesults) });
        });
        Promise.all(updatePromises)
            .then((results) => {
                if (results.every((r) => r.options.success)) {
                    getPrs().then((prs: Pr2[]) => {
                        let proData = prs.filter((pr) => pr.activeC == "Act");
                        const proData2: Pr2[] = proData.map((pr) => ({...pr, pesults: pr.pesults ? JSON.parse(pr.pesults) : []}));
                        setAllPrs(proData2);
                        enqueueSnackbar("Prs deleted successfully", {variant: "success"});
                    });
                }
            })
            .catch((error) => {
            // Handle error for any update
                enqueueSnackbar("Error deleting Prs", { variant: "error" });
            });
    }

    return { 
        createNewPetail, 
        deletePrs,
        createNewFolder
     }
}