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
            parentId: fotail.parentId,
            iconId: fotail.iconId,

            activeC: fotail.activeC,
            prioriC: fotail.prioriC,
            
            desc: fotail.desc,
            fink: fotail.fink,
            pinIndex: fotail.pinIndex
        };

        if(x.id === toSid('Fo', 0)) {
            iuFos(x).then((data: FosResult) => {
                if (data.options.success) {
                    enqueueSnackbar(data.options.message, { variant: "success" });
                    dispatch({ type: "REMO", payload: { id: 'Fo-0' } });
                    const newFotail: FotailForm = {
                        id: data.fos[0].id,
                        name: data.fos[0].name,
                        iconId: data.fos[0].iconId,
                        parentId: data.fos[0].parentId,
                        
                        activeC: data.fos[0].activeC,
                        prioriC: data.fos[0].prioriC,
                        
                        desc: data.fos[0].desc,
                        fink: data.fos[0].fink,
                        pinIndex: data.fos[0].pinIndex,
                    };
                    dispatch({ type: "INSE", payload: newFotail });
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
                    const newFotail: FotailForm = {
                        id: data.fos[0].id,
                        name: data.fos[0].name,
                        iconId: data.fos[0].iconId,
                        parentId: data.fos[0].parentId,

                        activeC: data.fos[0].activeC,
                        prioriC: data.fos[0].prioriC,

                        desc: data.fos[0].desc,
                        fink: data.fos[0].fink,
                        pinIndex: data.fos[0].pinIndex,
                    };
                    dispatch({ type: "UPDA", payload: newFotail });
                } 
                else {
                    enqueueSnackbar(data.options.message, { variant: "error" });
                }
                loadFos();
            });
        }
        console.log(fotails)
    };

    const cancelFotail = (e: any) => {
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
            };
        } else {
            x = {
                id: 0,
                name: "New Fo",
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
