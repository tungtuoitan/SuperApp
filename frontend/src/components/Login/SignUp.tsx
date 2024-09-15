import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, Chip, FormControl, IconButton, Input, InputAdornment, InputLabel, Paper, Stack, Switch, TextField } from '@mui/material'
import { useLoginEvent } from './hook/useLoginEvent';
import { useLoginStore } from './store/loginStore';
import { Link } from 'react-router-dom';
type Props = {}

function SignUp({}: Props) {
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
        label="Name" 
        variant="standard" 
        onChange={(e) => setLoginForm({...loginForm, name: e.target.value})}
        fullWidth />

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

        <FormControl variant="standard" fullWidth>
          <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'password' : 'text'}
            onChange={(e) => setLoginForm({...loginForm, confirmPassword: e.target.value})}
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
          <Button color='primary' variant='contained' sx={{px: 6}}>Sign Up</Button>
        </Box>
        
        <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} spacing={1} sx={{marginTop: '40px !important'}}>
            <p>already has an account?</p>
            <Link to='/login'>Login</Link>
        </Stack>

      </Stack>
  )
}

export default SignUp