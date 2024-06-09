import * as React from "react";
import {Avatar} from "@mui/material";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ToggleColorMode from "./ToggleColorMode";
import {Home} from "@mui/icons-material";
import Link from "@mui/material/Link";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "lib/store";
import AccountMenu from "./AccountMenu";
import {toggleOpenLogin, toggleOpenRegister} from "../lib/reducers/appSlicer";

const logoStyle = {
    width: "140px",
    height: "auto",
    cursor: "pointer",
};

function AppAppBar() {
    console.log("test rendring");
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

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
    const loggedAccount = useSelector(
        (state: RootState) => state.loggedAccount
    )?.loggedAccount;
    return (
        <div>
            <AppBar
                position="fixed"
                sx={{
                    boxShadow: 0,
                    bgcolor: "transparent",
                    backgroundImage: "none",
                    mt: 2,
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar
                        variant="regular"
                        sx={(theme) => ({
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexShrink: 0,
                            borderRadius: "9px",
                            bgcolor:
                                theme.palette.mode === "light"
                                    ? "rgba(255, 255, 255, 0.4)"
                                    : "rgba(0, 0, 0, 0.4)",
                            backdropFilter: "blur(24px)",
                            maxHeight: 40,
                            border: "1px solid",
                            borderColor: "divider",
                            boxShadow:
                                theme.palette.mode === "light"
                                    ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                                    : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
                        })}
                    >
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: "flex",
                                alignItems: "center",
                                ml: "-18px",
                            }}
                        >
                            {" "}
                            <Avatar sx={{mx: 1}}>
                                <Home/>
                            </Avatar>
                            <Box
                                sx={{
                                    display: {xs: "none", md: "flex"},
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <MenuItem
                                    onClick={() => scrollToSection("home")}
                                    sx={{py: "6px", px: "12px"}}
                                >
                                    <Typography variant="body2" color="text.primary">
                                        Home
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => scrollToSection("services")}
                                    sx={{py: "6px", px: "12px"}}
                                >
                                    <Typography variant="body2" color="text.primary">
                                        Services
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => scrollToSection("features")}
                                    sx={{py: "6px", px: "12px"}}
                                >
                                    <Typography variant="body2" color="text.primary">
                                        Features
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => scrollToSection("contact")}
                                    sx={{py: "6px", px: "12px"}}
                                >
                                    <Typography variant="body2" color="text.primary">
                                        Contact
                                    </Typography>
                                </MenuItem>

                                <Divider
                                    orientation="horizontal"
                                    sx={{
                                        height: "25px",
                                        width: "2px",
                                        background: "#ccc",
                                        color: "pink",
                                        marginInline: "20px",
                                    }}
                                />
                                <Link href="/portfolio" style={{textDecoration: "none"}}>
                                    <MenuItem sx={{py: "6px", px: "12px"}}>
                                        <Typography variant="body2" color="text.primary">
                                            Portfolio
                                        </Typography>
                                    </MenuItem>
                                </Link>
                                <Link href="/blog" style={{textDecoration: "none"}}>
                                    <MenuItem sx={{py: "6px", px: "12px"}}>
                                        <Typography variant="body2" color="text.primary">
                                            Blog
                                        </Typography>
                                    </MenuItem>
                                </Link>
                                {loggedAccount && (
                                    <Link href="/myspace" style={{textDecoration: "none"}}>
                                        <MenuItem sx={{py: "6px", px: "12px"}}>
                                            <Typography variant="body2" color="text.primary">
                                                Dashboard{" "}
                                            </Typography>
                                        </MenuItem>
                                    </Link>
                                )}
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: {xs: "none", md: "flex"},
                                gap: 0.5,
                                alignItems: "center",
                            }}
                        >
                            {/* <button onClick={() => showInformation("Bonjour")}>aaaa</button> */}
                            <div>
                <span
                    style={{
                        borderRadius: "99px",
                        //   border: "solid 1px #ccc7",
                        // position: "absolute",
                        //  marginTop: "-15px",
                        //  marginLeft: "-25px",
                        display: "flex",
                        flexDirection: "row",
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
                </span>
                            </div>
                        </Box>
                        <Box sx={{display: {sm: "", md: "none"}}}>
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
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "end",
                                            flexGrow: 1,
                                        }}
                                    >
                                        <ToggleColorMode/>
                                    </Box>
                                    <MenuItem onClick={() => scrollToSection("services")}>
                                        Services
                                    </MenuItem>{" "}
                                    <MenuItem onClick={() => scrollToSection("features")}>
                                        Features
                                    </MenuItem>
                                    <MenuItem onClick={() => scrollToSection("highlights")}>
                                        Highlights
                                    </MenuItem>
                                    <MenuItem onClick={() => scrollToSection("contact")}>
                                        Contact us
                                    </MenuItem>
                                    <MenuItem onClick={() => scrollToSection("faq")}>
                                        FAQ
                                    </MenuItem>
                                    <Divider/>
                                    <MenuItem>
                                        <Button
                                            color="secondary"
                                            variant="contained"
                                            component="a"
                                            href="/myspace/"
                                            target="_blank"
                                            sx={{width: "100%"}}
                                        >
                                            Dashboard
                                        </Button>
                                    </MenuItem>
                                    <MenuItem>
                                        <Button
                                            color="secondary"
                                            variant="contained"
                                            component="a"
                                            href="/portfolio/"
                                            target="_blank"
                                            sx={{width: "100%"}}
                                        >
                                            Portfolio
                                        </Button>
                                    </MenuItem>
                                    <MenuItem>
                                        <Button
                                            color="secondary"
                                            variant="contained"
                                            component="a"
                                            href="/blog/"
                                            target="_blank"
                                            sx={{width: "100%"}}
                                        >
                                            Blog
                                        </Button>
                                        <Divider/>
                                    </MenuItem>
                                    <MenuItem>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            onClick={() => dispatch(toggleOpenRegister())}

                                            sx={{width: "100%"}}
                                        >
                                            Sign up
                                        </Button>
                                    </MenuItem>
                                    <MenuItem>
                                        <Button
                                            color="primary"
                                            variant="outlined"
                                            onClick={() => dispatch(toggleOpenLogin())}

                                            sx={{width: "100%"}}
                                        >
                                            Sign in
                                        </Button>
                                    </MenuItem>
                                </Box>
                            </Drawer>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}

export default AppAppBar;
