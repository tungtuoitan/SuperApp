import { AppBar, Button, IconButton, Stack, Toolbar, Typography } from '@mui/material';

type Props = {}

function Navigation({}: Props) {
  return (
   <AppBar position="fixed" color="primary">
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>FinShark</Typography>
            <Stack direction={'row'} spacing={2} >
                <Button color='inherit' href='/login'>Login</Button>
                <Button color='inherit' href='/signup'>Sign up</Button>
            </Stack>
        </Toolbar>
   </AppBar>
  )
}

export default Navigation