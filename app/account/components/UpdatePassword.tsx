"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {Container, IconButton} from "@mui/material";
import {userRegister} from "app/account/controllers/UserRegister";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {axiosApi, showInformation} from "../../../components/utilis";

export default function UpdatePassword(props: any) {
    const userId= props?.userId;
    const [isLoading, setLoading] = React.useState(false);
    const [hidePassord, setHidePassword] = React.useState(false);
    const [oldPassword, setOldPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");

    const updatePassword = async ( oldPassword:any,
                                      newPassword:any,userId:any) => {
        try {
            if (!oldPassword || !newPassword)
                throw new Error("passwords are required");

            const response = await axiosApi.post(
                `/users/updatepassword/${userId}`,
                {
                    oldPassword,
                    newPassword,

                }
            );

            if (response.status === 200) {
showInformation(response.data.body)
                return response;
            } else if (response.status === 403) {
                showInformation(response.data.body)


            }
        } catch (error:any) {
            showInformation(error.response.data);
            throw new Error(error.data.body);
        }
    }

    const handleUpdatePassword = (userId:any) => {
        setLoading(isLoading);

        try {
            updatePassword(

                oldPassword, newPassword,userId

            )
                .then((e) => {
                    setLoading(false);
                    props?.onClose()
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
        <Grid container component="main" sx={{}}>

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


                        <Box sx={{mt: 3}}>


                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Old password"
                                        type={hidePassord ? "password" : "text"}
                                        id="password"
                                        autoComplete="old-password"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
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
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="New password"
                                        type={hidePassord ? "password" : "text"}
                                        id="password"
                                        autoComplete="new-password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
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

                            </Grid>
                            <Button
                                disabled={isLoading}
                                onClick={() => {
                                    handleUpdatePassword(userId);
                                }}
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Save
                            </Button>

                        </Box>
                    </Box>
                </Container>
            </Grid>
        </Grid>
    );
}
