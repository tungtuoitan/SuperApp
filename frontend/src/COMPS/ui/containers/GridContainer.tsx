import { SxProps, Theme, styled } from "@mui/material";
import { CSSProperties, LegacyRef, ReactNode } from "react";

export const ContainerRoot = styled('div')({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgb(246, 246, 246)',
    overflowX: 'auto',
    overflowY: 'hidden',
});

export const GridWrapper = styled('div')({
    flex: 1,
    margin: '20px 20px 0',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    // border: '1px solid green',
});

export interface IGridContainer {
    children: ReactNode;
    sx?: SxProps<Theme> | undefined;
    style?: CSSProperties | undefined;
    ref?: LegacyRef<HTMLDivElement> | undefined;
}

export const GridContainer = ({
    children,
    sx,
    style,
    ref,
}: IGridContainer) => {
    return (
        <ContainerRoot
            ref={ref ?? undefined}
            sx={sx ?? undefined}
            style={style ?? undefined}>
            {children}
        </ContainerRoot>
    );
};
