import { Paper, PaperProps, styled, useTheme } from "@mui/material";
import { FC, ReactNode, useEffect, useState } from "react"
import {useMainFilterInputFieldsHelper} from "./InputFieldsHelper";

export interface IMainFilterInputFieldsProps {
    smallerTextbox?: boolean | undefined    
    paperProps?: PaperProps | undefined
    children: ReactNode
    style?: React.CSSProperties
}

interface StyledPaperProps extends PaperProps {
    style?: React.CSSProperties,
    count: number
}

export const FilterInputFieldsContainer = styled(Paper)<StyledPaperProps>(({ style, count })=>({
    textAlign: 'left',
    padding: '0px 20px 0px 20px',
    overflowY: 'auto',
    '& .MuiPaper-root': {
        height: '95%',
        '&.MuiPaper-elevation': {
            '&.MuiPaper-rounded': {
              '&.MuiPaper-elevation1': {
                  padding: 0,
                 boxShadow: 'none',
                 overflowY: 'unset',
                 marginRight: '20px',
                '& .filter-input-fields': {
                  height: '100%!important'
                }
              },
              '&.MuiPaper-elevation1:first-of-type': {
                  marginRight: count > 1 ? '20px': '0'
              },
              '&.MuiPaper-elevation1:last-of-type': {
                  marginRight: '0',
                  alignContents: 'flex-end'
              }
            }
        }
    },
    '& .filter-textbox-short': {
        minWidth: '210px!important',
        maxWidth: '210px!important',
        '& .MuiFormControl-root .MuiTextField-root': {
            marginLeft: 'unset!important',
        }
    },
    '& .filter-date-textbox-short': {
        minWidth: '210px!important',
        maxWidth: '210px!important',
        '& .MuiInputBase-root': {
            '& .MuiInputBase-input': {
                padding: '8.5px 14px',
            }
        },
    },
    ...style
}));

export const FilterInputFieldsContainerSmaller = styled(Paper)({
    textAlign: 'left',
    padding: '18px', 
    overflowY: 'auto',
    '& .MuiPaper-root': {
        height: '95%',
    },
    '& .filter-textbox-short': {
        minWidth: '210px!important',
        maxWidth: '210px!important',
        '& .MuiFormControl-root .MuiTextField-root': {
            marginLeft: 'unset!important',
        },
        marginBottom: '15px!important',
    },
    '& .filter-last-textbox-short': {
        minWidth: '210px!important',
        maxWidth: '210px!important',
        '& .MuiFormControl-root .MuiTextField-root': {
            marginLeft: 'unset!important',
        },
        marginBottom: '-13px!important',
    },
    
    '& .MuiInputBase-inputSizeSmall': {
        padding: '6px 14px',
    }
});

export const MainFilterInputFields :FC<IMainFilterInputFieldsProps> = (props) => {
    const {smallerTextbox, children, paperProps={}, style={}} = props;
    const {adjustDocumentLibraryFilter} = useMainFilterInputFieldsHelper();
    const  [count, setCount] = useState(0);
    useEffect(() => {
        // adjust the document widget filter input fields height
        adjustDocumentLibraryFilter();

        const _count = document.querySelectorAll('#filterRight .MuiPaper-elevation1').length;
        setCount(_count);
        //setHeight({target: '.filter-input-fields', lessPx: 50});
    },[]);
    return (
        <>
            {(smallerTextbox ?? false)
            ?   <FilterInputFieldsContainerSmaller
                    style={style ?? {}}
                    className="filter-input-fields"
                    elevation={16}>
                    {children}
                </FilterInputFieldsContainerSmaller>
            :   <FilterInputFieldsContainer
                    style={style ?? {}}
                    className="filter-input-fields"
                    count={count}
                    elevation={16}
                    {...(paperProps as any)}>
                    {children}
                </FilterInputFieldsContainer>
            }        
        </>
    )
}