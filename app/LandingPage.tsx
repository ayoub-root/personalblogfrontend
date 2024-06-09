import * as React from "react";
import {Container, Grid} from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import AppAppBar from "../components/AppAppBar";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

import ContactUs from "components/ContactUs";

import MyServices from "components/MyServices";
import ServiceFeatures from "../components/ServiceFeatures";

export default function LandingPage() {
    return (
        <div>
            <AppAppBar/>

            {/* <Hero /> */}
            <Box id="home" sx={{bgcolor: "background.default"}}>
                {/* <LogoCollection /> */}
                <MyServices/>
                <Divider/>
                <ServiceFeatures/>
                <Divider/>

                {/* <Pricing />
        <Divider /> */}
                <FAQ/>
                <Divider/>
                <Container maxWidth="md" id="contact" sx={{py: {xs: 8, sm: 16}}}>
                    <Grid container spacing={6}>
                        {" "}
                        <ContactUs/>
                    </Grid>
                </Container>
                <Divider/>
                <Footer/>
            </Box>
        </div>
    );
}
