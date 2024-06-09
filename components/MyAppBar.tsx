import * as React from "react";
import {IconButton} from "@mui/material";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ToggleColorMode from "./ToggleColorMode";
import AccountMenu from "./AccountMenu";
import {ArrowBack} from "@mui/icons-material";
import Link from "@mui/material/Link";
import {RootState} from "lib/store";
import {useDispatch, useSelector} from "react-redux";
import {toggleOpenLogin, toggleOpenRegister} from "../lib/reducers/appSlicer";
import BlogSearch from "../app/blog/posts/components/BlogSearch";

const logoStyle = {
    width: "140px",
    height: "auto",
    cursor: "pointer",
};

function MyAppBar() {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const loggedAccount = useSelector(
        (state: RootState) => state.loggedAccount
    )?.loggedAccount;
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const scrollToSection = (sectionId: string) => {
        const sectionElement = document.getElementById(sectionId);
        const offset = 0;
        if (sectionElement) {
            const targetScroll = sectionElement.offsetTop - offset;
            sectionElement.scrollIntoView({behavior: "smooth"});
            if (typeof window !== "undefined") {
                window?.scrollTo({
                    top: targetScroll,
                    behavior: "smooth",
                });
                setOpen(false);
            }
        }
    };

    return (
        <AppBar
            position="sticky"
            color="transparent"
            sx={{width: "100%", top: "0px"}}
        >
            <Toolbar sx={{justifyContent: "space-between"}}>
                <Box
                    sx={{
                        display: "flex",
                        gap: 0.5,
                        alignItems: "center",
                    }}
                >
                    <IconButton>
                        <Link href={"/"}>
                            <ArrowBack/>
                        </Link>
                    </IconButton>
         <BlogSearch/>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        gap: 0.5,
                        alignItems: "center",
                    }}
                >
                    {loggedAccount ? (
                        <AccountMenu account={loggedAccount}/>
                    ) : (
                        <div>
                            {" "}
                            <Button
                                color="primary"
                                variant="text"
                                size="small"
                                onClick={() => dispatch(toggleOpenLogin())}

                            >
                                Sign in
                            </Button>
                            <Button
                                color="primary"
                                variant="text"
                                size="small"
                                onClick={() => dispatch(toggleOpenRegister())}

                            >
                                Sign up
                            </Button>
                        </div>
                    )}

                    <ToggleColorMode/>
                </Box>
                <Box sx={{display: {sm: "none", md: "none",lg:"none",xs:"none"}}}>
                    <Button
                        variant="text"
                        color="primary"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                        sx={{minWidth: "30px", p: "4px"}}
                    >
                        <MenuIcon/>
                    </Button>
                    <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                        <Box
                            sx={{
                                minWidth: "60dvw",
                                p: 2,
                                backgroundColor: "background.paper",
                                flexGrow: 1,
                            }}
                        >

                        </Box>
                    </Drawer>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default MyAppBar;
