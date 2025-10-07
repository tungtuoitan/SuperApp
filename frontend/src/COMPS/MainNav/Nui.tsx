import {styled} from "@mui/material";
import {SAModule} from "./Nty";
import {Link} from "react-router-dom";
import { Tooltip } from "@mui/material";
import { useNavigationStore } from "./NavStore";
import {getIcon} from "./Nhe";


export const SideNavRoot = styled("div")({
    flexGrow: 1,
    // border: "1px solid blue",
    backgroundColor: "#f6f6f6",
    height: "calc(100vh - 64px)",
    // border: '4px solid black',
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
    width: "calc(100% - 48px)",
    height: "calc(100vh - 64px)",
    // border: "1px solid black",
});



export const Wink = styled(Link)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    flexGrow: 1,
    margin: '0 8px',
    padding: '8px 12px',
    height: 'auto',
    minHeight: '40px',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '4px',
    transition: 'background-color 0.2s ease',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    }
})


export interface ISideMenuProps{
    item: SAModule,
    expanded?: boolean,
}

export const MenuItemWrapper = styled('div')({
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    alignItems: 'flex-start',
    width: '100%',
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
        backgroundColor: 'rgba(0, 0, 0, 0.3)!important',
        cursor: 'pointer',
        color: '#fff',
    },
    '& .single-link.active': {
        backgroundColor: 'rgba(0, 0, 0, 0.3)!important',
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
    minWidth: '24px',
    width: '24px',
    height: '24px',
    color: '#fff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: '0.95rem',
    flexGrow: 1,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: '12px',
    fontWeight: 400,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
})



export const SideMenuWrapper = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#36454f',
    position: 'relative',
    transition: 'all .4s ease',
    '&.expanded': {
        width: '200px',
    },
    '&.collapsed': {
        width: '48px',
    }
})

export const SideNavigationWrapper = styled('div')({
    transition: 'all .4s ease',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    height: '100%',
})

export const NavigationList = styled('div')({
    flexGrow: 1,
    flexDirection: 'column',
    display: 'flex',
    paddingTop: '10px',
})

export const Expander = styled('div')({
    padding: '10px',
    position: 'relative',
    color: '#fff',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    marginTop: 'auto',
    zIndex: 10,
    pointerEvents: 'auto',
    '&.expander': {
        flexDirection: 'row',
    }
  })

export const Grow = styled('div')({
    flexGrow: 1,
    padding: 0,
    margin: 0,
})

export const ExpanderArrow = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px',
    borderRadius: '4px',
    transition: 'background-color 0.2s ease',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    }
})




export const SideMenuItem = (props: ISideMenuProps) => {
    return (
        <MenuItemWrapper
            style={{ marginTop: '5px' }}>
            <Tooltip title={props.expanded ? '' : props.item.name} placement="right">
                <Wink id={props.item.id} className="single-link" to={props.item.link}>
                    <IconWrapper>
                        {getIcon({code: props.item.code, type: 'sidebar'})}
                    </IconWrapper>
                    {props.expanded && (
                        <ItemLabel>{props.item.name}</ItemLabel>
                    )}
                </Wink>
            </Tooltip>
        </MenuItemWrapper>
    )
}