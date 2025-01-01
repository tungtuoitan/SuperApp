import { Alert, AppBar, Button, Grow, IconButton, Snackbar, Toolbar, Typography } from '@mui/material';
import {classes} from './Nhe';



export const TopNavigation = () => {
  return (
    <div className="top-navigation" style={classes.root}>
      <AppBar sx={classes.appBar} position="sticky" >
        <Toolbar sx={{marginLeft: -2}}>
          <IconButton edge="start" style={classes.menuButton} color="inherit" aria-label="menu" sx={{opacity: window.location.port==='3000' ? 0.5 : 1}}>
            <img style={classes.logo} src="/timeline-avt2.png" alt="Limetine" />
          </IconButton>
          <div style={classes.companyName}>
            <Typography variant="h6" style={{color: window.location.port==='3000' ? 'gray' : 'black', fontStyle: 'italic'}}>
              Have a god day!
            </Typography>
          </div>
          <div style={classes.grow} />
          <Button color="inherit" sx={{color: 'black'}} variant='outlined' href='/login'>Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
