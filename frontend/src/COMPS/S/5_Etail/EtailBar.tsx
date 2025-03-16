import {IconButton, Tooltip} from "@mui/material";
import {WBar} from "./5ui";
import {useTLBaseFgStore} from "../2_TLBaseFg/TLBaseFgStore";
import {useSnackbar} from "notistack";
import {cDateToUTCDate} from "../3_TimeConfig/TimeHelpers";
import {sr} from "../TLConstants";
import {iuEv} from "../TLAPIs";
import { _3css } from "../3_TimeConfig/3css";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {useEtailFormStore} from "./EtailFormsStore";
import {EtailForm} from "./5ty";
import {useAuthStore} from "../../Auth/AuthStore";


type EtailBarProps = {
    id: number;
}
export const EtailBar = (props: EtailBarProps) => {
    const { allEvs, setAllEvs } = useTLBaseFgStore();
    const { enqueueSnackbar } = useSnackbar();
    const [etails, dispatch] = useEtailFormStore();
    const etail = etails.find(etail => etail.id === props.id) ?? {} as EtailForm;
    const { auth } = useAuthStore();

    const saveEtail = (e: any) => {
        const ev = allEvs.find((ev) => ev.id === props.id);
        if (ev) {
            const x = {
                ...ev,
                id: ev.id,
                name: etail.name,
                type: etail.type,
                parentId: etail.parentId ?? null,
                levelC: etail.levelC ?? sr.hour.c,
                timeStart: cDateToUTCDate(etail.timeStart),
                timeEnd: cDateToUTCDate(etail.timeEnd),
                activeC: etail.activeC,
                statusC: etail.statusC,
                prioriC: etail.prioriC,
                fink: etail.fink,
                desc: etail.desc,
                evelC: etail.evelC,
                subType: etail.subType,
            }
            iuEv(auth.userToken, x).then((data: any) => {
                if (data.options.success) {
                    enqueueSnackbar(data.options.message, {
                        variant: "success",
                        autoHideDuration: 3000,
                    });
                } else {
                    enqueueSnackbar(data.options.message, {
                        variant: "error",
                        autoHideDuration: 3000,
                    });
                }
            });
        }
    };
    const cancelEtail = (e: any) => {
        const ev = allEvs.find((ev) => ev.id === props.id);
        if (ev) {
            const x = {
                ...ev,
                id: ev.id,
                name: ev.name,
                type: ev.type,
                parentId: ev.parentId ?? null,
                levelC: ev.levelC ?? sr.hour.c,
                timeStart: cDateToUTCDate(ev.timeStart),
                timeEnd: cDateToUTCDate(ev.timeEnd),
                activeC: ev.activeC,
                statusC: ev.statusC,
                prioriC: ev.prioriC,
                fink: ev.fink,
                desc: ev.desc,
                evelC: ev.evelC,
                subType: ev.subType
            }
            dispatch({type: 'UPDA', payload: x});
        }
    };
    return (
    <WBar>
        <Tooltip title="Save">
            <span>
                <IconButton onClick={(e) => saveEtail(e)}>
                    <CheckOutlinedIcon />
                </IconButton>
            </span>
        </Tooltip>
        <Tooltip title="Cancel">
            <span>
                <IconButton onClick={(e) => cancelEtail(e)}>
                    <CloseOutlinedIcon />
                </IconButton>
            </span>
        </Tooltip>
    </WBar>
)}