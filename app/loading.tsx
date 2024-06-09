import {Backdrop, CircularProgress} from "@mui/material";

export default function Loading() {
    // Or a custom loading skeleton component
    return (
        <Backdrop sx={{color: "#fff", zIndex: 1}} open={true}>
            <CircularProgress color="inherit"/>
        </Backdrop>
    );
}
