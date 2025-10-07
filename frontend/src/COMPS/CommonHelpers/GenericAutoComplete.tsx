import { CSSProperties, FC, useEffect, useState } from "react"
import { Autocomplete, AutocompleteClasses, Box, styled, SxProps, TextField, Theme } from "@mui/material"

export const StyledTextfield = styled(TextField)({
    width: 100,
    margin: 0,
});
export const isEmpty = (value: any) => {
    const type = typeof value;
    if ((value !== null && type === 'object') || type === 'function') {
        const properties = Object.keys(value);
        if (properties.length === 0) {
            return true;
        }
    }
    return !value;
}


export interface IAutoCompleteOptions {
    id: number;
    code: string;
    desc: string;

    active?: boolean;
    type?: string;
    longDesc?: string;
    level?: number;
}
export interface GenericAutoCompleteProps {
    id?: string,
    multiple?: boolean,
    hidden?: boolean,
    size?: "small" | "medium",
    classes?: Partial<AutocompleteClasses>,
    value: IAutoCompleteOptions | null | undefined,
    sx?: SxProps<Theme>,
    inputProps: {
        name: string,
        label: string,
        required?: boolean,
        error?: boolean,
        sx?: SxProps<Theme>,
    },
    renderOptionProps?: {
        sx?: SxProps<Theme>
    },
    allOptions: IAutoCompleteOptions[],
    onChange?: (event: any, newValue: IAutoCompleteOptions | null) => void,
    style?: CSSProperties,
    disabled?: boolean,
    disableClearable?: boolean,
    getOptionDisabled?: (option: IAutoCompleteOptions) => boolean,
}

export const GenericAutoComplete: FC<GenericAutoCompleteProps> = (props: GenericAutoCompleteProps) => {
    const { id, allOptions, size, classes, onChange, inputProps, value, sx, style, disabled, renderOptionProps, disableClearable, hidden, getOptionDisabled } = props;
    const [selectedValue, setSelectedValue] = useState<IAutoCompleteOptions>({} as IAutoCompleteOptions);

    useEffect(() => {
        if (!isEmpty(value) && !isEmpty(allOptions)) {
            var _filteredOption = allOptions.filter(x => x.id === value?.id);
            if (value?.id == 0) {
                setSelectedValue({} as IAutoCompleteOptions);
            }
            if (_filteredOption.length > 0) {
                setSelectedValue(_filteredOption[0]);
            }
        }
    }, [value]);
    return (
        <Autocomplete
            id={id}
            disabled={disabled}
            options={allOptions}
            disableClearable={disableClearable}
            size={size}
            fullWidth={true}
            classes={classes}
            value={selectedValue}
            hidden={hidden}
            style={style}
            sx={{
                ...sx,
                '& .MuiOutlinedInput-root.MuiInputBase-sizeSmall': {
                    paddingTop: '3px!important',
                    paddingBottom: '4px!important',
                    '& .MuiAutocomplete-input ': {
                        padding: '2.5px 4px 2.5px 6px!important'
                    }
                },
                '& .MuiTextField-root': {
                    margin: '0!important'
                },
                '& .MuiInputLabel-outlined': {
                    marginTop: '-2px'
                },
            }}
            getOptionDisabled={getOptionDisabled}
            getOptionLabel={(option) => option?.desc ?? " "}
            isOptionEqualToValue={(option, value) => option?.desc === value?.desc}
            onChange={(event: any, newValue: IAutoCompleteOptions | null) => {
                if (onChange) {
                    if (newValue) {
                        setSelectedValue(newValue);
                    }
                    return onChange(event, newValue);
                }
            }}
            renderOption={(props, option) => {
                if (typeof (option.active) !== undefined && option.active === false) {
                    props['aria-disabled'] = true;
                }
                return <Box component="li" {...props} {...renderOptionProps} >
                    <span style={{ marginRight: '20px' }}>{option?.desc}</span>{option.longDesc}
                </Box>
            }}
            renderInput={(params) => (
                <StyledTextfield
                    {...params}
                    name={inputProps.name}
                    label={inputProps.label}
                    required={inputProps.required ?? false}
                    error={inputProps.error ?? false}
                    sx={inputProps.sx}
                    inputProps={{
                        ...params.inputProps,
                    }}
                    fullWidth />
            )}
        />
    )
}