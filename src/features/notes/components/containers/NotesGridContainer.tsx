import { SxProps, Theme, styled } from "@mui/material";
import { ToolbarContainer } from '@/shared/components/containers/ToolbarContainer';
import { CSSProperties } from "@mui/styles";
import { LegacyRef } from "react";

export const ContainerRoot = styled('div')({
    width: '100%',
    overflowX: 'auto',
    overflowY: 'hidden',
    backgroundColor: 'rgb(246, 246, 246)',
});

const GridWrapper = styled('div')({
    margin: '20px 20px 0',
});

export interface INotesGridContainer {
    toolbar?: React.ReactNode;
    toolbarItems?: React.ReactNode;
    grid: React.ReactNode;
    sx?: SxProps<Theme> | undefined;
    style?: CSSProperties | undefined;
    ref?: LegacyRef<HTMLDivElement> | undefined;
    sxGridWrapper?: SxProps<Theme> | undefined;
    sxBoxToolbar?: SxProps<Theme> | undefined;
}

export const ToolbarWrapper = styled('div')({
    display: 'flex',
    flexFlow: 'column',
    '& .MuiPaper-root': {
        backgroundColor: '#fff',
        color: '#000'
    }
});

/**
 * Notes Grid Container component matching portal's GridContainer pattern
 * Provides a consistent layout for notes with toolbar and grid sections
 */
export const NotesGridContainer = ({ toolbar, toolbarItems, grid, sx, style, ref, sxGridWrapper, sxBoxToolbar }: INotesGridContainer) => {
    return (
        <ContainerRoot 
            ref={ref ?? undefined}
            sx={sx ?? undefined}
            style={style ?? undefined}>
            {toolbar != null && 
                <ToolbarWrapper sx={sxBoxToolbar ?? undefined}>
                    {toolbar}
                </ToolbarWrapper>
            }
            {toolbarItems != null && 
                <ToolbarContainer>
                    {toolbarItems}
                </ToolbarContainer>
            }
            <GridWrapper sx={sxGridWrapper ?? undefined}>
                {grid}
            </GridWrapper>
        </ContainerRoot>
    );
};