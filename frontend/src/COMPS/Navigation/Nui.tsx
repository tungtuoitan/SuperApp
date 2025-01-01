import {styled} from "@mui/material";
import {SAModule} from "./Nty";
import {Link} from "react-router-dom";

export const SideNavRoot = styled("div")({
    flexGrow: 1,
    backgroundColor: "#f6f6f6",
    display: "flex",
    // width: '100%',
    // height: '100%',
    flexDirection: "row",
    // flexGrow: 1,

    // for sidebar
    "& .expanded": {
        transitionDuration: "500ms",
        width: "200px",
        "& div.expander": {
            flexDirection: "row-reverse",
        },
    },
    "& .collapsed": {
        transitionDuration: "500ms",
        width: "48px",
        "& div.expander": {
            flexDirection: "row",
        },
    },

    "& .MuiDrawer-paperAnchorDockedLeft": {
        top: "64px!important",
        //width: '227px',
        background: "#36454f",
        flex: "0 0 auto",
        "& .MuiListItemButton-root": {
            backgroundcolor: "#36454f!important",
            color: "#fff!important",
        },
    },
    "& .MuiList-root": {
        backgroundColor: "#36454f!important",
    },
    "& nav.MuiList-root": {
        marginBottom: "75px",
    },
    "& .MuiTypography-root": {
        fontSize: ".95em",
    },
    "& ul li a.MuiListItem-root.active": {
        backgroundColor: "rgb(0 0 0 / 30%)!important",
    },
});

export const BodyWrapper = styled("div")({
    display: "flex",
    flexGrow: 1,
    height: "100%",
});



export const Wink = styled(Link)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    flexGrow: 1,
    margin: 0,
    padding: '0 12px',
    height: '35px',
    color: '#fff',
})


export interface ISideMenuProps{
    item: SAModule,
}

export const MenuItemWrapper = styled('div')({
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    alignItems: 'flex-start',
    '& .close': {
        display: 'none',
        height: 0,
        transition: 'all .4s ease',
    },
   '& .mini': {
        display: 'none',
    },
    '& .hide': {
        left: '-10000px!important',
    },
    '& .item-link:hover': {
        cursor: 'pointer'
    },
    '& .home-link:hover, .single-link:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.87)!important',
        cursor: 'pointer',
        color: '#fff',
    },
    '& .single-link.active': {
        backgroundColor: 'rgba(0, 0, 0, 0.87)!important',
    },
})

export const PopupMenuItemWrapper = styled('div')({
    flexShrink: 0,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
   
    
})

export const MenuItemLine = styled('div')({
    alignItems: 'center',
    display: 'flex',
    width: '100%',
    flexDirection: 'row',


})

export const IconWrapper = styled('div')({
    height: '100%',
    width: '1.5rem',
    paddingBottom: '12px',
    paddingTop: '12px',
    color: '#fff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',


})

export const ItemLink = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    flexGrow: 1,
    margin: 0,
    padding: '0 12px',
    color: '#fff',
})

export const ItemLabel = styled('span')({
    color: '#fff',
    fontSize: '1em',
    flexGrow: 1,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: '6px',
    fontWeight: 400,
    textDecoration: 'none',
})



export const SideMenuWrapper = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    '& .expanded': {
        transition: 'all .4s ease',
        width: '200px',
    },
    '& .collapsed': {
        transition: 'all .4s ease',
        width: '48px',
    }
})

export const SideNavigationWrapper = styled('div')({
    transition: 'all .4s ease',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
})

export const NavigationList = styled('div')({
    flexGrow: 1,
    flexDirection: 'column',
    display: 'flex',
})

export const Expander = styled('div')({
    padding: '0 10px 35px 0',
    marginLeft: '10px',
    position: 'absolute',
    right: '0',
    bottom: '40px',
    color: '#fff',
  })

const Grow = styled('div')({
    flexGrow: 1,
    padding: 0,
    margin: 0,
})

export const ExpanderArrow = styled('div')({
    display: 'flex',
})