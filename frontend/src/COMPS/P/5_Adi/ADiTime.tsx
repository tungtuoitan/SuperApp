import { LocalizationProvider, PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { useSRsStore } from "../../S/8_SRs/SRsStore";
import { useADiStore } from "./ADiStore";
import { useADiaHelpers } from "./ADiaHelpers";
import { ADiTimePicker, StartDatePicker, WRow } from "./5ui";
import { dateToCDate } from "../../S/3_TimeConfig/TimeHelpers";
import { usePridContainerStore } from "../2_PridContainer/PridContainerStore";
import { useSnackbar } from "notistack";
import {displayCDate} from "../2_PridContainer/2he";


export default function ADiTime() {
    const { handleChange } = useADiaHelpers();
    const { aDia, setADia } = useADiStore();
    const { sRs } = useSRsStore();
    const { allPrs } = usePridContainerStore();
    const allPesults = allPrs.find(
        (pr) => pr.id === aDia?.pesult.prId
    )?.pesults;
    const { enqueueSnackbar } = useSnackbar();

    return (
        <WRow>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <ADiTimePicker
                    label="Time"
                    name="time"
                    className="dateStartPicker"
                    value={new Date(aDia?.pesult.time ?? "")}
                    disableFuture
                    onChange={(newValue) => {
                        if (newValue) {
                            const cDate = dateToCDate(new Date(newValue));
                            let tryFindSameDate = allPesults?.find(
                                (pesult) => pesult.time === cDate
                            );
                            if (tryFindSameDate) {
                                enqueueSnackbar("Time already exists", {
                                    variant: "error",
                                });
                                return;
                            }
                            if (
                                allPesults?.length &&
                                new Date(cDate) <
                                    new Date(
                                        allPesults[allPesults.length - 1].time
                                    )
                            ) {
                                enqueueSnackbar(
                                    "Time must be after the last time",
                                    { variant: "error" }
                                );
                                return;
                            }

                            handleChange("time", cDate);
                        }
                    }}
                />
            </LocalizationProvider>
            { allPesults?.length && 
                <div style={{marginTop:'6px', fontSize:'12px'}}>Last time: {displayCDate(allPesults[allPesults?.length-1].time)}</div>
            }
        </WRow>
    );
}
