
import { FinkToProtocol } from "../S/5_Etail/5he";
import { SAModule } from "./Nty";
import WindowIcon from '@mui/icons-material/Window';
import LoginIcon from '@mui/icons-material/Login';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import TimelineIcon from '@mui/icons-material/Timeline';
import WeekendIcon from '@mui/icons-material/Weekend';
import FolderSharedIcon from '@mui/icons-material/FolderShared';import BlockIcon from '@mui/icons-material/Block';
import SavingsIcon from '@mui/icons-material/Savings';
import CallMadeIcon from '@mui/icons-material/CallMade';
import MovingIcon from '@mui/icons-material/Moving';import NearMeIcon from '@mui/icons-material/NearMe';
import {styled} from "@mui/material";import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SmsIcon from '@mui/icons-material/Sms';
import CodeIcon from '@mui/icons-material/Code';

export const classes =  
  {
      grow: {
          flexGrow: 1,
      },
      root: {
          flexGrow: 1,
          backgroundColor: '#fff!important',
          zIndex:10000000000,
      },
      appBar: {
        backgroundColor: '#fff!important',
        position: 'sticky'
      },
      menuButton: {
        // marginRight: theme.spacing(2),
      },
      title: {
        color: '#000000!important',
        
      },
      subtitle: {
        color: '#000',
        fontSize:'.8em!important',
        fontStyle: "italic"
      },
      companyName: {
        flexGrow: 1,
        display: 'flex',
        // flexDirection: 'rơ',
        justifyContent: 'flex-start',
        maxWidth: '200px',
      },
      environment: {
        flexGrow: 1,
        display: 'flex',
        height: '50px',
        verticalAlign: 'middle',
        lineHeight: '10px',
      },
      logo: {
        height:'45px',
        width:'auto'
      },
}

let sitemapId = 1;
export const sitemaps = [
    {
        id: (sitemapId++).toString(),
        name: "Schedule",
        code: "schedule",
        link: "/schedule",
    } as SAModule,
    
    {
        id: (sitemapId++).toString(),
        name: "Practice",
        code: "practice",
        link: '/practice',
        open: true,
    } as SAModule,
    
    
    
    // -------
    {
        id: (sitemapId++).toString(),
        name: "Playground",
        code: "playground",
        link: FinkToProtocol(
            "https://www.figma.com/board/DiwrOCIBu6hmWp1i2C6jtJ/every-things?node-id=6791-6988&t=BFpnlwVd1qwEyGqt-11"
        ),
        open: false,
        active: false,
    } as SAModule,
    {
        id: (sitemapId++).toString(),
        name: "Accounts",
        code: "accounts",
        link: FinkToProtocol(
            "https://www.figma.com/board/DiwrOCIBu6hmWp1i2C6jtJ/every-things?node-id=6801-7204&t=BFpnlwVd1qwEyGqt-11"
        ),
        open: true,
    } as SAModule,
    {
        id: (sitemapId++).toString(),
        name: "Finance",
        code: "finance",
        link: FinkToProtocol(
            "https://www.figma.com/board/DiwrOCIBu6hmWp1i2C6jtJ/every-things?node-id=6858-6967&t=uJB31J2oksQK9Vcg-11"
        ),
        open: true,
    } as SAModule,
    {
        id: (sitemapId++).toString(),
        name: "Self Discipline",
        code: "self-discipline",
        link: FinkToProtocol('https://www.figma.com/board/DiwrOCIBu6hmWp1i2C6jtJ/every-things?node-id=7187-7468&t=VVeIDUNTdR22vWNC-11'),
        open: true,
    } as SAModule,
    {
        id: (sitemapId++).toString(),
        name: "Health",
        code: "health",
        link: FinkToProtocol('https://www.figma.com/board/DiwrOCIBu6hmWp1i2C6jtJ/every-things?node-id=7228-7274&t=9qoy0iKBEDHQbRwU-11'),
        open: true,
    } as SAModule,
    {
        id: (sitemapId++).toString(),
        name: "Principle",
        code: "principle",
        link: FinkToProtocol('https://www.figma.com/board/DiwrOCIBu6hmWp1i2C6jtJ/every-things?node-id=7440-2179&t=j7iqDVsFAFmAsQEH-11'),
        open: true,
    } as SAModule,
    {
        id: (sitemapId++).toString(),
        name: "Grateful List",
        code: "gratefulList",
        link: FinkToProtocol('https://www.figma.com/board/DiwrOCIBu6hmWp1i2C6jtJ/every-things?node-id=7441-2184&t=j7iqDVsFAFmAsQEH-11'),
        open: true,
    } as SAModule,
    {
        id: (sitemapId++).toString(),
        name: "Conversation",
        code: "conversation",
        link: FinkToProtocol('https://www.figma.com/board/DiwrOCIBu6hmWp1i2C6jtJ/every-things?node-id=7709-2269&t=r761hHDBBzTxPykI-11'),
        open: true,
    } as SAModule,
    {
        id: (sitemapId++).toString(),
        name: "IT",
        code: "it",
        link: FinkToProtocol('https://www.figma.com/board/DiwrOCIBu6hmWp1i2C6jtJ/every-things?node-id=7709-2629&t=r761hHDBBzTxPykI-11'),
        open: true,
    } as SAModule,
] as SAModule[];

const Wicon = styled('div')({
    display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', position:'relative', 
});
export const getIcon = (code: string) => {
    switch(code){
        case 'playground': { return (
            <Wicon>
                <WeekendIcon sx={{fontSize:20, color: 'gray', '&:hover': { color: 'white' }}}/>
            </Wicon>)}
        case 'schedule': { return (
            <Wicon>
                <CalendarMonthIcon/>
            </Wicon>)}
        case 'accounts': { return (
            <Wicon>
                <SwitchAccountIcon sx={{fontSize:20, color: 'gray', '&:hover': { color: 'white' }}}/>
            </Wicon>)}
        case 'finance': { return (
            <Wicon>
                <SavingsIcon sx={{fontSize:20, color: 'gray', '&:hover': { color: 'white' }}}/>
            </Wicon>)}
        
        case 'self-discipline': { return (
            <Wicon>
                <SelfImprovementIcon sx={{fontSize:20, color: 'gray', '&:hover': { color: 'white' }}}
                />
            </Wicon>)}
        // case 'practice': { return <NearMeIcon />}
        case 'practice': { return (
            <Wicon sx={{left:-5}}>
                <span style={{color: 'white', fontSize:14,position:'relative',left:4, top:0, fontWeight:'bold', textDecoration:'none !important'}}>Pr</span>
                <NearMeIcon sx={{fontSize:16}} />
            </Wicon>)}
        case 'health': { return (
            <Wicon>
                <LocalHospitalIcon sx={{fontSize:20, color: 'gray', '&:hover': { color: 'white' }}}
                />
            </Wicon>)}
        case 'principle': { return (
            <Wicon>
                <BlockIcon sx={{fontSize:20, color: 'gray', '&:hover': { color: 'white' }}}
                />
            </Wicon>)}
        case 'gratefulList': { return (
            <Wicon>
                <VolunteerActivismIcon sx={{fontSize:20, color: 'gray', '&:hover': { color: 'white' }}}
                />
            </Wicon>)}
        case 'conversation': { return (
            <Wicon>
                <SmsIcon sx={{fontSize:20, color: 'gray', '&:hover': { color: 'white' }}}
                />
            </Wicon>)}
        case 'it': { return (
            <Wicon>
                <CodeIcon sx={{fontSize:20, color: 'gray', '&:hover': { color: 'white' }}}
                />
            </Wicon>)}

    }
}