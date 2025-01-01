
export const helperMUIcss = {

    getTextFieldCSSSelector: (name: string) => {
        const div0Class = `TFContainer-${name}`; 

        return {
            
            //! 0. 
            div0Class: div0Class, //! no use, bcz we write this in the className of the TextField
            
            // 1.children of div0Class
            div1: `div`,
            label1Shrink: `label[data-shrink="true"]`,
            label1NoShrink: `label[data-shrink="false"]`,
            
            // 2. children of divChild
            input2: `div input`,
            input2Disable: `div input.Mui-disabled`,
            fieldset2: `div fieldset`,

            // 3. child of fieldset
            legend3: `div fieldset legend`,

            // 4. child of legend
            span4: `div fieldset legend span`,
        }
    },
    getDatePickerCSSSelector : () => {
        const div0Class = 'MuiFormControl-root' //! no use

        // 1. children of div0Class
        const div1 = `div.MuiInputBase-root`;

        // 2. children of div1
        const div2 = `${div1} div.MuiInputAdornment-root`;

        return {
            // 1. children of div0Class
            div1: `${div1}`,
            label1Shrink: `label[data-shrink="true"]`,
            label1NoShrink: `label[data-shrink="false"]`,

            // 2. children of div1
            input2: `${div1} input`,
            div2: `${div1} ${div2}`,
            fieldset2: `${div1} fieldset`,


            // 3. children of div2
            button3: `${div1} ${div2} button.MuiButtonBase-root`,
            // 3. children of fieldset
            legend3: `${div1} fieldset legend`,
            span3: `${div1} fieldset legend span`,
        }
    },
    getSelectCSSSelector : () => {
        const div0Class = 'MuiFormControl-root' //! no use

        const div1 = `div.MuiInputBase-root`;
        return {

            // 1. children of div0Class
            label1Shrink: `label[data-shrink="true"]`,
            label1NoShrink: `label[data-shrink="false"]`,
            div1: `${div1}`,

            // 2. children of div1
            div2: `${div1} div`,
            input2: `${div1} input`,
            svg2: `${div1} svg`,
            fieldset2: `${div1} fieldset`,

            // 3. children of div2
            legend2: `${div1} fieldset legend`,

            // 4. children of fieldset
            span2: `${div1} fieldset legend span`,
        }
    },
    getTextFieldMultipleLineCSSSelector: (name: string) => {
        const div0Class = `TFContainer-${name}`; 

        return {
            
            //! 0. 
            div0Class: div0Class, //! no use, bcz we write this in the className of the TextField
            
            // 1.children of div0Class
            div1: `div`,
            label1Shrink: `label[data-shrink="true"]`,
            label1NoShrink: `label[data-shrink="false"]`,
            
            // 2. children of divChild
            textarea2: `div textarea[aria-invalid="false"]`,
            textarea2Disable: `div textarea[aria-hidden="true"]`,
            input2Disable: `div input.Mui-disabled`,
            fieldset2: `div fieldset`,

            // 3. child of fieldset
            legend3: `div fieldset legend`,

            // 4. child of legend
            span4: `div fieldset legend span`,
        }
    },
}
