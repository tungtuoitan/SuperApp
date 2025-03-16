import { IconButton, setRef, Tooltip } from "@mui/material";
import { WBar } from "./3ui";
import { useSnackbar } from "notistack";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { PetailForm } from "./3ty";
import { usePetailFormStore } from "./PetailFormsStore";
import { useGridContainerStore } from "../2_GridContainer/GridContainerStore";
import { iuPr } from "../GAPIs";
import { toNumber } from "lodash";
import { PrsResult } from "../GTypes";
import { useGAllTabsStore } from "../1_GAllTabs/GAllTabsStore";
import {paSid, toSid} from "../GHelpers";
import {sr} from "../../S/TLConstants";
import {useAuthStore} from "../../Auth/AuthStore";

type PetailBarProps = {
    id: string ;
};
export const PetailBar = (props: PetailBarProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const [petails, dispatch] = usePetailFormStore();
    const { allPrs, setAllPrs, refreshGrid, setRefreshGrid, searchText } = useGridContainerStore();
    const petail = petails.find((petail) => petail.id === props.id) ?? ({} as PetailForm);
    const { gAllTabIds, setGAllTabIds, curTabIndex, setCurTabIndex } = useGAllTabsStore();
    const { auth } = useAuthStore();
    const savePetail = (e: any) => {
        const x = {
            id: props.id ?? toSid('Pr', 0),
            name: petail.name,
            parentId: petail.parentId ?? 0,

            types: petail.types ?? "Doi",
            repeatType: petail.repeatType,

            timeStart: petail.timeStart, // dont convert to UTC, cuz we dont use time, just use date. so dont care about time/timezone
            timeEnd: petail.timeEnd ? petail.timeEnd : null,

            activeC: petail.activeC,
            statusC: petail.statusC,
            prioriC: petail.prioriC,

            fink: petail.fink,
            desc: petail.desc,

            pesults: JSON.stringify(petail.pesults),
            knowC: petail.knowC,
            knowLevelC: petail.knowLevelC,
        };

        if(x.id === toSid('Pr', 0)) {
            iuPr(auth.userToken, x).then((data: PrsResult) => {
                if (data.options.success) {
                    enqueueSnackbar(data.options.message, { variant: "success" });
                    dispatch({ type: "REMO", payload: { id: toSid('Pr', 0) } });
                    const newPetail: PetailForm = {
                        id: data.prs[0].id,
                        name: data.prs[0].name,
                        parentId: data.prs[0].parentId ?? 0,
                        types: data.prs[0].types,
                        repeatType: data.prs[0].repeatType,
                        timeStart: data.prs[0].timeStart,
                        timeEnd: data.prs[0].timeEnd,
                        activeC: data.prs[0].activeC,
                        statusC: data.prs[0].statusC,
                        prioriC: data.prs[0].prioriC,
                        fink: data.prs[0].fink,
                        desc: data.prs[0].desc,
                        pesults: JSON.parse(data.prs[0].pesults),
                        knowC: data.prs[0].knowC,
                        knowLevelC: data.prs[0].knowLevelC,
                    };
                    dispatch({ type: "INSE", payload: newPetail });
                    const newPrAllTabIds = [...gAllTabIds];
                    newPrAllTabIds[curTabIndex] = data.prs[0].id;
                    setGAllTabIds(newPrAllTabIds);
                } 
                else {
                    enqueueSnackbar(data.options.message, { variant: "error" });
                }
                
            });
        }
        else {

            iuPr(auth.userToken, x).then((data: PrsResult) => {
                if (data.options.success) {
                    enqueueSnackbar(data.options.message, { variant: "success" });
                    const newPetail: PetailForm = {
                        id: data.prs[0].id,
                        name: data.prs[0].name,
                        parentId: data.prs[0].parentId ?? 0,
                        types: data.prs[0].types,
                        repeatType: data.prs[0].repeatType,
                        timeStart: data.prs[0].timeStart,
                        timeEnd: data.prs[0].timeEnd,
                        activeC: data.prs[0].activeC,
                        statusC: data.prs[0].statusC,
                        prioriC: data.prs[0].prioriC,
                        fink: data.prs[0].fink,
                        desc: data.prs[0].desc,
                        pesults: JSON.parse(data.prs[0].pesults),
                        knowC: data.prs[0].knowC,
                        knowLevelC: data.prs[0].knowLevelC,
                    };
                    dispatch({ type: "UPDA", payload: newPetail });
                } 
                else {
                    enqueueSnackbar(data.options.message, { variant: "error" });
                }
            });

        }
        setRefreshGrid(true);
        
    };

    const cancelPetail = (e: any) => {
        const pr = allPrs.find((pr) => pr.id === props.id);
        let x;
        if (pr) {
            x = {
                id: pr.id,
                name: pr.name,
                parentId: pr.parentId ?? 0,

                types: pr.types,
                repeatType: pr.repeatType,

                timeStart: pr.timeStart,
                timeEnd: pr.timeEnd ? pr.timeEnd : null,

                activeC: pr.activeC,
                statusC: pr.statusC,
                prioriC: pr.prioriC,

                fink: pr.fink,
                desc: pr.desc,

                pesults: pr.pesults,
                knowC: pr.knowC,
                knowLevelC: pr.knowLevelC,
            };
        } else {
            x = {
                id: 0,
                name: "New Pr",
                parentId: 0,

                types: "Doi",
                repeatType: "evda",

                timeStart: new Date(),
                timeEnd: null,

                activeC: "Act",
                statusC: "Ope",
                prioriC: "Low",

                fink: "",
                desc: "",

                pesults: [],
                knowC: sr.newKnowledge.c,
                knowLevelC: sr.knowLevel.b1.c,
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
