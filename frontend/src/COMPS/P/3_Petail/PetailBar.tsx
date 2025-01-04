import {IconButton, Tooltip} from "@mui/material";
import {WBar} from "./3ui";
import {useSnackbar} from "notistack";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {PetailForm} from "./3ty";
import {useTLBaseFgStore} from "../../S/2_TLBaseFg/TLBaseFgStore";
import {usePetailFormStore} from "./PetailFormsStore";


type EtailBarProps = {
    id: number;
}
export const EtailBar = (props: EtailBarProps) => {
    const { allEvs, setAllEvs } = useTLBaseFgStore();
    const { enqueueSnackbar } = useSnackbar();
    const [petails, dispatch] = usePetailFormStore();
    const petail = petails.find(petail => petail.id === props.id) ?? {} as PetailForm;

    const savePetail = (e: any) => {
        const ev = allEvs.find((ev) => ev.id === props.id);
        // if (ev) {
        //     const x = {
        //         ...ev,
        //         id: ev.id,
        //         name: petail.name,
        //         type: petail.type,
        //         parentId: petail.parentId ?? null,
        //         levelC: petail.levelC ?? sr.hour.c,
        //         timeStart: cDateToUTCDate(petail.timeStart),
        //         timeEnd: cDateToUTCDate(petail.timeEnd),
        //         activeC: petail.activeC,
        //         statusC: petail.statusC,
        //         prioriC: petail.prioriC,
        //         fink: petail.fink,
        //         desc: petail.desc,
        //         evelC: petail.evelC,
        //         subType: petail.subType,
        //     }
        //     iuEv(x).then((data: any) => {
        //         if (data.options.success) {
        //             enqueueSnackbar(data.options.message, {
        //                 variant: "success",
        //                 autoHideDuration: 3000,
        //             });
        //         } else {
        //             enqueueSnackbar(data.options.message, {
        //                 variant: "error",
        //                 autoHideDuration: 3000,
        //             });
        //         }
        //     });
        // }
    };
    const cancelPetail = (e: any) => {
        // const ev = allEvs.find((ev) => ev.id === props.id);
        // if (ev) {
        //     const x = {
        //         ...ev,
        //         id: ev.id,
        //         name: ev.name,
        //         type: ev.type,
        //         parentId: ev.parentId ?? null,
        //         levelC: ev.levelC ?? sr.hour.c,
        //         timeStart: cDateToUTCDate(ev.timeStart),
        //         timeEnd: cDateToUTCDate(ev.timeEnd),
        //         activeC: ev.activeC,
        //         statusC: ev.statusC,
        //         prioriC: ev.prioriC,
        //         fink: ev.fink,
        //         desc: ev.desc,
        //         evelC: ev.evelC,
        //         subType: ev.subType
        //     }
        //     dispatch({type: 'UPDA', payload: x});
        // }
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
)}