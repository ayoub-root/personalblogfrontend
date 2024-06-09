"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {axiosApi, formatDateTime, getMonthAndYear,} from "components/utilis";
import {Avatar, Button, Chip, Divider, Grid, IconButton, Link, MenuItem, Rating, Select,} from "@mui/material";
import {SocialMedia} from "components/SocialMedia";
import {ArrowBack, ArrowDropDown} from "@mui/icons-material";
import ToggleColorMode from "components/ToggleColorMode";
import Copyright from "components/Copyright";
import MyDialog from "components/MyDialog";
import ContactUs from "components/ContactUs";
import "../../public/style/style.css";
import Head from "next/head";
import ReactGA from "react-ga4";
import {useRef} from "react";
import LoadingPage from "../LoadingPage";
import {Skeleton} from "@mui/lab";
import CustomSkeleton from "../../components/CustomSkeleton";

export default function Portfolio() {
    // Calculate the angle between each character

    const profileStatus = [
        {title: "Holidays", background: "#FF980014", color: "#FF9800"},
        {title: "Not Available", background: "#98FFFF14", color: "#0000FF"},
        {title: "Available", background: "#98FF0014", color: "#00FF00"},
    ];

    const handleDownload = () => {
        ReactGA.event({
            category: "User",
            action: "Clicked download button",
        });
        // Logic to trigger the download

        const links = document.createElement("a");
        links.href = myProfile?.cvUrl; // Replace with the actual path to your CV
        links.download = myProfile?.cvUrl; // Rename the downloaded file if needed
        links.target = "_blanc"
        document.body.appendChild(links);
        links.click();
        document.body.removeChild(links);
    };
    const scrollToSection = (sectionId: string) => {
        const sectionElement = document.getElementById(sectionId);
        const offset = 0;
        if (sectionElement) {
            const targetScroll = sectionElement.offsetTop - offset;
            sectionElement.scrollIntoView({behavior: "smooth"});
            document.getElementById("#scrolledDiv")?.scrollTo({
                top: targetScroll,
                behavior: "smooth",
            });
        }
    };
    //alert(JSON.stringify(myProfile));
    const [newMessage, setNewMessage] = React.useState<boolean>(false);

    const [cvList, setCvList] = React.useState([]);

    const [selectedCv, setSelectedCv] = React.useState(cvList[0]);

    const [loading, setLoading] = React.useState(true);
    const [myProfile, setMyProfile] = React.useState<any>(null);
    const selectRef = useRef(null);
    React.useEffect(() => {
        const getStories = async () => {
            setLoading(true);

            await axiosApi
                .get(`/mycvs`)
                .then((reponse) => {
                    setCvList(reponse.data.content)
                    const json=reponse.data.content[0]
                 //   alert(cvList.length)
                    setSelectedCv(json)
                    setMyProfile({
                        ...JSON.parse(json?.content || ""),
                        photoUrl: process.env.NEXT_PUBLIC_ONLINE_WS_URI + "/myfiles/cvphoto/" + json?.photoUrl,
                        cvUrl: process.env.NEXT_PUBLIC_ONLINE_WS_URI + "/myfiles/mycvs/" + json?.fileUrl,
                        title: json.title,
                        language: json?.language,
                        lastUpdate: formatDateTime(new Date(json?.updatedAt ? json?.updatedAt : json?.createdAt)),
                    })
setLoading(false)
                }).catch((erro) => {
                    console.log(erro);
                    setLoading(false);
                });
        };
        getStories();
    }, [setLoading]);

    return (
        <Grid container columnSpacing={4} p={3} sx={{height: "100vh"}}>
            <LoadingPage open={loading} onClose={()=>setLoading(false)}/>
            <Head>
                <title>{"Ayoub Benayache portfolio"}</title>
                <meta property="og:title" content={"Ayoub Benayache portfolio"}/>
                <meta property="og:description" content={"description"}/>
                <meta
                    property="og:image"
                    content={
                        process.env.NEXT_PUBLIC_ONLINE_SRV_URI +
                        "/uploads/blog/posts/postImages/" +
                        "default.jpg"
                    }
                />
                <meta
                    property="og:url"
                    content={"https://abtech-six.vercel.app/portfolio/"}
                />
                {/* Add other meta tags as needed */}
            </Head>
            <Grid
                item
                xl={4}
                lg={4}
                md={4}
                sm={12}
                xs={12}
                sx={{height: "100%", overflow: "auto"}}
            >
                {loading ? (
                    <CustomSkeleton  />
                ) : (
                    <Box
                    sx={{
                        // border: "solid",
                        height: "100%",
                        px: 5,
                        py: 2,
                        borderRadius: "12px",
                        border: "solid 1px #eee5",
                        backgroundColor: "background.cvcontainer",
                        overflow: "auto",
                    }}
                >
                    <div
                        style={{
                            justifyContent: "center",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <div
                            style={{
                                position: "static",
                                marginBottom: "-45px",
                                zIndex: 1,
                                display: "flex",
                                justifyContent: "space-between",
                                top: 0,
                                // border: "solid",
                                alignItems: "center",
                                width: "115%",
                            }}
                        >
                            <Link href="/">
                                <IconButton>
                                    <ArrowBack/>
                                </IconButton>
                            </Link>
                            <ToggleColorMode/>
                        </div>
                        {" "}
                        <div
                            style={{ marginBlock:'-5px 5px',
                                border: "solid 1px #ccc5",
                                position: "relative",

                                borderRadius: "99%",
                                padding: "10px",
                                display: "inline-block",
                                fontSize: "12px",
                                background:
                                    profileStatus.filter(
                                        (r) => r?.title == myProfile?.status?.title
                                    )[0]?.background || profileStatus[0]?.background,
                            }}
                        >
                            <Avatar
                                src={myProfile?.photoUrl}
                                sx={{
                                    width: "90px",
                                    height: "90px",
                                    border: "solid 1px #eee5",
                                }}
                            />
                            <svg
                                className="fade-in"
                                viewBox="0 0  500 500"
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,

                               //      border: "solid",
                                }}
                            >
                                <path
                                    fill="transparent"
                                    id="curve"
                                    d="M 45 250 A 100 100 0 1 1 455 250"
                                    // transform="rotate(90, 50 50)"
                                />
                                <text width={myProfile?.status?.title.length}>
                                    <textPath
                                        startOffset={"30%"}
                                        href="#curve"
                                        fontWeight={"bold"}
                                        fill={
                                            profileStatus.filter(
                                                (r) => r?.title == myProfile?.status?.title
                                            )[0]?.color || profileStatus[0]?.color
                                        }
                                        fontSize={"50px"}
                                    >
                                        {myProfile?.status?.title}
                                    </textPath>
                                </text>
                            </svg>
                        </div>
                        <Select key={selectedCv} size={"small"} value={selectedCv}

                                onChange={(r: any) => {
                            const json = r.target.value;
                            setMyProfile({
                                ...JSON.parse(json?.content || ""),
                                photoUrl: process.env.NEXT_PUBLIC_ONLINE_WS_URI + "/myfiles/cvphoto/" + json?.photoUrl,
                                cvUrl: process.env.NEXT_PUBLIC_ONLINE_WS_URI + "/myfiles/mycvs/" + json?.fileUrl,
                                title: json.title,
                                language: json?.language,
                                lastUpdate: formatDateTime(new Date(json?.updatedAt ? json?.updatedAt : json?.createdAt)),
                            });
                            setSelectedCv(r.target.value)
                        }}>
                            {cvList.map((r: any) => <MenuItem key={r?.id} value={r}>{r?.title} - ({r?.language})</MenuItem>)}
                        </Select>
                    </div>
                    <Box>
                        <Typography
                            sx={{
                                padding: "10px",
                                fontSize: "24px",
                                display: "flex",
                                columnGap: "3px",
                                justifyContent: "center",
                                fontWeight: 700,
                            }}
                        >
              <span style={{textTransform: "capitalize"}}>
                {myProfile?.firstName}
              </span>{" "}
                            <span style={{textTransform: "uppercase"}}>
                {myProfile?.lastName}
              </span>
                        </Typography>
                        <Typography
                            sx={{
                                padding: "0px",
                                fontSize: "14px",
                                display: "flex",
                                columnGap: "3px",
                                justifyContent: "center",
                                fontWeight: 700,
                                textAlign: "center",
                                marginBottom: "20px",
                                color:"text.secondary"
                            }}
                        >
                            {myProfile?.titles?.join(" | ")}
                        </Typography>

                        <Typography
                            sx={{
                                padding: "5px",
                                fontSize: "15px",
                                display: "flex",
                                columnGap: "3px",
                                justifyContent: "start",
                                fontWeight: 700,
                            }}
                        >
                            <span style={{textTransform: "capitalize"}}>Mobile: </span>{" "}
                            <Typography sx={{textTransform: "uppercase", fontWeight: 500,  color:"text.secondary"}}>
                {myProfile?.mobile?.join(", ")}
              </Typography>
                        </Typography>
                        <Typography
                            sx={{
                                padding: "5px",
                                fontSize: "15px",
                                display: "flex",
                                columnGap: "3px",
                                justifyContent: "start",
                                fontWeight: 700,
                            }}
                        >
                            <span style={{textTransform: "capitalize"}}>Emails: </span>{" "}
                            <Typography sx={{textTransform: "inherit", fontWeight: 500,  color:"text.secondary"}}>
                {myProfile?.emails?.join(", ")}
              </Typography>
                        </Typography>
                        <Typography
                            sx={{
                                padding: "5px",
                                fontSize: "15px",
                                display: "flex",
                                columnGap: "3px",
                                justifyContent: "start",
                                fontWeight: 700,
                            }}
                        >
                            <span style={{textTransform: "capitalize"}}>Address: </span>{" "}
                            <Typography sx={{textTransform: "inherit", fontWeight: 500,  color:"text.secondary"}}>
                {myProfile?.addresses?.join(", ")}
              </Typography>
                        </Typography>
                        <Box
                            sx={{
                                padding: "5px",
                                fontSize: "15px",
                                display: "flex",
                                columnGap: "3px",
                                justifyContent: "center",
                                fontWeight: 700,
                            }}
                        >
                            <SocialMedia/>
                        </Box>
                        <Typography
                            sx={{
                                padding: "15px",
                                fontSize: "15px",
                                display: "flex",
                                columnGap: "15px",
                                justifyContent: "center",
                                fontWeight: 700,
                            }}
                        >
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setNewMessage(true);
                                }}
                            >
                                <Typography noWrap>Contact me</Typography>
                            </Button>
                            <Button variant="outlined" onClick={handleDownload}>
                                <Typography noWrap>Download CV</Typography>
                            </Button>
                        </Typography>
                        <Divider/>
                        <Grid
                            container
                            sx={{
                                paddingTop: "5px",
                                fontSize: "11px",
                                //   paddingTop: "20px",
                                display: "flex",
                                gap: "10px",
                                columnGap: "10px",

                                //    border: "solid",
                                justifyContent: "center",
                            }}
                        >
                            <MenuItem
                                sx={{  fontSize: "12px"}}
                                dense
                                onClick={() => scrollToSection("aboutMe")}
                            >
                                About me 😊
                            </MenuItem>
                            <MenuItem
                                sx={{background: "#7733EE33", fontSize: "12px"}}
                                dense
                                onClick={() => scrollToSection("education")}
                            >
                                Education
                            </MenuItem>{" "}
                            <MenuItem
                                sx={{background: "#77EE3333", fontSize: "12px"}}
                                dense
                                onClick={() => scrollToSection("experience")}
                            >
                                Experiences
                            </MenuItem>
                            <MenuItem
                                sx={{background: "#a112", fontSize: "12px"}}
                                dense
                                onClick={() => scrollToSection("skills")}
                            >
                                Skills
                            </MenuItem>
                            <MenuItem
                                sx={{background: "#11e2", fontSize: "12px"}}
                                dense
                                onClick={() => scrollToSection("languages")}
                            >
                                Languages
                            </MenuItem>
                            <MenuItem
                                sx={{background: "#11e2", fontSize: "12px"}}
                                dense
                                onClick={() => scrollToSection("publications")}
                            >
                                Publications
                            </MenuItem>
                            <MenuItem
                                sx={{background: "#ae11", fontSize: "12px"}}
                                dense
                                onClick={() => scrollToSection("more")}
                            >
                                More
                            </MenuItem>{" "}
                            <MenuItem
                                sx={{background: "#ae11", fontSize: "12px"}}
                                dense
                                onClick={() => scrollToSection("Interests")}
                            >
                                Interests
                            </MenuItem>{" "}
                        </Grid>
                    </Box>
                </Box>)}
            </Grid>
            <Grid
                onScroll={() => {
                }}
                id="scrolledDiv"
                item
                xl={8}
                lg={8}
                md={8}
                sm={12}
                xs={12}
                sx={{height: "100%", overflow: "auto"}}
            >
                {loading ? (
                    <CustomSkeleton />
                ) : (  <Box
                    sx={{
                        backgroundColor: "background.cvcontainer",
                        borderRadius: "12px",
                        border: "solid 1px #eee5",
                        py: 3,
                        px: 5,

                        //    alignContent: "center",
                    }}
                >
                    <Box //about me
                        id="aboutMe"
                        sx={{
                            width: {sm: "100%", xl: "100%", paddingBottom: "35px"},
                            textAlign: {sm: "left", md: "left"},
                        }}
                    >
                        <Typography
                            component="h2"
                            variant="h4"
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"start"}
                            columnGap={"10px"}
                        >
                            About me{" "}
                            <span style={{fontSize: "12px"}}>
                (last update : {myProfile?.lastUpdate})
              </span>
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                borderRadius: "5px",
                                color: "text.primary",
                                padding: "30px",
                               // bgcolor: "background.default2",
                            }}
                        >
                            {myProfile?.aboutme}
                        </Typography>
                    </Box>
                    <Box // education
                        id="education"
                        sx={{
                            width: {sm: "100%", xl: "100%", paddingBottom: "35px"},
                            textAlign: {sm: "left", md: "left"},
                        }}
                    >
                        <Typography component="h2" variant="h4">
                            Education
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{color: "text.primary", paddingTop: "10px"}}
                        >
                            {myProfile?.educations?.map((exp: any) => (
                                <Grid
                                    key={exp?.title}
                                    container
                                    // columnSpacing={2}
                                    sx={{
                                        boxShadow: "0px 5px 15px 0px rgba(0, 0, 0, 0.2)",
                                        borderRadius: "0.1875rem",
                                        marginBlock: "25px",
                                         backgroundColor: "background.default",
                                        //  padding: "10px",
                                        //  paddingLeft: "-20px",
                                    }}
                                >
                                    <Grid item xs={12} md={3}>
                                        <div
                                            style={{
                                                background: "#7733EE33",
                                                height: "100%",
                                                border: "solid 1px #eee5",
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                alignContent: "center",

                                                padding: "15px",
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                fontWeight={700}
                                                noWrap
                                                paddingBottom={"15px"}
                                            >
                                                {exp?.deploma}
                                            </Typography>
                                            <Typography variant="h6" fontSize={"14px"}>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignContent: "center",
                                                        justifyContent: "center",
                                                        flexDirection: "column",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    {getMonthAndYear(exp?.timeline?.start)}
                                                    <ArrowDropDown/>
                                                    {exp?.timeline?.end == "Today"
                                                        ? "Until Today"
                                                        : getMonthAndYear(exp?.timeline?.end)}
                                                </div>
                                            </Typography>
                                        </div>
                                    </Grid>{" "}
                                    <Grid item xs={12} md={9}>
                                        <div
                                            style={{
                                                border: "solid 1px #eee5",
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "start",
                                                padding: "15px",
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                fontWeight={700}
                                                textTransform={"capitalize"}
                                            >
                                                {exp?.title}
                                            </Typography>
                                            <Typography variant="h6"  fontSize={14} fontWeight={600}>
                                                {exp?.schools}
                                            </Typography>
                                            <ul>
                                                {exp?.descriptions?.map((ee: any) => (
                                                    <li  key={ee}><Typography color={'text.secondary'}><Typography color={'text.secondary'}>{ee}</Typography></Typography></li>
                                                ))}
                                            </ul>
                                            <div
                                                style={{
                                                    padding: "10px 5px",
                                                    display: exp?.file != "" ? "" : "none",
                                                }}
                                            >
                                                <a href={exp?.file}>Link: {exp?.title}</a>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            ))}
                        </Typography>
                    </Box>{" "}
                    <Box // experience
                        id="experience"
                        sx={{
                            width: {sm: "100%", xl: "100%", paddingBottom: "35px"},
                            textAlign: {sm: "left", md: "left"},
                        }}
                    >
                        <Typography component="h2" variant="h4">
                            Experience
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{color: "text.primary", paddingTop: "10px"}}
                        >
                            {myProfile?.experiences?.map((exp: any) => (
                                <Grid
                                    key={exp?.title}
                                    container
                                    // columnSpacing={2}
                                    sx={{
                                        boxShadow: "0px 5px 15px 0px rgba(0, 0, 0, 0.2)",
                                        borderRadius: "0.1875rem",
                                        marginBlock: "25px",
                                        bgcolor: "background.default",
                                        //  padding: "10px",
                                        //  paddingLeft: "-20px",
                                    }}
                                >
                                    <Grid item xs={12} md={3}>
                                        <div
                                            style={{
                                                background: "#77EE3333",
                                                height: "100%",
                                                border: "solid 1px #eee5",
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                alignContent: "center",

                                                padding: "15px",
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                fontWeight={700}
                                                noWrap
                                                paddingBottom={"15px"}
                                            >
                                                {exp?.deploma}
                                            </Typography>
                                            <Typography variant="h6" fontSize={"14px"}>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignContent: "center",
                                                        justifyContent: "center",
                                                        flexDirection: "column",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    {getMonthAndYear(exp?.timeline?.start)}
                                                    <ArrowDropDown/>
                                                    {exp?.timeline?.end == "Today"
                                                        ? "Until Today"
                                                        : getMonthAndYear(exp?.timeline?.end)}
                                                </div>
                                            </Typography>
                                        </div>
                                    </Grid>{" "}
                                    <Grid item xs={12} md={9}>
                                        <div
                                            style={{
                                                border: "solid 1px #eee5",
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "start",
                                                padding: "15px",
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                fontWeight={700}
                                                textTransform={"capitalize"}
                                            >
                                                {exp?.title}
                                            </Typography>
                                            <Typography variant="h6" fontSize={14} fontWeight={600}>
                                                {exp?.company}
                                            </Typography>
                                            <ul>
                                                {exp?.descriptions?.map((ee: any) => (
                                                    <li key={ee}><Typography color={'text.secondary'}>{ee}</Typography></li>
                                                ))}
                                            </ul>
                                            <div
                                                style={{
                                                    display: exp?.projects?.length > 0 ? "flex" : "none",
                                                    flexDirection: "column",
                                                }}
                                            >
                                                <Typography variant="h6" fontSize={14} fontWeight={600}>
                                                    Projects :
                                                </Typography>
                                                <ul>
                                                    {exp?.projects?.map((ee: any) => (
                                                        <li key={ee}><Typography color={'text.secondary'}>{ee}</Typography></li>
                                                    ))}
                                                </ul>
                                                {" "}
                                            </div>
                                            <Grid
                                                container
                                                spacing={0.5}
                                                sx={{ padding: "15px"}}
                                            >
                                                {exp?.techs?.map((sk: any) => (
                                                    <Grid item key={sk}>
                                                        <Chip label={sk}/>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </div>
                                    </Grid>
                                </Grid>
                            ))}
                        </Typography>
                    </Box>
                    <Box //skills
                        id="skills"
                        sx={{
                            width: {sm: "100%", xl: "100%", paddingBottom: "35px"},
                            textAlign: {sm: "left", md: "left"},
                        }}
                    >
                        <Typography component="h2" variant="h4">
                            Technical kills
                        </Typography>

                        <Grid
                            container
                            sx={{  padding: "15px"}}
                        >
                            {myProfile?.skills?.map((sk: any) => (
                                <Grid
                                    key={sk?.title}
                                    item
                                    sx={{
                                        margin: "8px",
                                        border: "solid 1px #eee5",
                                        borderRadius: "5px",
                                        background: "#a112",
                                        minWidth: "200px",
                                        padding: "5px",
                                        display: "flex",
                                        //  columnGap: "5px",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: "text.primary",
                                            display: "flex",
                                            padding:'3px',
                                            //  columnGap: "5px",
                                            alignItems: "center",
                                            width: "100%",
                                            justifyContent: "space-between",
                                            columnGap: "5px",
                                        }}
                                    >
                                        <Typography>{sk?.title}</Typography>
                                        <Rating
                                            name="size-small"
                                            readOnly
                                            value={sk?.level}
                                            size="small"
                                        />{" "}
                                    </Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    <Box //languges
                        id="languages"
                        sx={{
                            width: {sm: "100%", xl: "100%", paddingBottom: "35px"},
                            textAlign: {sm: "left", md: "left"},
                        }}
                    >
                        <Typography component="h2" variant="h4">
                            Languages
                        </Typography>

                        <Grid
                            container
                            sx={{  padding: "15px"}}
                        >
                            {myProfile?.languages?.map((sk: any) => (
                                <Grid
                                    item
                                    key={sk}
                                    sx={{
                                        margin: "5px",
                                        border: "solid 1px #eee5",
                                        borderRadius: "5px",
                                        background: "#11e2",
                                        minWidth: "200px",
                                        padding: "5px",
                                        display: "flex",
                                        //  columnGap: "5px",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: "text.primary",
                                            display: "flex",
                                            //  columnGap: "5px",
                                            alignItems: "center",
                                            width: "100%",
                                            justifyContent: "space-between",
                                            columnGap: "5px",
                                            padding:"3px"
                                        }}
                                    >
                                        <Typography>{sk?.title}</Typography>
                                        <Rating
                                            name="size-small"
                                            readOnly
                                            value={sk?.level}
                                            size="small"
                                        />{" "}
                                    </Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    <Box //Publications
                        id="publications"
                        sx={{
                            width: {sm: "100%", xl: "100%", paddingBottom: "35px"},
                            textAlign: {sm: "left", md: "left"},
                        }}
                    >
                        <Typography component="h2" variant="h4">
                            Publications
                        </Typography>

                        <Grid
                            container
                            sx={{  padding: "15px"}}
                        >
                            {myProfile?.publications?.articles?.map((sk: any) => (
                                <Grid
                                    item
                                    key={sk}
                                    sx={{
                                        margin: "5px",
                                        border: "solid 1px #eee3",
                                        borderRadius: "5px",
                                        background: "#11e2",
                                        minWidth: "200px",
                                        padding: "10px",
                                        display: "flex",
                                        //  columnGap: "5px",

                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: "text.primary",
                                            display: "flex",
                                            //  columnGap: "5px",
                                            alignItems: "center",
                                            width: "100%",
                                            justifyContent: "space-between",
                                            columnGap: "5px",
                                        }}
                                    >
                                        <Typography>
                                            {" "}
                                            <li>{sk} </li>
                                        </Typography>
                                    </Typography>
                                </Grid>
                            ))}
                            <div style={{padding: "10px 5px"}}>
                                <a href={myProfile?.publications?.scholarLink}>
                                    Scholar:{myProfile?.firstName} {myProfile?.lastName}
                                </a>
                            </div>
                        </Grid>
                    </Box>
                    <Box // more info
                        id="more"
                        sx={{
                            width: {sm: "100%", xl: "100%", paddingBottom: "35px"},
                            textAlign: {sm: "left", md: "left"},
                        }}
                    >
                        <Typography component="h2" variant="h4">
                            More Skills
                        </Typography>
                        <Typography
                            variant="body2"
                            // sx={{ color: "text.primary", paddingTop: "10px" }}
                        >
                            <Grid container spacing={2.5}>
                                {myProfile?.moreDetails?.map((item: any, index: number) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Stack
                                            direction="column"
                                            // color="inherit"
                                            component={Card}
                                            spacing={1}
                                            //  useFlexGap
                                            sx={{
                                                p: 3,
                                                height: "100%",
                                                border: "1px solid",
                                                borderColor: "text.secondary",
                                                bgcolor: "background.whitebg",
                                                backgroundColor: "#ae11",
                                            }}
                                        >
                                            <Box sx={{opacity: "50%"}}>{item.icon}</Box>
                                            <div>
                                                <Typography fontWeight="medium" gutterBottom>
                                                    {item.title}
                                                </Typography>
                                                <Typography variant="body2" sx={{color: "text.secondary"}}>
                                                    {item.description}
                                                </Typography>
                                            </div>
                                        </Stack>
                                    </Grid>
                                ))}
                            </Grid>
                        </Typography>
                    </Box>
                    <Box // intersts
                        id="Interests"
                        sx={{
                            width: {sm: "100%", xl: "100%", paddingBottom: "35px"},
                            textAlign: {sm: "left", md: "left"},
                        }}
                    >
                        <Typography component="h2" variant="h4">
                            Interests
                        </Typography>
                        <Typography
                            variant="body2"
                            // sx={{ color: "text.primary", paddingTop: "10px" }}
                        >
                            <Grid
                                container
                                spacing={0.5}
                                sx={{  padding: "15px"}}
                            >
                                {myProfile?.interests?.map((sk: any) => (
                                    <Grid item key={sk}>
                                        <Chip label={sk}/>
                                    </Grid>
                                ))}
                            </Grid>
                        </Typography>
                    </Box>
                    <Box // copyraight
                        id="more"
                        sx={{
                            width: {sm: "100%", xl: "100%", paddingBottom: "35px"},
                            textAlign: {sm: "left", md: "left"},
                        }}
                    >
                        <Copyright/>
                    </Box>
                </Box>)}
            </Grid>

            <MyDialog
                // maxHeight="100vh"
                maxWidth={"md"}
                title={"Contact Us"}
                open={newMessage}
                onClose={() => {
                    setNewMessage(false);
                }}
            >
                <ContactUs/>
            </MyDialog>
        </Grid>
    );
}
