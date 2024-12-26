import { Alert, AppBar, Button, Grow, IconButton, Snackbar, Toolbar, Typography } from '@mui/material';

const classes =  
  {
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
            {/* <Typography variant="h6" style={classes.subtitle}>
              Web Applications Portal
            </Typography> */}
          </div>
          {/* {constants.isEnvironment(constants.environment.development) &&
            <div style={classes.environment}>
              <h1 style={{ color: 'red' }}>DEV</h1>
            </div>}
          {constants.isEnvironment(constants.environment.uat) &&
            <div style={classes.environment}>
              <h1 style={{ color: 'red' }}>UAT</h1>
            </div>} */}
          <div style={classes.grow} />
          <Button color="inherit" sx={{color: 'black'}} variant='outlined' href='/login'>Login</Button>
        </Toolbar>
        {/* <Snackbar
          open={false}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          autoHideDuration={5000}
        >
          <Alert severity="error">
            <Typography variant="h5" color="error">
              You are not authorized, please contact the system adminitrator.  You will be signed out after 5 seconds.
            </Typography>
          </Alert>
        </Snackbar> */}
      </AppBar>
    </div>
  )
}
