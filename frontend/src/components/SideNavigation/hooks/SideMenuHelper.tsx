import WindowIcon from '@mui/icons-material/Window';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import LoginIcon from '@mui/icons-material/Login';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FirstPageIcon from '@mui/icons-material/FirstPage';

export const useSideMenuHelper = () => {
    const menuItemIcon = (code: string) => {
        switch(code){
            case 'home': { return <CottageOutlinedIcon/>}
            case 'general': { return <WindowIcon />}
            case 'login': { return <LoginIcon />}
            case 'signup': { return <FirstPageIcon  style={{ transform: 'rotate(180deg)'}} />}
            case 'logout': { return <ExitToAppIcon />}
           
        }
    }
    return {
        menuItemIcon
    }
}