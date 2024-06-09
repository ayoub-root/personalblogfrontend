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
import {Divider} from "@mui/material";
import {GoogleLogin} from "@react-oauth/google";
import jwt from "jsonwebtoken";
import {userRegister} from "app/account/controllers/UserRegister";
import {useSelector} from "react-redux";
import {RootState} from "lib/store";
import {useRouter} from "next/navigation";

export default function Signup() {
    const router = useRouter();
    const [email, setEmail] = React.useState("");
    const [isLoading, setLoading] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const [firstname, setFirstname] = React.useState("");
    const [lastname, setLastname] = React.useState("");
    const [loging, setloging] = React.useState(false);
    const loggedAccount = useSelector(
        (state: RootState) => state.loggedAccount
    )?.loggedAccount;
    React.useEffect(() => {
        if (loggedAccount && !loging) {
            router.push("/");
        }
        return () => {
        };
    }, [loggedAccount]);
    const handleRegister = () => {
        setLoading(isLoading);

        try {
            userRegister({
                email: email?.trim(),
                password: password,
                firstname: firstname?.trim(),
                lastname: lastname?.trim(),
            })
                .then((e) => {
                    setloging(true);
                    setLoading(false);
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
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: (t) =>
                        t.palette.mode === "light"
                            ? t.palette.grey[50]
                            : t.palette.grey[900],
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
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
                            <GoogleLogin
                                onSuccess={(credentialResponse) => {
                                    console.log(credentialResponse);
                                    let accessToken = credentialResponse.credential;

                                    // Decode the JWT token
                                    const decodedToken = jwt.decode(accessToken || "");

                                    console.log(decodedToken);
                                }}
                                onError={() => {
                                    console.log("Login Failed");
                                }}
                            />
                        </Box>
                        <div
                            style={{
                                display: "flex",
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
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            disabled={isLoading}
                            onClick={() => {
                                handleRegister();
                            }}
                        >
                            Register
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/account/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}
