import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, Chip, FormControl, IconButton, Input, InputAdornment, InputLabel, Paper, Stack, Switch, TextField, Typography } from '@mui/material'
import { useLoginStore } from './store/loginStore';
import { Link } from 'react-router-dom';
import { useLoginHelper } from './hook/useLoginHelper';
import { constants } from '../../config/constants';
type Props = {}

function SignUp({ }: Props) {
    const { loginForm, setLoginForm, formHelper, setFormHelper } = useLoginStore()
    const { validateEmail, validatePassword } = useLoginHelper();
            
    const x = 'https://www.figma.com/board/DiwrOCIBu6hmWp1i2C6jtJ/every-things?node-id=2397-3777&node-type=text&t=BTL6mHrRTdlRTtzA-11'

    const y = 'logo192.png'
    return (
        <Stack
            component="form"
            sx={{ width: '50ch' }}
            spacing={2}
            noValidate
            autoComplete="off"
        >
            <TextField
                id="signup-name"
                label="Name"
                name="name"
                autoComplete="name"
                variant="standard"
                placeholder="your name"
                autoFocus
                required
                fullWidth
                sx={{ ariaLabel: 'name' }}
                color={formHelper.nameError ? 'error' : 'primary'}
                error={formHelper.nameError}
                helperText={formHelper.nameErrorMessage}
                value={loginForm.name}
                onChange={(e) => {
                    setLoginForm({ ...loginForm, name: e.target.value })
                    if (e.target.value.length < 3) setFormHelper({ ...formHelper, nameError: true, nameErrorMessage: constants.login.errorMessage.shortName })
                        else setFormHelper({ ...formHelper, nameError: false, nameErrorMessage: '' })
                }}
            />
            <TextField
                id="signup-email"
                label="Email"
                type='email'
                autoCapitalize='email'
                name="email"
                variant="standard"
                placeholder="your email"
                required
                fullWidth
                sx={{ ariaLabel: 'email' }}
                helperText={formHelper.emailErrorMessage}
                error={formHelper.emailError}
                color={formHelper.emailError ? 'error' : 'primary'}
                value={loginForm.email}
                onChange={(e) => {
                    setLoginForm({ ...loginForm, email: e.target.value })
                    if (validateEmail(e.target.value))
                        setFormHelper({ ...formHelper, emailError: false, emailErrorMessage: '' });
                    else
                        setFormHelper({ ...formHelper, emailError: true, emailErrorMessage: constants.login.errorMessage.invalidEmail });
                }}
            />

            <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="signup-standard-adornment-password">Password</InputLabel>
                <Input
                    id="signup-standard-adornment-password"
                    type={formHelper.showPassword ? 'password' : 'text'}
                    required
                    value={loginForm.password}
                    error={formHelper.passwordError}
                    onChange={(e) =>{
                        setLoginForm({ ...loginForm, password: e.target.value })
                        if (validatePassword(e.target.value))
                            setFormHelper({ ...formHelper, passwordError: false,  passwordErrorMessage: '' });
                        else
                            setFormHelper({ ...formHelper, passwordError: true, passwordErrorMessage: constants.login.errorMessage.invalidPassword });
                    }}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setFormHelper({ ...formHelper, showPassword: !formHelper.showPassword })}>
                                {formHelper.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                <Typography variant='h6'
                    sx={{
                        display: `${formHelper.passwordError ? '' : 'none'}`,
                        color: '#d32f2f',
                        fontSize: '12px !important',
                        textAlign: 'left',
                        marginTop: '5px !important'

                    }}>{formHelper.passwordErrorMessage}</Typography>
            </FormControl>

            {/* // !! Confirm Password */}
            <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                <Input
                    id="standard-adornment-password"
                    type={formHelper.showConfirmPassword ? 'password' : 'text'}
                    required
                    value={loginForm.confirmPassword}
                    onChange={(e) => {
                        setLoginForm({ ...loginForm, confirmPassword: e.target.value })

                        if(validatePassword(e.target.value)) {
                            if (e.target.value === loginForm.password)
                                setFormHelper({ ...formHelper, confirmPasswordError: false, confirmPassErrorMessage: '' });
                            else
                                setFormHelper({ ...formHelper, confirmPasswordError: true, confirmPassErrorMessage: constants.login.errorMessage.notMatchConfirmPassword });
                        } 
                        else {
                            setFormHelper({ ...formHelper, confirmPasswordError: true, confirmPassErrorMessage: constants.login.errorMessage.invalidPassword });
                        }
                    }}
                    error={formHelper.confirmPasswordError}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle confirm password visibility"
                                onClick={() => setFormHelper({ ...formHelper, showConfirmPassword: !formHelper.showConfirmPassword })}>
                                {formHelper.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                <Typography variant='h6'
                    sx={{
                        display: `${formHelper.confirmPasswordError ? '' : 'none'}`,
                        color: '#d32f2f',
                        fontSize: '12px !important',
                        textAlign: 'left',
                        marginTop: '5px !important',
                    }}>{formHelper.confirmPassErrorMessage}</Typography>
            </FormControl>

            <Box sx={{ marginTop: '50px !important' }}>
                <Button color='primary' variant='contained' sx={{ px: 6 }} disabled={
                    formHelper.emailError || formHelper.passwordError || formHelper.confirmPasswordError || formHelper.nameError
                }>Sign Up</Button>
            </Box>           

            <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} spacing={1} sx={{ marginTop: '40px !important' }}>
                <p>already has an account?</p>
                <Link to='/login'>Login</Link>
            </Stack>

        </Stack>
    )
}

export default SignUp