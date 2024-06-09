import * as React from "react";
import Box from "@mui/material/Box";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Notifications from "@mui/icons-material/Notifications";
import Messages from "@mui/icons-material/Mail";
import Logout from "@mui/icons-material/Logout";
import {Avatar, Badge} from "@mui/material";
import ToggleColorMode from "./ToggleColorMode";

import {useDispatch} from "react-redux";
import {axiosApi, showInformation} from "./utilis";
import {logout} from "lib/reducers/accountSlicer";
import {useRouter} from "next/navigation";

export default function AccountMenu(props: any) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const router = useRouter();
    const dispatch = useDispatch();
    return (
        <React.Fragment>
            <Box sx={{display: "flex", alignItems: "center", textAlign: "center"}}>
                {/*<Tooltip title="Messages">*/}
                {/*    <IconButton*/}
                {/*        onClick={handleClick}*/}
                {/*        size="small"*/}
                {/*        sx={{ml: 2}}*/}
                {/*        aria-controls={open ? "account-menu" : undefined}*/}
                {/*        aria-haspopup="true"*/}
                {/*        aria-expanded={open ? "true" : undefined}*/}
                {/*    >*/}
                {/*        <Badge badgeContent="4" color="error">*/}
                {/*            <Notifications/>*/}
                {/*        </Badge>*/}
                {/*    </IconButton>*/}
                {/*</Tooltip>*/}
                {/*<Tooltip title="Notification">*/}
                {/*    <IconButton*/}
                {/*        onClick={handleClick}*/}
                {/*        size="small"*/}
                {/*        sx={{ml: 2}}*/}
                {/*        aria-controls={open ? "account-menu" : undefined}*/}
                {/*        aria-haspopup="true"*/}
                {/*        aria-expanded={open ? "true" : undefined}*/}
                {/*    >*/}
                {/*        <Badge badgeContent="6" color="error">*/}
                {/*            <Messages/>*/}
                {/*        </Badge>*/}
                {/*    </IconButton>*/}
                {/*</Tooltip>*/}
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ml: 2}}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                    >
                        {props?.account?.firstname && <Avatar title={props?.account?.firstname + " " + props?.account?.lastname}
                                                   sx={{width: 32, height: 32, textTransform: "uppercase"}}
                                                   src={props?.account?.avatar ? process.env.NEXT_PUBLIC_ONLINE_WS_URI +
                                                       "/images/profiles/" +
                                                       props?.account?.avatar : process.env.NEXT_PUBLIC_ONLINE_WS_URI +
                                                       "/images/profiles/" + "photo.png"
                                                   }
                        >{props?.account?.firstname[0] + "" + props?.account?.lastname[0]}</Avatar>}
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                //   onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{horizontal: "right", vertical: "top"}}
                anchorOrigin={{horizontal: "right", vertical: "bottom"}}
            >
                <MenuItem onClick={()=>{
                    router.push("/myspace?tab=2");
                    handleClose()
                }}>
                    {props?.account?.firstname && <Avatar title={props?.account?.firstname + " " + props?.account?.lastname}
                                               sx={{width: 32, height: 32, textTransform: "uppercase"}}
                                               src={
                                                   props?.account?.avatar ? process.env.NEXT_PUBLIC_ONLINE_WS_URI +
                                                       "/images/profiles/" +

                                                       props?.account?.avatar : process.env.NEXT_PUBLIC_ONLINE_WS_URI +
                                                       "/images/profiles/" + "photo.png"
                                               }
                    >{props?.account?.firstname[0] + "" + props?.account?.lastname[0]}</Avatar>}
                    {props?.account?.firstname}{" "}
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        axiosApi
                            .post("/auth/logout")
                            .then((e) => {
                                //    alert(e)
                                dispatch(logout());
                                showInformation("logout");
                                router.push("/");
                            })
                            .catch(() => {
                                showInformation("try again");
                            });
                        handleClose();
                    }}
                >
                    <ListItemIcon>
                        <Logout fontSize="small"/>
                    </ListItemIcon>
                    Logout
                </MenuItem>
                {/*<Divider/>*/}
                {/*<MenuItem onClick={(e): void => e.preventDefault()}>*/}
                {/*    <ListItemIcon onClick={(e): void => e.preventDefault()}>*/}
                {/*        <ToggleColorMode/>*/}
                {/*    </ListItemIcon>*/}
                {/*    Dark mode*/}
                {/*</MenuItem>*/}
            </Menu>
        </React.Fragment>
    );
}
