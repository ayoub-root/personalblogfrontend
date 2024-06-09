import {GitHub, LinkedIn, StackedLineChartOutlined, Twitter,} from "@mui/icons-material";
import {IconButton, Stack} from "@mui/material";

export function SocialMedia() {
    return (
        <Stack
            direction="row"
            justifyContent="left"
            spacing={1}
            useFlexGap
            sx={{
                color: "text.secondary",
            }}
        >
            <IconButton
                color="inherit"
                href="https://github.com/ayoub-root"
                aria-label="GitHub"
                sx={{alignSelf: "center"}}
            >
                <GitHub/>
            </IconButton>
            <IconButton
                color="inherit"
                href="https://www.linkedin.com/in/ayoub-benayache/"
                aria-label="Stackoverflow"
                sx={{alignSelf: "center"}}
            >
                <StackedLineChartOutlined/>
            </IconButton>
            <IconButton
                color="inherit"
                href="https://twitter.com/benayache_ayoub"
                aria-label="X"
                sx={{alignSelf: "center"}}
            >
                <Twitter/>
            </IconButton>
            <IconButton
                color="inherit"
                href="https://www.linkedin.com/in/ayoub-benayache/"
                aria-label="LinkedIn"
                sx={{alignSelf: "center"}}
            >
                <LinkedIn/>
            </IconButton>
        </Stack>
    );
}
