import WindowIcon from '@mui/icons-material/Window';
import LoginIcon from '@mui/icons-material/Login';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import TimelineIcon from '@mui/icons-material/Timeline';
import WeekendIcon from '@mui/icons-material/Weekend';
import FolderSharedIcon from '@mui/icons-material/FolderShared';

export const useSideMenuHelper = () => {
    const menuItemIcon = (code: string) => {
        switch(code){
            case 'playground': { return <WeekendIcon/>}
            // case 'general': { return <WindowIcon />}
            // case 'login': { return <LoginIcon />}
            // case 'signup': { return <FirstPageIcon  style={{ transform: 'rotate(180deg)'}} />}
            // case 'logout': { return <ExitToAppIcon />}
            case 'schedule': { return <TimelineIcon />}
            case 'accounts': { return <FolderSharedIcon />}
        }
    }
    return {
        menuItemIcon
    }
}
