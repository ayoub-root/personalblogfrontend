"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import MyAppBar from "components/MyAppBar";
import {
    alpha,
    Button,
    Checkbox,
    Dialog,
    DialogContent,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    useMediaQuery,
} from "@mui/material";
import PostsList from "./components/PostsList";
import {Add, ArrowBack, ArrowDropDownOutlined, Close} from "@mui/icons-material";
import MyDialog from "components/MyDialog";
import AddPost from "./components/AddPost";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "lib/store";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import PostDetails from "./posts/components/PostDetails";
import Typography from "@mui/material/Typography";
import {getSavedList, removeFromSavedList} from "./posts/controllers/postController";
import {Theme} from "@mui/material/styles";
import BlogSearch from "./posts/components/BlogSearch";

import {updateLoggedAccount} from "../../lib/reducers/accountSlicer";
import Link from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

export default function Blog() {
    const isSmallScreen = useMediaQuery("(max-width:600px)");
    const loggedAccount = useSelector(
        (state: RootState) => state.loggedAccount
    )?.loggedAccount;
    const [openSlug, setOpenSlug] = React.useState<any>("");

    const [tabsList, setTabsList] = React.useState();

    const [checked, setChecked] = React.useState([0]);
    const [newPost, setNewPost] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [open, setOpen] = React.useState<boolean>(false);

    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };
    const filtersList =
        useSelector((state: RootState) => state.filtersList)?.filtersList  ||[] ;
