import {Paper, styled} from "@mui/material";

export const LeftEtailPaper = styled(Paper)({
    display: "flex",
    flexFlow: "column",
    margin: 0,
    padding: 20,
    flex: 1,
    [`& .card-content`]: {
        margin: "10px 0",
        [`& .MuiPaper-root.MuiPaper-elevation`]: {
            marginBottom: 0,
        },
    },
});
export const MidEtailPaper = styled(Paper)({
    display: "flex",
    flexFlow: "column",
    margin: 0,
    padding: 20,
    flex: 1,
    [`& .card-content`]: {
        margin: "10px 0",
        [`& .MuiPaper-root.MuiPaper-elevation`]: {
            marginBottom: 0,
        },
    },
});
export const RightEtailPaper = styled(Paper)({
    display: "flex",
    flexFlow: "column",
    margin: 0,
    padding: 20,
    flex: 1,
    [`& .card-content`]: {
        margin: "10px 0",
        [`& .MuiPaper-root.MuiPaper-elevation`]: {
            marginBottom: 0,
        },
    },
});

export const WBar = styled("div")({
    height: 50,
    width: "100%",
    background: "white",
    margin: "0 0 10px 0",
});

export const WBody = styled("div")({
    display: "flex",
    gap: 10,
    width: "100%",
    height: "calc(100% - 50px)",
    padding: "0 10px 10px 10px",
});

export const EtailContainer = styled("div")({
    margin: 0,
    padding: "20px 0 0 0",
    gap: 10,
    width: "100%",
    height: "100%",
    flex: 1,

});