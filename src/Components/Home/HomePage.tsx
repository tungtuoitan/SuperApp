import { GridContainer, GridWrapper } from "../common/GridContainer";
import { ToolbarContainer } from "../common/ToolbarContainer";
import { NoteCreate } from "./toolbars/items/NoteCreate";
import { NoteSearch } from "./toolbars/items/NoteSearch";
import { NoteFilter } from "./toolbars/items/NoteFilter";
import { Box } from "@mui/material";
import {NoteGrid} from "./NoteGrid";

export default function HomePage() {
    return (
        <GridContainer>
            <ToolbarContainer>
                <NoteCreate />
                <Box sx={{ flexGrow: 1 }} />
                <NoteSearch />
                <NoteFilter />
            </ToolbarContainer>
            <GridWrapper>
                <NoteGrid />
            </GridWrapper>
        </GridContainer>
    );
}
