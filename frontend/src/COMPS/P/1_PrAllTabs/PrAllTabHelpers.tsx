import {dateToCDate} from "../../S/3_TimeConfig/TimeHelpers";
import {usePridContainerStore} from "../2_PridContainer/PridContainerStore";
import {PetailForm} from "../3_Petail/3ty";
import {usePetailFormStore} from "../3_Petail/PetailFormsStore";
import {getPrs, iuPr} from "../PrAPIs";
import {usePrAllTabsStore} from "./PrAllTabsStore";
import {Pr, Pr2} from "../PrTypes";
import {useSnackbar} from "notistack";

export const usePrAllTabHelpers = () => {
    const { prAllTabIds, setPrAllTabIds, curTabIndex, setCurTabIndex } = usePrAllTabsStore();
    const [petails, dispatch] = usePetailFormStore();
    const {rowSelectionModel, setRowSelectionModel, allPrs, setAllPrs} = usePridContainerStore();
    const { enqueueSnackbar } = useSnackbar();

    const createNewPetail = (e:any) => {
        e.preventDefault();
        e.stopPropagation();
        const today = new Date();
        today.setHours(0, 0, 0, 0); 

        if (prAllTabIds.includes(0)) {
            setCurTabIndex(prAllTabIds.indexOf(0));
        } 
        else {
            setPrAllTabIds((prev) => {
                const newPetail: PetailForm = {
                    id: 0,
                    name: "New Pr",
                    parentId: null,
    
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
                return [...prev, 0];
            })
        }
    }
    const deletePrs = (e:any) => {
        e.preventDefault();
        e.stopPropagation();
        const updatePromises = rowSelectionModel.map((id) => {
            const numericId = typeof id === "string" ? parseInt(id, 10) : id; // Ensure `id` is a number
            const pr = allPrs.find((pr) => pr.id === numericId) ?? ({} as PetailForm);
            return iuPr({ ...pr, activeC: "InAct" });
        });
        Promise.all(updatePromises)
            .then((results) => {
                if(results.every((r) => r.options.success)) {
                    getPrs()
                    .then((prs:Pr2[]) => {
                        let proData = prs.filter((pr) => pr.activeC== 'Act')
                        proData.forEach((pr) => pr.pesults ? JSON.parse(pr.pesults) : [])
                        setAllPrs(proData);
                        enqueueSnackbar("Prs deleted successfully", { variant: "success" });
                    })
                }
            })
            .catch((error) => {
            // Handle error for any update
                enqueueSnackbar("Error deleting Prs", { variant: "error" });
            });
    }

    return { createNewPetail, deletePrs }
}