import { AppBar, Breadcrumbs, Toolbar } from "@mui/material";
import { useEffect } from "react";
import { useFoStore } from "./FoStore";
import { CHIP } from "./Chip";
import { Popup} from "../1_GAllTabs/CreateNewPopup/Popup";
import {classes} from "../../SideNav/Nhe";
import {toSid} from "../GHelpers";
import {useFoHelpers} from "./FoHelpers";

export const TopNav = () => {
    const { setAllFos, allFos, curFoId, lastFoId } = useFoStore();
    const { loadFos } = useFoHelpers();

    useEffect(() => {
        loadFos();
    }, []);

    const handleClick = (event: React.MouseEvent<Element, MouseEvent>) => {
        event.preventDefault();
        console.info("You clicked a chip.");
    };
    const handleClick2 = (event: React.MouseEvent<Element, MouseEvent>) => {
        event.preventDefault();
        console.info("You clicked a arrow.");
    };
    const getFoLine = (): (string | null)[] => {
        const foLine: string[] = [];
        if (lastFoId === toSid("Fo", 1)) {
            return [toSid("Fo", 1)];
        } 
        else {
            foLine.push(lastFoId);
        }

        while (allFos.find((f) => f.id === foLine[0])?.parentId) {
            const fo = allFos.find((f) => f.id === foLine[0]);
            if (fo && fo.parentId) 
                foLine.unshift(fo.parentId);
        }
        return foLine;
    };

    return (
        <div className="top-navigation" style={classes.root}>
            <Popup />
            <AppBar sx={classes.appBar} position="sticky">
                <Toolbar sx={{ marginLeft: -2, height: "100px" }}>
                    <div role="presentation" onClick={handleClick}>
                        <Breadcrumbs aria-label="breadcrumb">
                            {getFoLine().map((foId, index) => {
                                const fo = allFos.find((f) => f.id === foId);
                                // console.log(fo)
                                return (
                                    <CHIP
                                        key={index}
                                        component="a"
                                        href="#"
                                        label={fo?.name ?? "??"}
                                    />
                                );
                            })}
                            {/* <CHIP
                                component="a"
                                href="#"
                                label="Home"
                                icon={<HomeIcon fontSize="small" />}
                            />
                            <CHIP component="a" href="#" label="Catalog" />
                            <CHIP
                                label="Accessories"
                                deleteIcon={<ExpandMoreIcon />}
                                onDelete={handleClick2}
                            /> */}
                        </Breadcrumbs>
                    </div>
                </Toolbar>
            </AppBar>
            {/* <Paper elevation={0} style={{height: '100px', zIndex:10000000, background: 'gray'}} /> */}
        </div>
    );
};
