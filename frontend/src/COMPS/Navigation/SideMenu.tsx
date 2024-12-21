import styled from "@emotion/styled"
import { useNavigationStore } from "./Store/NavigationStore"
import { useSideMenuEvents } from "./Hooks/SideMenuEvents"
import { sitemaps } from "./sitemap"
import { useEffect } from "react"
import { Tooltip } from "@mui/material"
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import { SideMenuItem } from "./SideMenuItem"
import { SingleMenuItem } from "./SingleMenuItem"
import { HomeLink } from "./HomeLink"


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

export const SideMenu = () => {
    const {onClickHandlerExpander} = useSideMenuEvents();
    const {expanded,menuItems} = useNavigationStore();
    return (
        <SideMenuWrapper>
            <SideNavigationWrapper className={(expanded ?? false)===false ? 'collapsed' : 'expanded'}>
                <NavigationList>
                <HomeLink />
                {
                    menuItems.filter(x => x.code!=='home').map(item => (
                        <>
                            {(item.items ?? []).length
                                ? <SideMenuItem key={item.code} item={item} />
                                : <SingleMenuItem key={item.code} item={item} />}
                        </>
                    ))
                }
                </NavigationList>
            </SideNavigationWrapper>
            <Expander className={`expander ${expanded ? 'expanded' : ''}`}>
                <Tooltip title={expanded ? "Show Less" : "Show More"}>
                    <ExpanderArrow
                        onClick={onClickHandlerExpander}>
                        <Grow />
                        {(expanded ?? false) === true ? <KeyboardDoubleArrowLeftOutlinedIcon /> : <KeyboardDoubleArrowRightOutlinedIcon />}
                    </ExpanderArrow>
                </Tooltip>
            </Expander>
        </SideMenuWrapper>
    )
}
