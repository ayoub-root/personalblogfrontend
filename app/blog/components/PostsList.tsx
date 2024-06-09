import * as React from "react";
import {experimentalStyled as styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import PostCard from "./postCard";
import {Pagination, Stack,} from "@mui/material";
import {axiosApi} from "components/utilis";

import LoadingPage from "app/LoadingPage";
import {CustomNoRowsOverlay} from "app/myspace/components/AdminPostsList";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

interface Props {
    openSlug: any;
}

const PostsList: React.FC<Props> = (props) => {
    //const search = useLocation().search;
    const [loading, setLoading] = React.useState(true);
    //const searchKey = new URLSearchParams(search).get("search");
    const [posts, setPosts] = React.useState([]);

    const [pageSize, setPageSize] = React.useState(5);
    const [pagesCount, setPagesCount] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(0);

    React.useEffect(() => {
        const getStories = async () => {
            setLoading(true);

            await axiosApi
                .get(`/posts?page=${currentPage}&size=${pageSize}`, {
                    withCredentials: false,
                })
                .then((reponse) => reponse.data)
                .then((json) => {
                    console.log(json);
                    setPosts(json.content);
                    setPagesCount(json?.totalPages);
                    //setCurrentPage(0);
                    //setPages(json?.pages);

                    setLoading(false);
                })
                .catch((erro) => {
                    console.log(erro);
                    setLoading(false);
                });
        };
        getStories();
    }, [setLoading, currentPage]);


    // Change page
    const handleChange = (value: number) => {
        setCurrentPage(value);
    };


    return (
        <Box
            maxHeight="100%"
            sx={{
                justifyItems: "center",
                display: "grid",
                gridTemplateRows: "calc(100% - 65px) 65px",
                alignContent: "start",
                width: "100%",
                //     border: "solid",
            }}
        >
            <LoadingPage open={loading} onClose={() => setLoading(false)}/>
            {posts?.length == 0 ? (
                <CustomNoRowsOverlay/>
            ) : (
                <Grid
                    overflow={"auto"}
                    sx={{
                        display: "flex",
                        width: "100%",
                        margin: 0,
                        //  border: "solid",
                        justifyContent: "start",
                    }}
                    container
                    rowGap={"30px"}
                    columnSpacing={"20px"}
                    // spacing={{ xs: 2, md: 4 }}
                    //  columns={{ xs: 4, sm: 8, md: 8, lg: 12 }}
                >
                    {posts?.map((cpost: any, index: number) => (
                        <Grid width={"100%"}
                              key={index}
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={6}

                              display={"flex"}
                              justifyContent={"center"}
                        >
                            <PostCard
                                data={cpost}
                                openInNoew={() => {
                                    props?.openSlug(cpost?.slug);

                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
            <Stack spacing={2} paddingTop={"10px"}>
                <Pagination

                    count={pagesCount}
                    page={currentPage + 1}
                    onChange={(e, p) => handleChange(p - 1)}
                    variant="outlined"
                    shape="rounded"
                />
            </Stack>

        </Box>
    );
};

export default PostsList;

{
    /* {[...new Array(50)]
                .map(
                  () => `Cras mattis consectetur purus sit amet fermentum.
  Cras justo odio, dapibus ac facilisis in, egestas eget quam.
  Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
  Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                )
                .join('\n')} */
}
