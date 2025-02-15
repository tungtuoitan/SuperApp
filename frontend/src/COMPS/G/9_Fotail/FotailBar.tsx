import { IconButton, Tooltip } from "@mui/material";
import { WBar } from "./9ui";
import { useSnackbar } from "notistack";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useFotailFormStore } from "./FotailFormsStore";
import { useGridContainerStore } from "../2_GridContainer/GridContainerStore";
import { getFos, iuFos } from "../GAPIs";
import { useGAllTabsStore } from "../1_GAllTabs/GAllTabsStore";
import {FotailForm} from "./9ty";
import {FosResult} from "../0_Fo/FoTypes";
import {toSid} from "../GHelpers";
import {useFoHelpers} from "../0_Fo/FoHelpers";

type FotailBarProps = {
    id: string;
};
export const FotailBar = (props: FotailBarProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const [fotails, dispatch] = useFotailFormStore();
    const { allPrs } = useGridContainerStore();
    const fotail = fotails.find((fotail) => fotail.id === props.id) ?? ({} as FotailForm);
    const { gAllTabIds, setGAllTabIds, curTabIndex, setCurTabIndex } = useGAllTabsStore();
    const { loadFos } = useFoHelpers();

    const saveFotail = (e: any) => {
        const x: FotailForm = {
            id: props.id ?? toSid('Fo', 0),
            name: fotail.name,
            shortName: fotail.shortName,
            parentId: fotail.parentId,
            iconId: fotail.iconId,

            activeC: fotail.activeC,
            prioriC: fotail.prioriC,
            description: fotail.description,
            pinIndex: fotail.pinIndex
        };

        if(x.id === toSid('Fo', 0)) {
            iuFos(x).then((data: FosResult) => {
                if (data.options.success) {
                    enqueueSnackbar(data.options.message, { variant: "success" });
                    dispatch({ type: "REMO", payload: { id: 0 } });
                    const newPetail: FotailForm = {
                        id: data.fos[0].id,
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
                    const newPrAllTabIds = [...gAllTabIds];
                    newPrAllTabIds[curTabIndex] = data.fos[0].id
                    setGAllTabIds(newPrAllTabIds);
                } 
                else {
                    enqueueSnackbar(data.options.message, { variant: "error" });
                }
                loadFos();
            })
        }
        else {
            iuFos(x).then((data: FosResult) => {
                if (data.options.success) {
                    enqueueSnackbar(data.options.message, { variant: "success" });
                    const newPetail: FotailForm = {
                        id: data.fos[0].id,
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
                loadFos();
            });

        }
    };

    const cancelFotail = (e: any) => {
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
                name: "New Fo",
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
                    <IconButton onClick={(e) => saveFotail(e)}>
                        <CheckOutlinedIcon />
                    </IconButton>
                </span>
            </Tooltip>
            <Tooltip title="Cancel">
                <span>
                    <IconButton onClick={(e) => cancelFotail(e)}>
                        <CloseOutlinedIcon />
                    </IconButton>
                </span>
            </Tooltip>
        </WBar>
    );
};
