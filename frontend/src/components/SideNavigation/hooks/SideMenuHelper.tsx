import WindowIcon from '@mui/icons-material/Window';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ContactsIcon from '@mui/icons-material/Contacts';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import ApprovalOutlinedIcon from '@mui/icons-material/ApprovalOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import SettingsBackupRestoreOutlinedIcon from '@mui/icons-material/SettingsBackupRestoreOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PriceChangeOutlinedIcon from '@mui/icons-material/PriceChangeOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import AddToQueueOutlinedIcon from '@mui/icons-material/AddToQueueOutlined';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StyleIcon from '@mui/icons-material/Style';
import DeveloperBoardOutlinedIcon from '@mui/icons-material/DeveloperBoardOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import ContentPasteGoOutlinedIcon from '@mui/icons-material/ContentPasteGoOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import ArchitectureIcon from '@mui/icons-material/Architecture';

export const useSideMenuHelper = () => {
    const menuItemIcon = (code: string) => {
        switch(code){
            case 'home': { return <CottageOutlinedIcon/>}
            case 'general': { return <WindowIcon />}
            case 'claims': { return <MonetizationOnIcon />}
            case 'plm': { return <DesignServicesIcon />}
            case 'engineering': {return <EngineeringOutlinedIcon/>}
            case'styles' :{ return <StyleIcon/>}
            case 'costing': { return <LocalOfferIcon />}
        }
    }
    return {
        menuItemIcon
    }
}