const dispatch= useDispatch()

    return (
        <Container maxWidth="xl" sx={{width: {xs:"100%",sm:"100%",md:"100%",lg:"90%"}}}>
            <MyAppBar/>
            <Box
                sx={{
                    height: "calc(100vh - 65px)",
                    flexGrow: 1,
                    bgcolor: "background.paper",
                    display: "flex",
                    flexDirection: isSmallScreen ? "column" : "row",
                    gap: isSmallScreen ? 0 : "2px",
                }}
            >
                <Box
                    sx={(theme: Theme) => ({
                        display: {xs: "none", sm: "none", md: "block"},
                        alignItems: "center",

                        paddingTop: "5px",
                        flexDirection: "column",
                        minWidth: "270px",
                        maxWidth: '300px',
                        height: '100%',

                        boxShadow:
                            theme.palette.mode === "light"
                                ? `0 0 2px 2px ${alpha("#9CCCFC", 0.2)}`
                                : `0 0 4px 2px ${alpha("#033363", 0.2)}`,
                    })}
                >
                    <div style={{paddingInline:"10px",alignItems: 'center', display: 'flex', justifyContent: 'space-between'}}>

                        {loggedAccount && (
                            <Link href="/myspace" style={{textDecoration: "none"}}>
                                <Button>
                                        Dashboard{" "}
                                </Button>
                            </Link>
                        )}
                        {loggedAccount && (

                            <Button variant={"outlined"}
                                    style={{borderRadius: 12, paddingRight: "15px", marginBlock: '10px'}}
                                    onClick={() => setNewPost(true)}
                            >
                                <Add/> Post
                            </Button>
                        )}</div>
                    <Box sx={{
                        maxHeight: "calc(100% - 70px)",
                        overflow: "auto",
                    }}>
                        <Accordion defaultExpanded={true}
                                   style={{
                                       width: '100%', background: "transparent", paddingInline: 0,
                                       maxHeight: '100%', display: "none"

                                   }}>
                            <AccordionSummary expandIcon={<ArrowDropDownOutlined/>}>
                                Filters
                            </AccordionSummary>
                            <AccordionDetails sx={{paddingInline: "10px",display:filtersList?"":"none"}}>
                                <List sx={{width: "100%", bgcolor: "background.paper"}}>
                                    {filtersList?.map((value: any, index) => {
                                        const labelId = `checkbox-list-label-${value}`;

                                        return (
                                            <ListItem
                                                key={value?.label}
                                                disableGutters
                                                dense
                                                disablePadding

                                            >
                                                <ListItemButton
                                                    role={undefined}
                                                    onClick={handleToggle(index)}
                                                    dense
                                                >
                                                    <Checkbox
                                                        size="small"
                                                        edge="start"
                                                        checked={checked.indexOf(index) !== -1}
                                                        tabIndex={-1}
                                                        disableRipple
                                                        inputProps={{"aria-labelledby": labelId}}
                                                    />

                                                    <Typography id={labelId}
                                                                title={` ${value?.label}`}
                                                                sx={{
                                                                    fontSize: '12px',
                                                                    overflow: 'hidden',
                                                                    whiteSpace: "nowrap",
                                                                    display: 'block',
                                                                    textOverflow: 'ellipsis',
                                                                    "&::first-letter": {
                                                                        textTransform: 'uppercase'
                                                                    }
                                                                }}

                                                    >{` ${value?.label}`}
                                                    </Typography>
                                                </ListItemButton>
                                            </ListItem>
                                        );
                                    })}
                                </List>

                            </AccordionDetails>
                        </Accordion>
                        <Accordion defaultExpanded={true} sx={{
                            width: '100%',
                            background: "transparent",
                            paddingInline: "3px 0px",
                            maxHeight: '100%',

                            display: loggedAccount ? 'flex' : "none",
                            flexDirection: 'column'
                        }}>
                            <AccordionSummary expandIcon={<ArrowDropDownOutlined/>}>
                                Bookmarks
                            </AccordionSummary>
                            <AccordionDetails style={
                                {
                                    paddingInline: 0,
                                    flexGrow: 1,
                                    height: "100%",

                                }
                            }>
                                <List sx={{
                                    width: "100%", bgcolor: "background.paper",
                                }}>
                                    {loggedAccount?.savedItems?.map((value: any, index: number) => {
                                        const labelId = `checkbox-list-label2-${index}`;

                                        return (
                                            <ListItem className="hoverdItem"
                                                      key={value?.title}
                                                      disableGutters
                                                      dense
                                                      disablePadding
                                                      style={{paddingInline: "2px"}}
                                            >
                                                <ListItemButton disableGutters
                                                                disableRipple
                                                                role={undefined}
                                                                onClick={() => {
                                                                    setOpenSlug(value?.value);
                                                                    setOpen(true);
                                                                }}
                                                                sx={{alignItems: "start"}}
                                                                dense

                                                ><ListItemAvatar>
                                                    <img src={
                                                        process.env.NEXT_PUBLIC_ONLINE_WS_URI +
                                                        "/images/posts/" +
                                                        value?.image

                                                    }
                                                         style={{paddingInline: '0px 5px', paddingTop: "10px"}}
                                                         alt={""}
                                                         width={"70px"}
                                                         height={"auto"}
                                                    />
                                                </ListItemAvatar>
                                                    <IconButton className={"hiddenButton"}
                                                                sx={{
                                                                    marginTop: "10px",
                                                                    zIndex: 1,
                                                                    marginLeft: "3px",
                                                                    width: "60px",
                                                                    color: 'red',
                                                                    height: "auto",
                                                                    background: "#f003",
                                                                    borderRadius: "1px",
                                                                    //  border:"solid",
                                                                    // fontSize: "12px",
                                                                    position: "absolute",
                                                                    //marginLeft: "-15px"
                                                                }}
                                                                onClick={async (e) => {
                                                                    e.stopPropagation();
                                                                    await removeFromSavedList(value?.value).then(async ()=>{
                                                                        await getSavedList().then(async(data:any)=>{
                                                                            //     alert(JSON.stringify(data))
                                                                            setLoading(false);
                                                                            dispatch(updateLoggedAccount({savedItems:data}))
                                                                        })
                                                                    })
                                                                }}
                                                    >
                                                        <Close/>
                                                    </IconButton><ListItemText id={labelId}
                                                                               primary={<Typography
                                                                                   sx={{"&::first-letter": {textTransform: "uppercase"}}}
                                                                                   fontSize={12}>{value?.title}
                                                                               </Typography>
                                                                               }/>

                                                </ListItemButton>

                                            </ListItem>
                                        );
                                    })}
                                </List>

                            </AccordionDetails>
                        </Accordion>
                    </Box>


                </Box>

                <Box sx={{paddingTop: "10px", width: "100%"}}><PostsList openSlug={(e: string) => {

                    setOpenSlug(e);
                    setOpen(true);
                }}/></Box>
            </Box>{" "}
            <MyDialog
                // maxHeight="100vh"
                maxWidth={"xl"}
                title={"New Post"}
                open={newPost}
                onClose={() => {
                    setNewPost(false);
                }}
            >
                <AddPost onClose={() => setNewPost(false)} editPost={null}/>
            </MyDialog>
            <Dialog
                maxWidth="xl"
                fullWidth
                fullScreen

                open={open}
                onClose={handleClose}
            >
                <DialogContent style={{paddingBlock: "0px",paddingInline:0, height: '100vh'}}>
                    <IconButton
                        sx={{position: "absolute", marginLeft: {xs:"0px",sm:"10px"},marginTop:"20px"}}
                        onClick={handleClose}
                    >
                        <ArrowBack/>
                    </IconButton>
                    <Container maxWidth="xl" sx={{width: {xs:"100%",sm:"100%",md:"100%",lg:"95%"},padding:0, height: '100%'}}>
                        <PostDetails params={{slug: openSlug}} isDialog={true}/>
                    </Container>
                </DialogContent>
            </Dialog>
        </Container>
    );
}
