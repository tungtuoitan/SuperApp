import {Paper, styled} from "@mui/material";
import {DatePicker, TimePicker} from "@mui/x-date-pickers";
import {helperMUIcss} from "../../CommonHelpers/5_MUIcss";

export const WRow = styled("div")({
    display: "flex",
    gap: 10,

    width: "100%",
    margin: "0 0 16px 0",
});

const dpSelector = helperMUIcss.getDatePickerCSSSelector();
export const EndDatePicker = styled(DatePicker)({
    height: 30,
    width: "calc((100% - 10px)/2)", // 10px is gap
    [`& ${dpSelector.div1}`]: {
        height: 30,
    },
    [`& ${dpSelector.label1Shrink}`]: {
        fontSize: "12px",
        top: 3,
    },
    [`& ${dpSelector.label1NoShrink}`]: {
        top: -8,
    },
    [`& ${dpSelector.input2}`]: {
        height: 30,
        padding: "0px 0px 0 10px",
        fontSize: "12px",
    },
    [`& ${dpSelector.button3}`]: {
        // height: 30,
        padding: "0 !important",
    },
    [`& ${dpSelector.legend3}`]: {
        width: "53px",
    },

});
export const EndTimePicker = styled(TimePicker)({
    height: 30,
    width: "calc((100% - 10px)/2)", // 10px is gap
    [`& ${dpSelector.div1}`]: {
        height: 30,
    },
    [`& ${dpSelector.label1NoShrink}`]: {
        top: -8,
    },
    [`& ${dpSelector.label1Shrink}`]: {
        fontSize: "12px",
        top: 3,
    },
    [`& ${dpSelector.input2}`]: {
        height: 30,
        padding: "0px 0px 0 10px",
        fontSize: "12px",
    },
    [`& ${dpSelector.button3}`]: {
        // height: 30,
        padding: "0 !important",
    },
    [`& ${dpSelector.legend3}`]: {
        width: "53px",
    },
});

export const StartDatePicker = styled(DatePicker)({
    height: 30,
    width: "calc((100% - 10px)/2)", // 10px is gap
    [`& ${dpSelector.div1}`]: {
        height: 30,
    },
    [`& ${dpSelector.label1Shrink}`]: {
        fontSize: "12px",
        top: 3,
    },
    [`& ${dpSelector.label1NoShrink}`]: {
        top: -8,
    },
    [`& ${dpSelector.input2}`]: {
        height: 30,
        padding: "0px 0px 0 10px",
        fontSize: "12px",
    },
    [`& ${dpSelector.button3}`]: {
        // height: 30,
        padding: "0 !important",
    },
    [`& ${dpSelector.legend3}`]: {
        width: "53px",
    },
});

export const StartTimePicker = styled(TimePicker)({
    height: 30,
    width: "calc((100% - 10px)/2)", // 10px is gap
    [`& ${dpSelector.div1}`]: {
        height: 30,
    },
    [`& ${dpSelector.label1NoShrink}`]: {
        top: -8,
    },
    [`& ${dpSelector.label1Shrink}`]: {
        fontSize: "12px",
        top: 3,
    },
    [`& ${dpSelector.input2}`]: {
        height: 30,
        padding: "0px 0px 0 10px",
        fontSize: "12px",
    },
    [`& ${dpSelector.button3}`]: {
        // height: 30,
        padding: "0 !important",
    },
    [`& ${dpSelector.legend3}`]: {
        width: "53px",
    },

});