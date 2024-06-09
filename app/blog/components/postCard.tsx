import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {Avatar, CardActionArea, CardHeader, IconButton} from "@mui/material";
import {Bookmark, BookmarkAddOutlined, MoreVertOutlined, OpenInNew,} from "@mui/icons-material";
import Link from "next/link";
import LoadingPage from "app/LoadingPage";
import {formatTextDateTime, timeAgo} from "../../../components/utilis";
import {addToSavedList, getSavedList, removeFromSavedList} from "../posts/controllers/postController";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../lib/store";
import ReactionsCounter from "../posts/components/ReactionsCounter";
import ShowTags from "../posts/components/ShowTags";
import Tooltip from "@mui/material/Tooltip";
import {ShareButton} from "../posts/components/PostActions";
import {updateLoggedAccount} from "../../../lib/reducers/accountSlicer";
import {useState} from "react";

export default function PostCard(props: any) {
    const article = props?.data;
   const [loading, setLoading]=useState<boolean>(false)
    const dispatch = useDispatch()
    const savedItems = useSelector(
        (state: RootState) => state.loggedAccount)?.loggedAccount?.savedItems;
    let isBookMarked = savedItems?.findIndex((d: any) => d?.value === article?.slug) != -1
    return (
        <Card sx={{width: '100%'}}>
            <LoadingPage open={article == null} onClose={null}/>
            <CardHeader
                avatar={
                    <Avatar
                        sx={{textTransform: 'uppercase'}}
                        title={article?.createdBy?.firstname + " " + article?.createdBy?.lastname}
                        src={
                            process.env.NEXT_PUBLIC_ONLINE_WS_URI +
                            "/images/profiles/" +
                            (article?.createdBy?.avatar ?
                                article?.createdBy?.avatar : "photo.png")
                        }

                    >{article?.createdBy?.firstname[0] + "" + article?.createdBy?.lastname[0]}</Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertOutlined/>
                    </IconButton>
                }
                title={<Typography fontWeight={600} noWrap display={"flex"}
                                   alignItems={"center"} columnGap={"10px"}>
                    <Typography fontWeight={600}
                                sx={{textTransform: "capitalize"}}>{article?.createdBy?.firstname}</Typography>
                    <Typography fontWeight={600}
                                sx={{textTransform: "uppercase"}}>{article?.createdBy?.lastname}</Typography>
                </Typography>}
                subheader={<Typography variant={"body2"} color="text.secondary"
                                       title={formatTextDateTime(new Date(article?.createdAt))}>{timeAgo(new Date(article?.createdAt))}</Typography>}

            />
            <CardActionArea onClick={() => props.openInNoew()}>
                <CardMedia
                    sx={{height: 140}}
                    image={
                        process.env.NEXT_PUBLIC_ONLINE_WS_URI +
                        "/images/posts/" +
                        article?.image
                    }
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {article?.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary"
                                sx={{
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    WebkitLineClamp: 10, // number of lines you want to show
                                    maxHeight: '200px',
                                }}
                    >

                        {article?.description}
                    </Typography>
                    <Typography>
                        <ShowTags tags={article?.tags || []}/>
                    </Typography>
                </CardContent>
            </CardActionArea>

            <CardActions style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
                <div>
                    <ReactionsCounter post={article}/>
                </div>
                <div>
                    <Tooltip title="Share options" placement="right">
                        <ShareButton urlToShare={article?.slug}/>
                    </Tooltip>
                    <Button size="small"
                            disabled={loading}
                            onClick={async () => {
                                setLoading(true);
                                if (isBookMarked) {



                                           await removeFromSavedList(article?.slug).then(async ()=>{
                                               await getSavedList().then(async(data:any)=>{
                                              //     alert(JSON.stringify(data))
                                                   setLoading(false);
                                                   dispatch(updateLoggedAccount({savedItems:data}))
                                               })
                                            })



                                } else
                                {
                                    await addToSavedList({
                                        title: article?.title,
                                        type: "posts",
                                        value: article?.slug,
                                        image: article?.image
                                    }).then(async ()=>

                                        await getSavedList().then(async(data:any)=>{
                                          //  alert(JSON.stringify(data))
                                            dispatch(updateLoggedAccount({savedItems:data}))
                                            setLoading(false);
                                        })
                                    )
                                }
                            }}

                    > {isBookMarked ? <Bookmark/> : <BookmarkAddOutlined/>}</Button>
                    <IconButton
                        size="small"
                        sx={{borderRadius: 12, fontSize: "15px", padding: "3px 7px"}}
                    >
                        {" "}
                        <Link title={"Open in new page"}
                              href="/blog/posts/[slug]"
                              target="_blank"
                              as={`/blog/posts/${article?.slug}`}
                              style={{display: "flex", alignItems: "center", columnGap: "3px"}}
                        >

                            <OpenInNew sx={{fontSize: "25px"}}/>{" "}
                        </Link>

                    </IconButton></div>
            </CardActions>
        </Card>
    );
}
