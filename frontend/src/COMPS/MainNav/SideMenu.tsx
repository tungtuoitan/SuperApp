import {NavigationList, SideMenuItem, SideMenuWrapper, Expander, ExpanderArrow, Grow} from "./Nui";
import {sitemaps} from "./Nhe";
import {useNavigationStore} from "./NavStore";
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import { Tooltip } from "@mui/material";

export const SideMenu = () => {
    const {expanded, setExpanded} = useNavigationStore();

    return (
        <SideMenuWrapper className={expanded ? 'expanded' : 'collapsed'}>
            <NavigationList>
                {sitemaps.map(item => <SideMenuItem key={item.code} item={item} expanded={expanded} />)}
            </NavigationList>
            <Expander className={`expander ${expanded ? 'expanded' : ''}`}>
                <Tooltip title={expanded ? "Show Less" : "Show More"} placement="right">
                    <ExpanderArrow
                        onClick={() => setExpanded(!expanded)}
                        style={{ cursor: 'pointer' }}
                    >
                        <Grow />
                        {expanded ? <KeyboardDoubleArrowLeftOutlinedIcon /> : <KeyboardDoubleArrowRightOutlinedIcon />}
                    </ExpanderArrow>
                </Tooltip>
            </Expander>
        </SideMenuWrapper>
    )
}
