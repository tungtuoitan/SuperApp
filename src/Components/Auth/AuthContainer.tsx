import { Button, TextField, Box, Alert } from '@mui/material';

import { useAuthStore } from '../../contexts/AuthContext';
import { useAuth } from '../../hooks';

/**
 * Authentication container component.
 * 
 * This component provides a complete authentication interface with:
 * - Username and password input fields
 * - Form validation and error display
 * - Loading state management during authentication
 * - Integration with authentication context and hooks
 * 
 * The component uses a centered modal-style layout with form controls
 * for user login functionality.
 * 
 * @returns The authentication container with login form
 */
export function AuthContainer() {
    const { auth, setAuth } = useAuthStore();
    const { login, loading, error } = useAuth();

    /**
     * Handle input changes for authentication form fields.
     * Updates the authentication state with new field values.
     */
    const handleUsernameChange = (value: string) => {
        setAuth({ ...auth, userName: value });
    };

    const handlePasswordChange = (value: string) => {
        setAuth({ ...auth, password: value });
    };

    /**
     * Handle login form submission.
     * Attempts to authenticate the user with provided credentials.
     */
    const handleLogin = async () => {
        try {
            await login(auth.userName, auth.password);
            // The useAuth hook handles setting the auth context and localStorage
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'black',
                width: '100%',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '300px',
                    minHeight: '300px',
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    gap: '20px',
                }}
            >
                <TextField
                    id="userName"
                    label="User Name"
                    value={auth.userName}
                    onChange={(e) => handleUsernameChange(e.target.value)}
                    fullWidth
                    sx={{
                        '& label[data-shrink="true"]': {
                            fontSize: '16px',
                            top: 3,
                        },
                        '& label[data-shrink="false"]': {
                            fontSize: '16px',
                            top: -9,
                        },
                        '& div input': {
                            fontSize: '16px',
                            height: 50,
                            padding: '0px 10px 0 10px',
                        },
                        '& div fieldset legend': {
                            width: '77px',
                        },
                    }}
                />

                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    value={auth.password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    fullWidth
                    sx={{
                        '& label[data-shrink="true"]': {
                            fontSize: '16px',
                            top: 3,
                        },
                        '& label[data-shrink="false"]': {
                            fontSize: '16px',
                            top: -9,
                        },
                        '& div input': {
                            fontSize: '16px',
                            height: 50,
                            padding: '0px 10px 0 10px',
                        },
                        '& div fieldset legend': {
                            width: '77px',
                        },
                    }}
                />

                {error && (
                    <Alert severity="error" sx={{ width: '100%' }}>
                        {error}
                    </Alert>
                )}

                <Button 
                    variant="contained" 
                    color="primary"
                    disabled={loading}
                    onClick={handleLogin}
                    fullWidth
                >
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
            </Box>
        </Box>
    );
}
