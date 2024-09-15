import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, Chip, FormControl, IconButton, Input, InputAdornment, InputLabel, Paper, Snackbar, Stack, Switch, TextField } from '@mui/material'
import { useLoginEvent } from './hook/useLoginEvent';
import { useLoginStore } from './store/loginStore';
import { Link } from 'react-router-dom';
type Props = {}

function Login({}: Props) {
  const  {handleMouseDownPassword,handleMouseUpPassword} = useLoginEvent()
  const {loginForm, setLoginForm, showPassword, setShowPassword} = useLoginStore()
 
  return (
      <Stack
        component="form"
        sx={{ width: '50ch' }}
        spacing={2}
        noValidate
        autoComplete="off"
      >
        <TextField 
        label="Email" 
        type='email' 
        variant="standard" 
        onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
        fullWidth />

        <FormControl variant="standard" fullWidth>
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'password' : 'text'}
            onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <Box sx={{marginTop: '50px !important'}}>
          <Button color='primary' variant='contained' sx={{px: 6}}>Login</Button>
        </Box>

        <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} spacing={1} sx={{marginTop: '40px !important'}}>
            <p>already has an account?</p>
            <Link to='/signup'>Sign up</Link>
        </Stack>
        <Stack direction={'row'} justifyContent={'center'} alignItems={'center'}  >
            <Link to='/signup'>Fogot your password?</Link>
        </Stack>

      </Stack>
  )
}

export default Login