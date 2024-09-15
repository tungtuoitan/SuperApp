import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Chip, FormControl, IconButton, Input, InputAdornment, InputLabel, Paper, Stack, Switch, TextField } from '@mui/material'
import { useLoginEvent } from './hook/useLoginEvent';
import { useLoginStore } from './store/loginStore';
type Props = {}

function SignUp({}: Props) {
  const  {handleClickShowPassword,handleMouseDownPassword,handleMouseUpPassword} = useLoginEvent()
  const {password, setPassword, showPassword, setShowPassword} = useLoginStore()

 
  return (
      <Stack
        component="form"
        sx={{ width: '50ch' }}
        spacing={2}
        noValidate
        autoComplete="off"
      >
        <TextField label="Name" variant="standard" fullWidth />
        <TextField label="Password" variant="standard" fullWidth />
        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

      </Stack>
  )
}

export default SignUp