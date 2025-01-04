import { IconButton, Tooltip } from "@mui/material";
import { WBar } from "./3ui";
import { useSnackbar } from "notistack";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { PetailForm } from "./3ty";
import { usePetailFormStore } from "./PetailFormsStore";
import { usePridContainerStore } from "../2_PridContainer/PridContainerStore";
import { cDateToUTCDate } from "../../S/3_TimeConfig/TimeHelpers";
import { iuPr } from "../PrAPIs";
import { toNumber } from "lodash";
import { PrsResult } from "../PrTypes";
import { usePrAllTabsStore } from "../1_PrAllTabs/PrAllTabsStore";

type PetailBarProps = {
    id: number;
};
export const PetailBar = (props: PetailBarProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const [petails, dispatch] = usePetailFormStore();
    const { allPrs } = usePridContainerStore();
    const petail = petails.find((petail) => petail.id === props.id) ?? ({} as PetailForm);
    const { prAllTabIds, setPrAllTabIds, curTabIndex, setCurTabIndex } = usePrAllTabsStore();

    const savePetail = (e: any) => {
        const x = {
            id: props.id ?? 0,
            name: petail.name,
            parentId: petail.parentId ?? null,

            types: petail.types ?? "Doi",
            repeatType: petail.repeatType,

            timeStart: cDateToUTCDate(petail.timeStart),
            timeEnd: petail.timeEnd ? cDateToUTCDate(petail.timeEnd) : null,

            activeC: petail.activeC,
            statusC: petail.statusC,
            prioriC: petail.prioriC,

            fink: petail.fink,
            desc: petail.desc,
        };

        if(x.id === 0) {
            iuPr(x).then((data: PrsResult) => {
                if (data.options.success) {
                    enqueueSnackbar(data.options.message, { variant: "success" });
                    dispatch({ type: "REMO", payload: { id: 0 } });
                    const newPetail: PetailForm = {
                        id: toNumber(data.prs[0].id),
                        name: data.prs[0].name,
                        parentId: data.prs[0].parentId ?? null,
                        types: data.prs[0].types,
                        repeatType: data.prs[0].repeatType,
                        timeStart: data.prs[0].timeStart,
                        timeEnd: data.prs[0].timeEnd,
                        activeC: data.prs[0].activeC,
                        statusC: data.prs[0].statusC,
                        prioriC: data.prs[0].prioriC,
                        fink: data.prs[0].fink,
                        desc: data.prs[0].desc,
                        history: "",
                    };
                    dispatch({ type: "INSE", payload: newPetail });
                    const newPrAllTabIds = [...prAllTabIds];
                    newPrAllTabIds[curTabIndex] = toNumber(data.prs[0].id);
                    setPrAllTabIds(newPrAllTabIds);
                } 
                else {
                    enqueueSnackbar(data.options.message, { variant: "error" });
                }
            });
        }
        else {
            iuPr(x).then((data: PrsResult) => {
                if (data.options.success) {
                    enqueueSnackbar(data.options.message, { variant: "success" });
                    const newPetail: PetailForm = {
                        id: toNumber(data.prs[0].id),
                        name: data.prs[0].name,
                        parentId: data.prs[0].parentId ?? null,
                        types: data.prs[0].types,
                        repeatType: data.prs[0].repeatType,
                        timeStart: data.prs[0].timeStart,
                        timeEnd: data.prs[0].timeEnd,
                        activeC: data.prs[0].activeC,
                        statusC: data.prs[0].statusC,
                        prioriC: data.prs[0].prioriC,
                        fink: data.prs[0].fink,
                        desc: data.prs[0].desc,
                        history: "",
                    };
                    dispatch({ type: "UPDA", payload: newPetail });
                } 
                else {
                    enqueueSnackbar(data.options.message, { variant: "error" });
                }
            });

        }
    };

    const cancelPetail = (e: any) => {
        const pr = allPrs.find((pr) => pr.id === props.id);
        let x;
        if (pr) {
            x = {
                id: pr.id,
                name: pr.name,
                parentId: pr.parentId ?? null,

                types: pr.types,
                repeatType: pr.repeatType,

                timeStart: cDateToUTCDate(pr.timeStart),
                timeEnd: pr.timeEnd ? cDateToUTCDate(pr.timeEnd) : null,

                activeC: pr.activeC,
                statusC: pr.statusC,
                prioriC: pr.prioriC,

                fink: pr.fink,
                desc: pr.desc,
            };
        } else {
            x = {
                id: 0,
                name: "New Pr",
                parentId: null,

                types: "Doi",
                repeatType: "evda",

                timeStart: new Date(),
                timeEnd: null,

                activeC: "Act",
                statusC: "Ope",
                prioriC: "Low",

                fink: "",
                desc: "",
            };
        }
        dispatch({ type: "UPDA", payload: x });
    };

    return (
        <WBar>
            <Tooltip title="Save">
                <span>
                    <IconButton onClick={(e) => savePetail(e)}>
                        <CheckOutlinedIcon />
                    </IconButton>
                </span>
            </Tooltip>
            <Tooltip title="Cancel">
                <span>
                    <IconButton onClick={(e) => cancelPetail(e)}>
                        <CloseOutlinedIcon />
                    </IconButton>
                </span>
            </Tooltip>
        </WBar>
    );
};
