import { Button, TextField } from "@mui/material";
import { useAuthStore } from "../../contexts/AuthContext";
import { useAuth } from "../../hooks";

export const AuthContainer = () => {
    const { auth, setAuth} = useAuthStore();
    const { login, loading, error } = useAuth();

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: 'black',
                width: "100%",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "300px",
                    height: "300px",
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "10px",
                    // border: '1px solid red',
                }}
            >
                <TextField
                    id={"userName"}
                    label="User Name"
                    value={auth.userName}
                    onChange={(e) => {
                        // if (e.target.value.length > 0)
                            setAuth({ ...auth, userName: e.target.value ?? '' });
                    }}
                    sx={{
                        width: "100%",
                        height: 30,
                        textAlign: "center",
                        backgroundColor: "white",
                        [`& label[data-shrink="true"]`]: {
                            fontSize: "16px",
                            top: 3,
                        },
                        [`& label[data-shrink="false"]`]: {
                            fontSize: "16px",
                            top: -9,
                        },
                        [`& div input`]: {
                            fontSize: "16px",
                            height: 50,
                            padding: "0px 10px 0 10px",
                        },
                        [`& div fieldset legend`]: {
                            width: "77x",
                        },
                    }}
                />
                <TextField
                    id={"password"}
                    label="Password"
                    value={auth.password}
                    onChange={(e) => {
                        // if (e.target.value.length > 0)
                            setAuth({ ...auth, password: e.target.value ?? '' });
                    }}
                    sx={{
                        width: "100%",
                        height: 50,
                        marginTop: "30px",
                        textAlign: "center",
                        backgroundColor: "white",
                        [`& label[data-shrink="true"]`]: {
                            fontSize: "16px",
                            top: 3,
                        },
                        [`& label[data-shrink="false"]`]: {
                            fontSize: "16px",
                            top: -9,
                        },
                        [`& div input`]: {
                            fontSize: "16px",
                            height: 50,
                            padding: "0px 10px 0 10px",
                        },
                        [`& div fieldset legend`]: {
                            width: "77x",
                        },
                    }}
                />
                {error && (
                    <div style={{ color: 'red', marginTop: '10px', fontSize: '14px' }}>
                        {error}
                    </div>
                )}
                <Button 
                    style={{ marginTop: "30px" }} 
                    variant="contained" 
                    color="primary"
                    disabled={loading}
                    onClick={async () => {
                        try {
                            await login(auth.userName, auth.password);
                            // The useAuth hook handles setting the auth context and localStorage
                        } catch (err) {
                            console.error('Login failed:', err);
                        }
                    }}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
            </div>
        </div>
    );
};
