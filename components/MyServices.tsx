import {Box, Card, CardContent, Container, Grid, Typography, useMediaQuery,} from "@mui/material";
import {RootState} from "lib/store";
import {useSelector} from "react-redux";

import {
    Build,
    Cloud,
    InsertChart,
    Language,
    Link,
    Palette,
    PhoneAndroid,
    Router,
    School,
    Security,
    Settings,
    ShoppingCart,
    Storage,
    Timeline,
    ViewList,
} from "@mui/icons-material";

const servicesList = [
    {
        title: "Web Development",
        description:
            "Expertise in building responsive and user-friendly websites using various technologies like HTML, CSS, JavaScript, and frameworks like React, Angular, or Vue.js.",
        icon: <Language/>,
    },
    {
        title: "Mobile App Development",
        description:
            "Creating iOS, Android, or cross-platform mobile applications using technologies like Swift, Kotlin, or React Native.",
        icon: <PhoneAndroid/>,
    },
    {
        title: "Software Development",
        description:
            "Bespoke software solutions tailored to clients' specific needs, including enterprise software, CRM systems, or specialized tools.",
        icon: <Build/>,
    },
    {
        title: "E-commerce Solutions",
        description:
            "Developing e-commerce platforms using platforms like Shopify, WooCommerce, or custom solutions.",
        icon: <ShoppingCart/>,
    },
    {
        title: "UI/UX Design",
        description:
            "Creating visually appealing and intuitive user interfaces for websites and applications.",
        icon: <Palette/>,
    },
    {
        title: "Consulting and Training",
        description:
            "Providing consulting services to improve software development processes or conducting training workshops on various technologies and best practices.",
        icon: <School/>,
    },
    {
        title: "Maintenance and Support",
        description:
            "Offering ongoing maintenance and support services to ensure the smooth functioning and security of software applications.",
        icon: <Settings/>,
    },
    {
        title: "API Development",
        description:
            "Designing and developing APIs for integrating different systems and applications.",
        icon: <Link/>,
    },
    {
        title: "Cloud Services",
        description:
            "Deploying and managing applications on cloud platforms like AWS, Azure, or Google Cloud.",
        icon: <Cloud/>,
    },
    {
        title: "Blockchain Development",
        description:
            "Developing decentralized applications (DApps) or smart contracts using blockchain technology.",
        icon: <Timeline/>,
    },
    {
        title: "IoT Development",
        description:
            "Building connected devices and IoT solutions for various industries.",
        icon: <Router/>,
    },
    {
        title: "Data Analytics and Visualization",
        description:
            "Collecting, analyzing, and visualizing data to help businesses make informed decisions.",
        icon: <InsertChart/>,
    },
    {
        title: "Cybersecurity Services",
        description:
            "Providing cybersecurity services such as penetration testing, vulnerability assessments, and security audits.",
        icon: <Security/>,
    },
    {
        title: "Content Management Systems (CMS)",
        description:
            "Developing custom CMS solutions or customizing existing ones like WordPress, Drupal, or Joomla.",
        icon: <ViewList/>,
    },
    {
        title: "Database Development and Management",
        description:
            "Designing, developing, and managing databases using technologies like MySQL, PostgreSQL, MongoDB, or Firebase.",
        icon: <Storage/>,
    },
];

export default function MyServices() {
    const isSmallScreen = useMediaQuery("(max-width:600px)");
    const columns = isSmallScreen ? 1 : 3;
    const isDarkMode = useSelector(
        (state: RootState) => state.darkMode.isDarkMode
    );
    const whiteLogos = [
        "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628e8573c43893fe0ace_Sydney-white.svg",
        "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d520d0517ae8e8ddf13_Bern-white.svg",
        "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f46794c159024c1af6d44_Montreal-white.svg",
        "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e891fa22f89efd7477a_TerraLight.svg",
        "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a09d1f6337b1dfed14ab_colorado-white.svg",
        "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5caa77bf7d69fb78792e_Ankara-white.svg",
    ];

    const darkLogos = [
        "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628889c3bdf1129952dc_Sydney-black.svg",
        "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d4d8b829a89976a419c_Bern-black.svg",
        "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f467502f091ccb929529d_Montreal-black.svg",
        "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e911fa22f2203d7514c_TerraDark.svg",
        "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a0990f3717787fd49245_colorado-black.svg",
        "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5ca4e548b0deb1041c33_Ankara-black.svg",
    ];
    const logos = isDarkMode ? darkLogos : whiteLogos;
    const logoStyle = {
        width: "64px",
        opacity: 0.3,
    };
    return (
        <Container
            id="services"
            sx={{
                pt: {xs: 4, sm: 12},
                pb: {xs: 8, sm: 16},
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: {xs: 3, sm: 6},
            }}
        >
            <Box
                sx={{
                    width: {sm: "100%", md: "60%"},
                    textAlign: {sm: "left", md: "center"},
                }}
            >
                <Typography component="h2" variant="h4" color="text.primary">
                    Services
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Explore our comprehensive range of services designed to meet your
                    diverse needs. From web and mobile app development to UI/UX design,
                    cybersecurity, and beyond, we offer expertise across the full spectrum
                    of software solutions. Partner with us for reliable, top-quality
                    services tailored to your requirements.
                </Typography>
            </Box>
            <Grid container spacing={2}>
                {servicesList.map((service, index) => (
                    <Grid item key={index} xs={12} sm={8} md={6} lg={4}>
                        <Card key={index} sx={{p: 1, height: "100%"}}>
                            <CardContent
                                style={{
                                    display: "grid",
                                    alignContent: "center",
                                    gridTemplateColumns: "45px calc(100% - 45px)",
                                }}
                            >
                                <div>{service?.icon} </div>
                                {" "}
                                <Typography
                                    variant="h6"
                                    fontWeight={600}
                                    color="text.secondary"
                                >
                                    {service.title}
                                </Typography>
                            </CardContent>
                            <Box
                                component={"span"}
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    //  justifyContent: "space-between",
                                    // pr: 2,
                                    px: 4,
                                }}
                            >
                                {service?.description}
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
