"use client";
import {Container,} from "@mui/material";
import MyAppBar from "components/MyAppBar";
import PostDetails from "../components/PostDetails";

const BlogPost = ({params: {slug}}: { params: { slug: string } }) => {
    return (
        <Container maxWidth="lg">
            <MyAppBar/>
            <PostDetails params={{slug: slug}} isDialog={false}/>
        </Container>
    );
};

export default BlogPost;
