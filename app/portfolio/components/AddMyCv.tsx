import {Button, TextField} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import {axiosApi, myDefaultProfile, showInformation} from "../../../components/utilis";
import FileUploadButton from "../../../components/FileUploadButton";

export default function AddMyCv(props: any) {
    const [mycv, setMycv] = useState(props?.editMyCv || {
        title: null,
        content: JSON.stringify(myDefaultProfile, null, 4) || "",
        language: "english",
        fileUrl: null,
        photoUrl: null,
    })
    const [loading, setLoading] = React.useState(false);
    const [config, setConfig] = useState({
        headers: {
            // "Content-Type": "application/json",
            "Content-Type": "multipart/form-data",
        },
    });
    const handleSubmit = async (edit: any) => {
        const formData = new FormData();

        if (mycv?.fileUrl) formData.append("file", mycv.fileUrl);
        if (mycv?.photoUrl) formData.append("photo", mycv.photoUrl);
        if (mycv?.title) formData.append("title", mycv.title);
        if (mycv?.content) formData.append("content", mycv.content);
        if (mycv?.language) formData.append("language", mycv.language);


        try {

            let response;

            if (edit != null) {
                // Update existing post

                response = await axiosApi.put(`/mycvs/${edit.id}`, formData, config);
                showInformation(JSON.stringify(response))
            } else {

                // Create new post
                response = await axiosApi.post("/mycvs/", formData, config);
            }


            return response.data.body;
        } catch (error: any) {
            if (error.response) {
                showInformation(error.response.data);
            } else {
                showInformation(JSON.stringify(error) + "An error occurred while processing the story.");
            }
            throw new Error(error.response.data.body);
        }
    };
    const handleSaveBtnClick = async () => {
        setLoading(true);
        try {

            const data = await handleSubmit(props?.editMyCv);
            setLoading(false);
            props?.onClose();
        } catch (err) {
            setLoading(false);
        }
    };
    const [fileUrl, setFileUrl] = useState<any>(null)
    const [photoUrl, setPhotoUrl] = useState<any>(null)
    const handleFileSelect = (file: any) => {

        // Generate temporary URL for the selected image
        setFileUrl(URL.createObjectURL(file));
        setMycv({...mycv, fileUrl: file});
    }
    const handlePhotoSelect = (file2: any) => {

        // Generate temporary URL for the selected image
        setPhotoUrl(URL.createObjectURL(file2));
        setMycv({...mycv, photoUrl: file2});
    };
    return (<div
        style={{
            width: "100%",
            height: "100%",
            display: "grid",
            gridTemplateColumns: "calc(100% - 270px) 270px",
        }}
    >

        <div style={{padding: "0px 10px"}}>
        <textarea
            onChange={(e) => setMycv({...mycv, content: e.target.value})}
            style={{
                height: "100%",
                width: "99%",
                border: "solid 1px #eee",
                overflow: "auto",
                whiteSpace: "pre-wrap",
                fontFamily: "tahoma",

            }}
            value={mycv?.content}
        />
        </div>
        <div
            style={{
                display: "flex",
                justifyContent: 'space-between',

                alignItems: "center",
                flexDirection: "column",

            }}
        >
            <div style={{rowGap: "10px", display: "flex", flexDirection: "column"}}><TextField
                fullWidth
                size="small"
                variant="outlined"
                label="CV title"
                placeholder="CV title"
                value={mycv?.title}
                onChange={(e) => setMycv({...mycv, title: e.target.value})}
            />
                <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="CV Language"
                    placeholder="CV Language"
                    value={mycv?.language}
                    onChange={(e) => setMycv({...mycv, language: e.target.value})}
                />
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: "center",
                    width: "100%",
                    flexDirection: "column"
                }}>
                    <FileUploadButton style={{zIndex: 1}}
                                      onFileSelect={handlePhotoSelect} text={"Upload your Photo"}/>


                    <img
                        alt={""}
                        src={photoUrl}

                        style={{width: "80px", height: "80px"}}
                    />


                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: "center",
                    width: "100%",
                    flexDirection: "column"
                }}>
                    <FileUploadButton style={{zIndex: 1}}
                                      onFileSelect={handleFileSelect} text={"Upload Cv"}/>


                    <embed

                        src={fileUrl}

                        style={{width: "100%", height: "400px"}}
                    />


                </div>
            </div>


            <div style={{justifyContent: "right", display: "flex", width: '100%', padding: "10px"}}>
                <Button
                    variant="outlined"
                    onClick={() => {
                        handleSaveBtnClick();
                    }}
                >
                    Save
                </Button>
            </div>
        </div>
    </div>)
}