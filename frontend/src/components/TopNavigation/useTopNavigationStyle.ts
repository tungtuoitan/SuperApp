import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

export const useTopNavigationStyles = makeStyles((theme: Theme) => 
createStyles({
    grow: {
        flexGrow: 1,
    },
    root: {
        flexGrow: 1,
        backgroundColor: '#fff!important'
    },
    appBar: {
      backgroundColor: '#fff!important',
      position: 'sticky'
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      color: '#000!important',
      
    },
    subtitle: {
      color: '#000',
      fontSize:'.8em!important',
      fontStyle: "italic"
    },
    companyName: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
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
    }
}));