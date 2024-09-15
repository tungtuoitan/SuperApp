import { Chip, Paper, Stack, Switch } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FaceIcon from '@mui/icons-material/Face';
import {styled} from '@mui/system';
import Login from './Login';
import SignUp from './SignUp';
import { useLocation } from 'react-router-dom';
type Props = {}

const ContainerRoot= styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  width: '100%',
  height: '100%',
  margin: 'auto',
  marginTop: '50px' 
})

function LoginContainer({}: Props) {
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  return (
    <ContainerRoot>
      <Paper elevation={3} 
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '40px',
          width: 'fit-content',
          margin: 'auto',
          marginTop: '50px',

      }}>
        <Stack sx={{width:'100%', padding:'10px', marginBottom:'10px', display: 'flex', justifyContent: 'center'}}>
          {isLogin ? <Chip label="Login" icon={<FaceIcon/>} sx={{fontWeight:'600'}} variant='outlined'/>
          : <Chip label="Sign up" icon={<AccountCircleIcon/>} sx={{fontWeight:'600'}} variant='outlined' />}
        </Stack>
          {isLogin ? <Login/> : <SignUp/>}
      </Paper>
    </ContainerRoot>
  )
}

export default LoginContainer