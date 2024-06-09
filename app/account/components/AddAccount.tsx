"use client";
import * as React from "react";
import {useState} from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {Avatar, Container, IconButton} from "@mui/material";
import {useDispatch} from "react-redux";
import {axiosApi, showInformation} from "../../../components/utilis";
import FileUploadButton from "../../../components/FileUploadButton";
import {Camera, Visibility, VisibilityOff} from "@mui/icons-material";

export default function AddAccount(props: any) {
    const [isLoading, setLoading] = React.useState(false);
    const [hidePassord, setHidePassword] = React.useState(false);
    const [account, setAccount] = useState(props?.editUser || {
        email: null,
        password: null,
        firstname: null,
        lastname: null,
        avatar: null,
        birthday: null,
        address: null,
        mobile: null,
        bio: null,

    });
    const dispatch = useDispatch();
    const [config, setConfig] = useState({
        headers: {
            // "Content-Type": "application/json",
            "Content-Type": "multipart/form-data",
        },
    });
    const handleSubmit = async (edit: any) => {
        const formData = new FormData();

        if (account?.avatar) formData.append("file", account.avatar);
        if (account?.email) formData.append("email", account.email);
        if (account?.lastname) formData.append("lastname", account.lastname);
        if (account?.password) formData.append("mobile", account.password);
        if (account?.firstname) formData.append("firstname", account.firstname);
        if (account?.birthday) formData.append("birthday", account.birthday);
        if (account?.address) formData.append("address", account.address);
        if (account?.mobile) formData.append("mobile", account.mobile);
        if (account?.bio) formData.append("bio", account.bio);
        if (account?.role) formData.append("bio", account.role);
        if (account?.password) formData.append("password", account.password);

        try {

            let response;

            if (edit != null) {
                // Update existing post

                response = await axiosApi.put(`/auth/${edit.email}`, formData, config);
            } else {

                // Create new post
                response = await axiosApi.post("/auth/addaccount", formData, config);
            }

            showInformation("user created");
            return response.data.body;
        } catch (error: any) {
            if (error.response) {
                showInformation(error.response.data);
            } else {
                showInformation("An error occurred while processing the story.");
            }
            throw new Error(error.response.data);
        }
    };
    const [imageUrl, setImageUrl] = useState<any>(`${process.env.NEXT_PUBLIC_ONLINE_WS_URI}/images/profiles/${props?.editUser?.avatar}` || null);

    const handleFileSelect = (file: Blob | MediaSource) => {

        // Generate temporary URL for the selected image
        setImageUrl(URL.createObjectURL(file));
        setAccount({...account, avatar: file});
    };
    const handleSaveBtnClick = async () => {
        setLoading(true);
        try {

            const data = await handleSubmit(props.editUser);
            setLoading(false);
            props?.onClose();
        } catch (err) {
            setLoading(false);
        }
    };

    return (
        <Grid container component="main" sx={{height: "100%"}}>

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
                                <div style={{display: 'flex', justifyContent: 'center', width: "100%"}}>
                                    <FileUploadButton style={{position: 'absolute', zIndex: 1, marginTop: -20}}
                                                      onFileSelect={handleFileSelect} text={<Camera/>}/>


                                    <Avatar
                                        src={imageUrl}
                                        alt="Avatar"
                                        style={{width: "100px", height: "100px"}}
                                    />


                                </div>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        value={account?.firstname}
                                        onChange={(e) => setAccount({...account, firstname: e.target.value})}
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
                                        value={account?.lastname}
                                        onChange={(e) => setAccount({...account, lastname: e.target.value})}
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
                                        value={account?.email}
                                        onChange={(e) => setAccount({...account, email: e.target.value})}
                                    />
                                </Grid>
                                {!props?.editUser
                                    &&
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="Old password"
                                            type={hidePassord ? "password" : "text"}
                                            id="password"
                                            autoComplete="old-password"
                                            value={account?.password}
                                            onChange={(e) => setAccount({...account, password: e.target.value})}
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
                                    </Grid>}
                            </Grid>
                            <Button
                                disabled={isLoading}
                                onClick={() => {

                                    handleSaveBtnClick();
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
