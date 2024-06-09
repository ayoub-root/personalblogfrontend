"use client";
import {Avatar, Box, CardMedia, Grid, TextField, Typography, useMediaQuery,} from "@mui/material";
import PostSummary from "./PostSummary";
import PostActions from "./PostActions";
import {axiosApi, defultTabList, showInformation, timeAgo} from "components/utilis";
import * as React from "react";
import {useEffect, useState} from "react";
import CustomLayout from "components/CustomLayout";
import LoadingPage from "../../../LoadingPage";
import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineItem,
    timelineItemClasses,
    TimelineSeparator
} from "@mui/lab";
import {Favorite, Send} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ReactionsCounter from "./ReactionsCounter";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../lib/store";
import ShowTags from "./ShowTags";
import {updateselectedStory} from "../../../../lib/reducers/storySlicer";


const PostDetails = ({params: {slug}, isDialog}: { params: { slug: string }, isDialog: Boolean }) => {
    const isSmallScreen = useMediaQuery("(max-width:600px)");

    function scrollToComments() {
        const commentsSection = document.getElementById("comments-section");
        if (commentsSection) {
            commentsSection.scrollIntoView({behavior: "smooth"});
        }
    }

    const [showSummray, setShowSummray] = useState(true);
    const [commentLoading, setCommentLoading] = useState(false);

    const [loading, setLoading] = useState(true);
    const [update, setUpdate] = useState<number>(0);

    function addIdToTags2(htmlContent: string) {
       // const parser = new DOMParser();
       // const doc = parser.parseFromString(htmlContent, 'text/html');
       // const tags = doc.body.getElementsByTagName('*');

       // Array.from(tags).forEach((tag, index) => {
         //   tag.id = `cstm-id-${index + 1}`;
        //});

        //return doc.body.innerHTML;
    }
    function addIdToTags(htmlContent:string) {
        let tagCounter = 1;

        // Use a regular expression to match all opening tags
        return htmlContent.replace(/(<\s*([a-zA-Z0-9]+)(\s+[^>]*)?)/g, (match, p1, p2):any => {
            // Construct the new tag with an id attribute
            return `${p1} id="cstm-id-${tagCounter++}"`;
        });
    }

    const dispatch = useDispatch()
    const post = useSelector((state: RootState) => state.selectedStory)?.selectedStory;
    const comments=post?.comments? [...post?.comments]?.sort((a:any,b:any)=> new Date(b?.createdAt)?.getTime() - new Date(a.createdAt)?.getTime()):[];
    useEffect(() => {
        const getDetailStory = async () => {
            setLoading(true);
            //   alert(slug);


//alert(slug)
            try {
                const response = await axiosApi.get(`/posts/${slug}`);
                dispatch(updateselectedStory({...response.data, content: addIdToTags(response.data.content)}));
                //   alert(response.data)
                //setLikeStatus(data.likeStatus);
                // setLikeCount(data.data.likeCount);
                //setStoryLikeUser(data.data.likes);
                setLoading(false);


            } catch (error) {
                dispatch(updateselectedStory({}));
                //  navigate("/not-found");
            }
        };
        getDetailStory();
    }, [slug,   update]);
    const [newComment, setNewComment] = React.useState<any>(null);
    const loggedAccount = useSelector(
        (state: RootState) => state.loggedAccount)?.loggedAccount;
    const handleNewComment = async (e: any) => {
        e.preventDefault();

        setCommentLoading(true)
        const formdata = new FormData();
        formdata.append("file", newComment?.image);
        formdata.append("content", newComment?.content);


        try {
            await axiosApi.post("/posts/" + post?.id + "/comment/", formdata, {headers: {"Content-Type": "multipart/form-data"}});
            showInformation("Add comment successfully ");
            setUpdate((e: number) => (e + 1));
            setCommentLoading(false);
          setUpdate(e=>e+1)
            //   setNewPost(empty);
            // setTimeout(() => {
            //   //  alert("ok");
            // }, 7000);
        } catch (error) {
            setCommentLoading(false)
            // setTimeout(() => {
            //  // alert("errot");
            // }, 7000);
            // alert(error);
        }
    };

    return <Grid sx={{}}>
        <LoadingPage open={loading} onClose={() => setLoading(false)}/>
        <Box
            sx={{paddingInline:"15px",
                paddingBlock:"10px 0px",
                display: post ? "flex" : "none",
                height: isDialog ? "calc(100vh - 5px)" : "calc(100vh - 65px)",
                flexGrow: 1,
                backgroundColor: "background.paper",width:'100%',
               // border:'solid blue',
                flexDirection: isSmallScreen ? "column" : "row",
                gap: isSmallScreen ? 0 : "0px",
            }}
        >
            <Box
                sx={{
                    display: {xs: "none", sm: "none", md: showSummray ? "flex" : "none"},
                    //  alignItems: "center",
                    paddingTop: "5px",
                    flexDirection: "column",
                    minWidth: "230px",
                    overflow: "auto",
                    height:'auto'
                    //border: "solid",
                }}
            >

                <PostSummary htmlContent={post?.content}/>
            </Box>
            <Box
                sx={{
                    //    background: "background.paper",
                    //  border: "solid",
                    display: "flex",
                    alignItems: "center",
                    padding: "15px 15px 15px 15px",
                    flexDirection: "column",
                    width: "100%",
                    overflow: "auto",
                    rowGap: "40px",
                    // minWidth: "230px",
                }}
            >
                {<CustomLayout
                    slug={post?.slug}
                    title={post?.title}
                    description={post?.description}
                    image={post?.image}
                    url={process.env.NEXT_PUBLIC_ONLINE_SRV_URI + "/posts/" + post?.slug}
                    key={slug + "e"}
                >
                    <Box
                        sx={{
                            borderRadius: "6px",
                            border: "solid 1px #ccc2",
                            background: "#eef1",
                            width: "100%",
                            padding: "10px 20px",
                            display: "flex",
                            alignItems: "flex-start",
                            flexDirection: "column",
                            // gridTemplateRows: "80px calc(100% - 80px)",
                        }}
                    >
                        <h1>{post?.title}</h1>
                        <Box
                            overflow={"auto"}
                            sx={{
                                width: "100%",
                                margin: 0,
                                display: "flex",
                                flexDirection: "column",
                                columnGap: "20px",
                                //  border: "solid",
                                minHeight: "500px",
                                justifyContent: "start",
                            }}

                            //spacing={{ xs: 2, md: 4 }}
                            //  columns={{ xs: 4, sm: 8, md: 8, lg: 12 }}
                        >
                            <CardMedia
                                sx={{height: 340}}
                                image={
                                    post?.image ? process.env.NEXT_PUBLIC_ONLINE_WS_URI +
                                        "/images/posts/" +
                                        post?.image : ""
                                }
                                title={post?.title}
                            />
                            <Typography>
                                <ShowTags tags={post?.tags || []}/>
                            </Typography>
                            <div style={{
                                display: 'flex',
                                border: 'solid 1px #ccc3',
                                justifyContent: 'start',
                                alignItems: "center",
                                columnGap: "10px",
                                paddingBlock: " 15px 10px"
                            }}>

                                <Typography fontWeight={700} paddingX={'10px'} noWrap display={"flex"}
                                            alignItems={"center"} columnGap={"10px"}>By : <Avatar
                                    sx={{textTransform: 'uppercase'}}
                                    title={post?.createdBy?.firstname + " " + post?.createdBy?.lastname}
                                    src={
                                        process.env.NEXT_PUBLIC_ONLINE_WS_URI +
                                        "/images/profiles/" +
                                        (post?.createdBy?.avatar ?
                                            post?.createdBy?.avatar : "photo.png")
                                    }

                                >{post?.createdBy?.firstname[0] + "" + post?.createdBy?.lastname[0]}</Avatar>

                                    <Typography
                                        sx={{textTransform: "capitalize"}}>{post?.createdBy?.firstname}</Typography>
                                    <Typography
                                        sx={{textTransform: "uppercase"}}>{post?.createdBy?.lastname}</Typography>
                                </Typography> |
                                <Typography> {timeAgo(new Date(post?.createdAt))}</Typography>
                            </div>
                            <div>

                                <ReactionsCounter post={post} key={post}/>
                            </div>
                            <div
                                style={{width: "100%", paddingBlock: "20px"}}
                                // className="sun-editor-editable"
                                dangerouslySetInnerHTML={{__html: post?.content}}
                            ></div>
                        </Box>
                    </Box>
                </CustomLayout>}
                <Box
                    id="comments-section"
                    sx={{
                        width: "100%",
                        borderRadius: "6px",
                        border: "solid 1px #ccc2",
                        background: "#eef1",
                        padding: "20px 30px",
                        display: "grid",
                        alignItems: "flex-start",
                        gridTemplateRows: "50px calc(100% - 50px)",
                    }}
                >
                    <Typography variant="h5">Comments ({post?.comments?.length})</Typography>
                    <Box
                        overflow={"auto"}
                        sx={{
                            width: "100%",
                            margin: 0,
                            display: "flex",
                            flexDirection: "column",
                            columnGap: "20px",
                        }}

                        //spacing={{ xs: 2, md: 4 }}
                        //  columns={{ xs: 4, sm: 8, md: 8, lg: 12 }}
                    >
                        <TextField multiline
                                   value={newComment?.content || ""}
                                   onChange={r => setNewComment({...newComment, content: r.target.value})}
                                   placeholder={"add new comment"}
                                   InputProps={{
                                       endAdornment: <IconButton
                                           style={{height: "35px", width: "35px"}}
                                           disabled={commentLoading}
                                           onClick={(e) => {
                                               handleNewComment(e).then(() => {
                                                   setNewComment({content: null});
                                               }).catch(() => {
                                                   showInformation("error");
                                               })

                                           }}
                                       ><Send/></IconButton>,
                                       sx: {display: "flex", alignItems: "start", paddingBlock: "10px"}
                                   }}
                                   sx={{display: loggedAccount ? "flex" : "none"}}
                        />
                        <Timeline
                            sx={{
                                [`& .${timelineItemClasses.root}:before`]: {
                                    flex: 0,
                                    padding: 0,
                                },
                            }}
                        >

                            {comments?.map((cmt: any, index: number) => <TimelineItem key={index}>
                                    <TimelineSeparator>
                                        <Avatar
                                            sx={{textTransform: 'uppercase'}}
                                            title={cmt?.createdBy?.firstname + " " + cmt?.createdBy?.lastname}
                                            src={
                                                process.env.NEXT_PUBLIC_ONLINE_WS_URI +
                                                "/images/profiles/" +
                                                (cmt?.createdBy?.avatar ?
                                                    cmt?.createdBy?.avatar : "photo.png")
                                            }

                                        >{cmt?.createdBy?.firstname[0] + "" + cmt?.createdBy?.lastname[0]}</Avatar>
                                        {index != defultTabList.length - 1 && <TimelineConnector/>}
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        <div style={{display: 'flex', justifyContent: 'start', columnGap: "10px"}}>
                                            <Typography fontWeight={600} paddingX={'0px 10px'} noWrap
                                                        display={"flex"}
                                                        alignItems={"center"} columnGap={"10px"}>
                                                <Typography fontWeight={600}
                                                            sx={{textTransform: "capitalize"}}>{cmt?.createdBy?.firstname}</Typography>
                                                <Typography fontWeight={600}
                                                            sx={{textTransform: "uppercase"}}>{cmt?.createdBy?.lastname}</Typography>
                                            </Typography> |
                                            <Typography> {timeAgo(new Date(cmt?.createdAt))}</Typography>
                                        </div>
                                        <div>
                                            <Typography variant={"body2"} color="text.secondary"
                                            ><pre style={{
                                                whiteSpace: "pre-wrap",
                                                fontFamily: "cursive",

                                                paddingInline: '5px', color: 'body2'
                                            }}>{cmt?.content}</pre>
                                            </Typography>
                                        </div>
                                        <div style={{
                                            display: 'none',
                                            justifyContent: 'start',
                                            alignItems: "center",
                                            columnGap: "10px"
                                        }}>
                                            <Button>Like</Button> | <Button>Reply</Button>
                                            <IconButton><Favorite/></IconButton>

                                        </div>
                                    </TimelineContent>
                                </TimelineItem>)}


                        </Timeline>
                    </Box>
                </Box>
                <Box
                    sx={{
                        borderRadius: "6px",
                        border: "solid 1px #ccc2",
                        background: "#eef1",
                        padding: "10px 20px",
                        display: "none",
                        alignItems: "flex-start",
                        gridTemplateRows: "50px calc(100% - 50px)",
                    }}
                >
                    <Typography variant="h5">Related articles</Typography>
                    <Box
                        overflow={"auto"}
                        sx={{
                            width: "100%",
                            margin: 0,
                            display: "flex",
                            flexDirection: "row",
                            columnGap: "20px",
                        }}

                        //spacing={{ xs: 2, md: 4 }}
                        //  columns={{ xs: 4, sm: 8, md: 8, lg: 12 }}
                    >
                        {defultTabList.map((cpost, index: number) => <Grid
                                key={index}
                                sx={{minWidth: "350px", minHeight: "300px"}}
                                // border="solid red"
                                display={"flex"}
                                justifyContent={"center"}
                            >
                                test rrelated post
                            </Grid>)}
                    </Box>
                </Box>
            </Box>
            <Grid
                sx={{
                   // position:"absolute",
                    //bottom:0,
                  //  width: "50px",
                    display: "flex",
                 //   marginRight: "-70px",
                     //  border: "solid",
                    justifyContent:"center",
                    alignItems:"center",padding:"10px"
                }}
            >
                <PostActions
                    row={isSmallScreen}
                    isUpdated={() => setUpdate(e => e + 1)}
                    data={post}
                    jumpToComment={() => {
                        scrollToComments();
                    }}
                    showSummray={() => setShowSummray(!showSummray)}
                />
            </Grid>
        </Box>
    </Grid>;
};

export default PostDetails;
