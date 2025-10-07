import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import {LoadingLayer} from "../CommonHelpers/LoadingLayer";
// import {useHomeStore} from "./HomeStore";
// import {_exchangeCodeForToken} from "../Login/loginApis";
import NoteGrid from "./NoteGrid";
import { GridContainer, GridWrapper } from "../CommonHelpers/GridContainer";
import { ToolbarContainer } from "../CommonHelpers/ToolbarContainer";
import { NoteCreate } from "./toolbars/items/NoteCreate";
import { NoteSearch } from "./toolbars/items/NoteSearch";
import { NoteFilter } from "./toolbars/items/NoteFilter";
import {styled} from "@mui/material";


export const Grow = styled('div')({
    flexGrow: 1,
    padding: 0,
    margin: 0,
});

export default function HomePage() {
    // Temporarily commented out login-related logic
    /*
    const navigate = useNavigate();
    const location = useLocation();
    const {loadingHome, setLoadingHome} = useHomeStore();
    const {setUser} = useLoginStore();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const code = query.get("code");
        const state = query.get("state");
        const savedState = localStorage.getItem("oauth_state");

        if (state !== savedState)
            return;

        if (code) {
            _exchangeCodeForToken(code)
                .then((res) => {
                    console.log(res)
                    // localStorage.setItem("access_token", tokens.access_token);
                    localStorage.removeItem("oauth_state");
                    navigate("/homepage");
                    setLoadingHome(false);
                    setUser(prev => ({...prev, isLoggedIn: true, token: res.id_token}));
                })
                .catch((err) => console.log("Error exchanging code for token:", err))
                .finally(() => {
                })
        }
    }, [location, navigate]);
    */

    return (
        <GridContainer>
            <ToolbarContainer>
                <NoteCreate />
                <Grow />
                <NoteSearch />
                <NoteFilter />
            </ToolbarContainer>
            <GridWrapper>
                <NoteGrid />
            </GridWrapper>
        </GridContainer>
    );
}
