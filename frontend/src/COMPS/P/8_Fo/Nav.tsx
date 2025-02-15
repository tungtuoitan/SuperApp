import { AppBar, Breadcrumbs, Toolbar } from "@mui/material";
import { classes } from "../../Nav/Nhe";
import { useEffect } from "react";
import { getFos } from "./NavAPIs";
import { Fo } from "./FoTypes";
import { useFoStore } from "./FoStore";
import { CHIP } from "./Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { get, last } from "lodash";
import { Popup} from "../1_PrAllTabs/CreateNewPopup/Popup";

export const TopNav = () => {
    const { setAllFos, allFos, curFoId, lastFoId } = useFoStore();

    useEffect(() => {
        getFos().then((fos: Fo[]) => {
            let proData = fos.filter((pr) => pr.activeC == "Act");
            console.log(fos);
            setAllFos(proData);
        });
    }, []);

    const handleClick = (event: React.MouseEvent<Element, MouseEvent>) => {
        event.preventDefault();
        console.info("You clicked a chip.");
    };
    const handleClick2 = (event: React.MouseEvent<Element, MouseEvent>) => {
        event.preventDefault();
        console.info("You clicked a arrow.");
    };
    const getFoLine = (): (number | null)[] => {
        const foLine: number[] = [];
        if (lastFoId === 1) {
            return [1];
        } 
        else {
            foLine.push(lastFoId);
        }

        //! continue here
        while (allFos.find((f) => f.id === foLine[0])?.parentId) {
            const fo = allFos.find((f) => f.id === foLine[0]);
            if (fo && fo.parentId) 
                foLine.unshift(fo.parentId);
        }
        return foLine;
    };
    console.log(getFoLine());

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
