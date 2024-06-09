"use client";
import * as React from "react";
import {useEffect} from "react";
import {CSSObject, styled, Theme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {isMobile} from "components/utilis";
import AccountMenu from "components/AccountMenu";
import {Link, Tab, Tabs} from "@mui/material";
import {ArrowBack, Article, Dashboard, DocumentScanner, Menu, Message, People,} from "@mui/icons-material";
import AdminPostsList from "./components/AdminPostsList";
import AdminUsersList from "./components/AdminUsersList";
import AdminMessagesList from "./components/AdminMessagesList";
import AdminMyCvsList from "./components/AdminCVsList";
import DashboardPage from "./components/DashboardPage";
import {RootState} from "lib/store";
import {useSelector} from "react-redux";
import Forbidden from "./components/Forbidden";
import LoadingPage from "app/LoadingPage";
import {ReadonlyURLSearchParams, useRouter, useSearchParams} from 'next/navigation'

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({theme}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + (isMobile() ? -2 : 1),
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: isMobile() ? 0 : drawerWidth,
        width: `calc(100% - ${isMobile() ? 0 : drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    // shouldForwardProp: (prop) => prop !== "open",
})(({theme, open}) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

const adminServices = [
    {title: "Dashboard", icon: <Dashboard/>, component: <DashboardPage/>,requireAdmin:false,},
    {title: "Posts", icon: <Article/>, component: <AdminPostsList/>,requireAdmin:false,},
    {title: "Users", icon: <People/>, component: <AdminUsersList/>,requireAdmin:false,},
    {title: "Messages", icon: <Message/>, component: <AdminMessagesList/>,requireAdmin:false,},
    {title: "My Cvs", icon: <DocumentScanner/>, component: <AdminMyCvsList/>,requireAdmin:true,},
];

interface TabPanelProps {
    children?: React.ReactNode;
    index: string;
    value?: string;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            style={{width: "100%", border: "", height: "100%"}}
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{px: 3, height: "100%"}}>
                    <div style={{height: "100%"}}>{children}</div>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
    };
}

export default function MiniDrawer() {
    const searchParams: ReadonlyURLSearchParams = useSearchParams()
    const router = useRouter()
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

   // const [value, setValue] = React.useState<number>(parseInt(searchParams.get('tab') || 0));
const value:string|undefined|null= searchParams.get("tab")||"0";
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        router.push("/myspace?tab=" + newValue);
      //  setValue(newValue);
    };


    const loggedAccount = useSelector(
        (state: RootState) => state.loggedAccount
    )?.loggedAccount;


    return (
        <>
            <LoadingPage open={loggedAccount == null} onClose={null}/>
            {loggedAccount ? (
                <Box
                    sx={{
                        display: loggedAccount ? "flex" : "none",
                        height: "100%",
                        overflow: "hidden",
                    }}
                >
                    <CssBaseline/>
                    <AppBar position="fixed" open={open} color="transparent">
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{
                                    marginRight: 5,
                                    ...(open && {display: isMobile() ? "flex" : "none"}),
                                }}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <div
                                style={{
                                    //    border: "solid",
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography variant="h6" noWrap component="div">
                                    <IconButton>
                                        <Link href={"/"}>
                                            <ArrowBack/>
                                        </Link>
                                    </IconButton>{" "}
                                    {/* <TextField
                    InputProps={{
                      startAdornment: (
                        <IconButton>
                          <Search />
                        </IconButton>
                      ),
                    }}
                  /> */}
                                </Typography>
                                <div
                                    style={{
                                        //    border: "solid",
                                        display: "flex",
                                        columnGap: "25px",
                                        alignItems: "center",
                                    }}
                                >
                                    {" "}
                                    <AccountMenu account={loggedAccount}/>
                                </div>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <Drawer variant={isMobile() ? "temporary" : "permanent"} open={open}>
                        <DrawerHeader>
                            <IconButton onClick={handleDrawerClose}>
                                <Menu/>
                            </IconButton>
                        </DrawerHeader>
                        <Divider/>

                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            sx={{borderRight: 1, borderColor: "divider"}}
                        >
                            {adminServices.filter(d=>loggedAccount?.role=="ADMIN"?true:!d.requireAdmin).map((a, index) => (
                                <Tab
                                    key={index}
                                    {...a11yProps(index)}
                                    sx={{padding: 0}}
                                    label={
                                        <ListItem
                                            key={a?.title}
                                            disablePadding
                                            sx={{display: "block"}}
                                        >
                                            <ListItemButton
                                                sx={{
                                                    minHeight: 48,
                                                    justifyContent: open ? "initial" : "center",
                                                    px: 2.5,
                                                }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        minWidth: 0,
                                                        mr: open ? 3 : "auto",
                                                        justifyContent: "center",
                                                    }}
                                                >
                                                    {a?.icon}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={a?.title}
                                                    sx={{opacity: open ? 1 : 0}}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    }
                                ></Tab>
                            ))}
                        </Tabs>
                    </Drawer>
                    <Box
                        // component="main"
                        sx={{
                            //  flexGrow: 1,
                            width: "100%",
                            //  border: "solid red",
                            display: "grid",
                            overflow: "hidden",
                            height: "100vh",
                            gridTemplateRows: "65px calc(100% - 65px)",
                        }}
                    >
                        <DrawerHeader/>
                        <Box sx={{overflow: "auto", py: 2, height: "100%"}}>
                            {adminServices.filter(d=>loggedAccount?.role=="ADMIN"?true:!d.requireAdmin).map((a, index) => (
                                <TabPanel index={""+index} value={value} key={"tab" + index}>
                                    {a?.component}
                                </TabPanel>
                            ))}
                            {adminServices.findIndex((d,i):any=>loggedAccount?.role=="ADMIN"?true:!d.requireAdmin&&""+i==value)==-1&& <TabPanel index={"aa"} value={"aa"} key={"tab" + "index"}>
                                <Forbidden/>
                            </TabPanel>}
                        </Box>
                    </Box>
                </Box>
            ) : (<div style={{height:'100vh'}}><Forbidden/></div>

            )}
        </>
    );
}
