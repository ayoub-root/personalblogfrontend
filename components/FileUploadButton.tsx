import {Button, IconButton} from "@mui/material";
import React, {useRef} from "react";

const FileUploadButton = ({onFileSelect,text,style}: any) => {
    const fileInputRef = useRef<any>(null);

    const handleButtonClick: any = () => {
        // Click the hidden file input element
        //
        fileInputRef?.current?.click();
    };

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        // Pass the selected file to the parent component
        onFileSelect(file);
    };

    return (
        <div style={style||{}}>
            <input
                type="file"
                ref={fileInputRef}
                style={{display: "none"}}
                onChange={handleFileChange}
            />
            <Button onClick={handleButtonClick}>{text||"Select image"}</Button>
        </div>
    );
};

export default FileUploadButton;
