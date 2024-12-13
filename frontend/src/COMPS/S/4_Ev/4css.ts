
export const _4css = {
    height: 16,
    background: '#828282',
    pastBackground: '#82828220',
    backgroundDrag: 'red',
    backgroundJobTask: '#000000',
    display: 'flex',
    fontSize: '12px',
    focusBorderColor: '#0D99FF',

    getTextFieldCSSSelector: (name: string, id: number | string) => {
        return {
            inputId: `TFInput-${name}-${id}`,
            div1Class: `TFContainer-${name}-${id}`,
    
            div1: `TFContainer-${name}-${id}`, // relative ContainerDiv, and no need to use this, write directly in sx instead
            div2: `TFContainer-${name}-${id} div`,
            input: `#TFInput-${name}-${id}`,
            inputDisable: `#TFInput-${name}-${id}.Mui-disabled`,
            fieldset: `div fieldset`,
            legend: `div fieldset legend`,
            span: `div fieldset legend span`,
        }
    }
}
