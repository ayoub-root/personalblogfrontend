/* eslint-disable no-unused-vars */
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Tooltip,} from "@mui/material";
import * as React from "react";
import {useRef, useState} from "react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import {CustomMultipleFilter, CustomSingleFilter} from "./CustomFilter";
import {axiosApi, showInformation} from "components/utilis";
import FileUploadButton from "components/FileUploadButton";
import JoditEditorComponent from "./joedit/JoditEditorComponent";

const defaultFonts = [
    "Arial",
    "Comic Sans MS",
    "Courier New",
    "Impact",
    "Georgia",
    "Tahoma",
    "Trebuchet MS",
    "Verdana",
];
export default function AddPost(props: any) {
    const editPost = props.editPost;
    const [loading, setLoading] = React.useState(false);
    const empty = editPost || {
        title: null,
        domain: null,

        tags: null,
        description: null,
        image: null,
        content: "",
        state: "publish",
        sharedWith: ["all"],
    };
    const [config, setConfig] = useState({
        headers: {
            // "Content-Type": "application/json",
            "Content-Type": "multipart/form-data",
        },
    });
    const [newPost, setNewPost] = React.useState<any>(empty);
    const updatePost = (data: any) => {
        setNewPost((p: any) => ({...p, ...data}));
    };

    const imageEl = useRef(null);
    const [selectedFile, setSelectedFile] = useState<any>();
    const [imageUrl, setImageUrl] = useState<any>(`${process.env.NEXT_PUBLIC_ONLINE_WS_URI}/images/posts/${editPost?.image}` || null);

    const handleFileSelect = (file: Blob | MediaSource) => {
        setSelectedFile(file);
        // Generate temporary URL for the selected image
        setImageUrl(URL.createObjectURL(file));
        updatePost({image: file});
    };
    const [showPreview, setShowPreview] = React.useState(false);
    const sortedFontOptions = [
        "Logical",
        "Salesforce Sans",
        "Garamond",
        "Sans-Serif",
        "Serif",
        "Times New Roman",
        "Helvetica",
        ...defaultFonts,
    ].sort();


    const handleSubmit = async (edit: any) => {
        const formData = new FormData();

        if (newPost?.image) formData.append("file", newPost.image);
        if (newPost?.title) formData.append("title", newPost.title);
        if (newPost?.content) formData.append("content", newPost.content);
        if (newPost?.domain) formData.append("domain", newPost.domain);
        if (newPost?.tags) formData.append("tags", newPost.tags);
        if (newPost?.description) formData.append("description", newPost.description);
        if (newPost?.state) formData.append("state", newPost.state);

        try {

            let response;

            if (edit != null) {
                // Update existing post

                response = await axiosApi.put(`/posts/${edit.id}`, formData, config);
            } else {

                // Create new post
                response = await axiosApi.post("/posts/", formData, config);
            }

            showInformation(response.data.body);
            return response.data.body;
        } catch (error: any) {
            if (error.response) {
                showInformation(error.response.data);
            } else {
                showInformation("An error occurred while processing the story.");
            }
            throw new Error(error.response.data.body);
        }
    };
    const handleSaveBtnClick = async () => {
        setLoading(true);
        try {

            const data = await handleSubmit(editPost);
            setLoading(false);
            props?.onClose();
        } catch (err) {
            setLoading(false);
        }
    };
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "65% 34% ",
                //border: "solid",
                height: "100%",
                justifyContent: "space-between",
            }}
        >
            <div className="Ap,p" style={{border: "solid 0px", margin: 0, display: "flex"}}>

                <JoditEditorComponent value={newPost?.content}
                                      onChange={(e: any) => updatePost({content: e})}/>


                {/* <SunEditor
                    height="100%"
                    setContents={newPost?.content}
                    onChange={(e) => updatePost({content: e})}
                    setOptions={{
                        buttonList: [
                            ["undo", "redo"],
                            ["font", "fontSize"],
                            ["paragraphStyle", "blockquote", "formatBlock"],
                            [
                                "bold",
                                "underline",
                                "italic",
                                "strike",
                                "subscript",
                                "superscript",
                            ],
                            ["fontColor", "hiliteColor"],
                            ["align", "list", "lineHeight"],
                            ["outdent", "indent"],

                            ["table", "horizontalRule", "link", "image", "video"],
                            //["math"],
                            // ["imageGallery"], //You must add the 'katex' library at options to use the 'math' plugin. // You must add the "imageGalleryUrl".
                            ["fullScreen", "showBlocks", "codeView"],
                            ["preview", "print"],
                            ["removeFormat"],

                            ["save", "template"],
                            // '/', Line break
                        ], // Or Array of button list, eg. [['font', 'align'], ['image']]
                        defaultTag: "div",
                        minHeight: "495px",
                        // width: "100%",
                        maxHeight: "495px",

                        showPathLabel: true,
                        font: sortedFontOptions,
                    }}
                />*/}
            </div>
            {" "}
            {showPreview ? (
                <Grid
                    sx={{
                        display: "flex",

                        //border: "solid",
                        maxHeight: "100%",
                        overflow: "auto",
                        background: "#eee5",
                        justifyContent: "space-between",
                        padding: "10px",
                    }}
                >
                    <IconButton
                        onClick={() => {
                            setShowPreview(false);
                        }}
                        sx={{
                            ":hover": {
                                background: "#ccc",
                            },
                            justifySelf: "right",
                            position: "absolute",
                            marginLeft: "10px",
                            bottom: "34px",
                            background: "#eee7",
                            width: "35px",
                            height: "35px",
                        }}
                    >
                        <VisibilityOff/>
                    </IconButton>
                    {
                        <div
                            style={{
                                border: "solid",
                                width: "100%",
                                overflow: "auto",
                                height: "auto",
                            }}
                            className="sun-editor-editable"
                            dangerouslySetInnerHTML={{__html: newPost.content}}
                        ></div>
                    }
                </Grid>
            ) : (
                <Grid
                    sx={{
                        display: "grid",
                        gridTemplateRows: "calc(100% - 55px) 55px",
                        //border: "solid",
                        maxHeight: "100%",
                        overflow: "hidden",
                        background: "#eee5",
                        justifyContent: "space-between",
                        padding: "10px",
                    }}
                >
                    <Grid
                        container
                        rowGap={2}
                        alignContent="start"
                        xs={12}
                        overflow="auto"
                        maxHeight={"100%"}
                        sx={
                            {
                                //  display: "flex",
                                //flexDirection: "column",
                                //border: "solid",
                                // padding: "10px 15px",
                            }
                        }
                        columnGap="7px"
                    >
                        <div className="StoryImageField">
                            <div className="txt">
                                {!newPost?.image &&
                                    " Include a high-quality image in your story to make it more inviting to readers."}
                            </div>

                            <div>
                                <FileUploadButton onFileSelect={handleFileSelect}/>
                                {imageUrl && (
                                    <div>

                                        <img
                                            src={imageUrl}
                                            alt="Selected File"
                                            style={{maxWidth: "100%"}}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <Grid item xs={12} padding="10px 10px 5px 10px">
                            <TextField
                                label="Title"
                                fullWidth
                                multiline
                                minRows={3}
                                maxRows={7}
                                value={newPost?.title}
                                onChange={(e) => updatePost({title: e.target.value})}
                            />
                        </Grid>{" "}
                        <Grid item xs={12} padding="2px 10px">
                            <CustomSingleFilter
                                label={"Domain"}
                                type={"domain"}
                                value={newPost?.domain}
                                updateFilter={(e: any) => {
                                    updatePost({domain: e});
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} padding="2px 10px">
                            <CustomMultipleFilter
                                label={"Tags"}
                                type={"tags"}
                                value={newPost?.tags}
                                updateFilter={(e: any) => {
                                    updatePost({tags: JSON.stringify(e)});
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} padding="3px 10px">
                            <TextField
                                fullWidth
                                multiline
                                minRows={3}
                                maxRows={7}
                                variant="outlined"
                                label="Description"
                                value={newPost?.description}
                                onChange={(e) => updatePost({description: e.target.value})}
                            />
                        </Grid>
                        {/* {JSON.stringify(newPost)} */}
                    </Grid>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            columnGap: "20px",
                            justifyContent: "space-between",
                            paddingInline: "10px",
                            paddingBlock: "20px 7px",
                            //border: "solid",
                        }}
                    >
                        <IconButton
                            onClick={() => {
                                setShowPreview(true);
                            }}
                            sx={{
                                ":hover": {
                                    background: "#ccc",
                                },
                                background: "#eee7",
                                width: "35px",
                                height: "35px",
                            }}
                        >
                            <Tooltip placement="bottom" title="preview">
                                <Visibility/>
                            </Tooltip>
                        </IconButton>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                columnGap: "10px",
                                justifyContent: "space-between",

                                //border: "solid",
                            }}
                        >
                            {/* <Button color="inherit" variant="outlined" onClick={}>
                Cancel
              </Button> */}

                            <FormControl sx={{width: "130px"}}>
                                <InputLabel id="postVisibility">Visibility</InputLabel>
                                <Select
                                    fullWidth
                                    labelId="postVisibility"
                                    label="Visibility"
                                    placeholder="Visibility"
                                    size="small"
                                    // renderValue={(e) => e.}
                                    value={newPost?.state}
                                    onChange={(e) => updatePost({state: e.target.value})}
                                >
                                    <MenuItem value="DRAFT">Draft</MenuItem>
                                    <MenuItem value="PUBLISHED">Published</MenuItem>
                                    <MenuItem value="NEEDREVIEW">Need Review</MenuItem>
                                </Select>{" "}
                            </FormControl>{" "}

                            <Button
                                //   disabled={loading}
                                color="primary"
                                variant="outlined"
                                onClick={handleSaveBtnClick}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </Grid>
            )}
        </div>
    );
}
