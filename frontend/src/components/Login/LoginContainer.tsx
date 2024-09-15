import { Chip, Paper, Switch } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import FaceIcon from '@mui/icons-material/Face';
import Login from './Login';
import SignUp from './SignUp';
type Props = {}

function LoginContainer({}: Props) {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  return (
    <Paper elevation={3} 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        width: 'fit-content',
        margin: 'auto',
        marginTop: '50px' 
    }}>
      <Paper elevation={3} sx={{width:'100%', padding:'10px', marginBottom:'10px', display: 'flex', justifyContent: 'center'}}>
        {isLogin ? 
          <Chip label="Login" icon={<FaceIcon/>} sx={{fontWeight:'600'}} variant='outlined'/>
          :
          <Chip label="Sign up" icon={<AccountCircleIcon/>} sx={{fontWeight:'600'}} variant='outlined' />
        }
      </Paper>
      <Switch onChange={() => setIsLogin(!isLogin)} />
        {isLogin ? <Login/> : <SignUp/>}
     
     
     
    </Paper>
  )
}

export default LoginContainer