"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import {Container, Divider, IconButton} from "@mui/material";
import jwt from "jsonwebtoken";
import {userRegister} from "app/account/controllers/UserRegister";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {toggleOpenLogin, toggleOpenRegister} from "../../../lib/reducers/appSlicer";
import {useDispatch} from "react-redux";

export default function Signup() {
    const [email, setEmail] = React.useState("");
    const [isLoading, setLoading] = React.useState(false);
    const [hidePassord, setHidePassword] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const [firstname, setFirstname] = React.useState("");
    const [lastname, setLastname] = React.useState("");
    const dispatch = useDispatch();
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
                    setLoading(false);
                    dispatch(toggleOpenRegister())
                    dispatch(toggleOpenLogin())
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
                    display: "none"
                }}
            />
            <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box sx={{mt: 3}}>
                            <Box
                                component="div"
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    paddingBottom: "15px",
                                }}
                            >
                                {/*<GoogleLogin*/}
                                {/*    onSuccess={(credentialResponse) => {*/}
                                {/*        console.log(credentialResponse);*/}
                                {/*        let accessToken = credentialResponse.credential;*/}

                                {/*        // Decode the JWT token*/}
                                {/*        const decodedToken = jwt.decode(accessToken || "");*/}

                                {/*        console.log(decodedToken);*/}
                                {/*    }}*/}
                                {/*    onError={() => {*/}
                                {/*        console.log("Login Failed");*/}
                                {/*    }}*/}
                                {/*/>*/}
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
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        value={firstname}
                                        onChange={(e) => setFirstname(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
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
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox value="acceptRules" color="primary"/>
                                        }
                                        label="I accept rules like anyone. (not working yet)"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                disabled={isLoading}
                                onClick={() => {
                                    handleRegister();
                                }}
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Button variant="text" onClick={() => {
                                        dispatch(toggleOpenRegister())
                                        dispatch(toggleOpenLogin())

                                    }}>
                                        Already have an account? Sign in
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </Grid>
        </Grid>
    );
}
