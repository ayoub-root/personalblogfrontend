import * as React from "react";
import Box from "@mui/material/Box";
import {Button, Divider, TextareaAutosize, TextField,} from "@mui/material";
import {SocialMedia} from "./SocialMedia";
import {axiosApi, showInformation} from "./utilis";

export default function ContactUs(props: any) {
    const [name, setName] = React.useState<any>();
    const [email, setEmail] = React.useState<any>();
    const [subject, setSubject] = React.useState<any>();
    const [content, setContent] = React.useState<any>();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            if (content && name && email.trim())
                await axiosApi
                    .post("/messages/",
                        {
                            name: name,
                            subject: subject,
                            email: email,
                            content: content,

                        })
                    .then((r) => {
                        showInformation("Add message successfully ");
                        setEmail("");
                        setContent("");
                        setSubject("");
                        setName("");
                        props?.onClose();
                    });
            else showInformation("fill all required fields");

            //   setNewPost(empty);
            // setTimeout(() => {
            //   //  alert("ok");
            // }, 7000);
        } catch (error) {
            // setTimeout(() => {
            //  // alert("errot");
            // }, 7000);
            // alert(error);
        }
    };
    return (
        <Box
            sx={{
                width: "100%",
                my: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                rowGap: "15px",
            }}
        >
            <SocialMedia/>
            <div
                id="contact"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    columnGap: "20px",
                }}
            >
                <Divider sx={{width: "40%"}}/>{" "}
                <span style={{fontSize: "12px", color: "#bbb", marginTop: "-3px"}}>
          or
        </span>
                <Divider sx={{width: "40%"}}/>
            </div>
            <TextField
                size="medium"
                label="Your name"
                placeholder="Your name"
                type="text"
                fullWidth
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                type="email"
                fullWidth
                size="medium"
                label="Your email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />{" "}
            <TextField
                type="text"
                fullWidth
                size="medium"
                label="Your subject"
                placeholder="Your subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
            />
            <TextareaAutosize
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{
                    width: "100%",
                    minHeight: "220px",
                    background: "background",
                    padding: "10px",
                    fontSize: "18px",
                }}
            />
            <Box sx={{justifyContent: "right", width: "100%", display: "flex"}}>
                <Button
                    variant="outlined"
                    onClick={(e) => {
                        handleSubmit(e);
                    }}
                >
                    send
                </Button>
            </Box>
        </Box>
    );
}
