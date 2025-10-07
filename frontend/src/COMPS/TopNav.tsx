import { AppBar, Breadcrumbs, Toolbar } from "@mui/material";
import { MouseEvent, useEffect } from "react";
import {classes} from "./MainNav/AllIcon";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useSnackbar} from "notistack";
import {useAuthStore} from "./Auth/AuthStore";

export const TopNav = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { auth } = useAuthStore();


    return (
        <div className="top-navigation" style={classes.root}>
            <AppBar sx={classes.appBar} position="sticky">xxx
            </AppBar>
        </div>
    );
};
