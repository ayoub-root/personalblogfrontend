import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";
import { Close, Face6, Send } from "@mui/icons-material";
import { Avatar, Fade, Grid, ListItem, Popper, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";

interface ChatbotMessagesProps {
  title: string;
  onClose: () => void;
  messages: any;
  onChange: any;
}

const ShowMessage = ({ content, dir, who }: any) => {
  return (
    <ListItem
      dense
      dir={dir}
      style={{ width: "100%", alignItems: "start", columnGap: "10px" }}
    >
      <Avatar
        style={{
          width: "25px",
          height: "25px",
          fontSize: "11px",
          color: "white",
          marginTop: "1px",
        }}
      >
        {who !== "you" ? <Face6 /> : "You"}
      </Avatar>
      <Typography
        sx={{
          "::first-letter": { textTransform: "uppercase" },
          maxWidth: "100%",
          backgroundColor: "background.default2",
          wordBreak: "break-word",
          padding: "3px 10px",
          borderRadius: "12px",
          whiteSpace: "pre-wrap",
          fontSize: "13px",
        }}
      >
        {content}
      </Typography>
    </ListItem>
  );
};
const ChatbotMessages: React.FC<ChatbotMessagesProps> = ({
  title,
  onClose,
  messages,
  onChange,
}) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<any>("");
  return (
    <div
      style={{
        maxWidth: "100%",
        display: "grid",
        height: "100%",
        gridTemplateRows: "50px calc(100% - 100px) 50px",
      }}
    >
      <Grid
        sx={{
          borderRadius: "4px 4px 0px 0px",
          //   border: 'solid 1px',
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingInline: "10px 5px",
          backgroundColor: "background.default2",
        }}
      >
        {" "}
        <Typography alignItems={"center"} display={"flex"} columnGap={"5px"}>
          {" "}
          <Face6 height={"25px"} /> {title || " Hi, i'm Chatbot"}
        </Typography>{" "}
        <IconButton onClick={() => onClose()}>
          <Close />
        </IconButton>
      </Grid>
      <div
        style={{
          overflow: "auto",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignContent: "end",
        }}
      >
        {messages.length == 0 ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              opacity: 0.2,
              justifyContent: "center",
              flexDirection: "column",
              fontStyle: "italic",
            }}
          >
            <Face6 style={{ height: "90px", width: "90px", color: "yellow" }} />
            No message yet
          </div>
        ) : (
          messages.map((e: any, index: number) => (
            <ShowMessage
              who={index % 2 === 0 ? "you" : null}
              dir={index % 2 === 0 ? "rtl" : "ltr"}
              key={index}
              content={e?.content}
            />
          ))
        )}
      </div>
      <div>
        <TextField
          multiline
          rows={1}
          size="medium"
          autoFocus={true}
          fullWidth
          value={value}
          onChange={(r: any) => {
            setValue(r.target.value);
          }}
          placeholder={"Your question... (ALT+ENTER to send)"}
          onKeyDown={(e: any) => {
            let newValue = e.target?.value;
            if (e.altKey && e.key == "Enter" && value.trim() != "") {
              onChange({ content: newValue });
              setValue("");
            }
          }}
          InputProps={{
            endAdornment: (
              <IconButton
                style={{ height: "32px", width: "32px" }}
                disabled={loading || value.trim() == ""}
                onClick={(e) => {
                  onChange({ content: value });
                  setValue("");
                }}
              >
                <Send />
              </IconButton>
            ),
            sx: {
              display: "flex",
              fontSize: "12px",
              alignItems: "start",
              paddingBlock: "10px",
            },
          }}
        />
      </div>
    </div>
  );
};

function Chatbot() {
  const [messages, setMessages] = useState<any[]>([]);

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
    setMessages([]);
  };
  const gptApiKey = process.env.CHATGPT_KEY;
  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  return (
    <div style={{ position: "fixed", right: 20, bottom: 10 }}>
      <IconButton aria-describedby={id} type="button" onClick={handleClick}>
        <Face6 />
      </IconButton>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        transition
        placement={"top-end"}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box
              sx={{
                border: "solid 1px #ccc",
                backgroundColor: "background.paper",
                paddingInline: "4px",
                width: "320px",
                height: "460px",
                borderRadius: "6px",
                paddingBlock: "4px 6px",
              }}
            >
              <ChatbotMessages
                title={"Hi, i'm your Chatbot,"}
                onClose={() => setOpen(false)}
                messages={messages}
                onChange={async (e: any) => {
                  try {
                    const res = await axios.post(
                      "https://api.openai.com/v1/chat/completions",
                      {
                        role: "system",
                        model: "gpt-3.5-turbo-16k",
                        //model: "gpt-3.5-turbo-0613",
                        prompt: e.content,
                        max_tokens: 150,
                      },
                      {
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${gptApiKey}`,
                        },
                      }
                    );
                    if (res.status == 200)
                      setMessages((aaa) => [
                        ...aaa,
                        e,
                        { content: res.data.choices[0]?.text },
                      ]);
                    else
                      setMessages((aaa) => [
                        ...aaa,
                        e,
                        { content: res.data.error.message },
                      ]);
                  } catch (err: any) {
                    setMessages((aaa) => [
                      ...aaa,
                      e,
                      { content: err.response.data.error.message },
                    ]);
                  }
                }}
              />
            </Box>
          </Fade>
        )}
      </Popper>
    </div>
  );
}

export default Chatbot;
