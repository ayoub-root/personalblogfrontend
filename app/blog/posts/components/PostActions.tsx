import Tooltip from "@mui/material/Tooltip";
import {Bookmark, BookmarkAddOutlined, Comment, MoreVertOutlined, ThumbUpOffAlt,} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import ToggleColorMode from "../../../../components/ToggleColorMode";
import {addToSavedList, getSavedList, handleRaction, removeFromSavedList} from "../controllers/postController";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../lib/store";
import {Avatar, IconButton, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import {reactionTypes} from "./ReactionsCounter";
import {toggleOpenLogin} from "../../../../lib/reducers/appSlicer";
import React, {useState} from 'react';
import ShareIcon from '@mui/icons-material/Share';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkIcon from '@mui/icons-material/Link';
import {showInformation} from "../../../../components/utilis";
import {updateLoggedAccount} from "../../../../lib/reducers/accountSlicer";

export const ShareButton = ({urlToShare}: any) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const sharedUrl = `${process.env.NEXT_PUBLIC_URL}/blog/posts/${urlToShare}`;
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleShare = (platform: any) => {
        // Replace this URL with the URL you want to share


        let shareUrl;
        switch (platform) {
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(sharedUrl)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(sharedUrl)}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(sharedUrl)}`;
                break;
            case 'copy':
                navigator.clipboard.writeText(sharedUrl);
                showInformation("Link copied to clipboard!");
                return;
            default:
                return;
        }

        window.open(shareUrl, '_blank');
        handleClose();
    };

    return (
        <>
            <IconButton
                aria-label="share"
                aria-controls={open ? 'share-menu' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <ShareIcon/>
            </IconButton>
            <Menu
                id="share-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'share-button',
                }}
            >
                <MenuItem onClick={() => handleShare('linkedin')}>
                    <ListItemIcon>
                        <LinkedInIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Share on LinkedIn"/>
                </MenuItem>
                <MenuItem onClick={() => handleShare('twitter')}>
                    <ListItemIcon>
                        <TwitterIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Share on Twitter"/>
                </MenuItem>
                <MenuItem onClick={() => handleShare('facebook')}>
                    <ListItemIcon>
                        <FacebookIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Share on Facebook"/>
                </MenuItem>
                <MenuItem onClick={() => handleShare('copy')}>
                    <ListItemIcon>
                        <LinkIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Copy Link"/>
                </MenuItem>
            </Menu>
        </>
    );
};


function LikeButton(props: any) {
    const dispatch = useDispatch();
    const article = props.data;
    const loggedAccount = props.loggedAccount;
    const [isHovered, setIsHovered] = useState(false);

    const handleHover = (hovering: boolean) => {
        if (loggedAccount)
            setIsHovered(hovering);
        else dispatch(toggleOpenLogin());
    };

    return (
        <div>
            <Tooltip
               placement={props?.row?"top-start":"left"}
                TransitionProps={{
                    style: {

                        marginLeft:"-30px",
                        backgroundColor: "#ccca",
                        border: "solid 1px #ddd",
                        minWidth: '330px',
                        paddingInline: "10px 10px"
                    },
                }}
                leaveDelay={1000}
                title={
                    <div style={{display: 'flex', flexDirection: 'row', paddingBlock: "10px", minWidth: '100%'}}>
                        {reactionTypes.map((reaction: any) => (
                            <IconButton style={{width: '35px', height: "35px", marginInline: "2px"}}
                                        key={reaction.value} aria-label={reaction.name}
                                        onClick={async () => {
                                            await handleRaction(article?.id, reaction?.value).then(()=>{
                                                props?.isUpdated()
                                            })

                                        }}>
                                {reaction.icon}
                            </IconButton>
                        ))}
                    </div>
                }
                arrow
                open={isHovered}
                onOpen={() => handleHover(true)}
                onClose={() => handleHover(false)}
            >
                <IconButton aria-label="Like">
                    <ThumbUpOffAlt/> <Avatar color={"primary"} style={{
                    height: "18px",
                    width: "18px", fontSize: "12px",

                    marginLeft: "2px",
                    display: article?.reactions?.length > 0 ? "flex" : "none",
                    borderRadius: "100%"
                }}>{article?.reactions?.length}</Avatar>
                </IconButton>
            </Tooltip>
        </div>
    );
}

function PostActions(props: any) {
    const dispatch = useDispatch();
    const [loading, setLoading]=useState<boolean>(false)

    const column: any =
        {display: 'flex', flexDirection: "column", alignItems: 'center', rowGap: "10px",};
    const row: any =
        {display: 'flex', flexDirection: "row", alignItems: 'center', columnGap: "10px",};
    const article = props?.data;
    const loggedAccount = useSelector((state: RootState) => state.loggedAccount)?.loggedAccount
    const savedItems = loggedAccount?.savedItems;
    const isBookMarked = savedItems?.findIndex((d: any) => d?.value == article?.slug) != -1

    // @ts-ignore
    return (
        <div>

            <div style={props?.row ? row : column}>
                {/*<ToggleColorMode/>*/}
                <Tooltip sx={{display:!props?.row?"":"none"}} title="show content table" placement="right">
                    <IconButton onClick={() => props?.showSummray()}>
                        <MenuIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Add reaction" placement="right">
                    <LikeButton data={article} row={props?.row} loggedAccount={loggedAccount} isUpdated={()=>props.isUpdated()}/>
                </Tooltip>
                {/* Other reaction buttons */}
                <Tooltip title="Jump to Comments" placement="right">
                    <IconButton
                        onClick={(e) => {
                            props.jumpToComment(e);
                        }}
                    >
                        <Comment/>
                        <Avatar
                            color={"secondary"}
                            style={{
                                height: "18px",
                                width: "18px", fontSize: "12px",
                                // background: "background.secondary",
                                marginLeft: "2px",
                                display: article?.comments?.length > 0 ? "flex" : "none",
                                borderRadius: "100%"
                            }}>{article?.comments?.length}</Avatar>
                    </IconButton>
                </Tooltip>
                {/* Save button */}
                <Tooltip title="Save" placement="right">
                    <IconButton size="small"
                                disabled={loading}
                            onClick={async () => {

                                if (!loggedAccount)
                                    dispatch(toggleOpenLogin());
                                else {
                                    if (isBookMarked) {
                                        await removeFromSavedList(article?.slug).then(async ()=>{
                                            await getSavedList().then(async(data:any)=>{
                                                //     alert(JSON.stringify(data))
                                                setLoading(false);
                                                dispatch(updateLoggedAccount({savedItems:data}))
                                            })
                                        })
                                    } else
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

                    > {isBookMarked ? <Bookmark/> : <BookmarkAddOutlined/>}
                    </IconButton>
                </Tooltip>
                <Tooltip title="Share options" placement="right">
                    <ShareButton sharedUrl={article?.slug}/>
                </Tooltip>
                <Tooltip title="More options" placement="right">
                    <IconButton>
                        <MoreVertOutlined/>
                    </IconButton>
                </Tooltip>
            </div>
            {/* Jump to Comments button */}


            {/* More options button */}
            {/* Implement more options dropdown button and its dropdown content here */}
        </div>
    );
}

export default PostActions;
