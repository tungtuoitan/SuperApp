
export const _3css = {
    // height: 16,
    // background: '#828282',
    // pastBackground: '#82828220',
    // backgroundDrag: 'red',
    // backgroundJobTask: '#000000',
    // display: 'flex',
    // fontSize: '12px',
    // focusBorderColor: '#0D99FF',

    getDatePickerCSSSelector : () => {
        const div1 = `div.MuiInputBase-root`;
        const div2 = `${div1} div.MuiInputAdornment-root`;
        return {
            labelShrink: `label[data-shrink="true"]`,
            labelNoShrink: `label[data-shrink="false"]`,
            div1: `${div1}`,
            input: `${div1} input`,
            div2: `${div1} ${div2}`,
            button: `${div1} ${div2} button.MuiButtonBase-root`,
            fieldset: `${div1} fieldset`,
            legend: `${div1} fieldset legend`,
            span: `${div1} fieldset legend span`,
        }
    },
    getSelectCSSSelector : (id?: string) => {
        const div1 = `div.MuiInputBase-root`;
        const div2 = `${div1} div.MuiSelect-select#${id}`;
        return {
            labelShrink: `label[data-shrink="true"]`,
            labelNoShrink: `label[data-shrink="false"]`,
            div1: `${div1}`,
            div2: `${div1} ${div2}`,
            input: `${div1} input`,
            svg: `${div1} svg`,
            fieldset: `${div1} fieldset`,
            legend: `${div1} fieldset legend`,
            span: `${div1} fieldset legend span`,
        }
    }
}
