"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import MyAppBar from "components/MyAppBar";
import {useMediaQuery} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {defultTabList} from "components/utilis";
import PostsList from "./components/PostsList";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

export interface Post {
    // Define properties of a Post object
    // For example:
    title: string;
    index: number;
    // Add more properties as needed
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            style={{width: "100%", height: "100%"}}
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3} sx={{height: "100%"}}>
                    <>{children}</>
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

export default function Blog() {
    const isSmallScreen = useMediaQuery("(max-width:600px)");

    const [tabValue, setTabValue] = React.useState(0);
    const [tabsList, setTabsList] = React.useState(defultTabList);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };
    return (
        <Container maxWidth="lg">
            <MyAppBar/>
            <Box
                sx={{
                    // my: 4,
                    //  display: "flex",
                    //flexDirection: "column",
                    //justifyContent: "center",
                    //  alignItems: "center",
                    //  border: "solid",
                    height: "calc(100vh - 65px)",
                    flexGrow: 1,
                    bgcolor: "background.paper",
                    display: "flex",
                    flexDirection: isSmallScreen ? "column" : "row",
                    gap: isSmallScreen ? 0 : "20px",
                }}
            >
                <Tabs
                    orientation={isSmallScreen ? "horizontal" : "vertical"}
                    variant="scrollable"
                    value={tabValue}
                    onChange={handleChange}
                    //  aria-label="Web Tabs"
                    scrollButtons="auto"
                    sx={{marginTop: isSmallScreen ? 0 : "0px"}}
                    TabIndicatorProps={{sx: {width: "7px"}}}
                >
                    {tabsList.map((tab, index: number) => (
                        <Tab
                            key={index}
                            aria-label={`${tab.index}-tab`}
                            label={tab?.title}
                            sx={{
                                "&.Mui-selected": {
                                    color: "ButtonText",
                                    background: "#abe6ff88",
                                },
                                "&:hover": {
                                    background: "#abe6ff88",
                                },
                                alignItems: "start",
                                //  border: "solid",
                                justifyContent: "left",
                                textAlign: "left",
                                textTransform: "initial",
                                width: isSmallScreen ? "auto" : "200px",
                            }}
                            {...a11yProps(tab?.index)}
                        />
                    ))}
                </Tabs>

                {tabsList.map((tab, index: number) => (
                    <TabPanel key={index} value={tabValue} index={tab?.index}>
                        <PostsList posts={tabsList}/>
                    </TabPanel>
                ))}
            </Box>
        </Container>
    );
}
