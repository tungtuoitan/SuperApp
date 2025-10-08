import {NavigationList, SideMenuItem, SideMenuWrapper, Expander, ExpanderArrow} from "./SideMenuItem";
import {sitemaps} from "./AllIcon";
import {useNavigationStore} from "../../contexts/NavigationContext";
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import { Box, Tooltip } from "@mui/material";

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
                        sx={{ cursor: 'pointer' }}
                    >
                        <Box sx={{ flexGrow: 1 }} />
                        {expanded ? <KeyboardDoubleArrowLeftOutlinedIcon /> : <KeyboardDoubleArrowRightOutlinedIcon />}
                    </ExpanderArrow>
                </Tooltip>
            </Expander>
        </SideMenuWrapper>
    )
}
