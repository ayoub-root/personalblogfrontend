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
import {useDispatch} from "react-redux";
import {IconButton} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {axiosApi, showInformation} from "../../../components/utilis";
import {ReadonlyURLSearchParams, useRouter, useSearchParams} from "next/navigation";
import {toggleOpenLogin} from "../../../lib/reducers/appSlicer";


export default function ResetPassword() {
    const searchParams: ReadonlyURLSearchParams = useSearchParams()
    const token: string | null = searchParams.get("token")
const router=useRouter()
    const handleResetPassword = async (data: {
        token: string | null;
        password: string;
    }) => {

        const {password, token} = data;
        try {
            if (!password || !token)
                showInformation("password and token are required");
            // Make a request to your authentication endpoint
            const response = await axiosApi.post(`/users/resetpassword`, {
                token, newPassword:password,

            });

            if (response.status === 200) {

                showInformation(response.data);
               setTimeout(()=>{ router.replace("/")

               dispatch(toggleOpenLogin())
               },750)

            }
        } catch (error: any) {



            //throw new Error("user doesnt exisit");
            showInformation(error.response.data);

            // throw  Error(error.data)
        }
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await handleResetPassword({token, password})
    };
    const [hidePassord, setHidePassword] = React.useState(false);
    const [password, setPassword] = React.useState<string>("");

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
                        Reset password
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{mt: 3}}
                    >
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


                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Send
                        </Button>

                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}
