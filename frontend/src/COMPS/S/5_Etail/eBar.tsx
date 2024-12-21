import {IconButton, Tooltip} from "@mui/material";
import {WBar} from "./5uis";
import {useTLBaseFgStore} from "../2_TLBaseFg/TLBaseFgStore";
import {useSnackbar} from "notistack";
import {EtailForm} from "./EtailType";
import {cDateToUTCDate} from "../3_TimeConfig/TimeHelpers";
import {sr} from "../TLConstants";
import {iuEv} from "../TLAPIs";
import { _3css } from "../3_TimeConfig/3css";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {useEtailFormStore} from "./EtailFormsStore";


type BarProp = {
    id: number;
}
export const EBar = (props: BarProp) => {
    const { allEvs, setAllEvs } = useTLBaseFgStore();
    const { enqueueSnackbar } = useSnackbar();
    const [etails, dispatch] = useEtailFormStore();
    const etail = etails.find(etail => etail.id === props.id) ?? {} as EtailForm;

    const saveEtail = (e: any) => {
        const ev = allEvs.find((ev) => ev.id === props.id);
        if (ev) {
            const x = {
                ...ev,
                id: ev.id,
                name: etail.name,
                parentId: etail.parentId ?? null,
                levelC: etail.levelC ?? sr.hour.c,
                timeStart: cDateToUTCDate(etail.timeStart),
                timeEnd: cDateToUTCDate(etail.timeEnd),
                activeC: etail.activeC,
                statusC: etail.statusC,
                prioriC: etail.prioriC,
            }
            iuEv(x).then((data: any) => {
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
        // cancel etail here ....
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