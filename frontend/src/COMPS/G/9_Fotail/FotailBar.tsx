import { IconButton, Tooltip } from "@mui/material";
import { WBar } from "./9ui";
import { useSnackbar } from "notistack";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { usePetailFormStore } from "./FotailFormsStore";
import { usePridContainerStore } from "../2_GridContainer/PridContainerStore";
import { iuPr } from "../GAPIs";
import { toNumber } from "lodash";
import { usePrAllTabsStore } from "../1_GAllTabs/PrAllTabsStore";
import {FotailForm} from "./9ty";
import {FosResult} from "../8_Fo/FoTypes";

type FotailBarProps = {
    id: number;
};
export const FotailBar = (props: FotailBarProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const [petails, dispatch] = usePetailFormStore();
    const { allPrs } = usePridContainerStore();
    const petail = petails.find((petail) => petail.id === props.id) ?? ({} as FotailForm);
    const { prAllTabIds, setPrAllTabIds, curTabIndex, setCurTabIndex } = usePrAllTabsStore();

    const savePetail = (e: any) => {
        const x = {
            id: props.id ?? 0,
            name: petail.name,
            shortName: petail.shortName,
            parentId: petail.parentId ?? null,

            activeC: petail.activeC,
            prioriC: petail.prioriC,
            description: petail.description,
            pinIndex: petail.pinIndex
        };

        if(x.id === 0) {
            iuPr(x).then((data: FosResult) => {
                if (data.options.success) {
                    enqueueSnackbar(data.options.message, { variant: "success" });
                    dispatch({ type: "REMO", payload: { id: 0 } });
                    const newPetail: FotailForm = {
                        id: toNumber(data.fos[0].id),
                        name: data.fos[0].name,
                        shortName: data.fos[0].shortName,
                        iconId: data.fos[0].iconId,

                        parentId: data.fos[0].parentId,
                        activeC: data.fos[0].activeC,
                        prioriC: data.fos[0].prioriC,
                        description: data.fos[0].description,
                        pinIndex: data.fos[0].pinIndex,
                    };
                    dispatch({ type: "INSE", payload: newPetail });
                    const newPrAllTabIds = [...prAllTabIds];
                    newPrAllTabIds[curTabIndex] = 'Pr-'+toNumber(data.fos[0].id);
                    setPrAllTabIds(newPrAllTabIds);
                } 
                else {
                    enqueueSnackbar(data.options.message, { variant: "error" });
                }
            });
        }
        else {
            iuPr(x).then((data: FosResult) => {
                if (data.options.success) {
                    enqueueSnackbar(data.options.message, { variant: "success" });
                    const newPetail: FotailForm = {
                        id: toNumber(data.fos[0].id),
                        name: data.fos[0].name,
                        parentId: data.fos[0].parentId,
                        activeC: data.fos[0].activeC,
                        prioriC: data.fos[0].prioriC,
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

                timeStart: pr.timeStart,
                timeEnd: pr.timeEnd ? pr.timeEnd : null,

                activeC: pr.activeC,
                statusC: pr.statusC,
                prioriC: pr.prioriC,

                fink: pr.fink,
                desc: pr.desc,

                pesults: pr.pesults,
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

                pesults: []
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
