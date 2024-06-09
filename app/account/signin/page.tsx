"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import {Divider, IconButton} from "@mui/material";
import {userLogin} from "app/account/controllers/UserLogin";
import {login} from "lib/reducers/accountSlicer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "lib/store";
import {useRouter} from "next/navigation";
import {toggleOpenForgotPassword, toggleOpenLogin, toggleOpenRegister} from "../../../lib/reducers/appSlicer";
import {Visibility, VisibilityOff} from "@mui/icons-material";

//import { userLogin } from "controllers/auth/UserLogin";

export default function Signin() {
    const router = useRouter();
    const [email, setEmail] = React.useState("");
    const [isLoading, setLoading] = React.useState(false);
    const [loging, setloging] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const [keepLogged, setKeepLogged] = React.useState(false);
    const dispatch = useDispatch();
    const [hidePassord, setHidePassword] = React.useState(false);

    const loggedAccount = useSelector(
        (state: RootState) => state.loggedAccount
    )?.loggedAccount;
    React.useEffect(() => {
        if (loggedAccount && !loging) {
            setTimeout(() => {
                router.replace("/");
            }, 1000);
        }
        return () => {
        };
    }, [loggedAccount]);
    const handleLogin = async () => {
        setLoading(isLoading);

        try {
            setloging(true);
            userLogin({
                email: email?.trim(), password: password,
                keepLogged: Boolean(keepLogged),
            })
                .then((e: any) => {
if(e.status==200){
    setLoading(false);
    // alert(JSON.stringify(e.data?.user))
    dispatch(login( e?.data));
       dispatch(toggleOpenLogin())
    if (e.data?.role == "ADMIN") {
        router.replace("/myspace");
    } else {
        router.replace("/blog");
    }
}

                })
                .catch((e) => {
                    setLoading(false);
                });
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <Grid container component="main" sx={{height: "100vh"}}>

            <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 12,
                        mx: 15,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>

                    <Box sx={{mt: 1}}>
                        {" "}
                        <Box
                            component="div"
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                paddingBottom: "15px",
                            }}
                        >
                            {/* <GoogleLogin
                onSuccess={(credentialResponse) => {
                  //   console.log(credentialResponse);
                  let accessToken = credentialResponse.credential;

                  // Decode the JWT token
                  const decodedToken = jwt.decode(accessToken || "");

                  // console.log(decodedToken);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              /> */}
                        </Box>
                        <div
                            style={{
                                display: "none",
                                justifyContent: "center",
                                alignItems: "center",
                                columnGap: "20px",
                            }}
                        >
                            <Divider sx={{width: "40%"}}/>{" "}
                            <span
                                style={{fontSize: "12px", color: "#bbb", marginTop: "-3px"}}
                            >
                or
              </span>
                            <Divider sx={{width: "40%"}}/>
                        </div>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={hidePassord ? "password" : "text"}
                            id="password"
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        onClick={() => {
                                            setHidePassword(!hidePassord);
                                        }}
                                    >
                                        {hidePassord ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                ),
                            }}
                        />
                        <FormControlLabel
                            control={<Checkbox  checked={true}  value="remember" color="primary"/>}
                            label="Remember me (enabled by default)"
                        />
                        {"" + isLoading}
                        <Button
                            disabled={isLoading}
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            onClick={async () => {
                              await  handleLogin();
                            }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item >
                                <Button variant="text" onClick={() => {
                                    dispatch(toggleOpenLogin())
                                    //dispatch(toggleOpenRegister())
                                    dispatch(toggleOpenForgotPassword())

                                }}>
                                    {"Forgot password ?"}
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="text" onClick={() => {
                                    dispatch(toggleOpenLogin())
                                    dispatch(toggleOpenRegister())
                                }}>
                                    {"Don't have an account? Sign Up"}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}
