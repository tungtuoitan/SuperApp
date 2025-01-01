import {FormControl, FormLabel, Paper, RadioGroup, styled} from "@mui/material";
import {DatePicker, TimePicker} from "@mui/x-date-pickers";
import {helperMUIcss} from "../../CommonHelpers/5_MUIcss";
import {Link} from "react-router-dom";
import {FinkToProtocol} from "../5_Etail/5he";
import {EtailForm, FigmaButtonProps} from "../5_Etail/5ty";

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


export const FigmaButton = (props: FigmaButtonProps) => <Link 
    to={FinkToProtocol(props.etail.fink??'')??''} 
    target="_self" 
    className={props.etail.fink ? 'figma-button':''}
    style={{ 
        width: 24, 
        height: '100%', 
        border: '1px solid #00000050', 
        borderRadius: 4, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        pointerEvents: props.etail.fink ? 'auto' : 'none',
    }}>
    <img src={props.etail.fink ? '/figma-icon.png' : '/figma-gray-icon.png'} alt="Figma Icon" style={{ width: 24, height: 24 }} />
</Link>

export const FCSubType = styled(FormControl)({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
});


export const FCType = styled(FormControl)({
    display: "flex",
    flexDirection: "column",
    border: "1px solid rgb(199, 199, 199)",
    borderRadius: "5px",
    height: "30px",
    width: "100%",
});

export const FLType = styled(FormLabel)({
    textAlign: "left",
    fontSize: 10,
    position: "relative",
    width: 42,
    background: "white",
    top: "-8px",
    left: "10px",
    padding: "0 5px 0 5px",
});

export const RGType = styled(RadioGroup)({
    display: "flex",
    flexDirection: "row",
    fontSize: "12px",
    position: "relative",
    top: "-19px",
    padding: "0 10px 0 10px",
});