import {Box, IconButton, styled} from "@mui/material"
import {DatePicker} from "@mui/x-date-pickers"
import {helperMUIcss} from "../../CommonHelpers/5_MUIcss"

export const WLeft = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    paddingLeft: 10,
    alignItems: 'center',
    gap: 10,
    height: '100%',
    width: "33.3%",
    
})
export const WMid = styled(Box)({
    display: 'flex',
    flexDirection: 'row',  
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    height: '100%',
    width: "33.3%"
})
export const WBar = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50
})

export const WArrowBtn = styled(IconButton)({
    width: 40,
    height: 40,
    fontSize: '10px !important',
    fontStyle: 'italic',
})

const dpSelector = helperMUIcss.getDatePickerCSSSelector();
export const FromDatePicker = styled(DatePicker)({
    height: 30, 
    width: 150,
    [`& ${dpSelector.div1}`]: {
        height: 30,
    },
    [`& ${dpSelector.label1NoShrink}`]: {
        top: -8,
    },
    [`& ${dpSelector.input2}`]: {
        height: 30,
        padding: '0px 0px 0 10px',
    },
})
export const ToDatePicker = styled(DatePicker)({
    height: 30, 
    width: 150,
    [`& ${dpSelector.div1}`]: {
        height: 30,
    },
    [`& ${dpSelector.label1NoShrink}`]: {
        top: -8,
    },
    [`& ${dpSelector.input2}`]: {
        height: 30,
        padding: '0px 0px 0 10px',
    },
    [`& ${dpSelector.button3}`]: {
        // height: 30,
        padding: '0 !important',
    },
})