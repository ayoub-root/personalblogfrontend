"use client";
import * as React from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import {toggleOpenForgotPassword, toggleOpenLogin, toggleOpenRegister} from "../../../lib/reducers/appSlicer";
import {useDispatch} from "react-redux";
import {axiosApi, showInformation} from "../../../components/utilis";

export default function ForgotPassword() {
    const [email, setEmail] = React.useState("");

    const handleForgetPassword = async (data: {
        email: string | undefined;
    }) => {

        const {email} = data;
        try {
            if (!email)
                throw new Error("email is required");
            // Make a request to your authentication endpoint
            const response = await axiosApi.post(`/users/forgotpassword`, {
                email,

            });

            if (response.status === 200) {

                showInformation(response.data);
                return response;
            }
        } catch (ress: any) {
            let error = ress?.response;


            //throw new Error("user doesnt exisit");
            showInformation(error.data);

           // throw  Error(error.data)
        }
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await handleForgetPassword({email: email});

    };

    const dispatch = useDispatch()
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
                        Forgot password
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{mt: 3}}
                    >
                        <TextField size={"medium"}
                                   margin="normal"
                                   required
                                   fullWidth
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}

                                   label="Email Address"
                                   name="email"
                                   autoComplete="email"
                                   autoFocus
                        />


                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Send
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Button variant="text" onClick={() => {
                                    dispatch(toggleOpenForgotPassword())
                                    dispatch(toggleOpenLogin())

                                }}>
                                    I have an account? Sign in
                                </Button>
                                <Button variant="text" onClick={() => {
                                    dispatch(toggleOpenForgotPassword())
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
